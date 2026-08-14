import { domAnimation } from 'framer-motion';

/**
 * The feature bundle handed to `LazyMotion`, imported directly rather than through a
 * dynamic `import()`.
 *
 * LazyMotion resolves an async feature bundle *after* its children have mounted, and a
 * mount animation that has already been missed does not re-fire when the features
 * arrive, the element is simply left sitting at its `initial` values.
 *
 * The chunk was fetched on every page load regardless, because every page renders `m.*`
 * components, so deferring it bought nothing and cost a request. `LazyMotion` still does
 * its real job: it is what lets the tree use `m` instead of `motion` and keep the full
 * feature set out of the build. Importing the binding by name also lets Rollup tree-shake
 * it properly, `import('framer-motion').then(r => r.domAnimation)` pulled the entire
 * library in, which is why the framer chunk was 66 KB and is now 12 KB.
 *
 * It lives in its own module so `App.tsx` exports components and nothing else, which is
 * what React Fast Refresh requires.
 */
export const motionFeatures = domAnimation;
