import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const headerStyle = {
  width: '100%',
  padding: '20px 40px',
  backgroundColor: '#101010',
  borderBottom: '1px solid #303030',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const titleStyle = {
  fontSize: '2.5rem',
  color: '#e50914',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  cursor: 'pointer',
};

const logoutBtnStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  fontWeight: 'bold',
  backgroundColor: '#e50914',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const Header = ({ clearSearch }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoClick = () => {
    clearSearch();
    navigate('/');
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle} onClick={handleLogoClick}>
        CineList
      </h1>
      {user && (
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;