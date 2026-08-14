import { useState, useEffect } from 'react';
import { Play, Square } from 'lucide-react';

export default function InteractiveTimer() {
    const [minutes, setMinutes] = useState<number | string>("01");
    const [seconds, setSeconds] = useState<number | string>("00");
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    // Declared above the effect that calls it: a `const` arrow function is in the
    // temporal dead zone until this line runs, so referencing it from an effect defined
    // earlier in the body is only safe by accident of timing.
    const playBeep = () => {
        try {
            const AudioContext =
                window.AudioContext ??
                (window as unknown as { webkitAudioContext?: typeof window.AudioContext })
                    .webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1);

            osc.start();
            osc.stop(ctx.currentTime + 1);
        } catch (e) {
            console.error("Audio block", e);
        }
    };

    // Tick. Depends only on `isActive`, so the interval is created once per run rather
    // than being torn down and recreated on every second that elapses.
    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(
            () => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)),
            1000,
        );
        return () => clearInterval(interval);
    }, [isActive]);

    // Finish. The stop-and-beep is deferred by a timeout rather than run inline: setting
    // state synchronously inside an effect re-renders before the browser paints, which
    // is what the cascading-render lint rule is about.
    useEffect(() => {
        if (!isActive || timeLeft > 0) return;
        const done = setTimeout(() => {
            setIsActive(false);
            playBeep();
        }, 0);
        return () => clearTimeout(done);
    }, [isActive, timeLeft]);

    const toggleTimer = () => {
        if (!isActive) {
            const m = parseInt(minutes.toString()) || 0;
            const s = parseInt(seconds.toString()) || 0;
            const totalSecs = m * 60 + s;
            if (totalSecs > 0) {
                setTimeLeft(totalSecs);
                setIsActive(true);
            }
        } else {
            setIsActive(false);
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };

    const mStr = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const sStr = (timeLeft % 60).toString().padStart(2, '0');

    return (
        <div className="group relative mt-6 flex h-32 w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-black/50">
            <div className={`transition-all duration-300 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-between px-3 border shadow-lg z-10 ${isActive ? 'w-32 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'w-40 border-white/10 hover:border-white/30'}`}>

                {!isActive ? (
                    <div className="flex items-center gap-1 text-white pr-2">
                        <input
                            type="text"
                            inputMode="numeric"
                            aria-label="Minutes"
                            min="0"
                            max="99"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value.replace(/\D/g, '').slice(0, 2))}
                            onFocus={handleFocus}
                            className="w-6 bg-transparent text-right outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-pink-400 text-pink-400 font-mono text-sm selection:bg-pink-500/30"
                            placeholder="00"
                        />
                        <span className="text-white/60 pb-0.5">:</span>
                        <input
                            type="text"
                            inputMode="numeric"
                            aria-label="Seconds"
                            min="0"
                            max="59"
                            value={seconds}
                            onChange={(e) => setSeconds(e.target.value.replace(/\D/g, '').slice(0, 2))}
                            onFocus={handleFocus}
                            className="w-6 bg-transparent outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-pink-400 text-pink-400 font-mono text-sm selection:bg-pink-500/30"
                            placeholder="00"
                        />
                    </div>
                ) : (
                    <div className="flex-1 text-center text-pink-400 font-mono tracking-wider text-sm">
                        {mStr}:{sStr}
                    </div>
                )}

                <button
                    type="button"
                    onClick={toggleTimer}
                    aria-label={isActive ? 'Stop timer' : 'Start timer'}
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${isActive ? 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {isActive ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                </button>
            </div>

            {/* Background animated gradient when active */}
            <div className={`absolute inset-0 bg-pink-500/10 mix-blend-screen pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
        </div>
    );
}
