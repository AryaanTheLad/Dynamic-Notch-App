import { m } from 'framer-motion';
import { useState } from 'react';
import SEO from '../components/SEO';
import { useEntrance } from '../hooks/useEntrance';

/** One field style, so the inputs match the buttons and cards everywhere else. */
const FIELD =
    'w-full rounded-2xl border border-white/[0.09] bg-[var(--color-surface)] px-4 py-3 text-sm font-light text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/25 focus-visible:ring-2 focus-visible:ring-[var(--color-accent-soft)]';

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const entrance = useEntrance();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Honeypot: a real person never sees this field, so anything in it is a bot
        // filling every input it finds. Report success rather than an error, telling a
        // spam script it failed just invites it to retry with a different shape.
        if (formData.get("company")) {
            setStatus("success");
            form.reset();
            return;
        }

        const response = await fetch("https://formspree.io/f/xpqyrlev", {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            setStatus("success");
            form.reset();
        } else {
            setStatus("error");
        }
    }

    return (
        <>
            <SEO
                title="Contact Dynamic Notch: Support and Feedback"
                description="Questions about Dynamic Notch, a bug to report, or a feature you want in the notch? Write to the developer directly and get a real reply."
            />
            <div className="mx-auto min-h-[70vh] max-w-2xl px-6 pt-32 pb-20">
                <m.div {...entrance({ duration: 0.8, ease: [0.16, 1, 0.3, 1] })}>
                    <h1 className="title-gradient text-center text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                        Get in touch
                    </h1>
                    <p className="mx-auto mt-5 mb-12 max-w-md text-center text-base font-light leading-relaxed text-[var(--color-text-secondary)]">
                        Bugs, refunds, feature requests, or a question the FAQ did not answer.
                        This goes straight to Aryaan, who wrote the app.
                    </p>

                    {status === "success" ? (
                        <m.div
                            {...entrance({ y: 0, scale: 0.98, duration: 1 })}
                            className="rounded-3xl border border-white/[0.07] bg-[var(--color-surface)] p-8 text-center md:p-12"
                        >
                            <h2 className="text-2xl font-semibold tracking-[-0.01em] text-white">
                                Message sent
                            </h2>
                            <p className="mx-auto mt-4 max-w-sm text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                                It landed. You will get a reply from Aryaan, usually within a day.
                            </p>
                            <button
                                type="button"
                                onClick={() => setStatus("idle")}
                                className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] px-6 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/12"
                            >
                                Send another message
                            </button>
                        </m.div>
                    ) : (
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {/* Honeypot. `hidden` keeps it out of the layout and out of the
                                accessibility tree, so screen readers never announce it, while
                                a bot parsing the DOM still finds and fills it. */}
                            <input
                                type="text"
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                aria-hidden="true"
                                hidden
                            />
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-xs font-medium text-white/60">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className={FIELD}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-xs font-medium text-white/60">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className={FIELD}
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-xs font-medium text-white/60">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    className={`${FIELD} resize-none leading-relaxed`}
                                    placeholder="What is going on?"
                                ></textarea>
                            </div>

                            <div className="flex justify-center pt-2">
                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-medium text-black shadow-[0_10px_40px_-12px_rgba(255,255,255,0.5)] transition-transform duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {status === "submitting" ? "Sending..." : "Send message"}
                                </button>
                            </div>

                            {status === "error" && (
                                <p role="alert" className="text-center text-sm text-white/60">
                                    That did not go through. Try again, or email directly if it keeps failing.
                                </p>
                            )}
                        </form>
                    )}
                </m.div>
            </div>
        </>
    );
}