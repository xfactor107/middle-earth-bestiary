import type { ReactNode } from "react";
import SidebarIndex from "./SidebarIndex";
import { CompassRose } from "./Ornaments";
import type { Chapter } from "../data/chapters";
import type { Category } from "../types/creature";
import "./LeftPage.css";

interface LeftPageProps {
  chapters: Chapter[];
  activeChapter: Category | null;
  currentPage?: number | null;
  // Fills the column beside the sidebar, usually a plate
  children?: ReactNode;
}

export default function LeftPage({ chapters, activeChapter, currentPage, children }: LeftPageProps) {
  return (
    <section className="page page--left">
      <header className="masthead">
        <CompassRose className="masthead__compass" />
        <p className="masthead__title">Tolkien Bestiary</p>
      </header>

      <div className="left-page__body">
        <SidebarIndex chapters={chapters} activeChapter={activeChapter} currentPage={currentPage} />
        {children}
      </div>
    </section>
  );
}
