import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from './SectionHeading';
import { PRICE } from '../data/product.js';
import { trackFaqOpened } from '../lib/analytics';

/**
 * Keep these eight in step with the `FAQPage` schema in `scripts/prerender.js` — the
 * markup and the rendered answers have to match for the rich result to be legitimate.
 */
const faqs = [
    {
        question: 'Is it safe for my MacBook?',
        answer:
            "Absolutely. Dynamic Notch uses native macOS APIs and doesn't modify system files.",
    },
    {
        question: 'Does it support external monitors?',
        answer:
            "Yes! However, it's recommended to be used on Macbook M1 or later for the best experience.",
    },
    {
        question: 'Does it affect my battery life?',
        answer:
            'Not at all! Dynamic notch is a very lightweight utility app that has minimal impact on the system. Used 0% cpu on idle, with 2-5% when actively being used. Ram usage is constant around 45MB.',
    },
    {
        question: 'Is there a one-time purchase?',
        answer: `Dynamic Notch is priced at ${PRICE.display}, along with a pay-what-you-want model.`,
    },
    {
        question: 'What features does it have?',
        answer:
            'File Tray, Media Control, Quick Notes, Custom Timer, Current Task Setter, Clipboard History, Weather and more!',
    },
    {
        question: 'Can I customize the application?',
        answer: 'Yes, you can configure your Dynamic Notch and change specific behaviors.',
    },
    {
        question: 'Is it compatible with older Macs?',
        answer: 'Dynamic Notch works on Apple Silicon Macs starting with the base variant of M1.',
    },
    {
        question: 'How do I hide the MacBook notch?',
        answer:
            "While our app embraces the notch, you can use our 'Hide Notch Mode' to revert the notch when needed.",
    },
];

export default function FAQ() {
    return (
        <section id="faq" className="notch-spill py-28 px-6 md:py-36">
            <div className="max-w-5xl mx-auto">
                <SectionHeading
                    eyebrow="FAQ"
                    title={<>The eight things people ask first.</>}
                />

                {/* Native <details> so keyboard support, find-in-page and reduced motion all
                    come for free — this replaced an infinite marquee that repeated every
                    question three times and could not be paused (WCAG 2.2.2). */}
                <div className="mt-14 grid grid-cols-1 items-start gap-4 md:grid-cols-2">
                    {faqs.map((faq) => (
                        <details
                            key={faq.question}
                            onToggle={(event) => {
                                // Fires on close too; only the opens are a content signal.
                                if (event.currentTarget.open) trackFaqOpened(faq.question);
                            }}
                            className="group rounded-2xl border border-white/[0.07] bg-[var(--color-surface)] transition-colors open:border-white/15 open:bg-[var(--color-surface-raised)]"
                        >
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-2xl p-6 outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-[var(--color-accent-soft)]">
                                <h3 className="text-base font-medium leading-snug tracking-[-0.01em] text-white">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    aria-hidden="true"
                                    className="h-5 w-5 shrink-0 text-white/45 transition-transform duration-300 group-open:rotate-180"
                                />
                            </summary>
                            <p className="px-6 pb-6 text-sm font-light leading-relaxed text-white/70">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>

                <p className="mt-10 text-center text-sm text-[var(--color-text-secondary)]">
                    Something not covered?{' '}
                    <Link
                        to="/contact"
                        className="text-white underline decoration-white/30 hover:decoration-white transition-colors"
                    >
                        Ask directly
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}
