import { createHash, timingSafeEqual } from 'node:crypto';
import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/** Newest N install timestamps to keep. Without this the list grows without bound. */
const LOG_LIMIT = 500;

/** Install pings accepted from one address per window. A real Mac only ever sends one. */
const RATE_LIMIT = 5;
const RATE_WINDOW_SECONDS = 60 * 60;

/** Header the app must send. Value lives in the INSTALL_TOKEN env var on Vercel. */
const TOKEN_HEADER = 'x-install-token';

/** Constant-time compare over digests, so neither the value nor its length leaks. */
function tokenMatches(provided: string, expected: string): boolean {
  const a = createHash('sha256').update(provided).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

function clientIp(request: VercelRequest): string {
  const forwarded = request.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value?.split(',')[0]?.trim() || 'unknown';
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // The install count is a private business metric, so there is deliberately no GET handler.
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const expected = process.env.INSTALL_TOKEN;
  if (!expected) {
    // Fail closed: an unset token must not mean "accept anonymous writes".
    console.error('INSTALL_TOKEN is not set — refusing to record installs.');
    return response.status(503).json({ error: 'Not configured' });
  }

  const provided = request.headers[TOKEN_HEADER];
  if (typeof provided !== 'string' || !tokenMatches(provided, expected)) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const rateKey = `install_rate:${clientIp(request)}`;
    const hits = await kv.incr(rateKey);
    if (hits === 1) {
      await kv.expire(rateKey, RATE_WINDOW_SECONDS);
    }
    if (hits > RATE_LIMIT) {
      return response.status(429).json({ error: 'Too many requests' });
    }

    await kv.incr('total_installs');
    await kv.lpush('install_log', new Date().toISOString());
    await kv.ltrim('install_log', 0, LOG_LIMIT - 1);

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to record install:', error);
    return response.status(500).json({ error: 'Failed to update database' });
  }
}
