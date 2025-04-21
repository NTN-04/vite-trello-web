import Button from '@mui/material/Button'

import { pink } from '@mui/material/colors'
import HomeIcon from '@mui/icons-material/Home'

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'

function App() {
  return (
    <>
      <div>nguyên trong nghia</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <br />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
      <AccessAlarmIcon />
      <ThreeDRotation />
    </>
  )
}

export default App
