import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ChangeAccountInfoPage.css';

const ChangeAccountInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const changeType = queryParams.get('type'); // 'email' or 'mobile'
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: verify old, 2: enter new
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState('');
  const [oldValue, setOldValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const getTitle = () => {
    return changeType === 'email' ? 'Change Email Address' : 'Change Mobile Number';
  };

  const getOldLabel = () => {
    return changeType === 'email' ? 'Current Email Address' : 'Current Mobile Number';
  };

  const getOldPlaceholder = () => {
    return changeType === 'email' ? 'Enter your current email' : 'Enter your current mobile number';
  };

  const getNewLabel = () => {
    return changeType === 'email' ? 'New Email Address' : 'New Mobile Number';
  };

  const getNewPlaceholder = () => {
    return changeType === 'email' ? 'Enter new email address' : 'Enter new mobile number';
  };

  const getSuccessMessage = () => {
    return changeType === 'email' 
      ? 'Email address changed successfully!' 
      : 'Mobile number changed successfully!';
  };

  // Step 1: Send OTP to verify old value
  const sendOTP = async () => {
    if (!oldValue) {
      setError(`Please enter your ${changeType === 'email' ? 'email' : 'mobile number'}`);
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const endpoint = changeType === 'email' 
        ? '/api/auth/send-otp-email' 
        : '/api/auth/send-otp-mobile';
      
      const payload = changeType === 'email' 
        ? { email: oldValue } 
        : { mobile: oldValue };

      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      
      setSentOtp(response.data.otp || '123456');
      setStep(2);
      setMessage(`OTP sent to your ${changeType === 'email' ? 'email address' : 'mobile number'}`);
    } catch (err) {
      setError(err.response?.data?.message || `Failed to send OTP. ${changeType === 'email' ? 'Email' : 'Mobile number'} not found.`);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and update value
  const verifyAndUpdate = async () => {
    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    if (!newValue) {
      setError(`Please enter new ${changeType === 'email' ? 'email' : 'mobile number'}`);
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      // First verify OTP
      const verifyEndpoint = changeType === 'email' 
        ? '/api/auth/verify-otp-email' 
        : '/api/auth/verify-otp-mobile';
      
      await axios.post(`http://localhost:5000${verifyEndpoint}`, {
        otp: otp,
        [changeType === 'email' ? 'email' : 'mobile']: oldValue
      });

      // Then update the value
      const updateEndpoint = changeType === 'email' 
        ? '/api/auth/update-email' 
        : '/api/auth/update-mobile';
      
      await axios.put(`http://localhost:5000${updateEndpoint}`, {
        oldValue: oldValue,
        newValue: newValue
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setMessage(getSuccessMessage());
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="change-info-wrapper">
      <div className="change-info-container">
        {/* LEFT PANEL */}
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
            <h2>{getTitle()}</h2>
            <p>Update your account information securely. We'll send a verification code to confirm your identity.</p>
          </div>
          
          {changeType === 'email' && (
            <ul className="change-security-tips">
              <li><i className="fas fa-check"></i> Enter your current email address</li>
              <li><i className="fas fa-check"></i> Verify with OTP sent to your email</li>
              <li><i className="fas fa-check"></i> Enter your new email address</li>
              <li><i className="fas fa-check"></i> Done! Your email will be updated</li>
            </ul>
          )}
          
          {changeType === 'mobile' && (
            <ul className="change-security-tips">
              <li><i className="fas fa-check"></i> Enter your current mobile number</li>
              <li><i className="fas fa-check"></i> Verify with OTP sent via SMS</li>
              <li><i className="fas fa-check"></i> Enter your new mobile number</li>
              <li><i className="fas fa-check"></i> Done! Your mobile will be updated</li>
            </ul>
          )}
        </div>

        {/* RIGHT PANEL */}
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
                <h2>Verify Identity</h2>
                <p>Enter your current {changeType === 'email' ? 'email address' : 'mobile number'}</p>
              </div>

              <div className="change-form-group">
                <label className="change-form-label">{getOldLabel()}</label>
                <div className="change-input-wrapper">
                  <input
                    type={changeType === 'email' ? 'email' : 'tel'}
                    className="change-input"
                    placeholder={getOldPlaceholder()}
                    value={oldValue}
                    onChange={(e) => setOldValue(e.target.value)}
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
                <p>Enter OTP and your new {changeType === 'email' ? 'email' : 'mobile number'}</p>
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

              <div className="change-form-group">
                <label className="change-form-label">{getNewLabel()}</label>
                <div className="change-input-wrapper">
                  <input
                    type={changeType === 'email' ? 'email' : 'tel'}
                    className="change-input"
                    placeholder={getNewPlaceholder()}
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                </div>
              </div>

              <button 
                className="change-submit-btn" 
                onClick={verifyAndUpdate} 
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update & Save'}
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