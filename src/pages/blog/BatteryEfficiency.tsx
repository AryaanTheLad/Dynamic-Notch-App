import { motion } from 'framer-motion';
import ArticleSEO from '../../components/ArticleSEO';

export default function BatteryEfficiency() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <ArticleSEO 
                title="Does Dynamic Notch Affect Your MacBook Battery Life?"
                description="Learn how Dynamic Notch runs natively and silently in the background without draining your battery or slowing down your pro apps."
                publishDate="2026-03-20"
                url="https://dynamicnotch.tech/blog/battery-efficiency"
            />
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-invert prose-lg max-w-none"
            >
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-light italic font-serif tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                        Does Dynamic Notch Affect Your MacBook Battery Life?
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-white/80">By Aryaan</span>
                        <span>•</span>
                        <time dateTime="2024-01-10">March 20, 2026</time>
                        <span>•</span>
                        <span>3 min read</span>
                    </div>
                </header>

                <section>
                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">The Under-the-Hood Reality</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        One of the most common concerns about adding always on aesthetic utilities to macOS is battery drain. For good reason, many third-party widgets are poorly optimized Electron apps that hijack your CPU cycles and slash battery life by hours.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Native Swift Architecture</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        Dynamic Notch is built differently. It isn’t a web app wrapped in a desktop shell. It is a fully native program written primarily in Swift, utilizing Apple's proprietary frameworks designed specifically for Apple Silicon (M2, M3, M4, M5).
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">The Numbers</h2>
                    <ul className="list-disc pl-6 text-[var(--color-text-secondary)] leading-relaxed space-y-4 mb-6">
                        <li><strong>Idle CPU Usage:</strong> Typically hovering around <strong>0.01% to 0.1%</strong> when the notch is actively animating. Bumps to 2-3% once it's expanded and then goes back to default instantly. Transparency is key.</li>
                        <li><strong>RAM Footprint:</strong> Insignificant enough that you'll forget it's there. The numbers? Less than 45 mb of ram during max stress testing.</li>
                        <li><strong>Battery Impact:</strong> Entirely negligible. Across standard 10-12 hour workdays, Dynamic Notch consumes less battery than leaving a single static tab open in Google Chrome.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Silent Operation</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        Because it runs so efficiently, the app never triggers your Mac's fans or causes thermal throttling. It respects the premium hardware you run it on, ensuring that you get the aesthetic and functional benefits of a Dynamic Island without paying a tax on performance or battery life.
                    </p>
                </section>
            </motion.article>
        </div>
    );
}
