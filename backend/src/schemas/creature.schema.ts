import { z } from "zod";

const categorySchema = z.enum(["MAIAR", "ORCS", "TROLLS", "BEASTS", "DRAGONS", "ENTS", "BIRDS"]);

const anatomicalSketchSchema = z.object({
  title: z.string().trim().min(1, "Sketch title is required"),
  imageUrl: z.string().trim().min(1, "Sketch image URL is required"),
});

export const getCreaturesQuerySchema = z.object({
  query: z.object({
    search: z.string().trim().optional(),
    habitat: z.string().trim().optional(),
    category: categorySchema.optional(),
    originEra: z
      .enum(["YEARS_OF_THE_TREES", "FIRST_AGE", "SECOND_AGE", "THIRD_AGE"])
      .optional(),
    taxonomy: z.string().trim().optional(),
    dangerRating: z.coerce.number().int().min(1).max(5).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
    // "category" is codex order: by chapter, then name
    sortBy: z.enum(["category", "name", "dangerRating", "createdAt"]).default("category"),
    order: z.enum(["asc", "desc", "ASC", "DESC"]).default("asc"),
  }),
});

export const creatureIdParamSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("Creature ID must be a valid integer"),
  }),
});

export const createCreatureSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters long"),
    category: categorySchema,
    originEra: z
      .enum(["YEARS_OF_THE_TREES", "FIRST_AGE", "SECOND_AGE", "THIRD_AGE"])
      .default("THIRD_AGE"),
    master: z.string().trim().optional().nullable(),
    description: z.string().trim().min(10, "Description must be at least 10 characters"),

    // Codex / Manuscript Additions
    taxonomy: z.string().trim().optional().nullable(),
    behavior: z.string().trim().optional().nullable(),
    dangerRating: z.coerce.number().int().min(1).max(5).default(1),
    imageUrl: z.string().trim().optional().nullable(),
    figureCaption: z.string().trim().optional().nullable(),
    anatomicalSketches: z.array(anatomicalSketchSchema).optional().default([]),
  }),
});

export const updateCreatureSchema = z.object({
  params: creatureIdParamSchema.shape.params,
  body: createCreatureSchema.shape.body.partial(),
});

export type GetCreaturesQuery = z.infer<typeof getCreaturesQuerySchema>["query"];
export type CreateCreatureInput = z.infer<typeof createCreatureSchema>["body"];
export type UpdateCreatureInput = z.infer<typeof updateCreatureSchema>["body"];
export type AnatomicalSketchInput = z.infer<typeof anatomicalSketchSchema>;
