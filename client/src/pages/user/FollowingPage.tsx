import { useParams, Link } from 'react-router-dom'
import { useFollowing } from '../../hooks/useUser'
import { getAvatar } from '../../lib/utils'
import { ArrowUpRight, Users, Search, Check } from 'lucide-react'
import type { User } from '../../api/user.api'

export default function FollowingPage() {
  const { username } = useParams<{ username: string }>()
  const { data, isLoading } = useFollowing(username || '')

  const following: User[] = data?.following ?? []

  if (isLoading) return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#e5e7eb] dark:border-[#1a1a1a] border-t-[#1a1a1a] dark:border-t-white animate-spin"></div>
        <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">Loading...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ─── Header ─────────────────────────────────────────── */}
        <div className="mb-8">
          <Link
            to={`/u/${username}`}
            className="inline-flex items-center gap-2 text-sm text-[#6b7280] dark:text-[#9ca3af] hover:text-[#1a1a1a] dark:hover:text-white transition-colors mb-4"
          >
            ← Back to @{username}
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] dark:text-white tracking-tight">
                Following
              </h1>
              <p className="text-[#6b7280] dark:text-[#9ca3af] mt-1">
                {following.length} {following.length === 1 ? 'person' : 'people'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-[#f3f4f6] dark:hover:bg-[#1a1a1a] transition-colors">
                <Search className="w-5 h-5 text-[#6b7280] dark:text-[#9ca3af]" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Empty State ───────────────────────────────────── */}
        {following.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-[#f3f4f6] dark:bg-[#1a1a1a] flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-[#6b7280] dark:text-[#9ca3af]" />
            </div>
            <h3 className="text-xl font-medium text-[#1a1a1a] dark:text-white mb-2">
              Not following anyone yet
            </h3>
            <p className="text-[#6b7280] dark:text-[#9ca3af] max-w-sm">
              @{username} hasn't followed anyone. Check back later!
            </p>
          </div>
        ) : (
          /* ─── Following Grid ───────────────────────────────── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {following.map((user) => (
              <Link
                key={user.id}
                to={`/u/${user.username}`}
                className="group flex flex-col items-center p-6 rounded-2xl bg-[#f9fafb] dark:bg-[#111111] hover:bg-[#f3f4f6] dark:hover:bg-[#1a1a1a] transition-all duration-200 border border-transparent hover:border-[#e5e7eb] dark:hover:border-[#2a2a2a]"
              >
                <div className="relative">
                  <img
                    src={getAvatar(user.avatar, user.username)}
                    alt={user.username}
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-white dark:ring-[#0a0a0a] shadow-sm"
                  />
                  {user.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 ring-2 ring-white dark:ring-[#0a0a0a]">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center min-w-0">
                  <div className="font-semibold text-[#1a1a1a] dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {user.username}
                  </div>
                  {user.bio && (
                    <p className="text-sm text-[#6b7280] dark:text-[#9ca3af] truncate mt-0.5 max-w-[140px] mx-auto">
                      {user.bio}
                    </p>
                  )}
                  {user._count && user._count.followers !== undefined && user._count.followers > 0 && (
                    <div className="mt-2 text-xs text-[#9ca3af] dark:text-[#6b7280]">
                      {user._count.followers} follower{user._count.followers !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                    View Profile <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ─── Footer ────────────────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-[#f3f4f6] dark:border-[#1a1a1a] flex items-center justify-between">
          <Link
            to={`/u/${username}/followers`}
            className="text-sm text-[#6b7280] dark:text-[#9ca3af] hover:text-[#1a1a1a] dark:hover:text-white transition-colors"
          >
            ← Followers
          </Link>
          <Link
            to={`/u/${username}`}
            className="text-sm font-medium text-[#1a1a1a] dark:text-white hover:opacity-70 transition-opacity"
          >
            Profile →
          </Link>
        </div>

      </div>
    </div>
  )
}