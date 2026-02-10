import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'


function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    },
  })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const handleDragEnd = (event) => {
    //console.log(event)
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      //lay vi tri cu tu active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      //lay vi tri moi tu over
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      const dndOrderdColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      setOrderedColumns(dndOrderdColumns)
      //const dndOrderdColumnsIds = dndOrderdColumns.map(c => c._id)
      // console.log('dndOrderdColumns: ', dndOrderdColumns)
      // console.log('dndOrderdColumnsIds: ', dndOrderdColumnsIds)
    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} >
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
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>

  )
}

export default BoardContent