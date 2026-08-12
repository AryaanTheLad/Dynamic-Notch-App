import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useEntrance } from '../hooks/useEntrance';
import { RELEASES, REQUIREMENTS, SITE_URL, VERSION } from '../data/product.js';

export default function Changelog() {
    const entrance = useEntrance();

    return (
        <>
            <SEO
                title="Changelog - Dynamic Notch"
                description={`Every Dynamic Notch release, what changed in it, and the minimum macOS it needs. Currently on ${VERSION}.`}
            />
            <div className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
                <m.div {...entrance({ duration: 0.6 })}>
                    <h1 className="text-4xl font-semibold tracking-[-0.03em] title-gradient md:text-5xl">
                        Changelog
                    </h1>
                    <p className="mt-5 text-base font-light leading-relaxed text-[var(--color-text-secondary)]">
                        Shipping version <span className="text-white">{VERSION}</span>, which needs{' '}
                        {REQUIREMENTS.minMacOSLabel} on {REQUIREMENTS.architecture}. Updates arrive
                        in-app over Sparkle — the feed itself is{' '}
                        <a
                            href={`${SITE_URL}/appcast.xml`}
                            className="text-white underline decoration-white/30 hover:decoration-white transition-colors"
                        >
                            appcast.xml
                        </a>
                        .
                    </p>

                    <ol className="mt-14 space-y-6">
                        {RELEASES.map((release, index) => (
                            <m.li
                                key={release.version}
                                {...entrance({ inView: true, delay: 0.05 * index, y: 20 })}
                                className="rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-7"
                            >
                                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                                    <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                                        {release.version}
                                    </h2>
                                    <time
                                        dateTime={release.date}
                                        className="text-sm text-[var(--color-text-secondary)]"
                                    >
                                        {release.dateLabel}
                                    </time>
                                    <span className="font-mono text-xs text-white/40">
                                        build {release.build} · macOS {release.minMacOS}+
                                    </span>
                                </div>

                                <ul className="mt-5 space-y-2.5">
                                    {release.notes.map((note) => (
                                        <li
                                            key={note}
                                            className="flex gap-3 text-sm font-light leading-relaxed text-[var(--color-text-secondary)]"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent-soft)]"
                                            />
                                            {note}
                                        </li>
                                    ))}
                                </ul>

                                {release.postId && (
                                    <Link
                                        to={`/blog/${release.postId}`}
                                        className="mt-6 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-white/75 hover:text-white transition-colors"
                                    >
                                        The longer write-up
                                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                    </Link>
                                )}
                            </m.li>
                        ))}
                    </ol>

                    <p className="mt-10 text-xs leading-relaxed text-white/45">
                        Releases before {RELEASES[RELEASES.length - 1].version} were never written
                        down, so this history starts there rather than guessing at it.
                    </p>
                </m.div>
            </div>
        </>
    );
}
