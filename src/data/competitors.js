/**
 * The other apps in the MacBook notch category, and the honest read on each.
 *
 * This exists because the comparison pages, the alternative pages and `llms.txt` all
 * have to say the same thing about a competitor. One rival's price quoted three
 * different ways across three pages is the fastest way to lose the trust that makes a
 * comparison page worth reading at all.
 *
 * Rules for anything added here:
 *
 * 1. `priceVerified: true` means the figure was read off the developer's own site or
 *    repository, not off someone else's roundup. Third-party roundups in this niche
 *    are demonstrably unreliable: they were quoting Boring Notch at 5k GitHub stars
 *    when the repository said 10.3k, and MediaMate at $5, $7 and $9.20 simultaneously.
 * 2. Where a price could not be verified at source, say so in `priceNote` and let the
 *    page render the hedge. An approximate figure that admits it is approximate is
 *    fair comment; a confident wrong one is not.
 * 3. `focus` is what the app is genuinely good at, written as though the developer
 *    were reading it. No strawmen. A comparison page that rubbishes everything else
 *    reads as marketing and gets treated as marketing.
 *
 * Re-check the prices when you touch this file and bump COMPARISON_CHECKED.
 */

/** Rendered on the comparison pages so the reader knows how fresh the figures are. */
export const COMPARISON_CHECKED = '2026-08-16';
export const COMPARISON_CHECKED_LABEL = '16 August 2026';

export const COMPETITORS = [
  {
    id: 'dynamic-notch',
    name: 'Dynamic Notch',
    self: true,
    url: '/',
    price: '$5.99',
    priceModel: 'One-time',
    priceVerified: true,
    openSource: false,
    builtWith: 'Swift and SwiftUI',
    minMacOS: 'macOS 14.6',
    architecture: 'Apple Silicon',
    focus:
      'The widest module set of any app here for the lowest paid price: sixteen modules covering ' +
      'media, a file tray, AirDrop, clipboard history, notes, a timer, calendar events, a colour ' +
      'picker with WCAG contrast, a camera mirror, weather and the system HUD.',
    bestFor: 'Replacing several menu bar utilities at once without paying a subscription.',
    tradeoff:
      'Apple Silicon only, and it is not open source. If you are on an Intel MacBook or you will ' +
      'not run closed-source software, this one is not for you.',
  },
  {
    id: 'boring-notch',
    name: 'Boring Notch',
    url: 'https://github.com/TheBoredTeam/boring.notch',
    price: 'Free',
    priceModel: 'Open source',
    priceVerified: true,
    openSource: true,
    license: 'GPL-3.0',
    builtWith: 'Swift',
    minMacOS: 'macOS 14',
    architecture: 'Apple Silicon and Intel',
    focus:
      'The best-known open-source option, at 10.3k GitHub stars and actively maintained. Music ' +
      'controls with a visualiser, a file shelf with AirDrop, calendar, and HUD replacements for ' +
      'volume, brightness and keyboard backlight.',
    bestFor: 'Anyone who wants the source, a GPL licence, and no payment at all.',
    tradeoff:
      'It is a community project, so support is GitHub issues rather than an inbox, and the ' +
      'module set is narrower than the paid apps.',
  },
  {
    id: 'notchnook',
    name: 'NotchNook',
    url: 'https://notchnook.com',
    price: '~$25',
    priceModel: 'One-time or monthly',
    priceVerified: false,
    priceNote:
      'notchnook.com was serving an "under construction" placeholder when this was last ' +
      'checked, so the figure is what third-party roundups report rather than a price read ' +
      'off the developer’s own site. Confirm before you buy.',
    openSource: false,
    builtWith: 'Native',
    minMacOS: 'Not stated',
    architecture: 'Not stated',
    focus:
      'The app that defined the category and still the most polished implementation, with ' +
      'drag-and-drop file handling, widgets, notes, calendar and heavy customisation.',
    bestFor: 'People who want the most refined version of the idea and do not mind paying most for it.',
    tradeoff:
      'The most expensive option in the category, and the only one that asks some buyers for a ' +
      'recurring payment.',
  },
  {
    id: 'alcove',
    name: 'Alcove',
    url: 'https://tryalcove.com',
    price: '$14.99',
    priceModel: 'One-time',
    priceVerified: true,
    openSource: false,
    builtWith: 'Native',
    minMacOS: 'Not stated',
    architecture: 'Not stated',
    focus:
      'The closest thing to Apple’s own Dynamic Island in feel: live activities, fluid state ' +
      'transitions, swipe gestures, customisable HUDs and lock screen widgets.',
    bestFor: 'People who care most about the animation and the iPhone-like feel of the thing.',
    tradeoff: 'Leans presentation over utility, so it carries fewer working modules than the broader apps.',
  },
  {
    id: 'mediamate',
    name: 'MediaMate',
    url: 'https://wouter01.github.io/MediaMate/',
    price: '~$7',
    priceModel: 'One-time, free tier',
    priceVerified: false,
    priceNote:
      'Reported at $5, $7 and $9.20 by different roundups depending on where it is bought. ' +
      'There is a free version with reduced functionality. Check the developer’s site for ' +
      'the current figure.',
    openSource: false,
    builtWith: 'Native',
    minMacOS: 'Not stated',
    architecture: 'Not stated',
    focus:
      'Clean iOS-style indicators for volume, brightness and keyboard backlight, plus a Now ' +
      'Playing controller. It does one job and does it tidily.',
    bestFor: 'Replacing the ugly macOS HUD and nothing more.',
    tradeoff: 'Not a general notch utility. No file tray, clipboard or notes.',
  },
  {
    id: 'dynamiclake',
    name: 'DynamicLake',
    url: 'https://dynamiclake.com',
    price: '~$15',
    priceModel: 'One-time',
    priceVerified: false,
    priceNote: 'Reported under $15 by third-party roundups. Not verified at source.',
    openSource: false,
    builtWith: 'Native',
    minMacOS: 'Not stated',
    architecture: 'Not stated',
    focus:
      'A polished paid option focused on Dynamic Island-style presentation, media handling and ' +
      'drag-and-drop.',
    bestFor: 'People comparing paid options who want an alternative to NotchNook.',
    tradeoff: 'Priced near the top of the category without the widest module set.',
  },
];

/** The comparison pages lead with the product, so it is always first. */
export const OTHERS = COMPETITORS.filter((app) => !app.self);

export function competitor(id) {
  const found = COMPETITORS.find((app) => app.id === id);
  if (!found) throw new Error(`no competitor with id "${id}" in src/data/competitors.js`);
  return found;
}
