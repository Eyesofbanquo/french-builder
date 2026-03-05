import { type ReactNode } from 'react';
import { addLevel, addQuestion, getLevels, updateLevel } from '../repositories/database';
import type { Level, Question } from '../types/types';
import { DatabaseContext } from './useDatabase';

export const DatabaseProvider = ({ children }: { children: ReactNode }) => {

  const handleGetLevels: () => Promise<Level[]> = getLevels
  const handleAddLevel: (newLevel: Level) => Promise<Level | undefined> = addLevel
  const handleAddQuestion: (newQuestion: Question) => Promise<Question | undefined> = addQuestion
  const handleUpdateLevel: (
    selectedLevelId: string,
    questionToAddId: string,
  ) => void = updateLevel

  return (
    <DatabaseContext.Provider
      value={{
        handleGetLevels,
        handleAddLevel,
        handleAddQuestion,
        handleUpdateLevel
      }}>
      {children}
    </DatabaseContext.Provider>
  )
}