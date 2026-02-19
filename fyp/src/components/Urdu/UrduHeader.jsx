import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './UrduHeader.css'; // Same CSS use karega

const UrduHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [showLang, setShowLang] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const openAlarmModal = () => {
    console.log("🔔 Alarm icon clicked!");
    if (window.openAlarmModal) {
      window.openAlarmModal();
    } else {
      console.error("❌ openAlarmModal not found!");
      alert("Alarm modal is loading... Please wait or refresh.");
    }
  };

  const changeLanguage = (lang) => {
    setShowLang(false);
    if (lang === "ur") {
      navigate("/urdu-home");  // Urdu page
    } else {
      navigate("/home");       // English page
    }
  };

  useEffect(() => {
    console.log("UrduHeader - Location:", location.pathname);
  }, [location]);

  if (location.pathname === '/urdu-login' || location.pathname === '/Alarm') {
    return null;
  }

  return (
    <>
      {/* Top Welcome Bar */}
      <nav className="urdu-navbar-top">
        <div className="urdu-welcome-text">
          ChefBot میں خوش آمدید - آپ کا AI cooking assistant
        </div>
      </nav>

      {/* Main Navigation */}
      <nav className="urdu-navbar-main">

        {/* Logo */}
        <div className="urdu-logo">
          <img src="/logo.png" alt="ChefBot Logo" className="urdu-logo-img" />
        </div>

        {/* Center Links + Search */}
        <div className="urdu-nav-center">
          <Link to="/urdu-home" className="urdu-nav-link">ہوم</Link>
          <Link to="/urdu-about" className="urdu-nav-link">ہمارے بارے میں</Link>
          <Link to="/urdu-contact" className="urdu-nav-link">رابطہ</Link>
          <Link to="/urdu-login" className="urdu-nav-link">لاگ ان</Link>
          <Link to="/urdu-guidance" className="urdu-nav-link">رہنمائی</Link>

          <div className="urdu-h-search-container">
            <input
              type="text"
              placeholder="ریسپی تلاش کریں..."
              className="urdu-h-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="urdu-h-search-btn" onClick={handleSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Icons */}
        <div className="urdu-nav-right">
          {/* Alarm */}
          <div className="urdu-simple-icon urdu-alarm-icon" onClick={openAlarmModal} title="الارم کھولیں">
            <i className="fas fa-bell"></i>
          </div>

          {/* Language Selector */}
          <div className="urdu-language-selector">
            <div className="urdu-simple-icon" onClick={() => setShowLang(!showLang)}>
              <i className="fas fa-globe"></i>
            </div>
            <span>EN/UR</span>
            {showLang && (
              <div className="urdu-language-dropdown">
                <div onClick={() => changeLanguage("en")}>English</div>
                <div onClick={() => changeLanguage("ur")}>اردو</div>
              </div>
            )}
          </div>

          {/* User */}
          <div className="urdu-simple-icon">
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default UrduHeader;
