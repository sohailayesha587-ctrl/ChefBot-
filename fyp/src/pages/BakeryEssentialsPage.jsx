import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";
import './BakeryEssentialsPage.css';

const BakeryEssentialsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('tools');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const [toolsData, setToolsData] = useState([]);
  const [techniquesData, setTechniquesData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [decoratingData, setDecoratingData] = useState([]);

  const navigate = useNavigate();
  const API_URL = '/api/beginners-guides';

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = ['tools', 'techniques', 'ingredients', 'temperature', 'decorating'];

      const results = await Promise.all(
        categories.map(async (cat) => {
          try {
            const response = await axios.get(`${API_URL}?category=${cat}`);
            return { category: cat, data: response.data.guides || [] };
          } catch (err) {
            console.error(`Error fetching ${cat}:`, err);
            return { category: cat, data: [] };
          }
        })
      );

      let hasData = false;
      results.forEach(result => {
        if (result.data.length > 0) hasData = true;
        switch (result.category) {
          case 'tools': setToolsData(result.data); break;
          case 'techniques': setTechniquesData(result.data); break;
          case 'ingredients': setIngredientsData(result.data); break;
          case 'temperature': setTemperatureData(result.data); break;
          case 'decorating': setDecoratingData(result.data); break;
          default: break;
        }
      });

      if (!hasData) {
        setError('No bakery data found in database.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data from server.');
    } finally {
      setLoading(false);
    }
  };

  const parseContent = (content) => {
    if (!content) return {};
    if (typeof content === 'object' && content !== null) return content;
    if (typeof content === 'string') {
      try {
        return JSON.parse(content);
      } catch(e) {
        return { fullDesc: content, tagline: content };
      }
    }
    return {};
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'tools': return toolsData;
      case 'techniques': return techniquesData;
      case 'ingredients': return ingredientsData;
      case 'temperature': return temperatureData;
      case 'decorating': return decoratingData;
      default: return toolsData;
    }
  };

  const sidebarItems = [
    { key: 'tools', label: 'Tools & Equipment' },
    { key: 'techniques', label: 'Baking Techniques' },
    { key: 'ingredients', label: 'Ingredients Guide' },
    { key: 'temperature', label: 'Temperature Control' },
    { key: 'decorating', label: 'Decorating Tools' },
  ];

  const getCategoryTitle = () => {
    return sidebarItems.find(s => s.key === activeTab)?.label || 'Bakery Essentials';
  };

  const getCategoryDescription = () => {
    switch (activeTab) {
      case 'tools': return 'Essential tools and equipment for professional baking.';
      case 'techniques': return 'Master fundamental and advanced baking techniques.';
      case 'ingredients': return 'Comprehensive guide to key baking ingredients.';
      case 'temperature': return 'Precise temperature control for perfect baking results.';
      case 'decorating': return 'Tools and techniques for beautiful cake decoration.';
      default: return 'Master professional baking with our comprehensive guides.';
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowDetailPanel(true);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedItem(null);
  };

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const BakeryIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.5 2 5.5 4.5 5.5 8C5.5 10 6.5 11.5 8 12.5V14H16V12.5C17.5 11.5 18.5 10 18.5 8C18.5 4.5 15.5 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 14V19C8 20.1 8.9 21 10 21H14C15.1 21 16 20.1 16 19V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const LightbulbIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 19.5H14.5M9.5 21.5H14.5M12 2.5C8.5 2.5 5.5 5.2 5.5 9C5.5 11.5 7 13.5 8.5 15C9.5 16 10 17 10 18H14C14 17 14.5 16 15.5 15C17 13.5 18.5 11.5 18.5 9C18.5 5.2 15.5 2.5 12 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const WarningIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const tipIcons = [<LightbulbIcon />, <LightbulbIcon />, <WarningIcon />];

  if (loading) {
    return (
      <div className="bep-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && getCurrentData().length === 0) {
    return (
      <div className="bep-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchAllData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentData = getCurrentData();

  return (
    <div className="bep-container">
      <div className="bep-mobile-topbar">
        <h1 className="bep-page-title">{getCategoryTitle()}</h1>
      </div>

      <div className="bep-categories-row">
        {sidebarItems.map(item => (
          <button
            key={item.key}
            className={`bep-cat-btn ${activeTab === item.key ? 'active' : ''}`}
            onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        className={`bep-sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="bep-layout">
        <aside className={`bep-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="bep-sidebar-header">
            <h2 className="bep-sidebar-title">Bakery Essentials</h2>
            <p className="bep-sidebar-subtitle">Master Professional Baking</p>
          </div>
          <div className="bep-sidebar-categories">
            <ul className="bep-categories-list">
              {sidebarItems.map(item => (
                <li
                  key={item.key}
                  className={`bep-category-item${activeTab === item.key ? ' bep-active' : ''}`}
                  onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
                >
                  <span className="bep-category-name">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="bep-main">
          <header className="bep-main-header">
            <div className="bep-header-content">
              <h1 className="bep-page-title desktop-title">{getCategoryTitle()}</h1>
              <p className="bep-page-description">{getCategoryDescription()}</p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          <div className="bep-items-grid-section">
            <div className="bep-items-grid">
              {currentData.map((item, index) => {
                const content = parseContent(item.content);
                return (
                  <div
                    key={item._id || index}
                    className="bep-item-card"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="bep-card-image" style={{ backgroundImage: `url(${item.image || '/api/placeholder/120/120'})` }} />
                    <div className="bep-card-content">
                      <h3 className="bep-card-title">{item.title}</h3>
                      <p className="bep-card-description">{content.tagline || item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bep-back-section">
            <button
              className="bep-back-button"
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

      {showDetailPanel && selectedItem && (() => {
        const content = parseContent(selectedItem.content);
        return (
          <div className="bep-modal-overlay" onClick={closeDetailPanel}>
            <div className="bep-modal" onClick={e => e.stopPropagation()}>
<button className="bep-modal-close" onClick={closeDetailPanel}>
  <FaTimes />
</button>
              <div className="bep-modal-hero">
                <p className="bep-modal-hero-label">Bakery Essential</p>
                <h2 className="bep-modal-hero-title">{selectedItem.title}</h2>
                <p className="bep-modal-hero-subtitle">{content.tagline || selectedItem.title}</p>
              </div>

              <div className="bep-modal-inner">
                <div className="bep-modal-left">
                  <div className="bep-about-row">
                    <div className="bep-about-text">
                      <div className="bep-msec">
                        <span className="bep-msec-label">About this essential</span>
                        <p className="bep-msec-text">{content.fullDesc || content.tagline || selectedItem.title}</p>
                      </div>
                    </div>
                    <div
                      className="bep-about-thumb"
                      style={{ backgroundImage: `url(${selectedItem.image || '/api/placeholder/200/200'})` }}
                      onClick={() => openLightbox(selectedItem.image || '/api/placeholder/200/200')}
                    />
                  </div>

                  <hr className="bep-mdivider" />

                  {content.keyFeatures && content.keyFeatures.length > 0 && (
                    <>
                      <div className="bep-uses-badge-row">
                        <div className="bep-uses-section">
                          <span className="bep-msec-label">Key Features</span>
                          <div className="bep-uses-wrap">
                            {content.keyFeatures.map((f, idx) => (
                              <div key={idx} className="bep-use-tag">
                                <span className="bep-use-dot">•</span>
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bep-badge-section">
                          <span className="bep-msec-label">Category</span>
                          <div className="bep-category-badge">
                            <span className="bep-category-badge-icon"><BakeryIcon /></span>
                            <span className="bep-category-badge-value">{getCategoryTitle()}</span>
                          </div>
                        </div>
                      </div>
                      <hr className="bep-mdivider" />
                    </>
                  )}

                  <div className="bep-modal-two-col">
                    {content.steps && content.steps.length > 0 && (
                      <div className="bep-msec">
                        <span className="bep-msec-label">How to use it</span>
                        <div className="bep-steps-list">
                          {content.steps.map((step, idx) => (
                            <div key={idx} className="bep-step-card">
                              <span className="bep-step-num">{idx + 1}</span>
                              <span className="bep-step-txt">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {content.properUsage && content.properUsage.length > 0 && (
                      <div className="bep-msec">
                        <span className="bep-msec-label">Proper usage</span>
                        <div className="bep-tips-list">
                          {content.properUsage.map((tip, idx) => (
                            <div key={idx} className="bep-tip-card">
                              <span className="bep-tip-icon">{tipIcons[idx % tipIcons.length]}</span>
                              <span className="bep-tip-txt">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {content.commonMistakes && content.commonMistakes.length > 0 && (
                    <>
                      <hr className="bep-mdivider" />
                      <div className="bep-msec">
                        <span className="bep-msec-label">Common mistakes</span>
                        <div className="bep-mistakes-list">
                          {content.commonMistakes.map((m, idx) => (
                            <div key={idx} className="bep-mistake-card">
                              <span className="bep-mistake-icon"><WarningIcon /></span>
                              <span className="bep-tip-txt">{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {content.tips && (
                    <>
                      <hr className="bep-mdivider" />
                      <div className="bep-msec">
                        <span className="bep-msec-label">Pro tips</span>
                        <div className="bep-tip-card">
                          <span className="bep-tip-icon"><LightbulbIcon /></span>
                          <span className="bep-tip-txt">{content.tips}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="bep-modal-right">
                  <div
                    className="bep-modal-right-image"
                    style={{ backgroundImage: `url(${selectedItem.image || '/api/placeholder/400/400'})` }}
                    onClick={() => openLightbox(selectedItem.image || '/api/placeholder/400/400')}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {lightboxImage && (
        <div className="bep-lightbox-overlay" onClick={closeLightbox}>
          <button className="bep-lightbox-close" onClick={closeLightbox}>×</button>
          <img
            className="bep-lightbox-image"
            src={lightboxImage}
            alt="Full view"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default BakeryEssentialsPage;