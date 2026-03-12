import { kv } from '@vercel/kv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Only allow POST requests from your app
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // This connects to the "Upstash for Redis" database you just created
    await kv.incr('total_installs');
    
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(500).json({ error: 'Failed to update database' });
  }
}