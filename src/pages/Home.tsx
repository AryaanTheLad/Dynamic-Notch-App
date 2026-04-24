import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

const Features = lazy(() => import('../components/Features'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const FAQMarquee = lazy(() => import('../components/FAQMarquee'));

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
        <HowItWorks />
        <FAQMarquee />
      </Suspense>
    </>
  );
}
