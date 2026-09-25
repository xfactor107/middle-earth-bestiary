import type { Creature } from "../types/creature";

// Placeholder chapters until creatures carry a category of their own;
// for now a creature belongs to the chapter matching its taxonomy
const CHAPTER_NAMES = ["Maiar", "Orcs", "Beasts", "Ents", "Dragons", "Great Eagles"];

export interface Chapter {
  name: string;
  // First entry in the chapter, or null when the codex has none yet
  firstCreatureId: number | null;
}

export function buildChapters(creatures: Creature[]): Chapter[] {
  return CHAPTER_NAMES.map((name) => ({
    name,
    firstCreatureId:
      creatures.find((c) => c.taxonomy?.toLowerCase() === name.toLowerCase())?.id ?? null,
  }));
}
