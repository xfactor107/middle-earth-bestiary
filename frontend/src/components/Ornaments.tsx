// Hand-drawn style SVG ornaments. All strokes use currentColor so CSS controls the ink.

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`divider ${className}`} aria-hidden="true">
      <svg className="divider__cap" viewBox="0 0 12 12">
        <path d="M6 1 L11 6 L6 11 L1 6 Z" fill="none" stroke="currentColor" />
      </svg>
      <span className="divider__line" />
      <svg className="divider__flourish" viewBox="0 0 48 14">
        <path
          d="M2 7 Q12 1 20 7 Q12 13 2 7 M46 7 Q36 1 28 7 Q36 13 46 7"
          fill="none"
          stroke="currentColor"
        />
        <path d="M24 2 L29 7 L24 12 L19 7 Z" fill="currentColor" />
      </svg>
      <span className="divider__line" />
      <svg className="divider__cap" viewBox="0 0 12 12">
        <path d="M6 1 L11 6 L6 11 L1 6 Z" fill="none" stroke="currentColor" />
      </svg>
    </div>
  );
}

export function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="-50 -50 100 100" aria-hidden="true">
      <circle r="17" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle r="21" fill="none" stroke="currentColor" strokeWidth="0.6" />
      <g transform="rotate(45)" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M0 -30 L4 -4 L30 0 L4 4 L0 30 L-4 4 L-30 0 L-4 -4 Z" />
      </g>
      {/* Main points: one half of each ray filled, like an engraving */}
      <path d="M0 -47 L7 -7 L47 0 L7 7 L0 47 L-7 7 L-47 0 L-7 -7 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M0 -47 L7 -7 L0 0 Z M47 0 L7 7 L0 0 Z M0 47 L-7 7 L0 0 Z M-47 0 L-7 -7 L0 0 Z" fill="currentColor" />
      <circle r="2.5" fill="currentColor" />
    </svg>
  );
}

// Leaf clusters at the branch tips of the tree emblem
const LEAVES: Array<[number, number]> = [
  [22, 60], [18, 52], [26, 50], [78, 60], [82, 52], [74, 50],
  [30, 40], [24, 34], [34, 32], [70, 40], [76, 34], [66, 32],
  [42, 24], [38, 17], [46, 16], [58, 24], [62, 17], [54, 16],
  [50, 12], [50, 5],
];

export function TreeEmblem({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 132" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M50 124 V14" strokeWidth="2.4" />
        <path d="M50 92 Q36 82 22 62 M50 92 Q64 82 78 62" />
        <path d="M50 76 Q38 62 30 42 M50 76 Q62 62 70 42" />
        <path d="M50 60 Q44 44 42 26 M50 60 Q56 44 58 26" />
        <path d="M50 116 Q40 122 28 125 M50 116 Q60 122 72 125 M50 119 Q46 125 40 128 M50 119 Q54 125 60 128" />
        <path d="M18 128 H82" strokeWidth="0.8" />
      </g>
      <g fill="currentColor">
        {LEAVES.map(([x, y]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="2.6" ry="1.5" transform={`rotate(${(x - 50) * 1.2} ${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}

// One corner of the plate frame; rotated by CSS for the other three corners
export function FrameCorner({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M2 38 V2 H38" />
        <path d="M8 38 V8 H38" strokeWidth="0.7" />
        <path d="M8 22 Q16 22 16 14 Q16 8 22 8" />
        <circle cx="16" cy="16" r="3" />
      </g>
      <path d="M2 2 L8 8" stroke="currentColor" />
    </svg>
  );
}
