import { useState, useEffect } from 'react';
import { Play, Square } from 'lucide-react';

export default function InteractiveTimer() {
    const [minutes, setMinutes] = useState<number | string>("01");
    const [seconds, setSeconds] = useState<number | string>("00");
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            playBeep();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const playBeep = () => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
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
        <div className="w-full h-32 mt-4 bg-black/50 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center group">
            <div className={`transition-all duration-300 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-between px-3 border shadow-lg z-10 ${isActive ? 'w-32 border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'w-40 border-white/10 hover:border-white/30'}`}>

                {!isActive ? (
                    <div className="flex items-center gap-1 text-white pr-2">
                        <input
                            type="text"
                            min="0"
                            max="99"
                            value={minutes}
                            onChange={(e) => setMinutes(e.target.value.replace(/\D/g, '').slice(0, 2))}
                            onFocus={handleFocus}
                            className="w-6 bg-transparent text-right outline-none text-pink-400 font-mono text-sm selection:bg-pink-500/30"
                            placeholder="00"
                        />
                        <span className="text-white/40 pb-0.5">:</span>
                        <input
                            type="text"
                            min="0"
                            max="59"
                            value={seconds}
                            onChange={(e) => setSeconds(e.target.value.replace(/\D/g, '').slice(0, 2))}
                            onFocus={handleFocus}
                            className="w-6 bg-transparent outline-none text-pink-400 font-mono text-sm selection:bg-pink-500/30"
                            placeholder="00"
                        />
                    </div>
                ) : (
                    <div className="flex-1 text-center text-pink-400 font-mono tracking-wider text-sm">
                        {mStr}:{sStr}
                    </div>
                )}

                <button
                    onClick={toggleTimer}
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${isActive ? 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                    {isActive ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                </button>
            </div>

            {/* Background animated gradient when active */}
            <div className={`absolute inset-0 bg-pink-500/10 mix-blend-screen pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
        </div>
    );
}
