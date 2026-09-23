import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Header.css';

const currentPath = window.location.pathname;

const Header = ({ onSettingsClick, onLanguageChange }) => {
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeLang, setActiveLang] = useState('en');

  const navigate = useNavigate();

  const authPages = [
    '/login-page',
    '/signup',
    '/forgot-password',
    '/verify-otp',
    '/reset-password',
    '/signup-verify-otp',
    '/dashboard'
  ];

  if (authPages.includes(currentPath)) {
    return null;
  }

  const changeLanguage = (langCode) => {
    setActiveLang(langCode);

    if (onLanguageChange) {
      onLanguageChange(langCode);
    }

    if (langCode === 'ur') {
      document.cookie = 'googtrans=/en/ur; path=/;';
    } else {
      document.cookie = 'googtrans=; max-age=0; path=/;';
    }

    if (langCode === 'ur') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }

    window.location.reload();
  };

  useEffect(() => {
    const isUrdu = document.cookie.includes('googtrans=/en/ur');

    setActiveLang(isUrdu ? 'ur' : 'en');

    document.documentElement.setAttribute(
      'dir',
      isUrdu ? 'rtl' : 'ltr'
    );

    document.documentElement.setAttribute(
      'lang',
      isUrdu ? 'ur' : 'en'
    );

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'ur',
            autoDisplay: false
          },
          'google_translate_element'
        );
      }
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');

      script.id = 'google-translate-script';
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (search.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    fetch(`/api/search?q=${search.trim()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResults(data.results || []);
          setShowResults(true);
        }
      })
      .catch(() => {
        setResults([]);
        setShowResults(false);
      });
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleResultClick = (result) => {
    navigate(result.route);
    setSearch('');
    setResults([]);
    setShowResults(false);
    setMobileMenu(false);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('hideHeader');

    window.location.href = '/login-page';
  };


  return (
    <>
      <div className="navbar-top">
        <div className="welcome-text">
          Hey guys! Welcome to ChefBot, Your Cooking Assistant
        </div>
      </div>


      <div className="navbar-main navbar-desktop">
        <div className="logo">
          <img
            src="/logo.png" alt="ChefBot Logo" className="logo-img"
          />
        </div>

        <div className="nav-center">
          <Link to="/home" className="nav-link">
            Home
          </Link>

          <Link to="/about" className="nav-link">
            About
          </Link>

          <Link to="/contact" className="nav-link">
            Contact
          </Link>

          <Link to="/meal-suggestion" className="nav-link">
            Suggestions
          </Link>

          <div className="h-search-wrapper">
            <div className="h-search-container">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search ChefBot..."
                  className="h-search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() =>
                    results.length > 0 && setShowResults(true)
                  }
                  autoComplete="off"
                />

                <button
                  type="submit"
                  className="h-search-btn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </button>
              </form>
            </div>

           {showResults && (
  <div className="search-dropdown">
    {results.map((result) => (
      <div
        className="search-result-item"
        key={result.id}
        onClick={() => navigate(result.route)}
      >
        {result.image && (
          <img
            src={result.image}
            alt={result.title}
            className="search-result-image"
          />
        )}

        <div className="search-result-content">
          <b>{result.title}</b>
          <p>{result.type}</p>
        </div>
      </div>
    ))}
  </div>
)}
          </div>
        </div>

        <div className="nav-right">
          {!user && (
            <Link
              to="/login-page"
              className="login-btn-nav"
            >
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          )}

          <div className="language-selector notranslate">
            <button
              type="button"
              className={`lang-toggle-btn ${
                activeLang === 'en' ? 'active' : ''
              }`}
              onClick={() => changeLanguage('en')}
            >
              EN
            </button>

            <span className="lang-divider">|</span>

            <button
              type="button"
              className={`lang-toggle-btn ${
                activeLang === 'ur' ? 'active' : ''
              }`}
              onClick={() => changeLanguage('ur')}
            >
              اردو
            </button>
          </div>

          {user && (
            <div
              className="simple-icon settings-icon"
              onClick={onSettingsClick}
            >
              <i className="fas fa-cog"></i>
            </div>
          )}

          {user && (
            <div
              className="simple-icon logout-icon"
              onClick={logout}
            >
              <i className="fas fa-sign-out-alt"></i>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-main navbar-mobile">
        <div className="mobile-logo">
          <img
            src="/logo.png"
            alt="ChefBot Logo"
            className="mobile-logo-img"
          />
        </div>

        <div className="mobile-search-wrapper">
          <div className="mobile-search-container">
            <form onSubmit={handleSearch}>
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
        </div>

        <div className="mobile-nav-right">
          <Link
            to="/home"
            className="mobile-icon-btn"
          >
            <i className="fas fa-home"></i>
          </Link>

          {!user && (
            <Link
              to="/login-page"
              className="mobile-login-btn-nav"
            >
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          )}

          <div
            className="mobile-icon-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <i
              className={
                mobileMenu
                  ? 'fas fa-times'
                  : 'fas fa-bars'
              }
            ></i>
          </div>
        </div>

        {mobileMenu && (
          <div
            className="mobile-dropdown"
            onClick={() => setMobileMenu(false)}
          >
            <Link
              to="/meal-suggestion"
              className="mobile-dropdown-link"
            >
              <i className="fas fa-utensil-spoon"></i>{' '}
              Meal Suggestion
            </Link>

            <Link
              to="/home"
              className="mobile-dropdown-link"
            >
              <i className="fas fa-home"></i> Home
            </Link>

            <Link
              to="/about"
              className="mobile-dropdown-link"
            >
              <i className="fas fa-info-circle"></i> About
            </Link>

            <Link
              to="/contact"
              className="mobile-dropdown-link"
            >
              <i className="fas fa-envelope"></i> Contact
            </Link>

            <div className="mobile-dropdown-divider"></div>

            <div className="mobile-dropdown-lang mobile-dropdown-lang-widget notranslate">
              <button
                type="button"
                className={`lang-toggle-btn ${
                  activeLang === 'en' ? 'active' : ''
                }`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>

              <span className="lang-divider">|</span>

              <button
                type="button"
                className={`lang-toggle-btn ${
                  activeLang === 'ur' ? 'active' : ''
                }`}
                onClick={() => changeLanguage('ur')}
              >
                اردو
              </button>
            </div>

            {user && (
              <>
                <div
                  className="mobile-dropdown-link"
                  onClick={onSettingsClick}
                >
                  <i className="fas fa-cog"></i> Settings
                </div>

                <div
                  className="mobile-dropdown-link mobile-logout"
                  onClick={logout}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div
        id="google_translate_element"
        style={{ display: 'none' }}></div>
    </>
  );
};

export default Header;