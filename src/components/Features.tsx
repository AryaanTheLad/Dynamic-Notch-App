import { motion } from 'framer-motion';
import { Play, Folder, Edit3, Thermometer } from 'lucide-react';

const features = [
    {
        title: "Media Control",
        description: "Instantly pause, play, or skip tracks with a single click. Your music, always within reach.",
        icon: <Play className="w-5 h-5 text-emerald-400" />,
        colSpan: "md:col-span-2",
        delay: 0.1,
        gradient: "from-emerald-500/10 to-transparent",
        image: (
            <div className="w-full h-32 mt-4 bg-black/50 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="w-48 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-between px-4 border border-white/10 shadow-lg">
                    <div className="w-6 h-6 rounded-md bg-zinc-800" />
                    <div className="flex gap-3">
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                        <div className="w-3 h-3 rounded-full bg-white" />
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                    </div>
                </div>
            </div>
        )
    },
    {
        title: "File Tray",
        description: "Drag and drop files to store them temporarily or AirDrop instantly.",
        icon: <Folder className="w-5 h-5 text-blue-400" />,
        colSpan: "md:col-span-1",
        delay: 0.2,
        gradient: "from-blue-500/10 to-transparent",
        image: (
            <div className="w-full h-32 mt-4 bg-black/50 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="flex flex-col gap-2">
                    <div className="w-24 h-8 bg-blue-500/20 border border-blue-500/30 rounded-md" />
                    <div className="w-24 h-8 bg-blue-500/10 border border-blue-500/20 rounded-md" />
                </div>
            </div>
        )
    },
    {
        title: "Quick Notes",
        description: "Jot down brilliant ideas in a flash. Click to copy them.",
        icon: <Edit3 className="w-5 h-5 text-purple-400" />,
        colSpan: "md:col-span-1",
        delay: 0.3,
        gradient: "from-purple-500/10 to-transparent",
        image: (
            <div className="w-full h-32 mt-4 bg-black/50 rounded-lg border border-white/5 relative overflow-hidden flex items-start justify-start p-4">
                <div className="w-full bg-transparent border-b border-white/10 text-white/40 text-sm pb-1">
                    Buy groceries...|
                </div>
            </div>
        )
    },
    {
        title: "Temperature Check",
        description: "Keep an eye on outside temperature right from your notch.",
        icon: <Thermometer className="w-5 h-5 text-orange-400" />,
        colSpan: "md:col-span-2",
        delay: 0.4,
        gradient: "from-orange-500/10 to-transparent",
        image: (
            <div className="w-full h-32 mt-4 bg-black/50 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="w-40 h-10 bg-[#1a1a1a] rounded-full flex items-center px-4 border border-white/10 shadow-lg">
                    <span className="text-orange-400 font-medium ml-2">82°C</span>
                    <div className="flex-1 ml-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-orange-400 to-red-500" />
                    </div>
                </div>
            </div>
        )
    }
];

export default function Features() {
    return (
        <section className="py-32 px-6 relative max-w-6xl mx-auto">
            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold tracking-tight mb-4"
                >
                    Everything you need.<br />
                    <span className="text-white/40">Nothing you don't.</span>
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: feature.delay }}
                        className={`group rounded-3xl bg-zinc-900 border border-white/5 p-8 hover:border-white/10 transition-colors relative overflow-hidden ${feature.colSpan}`}
                    >
                        {/* Subtle Gradient Background */}
                        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center border border-white/5">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                            </div>

                            <p className="text-[var(--color-text-secondary)] font-light leading-relaxed mb-6 flex-1">
                                {feature.description}
                            </p>

                            {feature.image}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
