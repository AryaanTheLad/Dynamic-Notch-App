import { m } from 'framer-motion';
import SEO from '../components/SEO';
import { useEntrance } from '../hooks/useEntrance';
import { LEGAL_LAST_UPDATED_LABEL } from '../data/product.js';

export default function Privacy() {
    const entrance = useEntrance();

    return (
        <>
            <SEO
                title="Privacy Policy: Dynamic Notch"
                description="What Dynamic Notch reads, what it stores and the only network calls it makes. Notes, clipboard history, files, calendar events and the camera never leave your Mac."
            />
            <div className="mx-auto max-w-3xl px-6 pt-32 pb-20">
            <m.div
                {...entrance({ duration: 0.6 })}
            >
                <h1 className="title-gradient text-4xl font-semibold tracking-[-0.03em] md:text-5xl">Privacy Policy</h1>
                <div className="prose prose-invert prose-lg mt-6 text-[var(--color-text-secondary)]">
                    <p>Last updated: {LEGAL_LAST_UPDATED_LABEL}</p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">1. The short version</h2>
                    <p>
                        Dynamic Notch runs on your Mac. Notes, clipboard history, file tray contents,
                        calendar events and the camera preview stay on the machine and are never
                        uploaded anywhere. The app collects no names, no email addresses and nothing
                        that identifies you. This page sets out exactly what it does read, what it
                        stores and the only times it touches the network.
                    </p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">2. What stays on your Mac</h2>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>
                            <strong className="text-white">Notes, clipboard history and the file tray.</strong>{' '}
                            Stored locally. Files in the tray are referenced in place, not copied to a
                            server. Clipboard entries from password managers are deliberately skipped.
                        </li>
                        <li>
                            <strong className="text-white">Calendar events.</strong> Read through
                            Apple&apos;s EventKit only if you switch the events module on and grant
                            access. Titles and times are displayed in the notch and never transmitted.
                        </li>
                        <li>
                            <strong className="text-white">Camera.</strong> The mirror shows a live
                            preview while the section is open. Nothing is recorded, saved or sent, and
                            the camera is released the moment you close it.
                        </li>
                        <li>
                            <strong className="text-white">Colours you sample.</strong> Read from the
                            screen and put on your clipboard. Nothing is logged.
                        </li>
                    </ul>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">3. The only network calls</h2>
                    <ul className="list-disc space-y-2 pl-6">
                        <li>
                            <strong className="text-white">A one-time install signal.</strong> The first
                            time you open the app it increments an install counter. The request carries
                            the app version and nothing else.
                        </li>
                        <li>
                            <strong className="text-white">Weather lookups.</strong> If the weather
                            module is on, your approximate location is used to fetch current conditions
                            from Open-Meteo. No coordinate history is stored.
                        </li>
                        <li>
                            <strong className="text-white">Update checks.</strong> Sparkle fetches the
                            public appcast feed to see whether a newer build exists.
                        </li>
                    </ul>
                    <p className="mt-4">
                        There is no analytics SDK, no advertising identifier and no account system. Your
                        data is never sold, rented or shared with third parties or data brokers.
                    </p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">4. Permissions</h2>
                    <p>
                        Every permission is tied to a module, and a module you leave switched off never
                        asks for one. Location is for weather, calendar access is for events, and the
                        camera is for the mirror. You can revoke any of them in System Settings at any
                        time, and the rest of the app carries on working.
                    </p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">5. Security</h2>
                    <p>
                        Dynamic Notch is signed with an Apple Developer ID and notarized by Apple, which
                        means macOS verifies the binary before it runs and Apple has scanned it for
                        malware. It is built in Swift and SwiftUI on standard system frameworks, does
                        not modify system files, and does not phone home beyond the three calls listed
                        above.
                    </p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">6. Payments</h2>
                    <p>
                        Purchases are handled by LemonSqueezy as merchant of record. Payment details are
                        entered on their checkout and are never seen by, or passed to, this app.
                    </p>

                    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white">7. Contact</h2>
                    <p>
                        Questions about this policy, or about anything the app does on your machine, can
                        go straight to the developer through the contact page.
                    </p>
                </div>
            </m.div>
        </div>
        </>
    );
}