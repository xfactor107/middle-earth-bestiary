import prisma from "../lib/prisma.js";

export const getCreatures = async (req, res, next) => {
  try {
    const {
      search,
      habitat,
      originEra,
      taxonomy,
      dangerRating,
      threatLevel,
      page = 1,
      limit = 10,
      sortBy = "pageNumber",
      order = "asc",
    } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const take = Math.max(1, Math.min(50, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * take;

    // Sorting whitelist matching updated Prisma schema
    const validSortFields = [
      "name",
      "dangerRating",
      "threatLevel",
      "originEra",
      "createdAt",
      "pageNumber",
    ];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "pageNumber";
    const sortDirection = order.toLowerCase() === "desc" ? "desc" : "asc";

    // Build dynamic filter query
    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(originEra && { originEra: { equals: originEra } }),
      ...(taxonomy && { taxonomy: { equals: taxonomy, mode: "insensitive" } }),
      ...(dangerRating && {
        dangerRating: { equals: parseInt(dangerRating, 10) },
      }),
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
        take,
        skip,
        orderBy: { [sortField]: sortDirection },
        include: {
          habitats: {
            include: {
              habitat: true,
            },
          },
          notables: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    res.status(200).json({
      data: creatures,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: pageNum,
        limit: take,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCreatureById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const creature = await prisma.creature.findUnique({
      where: { id },
      include: {
        habitats: {
          include: {
            habitat: true,
          },
        },
        notables: true,
      },
    });

    if (!creature) {
      return res.status(404).json({ error: "Creature not found" });
    }

    res.status(200).json(creature);
  } catch (error) {
    next(error);
  }
};

export const createCreature = async (req, res, next) => {
  try {
    const {
      name,
      originEra,
      master,
      threatLevel,
      description,
      taxonomy,
      behavior,
      dangerRating,
      imageUrl,
      figureCaption,
      pageNumber,
      totalPages,
      anatomicalSketches,
    } = req.body;

    const newCreature = await prisma.creature.create({
      data: {
        name,
        originEra,
        master,
        threatLevel,
        description,
        taxonomy,
        behavior,
        dangerRating,
        imageUrl,
        figureCaption,
        pageNumber,
        totalPages,
        anatomicalSketches,
      },
      include: {
        habitats: {
          include: {
            habitat: true,
          },
        },
        notables: true,
      },
    });

    res.status(201).json(newCreature);
  } catch (error) {
    next(error);
  }
};

export const updateCreature = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const updatedCreature = await prisma.creature.update({
      where: { id },
      data: req.body,
      include: {
        habitats: {
          include: {
            habitat: true,
          },
        },
        notables: true,
      },
    });

    res.status(200).json(updatedCreature);
  } catch (error) {
    next(error);
  }
};

export const deleteCreature = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.creature.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
