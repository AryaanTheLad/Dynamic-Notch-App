import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-accent)] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Text */}
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 mb-6 backdrop-blur-sm">
            Available for macOS
          </span>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6 leading-tight">
            Your workflow,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              elevated.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Bring the power of the Dynamic Island to your Mac. Seamless,
            smart, and sleek.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://dynamicnotchofficial.lemonsqueezy.com/checkout/buy/b1976809-d837-4608-acb1-7de6e790ae43"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-8 rounded-full bg-white text-black font-medium hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] inline-flex items-center justify-center"
            >
              Purchase Now
            </a>
            <button 
              onClick={() => {
                const element = document.getElementById("demo-video-container");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="h-12 px-8 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Watch Demo
            </button>
          </div>
        </motion.div>
      </div>

      {/* Screen Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto mt-20 relative z-10"
      >
        {/* Outer Frame */}
        <div className="aspect-video rounded-t-3xl border border-white/10 border-b-0 bg-white/5 p-2 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          
          {/* Screen Surface (REAL fade using mask) */}
          <div
            className="absolute inset-0 rounded-t-2xl bg-[#0a0a0a]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 90%, transparent 200%)",
              maskImage:
                "linear-gradient(to bottom, black 90%, transparent 200%)",
            }}
          />

          {/* Wallpaper / Glow */}
          <div className="absolute inset-0 opacity-30 mix-blend-screen">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[var(--color-accent)] via-transparent to-transparent opacity-20" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-500/20 blur-[80px] rounded-full" />
          </div>

          {/* Video Preview */}
          <div id="demo-video-container" className="absolute inset-0 z-10 rounded-t-2xl overflow-hidden border-t border-white/10">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
              controls
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Simulated Desktop Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-black rounded-b-2xl border border-white/10 border-t-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between px-3 z-20">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
              <div className="w-16 h-1 bg-white/10 rounded-full" />
            </div>
            <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}