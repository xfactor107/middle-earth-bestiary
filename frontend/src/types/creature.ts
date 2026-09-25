// Mirrors the JSON returned by GET /api/creatures/:id

export type Era = "YEARS_OF_THE_TREES" | "FIRST_AGE" | "SECOND_AGE" | "THIRD_AGE";

export interface AnatomicalSketch {
  title: string;
  imageUrl: string;
}

export interface Habitat {
  id: number;
  name: string;
  description: string | null;
}

export interface CreatureHabitat {
  creatureId: number;
  habitatId: number;
  habitat: Habitat;
}

export interface NotableBeast {
  id: number;
  name: string;
  title: string | null;
  status: string;
  creatureId: number;
}

export interface Creature {
  id: number;
  name: string;
  originEra: Era;
  master: string | null;
  threatLevel: string;
  description: string;
  createdAt: string;
  taxonomy: string | null;
  behavior: string | null;
  dangerRating: number | null;
  imageUrl: string | null;
  figureCaption: string | null;
  pageNumber: number | null;
  totalPages: number;
  anatomicalSketches: AnatomicalSketch[];
  habitats: CreatureHabitat[];
  notables: NotableBeast[];
}

// GET /api/creatures
export interface CreatureListResponse {
  data: Creature[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
