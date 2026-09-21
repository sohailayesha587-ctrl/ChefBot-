import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './ChangeAccountInfoPage.css';

const ChangeAccountInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const changeType = queryParams.get('type') || 'email';
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sendOTP = async () => {
    if (!oldValue.trim()) {
      setError('Please enter your current email');
      return;
    }
    if (!newValue.trim()) {
      setError('Please enter your new email');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/send-change-email-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentEmail: oldValue.trim(), newEmail: newValue.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send verification code');
      }

      setStep(2);
      setMessage(data.message || 'OTP sent to your new email');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndUpdate = async () => {
    if (!otp.trim()) {
      setError('Please enter OTP');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/auth/verify-update-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentEmail: oldValue.trim(), otp: otp.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      userData.email = data.newEmail || newValue;
      localStorage.setItem('userData', JSON.stringify(userData));

      setMessage(data.message || 'Email changed successfully!');
      
      setTimeout(() => {
        navigate('/home');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-info-wrapper">
      <div className="change-info-container">
        <div className="change-left-panel">
          <div className="change-logo-container">
            <div className="change-logo-circle">
              <img src="/logo.png" alt="ChefBot Logo" className="change-logo-img" />
            </div>
            <div className="change-logo-text">
              <h1>ChefBot</h1>
              <p>Your AI Cooking Assistant</p>
            </div>
          </div>
          <div className="change-welcome-section">
            <h2>Change Email Address</h2>
            <p>Update your account information securely. We will send a verification code to your new email.</p>
          </div>
          
          <ul className="change-security-tips">
            <li><i className="fas fa-check"></i> Enter your current email address</li>
            <li><i className="fas fa-check"></i> Enter your new email address</li>
            <li><i className="fas fa-check"></i> Verify OTP sent to your new email</li>
            <li><i className="fas fa-check"></i> Email updated in database</li>
          </ul>
        </div>

        <div className="change-right-panel">
          {message && (
            <div className="change-success-message">
              <i className="fas fa-check-circle"></i> {message}
            </div>
          )}
          {error && (
            <div className="change-error-message">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          {step === 1 ? (
            <div className="change-form-container">
              <div className="change-form-header">
                <h2>Change Email</h2>
                <p>Enter your current and new email address</p>
              </div>

              <div className="change-form-group">
                <label className="change-form-label">Current Email Address</label>
                <div className="change-input-wrapper">
                  <input
                    type="email"
                    className="change-input"
                    placeholder="Enter your current email"
                    value={oldValue}
                    onChange={(e) => setOldValue(e.target.value)}
                  />
                </div>
              </div>

              <div className="change-form-group">
                <label className="change-form-label">New Email Address</label>
                <div className="change-input-wrapper">
                  <input
                    type="email"
                    className="change-input"
                    placeholder="Enter new email address"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                </div>
              </div>

              <button 
                className="change-submit-btn" 
                onClick={sendOTP} 
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>

              <div className="change-back-link">
                <Link to="/home">← Back to Home</Link>
              </div>
            </div>
          ) : (
            <div className="change-form-container">
              <div className="change-form-header">
                <h2>Verify & Update</h2>
                <p>Enter 6-digit OTP sent to <b>{newValue}</b></p>
              </div>

              <div className="change-form-group">
                <label className="change-form-label">Verification Code (OTP)</label>
                <div className="change-input-wrapper">
                  <input
                    type="text"
                    className="change-input"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              <button 
                className="change-submit-btn" 
                onClick={verifyAndUpdate} 
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Verify & Update Email'}
              </button>

              <div className="change-back-link">
                <button className="change-back-button" onClick={() => setStep(1)}>
                  ← Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangeAccountInfoPage;