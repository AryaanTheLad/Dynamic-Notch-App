import { useLocation } from 'react-router-dom';
import { useReducedMotion, type MotionProps } from 'framer-motion';

/**
 * react-router stamps the first location of a session with the key `default` and gives
 * every subsequent one a generated key. That makes it an exact, timing-free answer to
 * "is this markup that came from the server, or a page the visitor navigated to?" , 
 * identical on the server and on the client, so it can gate rendering without risking a
 * hydration mismatch.
 */
const INITIAL_LOCATION_KEY = 'default';

type EntranceOptions = {
  /** Pixels to travel on the way in. */
  y?: number;
  /** Starting scale, if the element should also grow in. */
  scale?: number;
  delay?: number;
  duration?: number;
  /**
   * Kept for readability at call sites, "this one is below the fold". It no longer
   * switches to `whileInView`; see the note on the hook.
   */
  inView?: boolean;
  ease?: [number, number, number, number];
};

/**
 * Entrance animation props for `m.*` elements.
 *
 * Two deliberate decisions:
 *
 * 1. When the visitor has asked for reduced motion this returns nothing at all. With no
 *    `initial` the element simply renders in its final state (WCAG 2.3.3).
 *
 * 2. It animates on mount, never on scroll. `whileInView` gates `opacity` on an
 *    IntersectionObserver callback, which means anything that renders the page without
 *    scrolling it, search and AI crawlers, print, embedded webviews, a failed
 *    framer-motion feature chunk, sees `opacity: 0` and reads a blank page. A reveal
 *    effect is not worth risking the entire page's content, so sections fade in as they
 *    mount and are guaranteed visible from then on.
 *
 * 3. The first page of a session does not animate in; client-side navigation does.
 *
 *    Every route now ships server-rendered, and framer-motion does not run a mount
 *    animation over hydrated DOM, it applies `initial` and stops. That left the navbar,
 *    the hero badge, the demo video and the footer CTA stranded at `opacity: 0`
 *    permanently. Timing-based workarounds do not fix it, because React 19 hydrates
 *    Suspense boundaries in deferred passes and there is no single moment when
 *    "hydration is done" is true for the whole tree.
 *
 *    Gating on the router's location key sidesteps timing entirely, and the first paint
 *    is better for it: the largest element on the page is painted with the document
 *    instead of waiting for the motion chunk, and the content survives with scripting
 *    off.
 *
 * Returns a factory so one hook call can drive several staggered children.
 */
export function useEntrance() {
  const shouldReduceMotion = useReducedMotion();
  const { key } = useLocation();
  const isFirstPageOfSession = key === INITIAL_LOCATION_KEY;

  return function entrance(options: EntranceOptions = {}): MotionProps {
    if (shouldReduceMotion || isFirstPageOfSession) return {};

    const { y = 20, scale, delay = 0, duration = 0.6, ease } = options;

    return {
      initial: { opacity: 0, y, ...(scale === undefined ? {} : { scale }) },
      animate: { opacity: 1, y: 0, ...(scale === undefined ? {} : { scale: 1 }) },
      transition: { duration, delay, ...(ease ? { ease } : {}) },
    };
  };
}
