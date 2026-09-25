import request from "supertest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Prisma } from "@prisma/client";

// Stand-in for the database, so tests run offline and never touch real data
const db = vi.hoisted(() => ({
  creature: {
    findMany: vi.fn(),
    count: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  $transaction: vi.fn((queries: Promise<unknown>[]) => Promise.all(queries)),
}));
vi.mock("../src/lib/prisma.js", () => ({ default: db }));

const { default: app } = await import("../src/app.js");

const balrog = { id: 1, name: "Balrog", category: "MAIAR", habitats: [], notables: [] };

const prismaError = (code: string) =>
  new Prisma.PrismaClientKnownRequestError(`Prisma error ${code}`, {
    code,
    clientVersion: "test",
  });

const validCreature = {
  name: "Barrow-wight",
  category: "MAIAR",
  description: "Evil spirits that haunt the barrows of the dead.",
};

beforeEach(() => {
  vi.clearAllMocks();
  db.creature.findMany.mockResolvedValue([balrog]);
  db.creature.count.mockResolvedValue(1);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("GET /api/creatures", () => {
  it("returns creatures with pagination", async () => {
    const res = await request(app).get("/api/creatures");

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([balrog]);
    expect(res.body.pagination).toEqual({
      totalItems: 1,
      totalPages: 1,
      currentPage: 1,
      limit: 10,
      hasNextPage: false,
      hasPrevPage: false,
    });
  });

  it("sorts in codex order (chapter, then name) by default", async () => {
    await request(app).get("/api/creatures");

    expect(db.creature.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: [{ category: "asc" }, { name: "asc" }] }),
    );
  });

  it("turns page and limit into skip and take", async () => {
    db.creature.count.mockResolvedValue(12);
    const res = await request(app).get("/api/creatures?page=2&limit=5");

    expect(db.creature.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 5, take: 5 }),
    );
    expect(res.body.pagination).toMatchObject({
      totalPages: 3,
      currentPage: 2,
      hasNextPage: true,
      hasPrevPage: true,
    });
  });

  it("filters by category and searches names and descriptions", async () => {
    await request(app).get("/api/creatures?category=DRAGONS&search=gold");

    const { where } = db.creature.findMany.mock.calls[0]![0];
    expect(where.category).toEqual({ equals: "DRAGONS" });
    expect(where.OR).toEqual([
      { name: { contains: "gold", mode: "insensitive" } },
      { description: { contains: "gold", mode: "insensitive" } },
    ]);
  });

  it.each([
    ["dangerRating=9", "query.dangerRating"],
    ["category=ELVES", "query.category"],
    ["limit=500", "query.limit"],
    ["sortBy=secret", "query.sortBy"],
  ])("rejects %s with a 400 naming the field", async (query, field) => {
    const res = await request(app).get(`/api/creatures?${query}`);

    expect(res.status).toBe(400);
    expect(res.body.errors.map((e: { field: string }) => e.field)).toContain(field);
    expect(db.creature.findMany).not.toHaveBeenCalled();
  });
});

describe("GET /api/creatures/:id", () => {
  it("returns the creature", async () => {
    db.creature.findUnique.mockResolvedValue(balrog);
    const res = await request(app).get("/api/creatures/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(balrog);
    expect(db.creature.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  it("returns 404 when no creature has that id", async () => {
    db.creature.findUnique.mockResolvedValue(null);
    const res = await request(app).get("/api/creatures/999");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Creature not found" });
  });

  it("returns 400 for an id that is not a number", async () => {
    const res = await request(app).get("/api/creatures/abc");

    expect(res.status).toBe(400);
    expect(res.body.errors[0].field).toBe("params.id");
  });
});

describe("write routes", () => {
  it("are disabled when ADMIN_API_KEY is not set", async () => {
    vi.stubEnv("ADMIN_API_KEY", "");

    const responses = await Promise.all([
      request(app).post("/api/creatures").send(validCreature),
      request(app).put("/api/creatures/1").send({ behavior: "Lurks" }),
      request(app).delete("/api/creatures/1"),
    ]);

    for (const res of responses) expect(res.status).toBe(403);
    expect(db.creature.create).not.toHaveBeenCalled();
    expect(db.creature.update).not.toHaveBeenCalled();
    expect(db.creature.delete).not.toHaveBeenCalled();
  });

  describe("with ADMIN_API_KEY set", () => {
    beforeEach(() => vi.stubEnv("ADMIN_API_KEY", "test-secret"));

    it("rejects a missing or wrong x-api-key with 401", async () => {
      const missing = await request(app).delete("/api/creatures/1");
      const wrong = await request(app).delete("/api/creatures/1").set("x-api-key", "nope");

      expect(missing.status).toBe(401);
      expect(wrong.status).toBe(401);
      expect(db.creature.delete).not.toHaveBeenCalled();
    });

    it("creates a creature, filling in defaults", async () => {
      db.creature.create.mockResolvedValue({ id: 17, ...validCreature });
      const res = await request(app)
        .post("/api/creatures")
        .set("x-api-key", "test-secret")
        .send(validCreature);

      expect(res.status).toBe(201);
      expect(db.creature.create.mock.calls[0]![0].data).toEqual({
        ...validCreature,
        originEra: "THIRD_AGE",
        dangerRating: 1,
        anatomicalSketches: [],
      });
    });

    it("validates the body before writing", async () => {
      const res = await request(app)
        .post("/api/creatures")
        .set("x-api-key", "test-secret")
        .send({ name: "X" });

      expect(res.status).toBe(400);
      expect(res.body.errors.map((e: { field: string }) => e.field)).toEqual(
        expect.arrayContaining(["body.name", "body.category", "body.description"]),
      );
      expect(db.creature.create).not.toHaveBeenCalled();
    });

    it("returns 409 when the name is already taken", async () => {
      db.creature.create.mockRejectedValue(prismaError("P2002"));
      const res = await request(app)
        .post("/api/creatures")
        .set("x-api-key", "test-secret")
        .send(validCreature);

      expect(res.status).toBe(409);
    });

    it("returns 404 when updating a creature that does not exist", async () => {
      db.creature.update.mockRejectedValue(prismaError("P2025"));
      const res = await request(app)
        .put("/api/creatures/999")
        .set("x-api-key", "test-secret")
        .send({ behavior: "Lurks" });

      expect(res.status).toBe(404);
    });

    it("deletes a creature", async () => {
      db.creature.delete.mockResolvedValue(balrog);
      const res = await request(app).delete("/api/creatures/1").set("x-api-key", "test-secret");

      expect(res.status).toBe(204);
      expect(db.creature.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});

describe("errors", () => {
  it("returns JSON 404 for unknown routes", async () => {
    const res = await request(app).get("/api/dragons");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Route not found" });
  });

  it("hides unexpected failures behind a 500", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    db.creature.findMany.mockRejectedValue(new Error("connection reset"));
    const res = await request(app).get("/api/creatures");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal Server Error" });
    log.mockRestore();
  });
});

describe("CORS", () => {
  it("only allows the configured origin, ignoring a trailing slash", async () => {
    vi.stubEnv("CORS_ORIGIN", "https://bestiary.example/");
    vi.resetModules();
    const { default: lockedApp } = await import("../src/app.js");

    const allowed = await request(lockedApp)
      .get("/api/creatures")
      .set("Origin", "https://bestiary.example");
    const other = await request(lockedApp)
      .get("/api/creatures")
      .set("Origin", "https://elsewhere.example");

    expect(allowed.headers["access-control-allow-origin"]).toBe("https://bestiary.example");
    expect(other.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
