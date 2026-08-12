/**
 * Single source of truth for the product facts that appear in more than one place:
 * the rendered site, the JSON-LD schema, `llms.txt` and the sitemap.
 *
 * Plain JS (not TS) so `scripts/prerender.js` can import it directly at build time
 * without a compile step. Anything stated here must be true of the shipping app —
 * `scripts/prerender.js` cross-checks VERSION and REQUIREMENTS.minMacOS against
 * `public/appcast.xml` and fails the build if they drift.
 */

export const SITE_URL = 'https://www.dynamicnotch.tech';

export const PRODUCT_NAME = 'Dynamic Notch';

/**
 * Dates rendered into pages must be constants, not `new Date()`.
 *
 * The site is server-rendered at build time and hydrated in the browser. A `new Date()`
 * during render produces one value on the build machine and a different one in the
 * visitor's browser — a guaranteed hydration mismatch, and `toLocaleDateString()` adds a
 * second axis of drift because the build machine's locale is not the visitor's.
 *
 * Bump LEGAL_LAST_UPDATED when the privacy policy or terms actually change; bump
 * COPYRIGHT_YEAR each January.
 */
export const LEGAL_LAST_UPDATED = '2026-08-12';
export const LEGAL_LAST_UPDATED_LABEL = '12 August 2026';
export const COPYRIGHT_YEAR = 2026;

export const CHECKOUT_URL =
  'https://dynamicnotchofficial.lemonsqueezy.com/checkout/buy/b1976809-d837-4608-acb1-7de6e790ae43';

/**
 * The profiles that identify this product and its author, rendered into `sameAs` on the
 * Organization and Person schema.
 *
 * This is the field that resolves the brand's entity problem: "Dynamic Notch" collides
 * with a GitHub project of the same name, a Mac App Store app, and an old Gumroad
 * listing, and `sameAs` is how a knowledge graph is told which of them is this one.
 *
 * Only add URLs that resolve. A `sameAs` pointing at a dead profile asserts an identity
 * link that cannot be verified, which is worse than omitting the field.
 */
export const SOCIAL = {
  x: 'https://x.com/DynamicNotchOff',
  github: 'https://github.com/AryaanTheLad',
};

export const AUTHOR = {
  name: 'Aryaan',
  sameAs: [SOCIAL.x, SOCIAL.github],
};

/** Matches <sparkle:shortVersionString> in public/appcast.xml. */
export const VERSION = '3.0';

export const PRICE = {
  /** Numeric amount, for schema.org Offer. */
  amount: '5.99',
  currency: 'USD',
  /** Always render the symbol on the left. */
  display: '$5.99',
  /** One-time purchase; buyers may pay more than the base price if they want to. */
  model: 'one-time purchase, pay what you want above the base price',
};

/**
 * Refunds go through LemonSqueezy, the merchant of record. Kept deliberately vague
 * because no fixed window has been published — replace with the real terms once set.
 */
export const REFUND_POLICY =
  'Purchases run through LemonSqueezy as merchant of record. If it does not work on your Mac, email for a refund.';

export const REQUIREMENTS = {
  /** Matches <sparkle:minimumSystemVersion> in public/appcast.xml. */
  minMacOS: '14.6',
  minMacOSLabel: 'macOS 14.6 or later',
  architecture: 'Apple Silicon (M1 or later)',
  /** Signed and notarized by Apple — no Gatekeeper detour on first launch. */
  notarized: true,
  downloadSize: '2.9 MB',
};

export const PERFORMANCE = {
  ram: '~45 MB',
  idleCpu: '0%',
  activeCpu: '2–5%',
};

export const FEATURES = [
  {
    title: 'Media Control',
    summary:
      'Now Playing metadata with play, pause and skip for whatever is producing system audio.',
  },
  {
    title: 'File Tray',
    summary:
      'Drag files into the notch to park them, carry them between apps, or hand them straight to AirDrop.',
  },
  {
    title: 'Quick Notes',
    summary: 'A scratch buffer for short notes and snippets. Click a note to copy it.',
  },
  {
    title: 'Clipboard History',
    summary:
      'Recently copied text and links, retrievable from the notch without a separate window.',
  },
  {
    title: 'Custom Timer',
    summary:
      'Enter any duration; the notch expands to show the countdown and plays an alert when it ends.',
  },
  {
    title: 'Current Task Setter',
    summary: 'Pin the task you are working on so it stays visible while you work.',
  },
  {
    title: 'Weather at a glance',
    summary: 'Local temperature and conditions, read from the notch instead of a widget panel.',
  },
];

