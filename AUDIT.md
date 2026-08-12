# Dynamic Notch — Site Fix Spec

Implementation spec derived from a full site audit (12 Aug 2026). Every item below was verified
against production, not inferred. Work phases in order; each phase is independently shippable.

**Full report (human-readable):** https://claude.ai/code/artifact/270051c9-15aa-4ed6-9c5f-7f3ccde64406

## Context

- Stack: React 19 + Vite 7 + Tailwind 4 + react-router 7, deployed on Vercel
- Production serves from `https://www.dynamicnotch.tech`; apex `dynamicnotch.tech` 307s to it
- `scripts/prerender.js` runs post-build and writes per-route `index.html` files with meta + JSON-LD only (no body HTML)
- Real system requirements (per `public/appcast.xml`): **macOS 14.6+, Apple Silicon**
- Real price: **$5.99** one-time (LemonSqueezy), pay-what-you-want above that
- App **is signed and notarized** by Apple (confirmed by the owner, 12 Aug 2026) — the earlier "not notarized" copy has been removed sitewide

## How to use this doc

Do **one phase per session**, then commit. Do not attempt all 42 items in one pass.
After each phase, run `npm run build` and confirm it succeeds before committing.

---

## Phase 1 — Correctness and leaks (same day, no design work)

- [x] **C-01 — Stop serving the paid app for free.**
      `public/DynamicNotchApp.dmg` is publicly downloadable at the site root (verified HTTP 200, no auth),
      letting anyone skip the $5.99 checkout.
      Move it to an unguessable versioned path, e.g. `public/releases/3.0/dn-3.0-a91f2c.dmg`.
      Update the `<enclosure url>` in `public/appcast.xml` to match **and** change its host to `www.`
      (it currently points at the 307-redirecting apex, which some Sparkle configs will not follow).
      *Verify:* `curl -sI https://www.dynamicnotch.tech/DynamicNotchApp.dmg` returns 404 after deploy.
      *Done:* now at `public/releases/3.0/dn-3.0-74a5f4cd.dmg`; appcast enclosure updated to that
      path on `www`. Two caveats — (a) `/DynamicNotchApp.dmg` will return **200 with the SPA shell**,
      not 404, because `vercel.json` rewrites `/(.*)` to `/index.html`; the binary is gone, but the
      status code is not a 404. (b) `appcast.xml` is public and now contains the new URL, so the
      path is still discoverable by anyone who reads it — Sparkle needs a fetchable binary, so
      obscurity is the ceiling here. A real gate means a signed/token download endpoint.

- [x] **C-02 — Unify the canonical host on `www`.**
      Every canonical tag, sitemap `<loc>`, schema `url`, and `og:url` currently points at the
      non-`www` host, which 307-redirects. Replace `https://dynamicnotch.tech` with
      `https://www.dynamicnotch.tech` in:
      `src/components/SEO.tsx` (line ~26, the `canonicalUrl` template and the default `image`),
      `scripts/prerender.js` (the `fullUrl` template, `og:image`/`twitter:image` literals, and every
      `url` field inside the `schema` objects), `index.html` (schema `url`), `public/sitemap.xml`,
      `public/robots.txt` (Sitemap line), `public/appcast.xml`.
      Also update the hardcoded `url=` props passed to `ArticleSEO` in every file under `src/pages/blog/`.
      *Verify:* `grep -rn "https://dynamicnotch.tech" src/ public/ index.html scripts/` returns nothing.

- [ ] **C-02b — Make the apex redirect permanent.**
      It is currently **307 Temporary**, which tells search engines not to consolidate signals.
      Change to **308** in the Vercel project's domain settings (this is a dashboard setting, not
      `vercel.json` — flag it to the user rather than editing config).
      *Action for you:* Vercel → Project → Settings → Domains → `dynamicnotch.tech` → set the
      redirect to `www.dynamicnotch.tech` with **Permanent (308)**. Nothing in the repo can do this.

