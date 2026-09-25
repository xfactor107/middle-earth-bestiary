import TurnLink from "./TurnLink";
import { TreeEmblem } from "./Ornaments";
import type { Chapter } from "../data/chapters";
import type { Category } from "../types/creature";
import "./SidebarIndex.css";

interface SidebarIndexProps {
  chapters: Chapter[];
  activeChapter: Category | null;
  // Page of the open entry, so chapter links know which way to turn
  currentPage?: number | null;
}

export default function SidebarIndex({ chapters, activeChapter, currentPage = null }: SidebarIndexProps) {
  return (
    <nav className="sidebar" aria-label="Bestiary chapters">
      <TurnLink to="/" direction="back" className="sidebar__back">
        <span aria-hidden="true">‹</span> Back to Index
      </TurnLink>

      {/* Status pages have no chapters yet; skip the list so its rules don't show */}
      {chapters.length > 0 && (
        <ol className="sidebar__chapters">
          {chapters.map((chapter, i) => {
            const isActive = chapter.category === activeChapter;
            const first = chapter.entries[0];
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
                  <TurnLink
                    to={`/creatures/${first.creature.id}`}
                    direction={currentPage != null && first.page < currentPage ? "back" : "forward"}
                    className={`sidebar__chapter${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {num}
                    {chapter.title}
                  </TurnLink>
                )}
              </li>
            );
          })}
        </ol>
      )}

      <div className="sidebar__emblem">
        <TreeEmblem className="sidebar__tree" />
        <p>Middle-earth Bestiary</p>
      </div>
    </nav>
  );
}
