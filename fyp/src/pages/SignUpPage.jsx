import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
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
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (!formData.terms) {
      alert("You must accept the Terms of Service and Privacy Policy!");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        name: formData.fullname,
        email: formData.email,
        registeredAt: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      alert("Account created successfully! Welcome to ChefBot!");
      setLoading(false);
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="signup-section">
      <div className="signup-image">
        <div className="signup-content">
          <h1>Join Our Culinary Community</h1>
          <p>Create your account and unlock a world of delicious recipes, smart meal planning, and AI-powered cooking assistance.</p>
          
          <ul className="features">
            <li>
              <span className="check-icon">✓</span>
              Personalized recipe recommendations
            </li>
            <li>
              <span className="check-icon">✓</span>
              Smart meal planning tools
            </li>
            <li>
              <span className="check-icon">✓</span>
              Step-by-step cooking guidance
            </li>
            <li>
              <span className="check-icon">✓</span>
              Nutritional tracking
            </li>
            <li>
              <span className="check-icon">✓</span>
              Save and organize your favorite recipes
            </li>
          </ul>
        </div>
      </div>
      
      <div className="signup-form-container">
        <div className="signup-form">
          <h2>Create Account</h2>
          <p>Sign up to start your culinary journey</p>
          
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                id="confirmPassword" 
                name="confirmPassword"
                className="form-control" 
                placeholder="Confirm your password" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="terms">I agree to the Terms of Service and Privacy Policy</label>
            </div>
            
            <button type="submit" className="btn-signup" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
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