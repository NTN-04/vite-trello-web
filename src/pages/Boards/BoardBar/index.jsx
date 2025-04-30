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

const Menu_Style = {
  color: 'primary.main',
  bgcolor: 'white',
  display: 'flex',
  alignItems: 'center',
  paddingX: '5px',
  border: 'none',
  borderRadius: '5px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
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
        borderTop: '1px solid #00bfa5'
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
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Invite
        </Button>

        <AvatarGroup
          max={6}
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: '16px'
            }
          }}
        >
          <Avatar
            alt="dev"
            src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482740MMK/anh-mo-ta.png"
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
          <Avatar
            alt="dev"
            src="data:image/jpeg;base64,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"
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
