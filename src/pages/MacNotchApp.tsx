import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import FaqSection from '../components/FaqSection';
import { useEntrance } from '../hooks/useEntrance';
import { H1, H2, P, UL, LEAD, LINK } from '../components/prose';
import { PRICE, FEATURES } from '../data/product.js';

/**
 * The category page, for people searching the descriptive name rather than Apple's:
 * "mac notch app", "macbook notch app", "notch app for mac", "macbook notch utility".
 *
 * Starts from the problem the notch causes rather than from the iPhone feature, which
 * is what keeps it from being a rewrite of `/dynamic-island-for-mac`. The menu bar
 * argument below is the genuinely under-covered part of this topic: every roundup in the
 * category talks about the notch being ugly, almost none explain that it silently eats
 * status icons, which is the thing that actually costs people something.
 */
export default function MacNotchApp() {
  const entrance = useEntrance();

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <SEO
        title="Mac Notch Apps: What They Do and Which One to Use"
        description="A Mac notch app puts the empty space beside the MacBook notch to work: media controls, a file tray, clipboard history and timers. What they do, the menu bar problem they solve, and how to choose one."
        url="https://www.dynamicnotch.tech/mac-notch-app"
      />

      <m.article {...entrance({ duration: 0.6 })} className="max-w-none">
        <header className="mb-10">
          <h1 className={H1}>Mac notch apps, explained</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
            <span className="font-medium text-white/80">By Aryaan</span>
            <span aria-hidden="true">•</span>
            <time dateTime="2026-08-16">Updated 16 August 2026</time>
            <span aria-hidden="true">•</span>
            <span>7 min read</span>
          </div>
        </header>

        <section>
          <p className={LEAD}>
            A Mac notch app is a utility that puts the empty space either side of the MacBook
            camera notch to work. Instead of a static black cutout, the area becomes a panel you
            can hover or summon with a keyboard shortcut, holding things like media controls, a
            file tray, clipboard history, a timer or your next meeting. macOS has no built-in
            version of this, so every option is third-party.
          </p>

          <h2 className={H2}>The problem they actually solve</h2>
          <p className={P}>
            Most people go looking for a notch app because the notch is ugly. The better reason is
            less obvious and costs you more.
          </p>
          <p className={P}>
            macOS lays out menu bar icons from the right and the active app&apos;s menus from the
            left. When those two runs meet the notch, icons simply stop being drawn. They do not
            wrap, they do not scroll, and macOS gives you no warning. Open an app with long menus,
            a design or development tool, and status icons you rely on quietly vanish. The more
            menu bar utilities you run, the sooner it happens, and on a 13 or 14 inch MacBook it
            happens quickly.
          </p>
          <p className={P}>
            So the MacBook has a crowded strip along the top of the screen where things disappear,
            and directly beside it, two patches of display doing nothing at all. A notch app moves
            work from the first into the second. That is the whole idea, and it is why hiding the
            notch does not scratch the itch: blacking out the menu bar makes the cutout less
            visible while leaving the icon problem exactly where it was.
          </p>

          <h2 className={H2}>What a notch app can hold</h2>
          <p className={P}>
            The category ranges from single-purpose apps to broad ones. These are the modules{' '}
            <Link to="/" className={LINK}>
              Dynamic Notch
            </Link>{' '}
            ships, which is the widest set in the category and a fair map of what is possible:
          </p>
          <ul className={UL}>
            {FEATURES.slice(0, 8).map((feature) => (
              <li key={feature.title}>
                <strong>{feature.title}.</strong> {feature.summary}
              </li>
            ))}
          </ul>
          <p className={P}>
            Plus a colour picker with WCAG contrast, a camera mirror, weather, the system HUD, a
            download watcher, themes and a global shortcut. The{' '}
            <Link to="/#features" className={LINK}>
              full list of sixteen is on the home page
            </Link>
            .
          </p>
          <p className={P}>
            You will not want all of them, and that is the point of the switches: run the notch
            with nothing but media controls if that is all you need.
          </p>

          <h2 className={H2}>Which MacBooks have a notch?</h2>
          <ul className={UL}>
            <li>
              <strong>MacBook Pro 14-inch and 16-inch</strong>, 2021 onwards
            </li>
            <li>
              <strong>MacBook Air 13-inch</strong>, M2 from 2022 onwards
            </li>
            <li>
              <strong>MacBook Air 15-inch</strong>, 2023 onwards
            </li>
          </ul>
          <p className={P}>
            The notch holds the camera and the ambient light sensor, and it sits in space that
            used to be bezel, so it does not cover anything older MacBooks had. Some notch apps,
            Dynamic Notch included, also draw their own panel on displays with no physical cutout,
            which covers a Mac mini or Studio on an external monitor.
          </p>

          <h2 className={H2}>How to choose one</h2>
          <p className={P}>Four questions settle it quickly.</p>
          <ul className={UL}>
            <li>
              <strong>Is it native?</strong> A notch app runs all day. Swift costs close to
              nothing; an Electron wrapper holds a browser engine in memory to draw a play button.
              Ask before you install, because most developers will tell you on the page.
            </li>
            <li>
              <strong>Does it replace menu bar apps or add to them?</strong> If it puts a new icon
              in the menu bar without taking any out, it has moved the problem.
            </li>
            <li>
              <strong>One-time or subscription?</strong> Most of this category is a one-time
              purchase between about $6 and $25. A subscription for a notch utility is a harder
              case to make.
            </li>
            <li>
              <strong>Is it notarized?</strong> Notarization means Apple scanned the build and
              verified the publisher, and the app opens without a Gatekeeper detour. Open-source
              apps offer public source instead, which is its own assurance.
            </li>
          </ul>
          <p className={P}>
            Six apps measured against exactly that, with prices read off each developer&apos;s own
            site where possible, are in{' '}
            <Link to="/best-mac-notch-apps" className={LINK}>
              the best Mac notch apps compared
            </Link>
            . The short version: Boring Notch if you want free and open source, Dynamic Notch if
            you want breadth for {PRICE.display}, NotchNook if you want the most polished and
            price is no object.
          </p>

          <h2 className={H2}>Or hide it instead</h2>
          <p className={P}>
            If what you really want is for the notch to stop being visible, that is a different
            job and there are five ways to do it, including a per-app setting built into macOS
            that almost nobody finds. They are all in{' '}
            <Link to="/blog/how-to-hide-macbook-notch" className={LINK}>
              how to hide the MacBook notch
            </Link>
            . Dynamic Notch also ships a hide notch mode, so choosing it does not close off that
            option.
          </p>

          <FaqSection route="/mac-notch-app" />
        </section>
      </m.article>
    </div>
  );
}
