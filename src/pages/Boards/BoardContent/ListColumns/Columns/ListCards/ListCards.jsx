import Box from '@mui/material/Box'
import Card from './Card/Card'


function ListCards({ cards }) {
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
      {cards?.map(card => <Card key={card._id} card={card} />)}

    </Box>
  )
}

export default ListCards