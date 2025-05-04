import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {
  return (
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
      <Card />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
    </Box>
  )
}

export default ListCards
