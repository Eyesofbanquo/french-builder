import { useState, type ReactNode } from "react";
import type { Blank, AnswerChoice, Question } from "../../types/types";
import type { Step } from "./QuestionBuilderContextTypes";
import { QuestionBuilderContext } from "./QuestionBuilderContext";

export function QuestionBuilderProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>("input");
  const [sentence, setSentence] = useState("");
  const [templateString, setTemplateString] = useState("");
  const [blanks, setBlanks] = useState<Blank[]>([]);
  const [options, setOptions] = useState<AnswerChoice[]>([]);
  const [translation, setTranslation] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);

  const reset = () => {
    setStep("input");
    setSentence("");
    setTemplateString("");
    setBlanks([]);
    setOptions([]);
    setTranslation("");
    setCurrentQuestion(null);
    setSelectedLevelId(null);
  }

  return (
    <QuestionBuilderContext.Provider
      value={{
        step,
        sentence,
        templateString,
        blanks,
        options,
        translation,
        currentQuestion,
        selectedLevelId,
        setStep,
        setSentence,
        setTemplateString,
        setBlanks,
        setOptions,
        setTranslation,
        setCurrentQuestion,
        setSelectedLevelId,
        reset,
      }}>
      {children}
    </QuestionBuilderContext.Provider>
  )
}