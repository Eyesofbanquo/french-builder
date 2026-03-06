import {
  Typography
} from '@mui/material'

interface Props {
  title: string;
}

const LevelAssignmentHeader = ({ title }: Props) => {
  return (
    <Typography variant="h5">{title}</Typography>
  )
}

export default LevelAssignmentHeader;