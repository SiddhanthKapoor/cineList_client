import React, { useState } from 'react';
// We'll create this form style in a second
import { formStyle, inputStyle, buttonStyle, containerStyle, titleStyle } from './formStyles';

// We will create these two files next
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to log in', error);
      // We'll add a toast notification here later
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Login</h1>
      <form onSubmit={onSubmit} style={formStyle}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      <p style={{ textAlign: 'center' }}>
        Don't have an account? <Link to="/register" style={{ color: '#e50914' }}>Register</Link>
      </p>
    </div>
  );
};

export default Login;