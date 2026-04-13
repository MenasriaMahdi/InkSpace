import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGlobalFeed, getYourFeed } from '../../api/post.api'
import type { Post } from '../../api/post.api'
import PostCard from '../../components/shared/PostCard'

type FeedTab = 'global' | 'following'

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<FeedTab>('global')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['feed', activeTab],
    queryFn: () => activeTab === 'global' ? getGlobalFeed() : getYourFeed(),
  })

  const posts: Post[] = data?.data?.posts ?? []

  console.log(posts)
  return (
    <div className="max-w-2xl mx-auto px-4">

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-800 mb-8">
        {(['global', 'following'] as FeedTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'border-black dark:border-white text-gray-900 dark:text-white'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {tab === 'global' ? 'For You' : 'Following'}
          </button>
        ))}
      </div>

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16 text-sm">
          Failed to load posts. Try again later.
        </p>
      )}

      {/* Empty */}
      {!isLoading && !isError && posts.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-16 text-sm">
          {activeTab === 'following'
            ? 'Follow writers to see their posts here.'
            : 'No posts yet. Be the first to write!'}
        </p>
      )}

      {/* Post list */}
      {!isLoading && !isError && posts.length > 0 && (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

    </div>
  )
}