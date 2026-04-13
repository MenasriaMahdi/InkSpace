import { useSearchStore } from "../../store/search.store"
import { useSearch } from "../../hooks/usePost"
import PostCard from "../../components/shared/PostCard"
import { useState } from "react"

export default function SearchPage() {
  const { query, setQuery } = useSearchStore() // 👈 FIX
  const [page, setPage] = useState(1)

  const { data, isLoading } = useSearch(query, page)

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">

      {/* 🔍 INPUT FIX */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="w-full px-4 py-2 border rounded 
          bg-white dark:bg-gray-900 
          text-gray-900 dark:text-white"
      />

      {!query && (
        <p className="text-gray-500 dark:text-gray-400">
          Start typing to search...
        </p>
      )}

      {isLoading && query && (
        <p className="text-gray-500 dark:text-gray-400">
          Searching...
        </p>
      )}

      {query && (
        <>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Results for "{query}"
          </h2>

          {data?.data?.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              No results found.
            </p>
          )}

          {data?.data?.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}

          {/* Pagination */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>

            <span>Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}