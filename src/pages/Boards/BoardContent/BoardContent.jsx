import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'


function BoardContent() {

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
      <ListColumns />
    </Box>
  )
}

export default BoardContent