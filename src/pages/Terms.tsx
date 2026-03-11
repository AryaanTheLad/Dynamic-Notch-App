import { motion } from 'framer-motion';

export default function Terms() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-bold mb-8 title-gradient">Terms of Service</h1>
                <div className="prose prose-invert prose-lg text-[var(--color-text-secondary)]">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
                    <p>
                        By accessing and downloading Dynamic Notch, you accept and agree to be bound by the terms and provision of this agreement.
                        In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>
                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">2. Use License</h2>
                    <p>
                        Permission is granted to temporarily download one copy of the materials (information or software) on Dynamic Notch's
                        website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                    </p>
                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">3. Disclaimer</h2>
                    <p>
                        The materials on Dynamic Notch's website and application are provided on an 'as is' basis. Dynamic Notch makes no
                        warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
                        implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
