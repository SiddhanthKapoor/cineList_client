import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import tmdb from './api/tmdb';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = useCallback(async (term) => {
    if (term.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    try {
      const response = await tmdb.get('/search/multi', {
        params: { query: term, include_adult: 'false' },
      });
      const filteredResults = response.data.results.filter(
        (movie) => movie.media_type === 'movie' || movie.media_type === 'tv'
      );
      setSearchResults(filteredResults);
    } catch (err) {
      console.error('Error searching TMDB:', err);
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Header clearSearch={() => setSearchResults([])} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard
                  searchResults={searchResults}
                  handleSearch={handleSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer
          theme="dark"
          position="bottom-right"
          autoClose={3000}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;