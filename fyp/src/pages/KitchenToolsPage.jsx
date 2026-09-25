import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaLightbulb, FaExclamationTriangle, FaDotCircle, FaArrowLeft } from 'react-icons/fa';
import './KitchenToolsPage.css';

const SUBCATEGORIES = [
  { key: 'knives', label: 'Knives' },
  { key: 'cutting-boards', label: 'Cutting Boards' },
  { key: 'mixing-bowls', label: 'Mixing Bowls' },
  { key: 'utensils', label: 'Utensils' },
  { key: 'cookware', label: 'Cookware' },
  { key: 'cookware-materials', label: 'Cookware Materials' },
  { key: 'crockery', label: 'Crockery' },
  { key: 'cutlery', label: 'Cutlery' },
  { key: 'servingware', label: 'Servingware' },
];

const parseContent = (content) => {
  if (!content) return {};
  if (typeof content === 'object') return content;
  try {
    return JSON.parse(content);
  } catch {
    return { fullDesc: content, tagline: content };
  }
};

const KitchenToolsPage = () => {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState('knives');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [utensilFilter, setUtensilFilter] = useState('all');
  const [crockeryFilter, setCrockeryFilter] = useState('all');
  const [cutleryFilter, setCutleryFilter] = useState('all');
  const [servingwareFilter, setServingwareFilter] = useState('all');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/beginners-guides?category=kitchen-tools');
        const guides = response.data.guides || [];

        const grouped = {};
        SUBCATEGORIES.forEach(sub => { grouped[sub.key] = []; });

        guides.forEach(guide => {
          const sub = guide.subCategory || 'knives';
          if (!grouped[sub]) grouped[sub] = [];
          grouped[sub].push(guide);
        });

        setData(grouped);
        if (guides.length === 0) setError('No kitchen tools found in database.');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFilteredUtensils = () => {
    const list = data['utensils'] || [];
    if (utensilFilter === 'all') return list;
    return list.filter(item => parseContent(item.content).category === utensilFilter);
  };

  const getFilteredCrockery = () => {
    const list = data['crockery'] || [];
    if (crockeryFilter === 'all') return list;
    return list.filter(item => parseContent(item.content).category === crockeryFilter);
  };

  const getFilteredCutlery = () => {
    const list = data['cutlery'] || [];
    if (cutleryFilter === 'all') return list;
    return list.filter(item => parseContent(item.content).category === cutleryFilter);
  };

  const getFilteredServingware = () => {
    const list = data['servingware'] || [];
    if (servingwareFilter === 'all') return list;
    return list.filter(item => parseContent(item.content).subcategory === servingwareFilter);
  };

  const getCurrentData = () => {
    if (activeTab === 'utensils') return getFilteredUtensils();
    if (activeTab === 'crockery') return getFilteredCrockery();
    if (activeTab === 'cutlery') return getFilteredCutlery();
    if (activeTab === 'servingware') return getFilteredServingware();
    return data[activeTab] || [];
  };

  const activeCategory = SUBCATEGORIES.find(s => s.key === activeTab) || SUBCATEGORIES[0];
  const currentData = getCurrentData();

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => setSelectedItem(null);

  if (loading) {
    return (
      <div className="ktp-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && currentData.length === 0) {
    return (
      <div className="ktp-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const utensilsList = data['utensils'] || [];
  const crockeryList = data['crockery'] || [];
  const cutleryList = data['cutlery'] || [];
  const servingwareList = data['servingware'] || [];

  return (
    <div className="ktp-container">
      <div className="ktp-mobile-topbar">
        <h1 className="ktp-page-title">{activeCategory.label}</h1>
      </div>

      <div className="ktp-categories-row">
        {SUBCATEGORIES.map(sub => (
          <button
            key={sub.key}
            className={`ktp-cat-btn ${activeTab === sub.key ? 'active' : ''}`}
            onClick={() => setActiveTab(sub.key)}
          >
            {sub.label}
          </button>
        ))}
      </div>

      <div
        className={`ktp-sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="ktp-layout">
        <aside className={`ktp-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="ktp-sidebar-header">
            <h2 className="ktp-sidebar-title">Kitchen Tools</h2>
            <p className="ktp-sidebar-subtitle">Essential Equipment</p>
          </div>
          <ul className="ktp-tools-list">
            {SUBCATEGORIES.map(sub => (
              <li
                key={sub.key}
                className={`ktp-tool-list-item${activeTab === sub.key ? ' ktp-active' : ''}`}
                onClick={() => { setActiveTab(sub.key); setSidebarOpen(false); }}
              >
                <span className="ktp-tool-list-name">{sub.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="ktp-main">
          <header className="ktp-main-header">
            <div className="ktp-header-content">
              <h1 className="ktp-page-title desktop-title">{activeCategory.label}</h1>
              <p className="ktp-page-description">
                Explore our collection of {activeCategory.label.toLowerCase()}
              </p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          {activeTab === 'utensils' && utensilsList.length > 0 && (
            <div className="ktp-filter-bar">
              <button
                className={`ktp-filter-btn ${utensilFilter === 'all' ? 'active' : ''}`}
                onClick={() => setUtensilFilter('all')}
              >
                All ({utensilsList.length})
              </button>
              <button
                className={`ktp-filter-btn ${utensilFilter === 'cooking' ? 'active' : ''}`}
                onClick={() => setUtensilFilter('cooking')}
              >
                Cooking ({utensilsList.filter(u => parseContent(u.content).category === 'cooking').length})
              </button>
              <button
                className={`ktp-filter-btn ${utensilFilter === 'prep' ? 'active' : ''}`}
                onClick={() => setUtensilFilter('prep')}
              >
                Prep ({utensilsList.filter(u => parseContent(u.content).category === 'prep').length})
              </button>
              <button
                className={`ktp-filter-btn ${utensilFilter === 'baking' ? 'active' : ''}`}
                onClick={() => setUtensilFilter('baking')}
              >
                Baking ({utensilsList.filter(u => parseContent(u.content).category === 'baking').length})
              </button>
              <button
                className={`ktp-filter-btn ${utensilFilter === 'measuring' ? 'active' : ''}`}
                onClick={() => setUtensilFilter('measuring')}
              >
                Measuring ({utensilsList.filter(u => parseContent(u.content).category === 'measuring').length})
              </button>
              <button
                className={`ktp-filter-btn ${utensilFilter === 'specialty' ? 'active' : ''}`}
                onClick={() => setUtensilFilter('specialty')}
              >
                Specialty ({utensilsList.filter(u => parseContent(u.content).category === 'specialty').length})
              </button>
            </div>
          )}

          {activeTab === 'crockery' && crockeryList.length > 0 && (
            <div className="ktp-filter-bar">
              <button
                className={`ktp-filter-btn ${crockeryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCrockeryFilter('all')}
              >
                All ({crockeryList.length})
              </button>
              <button
                className={`ktp-filter-btn ${crockeryFilter === 'dining' ? 'active' : ''}`}
                onClick={() => setCrockeryFilter('dining')}
              >
                Dining ({crockeryList.filter(c => parseContent(c.content).category === 'dining').length})
              </button>
              <button
                className={`ktp-filter-btn ${crockeryFilter === 'tea' ? 'active' : ''}`}
                onClick={() => setCrockeryFilter('tea')}
              >
                Tea & Coffee ({crockeryList.filter(c => parseContent(c.content).category === 'tea').length})
              </button>
              <button
                className={`ktp-filter-btn ${crockeryFilter === 'water' ? 'active' : ''}`}
                onClick={() => setCrockeryFilter('water')}
              >
                Water & Drinks ({crockeryList.filter(c => parseContent(c.content).category === 'water').length})
              </button>
            </div>
          )}

          {activeTab === 'cutlery' && cutleryList.length > 0 && (
            <div className="ktp-filter-bar">
              <button
                className={`ktp-filter-btn ${cutleryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCutleryFilter('all')}
              >
                All ({cutleryList.length})
              </button>
              <button
                className={`ktp-filter-btn ${cutleryFilter === 'dinner' ? 'active' : ''}`}
                onClick={() => setCutleryFilter('dinner')}
              >
                Dinner ({cutleryList.filter(c => parseContent(c.content).category === 'dinner').length})
              </button>
              <button
                className={`ktp-filter-btn ${cutleryFilter === 'tea' ? 'active' : ''}`}
                onClick={() => setCutleryFilter('tea')}
              >
                Tea ({cutleryList.filter(c => parseContent(c.content).category === 'tea').length})
              </button>
              <button
                className={`ktp-filter-btn ${cutleryFilter === 'serving' ? 'active' : ''}`}
                onClick={() => setCutleryFilter('serving')}
              >
                Serving ({cutleryList.filter(c => parseContent(c.content).category === 'serving').length})
              </button>
            </div>
          )}

          {activeTab === 'servingware' && servingwareList.length > 0 && (
            <div className="ktp-filter-bar">
              <button
                className={`ktp-filter-btn ${servingwareFilter === 'all' ? 'active' : ''}`}
                onClick={() => setServingwareFilter('all')}
              >
                All ({servingwareList.length})
              </button>
              <button
                className={`ktp-filter-btn ${servingwareFilter === 'bowls' ? 'active' : ''}`}
                onClick={() => setServingwareFilter('bowls')}
              >
                Bowls ({servingwareList.filter(s => parseContent(s.content).subcategory === 'bowls').length})
              </button>
              <button
                className={`ktp-filter-btn ${servingwareFilter === 'platters-and-trays' ? 'active' : ''}`}
                onClick={() => setServingwareFilter('platters-and-trays')}
              >
                Platters & Trays ({servingwareList.filter(s => parseContent(s.content).subcategory === 'platters-and-trays').length})
              </button>
              <button
                className={`ktp-filter-btn ${servingwareFilter === 'gravy-and-sauceware' ? 'active' : ''}`}
                onClick={() => setServingwareFilter('gravy-and-sauceware')}
              >
                Gravy & Sauce ({servingwareList.filter(s => parseContent(s.content).subcategory === 'gravy-and-sauceware').length})
              </button>
              <button
                className={`ktp-filter-btn ${servingwareFilter === 'accessories' ? 'active' : ''}`}
                onClick={() => setServingwareFilter('accessories')}
              >
                Accessories ({servingwareList.filter(s => parseContent(s.content).subcategory === 'accessories').length})
              </button>
            </div>
          )}

          <div className="ktp-items-grid-section">
            <div className="ktp-items-grid">
              {currentData.map((item, index) => {
                const content = parseContent(item.content);
                return (
                  <div
                    key={item._id || index}
                    className="ktp-item-card"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div
                      className="ktp-card-image"
                      style={item.image ? { backgroundImage: `url(${item.image})` } : undefined}
                    />
                    <div className="ktp-card-content">
                      <h3 className="ktp-card-title">{item.title}</h3>
                      <p className="ktp-card-description">
                        {content.tagline || content.material || content.bestFor || item.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ktp-back-section">
            <button className="ktp-back-button" onClick={() => navigate('/guidance')}>
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
        />
      )}
    </div>
  );
};

const DetailModal = ({ item, categoryLabel, onClose }) => {
  const content = parseContent(item.content);
  const image = item.image;

  return (
    <div className="ktp-modal-overlay" onClick={onClose}>
      <div className="ktp-modal" onClick={e => e.stopPropagation()}>
        <button className="ktp-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="ktp-modal-hero">
          <p className="ktp-modal-hero-label">Kitchen Tool</p>
          <h2 className="ktp-modal-hero-title">{item.title}</h2>
          <p className="ktp-modal-hero-subtitle">{content.tagline || item.title}</p>
        </div>

        <div className="ktp-modal-inner">
          <div className="ktp-modal-left">
            <div className="ktp-about-row">
              <div className="ktp-about-text">
                <div className="ktp-msec">
                  <span className="ktp-msec-label">About this tool</span>
                  <p className="ktp-msec-text">
                    {content.fullDesc || content.description || content.tagline || item.title}
                  </p>
                </div>
              </div>
              <div
                className="ktp-about-thumb"
                style={image ? { backgroundImage: `url(${image})` } : undefined}
              />
            </div>

            <hr className="ktp-mdivider" />

            {content.keyUses?.length > 0 && (
              <>
                <div className="ktp-uses-section">
                  <span className="ktp-msec-label">Common Uses</span>
                  <div className="ktp-uses-wrap">
                    {content.keyUses.map((use, idx) => (
                      <div key={idx} className="ktp-use-tag">
                        <span className="ktp-use-dot"><FaDotCircle /></span>
                        {use}
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="ktp-mdivider" />
              </>
            )}

            {content.bestFor && (
              <>
                <div className="ktp-msec">
                  <span className="ktp-msec-label">Best For</span>
                  <div className="ktp-best-badge">{content.bestFor}</div>
                </div>
                <hr className="ktp-mdivider" />
              </>
            )}

            <div className="ktp-modal-two-col">
              {content.steps?.length > 0 && (
                <div className="ktp-msec">
                  <span className="ktp-msec-label">How to use it</span>
                  <div className="ktp-steps-list">
                    {content.steps.map((step, idx) => (
                      <div key={idx} className="ktp-step-card">
                        <span className="ktp-step-num">{idx + 1}</span>
                        <span className="ktp-step-txt">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.care && (
                <div className="ktp-msec">
                  <span className="ktp-msec-label">Care Instructions</span>
                  <div className="ktp-tip-card">
                    <span className="ktp-tip-icon"><FaLightbulb /></span>
                    <span className="ktp-tip-txt">{content.care}</span>
                  </div>
                </div>
              )}
            </div>

            {content.pros?.length > 0 && (
              <>
                <hr className="ktp-mdivider" />
                <div className="ktp-msec">
                  <span className="ktp-msec-label">Pros</span>
                  <div className="ktp-uses-wrap">
                    {content.pros.map((pro, idx) => (
                      <div key={idx} className="ktp-use-tag">
                        <span className="ktp-use-dot"><FaDotCircle /></span>
                        {pro}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {content.cons?.length > 0 && (
              <>
                <hr className="ktp-mdivider" />
                <div className="ktp-msec">
                  <span className="ktp-msec-label">Cons</span>
                  <div className="ktp-uses-wrap">
                    {content.cons.map((con, idx) => (
                      <div key={idx} className="ktp-use-tag">
                        <span className="ktp-use-dot"><FaExclamationTriangle /></span>
                        {con}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="ktp-modal-right">
            <div
              className="ktp-modal-right-image"
              style={image ? { backgroundImage: `url(${image})` } : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenToolsPage;