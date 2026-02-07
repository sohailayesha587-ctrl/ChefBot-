import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      alert("Please enter both username and password!");
      return;
    }

    console.log("Login attempt with:", formData);
    alert("Login successful! Welcome back to ChefBot!");
    window.location.href = "/home";
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page-container">
        {/* LEFT PANEL - Branding */}
        <div className="login-left-panel">
          <div className="login-logo-container">
            <div className="login-logo-circle">
              <img src="/logo.png" alt="ChefBot Logo" className="login-logo-img" />
            </div>
            <div className="login-logo-text">
              <h1>ChefBot</h1>
              <p>Your AI Cooking Assistant</p>
            </div>
          </div>
          
          <div className="login-welcome-section">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue your culinary journey with personalized recipes and cooking guidance.</p>
          </div>
          
          <ul className="login-features-list">
            <li><i className="fas fa-check-circle"></i> Personalized meal recommendations</li>
            <li><i className="fas fa-check-circle"></i> Smart meal planning tools</li>
            <li><i className="fas fa-check-circle"></i> Step-by-step cooking guidance</li>
            <li><i className="fas fa-check-circle"></i> Digital shopping list</li>
          </ul>
        </div>
        
        {/* RIGHT PANEL - Form */}
        <div className="login-right-panel">
          <div className="login-form-header">
            <h2>Login to Your Account</h2>
            <p>Enter your credentials to access ChefBot</p>
          </div>
          
          <form className="login-form-container" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label className="login-form-label" htmlFor="username">Username or Email</label>
              <div className="login-input-wrapper">
                <input
                  className="login-input"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username or email"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="login-form-group">
              <label className="login-form-label" htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <input
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button 
                  type="button" 
                  className="login-password-toggle"
                  onClick={togglePasswordVisibility}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {/* ✅ SAME AS SIGNUP - Font Awesome icons */}
                  <i className={showPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                </button>
              </div>
            </div>
            
            <div className="login-options">
              <label className="login-remember">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="login-forgot">Forgot Password?</Link>
            </div>
            
            <button type="submit" className="login-submit-btn">Login</button>
            
            <div className="login-signup-link">
              Don't have an account? <Link to="/signup">Sign up now</Link>
            </div>
            
            <div className="login-divider">
              <span>Or continue with</span>
            </div>
            
            <div className="login-social-login">
              <button type="button" className="login-social-btn login-social-google">
                G
              </button>
              <button type="button" className="login-social-btn login-social-facebook">
                f
              </button>
              <button type="button" className="login-social-btn login-social-twitter">
                𝕏
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;