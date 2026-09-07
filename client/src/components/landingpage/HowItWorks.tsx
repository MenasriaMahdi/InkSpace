import { motion } from "framer-motion";
import { FileEdit, Send, TrendingUp, Sparkles } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Draft in Flow",
    description:
      "Open our distraction-free TipTap editor. Write with instantaneous Markdown, syntax-highlighted snippets, and continuous auto-save.",
    icon: FileEdit,
  },
  {
    step: "02",
    title: "Tag & Curate",
    description:
      "Select your cover image, refine your excerpt, and assign topic tags to position your story in front of the right readers.",
    icon: Send,
  },
  {
    step: "03",
    title: "Connect & Grow",
    description:
      "Deliver your thinking directly to followers, receive threaded comments, and build an intellectual following that stays with you.",
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 px-6 border-t border-blue-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0b0e14]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-3">
            ✦ The Publishing Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            From raw thought to published prose.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-normal text-base sm:text-lg">
            A frictionless path designed to get out of your way and let your words shine.
          </p>
        </motion.div>

        {/* Step Cards with Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -6 }}
                className="relative bg-white dark:bg-[#0f172a]/90 border border-blue-100 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant &amp; Seamless</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
