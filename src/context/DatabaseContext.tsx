import { type ReactNode } from 'react';
import { addLevel, addQuestion, getLevels, saveQuestion, updateLevel } from '../repositories/database';
import type { Level, Question } from '../types/types';
import { DatabaseContext } from './useDatabase';

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {

  const handleGetLevels: () => Promise<Level[]> = getLevels
  const handleAddLevel: (newLevel: Omit<Level, "id">) => Promise<Level | undefined> = addLevel
  const handleAddQuestion: (newQuestion: Question) => Promise<Question | undefined> = addQuestion
  const handleUpdateLevel: (
    selectedLevelId: string,
    questionToAddId: string,
  ) => Promise<void> = updateLevel
  const handleSaveQuestion: (question: Question, levelId: string) => Promise<void> = saveQuestion;

  return (
    <DatabaseContext.Provider
      value={{
        handleGetLevels,
        handleAddLevel,
        handleAddQuestion,
        handleUpdateLevel,
        handleSaveQuestion
      }}>
      {children}
    </DatabaseContext.Provider>
  )
}