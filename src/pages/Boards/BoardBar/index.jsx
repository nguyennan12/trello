import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'primary.dark'
    }}>
      BoardBar
    </Box>
  )
}

export default BoardBar