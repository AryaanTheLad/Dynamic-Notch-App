import { useRef, useState } from 'react';
import { m } from 'framer-motion';
import { File, FileImage, FileText, Trash2, Upload } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { useEntrance } from '../hooks/useEntrance';

type TrayItem = { id: string; name: string; size: number };

function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function iconFor(name: string) {
    const ext = name.split('.').pop()?.toLowerCase() ?? '';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'heic', 'svg'].includes(ext)) {
        return <FileImage className="w-4 h-4 text-blue-300" />;
    }
    if (['txt', 'md', 'pdf', 'doc', 'docx', 'rtf', 'pages'].includes(ext)) {
        return <FileText className="w-4 h-4 text-indigo-300" />;
    }
    return <File className="w-4 h-4 text-white/60" />;
}

/**
 * A live notch you can drag files onto. Everything stays in the browser — the files
 * are only ever read for their name and size, which is the point: it demonstrates the
 * File Tray without asking anyone to install or upload anything.
 */
export default function NotchDrop() {
    const entrance = useEntrance();
    const inputRef = useRef<HTMLInputElement>(null);
    const [items, setItems] = useState<TrayItem[]>([]);
    const [isOver, setIsOver] = useState(false);

    const open = isOver || items.length > 0;

    function addFiles(fileList: FileList | null) {
        if (!fileList || fileList.length === 0) return;
        const next = Array.from(fileList)
            .slice(0, 4)
            .map((file, index) => ({
                id: `${file.name}-${file.size}-${Date.now()}-${index}`,
                name: file.name,
                size: file.size,
            }));
        setItems((current) => [...next, ...current].slice(0, 4));
    }

    return (
        <section id="try-it" className="notch-spill py-28 px-6 md:py-36">
            <div className="max-w-5xl mx-auto">
                <SectionHeading
                    eyebrow="Try it"
                    title={<>Drag a file onto the notch.</>}
                    subtitle={
                        <>
                            This is a working copy of the File Tray, running right here in the page.
                            Drop something on it — nothing is uploaded, nothing leaves your machine.
                        </>
                    }
                />

                <m.div {...entrance({ inView: true, delay: 0.1, y: 24 })} className="mt-14">
                    <div
                        onDragOver={(event) => {
                            event.preventDefault();
                            setIsOver(true);
                        }}
                        onDragEnter={(event) => {
                            event.preventDefault();
                            setIsOver(true);
                        }}
                        onDragLeave={(event) => {
                            // Only close when the pointer actually leaves the frame, not when it
                            // crosses into a child element.
                            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                                setIsOver(false);
                            }
                        }}
                        onDrop={(event) => {
                            event.preventDefault();
                            setIsOver(false);
                            addFiles(event.dataTransfer.files);
                        }}
                        className={`screen relative rounded-3xl overflow-hidden transition-colors duration-300 ${
                            isOver ? 'border-[var(--color-accent)]/60' : ''
                        }`}
                    >
                        {/* Stand-in desktop, so the notch reads as sitting on a screen edge. */}
                        <div className="absolute inset-0 opacity-70">
                            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-transparent to-purple-500/5" />
                            <div className="absolute -bottom-1/3 left-1/2 -translate-x-1/2 w-[70%] h-[70%] rounded-full bg-indigo-500/10 blur-[90px]" />
                        </div>

                        <div className="relative flex flex-col items-center px-4 pb-9 pt-0 min-h-[15rem] sm:min-h-[16rem]">
                            {/* The notch itself. Width and height animate with CSS so this needs
                                no framer layout feature (domAnimation does not ship one). */}
                            <div
                                className={`notch-tab overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                    open
                                        ? 'w-full max-w-md h-auto'
                                        : 'w-[17rem] h-11'
                                }`}
                            >
                                {!open && (
                                    <div className="h-11 flex items-center justify-center gap-2 text-xs font-medium text-white/80">
                                        <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                                        Drop files here
                                    </div>
                                )}

                                {open && (
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-semibold tracking-wide text-white/80">
                                                File Tray
                                            </span>
                                            <span className="text-[10px] font-mono text-white/50">
                                                {items.length}/4
                                            </span>
                                        </div>

                                        {items.length === 0 ? (
                                            <div className="rounded-xl border border-dashed border-white/25 py-6 text-center text-xs text-white/60">
                                                Release to drop
                                            </div>
                                        ) : (
                                            <ul className="space-y-2">
                                                {items.map((item) => (
                                                    <li
                                                        key={item.id}
                                                        className="flex items-center gap-3 rounded-lg bg-black/40 border border-white/10 px-3 py-2"
                                                    >
                                                        {iconFor(item.name)}
                                                        <span className="flex-1 truncate text-xs text-white/85">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-[10px] font-mono text-white/50">
                                                            {formatBytes(item.size)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 flex flex-col items-center gap-4 text-center">
                                <p className="max-w-sm text-sm font-light leading-relaxed text-[var(--color-text-secondary)]">
                                    {items.length === 0
                                        ? 'In the app this sits on your real notch, and the files stay there until you drag them out — into Finder, Slack, or AirDrop.'
                                        : 'That is the whole interaction. In the app you drag them back out anywhere — Finder, Slack, AirDrop.'}
                                </p>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => inputRef.current?.click()}
                                        className="h-10 px-5 rounded-full bg-white/8 border border-white/15 text-xs font-medium text-white hover:bg-white/15 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-soft)]"
                                    >
                                        Or choose a file
                                    </button>

                                    {items.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setItems([])}
                                            className="h-10 px-4 rounded-full text-xs font-medium text-white/60 hover:text-white inline-flex items-center gap-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-soft)]"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Clear tray
                                        </button>
                                    )}
                                </div>

                                <input
                                    ref={inputRef}
                                    type="file"
                                    multiple
                                    className="sr-only"
                                    aria-label="Choose files to put in the demo tray"
                                    onChange={(event) => {
                                        addFiles(event.target.files);
                                        event.target.value = '';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </m.div>
            </div>
        </section>
    );
}
