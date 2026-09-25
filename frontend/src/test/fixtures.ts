import type { Creature } from "../types/creature";

// A complete creature with sensible defaults; override only what a test cares about
export function makeCreature(overrides: Partial<Creature> = {}): Creature {
  return {
    id: 1,
    name: "Balrog",
    category: "MAIAR",
    originEra: "YEARS_OF_THE_TREES",
    master: "Morgoth",
    description: "A fallen Maia wreathed in shadow and flame.",
    createdAt: "2026-09-25T00:00:00.000Z",
    taxonomy: "Maiar",
    behavior: "Solitary, territorial",
    dangerRating: 4,
    imageUrl: null,
    figureCaption: null,
    anatomicalSketches: [],
    habitats: [],
    notables: [],
    ...overrides,
  };
}
