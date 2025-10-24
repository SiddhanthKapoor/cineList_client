import React from 'react';
import { motion } from 'framer-motion';

const cardStyle = {
  backgroundColor: '#1c1c1c',
  border: '1px solid #303030',
  borderRadius: '8px',
  overflow: 'hidden',
  width: '200px',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.2s',
};

const imgStyle = {
  width: '100%',
  height: '300px',
  objectFit: 'cover',
};

const infoStyle = {
  padding: '10px',
  textAlign: 'center',
  flexGrow: 1,
};

const titleStyle = {
  fontSize: '1rem',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer',
};

const addBtn = {
  ...buttonStyle,
  backgroundColor: '#e50914',
  color: 'white',
};

const removeBtn = {
  ...buttonStyle,
  backgroundColor: '#555',
  color: 'white',
};

const watchBtn = {
  ...buttonStyle,
  backgroundColor: '#008000',
  color: 'white',
  marginTop: '5px',
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 }
};

const MovieCard = ({ movie, onAdd, onRemove, onToggleWatched, isWatchlist }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handleAdd = () => {
    const movieData = {
      tmdbId: movie.id.toString(),
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
    };
    onAdd(movieData);
  };
  
  const handleRemove = () => {
    onRemove(movie._id);
  };
  
  const handleWatchToggle = () => {
    onToggleWatched(movie._id, !movie.watched);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      transition={{ duration: 0.3 }}
      style={cardStyle}
    >
      <img src={posterUrl} alt={movie.title || movie.name} style={imgStyle} />
      <div style={infoStyle}>
        <h3 style={titleStyle}>{movie.title || movie.name}</h3>
      </div>
      {isWatchlist ? (
        <>
          <button onClick={handleWatchToggle} style={{...watchBtn, backgroundColor: movie.watched ? '#555' : '#008000'}}>
            {movie.watched ? 'Mark as Unwatched' : 'Mark as Watched'}
          </button>
          <button onClick={handleRemove} style={removeBtn}>Remove</button>
        </>
      ) : (
        <button onClick={handleAdd} style={addBtn}>Add to Watchlist</button>
      )}
    </motion.div>
  );
};

export default MovieCard;