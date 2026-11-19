import type { Creature, Era } from "../types/creature";

const ERA_NAMES: Record<Era, string> = {
  YEARS_OF_THE_TREES: "the Years of the Trees",
  FIRST_AGE: "the First Age",
  SECOND_AGE: "the Second Age",
  THIRD_AGE: "the Third Age",
};

// The line under an entry's name, e.g. "Of the Years of the Trees · Servant of Morgoth".
// A creature no source dates is "Of an unrecorded age", as a scribe would note it.
export function lineage(creature: Creature): string {
  const era = creature.originEra ? ERA_NAMES[creature.originEra] : "an unrecorded age";
  const parts = [`Of ${era}`];
  if (creature.master) parts.push(`Servant of ${creature.master}`);
  return parts.join(" · ");
}
