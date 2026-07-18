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
  
  const [spiceCategory, setSpiceCategory] = useState('all');
  const [staplesCategory, setStaplesCategory] = useState('all');
  const [vegetablesCategory, setVegetablesCategory] = useState('all');
  
  const [kitchenBasicsData, setKitchenBasicsData] = useState([]);
  const [spicesData, setSpicesData] = useState([]);
  const [staplesData, setStaplesData] = useState([]);
  const [dailyVegetablesData, setDailyVegetablesData] = useState([]);

  const API_URL = 'http://localhost:5000/api/guides';

  const parseGuideToItem = (guide) => {
    const content = guide.content || {};
    
    return {
      id: guide._id,
      name: guide.title || content.name || '',
      tagline: content.tagline || guide.tagline || '',
      fullDesc: content.fullDesc || content.description || guide.fullDesc || '',
      description: content.description || guide.description || '',
      image: guide.image || content.image || 'https://via.placeholder.com/300',
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
      spiceType: content.spiceType || guide.spiceType || '',
      vegetableType: content.vegetableType || guide.vegetableType || '',
      category: content.category || guide.category || '',
    };
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(API_URL, {
          params: { category: 'pantry-basics' }
        });
        
        const allGuides = response.data.guides || [];
        
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

  const getFilteredSpices = () => {
    if (spiceCategory === 'all') return spicesData;
    if (spiceCategory === 'whole') return spicesData.filter(spice => spice.spiceType === 'whole');
    if (spiceCategory === 'ground') return spicesData.filter(spice => spice.spiceType === 'ground');
    if (spiceCategory === 'dried-herb') return spicesData.filter(spice => spice.spiceType === 'dried-herb');
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

  const getStaplesCount = (cat) => {
    if (cat === 'all') return staplesData.length;
    return staplesData.filter(item => item.category === cat).length;
  };

  const getSpicesCount = (type) => {
    if (type === 'all') return spicesData.length;
    return spicesData.filter(spice => spice.spiceType === type).length;
  };

  const getVegetablesCount = (type) => {
    if (type === 'all') return dailyVegetablesData.length;
    return dailyVegetablesData.filter(item => item.vegetableType === type).length;
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="pbp-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading pantry essentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pbp-container">
      <div className="pbp-layout">
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

        <main className="pbp-main">
          {error && (
            <div className="error-banner">
              {error}
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

          {selectedCategory === 'spices' && spicesData.length > 0 && (
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${spiceCategory === 'all' ? 'active' : ''}`} 
                onClick={() => setSpiceCategory('all')}
              >
                All ({getSpicesCount('all')})
              </button>
              <button 
                className={`filter-btn ${spiceCategory === 'whole' ? 'active' : ''}`} 
                onClick={() => setSpiceCategory('whole')}
              >
                Whole ({getSpicesCount('whole')})
              </button>
              <button 
                className={`filter-btn ${spiceCategory === 'ground' ? 'active' : ''}`} 
                onClick={() => setSpiceCategory('ground')}
              >
                Ground ({getSpicesCount('ground')})
              </button>
              <button 
                className={`filter-btn ${spiceCategory === 'dried-herb' ? 'active' : ''}`} 
                onClick={() => setSpiceCategory('dried-herb')}
              >
                Dried Herbs ({getSpicesCount('dried-herb')})
              </button>
            </div>
          )}

          {selectedCategory === 'staples' && staplesData.length > 0 && (
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${staplesCategory === 'all' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('all')}
              >
                All ({getStaplesCount('all')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'rice' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('rice')}
              >
                Rice/Grains ({getStaplesCount('rice')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'flour' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('flour')}
              >
                Flours ({getStaplesCount('flour')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'pulses' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('pulses')}
              >
                Pulses ({getStaplesCount('pulses')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'nuts' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('nuts')}
              >
                Nuts ({getStaplesCount('nuts')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'dryfruits' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('dryfruits')}
              >
                Dry Fruits ({getStaplesCount('dryfruits')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'seeds' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('seeds')}
              >
                Seeds ({getStaplesCount('seeds')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'sweetener' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('sweetener')}
              >
                Sweeteners ({getStaplesCount('sweetener')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'oil' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('oil')}
              >
                Oils and Ghee ({getStaplesCount('oil')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'baking' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('baking')}
              >
                Baking ({getStaplesCount('baking')})
              </button>
              <button 
                className={`filter-btn ${staplesCategory === 'vinegar' ? 'active' : ''}`} 
                onClick={() => setStaplesCategory('vinegar')}
              >
                Vinegars ({getStaplesCount('vinegar')})
              </button>
            </div>
          )}

          {selectedCategory === 'vegetables' && dailyVegetablesData.length > 0 && (
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${vegetablesCategory === 'all' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('all')}
              >
                All ({getVegetablesCount('all')})
              </button>
              <button 
                className={`filter-btn ${vegetablesCategory === 'root' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('root')}
              >
                Root ({getVegetablesCount('root')})
              </button>
              <button 
                className={`filter-btn ${vegetablesCategory === 'leafy' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('leafy')}
              >
                Leafy ({getVegetablesCount('leafy')})
              </button>
              <button 
                className={`filter-btn ${vegetablesCategory === 'cruciferous' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('cruciferous')}
              >
                Cruciferous ({getVegetablesCount('cruciferous')})
              </button>
              <button 
                className={`filter-btn ${vegetablesCategory === 'gourd' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('gourd')}
              >
                Gourds ({getVegetablesCount('gourd')})
              </button>
              <button 
                className={`filter-btn ${vegetablesCategory === 'fruitveg' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('fruitveg')}
              >
                Fruit Veg ({getVegetablesCount('fruitveg')})
              </button>
              <button 
                className={`filter-btn ${vegetablesCategory === 'flower' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('flower')}
              >
                Flower ({getVegetablesCount('flower')})
              </button>
              <button 
                className={`filter-btn ${vegetablesCategory === 'mushroom' ? 'active' : ''}`} 
                onClick={() => setVegetablesCategory('mushroom')}
              >
                Mushrooms ({getVegetablesCount('mushroom')})
              </button>
            </div>
          )}

          <div className="pbp-items-grid-section">
            {getCurrentData().length === 0 ? (
              <div className="no-items-message">
                No items found in this category.
              </div>
            ) : (
              <div className="pbp-items-grid">
                {getCurrentData().map(item => (
                  <div 
                    key={item.id} 
                    className="pbp-item-card" 
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
                  {(selectedItem.fullDesc || selectedItem.description) && (
                    <div className="pbp-detail-section">
                      <h3>Description</h3>
                      <p>{selectedItem.fullDesc || selectedItem.description}</p>
                    </div>
                  )}
                  
                  {selectedItem.storageTips && (
                    <div className="pbp-detail-section">
                      <h3>Storage Tips</h3>
                      <p>{selectedItem.storageTips}</p>
                    </div>
                  )}
                  
                  {selectedItem.shelfLife && (
                    <div className="pbp-detail-section">
                      <h3>Shelf Life</h3>
                      <p>{selectedItem.shelfLife}</p>
                    </div>
                  )}
                  
                  {selectedItem.keyUses && selectedItem.keyUses.length > 0 && (
                    <div className="pbp-detail-section">
                      <h3>Common Uses</h3>
                      <div className="pbp-uses-list">
                        {selectedItem.keyUses.map((use, idx) => (
                          <div key={idx} className="pbp-use-item">{use}</div>
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
        <button className="back-home-btn" onClick={() => navigate('/guidance')}>
          Back to Guidance Page
        </button>
      </div>

    </div>
  );
};

export default PantryBasicsPage;