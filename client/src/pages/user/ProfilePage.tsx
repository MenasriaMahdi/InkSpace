import { useParams, Link } from "react-router-dom";
import { useProfile, useUserPosts, useToggleFollow } from "../../hooks/useUser";
import { useAuthStore } from "../../api/auth.api";
import PostCard from "../../components/shared/PostCard";
import { getAvatar } from "../../lib/utils";
import {
  Camera,
  Check,
  Settings,
  UserCheck,
  UserPlus,
  LogIn,
  Loader2,
  FileText,
  Plus,
  User,
  ArrowLeft,
  Calendar,
  Sparkles,
  BookOpen,
  Users,
  Feather
} from "lucide-react";
import type { Post } from "../../api/post.api";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser } = useAuthStore();

  const { data: profile, isLoading, isError } = useProfile(username || "");
  const { data: postsData } = useUserPosts(username || "");
  const { mutate: follow, isPending } = useToggleFollow(username || "");

  const posts = postsData?.posts ?? [];
  const meta = postsData?.meta;

  const isOwnProfile = currentUser?.username === username;
  const isFollowing = profile?.isFollowing ?? false;

  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
    : null;

  // Invalid URL
  if (!username) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white/90 dark:bg-[#0d1017]/90 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Profile Not Found
          </h2>
          <p className="text-sm text-slate-500">This user account does not exist.</p>
        </div>
      </div>
    );
  }

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="bg-white/80 dark:bg-[#0d1017]/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-3 flex-1">
              <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-white/90 dark:bg-[#0d1017]/90 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 text-center max-w-md shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Unable to Load Profile
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            We couldn't retrieve the details for @{username}.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-[#1a62ea] text-white rounded-full text-xs font-bold uppercase tracking-wider"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Back Link */}
      <Link
        to="/feed"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#1a62ea]" />
        Back to stories
      </Link>

      {/* Hero Profile Banner Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/95 dark:bg-[#0d1017]/95 backdrop-blur-md rounded-3xl p-5 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
      >
        {/* Subtle background glow effect */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">

          {/* User Avatar */}
          <div className="relative flex-shrink-0">
            <img
              className="w-20 h-20 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white dark:ring-[#0d1017] shadow-xl"
              src={getAvatar(profile.avatar, username)}
              alt={username}
            />
            {profile.isVerified && (
              <div className="absolute top-0 right-0 bg-[#1a62ea] rounded-full p-1 sm:p-1.5 ring-4 ring-white dark:ring-[#0d1017]">
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
            )}
          </div>

          {/* Profile Copy & Meta */}
          <div className="flex-1 text-center sm:text-left space-y-2.5 sm:space-y-3">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {profile.username}
                </h1>
              </div>
              <p className="text-[11px] sm:text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                @{profile.username}
                {memberSince && (
                  <>
                    <span className="mx-1.5 sm:mx-2">·</span>
                    <Calendar className="w-3 h-3 inline mr-1 text-[#1a62ea]" />
                    Writer since {memberSince}
                  </>
                )}
              </p>
            </div>

            {/* Bio text */}
            {profile.bio ? (
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                {profile.bio}
              </p>
            ) : (
              <p className="text-xs italic text-slate-400">Independent writer on InkSpace.</p>
            )}

            {/* Actions (Edit / Follow) */}
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              {isOwnProfile ? (
                <Link
                  to="/settings"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Edit Profile
                </Link>
              ) : currentUser ? (
                <button
                  onClick={() => follow()}
                  disabled={isPending}
                  className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    isFollowing
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
                      : "bg-[#1a62ea] hover:bg-[#1553c9] text-white shadow-md shadow-blue-600/20"
                  }`}
                >
                  {isPending ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : isFollowing ? (
                    <><UserCheck className="w-3.5 h-3.5" /> Following</>
                  ) : (
                    <><UserPlus className="w-3.5 h-3.5" /> Follow Author</>
                  )}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#1a62ea] text-white text-xs font-bold uppercase tracking-wider"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In to Follow
                </Link>
              )}
            </div>

          </div>
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 sm:p-4 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800/60">
            <div className="font-serif text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
              {profile._count?.posts ?? 0}
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-0.5">
              Stories
            </div>
          </div>

          <Link
            to={`/u/${username}/followers`}
            className="bg-slate-50 dark:bg-slate-900/60 p-2.5 sm:p-4 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800/60 hover:border-[#1a62ea]/40 transition group"
          >
            <div className="font-serif text-lg sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#1a62ea] transition-colors">
              {profile._count?.followers ?? 0}
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-0.5">
              Followers
            </div>
          </Link>

          <Link
            to={`/u/${username}/following`}
            className="bg-slate-50 dark:bg-slate-900/60 p-2.5 sm:p-4 rounded-2xl text-center border border-slate-200/60 dark:border-slate-800/60 hover:border-[#1a62ea]/40 transition group"
          >
            <div className="font-serif text-lg sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#1a62ea] transition-colors">
              {profile._count?.following ?? 0}
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-0.5">
              Following
            </div>
          </Link>
        </div>

      </motion.div>

      {/* Published Stories Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-300/60 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#1a62ea]" />
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              Published Stories
            </h2>
            {meta && (
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {meta.total}
              </span>
            )}
          </div>

          {isOwnProfile && (
            <Link
              to="/new-story"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1a62ea] hover:underline"
            >
              <Plus className="w-4 h-4" />
              New Story
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="bg-white/80 dark:bg-[#0d1017]/80 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#1a62ea] flex items-center justify-center mx-auto">
              <Feather className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
              No stories published yet
            </h3>
            <p className="text-sm text-slate-500">
              {isOwnProfile
                ? "Start your writing journey and publish your first story on InkSpace."
                : `@${profile.username} has not published any stories yet.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}