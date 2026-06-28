import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './ChangeAccountInfoPage.css';

const ChangeAccountInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const changeType = queryParams.get('type');
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [sentOtp] = useState('123456');
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

  const sendOTP = () => {
    if (!oldValue) {
      setError(`Please enter your ${changeType === 'email' ? 'email' : 'mobile number'}`);
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    setTimeout(() => {
      setStep(2);
      setMessage(`OTP sent to your ${changeType === 'email' ? 'email address' : 'mobile number'}`);
      setLoading(false);
    }, 800);
  };

  const verifyAndUpdate = () => {
    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    if (otp !== sentOtp) {
      setError('Invalid OTP. Please try again.');
      return;
    }

    if (!newValue) {
      setError(`Please enter new ${changeType === 'email' ? 'email' : 'mobile number'}`);
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      if (changeType === 'email') {
        userData.email = newValue;
      } else {
        userData.mobile = newValue;
      }
      localStorage.setItem('user', JSON.stringify(userData));
      
      setMessage(getSuccessMessage());
      setLoading(false);
      
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }, 800);
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
                <small style={{color: '#666', fontSize: '0.75rem', marginTop: '5px', display: 'block'}}>
                  Demo OTP: 123456
                </small>
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