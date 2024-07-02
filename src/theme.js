import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e3440',
    },
    secondary: {
      main: '#bf616a',
    },
    error: {
      main: '#d08770',
    },
    warning: {
      main: '#ebcb8b',
    },
    success: {
      main: '#a3be8c',
    },
    background: {
      default: '#eceff4',
    },
  },
});
