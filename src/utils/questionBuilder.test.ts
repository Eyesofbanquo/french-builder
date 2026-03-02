import { describe, it, expect } from "vitest";
import { buildTemplateSentence, buildBlanks } from "./questionBuilder";

const words = ["Je", "lui", "donne", "le", "livre"];

describe("buildTemplate", () => {
  it("replaces selected indices with ___", () => {
    const selected = new Set([1]);
    expect(buildTemplateSentence(words, selected)).toBe(
      "Je ___ donne le livre",
    );
  });
  it("replaces multiple selected", () => {
    const selected = new Set([1, 3]);
    const expected = "Je ___ donne ___ livre";
    expect(buildTemplateSentence(words, selected)).toBe(expected);
  });
  it("returns original sentence when nothing is selected", () => {
    const selected = new Set<number>();
    expect(buildTemplateSentence(words, selected)).toBe(
      "Je lui donne le livre",
    );
  });
});

describe("buildBlanks", () => {
  it("builds a blank with correct position and answer", () => {
    const selected = new Set([1]);
    const blanks = buildBlanks(words, selected);
    expect(blanks).toHaveLength(1);
    expect(blanks[0].position).toBe(1);
    expect(blanks[0].answer).toBe("lui");
    expect(blanks[0].explanation).toBe("");
  });

  it("sorts blanks by position regardless of click order", () => {
    const selected = new Set([3, 1]); // clicked 3 first then 1
    const blanks = buildBlanks(words, selected);
    expect(blanks[0].position).toBe(1);
    expect(blanks[1].position).toBe(3);
  });

  it("returns empty array when nothing is selected", () => {
    const selected = new Set<number>();
    expect(buildBlanks(words, selected)).toHaveLength(0);
  });
});
