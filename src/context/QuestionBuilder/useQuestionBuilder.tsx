import { useContext } from "react";
import { QuestionBuilderContext } from "./QuestionBuilderContext";

export function useQuestionBuilder() {
  const context = useContext(QuestionBuilderContext);
  if (!context)
    throw new Error("useQuestionBuilder must be used within QuestionBuilderProvider")
  return context;
}