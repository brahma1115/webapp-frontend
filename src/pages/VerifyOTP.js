import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendMsg, setResendMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const email = localStorage.getItem('reset_email') || '';

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (timeLeft === 0) {
      setError('OTP has expired. Please click Resend.');
      return;
    }
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter the full 6-digit OTP.'); return; }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/verify-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/reset-password');
      } else {
        setError(data.error || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await fetch('http://localhost:8000/api/send-otp/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setResendMsg('OTP resent! Check your email.');
      setTimeLeft(300); // Reset timer to 5 minutes
      setTimeout(() => setResendMsg(''), 4000);
    } catch {}
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <polyline points="4,24 14,12 22,32 28,20 36,28 44,16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="login-title">VentGuard</h1>
        </div>

        <h2 className="login-subtitle">Enter OTP</h2>
        <p style={{textAlign: 'center', marginBottom: '24px', color: '#64748b', fontSize: '14px'}}>
          We sent a 6-digit code to <strong>{email}</strong>
        </p>

        {error && <div className="error-msg">{error}</div>}
        
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            color: timeLeft < 60 ? '#ef4444' : '#1e293b' 
          }}>
            {formatTime(timeLeft)}
          </span>
        </div>

        {resendMsg && <div style={{color: '#16a34a', textAlign: 'center', marginBottom: '12px', fontSize: '13px'}}>{resendMsg}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '28px' }}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                style={{
                  width: '46px', height: '52px', textAlign: 'center', fontSize: '22px',
                  fontWeight: '700', border: '1.5px solid #e2e8f0', borderRadius: '10px',
                  outline: 'none', background: 'white', color: '#1e293b'
                }}
              />
            ))}
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="signup-link">
          Didn't receive a code?{' '}
          <span 
            style={{
              color: timeLeft > 0 ? '#94a3b8' : '#3b82f6', 
              cursor: timeLeft > 0 ? 'not-allowed' : 'pointer', 
              fontWeight: '600'
            }} 
            onClick={timeLeft > 0 ? null : handleResend}
          >
            {timeLeft > 0 ? 'Wait for timer' : 'Resend'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;


