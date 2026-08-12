import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

const Features = lazy(() => import('../components/Features'));
const NotchDrop = lazy(() => import('../components/NotchDrop'));
const Pricing = lazy(() => import('../components/Pricing'));
const FirstLaunch = lazy(() => import('../components/FirstLaunch'));
const Specs = lazy(() => import('../components/Specs'));
const FAQ = lazy(() => import('../components/FAQ'));

export default function Home() {
  return (
    <>
      <SEO
        title="Dynamic Notch - The Ultimate MacBook Notch Utility"
        description="Transform your MacBook notch into an interactive Dynamic Island. Add a file tray, music player, native AirDrop, and widgets right to your notch."
      />
      <Hero />
      <Suspense fallback={null}>
        <Features />
        <NotchDrop />
        <Pricing />
        <FirstLaunch />
        <Specs />
        <FAQ />
      </Suspense>
    </>
  );
}
