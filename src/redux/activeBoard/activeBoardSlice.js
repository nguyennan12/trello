import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { isEmpty } from 'lodash'
import { API_ROOT } from '~/utils/constants'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'


//khởi tạo giá trị State của 1 Slice
const initialState = {
  currentActiveBoard: null
}

// Các lần gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
  'activeBoard/fetchBoardDetailsAPI',
  async (boardId) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
    return response.data
  }
)

//khởi tạo nột Slice trong Redux Store
export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  //Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      //action.payload là chuẩn đặt tên nhận dữ liệu reducers, gáng nó lại 1 biến có nghĩa hơn là board
      const board = action.payload

      //xử lý dữ liệu

      //update lại dữ liệu
      state.currentActiveBoard = board
    }
  },
  //ExtraReducers: nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      //action.payload = response.data
      let board = action.payload

      //xử lý dữ liệu
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      //update lại dữ liệu
      state.currentActiveBoard = board
    })
  }
})

// Action: nơi dành cho các components bên dưới gọi bằng dispath() tới để cập nhật dữ liệu thông qua reducer (chạy đồng bộ). action là property có sẵn từ các reducer func
export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// Selector: nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu trong Redux Store ra sử dụng
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard
}

export const activeBoardReducer = activeBoardSlice.reducer