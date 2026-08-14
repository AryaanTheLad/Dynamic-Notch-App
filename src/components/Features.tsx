import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import {
    CalendarDays,
    Camera,
    ClipboardList,
    Command,
    Download,
    FolderOpen,
    FolderSearch,
    Palette,
    Pipette,
    Play,
    Share2,
    SlidersHorizontal,
    StickyNote,
    Target,
    Timer,
    CloudSun,
} from 'lucide-react';
import InteractiveTimer from './InteractiveTimer';
import SectionHeading from './SectionHeading';
import { useEntrance } from '../hooks/useEntrance';
import { FEATURES } from '../data/product.js';

/**
 * Every image on these cards is a frame from `public/demo-4.0.mp4`, the 4.0 build running
 * on a real machine. Recrop from the video if the UI changes; the source timestamp is
 * noted on each `shot`.
 *
 * `title` has to match the corresponding entry in FEATURES exactly. Anything in FEATURES
 * that no card claims falls through to the compact grid at the bottom, so a feature can
 * be added to the product data without silently disappearing from the page.
 */
type Shot = { src: string; alt: string; width: number; height: number };

type Feature = {
    title: string;
    description: string;
    icon: ReactNode;
    span: string;
    delay: number;
    tint: string;
    shot?: Shot;
    live?: ReactNode;
    /** Extra padding for the short bar crops, so they read as a screen edge. */
    shotPad?: string;
};

