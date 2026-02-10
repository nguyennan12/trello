import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Columns/Column'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';


function ListColumns({ columns }) {

  return (
    <>
      < SortableContext items={columns.map(c => c._id)} strategy={horizontalListSortingStrategy} >
        {columns?.map(column => <Column key={column._id} column={column} />)}

        < Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
          mx: 2,
          height: 'fit-content',
          borderRadius: '4px',
          backgroundColor: 'primary.main'
        }}>
          <Button sx={{ width: '100%', py: 1 }} startIcon={<LibraryAddIcon />}>
            Add new column
          </Button>
        </Box >
      </SortableContext>

    </>

  )
}

export default ListColumns