import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

/**
 * Every route ships with its body server-rendered by `scripts/prerender.js`, so the
 * normal path is to hydrate that markup rather than throw it away and re-render.
 *
 * `createRoot` is kept as a fallback for the case where `#root` is empty, a build that
 * skipped prerendering, or a route served before its static HTML was generated. Calling
 * `hydrateRoot` on an empty container would leave the page blank.
 *
 * `HelmetProvider` is gone: React 19 hoists metadata natively, which made
 * react-helmet-async append a second copy of every tag prerender.js had already written
 * into the served HTML. `SEO.tsx` now updates the existing tags in place instead.
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