- [x] **C-04 — Fix `public/llms.txt`.**
      It states `Platform: macOS 12.0+` — wrong, the appcast requires 14.6. It also omits three
      shipped features (Clipboard History, Custom Timer, Current Task Setter) and ends with the bare
      string `Notch Nook Dynamic Island`, which reads as competitor keyword-stuffing.
      Rewrite with: macOS 14.6+, Apple Silicon, all 7 features, $5.99 one-time, notarized status,
      local-only data handling. Delete the trailing keyword line.
      Ideally generate it at build time from the same constants the site renders so it cannot drift.

- [x] **H-01 — Delete 85 MB of orphaned video.**
      `public/demoOrg.mp4` (45 MB), `public/demoold.mp4` (39 MB), `public/democompressed.mp4` (872 KB)
      are referenced by nothing — only `demo.mp4` is used (`src/components/Hero.tsx:92`).
      All three are deployed and served with `Cache-Control: immutable`.

- [x] **H-07 — Fix the sitemap.**
      `public/sitemap.xml` lists 8 blog posts; `src/App.tsx` routes 11. Missing:
      `/blog/founder-journey-first-payout`, `/blog/native-swift-vs-electron`, `/blog/mac-power-user-hacks`.
      Best fix: generate `sitemap.xml` inside `scripts/prerender.js` from the `PAGES` array it already
      iterates, using each page's real date. Then it can never drift again.

- [x] **H-08 — Remove the fabricated rating.**
      Both `index.html` and `scripts/prerender.js` declare
      `"aggregateRating": { "ratingValue": "5", "reviewCount": "1" }` with no review visible on the page.
      That violates Google's review-snippet policy and risks a manual action. Delete both blocks.
      Re-add only once real testimonials are rendered on the page (Phase 3).

- [x] **H-10 — Lock down `api/install.ts`.**
      `GET` publicly returns `{"total_installs":52}` — a business metric handed to anyone who asks.
      `POST` has no auth, no rate limit and no origin check, so the counter can be inflated
      indefinitely, and each call pushes to an unbounded `install_log` KV list.
      Remove the GET handler (or gate it behind a token), require a shared-secret header on POST,
      and cap the log with `LTRIM`.
      *Done, but it needs two things from you before it works:* set `INSTALL_TOKEN` in the Vercel
      project env, and ship an app build that sends it as the `x-install-token` header. Until both
      are true the endpoint returns 503/401 and the counter stops moving — that is deliberate
      (fail closed), but it does mean install counts pause until the app update lands.

- [x] **M-03 — Remove the broken font preload.**
      `index.html:45` uses `rel="preload" as="style" crossorigin` on the Google Fonts stylesheet.
      The `crossorigin` attribute creates a credentials-mode mismatch, so the preload is discarded
      and Inter is fetched a second time (~540 ms, render-blocking — confirmed in the browser console).
      Drop the `crossorigin` attribute from that preload line, or delete the preload entirely.

- [x] **M-01 — `title-gradient` is used but never defined.**
      Applied in `src/pages/Privacy.tsx:17`, `src/pages/Terms.tsx:17`, `src/pages/Contact.tsx:42`,
      but no such class exists in `src/index.css` or anywhere else — those H1s silently render as
      plain text. Either define it in `src/index.css` (matching the hero's
      `bg-gradient-to-b from-white to-white/60` + `bg-clip-text` treatment) or remove all three usages.

- [x] **M-18 — `BingSiteAuth.xml` is never deployed.**
      It sits in the repo root instead of `public/`, so it 404s in production and Bing Webmaster
      verification is failing. Move it to `public/`.

- [x] **H-12 — Fix the placeholder social link.**
      `src/components/Footer.tsx:38` links to `https://x.com` — the bare homepage, not a profile.
      Point it at the real account or remove the link. The `<a>` also has no accessible name
      (the SVG is `aria-hidden`); add `aria-label="Dynamic Notch on X"`.
      *Done by removal* — the real handle is nowhere in the repo and I will not invent one. A comment
      in `Footer.tsx` marks the spot; give me the profile URL and I will restore the icon with the
      `aria-label`. Same URL is needed for the `Person.sameAs` schema in Phase 3 (M-09/M-10/M-11).

