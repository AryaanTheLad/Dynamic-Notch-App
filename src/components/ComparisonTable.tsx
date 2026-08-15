import { Link } from 'react-router-dom';
import { COMPETITORS, COMPARISON_CHECKED_LABEL } from '../data/competitors.js';

/**
 * The category at a glance, as a real `<table>`.
 *
 * A genuine table rather than a grid of divs, because this is the block an answer engine
 * lifts when someone asks "which Mac notch app should I buy". Rows carry `<th scope>` so
 * the relationship between an app and its price survives being pulled out of the page.
 *
 * Deliberately six columns rather than the forty-row checkmark matrix the rival roundups
 * run. Those matrices assert feature-by-feature knowledge of six competitors that nobody
 * has actually verified, and a single wrong cell discredits the whole page. Everything
 * here is either read off the developer's own site or openly marked approximate.
 */
export default function ComparisonTable() {
  return (
    <figure className="my-10">
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02]">
        <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
          <caption className="sr-only">
            Mac notch apps compared by price, pricing model, whether the source is open, and
            what each one focuses on.
          </caption>
          <thead>
            <tr className="border-b border-white/10 text-white">
              <th scope="col" className="px-4 py-3 font-semibold">App</th>
              <th scope="col" className="px-4 py-3 font-semibold">Price</th>
              <th scope="col" className="px-4 py-3 font-semibold">Model</th>
              <th scope="col" className="px-4 py-3 font-semibold">Open source</th>
              <th scope="col" className="px-4 py-3 font-semibold">Best for</th>
            </tr>
          </thead>
          <tbody>
            {COMPETITORS.map((app) => (
              <tr
                key={app.id}
                className={`border-b border-white/5 last:border-0 ${
                  app.self ? 'bg-white/[0.04]' : ''
                }`}
              >
                <th scope="row" className="px-4 py-4 font-medium text-white">
                  {app.self ? (
                    <Link to="/" className="underline underline-offset-4 hover:text-white">
                      {app.name}
                    </Link>
                  ) : (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="underline underline-offset-4 hover:text-white"
                    >
                      {app.name}
                    </a>
                  )}
                </th>
                <td className="whitespace-nowrap px-4 py-4 text-[var(--color-text-secondary)]">
                  {app.price}
                  {!app.priceVerified && (
                    <abbr
                      title={app.priceNote}
                      className="ml-1 cursor-help text-white/40 no-underline"
                      aria-label="Approximate price, not verified at source"
                    >
                      *
                    </abbr>
                  )}
                </td>
                <td className="px-4 py-4 text-[var(--color-text-secondary)]">{app.priceModel}</td>
                <td className="px-4 py-4 text-[var(--color-text-secondary)]">
                  {app.openSource ? app.license ?? 'Yes' : 'No'}
                </td>
                <td className="px-4 py-4 text-[var(--color-text-secondary)]">{app.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-white/40">
        Prices checked {COMPARISON_CHECKED_LABEL}. Figures marked{' '}
        <span className="text-white/60">*</span> could not be confirmed on the developer&apos;s own
        site and are what third-party roundups report, so treat them as approximate and check
        before buying. Everything else was read at source.
      </figcaption>
    </figure>
  );
}
