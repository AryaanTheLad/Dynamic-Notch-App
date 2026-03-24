import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
    {
        id: 'intro',
        title: 'Elevate Your macOS Experience with Dynamic Notch',
        date: 'November 25, 2025',
        readTime: '5 min read',
        excerpt: 'If you\'ve ever envied the iOS Dynamic Island, Dynamic Notch brings that identical, hyper-refined utility straight to your Mac.'
    },
    {
        id: 'why-dynamic-island-mac',
        title: 'Why Your Mac Deserves a Dynamic Island',
        date: 'January 2, 2026',
        readTime: '4 min read',
        excerpt: 'An area the iPhone transformed into an interactive hub was left completely static on macOS—until now.'
    },
    {
        id: 'boost-productivity',
        title: 'How Dynamic Notch Supercharges Productivity',
        date: 'February 15, 2026',
        readTime: '5 min read',
        excerpt: 'Every time you stop writing code just to open Spotify, wait, and hit next—you break your flow state.'
    },
    {
        id: 'minimalist-setup',
        title: 'Dynamic Notch and the Minimalist Desk Setup',
        date: 'February 28, 2026',
        readTime: '4 min read',
        excerpt: 'True aesthetic equilibrium requires digital minimalism. Declutter your menu bar and your desktop.'
    },
    {
        id: 'notch-customization',
        title: 'How Much Can You Customize the macOS Notch?',
        date: 'March 1, 2026',
        readTime: '4 min read',
        excerpt: 'With Dynamic Notch, the static bezel isn\'t just utilized—it is deeply customizable to fit any personal aesthetic.'
    },
    {
        id: 'battery-efficiency',
        title: 'Does Dynamic Notch Affect Your MacBook Battery Life?',
        date: 'March 20, 2026',
        readTime: '3 min read',
        excerpt: 'Built natively in Swift, Dynamic Notch runs silently in the background without draining your battery or slowing down your pro apps.'
    }
];

export default function Blog() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16 text-center"
            >
                <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">The Dynamic Notch Journal</h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                    Insights, updates, and thoughts on making macOS workflows cleaner, faster, and much more beautiful.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post, i) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                        <Link to={`/blog/${post.id}`} className="group block h-full">
                            <article className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col cursor-pointer hover:shadow-lg hover:shadow-white/5">
                                <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)] mb-4">
                                    <time dateTime={post.date}>{post.date}</time>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h2 className="text-xl font-medium text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-grow">
                                    {post.excerpt}
                                </p>
                                <div className="mt-6 flex items-center text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                    Read Article
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </article>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}