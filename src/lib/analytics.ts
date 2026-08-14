import { track } from '@vercel/analytics';
import { PRICE } from '../data/product.js';

/**
 * Where a checkout was started from. Every purchase CTA on the site reports one of
 * these, so the split between them answers the question the site could not answer at
 * all before: which section actually sells.
 */
export type CtaPlacement = 'navbar' | 'hero' | 'pricing' | 'footer' | 'article';

/**
 * Conversion events, in one place.
 *
 * Vercel Analytics was recording page views and nothing else, no CTA clicks, no
 * checkout starts, no way to attribute a sale to a page. Reconciling `checkout_start`
 * against LemonSqueezy's completed orders gives the real conversion rate.
 *
 * `track` is a no-op when analytics has not loaded (ad blockers, local dev), so these
 * are safe to call unconditionally and never need a guard at the call site.
 */
export function trackCheckout(placement: CtaPlacement, extra: Record<string, string> = {}) {
  track('checkout_start', { placement, price: PRICE.amount, ...extra });
}

/** The visitor asked to see the product in motion, which is the comprehension gate. */
export function trackDemoPlayed(placement: string) {
  track('demo_played', { placement });
}

/** A phone visitor took the handoff instead of bouncing off Mac-only software. */
export function trackMobileHandoff(method: 'email' | 'copy_link') {
  track('mobile_handoff', { method });
}

/** Which questions people actually open, which is a content roadmap for free. */
export function trackFaqOpened(question: string) {
  track('faq_opened', { question });
}
