import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/myStyle.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { green,lightBlue ,grey} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    secondary: {
      main: grey[700],
      light: grey[400],
      dark: grey[900],
    },
    primary:{
      main:'#1a1a1a',
      light:'#404040',
      dark:'#000000',
    }
  },
  typography:{
    fontFamily: ['Prompt', 'sans-serif'].join(','),
    fontSize: 18,
    // fontWeightBold:50,
    // fontWeightMedium:50,
    // fontWeightLight:50,
    // fontWeightRegular:50
  },
  
});

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
}

export default MyApp
function rgba(arg0: number, arg1: number, arg2: number, arg3: number) {
  throw new Error('Function not implemented.');
}

