import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;