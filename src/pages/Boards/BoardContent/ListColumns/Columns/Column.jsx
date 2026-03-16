import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import AddCardIcon from '@mui/icons-material/AddCard'
import ClearIcon from '@mui/icons-material/Clear'
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
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { cloneDeep } from 'lodash'
import { useConfirm } from 'material-ui-confirm'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ListCards from './ListCards/ListCards'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'

import {
  createNewCardAPI,
  deleteColumnDetailsAPI
} from '~/apis'

import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'


function Column({ column }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(prev => !prev)
  const [newCardTitle, setNewCardTitle] = useState('')
  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter Card Title', { position: 'bottom-right' })
      return
    }
    const newCard = {
      title: newCardTitle,
      columnId: column._id
    }

    //Goi API tao moi card
    const createdCard = await createNewCardAPI({
      ...newCard,
      boardId: board._id
    })

    const newBoard = cloneDeep(board)
    const ColumnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (ColumnToUpdate) {
      if (ColumnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        ColumnToUpdate.cards = [createdCard]
        ColumnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        ColumnToUpdate.cards.push(createdCard)
        ColumnToUpdate.cardOrderIds.push(createdCard._id)
      }

    }
    //setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    toggleOpenNewCardForm()
    setNewCardTitle('')
    toast.success('New card created', { position: 'bottom-right' })
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const DndKitColumnStyles = {
    //touchAction: 'none', danh cho pointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const orderedCards = column.cards

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = async () => {
    const { confirmed } = await confirmDeleteColumn({
      title: 'Delete Column?',
      description: 'This action will permanently delete your Column and its Cards! Are you sure?',
      allowClose: false
    })

    if (confirmed) {

      const newBoard = { ...board }
      newBoard.columns = newBoard.columns.filter(col => col._id !== column._id)
      newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== column._id)
      //setBoard(newBoard)
      dispatch(updateCurrentActiveBoard(newBoard))

      deleteColumnDetailsAPI(column._id).then(res => {
        toast.success(res?.deleteResult, { position: 'bottom-left' })
      })
    }
  }

  const onUpdateTitleColumn = () => {

  }

  return (
    <div ref={setNodeRef}
      style={DndKitColumnStyles}
      {...attributes}
    >
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: 'primary.main',
          borderRadius: '6px',
          ml: 2,
          height: 'fit-content',
          maxHeight: (theme) => `
        calc(${theme.trello.boardContentHeight}-${theme.spacing(5)})
        `
        }}
      >
        <Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2
        }}>
          <ToggleFocusInput
            value={column?.title}
            onChangedValue={onUpdateTitleColumn}
          />
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
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button-column-dropdown'
              }}
            >
              <MenuItem onClick={toggleOpenNewCardForm} sx={{
                '&:hover': {
                  color: '#15bc39',
                  '& .add-card-icon': { color: '#15bc39' }
                }
              }}>
                <ListItemIcon><AddCardIcon className='add-card-icon' fontSize="small" /></ListItemIcon>
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
              <MenuItem sx={{
                '&:hover': {
                  color: '#0e92e3',
                  '& .archive-icon': { color: '#0e92e3' }
                }
              }}>
                <ListItemIcon>
                  <Cloud className='archive-icon' fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteColumn} sx={{
                '&:hover': {
                  color: '#dc3b0a',
                  '& .delete-icon': { color: '#dc3b0a' }
                }
              }}>
                <ListItemIcon>
                  <DeleteIcon className="delete-icon" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

        </Box>
        <ListCards cards={orderedCards} />

        {!openNewCardForm
          ? <Box
            onClick={toggleOpenNewCardForm}
            sx={{
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
          : <Box sx={{
            p: 1,
            borderRadius: '6px',
            height: (theme) => theme.trello.columnFooterHeight,
            bgcolor: 'primary.main',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <TextField
              label="Enter card title..."
              type="text"
              size="small"
              variant='outlined'
              autoFocus
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}

              sx={{
                '& input': { color: 'primary.contrastText' },
                '& label.Mui-focused': { color: 'primary.contrastText' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'primary.contrastText' },
                  '&:hover fieldset': { borderColor: 'primary.contrastText' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.contrastText' }
                }
              }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button className='interceptor-loading' onClick={addNewCard} sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: '#56a50c', color: '#ffffff' } }}>Add</Button>
              <ClearIcon size='small' sx={{ color: 'primary.contrastText', cursor: 'pointer', '&:hover': { color: '#bd0303' } }} onClick={toggleOpenNewCardForm} />
            </Box>
          </Box>
        }

      </Box>
    </div>

  )
}

export default Column