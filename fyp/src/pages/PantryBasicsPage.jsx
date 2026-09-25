import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaLightbulb, FaExclamationTriangle, FaBirthdayCake, FaDotCircle, FaArrowLeft } from 'react-icons/fa';
import './PantryBasicsPage.css';

const CATEGORIES = [
  {
    key: 'basics',
    label: 'Kitchen Basics',
    description: 'Essential items every kitchen should have for daily cooking.',
  },
  {
    key: 'spices',
    label: 'Spices',
    description: 'Aromatic spices that form the foundation of flavorful cooking.',
  },
  {
    key: 'staples',
    label: 'Staples',
    description: 'Long-lasting pantry items for varied and nutritious meals.',
  },
  {
    key: 'vegetables',
    label: 'Vegetables',
    description: 'Fresh vegetables for daily cooking and healthy meals.',
  },
];

const parseContent = (content) => {
  if (!content) return {};
  if (typeof content === 'object') return content;
  try {
    return JSON.parse(content);
  } catch (e) {
    return {};
  }
};

const PantryBasicsPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('basics');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const [spiceCategory, setSpiceCategory] = useState('all');
  const [staplesCategory, setStaplesCategory] = useState('all');
  const [vegetablesCategory, setVegetablesCategory] = useState('all');

  const [kitchenBasicsData, setKitchenBasicsData] = useState([]);
  const [spicesData, setSpicesData] = useState([]);
  const [staplesData, setStaplesData] = useState([]);
  const [dailyVegetablesData, setDailyVegetablesData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/beginners-guides?category=pantry-basics');
        const allGuides = response.data.guides || [];

        setKitchenBasicsData(allGuides.filter(g => g.subCategory === 'kitchen-basics'));
        setSpicesData(allGuides.filter(g => g.subCategory === 'spices'));
        setStaplesData(allGuides.filter(g => g.subCategory === 'staples'));
        setDailyVegetablesData(allGuides.filter(g => g.subCategory === 'vegetables'));

        if (allGuides.length === 0) {
          setError('No pantry data found in database.');
        }
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

  const getFilteredSpices = () => {
    if (spiceCategory === 'all') return spicesData;
    return spicesData.filter(spice => parseContent(spice.content).spiceType === spiceCategory);
  };

  const getFilteredStaples = () => {
    if (staplesCategory === 'all') return staplesData;
    return staplesData.filter(item =>
      parseContent(item.content).filterTags?.includes(staplesCategory)
    );
  };

  const getFilteredVegetables = () => {
    if (vegetablesCategory === 'all') return dailyVegetablesData;
    return dailyVegetablesData.filter(item =>
      parseContent(item.content).vegetableType === vegetablesCategory
    );
  };

  const getCurrentData = () => {
    if (activeTab === 'basics') return kitchenBasicsData;
    if (activeTab === 'spices') return getFilteredSpices();
    if (activeTab === 'staples') return getFilteredStaples();
    if (activeTab === 'vegetables') return getFilteredVegetables();
    return kitchenBasicsData;
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
      <div className="pbp-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && currentData.length === 0) {
    return (
      <div className="pbp-container">
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
    <div className="pbp-container">
      <div className="pbp-mobile-topbar">
        <h1 className="pbp-page-title">{activeCategory.label}</h1>
      </div>

      <div className="pbp-categories-row">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`pbp-cat-btn ${activeTab === cat.key ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        className={`pbp-sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="pbp-layout">
        <aside className={`pbp-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="pbp-sidebar-header">
            <h2 className="pbp-sidebar-title">Pantry Basics</h2>
            <p className="pbp-sidebar-subtitle">Essential Food Items</p>
          </div>
          <ul className="pbp-categories-list">
            {CATEGORIES.map(cat => (
              <li
                key={cat.key}
                className={`pbp-category-item${activeTab === cat.key ? ' pbp-active' : ''}`}
                onClick={() => { setActiveTab(cat.key); setSidebarOpen(false); }}
              >
                <span className="pbp-category-name">{cat.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="pbp-main">
          <header className="pbp-main-header">
            <div className="pbp-header-content">
              <h1 className="pbp-page-title desktop-title">{activeCategory.label}</h1>
              <p className="pbp-page-description">{activeCategory.description}</p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          {activeTab === 'spices' && spicesData.length > 0 && (
            <div className="pbp-filter-bar">
              <button
                className={`pbp-filter-btn ${spiceCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSpiceCategory('all')}
              >
                All ({spicesData.length})
              </button>
              <button
                className={`pbp-filter-btn ${spiceCategory === 'whole' ? 'active' : ''}`}
                onClick={() => setSpiceCategory('whole')}
              >
                Whole ({spicesData.filter(s => parseContent(s.content).spiceType === 'whole').length})
              </button>
              <button
                className={`pbp-filter-btn ${spiceCategory === 'ground' ? 'active' : ''}`}
                onClick={() => setSpiceCategory('ground')}
              >
                Ground ({spicesData.filter(s => parseContent(s.content).spiceType === 'ground').length})
              </button>
              <button
                className={`pbp-filter-btn ${spiceCategory === 'dried-herb' ? 'active' : ''}`}
                onClick={() => setSpiceCategory('dried-herb')}
              >
                Dried Herbs ({spicesData.filter(s => parseContent(s.content).spiceType === 'dried-herb').length})
              </button>
            </div>
          )}

          {activeTab === 'staples' && staplesData.length > 0 && (
            <div className="pbp-filter-bar">
              <button
                className={`pbp-filter-btn ${staplesCategory === 'all' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('all')}
              >
                All ({staplesData.length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'rice' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('rice')}
              >
                Rice/Grains ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('rice')).length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'flour' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('flour')}
              >
                Flours ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('flour')).length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'pulses' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('pulses')}
              >
                Pulses ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('pulses')).length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'nuts' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('nuts')}
              >
                Nuts ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('nuts')).length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'dryfruits' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('dryfruits')}
              >
                Dry Fruits ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('dryfruits')).length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'seeds' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('seeds')}
              >
                Seeds ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('seeds')).length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'sweetener' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('sweetener')}
              >
                Sweeteners ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('sweetener')).length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'oil' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('oil')}
              >
                Oils & Ghee ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('oil')).length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'baking' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('baking')}
              >
                Baking ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('baking')).length})
              </button>
              <button
                className={`pbp-filter-btn ${staplesCategory === 'vinegar' ? 'active' : ''}`}
                onClick={() => setStaplesCategory('vinegar')}
              >
                Vinegars ({staplesData.filter(s => parseContent(s.content).filterTags?.includes('vinegar')).length})
              </button>
            </div>
          )}

          {activeTab === 'vegetables' && dailyVegetablesData.length > 0 && (
            <div className="pbp-filter-bar">
              <button
                className={`pbp-filter-btn ${vegetablesCategory === 'all' ? 'active' : ''}`}
                onClick={() => setVegetablesCategory('all')}
              >
                All ({dailyVegetablesData.length})
              </button>
              <button
                className={`pbp-filter-btn ${vegetablesCategory === 'root' ? 'active' : ''}`}
                onClick={() => setVegetablesCategory('root')}
              >
                Root ({dailyVegetablesData.filter(v => parseContent(v.content).vegetableType === 'root').length})
              </button>
              <button
                className={`pbp-filter-btn ${vegetablesCategory === 'leafy' ? 'active' : ''}`}
                onClick={() => setVegetablesCategory('leafy')}
              >
                Leafy ({dailyVegetablesData.filter(v => parseContent(v.content).vegetableType === 'leafy').length})
              </button>
              <button
                className={`pbp-filter-btn ${vegetablesCategory === 'cruciferous' ? 'active' : ''}`}
                onClick={() => setVegetablesCategory('cruciferous')}
              >
                Cruciferous ({dailyVegetablesData.filter(v => parseContent(v.content).vegetableType === 'cruciferous').length})
              </button>
              <button
                className={`pbp-filter-btn ${vegetablesCategory === 'gourd' ? 'active' : ''}`}
                onClick={() => setVegetablesCategory('gourd')}
              >
                Gourds ({dailyVegetablesData.filter(v => parseContent(v.content).vegetableType === 'gourd').length})
              </button>
              <button
                className={`pbp-filter-btn ${vegetablesCategory === 'fruitveg' ? 'active' : ''}`}
                onClick={() => setVegetablesCategory('fruitveg')}
              >
                Fruit Veg ({dailyVegetablesData.filter(v => parseContent(v.content).vegetableType === 'fruitveg').length})
              </button>
              <button
                className={`pbp-filter-btn ${vegetablesCategory === 'flower' ? 'active' : ''}`}
                onClick={() => setVegetablesCategory('flower')}
              >
                Flower ({dailyVegetablesData.filter(v => parseContent(v.content).vegetableType === 'flower').length})
              </button>
              <button
                className={`pbp-filter-btn ${vegetablesCategory === 'mushroom' ? 'active' : ''}`}
                onClick={() => setVegetablesCategory('mushroom')}
              >
                Mushrooms ({dailyVegetablesData.filter(v => parseContent(v.content).vegetableType === 'mushroom').length})
              </button>
            </div>
          )}

          <div className="pbp-items-grid-section">
            <div className="pbp-items-grid">
              {currentData.map((item, index) => {
                const content = parseContent(item.content);
                return (
                  <div
                    key={item._id || index}
                    className="pbp-item-card"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div
                      className="pbp-card-image"
                      style={{ backgroundImage: `url(${item.image || '/api/placeholder/120/120'})` }}
                    />
                    <div className="pbp-card-content">
                      <h3 className="pbp-card-title">{item.title}</h3>
                      <p className="pbp-card-description">{content.tagline || item.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pbp-back-section">
            <button className="pbp-back-button" onClick={() => navigate('/guidance')}>
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
        <div className="pbp-lightbox-overlay" onClick={closeLightbox}>
          <button className="pbp-lightbox-close" onClick={closeLightbox}>
            <FaTimes />
          </button>
          <img
            className="pbp-lightbox-image"
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
    <div className="pbp-modal-overlay" onClick={onClose}>
      <div className="pbp-modal" onClick={e => e.stopPropagation()}>
        <button className="pbp-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="pbp-modal-hero">
          <p className="pbp-modal-hero-label">Pantry Essential</p>
          <h2 className="pbp-modal-hero-title">{item.title}</h2>
          <p className="pbp-modal-hero-subtitle">{content.tagline || item.title}</p>
        </div>

        <div className="pbp-modal-inner">
          <div className="pbp-modal-left">
            <div className="pbp-about-row">
              <div className="pbp-about-text">
                <div className="pbp-msec">
                  <span className="pbp-msec-label">About this item</span>
                  <p className="pbp-msec-text">
                    {content.fullDesc || content.tagline || item.title}
                  </p>
                </div>
                {content.urduName && (
                  <div className="pbp-msec">
                    <span className="pbp-msec-label">Urdu Name</span>
                    <p className="pbp-msec-text">{content.urduName}</p>
                  </div>
                )}
              </div>
              <div
                className="pbp-about-thumb"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => onImageClick(image)}
              />
            </div>

            <hr className="pbp-mdivider" />

            <div className="pbp-uses-badge-row">
              {content.keyUses?.length > 0 && (
                <div className="pbp-uses-section">
                  <span className="pbp-msec-label">Key Uses</span>
                  <div className="pbp-uses-wrap">
                    {content.keyUses.map((u, idx) => (
                      <div key={idx} className="pbp-use-tag">
                        <span className="pbp-use-dot"><FaDotCircle /></span>
                        {u}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pbp-badge-section">
                <span className="pbp-msec-label">Category</span>
                <div className="pbp-category-badge">
                  <span className="pbp-category-badge-icon"><FaBirthdayCake /></span>
                  <span className="pbp-category-badge-value">{categoryLabel}</span>
                </div>
              </div>
            </div>

            <hr className="pbp-mdivider" />

            <div className="pbp-modal-two-col">
              {content.storageTips && (
                <div className="pbp-msec">
                  <span className="pbp-msec-label">Storage Tips</span>
                  <p className="pbp-msec-text">{content.storageTips}</p>
                </div>
              )}

              {content.shelfLife && (
                <div className="pbp-msec">
                  <span className="pbp-msec-label">Shelf Life</span>
                  <p className="pbp-msec-text">{content.shelfLife}</p>
                </div>
              )}
            </div>

            {content.properUsage && (
              <>
                <hr className="pbp-mdivider" />
                <div className="pbp-msec">
                  <span className="pbp-msec-label">Proper Usage</span>
                  <div className="pbp-tip-card">
                    <span className="pbp-tip-icon"><FaLightbulb /></span>
                    <span className="pbp-tip-txt">{content.properUsage}</span>
                  </div>
                </div>
              </>
            )}

            {content.commonMistakes?.length > 0 && (
              <>
                <hr className="pbp-mdivider" />
                <div className="pbp-msec">
                  <span className="pbp-msec-label">Common Mistakes</span>
                  <div className="pbp-mistakes-list">
                    {content.commonMistakes.map((m, idx) => (
                      <div key={idx} className="pbp-mistake-card">
                        <span className="pbp-mistake-icon"><FaExclamationTriangle /></span>
                        <span className="pbp-tip-txt">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {content.bestFor && (
              <>
                <hr className="pbp-mdivider" />
                <div className="pbp-msec">
                  <span className="pbp-msec-label">Best For</span>
                  <div className="pbp-tip-card">
                    <span className="pbp-tip-icon"><FaLightbulb /></span>
                    <span className="pbp-tip-txt">{content.bestFor}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="pbp-modal-right">
            <div
              className="pbp-modal-right-image"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => onImageClick(image)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantryBasicsPage;