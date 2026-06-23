import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLang, setShowLang] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const openAlarmModal = () => {
    if (window.openAlarmModal) {
      window.openAlarmModal();
    } else {
      alert("Alarm modal is loading... Please wait or refresh.");
    }
  };

  const changeLanguage = (lang) => {
    setShowLang(false);
    if (lang === "ur") {
      navigate("/urdu-public");
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    console.log("Header - Location:", location.pathname);
  }, [location]);

  if (location.pathname === '/login-page' || location.pathname === '/Alarm') {
    return null;
  }

  if (location.pathname === '/urdu-login' || location.pathname === '/Alarm') {
    return null;
  }

  return (
    <>
      <nav className="navbar-top">
        <div className="welcome-text">
          Hey guys! Welcome to ChefBot - Your AI Cooking Assistant
        </div>
      </nav>

      <nav className="navbar-main">
        <div className="logo">
          <img src="/logo.png" alt="ChefBot Logo" className="logo-img" />
        </div>

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

        <div className="nav-right">
          <div className="simple-icon alarm-icon" onClick={openAlarmModal} title="Open Alarm Timer">
            <i className="fas fa-bell"></i>
          </div>

          <div className="language-selector">
            <div
              className="simple-icon"
              onClick={() => setShowLang(!showLang)}
            >
              <i className="fas fa-globe"></i>
            </div>
            <span>EN/UR</span>

            {showLang && (
              <div className="language-dropdown">
                <div onClick={() => changeLanguage("en")}>
                  English
                </div>
                <div onClick={() => changeLanguage("ur")}>
                  اردو
                </div>
              </div>
            )}
          </div>

          <div 
            className="simple-icon logout-icon" 
            title="Logout"
            onClick={() => {
              localStorage.removeItem("userToken");
              localStorage.removeItem("userEmail");
              alert("You have been logged out!");
              navigate("/login-page");
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;