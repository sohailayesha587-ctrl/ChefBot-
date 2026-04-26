import React, { useState, useEffect } from 'react';
import './KitchenAppliancesPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KitchenAppliancesPage = () => {
  const navigate = useNavigate();
  
  const [appliancesData, setAppliancesData] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedModel, setSelectedModel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedAppliance, setExpandedAppliance] = useState(null);
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchAppliances();
  }, []);

  const fetchAppliances = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/appliances`);
      console.log('API Response:', response.data);
      
      if (response.data.success && response.data.data) {
        setAppliancesData(response.data.data);
        console.log('✅ Loaded:', response.data.data.length, 'appliances');
      } else {
        setError('No data received from server');
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const toggleApplianceDropdown = (applianceId) => {
    setExpandedAppliance(expandedAppliance === applianceId ? null : applianceId);
  };

  const toggleCompanyDropdown = (companyId) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedModel(null);
  };

  const currentAppliance = appliancesData.find(app => app.id === selectedAppliance);
  const currentCompany = selectedCompany ? 
    currentAppliance?.companies?.find(c => c.id === selectedCompany) : null;

  const filteredModels = currentCompany && currentCompany.models ? 
    currentCompany.models.filter(model => 
      selectedType === 'all' || model.type === selectedType
    ) : [];

  if (loading) {
    return (
      <div className="kap-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading kitchen appliances...</p>
        </div>
      </div>
    );
  }

  if (error && !appliancesData.length) {
    return (
      <div className="kap-container">
        <div className="error-container">
          <h2>⚠️ Error Loading Data</h2>
          <p>{error}</p>
          <button onClick={fetchAppliances} className="retry-btn">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="kap-container">
      <div className="kap-layout">
        {/* LEFT SIDEBAR */}
        <aside className="kap-sidebar">
          <div className="kap-sidebar-header">
            <h2 className="kap-sidebar-title">Kitchen Appliances</h2>
            <p className="kap-sidebar-subtitle">Select Appliance</p>
          </div>

          <div className="kap-appliances-list">
            {appliancesData.map(appliance => (
              <div key={appliance.id} className="kap-appliance-wrapper">
                <div 
                  className={`kap-appliance-dropdown ${expandedAppliance === appliance.id ? 'kap-expanded' : ''}`}
                  onClick={() => {
                    setSelectedAppliance(appliance.id);
                    setSelectedCompany(null);
                    setSelectedType('all');
                    toggleApplianceDropdown(appliance.id);
                  }}
                >
                  <div className="kap-appliance-header">
                    <span className="kap-appliance-name">{appliance.name}</span>
                    <span className="kap-dropdown-arrow">
                      {expandedAppliance === appliance.id ? '▼' : '▶'}
                    </span>
                  </div>
                  <span className="kap-company-count">{appliance.companies?.length || 0} companies</span>
                </div>

                {expandedAppliance === appliance.id && appliance.types && appliance.types.length > 0 && (
                  <div className="kap-types-list">
                    {appliance.types.map(type => (
                      <div 
                        key={type}
                        className={`kap-type-item ${selectedType === type ? 'kap-type-selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTypeSelect(type);
                        }}
                      >
                        <span className="kap-type-name">{type}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="kap-main">
          {error && <div className="error-message" style={{color: 'orange', textAlign: 'center', padding: '10px'}}>{error}</div>}
          
          {/* WELCOME SCREEN */}
          {!selectedAppliance && (
            <div className="kap-welcome-screen">
              <h1 className="kap-welcome-title">Kitchen Appliances Guide</h1>
              <p className="kap-welcome-text">
                Select an appliance from the sidebar to view available brands and models.
                Each appliance includes detailed information to help you make the best choice.
              </p>
              <div className="kap-stats">
                <div className="kap-stat-item">
                  <h3>{appliancesData.length}</h3>
                  <p>Appliances</p>
                </div>
                <div className="kap-stat-item">
                  <h3>{appliancesData.reduce((acc, app) => acc + (app.companies?.length || 0), 0)}</h3>
                  <p>Brands</p>
                </div>
              </div>
            </div>
          )}

          {/* COMPANIES SCREEN */}
          {selectedAppliance && !selectedCompany && currentAppliance && (
            <div className="kap-companies-screen">
              <h1 className="kap-companies-title">{currentAppliance.name}</h1>
              <p className="kap-companies-description">{currentAppliance.description}</p>
              <p className="kap-companies-instruction">
                Select a brand from the list below to view their models:
              </p>
              
              <div className="kap-companies-grid">
                {currentAppliance.companies?.map(company => (
                  <div 
                    key={company.id}
                    className="kap-company-card"
                    onClick={() => {
                      setSelectedCompany(company.id);
                      toggleCompanyDropdown(company.id);
                    }}
                  >
                    <div className="kap-company-card-header">
                      <h3 className="kap-company-card-name">{company.name}</h3>
                      <span className="kap-company-model-count">
                        {company.models?.length || 0} models
                      </span>
                    </div>
                    <p className="kap-company-card-description">
                      Click to view available models
                    </p>
                    
                    {expandedCompany === company.id && company.models && company.models.length > 0 && (
                      <div className="kap-company-models-dropdown">
                        <div className="kap-models-dropdown-header">
                          <h4>Available Models</h4>
                          <span className="kap-models-count">{company.models.length} models</span>
                        </div>
                        <div className="kap-models-dropdown-list">
                          {company.models.map(model => (
                            <div 
                              key={model.id}
                              className="kap-model-dropdown-item"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleModelSelect(model);
                              }}
                            >
                              <div className="kap-model-dropdown-info">
                                <h5>{model.name}</h5>
                                <span className="kap-model-dropdown-type">{model.type}</span>
                              </div>
                              <div className="kap-model-dropdown-price">
                                {model.price}
                              </div>
                              <button className="kap-model-dropdown-view">
                                View Details →
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {expandedCompany === company.id && (!company.models || company.models.length === 0) && (
                      <div className="kap-company-models-dropdown">
                        <div className="kap-models-dropdown-header">
                          <h4>Coming Soon</h4>
                          <p>Detailed model information will be available soon.</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODELS SCREEN */}
          {selectedCompany && currentCompany && currentAppliance && (
            <div className="kap-models-screen">
              <div className="kap-models-header">
                <div>
                  <h1 className="kap-models-title">
                    {currentCompany.name} {currentAppliance.name}
                  </h1>
                  <p className="kap-models-description">
                    {currentAppliance.description}
                  </p>
                </div>
                <div className="kap-models-header-actions">
                  <button 
                    className="kap-change-appliance-btn"
                    onClick={() => {
                      setSelectedAppliance(null);
                      setSelectedCompany(null);
                      setExpandedAppliance(null);
                      setExpandedCompany(null);
                    }}
                  >
                    Change Appliance
                  </button>
                  <button 
                    className="kap-change-company-btn"
                    onClick={() => {
                      setSelectedCompany(null);
                      setExpandedCompany(null);
                    }}
                  >
                    Change Brand
                  </button>
                </div>
              </div>

              {currentAppliance.types && currentAppliance.types.length > 0 && (
                <div className="kap-type-tabs">
                  <button
                    className={`kap-type-tab ${selectedType === 'all' ? 'kap-tab-active' : ''}`}
                    onClick={() => handleTypeSelect('all')}
                  >
                    All Types
                  </button>
                  {currentAppliance.types.map(type => (
                    <button
                      key={type}
                      className={`kap-type-tab ${selectedType === type ? 'kap-tab-active' : ''}`}
                      onClick={() => handleTypeSelect(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}

              <div className="kap-models-grid">
                {filteredModels.length > 0 ? (
                  filteredModels.map(model => (
                    <div 
                      key={model.id}
                      className="kap-model-card"
                      onClick={() => handleModelSelect(model)}
                    >
                      <div className="kap-model-image-container">
                        <div 
                          className="kap-model-image"
                          style={{ backgroundImage: `url(${model.image || 'https://via.placeholder.com/300x200?text=' + model.name})` }}
                        ></div>
                      </div>
                      <div className="kap-model-content">
                        <div className="kap-model-header">
                          <h3 className="kap-model-name">{model.name}</h3>
                          <span className="kap-model-type-tag">{model.type}</span>
                        </div>
                        {model.capacity && (
                          <p className="kap-model-capacity">📦 Capacity: {model.capacity}</p>
                        )}
                        <p className="kap-model-price">{model.price}</p>
                        <div className="kap-model-features">
                          {model.features?.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="kap-feature-tag">{feature}</span>
                          ))}
                        </div>
                        <button className="kap-view-details-btn">
                          View Complete Guide →
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="kap-no-models">
                    <p>No models found for selected type.</p>
                    <button 
                      className="kap-show-all-btn"
                      onClick={() => setSelectedType('all')}
                    >
                      Show All Models
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
{/* MODEL DETAIL MODAL */}
{showModal && selectedModel && (
  <div className="kap-modal-overlay" onClick={closeModal}>
    <div className="kap-modal" onClick={(e) => e.stopPropagation()}>
      <button className="kap-modal-close" onClick={closeModal}>×</button>
      
      <div className="kap-modal-header">
        <div className="kap-modal-title">
          <h2>{selectedModel.name}</h2>
          <p className="kap-modal-subtitle">
            {currentCompany?.name} • {selectedModel.type} • Complete Guide
          </p>
        </div>
      </div>

      <div className="kap-modal-content">
        <div className="kap-modal-layout">
          <div className="kap-modal-left">
            <div className="kap-modal-details">
              
              {/* Product Overview */}
              <div className="kap-detail-section">
                <h3>📋 Product Overview</h3>
                <p>
                  <strong>{selectedModel.name}</strong> is a {selectedModel.type} {currentAppliance?.name?.toLowerCase() || 'appliance'} 
                  with <strong>{selectedModel.capacity}</strong> capacity.
                </p>
                {selectedModel.bestFor && (
                  <p><strong>🎯 Best For:</strong> {selectedModel.bestFor}</p>
                )}
                {selectedModel.estimatedConsumption && (
                  <p><strong>⚡ Energy Consumption:</strong> {selectedModel.estimatedConsumption}</p>
                )}
                {selectedModel.estimatedPowerConsumption && (
                  <p><strong>⚡ Power Consumption:</strong> {selectedModel.estimatedPowerConsumption}</p>
                )}
                {selectedModel.estimatedGasConsumption && (
                  <p><strong>🔥 Gas Consumption:</strong> {selectedModel.estimatedGasConsumption}</p>
                )}
              </div>

              {/* Key Features */}
              {selectedModel.features && selectedModel.features.length > 0 && (
                <div className="kap-detail-section">
                  <h3>✅ Key Features</h3>
                  <div className="kap-features-list">
                    {selectedModel.features.map((feature, idx) => (
                      <div key={idx} className="kap-feature-item">
                        <span className="kap-feature-check">✓</span>
                        <span className="kap-feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specifications */}
              {selectedModel.specifications && Object.keys(selectedModel.specifications).length > 0 && (
                <div className="kap-detail-section">
                  <h3>📊 Technical Specifications</h3>
                  <div className="kap-specifications-grid">
                    {Object.entries(selectedModel.specifications).map(([key, value]) => (
                      <div key={key} className="kap-spec-item">
                        <span className="kap-spec-label">{key}:</span>
                        <span className="kap-spec-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="kap-detail-section">
                <h3>💰 Price Range</h3>
                <p><strong>{selectedModel.price}</strong></p>
              </div>

              {/* Warranty */}
              {selectedModel.warranty && (
                <div className="kap-detail-section">
                  <h3>🛡️ Warranty</h3>
                  <p>{selectedModel.warranty}</p>
                </div>
              )}

              {/* Usage Guide */}
              {selectedModel.usageGuide && (
                <div className="kap-detail-section">
                  <h3>📖 Usage Guide</h3>
                  <p>{selectedModel.usageGuide}</p>
                </div>
              )}

              {/* Maintenance Tips */}
              {selectedModel.maintenance && (
                <div className="kap-detail-section">
                  <h3>🔧 Maintenance Tips</h3>
                  <p>{selectedModel.maintenance}</p>
                </div>
              )}

              {/* Installation Tips */}
              {selectedModel.installationTips && (
                <div className="kap-detail-section">
                  <h3>🛠️ Installation Tips</h3>
                  <p>{selectedModel.installationTips}</p>
                </div>
              )}

              {/* Energy Saving Tips */}
              {selectedModel.energySavingTips && (
                <div className="kap-detail-section">
                  <h3>💡 Energy Saving Tips</h3>
                  <p>{selectedModel.energySavingTips}</p>
                </div>
              )}

              {/* Safety Tips */}
              {selectedModel.safetyTips && (
                <div className="kap-detail-section">
                  <h3>⚠️ Safety Tips</h3>
                  <p>{selectedModel.safetyTips}</p>
                </div>
              )}

              {/* Troubleshooting */}
              {selectedModel.troubleshooting && selectedModel.troubleshooting.length > 0 && (
                <div className="kap-detail-section">
                  <h3>🔧 Troubleshooting Guide</h3>
                  <ul className="kap-troubleshooting-list">
                    {selectedModel.troubleshooting.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

          <div className="kap-modal-right">
            <div className="kap-modal-image-container">
              <div 
                className="kap-modal-image-large"
                style={{ 
                  backgroundImage: `url(${selectedModel.image || 'https://via.placeholder.com/400x300?text=' + selectedModel.name})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </div>
            
            <div className="kap-quick-info">
              <h3>Quick Information</h3>
              <div className="kap-quick-info-content">
                <div className="kap-quick-info-item">
                  <span className="kap-quick-label">Type</span>
                  <span className="kap-quick-value">{selectedModel.type}</span>
                </div>
                {selectedModel.capacity && (
                  <div className="kap-quick-info-item">
                    <span className="kap-quick-label">Capacity</span>
                    <span className="kap-quick-value">{selectedModel.capacity}</span>
                  </div>
                )}
                {selectedModel.burners && (
                  <div className="kap-quick-info-item">
                    <span className="kap-quick-label">Burners</span>
                    <span className="kap-quick-value">{selectedModel.burners}</span>
                  </div>
                )}
                {selectedModel.estimatedConsumption && (
                  <div className="kap-quick-info-item">
                    <span className="kap-quick-label">Energy</span>
                    <span className="kap-quick-value">{selectedModel.estimatedConsumption}</span>
                  </div>
                )}
                {selectedModel.warranty && (
                  <div className="kap-quick-info-item">
                    <span className="kap-quick-label">Warranty</span>
                    <span className="kap-quick-value">{selectedModel.warranty.substring(0, 30)}...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="kap-modal-footer">
        <button className="kap-modal-close-btn" onClick={closeModal}>
          Close Guide
        </button>
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

export default KitchenAppliancesPage;