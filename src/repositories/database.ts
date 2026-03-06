import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Level, Question } from "../types/types";

const LEVEL_DOCUMENT = "levels";
const QUESTION_DOCUMENT = "questions";

export const getLevels = async (): Promise<Level[]> => {
  try {
    const snapshot = await getDocs(collection(db, LEVEL_DOCUMENT));
    const data = snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Level, "id">),
      id: doc.id,
    }));
    return data;
  } catch {
    return [];
  }
};

export const addLevel = async (
  newLevel: Omit<Level, "id">,
): Promise<Level | undefined> => {
  try {
    const createdLevelRef = await addDoc(
      collection(db, LEVEL_DOCUMENT),
      newLevel,
    );
    const createdLevel = { ...newLevel, id: createdLevelRef.id };
    return createdLevel;
  } catch {
    console.error("Error adding new level");
  }
};

export const addQuestion = async (
  newQuestion: Question,
): Promise<Question | undefined> => {
  try {
    const addedQuestionRef = await addDoc(
      collection(db, QUESTION_DOCUMENT),
      newQuestion,
    );
    return { ...newQuestion, id: addedQuestionRef.id };
  } catch {
    console.error("Error adding new question");
  }
};

export const updateLevel = async (
  selectedLevelId: string,
  questionToAddId: string,
) => {
  try {
    await updateDoc(doc(db, LEVEL_DOCUMENT, selectedLevelId), {
      questionIds: arrayUnion(questionToAddId),
    });
  } catch {
    console.error("Error updating level with new question");
  }
};
