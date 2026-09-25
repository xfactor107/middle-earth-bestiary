import TurnLink from "./TurnLink";
import CreatureStats from "./CreatureStats";
import DetailDrawings from "./DetailDrawings";
import NotableSpecimens from "./NotableSpecimens";
import { Divider } from "./Ornaments";
import type { Creature, Era } from "../types/creature";
import "./RightPage.css";

const pad = (n: number) => String(n).padStart(2, "0");

const ERA_NAMES: Record<Era, string> = {
  YEARS_OF_THE_TREES: "the Years of the Trees",
  FIRST_AGE: "the First Age",
  SECOND_AGE: "the Second Age",
  THIRD_AGE: "the Third Age",
};

// e.g. "Of the Years of the Trees · Servant of Morgoth"
function lineage(creature: Creature): string {
  const parts = [`Of ${ERA_NAMES[creature.originEra]}`];
  if (creature.master) parts.push(`Servant of ${creature.master}`);
  return parts.join(" · ");
}

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
          <DetailDrawings sketches={creature.anatomicalSketches} />
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
            <span aria-hidden="true">‹</span> {prev.name}
          </TurnLink>
        )}
        {next && (
          <TurnLink
            to={`/creatures/${next.id}`}
            className="page-turn__link page-turn__link--next"
            rel="next"
          >
            {next.name} <span aria-hidden="true">›</span>
          </TurnLink>
        )}
      </nav>
    </section>
  );
}
