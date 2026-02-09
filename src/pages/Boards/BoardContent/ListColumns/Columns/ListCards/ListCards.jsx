import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      padding: '0 5px',
      margin: '0 5px',
      overflowY: 'auto',
      overflowX: 'hidden',
      maxHeight: (theme) =>
        `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${theme.trello.columnHeaderHeight} - ${theme.trello.columnFooterHeight})`,
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }}>

      <Card />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
      <Card temporaryHideMedia />
    </Box>
  )
}

export default ListCards