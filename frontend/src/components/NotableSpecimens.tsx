import type { NotableBeast } from "../types/creature";
import "./NotableSpecimens.css";

// How each recorded fate is written in the margin
function fate(status: string): string {
  switch (status.toLowerCase()) {
    case "slain":
      return "† Slain";
    case "unknown":
      return "Fate unknown";
    default:
      return status;
  }
}

export default function NotableSpecimens({ notables }: { notables: NotableBeast[] }) {
  if (notables.length === 0) return null;

  return (
    <section className="notables" aria-labelledby="notables-heading">
      <h2 id="notables-heading" className="notables__heading">
        Notable Specimens
      </h2>
      <ul className="notables__list">
        {notables.map((notable) => (
          <li key={notable.id} className="notables__item">
            <span>
              <span className="notables__name">{notable.name}</span>{" "}
              <span className="notables__fate">{fate(notable.status)}</span>
            </span>
            {notable.title && <em className="notables__title">{notable.title}</em>}
          </li>
        ))}
      </ul>
    </section>
  );
}
