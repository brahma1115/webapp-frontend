import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass-card">
        <h1>Verify OTP</h1>
        <p>Enter the 4-digit code sent to your email</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="otp-input"
              />
            ))}
          </div>
          <button type="submit" className="btn btn-primary full-width">Verify</button>
        </form>

        <div className="auth-footer">
          Didn't receive a code? <span className="link">Resend</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
