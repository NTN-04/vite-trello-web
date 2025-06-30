import Box from '@mui/material/Box'
import Card from './Card/Card'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

function ListCards({ cards }) {
  return (
    // kéo thả card
    <SortableContext
      items={cards?.map(c => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          p: '0 5px',
          m: '0 5px', // thanh scroll k sát lề
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: theme => `calc(
    ${theme.trello.boarContentHeight} - 
    ${theme.spacing(5)} - 
    ${theme.trello.columnHeaderHeight} - 
    ${theme.trello.columnFooterHeight}
  )`,
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bdc3c7'
          }
        }}
      >
        {/* card. temporaryHiddenMedia: tạm ẩn card media */}
        {cards?.map(card => (
          <Card key={card._id} card={card} />
        ))}
      </Box>
    </SortableContext>
  )
}

export default ListCards
