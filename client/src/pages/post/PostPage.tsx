import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { usePost, useDeletePost } from "../../hooks/usePost";
import { useAuthStore } from "../../api/auth.api";
import { getAvatar } from "../../lib/utils";
import CommentsSection from "../comments/CommentsSection";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = usePost(slug || "");
  const { user } = useAuthStore();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSaved, setIsSaved] = useState<boolean | null>(null);

  useEffect(() => {
    if (post && isSaved === null) {
      setIsSaved(post.isSaved ?? false);
    }
  }, [post, isSaved]);

  if (isLoading)
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400 dark:text-gray-500">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400 dark:text-gray-500">Failed to load post.</p>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400 dark:text-gray-500">Post not found.</p>
      </div>
    );

  const isAuthor = user?.id === post.author?.id;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Feed
            </Link>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Story
            </h1>
          </div>

          {isAuthor && (
            <div className="flex items-center gap-2">
              <Link
                to={`/posts/${post.id}/edit`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </Link>
              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Delete confirmation */}
        {showConfirm && (
          <div className="mb-6 p-4 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950">
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              Are you sure? This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => deletePost(post.id)}
                disabled={isDeleting}
                className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isDeleting ? "Deleting..." : "Yes, delete"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-full px-4 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={getAvatar(post.author?.avatar, post.author?.username)}
            alt={post.author?.username}
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <Link
              to={`/u/${post.author?.username}`}
              className="font-medium text-gray-900 dark:text-white hover:underline block truncate"
            >
              {post.author?.username}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          {post.title}
        </h2>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className="dark:text-white prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Actions */}
        <div className="flex items-center gap-4 mt-8 mb-4">
          <LikeButton
            postId={post.id}
            slug={post.slug}
            likesCount={post.likesCount}
            isLiked={post.isLiked ?? false}
          />
          <SaveButton
            postId={post.id}
            isSaved={isSaved ?? false}
            onToggle={(val?: boolean) =>
              setIsSaved(val !== undefined ? val : (prev) => !prev)
            }
          />
        </div>

        {post.id && <CommentsSection postId={post.id} />}
      </div>
    </div>
  );
}