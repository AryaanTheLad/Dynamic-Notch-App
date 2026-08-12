import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import HomeLink from './HomeLink';
import { useEntrance } from '../hooks/useEntrance';
import { CHECKOUT_URL, PRICE } from '../data/product.js';
import { trackCheckout } from '../lib/analytics';

const SECTIONS = [
    { href: '/#features', label: 'Features' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/#specs', label: 'Specs' },
    { href: '/#faq', label: 'FAQ' },
];

export default function Navbar() {
    const entrance = useEntrance();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <m.nav
            {...entrance({ y: -20, duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
                scrolled ? 'glass' : 'bg-transparent'
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <HomeLink className="group flex cursor-pointer items-center gap-2 py-3">
                    {/* 48×48 WebP for a 24px slot — urlicon.png is 2000×2000 and stays a favicon. */}
                    <img src="/logo-48.webp" alt="Dynamic Notch" width="24" height="24" className="h-6 w-6 object-contain" />
                    <span className="translate-x-1 text-sm font-semibold tracking-[-0.01em] text-white/90 transition-transform duration-300 group-hover:translate-x-2">
                        Dynamic Notch
                    </span>
                </HomeLink>

                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="hidden items-center md:flex">
                        {SECTIONS.map((section) => (
                            <Link
                                key={section.href}
                                to={section.href}
                                className="inline-flex items-center rounded-full px-3 py-3 text-sm font-medium text-white/65 transition-colors hover:text-white"
                            >
                                {section.label}
                            </Link>
                        ))}
                    </div>

                    <Link
                        to="/blog"
                        className="inline-flex items-center rounded-full px-3 py-3 text-sm font-medium text-white/65 transition-colors hover:text-white"
                    >
                        Blog
                    </Link>

                    <a
                        href={CHECKOUT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackCheckout('navbar')}
                        className="relative z-50 ml-1 inline-flex items-center justify-center rounded-full border border-white/12 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-black"
                    >
                        Buy — {PRICE.display}
                    </a>
                </div>
            </div>
        </m.nav>
    );
}
