import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/forgot-password', {
        email
      });

      setMessage(response.data.message || 'OTP sent to your email');
      
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page-wrapper">
      <div className="forgot-page-container">
        <div className="forgot-left-panel">
          <div className="forgot-logo-container">
            <div className="forgot-logo-circle">
              <img src="/logo.png" alt="ChefBot Logo" className="forgot-logo-img" />
            </div>
            <div className="forgot-logo-text">
              <h1>ChefBot</h1>
              <p>Your AI Cooking Assistant</p>
            </div>
          </div>

          <div className="forgot-welcome-section">
            <h2>Forgot Password?</h2>
            <p>Don't worry! We'll help you reset it and get back to cooking delicious meals.</p>
          </div>

          <ul className="forgot-steps-list">
            <li><i className="fas fa-envelope"></i> Enter your registered email</li>
            <li><i className="fas fa-key"></i> Receive OTP verification code</li>
            <li><i className="fas fa-lock"></i> Create new password</li>
            <li><i className="fas fa-utensils"></i> Continue your culinary journey</li>
          </ul>
        </div>

        <div className="forgot-right-panel">
          <div className="forgot-form-header">
            <h2>Reset Password</h2>
            <p>Enter your email address and we'll send you an OTP to reset your password.</p>
          </div>

          {message && <div className="forgot-success-message"><i className="fas fa-check-circle"></i> {message}</div>}
          {error && <div className="forgot-error-message"><i className="fas fa-exclamation-circle"></i> {error}</div>}

          <form className="forgot-form-container" onSubmit={handleSubmit}>
            <div className="forgot-form-group">
              <label className="forgot-form-label" htmlFor="email">Email Address</label>
              <div className="forgot-input-wrapper">
                <input
                  className="forgot-input"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="fas fa-envelope forgot-input-icon"></i>
              </div>
            </div>

            <button type="submit" className="forgot-submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset OTP'}
            </button>

            <div className="forgot-back-link">
              <Link to="/login-page"><i className="fas fa-arrow-left"></i> Back to Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;