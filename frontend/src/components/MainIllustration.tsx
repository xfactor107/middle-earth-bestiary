import Engraving from "./Engraving";
import { FrameCorner } from "./Ornaments";
import "./MainIllustration.css";

interface MainIllustrationProps {
  name: string;
  imageUrl: string | null;
  caption: string | null;
}

export default function MainIllustration({ name, imageUrl, caption }: MainIllustrationProps) {
  return (
    <figure className="plate">
      <div className="plate__frame">
        <Engraving src={imageUrl} alt={`Engraved plate of the ${name}`} className="plate__art" />
        <FrameCorner className="plate__corner plate__corner--tl" />
        <FrameCorner className="plate__corner plate__corner--tr" />
        <FrameCorner className="plate__corner plate__corner--br" />
        <FrameCorner className="plate__corner plate__corner--bl" />
      </div>
      {caption && <figcaption className="plate__caption">{caption}</figcaption>}
    </figure>
  );
}
