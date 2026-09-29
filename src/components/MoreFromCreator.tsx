import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useEntrance } from '../hooks/useEntrance';
import { trackSisterApp } from '../lib/analytics';

const WETYPE_URL = 'https://www.wetype.tech';

/** Cross-promotion for the creator's other Mac app. */
export default function MoreFromCreator() {
    const entrance = useEntrance();

    return (
        <section id="more-from-creator" className="notch-spill px-6 py-20 md:py-28">
            <div className="mx-auto max-w-3xl">
                <SectionHeading
                    eyebrow="From the same creator"
                    title={<>Also made by Aryaan.</>}
                />

                <m.a
                    {...entrance({ inView: true, delay: 0.1, y: 24 })}
                    href={WETYPE_URL}
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackSisterApp('wetype')}
                    className="group mt-12 flex flex-col items-center gap-6 rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-6 text-center transition-colors hover:border-white/15 hover:bg-[var(--color-surface-raised)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-soft)] sm:flex-row sm:text-left md:mt-14 md:p-8"
                >
                    <img
                        src="/wetype-icon.svg"
                        alt="WeType logo"
                        width={72}
                        height={72}
                        loading="lazy"
                        className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold tracking-[-0.02em] text-white">WeType</h3>
                        <p className="mt-2 text-sm font-light leading-relaxed text-[var(--color-text-secondary)] md:text-base">
                            AI autocomplete for every Mac app. A model running on your Mac predicts the
                            rest of your sentence, and Tab accepts it.
                        </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-white/80 transition-colors group-hover:text-white">
                        wetype.tech
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                </m.a>
            </div>
        </section>
    );
}
