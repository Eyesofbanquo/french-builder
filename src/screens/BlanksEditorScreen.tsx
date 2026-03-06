import {
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material';
import { useState } from 'react';
import BlankExplanationCard from '../components/blank-editor/BlankExplanationCard';
import type { Blank } from '../types/types';
import { useQuestionBuilder } from '../context/QuestionBuilder/useQuestionBuilder';

const BlanksEditorScreen = () => {
  const { templateString, blanks, setBlanks, setStep } = useQuestionBuilder();
  const [localBlanks, setLocalBlanks] = useState<Blank[]>(blanks);

  const updateExplanation = (index: number, value: string) => {
    setLocalBlanks(
      localBlanks.map((blank, currentIndex) =>
        index === currentIndex ? { ...blank, explanation: value } : blank
      )
    )
  }

  const handleSubmit = () => {
    setBlanks(localBlanks);
    setStep("options-builder")
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: 4
      }}>
      {/* Header */}
      <Typography variant="h5">Edit Blanks</Typography>

      {/* Template preview */}
      <Typography variant="h6" sx={{ opacity: 0.6, fontStyle: "italic" }}>
        {templateString}
      </Typography>

      {/* One card per blank */}
      <Stack spacing={2} sx={{ width: "100%", maxWidth: 500 }}>
        {localBlanks.map((blank, index) => (
          <BlankExplanationCard
            key={index}
            index={index}
            blank={blank}
            onUpdate={updateExplanation}
          />
        ))}
      </Stack>

      {/* Submit button */}
      <Button variant="contained" onClick={handleSubmit}>
        Next
      </Button>
    </Box>
  )
}

export default BlanksEditorScreen;