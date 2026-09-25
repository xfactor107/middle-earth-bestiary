import { Link } from "react-router";
import { Divider } from "./Ornaments";
import type { Chapter } from "../data/chapters";
import "./ContentsPage.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ContentsPage({ chapters }: { chapters: Chapter[] }) {
  const written = chapters.filter((chapter) => chapter.entries.length > 0);

  return (
    <section className="page page--right">
      <h1 className="contents__title">Contents</h1>
      <Divider />

      {written.length === 0 ? (
        <p className="contents__empty">No creatures have yet been set down in this codex.</p>
      ) : (
        <div className="contents__chapters">
          {written.map((chapter) => (
            <section key={chapter.category} className="contents__chapter">
              <h2 className="contents__chapter-title">{chapter.title}</h2>
              <ol className="contents__list">
                {chapter.entries.map(({ creature, page }) => (
                  <li key={creature.id}>
                    <Link to={`/creatures/${creature.id}`} className="contents__entry">
                      <span className="contents__name">{creature.name}</span>
                      <span className="contents__leader" aria-hidden="true" />
                      <span className="contents__folio">{pad(page)}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
