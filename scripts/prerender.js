import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import {
  SITE_URL,
  VERSION,
  REQUIREMENTS,
  FEATURES,
  FAQS,
  PRICE,
  AUTHOR,
  SOCIAL,
  DEMO_VIDEO,
  FIRST_LAUNCH_STEPS,
  buildLlmsTxt,
} from '../src/data/product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SSR_ENTRY_PATH = path.join(ROOT_DIR, 'dist-ssr', 'entry-server.js');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const APPCAST_PATH = path.join(ROOT_DIR, 'public', 'appcast.xml');
const APP_TSX_PATH = path.join(ROOT_DIR, 'src', 'App.tsx');

/** The empty mount point Vite emits, which the server-rendered markup replaces. */
const ROOT_DIV = '<div id="root"></div>';

/** Must stay in step with the defaults in src/components/SEO.tsx. */
const OG_IMAGE = `${SITE_URL}/og-card.jpg`;
const OG_IMAGE_WIDTH = '1200';
const OG_IMAGE_HEIGHT = '630';
const OG_IMAGE_ALT =
  'Dynamic Notch: everyone else hides the notch, we gave it a job. macOS 14.6+, Apple Silicon, $5.99 once.';

/** Reused as `publisher`, `author` and `provider` so the graph has one identity, not four. */
const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#founder`,
  "name": AUTHOR.name,
  "url": `${SITE_URL}/contact`,
  "jobTitle": "Independent macOS developer",
  "knowsAbout": ["macOS development", "Swift", "SwiftUI", "AppKit"],
  "sameAs": AUTHOR.sameAs,
};

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "Dynamic Notch",
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/urlicon.png`,
    "width": 2000,
    "height": 2000,
  },
  "founder": PERSON,
  // Disambiguates this "Dynamic Notch" from the identically named GitHub project, the
  // Mac App Store app, and the stale Gumroad listing.
  "sameAs": [SOCIAL.x, SOCIAL.github],
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "name": "Dynamic Notch",
  "url": SITE_URL,
  "publisher": { "@id": `${SITE_URL}/#organization` },
  "inLanguage": "en",
};

/**
 * The hero demo. Without this the only moving picture of the product in existence is
 * invisible to search: a `<video>` tag on its own carries no title, no description and
 * no thumbnail for anything to index.
 *
 * `uploadDate` is a fixed date in product.js rather than the build date, so it stays
 * stable across rebuilds instead of claiming the video is new every deploy.
 */
const VIDEO = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "@id": `${SITE_URL}/#demo-video`,
  "name": "Dynamic Notch 4.0 running on a MacBook",
  "description":
    "A screen recording of Dynamic Notch 4.0 in use: dragging files into the MacBook " +
    "notch, controlling playback, writing a note, reading clipboard history, sampling a " +
    "colour with its contrast ratio, checking the calendar, and changing themes, all " +
    "without leaving the app in front.",
  "thumbnailUrl": `${SITE_URL}${DEMO_VIDEO.poster}`,
  "contentUrl": `${SITE_URL}${DEMO_VIDEO.src}`,
  "encodingFormat": "video/mp4",
  "duration": DEMO_VIDEO.duration,
  "width": DEMO_VIDEO.width,
  "height": DEMO_VIDEO.height,
  "uploadDate": DEMO_VIDEO.uploadDate,
  "publisher": { "@id": `${SITE_URL}/#organization` },
};

/** Mirrors the rendered steps in `src/components/FirstLaunch.tsx`. */
const HOW_TO = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to install Dynamic Notch on a MacBook",
  "description":
    "Dynamic Notch is signed and notarized by Apple, so it opens like any other Mac " +
    "app. There is no Gatekeeper warning and no right-click workaround.",
  "totalTime": "PT2M",
  "tool": [
    {
      "@type": "HowToTool",
      "name": `MacBook with ${REQUIREMENTS.architecture}, ${REQUIREMENTS.minMacOSLabel}`,
    },
  ],
  "step": FIRST_LAUNCH_STEPS.map((text, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "text": text,
  })),
};

