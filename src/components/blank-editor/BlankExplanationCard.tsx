import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Stack,
  Divider
} from '@mui/material'
import type { Blank } from '../types/types';

interface Props {
  index: number;
  blank: Blank;
  onUpdate: (index: number, value: string) => void
}

const BlankExplanationCard = ({ index, blank, onUpdate }: Props) => {

  return (
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
            onChange={(event) => onUpdate(index, event.target.value)}
            placeholder={`Why is ${blank.text} correct here?`}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default BlankExplanationCard;