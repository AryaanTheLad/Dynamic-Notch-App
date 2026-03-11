import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto min-h-[70vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold mb-6 title-gradient text-center">Contact Us</h1>
                <p className="text-[var(--color-text-secondary)] text-center mb-12 text-lg">
                    Have questions, feedback, or need support? We're here to help.
                </p>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-medium text-white/80">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-medium text-white/80">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-medium text-white/80">Message</label>
                        <textarea
                            id="message"
                            rows={5}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors resize-none"
                            placeholder="How can we help you?"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-white text-black font-medium hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center"
                    >
                        Send Message
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
