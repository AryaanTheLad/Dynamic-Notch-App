import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

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
    title: 'Dynamic Notch - The Ultimate MacBook Notch Utility',
    description: 'Transform your MacBook notch into an interactive Dynamic Island. Add a file tray, music player, native AirDrop, and widgets right to your notch.',
    type: 'website',
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Dynamic Notch",
        "operatingSystem": "macOS",
        "applicationCategory": "UtilitiesApplication",
        "description": "A macOS utility that brings Dynamic Island functionality to the MacBook notch. Features include a file tray, music player, weather widget, and native AirDrop integration.",
        "url": "https://dynamicnotch.tech",
        "offers": {
          "@type": "Offer",
          "price": "5.99",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "1"
        },
        "featureList": [
          "File Tray for temporary storage",
          "Music Player controls",
          "Native AirDrop integration",
          "Weather and Notes widgets"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is it safe for my MacBook?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Dynamic Notch uses native macOS APIs and doesn't modify system files."
            }
          },
          {
            "@type": "Question",
            "name": "Does it support external monitors?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! However, it's recommended to be used on Macbook M1 or later for the best experience."
            }
          },
          {
            "@type": "Question",
            "name": "Does it affect my battery life?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not at all! Dynamic notch is a very lightweight utility app that has minimal impact on the system. Used 0% cpu on idle, with 2-5% when actively being used. Ram usage is constant around 45MB."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a one-time purchase?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dynamic Notch is priced at 5.99$, along with a pay-what-you-want model."
            }
          },
          {
            "@type": "Question",
            "name": "What features does it have?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "File Tray, Media Control, Quick Notes, Custom Timer, Current Task Setter, Clipboard History, Weather and more!"
            }
          },
          {
            "@type": "Question",
            "name": "Can I customize the application?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can configure your Dynamic Notch and change specific behaviors."
            }
          },
          {
            "@type": "Question",
            "name": "Is it compatible with older Macs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dynamic Notch works on Apple Silicon Macs starting with the base variant of M1."
            }
          },
          {
            "@type": "Question",
            "name": "How do I hide the MacBook notch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While our app embraces the notch, you can use our 'Hide Notch Mode' to revert the notch when needed."
            }
          }
        ]
      }
    ]
  },
  {
    route: '/blog',
    title: 'Dynamic Notch Blog - MacBook Notch Utilities & Customization',
    description: 'Read the latest articles about maximizing productivity, customizing your MacBook notch, and turning it into a functional Dynamic Island.',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Dynamic Notch Blog",
      "description": "Read the latest articles about maximizing productivity, customizing your MacBook notch, and turning it into a functional Dynamic Island.",
      "url": "https://dynamicnotch.tech/blog"
    }
  },
  {
    route: '/blog/intro',
    title: 'Elevate Your macOS Experience with Dynamic Notch - Dynamic Notch Blog',
    description: "If you've ever envied the iOS Dynamic Island, Dynamic Notch brings that identical, hyper-refined utility straight to your Mac.",
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Elevate Your macOS Experience with Dynamic Notch",
      "description": "If you've ever envied the iOS Dynamic Island, Dynamic Notch brings that identical, hyper-refined utility straight to your Mac.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2025-11-25",
      "url": "https://dynamicnotch.tech/blog/intro"
    }
  },
  {
    route: '/blog/why-dynamic-island-mac',
    title: 'Why Your Mac Deserves a Dynamic Island - Dynamic Notch Blog',
    description: 'An area the iPhone transformed into an interactive hub was left completely static on macOS—until now.',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Why Your Mac Deserves a Dynamic Island",
      "description": "An area the iPhone transformed into an interactive hub was left completely static on macOS—until now.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-01-02",
      "url": "https://dynamicnotch.tech/blog/why-dynamic-island-mac"
    }
  },
  {
    route: '/blog/boost-productivity',
    title: 'How Dynamic Notch Supercharges Productivity - Dynamic Notch Blog',
    description: 'Every time you stop writing code just to open Spotify, wait, and hit next—you break your flow state.',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How Dynamic Notch Supercharges Productivity",
      "description": "Every time you stop writing code just to open Spotify, wait, and hit next—you break your flow state.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-02-15",
      "url": "https://dynamicnotch.tech/blog/boost-productivity"
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
      "url": "https://dynamicnotch.tech/blog/minimalist-setup"
    }
  },
  {
    route: '/blog/notch-customization',
    title: 'How Much Can You Customize the macOS Notch? - Dynamic Notch Blog',
    description: "With Dynamic Notch, the static bezel isn't just utilized—it is deeply customizable to fit any personal aesthetic.",
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How Much Can You Customize the macOS Notch?",
      "description": "With Dynamic Notch, the static bezel isn't just utilized—it is deeply customizable to fit any personal aesthetic.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-03-01",
      "url": "https://dynamicnotch.tech/blog/notch-customization"
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
      "url": "https://dynamicnotch.tech/blog/battery-efficiency"
    }
  },
  {
    route: '/blog/how-to-hide-macbook-notch',
    title: 'How to Hide the MacBook Notch (and Why You Might Not Want To) - Dynamic Notch Blog',
    description: 'If you are searching for how to hide the MacBook notch, here are the best methods—and an alternative way to make it genuinely useful.',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "How to Hide the MacBook Notch (and Why You Might Not Want To)",
      "description": "If you are searching for how to hide the MacBook notch, here are the best methods—and an alternative way to make it genuinely useful.",
      "author": {
        "@type": "Person",
        "name": "Aryaan"
      },
      "datePublished": "2026-04-19",
      "url": "https://dynamicnotch.tech/blog/how-to-hide-macbook-notch"
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
      "url": "https://dynamicnotch.tech/blog/versionUpdate"
    }
  },
  {
    route: '/privacy',
    title: 'Privacy Policy - Dynamic Notch',
    description: 'Read our Privacy Policy to understand how we protect your data. Dynamic Notch operates locally and values your privacy first.',
    type: 'website'
  },
  {
    route: '/terms',
    title: 'Terms of Service - Dynamic Notch',
    description: 'Read the terms of service governing the download, license, and usage of the Dynamic Notch macOS application.',
    type: 'website'
  },
  {
    route: '/contact',
    title: 'Contact Us - Dynamic Notch Support & Feedback',
    description: 'Have questions, feedback, or need help with Dynamic Notch? Get in touch directly with the developer.',
    type: 'website'
  }
];

function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Error: build template not found at ${TEMPLATE_PATH}. Run "npm run build" first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  console.log(`Pre-rendering ${PAGES.length} routes...`);

  for (const page of PAGES) {
    const fullUrl = `https://dynamicnotch.tech${page.route === '/' ? '' : page.route}`;
    let html = baseHtml;

    // Replace basic tags
    html = replaceTitle(html, page.title);
    html = replaceOrInsertCanonical(html, fullUrl);
    html = replaceOrInsertMeta(html, 'name', 'description', page.description);
    html = replaceOrInsertMeta(html, 'name', 'robots', 'index, follow');

    // OpenGraph
    html = replaceOrInsertMeta(html, 'property', 'og:title', page.title);
    html = replaceOrInsertMeta(html, 'property', 'og:description', page.description);
    html = replaceOrInsertMeta(html, 'property', 'og:url', fullUrl);
    html = replaceOrInsertMeta(html, 'property', 'og:type', page.type);
    html = replaceOrInsertMeta(html, 'property', 'og:image', 'https://dynamicnotch.tech/urlicon.png?v=2');

    // Twitter
    html = replaceOrInsertMeta(html, 'name', 'twitter:title', page.title);
    html = replaceOrInsertMeta(html, 'name', 'twitter:description', page.description);
    html = replaceOrInsertMeta(html, 'name', 'twitter:image', 'https://dynamicnotch.tech/urlicon.png?v=2');

    // Schema Markup
    if (page.schema) {
      html = replaceOrInsertSchema(html, page.schema);
    } else {
      // If no schema, remove the default SoftwareApplication schema from the base template
      html = html.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '');
    }

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

  console.log('Pre-rendering completed successfully!');
}

main();
