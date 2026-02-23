import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'


//khởi tạo giá trị State của 1 Slice
const initialState = {
  currentUser: null
}

// Các lần gọi API (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk kèm với extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return response.data
  }
)

//khởi tạo nột Slice trong Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  //Reducers: nơi xử lý dữ liệu đồng bộ
  reducers: {},
  //ExtraReducers: nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      //action.payload = response.data
      const user = action.payload
      //update lại dữ liệu
      state.currentUser = user
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
  }
})

// Action: nơi dành cho các components bên dưới gọi bằng dispath() tới để cập nhật dữ liệu thông qua reducer (chạy đồng bộ). action là property có sẵn từ các reducer func
// export const { } = userSlice.actions

// Selector: nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu trong Redux Store ra sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer