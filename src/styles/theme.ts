import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0284C7', // before color #29b6f6
      light: '#E0F2FE', // before color #4fc3f7
      dark: '#0C4A6E',
    },
    // secondary: {
    //   main: '#19857b',
    // },
    // error: {
    //   main: red.A400,
    // },
  },
  typography: { button: { textTransform: 'none' } },
});

export default theme;
