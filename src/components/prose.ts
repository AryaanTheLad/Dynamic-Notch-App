/**
 * The long-form type scale, shared by the comparison and category landing pages.
 *
 * The blog posts each declare these four constants locally, which was fine at one file
 * apiece. The landing pages added five more copies, so they live here instead. The
 * values are lifted verbatim from `src/pages/blog/HowToHideMacbookNotch.tsx` so the two
 * sets of pages stay visually identical; changing one here changes the landing pages
 * only, which is the intent.
 */
export const H2 = 'text-2xl font-semibold mt-12 mb-4 text-white';
export const H3 = 'text-lg font-semibold mt-8 mb-3 text-white';
export const P = 'text-[var(--color-text-secondary)] leading-relaxed mb-6';
export const UL = 'list-disc pl-6 text-[var(--color-text-secondary)] leading-relaxed space-y-3 mb-6';
export const LINK =
  'text-[var(--color-accent-soft)] underline underline-offset-4 hover:text-white transition-colors';

/** The page title block on a landing page, matching the article `<h1>`. */
export const H1 = 'title-gradient mb-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl';

/** Lead paragraph. Slightly larger than body, and the sentence answer engines quote. */
export const LEAD = 'text-lg leading-relaxed text-white/80 mb-6';
