import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { store } from './app/store';
import HomePage from './pages/HomePage';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import { AppWrapper, ContentWrapper } from './components/Layout';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppWrapper>
          <Header />
          <ContentWrapper>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </Router>
          </ContentWrapper>
          <Footer />
        </AppWrapper>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
