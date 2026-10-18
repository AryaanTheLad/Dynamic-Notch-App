import { Link } from 'react-router-dom';
import { LINK } from './prose';
import { CHECKOUT_URL, FEATURES, PRICE, REQUIREMENTS } from '../data/product.js';
import { trackCheckout } from '../lib/analytics';

interface LandingCtaProps {
  /** Route without the leading slash, reported as `page` on checkout_start. */
  page: string;
  title?: string;
}

/**
 * The closing purchase block for the keyword landing pages. The comparison and category
 * pages are where most search visitors land, and they used to end with no way to buy:
 * a reader convinced by the page had to find the home page and scroll for the button.
 */
export default function LandingCta({ page, title = 'Try it on your own notch' }: LandingCtaProps) {
  return (
    <div className="mt-12 rounded-2xl border border-white/12 bg-white/[0.04] p-6">
      <h2 className="mb-3 text-xl font-semibold text-white">{title}</h2>
      <p className="mb-5 text-[var(--color-text-secondary)]">
        {FEATURES.length} modules, {REQUIREMENTS.minMacOSLabel} on Apple Silicon, {PRICE.display}{' '}
        once with no subscription and no account. Signed and notarized by Apple. There is a{' '}
        <Link to="/" className={LINK}>
          1:14 demo on the home page
        </Link>{' '}
        recorded on a real MacBook if you would rather look before you buy.
      </p>
      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => trackCheckout('landing', { page }, e)}
        className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-medium tracking-[-0.01em] text-black transition-transform duration-300 hover:scale-[1.03] active:scale-95"
      >
        Get Dynamic Notch, {PRICE.display}
      </a>
    </div>
  );
}
