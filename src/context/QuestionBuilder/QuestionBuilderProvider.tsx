import { useState, type ReactNode } from "react";
import type { Blank, AnswerChoice } from "../../types/types";
import type { Step } from "./QuestionBuilderContextTypes";
import { QuestionBuilderContext } from "./QuestionBuilderContext";

export function QuestionBuilderProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>("input");
  const [sentence, setSentence] = useState("");
  const [templateString, setTemplateString] = useState("");
  const [blanks, setBlanks] = useState<Blank[]>([]);
  const [options, setOptions] = useState<AnswerChoice[]>([]);
  const [translation, setTranslation] = useState("");

  return (
    <QuestionBuilderContext.Provider
      value={{
        step,
        sentence,
        templateString,
        blanks,
        options,
        translation,
        setStep,
        setSentence,
        setTemplateString,
        setBlanks,
        setOptions,
        setTranslation
      }}>
      {children}
    </QuestionBuilderContext.Provider>
  )
}