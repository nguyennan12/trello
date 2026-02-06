import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
//import { lightGreen } from '@mui/material/colors';


// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '60px'
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
          main: '#102f5c',
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