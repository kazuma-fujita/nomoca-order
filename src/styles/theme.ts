import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2a9bcf', // before color #29b6f6
      light: '#68cdfb', // before color #4fc3f7
      dark: '#0288d1',
    },
    // secondary: {
    //   main: '#19857b',
    // },
    // error: {
    //   main: red.A400,
    // },
  },
});

export default theme;
