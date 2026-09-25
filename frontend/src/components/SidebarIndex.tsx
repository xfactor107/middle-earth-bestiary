import { Link } from "react-router";
import { TreeEmblem } from "./Ornaments";
import type { Chapter } from "../data/chapters";
import type { Category } from "../types/creature";
import "./SidebarIndex.css";

interface SidebarIndexProps {
  chapters: Chapter[];
  activeChapter: Category | null;
}

export default function SidebarIndex({ chapters, activeChapter }: SidebarIndexProps) {
  return (
    <nav className="sidebar" aria-label="Bestiary chapters">
      <Link to="/" className="sidebar__back">
        <span aria-hidden="true">‹</span> Back to Index
      </Link>

      <ol className="sidebar__chapters">
        {chapters.map((chapter, i) => {
          const isActive = chapter.category === activeChapter;
          const first = chapter.entries[0]?.creature;
          const num = <span className="sidebar__num">{String(i + 1).padStart(2, "0")}</span>;

          return (
            <li key={chapter.category}>
              {!first ? (
                // No entries written for this chapter yet
                <span className="sidebar__chapter is-empty">
                  {num}
                  {chapter.title}
                </span>
              ) : (
                <Link
                  to={`/creatures/${first.id}`}
                  className={`sidebar__chapter${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {num}
                  {chapter.title}
                </Link>
              )}
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
