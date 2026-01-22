import { createTheme } from '@mui/material/styles';
// Fait avec l'aide de https://github.com/Zenoo/mui-theme-creator
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c4a7e7',
      light: '#c4a7e7',
      dark: '#907aa9',
      contrastText: '#191724',
    },
    secondary: {
      main: '#31748f',
      light: '#3e8fb0',
      dark: '#286983',
      contrastText: '#e0def4',
    },
    error: {
      main: '#eb6f92',
      light: '#eb6f92',
      dark: '#b4637a',
      contrastText: '#e0def4',
    },
    warning: {
      main: '#f6c177',
      light: '#f6c177',
      dark: '#ea9d34',
      contrastText: '#908caa',
    },
    info: {
      main: '#9ccfd8',
      light: '#9ccfd8',
      dark: '#56949f',
      contrastText: '#191724',
    },
    success: {
      main: '#ebbcba',
      light: '#ea9a97',
      dark: '#d7827e',
      contrastText: '#191724',
    },
    background: {
      default: '#191724',
      paper: '#1f1d2e',
    },
    text: {
      primary: '#e0def4',
      hint: '#c4a7e7',
      secondary: '#908caa',
      disabled: '#6e6a86',
    },
    divider: '#524f67',
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c4a7e7',
      light: '#c4a7e7',
      dark: '#907aa9',
      contrastText: '#191724',
    },
    secondary: {
      main: '#31748f',
      light: '#3e8fb0',
      dark: '#286983',
      contrastText: '#e0def4',
    },
    error: {
      main: '#eb6f92',
      light: '#eb6f92',
      dark: '#b4637a',
      contrastText: '#e0def4',
    },
    warning: {
      main: '#f6c177',
      light: '#f6c177',
      dark: '#ea9d34',
      contrastText: '#908caa',
    },
    info: {
      main: '#9ccfd8',
      light: '#9ccfd8',
      dark: '#56949f',
      contrastText: '#191724',
    },
    success: {
      main: '#ebbcba',
      light: '#ea9a97',
      dark: '#d7827e',
      contrastText: '#191724',
    },
    background: {
      default: '#faf4ed',
      paper: '#f2e9e1',
    },
    text: {
      primary: '#575279',
      hint: '#907aa9',
      secondary: '#797593',
      disabled: '#9893a5',
    },
    divider: '#524f67',
  },
});
