/**
 * The blog index. `src/pages/Blog.tsx` renders this list and
 * `src/components/ArticleFooter.tsx` picks related posts out of it.
 *
 * `readTime` is the article's word count at 230 wpm, rounded up. Recount when you
 * edit a post, the previous labels claimed 4 to 6 minutes for 200-word articles.
 * `dateISO` is what goes in `<time dateTime>`; `date` is only ever displayed.
 */
export const POSTS = [
  {
    id: 'founder-journey-first-payout',
    title: 'Behind the Launch: What It Feels Like to Ship a Mac App and Earn Your First Payout',
    date: 'August 5, 2026',
    dateISO: '2026-08-05',
    readTime: '3 min read',
    topics: ['indie', 'shipping'],
    excerpt:
      "From late-night Swift debugging to pressing 'Publish', and that unforgettable email notification for your very first payout as an indie founder.",
  },
  {
    id: 'native-swift-vs-electron',
    title: 'Why Native Swift Apps are Making a Massive Comeback on macOS',
    date: 'July 8, 2026',
    dateISO: '2026-07-08',
    readTime: '2 min read',
    topics: ['native', 'performance'],
    excerpt:
      'In an era dominated by RAM-heavy web wrappers, native Swift development delivers the lightweight, hyper-responsive software Mac users deserve.',
  },
  {
    id: 'mac-power-user-hacks',
    title: '5 Essential macOS Customization Hacks for Power Users in 2026',
    date: 'June 12, 2026',
    dateISO: '2026-06-12',
    readTime: '2 min read',
    topics: ['macos', 'productivity', 'customization'],
    excerpt:
      'Real speed on a Mac comes from cutting the small errands, not from writing scripts. Five changes that remove window switching from your day.',
  },
  {
    id: 'versionUpdate',
    title: 'Major App Updates and Performance Optimizations',
    date: 'May 23, 2026',
    dateISO: '2026-05-23',
    readTime: '2 min read',
    topics: ['product', 'release'],
    excerpt:
      'We have added multi file dragging and opening functionality, fixed bug errors, and made the app more optimized.',
  },
  {
    id: 'how-to-hide-macbook-notch',
    title: 'How to Hide the MacBook Notch (and Why You Might Not Want To)',
    date: 'April 19, 2026',
    dateISO: '2026-04-19',
    readTime: '7 min read',
    topics: ['notch', 'customization'],
    excerpt:
      'Five methods, including the built-in macOS setting most people miss, plus the menu bar problem that hiding the notch does not solve.',
  },
  {
    id: 'battery-efficiency',
    title: 'Does Dynamic Notch Affect Your MacBook Battery Life?',
    date: 'March 20, 2026',
    dateISO: '2026-03-20',
    readTime: '1 min read',
    topics: ['performance', 'native'],
    excerpt:
      'Learn how Dynamic Notch runs natively and silently in the background without draining your battery or slowing down your pro apps.',
  },
  {
    id: 'notch-customization',
    title: 'How Much Can You Customize the macOS Notch?',
    date: 'March 1, 2026',
    dateISO: '2026-03-01',
    readTime: '1 min read',
    topics: ['notch', 'customization'],
    excerpt:
      'The notch does not have to look like a black rectangle. Themes, accent colours, module order and what shows on the collapsed bar are all yours to set.',
  },
  {
    id: 'minimalist-setup',
    title: 'Dynamic Notch and the Minimalist Desk Setup',
    date: 'February 28, 2026',
    dateISO: '2026-02-28',
    readTime: '1 min read',
    topics: ['macos', 'workflow'],
    excerpt:
      'True aesthetic equilibrium requires digital minimalism. Declutter your menu bar and your desktop.',
  },
  {
    id: 'boost-productivity',
    title: 'How Dynamic Notch Supercharges Productivity',
    date: 'February 15, 2026',
    dateISO: '2026-02-15',
    readTime: '1 min read',
    topics: ['productivity', 'workflow'],
    excerpt:
      'Every time you stop writing code to open Spotify, wait for it, and hit next, you pay for it twice: once in seconds and once in focus.',
  },
  {
    id: 'why-dynamic-island-mac',
    title: 'Why Your Mac Deserves a Dynamic Island',
    date: 'January 2, 2026',
    dateISO: '2026-01-02',
    readTime: '5 min read',
    topics: ['notch', 'product'],
    excerpt:
      'Apple gave the iPhone cutout timers, playback and live activities. On the Mac the same space was left static. Here is what happens when it is not.',
  },
];

/**
 * Posts sharing the most topics with `id`, newest first. Falls back to the most recent
 * other posts so an article never renders a short list.
 */
export function relatedPosts(id, count = 2) {
  const current = POSTS.find((p) => p.id === id);
  const others = POSTS.filter((p) => p.id !== id);
  if (!current) return others.slice(0, count);

  const scored = others
    .map((post) => ({
      post,
      shared: post.topics.filter((t) => current.topics.includes(t)).length,
    }))
    .sort((a, b) => b.shared - a.shared || b.post.dateISO.localeCompare(a.post.dateISO));

  return scored.slice(0, count).map((entry) => entry.post);
}
