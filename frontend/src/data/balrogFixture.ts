import type { Creature } from "../types/creature";

// Snapshot of GET /api/creatures/1, used until the page fetches live data
export const balrogFixture: Creature = {
  id: 1,
  name: "Balrog",
  originEra: "YEARS_OF_THE_TREES",
  master: "Morgoth",
  threatLevel: "Extreme",
  description:
    "Demonic beings of shadow and flame, corrupted Maiar who joined Morgoth’s rebellion.",
  createdAt: "2026-09-08T17:18:11.215Z",
  taxonomy: "Maiar",
  behavior: "Solitary, territorial, draws to light and sound",
  dangerRating: 4,
  imageUrl: "/images/balrog-plate.png",
  figureCaption: "Fig. 1 — The Balrog",
  pageNumber: 1,
  totalPages: 16,
  anatomicalSketches: [
    { title: "Flame whip (detail)", imageUrl: "/images/flame-whip.png" },
    { title: "Horn structure (front view)", imageUrl: "/images/horn-structure.png" },
  ],
  habitats: [
    {
      creatureId: 1,
      habitatId: 1,
      habitat: {
        id: 1,
        name: "Angband",
        description: "The ancient underground hell-forge of Morgoth.",
      },
    },
  ],
  notables: [
    { id: 1, name: "Gothmog", title: "Lord of Balrogs", status: "Slain", creatureId: 1 },
    { id: 2, name: "Durin's Bane", title: "Terror of Khazad-dûm", status: "Slain", creatureId: 1 },
  ],
};
