import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, MessageSquare, Bookmark, Clock, ArrowUpRight } from "lucide-react";

interface StoryPreview {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  likes: number;
  comments: number;
  date: string;
}

const FEATURED_STORIES: StoryPreview[] = [
  {
    id: "1",
    author: {
      name: "Elena Rostova",
      username: "erostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    title: "The Architecture of Solitude: Designing Software for Calm Minds",
    excerpt:
      "Modern interfaces fight relentlessly for our dopamine. What happens when we strip away the noise and engineer tools that honor uninterrupted focus?",
    tag: "Design Philosophy",
    readTime: "6 min read",
    likes: 342,
    comments: 28,
    date: "Sep 2, 2026",
  },
  {
    id: "2",
    author: {
      name: "Marcus Vance",
      username: "marcusv",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    title: "Why We Rewrote Our Relational Queries in Raw PostgreSQL & Prisma",
    excerpt:
      "A deep dive into indexing strategies, query plan inspections, and why type-safety at compile-time transformed our backend throughput.",
    tag: "Engineering",
    readTime: "9 min read",
    likes: 518,
    comments: 44,
    date: "Aug 29, 2026",
  },
  {
    id: "3",
    author: {
      name: "Amina Kourouma",
      username: "aminak",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    title: "The Typography of Memory: How Physical Print Shapes Digital Reading",
    excerpt:
      "Comparing ligature rendering, variable font physics, and the psychological impact of generous line spacing on long-form comprehension.",
    tag: "Craft & Typography",
    readTime: "5 min read",
    likes: 289,
    comments: 19,
    date: "Aug 24, 2026",
  },
];

export default function StoryShowcase() {
  return (
    <section id="stories" className="py-24 px-6 border-t border-b border-blue-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0b0e14]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-3">
              ✦ Featured Articles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Stories crafted for the inquisitive.
            </h2>
          </div>

          <Link
            to="/search"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline self-start md:self-auto group"
          >
            Browse All Topics{" "}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* Stories Grid with Staggered Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_STORIES.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white dark:bg-[#0f172a]/90 border border-blue-100 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-500/15"
            >
              <div>
                {/* Author row */}
                <div className="flex items-center gap-3 mb-5">
                  <img
                    src={story.author.avatar}
                    alt={story.author.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
                  />
                  <div>
                    <div className="font-serif text-sm font-bold text-slate-900 dark:text-white">
                      {story.author.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {story.date}
                    </div>
                  </div>
                </div>

                {/* Tag Badge */}
                <span className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-full mb-4">
                  {story.tag}
                </span>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed line-clamp-3 mb-6">
                  {story.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>{story.readTime}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                    {story.likes}
                  </span>
                  <span className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                    {story.comments}
                  </span>
                  <Bookmark className="w-3.5 h-3.5 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
