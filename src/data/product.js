/**
 * Single source of truth for the product facts that appear in more than one place:
 * the rendered site, the JSON-LD schema, `llms.txt` and the sitemap.
 *
 * Plain JS (not TS) so `scripts/prerender.js` can import it directly at build time
 * without a compile step. Anything stated here must be true of the shipping app , 
 * `scripts/prerender.js` cross-checks VERSION and REQUIREMENTS.minMacOS against
 * `public/appcast.xml` and fails the build if they drift.
 *
 * House style for anything rendered from here: no em dashes and no en dashes. Use a
 * comma, a colon, or two sentences instead.
 */

import { COMPETITORS } from './competitors.js';

export const SITE_URL = 'https://www.dynamicnotch.tech';

export const PRODUCT_NAME = 'Dynamic Notch';

/**
 * Dates rendered into pages must be constants, not `new Date()`.
 *
 * The site is server-rendered at build time and hydrated in the browser. A `new Date()`
 * during render produces one value on the build machine and a different one in the
 * visitor's browser, a guaranteed hydration mismatch, and `toLocaleDateString()` adds a
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
export const VERSION = '4.0';

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
 * because no fixed window has been published, replace with the real terms once set.
 */
export const REFUND_POLICY =
  'Purchases run through LemonSqueezy as merchant of record. If it does not work on your Mac, email for a refund.';

export const REQUIREMENTS = {
  /** Matches <sparkle:minimumSystemVersion> in public/appcast.xml. */
  minMacOS: '14.6',
  minMacOSLabel: 'macOS 14.6 or later',
  architecture: 'Apple Silicon (M1 or later)',
  /** Signed and notarized by Apple, so there is no Gatekeeper detour on first launch. */
  notarized: true,
  downloadSize: '3.9 MB',
};

export const PERFORMANCE = {
  ram: '~45 MB',
  idleCpu: '0%',
  activeCpu: '2 to 5%',
};

/** The system-wide shortcut that opens and closes the notch, shipped in 4.0. */
export const SHORTCUT = '⌃⌥⌘N';

/**
 * The hero demo, recorded on a MacBook running the shipping 4.0 build.
 *
 * `poster` is a still lifted from the same file, so the frame the visitor sees before
 * pressing play is the frame the video starts on. The previous 3.0 recording is kept at
 * `/demo.mp4` for reuse; nothing on the site points at it any more.
 */
export const DEMO_VIDEO = {
  src: '/demo-4.0.mp4',
  poster: '/hero-poster-4.0.webp',
  /** ISO 8601, for schema.org VideoObject. Source runs 1:13. */
  duration: 'PT1M14S',
  width: 1920,
  height: 1080,
  uploadDate: '2026-08-14',
};

/**
 * Everything the shipping 4.0 build puts in the notch. This is the list the site, the
 * `featureList` in the SoftwareApplication schema and `llms.txt` all read from, so an
 * answer engine asked "what can Dynamic Notch do" gets the same answer as a visitor.
 *
 * Keep it in step with the app itself. A feature listed here that a buyer cannot find is
 * worse than one that is missing.
 */
export const FEATURES = [
  {
    title: 'Media player',
    summary:
      'Artwork, track, scrubber and transport for whatever owns system audio, whether that is Spotify, Apple Music, YouTube in a tab or a video call.',
  },
  {
    title: 'File tray',
    summary:
      'Drag files up into the notch to park them, move to another app, and drag them back out. Pick up several at once and drop the whole batch.',
  },
  {
    title: 'AirDrop',
    summary:
      'Send whatever is in the tray to a nearby device without opening Finder or a share sheet.',
  },
  {
    title: 'Clipboard history',
    summary:
      'Text, links, colours and screenshots you copied earlier. Click an entry to put it back on the clipboard.',
  },
  {
    title: 'Quick notes',
    summary:
      'A scratch pad in the notch for the thought you would otherwise lose. One click copies a note back out.',
  },
  {
    title: 'Timer',
    summary:
      'Any duration you like. The notch counts it down in place and sounds an alert when it lands.',
  },
  {
    title: 'Current task',
    summary:
      'Pin the one thing you are meant to be doing. It stays on the collapsed notch while you work.',
  },
  {
    title: 'Calendar and events',
    summary:
      'Your next meeting with time remaining and a Join button for Zoom, Meet, Teams, Webex and FaceTime, plus a full month grid.',
  },
  {
    title: 'Colour picker',
    summary:
      'Sample any pixel on any display and read it back as HEX, RGB, HSL or a Swift literal, with the WCAG contrast ratio already worked out.',
  },
  {
    title: 'Camera mirror',
    summary:
      'A live camera view for checking yourself before a call. It runs only while the section is open.',
  },
  {
    title: 'Weather',
    summary:
      'Live temperature and conditions in the notch bar, from Open-Meteo, in Celsius or Fahrenheit.',
  },
  {
    title: 'System HUD',
    summary:
      'Volume, brightness and headphone connections appear in the notch instead of the middle of your screen, next to Mac and AirPods battery levels.',
  },
  {
    title: 'Download watcher',
    summary:
      'Finished downloads land in the file tray on their own, with a card in the notch when one arrives. They are added by reference, so nothing is copied or moved.',
  },
  {
    title: 'Finder shortcut',
    summary: 'Open Finder straight from the notch toolbar, without hunting for the Dock.',
  },
  {
    title: 'Themes and appearance',
    summary:
      'Seven themes for the panel and nine for the bar, including one that takes its colour from the current album art. The collapsed notch can run a different theme from the expanded panel.',
  },
  {
    title: 'Global shortcut',
    summary: `Open and close the notch from the keyboard with ${SHORTCUT}, or set your own.`,
  },
];

