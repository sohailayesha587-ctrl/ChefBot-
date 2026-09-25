import React from 'react';
import './LanguagePopup.css';

const LanguagePopup = ({ onLanguageSelected }) => {
  const token = localStorage.getItem('userToken');

  if (token) {
    return null;
  }

  const selectLanguage = (langCode) => {
    sessionStorage.setItem('languagePopupSelected', 'true');

    if (onLanguageSelected) {
      onLanguageSelected();
    }

    if (langCode === 'ur') {
      document.cookie = 'googtrans=/en/ur; path=/;';
    } else {
      document.cookie = 'googtrans=; max-age=0; path=/;';
    }

    document.documentElement.setAttribute('dir', langCode === 'ur' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', langCode);

    window.location.href = '/';
  };

  return (
    <div className="lang-popup-overlay">
      <div className="lang-popup-box notranslate">
        <h2>Select Language</h2>
        <p>Choose your preferred language</p>

        <button
          type="button"
          className="lang-btn english-btn"
          onClick={() => selectLanguage('en')}
        >
          English
        </button>

        <button
          type="button"
          className="lang-btn urdu-btn"
          onClick={() => selectLanguage('ur')}
        >
          اردو
        </button>
      </div>
    </div>
  );
};

export default LanguagePopup;