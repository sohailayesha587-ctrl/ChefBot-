import React, { useState, useEffect } from 'react';
import './BakeryEssentialsPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BakeryEssentialsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('tools');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State for all categories data
  const [toolsData, setToolsData] = useState([]);
  const [techniquesData, setTechniquesData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [decoratingData, setDecoratingData] = useState([]);

  // Category mapping for API
  const categoryMapping = {
    tools: 'tools',
    techniques: 'techniques',
    ingredients: 'ingredients',
    temperature: 'temperature',
    decorating: 'decorating'
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = ['tools', 'techniques', 'ingredients', 'temperature', 'decorating'];
      const results = await Promise.all(
        categories.map(async (cat) => {
          try {
            const response = await axios.get(`http://localhost:5000/api/beginners-guide?category=${cat}`);
            return { category: cat, data: response.data.guides || [] };
          } catch (err) {
            console.error(`Error fetching ${cat}:`, err);
            return { category: cat, data: [] };
          }
        })
      );

      // Set data for each category
      results.forEach(result => {
        switch (result.category) {
          case 'tools':
            setToolsData(result.data);
            break;
          case 'techniques':
            setTechniquesData(result.data);
            break;
          case 'ingredients':
            setIngredientsData(result.data);
            break;
          case 'temperature':
            setTemperatureData(result.data);
            break;
          case 'decorating':
            setDecoratingData(result.data);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Get current data based on selected category
  const getCurrentData = () => {
    switch (selectedCategory) {
      case 'tools': return toolsData;
      case 'techniques': return techniquesData;
      case 'ingredients': return ingredientsData;
      case 'temperature': return temperatureData;
      case 'decorating': return decoratingData;
      default: return toolsData;
    }
  };

  // Parse JSON string content from database
  const parseContent = (content) => {
  if (!content) return { fullDesc: '', tagline: '' };
  
  if (typeof content === 'object' && content !== null) {
    return content;
  }
  
  if (typeof content === 'string') {
    if (content.trim().startsWith('{')) {
      try {
        return JSON.parse(content);
      } catch (e) {
        return { fullDesc: content, tagline: content };
      }
    }
    return { fullDesc: content, tagline: content };
  }
  
  return { fullDesc: String(content), tagline: String(content) };
};

  // Render item card from database data
  const renderItemCard = (item) => {
    const content = parseContent(item.content);
    
    return (
      <div 
        key={item._id} 
        className="bep-item-card"
        onClick={() => handleItemSelect(item)}
      >
        <div 
          className="bep-card-image"
          style={{ backgroundImage: `url(${item.image || '/placeholder.png'})` }}
        ></div>
        
        <div className="bep-card-content">
          <div className="bep-card-header">
            <h3 className="bep-card-title">{item.title}</h3>
          </div>
          <p className="bep-card-description">{content.tagline || item.title}</p>
        </div>
      </div>
    );
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedItem(null);
  };

  // Render detail panel content
  const renderDetailContent = (item) => {
    const content = parseContent(item.content);
    const category = item.category;

    return (
      <div className="bep-modal-details">
        {/* DESCRIPTION SECTION */}
        <div className="bep-detail-section">
          <h3>📋 Description</h3>
          <div className="bep-detail-content">
            <p>{content.fullDesc || content}</p>
          </div>
        </div>

        {/* TOOLS CATEGORY DETAILS */}
        {category === 'tools' && content.keyFeatures && (
          <>
            {content.keyFeatures && content.keyFeatures.length > 0 && (
              <div className="bep-detail-section">
                <h3>✅ Key Features</h3>
                <div className="bep-features-grid">
                  {content.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="bep-feature-item">{feature}</div>
                  ))}
                </div>
              </div>
            )}

            {content.properUsage && (
              <div className="bep-detail-section">
                <h3>📝 Proper Usage</h3>
                <div className="bep-detail-content"><p>{content.properUsage}</p></div>
              </div>
            )}

            {content.commonMistakes && content.commonMistakes.length > 0 && (
              <div className="bep-detail-section">
                <h3>❌ Common Mistakes</h3>
                <div className="bep-mistakes-grid">
                  {content.commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="bep-mistake-item">{mistake}</div>
                  ))}
                </div>
              </div>
            )}

            {content.types && content.types.length > 0 && (
              <div className="bep-detail-section">
                <h3>🔧 Types & Varieties</h3>
                <div className="bep-types-grid">
                  {content.types.map((type, idx) => (
                    <div key={idx} className="bep-type-card">
                      <div className="bep-type-content">
                        <h4>{type.name}</h4>
                        <p className="bep-type-desc">{type.description}</p>
                        <div className="bep-type-details">
                          {type.capacity && <p><strong>Capacity:</strong> {type.capacity}</p>}
                          {type.power && <p><strong>Power:</strong> {type.power}</p>}
                          {type.size && <p><strong>Size:</strong> {type.size}</p>}
                        </div>
                        <div className="bep-type-bestfor"><strong>Best For:</strong> {type.bestFor}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* TECHNIQUES CATEGORY DETAILS */}
        {category === 'techniques' && (
          <>
            {content.steps && content.steps.length > 0 && (
              <div className="bep-detail-section">
                <h3>📝 Step-by-Step Process</h3>
                <div className="bep-steps-list">
                  {content.steps.map((step, idx) => (
                    <div key={idx} className="bep-step">
                      <span className="bep-step-number">{idx + 1}.</span>
                      <span className="bep-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.tips && (
              <div className="bep-detail-section">
                <h3>💡 Pro Tips</h3>
                <div className="bep-detail-content"><p>{content.tips}</p></div>
              </div>
            )}

            {content.commonMistakes && content.commonMistakes.length > 0 && (
              <div className="bep-detail-section">
                <h3>❌ Common Mistakes to Avoid</h3>
                <div className="bep-mistakes-list">
                  {content.commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="bep-mistake-list-item">{mistake}</div>
                  ))}
                </div>
              </div>
            )}

            {content.applications && (
              <div className="bep-detail-section">
                <h3>🎯 Applications</h3>
                <div className="bep-detail-content"><p>{content.applications}</p></div>
              </div>
            )}
          </>
        )}

        {/* INGREDIENTS CATEGORY DETAILS */}
        {category === 'ingredients' && (
          <>
            {content.types && content.types.length > 0 && (
              <div className="bep-detail-section">
                <h3>📊 Types & Varieties</h3>
                <div className="bep-ingredient-types-grid">
                  {content.types.map((type, idx) => (
                    <div key={idx} className="bep-ingredient-type-card">
                      <h4>{type.name}</h4>
                      {type.protein && <p><strong>Protein:</strong> {type.protein}</p>}
                      {type.uses && <p><strong>Uses:</strong> {type.uses}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.storage && (
              <div className="bep-detail-section">
                <h3>📦 Storage Guidelines</h3>
                <div className="bep-detail-content"><p>{content.storage}</p></div>
              </div>
            )}
          </>
        )}

        {/* TEMPERATURE CATEGORY DETAILS */}
        {category === 'temperature' && (
          <>
            {content.temperatures && content.temperatures.length > 0 && (
              <div className="bep-detail-section">
                <h3>🌡️ Temperature Ranges</h3>
                <div className="bep-temperatures-grid">
                  {content.temperatures.map((temp, idx) => (
                    <div key={idx} className="bep-temperature-item">{temp}</div>
                  ))}
                </div>
              </div>
            )}

            {content.tips && (
              <div className="bep-detail-section">
                <h3>💡 Pro Tips</h3>
                <div className="bep-detail-content"><p>{content.tips}</p></div>
              </div>
            )}
          </>
        )}

        {/* DECORATING CATEGORY DETAILS */}
        {category === 'decorating' && (
          <>
            {content.types && content.types.length > 0 && (
              <div className="bep-detail-section">
                <h3>🎨 Types & Materials</h3>
                <div className="bep-decorating-types-grid">
                  {content.types.map((type, idx) => (
                    <div key={idx} className="bep-decorating-type-card">
                      <h4>{type.name}</h4>
                      {type.material && <p><strong>Material:</strong> {type.material}</p>}
                      {type.bestFor && <p><strong>Best For:</strong> {type.bestFor}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.cleaning && (
              <div className="bep-detail-section">
                <h3>🧼 Cleaning & Maintenance</h3>
                <div className="bep-detail-content"><p>{content.cleaning}</p></div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bep-container">
        <div className="loading-spinner">Loading bakery essentials...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bep-container">
        <div className="error-message">{error}</div>
        <button onClick={fetchAllData} className="retry-btn">Retry</button>
      </div>
    );
  }

  return (
    <div className="bep-container">
      <div className="bep-layout">
        {/* SIDEBAR */}
        <aside className="bep-sidebar">
          <div className="bep-sidebar-header">
            <h2 className="bep-sidebar-title">Bakery Essentials</h2>
            <p className="bep-sidebar-subtitle">Master Professional Baking</p>
          </div>

          <div className="bep-sidebar-categories">
            <ul className="bep-categories-list">
              <li 
                className={`bep-category-item ${selectedCategory === 'tools' ? 'bep-active' : ''}`}
                onClick={() => setSelectedCategory('tools')}
              >
                <span className="bep-category-name">Tools & Equipment</span>
              </li>
              <li 
                className={`bep-category-item ${selectedCategory === 'techniques' ? 'bep-active' : ''}`}
                onClick={() => setSelectedCategory('techniques')}
              >
                <span className="bep-category-name">Baking Techniques</span>
              </li>
              <li 
                className={`bep-category-item ${selectedCategory === 'ingredients' ? 'bep-active' : ''}`}
                onClick={() => setSelectedCategory('ingredients')}
              >
                <span className="bep-category-name">Ingredients Guide</span>
              </li>
              <li 
                className={`bep-category-item ${selectedCategory === 'temperature' ? 'bep-active' : ''}`}
                onClick={() => setSelectedCategory('temperature')}
              >
                <span className="bep-category-name">Temperature Control</span>
              </li>
              <li 
                className={`bep-category-item ${selectedCategory === 'decorating' ? 'bep-active' : ''}`}
                onClick={() => setSelectedCategory('decorating')}
              >
                <span className="bep-category-name">Decorating Tools</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="bep-main">
          <header className="bep-main-header">
            <div className="bep-header-content">
              <h1 className="bep-page-title">
                {selectedCategory === 'tools' && 'Bakery Tools & Equipment'}
                {selectedCategory === 'techniques' && 'Baking Techniques'}
                {selectedCategory === 'ingredients' && 'Ingredients Guide'}
                {selectedCategory === 'temperature' && 'Temperature Control'}
                {selectedCategory === 'decorating' && 'Decorating Tools'}
              </h1>
              <p className="bep-page-description">
                {selectedCategory === 'tools' && 'Essential tools and equipment for professional baking and pastry work.'}
                {selectedCategory === 'techniques' && 'Master fundamental and advanced baking techniques for perfect results.'}
                {selectedCategory === 'ingredients' && 'Comprehensive guide to baking ingredients and their functions.'}
                {selectedCategory === 'temperature' && 'Precise temperature control for perfect baking every time.'}
                {selectedCategory === 'decorating' && 'Tools and techniques for beautiful cake and pastry decoration.'}
              </p>
            </div>
          </header>

          {/* ITEMS GRID */}
          <div className="bep-items-grid-section">
            <div className="bep-items-grid">
              {getCurrentData().map(item => renderItemCard(item))}
            </div>
          </div>
        </main>
      </div>

      {/* DETAIL MODAL */}
      {showDetailPanel && selectedItem && (
        <div className="bep-modal-overlay" onClick={closeDetailPanel}>
          <div className="bep-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bep-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="bep-modal-header">
              <div className="bep-modal-title">
                <h2>{selectedItem.title}</h2>
                <p className="bep-modal-subtitle">
                  {parseContent(selectedItem.content).tagline || selectedItem.title}
                </p>
              </div>
            </div>

            <div className="bep-modal-content">
              {/* LEFT SIDE - SCROLLABLE CONTENT */}
              <div className="bep-modal-left">
                {renderDetailContent(selectedItem)}
              </div>

              {/* RIGHT SIDE - FIXED IMAGE */}
              <div className="bep-modal-right">
                <div className="bep-main-image-container">
                  <div 
                    className="bep-main-image"
                    style={{ 
                      backgroundImage: `url(${selectedItem.image || '/placeholder.png'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="back-home-container">
        <button 
          className="back-home-btn"
          onClick={() => {
            try {
              navigate('/guidance');
            } catch (error) {
              window.location.href = '/guidance';
            }
          }}
        >
          ← Back to Guidance Page
        </button>
      </div>
    </div>
  );
};

export default BakeryEssentialsPage;