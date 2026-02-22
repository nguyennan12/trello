import Container from '@mui/material/Container'
import { cloneDeep } from 'lodash'
import { useEffect } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

import {
  moveCardToDifferentColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI
} from '~/apis'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'


import { useParams } from 'react-router-dom'

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)

  const { boardId } = useParams()

  // const [board, setBoard] = useState(null)
  useEffect(() => {
    // const boardId = '6996ca0e116a30c4d2227ced'
    //call API
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    //ở đây gáng lại bằng nên kh bị lỗi
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    //setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    updateBoardDetailsAPI(board._id, {
      columnOrderIds: newBoard.columnOrderIds
    })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = cloneDeep(board)
    const ColumnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (ColumnToUpdate) {
      ColumnToUpdate.cards = dndOrderedCards
      ColumnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    //setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })

  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {

    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    //setBoard(newBoard)
    dispatch(updateCurrentActiveBoard(newBoard))

    let prevCardOrderIds = dndOrderedColumns.find(column => column._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(column => column._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <PageLoadingSpinner />
    )
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>

      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}

        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  )
}

export default Board