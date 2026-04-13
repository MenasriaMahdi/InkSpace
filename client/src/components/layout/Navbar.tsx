import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../api/auth.api";
import { useThemeStore } from "../../api/themeStore";
import { useSearchStore } from "../../store/search.store";
import { useSearch } from "../../hooks/usePost";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { query, setQuery } = useSearchStore();
  const navigate = useNavigate();

  const { data, isLoading } = useSearch(query);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/feed"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          InkSpace
        </Link>

        {/* 🔍 SEARCH */}
        <div className="relative flex-1 max-w-md">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-1.5 rounded-full text-sm
              bg-gray-100 dark:bg-gray-800
              text-gray-900 dark:text-white
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2
        text-gray-400 hover:text-gray-700
        dark:text-gray-500 dark:hover:text-gray-300
        transition"
            >
              ✕
            </button>
          )}

          {/* 🔥 DROPDOWN */}
          {query && (
            <div
              className="absolute top-full mt-2 w-full rounded-xl shadow-lg z-50 overflow-hidden
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700"
            >
              {isLoading && (
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Searching...
                </div>
              )}

              {!isLoading && data?.data?.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  No results found
                </div>
              )}

              {data?.data?.slice(0, 5).map((post: any) => (
                <div
                  key={post.id}
                  onClick={() => {
                    navigate(`/posts/${post.slug}`);
                    setQuery("");
                  }}
                  className="px-4 py-2 cursor-pointer transition
                    hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {post.excerpt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* 🌙 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {user ? (
            <>
              <Link
                to="/new-story"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              >
                ✏️ Write
              </Link>

              <Link to={`/u/${user.username}`}>
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
              </Link>

              <button
                onClick={logout}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="text-sm bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
