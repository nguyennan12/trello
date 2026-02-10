import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Columns/Column'
import Card from './ListColumns/Columns/ListCards/Card/Card'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
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

  //cung mot thoi diem chi keo 1 type card or column
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //truoc khi keo set data cua item hien tai dang keo
  const handleDragStart = (event) => {
    console.log(event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
//sau khi keo (tha)
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
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      sensors={sensors}
      onDragStart={handleDragStart}
    >
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
        <DragOverlay dropAnimation={dropAnimation}>
          {/* {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />} */}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN ? <Column column={activeDragItemData} /> : <Card card={activeDragItemData} />)}
        </DragOverlay>
      </Box>
    </DndContext>

  )
}

export default BoardContent