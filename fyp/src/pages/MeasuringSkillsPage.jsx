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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [toolsData, setToolsData] = useState([]);
  const [techniquesData, setTechniquesData] = useState([]);
  const [estimationData, setEstimationData] = useState([]);
  const [conversionData, setConversionData] = useState([]);
  const [precisionData, setPrecisionData] = useState([]);

  const API_URL = 'http://localhost:5000/api/guides';

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

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = ['measuring-tools', 'measuring-techniques', 'estimation', 'conversions', 'precision'];
      
      const results = await Promise.all(
        categories.map(async (cat) => {
          try {
            const response = await axios.get(`${API_URL}?category=${cat}`);
            console.log(`Category ${cat}:`, response.data.count, 'items');
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
          
          if (typeof guide.content === 'object' && guide.content !== null) {
            content = guide.content;
          } else if (typeof guide.content === 'string') {
            try {
              if (guide.content.trim().startsWith('{')) {
                content = JSON.parse(guide.content);
              } else {
                content = { fullDesc: guide.content, tagline: guide.title };
              }
            } catch (e) {
              content = { fullDesc: guide.content, tagline: guide.title };
            }
          } else {
            content = { fullDesc: guide.title, tagline: guide.title };
          }

          return {
            id: guide._id,
            name: content.name || guide.title || 'Unknown',
            image: guide.image || content.image || '/api/placeholder/120/120',
            tagline: content.tagline || guide.title || '',
            fullDesc: content.fullDesc || content.tagline || guide.title || '',
            keyFeatures: content.keyFeatures || [],
            properUsage: content.properUsage || [],
            commonMistakes: content.commonMistakes || [],
            types: content.types || [],
            usage: content.usage || [],
            steps: content.steps || [],
            tips: content.tips || '',
            commonConversions: content.commonConversions || [],
            criticalRules: content.criticalRules || [],
            methods: content.methods || [],
            techniques: content.techniques || [],
            tools: content.tools || [],
            criticalTemperatures: content.criticalTemperatures || [],
            commonPanSizes: content.commonPanSizes || [],
            mustKnow: content.mustKnow || [],
            metricEquivalents: content.metricEquivalents || [],
            handyEquivalents: content.handyEquivalents || [],
            commonErrors: content.commonErrors || [],
            toolsRequired: content.toolsRequired || [],
            commonRatios: content.commonRatios || [],
            calculation: content.calculation || [],
            effects: content.effects || [],
            basicRatios: content.basicRatios || [],
            application: content.application || [],
            benefits: content.benefits || [],
            documentationMethods: content.documentationMethods || [],
            whatToRecord: content.whatToRecord || [],
            areaCalculations: content.areaCalculations || [],
            adjustmentRules: content.adjustmentRules || [],
            volumeConversions: content.volumeConversions || [],
            weightConversions: content.weightConversions || [],
            ovenConversions: content.ovenConversions || [],
            commonSubstitutions: content.commonSubstitutions || [],
            dairySubstitutions: content.dairySubstitutions || [],
            commonTemps: content.commonTemps || [],
            ovenTemps: content.ovenTemps || [],
            scalingRules: content.scalingRules || [],
            commonMultipliers: content.commonMultipliers || [],
            exceptions: content.exceptions || []
          };
        });

        const categoryMap = {
          'measuring-tools': { setter: setToolsData, label: 'tools' },
          'measuring-techniques': { setter: setTechniquesData, label: 'techniques' },
          'estimation': { setter: setEstimationData, label: 'estimation' },
          'conversions': { setter: setConversionData, label: 'conversions' },
          'precision': { setter: setPrecisionData, label: 'precision' }
        };

        const mapping = categoryMap[result.category];
        if (mapping) {
          mapping.setter(parsedData);
          if (parsedData.length) hasData = true;
        }
      });

      if (!hasData) {
        setError('No data found in database.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data from server.');
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

  const sidebarItems = [
    { key: 'tools', label: 'Tools & Equipment' },
    { key: 'techniques', label: 'Measuring Techniques' },
    { key: 'estimation', label: 'Estimation Skills' },
    { key: 'conversions', label: 'Conversion Skills' },
    { key: 'precision', label: 'Precision Skills' },
  ];

  const getCategoryTitle = () => {
    return sidebarItems.find(s => s.key === selectedCategory)?.label || 'Measuring Skills';
  };

  const getCategoryDescription = () => {
    switch (selectedCategory) {
      case 'tools': return 'Essential tools for accurate kitchen measurements.';
      case 'techniques': return 'Proper methods for measuring ingredients.';
      case 'estimation': return 'Skills for estimating quantities.';
      case 'conversions': return 'Converting between measurement systems.';
      case 'precision': return 'Advanced skills for exact measurements.';
      default: return 'Master professional measuring skills with our comprehensive guides.';
    }
  };

  const handleItemSelect = (item) => {
    console.log('Selected item:', item); 
    setSelectedItem(item);
    setShowDetailPanel(true);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedItem(null);
  };

  const MeasuringIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3L21 21M9 3L21 15M3 9L15 21M3 15L9 21M15 3L21 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
      <div className="msp-container">
        <div className="loading-spinner">Loading measuring skills...</div>
      </div>
    );
  }

  const currentData = getCurrentData();

  return (
    <div className="msp-container">
      <div className="msp-mobile-topbar">
        <button
          className={`msp-hamburger ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <span /><span /><span />
        </button>
        <h1 className="msp-page-title">{getCategoryTitle()}</h1>
      </div>

      <div
        className={`msp-sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="msp-layout">
        <aside className={`msp-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="msp-sidebar-header">
            <h2 className="msp-sidebar-title">Measuring Skills</h2>
            <p className="msp-sidebar-subtitle">Master Kitchen Measurements</p>
          </div>
          <div className="msp-sidebar-categories">
            <ul className="msp-categories-list">
              {sidebarItems.map(item => (
                <li
                  key={item.key}
                  className={`msp-category-item${selectedCategory === item.key ? ' msp-active' : ''}`}
                  onClick={() => { setSelectedCategory(item.key); setSidebarOpen(false); }}
                >
                  <span className="msp-category-name">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="msp-main">
          <header className="msp-main-header">
            <div className="msp-header-content">
              <h1 className="msp-page-title desktop-title">{getCategoryTitle()}</h1>
              <p className="msp-page-description">{getCategoryDescription()}</p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          <div className="msp-items-grid-section">
            <div className="msp-items-grid">
              {currentData.map((item) => (
                <div
                  key={item.id}
                  className="msp-item-card"
                  onClick={() => handleItemSelect(item)}
                >
                  <div className="msp-card-image" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="msp-card-content">
                    <h3 className="msp-card-title">{item.name}</h3>
                    <p className="msp-card-description">{item.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="msp-back-section">
            <button
              className="msp-back-button"
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

      {showDetailPanel && selectedItem && (
        <div className="msp-modal-overlay" onClick={closeDetailPanel}>
          <div className="msp-modal" onClick={e => e.stopPropagation()}>
            <button className="msp-modal-close" onClick={closeDetailPanel}>×</button>

            <div className="msp-modal-hero">
              <p className="msp-modal-hero-label">Measuring Essential</p>
              <h2 className="msp-modal-hero-title">{selectedItem.name}</h2>
              <p className="msp-modal-hero-subtitle">{selectedItem.tagline}</p>
            </div>

            <div className="msp-modal-inner">
              <div className="msp-modal-left">
                {selectedItem.fullDesc && (
                  <>
                    <div className="msp-msec">
                      <span className="msp-msec-label">About this essential</span>
                      <p className="msp-msec-text">{renderSafeContent(selectedItem.fullDesc)}</p>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                  <>
                    <div className="msp-uses-badge-row">
                      <div className="msp-uses-section">
                        <span className="msp-msec-label">Key Features</span>
                        <div className="msp-uses-wrap">
                          {selectedItem.keyFeatures.map((f, idx) => (
                            <div key={idx} className="msp-use-tag">
                              <span className="msp-use-dot">•</span>
                              {renderSafeContent(f)}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="msp-badge-section">
                        <span className="msp-msec-label">Category</span>
                        <div className="msp-category-badge">
                          <span className="msp-category-badge-icon"><MeasuringIcon /></span>
                          <span className="msp-category-badge-value">{getCategoryTitle()}</span>
                        </div>
                      </div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                <div className="msp-modal-two-col">
                  {(selectedItem.properUsage && selectedItem.properUsage.length > 0) && (
                    <div className="msp-msec">
                      <span className="msp-msec-label">Proper Usage</span>
                      <div className="msp-steps-list">
                        {selectedItem.properUsage.map((step, idx) => (
                          <div key={idx} className="msp-step-card">
                            <span className="msp-step-num">{idx + 1}</span>
                            <span className="msp-step-txt">{renderSafeContent(step)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedItem.tips || (selectedItem.steps && selectedItem.steps.length > 0)) && (
                    <div className="msp-msec">
                      <span className="msp-msec-label">Tips</span>
                      <div className="msp-tips-list">
                        {selectedItem.steps && selectedItem.steps.map((step, idx) => (
                          <div key={idx} className="msp-tip-card">
                            <span className="msp-tip-icon">{tipIcons[idx % tipIcons.length]}</span>
                            <span className="msp-tip-txt">{renderSafeContent(step)}</span>
                          </div>
                        ))}
                        {selectedItem.tips && (
                          <div className="msp-tip-card">
                            <span className="msp-tip-icon"><LightbulbIcon /></span>
                            <span className="msp-tip-txt">{renderSafeContent(selectedItem.tips)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
                  <>
                    <hr className="msp-mdivider" />
                    <div className="msp-msec">
                      <span className="msp-msec-label">Common Mistakes</span>
                      <div className="msp-mistakes-list">
                        {selectedItem.commonMistakes.map((m, idx) => (
                          <div key={idx} className="msp-mistake-card">
                            <span className="msp-mistake-icon"><WarningIcon /></span>
                            <span className="msp-tip-txt">{renderSafeContent(m)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedItem.types && selectedItem.types.length > 0 && (
                  <>
                    <hr className="msp-mdivider" />
                    <div className="msp-msec">
                      <span className="msp-msec-label">Types</span>
                      <div className="msp-types-grid">
                        {selectedItem.types.map((type, idx) => (
                          <div key={idx} className="msp-type-card">
                            <h4>{renderSafeContent(type.name)}</h4>
                            <p>{renderSafeContent(type.description)}</p>
                            {type.capacity && <p><strong>Capacity:</strong> {renderSafeContent(type.capacity)}</p>}
                            {type.sizes && <p><strong>Sizes:</strong> {renderSafeContent(type.sizes)}</p>}
                            {type.bestFor && <p><strong>Best For:</strong> {renderSafeContent(type.bestFor)}</p>}
                            {type.range && <p><strong>Range:</strong> {renderSafeContent(type.range)}</p>}
                            {type.features && <p><strong>Features:</strong> {renderSafeContent(type.features)}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedItem.usage && selectedItem.usage.length > 0 && (
                  <>
                    <hr className="msp-mdivider" />
                    <div className="msp-msec">
                      <span className="msp-msec-label">Usage</span>
                      <div className="msp-uses-wrap">
                        {selectedItem.usage.map((u, idx) => (
                          <div key={idx} className="msp-use-tag">
                            <span className="msp-use-dot">•</span>
                            {renderSafeContent(u)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedItem.commonConversions && selectedItem.commonConversions.length > 0 && (
                  <>
                    <hr className="msp-mdivider" />
                    <div className="msp-msec">
                      <span className="msp-msec-label">Common Conversions</span>
                      <div className="msp-conversions-grid">
                        {selectedItem.commonConversions.map((conv, idx) => (
                          <div key={idx} className="msp-conversion-box">{renderSafeContent(conv)}</div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {selectedItem.criticalRules && selectedItem.criticalRules.length > 0 && (
                  <>
                    <hr className="msp-mdivider" />
                    <div className="msp-msec">
                      <span className="msp-msec-label">Critical Rules</span>
                      <div className="msp-critical-rules-grid">
                        {selectedItem.criticalRules.map((rule, idx) => (
                          <div key={idx} className="msp-critical-rule-box">{renderSafeContent(rule)}</div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="msp-modal-right">
                <div
                  className="msp-modal-right-image"
                  style={{ backgroundImage: `url(${selectedItem.image})` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeasuringSkillsPage;