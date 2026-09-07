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
      className={`flex items-center gap-2 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full transition-all disabled:opacity-50 group/like ${
        isLiked
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
  )
}