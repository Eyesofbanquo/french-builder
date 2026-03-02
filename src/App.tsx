import { useState } from 'react';
import SentenceInputScreen from './screens/SentenceInputScreen';
import type { Blank } from './types/types';
import WordSelectionScreen from './screens/WordSelectionScreen';

type Step = "input" | "word-selection";

function App() {
  const [step, setStep] = useState<Step>("input")
  const [sentence, setSentence] = useState<string>("");
  const [templateSentence, setTemplateSentence] = useState("");
  const [blanks, setBlanks] = useState<Blank[]>([]);

  const handleSentenceSubmit = (newSentence: string) => {
    setSentence(newSentence)
    setStep("word-selection")
  };

  const handleWordSelectionSubmit = (template: string, blanksArray: Blank[]) => {
    setTemplateSentence(template)
    setBlanks(blanksArray)
  }

  if (step === "input") {
    return <SentenceInputScreen onSubmit={handleSentenceSubmit} />
  }

  if (step === "word-selection") {
    return (
      <WordSelectionScreen
        originalSentence={sentence}
        onSubmit={handleWordSelectionSubmit} />
    )
  }

  return (
    <div>Next screen - sentence: {sentence}</div>
  )
}

export default App