/**
 * The full spec sheet. Rendered as a real `<table>` by `src/components/Specs.tsx` and as
 * the Specifications block in `llms.txt` — a table is the most machine-extractable shape
 * available, which is what AI answer engines actually pull from.
 */
export const SPECS = [
  { label: 'Price', value: `${PRICE.display} one-time, pay what you want above that` },
  { label: 'Version', value: `${VERSION} (build 31)` },
  { label: 'Operating system', value: REQUIREMENTS.minMacOSLabel },
  { label: 'Architecture', value: `${REQUIREMENTS.architecture}. Intel Macs are not supported.` },
  { label: 'Download size', value: REQUIREMENTS.downloadSize },
  { label: 'Memory', value: `${PERFORMANCE.ram} resident` },
  { label: 'CPU, idle', value: PERFORMANCE.idleCpu },
  { label: 'CPU, notch expanded', value: PERFORMANCE.activeCpu },
  { label: 'Code signing', value: 'Signed with an Apple Developer ID and notarized by Apple' },
  { label: 'Permissions used', value: 'Location services, for the weather readout. Nothing else.' },
  { label: 'Data collected', value: 'One anonymous install ping containing the app version' },
  { label: 'Updates', value: 'In-app, over Sparkle' },
  { label: 'Sold through', value: 'LemonSqueezy, as merchant of record' },
];

/**
 * Release history, newest first. The top entry has to match `public/appcast.xml` —
 * `scripts/prerender.js` fails the build if VERSION drifts from it — and the notes live
 * here because a Sparkle appcast carries no description of what changed.
 *
 * Releases before 3.0 were never written down anywhere in this repo, so the list starts
 * there rather than inventing history.
 */
export const RELEASES = [
  {
    version: '3.0',
    build: '31',
    date: '2026-06-20',
    dateLabel: '20 June 2026',
    minMacOS: '14.6',
    notes: [
      'Multi-file dragging — pick up several files at once and drop the whole batch out of the tray.',
      'Open files straight from the File Tray without going through Finder.',
      'Bug fixes and a general optimisation pass.',
    ],
    /** Slug in src/data/posts.js covering this release in prose, if there is one. */
    postId: 'versionUpdate',
  },
];

export const PRIVACY_SUMMARY =
  'Runs locally. Notes, clipboard history and File Tray contents never leave the machine. ' +
  'The only network calls are a one-time anonymous install signal containing the app version, ' +
  'and weather lookups against a public API. No account, no analytics SDK, no personal data.';

/** The first-launch steps, shared by the site and llms.txt. */
export const FIRST_LAUNCH_STEPS = [
  'Download the .dmg and open it.',
  'Drag Dynamic Notch into your Applications folder.',
  'Launch it, and allow location access if you want the weather readout.',
];

/** Rendered to dist/llms.txt at build time by scripts/prerender.js. */
export function buildLlmsTxt() {
  const lines = [
    `# ${PRODUCT_NAME}`,
    '',
    'A native macOS utility that turns the MacBook camera notch into an interactive hub for',
    'file handoff, media control, timers, notes, clipboard history and weather. Written in',
    'Swift and SwiftUI; it runs as a lightweight background process and does not modify',
    'system files.',
    '',
    `Website: ${SITE_URL}`,
    '',
    '## Specifications',
    '',
    ...SPECS.map((spec) => `- ${spec.label}: ${spec.value}`),
    '',
    '## Price',
    '',
    `- ${PRICE.display} — ${PRICE.model}. There is no subscription.`,
    `- ${REFUND_POLICY}`,
    '',
    '## Features',
    '',
    ...FEATURES.map((f) => `- ${f.title}: ${f.summary}`),
    '',
    '## Installation and code signing',
    '',
    `${PRODUCT_NAME} is signed and notarized by Apple, so it opens like any other Mac app —`,
    'no Gatekeeper warning and no right-click workaround. To install:',
    '',
    ...FIRST_LAUNCH_STEPS.map((step, i) => `${i + 1}. ${step}`),
    '',
    '## Privacy',
    '',
    PRIVACY_SUMMARY,
    '',
    '## Updates',
    '',
    `Current version: ${VERSION}. In-app updates are delivered with Sparkle from`,
    `${SITE_URL}/appcast.xml.`,
    '',
  ];

  return lines.join('\n');
}
