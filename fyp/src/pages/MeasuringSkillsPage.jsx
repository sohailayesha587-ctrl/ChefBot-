import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MeasuringSkillsPage.css';

const KNOWN_KEYS = [
  '_id', 'id', 'image', 'title', 'name', 'tagline', 'fullDesc', 'description',
  'keyUses', 'keyFeatures', 'bestFor', 'type', 'material', 'price', 'priceRange',
  'durability', 'pros', 'cons', 'care', 'size', 'sizes', 'capacity', 'diameter',
  'length', 'properUsage', 'steps', 'methods', 'tips', 'commonMistakes', 'types',
  'usage', 'commonConversions', 'criticalRules', 'category', 'subCategory',
  'subcategory', 'items', 'commonItems', 'content'
];

const META_KEY_PATTERN = /^_|id$|status|slug|version|by$|by[A-Z]|at$|At$|date|Date|filterTags|isPublished|isActive|isDeleted|views|author|__v/;

const isMetaKey = (key) => META_KEY_PATTERN.test(key);

const toLabel = (key) => {
  const spaced = key.replace(/([a-z])([A-Z])/g, '$1 $2');
  return spaced.replace(/^./, c => c.toUpperCase()).toUpperCase();
};

const toStringValue = (value) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') {
    if (value.name && value.description) return `${value.name}: ${value.description}`;
    return value.name || value.description || '';
  }
  return String(value);
};

const buildExtraSections = (raw) => {
  const sections = [];

  Object.keys(raw).forEach(key => {
    if (KNOWN_KEYS.includes(key)) return;
    if (isMetaKey(key)) return;

    const value = raw[key];
    if (value === null || value === undefined) return;

    let items = [];

    if (Array.isArray(value)) {
      items = value.map(toStringValue).filter(Boolean);
    } else if (typeof value === 'string' && value.trim()) {
      items = [value];
    }

    if (items.length > 0) {
      sections.push({ key, label: toLabel(key), items });
    }
  });

  return sections;
};