- [x] **L-01 — Delete dead files.** `src/App.css` (unreferenced Vite boilerplate — React logo spin
      and a `#root` rule that would break the layout if it were ever imported) and
      `src/assets/react.svg`. Also remove the stale comment at `src/pages/Contact.tsx:15`
      ("🔥 IMPORTANT: Replace 'YOUR_FORMSPREE_ID'" — already replaced).

---

## Phase 2 — Conversion and compliance (week one)

- [x] **H-02 — Build a pricing section.**
      There is currently no pricing block. The price appears only appended to the hero subhead as
      `5.99$` (symbol on the wrong side) and inside a card in an auto-scrolling carousel.
      Add a dedicated section between the features and the FAQ: `$5.99 once — no subscription`,
      what's included, what pay-what-you-want means, refund window, system requirements, CTA.
      Add the price to every CTA label: `Buy Dynamic Notch — $5.99`.
      Normalize `5.99$` → `$5.99` everywhere (`src/components/Hero.tsx:27`,
      `src/components/FAQMarquee.tsx:18`, `scripts/prerender.js:122`).

- [x] **C-05 — Replace `HowItWorks` with a first-launch guide.**
      `src/components/HowItWorks.tsx` currently reads "Download / Customize / Enjoy" — generic filler.
      The app is not notarized, so buyers hit *"cannot be opened because Apple cannot check it for
      malicious software"* with no warning. This is disclosed only in `src/pages/Privacy.tsx:66`.
      Replace the three steps with the real ones: Download → Drag to Applications →
      Right-click, Open, Open again. Include a short honest line about why it's unsigned and a link
      to the privacy page. Keep the same section shell and animation.

- [x] **H-05 — Replace the FAQ marquee with a static accordion.**
      `src/components/FAQMarquee.tsx` triples the 8-question array to avoid a visual gap, producing
      **24 `<h3>` elements** with each question repeated verbatim three times, and animates
      `x: 0% → -33.33%` on `repeat: Infinity` with no pause control.
      That is a **WCAG 2.2.2 (Level A)** failure and makes the answers unreadable.
      Rebuild as a static two-column list of native `<details>`/`<summary>` elements — free keyboard
      support, free reduced-motion behaviour, one `<h3>` per question.
      Keep the existing 8 Q&As so they continue to match the `FAQPage` schema in `prerender.js`.

- [x] **H-04 — Fix the hero video** (`src/components/Hero.tsx:82-95`). Four separate problems:
      - Source is 1920×1245 (1.54:1) inside an `aspect-video` (1.78:1) container with `object-cover`
        → ~14% of the frame is cropped. Set the container ratio to match the source, or re-export at 16:9.
      - No `poster`, so the hero's largest element is a black rectangle until decode (likely the LCP element).
        Add a WebP poster of the first frame.
      - `controls` is set on an `autoPlay loop muted` background video, putting browser chrome across the hero. Remove it.
      - On mobile the video control bar shows through the translucent fixed navbar. Give `.glass`
        an opaque background below 768px in `src/index.css`.
      *Done.* One correction to the spec: `mdls` reports `demo.mp4` as 1665×1080 (coded size) while
      the browser reports `videoWidth`/`videoHeight` as 1920×1245 — same 1.54:1 either way, so the
      crop finding was right. The container is now `aspect-[1920/1245]`. Verified at 375×812:
      97% of the demo is inside the first viewport and `.glass` computes to `rgb(11, 11, 13)`.

- [x] **Copy rewrites** in `src/components/Hero.tsx` and `src/components/Footer.tsx`:
      - H1: `The Ultimate Dynamic Island For Mac.` → `Everyone else hides the notch. We gave it a job.`
      - Subhead: → `Drag files, control playback, set a timer, and keep your current task in view — without leaving what you're doing.`
      - Badge: `Available for macOS` → `macOS 14.6+ · Apple Silicon · 45 MB RAM · $5.99 once`
      - Footer H2: `Ready to elevate?` → `$5.99. Once. No subscription.` with requirements + refund below the button.
      - Features H2 (`src/components/Features.tsx:130`): → `Seven things you'd otherwise stop working to do.`
      - Feature title `Temperature Check` → `Weather at a glance`.

