import { TreeEmblem } from "./Ornaments";
import "./SidebarIndex.css";

// Placeholder chapters until creatures carry a category of their own
const CHAPTERS = ["Maiar", "Orcs", "Beasts", "Ents", "Dragons", "Great Eagles"];

interface SidebarIndexProps {
  activeChapter: string | null;
}

export default function SidebarIndex({ activeChapter }: SidebarIndexProps) {
  return (
    <nav className="sidebar" aria-label="Bestiary chapters">
      <button type="button" className="sidebar__back">
        <span aria-hidden="true">‹</span> Back to Index
      </button>

      <ol className="sidebar__chapters">
        {CHAPTERS.map((chapter, i) => {
          const isActive = chapter === activeChapter;
          return (
            <li key={chapter}>
              <a
                href="#"
                className={`sidebar__chapter${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="sidebar__num">{String(i + 1).padStart(2, "0")}</span>
                {chapter}
              </a>
            </li>
          );
        })}
      </ol>

      <div className="sidebar__emblem">
        <TreeEmblem className="sidebar__tree" />
        <p>Middle-earth Bestiary</p>
      </div>
    </nav>
  );
}
