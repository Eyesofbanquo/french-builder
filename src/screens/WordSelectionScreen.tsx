import { useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material'
import type { Blank } from '../types/types'
import { buildBlanks, buildTemplateSentence } from '../utils/questionBuilder';
import { useQuestionBuilder } from '../context/QuestionBuilder/useQuestionBuilder';

const WordSelectionScreen = () => {
  const { sentence, setTemplateString, setBlanks, setStep } = useQuestionBuilder();
  const words = sentence.split(" ");
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
  const templateSentence = buildTemplateSentence(words, selectedIndices)

  const orderedBlanks = () => {
    return Array.from(selectedIndices)
      .sort((a, b) => a - b)
      .map((position) => ({
        position,
        answer: words[position],
        explanation: ""
      }));
  }

  const handleSubmit = () => {
    const blanks: Blank[] = buildBlanks(words, selectedIndices)
    setTemplateString(templateSentence)
    setBlanks(blanks)
    setStep("blanks-editor")
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
            <Box key={index} sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "32px" }}>
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