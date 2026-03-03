import SentenceInputScreen from './screens/SentenceInputScreen';
import WordSelectionScreen from './screens/WordSelectionScreen';
import BlanksEditorScreen from './screens/BlanksEditorScreen';
import OptionsBuilderScreen from './screens/OptionsBuilderScreen';
import { useQuestionBuilder } from './context/QuestionBuilder/useQuestionBuilder';
import { QuestionBuilderProvider } from './context/QuestionBuilder/QuestionBuilderProvider';

const AppContent = () => {
  const { step } = useQuestionBuilder();
  if (step === "input") return <SentenceInputScreen />;
  if (step === "word-selection") return <WordSelectionScreen />;
  if (step === "blanks-editor") return <BlanksEditorScreen />
  if (step === "options-builder") return <OptionsBuilderScreen />
}

function App() {
  return (
    <QuestionBuilderProvider>
      <AppContent />
    </QuestionBuilderProvider>
  )
}

export default App
