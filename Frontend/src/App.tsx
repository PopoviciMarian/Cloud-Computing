import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
          <MainPage />

    </ThemeProvider>
   
  );
}

export default App;
