import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MeasuringSkillsPage.css';

const MeasuringSkillsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('tools');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [toolsData, setToolsData] = useState([]);
  const [techniquesData, setTechniquesData] = useState([]);
  const [estimationData, setEstimationData] = useState([]);
  const [conversionData, setConversionData] = useState([]);
  const [precisionData, setPrecisionData] = useState([]);

  const API_URL = 'http://localhost:5000/api/guides';

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = ['measuring-tools', 'measuring-techniques', 'estimation', 'conversions', 'precision'];
      
      const results = await Promise.all(
        categories.map(async (cat) => {
          try {
            const response = await axios.get(`${API_URL}?category=${cat}`);
            return { category: cat, data: response.data.guides || [] };
          } catch (err) {
            console.error(`Error fetching ${cat}:`, err);
            return { category: cat, data: [] };
          }
        })
      );

      let hasData = false;
      
      results.forEach(result => {
        const parsedData = result.data.map(guide => {
          let content = {};
          try {
            if (typeof guide.content === 'string' && guide.content.trim().startsWith('{')) {
              content = JSON.parse(guide.content);
            } else {
              content = { fullDesc: guide.content, tagline: guide.title };
            }
          } catch (e) {
            content = { fullDesc: guide.content, tagline: guide.title };
          }
          return { ...content, id: guide._id, image: guide.image, name: guide.title };
        });

        switch (result.category) {
          case 'measuring-tools':
            if (parsedData.length) { setToolsData(parsedData); hasData = true; }
            break;
          case 'measuring-techniques':
            if (parsedData.length) { setTechniquesData(parsedData); hasData = true; }
            break;
          case 'estimation':
            if (parsedData.length) { setEstimationData(parsedData); hasData = true; }
            break;
          case 'conversions':
            if (parsedData.length) { setConversionData(parsedData); hasData = true; }
            break;
          case 'precision':
            if (parsedData.length) { setPrecisionData(parsedData); hasData = true; }
            break;
          default: break;
        }
      });

      if (!hasData) {
        setError('No data found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    switch (selectedCategory) {
      case 'tools': return toolsData;
      case 'techniques': return techniquesData;
      case 'estimation': return estimationData;
      case 'conversions': return conversionData;
      case 'precision': return precisionData;
      default: return toolsData;
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

  const renderDetailContent = (item) => {
    return (
      <div className="msp-modal-details">
        {item.fullDesc && (
          <div className="msp-detail-section">
            <h3>Description</h3>
            <p>{item.fullDesc}</p>
          </div>
        )}

        {item.keyFeatures && item.keyFeatures.length > 0 && (
          <div className="msp-detail-section">
            <h3>Key Features</h3>
            <div className="msp-features-horizontal">
              {item.keyFeatures.map((feature, idx) => (
                <div key={idx} className="msp-feature-box">{feature}</div>
              ))}
            </div>
          </div>
        )}

        {item.steps && item.steps.length > 0 && (
          <div className="msp-detail-section">
            <h3>Steps</h3>
            {item.steps.map((step, idx) => (
              <div key={idx} className="msp-step-item">{idx+1}. {step}</div>
            ))}
          </div>
        )}

        {item.tips && (
          <div className="msp-detail-section">
            <h3>Tips</h3>
            <p>{item.tips}</p>
          </div>
        )}

        {item.commonMistakes && item.commonMistakes.length > 0 && (
          <div className="msp-detail-section">
            <h3>Common Mistakes</h3>
            <div className="msp-mistakes-horizontal">
              {item.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="msp-mistake-box">{mistake}</div>
              ))}
            </div>
          </div>
        )}

        {item.types && item.types.length > 0 && (
          <div className="msp-types-section">
            <h3>Types</h3>
            <div className="msp-types-grid">
              {item.types.map((type, idx) => (
                <div key={idx} className="msp-type-card">
                  <h4>{type.name}</h4>
                  <p>{type.description}</p>
                  {type.capacity && <p><strong>Capacity:</strong> {type.capacity}</p>}
                  {type.sizes && <p><strong>Sizes:</strong> {type.sizes}</p>}
                  <p><strong>Best For:</strong> {type.bestFor}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {item.commonConversions && item.commonConversions.length > 0 && (
          <div className="msp-detail-section">
            <h3>Common Conversions</h3>
            <div className="msp-conversions-grid">
              {item.commonConversions.map((conv, idx) => (
                <div key={idx} className="msp-conversion-box">{conv}</div>
              ))}
            </div>
          </div>
        )}

        {item.criticalRules && item.criticalRules.length > 0 && (
          <div className="msp-detail-section">
            <h3>Critical Rules</h3>
            <div className="msp-critical-rules-grid">
              {item.criticalRules.map((rule, idx) => (
                <div key={idx} className="msp-critical-rule-box">{rule}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="msp-container">
        <div className="loading-spinner">Loading measuring skills...</div>
      </div>
    );
  }

  return (
    <div className="msp-container">
      <div className="msp-layout">
        <aside className="msp-sidebar">
          <div className="msp-sidebar-header">
            <h2 className="msp-sidebar-title">Measuring Skills</h2>
          </div>
          <div className="msp-sidebar-categories">
            <ul className="msp-categories-list">
              <li 
                className={`msp-category-item ${selectedCategory === 'tools' ? 'msp-active' : ''}`} 
                onClick={() => setSelectedCategory('tools')}
              >
                <span className="msp-category-name">Tools & Equipment</span>
              </li>
              <li 
                className={`msp-category-item ${selectedCategory === 'techniques' ? 'msp-active' : ''}`} 
                onClick={() => setSelectedCategory('techniques')}
              >
                <span className="msp-category-name">Measuring Techniques</span>
              </li>
              <li 
                className={`msp-category-item ${selectedCategory === 'estimation' ? 'msp-active' : ''}`} 
                onClick={() => setSelectedCategory('estimation')}
              >
                <span className="msp-category-name">Estimation Skills</span>
              </li>
              <li 
                className={`msp-category-item ${selectedCategory === 'conversions' ? 'msp-active' : ''}`} 
                onClick={() => setSelectedCategory('conversions')}
              >
                <span className="msp-category-name">Conversion Skills</span>
              </li>
              <li 
                className={`msp-category-item ${selectedCategory === 'precision' ? 'msp-active' : ''}`} 
                onClick={() => setSelectedCategory('precision')}
              >
                <span className="msp-category-name">Precision Skills</span>
              </li>
            </ul>
          </div>
        </aside>

        <main className="msp-main">
          {error && <div className="error-message">{error}</div>}
          
          <header className="msp-main-header">
            <h1 className="msp-page-title">
              {selectedCategory === 'tools' && 'Measuring Tools'}
              {selectedCategory === 'techniques' && 'Measuring Techniques'}
              {selectedCategory === 'estimation' && 'Estimation Skills'}
              {selectedCategory === 'conversions' && 'Conversion Skills'}
              {selectedCategory === 'precision' && 'Precision Skills'}
            </h1>
            <p className="msp-page-description">
              {selectedCategory === 'tools' && 'Essential tools for accurate kitchen measurements.'}
              {selectedCategory === 'techniques' && 'Proper methods for measuring ingredients.'}
              {selectedCategory === 'estimation' && 'Skills for estimating quantities.'}
              {selectedCategory === 'conversions' && 'Converting between measurement systems.'}
              {selectedCategory === 'precision' && 'Advanced skills for exact measurements.'}
            </p>
          </header>

          <div className="msp-items-grid-section">
            <div className="msp-items-grid">
              {getCurrentData().map(item => (
                <div key={item.id} className="msp-item-card" onClick={() => handleItemSelect(item)}>
                  <div className="msp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="msp-card-content">
                    <h3 className="msp-card-title">{item.name}</h3>
                    <p className="msp-card-description">{item.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {showDetailPanel && selectedItem && (
        <div className="msp-modal-overlay" onClick={closeDetailPanel}>
          <div className="msp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="msp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="msp-modal-header">
              <h2>{selectedItem.name}</h2>
              <p className="msp-modal-subtitle">{selectedItem.tagline}</p>
            </div>

            <div className="msp-modal-content">
              <div className="msp-modal-left">
                {renderDetailContent(selectedItem)}
              </div>
              <div className="msp-modal-right">
                <div className="msp-main-image" style={{ backgroundImage: `url(${selectedItem.image})` }}></div>
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

export default MeasuringSkillsPage;