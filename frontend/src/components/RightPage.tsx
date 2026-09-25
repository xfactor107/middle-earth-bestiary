import { Link } from "react-router";
import CreatureStats from "./CreatureStats";
import DetailDrawings from "./DetailDrawings";
import { Divider } from "./Ornaments";
import type { Creature } from "../types/creature";
import "./RightPage.css";

const pad = (n: number) => String(n).padStart(2, "0");

export interface PageLink {
  id: number;
  name: string;
}

interface RightPageProps {
  creature: Creature;
  // Position in the codex; null for an entry not yet in the loaded contents
  pageNumber: number | null;
  totalPages: number;
  prev: PageLink | null;
  next: PageLink | null;
}

export default function RightPage({ creature, pageNumber, totalPages, prev, next }: RightPageProps) {
  return (
    <section className="page page--right">
      <header className="entry-head">
        <h1 className="entry-head__name">{creature.name}</h1>
        {pageNumber != null && (
          <span className="entry-head__folio" aria-label={`Entry ${pageNumber} of ${totalPages}`}>
            {pad(pageNumber)} / {pad(totalPages)}
          </span>
        )}
      </header>
      <Divider />

      <CreatureStats creature={creature} />
      <Divider />

      <p className="entry-description">{creature.description}</p>

      {creature.anatomicalSketches.length > 0 && (
        <>
          <Divider />
          <DetailDrawings sketches={creature.anatomicalSketches} />
        </>
      )}

      <nav className="page-turn" aria-label="Turn the page">
        {prev && (
          <Link to={`/creatures/${prev.id}`} className="page-turn__link page-turn__link--prev" rel="prev">
            <span aria-hidden="true">‹</span> {prev.name}
          </Link>
        )}
        {next && (
          <Link to={`/creatures/${next.id}`} className="page-turn__link page-turn__link--next" rel="next">
            {next.name} <span aria-hidden="true">›</span>
          </Link>
        )}
      </nav>
    </section>
  );
}
