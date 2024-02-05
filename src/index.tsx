import React from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline';

import { localization } from './localization';

import './index.css';
import App from './App';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ...localization
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
