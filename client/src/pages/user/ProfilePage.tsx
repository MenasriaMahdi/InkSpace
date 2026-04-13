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
  ChevronLeft,
  ChevronRight,
  FileText,
  Plus,
  User,
} from "lucide-react";

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
  console.log(currentUser)
  console.log(postsData)
  console.log(meta)
  // ─── Invalid URL ───────────────────────────────────────
  if (!username) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Invalid Profile URL
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The profile URL you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // ─── Loading ───────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-8"></div>
            <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 md:-mt-20 mb-8">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-950 shadow-lg"></div>
                <div className="space-y-3">
                  <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 md:mt-0"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 max-w-md mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-1"></div>
                  <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Error ─────────────────────────────────────────────
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't load this profile. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // ─── Not found ─────────────────────────────────────────
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            User not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This user doesn't exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  // ─── Main page ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Cover Image */}
        <div className="relative mb-8">
          <div className="h-48 rounded-2xl overflow-hidden">
            {profile.coverImage ? (
              <img
                src={profile.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-700 dark:to-gray-900"></div>
            )}
          </div>
        </div>

        {/* Profile Header */}
        <div className="relative -mt-16 md:-mt-20 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div className="flex flex-col md:flex-row md:items-end gap-6">

              {/* Avatar */}
              <div className="relative">
                <img
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-950 shadow-lg"
                  src={getAvatar(profile.avatar, username)}
                  alt={username}
                />
                {isOwnProfile && (
                  <button className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                )}
              </div>

              {/* User Info */}
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {profile.username}
                  </h1>
                  {profile.isVerified && (
                    <div className="bg-blue-500 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                {profile.bio && (
                  <p className="text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed mb-3">
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 md:mt-0">
              {isOwnProfile ? (
                <Link
                  to="/settings"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
                >
                  <Settings className="w-4 h-4" />
                  Edit profile
                </Link>
              ) : currentUser ? (
                <button
                  onClick={() => follow()}
                  disabled={isPending}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all shadow-sm ${
                    isFollowing
                      ? "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                      : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
                  }`}
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : isFollowing ? (
                    <><UserCheck className="w-4 h-4" />Following</>
                  ) : (
                    <><UserPlus className="w-4 h-4" />Follow</>
                  )}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 dark:bg-white px-6 py-2.5 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all shadow-md"
                >
                  <LogIn className="w-4 h-4" />
                  Login to follow
                </Link>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile._count?.posts ?? 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
            </div>
            <Link to={`/u/${username}/followers`} className="text-center hover:opacity-80 transition-opacity">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile._count?.followers ?? 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
            </Link>
            <Link to={`/u/${username}/following`} className="text-center hover:opacity-80 transition-opacity">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile._count?.following ?? 0}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
            </Link>
          </div>
        </div>

        {/* Posts Section */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Posts
              </h2>
              {meta && (
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                  {meta.total}
                </span>
              )}
            </div>

            {meta && meta.totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {meta.page} of {meta.totalPages}
                </span>
                <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Empty state */}
          {posts.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {isOwnProfile
                  ? "You haven't created any posts yet. Share your first post!"
                  : `${profile.username} hasn't posted anything yet.`}
              </p>
              {isOwnProfile && (
                <Link
                  to="/new-story"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 dark:bg-white px-6 py-2.5 text-sm font-semibold text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Create your first post
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}