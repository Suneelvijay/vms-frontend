// src/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
    
  });

  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', formData);
      setMessage(response.data);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate('/login');
      }, 5000); // Show alert for 5 seconds
    } catch (error) {
      setMessage('Error: ' + (error.response ? error.response.data : 'Server is not responding'));
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      {showAlert && <div className="alert">Registration successful! Redirecting to login...</div>}
    </div>
  );
}

export default Register;