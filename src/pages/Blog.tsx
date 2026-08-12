import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useEntrance } from '../hooks/useEntrance';
import { POSTS } from '../data/posts.js';

export default function Blog() {
    const entrance = useEntrance();

    return (
        <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            <SEO
              title="Dynamic Notch Blog - MacBook Notch Utilities & Customization"
              description="Read the latest articles about maximizing productivity, customizing your MacBook notch, and turning it into a functional Dynamic Island."
            />
            <m.div {...entrance({ duration: 0.6 })} className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-white">The Dynamic Notch Journal</h1>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                    Insights, updates, and thoughts on making macOS workflows cleaner, faster, and much more beautiful.
                </p>
            </m.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {POSTS.map((post, i) => (
                    <m.div
                        key={post.id}
                        {...entrance({ inView: true, delay: i * 0.1, duration: 0.5 })}
                    >
                        <Link to={`/blog/${post.id}`} className="group block h-full">
                            <article className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 flex flex-col cursor-pointer hover:shadow-lg hover:shadow-white/5">
                                <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)] mb-4">
                                    <time dateTime={post.dateISO}>{post.date}</time>
                                    <span aria-hidden="true">•</span>
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
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </article>
                        </Link>
                    </m.div>
                ))}
            </div>
        </div>
    );
}
