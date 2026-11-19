// The right-hand page of an entry: name and page number, lineage, stats,
// description, notable specimens, sketches, and links to turn the page.
import TurnLink from "./TurnLink";
import CreatureStats from "./CreatureStats";
import DetailDrawings from "./DetailDrawings";
import NotableSpecimens from "./NotableSpecimens";
import { Divider, TurnArrow } from "./Ornaments";
import { lineage } from "../data/lineage";
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
      <p className="entry-lineage">{lineage(creature)}</p>
      <Divider />

      <CreatureStats creature={creature} />
      <Divider />

      <p className="entry-description">{creature.description}</p>
      <NotableSpecimens notables={creature.notables} />

      {creature.anatomicalSketches.length > 0 && (
        <>
          <Divider />
          <DetailDrawings name={creature.name} sketches={creature.anatomicalSketches} />
        </>
      )}

      <nav className="page-turn" aria-label="Turn the page">
        {prev && (
          <TurnLink
            to={`/creatures/${prev.id}`}
            direction="back"
            className="page-turn__link page-turn__link--prev"
            rel="prev"
          >
            <TurnArrow direction="back" /> {prev.name}
          </TurnLink>
        )}
        {next && (
          <TurnLink
            to={`/creatures/${next.id}`}
            className="page-turn__link page-turn__link--next"
            rel="next"
          >
            {next.name} <TurnArrow direction="forward" />
          </TurnLink>
        )}
      </nav>
    </section>
  );
}
