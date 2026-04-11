import { m } from "framer-motion";

const faqs = [
  {
    question: "Is it safe for my MacBook?",
    answer: "Absolutely. Dynamic Notch uses native macOS APIs and doesn't modify system files.",
  },
  {
    question: "Does it support external monitors?",
    answer: "No! It's recommended to be used on Macbook M2 or later for the best experience.",
  },
  {
    question: "Does it affect my battery life?",
    answer: "Not at all! Dynamic notch is a very lightweight utility app that has minimal impact on the system.",
  },
  {
    question: "Is there a one-time purchase?",
    answer: "Dynamic Notch is currently free during beta, with a 'pay what you want' model arriving soon.",
  },
    {
    question: "What features does it have?",
    answer: "File Tray, Media Control, Quick Notes, Timer, Timer Notch Animations, Shortcuts, Weather and more coming soon!",
  },
    {
    question: "Why does it show its not safe for my Mac?",
    answer: "As an individual, I do not currenly possess the funds to notarize the app and get it approved by apple. (99$)",
  },
];

export default function FAQMarquee() {
  // Triple the array to ensure there is never a "gap" on larger screens
  const duplicatedFaqs = [...faqs, ...faqs, ...faqs];

  return (
    <section className="py-24 bg-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Frequently Asked Questions<span className="text-white/40"> - FAQ</span>
        </h2>
      </div>

      {/* The Container (The Window) */}
      <div className="relative flex overflow-hidden w-full">
        {/* The Animated Track */}
        <m.div
          className="flex gap-6 pr-6 whitespace-nowrap"
          animate={{
            x: ["0%", "-33.33%"], // We only move across one set of the triple-array
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedFaqs.map((faq, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] md:w-[400px] p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm whitespace-normal"
            >
              <h3 className="text-lg font-semibold text-white mb-4 italic">
                "{faq.question}"
              </h3>
              <p className="text-white/60 font-light leading-relaxed text-sm">
                {faq.answer}
              </p>
              
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">
                  Official FAQ
                </span>
              </div>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}