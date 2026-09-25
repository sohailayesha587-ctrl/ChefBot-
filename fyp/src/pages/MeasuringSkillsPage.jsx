import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaLightbulb, FaExclamationTriangle, FaBirthdayCake, FaDotCircle, FaArrowLeft } from 'react-icons/fa';
import './MeasuringSkillsPage.css';

const CATEGORIES = [
  { key: 'measuring-tools', label: 'Tools & Equipment', description: 'Essential tools and equipment for accurate measuring.' },
  { key: 'measuring-techniques', label: 'Measuring Techniques', description: 'Master fundamental measuring techniques.' },
  { key: 'estimation', label: 'Estimation Skills', description: 'Learn to estimate quantities without tools.' },
  { key: 'conversions', label: 'Conversion Skills', description: 'Convert between different measurement units.' },
  { key: 'precision', label: 'Precision Skills', description: 'Achieve precise measurements for perfect results.' },
];

const parseContent = (content) => {
  if (!content) return {};
  if (typeof content === 'object') return content;
  try {
    return JSON.parse(content);
  } catch {
    return {};
  }
};

const MeasuringSkillsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('measuring-tools');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const [toolsData, setToolsData] = useState([]);
  const [techniquesData, setTechniquesData] = useState([]);
  const [estimationData, setEstimationData] = useState([]);
  const [conversionsData, setConversionsData] = useState([]);
  const [precisionData, setPrecisionData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/beginners-guides?category=measuring-skills');
        const guides = response.data.guides || [];

        setToolsData(guides.filter(g => g.subCategory === 'measuring-tools'));
        setTechniquesData(guides.filter(g => g.subCategory === 'measuring-techniques'));
        setEstimationData(guides.filter(g => g.subCategory === 'estimation'));
        setConversionsData(guides.filter(g => g.subCategory === 'conversions'));
        setPrecisionData(guides.filter(g => g.subCategory === 'precision'));

        if (guides.length === 0) setError('No measuring skills found in database.');
      } catch (err) {
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
    if (activeTab === 'measuring-tools') return toolsData;
    if (activeTab === 'measuring-techniques') return techniquesData;
    if (activeTab === 'estimation') return estimationData;
    if (activeTab === 'conversions') return conversionsData;
    if (activeTab === 'precision') return precisionData;
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
      <div className="msp-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && currentData.length === 0) {
    return (
      <div className="msp-container">
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
    <div className="msp-container">
      <div className="msp-mobile-topbar">
        <h1 className="msp-page-title">{activeCategory.label}</h1>
      </div>

      <div className="msp-categories-row">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`msp-cat-btn ${activeTab === cat.key ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        className={`msp-sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="msp-layout">
        <aside className={`msp-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="msp-sidebar-header">
            <h2 className="msp-sidebar-title">Measuring Skills</h2>
            <p className="msp-sidebar-subtitle">Master Kitchen Measurements</p>
          </div>
          <ul className="msp-categories-list">
            {CATEGORIES.map(cat => (
              <li
                key={cat.key}
                className={`msp-category-item${activeTab === cat.key ? ' msp-active' : ''}`}
                onClick={() => { setActiveTab(cat.key); setSidebarOpen(false); }}
              >
                <span className="msp-category-name">{cat.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="msp-main">
          <header className="msp-main-header">
            <div className="msp-header-content">
              <h1 className="msp-page-title desktop-title">{activeCategory.label}</h1>
              <p className="msp-page-description">{activeCategory.description}</p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          <div className="msp-items-grid-section">
            <div className="msp-items-grid">
              {currentData.map((item, index) => {
                const content = parseContent(item.content);
                return (
                  <div
                    key={item._id || index}
                    className="msp-item-card"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div
                      className="msp-card-image"
                      style={{ backgroundImage: `url(${item.image || '/api/placeholder/120/120'})` }}
                    />
                    <div className="msp-card-content">
                      <h3 className="msp-card-title">{item.title}</h3>
                      <p className="msp-card-description">{content.tagline || item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="msp-back-section">
            <button className="msp-back-button" onClick={() => navigate('/guidance')}>
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
        <div className="msp-lightbox-overlay" onClick={closeLightbox}>
          <button className="msp-lightbox-close" onClick={closeLightbox}>
            <FaTimes />
          </button>
          <img
            className="msp-lightbox-image"
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

  const allKeys = Object.keys(content);

  const extraSections = allKeys.filter(key => {
    const reserved = [
      'name', 'image', 'tagline', 'fullDesc', 'description',
      'keyFeatures', 'properUsage', 'steps', 'tips', 'commonMistakes',
      'category', 'subCategory', 'subcategory', 'type', 'types',
      'id', '_id', 'createdBy', 'createdAt', 'updatedAt', '__v',
      'filterTags', 'tags', 'status', 'material', 'price', 'priceRange',
      'durability', 'pros', 'cons', 'care', 'size', 'sizes', 'capacity',
      'diameter', 'length'
    ];
    if (reserved.includes(key)) return false;
    if (key.startsWith('_')) return false;
    const value = content[key];
    if (value === null || value === undefined) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return false;
  });

  const formatValue = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return value.name || value.description || JSON.stringify(value);
    return String(value);
  };

  const toLabel = (key) =>
    key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, c => c.toUpperCase());

  return (
    <div className="msp-modal-overlay" onClick={onClose}>
      <div className="msp-modal" onClick={e => e.stopPropagation()}>
        <button className="msp-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="msp-modal-hero">
          <p className="msp-modal-hero-label">Measuring Skill</p>
          <h2 className="msp-modal-hero-title">{item.title}</h2>
          <p className="msp-modal-hero-subtitle">{content.tagline || item.title}</p>
        </div>

        <div className="msp-modal-inner">
          <div className="msp-modal-left">
            <div className="msp-about-row">
              <div className="msp-about-text">
                <div className="msp-msec">
                  <span className="msp-msec-label">About this skill</span>
                  <p className="msp-msec-text">
                    {content.fullDesc || content.description || content.tagline || item.title}
                  </p>
                </div>
              </div>
              <div
                className="msp-about-thumb"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => onImageClick(image)}
              />
            </div>

            <hr className="msp-mdivider" />

            {content.keyFeatures?.length > 0 && (
              <>
                <div className="msp-uses-badge-row">
                  <div className="msp-uses-section">
                    <span className="msp-msec-label">Key Features</span>
                    <div className="msp-uses-wrap">
                      {content.keyFeatures.map((f, idx) => (
                        <div key={idx} className="msp-use-tag">
                          <span className="msp-use-dot"><FaDotCircle /></span>
                          {formatValue(f)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="msp-badge-section">
                    <span className="msp-msec-label">Category</span>
                    <div className="msp-category-badge">
                      <span className="msp-category-badge-icon"><FaBirthdayCake /></span>
                      <span className="msp-category-badge-value">{categoryLabel}</span>
                    </div>
                  </div>
                </div>
                <hr className="msp-mdivider" />
              </>
            )}

            <div className="msp-modal-two-col">
              {content.properUsage?.length > 0 && (
                <div className="msp-msec">
                  <span className="msp-msec-label">How to use it</span>
                  <div className="msp-steps-list">
                    {content.properUsage.map((step, idx) => (
                      <div key={idx} className="msp-step-card">
                        <span className="msp-step-num">{idx + 1}</span>
                        <span className="msp-step-txt">{formatValue(step)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.steps?.length > 0 && !content.properUsage?.length && (
                <div className="msp-msec">
                  <span className="msp-msec-label">How to use it</span>
                  <div className="msp-steps-list">
                    {content.steps.map((step, idx) => (
                      <div key={idx} className="msp-step-card">
                        <span className="msp-step-num">{idx + 1}</span>
                        <span className="msp-step-txt">{formatValue(step)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.tips && typeof content.tips === 'string' && (
                <div className="msp-msec">
                  <span className="msp-msec-label">Pro Tips</span>
                  <div className="msp-tip-card">
                    <span className="msp-tip-icon"><FaLightbulb /></span>
                    <span className="msp-tip-txt">{content.tips}</span>
                  </div>
                </div>
              )}
            </div>

            {content.commonMistakes?.length > 0 && (
              <>
                <hr className="msp-mdivider" />
                <div className="msp-msec">
                  <span className="msp-msec-label">Common Mistakes</span>
                  <div className="msp-mistakes-list">
                    {content.commonMistakes.map((m, idx) => (
                      <div key={idx} className="msp-mistake-card">
                        <span className="msp-mistake-icon"><FaExclamationTriangle /></span>
                        <span className="msp-tip-txt">{formatValue(m)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {extraSections.map(key => {
              const value = content[key];
              const items = Array.isArray(value) ? value : [value];

              return (
                <React.Fragment key={key}>
                  <hr className="msp-mdivider" />
                  <div className="msp-msec">
                    <span className="msp-msec-label">{toLabel(key)}</span>
                    <div className="msp-uses-wrap">
                      {items.map((entry, idx) => (
                        <div key={idx} className="msp-use-tag">
                          <span className="msp-use-dot"><FaDotCircle /></span>
                          {formatValue(entry)}
                        </div>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          <div className="msp-modal-right">
            <div
              className="msp-modal-right-image"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => onImageClick(image)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasuringSkillsPage;