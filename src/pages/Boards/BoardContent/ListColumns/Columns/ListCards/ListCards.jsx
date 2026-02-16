import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards({ cards }) {
  return (
    < SortableContext items={cards.map(c => c._id)} strategy={verticalListSortingStrategy} >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: '0 5px 5px 5px',
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
    </SortableContext>

  )
}

export default ListCards