# dynamicnotch.tech

React 19 + Vite + Tailwind, prerendered to static HTML at build time and served by a
Cloudflare Worker with static assets.

```bash
npm run dev        # local dev server
npm run build      # typecheck, client + SSR build, prerender every route into dist/
npm run deploy     # build, then wrangler deploy
npm run indexnow   # after a content deploy: ping Bing/IndexNow with every sitemap URL
```

## Hosting (Cloudflare)

- `wrangler.jsonc` serves `dist/` and runs `worker/index.js` in front of every request.
- The Worker redirects `dynamicnotch.tech` and `http://` to `https://www.dynamicnotch.tech`
  (301), turns trailing-slash URLs into 301s, and handles `/api/install` (the app's install
  ping) and `/api/event` (site conversion events).
- `public/_headers` and `public/_redirects` still apply to every static file.

### One-time setup

- **Install ping:** `npx wrangler secret put INSTALL_TOKEN` with the same value the app
  sends in `x-install-token`. Until it is set the endpoint answers 503, like the old Vercel
  function did.
- **Page views:** turn on Cloudflare Web Analytics for the site (dashboard, one switch,
  no cookies).

## Analytics

Events (`pageview`, `checkout_start`, `demo_played`, `faq_opened`, `mobile_handoff`,
`sister_app_click`, `install`) go to the Workers Analytics Engine dataset
`dynamicnotch_events`. Columns: `blob1` event, `blob2` placement / detail, `blob3` path,
`blob4` country, `blob5` traffic source.

```sql
-- Checkout clicks by placement and source, last 30 days
SELECT blob2 AS placement, blob5 AS source, SUM(_sample_interval) AS clicks
FROM dynamicnotch_events
WHERE blob1 = 'checkout_start' AND timestamp > NOW() - INTERVAL '30' DAY
GROUP BY placement, source ORDER BY clicks DESC
```

Run it with the Analytics Engine SQL API
(`https://api.cloudflare.com/client/v4/accounts/<account_id>/analytics_engine/sql`).

Every checkout link also carries `placement`, `page` and `source` as LemonSqueezy custom
data, so each **paid order** shows where the buyer came from (order → Custom data).
