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
import LoginPage from './pages/LoginPage';
import TopicDetail from './pages/TopicDetail';
import SignUpPage from './pages/SignUpPage';
import SearchResultsPages from './pages/SearchResultsPages';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <AppWrapper>
            <Header />
            <ContentWrapper>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/topics/:topicId" element={<TopicDetail />} />
                <Route path="/sign" element={<SignUpPage/>}/>
                <Route path="/search" element={<SearchResultsPages/>}/>
              </Routes>
            </ContentWrapper>
            <Footer />
          </AppWrapper>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
