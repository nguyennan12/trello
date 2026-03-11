import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

let axiosReduxStore
export const injectStore = mainStore => { axiosReduxStore = mainStore }

//khởi tạo đối tượng mới Axios
const authorizedAxiosInstance = axios.create()

//thời gian chờ tối đa 10p
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

//withCredentials: Sẽ cho phép axios tự động gửi cookie trong mỗi req cho BE
authorizedAxiosInstance.defaults.withCredentials = true

//Câu hình Interceptors
//Interceptors Request: can thiệp vào giữ req API
authorizedAxiosInstance.interceptors.request.use((config) => {
  //chặn spam click
  interceptorLoadingElements(true)
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

let refreshTokenPromise = null

//Interceptors Response: can thiệp vào giữ res nhận về
authorizedAxiosInstance.interceptors.response.use((response) => {
  //chặn spam click
  interceptorLoadingElements(false)
  return response
}, (error) => {
  //chặn spam click
  interceptorLoadingElements(false)

  //TH1: nhan ma 401 tu BE
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }

  //TH2: nhan ma 410 tu BE, refresh token
  const originalRequests = error.config
  if (error.response?.status === 410 && !originalRequests._retry) {
    originalRequests._retry = true

    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          return data?.accessToken
        })
        .catch((_error) => {
          //neu co loi thi logout luon
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          //gang la refresh token ve null trong moi TH success or error
          refreshTokenPromise = null
        })
    }
    //return TH thanh cong
    return refreshTokenPromise.then(accessToken => {
      //goi lai cac request bi loi
      return authorizedAxiosInstance(originalRequests)
    })
  }

  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }
  if (error.response?.status !== 410) {
    toast.error(errorMessage)
  }
  return Promise.reject(error)
})

export default authorizedAxiosInstance