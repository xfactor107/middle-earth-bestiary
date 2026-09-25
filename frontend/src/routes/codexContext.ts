import { useOutletContext } from "react-router";
import type { Chapter } from "../data/chapters";
import type { Creature } from "../types/creature";

export interface CodexContext {
  // Every entry, in codex order; a creature's page number is its position here
  creatures: Creature[];
  chapters: Chapter[];
}

export const useCodex = () => useOutletContext<CodexContext>();
