import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material'
import { useQuestionBuilder } from '../context/QuestionBuilder/useQuestionBuilder';

const JsonPreviewScreen = () => {
  const { templateString, blanks, options, translation, setStep } = useQuestionBuilder();
  const [id] = useState(() => crypto.randomUUID());

  const question = {
    id: id,
    templateString,
    blanks,
    options,
    translation,
  }

  const handleNext = () => {
    setStep("level-assignment");
  }

  return (
    // Main Container
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: 4,
      }}>
      {/* Header */}
      <Typography variant="h5">Question Preview</Typography>
      {/* Sub Header */}
      <Typography variant="body2" sx={{ opacity: 0.5 }}>
        Review your question before assigning it to a level
      </Typography>

      {/* Main Content */}
      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: 3,
          overflowX: "auto"
        }}>
        <pre style={{ margin: 0 }}>
          <code>{JSON.stringify(question, null, 2)}</code>
        </pre>
      </Paper>

      {/* Next Button */}
      <Button variant="contained" onClick={handleNext}>
        Assign to a Level
      </Button>
    </Box>
  )
}

export default JsonPreviewScreen;