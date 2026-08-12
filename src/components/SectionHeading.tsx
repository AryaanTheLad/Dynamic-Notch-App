import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEntrance } from '../hooks/useEntrance';

type SectionHeadingProps = {
    /** Short label that sits inside the notch tab, e.g. "PRICING". */
    eyebrow: string;
    title: ReactNode;
    subtitle?: ReactNode;
    align?: 'center' | 'left';
};

/**
 * Every section on the page hangs from a notch: a small tab with two rounded bottom
 * corners descends from the top hairline, and the section's light spills down out of
 * it. That silhouette is the product, so it is also the page's structural mark.
 */
export default function SectionHeading({
    eyebrow,
    title,
    subtitle,
    align = 'center',
}: SectionHeadingProps) {
    const entrance = useEntrance();
    const centred = align === 'center';

    return (
        <div className={centred ? 'text-center' : 'text-left'}>
            <div className={`flex ${centred ? 'justify-center' : 'justify-start'}`}>
                <span className="notch-tab inline-flex items-center gap-2 px-4 pb-2 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
                    <span className="w-1 h-1 rounded-full bg-[var(--color-accent-soft)]" />
                    {eyebrow}
                </span>
            </div>

            <m.h2
                {...entrance({ inView: true, y: 16 })}
                className={`mt-8 text-[2rem] leading-[1.08] tracking-[-0.03em] font-semibold md:text-[2.75rem] ${
                    centred ? 'mx-auto max-w-2xl' : 'max-w-2xl'
                }`}
            >
                {title}
            </m.h2>

            {subtitle && (
                <m.p
                    {...entrance({ inView: true, y: 16, delay: 0.05 })}
                    className={`mt-5 text-base font-light leading-relaxed text-[var(--color-text-secondary)] md:text-lg ${
                        centred ? 'mx-auto max-w-xl' : 'max-w-xl'
                    }`}
                >
                    {subtitle}
                </m.p>
            )}
        </div>
    );
}
