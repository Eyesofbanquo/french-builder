import { createContext, useContext } from "react";
import type { Level, Question } from "../types/types";

interface DatabaseContextType {
  handleGetLevels: () => Promise<Level[]>
  handleAddLevel: (newLevel: Omit<Level, "id">) => Promise<Level | undefined>
  handleAddQuestion: (newQuestion: Question) => Promise<Question | undefined>
  handleUpdateLevel: (
    selectedLevelId: string,
    questionToAddId: string,
  ) => Promise<void>
  handleSaveQuestion: (question: Question, levelId: string) => Promise<void>
}

export const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within QuestionBuilderProvider")
  }
  return context
}