import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Bookmark } from 'lucide-react'
import type { Post } from '../../api/post.api'
import { getAvatar } from '../../lib/utils'
import { useToggleLike, useToggleSave } from '../../hooks/useUser'
import { useAuthStore } from '../../api/auth.api'

interface Props { post: Post }

export default function PostCard({ post }: Props) {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const { mutate: toggleLike, isPending: isLiking } = useToggleLike(post.id, post.slug)
  const { mutate: toggleSave, isPending: isSaving } = useToggleSave()

  const [isSaved, setIsSaved] = useState<boolean>(post.isSaved ?? false) // ✅

  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) { navigate('/login'); return }
    toggleLike()
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) { navigate('/login'); return }
    toggleSave(post.id, {
      onSuccess: (response: any) => {
        const saved = response.data?.saved
        setIsSaved(typeof saved === 'boolean' ? saved : (prev) => !prev) // ✅ use server value
      },
      onError: () => {}, 
    })
  }

  return (
    <article className="py-7">

      {/* Author */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src={getAvatar(post.author?.avatar, post.author?.username)}
          alt={post.author?.username}
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
          {post.author?.username}
        </span>
      </div>

      {/* Content */}
      <div className="flex gap-6 items-start justify-between">
        <div className="flex-1 min-w-0">
          <Link to={`/posts/${post.slug}`}>
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-400 dark:text-gray-500">

            <span>{date}</span>

            {/* ❤️ Like */}
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-1 transition-colors disabled:opacity-50 ${
                post.isLiked
                  ? 'text-red-500 dark:text-red-400'
                  : 'text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'
              }`}
            >
              <Heart
                className="w-3.5 h-3.5"
                fill={post.isLiked ? 'red' : 'none'}
              />
              <span>{post.likesCount ?? 0}</span>
            </button>

            {/* 💬 Comments */}
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{post.commentsCount ?? 0}</span>
            </span>

            {/* 🔖 Save */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center gap-1 transition-colors disabled:opacity-50 ${
                isSaved  // ✅ local state
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              <Bookmark
                className="w-3.5 h-3.5"
                fill={isSaved ? 'currentColor' : 'none'}  // ✅ local state
              />
            </button>

            {/* 🏷️ Tag */}
            {post.tags?.[0] && (
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-0.5 rounded-full">
                {post.tags[0].name}
              </span>
            )}

          </div>
        </div>

        {/* Cover */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt=""
            className="hidden sm:block w-20 h-14 sm:w-24 sm:h-16 object-cover rounded flex-shrink-0"
          />
        )}

      </div>
    </article>
  )
}