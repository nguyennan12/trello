import AddCardIcon from '@mui/icons-material/AddCard'
import Cloud from '@mui/icons-material/Cloud'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentPaste from '@mui/icons-material/ContentPaste'
import DeleteIcon from '@mui/icons-material/Delete'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React from 'react'
import ListCards from './ListCards/ListCards'

function Columns() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      minWidth: '300px',
      maxWidth: '300px',
      bgcolor: 'primary.main',
      borderRadius: '6px',
      ml: 2,
      height: 'fit-content',
      maxHeight: (theme) => `
        calc(${theme.trello.boardContentHeight}-${theme.spacing(5)})
        `
    }}>
      <Box sx={{
        height: (theme) => theme.trello.columnHeaderHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2
      }}>
        <Typography variant='h7' sx={{ fontWeight: 'bold', color: 'primary.contrastText', cursor: 'pointer' }}>Title Column</Typography>
        <Box>
          <Tooltip title="More options">
            <ExpandMoreIcon
              sx={{ color: 'primary.contrastText', cursor: 'pointer' }}
              id="basic-button-column-dropdown"
              aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
          </Tooltip>
          <Menu
            id="basic-menu-column-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button-column-dropdown'
            }}
          >
            <MenuItem>
              <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
              <ListItemText>Cut</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
              <ListItemText>Copy</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
              <ListItemText>Paste</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

      </Box>
      <ListCards />
      <Box sx={{
        height: (theme) => theme.trello.columnFooterHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2
      }}>
        <Button startIcon={<AddCardIcon />}>Add new card</Button>
        <Tooltip title="Drag to move">
          <DragHandleIcon sx={{ color: 'primary.contrastText', cursor: 'pointer' }} />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Columns