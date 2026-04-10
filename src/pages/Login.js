import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(email, password);
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user_id', data.user.id);
      localStorage.setItem('user_role', data.user.profile.role);
      localStorage.setItem('user_full_name', `${data.user.first_name} ${data.user.last_name}`);
      localStorage.setItem('user_email', data.user.email);
      localStorage.setItem('user_phone', data.user.profile.phone_number);
      localStorage.setItem('user_employee_id', data.user.profile.employee_id || 'MD-8492');
      localStorage.setItem('selected_department', data.user.profile.department || 'Intensive Care Unit');
      
      if (data.user.profile.role === 'adminastrator') {
        navigate('/dashboard');
      } else {
        navigate('/select-department');
      }
    } catch (err) {
      if (err.message.includes('pending administrator approval')) {
        setError('Your account is pending administrator approval. Please wait for an email or contact your admin.');
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass-card">
        <div className="logo-section">
          {/* Using a placeholder for the logo */}
          <div className="logo-placeholder">🏥</div>
          <h1>Welcome Back</h1>
          <p>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <label>Email / Phone Number</label>
            <div className="input-wrapper">
              <span className="icon">📧</span>
              <input 
                type="text" 
                placeholder="Email or 10-digit number" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <span className="icon">🔒</span>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
