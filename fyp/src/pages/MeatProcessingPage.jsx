import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MeatProcessingPage.css';

const MeatProcessingPage = () => {
  const navigate = useNavigate();
  const [selectedMeat, setSelectedMeat] = useState('beef');
  const [selectedTab, setSelectedTab] = useState('deboning');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [beefData, setBeefData] = useState([]);
  const [lambData, setLambData] = useState([]);
  const [poultryData, setPoultryData] = useState([]);
  const [fishData, setFishData] = useState([]);
  const [gameData, setGameData] = useState([]);

  const API_URL = 'http://localhost:5000/api/guides';

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

  const fetchAllMeatData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
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
        if (typeof guide.content === 'string') {
          try {
            content = JSON.parse(guide.content);
          } catch(e) {
            content = {};
          }
        } else {
          content = guide.content || {};
        }
        
        const meatType = content.meatType || '';
        const type = content.type || '';
        
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
          meatType: meatType
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
      
    } catch (err) {
      console.error(err);
      setError('Failed to load data');
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

  const currentData = getCurrentMeatData();
  const currentCounts = getCounts(selectedMeat);
  const filteredData = currentData.filter(item => item.type === selectedTab);

  if (loading) {
    return (
      <div className="mep-container">
        <div className="loading-spinner">Loading meat processing data...</div>
      </div>
    );
  }

  return (
    <div className="mep-container">
      <div className="mep-layout">
        <aside className="mep-sidebar">
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
                      onClick={() => setSelectedMeat(meat.key)}>
                    <span className="mep-category-name">{meat.name} ({counts.total})</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="mep-main">
          {error && <div className="error-message">{error}</div>}
          
          <header className="mep-main-header">
            <h1 className="mep-page-title">{selectedMeat.charAt(0).toUpperCase() + selectedMeat.slice(1)}</h1>
            <p className="mep-page-description">Professional {selectedMeat} processing - deboning, cleaning, and cuts</p>
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
              <div className="empty-state">
                No {selectedTab} items found for {selectedMeat}.
              </div>
            ) : (
              <div className="mep-items-grid">
                {filteredData.map(item => (
                  <div key={item.id} className="mep-item-card" onClick={() => {
                    setSelectedItem(item);
                    setShowModal(true);
                  }}>
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

      {showModal && selectedItem && (
        <div className="mep-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="mep-modal" onClick={e => e.stopPropagation()}>
            <button className="mep-modal-close" onClick={() => setShowModal(false)}>×</button>
            <div className="mep-modal-content">
              <div className="mep-modal-left">
                <h2>{selectedItem.name}</h2>
                <p className="mep-modal-tagline">{selectedItem.tagline}</p>
                <div className="mep-detail-section">
                  <h3>Description</h3>
                  <p>{selectedItem.fullDesc}</p>
                </div>
                {selectedItem.tools?.length > 0 && (
                  <div className="mep-detail-section">
                    <h3>Tools Needed</h3>
                    {selectedItem.tools.map((t, i) => <div key={i} className="mep-tool-item">{t}</div>)}
                  </div>
                )}
                {selectedItem.steps?.length > 0 && (
                  <div className="mep-detail-section">
                    <h3>Steps</h3>
                    {selectedItem.steps.map((s, i) => <div key={i} className="mep-step-item"><strong>{i+1}.</strong> {s}</div>)}
                  </div>
                )}
              </div>
              <div className="mep-modal-right">
                <div className="mep-main-image" style={{ backgroundImage: `url(${selectedItem.image})` }}></div>
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

export default MeatProcessingPage;