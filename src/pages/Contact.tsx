import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        // 🔥 IMPORTANT: Replace 'YOUR_FORMSPREE_ID' with your ID from Formspree
        const response = await fetch("https://formspree.io/f/xpqyrlev", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            setStatus("success");
            form.reset();
        } else {
            setStatus("error");
        }
    }

    return (
        <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto min-h-[70vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <h1 className="text-5xl font-light italic font-serif mb-4 title-gradient text-center">Contact Us</h1>
                <p className="text-white/40 text-center mb-16 text-sm uppercase tracking-[0.3em]">
                    A Direct Line to Aryaan
                </p>

                {status === "success" ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-black border border-white/20 rounded-none p-16 text-center shadow-[0_0_60px_rgba(255,255,255,0.03)]"
                    >
                        <h2 className="text-4xl font-light italic font-serif text-white mb-6">Message Sent</h2>
                        <div className="h-px w-8 bg-white/40 mx-auto mb-8" />
                        <p className="text-white/60 text-sm tracking-wide leading-relaxed max-w-xs mx-auto">
                            Your transmission has been received. Aryaan will review your message shortly. Thank you for reaching out.
                        </p>
                        <button 
                            onClick={() => setStatus("idle")}
                            className="mt-12 px-8 py-3 border border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/30 hover:text-white hover:border-white transition-all duration-700"
                        >
                            Send another message
                        </button>
                    </motion.div>
                ) : (
                    <form className="space-y-10" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="flex flex-col gap-3">
                                <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-all duration-500 font-light"
                                    placeholder="Full Name"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-all duration-500 font-light"
                                    placeholder="Email Address"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-white/30 ml-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-white transition-all duration-500 resize-none font-light leading-relaxed"
                                placeholder="Write your message here..."
                            ></textarea>
                        </div>

                        <div className="pt-6 flex justify-center">
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="group relative px-12 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:px-16 disabled:opacity-50"
                            >
                                <span className="relative z-10">
                                    {status === "submitting" ? "Sending..." : "Send Message"}
                                </span>
                                <div className="absolute inset-0 bg-white group-hover:bg-white/90 transition-all" />
                            </button>
                        </div>
                        
                        {status === "error" && (
                            <p className="text-white/40 text-[10px] uppercase tracking-widest text-center mt-4 italic">The transmission failed. Please try again.</p>
                        )}
                    </form>
                )}
            </motion.div>
        </div>
    );
}