/** Google wants a forward-looking date on an Offer; a year out, recomputed each build. */
function priceValidUntil() {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().slice(0, 10);
}

function breadcrumbsFor(route, title) {
  if (route === '/') return null;

  const segments = route.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: SITE_URL }];

  if (segments[0] === 'blog' && segments.length > 1) {
    items.push({ name: 'Blog', url: `${SITE_URL}/blog` });
  }
  items.push({ name: title, url: `${SITE_URL}${route}` });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

// Helper to replace or insert title
function replaceTitle(html, title) {
  const regex = /<title>[\s\S]*?<\/title>/i;
  const newTag = `<title>${title}</title>`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  } else {
    return html.replace('</head>', `  ${newTag}\n</head>`);
  }
}

// Helper to replace or insert meta tags
function replaceOrInsertMeta(html, nameAttr, nameVal, content) {
  const regex = new RegExp(`<meta\\s+${nameAttr}=["']${nameVal}["']\\s+content=["'][\\s\\S]*?["']\\s*\\/?>`, 'i');
  const newTag = `<meta ${nameAttr}="${nameVal}" content="${content.replace(/"/g, '&quot;')}" />`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  } else {
    return html.replace('</head>', `  ${newTag}\n</head>`);
  }
}

// Helper to replace or insert canonical link
function replaceOrInsertCanonical(html, url) {
  const regex = /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i;
  const newTag = `<link rel="canonical" href="${url}" />`;
  if (regex.test(html)) {
    return html.replace(regex, newTag);
  } else {
    return html.replace('</head>', `  ${newTag}\n</head>`);
  }
}

// Helper to replace or insert JSON-LD schema
function replaceOrInsertSchema(html, schemaObj) {
  const regex = /<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi;
  let newTag = '';
  if (Array.isArray(schemaObj)) {
    newTag = schemaObj.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join('\n');
  } else {
    newTag = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;
  }
  const cleanedHtml = html.replace(regex, '');
  return cleanedHtml.replace('</head>', `  ${newTag}\n</head>`);
}

