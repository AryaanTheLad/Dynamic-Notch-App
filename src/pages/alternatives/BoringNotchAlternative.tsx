import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ComparisonTable from '../../components/ComparisonTable';
import FaqSection from '../../components/FaqSection';
import { useEntrance } from '../../hooks/useEntrance';
import { H1, H2, P, UL, LEAD, LINK } from '../../components/prose';
import { PRICE, REQUIREMENTS, CHECKOUT_URL } from '../../data/product.js';
import { trackCheckout } from '../../lib/analytics';

/**
 * The hardest page on the site to write honestly, because the incumbent is free.
 *
 * A reader searching "Boring Notch alternative" is usually not price-shopping, they are
 * either missing a specific module or want someone to email when it breaks. Pretending a
 * free, GPL-3.0, 10.3k-star project that is actively maintained is bad would be both
 * false and obvious, so the page leads by telling most readers to keep using it and only
 * makes a case for the two situations where paying actually buys something.
 */
export default function BoringNotchAlternative() {
  const entrance = useEntrance();

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <SEO
        title="Boring Notch Alternatives: 5 Mac Notch Apps Compared"
        description="Boring Notch is free and open source, and for most people it is enough. If you need clipboard history, notes, a colour picker or a support inbox, here are the alternatives worth paying for, compared honestly."
        url="https://www.dynamicnotch.tech/alternatives/boring-notch"
      />

      <m.article {...entrance({ duration: 0.6 })} className="max-w-none">
        <header className="mb-10">
          <h1 className={H1}>Boring Notch alternatives</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <span className="font-medium text-white/80">By Aryaan</span>
            <span aria-hidden="true">•</span>
            <time dateTime="2026-08-16">Updated 16 August 2026</time>
            <span aria-hidden="true">•</span>
            <span>5 min read</span>
          </div>
        </header>

        <section>
          <p className={LEAD}>
            Start with the honest answer: Boring Notch is free, open source under GPL-3.0, has
            10.3k GitHub stars, is actively maintained and runs on Intel Macs as well as Apple
            Silicon. If it does what you need, no alternative on this page is an upgrade and you
            should keep using it. There are two reasons people genuinely outgrow it, and they are
            both about scope rather than quality.
          </p>

          <div className="my-8 rounded-2xl border border-white/12 bg-white/[0.04] p-5">
            <p className="mb-0 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              <strong className="text-white/80">Disclosure:</strong> I build Dynamic Notch, one of
              the paid alternatives below. I am not going to pretend a well-run free project is
              worse than it is, so this page is mostly about telling you whether you are in the
              minority who would get something for their money.
            </p>
          </div>

          <h2 className={H2}>Reason one: you want modules it does not have</h2>
          <p className={P}>
            Boring Notch is built around music, with a visualiser and playback controls, plus a
            file shelf with AirDrop, calendar, and HUD replacements for volume, brightness and
            keyboard backlight. That is a coherent set and it covers the common case well.
          </p>
          <p className={P}>
            What it does not cover is the rest of the menu bar. If you are still running a separate
            clipboard manager, a timer, a notes scratchpad, a weather widget and a colour picker,
            those five icons are still there competing for the space the notch is already eating
            into.{' '}
            <Link to="/" className={LINK}>
              Dynamic Notch
            </Link>{' '}
            runs sixteen modules including clipboard history, quick notes, a timer, a pinned
            current task, weather, a camera mirror, a download watcher, and a colour picker that
            reports HEX, RGB, HSL and a Swift literal with the WCAG contrast ratio already worked
            out. It is {PRICE.display} once.
          </p>

          <h2 className={H2}>Reason two: you want someone to email</h2>
          <p className={P}>
            This is the real difference between free and paid here, and it cuts both ways. With an
            open-source project, support is a GitHub issue queue staffed by people doing it in
            their spare time, and a fix arrives when someone feels like writing it. That is a fair
            trade for free, and for a lot of people it is fine.
          </p>
          <p className={P}>
            If a broken notch app during a work week is a problem you want to be able to escalate,
            a paid app with a person behind it is worth the one-off cost. That applies to Dynamic
            Notch, NotchNook and Alcove equally.
          </p>

          <h2 className={H2}>The alternatives side by side</h2>
          <ComparisonTable />

          <h2 className={H2}>When to stay with Boring Notch</h2>
          <ul className={UL}>
            <li>
              <strong>You mostly want music controls.</strong> That is what it was built for and
              it does it well. Paying for more modules you will not switch on is a waste.
            </li>
            <li>
              <strong>You have an Intel MacBook.</strong> Boring Notch supports Intel. Dynamic
              Notch is {REQUIREMENTS.architecture} only, and most of the paid category is the
              same.
            </li>
            <li>
              <strong>You want to read or change the source.</strong> No paid app here is open
              source. If that matters to you it is not a close call.
            </li>
            <li>
              <strong>You would rather not pay for utilities.</strong> Entirely reasonable, and
              this category is one of the few where the free option is genuinely competitive.
            </li>
          </ul>

          <FaqSection route="/alternatives/boring-notch" />

          <div className="mt-12 rounded-2xl border border-white/12 bg-white/[0.04] p-6">
            <h2 className="mb-3 text-xl font-semibold text-white">
              If you want the other eleven modules
            </h2>
            <p className="mb-5 text-[var(--color-text-secondary)]">
              {PRICE.display} once, no subscription, {REQUIREMENTS.minMacOSLabel} on{' '}
              {REQUIREMENTS.architecture}. Watch the{' '}
              <Link to="/" className={LINK}>
                1:14 demo
              </Link>{' '}
              first, and if Boring Notch already does everything you need, keep it. That is a
              perfectly good outcome.
            </p>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCheckout('landing', { page: 'alternatives/boring-notch' })}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-medium tracking-[-0.01em] text-black transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              Get Dynamic Notch, {PRICE.display}
            </a>
          </div>
        </section>
      </m.article>
    </div>
  );
}
