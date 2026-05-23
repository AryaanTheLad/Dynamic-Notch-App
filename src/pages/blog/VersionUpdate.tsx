import { motion } from 'framer-motion';
import ArticleSEO from '../../components/ArticleSEO';

export default function VersionUpdate() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <ArticleSEO
                title="Major App Updates and Performance Optimizations"
                description="We have added multi file dragging and opening functionality, fixed bug errors, and made the app more optimized for a seamless experience."
                publishDate="2026-05-23"
                url="https://dynamicnotch.tech/blog/versionUpdate"
            />
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-invert prose-lg max-w-none"
            >
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-light italic font-serif tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                        Major App Updates and Performance Optimizations
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-white/80">By Aryaan</span>
                        <span>•</span>
                        <time dateTime="2026-05-23">May 23, 2026</time>
                        <span>•</span>
                        <span>2 min read</span>
                    </div>
                </header>

                <section>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        We are thrilled to announce a significant update to Dynamic Notch. Our focus has always been on creating a seamless and native feeling experience for macOS users. With this latest release, we are taking a huge step forward in achieving that goal by introducing highly requested features and making substantial under the hood improvements.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Enhanced Drag and Drop Functionality</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        One of the core features of a dynamic island interface is how it interacts with the rest of your system. We have now added multi file dragging and opening functionality directly into the notch. You can seamlessly drag multiple images, documents, or media files straight into the Dynamic Notch area. It acts as a perfect temporary drop zone or a quick way to open multiple files simultaneously without cluttering your desktop or losing your workflow. This entirely changes how you manage transient files during busy work sessions.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Squashing Bugs and Improving Stability</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        We heard your feedback regarding occasional hiccups and visual glitches. Our team has rigorously tested the application and fixed numerous bug errors that were affecting the user experience. You will notice that transitions are smoother and edge cases where the notch would behave unpredictably have been completely resolved. The application now feels incredibly stable even during intense system loads.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Peak Optimization</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        Performance is everything. We have made the app significantly more optimized to ensure it uses the absolute minimum amount of your CPU and RAM. The animations are faster, the memory footprint is smaller, and the overall responsiveness has been dramatically improved. You get all the visual flair and utility of the Dynamic Notch with zero compromises on your MacBook performance.
                    </p>
                </section>
            </motion.article>
        </div>
    );
}
