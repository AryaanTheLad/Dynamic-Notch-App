import { motion } from 'framer-motion';

export default function BoostProductivity() {
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
                        How Dynamic Notch Supercharges Productivity
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-white/80">By Aryaan</span>
                        <span>•</span>
                        <time dateTime="2023-11-15">February 15, 2026</time>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>
                </header>

                <section>
                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">The Cost of Context Switching</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        Every time you stop writing code, designing, or drafting an email just to open the Spotify app, wait for it to load, and hit next; you break your flow state. Human attention is fragile; reclaiming focus after a minor interruption takes an average of 20 minutes. The Dynamic Notch was built specifically to eliminate these micro interruptions.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Centralized Access Point</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        By consolidating your most frequently accessed utilities into the menu bar's dead space, you don't even need to hunt through your dock or invoke Spotlight nearly as often. 
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Key Productivity Wins</h2>
                    <ul className="list-disc pl-6 text-[var(--color-text-secondary)] leading-relaxed space-y-4 mb-6">
                        <li><strong>The File Drop Tray:</strong> One of our most raved-about features. Instead of cluttering your desktop with temporary screenshots or assets, just drag them straight up to the notch. When you need them in Figma or Photoshop five minutes later, drag them right back down. Seamless.</li>
                        <li><strong>Built-in Pomodoro/Timers:</strong> You no longer need a bulky third-party app to run focus sessions. The notch handles visually stunning countdown animations right in your peripheral vision, ensuring you stay on task without being overbearing.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Spatially Intuitive</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        Your eye naturally gravitates toward the center of your screen. Utilizing the top center creates a spatially intuitive anchor point. It’s always there, always ready, and always out of the way when you don’t need it. With Dynamic Notch, you simply get more work done.
                    </p>
                </section>
            </motion.article>
        </div>
    );
}
