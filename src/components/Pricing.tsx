import { m } from 'framer-motion';
import { Check, Cpu, HardDrive, MonitorSmartphone, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useEntrance } from '../hooks/useEntrance';
import {
    CHECKOUT_URL,
    FEATURES,
    PERFORMANCE,
    PRICE,
    REFUND_POLICY,
    REQUIREMENTS,
} from '../data/product.js';
import { trackCheckout } from '../lib/analytics';

const INCLUDED = [
    `All ${FEATURES.length} notch features — no tiers, nothing held back for a higher price`,
    'In-app updates, delivered through Sparkle',
    `${PERFORMANCE.ram} of memory and ${PERFORMANCE.idleCpu} CPU while it sits idle`,
    'Notes, clipboard history and File Tray contents never leave your Mac',
];

const SPECS = [
    { icon: <MonitorSmartphone className="w-4 h-4" />, label: REQUIREMENTS.minMacOSLabel },
    { icon: <Cpu className="w-4 h-4" />, label: REQUIREMENTS.architecture },
    { icon: <HardDrive className="w-4 h-4" />, label: `${REQUIREMENTS.downloadSize} download` },
    { icon: <ShieldCheck className="w-4 h-4" />, label: 'Notarized by Apple' },
];

export default function Pricing() {
    const entrance = useEntrance();

    return (
        <section id="pricing" className="notch-spill py-28 px-6 md:py-36">
            <div className="max-w-5xl mx-auto">
                <SectionHeading
                    eyebrow="Pricing"
                    title={
                        <>
                            {PRICE.display} once.{' '}
                            <span className="text-white/55">No subscription.</span>
                        </>
                    }
                    subtitle="One payment, one Mac app. No account to create, no trial that expires, nothing that stops working if you stop paying."
                />

                <m.div
                    {...entrance({ inView: true, delay: 0.1, y: 24 })}
                    className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-5"
                >
                    {/* What you get */}
                    <div className="md:col-span-3 rounded-[1.75rem] border border-white/[0.07] bg-[var(--color-surface)] p-8">
                        <h3 className="text-base font-semibold tracking-[-0.01em]">
                            What's included
                        </h3>
                        <ul className="mt-6 space-y-4">
                            {INCLUDED.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15">
                                        <Check className="h-3 w-3 text-emerald-300" />
                                    </span>
                                    <span className="text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 border-t border-white/[0.06] pt-6">
                            <h4 className="text-sm font-semibold text-white">
                                What "pay what you want" means
                            </h4>
                            <p className="mt-2 text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                                {PRICE.display} is the whole price. The checkout lets you pay more if
                                you want to — it unlocks nothing extra, it just funds the next release.
                            </p>
                        </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="relative md:col-span-2 flex flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-[var(--color-surface-raised)] p-8">
                        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[var(--color-accent)]/20 blur-3xl" />

                        <div className="relative flex items-baseline gap-2">
                            <span className="text-[3.25rem] leading-none font-semibold tracking-[-0.045em]">
                                {PRICE.display}
                            </span>
                            <span className="text-sm text-[var(--color-text-secondary)]">once</span>
                        </div>

                        <ul className="relative mt-8 space-y-3">
                            {SPECS.map((spec) => (
                                <li
                                    key={spec.label}
                                    className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"
                                >
                                    <span className="text-white/70">{spec.icon}</span>
                                    {spec.label}
                                </li>
                            ))}
                        </ul>

                        <a
                            href={CHECKOUT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackCheckout('pricing')}
                            className="relative mt-8 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-center font-medium text-black shadow-[0_10px_40px_-12px_rgba(255,255,255,0.5)] transition-transform duration-300 hover:scale-[1.02] active:scale-95"
                        >
                            Buy Dynamic Notch — {PRICE.display}
                        </a>

                        <p className="relative mt-4 text-xs leading-relaxed text-white/50">
                            {REFUND_POLICY}
                        </p>
                    </div>
                </m.div>
            </div>
        </section>
    );
}
