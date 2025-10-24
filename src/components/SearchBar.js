import React, { useState, useEffect } from 'react';

const searchContainerStyle = {
  padding: '20px 0',
  textAlign: 'center',
};

const inputStyle = {
  width: '50%',
  maxWidth: '500px',
  padding: '15px 20px',
  fontSize: '1rem',
  border: '2px solid #303030',
  borderRadius: '5px',
  backgroundColor: '#222',
  color: '#fff',
  outline: 'none',
};

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearch(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term, onSearch]);

  return (
    <div style={searchContainerStyle}>
      <input
        type="text"
        placeholder="Search for a movie or TV show..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={inputStyle}
      />
    </div>
  );
};

export default SearchBar;