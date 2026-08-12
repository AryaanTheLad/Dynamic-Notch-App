import { useState } from 'react';
import { Check, Copy, Laptop, Mail } from 'lucide-react';
import { SITE_URL } from '../data/product.js';
import { trackMobileHandoff } from '../lib/analytics';

const MAIL_HREF = `mailto:?subject=${encodeURIComponent(
    'Dynamic Notch for macOS',
)}&body=${encodeURIComponent(`Install it on your Mac: ${SITE_URL}`)}`;

/**
 * Phone visitors cannot install a Mac app, so instead of pushing them at a checkout for
 * something they cannot run, hand the link over to the machine that can.
 *
 * Deliberately a `mailto:` and a clipboard copy rather than an "email me the link" form:
 * the only mail plumbing this site has is a Formspree endpoint that notifies the owner,
 * which would not actually put a link in the visitor's inbox.
 */
export default function MobileHandoff() {
    const [copied, setCopied] = useState(false);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(SITE_URL);
            trackMobileHandoff('copy_link');
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            // Clipboard blocked (insecure context, or the user declined) — the mailto
            // route beside this button still works, so fail quietly.
        }
    }

    return (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left md:hidden">
            <p className="flex items-start gap-2.5 text-xs leading-relaxed text-white/70">
                <Laptop className="mt-0.5 h-4 w-4 shrink-0 text-white/50" aria-hidden="true" />
                <span>
                    <span className="font-medium text-white">This one runs on a Mac.</span> Send
                    yourself the link and pick it up there.
                </span>
            </p>

            <div className="mt-3 flex gap-2">
                <a
                    href={MAIL_HREF}
                    onClick={() => trackMobileHandoff('email')}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 text-xs font-medium text-white transition-colors hover:bg-white/15"
                >
                    <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                    Email myself
                </a>
                <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/8 text-xs font-medium text-white transition-colors hover:bg-white/15 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-soft)]"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                            Copy link
                        </>
                    )}
                </button>
            </div>
            <p aria-live="polite" className="sr-only">
                {copied ? 'Link copied to clipboard' : ''}
            </p>
        </div>
    );
}
