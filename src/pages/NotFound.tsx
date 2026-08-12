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

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4">
                        Nothing lives here.
                    </h1>
                    <p className="text-[var(--color-text-secondary)] font-light leading-relaxed mb-10">
                        The page you asked for does not exist — it may have moved, or the link may be
                        wrong.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/"
                            className="h-12 px-8 rounded-full bg-white text-black font-medium hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center justify-center"
                        >
                            Back to home
                        </Link>
                        <Link
                            to="/blog"
                            className="h-12 px-8 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 inline-flex items-center justify-center"
                        >
                            Read the blog
                        </Link>
                    </div>
                </m.div>
            </div>
        </>
    );
}
