/**
 * Cloudflare Worker in front of the static site (see wrangler.jsonc, `run_worker_first`).
 *
 * Vercel handled three things at the edge that Workers static assets do not do on their
 * own, and losing them after the move is what this file puts back:
 *
 * 1. One canonical origin. Vercel 30x'd the apex and plain http to https://www. On
 *    Cloudflare all three served the full site with a 200, so Google saw three copies of
 *    every page and had to guess which one ranks.
 * 2. Permanent redirects. Workers' `html_handling` strips trailing slashes with a 307
 *    (temporary), which tells search engines not to consolidate the two URLs.
 * 3. `/api/install`, the app's install ping, which was a Vercel serverless function and
 *    has returned 404 since the move.
 *
 * It also takes the site's own conversion events (`/api/event`), replacing Vercel
 * Analytics, whose script 404s off Vercel.
 *
 * Everything else is passed straight to the static assets, so `_headers`, `_redirects`
 * and the 404 page keep working exactly as before.
 */

const CANONICAL_HOST = 'www.dynamicnotch.tech';
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

/** Hosts that belong to the site and must redirect to the canonical one. */
const ALIAS_HOSTS = new Set(['dynamicnotch.tech']);

/** Mirrors public/_redirects, enforced here so the status is always a permanent 301. */
const REDIRECTS = new Map([
  ['/blog/intro', '/blog/why-dynamic-island-mac'],
  ['/blog/versionupdate', '/blog/versionUpdate'],
  ['/download', '/'],
  ['/index.html', '/'],
]);

/** Events the site sends. Anything else is dropped rather than stored. */
const EVENTS = new Set([
  'pageview',
  'checkout_start',
  'demo_played',
  'mobile_handoff',
  'faq_opened',
  'sister_app_click',
]);

const INSTALL_TOKEN_HEADER = 'x-install-token';

/** The default user agent URLSession sends from the app: executable name, then CFNetwork. */
const APP_USER_AGENT = /^(DynamicNotch|Dynamic%20Notch)\/\d+ CFNetwork\//;

function redirect(location, status = 301) {
  return new Response(null, {
    status,
    headers: { Location: location, 'Cache-Control': 'public, max-age=86400' },
  });
}

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...extra },
  });
}

/** Constant-time compare over SHA-256 digests, so neither value nor length leaks. */
async function tokenMatches(provided, expected) {
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(provided)),
    crypto.subtle.digest('SHA-256', enc.encode(expected)),
  ]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

function clip(value, max = 200) {
  return typeof value === 'string' ? value.slice(0, max) : '';
}

/**
 * Writes one row to Workers Analytics Engine when the binding exists. Missing binding is
 * not an error: the site must keep working on a deploy that has not configured it.
 */
function record(env, blobs, indexes) {
  if (!env.EVENTS) return;
  try {
    env.EVENTS.writeDataPoint({ blobs: blobs.map((b) => clip(b)), doubles: [1], indexes });
  } catch {
    // Analytics must never break a request.
  }
}

/**
 * The app's one-time anonymous install ping. Same contract as the old Vercel function:
 * POST only, `x-install-token` must match the INSTALL_TOKEN secret, fail closed if unset.
 */
async function handleInstall(request, env) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' });
  }
  // Shipped builds up to 4.0 (33) send no token at all: the header check was added to the
  // site without the app ever being updated to send it, so every ping was refused with
  // 401. Accept those by the app's own URLSession user agent ("DynamicNotch/33
  // CFNetwork/… Darwin/…"). A build that does send the header must send the right value.
  const provided = request.headers.get(INSTALL_TOKEN_HEADER);
  if (provided) {
    if (!env.INSTALL_TOKEN || !(await tokenMatches(provided, env.INSTALL_TOKEN))) {
      return json({ error: 'Unauthorized' }, 401);
    }
  } else if (!APP_USER_AGENT.test(request.headers.get('User-Agent') ?? '')) {
    return json({ error: 'Unauthorized' }, 401);
  }

  let version = '';
  try {
    const body = await request.json();
    version = clip(body?.version, 32);
  } catch {
    // The body is optional; the ping itself is the data.
  }

  record(env, ['install', version, '', request.cf?.country ?? '', ''], ['install']);
  return json({ success: true });
}

/** Conversion events from the site, sent with navigator.sendBeacon. */
async function handleEvent(request, env) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' });
  }

  // Only accept events from the site itself.
  const origin = request.headers.get('Origin');
  if (origin && origin !== CANONICAL_ORIGIN && !origin.startsWith('http://localhost')) {
    return new Response(null, { status: 204 });
  }

  let payload;
  try {
    const text = await request.text();
    if (text.length > 2048) return new Response(null, { status: 204 });
    payload = JSON.parse(text);
  } catch {
    return new Response(null, { status: 204 });
  }

  const name = clip(payload?.name, 40);
  if (!EVENTS.has(name)) return new Response(null, { status: 204 });

  const props = payload?.props && typeof payload.props === 'object' ? payload.props : {};
  record(
    env,
    [
      name,
      clip(props.placement ?? props.question ?? props.method ?? props.app ?? ''),
      clip(payload.path, 120),
      request.cf?.country ?? '',
      clip(payload.source, 120),
    ],
    [name],
  );

  return new Response(null, { status: 204 });
}

export default {
  /**
   * @param {Request} request
   * @param {{ ASSETS: { fetch: typeof fetch }, EVENTS?: any, INSTALL_TOKEN?: string }} env
   */
  async fetch(request, env) {
    const url = new URL(request.url);
    const isSiteHost = url.hostname === CANONICAL_HOST || ALIAS_HOSTS.has(url.hostname);

    // 1. One origin: https://www. Path and query survive the hop.
    //
    // Except for what the shipped app requests itself. Builds up to 4.0 (33) have
    // SUFeedURL = https://dynamicnotch.tech/appcast.xml and POST their install ping to
    // https://dynamicnotch.tech/api/install, on the apex. A 301 turns that POST into a
    // GET, so these are answered on any host with no redirect at all. They are noindex,
    // so serving them twice costs nothing in search.
    const isAppPath =
      url.pathname === '/appcast.xml' ||
      url.pathname.startsWith('/releases/') ||
      url.pathname.startsWith('/api/');
    if (isSiteHost && !isAppPath && (url.protocol !== 'https:' || url.hostname !== CANONICAL_HOST)) {
      return redirect(`${CANONICAL_ORIGIN}${url.pathname}${url.search}`);
    }

    // 2. APIs.
    if (url.pathname === '/api/install') return handleInstall(request, env);
    if (url.pathname === '/api/event') return handleEvent(request, env);

    // 3. Permanent redirects, including trailing slashes (which assets would 307).
    const target = REDIRECTS.get(url.pathname);
    if (target) return redirect(`${target}${url.search}`);
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      return redirect(`${url.pathname.replace(/\/+$/, '')}${url.search}`);
    }

    const response = await env.ASSETS.fetch(request);

    // Preview and *.workers.dev hosts serve the same pages; keep them out of the index
    // so they can never compete with the real site.
    if (!isSiteHost) {
      const headers = new Headers(response.headers);
      headers.set('X-Robots-Tag', 'noindex, nofollow');
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    return response;
  },
};
