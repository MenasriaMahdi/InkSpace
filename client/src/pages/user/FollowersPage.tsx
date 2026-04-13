import { useParams, Link } from 'react-router-dom'
import { useFollowers } from '../../hooks/useUser'
import { getAvatar } from '../../lib/utils'

export default function FollowersPage() {
  const { username } = useParams<{ username: string }>()
  const { data, isLoading } = useFollowers(username || '')

  // API returns { followers: [...] }
  const followers = data?.followers ?? []

  if (isLoading) return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400 dark:text-gray-500">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to={`/u/${username}`}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            ← {username}
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Followers
          </h1>
        </div>

        {/* List */}
        {followers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No followers yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {followers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 py-4">
                <img
                  src={getAvatar(user.avatar, user.username)}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <Link
                    to={`/u/${user.username}`}
                    className="font-medium text-gray-900 dark:text-white hover:underline block truncate"
                  >
                    {user.username}
                  </Link>
                  {user.bio && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}