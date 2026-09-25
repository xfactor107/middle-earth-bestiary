import "./DangerRating.css";

const MAX_RATING = 5;
const LABELS = ["Negligible", "Wary", "Perilous", "Extreme", "Catastrophic"];

// Label is derived from the numeric rating so the two can never disagree
function dangerLabel(rating: number): string {
  return LABELS[Math.min(Math.max(rating, 1), MAX_RATING) - 1]!;
}

export default function DangerRating({ rating }: { rating: number }) {
  const label = dangerLabel(rating);

  return (
    <div className="danger">
      <div className="danger__diamonds" role="img" aria-label={`${rating} of ${MAX_RATING}: ${label}`}>
        {Array.from({ length: MAX_RATING }, (_, i) => (
          <svg key={i} className="danger__diamond" viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M10 1.5 L18.5 10 L10 18.5 L1.5 10 Z"
              fill={i < rating ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
        ))}
      </div>
      <span className="danger__label">{label}</span>
    </div>
  );
}
