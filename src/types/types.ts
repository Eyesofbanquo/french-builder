export interface AnswerChoice {
  text: string;
  explanation: string; // the explanation shown after answering
}

export interface Blank extends AnswerChoice {
  position: number; // which word index in the sentence was clicked out
}

export interface Question {
  id: string;
  template: string; // the sentence with blanks e.g. "Je ___ donne le livre"
  blanks: Blank[]; // one entry per blank in order
  options: AnswerChoice[]; // the word chips shown as answer choices for this question
  translation: string; // the English translation shown faded below
}

export interface Level {
  id: string;
  title: string; // e.g. "Direct Object Pronouns - Intro"
  passMark: number; // minimum correct to pass
  skipMark: number; // streak needed to auto-skip
  questionIds: string[]; // references to Question documents in Firestore
}

export interface Question {
  id: string;
  templateString: string;
  blanks: Blank[];
  options: AnswerChoice[];
  translation: string;
}
