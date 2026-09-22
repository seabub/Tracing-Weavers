/**
 * The design system's ten line marks, inlined as components.
 *
 * They are drawn from weave *structure* rather than from any community motif —
 * communities decide which motifs may be shown, so none are reproduced here.
 * All of them use `currentColor` and take their colour from the parent text.
 *
 * Rules from the system: one mark per surface, low contrast or as a quiet
 * ground, never filled, never rotated, never two colours in one layout.
 * Structure, not decoration. All are aria-hidden.
 */

type MarkProps = { className?: string; strokeWidth?: number };

/** 48 vertical threads, every sixth heavier — full-bleed band, card ground. */
export function WarpField({ className, strokeWidth = 1 }: MarkProps) {
    return (
        <svg
            aria-hidden
            className={className}
            viewBox="0 0 480 120"
            preserveAspectRatio="none"
            fill="none"
        >
            {Array.from({ length: 48 }, (_, i) => {
                const x = i * 10 + 5;
                const heavy = i % 6 === 0;
                return (
                    <line
                        key={i}
                        x1={x}
                        y1="0"
                        x2={x}
                        y2="120"
                        stroke="currentColor"
                        strokeWidth={heavy ? strokeWidth * 2 : strokeWidth}
                        opacity={heavy ? 0.9 : 0.45}
                    />
                );
            })}
        </svg>
    );
}

/** Warp/weft grid with one weft thread carried across — "how it works". */
export function WeftCrossing({ className, strokeWidth = 1 }: MarkProps) {
    return (
        <svg aria-hidden className={className} viewBox="0 0 240 120" fill="none">
            {Array.from({ length: 12 }, (_, i) => (
                <line
                    key={`w${i}`}
                    x1={i * 20 + 10}
                    y1="0"
                    x2={i * 20 + 10}
                    y2="120"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    opacity={0.4}
                />
            ))}
            {Array.from({ length: 6 }, (_, i) => (
                <line
                    key={`f${i}`}
                    x1="0"
                    y1={i * 20 + 10}
                    x2="240"
                    y2={i * 20 + 10}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    opacity={0.2}
                />
            ))}
            <line
                x1="0"
                y1="62"
                x2="240"
                y2="62"
                stroke="currentColor"
                strokeWidth={strokeWidth * 2.5}
            />
        </svg>
    );
}

/** A hairline that frays into dashes — end-of-section divider. */
export function ThreadRule({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden
            className={className}
            viewBox="0 0 480 8"
            preserveAspectRatio="none"
            fill="none"
        >
            <line x1="0" y1="4" x2="300" y2="4" stroke="currentColor" strokeWidth="1" />
            <line
                x1="310"
                y1="4"
                x2="480"
                y2="4"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="7 9"
            />
        </svg>
    );
}

/** Seven ticks and arrows on a baseline, last tick heavy — the Seed→Flourish strip. */
export function JourneyChain({
    className,
    activeCount = 0,
    strokeWidth = 1,
}: MarkProps & { activeCount?: number }) {
    return (
        <svg aria-hidden className={className} viewBox="0 0 420 26" fill="none">
            <line x1="0" y1="20" x2="420" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.35" />
            {Array.from({ length: 7 }, (_, i) => {
                const x = 18 + i * 64;
                const last = i === 6;
                const filled = i <= activeCount;
                return (
                    <g key={i}>
                        <line x1={x - 12} y1="20" x2={x} y2="10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                        <line
                            x1={x}
                            y1={last ? 3 : 8}
                            x2={x}
                            y2="20"
                            stroke="currentColor"
                            strokeWidth={last ? strokeWidth * 3 : strokeWidth * 1.5}
                        />
                        {filled && <circle cx={x} cy="4" r="2.5" fill="currentColor" />}
                    </g>
                );
            })}
        </svg>
    );
}

/** Five hand-count groups — weaver counts, cohort numbers. */
export function TallyMarks({ className }: { className?: string }) {
    return (
        <svg aria-hidden className={className} viewBox="0 0 84 20" fill="none">
            {[0, 1, 2, 3].map((g) =>
                [0, 1, 2, 3, 4].map((t) => (
                    <line
                        key={`${g}-${t}`}
                        x1={g * 20 + t * 3.4 + 3}
                        y1={t === 4 ? 2 : 6}
                        x2={g * 20 + t * 3.4 + 3}
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                )),
            )}
        </svg>
    );
}

/** Four framing corners — photo and record frames. */
export function CornerBrackets({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden
            className={className}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
        >
            <path d="M0 14V0h14" stroke="currentColor" strokeWidth="1.5" />
            <path d="M86 0h14v14" stroke="currentColor" strokeWidth="1.5" />
            <path d="M100 86v14H86" stroke="currentColor" strokeWidth="1.5" />
            <path d="M14 100H0V86" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

/** Dot field thickening left to right — quiet grounds, progression. */
export function SeedScatter({ className }: { className?: string }) {
    return (
        <svg aria-hidden className={className} viewBox="0 0 240 60" fill="currentColor">
            {Array.from({ length: 60 }, (_, i) => {
                const col = i % 20;
                const row = Math.floor(i / 20);
                return (
                    <circle
                        key={i}
                        cx={col * 12 + 6}
                        cy={row * 18 + 6}
                        r={0.7 + (col / 20) * 1.6}
                        opacity={0.25 + (col / 20) * 0.5}
                    />
                );
            })}
        </svg>
    );
}

/** Six nodes on a dashed circle, one arrowhead, open centre — the loop slide,
 *  "value returns". */
export function ValueLoop({ className }: { className?: string }) {
    const nodes = Array.from({ length: 6 }, (_, i) => {
        const a = (-90 + i * 60) * (Math.PI / 180);
        return { x: 60 + 40 * Math.cos(a), y: 60 + 40 * Math.sin(a) };
    });

    return (
        <svg aria-hidden className={className} viewBox="0 0 120 120" fill="none">
            <circle
                cx="60"
                cy="60"
                r="40"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.6"
            />
            {nodes.map((node, i) => (
                <circle key={i} cx={node.x} cy={node.y} r={i === 0 ? 5 : 3} fill="currentColor" />
            ))}
            <path d="M60 8l6 10H54z" fill="currentColor" />
        </svg>
    );
}

/** Three lines of rising weight — title slides, one-pager foot. */
export function HorizonBand({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden
            className={className}
            viewBox="0 0 120 24"
            preserveAspectRatio="none"
            fill="none"
        >
            <line x1="0" y1="4" x2="120" y2="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <line x1="0" y1="12" x2="120" y2="12" stroke="currentColor" strokeWidth="2" opacity="0.75" />
            <line x1="0" y1="21" x2="120" y2="21" stroke="currentColor" strokeWidth="3" />
        </svg>
    );
}

/** One filled node, three outlined, dashed links — ICM × TBN × Torajamelo
 *  around the community, never a hierarchy. */
export function PartnerNodes({ className }: { className?: string }) {
    return (
        <svg aria-hidden className={className} viewBox="0 0 200 40" fill="none">
            <line x1="26" y1="20" x2="174" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 5" opacity="0.6" />
            <circle cx="20" cy="20" r="7" fill="currentColor" />
            {[70, 120, 170].map((x, i) => (
                <circle key={i} cx={x} cy="20" r="7" stroke="currentColor" strokeWidth="1.5" />
            ))}
        </svg>
    );
}