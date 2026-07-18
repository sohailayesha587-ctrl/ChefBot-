import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './VerifyOTPPage.css';

const VerifyOTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp: otpValue
      });

      setMessage('OTP verified successfully!');
      
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage('New OTP sent!');
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend');
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text');
    if (data.length === 6 && /^\d+$/.test(data)) {
      setOtp(data.split(''));
    }
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-container">
        <div className="verify-left">
          <div className="verify-logo">
            <div className="verify-logo-circle">
              <img src="/logo.png" alt="ChefBot Logo" />
            </div>
            <h1>ChefBot</h1>
            <p>Your AI Cooking Assistant</p>
          </div>
          <div className="verify-info">
            <h2>Verify Your Identity</h2>
            <p>Enter the 6-digit code sent to your email</p>
            <div className="verify-email-box">
              <i className="fas fa-envelope"></i>
              <strong>{email}</strong>
            </div>
          </div>
        </div>

        <div className="verify-right">
          {message && <div className="success-msg">{message}</div>}
          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={handleSubmit} onPaste={handlePaste}>
            <div className="otp-group">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                  inputMode="numeric"
                  disabled={loading}
                />
              ))}
            </div>

            <button type="submit" className="verify-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="resend-section">
              {canResend ? (
                <button type="button" className="resend-btn" onClick={handleResend} disabled={loading}>
                  Resend OTP
                </button>
              ) : (
                <span className="timer">Resend in {timer}s</span>
              )}
            </div>

            <div className="links">
              <Link to="/forgot-password">Wrong email? Try again</Link>
              <Link to="/login-page">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;