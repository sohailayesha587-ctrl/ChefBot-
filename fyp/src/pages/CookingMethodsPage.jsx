import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CookingMethodsPage.css';

const CookingMethodsPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [cookingMethods, setCookingMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const safeToString = (value) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  useEffect(() => {
    fetchCookingMethods();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCookingMethods = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/beginners-guides', {
        params: { category: 'cooking-methods' }
      });
      
      const guides = response.data.guides || [];
      
      if (guides.length === 0) {
        setError('No cooking methods found in database.');
        setCookingMethods([]);
        setLoading(false);
        return;
      }

      const methods = guides.map((guide, index) => {
        let content = {};
        
        if (typeof guide.content === 'string') {
          try {
            if (guide.content.trim().startsWith('{')) {
              content = JSON.parse(guide.content);
            } else {
              content = { fullDesc: guide.content };
            }
          } catch (e) {
            content = { fullDesc: guide.content };
          }
        } else if (typeof guide.content === 'object' && guide.content !== null) {
          content = guide.content;
        }

        return {
          id: guide._id || index + 1,
          name: guide.title,
          tagline: content.tagline || guide.title,
          fullDesc: safeToString(content.fullDesc || content || `Learn about ${guide.title}`),
          keyUses: content.keyUses || ['General cooking'],
          image: guide.image || content.image || content.previewImg || '/api/placeholder/120/120',
          temperature: content.temperature || 'Varies',
          equipment: content.equipment || 'Standard cookware',
          bestFor: content.bestFor || 'Various dishes',
          tips: content.tips || ['Follow recipe instructions', 'Practice for perfection'],
          steps: content.steps || [
            'Prepare ingredients',
            'Heat the cooking vessel',
            'Add ingredients as directed',
            'Cook until done',
            'Serve hot'
          ]
        };
      });

      setCookingMethods(methods);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to load data from server.');
      setCookingMethods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setShowDetailPanel(true);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedMethod(null);
  };

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const getHeatType = (desc = '') => {
    const descStr = safeToString(desc);
    return descStr.toLowerCase().includes('moist') ? 'Moist Heat' : 'Dry Heat';
  };

  const LightbulbIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 19.5H14.5M9.5 21.5H14.5M12 2.5C8.5 2.5 5.5 5.2 5.5 9C5.5 11.5 7 13.5 8.5 15C9.5 16 10 17 10 18H14C14 17 14.5 16 15.5 15C17 13.5 18.5 11.5 18.5 9C18.5 5.2 15.5 2.5 12 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const WarningIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const CookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8h12l-1.5 9H7.5L6 8zM4 8h16M9 8V6a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const tipIcons = [<LightbulbIcon />, <LightbulbIcon />, <WarningIcon />, <LightbulbIcon />];

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
          <button onClick={fetchCookingMethods} className="retry-button">
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
          <div className="cmp-sidebar-methods">
            <ul className="cmp-methods-list">
              {cookingMethods.map(method => (
                <li
                  key={method.id}
                  className={`cmp-method-list-item${selectedMethod?.id === method.id ? ' cmp-active' : ''}`}
                  onClick={() => handleMethodSelect(method)}
                >
                  <span className="cmp-method-list-name">{method.name}</span>
                </li>
              ))}
            </ul>
          </div>
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
              {cookingMethods.map(method => (
                <div
                  key={method.id}
                  className="cmp-method-card"
                  onClick={() => handleMethodSelect(method)}
                >
                  <div className="cmp-card-image" style={{ backgroundImage: `url(${method.image})` }} />
                  <div className="cmp-card-content">
                    <h3 className="cmp-card-title">{method.name}</h3>
                    <p className="cmp-card-description">{method.tagline}</p>
                    <div className="cmp-card-heat-type">
                      <span className={`cmp-heat-badge ${safeToString(method.fullDesc).toLowerCase().includes('moist') ? 'moist-heat' : 'dry-heat'}`}>
                        {getHeatType(method.fullDesc)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cmp-back-section">
            <button
              className="cmp-back-button"
              onClick={() => navigate('/guidance')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back to Guidance Page</span>
            </button>
          </div>
        </main>
      </div>

      {showDetailPanel && selectedMethod && (
        <div className="cmp-modal-overlay" onClick={closeDetailPanel}>
          <div className="cmp-modal" onClick={e => e.stopPropagation()}>
            <button className="cmp-modal-close" onClick={closeDetailPanel}>×</button>

            <div className="cmp-modal-hero">
              <p className="cmp-modal-hero-label">Cooking Method</p>
              <h2 className="cmp-modal-hero-title">{selectedMethod.name}</h2>
              <p className="cmp-modal-hero-subtitle">{selectedMethod.tagline}</p>
            </div>

            <div className="cmp-modal-inner">
              <div className="cmp-modal-left">
                <div className="cmp-about-row">
                  <div className="cmp-about-text">
                    <div className="cmp-msec">
                      <span className="cmp-msec-label">About this method</span>
                      <p className="cmp-msec-text">{selectedMethod.fullDesc}</p>
                    </div>
                  </div>
                  <div
                    className="cmp-about-thumb"
                    style={{ backgroundImage: `url(${selectedMethod.image})` }}
                    onClick={() => openLightbox(selectedMethod.image)}
                  />
                </div>

                <hr className="cmp-mdivider" />

                <div className="cmp-uses-details-row">
                  <div className="cmp-uses-section">
                    <span className="cmp-msec-label">Common uses</span>
                    <div className="cmp-uses-wrap">
                      {selectedMethod.keyUses?.map((use, idx) => (
                        <div key={idx} className="cmp-use-tag">
                          <span className="cmp-use-dot">•</span>
                          {use}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="cmp-details-section">
                    <span className="cmp-msec-label">Method details</span>
                    <div className="cmp-detail-badges">
                      <div className="cmp-detail-badge">
                        <div className="cmp-detail-badge-text">
                          <span className="cmp-detail-badge-label">Temperature</span>
                          <span className="cmp-detail-badge-value">{selectedMethod.temperature}</span>
                        </div>
                      </div>

                      <div className="cmp-detail-badge">
                        <div className="cmp-detail-badge-text">
                          <span className="cmp-detail-badge-label">Equipment</span>
                          <span className="cmp-detail-badge-value">{selectedMethod.equipment}</span>
                        </div>
                      </div>

                      <div className="cmp-detail-badge">
                        <div className="cmp-detail-badge-text">
                          <span className="cmp-detail-badge-label">Best for</span>
                          <span className="cmp-detail-badge-value">{selectedMethod.bestFor}</span>
                        </div>
                      </div>

                      <div className={`cmp-heat-pill ${safeToString(selectedMethod.fullDesc).toLowerCase().includes('moist') ? 'moist-heat' : 'dry-heat'}`}>
                        {getHeatType(selectedMethod.fullDesc)}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="cmp-mdivider" />

                <div className="cmp-modal-two-col">
                  <div className="cmp-msec">
                    <span className="cmp-msec-label">How to do it</span>
                    <div className="cmp-steps-list">
                      {selectedMethod.steps?.map((step, idx) => (
                        <div key={idx} className="cmp-step-card">
                          <span className="cmp-step-num">{idx + 1}</span>
                          <span className="cmp-step-txt">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="cmp-msec">
                    <span className="cmp-msec-label">Pro tips</span>
                    <div className="cmp-tips-list">
                      {selectedMethod.tips?.map((tip, idx) => (
                        <div key={idx} className="cmp-tip-card">
                          <span className="cmp-tip-icon">{tipIcons[idx % tipIcons.length]}</span>
                          <span className="cmp-tip-txt">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="cmp-modal-right">
                <div
                  className="cmp-modal-right-image"
                  style={{ backgroundImage: `url(${selectedMethod.image})` }}
                  onClick={() => openLightbox(selectedMethod.image)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div className="cmp-lightbox-overlay" onClick={closeLightbox}>
          <button className="cmp-lightbox-close" onClick={closeLightbox}>×</button>
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

export default CookingMethodsPage;