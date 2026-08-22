import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.terms) {
      setError('Please accept terms');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/auth/register', {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        terms: formData.terms
      });

      navigate('/login-page');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-section">
      <div className="signup-image">
        <div className="signup-content">
          <h1>Join Our Culinary Community</h1>
          <p>Create your account and unlock a world of delicious recipes, smart meal planning, and AI-powered cooking assistance.</p>
          
          <ul className="features">
            <li><span className="check-icon">✓</span> Personalized recipe recommendations</li>
            <li><span className="check-icon">✓</span> Smart meal planning tools</li>
            <li><span className="check-icon">✓</span> Step-by-step cooking guidance</li>
            <li><span className="check-icon">✓</span> Nutritional tracking</li>
            <li><span className="check-icon">✓</span> Save and organize your favorite recipes</li>
          </ul>
        </div>
      </div>
      
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Create Account</h2>
          <p>Sign up to start your culinary journey</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input 
                type="text" 
                id="fullname" 
                name="fullname"
                className="form-control" 
                placeholder="Enter your full name" 
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className="form-control" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password"
                  className="form-control" 
                  placeholder="Create a password (min. 6 characters)" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="confirmPassword" 
                  name="confirmPassword"
                  className="form-control" 
                  placeholder="Confirm your password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
            </div>
            
            <button type="submit" className="btn-signup" disabled={loading}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
            
            <div className="login-link">
              Already have an account? <Link to="/login-page">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;