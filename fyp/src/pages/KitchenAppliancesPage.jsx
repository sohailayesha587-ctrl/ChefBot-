import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import './KitchenAppliancesPage.css';

const KitchenAppliancesPage = () => {
  const navigate = useNavigate();

  const [appliances, setAppliances] = useState([]);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedModel, setSelectedModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/beginners-guides?category=kitchen-appliances');
        const guides = response.data.guides || [];

        const result = [];

        guides.forEach(guide => {
          const applianceId = guide.mainCategory || 'uncategorized';
          const brandName = guide.brand || 'Unknown';
          const typeName = guide.subCategory || 'General';

          let content = {};
          if (typeof guide.content === 'object' && guide.content !== null) {
            content = guide.content;
          } else if (typeof guide.content === 'string') {
            try {
              content = JSON.parse(guide.content);
            } catch {
              content = {};
            }
          }

          let appliance = result.find(a => a.id === applianceId);

          if (!appliance) {
            appliance = {
              id: applianceId,
              name: applianceId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
              types: [],
              brands: [],
            };
            result.push(appliance);
          }

          if (!appliance.types.includes(typeName)) {
            appliance.types.push(typeName);
          }

          let brand = appliance.brands.find(b => b.name === brandName);

          if (!brand) {
            brand = { name: brandName, models: [] };
            appliance.brands.push(brand);
          }

          let modelName = guide.title || 'Unnamed';
          if (modelName.startsWith(brandName)) {
            modelName = modelName.slice(brandName.length).trim();
          }

          brand.models.push({
            id: guide._id,
            name: modelName,
            type: typeName,
            capacity: content.capacity || '',
            price: content.price || '',
            image: guide.image,
            data: content,
          });
        });

        setAppliances(result);

        if (result.length === 0) {
          setError('No appliances found in database.');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentAppliance = appliances.find(a => a.id === selectedAppliance);
  const currentBrand = currentAppliance?.brands.find(b => b.name === selectedBrand);

  const visibleModels = currentBrand
    ? currentBrand.models.filter(m => selectedType === 'all' || m.type === selectedType)
    : [];

  const openAppliance = (id) => {
    setSelectedAppliance(id);
    setSelectedBrand(null);
    setSelectedType('all');
    setSelectedModel(null);
  };

  const openBrand = (name) => {
    setSelectedBrand(name);
    setSelectedType('all');
    setSelectedModel(null);
  };

  const changeBrand = () => {
    setSelectedBrand(null);
    setSelectedType('all');
    setSelectedModel(null);
  };

  const changeAppliance = () => {
    setSelectedAppliance(null);
    setSelectedBrand(null);
    setSelectedType('all');
    setSelectedModel(null);
  };

  if (loading) {
    return (
      <div className="kap-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && appliances.length === 0) {
    return (
      <div className="kap-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="kap-container">
      <div className="kap-mobile-topbar">
        <h1 className="kap-page-title">Kitchen Appliances</h1>
      </div>

      <div className="kap-categories-row">
        {appliances.map(appliance => (
          <button
            key={appliance.id}
            className={`kap-cat-btn ${selectedAppliance === appliance.id ? 'active' : ''}`}
            onClick={() => openAppliance(appliance.id)}
          >
            {appliance.name}
          </button>
        ))}
      </div>

      <div className="kap-layout">
        <aside className="kap-sidebar">
          <div className="kap-sidebar-header">
            <h2 className="kap-sidebar-title">Kitchen Appliances</h2>
            <p className="kap-sidebar-subtitle">Select Appliance</p>
          </div>

          <ul className="kap-appliances-list">
            {appliances.map(appliance => (
              <li
                key={appliance.id}
                className={`kap-appliance-item ${selectedAppliance === appliance.id ? 'kap-active' : ''}`}
                onClick={() => openAppliance(appliance.id)}
              >
                {appliance.name}
              </li>
            ))}
          </ul>
        </aside>

        <main className="kap-main">
          <header className="kap-main-header">
            <h1 className="kap-page-title desktop-title">
              {currentAppliance ? currentAppliance.name : 'Kitchen Appliances Guide'}
            </h1>
            <p className="kap-page-description">
              Browse appliances, compare brands, and find the perfect model.
            </p>
          </header>

          {!selectedAppliance && (
            <div className="kap-welcome-screen">
              <h2>Select an appliance from the sidebar</h2>
              <p>Each appliance includes brands, models, and specifications.</p>
            </div>
          )}

          {selectedAppliance && !selectedBrand && currentAppliance && (
            <div className="kap-companies-section">
              <h2 className="kap-section-title">{currentAppliance.name}</h2>

              <div className="kap-companies-grid">
                {currentAppliance.brands.map(brand => (
                  <div
                    key={brand.name}
                    className="kap-company-card"
                    onClick={() => openBrand(brand.name)}
                  >
                    <h3 className="kap-company-name">{brand.name}</h3>
                    <span className="kap-model-count-badge">{brand.models.length} models</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedAppliance && selectedBrand && currentBrand && currentAppliance && (
            <div className="kap-models-section">
              <div className="kap-models-section-header">
                <div>
                  <h2 className="kap-section-title">
                    {currentBrand.name} — {currentAppliance.name}
                  </h2>
                </div>

                <div className="kap-header-nav-btns">
                  <button className="kap-nav-btn" onClick={changeBrand}>
                    ← Change Brand
                  </button>

                  <button className="kap-nav-btn kap-nav-btn--dark" onClick={changeAppliance}>
                    ← Change Appliance
                  </button>
                </div>
              </div>

              {currentAppliance.types.length > 1 && (
                <div className="kap-type-tabs">
                  <button
                    className={`kap-type-tab ${selectedType === 'all' ? 'kap-tab-active' : ''}`}
                    onClick={() => setSelectedType('all')}
                  >
                    All Types
                  </button>

                  {currentAppliance.types.map(type => (
                    <button
                      key={type}
                      className={`kap-type-tab ${selectedType === type ? 'kap-tab-active' : ''}`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}

              <div className="kap-models-grid">
                {visibleModels.map(model => (
                  <div
                    key={model.id}
                    className="kap-model-card"
                    onClick={() => setSelectedModel(model)}
                  >
                    <div
                      className="kap-card-image"
                      style={model.image ? { backgroundImage: `url(${model.image})` } : undefined}
                    />
                    <div className="kap-card-content">
                      <h3 className="kap-card-title">{model.name}</h3>
                      {model.type && <span className="kap-type-pill">{model.type}</span>}
                      {model.capacity && <p className="kap-card-capacity">{model.capacity}</p>}
                      {model.price && <p className="kap-card-price">{model.price}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="kap-back-section">
            <button className="kap-back-button" onClick={() => navigate('/guidance')}>
              <FaArrowLeft />
              <span>Back to Guidance Page</span>
            </button>
          </div>
        </main>
      </div>

      {selectedModel && (
        <ModelModal
          model={selectedModel}
          brandName={selectedBrand}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </div>
  );
};

const ModelModal = ({ model, brandName, onClose }) => {
  const data = model.data;

  return (
    <div className="kap-modal-overlay" onClick={onClose}>
      <div className="kap-modal" onClick={e => e.stopPropagation()}>
        <button className="kap-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="kap-modal-hero">
          <p className="kap-modal-hero-label">Kitchen Appliance</p>
          <h2 className="kap-modal-hero-title">{model.name}</h2>
          <p className="kap-modal-hero-subtitle">
            {brandName} · {model.type}{model.capacity ? ` · ${model.capacity}` : ''}
          </p>
        </div>

        <div className="kap-modal-inner">
          <div className="kap-modal-left">
            {data.bestFor && (
              <div className="kap-msec">
                <span className="kap-msec-label">Best For</span>
                <p className="kap-msec-text">{data.bestFor}</p>
              </div>
            )}

            {data.features?.length > 0 && (
              <div className="kap-msec">
                <span className="kap-msec-label">Features</span>
                <ul>
                  {data.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}

            {data.specifications && Object.keys(data.specifications).length > 0 && (
              <div className="kap-msec">
                <span className="kap-msec-label">Specifications</span>
                {Object.entries(data.specifications).map(([key, value]) => (
                  <div key={key} className="kap-spec-card">
                    <span className="kap-spec-label">{key}</span>
                    <span className="kap-spec-value">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}

            {data.warranty && (
              <div className="kap-msec">
                <span className="kap-msec-label">Warranty</span>
                <p className="kap-msec-text">{data.warranty}</p>
              </div>
            )}

            {data.usageGuide && (
              <div className="kap-msec">
                <span className="kap-msec-label">Usage Guide</span>
                <p className="kap-msec-text">{data.usageGuide}</p>
              </div>
            )}

            {data.maintenance && (
              <div className="kap-msec">
                <span className="kap-msec-label">Maintenance</span>
                <p className="kap-msec-text">{data.maintenance}</p>
              </div>
            )}

            {data.safetyTips && (
              <div className="kap-msec">
                <span className="kap-msec-label">Safety Tips</span>
                <p className="kap-msec-text">{data.safetyTips}</p>
              </div>
            )}
          </div>

          <div className="kap-modal-right">
            <div
              className="kap-modal-right-image"
              style={model.image ? { backgroundImage: `url(${model.image})` } : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenAppliancesPage;