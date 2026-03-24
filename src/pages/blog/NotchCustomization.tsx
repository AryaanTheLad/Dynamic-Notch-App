import { motion } from 'framer-motion';

export default function NotchCustomization() {
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
                        How Much Can You Customize the macOS Notch?
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-white/80">By Aryaan</span>
                        <span>•</span>
                        <time dateTime="2023-12-05">March 1, 2026</time>
                        <span>•</span>
                        <span>4 min read</span>
                    </div>
                </header>

                <section>
                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Breaking Free from Static Bezels</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        Out of the box, macOS offers precisely zero options for customizing the notch. It sits there, a black rectangle waiting to be utilized. With Dynamic Notch, the static bezel isn't just utilized, it is deeply customizable to fit any personal aesthetic or workflow preference.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">The Three Core Aesthetics</h2>
                    <ul className="list-disc pl-6 text-[var(--color-text-secondary)] leading-relaxed space-y-4 mb-6">
                        <li><strong>Standard iOS Replica:</strong> For those who love consistency across devices, this setting perfectly mimics the smooth animations, deep blacks, and fluid spring physics found on an iPhone 14 Pro or newer.</li>
                        <li><strong>Cinematic Monochrome:</strong> This high contrast, black-and-white theme is tailored for deep work and minimalist setups, looking stunning alongside dark wallpapers and matching Apple's slick Pro hardware aesthetics.</li>
                        <li><strong>Translucent Glass:</strong> Leveraging native macOS blur effects, this setting makes the notch look like a physical piece of frosted glass expanding down from the bezel, adopting the colors of whatever is behind it.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Functional Customization</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        Beyond aesthetics, you decide what takes priority. You can configure whether the music widget overrides the weather, how long temporary files live in the drop tray before being purged.
                    </p>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        The notch shouldn't dictate your workflow; you should dictate the notch.
                    </p>
                </section>
            </motion.article>
        </div>
    );
}
