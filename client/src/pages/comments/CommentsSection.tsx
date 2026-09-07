import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../api/auth.api"
import { useComments, useCreateComment, useCreateReply } from "../../hooks/useComments"
import { getAvatar } from "../../lib/utils"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Comment } from "../../api/comment.api"

type Props = {
  postId: number
}

const schema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment too long"),
})

type FormData = z.infer<typeof schema>

// ─── Reply Form (small inline component) ──────────────
function ReplyForm({
  commentId,
  postId,
  onCancel,
}: {
  commentId: number
  postId: number
  onCancel: () => void
}) {
  const { mutate: addReply, isPending } = useCreateReply(postId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (formData: FormData) => {
    addReply(
      { commentId, content: formData.content },
      {
        onSuccess: () => {
          reset()
          onCancel()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2 ml-4">
      <textarea
        {...register("content")}
        placeholder="Write a reply..."
        rows={2}
        autoFocus
        className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white resize-none"
      />
      {errors.content && (
        <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
      )}
      <div className="mt-2 flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-4 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-gray-900 dark:bg-white px-4 py-1.5 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Replying..." : "Reply"}
        </button>
      </div>
    </form>
  )
}

// ─── Main Component ────────────────────────────────────
export default function CommentsSection({ postId }: Props) {
  const { user } = useAuthStore()
  const { data, isLoading, isError } = useComments(postId)
  const { mutate: addComment, isPending } = useCreateComment(postId)

  // tracks which comment has the reply form open
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const comments: Comment[] = data?.comments ?? []

  const onSubmit = (formData: FormData) => {
    addComment(formData.content, {
      onSuccess: () => reset(),
    })
  }

  return (
    <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Comments{" "}
        {comments.length > 0 && (
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
            ({comments.length})
          </span>
        )}
      </h2>

      {/* Main comment form */}
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <textarea
            {...register("content")}
            placeholder="Write a comment..."
            rows={3}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white resize-none"
          />
          {errors.content && (
            <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
          )}
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-gray-900 dark:bg-white px-5 py-2 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? "Posting..." : "Post comment"}
            </button>
          </div>
        </form>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link
            to="/login"
            className="underline hover:text-gray-900 dark:hover:text-white"
          >
            Log in
          </Link>{" "}
          to join the discussion.
        </p>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Failed to load comments.
        </p>
      )}

      {/* Empty */}
      {!isLoading && !isError && comments.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No comments yet. Be the first to comment.
        </p>
      )}

      {/* Comments list */}
      {!isLoading && !isError && comments.length > 0 && (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={getAvatar(comment.user.avatar, comment.user.username)}
                alt={comment.user.username}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />

              <div className="flex-1 min-w-0">
                {/* Comment bubble */}
                <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      to={`/u/${comment.user.username}`}
                      className="text-sm font-medium text-gray-900 dark:text-white hover:underline"
                    >
                      {comment.user.username}
                    </Link>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>

                {/* Reply button */}
                {user && (
                  <button
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    }
                    className="mt-1 ml-2 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {replyingTo === comment.id ? "Cancel" : "Reply"}
                  </button>
                )}

                {/* Inline reply form */}
                {replyingTo === comment.id && (
                  <ReplyForm
                    commentId={comment.id}
                    postId={postId}
                    onCancel={() => setReplyingTo(null)}
                  />
                )}

                {/* Existing replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 ml-4 space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <img
                          src={getAvatar(reply.user.avatar, reply.user.username)}
                          alt={reply.user.username}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                        <div className="flex-1 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Link
                              to={`/u/${reply.user.username}`}
                              className="text-sm font-medium text-gray-900 dark:text-white hover:underline"
                            >
                              {reply.user.username}
                            </Link>
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}