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

  const [toolsData, setToolsData] = useState([]);
  const [techniquesData, setTechniquesData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [decoratingData, setDecoratingData] = useState([]);

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

      results.forEach(result => {
        switch (result.category) {
          case 'tools': setToolsData(result.data); break;
          case 'techniques': setTechniquesData(result.data); break;
          case 'ingredients': setIngredientsData(result.data); break;
          case 'temperature': setTemperatureData(result.data); break;
          case 'decorating': setDecoratingData(result.data); break;
          default: break;
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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

  const parseContent = (content) => {
    if (!content) return {};
    if (typeof content === 'object' && content !== null) return content;
    if (typeof content === 'string') {
      if (content.trim().startsWith('{')) {
        try { return JSON.parse(content); } 
        catch (e) { return { fullDesc: content, tagline: content }; }
      }
      return { fullDesc: content, tagline: content };
    }
    return { fullDesc: String(content), tagline: String(content) };
  };

  const renderItemCard = (item) => {
    const content = parseContent(item.content);
    return (
      <div key={item._id} className="bep-item-card" onClick={() => handleItemSelect(item)}>
        <div className="bep-card-image" style={{ backgroundImage: `url(${item.image || '/placeholder.png'})` }}></div>
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

  const renderDetailContent = (item) => {
    const content = parseContent(item.content);
    const category = item.category;

    return (
      <div className="bep-modal-details">
        {/* DESCRIPTION */}
        <div className="bep-detail-section">
          <h3>📋 Description</h3>
          <div className="bep-detail-content"><p>{content.fullDesc || content}</p></div>
        </div>

        {/* ========== TOOLS CATEGORY ========== */}
        {category === 'tools' && (
          <>
            {content.keyFeatures && content.keyFeatures.length > 0 && (
              <div className="bep-detail-section">
                <h3>✅ Key Features</h3>
                <div className="bep-features-grid">
                  {content.keyFeatures.map((feature, idx) => (<div key={idx} className="bep-feature-item">{feature}</div>))}
                </div>
              </div>
            )}
            {content.properUsage && content.properUsage.length > 0 && (
              <div className="bep-detail-section">
                <h3>📝 Proper Usage</h3>
                <div className="bep-detail-content">
                  {content.properUsage.map((usage, idx) => (<p key={idx}>• {usage}</p>))}
                </div>
              </div>
            )}
            {content.commonMistakes && content.commonMistakes.length > 0 && (
              <div className="bep-detail-section">
                <h3>❌ Common Mistakes</h3>
                <div className="bep-mistakes-grid">
                  {content.commonMistakes.map((mistake, idx) => (<div key={idx} className="bep-mistake-item">{mistake}</div>))}
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
                        <p className="bep-type-desc">{type.description || type.bestFor}</p>
                        {type.capacity && <p><strong>Capacity:</strong> {type.capacity}</p>}
                        {type.bestFor && <div className="bep-type-bestfor"><strong>Best For:</strong> {type.bestFor}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ========== TECHNIQUES CATEGORY ========== */}
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
                <h3>❌ Common Mistakes</h3>
                <div className="bep-mistakes-list">
                  {content.commonMistakes.map((mistake, idx) => (<div key={idx} className="bep-mistake-list-item">{mistake}</div>))}
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

        {/* ========== INGREDIENTS CATEGORY ========== */}
        {category === 'ingredients' && (
          <>
            {content.keyFeatures && content.keyFeatures.length > 0 && (
              <div className="bep-detail-section">
                <h3>✅ Key Features</h3>
                <div className="bep-features-grid">
                  {content.keyFeatures.map((feature, idx) => (<div key={idx} className="bep-feature-item">{feature}</div>))}
                </div>
              </div>
            )}
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
            {content.properUsage && content.properUsage.length > 0 && (
              <div className="bep-detail-section">
                <h3>📝 Proper Usage</h3>
                <div className="bep-detail-content">
                  {content.properUsage.map((usage, idx) => (<p key={idx}>• {usage}</p>))}
                </div>
              </div>
            )}
            {content.commonMistakes && content.commonMistakes.length > 0 && (
              <div className="bep-detail-section">
                <h3>❌ Common Mistakes</h3>
                <div className="bep-mistakes-grid">
                  {content.commonMistakes.map((mistake, idx) => (<div key={idx} className="bep-mistake-item">{mistake}</div>))}
                </div>
              </div>
            )}
            {content.storage && (
              <div className="bep-detail-section">
                <h3>📦 Storage Guidelines</h3>
                <div className="bep-detail-content"><p>{content.storage}</p></div>
              </div>
            )}
            {content.functions && content.functions.length > 0 && (
              <div className="bep-detail-section">
                <h3>🥚 Functions</h3>
                <div className="bep-functions-list">
                  {content.functions.map((func, idx) => (<div key={idx} className="bep-function-item">• {func}</div>))}
                </div>
              </div>
            )}
            {content.sizes && content.sizes.length > 0 && (
              <div className="bep-detail-section">
                <h3>📏 Sizes</h3>
                <div className="bep-sizes-list">
                  {content.sizes.map((size, idx) => (<span key={idx} className="bep-size-badge">{size}</span>))}
                </div>
              </div>
            )}
            {content.substitution && (
              <div className="bep-detail-section">
                <h3>🔄 Substitution</h3>
                <div className="bep-detail-content"><p>{content.substitution}</p></div>
              </div>
            )}
          </>
        )}

        {/* ========== TEMPERATURE CATEGORY ========== */}
        {category === 'temperature' && (
          <>
            {content.temperatures && content.temperatures.length > 0 && (
              <div className="bep-detail-section">
                <h3>🌡️ Temperature Ranges</h3>
                <div className="bep-temperatures-grid">
                  {content.temperatures.map((temp, idx) => (<div key={idx} className="bep-temperature-item">{temp}</div>))}
                </div>
              </div>
            )}
            {content.keyFeatures && content.keyFeatures.length > 0 && (
              <div className="bep-detail-section">
                <h3>✅ Key Features</h3>
                <div className="bep-features-grid">
                  {content.keyFeatures.map((feature, idx) => (<div key={idx} className="bep-feature-item">{feature}</div>))}
                </div>
              </div>
            )}
            {content.properUsage && content.properUsage.length > 0 && (
              <div className="bep-detail-section">
                <h3>📝 Proper Usage</h3>
                <div className="bep-detail-content">
                  {content.properUsage.map((usage, idx) => (<p key={idx}>• {usage}</p>))}
                </div>
              </div>
            )}
            {content.commonMistakes && content.commonMistakes.length > 0 && (
              <div className="bep-detail-section">
                <h3>❌ Common Mistakes</h3>
                <div className="bep-mistakes-grid">
                  {content.commonMistakes.map((mistake, idx) => (<div key={idx} className="bep-mistake-item">{mistake}</div>))}
                </div>
              </div>
            )}
            {content.ingredients && content.ingredients.length > 0 && (
              <div className="bep-detail-section">
                <h3>🥛 Ingredient Temperatures</h3>
                {content.ingredients.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: '10px' }}>
                    <strong>{item.name}:</strong> {item.temp} - {item.reason}
                  </div>
                ))}
              </div>
            )}
            {content.stages && content.stages.length > 0 && (
              <div className="bep-detail-section">
                <h3>📈 Sugar Stages</h3>
                {content.stages.map((stage, idx) => (<div key={idx}>• {stage}</div>))}
              </div>
            )}
            {content.methods && content.methods.length > 0 && (
              <div className="bep-detail-section">
                <h3>⚙️ Methods</h3>
                {content.methods.map((method, idx) => (<div key={idx}>• {method}</div>))}
              </div>
            )}
            {content.signs && (
              <div className="bep-detail-section">
                <h3>✅ Signs of Success</h3>
                <p>{content.signs}</p>
              </div>
            )}
            {content.problems && content.problems.length > 0 && (
              <div className="bep-detail-section">
                <h3>⚠️ Common Problems</h3>
                {content.problems.map((problem, idx) => (<div key={idx}>• {problem}</div>))}
              </div>
            )}
            {content.solutions && content.solutions.length > 0 && (
              <div className="bep-detail-section">
                <h3>🔧 Solutions</h3>
                {content.solutions.map((solution, idx) => (<div key={idx}>• {solution}</div>))}
              </div>
            )}
            {content.equipment && (
              <div className="bep-detail-section">
                <h3>🛠️ Equipment Needed</h3>
                <p>{content.equipment}</p>
              </div>
            )}
            {content.conversion && (
              <div className="bep-detail-section">
                <h3>📐 Conversion Formula</h3>
                <p>{content.conversion}</p>
              </div>
            )}
            {content.tips && (
              <div className="bep-detail-section">
                <h3>💡 Pro Tips</h3>
                <p>{content.tips}</p>
              </div>
            )}
          </>
        )}

        {/* ========== DECORATING CATEGORY ========== */}
        {category === 'decorating' && (
          <>
            {content.keyFeatures && content.keyFeatures.length > 0 && (
              <div className="bep-detail-section">
                <h3>✅ Key Features</h3>
                <div className="bep-features-grid">
                  {content.keyFeatures.map((feature, idx) => (<div key={idx} className="bep-feature-item">{feature}</div>))}
                </div>
              </div>
            )}
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
            {content.tipTypes && content.tipTypes.length > 0 && (
              <div className="bep-detail-section">
                <h3>🔘 Tip Types</h3>
                {content.tipTypes.map((tip, idx) => (<div key={idx}>• {tip}</div>))}
              </div>
            )}
            {content.sizes && content.sizes.length > 0 && (
              <div className="bep-detail-section">
                <h3>📏 Sizes</h3>
                {content.sizes.map((size, idx) => (
                  <div key={idx}><strong>{size.name}:</strong> {size.length} - {size.uses}</div>
                ))}
              </div>
            )}
            {content.materials && content.materials.length > 0 && (
              <div className="bep-detail-section">
                <h3>🧱 Materials</h3>
                {content.materials.map((material, idx) => (<div key={idx}>• {material}</div>))}
              </div>
            )}
            {content.techniques && content.techniques.length > 0 && (
              <div className="bep-detail-section">
                <h3>🎯 Techniques</h3>
                {content.techniques.map((technique, idx) => (<div key={idx}>• {technique}</div>))}
              </div>
            )}
            {content.tools && content.tools.length > 0 && (
              <div className="bep-detail-section">
                <h3>🛠️ Tools</h3>
                {content.tools.map((tool, idx) => (
                  <div key={idx}><strong>{tool.name}:</strong> {tool.use}</div>
                ))}
              </div>
            )}
            {content.colorTypes && content.colorTypes.length > 0 && (
              <div className="bep-detail-section">
                <h3>🎨 Color Types</h3>
                {content.colorTypes.map((color, idx) => (
                  <div key={idx}><strong>{color.name}:</strong> {color.intensity} - {color.uses}</div>
                ))}
              </div>
            )}
            {content.components && content.components.length > 0 && (
              <div className="bep-detail-section">
                <h3>🔧 Components</h3>
                {content.components.map((comp, idx) => (<div key={idx}>• {comp}</div>))}
              </div>
            )}
            {content.patterns && content.patterns.length > 0 && (
              <div className="bep-detail-section">
                <h3>📐 Patterns</h3>
                {content.patterns.map((pattern, idx) => (<div key={idx}>• {pattern}</div>))}
              </div>
            )}
            {content.cleaning && (
              <div className="bep-detail-section">
                <h3>🧼 Cleaning & Maintenance</h3>
                <div className="bep-detail-content"><p>{content.cleaning}</p></div>
              </div>
            )}
            {content.essentials && content.essentials.length > 0 && (
              <div className="bep-detail-section">
                <h3>📦 Essentials</h3>
                {content.essentials.map((item, idx) => (<div key={idx}>• {item}</div>))}
              </div>
            )}
            {content.storage && (
              <div className="bep-detail-section">
                <h3>📦 Storage</h3>
                <p>{content.storage}</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return (<div className="bep-container"><div className="loading-spinner">Loading bakery essentials...</div></div>);
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
        <aside className="bep-sidebar">
          <div className="bep-sidebar-header">
            <h2 className="bep-sidebar-title">Bakery Essentials</h2>
            <p className="bep-sidebar-subtitle">Master Professional Baking</p>
          </div>
          <div className="bep-sidebar-categories">
            <ul className="bep-categories-list">
              <li className={`bep-category-item ${selectedCategory === 'tools' ? 'bep-active' : ''}`} onClick={() => setSelectedCategory('tools')}>
                <span className="bep-category-name">Tools & Equipment</span>
              </li>
              <li className={`bep-category-item ${selectedCategory === 'techniques' ? 'bep-active' : ''}`} onClick={() => setSelectedCategory('techniques')}>
                <span className="bep-category-name">Baking Techniques</span>
              </li>
              <li className={`bep-category-item ${selectedCategory === 'ingredients' ? 'bep-active' : ''}`} onClick={() => setSelectedCategory('ingredients')}>
                <span className="bep-category-name">Ingredients Guide</span>
              </li>
              <li className={`bep-category-item ${selectedCategory === 'temperature' ? 'bep-active' : ''}`} onClick={() => setSelectedCategory('temperature')}>
                <span className="bep-category-name">Temperature Control</span>
              </li>
              <li className={`bep-category-item ${selectedCategory === 'decorating' ? 'bep-active' : ''}`} onClick={() => setSelectedCategory('decorating')}>
                <span className="bep-category-name">Decorating Tools</span>
              </li>
            </ul>
          </div>
        </aside>

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
                {selectedCategory === 'tools' && 'Essential tools and equipment for professional baking.'}
                {selectedCategory === 'techniques' && 'Master fundamental and advanced baking techniques.'}
                {selectedCategory === 'ingredients' && 'Comprehensive guide to baking ingredients.'}
                {selectedCategory === 'temperature' && 'Precise temperature control for perfect baking.'}
                {selectedCategory === 'decorating' && 'Tools and techniques for beautiful cake decoration.'}
              </p>
            </div>
          </header>

          <div className="bep-items-grid-section">
            <div className="bep-items-grid">
              {getCurrentData().map(item => renderItemCard(item))}
            </div>
          </div>
        </main>
      </div>

      {showDetailPanel && selectedItem && (
        <div className="bep-modal-overlay" onClick={closeDetailPanel}>
          <div className="bep-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bep-modal-close" onClick={closeDetailPanel}>×</button>
            <div className="bep-modal-header">
              <div className="bep-modal-title">
                <h2>{selectedItem.title}</h2>
                <p className="bep-modal-subtitle">{parseContent(selectedItem.content).tagline || selectedItem.title}</p>
              </div>
            </div>
            <div className="bep-modal-content">
              <div className="bep-modal-left">{renderDetailContent(selectedItem)}</div>
              <div className="bep-modal-right">
                <div className="bep-main-image-container">
                  <div className="bep-main-image" style={{ backgroundImage: `url(${selectedItem.image || '/placeholder.png'})` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="back-home-container">
        <button className="back-home-btn" onClick={() => navigate('/guidance')}>← Back to Guidance Page</button>
      </div>
    </div>
  );
};

export default BakeryEssentialsPage;