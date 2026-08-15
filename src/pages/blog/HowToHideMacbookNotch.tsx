import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArticleSEO from '../../components/ArticleSEO';
import ArticleFooter from '../../components/ArticleFooter';
import { useEntrance } from '../../hooks/useEntrance';

const H2 = 'text-2xl font-semibold mt-12 mb-4 text-white';
const P = 'text-[var(--color-text-secondary)] leading-relaxed mb-6';
const UL = 'list-disc pl-6 text-[var(--color-text-secondary)] leading-relaxed space-y-3 mb-6';
const LINK = 'text-[var(--color-accent-soft)] underline underline-offset-4 hover:text-white transition-colors';

export default function HowToHideMacbookNotch() {
    const entrance = useEntrance();

    return (
        <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <ArticleSEO
                title="How to Hide the MacBook Notch (and Why You Might Not Want To)"
                description="Five ways to hide the MacBook notch, including the built-in macOS setting most people miss, plus the menu bar problem hiding it does not solve."
                publishDate="2026-04-19"
                modifiedDate="2026-08-13"
                url="https://www.dynamicnotch.tech/blog/how-to-hide-macbook-notch"
            />
            <m.article
                {...entrance({ duration: 0.6 })}
                className="prose prose-invert prose-lg max-w-none"
            >
                <header className="mb-12">
                    <h1 className="title-gradient mb-4 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                        How to Hide the MacBook Notch (and Why You Might Not Want To)
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-white/80">By Aryaan</span>
                        <span aria-hidden="true">•</span>
                        <time dateTime="2026-04-19">April 19, 2026</time>
                        <span aria-hidden="true">•</span>
                        <span>7 min read</span>
                    </div>
                </header>

                <section>
                    <p className={P}>
                        The short answer: you cannot switch the notch off, because it is a physical cutout
                        in the panel rather than something the software draws. What you can do is make it
                        stop being noticeable, and there are five ways to do that, one of which is built
                        into macOS and almost nobody knows about.
                    </p>
                    <p className={P}>
                        This guide covers all five, which Macs are affected, and the one problem the notch
                        actually causes that none of these methods fix.
                    </p>

                    <h2 className={H2}>Which MacBooks have a notch</h2>
                    <p className={P}>
                        The notch arrived with the redesigned MacBook Pro in 2021 and spread to the Air the
                        following year. If your Mac is one of these, you have one:
                    </p>
                    <ul className={UL}>
                        <li><strong>MacBook Pro 14-inch and 16-inch</strong>: 2021 onwards</li>
                        <li><strong>MacBook Air 13-inch</strong>: M2, 2022 onwards</li>
                        <li><strong>MacBook Air 15-inch</strong>: M2, 2023 onwards</li>
                    </ul>
                    <p className={P}>
                        It houses the camera and the ambient light sensor. On the 2021 Pro that camera went
                        from 720p to 1080p, which is the trade Apple made: a better webcam and thinner
                        bezels, at the cost of a bite out of the menu bar. The screen area beside the notch
                        is extra space older MacBooks did not have. The notch does not cover anything you used
                        to have; it sits in space that used to be bezel.
                    </p>

                    <h2 className={H2}>Method 1: The built-in macOS setting (per app)</h2>
                    <p className={P}>
                        macOS has shipped a per-app fix since Monterey and it is not in System Settings, so
                        most people never find it. It tells one app to run below the notch entirely,
                        letterboxing the screen to the rectangle underneath.
                    </p>
                    <ul className={UL}>
                        <li>Open your <strong>Applications</strong> folder in Finder</li>
                        <li>Right-click the app and choose <strong>Get Info</strong></li>
                        <li>Tick <strong>Scale to fit below built-in camera</strong></li>
                        <li>Relaunch the app</li>
                    </ul>
                    <p className={P}>
                        The menu bar moves down below the notch and the strip either side turns black. The
                        notch is genuinely gone for that app.
                    </p>
                    <p className={P}>
                        This is the right tool for one specific job: an old app whose menus get swallowed by
                        the notch, or a piece of software that draws its own UI at the very top of the
                        screen and collides with it. It is a poor default, because you give up real vertical
                        screen space in exchange, and you have to set it per app.
                    </p>

                    <h2 className={H2}>Method 2: Black out the menu bar</h2>
                    <p className={P}>
                        The most popular approach. A small utility (TopNotch is the best known) forces the
                        menu bar to solid black. The notch then blends into a uniform dark strip across the
                        top of the display.
                    </p>
                    <p className={P}>
                        How well this works depends on which Mac you have, and this is the part most guides
                        get wrong:
                    </p>
                    <ul className={UL}>
                        <li>
                            <strong>MacBook Pro (14&quot; / 16&quot;)</strong>: the Liquid Retina XDR panel is
                            mini-LED, so black pixels are genuinely close to off. The camouflage is nearly
                            perfect.
                        </li>
                        <li>
                            <strong>MacBook Air</strong>: a conventional backlit LCD, so &quot;black&quot; is dark
                            grey with the backlight behind it. The notch stays slightly visible against it,
                            especially at high brightness or off-angle.
                        </li>
                    </ul>
                    <p className={P}>
                        The cost is that you lose the menu bar tinting to your wallpaper, which on a light
                        desktop reads as a heavy black band you did not ask for.
                    </p>

                    <h2 className={H2}>Method 3: A wallpaper with a dark top edge</h2>
                    <p className={P}>
                        The same idea with nothing installed. Any wallpaper that is dark along its top edge
                        puts black behind the menu bar and blends the notch for free.
                    </p>
                    <p className={P}>
                        It costs no background process and no money, and it breaks the moment you switch to
                        a bright wallpaper or macOS rotates your desktop picture. Worth trying first,
                        because it takes ten seconds and tells you whether blending is the effect you
                        actually wanted.
                    </p>

                    <h2 className={H2}>Method 4: Auto-hide the menu bar</h2>
                    <p className={P}>
                        In <strong>System Settings → Control Centre → Automatically hide and show the menu
                        bar</strong>, set it to Always. The menu bar disappears until you push the pointer
                        to the top of the screen.
                    </p>
                    <p className={P}>
                        This does not hide the notch. The cutout is still there against whatever sits behind
                        it. What it removes is the row of icons that draws your eye to that area, and in
                        full-screen apps the effect is close to a clean edge. Pair it with a dark wallpaper
                        and the top of the display goes quiet.
                    </p>

                    <h2 className={H2}>Method 5: Use an external display</h2>
                    <p className={P}>
                        Obvious, but worth stating: the notch only exists on the built-in panel. Running
                        clamshell with the lid closed, or simply putting your working windows on the
                        external monitor, removes the question entirely. If the notch bothers you mainly at
                        your desk, this is the fix, and it costs nothing if you already own a monitor.
                    </p>

                    <h2 className={H2}>The problem none of these solve</h2>
                    <p className={P}>
                        Here is the thing worth knowing before you pick a method. The notch&apos;s real cost is
                        not that it is visible. It is that it <strong>eats menu bar items</strong>.
                    </p>
                    <p className={P}>
                        macOS lays out menu bar icons from the right, and the app&apos;s own menus from the left.
                        When those two runs meet the notch, icons stop appearing. They do not wrap and they do
                        not scroll; they are simply not drawn. Open an app with a long menu bar, like a design
                        or development tool, and status icons you rely on quietly vanish. The more menu bar
                        utilities you run, the sooner it happens.
                    </p>
                    <p className={P}>
                        Blacking out the menu bar does nothing for this. Neither does a dark wallpaper.
                        Making the notch invisible makes the symptom less irritating while leaving the cause
                        exactly where it was. That is why hiding often does not feel like it worked: the
                        annoyance was never really the black rectangle.
                    </p>

                    <h2 className={H2}>Why you might not want to hide it</h2>
                    <p className={P}>
                        Every method above spends something to make a piece of your screen do nothing more
                        convincingly: vertical space, a background process, your choice of wallpaper, or
                        the menu bar itself. Which is a strange trade when you look at it directly.
                    </p>
                    <p className={P}>
                        The area beside the notch is the one part of the display your eye passes over
                        constantly and the one your cursor can reach without aiming. You throw the pointer at
                        the top of the screen and it stops there. On iPhone, Apple took the same cutout and gave
                        it timers, playback and live activities. On the Mac the equivalent space was left
                        static, which is the gap we wrote about in{' '}
                        <Link to="/blog/why-dynamic-island-mac" className={LINK}>
                            Why Your Mac Deserves a Dynamic Island
                        </Link>.
                    </p>

                    <h2 className={H2}>The alternative: give it a job</h2>
                    <p className={P}>
                        <Link to="/" className={LINK}>Dynamic Notch</Link> takes the other route. Instead of
                        camouflaging the cutout, it makes the space around it interactive: drag files into
                        it to carry them between apps, control whatever is playing, run a timer, keep your
                        current task pinned in view, pull back something you copied, or check the weather,
                        all without leaving the window in front of you.
                    </p>
                    <p className={P}>
                        It is native Swift, runs at around 45 MB of memory and 0% CPU when idle, and is
                        signed and notarized by Apple, so it opens without a Gatekeeper detour. The full
                        numbers are in the{' '}
                        <Link to="/#specs" className={LINK}>specifications table</Link>, and every release is
                        listed in the <Link to="/changelog" className={LINK}>changelog</Link>.
                    </p>
                    <p className={P}>
                        It also ships a Hide Notch Mode, so if you try it and decide you preferred the notch
                        blended after all, you have not lost that option.
                    </p>
                    <p className={P}>
                        It is not the only app that takes this approach, and depending on what you want it
                        may not be the right one. Boring Notch is free and open source, NotchNook is the
                        most polished, and Alcove is closest to Apple&apos;s own animation. All six are set
                        out side by side, with prices checked at source, in{' '}
                        <Link to="/best-mac-notch-apps" className={LINK}>
                            the best Mac notch apps compared
                        </Link>
                        , and{' '}
                        <Link to="/mac-notch-app" className={LINK}>
                            what a notch app actually does
                        </Link>{' '}
                        covers the category from scratch.
                    </p>

                    <h2 className={H2}>Which method should you pick?</h2>
                    <ul className={UL}>
                        <li><strong>You want it gone in one app that breaks against it</strong>: Method 1, the built-in setting.</li>
                        <li><strong>You want it blended everywhere and you have a Pro</strong>: Method 2, a black menu bar.</li>
                        <li><strong>You want to try before installing anything</strong>: Method 3, a dark wallpaper.</li>
                        <li><strong>Your icons keep disappearing</strong>: none of these. Reduce the number of menu bar utilities, or move what you can into the notch instead.</li>
                        <li><strong>You would rather it earned its space</strong>: <Link to="/" className={LINK}>give it a job</Link>.</li>
                    </ul>
                    <p className={P}>
                        Hiding the notch is easy, and if a black strip is genuinely what you want, Method 3
                        gets you there in ten seconds for free. It is just worth asking, before you spend
                        screen space or a background process on it, whether the goal is really to make part
                        of your display disappear.
                    </p>
                </section>
            </m.article>
            <ArticleFooter currentId="how-to-hide-macbook-notch" />
        </div>
    );
}
