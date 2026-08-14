import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, FolderInput, Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useEntrance } from '../hooks/useEntrance';
import { FIRST_LAUNCH_STEPS } from '../data/product.js';

const stepIcons = [
    <Download className="w-5 h-5 text-white" key="download" />,
    <FolderInput className="w-5 h-5 text-white" key="drag" />,
    <Sparkles className="w-5 h-5 text-white" key="launch" />,
];

const stepTitles = ['Download', 'Drag to Applications', 'Launch it'];

export default function FirstLaunch() {
    const entrance = useEntrance();

    return (
        <section id="first-launch" className="notch-spill px-6 py-20 md:py-28">
            <div className="mx-auto max-w-5xl">
                <SectionHeading
                    eyebrow="Setup"
                    title={<>Installed in under a minute.</>}
                    subtitle="Signed and notarized by Apple, so there is no Gatekeeper detour and no right-click workaround. It opens like anything else you have ever installed."
                />

                <ol className="mt-12 grid grid-cols-1 gap-4 md:mt-14 md:grid-cols-3 md:gap-5">
                    {FIRST_LAUNCH_STEPS.map((step, index) => (
                        <m.li
                            key={step}
                            {...entrance({ inView: true, delay: 0.1 + index * 0.08, y: 20 })}
                            className="relative rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-6 md:p-7"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/50">
                                    {stepIcons[index]}
                                </span>
                                <span className="font-mono text-xs text-white/45">
                                    0{index + 1}
                                </span>
                            </div>
                            <h3 className="mt-5 text-lg font-semibold tracking-[-0.01em]">
                                {stepTitles[index]}
                            </h3>
                            <p className="mt-2 text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                                {step}
                            </p>
                        </m.li>
                    ))}
                </ol>

                <m.div
                    {...entrance({ inView: true, delay: 0.35, y: 24 })}
                    className="mt-4 grid grid-cols-1 items-center gap-6 rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-6 md:mt-5 md:grid-cols-5 md:gap-8 md:p-8"
                >
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold tracking-[-0.01em]">
                            Then turn off the parts you don't want.
                        </h3>
                        <p className="mt-3 text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                            Every module is a switch: media player, file tray, clipboard history,
                            calendar, camera, weather, haptics, themes and which panel gets priority
                            in the notch. A module you leave off never asks for a permission. The{' '}
                            <Link
                                to="/privacy"
                                className="text-white underline decoration-white/30 transition-colors hover:decoration-white"
                            >
                                privacy policy
                            </Link>{' '}
                            spells out the few network calls it makes.
                        </p>
                    </div>

                    <div className="screen overflow-hidden rounded-2xl md:col-span-3">
                        {/* demo-4.0.mp4 @ 62.8s */}
                        <img
                            src="/shots/4.0/settings.webp"
                            alt="Dynamic Notch 4.0 settings, on the Modules tab, with switches for Watch Downloads, Announce Downloads and the Weather Widget"
                            width={1320}
                            height={520}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-full"
                        />
                    </div>
                </m.div>
            </div>
        </section>
    );
}
