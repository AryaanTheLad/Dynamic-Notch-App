import { m } from "framer-motion";
import { ArrowDown } from "lucide-react";
import MobileHandoff from "./MobileHandoff";
import { useEntrance } from "../hooks/useEntrance";
import { CHECKOUT_URL, PERFORMANCE, PRICE, REQUIREMENTS } from "../data/product.js";
import { trackCheckout, trackDemoPlayed } from "../lib/analytics";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const entrance = useEntrance();

  return (
    <section className="notch-spill notch-spill-hero relative flex flex-col items-center px-6 pt-16 pb-14 md:min-h-screen md:justify-center md:pt-24 md:pb-0 overflow-hidden">

      {/* Hero Text */}
      <div className="max-w-4xl mx-auto text-center z-10">
        <m.div {...entrance({ y: 20, scale: 0.97, duration: 0.8, ease: EASE_OUT })}>
          {/* The spec strip sits in the brand mark itself: a notch hanging from the top
              edge, with the section's light spilling down out of it onto the headline. */}
          <div className="flex justify-center">
            <span className="notch-tab inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-5 pb-2.5 pt-2 text-[11px] font-medium text-white/75">
              <span>macOS {REQUIREMENTS.minMacOS}+</span>
              <span className="text-white/25">·</span>
              <span>Apple Silicon</span>
              <span className="text-white/25">·</span>
              <span>{PERFORMANCE.ram} RAM</span>
              <span className="text-white/25">·</span>
              <span className="text-white">{PRICE.display} once</span>
            </span>
          </div>

          <h1 className="mt-10 text-[2.6rem] leading-[1.02] tracking-[-0.04em] font-semibold sm:text-6xl md:text-[4.5rem] md:leading-[0.98]">
            <span className="title-gradient">Everyone else hides the notch.</span>
            <br className="hidden sm:block" />{' '}
            <span className="text-white">We gave it a job.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base font-light leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            Drag files, control playback, set a timer, and keep your current task in view — without
            leaving what you're doing.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCheckout('hero')}
              className="h-12 w-full sm:w-auto px-8 rounded-full bg-white text-black font-medium tracking-[-0.01em] hover:scale-[1.03] active:scale-95 transition-transform duration-300 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.45)] inline-flex items-center justify-center"
            >
              Buy Dynamic Notch — {PRICE.display}
            </a>
            <button
              type="button"
              onClick={() => {
                trackDemoPlayed('hero');
                document
                  .getElementById("demo-video-container")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="h-12 w-full sm:w-auto px-7 rounded-full bg-white/[0.06] text-white font-medium border border-white/12 hover:bg-white/12 hover:border-white/25 transition-colors duration-300 inline-flex items-center justify-center gap-2"
            >
              Watch it work
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-5 text-xs text-white/45">
            Signed and notarized by Apple — it opens like any other Mac app.
          </p>

          <MobileHandoff />
        </m.div>
      </div>

      {/* Screen Mockup */}
      <m.div
        {...entrance({ y: 60, duration: 1, delay: 0.3, ease: EASE_OUT })}
        className="w-full max-w-5xl mx-auto mt-12 md:mt-20 relative z-10"
      >
        {/* The ratio matches demo.mp4 (1920×1245 as the browser reports it, 1.54:1) so
            object-cover no longer crops ~14% of the frame. */}
        <div className="screen aspect-[1920/1245] rounded-t-[1.75rem] border-b-0 p-2 relative overflow-hidden">

          {/* Screen Surface (REAL fade using mask) */}
          <div
            className="absolute inset-0 rounded-t-[1.5rem] bg-[#08080B]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 90%, transparent 200%)",
              maskImage:
                "linear-gradient(to bottom, black 90%, transparent 200%)",
            }}
          />

          {/* Video Preview */}
          <div id="demo-video-container" className="absolute inset-0 z-10 rounded-t-[1.5rem] overflow-hidden border-t border-white/10">
            <video
              className="w-full h-full object-cover object-top"
              autoPlay
              loop
              muted
              playsInline
              poster="/hero-poster.webp"
              aria-label="Dynamic Notch App Demo Video showcasing the MacBook notch utility"
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </m.div>
    </section>
  );
}
