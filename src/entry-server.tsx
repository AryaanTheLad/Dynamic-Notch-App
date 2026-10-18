import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import { prerender } from 'react-dom/static';
import { LazyMotion } from 'framer-motion';
import { AppShell } from './App';
import { motionFeatures } from './lib/motion';

/**
 * Build-time server render of one route.
 *
 * Called by `scripts/prerender.js`, which injects the result into `<div id="root">` of
 * that route's static HTML. Before this existed the body shipped empty, so every crawler
 * that does not execute JavaScript, GPTBot, ClaudeBot, PerplexityBot, CCBot, saw a
 * page with a title and nothing else, which is why AI answers described the product from
 * third-party listings instead of from this site.
 *
 * `react-dom/static` rather than `renderToString`: the route components and half of the
 * homepage are behind `React.lazy`, and `renderToString` does not resolve Suspense, it
 * emits the fallback, which would have produced "Loading..." as the page content.
 * `prerender` waits for every boundary to settle before resolving, which is exactly the
 * semantics static generation needs.
 *
 * The web-stream `prerender` is used over `prerenderToNodeStream` so this file stays
 * typeable under the browser tsconfig, `Response` drains the stream without pulling
 * Node's `Buffer` and stream types into the app's type graph.
 */
/**
 * Markers React emits when a Suspense boundary finished *after* the shell: the content is
 * written into a `<div hidden id="S:n">` and an inline `$RC()` script swaps it in on the
 * next animation frame. Shipping that means the visible `<main>` of every page is the
 * "Loading..." fallback and the real content is hidden until a script runs, which is what
 * a non-JS crawler, and Google's first HTML pass, actually read.
 */
const DEFERRED_BOUNDARY = /\$RC\(|<div hidden id="S:/;

async function renderOnce(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <LazyMotion features={motionFeatures} strict>
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </LazyMotion>
    </StrictMode>,
    {
      // React splits any boundary bigger than this many bytes out of the shell into a
      // hidden segment revealed by script (see DEFERRED_BOUNDARY). A static page has no
      // shell to hurry along, so keep everything inline.
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
      onError(error) {
        // Surface the route that failed rather than silently shipping a blank body.
        console.error(`  SSR error while rendering ${url}:`, error);
      },
    },
  );

  return await new Response(prelude).text();
}

/**
 * Build-time render of one route with every boundary inline.
 *
 * `React.lazy` always suspends the first time it is rendered, even when the module is
 * already loaded, so a single pass emits each lazy route and section as a deferred
 * boundary. The first pass resolves every lazy component in the tree; the next one finds
 * them all ready and renders the whole page into the shell as plain HTML.
 */
export async function render(url: string): Promise<string> {
  let html = await renderOnce(url);
  for (let pass = 0; pass < 3 && DEFERRED_BOUNDARY.test(html); pass++) {
    html = await renderOnce(url);
  }
  if (DEFERRED_BOUNDARY.test(html)) {
    throw new Error(`${url} still has deferred Suspense boundaries after re-rendering.`);
  }
  return html;
}
