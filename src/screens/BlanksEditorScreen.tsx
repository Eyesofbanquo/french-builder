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
          <Card key={index} variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                {/* Blank number and answer */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.5,
                      minWidth: 24
                    }}>
                    {index + 1}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {blank.text}
                  </Typography>
                </Box>

                <Divider />

                {/* Explanation input */}
                <TextField
                  label="Explanation"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={2}
                  value={blank.explanation}
                  onChange={(event) => updateExplanation(index, event.target.value)}
                  placeholder={`Why is ${blank.text} correct here?`}
                />
              </Stack>
            </CardContent>
          </Card>
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