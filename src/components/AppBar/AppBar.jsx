import { useState } from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'

import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'


function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'primary.light',
      gap: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

        <AppsIcon sx={{ color: 'primary.contrastText' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloLogo} fontSize="small" inheritViewBox sx={{ color: 'primary.contrastText' }} />
          <Typography variant="b1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.contrastText' }}>Trello</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <WorkSpaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            variant="outlined"
            sx={{
              border: 'none',
              '&:hover': {
                border: 'none'
              }
            }}
            endIcon={<AddIcon size="small" />}
          >Create</Button>
        </Box>

      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search"
          type="text"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'primary.contrastText' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <ClearIcon
                  sx={{
                    color: searchValue ? 'primary.contrastText' : 'transparent',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => { setSearchValue('') }}
                />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: '120px',
            display: { xs: 'none', md: 'flex' },
            '& input': { color: 'primary.contrastText' },
            '& label.Mui-focused': { color: 'primary.contrastText' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'primary.contrastText' },
              '&:hover fieldset': { borderColor: 'primary.contrastText' },
              '&.Mui-focused fieldset': { borderColor: 'primary.contrastText' }
            }
          }} />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot">
            <NotificationsNoneIcon sx={{ color: 'primary.contrastText' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: 'primary.contrastText' }} />
        </Tooltip>
        <Profiles />
      </Box>

    </Box>
  )
}

export default AppBar