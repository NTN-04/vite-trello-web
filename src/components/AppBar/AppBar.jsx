import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as trelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspace from './Menus/Workspace'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profile from './Menus/Profile'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

function AppBar() {
  // Theo dõi trang thái
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: theme => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        '&::-webkit-scrollbar-track': { m: 2 },
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={trelloIcon}
            inheritViewBox
            fontSize="small"
            sx={{ color: 'white' }}
          />
          <Typography
            variant="span"
            sx={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            Trello
          </Typography>
        </Box>

        {/* Default breakpoints MUI */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspace />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none' }
            }}
            variant="outlined"
            startIcon={<LibraryAddIcon />}
          >
            Outlined
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          id="outlined-search"
          label="Search"
          type="text"
          size="small"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize="small"
                sx={{
                  color: searchValue ? 'white' : 'transparent',
                  cursor: 'pointer'
                }}
                onClick={() => setSearchValue('')}
              />
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '180px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' }
            }
          }}
        />
        <ModeSelect />

        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot">
            <NotificationsActiveIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help?" sx={{ color: 'white' }}>
          <HelpOutlineIcon />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
