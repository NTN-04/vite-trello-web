import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Tooltip } from '@mui/material'

const Menu_Style = {
  color: 'white',
  bgcolor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  paddingX: '5px',
  border: 'none',
  borderRadius: '5px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: theme => theme.trello.boardBarHeight,
        paddingX: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        '&::-webkit-scrollbar-track': { m: 2 },
        bgcolor: theme =>
          theme.palette.mode === 'dark' ? '#34495e' : '#42a5f5',
        borderBottom: '1px solid white'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={Menu_Style}
          icon={<DashboardIcon />}
          label="NTN-Dev"
          clickable
        />
        <Chip sx={Menu_Style} icon={<VpnLockIcon />} label="Public" clickable />
        <Chip
          sx={Menu_Style}
          icon={<AddToDriveIcon />}
          label="Add to drive"
          clickable
        />
        <Chip
          sx={Menu_Style}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={Menu_Style}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite
        </Button>

        <AvatarGroup
          max={6}
          sx={{
            gap: '5px',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: '16px',
              border: 'none',
              color: 'white',
              '&:first-of-type': { bgcolor: '#a4b5e1' }
            }
          }}
        >
          <Tooltip title="NTN-dev">
            <Avatar
              alt="dev"
              src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482740MMK/anh-mo-ta.png"
            />
          </Tooltip>
          <Tooltip title="NTN-dev">
            <Avatar
              alt="dev"
              src="https://i.pinimg.com/originals/18/7f/7e/187f7e066baa264fd59ee183bdeee2ba.jpg"
            />
          </Tooltip>
          <Tooltip title="NTN-dev">
            <Avatar
              alt="dev"
              src="https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/19/467/avatar-anime-nam-3.jpg"
            />
          </Tooltip>
          <Tooltip title="NTN-dev">
            <Avatar
              alt="dev"
              src="https://tapl.edu.vn/public/upload/2025/01/avatar-nu39.webp"
            />
          </Tooltip>
          <Tooltip title="NTN-dev">
            <Avatar
              alt="dev"
              src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-anime-46.jpg"
            />
          </Tooltip>
          <Tooltip title="NTN-dev">
            <Avatar
              alt="dev"
              src="https://i.pinimg.com/originals/18/7f/7e/187f7e066baa264fd59ee183bdeee2ba.jpg"
            />
          </Tooltip>
          <Avatar
            alt="dev"
            src="https://i.pinimg.com/originals/18/7f/7e/187f7e066baa264fd59ee183bdeee2ba.jpg"
          />
          <Avatar
            alt="dev"
            src="https://i.pinimg.com/originals/18/7f/7e/187f7e066baa264fd59ee183bdeee2ba.jpg"
          />
          <Avatar
            alt="dev"
            src="https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/09/19/467/avatar-anime-nam-3.jpg"
          />
          <Avatar
            alt="dev"
            src="https://tapl.edu.vn/public/upload/2025/01/avatar-nu39.webp"
          />
          <Avatar
            alt="dev"
            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-anime-46.jpg"
          />
          <Avatar
            alt="dev"
            src="https://i.pinimg.com/originals/18/7f/7e/187f7e066baa264fd59ee183bdeee2ba.jpg"
          />
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
