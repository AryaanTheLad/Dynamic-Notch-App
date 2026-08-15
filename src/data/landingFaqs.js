/**
 * The question-and-answer blocks on the keyword-targeted landing pages, keyed by route.
 *
 * Same contract as `FAQS` in product.js: `src/components/FaqSection.tsx` renders these
 * and `scripts/prerender.js` turns the identical array into that route's `FAQPage`
 * schema, so a rich result or an AI answer can never quote something a visitor cannot
 * find on the page.
 *
 * Answers are deliberately plain strings with no markup. An answer engine lifts one of
 * these without the question around it and often without the page around it, so each has
 * to stand up alone, and inline links would not survive the trip anyway.
 */
export const LANDING_FAQS = {
  '/best-mac-notch-apps': [
    {
      question: 'What is the best free Mac notch app?',
      answer:
        'Boring Notch. It is open source under GPL-3.0, has 10.3k GitHub stars, runs on macOS 14 ' +
        'Sonoma or later, and covers music controls with a visualiser, a file shelf with AirDrop, ' +
        'calendar, and replacements for the volume, brightness and keyboard backlight HUDs. It ' +
        'also runs on Intel Macs, which most paid options in this category do not.',
    },
    {
      question: 'Do notch apps work on a Mac without a notch?',
      answer:
        'Some do. Dynamic Notch draws its own panel in the same place at the top of the screen ' +
        'when there is no physical cutout, so a Mac mini or Mac Studio driving an external ' +
        'monitor still gets the file tray and the rest. Support varies across the others, so ' +
        'check before buying if you are not on a MacBook.',
    },
    {
      question: 'Do Mac notch apps slow down a MacBook?',
      answer:
        'The native ones do not meaningfully. Anything written in Swift and sitting idle costs ' +
        'close to nothing: Dynamic Notch measures 0% CPU idle and around 45 MB resident. The ' +
        'question is worth asking of any notch app that is an Electron or web wrapper, because a ' +
        'browser engine running all day to display a play button is a genuine cost to battery life.',
    },
    {
      question: 'Are Mac notch apps safe to install?',
      answer:
        'Check for two things. Notarization by Apple means Apple has scanned the build for malware ' +
        'and verified who published it, and a notarized app opens without a Gatekeeper warning or ' +
        'a right-click workaround. For open-source apps, the source being public is its own ' +
        'assurance. Be wary of anything that asks you to disable System Integrity Protection or ' +
        'install a kernel extension; nothing in this category needs either.',
    },
  ],

  '/dynamic-island-for-mac': [
    {
      question: 'Does macOS have a built-in Dynamic Island?',
      answer:
        'No. Apple has never shipped a Dynamic Island or a Live Activities equivalent for macOS, ' +
        'and there is no setting that makes the MacBook notch interactive. The only way to get ' +
        'the behaviour is a third-party app such as Dynamic Notch.',
    },
    {
      question: 'Which MacBooks can have a Dynamic Island?',
      answer:
        'Any MacBook with a notch: the 14-inch and 16-inch MacBook Pro from 2021 onwards, the ' +
        '13-inch MacBook Air from the M2 in 2022, and the 15-inch Air from 2023. Apps that draw ' +
        'their own panel also work on Macs without a notch, on an external display.',
    },
    {
      question: 'Is a Dynamic Island app for Mac free?',
      answer:
        'Some are. Boring Notch is free and open source. The paid ones run from about $6 to about ' +
        '$25 depending on how much they do, and most are a one-time purchase rather than a ' +
        'subscription. Dynamic Notch is $5.99 once.',
    },
    {
      question: 'Will a Dynamic Island app drain my MacBook battery?',
      answer:
        'A native one will not. Dynamic Notch is written in Swift and SwiftUI, sits at 0% CPU ' +
        'while idle and around 45 MB of memory, and has no browser engine running in the ' +
        'background. The question is worth asking of any notch app built on Electron or a web view.',
    },
  ],

  '/mac-notch-app': [
    {
      question: 'What is a Mac notch app?',
      answer:
        'A utility that makes the space beside the MacBook camera notch interactive, so it can ' +
        'show media controls, hold files, keep a clipboard history or run a timer. macOS provides ' +
        'no such feature itself, so notch apps are all third-party.',
    },
    {
      question: 'Is there a free Mac notch app?',
      answer:
        'Yes. Boring Notch is free and open source under GPL-3.0, with 10.3k GitHub stars, and it ' +
        'runs on Intel Macs as well as Apple Silicon. It covers music, a file shelf, calendar and ' +
        'HUD replacements.',
    },
    {
      question: 'Do notch apps use much memory or battery?',
      answer:
        'Native ones do not. Dynamic Notch measures 0% CPU idle, 2 to 5% with the panel open, and ' +
        'around 45 MB resident, which is less than a single browser tab. Web-wrapper apps are the ' +
        'ones to check.',
    },
    {
      question: 'How do you open the notch?',
      answer:
        'Usually by hovering the top edge of the screen, which is easy to hit because the pointer ' +
        'stops there. Dynamic Notch also takes a system-wide keyboard shortcut, Control Option ' +
        'Command N by default, so you never have to reach for the mouse.',
    },
    {
      question: 'Do Mac notch apps work on an external monitor?',
      answer:
        'It depends on the app. Ones that draw their own panel rather than relying on a physical ' +
        'cutout will work on any display. Dynamic Notch does this, and lets you choose which ' +
        'display it appears on.',
    },
  ],

  '/alternatives/notchnook': [
    {
      question: 'Is there a free NotchNook alternative?',
      answer:
        'Yes. Boring Notch is free, open source under GPL-3.0, actively maintained, and the most ' +
        'starred project in the category at 10.3k GitHub stars. It is the direct free answer to ' +
        'NotchNook.',
    },
    {
      question: 'What is the cheapest paid NotchNook alternative?',
      answer:
        'Dynamic Notch at $5.99 one-time, which is also the broadest of the paid apps by module ' +
        'count at sixteen. MediaMate is in a similar range at around $7 but only handles the ' +
        'system HUD and Now Playing.',
    },
    {
      question: 'Do any NotchNook alternatives avoid a subscription entirely?',
      answer:
        'All of them are one-time purchases or free. Dynamic Notch has no subscription tier and ' +
        'no account to create; checkout is pay-what-you-want above $5.99, and paying more unlocks ' +
        'nothing extra.',
    },
  ],

  '/alternatives/boring-notch': [
    {
      question: 'Is Boring Notch still maintained?',
      answer:
        'Yes. It is at 10.3k GitHub stars with active development, and requires macOS 14 Sonoma ' +
        'or later to install. Building from source needs macOS 15.6 or later.',
    },
    {
      question: 'What is the closest paid equivalent to Boring Notch?',
      answer:
        'Dynamic Notch at $5.99 is the nearest on price and the broadest on modules, at sixteen. ' +
        'Alcove at $14.99 is closer if what you want is Apple-like animation and live activities ' +
        'rather than more utilities.',
    },
    {
      question: 'Can I run two Mac notch apps at once?',
      answer:
        'Not usefully. Two apps drawing in the same place at the top of the screen will fight over ' +
        'it. Try one, and if it is not right, quit it before installing the other.',
    },
  ],
};

export function landingFaqs(route) {
  const found = LANDING_FAQS[route];
  if (!found) throw new Error(`no landing FAQs for route "${route}" in src/data/landingFaqs.js`);
  return found;
}
