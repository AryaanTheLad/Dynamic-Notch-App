import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { relatedPosts } from '../data/posts.js';
import { CHECKOUT_URL, PRICE, REQUIREMENTS } from '../data/product.js';
import { trackCheckout } from '../lib/analytics';

type ArticleFooterProps = {
    /** Slug of the post being read, so it is excluded from the related list. */
    currentId: string;
};

/**
 * Every article used to be a dead end — no internal links and no CTA anywhere in the
 * eleven posts. This gives each one two related reads, a product line and a way back.
 */
export default function ArticleFooter({ currentId }: ArticleFooterProps) {
    const related = relatedPosts(currentId, 2);

    return (
        <footer className="mt-20 pt-12 border-t border-white/10">
            {/* Product CTA */}
            <div className="rounded-3xl bg-zinc-900 border border-white/10 p-8 mb-12">
                <h2 className="text-xl font-semibold text-white mb-2">
                    Dynamic Notch turns that notch into a file tray, media remote and timer.
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)] font-light leading-relaxed mb-6">
                    {PRICE.display} once, no subscription. {REQUIREMENTS.minMacOSLabel} on{' '}
                    {REQUIREMENTS.architecture}.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <a
                        href={CHECKOUT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCheckout('article')}
                        className="h-11 px-6 rounded-full bg-white text-black text-sm font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 inline-flex items-center justify-center"
                    >
                        Buy Dynamic Notch — {PRICE.display}
                    </a>
                    <Link
                        to="/"
                        className="h-11 px-6 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                    >
                        See what it does
                    </Link>
                </div>
            </div>

            {/* Related reading */}
            {related.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-6">
                        Keep reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {related.map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.id}`}
                                className="group block rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)] mb-3">
                                    <time dateTime={post.dateISO}>{post.date}</time>
                                    <span aria-hidden="true">•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="text-base font-medium text-white leading-snug group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-blue-400 transition-colors">
                                    Read
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <Link
                to="/blog"
                className="inline-flex items-center gap-2 py-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                All articles
            </Link>
        </footer>
    );
}
