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
                        Welcome to Dynamic Notch. Developed by Aryaan. By Installing this app you agree to our privacy
                        policy and our terms and conditions. This app is built with a "Privacy First" philosophy. 
                        We believe that your desktop activity is your business alone. This policy explains the minimal, 
                        anonymous data we collect to help improve the app experience.
                    </p>

                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">2. Data We Collect</h2>
                    <p>
                        Dynamic Notch is designed to run almost entirely locally on your Mac. We do not collect names, 
                        emails, IP addresses, or any personally identifiable information (PII).
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong className="text-white">Anonymous Install Signal:</strong> When you open the app for the 
                            very first time, a one-time anonymous signal is sent to our server to increment a download counter. 
                            This signal only contains the app version.
                        </li>
                        <li>
                            <strong className="text-white">Local Storage:</strong> Features like Quick Notes and your 
                            File Tray are stored exclusively on your own machine. We never upload your files or text 
                            content to any cloud server.
                        </li>
                        <li>
                            <strong className="text-white">Weather Data:</strong> Location requests for the weather widget 
                            are handled via the system's location services and used only to fetch current conditions from 
                            open APIs. We do not store your coordinate history.
                        </li>
                    </ul>

                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">3. How We Use Your Data</h2>
                    <p>
                        The minimal data we collect is used solely for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Monitoring the total number of active installations to justify further development.</li>
                        <li>Ensuring compatibility by tracking which app versions are most widely used.</li>
                    </ul>
                    <p className="mt-4">
                        We do not and will never sell, rent, or share your data with third parties or data brokers.
                    </p>

                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">4. Transparency & Security</h2>
                    <p>
                        Since Dynamic Notch is not notarized by Apple due to the high cost of the developer program, 
                        we remain fully transparent about our code. The app is built with standard Swift and SwiftUI 
                        libraries and does not perform any background "phoning home" aside from the initial install signal.
                    </p>

                    <h2 className="text-white mt-8 mb-4 text-2xl font-semibold">5. Contact</h2>
                    <p>
                        If you have any questions about this policy or the app’s behavior, feel free to reach out 
                        through our official channels.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}