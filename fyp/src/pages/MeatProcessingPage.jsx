import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaLightbulb, FaExclamationTriangle, FaBirthdayCake, FaDotCircle, FaArrowLeft } from 'react-icons/fa';
import './MeatProcessingPage.css';

const MEAT_TYPES = [
  { key: 'beef', label: 'Beef', description: 'Professional beef processing ,deboning, cleaning, and cuts' },
  { key: 'lamb', label: 'Lamb', description: 'Professional lamb processing ,deboning, cleaning, and cuts' },
  { key: 'poultry', label: 'Poultry', description: 'Professional poultry processing, deboning, cleaning, and cuts' },
  { key: 'fish', label: 'Fish', description: 'Professional fish processing ,deboning, cleaning, and cuts' },
  { key: 'game', label: 'Game', description: 'Professional game processing, deboning, cleaning, and cuts' },
];

const PROCESS_TABS = [
  { key: 'deboning', label: 'Deboning' },
  { key: 'cleaning', label: 'Cleaning' },
  { key: 'cuts', label: 'Cuts' },
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

const MeatProcessingPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeMeat, setActiveMeat] = useState('beef');
  const [activeTab, setActiveTab] = useState('deboning');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const [beefData, setBeefData] = useState([]);
  const [lambData, setLambData] = useState([]);
  const [poultryData, setPoultryData] = useState([]);
  const [fishData, setFishData] = useState([]);
  const [gameData, setGameData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/beginners-guides?category=meat-processing');
        const allGuides = response.data.guides || [];

        const beef = [], lamb = [], poultry = [], fish = [], game = [];

        allGuides.forEach(guide => {
          const content = parseContent(guide.content);
          const meatType = content.meatType || 'beef';

          if (meatType === 'beef') beef.push(guide);
          else if (meatType === 'lamb') lamb.push(guide);
          else if (meatType === 'poultry') poultry.push(guide);
          else if (meatType === 'fish') fish.push(guide);
          else if (meatType === 'game') game.push(guide);
        });

        setBeefData(beef);
        setLambData(lamb);
        setPoultryData(poultry);
        setFishData(fish);
        setGameData(game);

        if (allGuides.length === 0) setError('No meat processing data found in database.');
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

  const getMeatData = (meatKey) => {
    if (meatKey === 'beef') return beefData;
    if (meatKey === 'lamb') return lambData;
    if (meatKey === 'poultry') return poultryData;
    if (meatKey === 'fish') return fishData;
    if (meatKey === 'game') return gameData;
    return beefData;
  };

  const getFilteredData = () => {
    const list = getMeatData(activeMeat);
    return list.filter(item => parseContent(item.content).type === activeTab);
  };

  const getCount = (meatKey, tabKey) => {
    const list = getMeatData(meatKey);
    return list.filter(item => parseContent(item.content).type === tabKey).length;
  };

  const currentData = getFilteredData();
  const activeMeatCategory = MEAT_TYPES.find(m => m.key === activeMeat);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => setSelectedItem(null);
  const openLightbox = (url) => setLightboxImage(url);
  const closeLightbox = () => setLightboxImage(null);

  if (loading) {
    return (
      <div className="mep-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && currentData.length === 0) {
    return (
      <div className="mep-container">
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
    <div className="mep-container">
      <div className="mep-mobile-topbar">
        <h1 className="mep-page-title">{activeMeatCategory.label}</h1>
      </div>

      <div className="mep-categories-row">
        {MEAT_TYPES.map(meat => (
          <button
            key={meat.key}
            className={`mep-cat-btn ${activeMeat === meat.key ? 'active' : ''}`}
            onClick={() => setActiveMeat(meat.key)}
          >
            {meat.label}
          </button>
        ))}
      </div>

      <div
        className={`mep-sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="mep-layout">
        <aside className={`mep-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="mep-sidebar-header">
            <h2 className="mep-sidebar-title">Meat Processing</h2>
            <p className="mep-sidebar-subtitle">Professional Butchery Skills</p>
          </div>
          <ul className="mep-categories-list">
            {MEAT_TYPES.map(meat => (
              <li
                key={meat.key}
                className={`mep-category-item${activeMeat === meat.key ? ' mep-active' : ''}`}
                onClick={() => { setActiveMeat(meat.key); setSidebarOpen(false); }}
              >
                <span className="mep-category-name">{meat.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="mep-main">
          <header className="mep-main-header">
            <div className="mep-header-content">
              <h1 className="mep-page-title desktop-title">{activeMeatCategory.label}</h1>
              <p className="mep-page-description">{activeMeatCategory.description}</p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          <div className="mep-filter-bar">
            {PROCESS_TABS.map(tab => (
              <button
                key={tab.key}
                className={`mep-filter-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label} ({getCount(activeMeat, tab.key)})
              </button>
            ))}
          </div>

          <div className="mep-items-grid-section">
            <div className="mep-items-grid">
              {currentData.map((item, index) => {
                const content = parseContent(item.content);
                return (
                  <div
                    key={item._id || index}
                    className="mep-item-card"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div
                      className="mep-card-image"
                      style={{ backgroundImage: `url(${item.image || '/api/placeholder/120/120'})` }}
                    />
                    <div className="mep-card-content">
                      <h3 className="mep-card-title">{item.title}</h3>
                      <p className="mep-card-description">{content.tagline || item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mep-back-section">
            <button className="mep-back-button" onClick={() => navigate('/guidance')}>
              <FaArrowLeft />
              <span>Back to Guidance Page</span>
            </button>
          </div>
        </main>
      </div>

      {selectedItem && (
        <DetailModal
          item={selectedItem}
          categoryLabel={activeMeatCategory.label}
          onClose={closeDetailPanel}
          onImageClick={openLightbox}
        />
      )}

      {lightboxImage && (
        <div className="mep-lightbox-overlay" onClick={closeLightbox}>
          <button className="mep-lightbox-close" onClick={closeLightbox}>
            <FaTimes />
          </button>
          <img
            className="mep-lightbox-image"
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
    <div className="mep-modal-overlay" onClick={onClose}>
      <div className="mep-modal" onClick={e => e.stopPropagation()}>
        <button className="mep-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="mep-modal-hero">
          <p className="mep-modal-hero-label">Meat Processing</p>
          <h2 className="mep-modal-hero-title">{item.title}</h2>
          <p className="mep-modal-hero-subtitle">{content.tagline || item.title}</p>
        </div>

        <div className="mep-modal-inner">
          <div className="mep-modal-left">
            <div className="mep-about-row">
              <div className="mep-about-text">
                <div className="mep-msec">
                  <span className="mep-msec-label">About this process</span>
                  <p className="mep-msec-text">
                    {content.fullDesc || content.tagline || item.title}
                  </p>
                </div>
              </div>
              <div
                className="mep-about-thumb"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => onImageClick(image)}
              />
            </div>

            <hr className="mep-mdivider" />

            {content.keyFeatures?.length > 0 && (
              <>
                <div className="mep-uses-badge-row">
                  <div className="mep-uses-section">
                    <span className="mep-msec-label">Key Features</span>
                    <div className="mep-uses-wrap">
                      {content.keyFeatures.map((f, idx) => (
                        <div key={idx} className="mep-use-tag">
                          <span className="mep-use-dot"><FaDotCircle /></span>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mep-badge-section">
                    <span className="mep-msec-label">Category</span>
                    <div className="mep-category-badge">
                      <span className="mep-category-badge-icon"><FaBirthdayCake /></span>
                      <span className="mep-category-badge-value">{categoryLabel}</span>
                    </div>
                  </div>
                </div>
                <hr className="mep-mdivider" />
              </>
            )}

            <div className="mep-modal-two-col">
              {content.tools?.length > 0 && (
                <div className="mep-msec">
                  <span className="mep-msec-label">Tools Needed</span>
                  <div className="mep-steps-list">
                    {content.tools.map((tool, idx) => (
                      <div key={idx} className="mep-step-card">
                        <span className="mep-step-num">{idx + 1}</span>
                        <span className="mep-step-txt">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.steps?.length > 0 && (
                <div className="mep-msec">
                  <span className="mep-msec-label">Steps</span>
                  <div className="mep-tips-list">
                    {content.steps.map((step, idx) => (
                      <div key={idx} className="mep-tip-card">
                        <span className="mep-tip-icon">{tipIcons[idx % tipIcons.length]}</span>
                        <span className="mep-tip-txt">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {content.properUsage?.length > 0 && (
              <>
                <hr className="mep-mdivider" />
                <div className="mep-msec">
                  <span className="mep-msec-label">Proper Usage</span>
                  <div className="mep-uses-wrap">
                    {content.properUsage.map((u, idx) => (
                      <div key={idx} className="mep-use-tag">
                        <span className="mep-use-dot"><FaDotCircle /></span>
                        {u}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {content.commonMistakes?.length > 0 && (
              <>
                <hr className="mep-mdivider" />
                <div className="mep-msec">
                  <span className="mep-msec-label">Common Mistakes</span>
                  <div className="mep-mistakes-list">
                    {content.commonMistakes.map((m, idx) => (
                      <div key={idx} className="mep-mistake-card">
                        <span className="mep-mistake-icon"><FaExclamationTriangle /></span>
                        <span className="mep-tip-txt">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {content.tips && (
              <>
                <hr className="mep-mdivider" />
                <div className="mep-msec">
                  <span className="mep-msec-label">Pro Tips</span>
                  <div className="mep-tip-card">
                    <span className="mep-tip-icon"><FaLightbulb /></span>
                    <span className="mep-tip-txt">{content.tips}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mep-modal-right">
            <div
              className="mep-modal-right-image"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => onImageClick(image)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeatProcessingPage;