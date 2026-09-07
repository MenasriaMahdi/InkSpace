import { Bookmark, BookmarkCheck } from "lucide-react"
import { useAuthStore } from "../../api/auth.api"
import { useToggleSave } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

type Props = {
  postId: number
  isSaved: boolean
  onToggle?: (val?: boolean) => void
}

export default function SaveButton({ postId, isSaved, onToggle }: Props) {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { mutate: toggleSave, isPending } = useToggleSave()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      navigate("/login")
      return
    }

    // Optimistic toggle
    if (onToggle) {
      onToggle(!isSaved)
    }

    toggleSave(postId, {
      onSuccess: (res: any) => {
        if (onToggle && res?.data?.saved !== undefined) {
          onToggle(res.data.saved)
        }
      },
      onError: () => {
        // Rollback on error
        if (onToggle) {
          onToggle(isSaved)
        }
      },
    })
  }

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={handleClick}
      disabled={isPending}
      className={`relative flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full transition-all disabled:opacity-50 group ${
        isSaved
          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-300/40 dark:ring-emerald-800/40"
          : "text-slate-500 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400"
      }`}
    >
      <AnimatePresence mode="wait">
        {isSaved ? (
          <motion.div
            key="saved"
            initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-600/20" />
          </motion.div>
        ) : (
          <motion.div
            key="unsaved"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Bookmark className="w-4 h-4 transition-transform group-hover:scale-110" />
          </motion.div>
        )}
      </AnimatePresence>

      <span>{isSaved ? "Saved" : "Save"}</span>
    </motion.button>
  )
}