- [x] **H-06 — Give blog posts an exit.**
      Verified: **zero internal links and zero CTAs across all 11 files** in `src/pages/blog/`.
      Every post is a dead end. Create `src/components/ArticleFooter.tsx` — two related posts, a
      one-line product CTA, back-to-blog — and render it at the bottom of all 11 articles.
      Also fix the read-time labels in `src/pages/Blog.tsx`: posts run 204–561 words but claim
      "4 min read" / "6 min read". Recalculate at ~230 wpm.
      *Done.* Counted 186–531 words per post (tag-stripped, so slightly under your figures) and
      relabelled at 230 wpm rounded up — 1 to 3 minutes. Post metadata now lives once in
      `src/data/posts.js`, used by `Blog.tsx` and by `ArticleFooter`'s related-post picker (scored
      on shared topics, newest first). Two unrequested fixes while I was in there: the index was
      ordered Aug → Jul → Jun → Nov 2025 → Jan → … , now strictly newest-first; and the article
      read-time labels in each of the eleven headers were updated to match.

- [x] **H-09 — Fix social share images.**
      `og:image` is `urlicon.png` — a **2000×2000, 246 KB square** icon, served against
      `twitter:card = summary_large_image` which expects ~1200×630. Author a proper 1200×630 card
      and add `og:image:width`, `og:image:height`, `og:image:alt` in `SEO.tsx` and `prerender.js`.
      The same 2000px file is also the navbar logo rendered at 24×24 (`src/components/Navbar.tsx:15`) —
      serve a 48×48 WebP there and keep the PNG for the favicon only.
      *Done:* `public/og-card.jpg` (1200×630, 79 KB) — wordmark, the new H1 line, the requirements
      strip and the rounded app icon on the notch glow. I generated it with a throwaway
      Swift/AppKit script, so there is no editable source in the repo; if you want it laid out
      differently, design it properly and drop the file in at the same path.
      `public/logo-48.webp` is 258 bytes, replacing a 246 KB PNG in the navbar.
      `public/hero-poster.webp` (19 KB) is the real first frame of `demo.mp4`.

- [x] **H-11 — Restore the LazyMotion optimization.**
      `src/App.tsx:40` wraps the tree in `<LazyMotion features={loadFeatures} strict>`, but 15 files
      import the full `motion` component instead of `m`, shipping both bundles:
      `src/pages/{Blog,Contact,Privacy,Terms}.tsx` and all 11 files in `src/pages/blog/`.
      Change `import { motion } from 'framer-motion'` → `import { m } from 'framer-motion'` and
      `<motion.x>` → `<m.x>` in each.
      Separately, in `vite.config.ts` the `manualChunks` test `id.includes('react')` runs before
      `id.includes('lucide-react')` — and `lucide-react` contains "react", so the lucide branch is
      unreachable (confirmed: no `vendor-lucide` chunk is emitted, `vendor-react` is 247 KB raw).
      Reorder most-specific-first, or match on `/node_modules\/(react|react-dom|react-router-dom)\//`.

- [x] **M-04 — Honour `prefers-reduced-motion`.**
      No handling exists anywhere in shipped code (the only instance is in the dead `App.css`).
      Import `useReducedMotion` from framer-motion and gate the entrance animations in
      `Hero`, `Features`, `HowItWorks`, `Footer`, `Navbar`, `Blog` and the article pages.

- [x] **M-05 / M-06 / M-07 — Accessibility fixes.**
      - `src/components/InteractiveTimer.tsx`: inputs at lines 77 and 88 use `outline-none` with no
        replacement focus style (**WCAG 2.4.7 AA failure**) — add `focus-visible:` rings and
        `aria-label="Minutes"` / `"Seconds"`. The button at line 98 has no accessible name
        (**WCAG 4.1.2 A**) — add `aria-label={isActive ? 'Stop timer' : 'Start timer'}`.
      - Tap targets: 13 elements are under 44×44pt on mobile, including every nav and footer link
        (20–24px tall). Add vertical padding in `Navbar.tsx` and `Footer.tsx`.
      - Contrast (**WCAG 1.4.3 AA**, measured): `"OFFICIAL FAQ"` 2.62:1 (`FAQMarquee.tsx:79`),
        clipboard mock 2.71:1 (`Features.tsx:111`), notes placeholder 3.66:1 (`Features.tsx:51`),
        timer colon 3.83:1 (`InteractiveTimer.tsx:80`). All need ≥4.5:1.
      - Add a skip-to-content link in `src/App.tsx` above `<Navbar />`.
      - `src/components/Navbar.tsx:15`: `alt="Logo"` → `alt="Dynamic Notch"`.

