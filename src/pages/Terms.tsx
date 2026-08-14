import { m } from 'framer-motion';
import SEO from '../components/SEO';
import { useEntrance } from '../hooks/useEntrance';
import { LEGAL_LAST_UPDATED_LABEL } from '../data/product.js';

export default function Terms() {
    const entrance = useEntrance();

    return (
        <>
            <SEO 
                title="Terms of Service: Dynamic Notch"
                description="Read the terms of service governing the download, license, and usage of the Dynamic Notch macOS application."
            />
            <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
            <m.div
                {...entrance({ duration: 0.6 })}
            >
                <h1 className="title-gradient text-4xl font-semibold tracking-[-0.03em] md:text-5xl">Terms of Service</h1>
                <div className="prose prose-invert prose-lg mt-6 text-[var(--color-text-secondary)]">
                    <p>Last updated: {LEGAL_LAST_UPDATED_LABEL}</p>
                    
                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">1. Acceptance of Terms</h2>
                    <p>
                        By downloading, installing, or using Dynamic Notch, you acknowledge that you have read, 
                        understood, and agree to be bound by these Terms and Conditions. If you do not agree 
                        with any part of these terms, you must not download or use the application.
                    </p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">2. License & Use</h2>
                    <p>
                        Developed by Aryaan, Dynamic Notch is provided to you as a personal use utility. 
                        This grant is a license for use, not a transfer of title. Under this license, you may not:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Modify or copy the software for commercial redistribution.</li>
                        <li>Attempt to decompile or reverse engineer the application.</li>
                        <li>Remove any copyright or other proprietary notations from the materials.</li>
                    </ul>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">3. Disclaimer</h2>
                    <p>
                        All rights reserved. This application and its original content, features, and functionality are 
                        the exclusive property of Aryaan. Unauthorized distribution, reproduction, modification, or 
                        piracy of this software is strictly prohibited. Use of this application is granted only to 
                        individuals who have paid the full mentioned purchase price. Any attempt to bypass payment 
                        systems or distribute this application without the express written consent of the owner 
                        (Aryaan) may result in the immediate termination of access and potential legal action.
                    </p>
                    <p className="mt-4">
                        You agree to obtain the application only from its official distribution channel. The
                        developer is not liable for any issues, data loss, or system behaviour arising from
                        modified, repackaged, or third-party redistributed copies of the software.
                    </p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">4. Limitation of Liability</h2>
                    <p>
                        In no event shall Aryaan or Dynamic Notch be liable for any damages (including, 
                        without limitation, damages for loss of data or profit, or due to business interruption) 
                        arising out of the use or inability to use the software, even if the developer has 
                        been notified of the possibility of such damage.
                    </p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">5. External Data & APIs</h2>
                    <p>
                        The application interacts with third-party software (such as Spotify and Apple Music) 
                        and external APIs (for weather data). Use of these features is subject to those 
                        respective services' own terms and privacy policies.
                    </p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">6. Termination</h2>
                    <p>
                        This license shall automatically terminate if you violate any of these restrictions 
                        and may be terminated by the developer at any time. Upon terminating your viewing 
                        of these materials or upon the termination of this license, you must destroy any 
                        downloaded materials in your possession whether in electronic or printed format.
                    </p>
                </div>
            </m.div>
        </div>
        </>
    );
}