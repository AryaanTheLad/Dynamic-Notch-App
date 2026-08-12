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
 * that does not execute JavaScript — GPTBot, ClaudeBot, PerplexityBot, CCBot — saw a
 * page with a title and nothing else, which is why AI answers described the product from
 * third-party listings instead of from this site.
 *
 * `react-dom/static` rather than `renderToString`: the route components and half of the
 * homepage are behind `React.lazy`, and `renderToString` does not resolve Suspense — it
 * emits the fallback, which would have produced "Loading..." as the page content.
 * `prerender` waits for every boundary to settle before resolving, which is exactly the
 * semantics static generation needs.
 *
 * The web-stream `prerender` is used over `prerenderToNodeStream` so this file stays
 * typeable under the browser tsconfig — `Response` drains the stream without pulling
 * Node's `Buffer` and stream types into the app's type graph.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <LazyMotion features={motionFeatures} strict>
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </LazyMotion>
    </StrictMode>,
    {
      onError(error) {
        // Surface the route that failed rather than silently shipping a blank body.
        console.error(`  SSR error while rendering ${url}:`, error);
      },
    },
  );

  return await new Response(prelude).text();
}
