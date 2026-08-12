import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { Play, Folder, Edit3, Thermometer, Timer, Target, Clipboard } from 'lucide-react';
import InteractiveTimer from './InteractiveTimer';
import SectionHeading from './SectionHeading';
import { useEntrance } from '../hooks/useEntrance';

/**
 * The art on these cards is cropped straight out of `public/demo.mp4` — the notch
 * running on a real machine, not a CSS approximation of it. Recrop from the video if
 * the UI changes; the frame timestamps are noted in each `shot` comment.
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
    /** Extra padding for the very short weather strip, so it reads as a screen edge. */
    shotPad?: string;
};

const features: Feature[] = [
    {
        title: 'Media Control',
        description:
            'Artwork, track, and play / pause / skip for whatever is making sound — without raising the app that owns it.',
        icon: <Play className="w-5 h-5 text-emerald-300" />,
        span: 'md:col-span-4',
        delay: 0.05,
        tint: 'from-emerald-500/10',
        // demo.mp4 @ 25.5s
        shot: { src: '/shots/media.webp', alt: 'The notch expanded to show album art, track name and playback controls', width: 1320, height: 384 },
    },
    {
        title: 'Weather at a glance',
        description: 'Current conditions live in the bar itself. No panel to open.',
        icon: <Thermometer className="w-5 h-5 text-cyan-300" />,
        span: 'md:col-span-2',
        delay: 0.1,
        tint: 'from-cyan-500/10',
        // demo.mp4 @ 4.5s — the left end of the collapsed bar, cropped tight so the
        // reading is still legible at card width.
        shot: { src: '/shots/weather.webp', alt: 'The notch bar showing 31 degrees next to the timer and task buttons', width: 660, height: 72 },
        shotPad: 'px-5 py-12',
    },
    {
        title: 'File Tray',
        description:
            'Drag files up into the notch, walk them to another app, drag them out. Or hand the whole batch to AirDrop.',
        icon: <Folder className="w-5 h-5 text-blue-300" />,
        span: 'md:col-span-3',
        delay: 0.15,
        tint: 'from-blue-500/10',
        // demo.mp4 @ 16.8s
        shot: { src: '/shots/files.webp', alt: 'Three files parked in the notch file tray: Rubric.docx, Preview 2.png and Preview 1.pdf', width: 1320, height: 431 },
    },
    {
        title: 'Clipboard History',
        description:
            'Everything you copied, still there. Click an entry to put it back on the clipboard.',
        icon: <Clipboard className="w-5 h-5 text-orange-300" />,
        span: 'md:col-span-3',
        delay: 0.2,
        tint: 'from-orange-500/10',
        // demo.mp4 @ 11.5s
        shot: { src: '/shots/clipboard.webp', alt: 'The notch clipboard panel listing recently copied text with a copied badge', width: 1320, height: 412 },
    },
    {
        title: 'Quick Notes',
        description: 'A scratch line for the thing you will forget in ninety seconds.',
        icon: <Edit3 className="w-5 h-5 text-purple-300" />,
        span: 'md:col-span-2',
        delay: 0.25,
        tint: 'from-purple-500/10',
        // demo.mp4 @ 6.2s
        shot: { src: '/shots/notes.webp', alt: 'The notch notes panel holding a single short note', width: 1320, height: 394 },
    },
    {
        title: 'Current Task Setter',
        description: 'Name what you are doing and keep it pinned where you cannot avoid it.',
        icon: <Target className="w-5 h-5 text-yellow-300" />,
        span: 'md:col-span-2',
        delay: 0.3,
        tint: 'from-yellow-500/10',
        // demo.mp4 @ 39.5s
        shot: { src: '/shots/task.webp', alt: 'The notch current-task panel with a task named Recording', width: 1320, height: 412 },
    },
    {
        title: 'Custom Timer',
        description:
            'Any duration. The notch expands to count it down and chimes when it lands. Try it —',
        icon: <Timer className="w-5 h-5 text-pink-300" />,
        span: 'md:col-span-2',
        delay: 0.35,
        tint: 'from-pink-500/10',
        live: <InteractiveTimer />,
    },
];

export default function Features() {
    const entrance = useEntrance();

    return (
        <section id="features" className="notch-spill py-28 px-6 md:py-36">
            <div className="max-w-6xl mx-auto">
                <SectionHeading
                    eyebrow="Features"
                    title={
                        <>
                            Seven things you'd otherwise{' '}
                            <span className="text-white/55">stop working to do.</span>
                        </>
                    }
                    subtitle="Every image below is a frame from the app running on a real Mac — not a mockup."
                />

                <div className="mt-16 grid grid-cols-1 md:grid-cols-6 gap-5">
                    {features.map((feature) => (
                        <m.div
                            key={feature.title}
                            {...entrance({ inView: true, delay: feature.delay, y: 24 })}
                            className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[var(--color-surface)] p-7 transition-colors duration-500 hover:border-white/15 ${feature.span}`}
                        >
                            <div
                                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.tint} to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
                            />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/50">
                                        {feature.icon}
                                    </span>
                                    <h3 className="text-lg font-semibold tracking-[-0.01em]">
                                        {feature.title}
                                    </h3>
                                </div>

                                <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                                    {feature.description}
                                </p>

                                {feature.shot && (
                                    <div
                                        className={`screen mt-6 overflow-hidden rounded-xl ${feature.shotPad ?? ''}`}
                                    >
                                        <img
                                            src={feature.shot.src}
                                            alt={feature.shot.alt}
                                            width={feature.shot.width}
                                            height={feature.shot.height}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                )}

                                {feature.live}
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
