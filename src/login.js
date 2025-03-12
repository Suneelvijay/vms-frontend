// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Default admin credentials
      const defaultAdmin = {
        username: 'admin',
        password: 'admin123'
      };
  
      if (formData.username === defaultAdmin.username && formData.password === defaultAdmin.password) {
        setMessage('Login successful!');
        localStorage.setItem('token', 'mock-token');
        navigate('/dashboard/admin');
      } else {
        try {
          const response = await axios.post('http://localhost:8080/api/auth/login', formData);
          setMessage('Login successful!');
          localStorage.setItem('token', response.data.token);
          const role = response.data.role; // Assuming the role is returned in the response
          if (role === 'admin') {
            navigate('/dashboard/admin');
          } else {
            navigate('/dashboard/user');
          }
        } catch (error) {
          setMessage('Error: ' + (error.response ? error.response.data : 'Server is not responding'));
        }
      }
    };
  
    return (
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
          <button onClick={() => navigate('/register')} style={{ marginTop: '10px' }}>
            Register
          </button>
        </div>
      );
  }
  
  export default Login;
