import { useRef, useState } from "react";
import { m } from "framer-motion";
import { Play } from "lucide-react";
import MobileHandoff from "./MobileHandoff";
import { useEntrance } from "../hooks/useEntrance";
import {
  CHECKOUT_URL,
  DEMO_VIDEO,
  PERFORMANCE,
  PRICE,
  REQUIREMENTS,
} from "../data/product.js";
import { trackCheckout, trackDemoPlayed } from "../lib/analytics";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const entrance = useEntrance();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  /**
   * The demo autoplays muted and loops, because every browser blocks autoplay with
   * sound. The native control bar is still on the element, so unmuting, seeking,
   * speed and fullscreen are all one click away once it is running.
   *
   * `playing` only exists to hide the fallback overlay. Autoplay is refused often
   * enough (Low Power Mode, Data Saver, a reduced-motion preference on some builds)
   * that the poster needs a play button behind it rather than a dead frame.
   */
  function playDemo(source: "poster" | "hero", withSound: boolean) {
    const video = videoRef.current;
    if (!video) return;

    trackDemoPlayed(source);
    setPlaying(true);

    if (withSound) {
      // A click is a user gesture, so sound is allowed from here.
      video.muted = false;
      video.currentTime = 0;
    }

    void video.play().catch(() => {
      // Autoplay policy or a decode failure. The native controls are already on the
      // element, so the visitor can still press play themselves.
      setPlaying(false);
    });
  }

  return (
    <section className="notch-spill notch-spill-hero relative flex flex-col items-center overflow-hidden px-6 pt-16 pb-20 md:pt-28 md:pb-24">

      {/* Hero Text */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <m.div {...entrance({ y: 20, scale: 0.97, duration: 0.8, ease: EASE_OUT })}>
          {/* The spec strip sits in the brand mark itself: a notch hanging from the top
              edge, with the section's light spilling down out of it onto the headline. */}
          <div className="flex justify-center">
            {/* The dot separators are dropped on phones: the strip wraps there, and a
                wrapped line that ends on a dangling middot reads like a typo. */}
            <span className="notch-tab inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 px-5 pb-2.5 pt-2 text-[11px] font-medium text-white/75">
              <span>macOS {REQUIREMENTS.minMacOS}+</span>
              <span className="hidden text-white/25 sm:inline">·</span>
              <span>Apple Silicon</span>
              <span className="hidden text-white/25 sm:inline">·</span>
              <span>{PERFORMANCE.ram} RAM</span>
              <span className="hidden text-white/25 sm:inline">·</span>
              <span className="text-white">{PRICE.display} once</span>
            </span>
          </div>

          {/* "MacBook notch" rather than "the notch". The line is the brand's, and it stays
              the brand's, but the page's single `<h1>` was carrying no indication of what
              the product is for, which left the home page ranking on the product name and
              nothing else. One word fixes that without touching the rhythm. */}
          <h1 className="mt-10 text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-[4.5rem] md:leading-[0.98]">
            <span className="title-gradient">Everyone else hides the MacBook notch.</span>
            <br className="hidden sm:block" />{' '}
            <span className="text-white">We gave it a job.</span>
          </h1>

          {/* The first sentence is written to survive being quoted on its own, because an
              answer engine asked "what is Dynamic Notch" will lift exactly this and drop
              the rest of the page. It has to name the thing, the platform and the category
              in one breath. */}
          <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            Dynamic Notch is a native macOS app that turns the MacBook notch into a Dynamic
            Island. Park files, control playback, read your next meeting, pick a colour, run a
            timer. All of it without leaving the window you are in.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCheckout('hero')}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 font-medium tracking-[-0.01em] text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.45)] transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:w-auto"
            >
              Buy Dynamic Notch, {PRICE.display}
            </a>
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("demo-video-container")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
                // It is already playing on mute, so the button's job is to restart it
                // from the top with the sound on.
                playDemo('hero', true);
              }}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-7 font-medium text-white transition-colors duration-300 hover:border-white/25 hover:bg-white/12 sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Watch with sound <span className="text-white/50">1:14</span>
            </button>
          </div>

          <p className="mt-5 text-xs text-white/45">
            Signed and notarized by Apple, so it opens like any other Mac app.
          </p>

          <MobileHandoff />
        </m.div>
      </div>

      {/* The demo, framed as a screen. Full corners and a visible bottom edge, because
          the native control bar lives down there and has to be reachable. */}
      <m.div
        {...entrance({ y: 60, duration: 1, delay: 0.3, ease: EASE_OUT })}
        className="relative z-10 mx-auto mt-14 w-full max-w-5xl md:mt-20"
      >
        <div className="screen relative overflow-hidden rounded-[1.75rem] p-2">
          <div
            id="demo-video-container"
            className="relative aspect-video overflow-hidden rounded-[1.25rem] bg-[#08080B]"
          >
            <video
              ref={videoRef}
              className="h-full w-full"
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={DEMO_VIDEO.poster}
              width={DEMO_VIDEO.width}
              height={DEMO_VIDEO.height}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(true)}
              aria-label="Dynamic Notch 4.0 running on a MacBook: media controls, file tray, clipboard history, notes, colour picker, calendar and themes"
            >
              <source src={DEMO_VIDEO.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Only ever seen when autoplay is refused, so the poster is never a dead
                frame. Once anything plays it is gone for good, including after the
                visitor pauses, so it can never cover the native controls. */}
            {!playing && (
              <button
                type="button"
                onClick={() => playDemo('poster', true)}
                className="group absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/45 via-transparent to-black/15 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent-soft)]"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-[0_10px_40px_-6px_rgba(0,0,0,0.7)] backdrop-blur transition-transform duration-300 group-hover:scale-105 group-active:scale-95 md:h-20 md:w-20">
                  <Play
                    className="ml-1 h-6 w-6 fill-black text-black md:h-7 md:w-7"
                    aria-hidden="true"
                  />
                </span>
                <span className="sr-only">Play the Dynamic Notch demo</span>
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/40">
          Recorded on a MacBook running Dynamic Notch 4.0. Nothing here is a mockup.
        </p>
      </m.div>
    </section>
  );
}
