import { ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary:{
      main: "#90caf9",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Noto Serif", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Oswald", "Source Sans Pro Black", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h2: {
      fontFamily: '"Oswald", "Source Sans Pro Black", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Oswald", "Source Sans Pro Black", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Oswald", "Source Sans Pro Black", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Oswald", "Source Sans Pro Black", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Oswald", "Source Sans Pro Black", "Roboto", "Helvetica", "Arial", sans-serif',
    }
  }
};

export default lightThemeOptions;