import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { LazyMotion } from 'framer-motion';
import { motionFeatures } from './lib/motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
// The keyword-targeted category pages. These are the site's entry points from search for
// people who do not know the product by name, so they sit at the root rather than under
// /blog: the topic is the page, not a dated post about the topic.
const BestMacNotchApps = lazy(() => import('./pages/BestMacNotchApps'));
const DynamicIslandForMac = lazy(() => import('./pages/DynamicIslandForMac'));
const MacNotchApp = lazy(() => import('./pages/MacNotchApp'));
const NotchNookAlternative = lazy(() => import('./pages/alternatives/NotchNookAlternative'));
const BoringNotchAlternative = lazy(() => import('./pages/alternatives/BoringNotchAlternative'));
const Blog = lazy(() => import('./pages/Blog'));
const WhyDynamicIslandMac = lazy(() => import('./pages/blog/WhyDynamicIslandMac'));
const BoostProductivity = lazy(() => import('./pages/blog/BoostProductivity'));
const MinimalistSetup = lazy(() => import('./pages/blog/MinimalistSetup'));
const NotchCustomization = lazy(() => import('./pages/blog/NotchCustomization'));
const BatteryEfficiency = lazy(() => import('./pages/blog/BatteryEfficiency'));
const HowToHideMacbookNotch = lazy(() => import('./pages/blog/HowToHideMacbookNotch'));
const VersionUpdate = lazy(() => import('./pages/blog/VersionUpdate'));
const FounderJourney = lazy(() => import('./pages/blog/FounderJourney'));
const NativeSwiftApp = lazy(() => import('./pages/blog/NativeSwiftApp'));
const PowerUserHacks = lazy(() => import('./pages/blog/PowerUserHacks'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));
const Changelog = lazy(() => import('./pages/Changelog'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * react-router does not restore scroll or honour `#hash` targets on its own. Navigating
 * to `/#pricing` from another page has to land on the section, and everything else has
 * to land at the top.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // The section may still be lazy-loading, so retry on the next frame.
      const target = () => document.querySelector(hash);
      const scroll = () => target()?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (target()) scroll();
      else requestAnimationFrame(() => requestAnimationFrame(scroll));
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}


/**
 * Everything inside the router, with no opinion about which router it is.
 *
 * The client mounts this under `BrowserRouter`; `src/entry-server.tsx` renders the same
 * tree under `StaticRouter` at build time so each route ships real HTML instead of an
 * empty `<div id="root">`. Keeping the two entries over one shared component is what
 * stops the server and client markup from drifting apart and causing hydration errors.
 */
export function AppShell() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-sans antialiased selection:bg-indigo-500/30 selection:text-white flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/best-mac-notch-apps" element={<BestMacNotchApps />} />
              <Route path="/dynamic-island-for-mac" element={<DynamicIslandForMac />} />
              <Route path="/mac-notch-app" element={<MacNotchApp />} />
              <Route path="/alternatives/notchnook" element={<NotchNookAlternative />} />
              <Route path="/alternatives/boring-notch" element={<BoringNotchAlternative />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/founder-journey-first-payout" element={<FounderJourney />} />
              <Route path="/blog/native-swift-vs-electron" element={<NativeSwiftApp />} />
              <Route path="/blog/mac-power-user-hacks" element={<PowerUserHacks />} />
              <Route path="/blog/why-dynamic-island-mac" element={<WhyDynamicIslandMac />} />
              <Route path="/blog/boost-productivity" element={<BoostProductivity />} />
              <Route path="/blog/minimalist-setup" element={<MinimalistSetup />} />
              <Route path="/blog/notch-customization" element={<NotchCustomization />} />
              <Route path="/blog/battery-efficiency" element={<BatteryEfficiency />} />
              <Route path="/blog/how-to-hide-macbook-notch" element={<HowToHideMacbookNotch />} />
              <Route path="/blog/versionUpdate" element={<VersionUpdate />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />

        <SpeedInsights />
        <Analytics />
      </div>
    </>
  );
}

function App() {
  return (
    <LazyMotion features={motionFeatures} strict>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </LazyMotion>
  );
}

export default App;
