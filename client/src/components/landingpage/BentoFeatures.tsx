import { motion } from "framer-motion";
import {
  PenTool,
  Users,
  MessageSquare,
  Compass,
  CheckCircle2,
  Code2,
  Quote,
} from "lucide-react";

export default function BentoFeatures() {
  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
      {/* Header with Scroll Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-3">
          ✦ Thoughtfully Engineered
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
          Tools designed to honor the craft of writing.
        </h2>
        <p className="text-slate-600 dark:text-slate-300 font-normal text-base sm:text-lg">
          Every interaction in InkSpace has been refined to eliminate friction
          between your thoughts and your readers.
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Card 1: TipTap Editor Preview (Large 8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="md:col-span-8 bg-white dark:bg-[#0f172a]/90 border border-blue-100 dark:border-slate-800 rounded-3xl p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between group hover:border-blue-500 shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                <PenTool className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 rounded-full border border-blue-200 dark:border-blue-900/60">
                TipTap Engine
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Artisanal Rich Text &amp; Markdown Editing
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mb-8">
              Write with instant Markdown shortcuts, syntax-highlighted code
              blocks, blockquotes, and zero UI clutter. Drafts auto-save seamlessly.
            </p>
          </div>

          {/* Editor Toolbar & Canvas Mockup */}
          <div className="rounded-2xl border border-blue-100 dark:border-slate-800 bg-slate-50 dark:bg-[#07090e] p-4 sm:p-6 font-serif shadow-inner">
            <div className="flex items-center gap-3 pb-3 mb-4 border-b border-blue-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="font-bold text-blue-600 dark:text-blue-400">B</span>
              <span className="italic">I</span>
              <span className="underline">U</span>
              <span className="w-px h-3 bg-slate-300 dark:bg-slate-700" />
              <Quote className="w-3.5 h-3.5 text-blue-500" />
              <Code2 className="w-3.5 h-3.5 text-blue-500" />
              <div className="ml-auto text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Auto-saved
              </div>
            </div>
            <div className="text-sm sm:text-base font-normal text-slate-800 dark:text-slate-200 italic border-l-4 border-blue-600 dark:border-blue-500 pl-4 py-1">
              "Words are, in my not-so-humble opinion, our most inexhaustible
              source of magic."
            </div>
          </div>
        </motion.div>

        {/* Card 2: Community & Followers (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="md:col-span-4 bg-white dark:bg-[#0f172a]/90 border border-blue-100 dark:border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between group hover:border-blue-500 shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-inner">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Direct Audience Connection
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6">
              Cultivate an engaged readership. Followers receive stories
              instantly in their feed without algorithmic gatekeeping.
            </p>
          </div>

          {/* Follow Mockup */}
          <div className="p-4 border border-blue-100 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-[#07090e] flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-600/30">
                M
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900 dark:text-white">mahdi</div>
                <div className="text-slate-500 dark:text-slate-400 font-medium">Author</div>
              </div>
            </div>
            <span className="text-xs font-semibold tracking-wider px-3.5 py-1.5 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-sm">
              Following
            </span>
          </div>
        </motion.div>

        {/* Card 3: Nested Discourse (4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-4 bg-white dark:bg-[#0f172a]/90 border border-blue-100 dark:border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between group hover:border-blue-500 shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 shadow-inner">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Threaded Conversations
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6">
              Engage through nested discussion trees. Constructive feedback turns posts into thriving intellectual exchanges.
            </p>
          </div>

          <div className="text-xs font-medium text-slate-600 dark:text-slate-300 space-y-2 border-l-2 border-blue-500 pl-4 py-1">
            <div className="text-blue-700 dark:text-blue-400 font-semibold">↳ @sarah: Fascinating breakdown!</div>
            <div className="pl-3 text-slate-500 dark:text-slate-400">↳ @author: Thanks for the insights.</div>
          </div>
        </motion.div>

        {/* Card 4: Curated Topics & Tags (8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="md:col-span-8 bg-white dark:bg-[#0f172a]/90 border border-blue-100 dark:border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col justify-between group hover:border-blue-500 shadow-md hover:shadow-xl hover:shadow-blue-500/10 transition-all"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                <Compass className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 rounded-full border border-blue-200 dark:border-blue-900/60">
                Discovery
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Curated Topics &amp; Smart Tagging
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mb-6">
              Every story is indexed by topic tags and full-text search, ensuring maximum discoverability for every discipline.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-4 border-t border-blue-100 dark:border-slate-800">
            {[
              "Engineering",
              "TypeScript",
              "System Design",
              "Typography",
              "Creative Writing",
              "Philosophy",
              "PostgreSQL",
              "Open Source",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all cursor-pointer shadow-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
