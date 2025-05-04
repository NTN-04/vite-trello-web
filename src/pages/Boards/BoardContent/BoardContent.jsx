import Box from '@mui/material/Box'
import ListColumns from './ListColums/ListColumns'

function BoardContent() {
  return (
    <Box
      sx={{
        p: '10px 0',
        width: '100%',
        height: theme => theme.trello.boarContentHeight,
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#34495e' : '#42a5f5'
      }}
    >
      {/* List box columns */}
      <ListColumns />
    </Box>
  )
}

export default BoardContent
