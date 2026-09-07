import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, MessageCircle, Bookmark, BookmarkCheck, MoreHorizontal, Clock, Check } from 'lucide-react'
import type { Post } from '../../api/post.api'
import { getAvatar } from '../../lib/utils'
import { useToggleLike, useToggleSave } from '../../hooks/useUser'
import { useAuthStore } from '../../api/auth.api'
import { motion, AnimatePresence } from 'framer-motion'

interface Props { post: Post }

export default function PostCard({ post }: Props) {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const { mutate: toggleLike, isPending: isLiking } = useToggleLike(post.id, post.slug)
  const { mutate: toggleSave, isPending: isSaving } = useToggleSave()

  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked ?? false)
  const [likesCount, setLikesCount] = useState<number>(post.likesCount ?? 0)
  const [isSaved, setIsSaved] = useState<boolean>(post.isSaved ?? false)

  useEffect(() => {
    setIsLiked(post.isLiked ?? false)
    setLikesCount(post.likesCount ?? 0)
    setIsSaved(post.isSaved ?? false)
  }, [post.isLiked, post.likesCount, post.isSaved])

  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  const handleCardClick = () => {
    navigate(`/posts/${post.slug}`)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      navigate('/login')
      return
    }

    const nextLiked = !isLiked
    const nextCount = nextLiked ? likesCount + 1 : Math.max(0, likesCount - 1)
    setIsLiked(nextLiked)
    setLikesCount(nextCount)

    toggleLike(undefined, {
      onSuccess: (response: any) => {
        if (response.data?.data) {
          setIsLiked(response.data.data.liked)
          setLikesCount(response.data.data.likeCount)
        } else if (typeof response.data?.liked === 'boolean') {
          setIsLiked(response.data.liked)
          setLikesCount(response.data.likeCount)
        }
      },
      onError: () => {
        setIsLiked(isLiked)
        setLikesCount(likesCount)
      },
    })
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      navigate('/login')
      return
    }

    toggleSave(post.id, {
      onSuccess: (response: any) => {
        const saved = response.data?.saved
        setIsSaved(typeof saved === 'boolean' ? saved : (prev) => !prev)
      },
      onError: () => { },
    })
  }

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-white/95 dark:bg-[#0d111a]/95 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-slate-800/90 hover:border-[#1a62ea]/40 dark:hover:border-[#1a62ea]/40 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden cursor-pointer mb-4 sm:mb-5"
    >
      {/* Accent hover bar */}
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#1a62ea] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-4 sm:p-7 space-y-3.5">

        {/* ─── Author Header ────────────────────────── */}
        <div className="flex items-center justify-between">
          <Link
            to={`/u/${post.author?.username}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2.5 sm:gap-3 group/author min-w-0"
          >
            <img
              src={getAvatar(post.author?.avatar, post.author?.username)}
              alt={post.author?.username}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 group-hover/author:ring-[#1a62ea] shadow-sm transition flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover/author:text-[#1a62ea] dark:group-hover/author:text-blue-400 transition-colors truncate">
                  {post.author?.username}
                </span>
                {post.author?.isVerified && (
                  <div className="bg-[#1a62ea] rounded-full p-0.5 flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-mono">
                <Clock className="w-3 h-3 text-[#1a62ea]" />
                <span>{date}</span>
              </div>
            </div>
          </Link>

          <button
            onClick={(e) => e.stopPropagation()}
            aria-label="Options"
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors opacity-60 sm:opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </button>
        </div>

        {/* ─── Main Content Title & Excerpt ─────────── */}
        <div className="flex gap-4 sm:gap-6 items-start">
          <div className="flex-1 min-w-0 space-y-1.5">
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-[#1a62ea] dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 font-sans">
              {post.excerpt}
            </p>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="flex-shrink-0">
              <img
                src={post.coverImage}
                alt=""
                className="w-20 h-16 sm:w-28 sm:h-20 object-cover rounded-xl shadow-md border border-slate-200 dark:border-slate-800"
              />
            </div>
          )}
        </div>

        {/* ─── Tags ───────────────────────────────── */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 sm:py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-full border border-slate-200/60 dark:border-slate-700/60"
              >
                #{tag.name}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 text-slate-400">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* ─── Card Actions Footer ─────────────────── */}
        <div className="flex items-center justify-between sm:justify-start gap-4 sm:gap-6 pt-3 border-t border-slate-100 dark:border-slate-800/80">

          {/* Full Red Heart Reaction Button */}
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all disabled:opacity-50 group/like ${isLiked
              ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 ring-1 ring-rose-300/40 dark:ring-rose-800/40'
              : 'text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400'
              }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${isLiked ? 'scale-110 text-rose-500 fill-[#ef4444]' : 'group-hover/like:scale-125'}`}
              fill={isLiked ? '#ef4444' : 'none'}
              stroke={isLiked ? '#ef4444' : 'currentColor'}
            />
            <span>{likesCount}</span>
          </button>

          {/* Number of Comments */}
          <div
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group/comments"
          >
            <MessageCircle className="w-4 h-4 text-blue-500 transition-transform group-hover/comments:scale-110" />
            <span>{post.commentsCount ?? 0} <span className="hidden sm:inline">comments</span></span>
          </div>

          {/* Save Button with Spring Animation */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all disabled:opacity-50 ml-auto group/save ${isSaved
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-300/40 dark:ring-emerald-800/40'
              : 'text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
          >
            <AnimatePresence mode="wait">
              {isSaved ? (
                <motion.div
                  key="card-saved"
                  initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/20" />
                </motion.div>
              ) : (
                <motion.div
                  key="card-unsaved"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Bookmark className="w-4 h-4 transition-transform group-hover/save:scale-110" />
                </motion.div>
              )}
            </AnimatePresence>
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </motion.button>

        </div>

      </div>
    </article>
  )
}