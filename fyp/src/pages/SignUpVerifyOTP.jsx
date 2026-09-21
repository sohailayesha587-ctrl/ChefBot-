import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './SignUpVerifyOTP.css';

const SignUpVerifyOTP = () => {
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
      navigate('/signup');
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
    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length > 1) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`signup-otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      document
        .getElementById(`signup-otp-${index - 1}`)
        ?.focus();
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
      const response = await axios.post(
        '/api/auth/verify-signup-otp',
        {
          email,
          otp: otpValue
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate('/login-page');
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Invalid OTP'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(
        '/api/auth/resend-signup-otp',
        {
          email
        }
      );

      setMessage(
        response.data?.message ||
        'New OTP sent!'
      );

      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);

      setTimeout(() => {
        document.getElementById('signup-otp-0')?.focus();
      }, 100);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to resend OTP'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const data = e.clipboardData
      .getData('text')
      .replace(/\D/g, '');

    if (data.length === 6) {
      setOtp(data.split(''));
    }
  };

  return (
    <div className="verify-wrapper">

      <div className="verify-container">

        <div className="verify-left">

          <div className="verify-logo">

            <div className="verify-logo-circle">
              <img
                src="/logo.png"
                alt="ChefBot Logo"
              />
            </div>

            <h1>ChefBot</h1>

            <p>Your AI Cooking Assistant</p>

          </div>

          <div className="verify-info">

            <h2>Verify Your Email</h2>

            <p>
              Enter the 6-digit code sent to your email
            </p>

            <div className="verify-email-box">

              <i className="fas fa-envelope"></i>

              <strong>{email}</strong>

            </div>

          </div>

        </div>

        <div className="verify-right">

          {message && (
            <div className="success-msg">
              {message}
            </div>
          )}

          {error && (
            <div className="error-msg">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            onPaste={handlePaste}
          >

            <h2>Enter Verification Code</h2>

            <div className="otp-group">

              {otp.map((digit, index) => (

                <input
                  key={index}
                  id={`signup-otp-${index}`}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  value={digit}
                  onChange={(e) =>
                    handleChange(
                      index,
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(index, e)
                  }
                  autoFocus={index === 0}
                  inputMode="numeric"
                  disabled={loading}
                />

              ))}

            </div>

            <button
              type="submit"
              className="verify-btn"
              disabled={loading}
            >
              {loading
                ? 'Verifying...'
                : 'Verify OTP'}
            </button>

            <div className="resend-section">

              {canResend ? (

                <button
                  type="button"
                  className="resend-btn"
                  onClick={handleResend}
                  disabled={loading}
                >
                  Resend OTP
                </button>

              ) : (

                <span className="timer">
                  Resend in {timer}s
                </span>

              )}

            </div>

            <div className="links">

              <Link to="/signup">
                Wrong email? Sign up again
              </Link>

              <Link to="/login-page">
                Back to Login
              </Link>

              <div className="email-warning">
                Can’t receive the OTP?Check the spam folder.
               <br/>Or maybe your email address may be incorrect or inactive. Please check your email and try again.
              </div>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default SignUpVerifyOTP;