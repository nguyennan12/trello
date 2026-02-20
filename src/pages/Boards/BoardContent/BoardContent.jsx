import { DndContext, DragOverlay, MouseSensor, TouchSensor, closestCorners, defaultDropAnimationSideEffects, getFirstCollision, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { cloneDeep, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'
import Column from './ListColumns/Columns/Column'
import Card from './ListColumns/Columns/ListCards/Card/Card'
import ListColumns from './ListColumns/ListColumns'


const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board,
  createNewColumn,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn,
  deleteColumnDetails
}) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  //cung mot thoi diem chi keo 1 type card or column
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  useEffect(() => {
    setOrderedColumns(board?.columns)
  }, [board])

  const findColumnByCardId = (cardId) => {

    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }
  //di chuyen card giua 2 column khac nhau
  const moveCardBetweenDifferentCol = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerForm
  ) => {
    setOrderedColumns(prevColumns => {
      //tim vi tri cua card trong column dich dang keo toi
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      //console.log(overCardIndex)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
      if (nextActiveColumn) {
        //filter tra ve mang moi khac item ma no loc
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //them placeholder card khi column rong
        if (isEmpty(nextActiveColumn.cards)) {

          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
          // console.log(nextActiveColumn.cards)
        }
        //update lai mang orderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //them card tu nextActive vao vi tri moi o overColumn
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
        //xoa cai placeholder neu co it nhat 1 card
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
        //update lai mang orderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      if (triggerForm === 'handleDragEnd') {
        moveCardToDifferentColumn(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns)
      }

      // console.log(nextColumns)
      return nextColumns
    })
  }

  //truoc khi keo set data cua item hien tai dang keo
  const handleDragStart = (event) => {
    //console.log(event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  //trong khi dang keo tha item
  const handleDragOver = (event) => {
    //console.log(event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    const { active, over } = event
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    //tim 2 colums theo 2 cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentCol(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  //sau khi keo (tha)
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    //console.log(event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      //tim 2 colums theo 2 cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return
      //console.log(activeDragItemData)
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentCol(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        //console.log(oldColumnWhenDraggingCard)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        //console.log(dndOrderedCards)
        const dndOrderedCardIds = dndOrderedCards.map(c => c._id)
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          //console.log(targetColumn)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds
          return nextColumns
        })
        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDraggingCard._id)
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (active.id !== over.id)) {
      //lay vi tri cu tu active
      const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
      //lay vi tri moi tu over
      const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
      const dndOrderdColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

      setOrderedColumns(dndOrderdColumns)

      moveColumns(dndOrderdColumns)
    }
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  const collisionDetectionStrategy = (args) => {
    // Nếu đang kéo Column thì dùng closestCorners là chuẩn nhất
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // Tìm các điểm va chạm với con trỏ
    const pointerCollisions = pointerWithin(args)
    if (!pointerCollisions?.length) return []

    // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm
    // const collisions = pointerCollisions.length > 0 ? pointerCollisions : rectIntersection(args)

    // Tìm overId đầu tiên
    let overId = getFirstCollision(pointerCollisions, 'id')

    if (overId) {
      // Nếu overId là một Column, tìm card cuối cùng của column đó để va chạm
      const checkColumn = orderedColumns.find(col => col._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          coordinate: args.pointerCoordinates,
          intersectingRects: args.droppableRects,
          droppableContainers: args.droppableContainers.filter(
            container => container.id !== overId && checkColumn.cardOrderIds.includes(container.id)
          )
        })[0]?.id
      }

      return [{ id: overId }]
    }

    return []
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
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
        <ListColumns columns={orderedColumns} createNewColumn={createNewColumn} createNewCard={createNewCard} deleteColumnDetails={deleteColumnDetails} />
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