import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaLightbulb, FaExclamationTriangle, FaUtensils, FaDotCircle, FaArrowLeft } from 'react-icons/fa';
import './CookingMethodsPage.css';

const parseContent = (content) => {
  if (!content) return {};
  if (typeof content === 'object') return content;
  try {
    return JSON.parse(content);
  } catch {
    return { fullDesc: content, tagline: content };
  }
};

const CookingMethodsPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cookingMethods, setCookingMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCookingMethods = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/beginners-guides?category=cooking-methods');
        const guides = response.data.guides || [];

        setCookingMethods(guides);
        if (guides.length === 0) setError('No cooking methods found in database.');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchCookingMethods();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => setSelectedMethod(null);
  const openLightbox = (url) => setLightboxImage(url);
  const closeLightbox = () => setLightboxImage(null);

  if (loading) {
    return (
      <div className="cmp-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && cookingMethods.length === 0) {
    return (
      <div className="cmp-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cmp-container">
      <div className="cmp-mobile-topbar">
        <h1 className="cmp-page-title">Cooking Methods</h1>
      </div>

      <div
        className={`cmp-sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="cmp-layout">
        <aside className={`cmp-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="cmp-sidebar-header">
            <h2 className="cmp-sidebar-title">Cooking Methods</h2>
            <p className="cmp-sidebar-subtitle">Essential Techniques</p>
          </div>
          <ul className="cmp-methods-list">
            {cookingMethods.map(method => (
              <li
                key={method._id}
                className={`cmp-method-list-item${selectedMethod?._id === method._id ? ' cmp-active' : ''}`}
                onClick={() => handleMethodSelect(method)}
              >
                <span className="cmp-method-list-name">{method.title}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="cmp-main">
          <header className="cmp-main-header">
            <div className="cmp-header-content">
              <h1 className="cmp-page-title desktop-title">Essential Cooking Methods</h1>
              <p className="cmp-page-description">
                Master fundamental cooking techniques to elevate your culinary skills.
              </p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          <div className="cmp-methods-grid-section">
            <div className="cmp-methods-grid">
              {cookingMethods.map(method => {
                const content = parseContent(method.content);
                return (
                  <div
                    key={method._id}
                    className="cmp-method-card"
                    onClick={() => handleMethodSelect(method)}
                  >
                    <div
                      className="cmp-card-image"
                      style={{ backgroundImage: `url(${method.image || '/api/placeholder/120/120'})` }}
                    />
                    <div className="cmp-card-content">
                      <h3 className="cmp-card-title">{method.title}</h3>
                      <p className="cmp-card-description">{content.tagline || method.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cmp-back-section">
            <button className="cmp-back-button" onClick={() => navigate('/guidance')}>
              <FaArrowLeft />
              <span>Back to Guidance Page</span>
            </button>
          </div>
        </main>
      </div>

      {selectedMethod && (
        <DetailModal
          method={selectedMethod}
          onClose={closeDetailPanel}
          onImageClick={openLightbox}
        />
      )}

      {lightboxImage && (
        <div className="cmp-lightbox-overlay" onClick={closeLightbox}>
          <button className="cmp-lightbox-close" onClick={closeLightbox}>
            <FaTimes />
          </button>
          <img
            className="cmp-lightbox-image"
            src={lightboxImage}
            alt="Full view"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const DetailModal = ({ method, onClose, onImageClick }) => {
  const content = parseContent(method.content);
  const image = method.image || '/api/placeholder/400/400';
  const tipIcons = [<FaLightbulb />, <FaLightbulb />, <FaExclamationTriangle />];

  return (
    <div className="cmp-modal-overlay" onClick={onClose}>
      <div className="cmp-modal" onClick={e => e.stopPropagation()}>
        <button className="cmp-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="cmp-modal-hero">
          <p className="cmp-modal-hero-label">Cooking Method</p>
          <h2 className="cmp-modal-hero-title">{method.title}</h2>
          <p className="cmp-modal-hero-subtitle">{content.tagline || method.title}</p>
        </div>

        <div className="cmp-modal-inner">
          <div className="cmp-modal-left">
            <div className="cmp-about-row">
              <div className="cmp-about-text">
                <div className="cmp-msec">
                  <span className="cmp-msec-label">About this method</span>
                  <p className="cmp-msec-text">{content.fullDesc || content.tagline || method.title}</p>
                </div>
              </div>
              <div
                className="cmp-about-thumb"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => onImageClick(image)}
              />
            </div>

            <hr className="cmp-mdivider" />

            {content.keyUses?.length > 0 && (
              <>
                <div className="cmp-uses-section">
                  <span className="cmp-msec-label">Common uses</span>
                  <div className="cmp-uses-wrap">
                    {content.keyUses.map((use, idx) => (
                      <div key={idx} className="cmp-use-tag">
                        <span className="cmp-use-dot"><FaDotCircle /></span>
                        {use}
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="cmp-mdivider" />
              </>
            )}

            <div className="cmp-modal-two-col">
              {content.steps?.length > 0 && (
                <div className="cmp-msec">
                  <span className="cmp-msec-label">How to do it</span>
                  <div className="cmp-steps-list">
                    {content.steps.map((step, idx) => (
                      <div key={idx} className="cmp-step-card">
                        <span className="cmp-step-num">{idx + 1}</span>
                        <span className="cmp-step-txt">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.tips?.length > 0 && (
                <div className="cmp-msec">
                  <span className="cmp-msec-label">Pro tips</span>
                  <div className="cmp-tips-list">
                    {content.tips.map((tip, idx) => (
                      <div key={idx} className="cmp-tip-card">
                        <span className="cmp-tip-icon">{tipIcons[idx % tipIcons.length]}</span>
                        <span className="cmp-tip-txt">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="cmp-modal-right">
            <div
              className="cmp-modal-right-image"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => onImageClick(image)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingMethodsPage;