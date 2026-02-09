import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
//import { lightGreen } from '@mui/material/colors';

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENR_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENR_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#9cc9ff',
          light: '#e6f0ff',
          dark: '#7bb7ff',
          contrastText: '#2a5a96'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#193a6d',
          light: '#0a1e3f',
          dark: '#2a5a96',
          contrastText: '#cbdffc'
        }
      }
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          color: theme.palette.primary.contrastText
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.contrastText,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          // color: theme.palette.primary.dark,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.contrastText
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.contrastText
          //   }
          //},
          //khong bold vien khi nhap vao input
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' }
        })
      }
    }
  }
})

export default theme