import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verify-otp');
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
        <h1>Forgot Password</h1>
        <p>Enter your email to receive a recovery code</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="doctor@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary full-width">Send OTP</button>
        </form>

        <div className="auth-footer">
          Remember password? <span className="link" onClick={() => navigate('/login')}>Back to Login</span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
