import { useState } from "react";
import "./Engraving.css";

interface EngravingProps {
  src: string | null;
  alt: string;
  className?: string;
}

// An illustration printed onto the page. Falls back to a hatched placeholder
// when the artwork is missing or fails to load.
export default function Engraving({ src, alt, className = "" }: EngravingProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
    return (
      <div className={`engraving engraving--missing ${className}`} role="img" aria-label={alt}>
        <span className="engraving__note">Plate forthcoming</span>
      </div>
    );
  }

  return (
    <div className={`engraving ${className}`}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailedSrc(src)} />
    </div>
  );
}