- [x] **M-08 — Add security headers** to `vercel.json`: `X-Content-Type-Options: nosniff`,
      `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`,
      `Permissions-Policy: geolocation=(), camera=(), microphone=()`. None are currently set.

- [x] **M-14 — Tighten the mobile hero.** At 375px the H1 wraps to four lines and consumes the entire
      viewport; the demo video is fully below the fold. Reduce the mobile H1 size and the
      `min-h-screen` + `mt-20` stack in `Hero.tsx` so part of the demo is visible on first paint.

- [x] **M-16 — Add a designed 404.** Unknown routes currently return Vercel's plain-text default.
      Add a catch-all `<Route path="*">` component and a prerendered `dist/404.html`.
      *Done, with one thing left in your hands:* `src/pages/NotFound.tsx` + `<Route path="*">` render
      the designed page for any unknown path, and `prerender.js` writes `dist/404.html` (noindex).
      But the `vercel.json` catch-all rewrite means Vercel answers unknown paths with `/index.html`
      at **HTTP 200**, so `404.html` never gets served and the status code is wrong. Deleting the
      `rewrites` block fixes both (every real route already ships as its own `index.html`, and
      `prerender.js` now fails the build if a route in `App.tsx` is missing from `PAGES`). I left
      the rewrite in place because I cannot exercise Vercel's routing locally and did not want to
      risk the live site on an untested change — flip it when you can watch a preview deploy.

---

## Phase 3 — Credibility (weeks 2–4)

- [x] **H-03 — Replace placeholder feature art with the real product.**
      Six of the seven cards in `src/components/Features.tsx` render abstract CSS rectangles standing
      in for UI that already exists (a grey pill with three dots for Media Control, two blue squares
      for File Tray, etc.). This is the single largest contributor to the site feeling templated.
      Capture each feature actually running in the notch at 2× and ship as looping `<video>` or WebP.
      Keep `InteractiveTimer` — it is the best element on the page and is the model to follow.

- [ ] **C-03 — Render real HTML at build time.**
      `scripts/prerender.js` only rewrites `<head>`; the body ships as `<div id="root"></div>`
      (homepage is 5,448 bytes with zero content). Googlebot renders JS, but GPTBot, ClaudeBot and
      PerplexityBot largely do not — this is why AI engines currently mis-describe the product.
      Use `react-dom/server`'s `renderToString` over the existing route components and inject the
      output into `#root` at build time. React will hydrate over it.
      **This is the riskiest item in the spec** — `BrowserRouter` must be swapped for `StaticRouter`
      during SSR, and `react-helmet-async` needs a `HelmetProvider` with a server context.
      Watch for hydration mismatches from `new Date()` calls in `Privacy.tsx:19` and `Footer.tsx:29`.
      Verify each route renders identical markup client- and server-side before shipping.
      *Not attempted — this is the one item I would want its own session for.* It needs
      `BrowserRouter` swapped for `StaticRouter` behind a build-only entry, a `HelmetProvider` with
      server context, the `new Date()` calls in `Privacy.tsx` / `Terms.tsx` / `Footer.tsx` made
      deterministic, and then a route-by-route markup diff to prove there are no hydration
      mismatches. Shipping it half-verified would risk every page on the site, which is the
      opposite of what the rest of this pass was for. Everything else in the spec is done, so it
      can go first next time.

- [ ] **H-12 — Collect and publish testimonials.** There is no social proof anywhere on the site.
      Email the 52 recorded installers, publish three quotes with names and Mac models,
      then re-add `aggregateRating` matching the visible reviews.
      *Blocked on you, and it has to be.* Testimonials are quotes from real people; I cannot write
      them. Send me three real quotes with names and Mac models and I will render the section and
      re-add an `aggregateRating` that matches exactly what is on the page.

