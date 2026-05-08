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
    const content = guide.content || {};
    
    return {
      id: guide._id,
      name: guide.title || content.name || '',
      tagline: content.tagline || guide.tagline || '',
      fullDesc: content.fullDesc || content.description || guide.fullDesc || '',
      description: content.description || guide.description || '',
      image: guide.image || content.image || 'https://via.placeholder.com/300',
      
      // Storage & Shelf Life
      storageTips: content.storageTips || guide.storageTips || "Store in a cool, dry place",
      shelfLife: content.shelfLife || guide.shelfLife || "Varies by item",
      
      // Usage
      keyUses: content.keyUses || guide.keyUses || [],
      bestFor: content.bestFor || guide.bestFor || '',
      
      // Types & Varieties
      types: content.types || guide.types || [],
      
      // Key Features (Spices)
      keyFeatures: content.keyFeatures || guide.keyFeatures || [],
      properUsage: content.properUsage || guide.properUsage || '',
      commonMistakes: content.commonMistakes || guide.commonMistakes || [],
      
      // Additional Info
      urduName: content.urduName || guide.urduName || '',
      season: content.season || guide.season || "All year",
      nutritionalInfo: content.nutritionalInfo || guide.nutritionalInfo || '',
      healthBenefits: content.healthBenefits || guide.healthBenefits || [],
      cookingTips: content.cookingTips || guide.cookingTips || '',
      
      // Physical Properties
      type: content.type || guide.type || '',
      material: content.material || guide.material || '',
      price: content.price || guide.price || '',
      priceRange: content.priceRange || guide.priceRange || '',
      durability: content.durability || guide.durability || '',
      
      // Pros & Cons
      pros: content.pros || guide.pros || [],
      cons: content.cons || guide.cons || [],
      care: content.care || guide.care || '',
      
      // Size/Capacity
      size: content.size || guide.size || '',
      sizes: content.sizes || guide.sizes || '',
      capacity: content.capacity || guide.capacity || '',
      diameter: content.diameter || guide.diameter || '',
      length: content.length || guide.length || '',
      
      // Spice specific
      spiceType: content.spiceType || guide.spiceType || '',
      
      // Vegetable specific
      vegetableType: content.vegetableType || guide.vegetableType || '',
      
      // Category for filtering
      category: content.category || guide.category || '',
      subCategory: guide.subCategory || ''
    };
  };

  // ==================== FETCH DATA FROM API ====================
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${API_BASE_URL}/api/beginners-guide`, {
          params: { mainCategory: 'pantry-basics' }
        });
        
        const allGuides = response.data.guides || [];
        console.log('Total guides fetched:', allGuides.length);
        
        const basics = allGuides.filter(g => g.subCategory === 'kitchen-basics');
        const spices = allGuides.filter(g => g.subCategory === 'spices');
        const staples = allGuides.filter(g => g.subCategory === 'staples');
        const vegetables = allGuides.filter(g => g.subCategory === 'vegetables');
        
        setKitchenBasicsData(basics.map(parseGuideToItem));
        setSpicesData(spices.map(parseGuideToItem));
        setStaplesData(staples.map(parseGuideToItem));
        setDailyVegetablesData(vegetables.map(parseGuideToItem));
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please check connection.');
      }
      
      setLoading(false);
    };

    fetchAllData();
  }, []);

  // ==================== FILTER FUNCTIONS ====================
  const getFilteredSpices = () => {
    if (spiceCategory === 'all') return spicesData;
    if (spiceCategory === 'whole') return spicesData.filter(spice => spice.spiceType === 'whole');
    if (spiceCategory === 'ground') return spicesData.filter(spice => spice.spiceType === 'ground');
    if (spiceCategory === 'dried-herb') return spicesData.filter(spice => spice.spiceType === 'dried-herb');
    if (spiceCategory === 'aromatic') return spicesData.filter(spice => spice.filterTags?.includes('aromatic'));
    if (spiceCategory === 'temper') return spicesData.filter(spice => spice.filterTags?.includes('temper'));
    return spicesData;
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

  // Helper functions to get counts
  const getStaplesCount = (cat) => {
    if (cat === 'all') return staplesData.length;
    return staplesData.filter(item => item.category === cat).length;
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
              <li className={`pbp-category-item ${selectedCategory === 'basics' ? 'pbp-active' : ''}`} onClick={() => setSelectedCategory('basics')}>
                <span className="pbp-category-name">Kitchen Basics ({kitchenBasicsData.length})</span>
              </li>
              <li className={`pbp-category-item ${selectedCategory === 'spices' ? 'pbp-active' : ''}`} onClick={() => setSelectedCategory('spices')}>
                <span className="pbp-category-name">Spices ({spicesData.length})</span>
              </li>
              <li className={`pbp-category-item ${selectedCategory === 'staples' ? 'pbp-active' : ''}`} onClick={() => setSelectedCategory('staples')}>
                <span className="pbp-category-name">Staples ({staplesData.length})</span>
              </li>
              <li className={`pbp-category-item ${selectedCategory === 'vegetables' ? 'pbp-active' : ''}`} onClick={() => setSelectedCategory('vegetables')}>
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
              <button className={`spice-filter-btn ${spiceCategory === 'all' ? 'active' : ''}`} onClick={() => setSpiceCategory('all')}>All ({spicesData.length})</button>
              <button className={`spice-filter-btn ${spiceCategory === 'whole' ? 'active' : ''}`} onClick={() => setSpiceCategory('whole')}>Whole ({spicesData.filter(s => s.spiceType === 'whole').length})</button>
              <button className={`spice-filter-btn ${spiceCategory === 'ground' ? 'active' : ''}`} onClick={() => setSpiceCategory('ground')}>Ground ({spicesData.filter(s => s.spiceType === 'ground').length})</button>
              <button className={`spice-filter-btn ${spiceCategory === 'dried-herb' ? 'active' : ''}`} onClick={() => setSpiceCategory('dried-herb')}>Dried Herbs ({spicesData.filter(s => s.spiceType === 'dried-herb').length})</button>
              <button className={`spice-filter-btn ${spiceCategory === 'aromatic' ? 'active' : ''}`} onClick={() => setSpiceCategory('aromatic')}>Aromatic</button>
              <button className={`spice-filter-btn ${spiceCategory === 'temper' ? 'active' : ''}`} onClick={() => setSpiceCategory('temper')}>Temper</button>
            </div>
          )}

          {/* STAPLES FILTER BUTTONS - COMPLETE */}
          {selectedCategory === 'staples' && staplesData.length > 0 && (
            <div className="staples-filter-buttons">
              <button className={`staples-filter-btn ${staplesCategory === 'all' ? 'active' : ''}`} onClick={() => setStaplesCategory('all')}>All ({staplesData.length})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'rice' ? 'active' : ''}`} onClick={() => setStaplesCategory('rice')}>Rice/Grains ({getStaplesCount('rice')})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'flour' ? 'active' : ''}`} onClick={() => setStaplesCategory('flour')}>Flours ({getStaplesCount('flour')})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'pulses' ? 'active' : ''}`} onClick={() => setStaplesCategory('pulses')}>Pulses ({getStaplesCount('pulses')})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'nuts' ? 'active' : ''}`} onClick={() => setStaplesCategory('nuts')}>Nuts ({getStaplesCount('nuts')})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'dryfruits' ? 'active' : ''}`} onClick={() => setStaplesCategory('dryfruits')}>Dry Fruits ({getStaplesCount('dryfruits')})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'seeds' ? 'active' : ''}`} onClick={() => setStaplesCategory('seeds')}>Seeds ({getStaplesCount('seeds')})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'sweetener' ? 'active' : ''}`} onClick={() => setStaplesCategory('sweetener')}>Sweeteners ({getStaplesCount('sweetener')})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'oil' ? 'active' : ''}`} onClick={() => setStaplesCategory('oil')}>Oils & Ghee ({getStaplesCount('oil')})</button>
              <button className={`staples-filter-btn ${staplesCategory === 'vinegar' ? 'active' : ''}`} onClick={() => setStaplesCategory('vinegar')}>Vinegars ({getStaplesCount('vinegar')})</button>
            </div>
          )}

          {/* VEGETABLES FILTER BUTTONS */}
          {selectedCategory === 'vegetables' && dailyVegetablesData.length > 0 && (
            <div className="vegetables-filter-buttons">
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'all' ? 'active' : ''}`} onClick={() => setVegetablesCategory('all')}>All ({dailyVegetablesData.length})</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'root' ? 'active' : ''}`} onClick={() => setVegetablesCategory('root')}>Root ({dailyVegetablesData.filter(v => v.vegetableType === 'root').length})</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'leafy' ? 'active' : ''}`} onClick={() => setVegetablesCategory('leafy')}>Leafy ({dailyVegetablesData.filter(v => v.vegetableType === 'leafy').length})</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'cruciferous' ? 'active' : ''}`} onClick={() => setVegetablesCategory('cruciferous')}>Cruciferous ({dailyVegetablesData.filter(v => v.vegetableType === 'cruciferous').length})</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'gourd' ? 'active' : ''}`} onClick={() => setVegetablesCategory('gourd')}>Gourds ({dailyVegetablesData.filter(v => v.vegetableType === 'gourd').length})</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'fruitveg' ? 'active' : ''}`} onClick={() => setVegetablesCategory('fruitveg')}>Fruit Veg ({dailyVegetablesData.filter(v => v.vegetableType === 'fruitveg').length})</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'flower' ? 'active' : ''}`} onClick={() => setVegetablesCategory('flower')}>Flower ({dailyVegetablesData.filter(v => v.vegetableType === 'flower').length})</button>
              <button className={`vegetables-filter-btn ${vegetablesCategory === 'mushroom' ? 'active' : ''}`} onClick={() => setVegetablesCategory('mushroom')}>Mushrooms ({dailyVegetablesData.filter(v => v.vegetableType === 'mushroom').length})</button>
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
                {selectedItem.tagline && <p className="pbp-modal-subtitle">{selectedItem.tagline}</p>}
                {selectedItem.urduName && !selectedItem.tagline && <p className="pbp-modal-subtitle">({selectedItem.urduName})</p>}
              </div>
            </div>
            <div className="pbp-modal-content">
              <div className="pbp-modal-left">
                <div className="pbp-modal-details">
                  
                  {/* Description */}
                  {(selectedItem.fullDesc || selectedItem.description) && (
                    <div className="pbp-detail-section">
                      <h3>📝 Description</h3>
                      <p>{selectedItem.fullDesc || selectedItem.description}</p>
                    </div>
                  )}
                  
                  {/* Urdu Name */}
                  {selectedItem.urduName && (
                    <div className="pbp-detail-section">
                      <h3>📖 Urdu Name</h3>
                      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedItem.urduName}</p>
                    </div>
                  )}
                  
                  {/* Best For */}
                  {selectedItem.bestFor && (
                    <div className="pbp-detail-section">
                      <h3>🎯 Best For</h3>
                      <p>{selectedItem.bestFor}</p>
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
                  
                  {/* Key Features */}
                  {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                    <div className="pbp-detail-section">
                      <h3>✨ Key Features</h3>
                      <div className="pbp-features-grid">
                        {selectedItem.keyFeatures.map((feature, idx) => (
                          <div key={idx} className="pbp-feature-item">✓ {feature}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Proper Usage */}
                  {selectedItem.properUsage && (
                    <div className="pbp-detail-section">
                      <h3>📝 Proper Usage</h3>
                      <p>{selectedItem.properUsage}</p>
                    </div>
                  )}
                  
                  {/* Common Mistakes */}
                  {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
                    <div className="pbp-detail-section">
                      <h3>❌ Common Mistakes</h3>
                      <div className="pbp-mistakes-grid">
                        {selectedItem.commonMistakes.map((mistake, idx) => (
                          <div key={idx} className="pbp-mistake-item">⚠️ {mistake}</div>
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
                  
                  {/* Season */}
                  {selectedItem.season && selectedItem.season !== "All year" && (
                    <div className="pbp-detail-section">
                      <h3>🌿 Best Season</h3>
                      <p>{selectedItem.season}</p>
                    </div>
                  )}
                  
                  {/* Nutritional Info */}
                  {selectedItem.nutritionalInfo && (
                    <div className="pbp-detail-section">
                      <h3>🥗 Nutritional Info</h3>
                      <p>{selectedItem.nutritionalInfo}</p>
                    </div>
                  )}
                  
                  {/* Health Benefits */}
                  {selectedItem.healthBenefits && selectedItem.healthBenefits.length > 0 && (
                    <div className="pbp-detail-section">
                      <h3>💚 Health Benefits</h3>
                      <div className="pbp-health-grid">
                        {selectedItem.healthBenefits.map((benefit, idx) => (
                          <div key={idx} className="pbp-health-item">🌱 {benefit}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Cooking Tips */}
                  {selectedItem.cookingTips && (
                    <div className="pbp-detail-section">
                      <h3>👨‍🍳 Cooking Tips</h3>
                      <p>{selectedItem.cookingTips}</p>
                    </div>
                  )}
                  
                  {/* Pros */}
                  {selectedItem.pros && selectedItem.pros.length > 0 && (
                    <div className="pbp-detail-section">
                      <h3>✅ Pros</h3>
                      <div className="pbp-pros-grid">
                        {selectedItem.pros.map((pro, idx) => (
                          <div key={idx} className="pbp-pros-item">✓ {pro}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Cons */}
                  {selectedItem.cons && selectedItem.cons.length > 0 && (
                    <div className="pbp-detail-section">
                      <h3>❌ Cons</h3>
                      <div className="pbp-cons-grid">
                        {selectedItem.cons.map((con, idx) => (
                          <div key={idx} className="pbp-cons-item">✗ {con}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Types & Varieties */}
                  {selectedItem.types && selectedItem.types.length > 0 && (
                    <div className="pbp-types-section">
                      <h3>📌 Types & Varieties</h3>
                      <div className="pbp-types-grid">
                        {selectedItem.types.map((type, idx) => (
                          <div key={idx} className="pbp-type-card">
                            {type.image && <div className="pbp-type-image" style={{ backgroundImage: `url(${type.image})` }}></div>}
                            <div className="pbp-type-content">
                              <h4>{type.name}</h4>
                              <p className="pbp-type-desc">{type.description}</p>
                              {type.bestFor && <div><strong>Best For:</strong> {type.bestFor}</div>}
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
        .pbp-features-grid, .pbp-mistakes-grid, .pbp-pros-grid, .pbp-cons-grid, .pbp-health-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .pbp-feature-item, .pbp-mistake-item, .pbp-health-item {
          background: #f3f4f6;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
        }
        .pbp-pros-item, .pbp-cons-item {
          padding: 6px 0;
          font-size: 14px;
        }
        .pbp-use-item {
          padding: 4px 0;
        }
        .staples-filter-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 20px 0;
          padding: 10px;
          background: #f9fafb;
          border-radius: 12px;
        }
        .staples-filter-btn {
          padding: 8px 16px;
          border: none;
          background: white;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          color: #4b5563;
          transition: all 0.2s;
        }
        .staples-filter-btn.active {
          background: #284a4b;
          color: white;
        }
        .staples-filter-btn:hover {
          background: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default PantryBasicsPage;