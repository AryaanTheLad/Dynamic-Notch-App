import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import HomeLink from './HomeLink';
import { useEntrance } from '../hooks/useEntrance';
import { CHECKOUT_URL, COPYRIGHT_YEAR, PRICE, REFUND_POLICY, REQUIREMENTS, SOCIAL } from '../data/product.js';
import { trackCheckout } from '../lib/analytics';

/** py-3 on a 20px line box clears the 44×44pt minimum tap target on mobile. */
const footerLink = 'inline-flex items-center py-3 hover:text-white transition-colors';

export default function Footer() {
    const entrance = useEntrance();

    return (
        <footer className="relative overflow-hidden border-t border-white/5 pt-20 pb-10 md:pt-28">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-accent)] opacity-[0.03] blur-[100px] rounded-[100%] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
                <m.div {...entrance({ y: 30, duration: 0.8, inView: true })} className="mb-20">
                    <h2 className="mb-8 text-[2rem] font-semibold tracking-[-0.03em] text-white md:text-[2.75rem]">
                        {PRICE.display}. Once. No subscription.
                    </h2>
                    <a
                        href={CHECKOUT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCheckout('footer')}
                        className="h-14 px-10 rounded-full bg-white text-black font-medium text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] inline-flex items-center justify-center"
                    >
                        Buy Dynamic Notch, {PRICE.display}
                    </a>

                    <p className="mt-6 text-sm text-white/60">
                        {REQUIREMENTS.minMacOSLabel} · {REQUIREMENTS.architecture} ·{' '}
                        {REQUIREMENTS.downloadSize} download
                    </p>
                    <p className="mt-2 text-xs text-white/55 max-w-md mx-auto leading-relaxed">
                        Signed and notarized by Apple. {REFUND_POLICY}
                    </p>
                </m.div>

                {/* The category pages, linked sitewide.
                    They are the site's entry points from search but nothing on the home page
                    pointed at them, which left them reachable only from the sitemap. A link
                    in the footer of every page is the cheapest way to get them crawled and to
                    pass the home page's authority into them. */}
                <nav aria-label="Guides" className="mb-10">
                    <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                        Guides
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 text-sm font-light text-[var(--color-text-secondary)]">
                        <Link to="/best-mac-notch-apps" className={footerLink}>
                            Best Mac notch apps
                        </Link>
                        <Link to="/dynamic-island-for-mac" className={footerLink}>
                            Dynamic Island for Mac
                        </Link>
                        <Link to="/mac-notch-app" className={footerLink}>
                            What is a notch app?
                        </Link>
                        <Link to="/alternatives/notchnook" className={footerLink}>
                            NotchNook alternatives
                        </Link>
                        <Link to="/alternatives/boring-notch" className={footerLink}>
                            Boring Notch alternatives
                        </Link>
                        <Link to="/blog/how-to-hide-macbook-notch" className={footerLink}>
                            How to hide the notch
                        </Link>
                    </div>
                </nav>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm font-light text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-2 mb-2 md:mb-0">
                        <HomeLink className="font-semibold text-white tracking-tight hover:opacity-80 transition-opacity py-3">Dynamic Notch</HomeLink>
                        <span>© {COPYRIGHT_YEAR}</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-6">
                        <HomeLink className={footerLink}>Home</HomeLink>
                        <Link to="/blog" className={footerLink}>Blog</Link>
                        <Link to="/changelog" className={footerLink}>Changelog</Link>
                        <Link to="/privacy" className={footerLink}>Privacy Policy</Link>
                        <Link to="/terms" className={footerLink}>Terms of Service</Link>
                        <Link to="/contact" className={footerLink}>Contact</Link>
                        <a
                            href={SOCIAL.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Dynamic Notch on X"
                            className={footerLink}
                        >
                            X
                        </a>
                        <a
                            href={SOCIAL.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Aryaan on GitHub"
                            className={footerLink}
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
