import React, { useState } from 'react';
import { formStyle, inputStyle, buttonStyle, containerStyle, titleStyle } from './formStyles';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/');
    } catch (error) {
      console.error('Failed to register', error);
      // We'll add a toast notification here later
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Register</h1>
      <form onSubmit={onSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          style={inputStyle}
          required
        />
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
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      <p style={{ textAlign: 'center' }}>
        Already have an account? <Link to="/login" style={{ color: '#e50914' }}>Login</Link>
      </p>
    </div>
  );
};

export default Register;