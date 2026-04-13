import { Heart } from 'lucide-react'
import { useAuthStore } from '../../api/auth.api'
import { useToggleLike } from '../../hooks/useUser' 
import { useNavigate } from 'react-router-dom'

type Props = {
  postId: number
  slug: string
  likesCount: number
  isLiked: boolean
}

export default function LikeButton({ postId, slug, likesCount, isLiked }: Props) {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { mutate: toggleLike, isPending } = useToggleLike(postId, slug)

  const handleClick = () => {
    if (!user) {
      navigate('/login')
      return
    }
    toggleLike()
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-1.5 text-sm transition-colors disabled:opacity-50 ${
        isLiked
          ? 'text-red-500 dark:text-red-400'
          : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
      }`}
    >
      <Heart
        className="w-4 h-4"
        fill={isLiked ? 'currentColor' : 'none'}
      />
      <span>{likesCount}</span>
    </button>
  )
}