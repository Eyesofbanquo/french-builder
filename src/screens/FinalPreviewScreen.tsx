import { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { useQuestionBuilder } from '../context/QuestionBuilder/useQuestionBuilder';
import { useDatabase } from '../context/useDatabase';
import type { Level } from '../types/types';

const FinalPreviewScreen = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const { currentQuestion, translation, selectedLevelId, reset } = useQuestionBuilder();
  const { handleGetLevels, handleSaveQuestion } = useDatabase();
  const [saveState, setSaveState] = useState<"idle" | "saving" | "success" | "error">("idle");

  const selectedLevel = levels.find((level: Level) => level.id === selectedLevelId);

  const handleSave = async () => {
    // if a current question doesn't exist or a level isn't selected then there isn't anything to save
    if (!currentQuestion || !selectedLevelId) return;
    setSaveState("saving");
    try {
      await handleSaveQuestion(currentQuestion, selectedLevelId)
      setSaveState("success")
    } catch {
      setSaveState("error")
    }
  }

  const handleBuildAnotherQuestion = () => {
    reset();
  }


  useEffect(() => {
    const fetchData = async () => {
      const fetchedLevels = await handleGetLevels();
      setLevels(fetchedLevels)
    }

    fetchData();
  }, [])

  return (
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
      <Typography variant="h5">Final Preview</Typography>
      <Typography variant="body2" sx={{ opacity: 0.5 }}>
        Review everything before saving
      </Typography>

      <Stack spacing={2} sx={{ width: "100%", maxWidth: 600 }}>
        {/* Level */}
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            Level
          </Typography>
          <Typography variant="body1">
            {selectedLevel?.title ?? "Unknown level"}
          </Typography>
        </Box>

        <Divider />

        {/* Template */}
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            Template
          </Typography>
          <Typography variant="body1">
            {currentQuestion?.template}
          </Typography>
        </Box>

        {/* Translation */}
        {translation && (
          <Box>
            <Typography variant="caption" sx={{ opacity: 0.5 }}>
              Translation
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              {translation}
            </Typography>
          </Box>
        )}

        <Divider />

        {/* Full JSON */}
        <Paper
          variant="outlined"
          sx={{ padding: 3, overflowX: "auto" }}
        >
          <pre style={{ margin: 0 }}>
            <code>{JSON.stringify(currentQuestion, null, 2)}</code>
          </pre>
        </Paper>
      </Stack>

      {/* Save state feedback */}
      {saveState === "error" && (
        <Alert severity="error">Something went wrong. Please try again.</Alert>
      )}
      {saveState === "success" && (
        <Alert severity="success">Question saved successfully.</Alert>
      )}

      {/* Actions */}
      {saveState === "success" ? (
        <Button variant="contained" onClick={handleBuildAnotherQuestion}>
          Build Another
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saveState === "saving"}
        >
          {saveState === "saving" ? (
            <CircularProgress size={20} sx={{ color: "inherit" }} />
          ) : (
            "Save Question"
          )}
        </Button>
      )}
    </Box>
  )
}
export default FinalPreviewScreen