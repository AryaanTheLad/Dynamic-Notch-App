import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../data/product.js';

/**
 * 1200×630 card built for `summary_large_image`. The old default was urlicon.png —
 * a 2000×2000, 246 KB square, which every platform either cropped or rejected.
 */
const DEFAULT_IMAGE = `${SITE_URL}/og-card.jpg`;
const DEFAULT_IMAGE_ALT =
  'Dynamic Notch — everyone else hides the notch. We gave it a job. macOS 14.6+, Apple Silicon, $5.99 once.';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
  robots?: string;
}

/**
 * Updates an existing head tag in place, creating it only when it is genuinely absent.
 *
 * "In place" is the whole point. This component used to render `<Helmet>`, which under
 * React 19 delegates to React's native metadata hoisting — and that hoisting *appends*
 * to `<head>` with no knowledge of the tags `scripts/prerender.js` already wrote into
 * the served HTML. The result was every meta tag, and the canonical, duplicated on
 * every page in production. Mutating the existing node cannot produce a second one.
 */
function setMetaTag(key: 'name' | 'property', value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${value}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Keeps the document head in step with client-side navigation.
 *
 * This renders nothing. `scripts/prerender.js` is the single source of truth for the
 * head of every route — it writes the title, meta, canonical and JSON-LD into each
 * route's static HTML, which is what crawlers read, because a crawler always fetches a
 * fresh document rather than navigating the SPA.
 *
 * What this component covers is the case a crawler never sees: a visitor clicking from
 * one route to another, where the document is never reloaded and the tab title would
 * otherwise still say "Dynamic Notch" while they read the privacy policy.
 *
 * JSON-LD is deliberately not managed here. It only matters to crawlers, crawlers only
 * ever see the prerendered document, and `verifyRouteCoverage()` in prerender.js fails
 * the build if a route is missing its entry — so there is no path by which a route ends
 * up without schema.
 */
export default function SEO({
  title,
  description,
  name = 'Dynamic Notch',
  type = 'website',
  url,
  image = DEFAULT_IMAGE,
  imageAlt = DEFAULT_IMAGE_ALT,
  imageWidth = '1200',
  imageHeight = '630',
  robots = 'index, follow',
}: SEOProps) {
  const { pathname } = useLocation();
  const canonicalUrl = url || `${SITE_URL}${pathname === '/' ? '' : pathname}`;

  useEffect(() => {
    document.title = title;

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', robots);

    setCanonical(canonicalUrl);

    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:image:width', imageWidth);
    setMetaTag('property', 'og:image:height', imageHeight);
    setMetaTag('property', 'og:image:alt', imageAlt);
    setMetaTag('property', 'og:site_name', 'Dynamic Notch');

    setMetaTag('name', 'twitter:creator', name);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);
    setMetaTag('name', 'twitter:image:alt', imageAlt);
  }, [
    title,
    description,
    name,
    type,
    canonicalUrl,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    robots,
  ]);

  return null;
}
