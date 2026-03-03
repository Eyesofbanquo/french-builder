import type { AnswerChoice, Blank } from "../../types/types";

export type Step =
  | "input"
  | "word-selection"
  | "blanks-editor"
  | "options-builder"
  | "json-preview"
  | "level-assignment"

export interface QuestionBuilderState {
  step: Step; // Which part of the app you're in
  sentence: string; // The original sentence that the user has created sans blanks
  templateString: string; // The sentence that contains the blanks
  blanks: Blank[]; // The blanks from the template string
  options: AnswerChoice[]; // The answer choice options
  translation: string; // The translated sentence
}

export interface QuestionBuilderActions extends QuestionBuilderState {
  setStep: (step: Step) => void;
  setSentence: (sentence: string) => void;
  setTemplateString: (templateString: string) => void;
  setBlanks: (blanks: Blank[]) => void;
  setOptions: (options: AnswerChoice[]) => void;
  setTranslation: (translation: string) => void;
}

export type QuestionBuilderContextType = QuestionBuilderState & QuestionBuilderActions