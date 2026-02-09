import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLE = {
  color: 'primary.contrastText',
  bgcolor: 'primary.light',
  '& .MuiSvgIcon-root': {
    color: 'primary.contrastText',
    pd: 0,
    margin: 0
  },
  transition: 'all 0.25s ease',

  px: { xs: 0, md: 1 },
  py: { xs: 0, md: 0.5 },

  minWidth: { xs: 36, md: 'auto' },
  height: { xs: 36, md: 'auto' },

  '& .MuiChip-labelMedium': {
    display: { xs: 'none', md: 'block' }
  }
}

function BoardBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: (theme) => (theme.palette.mode === 'dark'
        ? 'inset 0 0 4px 2px rgba(255, 255, 255, 0.1)'
        : 'inset 0 0 4px 2px rgba(0,0,0,0.1)'),
      gap: 2,
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#020f1f' : '')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />} label="Your Workspace Board"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />} label="Public/Private Workspace"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />} label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />} label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />} label="Filters"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>Invite</Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: '30px',
              height: '30px',
              fontSize: '16px'
            }
          }}
        >
          <Tooltip title="people">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="people">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip title="people">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip title="people">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />
          </Tooltip>
          <Tooltip title="people">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/5.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar