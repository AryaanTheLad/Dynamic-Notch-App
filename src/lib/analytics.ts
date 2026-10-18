import type { MouseEvent } from 'react';
import { CHECKOUT_URL, PRICE } from '../data/product.js';

/**
 * Where a checkout was started from. Every purchase CTA on the site reports one of
 * these, so the split between them answers the question the site could not answer at
 * all before: which section actually sells.
 *
 * `landing` covers the keyword-targeted pages (`/dynamic-island-for-mac`,
 * `/mac-notch-app`, the comparison and alternative pages). They all report the same
 * placement and pass their route as `page`, so the funnel stays five buckets wide while
 * still attributing a sale to the specific page that earned it.
 */
export type CtaPlacement = 'navbar' | 'hero' | 'pricing' | 'footer' | 'article' | 'landing';

/**
 * Conversion events, in one place.
 *
 * These used to go to Vercel Analytics, whose script only exists on Vercel, so since the
 * move to Cloudflare every call was silently lost. They now go to the site's own Worker
 * (`/api/event`, see worker/index.js), which writes them to Workers Analytics Engine.
 *
 * `sendBeacon` survives the page unloading, which matters here: the checkout click is the
 * moment the visitor leaves. Every call is fire-and-forget and never throws.
 */
function send(name: string, props: Record<string, string> = {}) {
  if (typeof window === 'undefined' || import.meta.env.DEV) return;
  try {
    const body = JSON.stringify({
      name,
      props,
      path: window.location.pathname,
      source: trafficSource(),
    });
    const blob = new Blob([body], { type: 'application/json' });
    if (!navigator.sendBeacon?.('/api/event', blob)) {
      void fetch('/api/event', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {
    // Analytics must never break the page.
  }
}

const SOURCE_KEY = 'dn_source';

/**
 * Where this visit came from, captured once on the landing page and kept for the session,
 * so a sale started three pages in is still credited to Google, Reddit or a newsletter
 * rather than to the site itself.
 */
export function trafficSource(): string {
  if (typeof window === 'undefined') return '';
  try {
    const stored = sessionStorage.getItem(SOURCE_KEY);
    if (stored !== null) return stored;

    const params = new URLSearchParams(window.location.search);
    let source = params.get('utm_source') || params.get('ref') || params.get('via') || '';
    if (!source && document.referrer) {
      const host = new URL(document.referrer).hostname.replace(/^www\./, '');
      if (host !== window.location.hostname.replace(/^www\./, '')) source = host;
    }
    source = source || 'direct';
    sessionStorage.setItem(SOURCE_KEY, source);
    return source;
  } catch {
    return '';
  }
}

/**
 * The checkout URL with attribution attached as LemonSqueezy custom data. It shows up
 * on the order itself (Orders → order → Custom data, and in webhooks), which is the only
 * place a click can be tied to an actual payment.
 */
export function checkoutUrlFor(placement: CtaPlacement, page = '') {
  const url = new URL(CHECKOUT_URL);
  url.searchParams.set('checkout[custom][placement]', placement);
  url.searchParams.set(
    'checkout[custom][page]',
    page || (typeof window !== 'undefined' ? window.location.pathname : ''),
  );
  const source = trafficSource();
  if (source) url.searchParams.set('checkout[custom][source]', source);
  return url.toString();
}

/**
 * Call from a checkout link's onClick, passing the event. The server-rendered `href` stays
 * the plain checkout URL (so hydration matches and the link works with JS off); the
 * attributed URL is swapped in at click time, before the browser follows the link.
 */
export function trackCheckout(
  placement: CtaPlacement,
  extra: Record<string, string> = {},
  event?: MouseEvent<HTMLAnchorElement>,
) {
  if (event) event.currentTarget.href = checkoutUrlFor(placement, extra.page);
  send('checkout_start', { placement, price: PRICE.amount, ...extra });
}

/** One per route, so checkout starts can be read as a rate per page and per source. */
export function trackPageview() {
  send('pageview');
}

/** The visitor asked to see the product in motion, which is the comprehension gate. */
export function trackDemoPlayed(placement: string) {
  send('demo_played', { placement });
}

/** A phone visitor took the handoff instead of bouncing off Mac-only software. */
export function trackMobileHandoff(method: 'email' | 'copy_link') {
  send('mobile_handoff', { method });
}

/** Which questions people actually open, which is a content roadmap for free. */
export function trackFaqOpened(question: string) {
  send('faq_opened', { question });
}

/** A visitor followed the cross-promotion to another app by the same creator. */
export function trackSisterApp(app: string) {
  send('sister_app_click', { app });
}
