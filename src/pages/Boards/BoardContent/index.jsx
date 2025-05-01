import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box
      sx={{
        width: '100%',
        height: theme =>
          `calc(100vh - (${theme.trello.appBarHeight} + ${theme.trello.boardBarHeight}))`,
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#34495e' : '#42a5f5',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board content
    </Box>
  )
}

export default BoardContent
