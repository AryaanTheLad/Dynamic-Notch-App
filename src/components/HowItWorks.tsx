import { motion } from 'framer-motion';
import { Download, Sliders, Sparkles } from 'lucide-react';

const steps = [
    {
        icon: <Download className="w-6 h-6 text-white" />,
        title: "1. Download",
        description: "Install the lightweight app on your macOS device.",
        delay: 0.1
    },
    {
        icon: <Sliders className="w-6 h-6 text-white" />,
        title: "2. Customize",
        description: "Tailor the notch behavior and appearance to your workflow.",
        delay: 0.2
    },
    {
        icon: <Sparkles className="w-6 h-6 text-white" />,
        title: "3. Enjoy",
        description: "Experience a seamless, elevated desktop environment.",
        delay: 0.3
    }
];

export default function HowItWorks() {
    return (
        <section className="py-32 px-6 relative max-w-5xl mx-auto border-t border-white/5">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold tracking-tight mb-4"
                >
                    Setup in seconds.
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: step.delay }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-xl relative group">
                            <div className="absolute inset-0 bg-[#6366F1]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                {step.icon}
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                        <p className="text-[var(--color-text-secondary)] font-light leading-relaxed max-w-[250px]">
                            {step.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
