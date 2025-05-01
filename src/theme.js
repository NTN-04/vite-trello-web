import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '68px'
  },
  typography: {
    body1: {
      lineHeight: 'none'
    },
    body2: {
      lineHeight: 'none'
    }
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: cyan,
    //     secondary: orange
    //   }
    // }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#fff'
          }
        }
      }
    },
    // ghi đè các button
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    // label
    MuiInputLabel: {
      styleOverrides: {
        root: () => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },

    // các thuộc tính outline/border của text field
    MuiOutlinedInput: {
      styleOverrides: {
        root: () => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main
          //   }
          // },

          // khi được focus
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '1.75px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1.75px !important' }
        })
      }
    }
  }
})

export default theme