const PAGES = [
  {
    route: '/',
    title: 'Dynamic Notch: Turn the MacBook Notch Into a Dynamic Island',
    description: `Dynamic Notch is a native macOS app that turns the MacBook notch into a control centre: file tray, media controls, clipboard history, notes, timer, calendar, colour picker and weather. ${PRICE.display} once, no subscription.`,
    type: 'website',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Dynamic Notch",
        "alternateName": "Dynamic Notch for macOS",
        "operatingSystem": REQUIREMENTS.minMacOSLabel,
        "processorRequirements": REQUIREMENTS.architecture,
        "applicationCategory": "UtilitiesApplication",
        "applicationSubCategory": "Menu bar and desktop utility",
        "description":
          "A native macOS utility that brings Dynamic Island functionality to the MacBook " +
          "notch. Hover the notch or press a keyboard shortcut and it expands into a panel " +
          "with a file tray, media controls, clipboard history, quick notes, a timer, " +
          "calendar events, a colour picker with contrast checking, a camera mirror, " +
          "weather and the system volume and brightness HUD.",
        "url": SITE_URL,
        "softwareVersion": VERSION,
        "screenshot": [
          `${SITE_URL}/shots/4.0/media.webp`,
          `${SITE_URL}/shots/4.0/files.webp`,
          `${SITE_URL}/shots/4.0/colour.webp`,
        ],
        "video": { "@id": `${SITE_URL}/#demo-video` },
        "publisher": { "@id": `${SITE_URL}/#organization` },
        "author": PERSON,
        "privacyPolicy": `${SITE_URL}/privacy`,
        "releaseNotes": `${SITE_URL}/changelog`,
        // downloadUrl / fileSize are filled in from public/appcast.xml at build time.
        "offers": {
          "@type": "Offer",
          "price": PRICE.amount,
          "priceCurrency": PRICE.currency,
          "availability": "https://schema.org/InStock",
          "url": SITE_URL,
          "priceValidUntil": priceValidUntil(),
          "seller": { "@id": `${SITE_URL}/#organization` }
        },
        // No aggregateRating: there are no reviews rendered on the page, and Google's
        // review-snippet policy requires the markup to match visible content.
        "featureList": FEATURES.map(f => f.title)
      },
      // Built from the same array the page renders, so the rich result can never claim
      // an answer a visitor cannot find. See src/data/product.js.
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      }
    ]
  },
  {
    route: '/blog',
    title: 'Dynamic Notch Blog: MacBook Notch Utilities and Customization',
    description: 'Guides on the MacBook notch: how to hide it, how to customize it, how to turn it into a Dynamic Island, and how a native Mac utility keeps your menu bar clear.',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Dynamic Notch Blog",
      "description": "Guides on the MacBook notch: how to hide it, how to customize it, how to turn it into a Dynamic Island, and how a native Mac utility keeps your menu bar clear.",
      "url": "https://www.dynamicnotch.tech/blog",
      "publisher": { "@id": `${SITE_URL}/#organization` }
    }
  },
  {
    route: '/blog/founder-journey-first-payout',
    title: 'Behind the Launch: What It Feels Like to Ship a Mac App and Earn Your First Payout - Dynamic Notch Blog',
    description: "From late-night Swift debugging to pressing 'Publish', and that unforgettable email notification for your very first payout as an indie founder.",
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Behind the Launch: What It Feels Like to Ship a Mac App and Earn Your First Payout",
      "description": "From late-night Swift debugging to pressing 'Publish', and that unforgettable email notification for your very first payout as an indie founder.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-08-05",
      "url": "https://www.dynamicnotch.tech/blog/founder-journey-first-payout"
    }
  },
  {
    route: '/blog/native-swift-vs-electron',
    title: 'Why Native Swift Apps are Making a Massive Comeback on macOS - Dynamic Notch Blog',
    description: 'In an era dominated by RAM-heavy web wrappers, native Swift development delivers the lightweight, hyper-responsive software Mac users deserve.',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Why Native Swift Apps are Making a Massive Comeback on macOS",
      "description": "In an era dominated by RAM-heavy web wrappers, native Swift development delivers the lightweight, hyper-responsive software Mac users deserve.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-07-08",
      "url": "https://www.dynamicnotch.tech/blog/native-swift-vs-electron"
    }
  },
  {
    route: '/blog/mac-power-user-hacks',
    title: '5 Essential macOS Customization Hacks for Power Users in 2026 - Dynamic Notch Blog',
    description: "Real speed on a Mac comes from cutting the small errands, not from writing scripts. Five changes that remove window switching from your day.",
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "5 Essential macOS Customization Hacks for Power Users in 2026",
      "description": "Real speed on a Mac comes from cutting the small errands, not from writing scripts. Five changes that remove window switching from your day.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-06-12",
      "url": "https://www.dynamicnotch.tech/blog/mac-power-user-hacks"
    }
  },
  // /blog/intro was merged into /blog/why-dynamic-island-mac and 301s there in
  // vercel.json. The two covered the same query with the same argument, and the intro
  // copy had drifted from the product (it claimed M2-and-later and "under 0.1% CPU").
  {
    route: '/blog/why-dynamic-island-mac',
    title: 'Why Your Mac Deserves a Dynamic Island - Dynamic Notch Blog',
    description: "Apple gave the iPhone cutout timers, playback and live activities. On the Mac the same space was left static. Here is what happens when it is not.",
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Why Your Mac Deserves a Dynamic Island",
      "description": "Apple gave the iPhone cutout timers, playback and live activities. On the Mac the same space was left static. Here is what happens when it is not.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-01-02",
      "dateModified": "2026-08-13",
      "url": "https://www.dynamicnotch.tech/blog/why-dynamic-island-mac"
    }
  },
  {
    route: '/blog/boost-productivity',
    title: 'How Dynamic Notch Supercharges Productivity - Dynamic Notch Blog',
    description: 'Every time you stop writing code to open Spotify, wait for it, and hit next, you pay for it twice: once in seconds and once in focus.',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How Dynamic Notch Supercharges Productivity",
      "description": "Every time you stop writing code to open Spotify, wait for it, and hit next, you pay for it twice: once in seconds and once in focus.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-02-15",
      "url": "https://www.dynamicnotch.tech/blog/boost-productivity"
    }
  },
  {
    route: '/blog/minimalist-setup',
    title: 'Dynamic Notch and the Minimalist Desk Setup - Dynamic Notch Blog',
    description: 'True aesthetic equilibrium requires digital minimalism. Declutter your menu bar and your desktop.',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Dynamic Notch and the Minimalist Desk Setup",
      "description": "True aesthetic equilibrium requires digital minimalism. Declutter your menu bar and your desktop.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-02-28",
      "url": "https://www.dynamicnotch.tech/blog/minimalist-setup"
    }
  },
  {
    route: '/blog/notch-customization',
    title: 'How Much Can You Customize the macOS Notch? - Dynamic Notch Blog',
    description: "The notch does not have to look like a black rectangle. Themes, accent colours, module order and what shows on the collapsed bar are all yours to set.",
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How Much Can You Customize the macOS Notch?",
      "description": "The notch does not have to look like a black rectangle. Themes, accent colours, module order and what shows on the collapsed bar are all yours to set.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-03-01",
      "url": "https://www.dynamicnotch.tech/blog/notch-customization"
    }
  },
  {
    route: '/blog/battery-efficiency',
    title: 'Does Dynamic Notch Affect Your MacBook Battery Life? - Dynamic Notch Blog',
    description: 'Learn how Dynamic Notch runs natively and silently in the background without draining your battery or slowing down your pro apps.',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Does Dynamic Notch Affect Your MacBook Battery Life?",
      "description": "Learn how Dynamic Notch runs natively and silently in the background without draining your battery or slowing down your pro apps.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-03-20",
      "url": "https://www.dynamicnotch.tech/blog/battery-efficiency"
    }
  },
  {
    route: '/blog/how-to-hide-macbook-notch',
    title: 'How to Hide the MacBook Notch (and Why You Might Not Want To) - Dynamic Notch Blog',
    description: 'Five ways to hide the MacBook notch, including the built-in macOS setting most people miss, plus the menu bar problem hiding it does not solve.',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How to Hide the MacBook Notch (and Why You Might Not Want To)",
      "description": "Five ways to hide the MacBook notch, including the built-in macOS setting most people miss, plus the menu bar problem hiding it does not solve.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-04-19",
      "dateModified": "2026-08-13",
      "url": "https://www.dynamicnotch.tech/blog/how-to-hide-macbook-notch"
    }
  },
  {
    route: '/blog/versionUpdate',
    title: 'Major App Updates and Performance Optimizations - Dynamic Notch Blog',
    description: 'We have added multi file dragging and opening functionality, fixed bug errors, and made the app more optimized for a seamless experience.',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Major App Updates and Performance Optimizations",
      "description": "We have added multi file dragging and opening functionality, fixed bug errors, and made the app more optimized for a seamless experience.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-05-23",
      "url": "https://www.dynamicnotch.tech/blog/versionUpdate"
    }
  },
  {
    route: '/privacy',
    title: 'Privacy Policy: Dynamic Notch',
    description: 'What Dynamic Notch reads, what it stores and the only network calls it makes. Notes, clipboard history, files, calendar events and the camera never leave your Mac.',
    type: 'website'
  },
  {
    route: '/terms',
    title: 'Terms of Service: Dynamic Notch',
    description: 'Read the terms of service governing the download, license, and usage of the Dynamic Notch macOS application.',
    type: 'website'
  },
  {
    route: '/contact',
    title: 'Contact Dynamic Notch: Support and Feedback',
    description: 'Questions about Dynamic Notch, a bug to report, or a feature you want in the notch? Write to the developer directly and get a real reply.',
    type: 'website'
  },
  {
    route: '/changelog',
    title: 'Changelog - Dynamic Notch',
    breadcrumbTitle: 'Changelog',
    description: `Every Dynamic Notch release, what changed in it, and the minimum macOS it needs. Currently on ${VERSION}.`,
    type: 'website',
    priority: '0.6'
  }
];

