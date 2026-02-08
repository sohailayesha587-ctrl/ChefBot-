import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // ❌ useNavigate HATAO
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  // ❌ useNavigate HATA DIYA
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  // ✅ CORRECT FUNCTION - Modal kholega
  const openAlarmModal = () => {
    console.log("🔔 Alarm icon clicked!");
    
    // ✅ Yeh line IMPORTANT hai:
    if (window.openAlarmModal) {
      window.openAlarmModal(); // AlarmModal.jsx ka function call karo
    } else {
      console.error("❌ openAlarmModal not found! Check AlarmModal.jsx");
      alert("Alarm modal is loading... Please wait or refresh.");
    }
  };

  useEffect(() => {
    console.log("Header - Location:", location.pathname);
  }, [location]);

  if (location.pathname === '/login-page' || location.pathname === '/Alarm') {
    return null;
  }
  
  return (
    <>
      {/* Top Welcome Bar */}
      <nav className="navbar-top">
        <div className="welcome-text">
          Hey guys! Welcome to ChefBot - Your AI Cooking Assistant
        </div>
      </nav>

      {/* Main Navigation */}
      <nav className="navbar-main">
        {/* Logo */}
        <div className="logo">
          <img src="/logo.png" alt="ChefBot Logo" className="logo-img" />
        </div>
        
        {/* Center Links + Search */}
        <div className="nav-center">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/login-page" className="nav-link">Login</Link>
          <Link to="/guidance" className="nav-link">Guidance</Link>
          
          <div className="h-search-container">
            <input 
              type="text" 
              placeholder="Search recipes..." 
              className="h-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="h-search-btn" onClick={handleSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Right Icons */}
        <div className="nav-right">
          {/* ✅ Alarm Bell - CORRECT onClick */}
          <div className="simple-icon alarm-icon" onClick={openAlarmModal} title="Open Alarm Timer">
            <i className="fas fa-bell"></i>
          </div>
          
          {/* Language */}
          <div className="language-selector">
            <div className="simple-icon">
              <i className="fas fa-globe"></i>
            </div>
            <span>EN/UR</span>
          </div>
          
          {/* User */}
          <div className="simple-icon">
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;