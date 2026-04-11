import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';

const Features = lazy(() => import('../components/Features'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const FAQMarquee = lazy(() => import('../components/FAQMarquee'));

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <Features />
        <HowItWorks />
        <FAQMarquee />
      </Suspense>
    </>
  );
}
