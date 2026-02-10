import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Columns/Column'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'


function ListColumns({ columns }) {

  return (
    <>
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
    </>

  )
}

export default ListColumns