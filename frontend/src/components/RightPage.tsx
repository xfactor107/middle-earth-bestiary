import CreatureStats from "./CreatureStats";
import DetailDrawings from "./DetailDrawings";
import { Divider } from "./Ornaments";
import type { Creature } from "../types/creature";
import "./RightPage.css";

const pad = (n: number) => String(n).padStart(2, "0");

interface RightPageProps {
  creature: Creature;
  pageNumber: number;
  totalPages: number;
}

export default function RightPage({ creature, pageNumber, totalPages }: RightPageProps) {
  return (
    <section className="page page--right">
      <header className="entry-head">
        <h2 className="entry-head__name">{creature.name}</h2>
        <span className="entry-head__folio" aria-label={`Entry ${pageNumber} of ${totalPages}`}>
          {pad(pageNumber)} / {pad(totalPages)}
        </span>
      </header>
      <Divider />

      <CreatureStats creature={creature} />
      <Divider />

      <p className="entry-description">{creature.description}</p>
      <Divider />

      <DetailDrawings sketches={creature.anatomicalSketches} />
    </section>
  );
}
