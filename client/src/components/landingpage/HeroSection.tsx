import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  PenTool,
  FileText,
  Zap,
  BarChart3,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image,
  Code,
  Feather,
  ChevronDown,
  ArrowDown,
  Mountain,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-6 lg:px-12 bg-[#f7f4ee] dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-hidden">
      
      {/* Decorative Left Boundary Line */}
      <div className="absolute top-0 bottom-0 left-6 sm:left-12 w-px bg-slate-300/40 dark:bg-slate-800 pointer-events-none hidden sm:block" />
      <div className="absolute top-0 bottom-0 right-6 sm:right-12 w-px bg-slate-300/40 dark:bg-slate-800 pointer-events-none hidden sm:block" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center flex-1 my-auto py-6">
        
        {/* LEFT COLUMN: Editorial Copy & Actions (6 Cols) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-6 flex flex-col items-start text-left pt-2"
        >
          {/* Header Sub-tag */}
          <div className="flex items-center gap-4 mb-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-600 dark:text-slate-400 font-bold leading-tight">
              INDEPENDENT PUBLISHING <br /> FOR CURIOUS MINDS
            </div>
            <div className="w-16 h-px bg-slate-400/60 dark:bg-slate-700" />
          </div>

          {/* Main Serif Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-6">
            Where thoughts <br />
            turn into <br />
            <span className="text-[#1a62ea] dark:text-blue-400 italic font-normal">
              lasting stories.
            </span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal max-w-xl leading-relaxed mb-8">
            InkSpace is a minimal, powerful publishing platform designed for engineers, authors, and independent thinkers. Write freely, publish without paywalls, and build a lasting readership.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <Link
              to="/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1a62ea] hover:bg-[#1553c9] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <PenTool className="w-4 h-4" />
              START WRITING FREE
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/feed"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-[#1a62ea] dark:text-blue-400" />
              EXPLORE STORIES
            </Link>
          </div>

          {/* Bottom Metrics Bar (3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-300/70 dark:border-slate-800 w-full text-left">
            {/* Col 1 */}
            <div className="sm:border-r sm:border-slate-300/70 dark:sm:border-slate-800 sm:pr-4">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-[#1a62ea] dark:text-blue-400" />
                <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">100%</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1">
                ZERO PAYWALLS
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                Write and publish freely. Your ideas, always yours.
              </p>
            </div>

            {/* Col 2 */}
            <div className="sm:border-r sm:border-slate-300/70 dark:sm:border-slate-800 sm:pr-4">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-[#1a62ea] dark:text-blue-400" />
                <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">TipTap</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1">
                MARKDOWN NATIVE
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                A modern, flexible editor built for writers.
              </p>
            </div>

            {/* Col 3 */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-[#1a62ea] dark:text-blue-400" />
                <span className="font-serif text-lg font-bold text-slate-900 dark:text-white">PERN</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1">
                HIGH THROUGHPUT
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                A solid foundation for the next generation of creators.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Desk Composition with Tablet, Polaroid & Notebook (6 Cols) */}
        <motion.div 
          initial={{ opacity: 0, y: 30, rotate: 1 }}
          animate={{ opacity: 1, y: 0, rotate: 1.5 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-6 relative flex items-center justify-center py-10 sm:py-16 px-4"
        >
          {/* 1. Polaroid Photograph Card (Extends Left - Always White Frame for Contrast) */}
          <div className="absolute -left-6 sm:-left-12 top-4 sm:top-6 -rotate-12 w-48 sm:w-56 bg-white p-3.5 shadow-2xl rounded-sm border-2 border-amber-100/60 pointer-events-none z-0 transition-transform duration-300 hover:-rotate-6">
            <div className="relative w-full h-32 sm:h-36 overflow-hidden rounded-xs bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80"
                alt="Mountain landscape"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if network image fails
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-2">
                <Mountain className="w-5 h-5 text-white/80" />
              </div>
            </div>
            <div className="font-serif text-xs font-bold italic text-slate-800 text-center mt-3 tracking-wide">
              Ideas deserve a home.
            </div>
          </div>

          {/* 2. Leather Notebook & Pen (Extends Bottom Right - Glowing Gold/Dark Contrast) */}
          <div className="absolute -right-6 sm:-right-10 -bottom-4 sm:-bottom-6 rotate-12 w-56 sm:w-64 bg-[#181a20] text-slate-200 p-5 rounded-2xl shadow-2xl border border-amber-500/30 pointer-events-none z-0">
            <div className="font-serif text-xs text-amber-300/90 font-bold uppercase tracking-widest mb-10 leading-relaxed">
              Better Ideas <br />
              <span className="text-white">Brighter People</span>
            </div>
            <div className="font-serif italic text-xs text-slate-400 text-right flex items-center justify-end gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400/80 inline-block" />
              InkSpace Edition
            </div>
          </div>

          {/* 3. Decorative Cursive Handwritten Script (Top Right Margin) */}
          <div className="hidden sm:block absolute -right-2 sm:right-4 top-2 rotate-[15deg] font-serif italic text-slate-500/70 dark:text-slate-400/80 text-xl font-semibold tracking-wider space-y-1 pointer-events-none select-none z-0">
            <div>Write</div>
            <div>Share</div>
            <div>Inspire</div>
          </div>

          {/* 4. Main White TipTap Tablet Window (On Top - Crisp Dark Mode Contrast) */}
          <div className="w-full max-w-xl bg-slate-100 dark:bg-[#161c28] p-3 sm:p-4 rounded-[2.2rem] shadow-2xl shadow-slate-900/30 border border-slate-300 dark:border-slate-700/80 relative z-10 transition-transform duration-300 hover:rotate-0">
            
            {/* Inner Tablet Frame */}
            <div className="bg-white dark:bg-[#0b0e14] rounded-[1.6rem] p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-inner">
              
              {/* Tablet App Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#1a62ea] flex items-center justify-center text-white shadow-sm">
                    <Feather className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-serif text-base font-bold text-slate-900 dark:text-white">
                    Ink<span className="text-[#1a62ea] italic font-normal">Space</span>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Draft saved
                  </div>
                  <button className="bg-[#1a62ea] hover:bg-[#1553c9] text-white font-semibold text-xs px-4 py-1.5 rounded-lg shadow-sm">
                    Publish
                  </button>
                </div>
              </div>

              {/* TipTap Rich Editor Toolbar */}
              <div className="flex flex-wrap items-center gap-3 pb-3 mb-5 border-b border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer">
                  <span>Paragraph</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <span className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                <button className="hover:text-slate-900 dark:hover:text-white font-bold">B</button>
                <button className="hover:text-slate-900 dark:hover:text-white italic">I</button>
                <button className="hover:text-slate-900 dark:hover:text-white underline">U</button>
                <span className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                <button className="hover:text-slate-900 dark:hover:text-white"><List className="w-3.5 h-3.5" /></button>
                <button className="hover:text-slate-900 dark:hover:text-white"><ListOrdered className="w-3.5 h-3.5" /></button>
                <button className="hover:text-slate-900 dark:hover:text-white"><Quote className="w-3.5 h-3.5" /></button>
                <button className="hover:text-slate-900 dark:hover:text-white"><Link2 className="w-3.5 h-3.5" /></button>
                <button className="hover:text-slate-900 dark:hover:text-white"><Image className="w-3.5 h-3.5" /></button>
                <button className="hover:text-slate-900 dark:hover:text-white"><Code className="w-3.5 h-3.5" /></button>
              </div>

              {/* TipTap Editor Document Body */}
              <div className="space-y-3 font-serif min-h-[160px]">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                  The things we build when nobody is watching.
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                  Progress isn't always loud. Sometimes, it's a quiet commitment — a series of small builds, late nights, and ideas that might never go viral. But they shape who we are.
                </p>
                <div className="inline-block w-0.5 h-5 bg-blue-600 animate-pulse" />
              </div>

              {/* Tablet Document Footer Status */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <div>Markdown · 428 words · 6 min read</div>
                <div className="font-serif italic text-slate-500 dark:text-slate-400">Write · Share · Inspire</div>
              </div>

            </div>
          </div>

        </motion.div>

      </div>

      {/* Bottom Colophon Rules */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-slate-300/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-500 uppercase">
        <div className="flex items-center gap-2">
          <span className="w-6 h-px bg-slate-400/60 dark:bg-slate-700" />
          BUILT BY WRITERS, FOR WRITERS.
          <span className="w-6 h-px bg-slate-400/60 dark:bg-slate-700" />
        </div>
        <div className="flex items-center gap-1 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer">
          SCROLL TO EXPLORE <ArrowDown className="w-3 h-3" />
        </div>
      </div>

    </section>
  );
}
