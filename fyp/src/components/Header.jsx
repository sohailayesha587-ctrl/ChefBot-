import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation(); // ✅ Better way to get current path
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  // ✅ Use effect to track path changes
  useEffect(() => {
    console.log("Header - Location changed to:", location.pathname);
    console.log("Header - Is signup page?", location.pathname === '/signup');
  }, [location]);

  // ✅ LOGIN PAGE PE - NO HEADER
  if (location.pathname === '/login-page') {
    console.log("Hiding header for login-page");
    return null; 
  }
  
  // ✅ All other pages (INCLUDING SIGNUP) should show header
  console.log("Showing header for path:", location.pathname);
  
  return (
    <>
      {/* FIRST NAVBAR - Welcome Bar */}
      <nav className="navbar-top">
        <div className="welcome-text">Hey guys! Welcome to ChefBot - Your AI Cooking Assistant</div>
      </nav>

      {/* SECOND NAVBAR - Main Navigation */}
      <nav className="navbar-main">
        {/* Left: Logo */}
        <div className="logo">
          <img src="/logo.png" alt="ChefBot Logo" className="logo-img" />
        </div>
        
        {/* Center: Links + Search */}
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
        
        {/* Right: Icons */}
        <div className="nav-right">
          <div className="simple-icon">
            <i className="fas fa-bell"></i>
          </div>
          <div className="language-selector">
            <div className="simple-icon">
              <i className="fas fa-globe"></i>
            </div>
            <span>EN/UR</span>
          </div>
          <div className="simple-icon">
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;