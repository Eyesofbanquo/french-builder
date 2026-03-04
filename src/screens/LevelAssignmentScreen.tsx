import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { collection, getDocs, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { db } from '../firebase'
import { useQuestionBuilder } from '../context/QuestionBuilder/useQuestionBuilder';
import { type Level } from '../types/types'

type FetchState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T }

const LevelAssignmentScreen = () => {
  const { currentQuestion, setStep } = useQuestionBuilder();
  const [fetchState, setFetchState] = useState<FetchState<Level[]>>({
    status: "loading",
  });

  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newLevelTitle, setNewLevelTitle] = useState("");
  const [newPassMark, setNewPassMark] = useState(""); // set the bar to just pass it
  const [newSkipMark, setNewSkipMark] = useState(""); // Set the bar to skip level

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const snapshot = await getDocs(collection(db, "levels"));
        const data = snapshot.docs.map((doc) => ({
          ...(doc.data() as Omit<Level, "id">),
          id: doc.id
        }))
        setFetchState({ status: "success", data })
      } catch {
        setFetchState({ status: "error", message: "Failed to load levels" })
      }
    }

    fetchLevels();

  }, [])

  const handleCreateLevel = async () => {
    const trimmed = newLevelTitle.trim();
    if (!trimmed) return;

    try {
      const newLevel = {
        title: trimmed,
        passMark: Number(newPassMark),
        skipMark: Number(newSkipMark),
        questionIds: []
      };
      const docRef = await addDoc(collection(db, "levels"), newLevel);
      const createdLevel: Level = { ...newLevel, id: docRef.id };

      /// Add the created level to the local state to update list
      setFetchState((prev) =>
        prev.status === "success"
          ? { status: "success", data: [...prev.data, createdLevel] }
          : prev
      );
      setSelectedLevelId(docRef.id);
      setDialogOpen(false);
      setNewLevelTitle("");
      setNewPassMark("");
      setNewSkipMark("");
    } catch (e) {
      console.error("Failed ot create level", e);
    }
  }

  const handleAssignQuestion = async () => {
    if (!selectedLevelId || !currentQuestion) return;

    try {
      // Save question as its own document
      await addDoc(collection(db, "questions"), currentQuestion);

      // Add question ID to the level
      await updateDoc(doc(db, "levels", selectedLevelId), {
        questionIds: arrayUnion(currentQuestion.id)
      });

      setStep("final-preview")
    } catch (e) {
      console.error("Failed to assign question", e);
    }
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
      }}
    >
      {/* Header */}
      <Typography variant="h5">Assign to Level</Typography>

      {fetchState.status === "loading" && <CircularProgress />}

      {fetchState.status === "error" && (
        <Typography color="error">{fetchState.message}</Typography>
      )}

      {fetchState.status === "success" && (
        <>
          {fetchState.data.length === 0 ? (
            <Typography sx={{ opacity: 0.5 }}>
              No levels yet -- create one below
            </Typography>
          ) : (
            <List
              sx={{
                width: "100%",
                maxWidth: 500,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
              }}>
              {fetchState.data.map((level) => (
                <ListItemButton
                  key={level.id}
                  selected={selectedLevelId === level.id}
                  onClick={() => setSelectedLevelId(level.id)}>
                  <ListItemText
                    primary={level.title}
                    secondary={`Pass: ${level.passMark} - Skip: ${level.skipMark}`} />
                </ListItemButton>
              ))}
            </List>
          )}

          <Button variant="outlined" onClick={() => setDialogOpen(true)}>
            Create New level
          </Button>
        </>
      )}

      <Button
        variant="contained"
        onClick={handleAssignQuestion}
        disabled={!selectedLevelId}
      >
        Save Question
      </Button>

      {/* Create level dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="xs">
        <DialogTitle>New Level</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 1 }}>
            <TextField
              label="Title"
              variant="outlined"
              size="small"
              value={newLevelTitle}
              onChange={(e) => setNewLevelTitle(e.target.value)}
            />
            <TextField
              label="Pass mark"
              variant="outlined"
              size="small"
              type="number"
              value={newPassMark}
              onChange={(e) => setNewPassMark(e.target.value)}
            />
            <TextField
              label="Skip mark"
              variant="outlined"
              size="small"
              type="number"
              value={newSkipMark}
              onChange={(e) => setNewSkipMark(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateLevel}
            disabled={!newLevelTitle.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default LevelAssignmentScreen;