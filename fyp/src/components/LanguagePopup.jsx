import React from 'react';
import './LanguagePopup.css';

const LanguagePopup = ({ onLanguageSelected }) => {
  const handleEnglish = () => {
    sessionStorage.setItem('languagePopupSelected', 'true');

    if (onLanguageSelected) {
      onLanguageSelected();
    }

    if (window.changeChefBotLanguage) {
      window.changeChefBotLanguage('en', true);
    } else {
      window.location.href = '/';
    }
  };

  const handleUrdu = () => {
    sessionStorage.setItem('languagePopupSelected', 'true');

    if (onLanguageSelected) {
      onLanguageSelected();
    }

    if (window.changeChefBotLanguage) {
      window.changeChefBotLanguage('ur', true);
    }
  };

  return (
    <div className="lang-popup-overlay">
      <div className="lang-popup-box notranslate">
        <h2>Select Language</h2>
        <p>Choose your preferred language</p>

        <button
          type="button"
          className="lang-btn english-btn"
          onClick={handleEnglish}
        >
          English
        </button>

        <button
          type="button"
          className="lang-btn urdu-btn"
          onClick={handleUrdu}
        >
          اردو
        </button>
      </div>
    </div>
  );
};

export default LanguagePopup;