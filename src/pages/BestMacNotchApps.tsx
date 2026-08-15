import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ComparisonTable from '../components/ComparisonTable';
import FaqSection from '../components/FaqSection';
import { useEntrance } from '../hooks/useEntrance';
import { H1, H2, H3, P, UL, LEAD, LINK } from '../components/prose';
import { COMPETITORS, COMPARISON_CHECKED_LABEL } from '../data/competitors.js';
import { PRICE } from '../data/product.js';

/**
 * The category's highest-intent query, and the page the site was missing entirely.
 *
 * Every competing product in this niche ranks partly on its own "best notch apps"
 * roundup. Those pages are all written the same way: a forty-row feature matrix in which
 * the author's own app is the only column with a full set of ticks. They rank, but they
 * are transparently self-serving, and the disclosure of authorship is usually buried or
 * absent.
 *
 * This one takes the opposite bet. The conflict of interest is declared in the first
 * screenful, competitors are described by what they are genuinely best at, and no claim
 * is made about a rival that was not read at source. See the header comment in
 * `src/data/competitors.js` for the sourcing rules.
 */
export default function BestMacNotchApps() {
  const entrance = useEntrance();
  const others = COMPETITORS.filter((app) => !app.self);

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <SEO
        title="The Best Mac Notch Apps in 2026, Compared Honestly"
        description="Six MacBook notch apps compared on price, licence and what each is actually good at: Dynamic Notch, Boring Notch, NotchNook, Alcove, MediaMate and DynamicLake. Prices read at source, written by the developer of one of them."
        url="https://www.dynamicnotch.tech/best-mac-notch-apps"
      />

      <m.article {...entrance({ duration: 0.6 })} className="max-w-none">
        <header className="mb-10">
          <h1 className={H1}>The Best Mac Notch Apps in 2026</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <span className="font-medium text-white/80">By Aryaan</span>
            <span aria-hidden="true">•</span>
            <time dateTime="2026-08-16">Updated {COMPARISON_CHECKED_LABEL}</time>
            <span aria-hidden="true">•</span>
            <span>9 min read</span>
          </div>
        </header>

        <section>
          <p className={LEAD}>
            A Mac notch app turns the black camera cutout at the top of a MacBook screen into
            something usable: media controls, a file tray, a clipboard, a timer or system
            indicators, shown in the space beside the notch the way the Dynamic Island works on
            iPhone. Six are worth knowing about in 2026. Boring Notch is the best free one,
            Dynamic Notch covers the most ground for the least money, NotchNook is the most
            polished, and Alcove is the closest to Apple&apos;s own animation.
          </p>

          {/* The disclosure goes above the table, not in a footnote. A reader who finds out
              halfway down that the author sells one of the six stops trusting the other five
              rows, and they are right to. */}
          <div className="my-8 rounded-2xl border border-white/12 bg-white/[0.04] p-5">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white/70">
              Who wrote this
            </h2>
            <p className="mb-0 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              I build{' '}
              <Link to="/" className={LINK}>
                Dynamic Notch
              </Link>
              , one of the six apps below. That is a real conflict of interest, so this page is
              written to be useful even if you buy something else: every competitor is described
              by what it is genuinely better at, and three of the six sections end with a reason
              to pick that app over mine. Prices came off each developer&apos;s own site where
              that was possible, and the ones that could not be confirmed are marked as
              approximate rather than stated with false confidence.
            </p>
          </div>

          <h2 className={H2}>The six apps at a glance</h2>
          <ComparisonTable />

          <h2 className={H2}>How to pick in one minute</h2>
          <ul className={UL}>
            <li>
              <strong>You do not want to pay anything</strong>: Boring Notch. It is free, the
              source is public under GPL-3.0, and it is the most starred project in the category.
            </li>
            <li>
              <strong>You want the notch to replace several menu bar apps</strong>:{' '}
              <Link to="/" className={LINK}>
                Dynamic Notch
              </Link>
              . Sixteen modules at {PRICE.display} is the widest coverage per pound in the
              category.
            </li>
            <li>
              <strong>You want the most refined version and price is not the issue</strong>:
              NotchNook.
            </li>
            <li>
              <strong>You care most about how it looks and moves</strong>: Alcove, which is the
              nearest thing to Apple&apos;s own Dynamic Island behaviour.
            </li>
            <li>
              <strong>You only want to fix the ugly macOS volume HUD</strong>: MediaMate. It does
              that one job and does not pretend to do others.
            </li>
            <li>
              <strong>You have an Intel MacBook</strong>: Boring Notch. Most of the paid apps in
              this category, mine included, are Apple Silicon only.
            </li>
          </ul>

          <h2 className={H2}>How these were assessed</h2>
          <p className={P}>
            Three things decide whether a notch app is worth installing, and none of them is the
            length of the feature list.
          </p>
          <ul className={UL}>
            <li>
              <strong>Does it earn the background process?</strong> A notch app runs all day. If
              it is an Electron wrapper holding a few hundred megabytes of memory to show a play
              button, it costs more than it returns.
            </li>
            <li>
              <strong>Does it reduce the number of things in your menu bar, or add to it?</strong>{' '}
              The notch is worth using because it is empty space. An app that puts a new icon in
              an already crowded menu bar has moved the problem rather than solved it.
            </li>
            <li>
              <strong>Is the price honest?</strong> A one-time purchase for a utility is normal. A
              subscription for one is a harder case to make, and it is fair to hold it against an
              app.
            </li>
          </ul>
          <p className={P}>
            What is deliberately not here is a forty-row tick matrix. Building one means asserting
            detailed feature-level knowledge of five apps I did not write, and every roundup in
            this category that has tried it has got something wrong. While checking prices for
            this page, third-party roundups had Boring Notch at 5,000 GitHub stars when the
            repository said 10,300, and quoted MediaMate at $5, $7 and $9.20 on the same
            afternoon. Fewer claims, each one checked, is more useful than a wall of ticks nobody
            verified.
          </p>

          <h2 className={H2}>The apps in detail</h2>

          {others.map((app) => (
            <div key={app.id}>
              <h3 className={H3}>
                {app.name}{' '}
                <span className="font-normal text-white/45">
                  {app.price} {app.priceVerified ? '' : '(approx.)'}
                </span>
              </h3>
              <p className={P}>{app.focus}</p>
              <p className={P}>
                <strong className="text-white/80">Pick it if:</strong> {app.bestFor}{' '}
                <strong className="text-white/80">The trade:</strong> {app.tradeoff}
              </p>
              {app.priceNote && (
                <p className="mb-6 text-sm leading-relaxed text-white/45">
                  On the price: {app.priceNote}
                </p>
              )}
            </div>
          ))}

          <h3 className={H3}>
            Dynamic Notch <span className="font-normal text-white/45">{PRICE.display}</span>
          </h3>
          <p className={P}>
            Mine, so read the rest with that in mind. It covers sixteen modules: media controls, a
            file tray you can drag several files into at once, AirDrop, clipboard history, quick
            notes, a timer, a pinned current task, calendar events with a Join button for Zoom,
            Meet, Teams, Webex and FaceTime, a colour picker that reports HEX, RGB, HSL and a
            Swift literal with the WCAG contrast ratio already worked out, a camera mirror,
            weather, and the volume and brightness HUD alongside Mac and AirPods battery levels.
          </p>
          <p className={P}>
            It is Swift and SwiftUI rather than Electron, sits at 0% CPU idle and around 45 MB of
            memory, and is signed and notarized by Apple so it opens without a Gatekeeper detour.
            The full numbers are in the{' '}
            <Link to="/#specs" className={LINK}>
              specifications table
            </Link>
            .
          </p>
          <p className={P}>
            <strong className="text-white/80">Pick it if:</strong> you want the notch to absorb a
            clipboard manager, a timer, a weather widget, a file shelf and a colour picker so
            those five icons leave your menu bar.{' '}
            <strong className="text-white/80">The trade:</strong> it is Apple Silicon only and it
            is not open source. On an Intel MacBook, or if you will only run software you can
            read, Boring Notch is the better answer and I would rather you installed that than
            bought something that will not run.
          </p>

          <h2 className={H2}>Free or paid?</h2>
          <p className={P}>
            The free options in this category are genuinely good, which is not true of every
            software niche. Boring Notch is actively maintained, has a real community behind it,
            and if all you want is playback control and a file shelf it will do that indefinitely
            without asking for anything.
          </p>
          <p className={P}>
            The case for paying is narrower than the paid developers usually admit. It comes down
            to breadth and support: whether you want one app covering a dozen jobs rather than
            music alone, and whether you want an inbox to write to when something breaks instead
            of filing a GitHub issue. If neither matters to you, the free option is not a
            compromise.
          </p>

          <h2 className={H2}>What about just hiding the notch?</h2>
          <p className={P}>
            Plenty of people arrive at this category wanting the notch gone rather than useful,
            which is a reasonable thing to want. There is a built-in macOS setting most people
            never find, plus four other methods, and they are all covered in{' '}
            <Link to="/blog/how-to-hide-macbook-notch" className={LINK}>
              how to hide the MacBook notch
            </Link>
            . Worth reading first, because hiding it does not fix the problem the notch actually
            causes, which is menu bar icons quietly disappearing behind it.
          </p>

          <FaqSection route="/best-mac-notch-apps" />

          <h2 className={H2}>The short version</h2>
          <p className={P}>
            If you want to spend nothing, install Boring Notch. If you want the notch to do the
            work of several menu bar utilities for less than the price of lunch, try{' '}
            <Link to="/" className={LINK}>
              Dynamic Notch
            </Link>
            . If you want the most polished thing in the category and the price does not matter,
            NotchNook. All three are defensible choices, and the notch is dead space in every one
            of them until you install something.
          </p>
        </section>
      </m.article>
    </div>
  );
}
