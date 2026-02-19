import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UrduSignUpPage.css';

const UrduSignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert("پاسورڈز مماثل نہیں ہیں!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("براہ کرم درست ای میل پتہ درج کریں!");
      return;
    }

    if (!formData.terms) {
      alert("آپ کو سروس کی شرائط اور رازداری کی پالیسی قبول کرنی ہوگی!");
      return;
    }

    // Simulate successful signup
    alert("اکاؤنٹ کامیابی سے بن گیا! شیف بوٹ میں خوش آمدید!");
    window.location.href = "/home";
  };

  return (
    <div className="urdu-signup-section">
      <div className="urdu-signup-image">
        <div className="urdu-signup-content">
          <h1>ہماری کھانا پکانے والی کمیونٹی میں شامل ہوں</h1>
          <p>اپنا اکاؤنٹ بنائیں اور مزیدار ترکیبوں، سمارٹ کھانے کی منصوبہ بندی، اور AI سے چلنے والی کھانا پکانے کی معاونت کی دنیا کو کھولیں۔</p>
          
          <ul className="urdu-features">
            <li><i className="fas fa-check-circle"></i> ذاتی نوعیت کی ترکیب کی سفارشات</li>
            <li><i className="fas fa-check-circle"></i> سمارٹ کھانے کی منصوبہ بندی کے اوزار</li>
            <li><i className="fas fa-check-circle"></i> قدم بہ قدم کھانا پکانے کی رہنمائی</li>
            <li><i className="fas fa-check-circle"></i> غذائیت سے بھرپور ٹریکنگ</li>
            <li><i className="fas fa-check-circle"></i> اپنی پسندیدہ ترکیبیں محفوظ اور منظم کریں</li>
          </ul>
        </div>
      </div>
      
      <div className="urdu-signup-form-container">
        <div className="urdu-signup-form">
          <h2>اکاؤنٹ بنائیں</h2>
          <p>اپنا کھانا پکانے کا سفر شروع کرنے کے لیے سائن اپ کریں</p>
          
          <form onSubmit={handleSubmit}>
            <div className="urdu-form-group">
              <label htmlFor="fullname">پورا نام</label>
              <input 
                type="text" 
                id="fullname" 
                name="fullname"
                className="urdu-form-control" 
                placeholder="اپنا پورا نام درج کریں" 
                value={formData.fullname}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="urdu-form-group">
              <label htmlFor="email">ای میل پتہ</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className="urdu-form-control" 
                placeholder="اپنا ای میل درج کریں" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="urdu-form-group">
              <label htmlFor="password">پاسورڈ</label>
              <div className="urdu-password-container">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  name="password"
                  className="urdu-form-control" 
                  placeholder="پاسورڈ بنائیں" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button 
                  type="button" 
                  className="urdu-toggle-password" 
                  onClick={togglePasswordVisibility}
                  title={showPassword ? "پاسورڈ چھپائیں" : "پاسورڈ دکھائیں"}
                >
                  <i className={showPassword ? "far fa-eye" : "far fa-eye-slash"}></i>
                </button>
              </div>
            </div>
            
            <div className="urdu-form-group">
              <label htmlFor="confirmPassword">پاسورڈ کی تصدیق کریں</label>
              <input 
                type={showPassword ? "text" : "password"} 
                id="confirmPassword" 
                name="confirmPassword"
                className="urdu-form-control" 
                placeholder="اپنے پاسورڈ کی تصدیق کریں" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="urdu-checkbox-container">
              <input 
                type="checkbox" 
                id="terms" 
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="terms">میں <a href="#">سروس کی شرائط</a> اور <a href="#">رازداری کی پالیسی</a> سے اتفاق کرتا ہوں</label>
            </div>
            
            <button type="submit" className="urdu-btn-signup">اکاؤنٹ بنائیں</button>
            
            <div className="urdu-divider">
              <span>یا اس کے ساتھ سائن اپ کریں</span>
            </div>
            
            <div className="urdu-social-login">
              <button type="button" className="urdu-btn-social">
                <i className="fab fa-google" style={{color: "#DB4437"}}></i> Google
              </button>
              <button type="button" className="urdu-btn-social">
                <i className="fab fa-facebook-f" style={{color: "#4267B2"}}></i> Facebook
              </button>
            </div>
            
            <div className="urdu-login-link">
              پہلے سے اکاؤنٹ ہے؟ <Link to="/login-page">لاگ ان کریں</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UrduSignUpPage;