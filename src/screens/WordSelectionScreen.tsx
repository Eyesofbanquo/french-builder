import { useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material'
import type { Blank } from '../types/types'

interface Props {
  originalSentence: string;
  onSubmit: (templateSentence: string, blanks: Blank[]) => void; // the template string is the string with the blanks
}

const WordSelectionScreen = ({ originalSentence, onSubmit }: Props) => {
  const words = originalSentence.split(" ");
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(
    new Set()
  )

  const toggleWord = (index: number) => {
    const next = new Set(selectedIndices) // Create a set copy to manipulate

    /* If the word is already selected, delete it */
    if (next.has(index)) {
      next.delete(index);
    } else {
      // Else add it
      next.add(index);
    }

    setSelectedIndices(next);
  };

  /* This represents the sentence string with the included blanks */
  const templateSentence = words
    .map((word, index) => (selectedIndices.has(index) ? "___" : word))
    .join(" ");

  const orderedBlanks = () => {
    return Array.from(selectedIndices)
      .sort((a, b) => a - b)
      .map((position, order) => ({
        position,
        answer: words[position],
        explanation: ""
      }));
  }

  const handleSubmit = () => {
    const blanks: Blank[] = orderedBlanks()

    onSubmit(templateSentence, blanks)
  }

  const headerTitle = "Select words to blank out"
  const livePreviewTitle = "Preview"
  const nextButtonTitle = "Next"

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
      <Typography variant="h5">{headerTitle}</Typography>

      {/* Word Chips */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
        {words.map((word, index) => (
          <Chip
            key={index}
            label={word}
            onClick={() => toggleWord(index)}
            color={selectedIndices.has(index) ? "primary" : "default"}
            variant={selectedIndices.has(index) ? "filled" : "outlined"}
          />
        ))}
      </Box>

      {/* Live Preview of Blanks */}
      <Box
        sx={{ textAlign: "center" }}>
        <Typography variant="caption" sx={{ opacity: 0.5 }}>
          {livePreviewTitle}
        </Typography>
        <Typography variant="h6">{templateSentence}</Typography>
      </Box>

      {/* Live Preview List */}
      <Box>
        {selectedIndices.size > 0 && (
          orderedBlanks().map((element, index) => (
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "32px" }}>
              <Typography variant="caption">#{index + 1}</Typography>
              <Typography variant="caption">{element.answer}</Typography>
            </Box>
          ))
        )}
      </Box>

      {/* Next Button */}
      <Button variant="contained"
        onClick={handleSubmit}
        disabled={selectedIndices.size === 0}>
        {nextButtonTitle}
      </Button>
    </Box >
  )
}

export default WordSelectionScreen;