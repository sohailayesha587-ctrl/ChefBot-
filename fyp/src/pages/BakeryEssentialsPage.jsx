import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaLightbulb, FaExclamationTriangle, FaBirthdayCake, FaDotCircle, FaArrowLeft } from 'react-icons/fa';
import './BakeryEssentialsPage.css';


const CATEGORIES = [
  {
    key: 'tools',
    label: 'Tools & Equipment',
    description: 'Essential tools and equipment for professional baking.',
  },
  {
    key: 'techniques',
    label: 'Baking Techniques',
    description: 'Master fundamental and advanced baking techniques.',
  },
  {
    key: 'ingredients',
    label: 'Ingredients Guide',
    description: 'Comprehensive guide to key baking ingredients.',
  },
  {
    key: 'temperature',
    label: 'Temperature Control',
    description: 'Precise temperature control for perfect baking results.',
  },
  {
    key: 'decorating',
    label: 'Decorating Tools',
    description: 'Tools and techniques for beautiful cake decoration.',
  },
];

const parseContent = (content) => {
  if (!content) 
    return {};
  if (typeof content === 'object') 
    return content;
 
};

const BakeryEssentialsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
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

useEffect(() => {
  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const toolsRes = await axios.get('/api/beginners-guides?category=tools');
      const techniquesRes = await axios.get('/api/beginners-guides?category=techniques');
      const ingredientsRes = await axios.get('/api/beginners-guides?category=ingredients');
      const temperatureRes = await axios.get('/api/beginners-guides?category=temperature');
      const decoratingRes = await axios.get('/api/beginners-guides?category=decorating');

    setToolsData(toolsRes.data.guides || []);
setTechniquesData(techniquesRes.data.guides || []);
setIngredientsData(ingredientsRes.data.guides || []);
setTemperatureData(temperatureRes.data.guides || []);
setDecoratingData(decoratingRes.data.guides || []);
    }
    catch (err)
     {
      console.error('Error fetching data:', err);
      setError('Failed to load data from server.');
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();
}, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCurrentData = () => {
    if (activeTab === 'tools') return toolsData;
    if (activeTab === 'techniques') return techniquesData;
    if (activeTab === 'ingredients') return ingredientsData;
    if (activeTab === 'temperature') return temperatureData;
    if (activeTab === 'decorating') return decoratingData;
    return toolsData;
  };

  const activeCategory = CATEGORIES.find(c => c.key === activeTab);
  const currentData = getCurrentData();

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => setSelectedItem(null);
  const openLightbox = (url) => setLightboxImage(url);
  const closeLightbox = () => setLightboxImage(null);

  if (loading) {
    return (
      <div className="bep-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && currentData.length === 0) {
    return (
      <div className="bep-container">
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
    <div className="bep-container">
      <div className="bep-mobile-topbar">
        <h1 className="bep-page-title">{activeCategory.label}</h1>
      </div>

      <div className="bep-categories-row">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`bep-cat-btn ${activeTab === cat.key ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.key)}
          >
            {cat.label}
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
          <ul className="bep-categories-list">
            {CATEGORIES.map(cat => (
              <li
                key={cat.key}
                className={`bep-category-item${activeTab === cat.key ? ' bep-active' : ''}`}
                onClick={() => { setActiveTab(cat.key); setSidebarOpen(false); }}
              >
                <span className="bep-category-name">{cat.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="bep-main">
          <header className="bep-main-header">
            <div className="bep-header-content">
              <h1 className="bep-page-title desktop-title">{activeCategory.label}</h1>
              <p className="bep-page-description">{activeCategory.description}</p>
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
                    <div
                      className="bep-card-image"
                      style={{ backgroundImage: `url(${item.image || '/api/placeholder/120/120'})` }}
                    />
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
            <button className="bep-back-button" onClick={() => navigate('/guidance')}>
              <FaArrowLeft />
              <span>Back to Guidance Page</span>
            </button>
          </div>
        </main>
      </div>

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          categoryLabel={activeCategory.label}
          onClose={closeDetailPanel}
          onImageClick={openLightbox}
        />
      )}

      {lightboxImage && (
        <div className="bep-lightbox-overlay" onClick={closeLightbox}>
          <button className="bep-lightbox-close" onClick={closeLightbox}>
            <FaTimes />
          </button>
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

const DetailModal = ({ item, categoryLabel, onClose, onImageClick }) => {
  const content = parseContent(item.content);
  const image = item.image || '/api/placeholder/400/400';
  const tipIcons = [<FaLightbulb />, <FaLightbulb />, <FaExclamationTriangle />];

  return (
    <div className="bep-modal-overlay" onClick={onClose}>
      <div className="bep-modal" onClick={e => e.stopPropagation()}>
        <button className="bep-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="bep-modal-hero">
          <p className="bep-modal-hero-label">Bakery Essential</p>
          <h2 className="bep-modal-hero-title">{item.title}</h2>
          <p className="bep-modal-hero-subtitle">{content.tagline || item.title}</p>
        </div>

        <div className="bep-modal-inner">
          <div className="bep-modal-left">
            <div className="bep-about-row">
              <div className="bep-about-text">
                <div className="bep-msec">
                  <span className="bep-msec-label">About this essential</span>
                  <p className="bep-msec-text">
                    {content.fullDesc || content.tagline || item.title}
                  </p>
                </div>
              </div>
              <div
                className="bep-about-thumb"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => onImageClick(image)}
              />
            </div>

            <hr className="bep-mdivider" />

            {content.keyFeatures?.length > 0 && (
              <>
                <div className="bep-uses-badge-row">
                  <div className="bep-uses-section">
                    <span className="bep-msec-label">Key Features</span>
                    <div className="bep-uses-wrap">
                      {content.keyFeatures.map((f, idx) => (
                        <div key={idx} className="bep-use-tag">
                          <span className="bep-use-dot"><FaDotCircle /></span>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bep-badge-section">
                    <span className="bep-msec-label">Category</span>
                    <div className="bep-category-badge">
                      <span className="bep-category-badge-icon"><FaBirthdayCake /></span>
                      <span className="bep-category-badge-value">{categoryLabel}</span>
                    </div>
                  </div>
                </div>
                <hr className="bep-mdivider" />
              </>
            )}

            <div className="bep-modal-two-col">
              {content.steps?.length > 0 && (
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

              {content.properUsage?.length > 0 && (
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

            {content.commonMistakes?.length > 0 && (
              <>
                <hr className="bep-mdivider" />
                <div className="bep-msec">
                  <span className="bep-msec-label">Common mistakes</span>
                  <div className="bep-mistakes-list">
                    {content.commonMistakes.map((m, idx) => (
                      <div key={idx} className="bep-mistake-card">
                        <span className="bep-mistake-icon"><FaExclamationTriangle /></span>
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
                    <span className="bep-tip-icon"><FaLightbulb /></span>
                    <span className="bep-tip-txt">{content.tips}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bep-modal-right">
            <div
              className="bep-modal-right-image"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => onImageClick(image)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BakeryEssentialsPage;