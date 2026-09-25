import { useRef } from "react";
import TurnLink from "./TurnLink";
import { Divider } from "./Ornaments";
import { matchesQuery } from "../data/search";
import { useSearchQuery } from "../routes/useSearchQuery";
import type { Chapter } from "../data/chapters";
import "./ContentsPage.css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ContentsPage({ chapters }: { chapters: Chapter[] }) {
  const [query, setQuery] = useSearchQuery();
  const inputRef = useRef<HTMLInputElement>(null);

  // Entries keep their page numbers even when others are filtered out
  const results = chapters
    .map((chapter) => ({
      ...chapter,
      entries: chapter.entries.filter(({ creature }) => matchesQuery(creature, query)),
    }))
    .filter((chapter) => chapter.entries.length > 0);

  const total = chapters.reduce((sum, chapter) => sum + chapter.entries.length, 0);
  const found = results.reduce((sum, chapter) => sum + chapter.entries.length, 0);

  return (
    <section className="page page--right">
      <h1 className="contents__title">Contents</h1>
      <Divider />

      {total > 0 && (
        <div className="contents__search" role="search">
          <label htmlFor="codex-search" className="contents__search-label">
            Seek
          </label>
          <input
            ref={inputRef}
            id="codex-search"
            type="search"
            className="contents__search-input"
            placeholder="a creature, a place, a name of old…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              className="contents__search-clear"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
      )}

      {/* Announced to screen readers as the results change */}
      <p className="visually-hidden" aria-live="polite">
        {query && `${found} of ${total} entries match`}
      </p>

      {total === 0 ? (
        <p className="contents__empty">No creatures have yet been set down in this codex.</p>
      ) : results.length === 0 ? (
        <p className="contents__empty">
          No creature answering to “{query}” is recorded in this codex.
        </p>
      ) : (
        <div className="contents__chapters">
          {results.map((chapter) => (
            <section key={chapter.category} className="contents__chapter">
              <h2 className="contents__chapter-title">{chapter.title}</h2>
              <ol className="contents__list">
                {chapter.entries.map(({ creature, page }) => (
                  <li key={creature.id}>
                    <TurnLink to={`/creatures/${creature.id}`} className="contents__entry">
                      <span className="contents__name">{creature.name}</span>
                      <span className="contents__leader" aria-hidden="true" />
                      <span className="contents__folio">{pad(page)}</span>
                    </TurnLink>
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
