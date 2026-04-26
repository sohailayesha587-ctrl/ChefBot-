import React, { useState, useEffect } from 'react';
import './PantryBasicsPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PantryBasicsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [spiceCategory, setSpiceCategory] = useState('all');
  const [staplesCategory, setStaplesCategory] = useState('all');
  const [vegetablesCategory, setVegetablesCategory] = useState('all');
  
  // Data states
  const [kitchenBasicsData, setKitchenBasicsData] = useState([]);
  const [spicesData, setSpicesData] = useState([]);
  const [staplesData, setStaplesData] = useState([]);
  const [dailyVegetablesData, setDailyVegetablesData] = useState([]);

  const API_BASE_URL = 'http://localhost:5000';

  // ==================== PARSE GUIDE DATA ====================
  const parseGuideToItem = (guide) => {
    // First try to parse content as JSON (for migration data)
    if (guide.content && guide.content.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(guide.content);
        return {
          id: guide._id,
          ...parsed,
          image: parsed.image || guide.image,
          // Ensure all fields exist
          tagline: parsed.tagline || guide.tagline || parsed.name || guide.title,
          fullDesc: parsed.fullDesc || parsed.description || guide.fullDesc || guide.content,
          storageTips: parsed.storageTips || guide.storageTips || "Store in cool, dry place",
          shelfLife: parsed.shelfLife || guide.shelfLife || "Varies by item",
          keyUses: parsed.keyUses || guide.keyUses || [],
          types: parsed.types || guide.types || [],
          keyFeatures: parsed.keyFeatures || guide.keyFeatures || [],
          properUsage: parsed.properUsage || guide.properUsage || "",
          commonMistakes: parsed.commonMistakes || guide.commonMistakes || [],
          urduName: parsed.urduName || guide.urduName || "",
          season: parsed.season || guide.season || "All year",
          category: parsed.category || guide.category
        };
      } catch (e) {
        console.warn('JSON parse error for:', guide.title, e.message);
      }
    }
    
    // If not JSON, create from direct fields
    return {
      id: guide._id,
      name: guide.title,
      tagline: guide.tagline || guide.title,
      fullDesc: guide.fullDesc || guide.description || guide.content || `${guide.title} is an essential kitchen item.`,
      image: guide.image || 'https://via.placeholder.com/300',
      storageTips: guide.storageTips || "Store in cool, dry place",
      shelfLife: guide.shelfLife || "Varies by item",
      keyUses: guide.keyUses || [],
      types: guide.types || [],
      category: guide.category,
      keyFeatures: guide.keyFeatures || [],
      properUsage: guide.properUsage || "",
      commonMistakes: guide.commonMistakes || [],
      urduName: guide.urduName || "",
      season: guide.season || "All year",
      nutritionalInfo: guide.nutritionalInfo || "",
      healthBenefits: guide.healthBenefits || [],
      cookingTips: guide.cookingTips || ""
    };
  };

  // ==================== FETCH DATA FROM API ====================
  const fetchCategoryData = async (category, setData) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/beginners-guide`, {
        params: { category }
      });
      
      console.log(`Fetched ${category}:`, response.data);
      
      if (response.data && response.data.guides && response.data.guides.length > 0) {
        const parsedData = response.data.guides.map(parseGuideToItem);
        setData(parsedData);
        return true;
      } else {
        console.log(`No data found for ${category}`);
        setData([]);
        return false;
      }
    } catch (error) {
      console.error(`Error fetching ${category}:`, error.message);
      setData([]);
      return false;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      // Fetch all categories
      await Promise.all([
        fetchCategoryData('pantry-basics', setKitchenBasicsData),
        fetchCategoryData('spices', setSpicesData),
        fetchCategoryData('staples', setStaplesData),
        fetchCategoryData('vegetables', setDailyVegetablesData)
      ]);
      
      setLoading(false);
    };

    fetchAllData();
  }, []);

  // Filter functions
  const getFilteredSpices = () => {
    if (spiceCategory === 'all') return spicesData;
    return spicesData.filter(spice => spice.category === spiceCategory);
  };

  const getFilteredStaples = () => {
    if (staplesCategory === 'all') return staplesData;
    return staplesData.filter(item => item.category === staplesCategory);
  };

  const getFilteredVegetables = () => {
    if (vegetablesCategory === 'all') return dailyVegetablesData;
    return dailyVegetablesData.filter(item => item.category === vegetablesCategory);
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

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedItem(null);
  };

  const getCardClass = (itemName, category) => {
    const name = itemName?.toLowerCase() || '';
    if (category === 'basics') {
      if (name.includes('rice')) return 'basics-rice';
      if (name.includes('flour')) return 'basics-flour';
      if (name.includes('oil')) return 'basics-oil';
      if (name.includes('salt')) return 'basics-salt';
      if (name.includes('sugar')) return 'basics-sugar';
      if (name.includes('tea') || name.includes('coffee')) return 'basics-beverage';
      if (name.includes('milk')) return 'basics-dairy';
      if (name.includes('vinegar')) return 'basics-vinegar';
    }
    return '';
  };

  if (loading) {
    return (
      <div className="pbp-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', border: '4px solid #e2e8f0', borderTop: '4px solid #284a4b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#64748b' }}>Loading pantry essentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pbp-container">
      <div className="pbp-layout">
        {/* SIDEBAR */}
        <aside className="pbp-sidebar">
          <div className="pbp-sidebar-header">
            <h2 className="pbp-sidebar-title">Pantry Basics</h2>
            <p className="pbp-sidebar-subtitle">Essential Food Items</p>
          </div>
          <div className="pbp-sidebar-categories">
            <ul className="pbp-categories-list">
              <li 
                className={`pbp-category-item ${selectedCategory === 'basics' ? 'pbp-active' : ''}`} 
                onClick={() => setSelectedCategory('basics')}
              >
                <span className="pbp-category-name">Kitchen Basics ({kitchenBasicsData.length})</span>
              </li>
              <li 
                className={`pbp-category-item ${selectedCategory === 'spices' ? 'pbp-active' : ''}`} 
                onClick={() => setSelectedCategory('spices')}
              >
                <span className="pbp-category-name">Spices ({spicesData.length})</span>
              </li>
              <li 
                className={`pbp-category-item ${selectedCategory === 'staples' ? 'pbp-active' : ''}`} 
                onClick={() => setSelectedCategory('staples')}
              >
                <span className="pbp-category-name">Staples ({staplesData.length})</span>
              </li>
              <li 
                className={`pbp-category-item ${selectedCategory === 'vegetables' ? 'pbp-active' : ''}`} 
                onClick={() => setSelectedCategory('vegetables')}
              >
                <span className="pbp-category-name">Vegetables ({dailyVegetablesData.length})</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="pbp-main">
          {error && (
            <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
              ⚠️ {error}
            </div>
          )}
          
          <header className="pbp-main-header">
            <div className="pbp-header-content">
              <h1 className="pbp-page-title">
                {selectedCategory === 'basics' && 'Kitchen Basics'}
                {selectedCategory === 'spices' && 'Essential Spices'}
                {selectedCategory === 'staples' && 'Pantry Staples'}
                {selectedCategory === 'vegetables' && 'Daily-Use Vegetables'}
              </h1>
              <p className="pbp-page-description">
                {selectedCategory === 'basics' && 'Essential items every kitchen should have for daily cooking.'}
                {selectedCategory === 'spices' && 'Aromatic spices that form the foundation of flavorful cooking.'}
                {selectedCategory === 'staples' && 'Long-lasting pantry items for varied and nutritious meals.'}
                {selectedCategory === 'vegetables' && 'Fresh vegetables for daily cooking and healthy meals.'}
              </p>
            </div>
          </header>

          {/* SPICES FILTER BUTTONS */}
          {selectedCategory === 'spices' && spicesData.length > 0 && (
            <div className="spice-filter-buttons">
              <button className={`spice-filter-btn ${spiceCategory === 'all' ? 'active' : ''}`} onClick={() => setSpiceCategory('all')}>All Spices ({spicesData.length})</button>
              <button className={`spice-filter-btn ${spiceCategory === 'whole' ? 'active' : ''}`} onClick={() => setSpiceCategory('whole')}>Whole Spices</button>
              <button className={`spice-filter-btn ${spiceCategory === 'ground' ? 'active' : ''}`} onClick={() => setSpiceCategory('ground')}>Ground Spices</button>
              <button className={`spice-filter-btn ${spiceCategory === 'aromatic' ? 'active' : ''}`} onClick={() => setSpiceCategory('aromatic')}>Aromatic Spices</button>
              <button className={`spice-filter-btn ${spiceCategory === 'temper' ? 'active' : ''}`} onClick={() => setSpiceCategory('temper')}>Temper Spices</button>
            </div>
          )}

          {/* STAPLES FILTER BUTTONS */}
          {selectedCategory === 'staples' && staplesData.length > 0 && (
            <div className="staples-filter-buttons">
              <button className={`staples-filter-btn ${staplesCategory === 'all' ? 'active' : ''}`} onClick={() => setStaplesCategory('all')}>All Staples ({staplesData.length})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'rice' ? 'active' : ''}`} onClick={() => setStaplesCategory('rice')}>Rice</button>
              <button className={`staples-filter-btn ${staplesCategory === 'pulses' ? 'active' : ''}`} onClick={() => setStaplesCategory('pulses')}>Pulses</button>
              <button className={`staples-filter-btn ${staplesCategory === 'nuts' ? 'active' : ''}`} onClick={() => setStaplesCategory('nuts')}>Nuts</button>
              <button className={`staples-filter-btn ${staplesCategory === 'dryfruits' ? 'active' : ''}`} onClick={() => setStaplesCategory('dryfruits')}>Dry Fruits</button>
            </div>
          )}

          {/* VEGETABLES FILTER BUTTONS */}
          {selectedCategory === 'vegetables' && dailyVegetablesData.length > 0 && (
            <div className="vegetables-filter-buttons">
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'all' ? 'active' : ''}`} onClick={() => setVegetablesCategory('all')}>All Vegetables ({dailyVegetablesData.length})</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'root' ? 'active' : ''}`} onClick={() => setVegetablesCategory('root')}>Root Vegetables</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'leafy' ? 'active' : ''}`} onClick={() => setVegetablesCategory('leafy')}>Leafy Greens</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'gourd' ? 'active' : ''}`} onClick={() => setVegetablesCategory('gourd')}>Gourds</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'cruciferous' ? 'active' : ''}`} onClick={() => setVegetablesCategory('cruciferous')}>Cruciferous</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'fruitveg' ? 'active' : ''}`} onClick={() => setVegetablesCategory('fruitveg')}>Fruit Vegetables</button>
            </div>
          )}

          {/* ITEMS GRID */}
          <div className="pbp-items-grid-section">
            {getCurrentData().length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>
                No items found in this category.
              </div>
            ) : (
              <div className="pbp-items-grid">
                {getCurrentData().map(item => (
                  <div 
                    key={item.id} 
                    className={`pbp-item-card ${getCardClass(item.name, selectedCategory)}`} 
                    onClick={() => handleItemSelect(item)}
                  >
                    <div className="pbp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className="pbp-card-content">
                      <h3 className="pbp-card-title">{item.name}</h3>
                      <p className="pbp-card-description">{item.tagline || (item.fullDesc ? item.fullDesc.substring(0, 80) + '...' : '')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL / DETAIL PANEL */}
      {showDetailPanel && selectedItem && (
        <div className="pbp-modal-overlay" onClick={closeDetailPanel}>
          <div className="pbp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pbp-modal-close" onClick={closeDetailPanel}>×</button>
            <div className="pbp-modal-header">
              <div className="pbp-modal-title">
                <h2>{selectedItem.name}</h2>
                <p className="pbp-modal-subtitle">{selectedItem.tagline || (selectedItem.urduName ? `(${selectedItem.urduName})` : '')}</p>
              </div>
            </div>
            <div className="pbp-modal-content">
              <div className="pbp-modal-left">
                <div className="pbp-modal-details">
                  {/* Description */}
                  <div className="pbp-detail-section">
                    <h3>Description</h3>
                    <p>{selectedItem.fullDesc || `${selectedItem.name} is an essential kitchen item.`}</p>
                  </div>
                  
                  {/* Urdu Name for Spices */}
                  {selectedItem.urduName && (
                    <div className="pbp-detail-section">
                      <h3>Urdu Name</h3>
                      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedItem.urduName}</p>
                    </div>
                  )}
                  
                  {/* Storage Tips */}
                  {selectedItem.storageTips && (
                    <div className="pbp-detail-section">
                      <h3>📦 Storage Tips</h3>
                      <p>{selectedItem.storageTips}</p>
                    </div>
                  )}
                  
                  {/* Shelf Life */}
                  {selectedItem.shelfLife && (
                    <div className="pbp-detail-section">
                      <h3>⏰ Shelf Life</h3>
                      <p>{selectedItem.shelfLife}</p>
                    </div>
                  )}
                  
                  {/* Key Features (Spices) */}
                  {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                    <div className="pbp-detail-section">
                      <h3>✨ Key Features</h3>
                      <div className="pbp-features-grid">
                        {selectedItem.keyFeatures.map((feature, idx) => (
                          <div key={idx} className="pbp-feature-item">{feature}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Proper Usage (Spices) */}
                  {selectedItem.properUsage && (
                    <div className="pbp-detail-section">
                      <h3>📝 Proper Usage</h3>
                      <p>{selectedItem.properUsage}</p>
                    </div>
                  )}
                  
                  {/* Common Mistakes (Spices) */}
                  {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
                    <div className="pbp-detail-section">
                      <h3>❌ Common Mistakes</h3>
                      <div className="pbp-mistakes-grid">
                        {selectedItem.commonMistakes.map((mistake, idx) => (
                          <div key={idx} className="pbp-mistake-item">{mistake}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Key Uses */}
                  {selectedItem.keyUses && selectedItem.keyUses.length > 0 && (
                    <div className="pbp-detail-section">
                      <h3>🍳 Common Uses</h3>
                      <div className="pbp-uses-list">
                        {selectedItem.keyUses.map((use, idx) => (
                          <div key={idx} className="pbp-use-item">✓ {use}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Season (Vegetables) */}
                  {selectedItem.season && (
                    <div className="pbp-detail-section">
                      <h3>🌿 Best Season</h3>
                      <p>{selectedItem.season}</p>
                    </div>
                  )}
                  
                  {/* Types & Varieties */}
                  {selectedItem.types && selectedItem.types.length > 0 && (
                    <div className="pbp-types-section">
                      <h3 className="pbp-types-heading">Types & Varieties</h3>
                      <div className="pbp-types-grid">
                        {selectedItem.types.map((type, idx) => (
                          <div key={idx} className="pbp-type-card">
                            {type.image && <div className="pbp-type-image" style={{ backgroundImage: `url(${type.image})` }}></div>}
                            <div className="pbp-type-content">
                              <h4>{type.name}</h4>
                              <p className="pbp-type-desc">{type.description}</p>
                              {type.bestFor && <div className="pbp-type-best"><strong>Best For:</strong> {type.bestFor}</div>}
                              {type.cookingTime && <div className="pbp-type-info-item">⏱️ {type.cookingTime}</div>}
                              {type.waterRatio && <div className="pbp-type-info-item">💧 {type.waterRatio}</div>}
                              {type.glycemicIndex && <div className="pbp-type-info-item">📊 GI: {type.glycemicIndex}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="pbp-modal-right">
                <div className="pbp-main-image-container">
                  <div className="pbp-main-image" style={{ backgroundImage: `url(${selectedItem.image})` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="back-home-container">
        <button className="back-home-btn" onClick={() => navigate('/guidance')}>← Back to Guidance Page</button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PantryBasicsPage;