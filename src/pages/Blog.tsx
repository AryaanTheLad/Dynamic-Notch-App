import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useEntrance } from '../hooks/useEntrance';
import { POSTS } from '../data/posts.js';

export default function Blog() {
    const entrance = useEntrance();

    return (
        <div className="mx-auto max-w-6xl px-6 pt-32 pb-20">
            <SEO
              title="Dynamic Notch Blog: MacBook Notch Utilities and Customization"
              description="Guides on the MacBook notch: how to hide it, how to customize it, how to turn it into a Dynamic Island, and how a native Mac utility keeps your menu bar clear."
            />
            <m.div {...entrance({ duration: 0.6 })} className="mb-14 text-center">
                <h1 className="title-gradient text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                    The Dynamic Notch Journal
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
                    How to hide the notch, how to customize it, and what happens when you stop
                    hiding it and give it something to do.
                </p>
            </m.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
                {POSTS.map((post, i) => (
                    <m.div
                        key={post.id}
                        {...entrance({ inView: true, delay: i * 0.1, duration: 0.5 })}
                    >
                        <Link to={`/blog/${post.id}`} className="group block h-full">
                            <article className="flex h-full cursor-pointer flex-col rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-6 transition-colors duration-300 hover:border-white/15 hover:bg-[var(--color-surface-raised)]">
                                <div className="mb-4 flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                                    <time dateTime={post.dateISO}>{post.date}</time>
                                    <span aria-hidden="true">•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h2 className="mb-3 text-xl font-semibold tracking-[-0.01em] text-white">
                                    {post.title}
                                </h2>
                                <p className="flex-grow text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                                    {post.excerpt}
                                </p>
                                <div className="mt-6 flex items-center text-sm font-medium text-white/75 transition-colors group-hover:text-white">
                                    Read it
                                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
