import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";
import './MeatProcessingPage.css';

const MeatProcessingPage = () => {
  const navigate = useNavigate();
  const [selectedMeat, setSelectedMeat] = useState('beef');
  const [selectedTab, setSelectedTab] = useState('deboning');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  
  const [beefData, setBeefData] = useState([]);
  const [lambData, setLambData] = useState([]);
  const [poultryData, setPoultryData] = useState([]);
  const [fishData, setFishData] = useState([]);
  const [gameData, setGameData] = useState([]);

  const meatTypes = [
    { id: 1, name: 'Beef', key: 'beef' },
    { id: 2, name: 'Lamb', key: 'lamb' },
    { id: 3, name: 'Poultry', key: 'poultry' },
    { id: 4, name: 'Fish', key: 'fish' },
    { id: 5, name: 'Game', key: 'game' }
  ];

  useEffect(() => {
    fetchAllMeatData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchAllMeatData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/beginners-guides', {
        params: { category: 'meat-processing' }
      });

      const guides = response.data.guides || [];
      
      const beef = [];
      const lamb = [];
      const poultry = [];
      const fish = [];
      const game = [];
      
      guides.forEach(guide => {
        let content = {};
        
        if (guide.content) {
          if (typeof guide.content === 'string') {
            try {
              content = JSON.parse(guide.content);
            } catch(e) {
              content = {};
            }
          } else {
            content = guide.content;
          }
        }
        
        const meatType = content.meatType || 'beef';
        const type = content.type || 'general';
        
        const item = {
          id: guide._id,
          name: guide.title,
          tagline: content.tagline || '',
          fullDesc: content.fullDesc || '',
          image: guide.image || '',
          tools: content.tools || [],
          steps: content.steps || [],
          tips: content.tips || '',
          bestFor: content.bestFor || '',
          type: type,
          meatType: meatType,
          keyFeatures: content.keyFeatures || [],
          properUsage: content.properUsage || [],
          commonMistakes: content.commonMistakes || [],
          types: content.types || []
        };
        
        if (meatType === 'beef') beef.push(item);
        else if (meatType === 'lamb') lamb.push(item);
        else if (meatType === 'poultry') poultry.push(item);
        else if (meatType === 'fish') fish.push(item);
        else if (meatType === 'game') game.push(item);
      });
      
      setBeefData(beef);
      setLambData(lamb);
      setPoultryData(poultry);
      setFishData(fish);
      setGameData(game);
      
      if (guides.length === 0) {
        setError('No meat processing data found in database.');
      }
      
    } catch (err) {
      console.error(err);
      setError('Failed to load data from server.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentMeatData = () => {
    switch(selectedMeat) {
      case 'beef': return beefData;
      case 'lamb': return lambData;
      case 'poultry': return poultryData;
      case 'fish': return fishData;
      case 'game': return gameData;
      default: return beefData;
    }
  };

  const getCounts = (meatKey) => {
    let data = [];
    switch(meatKey) {
      case 'beef': data = beefData; break;
      case 'lamb': data = lambData; break;
      case 'poultry': data = poultryData; break;
      case 'fish': data = fishData; break;
      case 'game': data = gameData; break;
      default: data = [];
    }
    return {
      deboning: data.filter(i => i.type === 'deboning').length,
      cleaning: data.filter(i => i.type === 'cleaning').length,
      cuts: data.filter(i => i.type === 'cuts').length,
      total: data.length
    };
  };

  const getCategoryTitle = () => {
    return selectedMeat.charAt(0).toUpperCase() + selectedMeat.slice(1);
  };

  const getCategoryDescription = () => {
    return `Professional ${selectedMeat} processing - deboning, cleaning, and cuts`;
  };

  const currentData = getCurrentMeatData();
  const currentCounts = getCounts(selectedMeat);
  const filteredData = currentData.filter(item => item.type === selectedTab);

  const renderSafeContent = (content) => {
    if (!content) return null;
    if (typeof content === 'string') return content;
    if (typeof content === 'number') return String(content);
    if (Array.isArray(content)) {
      return content.map(c => {
        if (typeof c === 'string') return c;
        if (typeof c === 'object') return c.name || c.description || JSON.stringify(c);
        return String(c);
      }).join(', ');
    }
    if (typeof content === 'object') {
      return content.name || content.description || content.fullDesc || JSON.stringify(content);
    }
    return String(content);
  };

  const MeatIcon = () => (
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

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  if (loading) {
    return (
      <div className="mep-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && filteredData.length === 0) {
    return (
      <div className="mep-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchAllMeatData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mep-container">
      <div className="mep-mobile-topbar">
        <h1 className="mep-page-title">{getCategoryTitle()}</h1>
      </div>

      <div className="mep-categories-row">
        {meatTypes.map(meat => (
          <button
            key={meat.key}
            className={`mep-cat-btn ${selectedMeat === meat.key ? 'active' : ''}`}
            onClick={() => { setSelectedMeat(meat.key); setSidebarOpen(false); }}
          >
            {meat.name}
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
          <div className="mep-sidebar-categories">
            <ul className="mep-categories-list">
              {meatTypes.map(meat => {
                const counts = getCounts(meat.key);
                return (
                  <li key={meat.id} 
                      className={`mep-category-item ${selectedMeat === meat.key ? 'mep-active' : ''}`}
                      onClick={() => { setSelectedMeat(meat.key); setSidebarOpen(false); }}>
                    <span className="mep-category-name">{meat.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="mep-main">
          <header className="mep-main-header">
            <div className="mep-header-content">
              <h1 className="mep-page-title desktop-title">{getCategoryTitle()}</h1>
              <p className="mep-page-description">{getCategoryDescription()}</p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          <div className="mep-tabs">
            <button 
              className={`mep-tab ${selectedTab === 'deboning' ? 'mep-tab-active' : ''}`}
              onClick={() => setSelectedTab('deboning')}
            >
              Deboning ({currentCounts.deboning})
            </button>
            <button 
              className={`mep-tab ${selectedTab === 'cleaning' ? 'mep-tab-active' : ''}`}
              onClick={() => setSelectedTab('cleaning')}
            >
              Cleaning ({currentCounts.cleaning})
            </button>
            <button 
              className={`mep-tab ${selectedTab === 'cuts' ? 'mep-tab-active' : ''}`}
              onClick={() => setSelectedTab('cuts')}
            >
              Cuts ({currentCounts.cuts})
            </button>
          </div>

          <div className="mep-items-grid-section">
            {filteredData.length === 0 ? (
              <div className="mep-empty-state">
                No {selectedTab} items found for {selectedMeat}.
              </div>
            ) : (
              <div className="mep-items-grid">
                {filteredData.map(item => (
                  <div key={item.id} className="mep-item-card" onClick={() => {
                    setSelectedItem(item);
                    setShowModal(true);
                    setSidebarOpen(false);
                  }}>
                    <div className="mep-card-image" style={{ backgroundImage: `url(${item.image || '/api/placeholder/120/120'})` }} />
                    <div className="mep-card-content">
                      <h3 className="mep-card-title">{item.name}</h3>
                      <p className="mep-card-description">{item.tagline || item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mep-back-section">
            <button
              className="mep-back-button"
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

      {showModal && selectedItem && (
        <div className="mep-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="mep-modal" onClick={e => e.stopPropagation()}>
<button className="mep-modal-close"  onClick={() => setShowModal(false)}>
  <FaTimes />
</button>
            <div className="mep-modal-hero">
              <p className="mep-modal-hero-label">Meat Processing</p>
              <h2 className="mep-modal-hero-title">{selectedItem.name}</h2>
              <p className="mep-modal-hero-subtitle">{selectedItem.tagline || selectedItem.name}</p>
            </div>

            <div className="mep-modal-inner">
              <div className="mep-modal-left">
                <div className="mep-about-row">
                  <div className="mep-about-text">
                    {selectedItem.fullDesc && (
                      <div className="mep-msec">
                        <span className="mep-msec-label">About this process</span>
                        <p className="mep-msec-text">{renderSafeContent(selectedItem.fullDesc)}</p>
                      </div>
                    )}
                  </div>
                  <div
                    className="mep-about-thumb"
                    style={{ backgroundImage: `url(${selectedItem.image || '/api/placeholder/200/200'})` }}
                    onClick={() => openLightbox(selectedItem.image || '/api/placeholder/200/200')}
                  />
                </div>

                <hr className="mep-mdivider" />

                {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                  <>
                    <div className="mep-uses-badge-row">
                      <div className="mep-uses-section">
                        <span className="mep-msec-label">Key Features</span>
                        <div className="mep-uses-wrap">
                          {selectedItem.keyFeatures.map((f, idx) => (
                            <div key={idx} className="mep-use-tag">
                              <span className="mep-use-dot">•</span>
                              {renderSafeContent(f)}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mep-badge-section">
                        <span className="mep-msec-label">Category</span>
                        <div className="mep-category-badge">
                          <span className="mep-category-badge-icon"><MeatIcon /></span>
                          <span className="mep-category-badge-value">{getCategoryTitle()}</span>
                        </div>
                      </div>
                    </div>
                    <hr className="mep-mdivider" />
                  </>
                )}

                <div className="mep-modal-two-col">
                  {selectedItem.tools && selectedItem.tools.length > 0 && (
                    <div className="mep-msec">
                      <span className="mep-msec-label">Tools Needed</span>
                      <div className="mep-steps-list">
                        {selectedItem.tools.map((tool, idx) => (
                          <div key={idx} className="mep-step-card">
                            <span className="mep-step-num">{idx + 1}</span>
                            <span className="mep-step-txt">{renderSafeContent(tool)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedItem.steps && selectedItem.steps.length > 0 && (
                    <div className="mep-msec">
                      <span className="mep-msec-label">Steps</span>
                      <div className="mep-tips-list">
                        {selectedItem.steps.map((step, idx) => (
                          <div key={idx} className="mep-tip-card">
                            <span className="mep-tip-icon">{tipIcons[idx % tipIcons.length]}</span>
                            <span className="mep-tip-txt">{renderSafeContent(step)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {selectedItem.properUsage && selectedItem.properUsage.length > 0 && (
                  <>
                    <hr className="mep-mdivider" />
                    <div className="mep-msec">
                      <span className="mep-msec-label">Proper Usage</span>
                      <div className="mep-uses-wrap">
                        {selectedItem.properUsage.map((u, idx) => (
                          <div key={idx} className="mep-use-tag">
                            <span className="mep-use-dot">•</span>
                            {renderSafeContent(u)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
                  <>
                    <hr className="mep-mdivider" />
                    <div className="mep-msec">
                      <span className="mep-msec-label">Common Mistakes</span>
                      <div className="mep-mistakes-list">
                        {selectedItem.commonMistakes.map((m, idx) => (
                          <div key={idx} className="mep-mistake-card">
                            <span className="mep-mistake-icon"><WarningIcon /></span>
                            <span className="mep-tip-txt">{renderSafeContent(m)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedItem.tips && (
                  <>
                    <hr className="mep-mdivider" />
                    <div className="mep-msec">
                      <span className="mep-msec-label">Pro Tips</span>
                      <div className="mep-tip-card">
                        <span className="mep-tip-icon"><LightbulbIcon /></span>
                        <span className="mep-tip-txt">{renderSafeContent(selectedItem.tips)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mep-modal-right">
                <div
                  className="mep-modal-right-image"
                  style={{ backgroundImage: `url(${selectedItem.image || '/api/placeholder/400/400'})` }}
                  onClick={() => openLightbox(selectedItem.image || '/api/placeholder/400/400')}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div className="mep-lightbox-overlay" onClick={closeLightbox}>
          <button className="mep-lightbox-close" onClick={closeLightbox}>×</button>
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

export default MeatProcessingPage;