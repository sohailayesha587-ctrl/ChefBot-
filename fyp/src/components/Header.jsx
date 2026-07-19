import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AlarmModal from './AlarmModal';
import './Header.css';

const Header = ({ onSettingsClick }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const authPages = ['/login-page', '/signup', '/forgot-password', '/verify-otp', '/reset-password', '/logout'];
  if (authPages.includes(location.pathname)) return null;
  if (location.pathname === '/urdu-login' || location.pathname === '/Alarm') return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMobileMenu(false);
    }
  };

  const openAlarm = () => {
    if (!user) { navigate('/login-page'); return; }
    setIsAlarmOpen(true);
  };

  const changeLanguage = (lang) => {
    setShowLang(false);
    navigate(lang === 'ur' ? '/urdu-public' : '/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('hideHeader');
    window.location.href = '/login-page';
  };

  return (
    <>
      <nav className="navbar-top">
        <div className="welcome-text">Hey guys! Welcome to ChefBot, Your Cooking Assistant</div>
      </nav>

      <nav className="navbar-main navbar-desktop">
        <div className="logo">
          <img src="/logo.png" alt="ChefBot Logo" className="logo-img" />
        </div>

        <div className="nav-center">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/meal-suggestion" className="nav-link">Suggestions</Link>

          <div className="h-search-container">
            <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
              <input
                type="text"
                placeholder="Search recipes..."
                className="h-search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
              <button type="submit" className="h-search-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="nav-right">
          {!user && <Link to="/login-page" className="login-btn-nav"><i className="fas fa-sign-in-alt"></i> Login</Link>}
          {user && <div className="simple-icon alarm-icon" onClick={openAlarm}><i className="fas fa-bell"></i></div>}
          
          <div className="language-selector">
            <div className="simple-icon" onClick={() => setShowLang(!showLang)}><i className="fas fa-globe"></i></div>
            <span>EN/UR</span>
            {showLang && (
              <div className="language-dropdown">
                <div onClick={() => changeLanguage('en')}>English</div>
                <div onClick={() => changeLanguage('ur')}>اردو</div>
              </div>
            )}
          </div>

          {user && <div className="simple-icon settings-icon" onClick={onSettingsClick}><i className="fas fa-cog"></i></div>}
          {user && <div className="simple-icon logout-icon" onClick={logout}><i className="fas fa-sign-out-alt"></i></div>}
        </div>
      </nav>

      <nav className="navbar-main navbar-mobile">
        <div className="mobile-logo">
          <img src="/logo.png" alt="ChefBot Logo" className="mobile-logo-img" />
        </div>

        <div className="mobile-search-container">
          <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <i className="fas fa-search mobile-search-icon"></i>
            <input
              type="text"
              placeholder="Search..."
              className="mobile-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            />
          </form>
        </div>

        <div className="mobile-nav-right">
          <Link to="/home" className="mobile-icon-btn"><i className="fas fa-home"></i></Link>
          {user && <div className="mobile-icon-btn" onClick={openAlarm}><i className="fas fa-bell"></i></div>}
          {!user && <Link to="/login-page" className="mobile-login-btn-nav"><i className="fas fa-sign-in-alt"></i> Login</Link>}
          <div className="mobile-icon-btn" onClick={() => setMobileMenu(!mobileMenu)}>
            <i className={mobileMenu ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </div>

        {mobileMenu && (
          <div className="mobile-dropdown" onClick={() => setMobileMenu(false)}>
            <Link to="/meal-suggestion" className="mobile-dropdown-link"><i className="fas fa-utensil-spoon"></i> Meal Suggestion</Link>
            <Link to="/home" className="mobile-dropdown-link"><i className="fas fa-home"></i> Home</Link>
            <Link to="/about" className="mobile-dropdown-link"><i className="fas fa-info-circle"></i> About</Link>
            <Link to="/contact" className="mobile-dropdown-link"><i className="fas fa-envelope"></i> Contact</Link>
            <div className="mobile-dropdown-divider"></div>
            <div className="mobile-dropdown-lang">
              <span onClick={() => changeLanguage('en')}>🇬🇧 English</span>
              <span onClick={() => changeLanguage('ur')}>🇵🇰 اردو</span>
            </div>
            {user && (
              <>
                <div className="mobile-dropdown-link" onClick={onSettingsClick}><i className="fas fa-cog"></i> Settings</div>
                <div className="mobile-dropdown-link mobile-logout" onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</div>
              </>
            )}
          </div>
        )}
      </nav>

      <AlarmModal isOpen={isAlarmOpen} onClose={() => setIsAlarmOpen(false)} />
    </>
  );
};

export default Header;