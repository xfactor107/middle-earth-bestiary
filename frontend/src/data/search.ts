import { chapterTitle } from "./chapters";
import type { Creature } from "../types/creature";

// Lowercase and strip accents, so "khazad-dum" finds "Khazad-dûm"
const normalize = (text: string) =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

// Everything a reader might search a creature by
function searchableText(creature: Creature): string {
  return normalize(
    [
      creature.name,
      chapterTitle(creature.category),
      creature.taxonomy,
      creature.description,
      creature.behavior,
      creature.master,
      ...creature.habitats.map(({ habitat }) => habitat.name),
      ...creature.notables.flatMap((notable) => [notable.name, notable.title]),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

// True when every word of the query appears somewhere in the creature's entry
export function matchesQuery(creature: Creature, query: string): boolean {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const text = searchableText(creature);
  return words.every((word) => text.includes(word));
}
