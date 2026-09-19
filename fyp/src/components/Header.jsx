import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Header.css';

const Header = ({ onSettingsClick, onLanguageChange }) => {
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeLang, setActiveLang] = useState('en');

  const location = useLocation();
  const navigate = useNavigate();

  const authPages = [
    '/login-page',
    '/forgot-password',
    '/verify-otp',
    '/reset-password',
    '/logout',
    '/dashboard'
  ];

  const clearGoogleTranslateCookie = () => {
    const hostname = window.location.hostname;
    const expire =
      'expires=Thu, 01 Jan 1970 00:00:00 UTC;';

    document.cookie = `googtrans=; ${expire} path=/;`;
    document.cookie = `googtrans=; ${expire} path=/; domain=${hostname};`;
    document.cookie = `googtrans=; ${expire} path=/; domain=.${hostname};`;
  };

  const changeLanguage = (langCode, redirectToHome = false) => {
    setShowLang(false);

    const select = document.querySelector('.goog-te-combo');

    if (langCode === 'en') {
      setActiveLang('en');

      if (onLanguageChange) {
        onLanguageChange('en');
      }

      clearGoogleTranslateCookie();

      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');

      document.body.setAttribute('dir', 'ltr');
      document.body.classList.remove('urdu-mode');
      document.body.classList.add('english-mode');

      if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
      }

      if (redirectToHome) {
        window.location.href = '/';
      }

      return;
    }

    setActiveLang('ur');

    if (onLanguageChange) {
      onLanguageChange('ur');
    }

    document.cookie = 'googtrans=/en/ur; path=/;';

    const hostname = window.location.hostname;

    document.cookie = `googtrans=/en/ur; path=/; domain=${hostname};`;
    document.cookie = `googtrans=/en/ur; path=/; domain=.${hostname};`;

    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ur');

    document.body.setAttribute('dir', 'rtl');
    document.body.classList.remove('english-mode');
    document.body.classList.add('urdu-mode');

    if (select) {
      select.value = 'ur';
      select.dispatchEvent(new Event('change'));
    }

    if (redirectToHome) {
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  useEffect(() => {
    window.changeChefBotLanguage = changeLanguage;

    return () => {
      delete window.changeChefBotLanguage;
    };
  }, [onLanguageChange]);

  useEffect(() => {
    const isUrdu = document.cookie.includes('googtrans=/en/ur');

    if (isUrdu) {
      setActiveLang('ur');

      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ur');

      document.body.setAttribute('dir', 'rtl');
      document.body.classList.remove('english-mode');
      document.body.classList.add('urdu-mode');
    } else {
      setActiveLang('en');

      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');

      document.body.setAttribute('dir', 'ltr');
      document.body.classList.remove('urdu-mode');
      document.body.classList.add('english-mode');
    }

    window.googleTranslateElementInit = () => {
      if (
        window.google &&
        window.google.translate &&
        document.getElementById('google_translate_element')
      ) {
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

    const observer = new MutationObserver(() => {
      const banner = document.querySelector('.goog-te-banner-frame');

      if (banner) {
        banner.style.display = 'none';
      }

      document.body.style.top = '0px';
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const searchData = async () => {
      if (search.trim().length < 2) {
        setResults([]);
        setShowResults(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(search.trim())}`
        );

        const data = await response.json();

        if (data.success) {
          setResults(data.results || []);
          setShowResults(true);
        }
      } catch {
        setResults([]);
        setShowResults(false);
      }
    };

    const timer = setTimeout(searchData, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(
        `/search-results?q=${encodeURIComponent(search.trim())}`
      );

      setShowResults(false);
      setMobileMenu(false);
    }
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

  if (authPages.includes(location.pathname)) return null;
  if (location.pathname === '/urdu-login') return null;

  return (
    <>
      <nav className="navbar-top">
        <div className="welcome-text">
          Hey guys! Welcome to ChefBot, Your Cooking Assistant
        </div>
      </nav>

      <nav className="navbar-main navbar-desktop">
        <div className="logo">
          <img
            src="/logo.png"
            alt="ChefBot Logo"
            className="logo-img"
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
                  onFocus={() => {
                    if (results.length > 0) {
                      setShowResults(true);
                    }
                  }}
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
                {results.length > 0 ? (
                  results.map((result) => (
                    <div
                      className="search-result-item"
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleResultClick(result)}
                    >
                      {result.image ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="search-result-image"
                        />
                      ) : (
                        <div className="search-result-placeholder">
                          <i className="fas fa-utensils"></i>
                        </div>
                      )}

                      <div className="search-result-content">
                        <div className="search-result-title">
                          {result.title}
                        </div>

                        <div className="search-result-description">
                          {result.description}
                        </div>

                        <span
                          className={`search-result-type ${result.type}`}
                        >
                          {result.type === 'recipe'
                            ? 'Recipe'
                            : result.type === 'guide'
                            ? 'Guide'
                            : 'Feature'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="search-no-results">
                    No results found
                  </div>
                )}
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
              onClick={() => changeLanguage('ur', true)}
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
      </nav>

      <nav className="navbar-main navbar-mobile">
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
              <i className="fas fa-utensil-spoon"></i>
              Meal Suggestion
            </Link>

            <Link
              to="/home"
              className="mobile-dropdown-link"
            >
              <i className="fas fa-home"></i>
              Home
            </Link>

            <Link
              to="/about"
              className="mobile-dropdown-link"
            >
              <i className="fas fa-info-circle"></i>
              About
            </Link>

            <Link
              to="/contact"
              className="mobile-dropdown-link"
            >
              <i className="fas fa-envelope"></i>
              Contact
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
                onClick={() => changeLanguage('ur', true)}
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
                  <i className="fas fa-cog"></i>
                  Settings
                </div>

                <div
                  className="mobile-dropdown-link mobile-logout"
                  onClick={logout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </div>
              </>
            )}
          </div>
        )}
      </nav>

      <div
        id="google_translate_element"
        style={{ display: 'none' }}
      ></div>
    </>
  );
};

export default Header;