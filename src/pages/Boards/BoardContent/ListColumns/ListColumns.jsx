import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import ClearIcon from '@mui/icons-material/Clear'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { cloneDeep } from 'lodash'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Column from './Columns/Column'


import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'

import {
  createNewColumnAPI
} from '~/apis'


import { generatePlaceholderCard } from '~/utils/formatters'


function ListColumns({ columns }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(prev => !prev)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column Title', { position: 'bottom-left' })
      return
    }

    const newColumn = {
      title: newColumnTitle
    }

    //gọi API tạo mới column
    const createdColumn = await createNewColumnAPI({
      ...newColumn,
      boardId: board._id
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    //Redux k cho phép chỉnh sửa dữ liệu trực tiếp (Immutability) phải cloneDeep
    // const newBoard = { ...board } này là clone Shallow
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)

    dispatch(updateCurrentActiveBoard(newBoard))

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
    toast.success('New column created', { position: 'bottom-left' })

  }
  return (
    <>
      < SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy} >
        {columns?.map(column => <Column key={column._id} column={column} />)}

        {!openNewColumnForm
          ? < Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            height: 'fit-content',
            borderRadius: '4px',
            backgroundColor: 'primary.main'
          }}>
            <Button sx={{ width: '100%', py: 1 }} startIcon={<LibraryAddIcon />} >
              Add new column
            </Button>
          </Box >
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: 'primary.main',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}

              sx={{
                '& input': { color: 'primary.contrastText' },
                '& label.Mui-focused': { color: 'primary.contrastText' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'primary.contrastText' },
                  '&:hover fieldset': { borderColor: 'primary.contrastText' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.contrastText' }
                }
              }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button onClick={addNewColumn} sx={{ bgcolor: 'primary.light', px: 1.25, '&:hover': { bgcolor: '#56a50c', color: '#ffffff' } }}>Add Column</Button>
              <ClearIcon size='small' sx={{ color: 'primary.contrastText', cursor: 'pointer', '&:hover': { color: '#bd0303' } }} onClick={toggleOpenNewColumnForm} />
            </Box>
          </Box>
        }

      </SortableContext >

    </>

  )
}

export default ListColumns