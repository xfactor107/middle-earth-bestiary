import type { ReactNode } from "react";
import "./Book.css";

interface BookProps {
  label: string;
  children: ReactNode;
}

// The open codex; each route supplies its own left and right pages
export default function Book({ label, children }: BookProps) {
  return (
    <article className="book" aria-label={label}>
      {/* Referenced by .page::before to give the sheets rough, hand-cut edges */}
      <svg className="book__filters" aria-hidden="true">
        <filter id="deckle">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="7" />
        </filter>
      </svg>

      {children}
    </article>
  );
}
