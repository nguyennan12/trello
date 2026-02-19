import axios from 'axios'
import { API_ROOT } from '~/utils/constants'


/*GET board*/
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

/*POST column*/
export const createNewColumnAPI = async (newColumn) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumn)
  return response.data
}
/*POST card*/
export const createNewCardAPI = async (newCard) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCard)
  return response.data
}