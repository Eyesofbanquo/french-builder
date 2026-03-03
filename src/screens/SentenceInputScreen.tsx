import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useQuestionBuilder } from '../context/QuestionBuilder/useQuestionBuilder';

const SentenceInputScreen = () => {
  const { setSentence, setStep, setTranslation } = useQuestionBuilder();
  const [sentenceInput, setSentenceInput] = useState("");
  const [translationInput, setTranslationInput] = useState("");

  const headerTitle = "New Question"
  const buttonTitle = "Start"

  const handleSubmit = () => {
    const trimmed = sentenceInput.trim();
    if (!trimmed) return;
    setSentence(trimmed);
    setTranslation(translationInput.trim());
    setStep("word-selection");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        padding: 4
      }}>
      <Typography variant="h4">{headerTitle}</Typography>
      <TextField
        label="Enter a sentence"
        variant="outlined"
        value={sentenceInput}
        onChange={(event) => setSentenceInput(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
        sx={{ width: "100%", maxWidth: 500 }}
      />
      <TextField
        label="Translation (optional"
        variant="outlined"
        value={translationInput}
        onChange={(event) => setTranslationInput(event.target.value)}
        placeholder="e.g. I give him the book"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!sentenceInput.trim()}>
        {buttonTitle}
      </Button>
    </Box>
  )
}

export default SentenceInputScreen;