const MeasuringSkillsPage = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [measuringTools, setMeasuringTools] = useState([]);
  const [measuringTechniques, setMeasuringTechniques] = useState([]);
  const [estimationSkills, setEstimationSkills] = useState([]);
  const [conversionSkills, setConversionSkills] = useState([]);
  const [precisionSkills, setPrecisionSkills] = useState([]);

  const categories = [
    { id: 'tools', name: 'Tools & Equipment', subCategory: 'measuring-tools' },
    { id: 'techniques', name: 'Measuring Techniques', subCategory: 'measuring-techniques' },
    { id: 'estimation', name: 'Estimation Skills', subCategory: 'estimation' },
    { id: 'conversions', name: 'Conversion Skills', subCategory: 'conversions' },
    { id: 'precision', name: 'Precision Skills', subCategory: 'precision' }
  ];

  const mergeContent = (guide) => {
    let content = {};

    if (typeof guide.content === 'string' && guide.content.startsWith('{')) {
      try {
        content = JSON.parse(guide.content);
      } catch (e) {
        content = {};
      }
    } else if (typeof guide.content === 'object' && guide.content !== null) {
      content = guide.content;
    }

    const raw = { ...guide, ...content };

    const merged = {
      id: guide._id,
      image: guide.image || content.image || '',
      name: guide.title || content.name || guide.name || '',
      tagline: content.tagline || guide.tagline || guide.title || '',
      fullDesc: content.fullDesc || guide.fullDesc || '',
      description: content.description || guide.description || '',
      keyUses: content.keyUses || guide.keyUses || [],
      keyFeatures: content.keyFeatures || guide.keyFeatures || [],
      bestFor: content.bestFor || guide.bestFor || '',
      type: content.type || guide.type || '',
      material: content.material || guide.material || '',
      price: content.price || guide.price || '',
      priceRange: content.priceRange || guide.priceRange || '',
      durability: content.durability || guide.durability || '',
      pros: content.pros || guide.pros || [],
      cons: content.cons || guide.cons || [],
      care: content.care || guide.care || '',
      size: content.size || guide.size || '',
      sizes: content.sizes || guide.sizes || '',
      capacity: content.capacity || guide.capacity || '',
      diameter: content.diameter || guide.diameter || '',
      length: content.length || guide.length || '',
      properUsage: content.properUsage || guide.properUsage || content.steps || content.methods || [],
      tips: content.tips || guide.tips || '',
      commonMistakes: content.commonMistakes || guide.commonMistakes || [],
      types: content.types || guide.types || [],
      usage: content.usage || guide.usage || [],
      commonConversions: content.commonConversions || guide.commonConversions || [],
      criticalRules: content.criticalRules || guide.criticalRules || [],
      category: content.category || guide.category || '',
      items: content.items || guide.items || [],
      commonItems: content.commonItems || guide.commonItems || [],
      subcategory: content.subcategory || guide.subcategory || guide.subCategory || ''
    };

    merged.extraSections = buildExtraSections(raw);

    if (window.location.hostname === 'localhost') {
      console.log('mergeContent debug for: ' + guide.title);
      console.log(JSON.stringify({ rawContentType: typeof guide.content, parsedContent: content, extraSections: merged.extraSections }, null, 2));
    }

    return merged;
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/beginners-guides', {
        params: { category: 'measuring-skills' }
      });

      const allGuides = response.data.guides || [];

      const tools = allGuides.filter(g => g.subCategory === 'measuring-tools' || g.subcategory === 'measuring-tools');
      const techniques = allGuides.filter(g => g.subCategory === 'measuring-techniques' || g.subcategory === 'measuring-techniques');
      const estimation = allGuides.filter(g => g.subCategory === 'estimation' || g.subcategory === 'estimation');
      const conversions = allGuides.filter(g => g.subCategory === 'conversions' || g.subcategory === 'conversions');
      const precision = allGuides.filter(g => g.subCategory === 'precision' || g.subcategory === 'precision');

      setMeasuringTools(tools.map(mergeContent));
      setMeasuringTechniques(techniques.map(mergeContent));
      setEstimationSkills(estimation.map(mergeContent));
      setConversionSkills(conversions.map(mergeContent));
      setPrecisionSkills(precision.map(mergeContent));

      if (tools.length > 0) {
        setSelectedTool({ id: 'tools', name: 'Tools & Equipment', isCategory: true });
      } else if (techniques.length > 0) {
        setSelectedTool({ id: 'techniques', name: 'Measuring Techniques', isCategory: true });
      } else if (estimation.length > 0) {
        setSelectedTool({ id: 'estimation', name: 'Estimation Skills', isCategory: true });
      } else if (conversions.length > 0) {
        setSelectedTool({ id: 'conversions', name: 'Conversion Skills', isCategory: true });
      } else if (precision.length > 0) {
        setSelectedTool({ id: 'precision', name: 'Precision Skills', isCategory: true });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load measuring skills');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentItems = () => {
    if (!selectedTool) return [];

    switch (selectedTool.name) {
      case 'Tools & Equipment':
        return measuringTools;
      case 'Measuring Techniques':
        return measuringTechniques;
      case 'Estimation Skills':
        return estimationSkills;
      case 'Conversion Skills':
        return conversionSkills;
      case 'Precision Skills':
        return precisionSkills;
      default:
        return [];
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedTool({ id: category.id, name: category.name, isCategory: true });
    setSidebarOpen(false);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    setSidebarOpen(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const cleanText = (text) => {
    if (!text) return '';
    return String(text).replace(/\\n/g, ' ').replace(/\\"/g, '"').replace(/\\/g, '');
  };

  const getValue = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') {
      return value.name || value.description || '';
    }
    return String(value);
  };

  const getImage = (item) => {
    const image = item?.image || '';

    if (!image) {
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }

    if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/')) {
      return image;
    }

    return `https://chefbot.pk/${image}`;
  };

  if (loading) {
    return (
      <div className="msp-container">
        <div className="loading-spinner">Loading measuring skills...</div>
      </div>
    );
  }

  const currentItems = getCurrentItems();

  return (
    <div className="msp-container">
      <div className="msp-mobile-topbar">
        <button
          className={`msp-hamburger ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="msp-page-title">Measuring Skills</h1>
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
              {categories.map(category => {
                let hasItems = false;

                if (category.id === 'tools') hasItems = measuringTools.length > 0;
                if (category.id === 'techniques') hasItems = measuringTechniques.length > 0;
                if (category.id === 'estimation') hasItems = estimationSkills.length > 0;
                if (category.id === 'conversions') hasItems = conversionSkills.length > 0;
                if (category.id === 'precision') hasItems = precisionSkills.length > 0;

                if (!hasItems) return null;

                return (
                  <li
                    key={category.id}
                    className={`msp-category-item${selectedTool?.name === category.name ? ' msp-active' : ''}`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span className="msp-category-name">{category.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="msp-main">
          {error ? (
            <div className="msp-error-container">
              <div className="msp-error-icon">🔒</div>
              <h2>Authentication Required</h2>
              <p>{error}</p>
              <button className="msp-login-btn" onClick={() => navigate('/login')}>
                Go to Login
              </button>
            </div>
          ) : selectedTool ? (
            <>
              <header className="msp-main-header">
                <h1 className="msp-page-title">{selectedTool.name}</h1>
                <p className="msp-page-description">
                  {selectedTool.tagline || 'Explore our measuring skills and kitchen measurement essentials'}
                </p>
              </header>

              <div className="msp-content-area">
                <div className="msp-items-grid">
                  {currentItems.length > 0 ? (
                    currentItems.map(item => (
                      <div key={item.id} className="msp-card" onClick={() => openModal(item)}>
                        <div
                          className="msp-card-image"
                          style={{ backgroundImage: `url(${getImage(item)})` }}
                        />
                        <div className="msp-card-content">
                          <h4 className="msp-card-title">{item.name}</h4>
                          <p className="msp-card-sub">
                            {item.tagline || item.bestFor || 'Measuring Essential'}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="msp-empty-state">
                      <p>No items found in this category.</p>
                      <p className="msp-empty-sub">Please check back later.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="msp-loading">Loading...</div>
          )}

          <div className="msp-back-section">
            <button className="msp-back-button" onClick={() => navigate('/guidance')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {showModal && selectedItem && (
        <div className="msp-modal-overlay" onClick={closeModal}>
          <div className="msp-modal" onClick={e => e.stopPropagation()}>
            <button className="msp-modal-close" onClick={closeModal}>×</button>

            <div className="msp-modal-hero">
              <div className="msp-modal-hero-label">MEASURING SKILL</div>
              <h2 className="msp-modal-hero-title">{selectedItem.name}</h2>
              {selectedItem.tagline && (
                <p className="msp-modal-hero-subtitle">{selectedItem.tagline}</p>
              )}
            </div>

            <div className="msp-modal-inner">
              <div className="msp-modal-left">
                {(selectedItem.fullDesc || selectedItem.description) && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">ABOUT THIS SKILL</div>
                      <p className="msp-msec-text">
                        {cleanText(selectedItem.fullDesc || selectedItem.description)}
                      </p>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.bestFor && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">BEST FOR</div>
                      <div className="msp-best-badge">{selectedItem.bestFor}</div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {(selectedItem.keyFeatures?.length > 0 || selectedItem.keyUses?.length > 0) && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">KEY FEATURES</div>
                      <div className="msp-uses-wrap">
                        {(selectedItem.keyFeatures?.length ? selectedItem.keyFeatures : selectedItem.keyUses).map((feature, idx) => (
                          <div key={idx} className="msp-use-tag">{getValue(feature)}</div>
                        ))}
                      </div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.properUsage?.length > 0 && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">PROPER USAGE</div>
                      <div className="msp-steps-list">
                        {selectedItem.properUsage.map((step, idx) => (
                          <div key={idx} className="msp-step-card">
                            <span className="msp-step-num">{idx + 1}</span>
                            <span className="msp-step-txt">{getValue(step)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.tips && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">TIPS</div>
                      <div className="msp-care-card">{getValue(selectedItem.tips)}</div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.commonMistakes?.length > 0 && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">COMMON MISTAKES</div>
                      <div className="msp-mistakes-list">
                        {selectedItem.commonMistakes.map((mistake, idx) => (
                          <div key={idx} className="msp-mistake-card">
                            <span className="msp-mistake-icon">!</span>
                            <span className="msp-tip-txt">{getValue(mistake)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.types?.length > 0 && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">TYPES</div>
                      <div className="msp-types-grid">
                        {selectedItem.types.map((type, idx) => (
                          <div key={idx} className="msp-type-card">
                            <h4>{getValue(type.name)}</h4>
                            {type.description && <p>{getValue(type.description)}</p>}
                            {type.capacity && <p><strong>Capacity:</strong> {getValue(type.capacity)}</p>}
                            {type.sizes && <p><strong>Sizes:</strong> {getValue(type.sizes)}</p>}
                            {type.bestFor && <p><strong>Best For:</strong> {getValue(type.bestFor)}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.usage?.length > 0 && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">USAGE</div>
                      <div className="msp-uses-wrap">
                        {selectedItem.usage.map((usage, idx) => (
                          <div key={idx} className="msp-use-tag">{getValue(usage)}</div>
                        ))}
                      </div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.commonConversions?.length > 0 && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">COMMON CONVERSIONS</div>
                      <div className="msp-conversions-grid">
                        {selectedItem.commonConversions.map((conversion, idx) => (
                          <div key={idx} className="msp-conversion-box">{getValue(conversion)}</div>
                        ))}
                      </div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.criticalRules?.length > 0 && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">CRITICAL RULES</div>
                      <div className="msp-critical-rules-grid">
                        {selectedItem.criticalRules.map((rule, idx) => (
                          <div key={idx} className="msp-critical-rule-box">{getValue(rule)}</div>
                        ))}
                      </div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {selectedItem.extraSections?.map(section => (
                  <React.Fragment key={section.key}>
                    <div className="msp-msec">
                      <div className="msp-msec-label">{section.label}</div>
                      {section.items.length === 1 ? (
                        <div className="msp-care-card">{section.items[0]}</div>
                      ) : (
                        <div className="msp-uses-wrap">
                          {section.items.map((line, idx) => (
                            <div key={idx} className="msp-use-tag">{line}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <hr className="msp-mdivider" />
                  </React.Fragment>
                ))}

                {(selectedItem.material || selectedItem.price || selectedItem.priceRange ||
                  selectedItem.durability || selectedItem.size || selectedItem.capacity ||
                  selectedItem.diameter || selectedItem.length) && (
                  <>
                    <div className="msp-msec">
                      <div className="msp-msec-label">SPECIFICATIONS</div>
                      <div className="msp-specs-grid">
                        {selectedItem.material && (
                          <div className="msp-spec-item"><strong>Material:</strong> {selectedItem.material}</div>
                        )}
                        {selectedItem.price && (
                          <div className="msp-spec-item"><strong>Price:</strong> {selectedItem.price}</div>
                        )}
                        {selectedItem.priceRange && (
                          <div className="msp-spec-item"><strong>Price Range:</strong> {selectedItem.priceRange}</div>
                        )}
                        {selectedItem.durability && (
                          <div className="msp-spec-item"><strong>Durability:</strong> {selectedItem.durability}</div>
                        )}
                        {selectedItem.size && (
                          <div className="msp-spec-item"><strong>Size:</strong> {selectedItem.size}</div>
                        )}
                        {selectedItem.capacity && (
                          <div className="msp-spec-item"><strong>Capacity:</strong> {selectedItem.capacity}</div>
                        )}
                        {selectedItem.diameter && (
                          <div className="msp-spec-item"><strong>Diameter:</strong> {selectedItem.diameter}</div>
                        )}
                        {selectedItem.length && (
                          <div className="msp-spec-item"><strong>Length:</strong> {selectedItem.length}</div>
                        )}
                      </div>
                    </div>
                    <hr className="msp-mdivider" />
                  </>
                )}

                {(selectedItem.pros?.length > 0 || selectedItem.cons?.length > 0) && (
                  <div className="msp-modal-two-col">
                    {selectedItem.pros?.length > 0 && (
                      <div className="msp-msec">
                        <div className="msp-msec-label">PROS</div>
                        {selectedItem.pros.map((pro, idx) => (
                          <div key={idx} className="msp-pro-card">{getValue(pro)}</div>
                        ))}
                      </div>
                    )}

                    {selectedItem.cons?.length > 0 && (
                      <div className="msp-msec">
                        <div className="msp-msec-label">CONS</div>
                        {selectedItem.cons.map((con, idx) => (
                          <div key={idx} className="msp-con-card">{getValue(con)}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedItem.care && (
                  <div className="msp-msec">
                    <div className="msp-msec-label">CARE INSTRUCTIONS</div>
                    <div className="msp-care-card">{getValue(selectedItem.care)}</div>
                  </div>
                )}
              </div>

              <div className="msp-modal-right">
                <div
                  className="msp-modal-right-image"
                  style={{ backgroundImage: `url(${getImage(selectedItem)})` }}
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