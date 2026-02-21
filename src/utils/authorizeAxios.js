import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatters'

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

//Interceptors Response: can thiệp vào giữ res nhận về
authorizedAxiosInstance.interceptors.response.use((response) => {
  //chặn spam click
  interceptorLoadingElements(false)
  return response
}, (error) => {
  //chặn spam click
  interceptorLoadingElements(false)

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