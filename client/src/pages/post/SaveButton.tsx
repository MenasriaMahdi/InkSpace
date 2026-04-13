import { Bookmark, BookmarkCheck } from "lucide-react"
import { useAuthStore } from "../../api/auth.api"
import { useToggleSave } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"

type Props = {
  postId: number
  isSaved: boolean
  onToggle?: (val?: boolean) => void
}

export default function SaveButton({ postId, isSaved, onToggle }: Props) {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { mutate: toggleSave, isPending } = useToggleSave()

  const handleClick = () => {
    if (!user) {
      navigate("/login")
      return
    }

    console.log("CLICKED SAVE") // 👈 debug

    toggleSave(postId, {
      onSuccess: (res: any) => {
        console.log("BACKEND RESPONSE:", res)

        // 🔥 update UI from backend
        if (onToggle) {
          onToggle(res?.data?.saved)
        }
      },
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`flex items-center gap-1.5 text-sm ${
        isSaved
          ? "text-green-600"
          : "text-gray-500"
      }`}
    >
      {isSaved ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}

      <span>{isSaved ? "Saved" : "Save"}</span>
    </button>
  )
}