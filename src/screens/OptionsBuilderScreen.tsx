import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import type { AnswerChoice } from '../types/types';

interface Props {
  templateString: string;
  onSubmit: (options: AnswerChoice[]) => void;
}

const OptionsBuilderScreen = ({ templateString, onSubmit }: Props) => {
  const [options, setOptions] = useState<AnswerChoice[]>([]);
  const [newText, setNewText] = useState("");

  const addOption = () => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setOptions(prev => (
      [...prev, { text: trimmed, explanation: "" }]
    ))
    setNewText("");
  }

  const removeOption = (index: number) => {
    setOptions(prev => prev.filter((_, i) => i !== index));
  }

  const updateExplanation = (index: number, value: string) => {
    setOptions(prev =>
      prev.map((option, i) => i === index ? { ...option, explanation: value } : option)
    )
  }

  const handleSubmit = () => {
    onSubmit(options)
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
      <Typography variant="h5">Build Answer Options</Typography>

      {/* Template preview */}
      <Typography variant="h6" sx={{ opacity: 0.6, fontStyle: "italic" }}>
        {templateString}
      </Typography>

      {/* Add new option */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "100%",
          maxWidth: 500
        }}>
        <TextField
          label="Add an option"
          variant="outlined"
          size="small"
          fullWidth
          value={newText}
          onChange={(event) => setNewText(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && addOption} />
        <Tooltip title="Add option">
          <span>
            <IconButton
              onClick={addOption}
              disabled={!newText.trim()}
              color="primary">
              <AddIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      {/* Options list */}
      {options.length > 0 && (
        <Stack spacing={2} sx={{ width: "100%", maxWidth: 500 }}>
          {options.map((option, index) => (
            <Card key={index} variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{ opacity: 0.5, minWidth: 24 }}>
                      {index + 1}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold", flex: 1 }}>
                      {option.text}
                    </Typography>
                    <Tooltip title="Remove option">
                      <IconButton size="small" onClick={() => removeOption(index)}>
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Divider />

                  <TextField
                    label="Explanation"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={2}
                    value={option.explanation}
                    onChange={(event) => updateExplanation(index, event.target.value)}
                    placeholder={`Why is ${option.text} right or wrong here?`}
                  />
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={options.length === 0}>
        Next
      </Button>
    </Box>
  )
}

export default OptionsBuilderScreen;