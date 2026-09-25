import Engraving from "./Engraving";
import type { AnatomicalSketch } from "../types/creature";
import "./DetailDrawings.css";

export default function DetailDrawings({ sketches }: { sketches: AnatomicalSketch[] }) {
  if (sketches.length === 0) return null;

  return (
    <div className="sketches">
      {sketches.map((sketch) => (
        <figure className="sketches__item" key={sketch.title}>
          <Engraving src={sketch.imageUrl} alt={sketch.title} className="sketches__art" />
          <figcaption>{sketch.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
