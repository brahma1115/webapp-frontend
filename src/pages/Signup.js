import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Doctor'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const data = await register(formData);
      if (data.is_pending) {
        // Success but pending
        setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', role: 'Doctor' });
        alert("Registration successful! Your account is pending administrator approval. You will be notified once approved.");
        navigate('/login');
      } else {
        // Normal flow
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user_role', data.role);
        localStorage.setItem('user_full_name', data.full_name);
        localStorage.setItem('user_email', data.email);
        localStorage.setItem('user_phone', data.phone_number);
        navigate('/select-department');
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
        <h1>Create Account</h1>
        <p>Join VentGuard for smart ICU management</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message" style={{ color: '#F44336', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
          
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Dr. John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="doctor@hospital.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="role-auth-select"
              required
            >
              <option value="Doctor">Doctor</option>
              <option value="Nurse">Nurse</option>
            </select>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary full-width" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <span className="link" onClick={() => navigate('/login')}>Log In</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