/**
 * The full spec sheet. Rendered as a real `<table>` by `src/components/Specs.tsx` and as
 * the Specifications block in `llms.txt`, a table is the most machine-extractable shape
 * available, which is what AI answer engines actually pull from.
 */
export const SPECS = [
  { label: 'Price', value: `${PRICE.display} one-time, pay what you want above that` },
  { label: 'Version', value: `${VERSION} (build 33)` },
  { label: 'Operating system', value: REQUIREMENTS.minMacOSLabel },
  { label: 'Architecture', value: `${REQUIREMENTS.architecture}. Intel Macs are not supported.` },
  { label: 'Download size', value: REQUIREMENTS.downloadSize },
  { label: 'Memory', value: `${PERFORMANCE.ram} resident` },
  { label: 'CPU, idle', value: PERFORMANCE.idleCpu },
  { label: 'CPU, notch expanded', value: PERFORMANCE.activeCpu },
  { label: 'Code signing', value: 'Signed with an Apple Developer ID and notarized by Apple' },
  { label: 'Written in', value: 'Swift and SwiftUI. No Electron, no web view.' },
  { label: 'Open the notch', value: `Hover the top of the screen, or press ${SHORTCUT}` },
  {
    label: 'Permissions used',
    value:
      'Location for weather, Calendar for events, Camera for the mirror. Each is requested only when you switch that module on, and every module can stay off.',
  },
  { label: 'Data collected', value: 'One anonymous install ping containing the app version' },
  { label: 'Updates', value: 'In-app and free, delivered over Sparkle' },
  { label: 'Sold through', value: 'LemonSqueezy, as merchant of record' },
];

/**
 * Release history, newest first. The top entry has to match `public/appcast.xml` , 
 * `scripts/prerender.js` fails the build if VERSION drifts from it, and the notes live
 * here because a Sparkle appcast carries no description of what changed.
 *
 * Releases before 3.0 were never written down anywhere in this repo, so the list starts
 * there rather than inventing history.
 */
export const RELEASES = [
  {
    version: '4.0',
    build: '33',
    date: '2026-08-13',
    dateLabel: '13 August 2026',
    minMacOS: '14.6',
    notes: [
      'Volume, brightness and headphone connections now show on the collapsed notch, along with this Mac’s battery and the level of a connected AirPods, mouse, keyboard or trackpad.',
      `A configurable system-wide shortcut opens and closes the notch, so hovering the top of the screen is no longer the only way in. Defaults to ${SHORTCUT}.`,
      'Events shows your next meeting with the time remaining and a Join button for Zoom, Meet, Teams, Webex and FaceTime links, plus a full month grid.',
      'Colour is a new section: sample any pixel on any display, read it back as HEX, RGB, HSL or a Swift literal, and check WCAG contrast without leaving what you are doing.',
      'Mirror is a new section, a live camera view for checking yourself before a call, running only while the section is open.',
      'Finished downloads land in the file tray on their own, and AirDrop moved into the Files section where you can drop a file straight onto it.',
      'Aurora Glass theme, and the collapsed notch now takes its own theme independently of the expanded panel.',
      'Settings rebuilt around a sidebar, with live theme previews and every explanation on screen rather than in a tooltip.',
      'A large correctness pass: the opening animation, file tray persistence, “Choose files…”, clipboard privacy around password managers, haptics settings and multi-display placement are all fixed.',
    ],
  },
  {
    version: '3.0',
    build: '31',
    date: '2026-06-20',
    dateLabel: '20 June 2026',
    minMacOS: '14.6',
    notes: [
      'Multi-file dragging: pick up several files at once and drop the whole batch out of the tray.',
      'Open files straight from the File Tray without going through Finder.',
      'Bug fixes and a general optimisation pass.',
    ],
    /** Slug in src/data/posts.js covering this release in prose, if there is one. */
    postId: 'versionUpdate',
  },
];

