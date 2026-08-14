import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import { FAQS } from '../data/product.js';
import { trackFaqOpened } from '../lib/analytics';

/**
 * Questions and answers live in `src/data/product.js`, because `scripts/prerender.js`
 * builds the `FAQPage` schema from the same array. Google's policy is that the markup
 * has to match what the page shows, and one source is the only way to guarantee it.
 *
 * Native <details> so keyboard support, find-in-page and reduced motion all come for
 * free. This replaced an infinite marquee that repeated every question three times and
 * could not be paused (WCAG 2.2.2).
 */
const LINK = 'text-white underline decoration-white/30 transition-colors hover:decoration-white';

export default function FAQ() {
    return (
        <section id="faq" className="notch-spill px-6 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
                <SectionHeading
                    eyebrow="FAQ"
                    title={<>Everything people ask before buying.</>}
                    subtitle="Compatibility, privacy, permissions, licensing and the things that go wrong. If your question is not here, ask and you will get a real answer."
                />

                <div className="mt-12 grid grid-cols-1 items-start gap-3 md:mt-14 md:grid-cols-2 md:gap-4">
                    {FAQS.map((faq) => (
                        <details
                            key={faq.question}
                            onToggle={(event) => {
                                // Fires on close too; only the opens are a content signal.
                                if (event.currentTarget.open) trackFaqOpened(faq.question);
                            }}
                            className="group rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] transition-colors open:border-white/15 open:bg-[var(--color-surface-raised)]"
                        >
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-3xl p-6 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-soft)] [&::-webkit-details-marker]:hidden">
                                <h3 className="text-base font-medium leading-snug tracking-[-0.01em] text-white">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    aria-hidden="true"
                                    className="h-5 w-5 shrink-0 text-white/45 transition-transform duration-300 group-open:rotate-180"
                                />
                            </summary>
                            <p className="px-6 pb-6 text-sm font-light leading-relaxed text-white/70">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>

                <div className="mt-10 space-y-3 text-center text-sm text-[var(--color-text-secondary)]">
                    <p>
                        Something not covered?{' '}
                        <Link to="/contact" className={LINK}>
                            Ask directly
                        </Link>
                        , or read the{' '}
                        <Link to="/changelog" className={LINK}>
                            changelog
                        </Link>{' '}
                        to see what shipped in 4.0.
                    </p>
                    <p>
                        Longer reads:{' '}
                        <Link to="/blog/how-to-hide-macbook-notch" className={LINK}>
                            how to hide the MacBook notch
                        </Link>{' '}
                        and{' '}
                        <Link to="/blog/why-dynamic-island-mac" className={LINK}>
                            why your Mac deserves a Dynamic Island
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
}
