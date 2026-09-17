import { z } from "zod";

export const getCreaturesQuerySchema = z.object({
  query: z.object({
    habitat: z.string().trim().optional(),
    alignment: z
      .enum(["Free Peoples", "Forces of Sauron", "Neutral", "Ungoliant Brood"])
      .optional(),
    minThreat: z.coerce.number().int().min(1).max(10).optional(),
    maxThreat: z.coerce.number().int().min(1).max(10).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
    sortBy: z.enum(["name", "threat_level", "createdAt"]).default("name"),
    order: z.enum(["asc", "desc", "ASC", "DESC"]).default("ASC"),
  }),
});

export const creatureIdParamSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Creature ID is required"),
  }),
});

export const createCreatureSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long"),
    species: z.string().trim().min(2, "Species is required"),
    alignment: z.enum([
      "Free Peoples",
      "Forces of Sauron",
      "Neutral",
      "Ungoliant Brood",
    ]),
    habitat: z.string().trim().min(2, "Habitat is required"),
    threatLevel: z
      .number()
      .int()
      .min(1, "Threat level must be at least 1")
      .max(10, "Threat level cannot exceed 10"),
    description: z.string().trim().min(10, "Description must be at least 10 characters"),
  }),
});

export const updateCreatureSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Creature ID is required"),
  }),
  body: createCreatureSchema.shape.body.partial(),
});

export type GetCreaturesQuery = z.infer<typeof getCreaturesQuerySchema>["query"];
export type CreateCreatureInput = z.infer<typeof createCreatureSchema>["body"];
export type UpdateCreatureInput = z.infer<typeof updateCreatureSchema>["body"];
