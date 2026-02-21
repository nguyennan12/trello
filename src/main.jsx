import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import theme from '~/theme'

import { ToastContainer } from 'react-toastify'

import { ConfirmProvider } from 'material-ui-confirm'

import { Provider } from 'react-redux'
import { store } from '~/redux/store'

import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider >
          <CssBaseline />
          <App />
          <ToastContainer autoClose={2000} theme="colored" />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </BrowserRouter>
)
