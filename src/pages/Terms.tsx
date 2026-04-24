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
                        By downloading, installing, or using Dynamic Notch, you acknowledge that you have read, 
                        understood, and agree to be bound by these Terms and Conditions. If you do not agree 
                        with any part of these terms, you must not download or use the application.
                    </p>

                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">2. License & Use</h2>
                    <p>
                        Developed by Aryaan, Dynamic Notch is provided to you as a personal use utility. 
                        This grant is a license for use, not a transfer of title. Under this license, you may not:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Modify or copy the software for commercial redistribution.</li>
                        <li>Attempt to decompile or reverse engineer the application.</li>
                        <li>Remove any copyright or other proprietary notations from the materials.</li>
                    </ul>

                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">3. Disclaimer</h2>
                    <p>
                        All rights reserved. This application and its original content, features, and functionality are 
                        the exclusive property of Aryaan. Unauthorized distribution, reproduction, modification, or 
                        piracy of this software is strictly prohibited. Use of this application is granted only to 
                        individuals who have paid the full mentioned purchase price. Any attempt to bypass payment 
                        systems or distribute this application without the express written consent of the owner 
                        (Aryaan) may result in the immediate termination of access and potential legal action.
                    </p>
                    <p className="mt-4">
                        By using this software, you acknowledge the warnings presented by macOS during 
                        installation and agree that the developer is not liable for any issues, data loss, or 
                        system behavior resulting from the manual bypass of Gatekeeper security settings.
                    </p>

                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">4. Limitation of Liability</h2>
                    <p>
                        In no event shall Aryaan or Dynamic Notch be liable for any damages (including, 
                        without limitation, damages for loss of data or profit, or due to business interruption) 
                        arising out of the use or inability to use the software, even if the developer has 
                        been notified of the possibility of such damage.
                    </p>

                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">5. External Data & APIs</h2>
                    <p>
                        The application interacts with third-party software (such as Spotify and Apple Music) 
                        and external APIs (for weather data). Use of these features is subject to those 
                        respective services' own terms and privacy policies.
                    </p>

                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">6. Termination</h2>
                    <p>
                        This license shall automatically terminate if you violate any of these restrictions 
                        and may be terminated by the developer at any time. Upon terminating your viewing 
                        of these materials or upon the termination of this license, you must destroy any 
                        downloaded materials in your possession whether in electronic or printed format.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}