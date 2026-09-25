import type { Category, Creature } from "../types/creature";

// Chapter titles, in the same order as the Category enum (and so the codex)
const CHAPTER_TITLES: Record<Category, string> = {
  MAIAR: "Maiar",
  ORCS: "Orcs",
  TROLLS: "Trolls",
  BEASTS: "Beasts",
  DRAGONS: "Dragons",
  ENTS: "Ents",
  BIRDS: "Birds",
};

export interface Chapter {
  category: Category;
  title: string;
  // Entries in codex order, each with its page number
  entries: Array<{ creature: Creature; page: number }>;
}

// Groups the codex (already in chapter order) into its chapters
export function buildChapters(creatures: Creature[]): Chapter[] {
  return (Object.keys(CHAPTER_TITLES) as Category[]).map((category) => ({
    category,
    title: CHAPTER_TITLES[category],
    entries: creatures
      .map((creature, i) => ({ creature, page: i + 1 }))
      .filter(({ creature }) => creature.category === category),
  }));
}
