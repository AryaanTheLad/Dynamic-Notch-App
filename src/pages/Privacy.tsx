import { motion } from 'framer-motion';

export default function Privacy() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold mb-8 title-gradient">Privacy Policy</h1>
                <div className="prose prose-invert prose-lg text-[var(--color-text-secondary)]">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">1. Introduction</h2>
                    <p>
                        Welcome to Dynamic Notch. We respect your privacy and are committed to protecting your personal data.
                        This Privacy Policy will inform you as to how we look after your personal data when you visit our website
                        or use our application.
                    </p>
                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">2. Data We Collect</h2>
                    <p>
                        Dynamic Notch is designed to run locally on your device. We collect minimal to no personal data.
                        Any optional telemetry data collected for bug and crash reporting will be strictly anonymized
                        and explicitly opt-in.
                    </p>
                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">3. How We Use Your Data</h2>
                    <p>
                        The minimal anonymized data we do collect is solely used to improve the stability and performance
                        of Dynamic Notch on macOS. We do not sell or share your data with third parties.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
