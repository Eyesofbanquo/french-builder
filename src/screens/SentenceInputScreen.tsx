import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material'

interface SentenceInputScreenProps {
  onSubmit: (sentence: string) => void;
}

const SentenceInputScreen = ({ onSubmit }: SentenceInputScreenProps) => {
  const [sentence, setSentence] = useState("");

  const headerTitle = "New Question"
  const buttonTitle = "Start"

  const handleSubmit = () => {
    const trimmed = sentence.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
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
        value={sentence}
        onChange={(event) => setSentence(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
        sx={{ width: "100%", maxWidth: 500 }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!sentence.trim()}>
        {buttonTitle}
      </Button>
    </Box>
  )
}

export default SentenceInputScreen;