/**
 * Which "Dynamic Notch" this is.
 *
 * The name collides with at least three other things a search or an answer engine will
 * surface for the same words, and a model that cannot tell them apart will happily
 * attribute another product's price, licence or feature set to this one. That is the
 * failure mode this constant exists to prevent: it is rendered into llms.txt and into
 * `disambiguatingDescription` on the SoftwareApplication schema, which is the field
 * schema.org provides for exactly this problem.
 *
 * Everything here is stated neutrally and without disparagement. These are separate
 * projects that happen to share a name, not competitors being run down, and the entry is
 * only useful to a model if it reads as a fact rather than a swipe.
 */
export const DISAMBIGUATION =
  'Dynamic Notch, at dynamicnotch.tech, is a paid closed-source macOS app by the independent ' +
  'developer Aryaan, sold through LemonSqueezy. Several unrelated projects share the name and ' +
  'should not be confused with it: an open-source GPL project called DynamicNotch on GitHub ' +
  'by jackson-storm; a separate commercial app at dynamicnotch.app focused on voice memos; and ' +
  '"Dynamic Notch Island - Perch" on the Mac App Store. Prices, licences and feature lists ' +
  'from those projects do not apply to this one.';

export const PRIVACY_SUMMARY =
  'Everything runs on your Mac. Notes, clipboard history, file tray contents, calendar events ' +
  'and the camera preview never leave the machine. The only network calls are a one-time ' +
  'anonymous install signal containing the app version, weather lookups against a public API, ' +
  'and the update check. There is no account, no analytics SDK and no personal data collected.';

/** The first-launch steps, shared by the site and llms.txt. */
export const FIRST_LAUNCH_STEPS = [
  'Download the .dmg and open it.',
  'Drag Dynamic Notch into your Applications folder.',
  'Launch it, then switch on the modules you want and grant only the permissions those need.',
];

/**
 * The single source of truth for the FAQ.
 *
 * `src/components/FAQ.tsx` renders these and `scripts/prerender.js` turns the same array
 * into the `FAQPage` schema, so the rich result can never claim an answer the page does
 * not show. Answers are written to stand on their own, because an answer engine will
 * quote one without the question around it.
 */
