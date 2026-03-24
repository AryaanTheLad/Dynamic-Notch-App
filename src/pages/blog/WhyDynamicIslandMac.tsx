import { motion } from 'framer-motion';

export default function WhyDynamicIslandMac() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-invert prose-lg max-w-none"
            >
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-light italic font-serif tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                        Why Your Mac Deserves a Dynamic Island
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-white/80">By Aryaan</span>
                        <span>•</span>
                        <time dateTime="2023-11-02">January 2, 2026</time>
                        <span>•</span>
                        <span>4 min read</span>
                    </div>
                </header>

                <section>
                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">The Wasted Space Dilemma</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        When Apple introduced the notch to the MacBook lineup, it was met with mixed feelings. While it allowed for much thinner bezels, it left an undeniable dead zone right in the center of the menu bar. An area the iPhone transformed into an interactive hub was left completely static on macOS. Until Now.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Bringing Continuity to the Ecosystem</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        If you use an iPhone 14 Pro or newer, you are already accustomed to the fluidity of the Dynamic Island. You check your timers, control your music, and monitor air drops from it. The integration of Dynamic Notch on your Mac finally answers the question: "Why doesn't my laptop do this too?" By adopting this highly praised design paradigm, macOS feels inherently more connected to the rest of the Apple ecosystem.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">A Hub for Micro-Interactions</h2>
                    <ul className="list-disc pl-6 text-[var(--color-text-secondary)] leading-relaxed space-y-4 mb-6">
                        <li><strong>Frictionless Utility:</strong> The top center of your screen is premium real estate. Instead of dragging your mouse across a massive display to pause a track, you simply glance up or flick your cursor to the notch.</li>
                        <li><strong>Elegant Disguise:</strong> Rather than pretending the hardware notch doesn't exist, Dynamic Notch embraces it. By turning the notch into a fluid, animated shape that expands and contracts, the intrusive black bar is cleverly disguised as a software feature.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">The Bottom Line</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        A Dynamic Island on your Mac isn’t just a cosmetic gimmick. It fundamentally restructures how you execute micro tasks like changing tracks or viewing the weather. It transforms hardware dead space into a software powerhouse. If you appreciate Apple’s meticulous attention to interactive design, Dynamic Notch is the missing piece of your macOS experience.
                    </p>
                </section>
            </motion.article>
        </div>
    );
}
