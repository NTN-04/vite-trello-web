import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect'
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

function AppBar() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: theme => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={trelloIcon}
            inheritViewBox
            sx={{ color: 'primary.main' }}
          />
          <Typography
            variant="span"
            sx={{
              color: 'primary.main',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            Trello
          </Typography>
        </Box>

        <Workspace />
        <Recent />
        <Starred />
        <Templates />

        <Button variant="outlined">Outlined</Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          size="small"
        />
        <ModeSelect />

        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot">
            <NotificationsActiveIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="Help?">
          <HelpOutlineIcon />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
