import { Link } from "react-router";
import { TreeEmblem } from "./Ornaments";
import type { Chapter } from "../data/chapters";
import "./SidebarIndex.css";

interface SidebarIndexProps {
  chapters: Chapter[];
  activeChapter: string | null;
}

export default function SidebarIndex({ chapters, activeChapter }: SidebarIndexProps) {
  return (
    <nav className="sidebar" aria-label="Bestiary chapters">
      <Link to="/" className="sidebar__back">
        <span aria-hidden="true">‹</span> Back to Index
      </Link>

      <ol className="sidebar__chapters">
        {chapters.map((chapter, i) => {
          const isActive = chapter.name.toLowerCase() === activeChapter?.toLowerCase();
          const num = <span className="sidebar__num">{String(i + 1).padStart(2, "0")}</span>;

          return (
            <li key={chapter.name}>
              {chapter.firstCreatureId == null ? (
                // No entries written for this chapter yet
                <span className="sidebar__chapter is-empty">
                  {num}
                  {chapter.name}
                </span>
              ) : (
                <Link
                  to={`/creatures/${chapter.firstCreatureId}`}
                  className={`sidebar__chapter${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {num}
                  {chapter.name}
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
