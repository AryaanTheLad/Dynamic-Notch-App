import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import DynamicNotchIntro from './pages/blog/DynamicNotchIntro';
import WhyDynamicIslandMac from './pages/blog/WhyDynamicIslandMac';
import BoostProductivity from './pages/blog/BoostProductivity';
import MinimalistSetup from './pages/blog/MinimalistSetup';
import NotchCustomization from './pages/blog/NotchCustomization';
import BatteryEfficiency from './pages/blog/BatteryEfficiency';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-sans antialiased selection:bg-indigo-500/30 selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-1">
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
        </main>
        <Footer />

        <SpeedInsights />
        <Analytics />
      </div>
    </BrowserRouter>
  );
}

export default App;
