import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative pt-32 pb-10 border-t border-white/5 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6366F1] opacity-[0.03] blur-[100px] rounded-[100%] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8">
                        Ready to elevate?
                    </h2>
                <a href="/DynamicNotchApp.dmg" download className="h-14 px-10 rounded-full bg-white text-black font-medium text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] inline-flex items-center justify-center">
                    Download Dynamic Notch
                </a>        
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-sm font-light text-[var(--color-text-secondary)]">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <span className="font-semibold text-white tracking-tight">Dynamic Notch</span>
                        <span>© {new Date().getFullYear()}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                        <a href="#" className="hover:text-white transition-colors flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 ml-2">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.418H5.078z"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
