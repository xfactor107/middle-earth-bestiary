import { describe, expect, it } from "vitest";
import { lineage } from "./lineage";
import { makeCreature } from "../test/fixtures";

describe("lineage", () => {
  it("names the era and the master", () => {
    expect(lineage(makeCreature())).toBe("Of the Years of the Trees · Servant of Morgoth");
  });

  it("leaves out the master when there is none", () => {
    expect(lineage(makeCreature({ originEra: "THIRD_AGE", master: null }))).toBe(
      "Of the Third Age",
    );
  });

  it("notes an undated creature as of an unrecorded age", () => {
    expect(lineage(makeCreature({ originEra: null, master: null }))).toBe("Of an unrecorded age");
  });
});
