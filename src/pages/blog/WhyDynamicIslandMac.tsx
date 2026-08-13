import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArticleSEO from '../../components/ArticleSEO';
import ArticleFooter from '../../components/ArticleFooter';
import { useEntrance } from '../../hooks/useEntrance';
import { FEATURES, PERFORMANCE, PRICE, REQUIREMENTS } from '../../data/product.js';

const H2 = 'text-2xl font-semibold mt-12 mb-4 text-white';
const P = 'text-[var(--color-text-secondary)] leading-relaxed mb-6';
const UL = 'list-disc pl-6 text-[var(--color-text-secondary)] leading-relaxed space-y-3 mb-6';
const LINK = 'text-[var(--color-accent-soft)] underline underline-offset-4 hover:text-white transition-colors';

export default function WhyDynamicIslandMac() {
    const entrance = useEntrance();

    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <ArticleSEO
                title="Why Your Mac Deserves a Dynamic Island"
                description="Apple gave the iPhone cutout timers, playback and live activities. On the Mac the same space was left static — here is what happens when it isn't."
                publishDate="2026-01-02"
                modifiedDate="2026-08-13"
                url="https://www.dynamicnotch.tech/blog/why-dynamic-island-mac"
            />
            <m.article
                {...entrance({ duration: 0.6 })}
                className="prose prose-invert prose-lg max-w-none"
            >
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-light italic font-serif tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                        Why Your Mac Deserves a Dynamic Island
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-white/80">By Aryaan</span>
                        <span aria-hidden="true">•</span>
                        <time dateTime="2026-01-02">January 2, 2026</time>
                        <span aria-hidden="true">•</span>
                        <span>5 min read</span>
                    </div>
                </header>

                <section>
                    <h2 className={H2}>The same cutout, two different decisions</h2>
                    <p className={P}>
                        Apple put a camera housing into the top of two products and then did completely
                        different things with the space around it. On iPhone it became the Dynamic Island:
                        timers, playback, live activities, AirDrop progress — a small, permanent surface for
                        the thing you are currently doing. On the Mac, the identical cutout was left as a
                        gap in the menu bar and nothing else.
                    </p>
                    <p className={P}>
                        That asymmetry is the whole argument. The hardware made the same trade on both
                        machines. Only one of them got anything back for it.
                    </p>

                    <h2 className={H2}>Why that specific space is worth something</h2>
                    <p className={P}>
                        The top edge of the screen has a property the rest of the display does not: it is
                        the one place your cursor can reach without aiming. Throw the pointer upward and it
                        stops at the edge, every time. It is the same reason the menu bar has lived there
                        since 1984 — infinite height in Fitts&apos; law terms, so you can hit it at speed
                        without looking.
                    </p>
                    <p className={P}>
                        It is also directly in your line of sight while you work. Anything parked there is
                        glanceable in a way a Dock badge or a window in the background is not.
                    </p>
                    <p className={P}>
                        Most people respond to the notch by trying to make that area disappear — a black
                        menu bar, a dark wallpaper. We wrote up{' '}
                        <Link to="/blog/how-to-hide-macbook-notch" className={LINK}>
                            every method for hiding the MacBook notch
                        </Link>{' '}
                        and they all work. They just spend the most reachable part of the screen on making
                        it do nothing more convincingly.
                    </p>

                    <h2 className={H2}>What it does once it has a job</h2>
                    <p className={P}>
                        Dynamic Notch puts {FEATURES.length} things in that space. Each one replaces a
                        window you would otherwise have opened, looked at for two seconds, and closed:
                    </p>
                    <ul className={UL}>
                        {FEATURES.map((feature) => (
                            <li key={feature.title}>
                                <strong>{feature.title}:</strong> {feature.summary}
                            </li>
                        ))}
                    </ul>
                    <p className={P}>
                        The pattern behind all of them is the same. None is a task you sit down to do; every
                        one is a two-second interruption to something else. Those are exactly the
                        interactions worth moving somewhere you can reach without breaking stride.
                    </p>

                    <h2 className={H2}>How you actually use it</h2>
                    <p className={P}>
                        Move the pointer to the notch and it expands. Click to open it properly, or drag a
                        file straight onto it to drop that file into the tray. Drag back out when you want
                        it somewhere else — Finder, a message, an AirDrop sheet. There is no window to
                        manage and no keyboard shortcut to memorise.
                    </p>
                    <p className={P}>
                        It runs as a background process: {PERFORMANCE.ram} of memory,{' '}
                        {PERFORMANCE.idleCpu} CPU while idle and {PERFORMANCE.activeCpu} with the notch
                        expanded. It needs {REQUIREMENTS.minMacOSLabel} on{' '}
                        {REQUIREMENTS.architecture}, and it is signed and notarized by Apple, so it opens
                        like any other Mac app. The full numbers are in the{' '}
                        <Link to="/#specs" className={LINK}>specifications table</Link>.
                    </p>

                    <h2 className={H2}>Hiding it is still an option</h2>
                    <p className={P}>
                        Worth saying plainly: this is not an argument that the notch is beautiful. It is an
                        argument that a cutout you have already paid for in screen design should return
                        something. If you try it and decide you preferred a clean black strip, Hide Notch
                        Mode is built in — you are not choosing between the two forever.
                    </p>
                    <p className={P}>
                        Dynamic Notch is {PRICE.display} once, with no subscription.{' '}
                        <Link to="/#pricing" className={LINK}>See what is included</Link>, or read the{' '}
                        <Link to="/changelog" className={LINK}>changelog</Link> for what has shipped so far.
                    </p>
                </section>
            </m.article>
            <ArticleFooter currentId="why-dynamic-island-mac" />
        </div>
    );
}
