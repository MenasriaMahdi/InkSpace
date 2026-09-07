import { Link } from "react-router-dom";
import { useAuthStore } from "../../api/auth.api";
import { useThemeStore } from "../../api/themeStore";
import { Feather, ArrowRight, PenLine, Sun, Moon } from "lucide-react";

export default function LandingNavbar() {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#f7f4ee]/90 dark:bg-[#07090e]/90 border-b border-[#e5e0d8] dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 h-18 flex items-center justify-between">
        {/* Iconic Blue Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-95"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1a62ea] flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:rotate-6 transition-transform">
            <Feather className="w-5 h-5" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Ink<span className="text-[#1a62ea] dark:text-blue-400 italic font-normal">Space</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300">
          <a
            href="#features"
            className="hover:text-[#1a62ea] dark:hover:text-blue-400 transition-colors"
          >
            Features
          </a>
          <a
            href="#stories"
            className="hover:text-[#1a62ea] dark:hover:text-blue-400 transition-colors"
          >
            Read
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#1a62ea] dark:hover:text-blue-400 transition-colors"
          >
            Workflow
          </a>
          <Link
            to="/feed"
            className="hover:text-[#1a62ea] dark:hover:text-blue-400 transition-colors"
          >
            Explore
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full text-slate-700 dark:text-slate-300 hover:text-[#1a62ea] dark:hover:text-blue-400 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/new-story"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <PenLine className="w-3.5 h-3.5" />
                Write
              </Link>
              <Link
                to="/feed"
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#1a62ea] text-white rounded-full hover:bg-[#1553c9] transition-all flex items-center gap-1.5 shadow-md shadow-blue-600/30"
              >
                Feed <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-[#1a62ea] dark:hover:text-blue-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#1a62ea] hover:bg-[#1553c9] text-white rounded-full transition-all flex items-center gap-1 shadow-md shadow-blue-600/30 hover:-translate-y-0.5"
              >
                GET STARTED <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
