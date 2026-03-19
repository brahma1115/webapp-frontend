import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, update password here
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
        <h1>Reset Password</h1>
        <p>Set a new, strong password for your account</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>New Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary full-width">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
