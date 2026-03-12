import CssBaseline from '@mui/material/CssBaseline'
import { GlobalStyles } from '@mui/material'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import theme from '~/theme'

import { ToastContainer } from 'react-toastify'

import { ConfirmProvider } from 'material-ui-confirm'

import { Provider } from 'react-redux'
import { store } from '~/redux/store'


import { BrowserRouter } from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
const persitor = persistStore(store)

import { injectStore } from './utils/authorizeAxios'
injectStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persitor}>
        <CssVarsProvider theme={theme}>
          <ConfirmProvider >
            <GlobalStyles styles={{
              a: { textDecoration: 'none' }
            }} />
            <CssBaseline />
            <App />
            <ToastContainer autoClose={2000} theme="colored" />
          </ConfirmProvider>
        </CssVarsProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