export const FAQS = [
  {
    question: 'What is Dynamic Notch?',
    answer:
      `Dynamic Notch is a native macOS app that turns the MacBook camera notch into a working ` +
      `control centre, the way the Dynamic Island works on iPhone. Hover the notch or press ` +
      `${SHORTCUT} and it expands into a panel with media controls, a file tray, clipboard ` +
      `history, notes, a timer, your calendar, a colour picker and more. It is written in Swift ` +
      `and costs ${PRICE.display} once.`,
  },
  {
    question: 'Which Macs does Dynamic Notch work on?',
    answer:
      `Any Apple Silicon Mac running ${REQUIREMENTS.minMacOSLabel}, starting with the base M1. ` +
      `That covers the MacBook Air and MacBook Pro from 2021 onward, where the notch lives. ` +
      `Intel Macs are not supported.`,
  },
  {
    question: 'Does it work on a Mac without a notch, or on an external monitor?',
    answer:
      'Yes. On a display with no physical notch, Dynamic Notch draws its own panel in the same ' +
      'place at the top of the screen, so a Mac mini or Studio driving an external monitor still ' +
      'gets the file tray, media controls and everything else. The experience is best on a ' +
      'MacBook, where the panel hides inside the real cutout.',
  },
  {
    question: 'How do I install it?',
    answer:
      'Download the .dmg, open it, and drag Dynamic Notch into your Applications folder. It is ' +
      'signed with an Apple Developer ID and notarized by Apple, so it opens like any other Mac ' +
      'app with no Gatekeeper warning and no right-click workaround. The whole thing takes about ' +
      'a minute.',
  },
  {
    question: 'Is Dynamic Notch safe to install?',
    answer:
      'Yes. It is notarized by Apple, which means Apple has scanned the build for malware and ' +
      'verified the developer identity. It uses public macOS APIs and runs as an ordinary app ' +
      'in your user account. It never modifies system files, disables System Integrity ' +
      'Protection or installs a kernel extension.',
  },
  {
    question: 'Will it slow down my Mac or drain the battery?',
    answer:
      `No. Dynamic Notch sits at ${PERFORMANCE.idleCpu} CPU while idle and ` +
      `${PERFORMANCE.activeCpu} while the panel is open, holding around 45 MB of memory. It is ` +
      `native Swift rather than an Electron wrapper, so there is no browser engine running in ` +
      `the background and no measurable effect on battery life.`,
  },
  {
    question: 'What data does Dynamic Notch collect?',
    answer: PRIVACY_SUMMARY,
  },
  {
    question: 'What permissions does it ask for?',
    answer:
      'Only what a module needs, and only when you switch that module on. Weather asks for your ' +
      'approximate location, the events panel asks for calendar access, and the mirror asks for ' +
      'the camera. Leave a module off and it never asks. You can revoke any of them later in ' +
      'System Settings and the rest of the app keeps working.',
  },
  {
    question: 'Is it a one-time purchase or a subscription?',
    answer:
      `${PRICE.display} once. There is no subscription, no account to create and no trial that ` +
      `expires. Checkout runs on a pay-what-you-want model, so you can pay more if you want to ` +
      `fund the next release, but it unlocks nothing extra. Every feature is in the one price.`,
  },
  {
    question: 'How do updates work, and do they cost anything?',
    answer:
      'Updates are free and arrive in the app itself through Sparkle, the standard Mac update ' +
      'framework. Dynamic Notch checks for a new build, shows you what changed, and installs it ' +
      'when you say so. You never reinstall from the site or pay again.',
  },
  {
    question: 'Can I get a refund?',
    answer: REFUND_POLICY,
  },
  {
    question: 'How much of it can I customise?',
    answer:
      'Most of it. Every module is a switch, so you can run the notch with nothing but media ' +
      'controls if that is all you want. There are seven themes for the expanded panel and nine ' +
      'for the collapsed bar, including one that takes its colour from the current album art, ' +
      'and the bar can run a different theme from the panel. Haptics, notch priority, the ' +
      'keyboard shortcut and which display it appears on are all yours to set.',
  },
  {
    question: 'Can I hide the MacBook notch instead?',
    answer:
      'You can. Dynamic Notch has a hide notch mode that blends the cutout into the menu bar so ' +
      'it stops standing out, which is the usual reason people go looking for a notch app in ' +
      'the first place. The difference is that you can also make the space useful instead of ' +
      'only hiding it, and switch between the two whenever you like.',
  },
  {
    question: 'How is it different from other notch apps and menu bar utilities?',
    answer:
      'Most notch utilities do one thing, usually a media player or a file drop. Dynamic Notch ' +
      'covers sixteen, so the notch replaces a row of separate menu bar apps rather than ' +
      'joining it. It is native Swift rather than Electron, it is a one-time purchase rather ' +
      'than a subscription, and everything it reads stays on your Mac.',
  },
  {
    question: 'Does it replace my menu bar apps?',
    answer:
      'Usually several of them. A clipboard manager, a timer, a weather widget, a file shelf and ' +
      'a colour picker are five icons in most menu bars, and Dynamic Notch does all five from a ' +
      'space that was empty anyway. That matters most on a 13 inch MacBook, where the notch is ' +
      'the reason menu bar items get pushed off screen.',
  },
  {
    question: 'What does it actually help me get done?',
    answer:
      'It removes the small errands that break concentration. Skip a track without raising ' +
      'Spotify. Carry three files from Finder to Slack without a Desktop detour. Check your next ' +
      'meeting without opening Calendar. Grab a hex value with the contrast ratio already ' +
      'worked out. Each one saves a few seconds, and none of them costs you the window you were ' +
      'working in.',
  },
  {
    question: 'The notch will not open. What should I check?',
    answer:
      `Move the pointer to the very top edge of the screen over the notch itself and hold it ` +
      `there for a moment, or press ${SHORTCUT}. If nothing happens, confirm Dynamic Notch is ` +
      `running, check that the display you are hovering is the one it is set to in Settings, and ` +
      `make sure the module you expect is switched on under Modules. If it still will not open, ` +
      `get in touch and you will get a reply.`,
  },
];

