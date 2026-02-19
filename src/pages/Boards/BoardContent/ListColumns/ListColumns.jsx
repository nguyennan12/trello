import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import ClearIcon from '@mui/icons-material/Clear'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Column from './Columns/Column'
import { toast } from 'react-toastify'

function ListColumns({ columns, createNewColumn, createNewCard }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(prev => !prev)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column Title', { position: "bottom-left", })
      return
    }

    const newColumn = {
      title: newColumnTitle
    }

    await createNewColumn(newColumn)

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
    toast.success('New column created', { position: "bottom-left" })

  }
  return (
    <>
      < SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy} >
        {columns?.map(column => <Column key={column._id} column={column} createNewCard={createNewCard} />)}

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