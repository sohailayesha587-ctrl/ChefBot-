import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ onSettingsClick }) => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const authPages = [
    '/login-page',
    '/signup',
    '/forgot-password',
    '/verify-otp',
    '/reset-password',
    '/logout'
  ];

  if (authPages.includes(location.pathname)) return null;
  if (location.pathname === '/urdu-login') return null;

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
      } catch (error) {
        setResults([]);
        setShowResults(false);
      }
    };

    const timer = setTimeout(() => {
      searchData();
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(search.trim())}`);
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
        <div className="welcome-text">
          Hey guys! Welcome to ChefBot, Your Cooking Assistant
        </div>
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
                    if (results.length > 0) setShowResults(true);
                  }}
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

            {showResults && (
              <div className="search-dropdown">
                {results.length > 0 ? (
                  <>
                    {results.map((result) => (
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

                         <span className={`search-result-type ${result.type}`}>
  {result.type === 'recipe'
    ? 'Recipe'
    : result.type === 'guide'
    ? 'Guide'
    : 'Feature'}
</span>
                        </div>
                      </div>
                    ))}

                    
                  </>
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
            <Link to="/login-page" className="login-btn-nav">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          )}

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
                <div onClick={() => changeLanguage('en')}>English</div>
                <div onClick={() => changeLanguage('ur')}>اردو</div>
              </div>
            )}
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
            <div className="simple-icon logout-icon" onClick={logout}>
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
                onFocus={() => {
                  if (results.length > 0) setShowResults(true);
                }}
                autoComplete="off"
              />
            </form>
          </div>

          {showResults && (
            <div className="mobile-search-dropdown">
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
<span className={`search-result-type ${result.type}`}>
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

        <div className="mobile-nav-right">
          <Link to="/home" className="mobile-icon-btn">
            <i className="fas fa-home"></i>
          </Link>

          {!user && (
            <Link to="/login-page" className="mobile-login-btn-nav">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          )}

          <div
            className="mobile-icon-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <i className={mobileMenu ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </div>

        {mobileMenu && (
          <div
            className="mobile-dropdown"
            onClick={() => setMobileMenu(false)}
          >
            <Link to="/meal-suggestion" className="mobile-dropdown-link">
              <i className="fas fa-utensil-spoon"></i> Meal Suggestion
            </Link>

            <Link to="/home" className="mobile-dropdown-link">
              <i className="fas fa-home"></i> Home
            </Link>

            <Link to="/about" className="mobile-dropdown-link">
              <i className="fas fa-info-circle"></i> About
            </Link>

            <Link to="/contact" className="mobile-dropdown-link">
              <i className="fas fa-envelope"></i> Contact
            </Link>

            <div className="mobile-dropdown-divider"></div>

            <div className="mobile-dropdown-lang">
              <span onClick={() => changeLanguage('en')}>🇬🇧 English</span>
              <span onClick={() => changeLanguage('ur')}>🇵🇰 اردو</span>
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
      </nav>
    </>
  );
};

export default Header;