import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UrduLoginPage.css';

const UrduLoginPage = () => {
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
      alert("براہ کرم صارف نام اور پاسورڈ دونوں درج کریں!");
      return;
    }

    console.log("Login attempt with:", formData);
    alert("لاگ ان کامیاب! شیف بوٹ میں خوش آمدید!");
    window.location.href = "/home";
  };

  return (
    <div className="urdu-login-page-wrapper">
      <div className="urdu-login-page-container">
        {/* LEFT PANEL - Branding */}
        <div className="urdu-login-left-panel">
          <div className="urdu-login-logo-container">
            <div className="urdu-login-logo-circle">
              <img src="/logo.png" alt="شیف بوٹ لوگو" className="urdu-login-logo-img" />
            </div>
            <div className="urdu-login-logo-text">
              <h1>شیف بوٹ</h1>
              <p>آپ کا AI باورچی خانے کا مددگار</p>
            </div>
          </div>
          
          <div className="urdu-login-welcome-section">
            <h2>خوش آمدید!</h2>
            <p>ذاتی نوعیت کی ترکیبوں اور کھانا پکانے کی رہنمائی کے ساتھ اپنا کھانا پکانے کا سفر جاری رکھنے کے لیے سائن ان کریں۔</p>
          </div>
          
          <ul className="urdu-login-features-list">
            <li><i className="fas fa-check-circle"></i> ذاتی نوعیت کی کھانے کی سفارشات</li>
            <li><i className="fas fa-check-circle"></i> سمارٹ کھانے کی منصوبہ بندی کے اوزار</li>
            <li><i className="fas fa-check-circle"></i> قدم بہ قدم کھانا پکانے کی رہنمائی</li>
            <li><i className="fas fa-check-circle"></i> ڈیجیٹل شاپنگ لسٹ</li>
          </ul>
        </div>
        
        {/* RIGHT PANEL - Form */}
        <div className="urdu-login-right-panel">
          <div className="urdu-login-form-header">
            <h2>اپنے اکاؤنٹ میں لاگ ان کریں</h2>
            <p>شیف بوٹ تک رسائی کے لیے اپنی اسناد درج کریں</p>
          </div>
          
          <form className="urdu-login-form-container" onSubmit={handleSubmit}>
            <div className="urdu-login-form-group">
              <label className="urdu-login-form-label" htmlFor="username">صارف نام یا ای میل</label>
              <div className="urdu-login-input-wrapper">
                <input
                  className="urdu-login-input"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="اپنا صارف نام یا ای میل درج کریں"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="urdu-login-form-group">
              <label className="urdu-login-form-label" htmlFor="password">پاسورڈ</label>
              <div className="urdu-login-input-wrapper">
                <input
                  className="urdu-login-input"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="اپنا پاسورڈ درج کریں"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button 
                  type="button" 
                  className="urdu-login-password-toggle"
                  onClick={togglePasswordVisibility}
                  title={showPassword ? "پاسورڈ چھپائیں" : "پاسورڈ دکھائیں"}
                >
                  <i className={showPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                </button>
              </div>
            </div>
            
            <div className="urdu-login-options">
              <label className="urdu-login-remember">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleInputChange}
                />
                مجھے یاد رکھیں
              </label>
              <Link to="/forgot-password" className="urdu-login-forgot">پاسورڈ بھول گئے؟</Link>
            </div>
            
            <button type="submit" className="urdu-login-submit-btn">لاگ ان کریں</button>
            
            <div className="urdu-login-signup-link">
              اکاؤنٹ نہیں ہے؟ <Link to="/signup">ابھی سائن اپ کریں</Link>
            </div>
            
            <div className="urdu-login-divider">
              <span>یا جاری رکھیں</span>
            </div>
            
            <div className="urdu-login-social-login">
              <button type="button" className="urdu-login-social-btn urdu-login-social-google">
                G
              </button>
              <button type="button" className="urdu-login-social-btn urdu-login-social-facebook">
                f
              </button>
              <button type="button" className="urdu-login-social-btn urdu-login-social-twitter">
                𝕏
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UrduLoginPage;