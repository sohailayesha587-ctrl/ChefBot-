import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PantryBasicsPage.css';

const PantryBasicsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
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

  const parseGuideToItem = (guide) => {
    let content = {};
    
    if (typeof guide.content === 'string') {
      try {
        content = JSON.parse(guide.content);
      } catch (e) {
        content = {};
      }
    } else if (typeof guide.content === 'object' && guide.content !== null) {
      content = guide.content;
    }
    
    return {
      id: guide._id,
      name: guide.title || content.name || '',
      tagline: content.tagline || guide.tagline || '',
      fullDesc: content.fullDesc || content.description || guide.fullDesc || '',
      description: content.description || guide.description || '',
      image: guide.image || content.image || '/api/placeholder/120/120',
      storageTips: content.storageTips || guide.storageTips || 'Store in a cool, dry place',
      shelfLife: content.shelfLife || guide.shelfLife || 'Varies by item',
      keyUses: content.keyUses || guide.keyUses || [],
      bestFor: content.bestFor || guide.bestFor || '',
      types: content.types || guide.types || [],
      keyFeatures: content.keyFeatures || guide.keyFeatures || [],
      properUsage: content.properUsage || guide.properUsage || '',
      commonMistakes: content.commonMistakes || guide.commonMistakes || [],
      urduName: content.urduName || guide.urduName || '',
      season: content.season || guide.season || 'All year',
      nutritionalInfo: content.nutritionalInfo || guide.nutritionalInfo || '',
      healthBenefits: content.healthBenefits || guide.healthBenefits || [],
      cookingTips: content.cookingTips || guide.cookingTips || '',
      spiceType: guide.spiceType || content.spiceType || '',
      vegetableType: guide.vegetableType || content.vegetableType || '',
      category: guide.category || content.category || '',
      subCategory: guide.subCategory || content.subCategory || '',
      filterTags: guide.filterTags || content.filterTags || [],
    };
  };

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('/api/beginners-guides', {
        params: { category: 'pantry-basics' }
      });
      
      const allGuides = response.data.guides || [];
      
      const parsedGuides = allGuides.map(parseGuideToItem);
      
      const basics = parsedGuides.filter(g => 
        g.subCategory === 'kitchen-basics'
      );
      
      const spices = parsedGuides.filter(g => 
        g.subCategory === 'spices'
      );
      
      const staples = parsedGuides.filter(g => 
        g.subCategory === 'staples'
      );
      
      const vegetables = parsedGuides.filter(g => 
        g.subCategory === 'vegetables'
      );
      
      setKitchenBasicsData(basics);
      setSpicesData(spices);
      setStaplesData(staples);
      setDailyVegetablesData(vegetables);
      
      if (allGuides.length === 0) {
        setError('No pantry data found in database.');
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data from server.');
    }
    
    setLoading(false);
  };

  const getFilteredSpices = () => {
    if (spiceCategory === 'all') return spicesData;
    return spicesData.filter(spice => spice.spiceType === spiceCategory);
  };

  const getFilteredStaples = () => {
    if (staplesCategory === 'all') return staplesData;
    return staplesData.filter(item => item.category === staplesCategory);
  };

  const getFilteredVegetables = () => {
    if (vegetablesCategory === 'all') return dailyVegetablesData;
    return dailyVegetablesData.filter(item => item.vegetableType === vegetablesCategory);
  };

  const getCurrentData = () => {
    switch (selectedCategory) {
      case 'basics': return kitchenBasicsData;
      case 'spices': return getFilteredSpices();
      case 'staples': return getFilteredStaples();
      case 'vegetables': return getFilteredVegetables();
      default: return kitchenBasicsData;
    }
  };

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'basics': return 'Kitchen Basics';
      case 'spices': return 'Essential Spices';
      case 'staples': return 'Pantry Staples';
      case 'vegetables': return 'Daily-Use Vegetables';
      default: return 'Pantry Basics';
    }
  };

  const getCategoryDescription = () => {
    switch (selectedCategory) {
      case 'basics': return 'Essential items every kitchen should have for daily cooking.';
      case 'spices': return 'Aromatic spices that form the foundation of flavorful cooking.';
      case 'staples': return 'Long-lasting pantry items for varied and nutritious meals.';
      case 'vegetables': return 'Fresh vegetables for daily cooking and healthy meals.';
      default: return 'Essential food items for your kitchen pantry.';
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

  const sidebarItems = [
    { key: 'basics', label: 'Kitchen Basics' },
    { key: 'spices', label: 'Spices' },
    { key: 'staples', label: 'Staples' },
    { key: 'vegetables', label: 'Vegetables' },
  ];

  const PantryIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 5V3M16 5V3M7 11H17M7 15H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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

  if (loading) {
    return (
      <div className="pbp-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && getCurrentData().length === 0) {
    return (
      <div className="pbp-container">
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
    <div className="pbp-container">
      <div className="pbp-mobile-topbar">
        <h1 className="pbp-page-title">{getCategoryTitle()}</h1>
      </div>

      <div className="pbp-categories-row">
        {sidebarItems.map(item => (
          <button
            key={item.key}
            className={`pbp-cat-btn ${selectedCategory === item.key ? 'active' : ''}`}
            onClick={() => { setSelectedCategory(item.key); setSidebarOpen(false); }}
          >
            {item.label}
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
          <div className="pbp-sidebar-categories">
            <ul className="pbp-categories-list">
              {sidebarItems.map(item => (
                <li
                  key={item.key}
                  className={`pbp-category-item${selectedCategory === item.key ? ' pbp-active' : ''}`}
                  onClick={() => { setSelectedCategory(item.key); setSidebarOpen(false); }}
                >
                  <span className="pbp-category-name">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="pbp-main">
          <header className="pbp-main-header">
            <div className="pbp-header-content">
              <h1 className="pbp-page-title desktop-title">{getCategoryTitle()}</h1>
              <p className="pbp-page-description">{getCategoryDescription()}</p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          {/* FILTERS - RETAINED */}
          {selectedCategory === 'spices' && spicesData.length > 0 && (
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
                Whole ({spicesData.filter(s => s.spiceType === 'whole').length})
              </button>
              <button 
                className={`pbp-filter-btn ${spiceCategory === 'ground' ? 'active' : ''}`} 
                onClick={() => setSpiceCategory('ground')}
              >
                Ground ({spicesData.filter(s => s.spiceType === 'ground').length})
              </button>
              <button 
                className={`pbp-filter-btn ${spiceCategory === 'dried-herb' ? 'active' : ''}`} 
                onClick={() => setSpiceCategory('dried-herb')}
              >
                Dried Herbs ({spicesData.filter(s => s.spiceType === 'dried-herb').length})
              </button>
            </div>
          )}

          {selectedCategory === 'staples' && staplesData.length > 0 && (
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
                Rice/Grains ({staplesData.filter(s => s.category === 'rice').length})
              </button>
              <button 
                className={`pbp-filter-btn ${staplesCategory === 'flour' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('flour')}
              >
                Flours ({staplesData.filter(s => s.category === 'flour').length})
              </button>
              <button 
                className={`pbp-filter-btn ${staplesCategory === 'pulses' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('pulses')}
              >
                Pulses ({staplesData.filter(s => s.category === 'pulses').length})
              </button>
              <button 
                className={`pbp-filter-btn ${staplesCategory === 'nuts' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('nuts')}
              >
                Nuts ({staplesData.filter(s => s.category === 'nuts').length})
              </button>
              <button 
                className={`pbp-filter-btn ${staplesCategory === 'dryfruits' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('dryfruits')}
              >
                Dry Fruits ({staplesData.filter(s => s.category === 'dryfruits').length})
              </button>
              <button 
                className={`pbp-filter-btn ${staplesCategory === 'seeds' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('seeds')}
              >
                Seeds ({staplesData.filter(s => s.category === 'seeds').length})
              </button>
              <button 
                className={`pbp-filter-btn ${staplesCategory === 'sweetener' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('sweetener')}
              >
                Sweeteners ({staplesData.filter(s => s.category === 'sweetener').length})
              </button>
              <button 
                className={`pbp-filter-btn ${staplesCategory === 'oil' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('oil')}
              >
                Oils & Ghee ({staplesData.filter(s => s.category === 'oil').length})
              </button>
              <button 
                className={`pbp-filter-btn ${staplesCategory === 'baking' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('baking')}
              >
                Baking ({staplesData.filter(s => s.category === 'baking').length})
              </button>
              <button 
                className={`pbp-filter-btn ${staplesCategory === 'vinegar' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('vinegar')}
              >
                Vinegars ({staplesData.filter(s => s.category === 'vinegar').length})
              </button>
            </div>
          )}

          {selectedCategory === 'vegetables' && dailyVegetablesData.length > 0 && (
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
                Root ({dailyVegetablesData.filter(v => v.vegetableType === 'root').length})
              </button>
              <button 
                className={`pbp-filter-btn ${vegetablesCategory === 'leafy' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('leafy')}
              >
                Leafy ({dailyVegetablesData.filter(v => v.vegetableType === 'leafy').length})
              </button>
              <button 
                className={`pbp-filter-btn ${vegetablesCategory === 'cruciferous' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('cruciferous')}
              >
                Cruciferous ({dailyVegetablesData.filter(v => v.vegetableType === 'cruciferous').length})
              </button>
              <button 
                className={`pbp-filter-btn ${vegetablesCategory === 'gourd' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('gourd')}
              >
                Gourds ({dailyVegetablesData.filter(v => v.vegetableType === 'gourd').length})
              </button>
              <button 
                className={`pbp-filter-btn ${vegetablesCategory === 'fruitveg' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('fruitveg')}
              >
                Fruit Veg ({dailyVegetablesData.filter(v => v.vegetableType === 'fruitveg').length})
              </button>
              <button 
                className={`pbp-filter-btn ${vegetablesCategory === 'flower' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('flower')}
              >
                Flower ({dailyVegetablesData.filter(v => v.vegetableType === 'flower').length})
              </button>
              <button 
                className={`pbp-filter-btn ${vegetablesCategory === 'mushroom' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('mushroom')}
              >
                Mushrooms ({dailyVegetablesData.filter(v => v.vegetableType === 'mushroom').length})
              </button>
            </div>
          )}

          <div className="pbp-items-grid-section">
            <div className="pbp-items-grid">
              {currentData.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="pbp-item-card"
                    onClick={() => handleItemSelect(item)}
                  >
                    <div
                      className="pbp-card-image"
                      style={{ backgroundImage: `url(${item.image || '/api/placeholder/120/120'})` }}
                    />
                    <div className="pbp-card-content">
                      <h3 className="pbp-card-title">{item.name}</h3>
                      <p className="pbp-card-description">{item.tagline || item.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pbp-back-section">
            <button
              className="pbp-back-button"
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
        return (
          <div className="pbp-modal-overlay" onClick={closeDetailPanel}>
            <div className="pbp-modal" onClick={e => e.stopPropagation()}>
              <button className="pbp-modal-close" onClick={closeDetailPanel}>×</button>

              <div className="pbp-modal-hero">
                <p className="pbp-modal-hero-label">Pantry Essential</p>
                <h2 className="pbp-modal-hero-title">{selectedItem.name}</h2>
                <p className="pbp-modal-hero-subtitle">{selectedItem.tagline || selectedItem.name}</p>
              </div>

              <div className="pbp-modal-inner">
                <div className="pbp-modal-left">
                  <div className="pbp-about-row">
                    <div className="pbp-about-text">
                      <div className="pbp-msec">
                        <span className="pbp-msec-label">About this item</span>
                        <p className="pbp-msec-text">{renderSafeContent(selectedItem.fullDesc)}</p>
                      </div>
                    </div>
                    <div
                      className="pbp-about-thumb"
                      style={{ backgroundImage: `url(${selectedItem.image || '/api/placeholder/200/200'})` }}
                      onClick={() => openLightbox(selectedItem.image || '/api/placeholder/200/200')}
                    />
                  </div>

                  <hr className="pbp-mdivider" />

                  {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                    <>
                      <div className="pbp-uses-badge-row">
                        <div className="pbp-uses-section">
                          <span className="pbp-msec-label">Key Features</span>
                          <div className="pbp-uses-wrap">
                            {selectedItem.keyFeatures.map((f, idx) => (
                              <div key={idx} className="pbp-use-tag">
                                <span className="pbp-use-dot">•</span>
                                {renderSafeContent(f)}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pbp-badge-section">
                          <span className="pbp-msec-label">Category</span>
                          <div className="pbp-category-badge">
                            <span className="pbp-category-badge-icon"><PantryIcon /></span>
                            <span className="pbp-category-badge-value">{getCategoryTitle()}</span>
                          </div>
                        </div>
                      </div>
                      <hr className="pbp-mdivider" />
                    </>
                  )}

                  <div className="pbp-modal-two-col">
                    {selectedItem.storageTips && (
                      <div className="pbp-msec">
                        <span className="pbp-msec-label">Storage Tips</span>
                        <p className="pbp-msec-text">{renderSafeContent(selectedItem.storageTips)}</p>
                      </div>
                    )}

                    {selectedItem.shelfLife && (
                      <div className="pbp-msec">
                        <span className="pbp-msec-label">Shelf Life</span>
                        <p className="pbp-msec-text">{renderSafeContent(selectedItem.shelfLife)}</p>
                      </div>
                    )}
                  </div>

                  {selectedItem.keyUses && selectedItem.keyUses.length > 0 && (
                    <>
                      <hr className="pbp-mdivider" />
                      <div className="pbp-msec">
                        <span className="pbp-msec-label">Common Uses</span>
                        <div className="pbp-uses-wrap">
                          {selectedItem.keyUses.map((u, idx) => (
                            <div key={idx} className="pbp-use-tag">
                              <span className="pbp-use-dot">•</span>
                              {renderSafeContent(u)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedItem.properUsage && (
                    <>
                      <hr className="pbp-mdivider" />
                      <div className="pbp-msec">
                        <span className="pbp-msec-label">Proper Usage</span>
                        <div className="pbp-tip-card">
                          <span className="pbp-tip-icon"><LightbulbIcon /></span>
                          <span className="pbp-tip-txt">{renderSafeContent(selectedItem.properUsage)}</span>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
                    <>
                      <hr className="pbp-mdivider" />
                      <div className="pbp-msec">
                        <span className="pbp-msec-label">Common Mistakes</span>
                        <div className="pbp-mistakes-list">
                          {selectedItem.commonMistakes.map((m, idx) => (
                            <div key={idx} className="pbp-mistake-card">
                              <span className="pbp-mistake-icon"><WarningIcon /></span>
                              <span className="pbp-tip-txt">{renderSafeContent(m)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedItem.cookingTips && (
                    <>
                      <hr className="pbp-mdivider" />
                      <div className="pbp-msec">
                        <span className="pbp-msec-label">Pro Tips</span>
                        <div className="pbp-tip-card">
                          <span className="pbp-tip-icon"><LightbulbIcon /></span>
                          <span className="pbp-tip-txt">{renderSafeContent(selectedItem.cookingTips)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="pbp-modal-right">
                  <div
                    className="pbp-modal-right-image"
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
        <div className="pbp-lightbox-overlay" onClick={closeLightbox}>
          <button className="pbp-lightbox-close" onClick={closeLightbox}>×</button>
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

export default PantryBasicsPage;