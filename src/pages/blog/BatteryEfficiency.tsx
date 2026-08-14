import { m } from 'framer-motion';
import ArticleSEO from '../../components/ArticleSEO';
import ArticleFooter from '../../components/ArticleFooter';
import { useEntrance } from '../../hooks/useEntrance';

export default function BatteryEfficiency() {
    const entrance = useEntrance();

    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <ArticleSEO 
                title="Does Dynamic Notch Affect Your MacBook Battery Life?"
                description="Learn how Dynamic Notch runs natively and silently in the background without draining your battery or slowing down your pro apps."
                publishDate="2026-03-20"
                url="https://www.dynamicnotch.tech/blog/battery-efficiency"
            />
            <m.article
                {...entrance({ duration: 0.6 })}
                className="prose prose-invert prose-lg max-w-none"
            >
                <header className="mb-12">
                    <h1 className="title-gradient mb-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                        Does Dynamic Notch Affect Your MacBook Battery Life?
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-white/80">By Aryaan</span>
                        <span aria-hidden="true">•</span>
                        <time dateTime="2026-03-20">March 20, 2026</time>
                        <span aria-hidden="true">•</span>
                        <span>1 min read</span>
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
            </m.article>
            <ArticleFooter currentId="battery-efficiency" />
        </div>
    );
}
