import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'

import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//cau hinh persist
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user']
}

//combine cac reduer trong project
const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  user: userReducer
})

//perssist reducer
const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})