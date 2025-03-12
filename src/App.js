// src/App.js
import React from 'react';
import './App.css';
import Register from './Register';
import Login from './login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Vehicle Management System</h1>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/user" element={<UserDashboard />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;