const features: Feature[] = [
    {
        title: 'Media player',
        description:
            'Artwork, track, scrubber and transport for whatever owns the system audio. Skip a song without raising Spotify, or scrub a video call recording without hunting for the window.',
        icon: <Play className="h-5 w-5 text-emerald-300" />,
        span: 'lg:col-span-3',
        delay: 0.05,
        tint: 'from-emerald-500/10',
        // demo-4.0.mp4 @ 16.5s
        shot: {
            src: '/shots/4.0/media.webp',
            alt: 'The Dynamic Notch panel showing album art, track title, a scrubber and play controls next to the Files and Notes sections',
            width: 1320,
            height: 489,
        },
    },
    {
        title: 'File tray',
        description:
            'Drag files up into the notch and it opens to catch them. Walk to another app, drag them back out. Multiple files move as one batch, and the tray keeps them until you take them.',
        icon: <FolderOpen className="h-5 w-5 text-blue-300" />,
        span: 'lg:col-span-3',
        delay: 0.1,
        tint: 'from-blue-500/10',
        // demo-4.0.mp4 @ 25.0s
        shot: {
            src: '/shots/4.0/files.webp',
            alt: 'Two screenshots parked in the Dynamic Notch file tray, with AirDrop and clear buttons in the tray header',
            width: 1320,
            height: 490,
        },
    },
    {
        title: 'Clipboard history',
        description:
            'Text, links, hex values and screenshots you copied earlier, sitting in the notch. Click one to put it back on the clipboard. Password manager fills are skipped.',
        icon: <ClipboardList className="h-5 w-5 text-orange-300" />,
        span: 'lg:col-span-2',
        delay: 0.15,
        tint: 'from-orange-500/10',
        // demo-4.0.mp4 @ 38.5s
        shot: {
            src: '/shots/4.0/clipboard.webp',
            alt: 'The Dynamic Notch clipboard panel listing a copied screenshot and the hex value #B65C82',
            width: 1200,
            height: 717,
        },
    },
    {
        title: 'Quick notes',
        description:
            'A scratch pad for the thought that disappears in ninety seconds. Type it without leaving the window you are in, and copy it back out with one click.',
        icon: <StickyNote className="h-5 w-5 text-purple-300" />,
        span: 'lg:col-span-2',
        delay: 0.2,
        tint: 'from-purple-500/10',
        // demo-4.0.mp4 @ 30.5s
        shot: {
            src: '/shots/4.0/notes.webp',
            alt: 'A note reading "Welcome to Dynamic Notch 4.0." open in the notch, with a Copy Note button below it',
            width: 1200,
            height: 725,
        },
    },
    {
        title: 'Current task',
        description:
            'Name the one thing you are meant to be doing. It stays on the collapsed notch, in the corner of your eye, until you clear it.',
        icon: <Target className="h-5 w-5 text-yellow-300" />,
        span: 'lg:col-span-2',
        delay: 0.25,
        tint: 'from-yellow-500/10',
        // demo-4.0.mp4 @ 50.5s
        shot: {
            src: '/shots/4.0/task.webp',
            alt: 'The Current Task panel in the notch with a task named Marketing, and Save and Clear Current buttons',
            width: 1100,
            height: 686,
        },
    },
    {
        title: 'Colour picker',
        description:
            'Sample any pixel on any display and read it back as HEX, RGB, HSL or a Swift literal. The WCAG contrast ratio against your background is worked out for you, AA and AAA included.',
        icon: <Pipette className="h-5 w-5 text-violet-300" />,
        span: 'lg:col-span-3',
        delay: 0.3,
        tint: 'from-violet-500/10',
        // demo-4.0.mp4 @ 44.6s
        shot: {
            src: '/shots/4.0/colour.webp',
            alt: 'The colour section showing #B65C82 copied with a 4.34 to 1 contrast ratio, AA and AAA badges, and HEX, RGB, HSL and Swift tabs',
            width: 1320,
            height: 581,
        },
    },
    {
        title: 'Calendar and events',
        description:
            'Your next meeting with the time left before it starts, and a Join button for Zoom, Meet, Teams, Webex and FaceTime. Switch to the month grid when you need the wider view.',
        icon: <CalendarDays className="h-5 w-5 text-rose-300" />,
        span: 'lg:col-span-3',
        delay: 0.35,
        tint: 'from-rose-500/10',
        // demo-4.0.mp4 @ 56.6s
        shot: {
            src: '/shots/4.0/calendar.webp',
            alt: 'The calendar section in the notch showing an August 2026 month grid with today highlighted, and Events and Month tabs',
            width: 1160,
            height: 648,
        },
    },
    {
        title: 'Timer',
        description:
            'Any duration you like. The notch counts it down in place and sounds an alert when it lands. Try it here, it behaves the same way.',
        icon: <Timer className="h-5 w-5 text-pink-300" />,
        span: 'lg:col-span-2',
        delay: 0.4,
        tint: 'from-pink-500/10',
        live: <InteractiveTimer />,
    },
    {
        title: 'System HUD',
        description:
            'Volume and brightness stop landing in the middle of your screen and appear in the notch instead, alongside this Mac’s battery and the level of connected AirPods, mice and keyboards.',
        icon: <SlidersHorizontal className="h-5 w-5 text-sky-300" />,
        span: 'lg:col-span-4',
        delay: 0.45,
        tint: 'from-sky-500/10',
        // demo-4.0.mp4 @ 59.2s
        shot: {
            src: '/shots/4.0/hud.webp',
            alt: 'The collapsed notch bar showing brightness at 56 percent on the left and a volume level on the right',
            width: 1050,
            height: 100,
        },
        shotPad: 'px-5 py-8',
    },
    {
        title: 'Weather',
        description:
            'Live temperature and conditions in the bar itself. No panel to open, no widget to summon.',
        icon: <CloudSun className="h-5 w-5 text-cyan-300" />,
        span: 'lg:col-span-2',
        delay: 0.5,
        tint: 'from-cyan-500/10',
        // demo-4.0.mp4 @ 60.8s
        shot: {
            src: '/shots/4.0/weather.webp',
            alt: 'The notch toolbar showing 36 degrees with a rain icon, next to the Timer and Task buttons',
            width: 850,
            height: 95,
        },
        shotPad: 'px-5 py-8',
    },
    {
        title: 'Themes and appearance',
        description:
            'Seven themes for the panel and nine for the bar, including one that pulls its colour from the album art currently playing. The bar can run a different theme from the panel.',
        icon: <Palette className="h-5 w-5 text-fuchsia-300" />,
        span: 'lg:col-span-4',
        delay: 0.55,
        tint: 'from-fuchsia-500/10',
        // demo-4.0.mp4 @ 66.2s
        shot: {
            src: '/shots/4.0/themes.webp',
            alt: 'The notch panel tinted pink to match the album art of the track playing, with matching Files and Notes icons',
            width: 1320,
            height: 486,
        },
    },
];

