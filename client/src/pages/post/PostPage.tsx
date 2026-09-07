import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Pencil, Trash2, ArrowLeft, Clock, Feather } from "lucide-react";
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
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <div className="w-8 h-8 border-3 border-[#1a62ea] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-mono text-slate-500">Loading story...</p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="max-w-md mx-auto py-16 text-center bg-white/90 dark:bg-[#0d1017]/90 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
        <Feather className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Story Not Found
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          This story may have been deleted or moved.
        </p>
        <Link
          to="/feed"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1a62ea] text-white text-xs font-bold uppercase tracking-wider"
        >
          Back to feed
        </Link>
      </div>
    );

  const isAuthor = user?.id === post.author?.id;
  const publishedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/feed"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#1a62ea]" />
          Back to stories
        </Link>

        {isAuthor && (
          <div className="flex items-center gap-2">
            <Link
              to={`/posts/${post.id}/edit`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Delete confirmation banner */}
      {showConfirm && (
        <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/60 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
            Are you sure you want to delete this story? This action cannot be undone.
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => deletePost(post.id)}
              disabled={isDeleting}
              className="rounded-full bg-rose-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-rose-700 disabled:opacity-50 transition-colors"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Manuscript Floating Card Container */}
      <article className="bg-white/95 dark:bg-[#0d1017]/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        {/* Author Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <Link to={`/u/${post.author?.username}`}>
            <img
              src={getAvatar(post.author?.avatar, post.author?.username)}
              alt={post.author?.username}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700 shadow-sm"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              to={`/u/${post.author?.username}`}
              className="font-bold text-slate-900 dark:text-white hover:text-[#1a62ea] transition-colors block truncate"
            >
              {post.author?.username}
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              <Clock className="w-3 h-3 text-[#1a62ea]" />
              <span>Published {publishedDate}</span>
            </div>
          </div>
        </div>

        {/* Story Title */}
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
          {post.title}
        </h1>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Story Body Content */}
        <div
          className="font-serif text-lg leading-relaxed text-slate-800 dark:text-slate-200 prose prose-slate dark:prose-invert max-w-none border-t border-slate-100 dark:border-slate-800 pt-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Story Actions (Likes & Saves) */}
        <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
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
      </article>

      {/* Comments Container */}
      {post.id && (
        <div className="bg-white/95 dark:bg-[#0d1017]/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
          <CommentsSection postId={post.id} />
        </div>
      )}
    </div>
  );
}