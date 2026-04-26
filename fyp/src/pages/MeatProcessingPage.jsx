import React, { useState, useEffect } from 'react';
import './MeatProcessingPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MeatProcessingPage = () => {
  const navigate = useNavigate();
  const [selectedMeat, setSelectedMeat] = useState('beef');
  const [selectedTab, setSelectedTab] = useState('deboning');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data states
  const [beefData, setBeefData] = useState([]);
  const [lambData, setLambData] = useState([]);
  const [poultryData, setPoultryData] = useState([]);
  const [fishData, setFishData] = useState([]);
  const [gameData, setGameData] = useState([]);

  const API_BASE_URL = 'http://localhost:5000';

  // Meat types for sidebar
  const meatTypes = [
    { id: 1, name: 'Beef', icon: '🐄', key: 'beef' },
    { id: 2, name: 'Lamb', icon: '🐑', key: 'lamb' },
    { id: 3, name: 'Poultry', icon: '🍗', key: 'poultry' },
    { id: 4, name: 'Fish', icon: '🐟', key: 'fish' },
    { id: 5, name: 'Game', icon: '🦌', key: 'game' }
  ];

  // Parse guide content
  const parseGuideToItem = (guide) => {
    let content = {};
    try {
      if (typeof guide.content === 'string') {
        if (guide.content.trim().startsWith('{')) {
          content = JSON.parse(guide.content);
        } else {
          content = { fullDesc: guide.content, tagline: guide.title };
        }
      } else if (typeof guide.content === 'object') {
        content = guide.content;
      } else {
        content = { fullDesc: guide.content, tagline: guide.title };
      }
    } catch (e) {
      content = { fullDesc: guide.content, tagline: guide.title };
    }

    return {
      id: guide._id,
      name: guide.title,
      tagline: content.tagline || guide.title,
      fullDesc: content.fullDesc || guide.content,
      image: guide.image,
      tools: content.tools || [],
      steps: content.steps || [],
      tips: content.tips || '',
      bestFor: content.bestFor || '',
      type: content.type || '',
      meatType: content.meatType || ''
    };
  };

  // Fetch data from API
  useEffect(() => {
    fetchAllMeatData();
  }, []);

  const fetchAllMeatData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/beginners-guide?category=meat-processing`);
      const guides = response.data.guides || [];
      
      console.log('Fetched meat data:', guides.length, 'items');
      
      // Separate by meat type
      const beef = [];
      const lamb = [];
      const poultry = [];
      const fish = [];
      const game = [];
      
      guides.forEach(guide => {
        const item = parseGuideToItem(guide);
        
        if (item.meatType === 'beef') beef.push(item);
        else if (item.meatType === 'lamb') lamb.push(item);
        else if (item.meatType === 'poultry') poultry.push(item);
        else if (item.meatType === 'fish') fish.push(item);
        else if (item.meatType === 'game') game.push(item);
      });
      
      setBeefData(beef);
      setLambData(lamb);
      setPoultryData(poultry);
      setFishData(fish);
      setGameData(game);
      
      console.log('Beef:', beef.length, 'Lamb:', lamb.length, 'Poultry:', poultry.length, 'Fish:', fish.length, 'Game:', game.length);
      
    } catch (error) {
      console.error('Error fetching meat data:', error);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Get current meat data
  const getCurrentMeatData = () => {
    switch (selectedMeat) {
      case 'beef': return beefData;
      case 'lamb': return lambData;
      case 'poultry': return poultryData;
      case 'fish': return fishData;
      case 'game': return gameData;
      default: return beefData;
    }
  };

  // Filter by tab (deboning/cleaning/cuts)
  const getFilteredData = () => {
    const allData = getCurrentMeatData();
    return allData.filter(item => item.type === selectedTab);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="mep-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', border: '4px solid #e2e8f0', borderTop: '4px solid #284a4b', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
          <p style={{ color: '#64748b' }}>Loading meat processing data...</p>
        </div>
      </div>
    );
  }

  const filteredData = getFilteredData();
  const currentMeatData = getCurrentMeatData();

  return (
    <div className="mep-container">
      <div className="mep-layout">
        {/* SIDEBAR */}
        <aside className="mep-sidebar">
          <div className="mep-sidebar-header">
            <h2 className="mep-sidebar-title">🥩 Meat Processing</h2>
            <p className="mep-sidebar-subtitle">Professional Butchery Skills</p>
          </div>
          <div className="mep-sidebar-categories">
            <ul className="mep-categories-list">
              {meatTypes.map(meat => (
                <li 
                  key={meat.id} 
                  className={`mep-category-item ${selectedMeat === meat.key ? 'mep-active' : ''}`} 
                  onClick={() => setSelectedMeat(meat.key)}
                >
                  <span className="mep-category-name">{meat.icon} {meat.name} ({currentMeatData.length})</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="mep-main">
          {error && (
            <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
              ⚠️ {error}
            </div>
          )}
          
          <header className="mep-main-header">
            <div className="mep-header-content">
              <h1 className="mep-page-title">
                {selectedMeat === 'beef' && 'Beef'}
                {selectedMeat === 'lamb' && 'Lamb'}
                {selectedMeat === 'poultry' && 'Poultry'}
                {selectedMeat === 'fish' && 'Fish'}
                {selectedMeat === 'game' && 'Game'}
              </h1>
              <p className="mep-page-description">
                Professional {selectedMeat} processing - deboning, cleaning, and cuts
              </p>
            </div>
          </header>

          {/* TABS */}
          <div className="mep-tabs">
            <button 
              className={`mep-tab ${selectedTab === 'deboning' ? 'mep-tab-active' : ''}`} 
              onClick={() => setSelectedTab('deboning')}
            >
              🔪 Deboning ({currentMeatData.filter(i => i.type === 'deboning').length})
            </button>
            <button 
              className={`mep-tab ${selectedTab === 'cleaning' ? 'mep-tab-active' : ''}`} 
              onClick={() => setSelectedTab('cleaning')}
            >
              🧼 Cleaning ({currentMeatData.filter(i => i.type === 'cleaning').length})
            </button>
            <button 
              className={`mep-tab ${selectedTab === 'cuts' ? 'mep-tab-active' : ''}`} 
              onClick={() => setSelectedTab('cuts')}
            >
              🥩 Cuts ({currentMeatData.filter(i => i.type === 'cuts').length})
            </button>
          </div>

          {/* ITEMS GRID */}
          <div className="mep-items-grid-section">
            {filteredData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px', color: '#64748b' }}>
                No items found in this category.
              </div>
            ) : (
              <div className="mep-items-grid">
                {filteredData.map(item => (
                  <div key={item.id} className="mep-item-card" onClick={() => handleItemClick(item)}>
                    <div className="mep-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                    <div className="mep-card-content">
                      <h3 className="mep-card-title">{item.name}</h3>
                      <p className="mep-card-description">{item.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODAL */}
      {showModal && selectedItem && (
        <div className="mep-modal-overlay" onClick={closeModal}>
          <div className="mep-modal" onClick={(e) => e.stopPropagation()}>
            <button className="mep-modal-close" onClick={closeModal}>×</button>
            <div className="mep-modal-header">
              <div className="mep-modal-title">
                <h2>{selectedItem.name}</h2>
                <p className="mep-modal-subtitle">{selectedItem.tagline}</p>
              </div>
            </div>
            <div className="mep-modal-content">
              <div className="mep-modal-left">
                {/* Description */}
                <div className="mep-detail-section">
                  <h3>📋 Description</h3>
                  <p>{selectedItem.fullDesc}</p>
                </div>
                
                {/* Tools */}
                {selectedItem.tools && selectedItem.tools.length > 0 && (
                  <div className="mep-detail-section">
                    <h3>🛠️ Tools Needed</h3>
                    <div className="mep-tools-list">
                      {selectedItem.tools.map((tool, i) => (
                        <div key={i} className="mep-tool-item">🔧 {tool}</div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Steps */}
                {selectedItem.steps && selectedItem.steps.length > 0 && (
                  <div className="mep-detail-section">
                    <h3>📝 Steps</h3>
                    <div className="mep-steps-list">
                      {selectedItem.steps.map((step, i) => (
                        <div key={i} className="mep-step-item">
                          <span className="mep-step-number">{i+1}.</span> {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tips */}
                {selectedItem.tips && (
                  <div className="mep-detail-section">
                    <h3>💡 Pro Tips</h3>
                    <p>{selectedItem.tips}</p>
                  </div>
                )}
                
                {/* Best For */}
                {selectedItem.bestFor && (
                  <div className="mep-detail-section">
                    <h3>✅ Best For</h3>
                    <p>{selectedItem.bestFor}</p>
                  </div>
                )}
              </div>
              <div className="mep-modal-right">
                <div className="mep-main-image-container">
                  <div className="mep-main-image" style={{ backgroundImage: `url(${selectedItem.image})` }}></div>
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

export default MeatProcessingPage;