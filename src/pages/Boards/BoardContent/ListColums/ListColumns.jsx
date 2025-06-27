import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'

function ListColumns({ columns }) {
  return (
    <Box
      sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      {/* Box Column map từ data */}
      {columns?.map(column => (
        <Column key={column._id} column={column} />
      ))}

      {/* Button Add */}
      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          height: 'fit-content',
          bgcolor: '#ffffff3d',
          borderRadius: '5px'
        }}
      >
        <Button
          startIcon={<AddToPhotosIcon />}
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            color: 'white',
            pl: 2.5,
            py: 1
          }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns
