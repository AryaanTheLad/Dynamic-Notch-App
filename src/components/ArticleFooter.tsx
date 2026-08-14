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
 * Every article used to be a dead end, no internal links and no CTA anywhere in the
 * eleven posts. This gives each one two related reads, a product line and a way back.
 */
export default function ArticleFooter({ currentId }: ArticleFooterProps) {
    const related = relatedPosts(currentId, 2);

    return (
        <footer className="mt-20 border-t border-white/10 pt-12">
            {/* Product CTA */}
            <div className="mb-12 rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-6 md:p-8">
                <h2 className="mb-2 text-xl font-semibold tracking-[-0.01em] text-white">
                    Dynamic Notch turns that notch into a file tray, media remote, clipboard and timer.
                </h2>
                <p className="mb-6 text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                    {PRICE.display} once, no subscription. {REQUIREMENTS.minMacOSLabel} on{' '}
                    {REQUIREMENTS.architecture}.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                    <a
                        href={CHECKOUT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCheckout('article')}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.02] active:scale-95"
                    >
                        Buy Dynamic Notch, {PRICE.display}
                    </a>
                    <Link
                        to="/"
                        className="inline-flex h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-6 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/12"
                    >
                        See what it does
                    </Link>
                </div>
            </div>

            {/* Related reading */}
            {related.length > 0 && (
                <div className="mb-12">
                    <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
                        Keep reading
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                        {related.map((post) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.id}`}
                                className="group block rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-6 transition-colors hover:border-white/15 hover:bg-[var(--color-surface-raised)]"
                            >
                                <div className="mb-3 flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                                    <time dateTime={post.dateISO}>{post.date}</time>
                                    <span aria-hidden="true">•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="text-base font-medium leading-snug text-white">
                                    {post.title}
                                </h3>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                                    Read
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
