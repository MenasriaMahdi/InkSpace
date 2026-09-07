import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { getGlobalFeed, getYourFeed } from '../../api/post.api'
import type { Post } from '../../api/post.api'
import PostCard from '../../components/shared/PostCard'
import { Compass, Users, Sparkles, PenTool, ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

type FeedTab = 'global' | 'following'

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<FeedTab>('global')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['feed', activeTab],
    queryFn: () => activeTab === 'global' ? getGlobalFeed() : getYourFeed(),
  })

  const posts: Post[] = data?.data?.posts ?? []

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-2">

      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between pb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:text-[#1a62ea] dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#1a62ea]" />
          Back to Landing Page
        </Link>
        
        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          Home Overview
        </Link>
      </div>

      {/* Feed Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-300/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1a62ea] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Reading
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Where thoughts take shape.
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-normal">
            Discover articles, engineering essays, and independent perspectives.
          </p>
        </div>

        <Link
          to="/new-story"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1a62ea] hover:bg-[#1553c9] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-600/20 hover:-translate-y-0.5 transition-all w-fit"
        >
          <PenTool className="w-3.5 h-3.5" />
          Write Story
        </Link>
      </div>

      {/* Feed Filter Tabs */}
      <div className="flex items-center gap-2 bg-slate-200/50 dark:bg-slate-900/60 p-1.5 rounded-2xl w-fit border border-slate-300/50 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('global')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
            activeTab === 'global'
              ? 'bg-white dark:bg-[#121620] text-slate-900 dark:text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4 text-[#1a62ea]" />
          For You
        </button>

        <button
          onClick={() => setActiveTab('following')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
            activeTab === 'following'
              ? 'bg-white dark:bg-[#121620] text-slate-900 dark:text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-[#1a62ea]" />
          Following
        </button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-[#0d111a]/80 p-7 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-2 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              </div>
              <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error View */}
      {isError && (
        <div className="bg-white/80 dark:bg-[#0d111a]/80 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Failed to load stories right now. Please try again later.
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && posts.length === 0 && (
        <div className="bg-white/80 dark:bg-[#0d111a]/80 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#1a62ea] flex items-center justify-center mx-auto">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
            {activeTab === 'following' ? 'No stories from people you follow' : 'No published stories yet'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
            {activeTab === 'following'
              ? 'Explore the "For You" tab or search for authors to follow.'
              : 'Be the pioneer to write and share your first story on InkSpace!'}
          </p>
          <Link
            to="/new-story"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1a62ea] text-white text-xs font-bold uppercase tracking-wider"
          >
            Start Writing Free
          </Link>
        </div>
      )}

      {/* Published Stories List */}
      {!isLoading && !isError && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </motion.div>
      )}

    </div>
  )
}