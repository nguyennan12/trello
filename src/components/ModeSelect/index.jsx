
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl size="small" sx={{ minWidth: '120px' }} >
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{
          '&.Mui-focused': { color: 'primary.contrastText' }
        }}
      >Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'primary.contrastText',
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'primary.contrastText' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.contrastText' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.contrastText' },
          '.MuiSvgIcon-root': { color: 'primary.contrastText' }
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize="small" />Light
          </Box>

        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeIcon fontSize="small" />Dark
          </Box>

        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon fontSize="small" />System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect