import { useState } from 'react';
import SentenceInputScreen from './screens/SentenceInputScreen';

function App() {
  const [sentence, setSentence] = useState<string | null>(null);

  const handleSentenceSubmit = (newSentence: string) => {
    setSentence(newSentence)
  };

  if (!sentence) {
    return <SentenceInputScreen onSubmit={handleSentenceSubmit} />
  }

  return (
    <div>Next screen - sentence: {sentence}</div>
  )
}

export default App
