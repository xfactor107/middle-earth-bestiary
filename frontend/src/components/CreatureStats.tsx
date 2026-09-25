import DangerRating from "./DangerRating";
import type { Creature } from "../types/creature";
import "./CreatureStats.css";

export default function CreatureStats({ creature }: { creature: Creature }) {
  const habitats = creature.habitats.map(({ habitat }) => habitat.name).join(", ");

  const rows: Array<[string, string | null]> = [
    ["Taxonomy", creature.taxonomy],
    ["Habitat", habitats || null],
    ["Behavior", creature.behavior],
  ];

  return (
    <dl className="stats">
      {rows.map(([label, value]) => (
        <div className="stats__row" key={label}>
          <dt>{label}</dt>
          <dd>{value ?? "Unrecorded"}</dd>
        </div>
      ))}
      {creature.dangerRating != null && (
        <div className="stats__row stats__row--danger">
          <dt>Danger Level</dt>
          <dd>
            <DangerRating rating={creature.dangerRating} />
          </dd>
        </div>
      )}
    </dl>
  );
}