/** Fallback <lastmod> for pages that are not dated articles. Bump when core pages change. */
const CORE_LASTMOD = '2026-08-12';

/**
 * The one place a page's absolute URL is built. Used for the canonical tag, og:url and
 * the sitemap <loc> so those three can never disagree.
 */
function canonicalFor(route) {
  return `${SITE_URL}${route === '/' ? '' : route}`;
}

/** datePublished from a single-object BlogPosting schema, or null. */
function articleDate(page) {
  if (!page.schema || Array.isArray(page.schema)) return null;
  return page.schema.datePublished ?? null;
}

function priorityFor(route) {
  if (route === '/') return '1.0';
  if (route === '/blog') return '0.9';
  if (route.startsWith('/blog/')) return '0.8';
  if (route === '/contact') return '0.6';
  return '0.5';
}

/** Built from PAGES so a new route can never be missing from the sitemap. */
function buildSitemap(pages) {
  const articleDates = pages.map(articleDate).filter(Boolean).sort();
  const newestArticle = articleDates.length ? articleDates[articleDates.length - 1] : CORE_LASTMOD;

  const entries = pages.map((page) => {
    const lastmod =
      page.lastmod ??
      articleDate(page) ??
      (page.route === '/blog' ? newestArticle : CORE_LASTMOD);

    return [
      '  <url>',
      `    <loc>${canonicalFor(page.route)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <priority>${page.priority ?? priorityFor(page.route)}</priority>`,
      '  </url>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

/**
 * The appcast is what the shipping app actually reads, so it is the authority on version
 * and minimum OS. Fail the build rather than let llms.txt and the schema drift away from it.
 */
function verifyAppcast() {
  if (!fs.existsSync(APPCAST_PATH)) {
    throw new Error(`appcast not found at ${APPCAST_PATH}`);
  }

  const xml = fs.readFileSync(APPCAST_PATH, 'utf-8');
  const read = (tag) => {
    const match = xml.match(new RegExp(`<${tag}>([^<]+)</${tag}>`));
    return match ? match[1].trim() : null;
  };

  const checks = [
    ['sparkle:shortVersionString', read('sparkle:shortVersionString'), VERSION, 'VERSION'],
    ['sparkle:minimumSystemVersion', read('sparkle:minimumSystemVersion'), REQUIREMENTS.minMacOS, 'REQUIREMENTS.minMacOS'],
  ];

  for (const [tag, actual, expected, constantName] of checks) {
    if (actual !== expected) {
      throw new Error(
        `public/appcast.xml <${tag}> is "${actual}" but src/data/product.js ${constantName} is "${expected}".\n` +
        `        Update src/data/product.js so the site stops advertising the wrong value.`
      );
    }
  }

  // The appcast is also the authority on where the binary lives and how big it is, so
  // the schema's downloadUrl / fileSize come from here rather than a second hardcoding.
  const enclosure = xml.match(/<enclosure\s+url="([^"]+)"\s+length="(\d+)"/);
  if (!enclosure) {
    throw new Error('public/appcast.xml has no <enclosure url="…" length="…"> to read.');
  }

  return { downloadUrl: enclosure[1], fileSize: Number(enclosure[2]) };
}

/**
 * Fields every BlogPosting needs but that would be noise repeated eleven times in PAGES.
 * Also attaches the site identity so the graph resolves to one publisher.
 */
function enrichSchema(schema, page) {
  const list = Array.isArray(schema) ? [...schema] : [schema];

  const enriched = list.map((entry) => {
    if (entry['@type'] !== 'BlogPosting') return entry;
    return {
      ...entry,
      author: PERSON,
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: OG_IMAGE,
      dateModified: entry.dateModified ?? entry.datePublished,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalFor(page.route),
      },
    };
  });

  const breadcrumbs = breadcrumbsFor(page.route, page.breadcrumbTitle ?? page.title);
  if (breadcrumbs) enriched.push(breadcrumbs);

  if (page.route === '/') enriched.push(ORGANIZATION, WEBSITE, VIDEO, HOW_TO);

  return enriched;
}

/**
 * Every `<Route path="...">` in App.tsx has to have a PAGES entry, or that route ships
 * without meta tags and never reaches the sitemap. Fail the build instead.
 */
function verifyRouteCoverage() {
  const appSource = fs.readFileSync(APP_TSX_PATH, 'utf-8');
  const routes = [...appSource.matchAll(/<Route\s+path="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((route) => route !== '*');

  const covered = new Set(PAGES.map((page) => page.route));
  const missing = routes.filter((route) => !covered.has(route));

  if (missing.length > 0) {
    throw new Error(
      `these routes exist in src/App.tsx but have no entry in scripts/prerender.js PAGES:\n` +
      missing.map((route) => `          ${route}`).join('\n') +
      `\n        Add them so they get meta tags, JSON-LD and a sitemap URL.`
    );
  }
}

/**
 * Puts the server-rendered app inside `#root`.
 *
 * The replacement is a function rather than a string because the rendered markup
 * contains `$` characters (Tailwind arbitrary values, prices, CSS variables), and
 * `String.replace` would interpret `$&` and `$1` in a string replacement as capture
 * references and silently corrupt the output.
 */
function injectApp(html, appHtml) {
  if (!html.includes(ROOT_DIV)) {
    throw new Error(
      `could not find ${ROOT_DIV} in the built template. Vite's output shape changed;\n` +
      `        update ROOT_DIV in scripts/prerender.js to match.`
    );
  }
  return html.replace(ROOT_DIV, () => `<div id="root">${appHtml}</div>`);
}

/** Head rewrites shared by the real routes and the 404 page. */
function applyHead(html, { title, description, url, type, robots }) {
  html = replaceTitle(html, title);
  html = replaceOrInsertMeta(html, 'name', 'description', description);
  html = replaceOrInsertMeta(html, 'name', 'robots', robots);

  // OpenGraph
  html = replaceOrInsertMeta(html, 'property', 'og:title', title);
  html = replaceOrInsertMeta(html, 'property', 'og:description', description);
  html = replaceOrInsertMeta(html, 'property', 'og:type', type);
  html = replaceOrInsertMeta(html, 'property', 'og:site_name', 'Dynamic Notch');
  html = replaceOrInsertMeta(html, 'property', 'og:image', OG_IMAGE);
  html = replaceOrInsertMeta(html, 'property', 'og:image:width', OG_IMAGE_WIDTH);
  html = replaceOrInsertMeta(html, 'property', 'og:image:height', OG_IMAGE_HEIGHT);
  html = replaceOrInsertMeta(html, 'property', 'og:image:alt', OG_IMAGE_ALT);

  // Twitter
  html = replaceOrInsertMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = replaceOrInsertMeta(html, 'name', 'twitter:title', title);
  html = replaceOrInsertMeta(html, 'name', 'twitter:description', description);
  html = replaceOrInsertMeta(html, 'name', 'twitter:image', OG_IMAGE);
  html = replaceOrInsertMeta(html, 'name', 'twitter:image:alt', OG_IMAGE_ALT);

  if (url) {
    html = replaceOrInsertCanonical(html, url);
    html = replaceOrInsertMeta(html, 'property', 'og:url', url);
  }

  return html;
}

async function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Error: build template not found at ${TEMPLATE_PATH}. Run "npm run build" first.`);
    process.exit(1);
  }
  if (!fs.existsSync(SSR_ENTRY_PATH)) {
    console.error(
      `Error: SSR bundle not found at ${SSR_ENTRY_PATH}.\n` +
      `       Run "vite build --ssr src/entry-server.tsx --outDir dist-ssr" first ` +
      `(the "build" script does this).`
    );
    process.exit(1);
  }

  const { render } = await import(pathToFileURL(SSR_ENTRY_PATH).href);

  const { downloadUrl, fileSize } = verifyAppcast();
  verifyRouteCoverage();

  // Teach the SoftwareApplication entry where the build actually lives.
  const softwareApp = PAGES.find((page) => page.route === '/')
    ?.schema?.find((entry) => entry['@type'] === 'SoftwareApplication');
  if (softwareApp) {
    softwareApp.downloadUrl = downloadUrl;
    softwareApp.fileSize = `${Math.round(fileSize / 1024)}KB`;
  }

  const baseHtml = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  console.log(`Pre-rendering ${PAGES.length} routes...`);

  for (const page of PAGES) {
    const fullUrl = canonicalFor(page.route);
    const appHtml = await render(page.route);
    let html = applyHead(baseHtml, {
      title: page.title,
      description: page.description,
      url: fullUrl,
      type: page.type,
      robots: 'index, follow',
    });

    // Schema Markup
    if (page.schema) {
      html = replaceOrInsertSchema(html, enrichSchema(page.schema, page));
    } else {
      // Drop the base template's SoftwareApplication schema, it only belongs on "/" , 
      // but still give the page its breadcrumb trail.
      const breadcrumbs = breadcrumbsFor(page.route, page.breadcrumbTitle ?? page.title);
      html = breadcrumbs
        ? replaceOrInsertSchema(html, breadcrumbs)
        : html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '');
    }

    html = injectApp(html, appHtml);

    // Determine output file path
    let outputPath;
    if (page.route === '/') {
      outputPath = TEMPLATE_PATH;
    } else {
      const pageDir = path.join(DIST_DIR, page.route);
      if (!fs.existsSync(pageDir)) {
        fs.mkdirSync(pageDir, { recursive: true });
      }
      outputPath = path.join(pageDir, 'index.html');
    }

    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`Successfully pre-rendered: ${page.route} -> ${outputPath}`);
  }

  // Designed 404. The <Route path="*"> in App.tsx renders it under the current
  // vercel.json catch-all rewrite; this file is what Vercel serves directly if that
  // rewrite is ever narrowed, and it is deliberately kept out of the sitemap.
  const notFoundHtml = injectApp(
    applyHead(baseHtml, {
      title: 'Page not found - Dynamic Notch',
      description:
        'That page does not exist. Head back to the Dynamic Notch home page or browse the blog.',
      type: 'website',
      robots: 'noindex, follow',
    }).replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, ''),
    // Any path with no PAGES entry falls through to <Route path="*"> and renders NotFound.
    await render('/__not-found__'),
  );
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');
  console.log('Generated 404.html');

  // Generated, not checked in, so they cannot fall out of step with PAGES / product.js.
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), buildSitemap(PAGES), 'utf-8');
  console.log(`Generated sitemap.xml with ${PAGES.length} URLs`);

  fs.writeFileSync(path.join(DIST_DIR, 'llms.txt'), buildLlmsTxt(), 'utf-8');
  console.log('Generated llms.txt');

  console.log('Pre-rendering completed successfully!');
}

// `main` is async, so a try/catch around the call would not see a rejection, it would
// surface as an unhandled rejection and, depending on the Node version, still exit 0.
main().catch((error) => {
  console.error(`Pre-render failed: ${error.message}`);
  if (error.stack) console.error(error.stack);
  process.exit(1);
});
