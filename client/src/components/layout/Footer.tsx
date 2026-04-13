import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            InkSpace
          </span>
          <nav className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <Link
              to="/about"
              className="hover:text-gray-900 dark:hover:text-white transition"
            >
              About
            </Link>
            <Link
              to="/terms"
              className="hover:text-gray-900 dark:hover:text-white transition"
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="hover:text-gray-900 dark:hover:text-white transition"
            >
              Privacy
            </Link>
          </nav>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} InkSpace
          </p>
        </div>
      </div>
    </footer>
  );
}
