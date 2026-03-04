import {
  Typography,
  CircularProgress,
  ListItemButton,
  List,
  ListItemText,
  Button
} from '@mui/material'

import { type FetchState } from '../../types/fetch-state'
import type { Level } from '../../types/types'

interface Props<T> {
  fetchState: FetchState<T>
  currentSelectedLevel: string | null
  onLevelIdSelection: (levelId: string) => void
  onCreateNewLevel: () => void
}

const LevelFetchStateView = ({ fetchState, currentSelectedLevel, onLevelIdSelection, onCreateNewLevel }: Props<Level[]>) => {

  const levelData = fetchState.status === "success" ? fetchState.data : []

  const LevelDataNoDataView = () => {
    return (
      <Typography sx={{ opacity: 0.5 }}>
        No levels yet -- create one below
      </Typography>
    )
  }

  const LevelDataViewWithResults = () => {
    return (
      <>
        <List
          sx={{
            width: "100%",
            maxWidth: 500,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1
          }}>
          {
            levelData.map((level) => (
              <ListItemButton
                key={level.id}
                selected={currentSelectedLevel === level.id}
                onClick={() => onLevelIdSelection(level.id)}
              >
                <ListItemText
                  primary={level.title}
                  secondary={`Pass: ${level.passMark} - Skip: ${level.skipMark}`} />
              </ListItemButton>
            ))
          }
        </List>
      </>
    )
  }

  return (
    <>
      {fetchState.status === "loading" && <CircularProgress />}
      {fetchState.status === "error" && (
        <Typography color="error">{fetchState.message}</Typography>
      )}
      {fetchState.status === "success" && (
        <>
          {levelData.length === 0 ? LevelDataNoDataView() : LevelDataViewWithResults()}
        </>
      )}
      <Button variant="outlined" onClick={() => onCreateNewLevel()}>
        Create New level
      </Button>
    </>
  )
}

export default LevelFetchStateView;