/** Icons for the features that no card above claims, keyed by their FEATURES title. */
const restIcons: Record<string, ReactNode> = {
    AirDrop: <Share2 className="h-4 w-4 text-blue-300" />,
    'Camera mirror': <Camera className="h-4 w-4 text-emerald-300" />,
    'Download watcher': <Download className="h-4 w-4 text-orange-300" />,
    'Finder shortcut': <FolderSearch className="h-4 w-4 text-sky-300" />,
    'Global shortcut': <Command className="h-4 w-4 text-violet-300" />,
};

const shown = new Set(features.map((feature) => feature.title));
const rest = FEATURES.filter((feature) => !shown.has(feature.title));

export default function Features() {
    const entrance = useEntrance();

    return (
        <section id="features" className="notch-spill px-6 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
                <SectionHeading
                    eyebrow="Features"
                    title={
                        <>
                            {FEATURES.length} things you would otherwise{' '}
                            <span className="text-white/55">stop working to do.</span>
                        </>
                    }
                    subtitle="Every screenshot below is a frame from Dynamic Notch 4.0 running on a real Mac. Nothing on this page is a mockup."
                />

                <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 md:gap-5 lg:grid-cols-6">
                    {features.map((feature) => (
                        <m.div
                            key={feature.title}
                            {...entrance({ inView: true, delay: feature.delay, y: 24 })}
                            className={`group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-6 transition-colors duration-500 hover:border-white/15 md:p-7 ${feature.span}`}
                        >
                            <div
                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.tint} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                            />

                            <div className="relative z-10 flex h-full flex-col">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/50">
                                        {feature.icon}
                                    </span>
                                    <h3 className="text-lg font-semibold tracking-[-0.01em]">
                                        {feature.title}
                                    </h3>
                                </div>

                                {/* Whichever of the two absorbs the slack decides where the
                                    dead space in a short card ends up: under the text, or
                                    spread evenly around the art. */}
                                <p
                                    className={`mt-3 text-sm font-light leading-relaxed text-[var(--color-text-secondary)] ${
                                        feature.shotPad ? '' : 'flex-1'
                                    }`}
                                >
                                    {feature.description}
                                </p>

                                {feature.shot && (
                                    // The two bar crops are only ~100px tall, so their card
                                    // would otherwise end in a band of dead space. Let the
                                    // frame take the slack and centre the strip inside it.
                                    <div
                                        className={`screen mt-6 overflow-hidden rounded-2xl ${
                                            feature.shotPad
                                                ? `flex flex-1 items-center ${feature.shotPad}`
                                                : ''
                                        }`}
                                    >
                                        <img
                                            src={feature.shot.src}
                                            alt={feature.shot.alt}
                                            width={feature.shot.width}
                                            height={feature.shot.height}
                                            loading="lazy"
                                            decoding="async"
                                            className="h-auto w-full"
                                        />
                                    </div>
                                )}

                                {feature.live}
                            </div>
                        </m.div>
                    ))}
                </div>

                {rest.length > 0 && (
                    <m.div {...entrance({ inView: true, delay: 0.1, y: 20 })} className="mt-4 md:mt-5">
                        <div className="rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-6 md:p-7">
                            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
                                Also in the notch
                            </h3>
                            <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                                {rest.map((feature) => (
                                    <li key={feature.title} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/50">
                                            {restIcons[feature.title]}
                                        </span>
                                        <span>
                                            <span className="block text-sm font-medium text-white">
                                                {feature.title}
                                            </span>
                                            <span className="mt-1 block text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                                                {feature.summary}
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </m.div>
                )}
            </div>
        </section>
    );
}
