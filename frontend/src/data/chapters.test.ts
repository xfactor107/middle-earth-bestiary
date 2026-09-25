import { describe, expect, it } from "vitest";
import { buildChapters, chapterTitle } from "./chapters";
import { makeCreature } from "../test/fixtures";

describe("buildChapters", () => {
  // Already in codex order, as the API returns them
  const creatures = [
    makeCreature({ id: 1, name: "Balrog", category: "MAIAR" }),
    makeCreature({ id: 6, name: "Werewolf", category: "MAIAR" }),
    makeCreature({ id: 9, name: "Fire-drake", category: "DRAGONS" }),
  ];

  it("lists all seven chapters in codex order", () => {
    expect(buildChapters(creatures).map((c) => c.title)).toEqual([
      "Maiar",
      "Orcs",
      "Trolls",
      "Beasts",
      "Dragons",
      "Ents",
      "Birds",
    ]);
  });

  it("groups entries into their chapters with their page numbers", () => {
    const chapters = buildChapters(creatures);
    const maiar = chapters.find((c) => c.category === "MAIAR")!;
    const dragons = chapters.find((c) => c.category === "DRAGONS")!;

    expect(maiar.entries.map((e) => [e.creature.name, e.page])).toEqual([
      ["Balrog", 1],
      ["Werewolf", 2],
    ]);
    // Pages count across the whole codex, not within the chapter
    expect(dragons.entries.map((e) => [e.creature.name, e.page])).toEqual([["Fire-drake", 3]]);
  });

  it("leaves chapters with no creatures empty", () => {
    const orcs = buildChapters(creatures).find((c) => c.category === "ORCS")!;
    expect(orcs.entries).toEqual([]);
  });
});

describe("chapterTitle", () => {
  it("gives the display title for a category", () => {
    expect(chapterTitle("BIRDS")).toBe("Birds");
  });
});
