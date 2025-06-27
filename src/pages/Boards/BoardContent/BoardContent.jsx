import Box from '@mui/material/Box'
import ListColumns from './ListColums/ListColumns'
import { mapOrder } from '~/utils/sorts'

function BoardContent({ board }) {
  // Hàm sắp xếp column
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

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
      <ListColumns columns={orderedColumns} />
    </Box>
  )
}

export default BoardContent
