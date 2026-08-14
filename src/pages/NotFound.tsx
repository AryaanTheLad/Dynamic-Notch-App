import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useEntrance } from '../hooks/useEntrance';

export default function NotFound() {
    const entrance = useEntrance();

    return (
        <>
            <SEO
                title="Page not found - Dynamic Notch"
                description="That page does not exist. Head back to the Dynamic Notch home page or browse the blog."
                robots="noindex, follow"
            />
            <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto min-h-[70vh] flex flex-col justify-center text-center">
                <m.div {...entrance({ duration: 0.6 })}>
                    {/* The notch silhouette: a bar with two rounded bottom corners. */}
                    <div className="mx-auto mb-10 w-40 h-11 rounded-b-2xl bg-white/[0.07] border border-t-0 border-white/10 flex items-center justify-center">
                        <span className="text-xs font-mono tracking-widest text-white/60">404</span>
                    </div>

                    <h1 className="title-gradient mb-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                        Nothing lives here.
                    </h1>
                    <p className="mb-10 font-light leading-relaxed text-[var(--color-text-secondary)]">
                        The page you asked for does not exist. It may have moved, or the link may be
                        wrong.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            to="/"
                            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-medium text-black transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                        >
                            Back to home
                        </Link>
                        <Link
                            to="/blog"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-8 font-medium text-white transition-colors duration-300 hover:border-white/25 hover:bg-white/12"
                        >
                            Read the blog
                        </Link>
                    </div>
                </m.div>
            </div>
        </>
    );
}
