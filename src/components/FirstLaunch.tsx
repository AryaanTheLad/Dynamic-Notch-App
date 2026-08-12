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
        <section id="first-launch" className="notch-spill py-28 px-6 md:py-36">
            <div className="max-w-5xl mx-auto">
                <SectionHeading
                    eyebrow="Setup"
                    title={<>Installed in under a minute.</>}
                    subtitle="Signed and notarized by Apple, so there is no Gatekeeper detour and no right-click workaround — it opens like anything else you have ever installed."
                />

                <ol className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {FIRST_LAUNCH_STEPS.map((step, index) => (
                        <m.li
                            key={step}
                            {...entrance({ inView: true, delay: 0.1 + index * 0.08, y: 20 })}
                            className="relative rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-7"
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
                    className="mt-8 grid grid-cols-1 items-center gap-8 rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-7 md:grid-cols-5 md:p-9"
                >
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-semibold tracking-[-0.01em]">
                            Then turn off the parts you don't want.
                        </h3>
                        <p className="mt-3 text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                            Every panel is a switch — media player, timer, clipboard history, current
                            task, haptics, accent colour, and which panel gets priority in the notch.
                            Nothing it reads leaves your Mac; the{' '}
                            <Link
                                to="/privacy"
                                className="text-white underline decoration-white/30 hover:decoration-white transition-colors"
                            >
                                privacy policy
                            </Link>{' '}
                            spells out the one network call it makes.
                        </p>
                    </div>

                    <div className="screen overflow-hidden rounded-2xl md:col-span-3">
                        {/* demo.mp4 @ 30.8s */}
                        <img
                            src="/shots/settings.webp"
                            alt="The Dynamic Notch settings window showing toggles for haptic feedback, accent theme, record animation, music player, timer and current task"
                            width={1320}
                            height={1207}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto"
                        />
                    </div>
                </m.div>
            </div>
        </section>
    );
}
