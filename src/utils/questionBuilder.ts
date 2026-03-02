import type { Blank } from "../types/types";

/**
 * Build a template sentence that includes the remaining words + underline blanks
 * @param words Each word element in the string
 * @param selectedIndices The indices that have been converted to blanks
 * @returns A new sentence string that includes the reamining words + selected blanks
 */
export const buildTemplateSentence = (
  words: string[],
  selectedIndices: Set<number>,
): string => {
  return words
    .map((word, index) => (selectedIndices.has(index) ? "___" : word))
    .join(" ");
};

export const buildBlanks = (
  words: string[],
  selectedIndices: Set<number>,
): Blank[] => {
  return Array.from(selectedIndices)
    .sort((a, b) => a - b)
    .map((position) => ({
      position,
      text: words[position],
      explanation: "",
    }));
};
