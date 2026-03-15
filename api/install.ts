import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Handle GET — check install count from browser
  if (request.method === 'GET') {
    const count = await kv.get('total_installs');
    return response.status(200).json({ total_installs: count ?? 0 });
  }

  // Only allow POST requests from your app
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await kv.incr('total_installs');
    await kv.lpush('install_log', new Date().toISOString()); // timestamp per install
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error: 'Failed to update database' });
  }
}