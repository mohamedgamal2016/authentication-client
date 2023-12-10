import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/signup');
  }, [navigate]);

  return (
    <div>
    <nav className="navbar">
      <div className="navbar-brand">Easy Generator</div>
      <div className="navbar-links">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
    <div className="content">
      <h1>Welcome to the application</h1>
    </div>
  </div>
  );
};

export default Home;
