/**
 * Tells Bing, Yandex, Seznam and the other IndexNow engines (and through Bing, ChatGPT
 * search and Copilot) that every URL in the sitemap has changed, so they recrawl now
 * instead of whenever they next get round to it.
 *
 * Run after a deploy that changed page content:  npm run indexnow
 *
 * The key file lives at public/<KEY>.txt and is served at the site root, which is how
 * IndexNow verifies the site owns the key. Google does not use IndexNow; for Google,
 * resubmit the sitemap in Search Console.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HOST = 'www.dynamicnotch.tech';
const KEY = '7272916c7341c20103d884740034556a';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemap = fs.readFileSync(path.join(root, 'dist', 'sitemap.xml'), 'utf-8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error('No URLs found in dist/sitemap.xml. Run "npm run build" first.');
  process.exit(1);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${response.status}`);
if (!response.ok && response.status !== 202) process.exit(1);
