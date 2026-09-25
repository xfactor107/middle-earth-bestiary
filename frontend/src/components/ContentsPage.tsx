import { Link } from "react-router";
import { Divider } from "./Ornaments";
import type { Creature } from "../types/creature";
import "./ContentsPage.css";

export default function ContentsPage({ creatures }: { creatures: Creature[] }) {
  return (
    <section className="page page--right">
      <h1 className="contents__title">Contents</h1>
      <Divider />

      {creatures.length === 0 ? (
        <p className="contents__empty">No creatures have yet been set down in this codex.</p>
      ) : (
        <ol className="contents__list">
          {creatures.map((creature, i) => (
            <li key={creature.id}>
              <Link to={`/creatures/${creature.id}`} className="contents__entry">
                <span className="contents__name">
                  {creature.name}
                  {creature.taxonomy && <em className="contents__taxonomy">{creature.taxonomy}</em>}
                </span>
                <span className="contents__leader" aria-hidden="true" />
                <span className="contents__folio">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
