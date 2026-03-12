import { motion } from 'framer-motion';

export default function Blog() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="prose prose-invert prose-lg max-w-none"
            >
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-light italic font-serif tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                        Elevate Your macOS Experience with Dynamic Notch
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-white/80">By Aryaan</span>
                        <span>•</span>
                        <time dateTime="2023-10-25">October 25, 2023</time>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>
                </header>

                <section>
                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">The Point of Dynamic Notch</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        If you've ever envied the iOS Dynamic Island, Dynamic Notch brings that identical, hyper-refined utility straight to your Mac. 
                        The purpose of Dynamic Notch is simple: turn the passive, dead space of your MacBook's notch into a vibrant, active hub for 
                        your most essential tools, saving you time and reducing context switching. It's a premium upgrade to your everyday workflow.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Detailed Features</h2>
                    <ul className="list-disc pl-6 text-[var(--color-text-secondary)] leading-relaxed space-y-4 mb-6">
                        <li><strong>Media Control:</strong> Directly control your Apple Music or Spotify via a sleek, interactive widget hovering right below your notch. Pause, play, or skip effortlessly.</li>
                        <li><strong>File Drop Tray:</strong> Drag and drop files directly into the notch to stash them temporarily. Need to AirDrop a photo? Just drag it up.</li>
                        <li><strong>Quick Notes:</strong> Keep temporary text in a handy clipboard space attached to the notch for quick access later.</li>
                        <li><strong>Temperature Check:</strong> Glance up to see the current weather and temperature outside without opening a dedicated weather app.</li>
                        <li><strong>Custom Timer:</strong> Need to focus? Set a quick timer right from the notch with beautiful, high-fidelity countdown animations.</li>
                        <li><strong>Cinematic Customization:</strong> Switch between Standard, Cinematic Monochrome, and Translucent Glass themes to match your desktop aesthetic.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Lightweight Performance & Efficiency</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        We built Dynamic Notch with the "Apple-esque" philosophy of absolute efficiency. Engineered primarily in Swift and optimized 
                        for Apple Silicon (M1/M2/M3/M4), it boasts exceptionally low CPU overhead (typically under 0.1% usage) and virtually unnoticeable 
                        RAM consumption. It's designed to run natively and silently in the background without draining your battery or slowing down your pro apps.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">How to Use Dynamic Notch</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        Getting started is seamless. Once installed from the downloaded DMG, Dynamic Notch quietly runs in your menu bar. 
                        Simply move your mouse pointer up towards your Mac's physical notch to reveal the interactive UI. You can click on the notch 
                        to expand it, or drag files directly into the black area to trigger the File Tray.
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">A Note on Security & Notarization</h2>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                        When you first install Dynamic Notch, macOS may show a warning saying the app "cannot be opened because it is 
                        from an unidentified developer" or even a "Malware" warning.
                    </p>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        <strong>The Truth:</strong> As a university student and independent developer, the $99/year fee for an official Apple Developer Program membership is currently out of reach. Because the app isn't "Notarized" by Apple's paid servers, macOS defaults to its strictest warning. Dynamic Notch is 100% safe, open for inspection, and contains zero malicious code.
                    </p>

                    <h3 className="text-xl font-medium mt-8 mb-4 text-white underline underline-offset-8">How to Install (Bypassing the Warning)</h3>
                    <p className="text-[var(--color-text-secondary)] mb-6">
                        Since the app isn't notarized, you cannot simply double-click it to open. Follow these steps to grant it permission:
                    </p>
                    <ol className="list-decimal pl-6 text-[var(--color-text-secondary)] leading-relaxed space-y-4 mb-6">
                        <li><strong>Drag to Applications:</strong> Open the DMG and drag Dynamic Notch into your Applications folder.</li>
                        <li><strong>The First Launch:</strong> Right-click (or Control-click) the app icon in your Applications folder and select <strong>Open</strong>.</li>
                        <li><strong>Confirm:</strong> A popup will appear asking if you're sure. Click <strong>Open</strong> again. (This only needs to be done once).</li>
                        <li><strong>If it still blocks you:</strong> Go to <strong>System Settings</strong> → <strong>Privacy & Security</strong>. Scroll down to the "Security" section, where you will see a message saying "Dynamic Notch was blocked." Click <strong>Open Anyway</strong> and enter your password.</li>
                    </ol>
                </section>
            </motion.article>
        </div>
    );
}