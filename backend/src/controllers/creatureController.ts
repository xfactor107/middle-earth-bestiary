import type { Request, Response, NextFunction } from "express";
import type { Prisma } from "@prisma/client";
import prisma from "../lib/prisma.js";
import type {
  GetCreaturesQuery,
  CreateCreatureInput,
  UpdateCreatureInput,
} from "../schemas/creature.schema.js";

// Every creature response carries its habitats and notable beasts
const creatureInclude = {
  habitats: {
    include: {
      habitat: true,
    },
  },
  notables: true,
} satisfies Prisma.CreatureInclude;

export const getCreatures = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Already coerced and defaulted by getCreaturesQuerySchema
    const {
      search,
      habitat,
      originEra,
      taxonomy,
      dangerRating,
      threatLevel,
      page,
      limit,
      sortBy,
      order,
    } = req.query as unknown as GetCreaturesQuery;

    const skip = (page - 1) * limit;

    const where: Prisma.CreatureWhereInput = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(originEra && { originEra: { equals: originEra } }),
      ...(taxonomy && { taxonomy: { equals: taxonomy, mode: "insensitive" } }),
      ...(dangerRating && { dangerRating: { equals: dangerRating } }),
      ...(threatLevel && {
        threatLevel: { equals: threatLevel, mode: "insensitive" },
      }),
      ...(habitat && {
        habitats: {
          some: {
            habitat: {
              name: { contains: habitat, mode: "insensitive" },
            },
          },
        },
      }),
    };

    const [totalCount, creatures] = await prisma.$transaction([
      prisma.creature.count({ where }),
      prisma.creature.findMany({
        where,
        take: limit,
        skip,
        orderBy: { [sortBy]: order.toLowerCase() as Prisma.SortOrder },
        include: creatureInclude,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      data: creatures,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: page,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCreatureById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const creature = await prisma.creature.findUnique({
      where: { id: Number(req.params.id) },
      include: creatureInclude,
    });

    if (!creature) {
      res.status(404).json({ error: "Creature not found" });
      return;
    }

    res.status(200).json(creature);
  } catch (error) {
    next(error);
  }
};

export const createCreature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCreature = await prisma.creature.create({
      data: req.body as CreateCreatureInput as Prisma.CreatureCreateInput,
      include: creatureInclude,
    });

    res.status(201).json(newCreature);
  } catch (error) {
    next(error);
  }
};

export const updateCreature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCreature = await prisma.creature.update({
      where: { id: Number(req.params.id) },
      data: req.body as UpdateCreatureInput as Prisma.CreatureUpdateInput,
      include: creatureInclude,
    });

    res.status(200).json(updatedCreature);
  } catch (error) {
    next(error);
  }
};

export const deleteCreature = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.creature.delete({
      where: { id: Number(req.params.id) },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
