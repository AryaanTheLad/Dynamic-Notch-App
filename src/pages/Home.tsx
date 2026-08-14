import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { PRICE } from '../data/product.js';

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
        title="Dynamic Notch: Turn the MacBook Notch Into a Dynamic Island"
        description={`Dynamic Notch is a native macOS app that turns the MacBook notch into a control centre: file tray, media controls, clipboard history, notes, timer, calendar, colour picker and weather. ${PRICE.display} once, no subscription.`}
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
