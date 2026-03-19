import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Clinical.css';

const AdminPlaceholder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.pathname.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="clinical-container">
      <header className="page-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>←</button>
        <h1>{title}</h1>
      </header>
      <div className="glass-card main-content-placeholder">
        <div className="placeholder-icon">🛡️</div>
        <h2>{title}</h2>
        <p>This administrative module is under development and will provide tools for {title.toLowerCase()}.</p>
      </div>
    </div>
  );
};

export default AdminPlaceholder;
