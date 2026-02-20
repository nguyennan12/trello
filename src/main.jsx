import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from "material-ui-confirm";


ReactDOM.createRoot(document.getElementById('root')).render(

  <CssVarsProvider theme={theme}>
    <ConfirmProvider >
      <CssBaseline />
      <App />
      <ToastContainer autoClose={2000} theme="colored" />
    </ConfirmProvider>
  </CssVarsProvider>

)
