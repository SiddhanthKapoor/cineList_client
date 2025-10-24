import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import cinelist from '../api/cinelist';
import { toast } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
};

const listStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '20px 0',
};

const sectionTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  marginTop: '30px',
  marginBottom: '10px',
  borderBottom: '2px solid #e50914',
  paddingBottom: '5px',
};

function Dashboard({ searchResults, handleSearch }) {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    try {
      const response = await cinelist.get('/');
      setWatchlist(response.data);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
      toast.error('Could not fetch watchlist.');
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const addToWatchlist = async (movieData) => {
    try {
      const response = await cinelist.post('/', movieData);
      setWatchlist([response.data, ...watchlist]);
      toast.success('Added to watchlist!');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.warn('This movie is already in your watchlist.');
      } else {
        console.error('Error adding to watchlist:', err);
        toast.error('Failed to add movie.');
      }
    }
  };

  const removeFromWatchlist = async (id) => {
    try {
      await cinelist.delete(`/${id}`);
      setWatchlist(watchlist.filter((movie) => movie._id !== id));
      toast.success('Removed from watchlist.');
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      toast.error('Failed to remove movie.');
    }
  };

  const toggleWatched = async (id, newWatchedStatus) => {
    try {
      const response = await cinelist.patch(`/${id}`, { watched: newWatchedStatus });
      setWatchlist(
        watchlist.map((movie) => (movie._id === id ? response.data : movie))
      );
      toast.success(newWatchedStatus ? 'Marked as watched!' : 'Marked as unwatched.');
    } catch (err) {
      console.error('Error updating watched status:', err);
      toast.error('Failed to update status.');
    }
  };

  return (
    <div style={containerStyle}>
      <SearchBar onSearch={handleSearch} />

      {searchResults.length > 0 && (
        <section>
          <h2 style={sectionTitleStyle}>Search Results</h2>
          <div style={listStyle}>
            <AnimatePresence>
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAdd={addToWatchlist}
                  isWatchlist={false}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      <section>
        <h2 style={sectionTitleStyle}>My Watchlist</h2>
        <div style={listStyle}>
          <AnimatePresence>
            {watchlist.length > 0 ? (
              watchlist.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onRemove={removeFromWatchlist}
                  onToggleWatched={toggleWatched}
                  isWatchlist={true}
                />
              ))
            ) : (
              <p>Your watchlist is empty. Add some movies!</p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;