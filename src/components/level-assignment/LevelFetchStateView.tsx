import {
  CircularProgress,
  Typography
} from '@mui/material'

import { type FetchState } from '../../types/fetch-state'
import type { ReactNode } from 'react'

interface Props<T> {
  fetchState: FetchState<T>
  onSuccess: (data: T) => ReactNode
}

function FetchStateView<T>(
  { fetchState,
    onSuccess }: Props<T>
) {
  return (
    <>
      {fetchState.status === "loading" && <CircularProgress />}
      {fetchState.status === "error" && <Typography color="error">{fetchState.message}</Typography>}
      {fetchState.status === "success" && onSuccess(fetchState.data)}
    </>
  )
}

export default FetchStateView;