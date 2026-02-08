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
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment';
import CommentIcon from '@mui/icons-material/Comment'
import React from 'react'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
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
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex',
      backgroundColor: 'primary.light',
      overflowY: 'hidden',
      overlfowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }}>
      {/* columns*/}
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
          height: COLUMN_HEADER_HEIGHT,
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
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: '0 5px',
          margin: '0 5px',
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`,
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}>
          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://i.pinimg.com/1200x/af/91/1b/af911b8119ee0cc0d44c031be361a802.jpg"
              title="green iguana"
            />
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >  Title your card   </Typography>
            </CardContent>
            <CardActions sx={{ padding: '0 4px 8px 4px' }}>
              <Button size="small" startIcon={<GroupIcon />}>20</Button>
              <Button size="small" startIcon={<CommentIcon />}>6</Button>
              <Button size="small" startIcon={<AttachmentIcon />}>10</Button>
            </CardActions>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >
                Card 01
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >
                Card 01
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >
                Card 01
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >
                Card 01
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >
                Card 01
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >
                Card 01
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >
                Card 01
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >
                Card 01
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            cursor: 'pointer',
            overflow: 'unset'
          }}>
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography >
                Card 01
              </Typography>
            </CardContent>
          </Card>


        </Box>
        <Box sx={{
          height: COLUMN_FOOTER_HEIGHT,
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


    </Box>
  )
}

export default BoardContent