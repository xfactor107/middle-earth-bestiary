import { describe, expect, it } from "vitest";
import { matchesQuery } from "./search";
import { makeCreature } from "../test/fixtures";

const fireDrake = makeCreature({
  name: "Fire-drake",
  category: "DRAGONS",
  description: "Great worms breathing fire and lusting after gold.",
  habitats: [
    {
      creatureId: 1,
      habitatId: 1,
      habitat: { id: 1, name: "Khazad-dûm", description: null },
    },
  ],
  notables: [{ id: 1, name: "Smaug", title: "The Golden", status: "Slain", creatureId: 1 }],
});

describe("matchesQuery", () => {
  it("matches everything when the query is empty or blank", () => {
    expect(matchesQuery(fireDrake, "")).toBe(true);
    expect(matchesQuery(fireDrake, "   ")).toBe(true);
  });

  it.each([
    ["name", "fire-drake"],
    ["chapter title", "dragons"],
    ["description", "gold"],
    ["notable specimen", "smaug"],
    ["notable title", "golden"],
    ["habitat", "Khazad-dûm"],
  ])("finds a creature by its %s", (_, query) => {
    expect(matchesQuery(fireDrake, query)).toBe(true);
  });

  it("ignores case and accents", () => {
    expect(matchesQuery(fireDrake, "KHAZAD-DUM")).toBe(true);
  });

  it("requires every word to match, in any order", () => {
    expect(matchesQuery(fireDrake, "gold smaug")).toBe(true);
    expect(matchesQuery(fireDrake, "gold eagle")).toBe(false);
  });

  it("does not match unrelated words", () => {
    expect(matchesQuery(fireDrake, "treebeard")).toBe(false);
  });
});