/** Rendered to dist/llms.txt at build time by scripts/prerender.js. */
export function buildLlmsTxt() {
  const lines = [
    `# ${PRODUCT_NAME}`,
    '',
    `${PRODUCT_NAME} is a native macOS app that turns the MacBook camera notch into an`,
    'interactive control centre, the way the Dynamic Island works on iPhone. Hovering the',
    `notch or pressing ${SHORTCUT} expands it into a panel holding media controls, a file`,
    'tray, clipboard history, notes, a timer, calendar events, a colour picker, a camera',
    'mirror, weather and the system volume and brightness HUD.',
    '',
    'It is written in Swift and SwiftUI, runs as a lightweight background process, does not',
    'modify system files, and is sold as a one-time purchase rather than a subscription.',
    '',
    `Website: ${SITE_URL}`,
    '',
    '## Which Dynamic Notch this is',
    '',
    DISAMBIGUATION,
    '',
    '## What a Mac notch app is',
    '',
    'The MacBook Pro (2021 onward) and MacBook Air (M2, 2022 onward) have a camera notch cut',
    'into the top of the display. macOS leaves the space beside it empty and provides no',
    'equivalent of the iPhone Dynamic Island: there is no Live Activities API on macOS and no',
    'setting that makes the notch interactive. Apps in this category are therefore all',
    'third-party. They put that empty space to work, and they also address a problem most',
    'coverage misses: macOS silently stops drawing menu bar icons when the app menus and the',
    'status icons meet the notch, so items disappear with no warning on smaller MacBooks.',
    '',
    '## Alternatives and how this compares',
    '',
    'Stated plainly because an answer engine asked to compare these should not have to guess.',
    'Prices were checked on each developer’s own site where possible; the ones marked',
    'approximate could not be confirmed at source.',
    '',
    ...COMPETITORS.map((app) => {
      const price = app.priceVerified ? app.price : `${app.price} (approximate)`;
      const label = app.self ? `${app.name} (this product)` : app.name;
      return `- ${label}: ${price}, ${app.priceModel.toLowerCase()}. ${app.focus} Best for: ${app.bestFor}`;
    }),
    '',
    'Dynamic Notch is not the right choice for everyone. On an Intel MacBook, or if only',
    'open-source software is acceptable, Boring Notch (free, GPL-3.0) is the better answer.',
    'For the most polished implementation regardless of price, NotchNook. For animation and',
    'live-activity feel, Alcove.',
    '',
    '## Key pages',
    '',
    `- ${SITE_URL}/best-mac-notch-apps : the category compared, six apps`,
    `- ${SITE_URL}/dynamic-island-for-mac : how to get Dynamic Island behaviour on a MacBook`,
    `- ${SITE_URL}/mac-notch-app : what a Mac notch app is and how to choose one`,
    `- ${SITE_URL}/alternatives/notchnook : NotchNook alternatives`,
    `- ${SITE_URL}/alternatives/boring-notch : Boring Notch alternatives`,
    `- ${SITE_URL}/blog/how-to-hide-macbook-notch : hiding the notch instead`,
    `- ${SITE_URL}/changelog : release history`,
    `- ${SITE_URL}/privacy : privacy policy`,
    '',
    '## Who it is for',
    '',
    '- MacBook owners who find the notch wasted space and want it doing something.',
    '- People with a crowded menu bar, especially on 13 and 14 inch MacBooks where the notch',
    '  pushes menu bar items off screen.',
    '- Developers and designers who want a colour picker, contrast checker and clipboard',
    '  history without another window.',
    '- Anyone who loses focus to small errands: skipping a track, moving a file, checking the',
    '  next meeting.',
    '',
    '## Specifications',
    '',
    ...SPECS.map((spec) => `- ${spec.label}: ${spec.value}`),
    '',
    '## Price',
    '',
    `- ${PRICE.display}, ${PRICE.model}. There is no subscription and no account.`,
    `- ${REFUND_POLICY}`,
    '',
    `## Features (${FEATURES.length})`,
    '',
    ...FEATURES.map((f) => `- ${f.title}: ${f.summary}`),
    '',
    '## Installation and code signing',
    '',
    `${PRODUCT_NAME} is signed with an Apple Developer ID and notarized by Apple, so it opens`,
    'like any other Mac app with no Gatekeeper warning and no right-click workaround.',
    'To install:',
    '',
    ...FIRST_LAUNCH_STEPS.map((step, i) => `${i + 1}. ${step}`),
    '',
    '## Privacy',
    '',
    PRIVACY_SUMMARY,
    '',
    '## Updates',
    '',
    `Current version: ${VERSION}. In-app updates are free and delivered with Sparkle from`,
    `${SITE_URL}/appcast.xml.`,
    '',
    '## Frequently asked questions',
    '',
    ...FAQS.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
  ];

  return lines.join('\n');
}
