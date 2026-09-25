import Engraving from "./Engraving";
import type { AnatomicalSketch } from "../types/creature";
import "./DetailDrawings.css";

interface DetailDrawingsProps {
  // The creature drawn, so each sketch's alt text says whose anatomy it shows
  name: string;
  sketches: AnatomicalSketch[];
}

export default function DetailDrawings({ name, sketches }: DetailDrawingsProps) {
  if (sketches.length === 0) return null;

  return (
    <div className="sketches">
      {sketches.map((sketch) => (
        <figure className="sketches__item" key={sketch.title}>
          <Engraving
            src={sketch.imageUrl}
            alt={`Anatomical sketch of the ${name}: ${sketch.title}`}
            className="sketches__art"
          />
          <figcaption>{sketch.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
