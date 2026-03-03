import { createContext } from "react";
import type { QuestionBuilderContextType } from "./QuestionBuilderContextTypes";

export const QuestionBuilderContext = createContext<QuestionBuilderContextType | null>(null);
