import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Columns from './Columns/Columns'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'


function ListColumns() {

  return (
    <>
      <Columns />
      <Columns />
      <Columns />
      <Box sx={{
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
      </Box>
    </>

  )
}

export default ListColumns