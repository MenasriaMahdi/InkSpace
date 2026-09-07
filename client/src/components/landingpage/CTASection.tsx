import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Feather, ArrowRight, Github } from "lucide-react";

export default function CTASection() {
  return (
    <footer className="relative border-t border-blue-100 dark:border-slate-800 bg-white dark:bg-[#07090e]">
      {/* Radiant Blue Call to Action Banner */}
      <div className="py-24 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 rounded-3xl p-10 sm:p-16 text-white shadow-2xl shadow-blue-600/30 overflow-hidden"
        >
          {/* Subtle overlay glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-900/30 rounded-full blur-3xl pointer-events-none" />

          <span className="font-mono text-xs uppercase tracking-widest text-sky-200 font-bold block mb-4">
            ✦ Start Writing Today
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Your ideas deserve <br className="hidden sm:block" />
            <span className="italic font-normal text-sky-200">permanent ink</span>.
          </h2>

          <p className="text-blue-100 font-normal text-base sm:text-lg max-w-xl mx-auto mb-10">
            Join thousands of authors sharing engineering deep dives, creative prose, and unique perspectives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-bold text-xs uppercase tracking-wider rounded-full hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-xl hover:-translate-y-0.5"
            >
              Claim Your Space
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>

            <Link
              to="/search"
              className="w-full sm:w-auto px-8 py-4 border-2 border-white/40 text-white font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              Explore Stories
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Links & Colophon */}
      <div className="border-t border-blue-100 dark:border-slate-800 py-12 px-6 bg-slate-50 dark:bg-[#0b0e14]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <Feather className="w-4 h-4" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Ink<span className="text-blue-600 dark:text-blue-400 italic font-normal">Space</span>
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            <Link
              to="/feed"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Explore
            </Link>
            <Link
              to="/login"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Register
            </Link>
            <a
              href="https://github.com/MenasriaMahdi/inkspace"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-4 h-4 text-blue-500" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
