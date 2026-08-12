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
        <footer className="relative pt-32 pb-10 border-t border-white/5 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-accent)] opacity-[0.03] blur-[100px] rounded-[100%] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
                <m.div {...entrance({ y: 30, duration: 0.8, inView: true })} className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8">
                        {PRICE.display}. Once. No subscription.
                    </h2>
                    <a
                        href={CHECKOUT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCheckout('footer')}
                        className="h-14 px-10 rounded-full bg-white text-black font-medium text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] inline-flex items-center justify-center"
                    >
                        Buy Dynamic Notch — {PRICE.display}
                    </a>

                    <p className="mt-6 text-sm text-white/60">
                        {REQUIREMENTS.minMacOSLabel} · {REQUIREMENTS.architecture} ·{' '}
                        {REQUIREMENTS.downloadSize} download
                    </p>
                    <p className="mt-2 text-xs text-white/55 max-w-md mx-auto leading-relaxed">
                        Signed and notarized by Apple. {REFUND_POLICY}
                    </p>
                </m.div>

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
