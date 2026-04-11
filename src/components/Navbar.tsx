import { m } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <m.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 right-0 z-50 glass"
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 cursor-pointer group">
                    {/* Minimalist Notch Icon */}
                    <img src="/urlicon.png" alt="Logo" width="24" height="24" className="h-6 w-6 object-contain" />
                    <span className="font-semibold text-white/90 tracking-tight text-sm translate-x-1 group-hover:translate-x-2 transition-transform duration-300">
                        Dynamic Notch
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/blog" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                        Blog
                    </Link>
                    <a href="https://dynamicnotchofficial.lemonsqueezy.com/checkout/buy/b1976809-d837-4608-acb1-7de6e790ae43" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white text-white hover:text-black text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 backdrop-blur-md border border-white/10 shadow-sm hover:shadow-lg hover:shadow-white/20 inline-flex items-center justify-center">
                        Purchase
                    </a>
                </div>
            </div>
        </m.nav>
    );
}
