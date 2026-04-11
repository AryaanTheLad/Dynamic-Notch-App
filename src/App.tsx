import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { LazyMotion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
const Blog = lazy(() => import('./pages/Blog'));
const DynamicNotchIntro = lazy(() => import('./pages/blog/DynamicNotchIntro'));
const WhyDynamicIslandMac = lazy(() => import('./pages/blog/WhyDynamicIslandMac'));
const BoostProductivity = lazy(() => import('./pages/blog/BoostProductivity'));
const MinimalistSetup = lazy(() => import('./pages/blog/MinimalistSetup'));
const NotchCustomization = lazy(() => import('./pages/blog/NotchCustomization'));
const BatteryEfficiency = lazy(() => import('./pages/blog/BatteryEfficiency'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Contact = lazy(() => import('./pages/Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const loadFeatures = () => import('framer-motion').then(res => res.domAnimation);

function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-sans antialiased selection:bg-indigo-500/30 selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/intro" element={<DynamicNotchIntro />} />
              <Route path="/blog/why-dynamic-island-mac" element={<WhyDynamicIslandMac />} />
              <Route path="/blog/boost-productivity" element={<BoostProductivity />} />
              <Route path="/blog/minimalist-setup" element={<MinimalistSetup />} />
              <Route path="/blog/notch-customization" element={<NotchCustomization />} />
              <Route path="/blog/battery-efficiency" element={<BatteryEfficiency />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />

        <SpeedInsights />
        <Analytics />
      </div>
    </BrowserRouter>
    </LazyMotion>
  );
}

export default App;