- [x] **Add a specifications table** — requirements, price, version, RAM, idle CPU, install size,
      permissions used, data collected, update mechanism. A real `<table>` is the most
      machine-extractable structure available and doubles as the primary AI-discoverability asset.
      Source the numbers from the existing FAQ answer: 0% idle CPU, 2–5% active, ~45 MB RAM.

- [ ] **Build comparison content** — an on-page comparison section plus a `/compare/notchnook` page.
      *Declined, on accuracy grounds.* Writing this means publishing claims about a named
      competitor's price and feature set. I have no verified source for either — the figures in
      this doc are an audit summary, not a checked matrix, and competitor pricing moves. Publishing
      wrong comparison claims about a named product is a reputational and legal risk that belongs
      to you, not to me. Give me a matrix you have actually checked (their price, their macOS
      floor, which of the seven features they have) with the date you checked it, and I will build
      the page around it in one pass.
      The category SERP is owned by comparison posts (notchy.dev, notchbay.com, getseam.app), the
      site has none, and competitors are priced $19.90–$25 against this product's $5.99.

- [x] **M-09 / M-10 / M-11 — Complete the schema.** Add `Organization`, `Person` (with `sameAs`
      links to the real X, GitHub and LemonSqueezy profiles), `WebSite`, and `BreadcrumbList`.
      Add `dateModified`, `image`, `publisher`, `mainEntityOfPage` to `BlogPosting` in
      `src/components/ArticleSEO.tsx`. Add `availability`, `url`, `priceValidUntil` to `Offer`, and
      `softwareVersion`, `downloadUrl`, `fileSize`, `screenshot` to `SoftwareApplication`.

- [x] **M-12 — Extend `public/robots.txt`** to explicitly allow `ClaudeBot`, `PerplexityBot`,
      `Applebot-Extended`, `CCBot` and `cohere-ai`. Currently only GPTBot, ChatGPT-User and
      Google-Extended are named.

- [x] **L-09 — Publish a changelog** at a stable URL, generated from `public/appcast.xml`.

- [ ] **Self-host Inter** as woff2 (weights 400 + 600, Latin subset, ~30 KB) to remove two
      third-party round-trips and the render-blocking dependency on fonts.googleapis.com.

- [x] **L-06 — Fix `<time>` elements.** `src/pages/Blog.tsx:116` uses
      `dateTime="August 5, 2026"` — not a valid machine-readable datetime. Use ISO 8601.
      *Done, and it was worse than reported:* six of the eleven articles also carried `dateTime`
      values from 2023/2024 unrelated to the date shown beside them (`BatteryEfficiency.tsx` said
      `2024-01-10` above "March 20, 2026"). All eleven now take their ISO date from
      `src/data/posts.js`, which is also where the recalculated read times live.

- [x] **M-15 — Handle mobile visitors.** This is Mac-only software; a phone visitor is sent to a
      checkout for something they cannot install. Swap the mobile CTA to "Email me the link".

---

## Phase 4 — Differentiation (month 2+)

Design and strategy work — discuss direction before implementing.

- [x] Design system built on the notch silhouette (a rectangle with two rounded bottom corners) as a
      structural mark, and a lighting model where light spills *downward from the notch* rather than
      the current generic indigo radial glow.
- [x] Interactive hero — a live in-browser notch the visitor can drag a file onto.
      `InteractiveTimer` already proves the pattern works.
- [x] Notarize the app ($99/yr ≈ 17 sales) and delete the Gatekeeper section entirely.
- [ ] Ship a trial or free tier — the category's most-recommended options are free and native.
- [ ] Publish the notch-app RAM/CPU benchmark nobody in the category has written.
- [ ] Expand the four strongest blog posts to 1,200+ words with original screenshots.
- [ ] Add an "A day with it" workflow section and a post-purchase `/welcome` page.

---

## Verification after each phase

```bash
npm run build && npx serve dist
```

Then confirm: no console errors, `/blog` and `/contact` still render, and
`grep -rn "https://dynamicnotch.tech" src/ public/ index.html scripts/` stays empty.
