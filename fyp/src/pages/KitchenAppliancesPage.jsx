import React, { useEffect, useState } from 'react';
import './KitchenAppliancesPage.css';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    fetchAppliances();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const normalizeValue = value => {
    if (value === null || value === undefined) {
      return '';
    }

    return String(value).trim();
  };

  const getType = guide => {
    return (
      normalizeValue(guide.subCategory) ||
      normalizeValue(guide.subcategory) ||
      normalizeValue(guide.type) ||
      'General'
    );
  };

  const createId = value => {
    return normalizeValue(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const getApplianceName = value => {
    const name = normalizeValue(value);

    if (!name) {
      return 'Uncategorized';
    }

    return name
      .split(/[-_ ]+/)
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getFeatures = guide => {
    if (Array.isArray(guide.features)) {
      return guide.features;
    }

    if (Array.isArray(guide.keyFeatures)) {
      return guide.keyFeatures;
    }

    if (Array.isArray(guide.keyUses)) {
      return guide.keyUses;
    }

    return [];
  };

  const fetchAppliances = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/beginners-guides', {
        params: {
          category: 'kitchen-appliances'
        }
      });

      if (!response.data?.success || !Array.isArray(response.data.guides)) {
        throw new Error('Invalid response from server');
      }

      const grouped = {};

      response.data.guides.forEach(guide => {
        const mainCategory =
          normalizeValue(guide.mainCategory) || 'uncategorized';

        const type = getType(guide);

        const brand =
          normalizeValue(guide.brand) || 'Unknown';

        if (!grouped[mainCategory]) {
          grouped[mainCategory] = {
            id: mainCategory,
            name: getApplianceName(mainCategory),
            description:
              normalizeValue(guide.fullDesc) ||
              normalizeValue(guide.description) ||
              `${getApplianceName(mainCategory)} appliances`,
            types: [],
            companies: []
          };
        }

        if (
          type &&
          !grouped[mainCategory].types.some(
            existingType =>
              existingType.toLowerCase() === type.toLowerCase()
          )
        ) {
          grouped[mainCategory].types.push(type);
        }

        let company = grouped[mainCategory].companies.find(
          item =>
            item.name.toLowerCase() === brand.toLowerCase()
        );

        if (!company) {
          company = {
            id: createId(`${mainCategory}-${brand}`),
            name: brand,
            models: []
          };

          grouped[mainCategory].companies.push(company);
        }

        company.models.push({
          id: guide._id,
          name:
            normalizeValue(guide.name) ||
            normalizeValue(guide.title) ||
            'Unnamed Model',
          type,
          capacity: normalizeValue(guide.capacity),
          price: normalizeValue(guide.price),
          priceRange: normalizeValue(guide.priceRange),
          features: getFeatures(guide),
          specifications:
            guide.specifications &&
            typeof guide.specifications === 'object'
              ? guide.specifications
              : {},
          usageGuide: normalizeValue(guide.usageGuide),
          maintenance: normalizeValue(guide.maintenance),
          warranty: normalizeValue(guide.warranty),
          bestFor: normalizeValue(guide.bestFor),
          estimatedConsumption: normalizeValue(
            guide.estimatedConsumption
          ),
          estimatedPowerConsumption: normalizeValue(
            guide.estimatedPowerConsumption
          ),
          estimatedGasConsumption: normalizeValue(
            guide.estimatedGasConsumption
          ),
          installationTips: normalizeValue(
            guide.installationTips
          ),
          energySavingTips: normalizeValue(
            guide.energySavingTips
          ),
          safetyTips: normalizeValue(guide.safetyTips),
          cookingTips: normalizeValue(guide.cookingTips),
          washPrograms: normalizeValue(guide.washPrograms),
          placeSettings: normalizeValue(guide.placeSettings),
          coolingCapacity: normalizeValue(
            guide.coolingCapacity
          ),
          dryCapacity: normalizeValue(guide.dryCapacity),
          hotWaterTemp: normalizeValue(guide.hotWaterTemp),
          coldWaterTemp: normalizeValue(guide.coldWaterTemp),
          troubleshooting: Array.isArray(
            guide.troubleshooting
          )
            ? guide.troubleshooting
            : [],
          image:
            normalizeValue(guide.image) ||
            normalizeValue(guide.previewImg)
        });
      });

      const result = Object.values(grouped).map(appliance => ({
        ...appliance,
        types: appliance.types.sort((a, b) =>
          a.localeCompare(b)
        ),
        companies: appliance.companies.sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      }));

      setAppliancesData(result);

      if (result.length === 0) {
        setError('No appliance data found in database.');
      }
    } catch (err) {
      console.error('Failed to load kitchen appliances:', err);
      setError('Failed to load data from server.');
    } finally {
      setLoading(false);
    }
  };

  const currentAppliance = appliancesData.find(
    appliance => appliance.id === selectedAppliance
  );

  const currentCompany = currentAppliance?.companies?.find(
    company => company.id === selectedCompany
  );

  const filteredModels =
    currentCompany?.models?.filter(model => {
      if (selectedType === 'all') {
        return true;
      }

      return (
        model.type.toLowerCase() ===
        selectedType.toLowerCase()
      );
    }) || [];

  const getApplianceCardClass = (name = '') => {
    const value = name.toLowerCase();

    if (
      value.includes('refrigerator') ||
      value.includes('fridge')
    ) {
      return 'kap-ref';
    }

    if (value.includes('washing')) {
      return 'kap-wm';
    }

    if (
      value.includes('air') ||
      value.includes('conditioner')
    ) {
      return 'kap-ac';
    }

    if (value.includes('microwave')) {
      return 'kap-micro';
    }

    if (value.includes('water')) {
      return 'kap-wh';
    }

    if (value.includes('dishwasher')) {
      return 'kap-dw';
    }

    if (value.includes('oven')) {
      return 'kap-oven';
    }

    if (value.includes('freezer')) {
      return 'kap-freezer';
    }

    if (
      value.includes('stove') ||
      value.includes('cooktop')
    ) {
      return 'kap-stove';
    }

    return '';
  };

  const selectAppliance = id => {
    setSelectedAppliance(id);
    setSelectedCompany(null);
    setSelectedType('all');
  };

  const selectCompany = id => {
    setSelectedCompany(id);
  };

  const handleModelSelect = model => {
    setSelectedModel(model);
    setShowModal(true);
    setSidebarOpen(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedModel(null);
  };

  const openLightbox = imageUrl => {
    if (imageUrl) {
      setLightboxImage(imageUrl);
    }
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const ChevronDownIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const ApplianceIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 9h18M9 21V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const PriceIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const CapacityIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 7H4a1 1 0 00-1 1v11a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const EnergyIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const WarrantyIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 2L3 7v5c0 5.25 3.75 10.14 9 11.25C17.25 22.14 21 17.25 21 12V7L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const WrenchIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const WarningIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );

  const CheckIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 13L9 17L19 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const InstallIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const CookIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 8h12l-1.5 9H7.5L6 8zM4 8h16M9 8V6a1 1 0 011-1h4a1 1 0 011 1v2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (loading) {
    return (
      <div className="kap-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && appliancesData.length === 0) {
    return (
      <div className="kap-container">
        <div className="error-message">
          <p>{error}</p>
          <button
            onClick={fetchAppliances}
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="kap-container">
      <div className="kap-mobile-topbar">
        <h1 className="kap-page-title">
          Kitchen Appliances
        </h1>
      </div>

      <div className="kap-categories-row">
        {appliancesData.map(appliance => (
          <button
            key={appliance.id}
            className={`kap-cat-btn ${
              selectedAppliance === appliance.id
                ? 'active'
                : ''
            }`}
            onClick={() => {
              selectAppliance(appliance.id);
              setExpandedAppliance(appliance.id);
              setSidebarOpen(false);
            }}
          >
            {appliance.name}
          </button>
        ))}
      </div>

      <div
        className={`kap-sidebar-overlay${
          sidebarOpen ? ' visible' : ''
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="kap-layout">
        <aside
          className={`kap-sidebar${
            sidebarOpen ? ' open' : ''
          }`}
        >
          <div className="kap-sidebar-header">
            <h2 className="kap-sidebar-title">
              Kitchen Appliances
            </h2>
            <p className="kap-sidebar-subtitle">
              Select Appliance
            </p>
          </div>

          <div className="kap-appliances-list">
            {appliancesData.map(appliance => (
              <div
                key={appliance.id}
                className="kap-appliance-wrapper"
              >
                <div
                  className={`kap-appliance-item${
                    selectedAppliance === appliance.id
                      ? ' kap-active'
                      : ''
                  }${
                    expandedAppliance === appliance.id
                      ? ' kap-expanded'
                      : ''
                  }`}
                  onClick={() => {
                    selectAppliance(appliance.id);
                    setExpandedAppliance(
                      expandedAppliance === appliance.id
                        ? null
                        : appliance.id
                    );
                  }}
                >
                  <span className="kap-appliance-name">
                    {appliance.name}
                  </span>

                  <span className="kap-dropdown-arrow">
                    {expandedAppliance === appliance.id ? (
                      <ChevronDownIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </span>
                </div>

                {expandedAppliance === appliance.id &&
                  appliance.types.length > 0 && (
                    <div className="kap-types-list">
                      <div
                        className={`kap-type-item${
                          selectedAppliance ===
                            appliance.id &&
                          selectedType === 'all'
                            ? ' kap-type-selected'
                            : ''
                        }`}
                        onClick={event => {
                          event.stopPropagation();
                          selectAppliance(appliance.id);
                          setSelectedType('all');
                        }}
                      >
                        <span className="kap-type-name">
                          All Types
                        </span>
                      </div>

                      {appliance.types.map(type => (
                        <div
                          key={type}
                          className={`kap-type-item${
                            selectedAppliance ===
                              appliance.id &&
                            selectedType.toLowerCase() ===
                              type.toLowerCase()
                              ? ' kap-type-selected'
                              : ''
                          }`}
                          onClick={event => {
                            event.stopPropagation();
                            selectAppliance(appliance.id);
                            setSelectedType(type);
                          }}
                        >
                          <span className="kap-type-name">
                            {type}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </div>
        </aside>

        <main className="kap-main">
          <header className="kap-main-header">
            <div className="kap-header-content">
              <h1 className="kap-page-title desktop-title">
                Kitchen Appliances Guide
              </h1>

              <p className="kap-page-description">
                Browse appliances, compare brands, and find
                the perfect model for your home.
              </p>

              {error && (
                <p className="error-note">
                  {error}
                </p>
              )}
            </div>
          </header>

          {!selectedAppliance && (
            <div className="kap-welcome-screen">
              <div className="kap-welcome-icon">
                <ApplianceIcon />
              </div>

              <h2 className="kap-welcome-heading">
                Select an appliance from the sidebar
              </h2>

              <p className="kap-welcome-text">
                Each appliance includes brands, models,
                specifications, maintenance tips, and more.
              </p>

              <div className="kap-stats">
                <div className="kap-stat-card">
                  <span className="kap-stat-num">
                    {appliancesData.length}
                  </span>
                  <span className="kap-stat-label">
                    Appliances
                  </span>
                </div>

                <div className="kap-stat-card">
                  <span className="kap-stat-num">
                    {appliancesData.reduce(
                      (total, appliance) =>
                        total +
                        appliance.companies.length,
                      0
                    )}
                  </span>

                  <span className="kap-stat-label">
                    Brands
                  </span>
                </div>

                <div className="kap-stat-card">
                  <span className="kap-stat-num">
                    {appliancesData.reduce(
                      (total, appliance) =>
                        total +
                        appliance.companies.reduce(
                          (companyTotal, company) =>
                            companyTotal +
                            company.models.length,
                          0
                        ),
                      0
                    )}
                  </span>

                  <span className="kap-stat-label">
                    Models
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedAppliance &&
            !selectedCompany &&
            currentAppliance && (
              <div className="kap-companies-section">
                <div className="kap-section-intro">
                  <h2 className="kap-section-title">
                    {currentAppliance.name}
                  </h2>

                  <p className="kap-section-desc">
                    {currentAppliance.description}
                  </p>
                </div>

                <div className="kap-companies-grid">
                  {currentAppliance.companies.map(
                    company => (
                      <div
                        key={company.id}
                        className="kap-company-card"
                        onClick={() =>
                          selectCompany(company.id)
                        }
                      >
                        <div className="kap-company-card-top">
                          <h3 className="kap-company-name">
                            {company.name}
                          </h3>

                          <span className="kap-model-count-badge">
                            {company.models.length} models
                          </span>
                        </div>

                        <p className="kap-company-hint">
                          Tap to browse models →
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {selectedAppliance &&
            selectedCompany &&
            currentCompany &&
            currentAppliance && (
              <div className="kap-models-section">
                <div className="kap-models-section-header">
                  <div>
                    <h2 className="kap-section-title">
                      {currentCompany.name} —{' '}
                      {currentAppliance.name}
                    </h2>

                    <p className="kap-section-desc">
                      {currentAppliance.description}
                    </p>
                  </div>

                  <div className="kap-header-nav-btns">
                    <button
                      className="kap-nav-btn"
                      onClick={() =>
                        setSelectedCompany(null)
                      }
                    >
                      ← Change Brand
                    </button>

                    <button
                      className="kap-nav-btn kap-nav-btn--dark"
                      onClick={() => {
                        setSelectedAppliance(null);
                        setSelectedCompany(null);
                        setSelectedType('all');
                        setExpandedAppliance(null);
                      }}
                    >
                      ← Change Appliance
                    </button>
                  </div>
                </div>

                {currentAppliance.types.length > 0 && (
                  <div className="kap-type-tabs">
                    <button
                      className={`kap-type-tab${
                        selectedType === 'all'
                          ? ' kap-tab-active'
                          : ''
                      }`}
                      onClick={() =>
                        setSelectedType('all')
                      }
                    >
                      All Types
                    </button>

                    {currentAppliance.types.map(type => (
                      <button
                        key={type}
                        className={`kap-type-tab${
                          selectedType.toLowerCase() ===
                          type.toLowerCase()
                            ? ' kap-tab-active'
                            : ''
                        }`}
                        onClick={() =>
                          setSelectedType(type)
                        }
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
                        className={`kap-model-card ${getApplianceCardClass(
                          currentAppliance.name
                        )}`}
                        onClick={() =>
                          handleModelSelect(model)
                        }
                      >
                        <div
                          className="kap-card-image"
                          style={{
                            backgroundImage: `url(${
                              model.image ||
                              '/api/placeholder/120/120'
                            })`
                          }}
                        />

                        <div className="kap-card-content">
                          <div className="kap-card-top-row">
                            <h3 className="kap-card-title">
                              {model.name}
                            </h3>

                            <span className="kap-type-pill">
                              {model.type}
                            </span>
                          </div>

                          {model.capacity && (
                            <p className="kap-card-capacity">
                              {model.capacity}
                            </p>
                          )}

                          {model.price && (
                            <p className="kap-card-price">
                              {model.price}
                            </p>
                          )}

                          <div className="kap-card-features">
                            {model.features
                              .slice(0, 2)
                              .map((feature, index) => (
                                <span
                                  key={index}
                                  className="kap-feature-pill"
                                >
                                  {feature}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="kap-no-models">
                      <p>
                        No models for the selected type.
                      </p>

                      <button
                        className="kap-nav-btn"
                        onClick={() =>
                          setSelectedType('all')
                        }
                      >
                        Show All
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

          <div className="kap-back-section">
            <button
              className="kap-back-button"
              onClick={() => navigate('/guidance')}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Back to Guidance Page</span>
            </button>
          </div>
        </main>
      </div>

      {showModal && selectedModel && (
        <div
          className="kap-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="kap-modal"
            onClick={event =>
              event.stopPropagation()
            }
          >
            <button
              className="kap-modal-close"
              onClick={closeModal}
            >
              <FaTimes />
            </button>

            <div className="kap-modal-hero">
              <p className="kap-modal-hero-label">
                Kitchen Appliance
              </p>

              <h2 className="kap-modal-hero-title">
                {selectedModel.name}
              </h2>

              <p className="kap-modal-hero-subtitle">
                {currentCompany?.name} ·{' '}
                {selectedModel.type}
                {selectedModel.capacity
                  ? ` · ${selectedModel.capacity}`
                  : ''}
              </p>
            </div>

            <div className="kap-modal-inner">
              <div className="kap-modal-left">
                <div className="kap-about-row">
                  <div className="kap-about-text">
                    <div className="kap-msec">
                      <span className="kap-msec-label">
                        Product overview
                      </span>

                      <p className="kap-msec-text">
                        {selectedModel.bestFor &&
                          `Best for: ${selectedModel.bestFor}. `}

                        {selectedModel.estimatedConsumption &&
                          `Energy consumption: ${selectedModel.estimatedConsumption}. `}

                        {selectedModel.estimatedPowerConsumption &&
                          `Power: ${selectedModel.estimatedPowerConsumption}. `}

                        {selectedModel.estimatedGasConsumption &&
                          `Gas: ${selectedModel.estimatedGasConsumption}. `}

                        {selectedModel.capacity &&
                          `Capacity: ${selectedModel.capacity}. `}

                        {selectedModel.coolingCapacity &&
                          `Cooling capacity: ${selectedModel.coolingCapacity}. `}

                        {selectedModel.dryCapacity &&
                          `Dry capacity: ${selectedModel.dryCapacity}. `}

                        {selectedModel.hotWaterTemp &&
                          `Hot water: ${selectedModel.hotWaterTemp}. `}

                        {selectedModel.coldWaterTemp &&
                          `Cold inlet: ${selectedModel.coldWaterTemp}.`}
                      </p>
                    </div>
                  </div>

                  <div
                    className="kap-about-thumb"
                    style={{
                      backgroundImage: `url(${
                        selectedModel.image ||
                        '/api/placeholder/200/200'
                      })`
                    }}
                    onClick={() =>
                      openLightbox(
                        selectedModel.image ||
                          '/api/placeholder/200/200'
                      )
                    }
                  />
                </div>

                <hr className="kap-mdivider" />

                <div className="kap-features-info-row">
                  {selectedModel.features.length > 0 && (
                    <div className="kap-features-section">
                      <span className="kap-msec-label">
                        Key features
                      </span>

                      <div className="kap-uses-wrap">
                        {selectedModel.features.map(
                          (feature, index) => (
                            <div
                              key={index}
                              className="kap-use-tag"
                            >
                              <span className="kap-use-dot">
                                •
                              </span>
                              {feature}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  <div className="kap-quickinfo-section">
                    <span className="kap-msec-label">
                      Quick info
                    </span>

                    <div className="kap-quickinfo-badges">
                      {selectedModel.price && (
                        <div className="kap-info-badge">
                          <span className="kap-info-badge-icon">
                            <PriceIcon />
                          </span>

                          <div className="kap-info-badge-text">
                            <span className="kap-info-badge-label">
                              Price
                            </span>

                            <span className="kap-info-badge-value kap-price-value">
                              {selectedModel.price}
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedModel.capacity && (
                        <div className="kap-info-badge">
                          <span className="kap-info-badge-icon">
                            <CapacityIcon />
                          </span>

                          <div className="kap-info-badge-text">
                            <span className="kap-info-badge-label">
                              Capacity
                            </span>

                            <span className="kap-info-badge-value">
                              {selectedModel.capacity}
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedModel.estimatedConsumption && (
                        <div className="kap-info-badge">
                          <span className="kap-info-badge-icon">
                            <EnergyIcon />
                          </span>

                          <div className="kap-info-badge-text">
                            <span className="kap-info-badge-label">
                              Energy
                            </span>

                            <span className="kap-info-badge-value">
                              {
                                selectedModel.estimatedConsumption
                              }
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedModel.warranty && (
                        <div className="kap-info-badge">
                          <span className="kap-info-badge-icon">
                            <WarrantyIcon />
                          </span>

                          <div className="kap-info-badge-text">
                            <span className="kap-info-badge-label">
                              Warranty
                            </span>

                            <span className="kap-info-badge-value">
                              {selectedModel.warranty}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {Object.keys(
                  selectedModel.specifications
                ).length > 0 && (
                  <>
                    <hr className="kap-mdivider" />

                    <div className="kap-msec">
                      <span className="kap-msec-label">
                        Technical specifications
                      </span>

                      <div className="kap-specs-grid">
                        {Object.entries(
                          selectedModel.specifications
                        ).map(([key, value]) => (
                          <div
                            key={key}
                            className="kap-spec-card"
                          >
                            <span className="kap-spec-label">
                              {key}
                            </span>

                            <span className="kap-spec-value">
                              {String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {(selectedModel.usageGuide ||
                  selectedModel.maintenance) && (
                  <>
                    <hr className="kap-mdivider" />

                    <div className="kap-modal-two-col">
                      {selectedModel.usageGuide && (
                        <div className="kap-msec">
                          <span className="kap-msec-label">
                            Usage guide
                          </span>

                          <div className="kap-tip-card">
                            <span className="kap-tip-icon">
                              <CheckIcon />
                            </span>

                            <span className="kap-tip-txt">
                              {selectedModel.usageGuide}
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedModel.maintenance && (
                        <div className="kap-msec">
                          <span className="kap-msec-label">
                            Maintenance tips
                          </span>

                          <div className="kap-tip-card">
                            <span className="kap-tip-icon">
                              <WrenchIcon />
                            </span>

                            <span className="kap-tip-txt">
                              {selectedModel.maintenance}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {(selectedModel.installationTips ||
                  selectedModel.energySavingTips ||
                  selectedModel.safetyTips ||
                  selectedModel.cookingTips ||
                  selectedModel.washPrograms ||
                  selectedModel.placeSettings) && (
                  <>
                    <hr className="kap-mdivider" />

                    <div className="kap-extra-tips-grid">
                      {selectedModel.installationTips && (
                        <div className="kap-msec">
                          <span className="kap-msec-label">
                            Installation tips
                          </span>

                          <div className="kap-tip-card">
                            <span className="kap-tip-icon">
                              <InstallIcon />
                            </span>

                            <span className="kap-tip-txt">
                              {
                                selectedModel.installationTips
                              }
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedModel.energySavingTips && (
                        <div className="kap-msec">
                          <span className="kap-msec-label">
                            Energy saving tips
                          </span>

                          <div className="kap-tip-card">
                            <span className="kap-tip-icon">
                              <EnergyIcon />
                            </span>

                            <span className="kap-tip-txt">
                              {
                                selectedModel.energySavingTips
                              }
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedModel.safetyTips && (
                        <div className="kap-msec">
                          <span className="kap-msec-label">
                            Safety tips
                          </span>

                          <div className="kap-tip-card">
                            <span className="kap-tip-icon">
                              <WarningIcon />
                            </span>

                            <span className="kap-tip-txt">
                              {selectedModel.safetyTips}
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedModel.cookingTips && (
                        <div className="kap-msec">
                          <span className="kap-msec-label">
                            Cooking tips
                          </span>

                          <div className="kap-tip-card">
                            <span className="kap-tip-icon">
                              <CookIcon />
                            </span>

                            <span className="kap-tip-txt">
                              {selectedModel.cookingTips}
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedModel.washPrograms && (
                        <div className="kap-msec">
                          <span className="kap-msec-label">
                            Wash programs
                          </span>

                          <div className="kap-tip-card">
                            <span className="kap-tip-icon">
                              <CheckIcon />
                            </span>

                            <span className="kap-tip-txt">
                              {selectedModel.washPrograms}
                            </span>
                          </div>
                        </div>
                      )}

                      {selectedModel.placeSettings && (
                        <div className="kap-msec">
                          <span className="kap-msec-label">
                            Place settings
                          </span>

                          <div className="kap-tip-card">
                            <span className="kap-tip-icon">
                              <CheckIcon />
                            </span>

                            <span className="kap-tip-txt">
                              {selectedModel.placeSettings}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {selectedModel.troubleshooting.length >
                  0 && (
                  <>
                    <hr className="kap-mdivider" />

                    <div className="kap-msec">
                      <span className="kap-msec-label">
                        Troubleshooting guide
                      </span>

                      <div className="kap-steps-list">
                        {selectedModel.troubleshooting.map(
                          (tip, index) => (
                            <div
                              key={index}
                              className="kap-step-card"
                            >
                              <span className="kap-step-num">
                                {index + 1}
                              </span>

                              <span className="kap-step-txt">
                                {typeof tip === 'object'
                                  ? tip.description ||
                                    JSON.stringify(tip)
                                  : tip}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="kap-modal-right">
                <div
                  className="kap-modal-right-image"
                  style={{
                    backgroundImage: `url(${
                      selectedModel.image ||
                      '/api/placeholder/400/400'
                    })`
                  }}
                  onClick={() =>
                    openLightbox(
                      selectedModel.image ||
                        '/api/placeholder/400/400'
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div
          className="kap-lightbox-overlay"
          onClick={closeLightbox}
        >
          <button
            className="kap-lightbox-close"
            onClick={closeLightbox}
          >
            ×
          </button>

          <img
            className="kap-lightbox-image"
            src={lightboxImage}
            alt="Full view"
            onClick={event =>
              event.stopPropagation()
            }
          />
        </div>
      )}
    </div>
  );
};

export default KitchenAppliancesPage;
