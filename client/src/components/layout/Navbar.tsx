import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../api/auth.api";
import { useThemeStore } from "../../api/themeStore";
import { useSearchStore } from "../../store/search.store";
import { useSearch } from "../../hooks/usePost";
import {
  Feather,
  Search,
  PenTool,
  Sun,
  Moon,
  X,
  LogOut,
  Sparkles,
  Menu,
  Home,
  User,
  Settings,
  Compass,
  ChevronRight,
} from "lucide-react";
import { getAvatar } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { query, setQuery } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { data, isLoading } = useSearch(query);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#f7f4ee]/90 dark:bg-[#07090e]/90 backdrop-blur-md border-b border-slate-300/60 dark:border-slate-800/80 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2.5 group flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-[#1a62ea] flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <Feather className="w-4 h-4" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Ink<span className="text-[#1a62ea] italic font-normal">Space</span>
            </span>
          </Link>

          {/* 🔍 DESKTOP SEARCH BAR */}
          <div className="relative flex-1 max-w-md mx-2 hidden md:block">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stories, authors, tags..."
                className="w-full pl-10 pr-9 py-2 rounded-full text-xs sm:text-sm font-medium
                  bg-white/70 dark:bg-slate-900/70
                  border border-slate-300/70 dark:border-slate-800
                  text-slate-900 dark:text-slate-100
                  placeholder-slate-400 dark:placeholder-slate-500
                  focus:outline-none focus:ring-2 focus:ring-[#1a62ea]/50 focus:border-[#1a62ea] transition"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 🔥 SEARCH DROPDOWN */}
            {query && (
              <div
                className="absolute top-full mt-2 w-full rounded-2xl shadow-2xl z-50 overflow-hidden
                bg-white/95 dark:bg-[#0d1017]/95 backdrop-blur-md
                border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/60"
              >
                {isLoading && (
                  <div className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    Searching stories...
                  </div>
                )}

                {!isLoading && data?.data?.length === 0 && (
                  <div className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                    No matching stories found
                  </div>
                )}

                {data?.data?.slice(0, 5).map((post: any) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      navigate(`/posts/${post.slug}`);
                      setQuery("");
                    }}
                    className="px-4 py-3 cursor-pointer transition hover:bg-slate-100/70 dark:hover:bg-slate-800/60 group/searchitem"
                  >
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 group-hover/searchitem:text-[#1a62ea]">
                      {post.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {post.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP RIGHT NAV */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              title="Go to Landing Page"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#1a62ea] dark:hover:text-blue-400 bg-slate-200/50 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1a62ea]" />
              <span>Landing</span>
            </Link>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {user ? (
              <>
                <Link
                  to="/new-story"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a62ea] hover:bg-[#1553c9] text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-600/20 hover:-translate-y-0.5 transition-all"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  Write
                </Link>

                <Link to={`/u/${user.username}`} className="flex-shrink-0 group/avatar">
                  <img
                    src={getAvatar(user.avatar, user.username)}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-300 dark:ring-slate-700 group-hover/avatar:ring-[#1a62ea] transition"
                  />
                </Link>

                <button
                  onClick={logout}
                  title="Sign out"
                  className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 transition"
                >
                  Sign in
                </Link>

                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full bg-[#1a62ea] hover:bg-[#1553c9] text-white font-semibold text-xs tracking-wide shadow-md shadow-blue-600/20 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* MOBILE NAVIGATION CONTROLS */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-200/50 dark:bg-slate-800/60"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open mobile menu"
              className="p-2.5 rounded-xl bg-[#1a62ea] text-white shadow-md shadow-blue-600/20"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* MOBILE SEARCH EXPANDABLE INPUT */}
        {mobileSearchOpen && (
          <div className="md:hidden px-4 pb-3 pt-1 border-t border-slate-200 dark:border-slate-800">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search InkSpace..."
                autoFocus
                className="w-full pl-10 pr-9 py-2 rounded-full text-xs font-medium bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Search Results */}
            {query && data?.data && (
              <div className="mt-2 rounded-2xl bg-white dark:bg-[#0d1017] border border-slate-200 dark:border-slate-800 p-2 divide-y divide-slate-100 dark:divide-slate-800">
                {data.data.slice(0, 4).map((post: any) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      navigate(`/posts/${post.slug}`);
                      closeMobileMenu();
                    }}
                    className="py-2 px-3 text-xs font-medium text-slate-900 dark:text-white line-clamp-1"
                  >
                    {post.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* MOBILE SIDEBAR OVERLAY & DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Slide-over Mobile Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-[#f7f4ee] dark:bg-[#0d1017] text-slate-900 dark:text-slate-100 z-50 p-6 flex flex-col justify-between shadow-2xl border-l border-slate-300 dark:border-slate-800 md:hidden overflow-y-auto"
            >
              <div className="space-y-6">
                
                {/* Mobile Drawer Top Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-300/60 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#1a62ea] flex items-center justify-center text-white">
                      <Feather className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                      Ink<span className="text-[#1a62ea] italic font-normal">Space</span>
                    </span>
                  </div>

                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-full bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* User Card inside Drawer */}
                {user ? (
                  <div className="bg-white/80 dark:bg-[#131824] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <img
                      src={getAvatar(user.avatar, user.username)}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#1a62ea]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {user.username}
                      </div>
                      <div className="text-xs text-slate-500 font-mono truncate">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/80 dark:bg-[#131824] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
                    <p className="text-xs text-slate-500">Join InkSpace to write & follow authors.</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        onClick={closeMobileMenu}
                        className="py-2 text-center text-xs font-bold border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeMobileMenu}
                        className="py-2 text-center text-xs font-bold bg-[#1a62ea] text-white rounded-xl"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                )}

                {/* Mobile Drawer Menu Links */}
                <div className="space-y-1 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold px-3 mb-2">
                    Navigation
                  </div>

                  <Link
                    to="/feed"
                    onClick={closeMobileMenu}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition ${
                      location.pathname === "/feed"
                        ? "bg-[#1a62ea] text-white"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Compass className="w-4 h-4" />
                      Feed
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  {user && (
                    <Link
                      to="/new-story"
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition ${
                        location.pathname === "/new-story"
                          ? "bg-[#1a62ea] text-white"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <PenTool className="w-4 h-4" />
                        Write Story
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  )}

                  {user && (
                    <Link
                      to={`/u/${user.username}`}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
                    >
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4" />
                        My Profile
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  )}

                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
                  >
                    <div className="flex items-center gap-3">
                      <Home className="w-4 h-4 text-[#1a62ea]" />
                      Landing Page
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>

                  {user && (
                    <Link
                      to="/settings"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
                    >
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4" />
                        Settings
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  )}
                </div>

              </div>

              {/* Drawer Bottom Controls */}
              <div className="pt-6 border-t border-slate-300/60 dark:border-slate-800 space-y-3">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-white/80 dark:bg-[#131824] border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-slate-400">{theme}</span>
                </button>

                {user && (
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
