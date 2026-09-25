import LeftPage from "./LeftPage";
import RightPage from "./RightPage";
import type { Creature } from "../types/creature";
import "./Book.css";

interface BookProps {
  creature: Creature;
  pageNumber: number;
  totalPages: number;
}

export default function Book({ creature, pageNumber, totalPages }: BookProps) {
  return (
    <article className="book" aria-label={`Bestiary entry: ${creature.name}`}>
      {/* Referenced by .page::before to give the sheets rough, hand-cut edges */}
      <svg className="book__filters" aria-hidden="true">
        <filter id="deckle">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="7" />
        </filter>
      </svg>

      <LeftPage creature={creature} />
      <RightPage creature={creature} pageNumber={pageNumber} totalPages={totalPages} />
    </article>
  );
}
