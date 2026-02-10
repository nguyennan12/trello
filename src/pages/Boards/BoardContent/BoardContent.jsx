import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import Column from './ListColumns/Columns/Column'
import Card from './ListColumns/Columns/ListCards/Card/Card'
import { cloneDeep } from 'lodash'


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

  const findColumnByCardId = (cardId) => {

    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  //truoc khi keo set data cua item hien tai dang keo
  const handleDragStart = (event) => {
    //console.log(event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }

  //trong khi dang keo tha item
  const handleDragOver = (event) => {
    //console.log(event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    if (!over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    //tim 2 colums theo 2 cardId
    const activeColumn = findColumnByCardId(activeDragItemId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        //tim vi tri cua card trong column dich dang keo toi
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        //console.log(overCardIndex)
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.card?.length + 1

        const nextColumns = cloneDeep(prevColumns)
        const nextAactiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
        if (nextAactiveColumn) {
          //filter tra ve mang moi khac item ma no loc
          nextAactiveColumn.cards = nextAactiveColumn.cards.filter(card => card._id !== activeDragItemId)
          //update lai mang orderIds
          nextAactiveColumn.cardsOrderIds = nextAactiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragItemId)
          //them card tu nextActive vao vi tri moi o overColumn
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          //update lai mang orderIds
          nextOverColumn.cardsOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        return nextColumns
      })
    }
  }

  //sau khi keo (tha)
  const handleDragEnd = (event) => {
    //console.log(event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) return
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
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
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