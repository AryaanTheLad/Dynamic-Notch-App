import { landingFaqs } from '../data/landingFaqs.js';
import { H2, H3, P } from './prose';

interface FaqSectionProps {
  /** The route whose questions to render. Must exist in src/data/landingFaqs.js. */
  route: string;
  heading?: string;
}

/**
 * `landingFaqs.js` is plain JS, not TS, because `scripts/prerender.js` imports it
 * directly at build time with no compile step, the same arrangement product.js uses. So
 * its return type has to be declared here rather than inferred.
 */
interface Faq {
  question: string;
  answer: string;
}

/**
 * The question block on a landing page, rendered from the same array
 * `scripts/prerender.js` turns into that route's `FAQPage` schema.
 *
 * Plain headings and paragraphs rather than a disclosure widget, unlike the home page's
 * `FAQ.tsx`. These pages are read top to bottom by someone still deciding, so hiding the
 * answers behind a click would cost more than the vertical space it saves, and text
 * inside a collapsed `<details>` is weaker for extraction than text that is simply there.
 */
export default function FaqSection({ route, heading = 'Common questions' }: FaqSectionProps) {
  const faqs: Faq[] = landingFaqs(route);

  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={H2}>
        {heading}
      </h2>
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3 className={H3}>{faq.question}</h3>
          <p className={P}>{faq.answer}</p>
        </div>
      ))}
    </section>
  );
}
