import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import WebsiteAnalyzer from './components/WebsiteAnalyzer';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      marginBottom: '1rem',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: 'background.default',
            py: 4,
          }}
        >
          <Container maxWidth="lg">
            <WebsiteAnalyzer />
          </Container>
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 