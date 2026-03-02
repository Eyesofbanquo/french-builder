import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import type { Blank } from '../types/types';
import BlankExplanationCard from '../components/BlankExplanationCard';

interface Props {
  templateString: string;
  initialBlanks: Blank[];
  onSubmit: (blanks: Blank[]) => void;
}

const BlanksEditorScreen = ({ templateString, initialBlanks, onSubmit }: Props) => {
  const [blanks, setBlanks] = useState<Blank[]>(initialBlanks);

  const updateExplanation = (index: number, value: string) => {
    setBlanks(
      blanks.map((blank, currentIndex) =>
        index === currentIndex ? { ...blank, explanation: value } : blank
      )
    )
  }

  const handleSubmit = () => {
    onSubmit(blanks);
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
        {blanks.map((blank, index) => (
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