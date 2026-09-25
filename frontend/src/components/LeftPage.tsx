import SidebarIndex from "./SidebarIndex";
import MainIllustration from "./MainIllustration";
import { CompassRose } from "./Ornaments";
import type { Creature } from "../types/creature";
import "./LeftPage.css";

export default function LeftPage({ creature }: { creature: Creature }) {
  return (
    <section className="page page--left">
      <header className="masthead">
        <CompassRose className="masthead__compass" />
        <h1 className="masthead__title">Tolkien Bestiary</h1>
      </header>

      <div className="left-page__body">
        <SidebarIndex activeChapter={creature.taxonomy} />
        <MainIllustration
          name={creature.name}
          imageUrl={creature.imageUrl}
          caption={creature.figureCaption}
        />
      </div>
    </section>
  );
}
