import { useState } from 'react';
import SentenceInputScreen from './screens/SentenceInputScreen';
import type { Blank, AnswerChoice } from './types/types';
import WordSelectionScreen from './screens/WordSelectionScreen';
import BlanksEditorScreen from './screens/BlanksEditorScreen';
import OptionsBuilderScreen from './screens/OptionsBuilderScreen';

type Step = "input" | "word-selection" | "blanks-editor" | "options-builder";

function App() {
  const [step, setStep] = useState<Step>("input")
  const [sentence, setSentence] = useState<string>("");
  const [templateSentence, setTemplateSentence] = useState("");
  const [blanks, setBlanks] = useState<Blank[]>([]);
  const [options, setOptions] = useState<AnswerChoice[]>([]);

  const handleSentenceSubmit = (newSentence: string) => {
    setSentence(newSentence)
    setStep("word-selection")
  };

  const handleWordSelectionSubmit = (template: string, blanksArray: Blank[]) => {
    setTemplateSentence(template)
    setBlanks(blanksArray)
    setStep("blanks-editor")
  }

  const handleBlanksSubmit = (updatedBlanks: Blank[]) => {
    setBlanks(updatedBlanks);
    setStep('options-builder')
  }

  const handleOptionsSubmit = (choices: AnswerChoice[]) => {
    setOptions(choices)

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

  if (step === "blanks-editor") {
    return (
      <BlanksEditorScreen
        templateString={templateSentence}
        initialBlanks={blanks}
        onSubmit={handleBlanksSubmit}
      />
    )
  }

  if (step === 'options-builder') {
    return (
      <OptionsBuilderScreen
        templateString={templateSentence}
        onSubmit={handleOptionsSubmit}
      />
    )
  }

  return (
    <div>Next screen - sentence: {sentence}</div>
  )
}

export default App
