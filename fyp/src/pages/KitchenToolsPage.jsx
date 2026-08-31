import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './KitchenToolsPage.css';

const KitchenToolsPage = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState(null);
  const [cookwareTab, setCookwareTab] = useState('types');
  const [crockeryTab, setCrockeryTab] = useState('dining');
  const [servingTab, setServingTab] = useState('utensils');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const [kitchenEssentials, setKitchenEssentials] = useState([]);
  const [knivesData, setKnivesData] = useState([]);
  const [cuttingBoardTypes, setCuttingBoardTypes] = useState([]);
  const [mixingBowlTypes, setMixingBowlTypes] = useState([]);
  const [utensilItems, setUtensilItems] = useState([]);
  const [cookwareTypes, setCookwareTypes] = useState([]);
  const [cookwareMaterials, setCookwareMaterials] = useState([]);
  const [crockeryItems, setCrockeryItems] = useState([]);
  const [cutleryItems, setCutleryItems] = useState([]);

  const [servingUtensils, setServingUtensils] = useState([]);
  const [servingCutlery, setServingCutlery] = useState([]);
  const [servingBowls, setServingBowls] = useState([]);
  const [servingPlatters, setServingPlatters] = useState([]);
  const [servingGravy, setServingGravy] = useState([]);
  const [servingAccessories, setServingAccessories] = useState([]);

  const mergeContent = (guide) => {
    let content = {};
    
    if (typeof guide.content === 'string' && guide.content.startsWith('{')) {
      try {
        content = JSON.parse(guide.content);
      } catch(e) {
        content = {};
      }
    } else if (typeof guide.content === 'object' && guide.content !== null) {
      content = guide.content;
    }
    
    return {
      id: guide._id,
      image: guide.image || content.image || '',
      name: guide.title || content.name || '',
      tagline: content.tagline || guide.tagline || '',
      fullDesc: content.fullDesc || guide.fullDesc || '',
      description: content.description || guide.description || '',
      keyUses: content.keyUses || guide.keyUses || [],
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
      bladeType: content.bladeType || guide.bladeType || '',
      utensilType: content.utensilType || guide.utensilType || '',
      cookwareType: content.cookwareType || guide.cookwareType || '',
      crockeryType: content.crockeryType || guide.crockeryType || '',
      cutleryType: content.cutleryType || guide.cutleryType || '',
      servingType: content.servingType || guide.servingType || '',
      materialType: content.materialType || guide.materialType || '',
      category: content.category || guide.category || '',
      items: content.items || guide.items || [],
      commonItems: content.commonItems || guide.commonItems || [],
      subcategory: content.subcategory || guide.subcategory || ''
    };
  };

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
      const response = await axios.get('/api/beginners-guides', {
        params: { category: 'kitchen-tools' }
      });

      const allGuides = response.data.guides || [];

      const essentials = allGuides.filter(g => g.subCategory === 'essentials' || g.subCategory === 'kitchen-essentials');
      const knives = allGuides.filter(g => g.subCategory === 'knives');
      const boards = allGuides.filter(g => g.subCategory === 'cutting-boards');
      const bowls = allGuides.filter(g => g.subCategory === 'mixing-bowls');
      const utensils = allGuides.filter(g => g.subCategory === 'utensils');
      const cookware = allGuides.filter(g => g.subCategory === 'cookware');
      const cookwareMat = allGuides.filter(g => g.subCategory === 'cookware-materials');
      const crockery = allGuides.filter(g => g.subCategory === 'crockery');
      const cutlery = allGuides.filter(g => g.subCategory === 'cutlery');
      const servingware = allGuides.filter(g => g.subCategory === 'servingware');

      setKitchenEssentials(essentials.map(mergeContent));
      setKnivesData(knives.map(mergeContent));
      setCuttingBoardTypes(boards.map(mergeContent));
      setMixingBowlTypes(bowls.map(mergeContent));
      setUtensilItems(utensils.map(mergeContent));
      setCookwareTypes(cookware.map(mergeContent));
      setCookwareMaterials(cookwareMat.map(mergeContent));
      setCrockeryItems(crockery.map(mergeContent));
      setCutleryItems(cutlery.map(mergeContent));

      setServingUtensils(servingware.filter(g => g.content?.subcategory === 'utensils' || g.title?.toLowerCase().includes('utensils')).map(mergeContent));
      setServingCutlery(servingware.filter(g => g.content?.subcategory === 'cutlery' || g.title?.toLowerCase().includes('cutlery set')).map(mergeContent));
      setServingBowls(servingware.filter(g => g.content?.subcategory === 'bowls' || g.title?.toLowerCase().includes('bowls')).map(mergeContent));
      setServingPlatters(servingware.filter(g => g.content?.subcategory === 'platters-and-trays' || g.title?.toLowerCase().includes('platters')).map(mergeContent));
      setServingGravy(servingware.filter(g => g.content?.subcategory === 'gravy-and-sauceware' || g.title?.toLowerCase().includes('gravy')).map(mergeContent));
      setServingAccessories(servingware.filter(g => g.content?.subcategory === 'accessories' || g.title?.toLowerCase().includes('accessories')).map(mergeContent));

      if (essentials.length > 0 && !selectedTool) {
        setSelectedTool(mergeContent(essentials[0]));
      } else if (knives.length > 0 && !selectedTool) {
        setSelectedTool({ id: 'knives', name: 'Knives', isCategory: true });
      }

      if (allGuides.length === 0) {
        setError('No kitchen tools data found in database.');
      }

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data from server.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentItems = () => {
    if (!selectedTool) return [];
    const name = selectedTool.name;
    if (name === 'Knives') return knivesData;
    if (name === 'Cutting Boards') return cuttingBoardTypes;
    if (name === 'Mixing Bowls') return mixingBowlTypes;
    if (name === 'Utensils') return utensilItems;
    if (name === 'Crockery') return getFilteredCrockery();
    if (name === 'Cutlery') return cutleryItems;
    if (name === 'Cookware') return cookwareTab === 'types' ? cookwareTypes : cookwareMaterials;
    if (name === 'Servingware') {
      if (servingTab === 'utensils') return servingUtensils;
      if (servingTab === 'cutlery') return servingCutlery;
      if (servingTab === 'bowls') return servingBowls;
      if (servingTab === 'platters') return servingPlatters;
      if (servingTab === 'gravy') return servingGravy;
      if (servingTab === 'accessories') return servingAccessories;
      return [];
    }
    return kitchenEssentials.filter(item => item.name === name);
  };

  const getFilteredCrockery = () => {
    if (crockeryTab === 'dining')
      return crockeryItems.filter(i => {
        const n = i.name?.toLowerCase() || '';
        return n.includes('plate') || n.includes('bowl') || n.includes('dinner');
      });
    if (crockeryTab === 'tea')
      return crockeryItems.filter(i => {
        const n = i.name?.toLowerCase() || '';
        return n.includes('cup') || n.includes('mug') || n.includes('tea') || n.includes('coffee');
      });
    if (crockeryTab === 'water')
      return crockeryItems.filter(i => {
        const n = i.name?.toLowerCase() || '';
        return n.includes('glass') || n.includes('water') || n.includes('jug') || n.includes('pitcher');
      });
    return crockeryItems;
  };

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setSidebarOpen(false);
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedTool({ id: categoryName.toLowerCase(), name: categoryName, isCategory: true });
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

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const cleanText = (text) => {
    if (!text) return '';
    return text.replace(/\\n/g, ' ').replace(/\\"/g, '"').replace(/\\/g, '');
  };

  const LightbulbIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 19.5H14.5M9.5 21.5H14.5M12 2.5C8.5 2.5 5.5 5.2 5.5 9C5.5 11.5 7 13.5 8.5 15C9.5 16 10 17 10 18H14C14 17 14.5 16 15.5 15C17 13.5 18.5 11.5 18.5 9C18.5 5.2 15.5 2.5 12 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const WarningIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const ToolIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  if (loading) {
    return (
      <div className="ktp-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && getCurrentItems().length === 0) {
    return (
      <div className="ktp-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchAllData} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentItems = getCurrentItems();

  return (
    <div className="ktp-container">
      <div className="ktp-mobile-topbar">
        <h1 className="ktp-page-title">Kitchen Tools</h1>
      </div>

      <div className="ktp-categories-row">
        {kitchenEssentials.map(tool => (
          <button
            key={tool.id}
            className={`ktp-cat-btn ${selectedTool?.id === tool.id ? 'active' : ''}`}
            onClick={() => { handleToolSelect(tool); }}
          >
            {tool.name}
          </button>
        ))}
        {['Knives', 'Cutting Boards', 'Mixing Bowls', 'Utensils', 'Cookware', 'Crockery', 'Cutlery', 'Servingware'].map(cat => {
          let hasItems = false;
          if (cat === 'Knives') hasItems = knivesData.length > 0;
          else if (cat === 'Cutting Boards') hasItems = cuttingBoardTypes.length > 0;
          else if (cat === 'Mixing Bowls') hasItems = mixingBowlTypes.length > 0;
          else if (cat === 'Utensils') hasItems = utensilItems.length > 0;
          else if (cat === 'Cookware') hasItems = cookwareTypes.length > 0;
          else if (cat === 'Crockery') hasItems = crockeryItems.length > 0;
          else if (cat === 'Cutlery') hasItems = cutleryItems.length > 0;
          else if (cat === 'Servingware') hasItems = servingUtensils.length > 0;
          if (!hasItems) return null;
          return (
            <button
              key={cat}
              className={`ktp-cat-btn ${selectedTool?.name === cat ? 'active' : ''}`}
              onClick={() => { handleCategorySelect(cat); }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div
        className={`ktp-sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="ktp-layout">
        <aside className={`ktp-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="ktp-sidebar-header">
            <h2 className="ktp-sidebar-title">Kitchen Tools</h2>
            <p className="ktp-sidebar-subtitle">Essential Equipment</p>
          </div>
          <div className="ktp-sidebar-tools">
            <ul className="ktp-tools-list">
              {kitchenEssentials.map(tool => (
                <li
                  key={tool.id}
                  className={`ktp-tool-list-item${selectedTool?.id === tool.id ? ' ktp-active' : ''}`}
                  onClick={() => handleToolSelect(tool)}
                >
                  <span className="ktp-tool-list-name">{tool.name}</span>
                </li>
              ))}

              {kitchenEssentials.length > 0 && (
                <li className="ktp-tool-list-divider">Categories</li>
              )}

              {['Knives', 'Cutting Boards', 'Mixing Bowls', 'Utensils', 'Cookware', 'Crockery', 'Cutlery', 'Servingware'].map(cat => {
                let hasItems = false;
                if (cat === 'Knives') hasItems = knivesData.length > 0;
                else if (cat === 'Cutting Boards') hasItems = cuttingBoardTypes.length > 0;
                else if (cat === 'Mixing Bowls') hasItems = mixingBowlTypes.length > 0;
                else if (cat === 'Utensils') hasItems = utensilItems.length > 0;
                else if (cat === 'Cookware') hasItems = cookwareTypes.length > 0;
                else if (cat === 'Crockery') hasItems = crockeryItems.length > 0;
                else if (cat === 'Cutlery') hasItems = cutleryItems.length > 0;
                else if (cat === 'Servingware') hasItems = servingUtensils.length > 0;
                if (!hasItems) return null;
                return (
                  <li
                    key={cat}
                    className={`ktp-tool-list-item${selectedTool?.name === cat ? ' ktp-active' : ''}`}
                    onClick={() => handleCategorySelect(cat)}
                  >
                    <span className="ktp-tool-list-name">{cat}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="ktp-main">
          <header className="ktp-main-header">
            <div className="ktp-header-content">
              <h1 className="ktp-page-title desktop-title">{selectedTool?.name || 'Kitchen Tools'}</h1>
              <p className="ktp-page-description">
                {selectedTool?.tagline || 'Explore our collection of kitchen tools'}
              </p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          {selectedTool && (
            <div className="ktp-content-area">
              {selectedTool.name === 'Cookware' && (
                <div className="ktp-tabs">
                  <button className={`ktp-tab${cookwareTab === 'types' ? ' ktp-tab-active' : ''}`} onClick={() => setCookwareTab('types')}>
                    Cookware Types ({cookwareTypes.length})
                  </button>
                  <button className={`ktp-tab${cookwareTab === 'materials' ? ' ktp-tab-active' : ''}`} onClick={() => setCookwareTab('materials')}>
                    Materials ({cookwareMaterials.length})
                  </button>
                </div>
              )}

              {selectedTool.name === 'Crockery' && (
                <div className="ktp-tabs">
                  <button className={`ktp-tab${crockeryTab === 'dining' ? ' ktp-tab-active' : ''}`} onClick={() => setCrockeryTab('dining')}>Dining</button>
                  <button className={`ktp-tab${crockeryTab === 'tea' ? ' ktp-tab-active' : ''}`} onClick={() => setCrockeryTab('tea')}>Tea & Coffee</button>
                  <button className={`ktp-tab${crockeryTab === 'water' ? ' ktp-tab-active' : ''}`} onClick={() => setCrockeryTab('water')}>Water & Drinks</button>
                </div>
              )}

              {selectedTool.name === 'Servingware' && (
                <div className="ktp-tabs">
                  <button className={`ktp-tab${servingTab === 'utensils' ? ' ktp-tab-active' : ''}`} onClick={() => setServingTab('utensils')}>Utensils ({servingUtensils.length})</button>
                  <button className={`ktp-tab${servingTab === 'cutlery' ? ' ktp-tab-active' : ''}`} onClick={() => setServingTab('cutlery')}>Cutlery ({servingCutlery.length})</button>
                  <button className={`ktp-tab${servingTab === 'bowls' ? ' ktp-tab-active' : ''}`} onClick={() => setServingTab('bowls')}>Bowls ({servingBowls.length})</button>
                  <button className={`ktp-tab${servingTab === 'platters' ? ' ktp-tab-active' : ''}`} onClick={() => setServingTab('platters')}>Platters ({servingPlatters.length})</button>
                  <button className={`ktp-tab${servingTab === 'gravy' ? ' ktp-tab-active' : ''}`} onClick={() => setServingTab('gravy')}>Gravy ({servingGravy.length})</button>
                  <button className={`ktp-tab${servingTab === 'accessories' ? ' ktp-tab-active' : ''}`} onClick={() => setServingTab('accessories')}>Accessories ({servingAccessories.length})</button>
                </div>
              )}

              <div className="ktp-items-grid-section">
                {currentItems.length === 0 ? (
                  <div className="ktp-empty-state">
                    No items found in this category.
                  </div>
                ) : (
                  <div className="ktp-items-grid">
                    {currentItems.map(item => (
                      <div key={item.id} className="ktp-item-card" onClick={() => openModal(item)}>
                        <div
                          className="ktp-card-image"
                          style={{ backgroundImage: `url(${item.image || '/api/placeholder/120/120'})` }}
                        />
                        <div className="ktp-card-content">
                          <h3 className="ktp-card-title">{item.name}</h3>
                          <p className="ktp-card-description">{item.tagline || item.material || item.bestFor || 'Kitchen Essential'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="ktp-back-section">
            <button
              className="ktp-back-button"
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

      {showModal && selectedItem && (
        <div className="ktp-modal-overlay" onClick={closeModal}>
          <div className="ktp-modal" onClick={e => e.stopPropagation()}>
            <button className="ktp-modal-close" onClick={closeModal}>×</button>

            <div className="ktp-modal-hero">
              <p className="ktp-modal-hero-label">Kitchen Tool</p>
              <h2 className="ktp-modal-hero-title">{selectedItem.name}</h2>
              <p className="ktp-modal-hero-subtitle">{selectedItem.tagline || selectedItem.name}</p>
            </div>

            <div className="ktp-modal-inner">
              <div className="ktp-modal-left">
                <div className="ktp-about-row">
                  <div className="ktp-about-text">
                    {(selectedItem.fullDesc || selectedItem.description) && (
                      <div className="ktp-msec">
                        <span className="ktp-msec-label">About this tool</span>
                        <p className="ktp-msec-text">{cleanText(selectedItem.fullDesc || selectedItem.description)}</p>
                      </div>
                    )}
                  </div>
                  <div
                    className="ktp-about-thumb"
                    style={{ backgroundImage: `url(${selectedItem.image || '/api/placeholder/200/200'})` }}
                    onClick={() => openLightbox(selectedItem.image || '/api/placeholder/200/200')}
                  />
                </div>

                <hr className="ktp-mdivider" />

                <div className="ktp-uses-badge-row">
                  <div className="ktp-uses-section">
                    {selectedItem.keyUses?.length > 0 && (
                      <>
                        <span className="ktp-msec-label">Common Uses</span>
                        <div className="ktp-uses-wrap">
                          {selectedItem.keyUses.map((use, idx) => (
                            <div key={idx} className="ktp-use-tag">
                              <span className="ktp-use-dot">•</span>
                              {use}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="ktp-badge-section">
                    <span className="ktp-msec-label">Category</span>
                    <div className="ktp-category-badge">
                      <span className="ktp-category-badge-icon"><ToolIcon /></span>
                      <span className="ktp-category-badge-value">{selectedTool?.name || 'Kitchen Tool'}</span>
                    </div>
                  </div>
                </div>

                <hr className="ktp-mdivider" />

                {selectedItem.bestFor && (
                  <>
                    <div className="ktp-msec">
                      <span className="ktp-msec-label">Best For</span>
                      <div className="ktp-best-badge">{selectedItem.bestFor}</div>
                    </div>
                    <hr className="ktp-mdivider" />
                  </>
                )}

                {(selectedItem.material || selectedItem.price || selectedItem.durability || selectedItem.size || selectedItem.capacity || selectedItem.diameter || selectedItem.length) && (
                  <>
                    <div className="ktp-msec">
                      <span className="ktp-msec-label">Specifications</span>
                      <div className="ktp-specs-grid">
                        {selectedItem.material && <div className="ktp-spec-item"><strong>Material:</strong> {selectedItem.material}</div>}
                        {selectedItem.price && <div className="ktp-spec-item"><strong>Price:</strong> {selectedItem.price}</div>}
                        {selectedItem.priceRange && <div className="ktp-spec-item"><strong>Price Range:</strong> {selectedItem.priceRange}</div>}
                        {selectedItem.durability && <div className="ktp-spec-item"><strong>Durability:</strong> {selectedItem.durability}</div>}
                        {selectedItem.size && <div className="ktp-spec-item"><strong>Size:</strong> {selectedItem.size}</div>}
                        {selectedItem.capacity && <div className="ktp-spec-item"><strong>Capacity:</strong> {selectedItem.capacity}</div>}
                        {selectedItem.diameter && <div className="ktp-spec-item"><strong>Diameter:</strong> {selectedItem.diameter}</div>}
                        {selectedItem.length && <div className="ktp-spec-item"><strong>Length:</strong> {selectedItem.length}</div>}
                      </div>
                    </div>
                    <hr className="ktp-mdivider" />
                  </>
                )}

                {(selectedItem.pros?.length > 0 || selectedItem.cons?.length > 0) && (
                  <div className="ktp-modal-two-col">
                    {selectedItem.pros?.length > 0 && (
                      <div className="ktp-msec">
                        <span className="ktp-msec-label">Pros</span>
                        <div className="ktp-uses-wrap">
                          {selectedItem.pros.map((pro, idx) => (
                            <div key={idx} className="ktp-use-tag">
                              <span className="ktp-use-dot">•</span>
                              {pro}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedItem.cons?.length > 0 && (
                      <div className="ktp-msec">
                        <span className="ktp-msec-label">Cons</span>
                        <div className="ktp-uses-wrap">
                          {selectedItem.cons.map((con, idx) => (
                            <div key={idx} className="ktp-use-tag">
                              <span className="ktp-use-dot">•</span>
                              {con}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedItem.care && (
                  <>
                    <hr className="ktp-mdivider" />
                    <div className="ktp-msec">
                      <span className="ktp-msec-label">Care Instructions</span>
                      <div className="ktp-tip-card">
                        <span className="ktp-tip-icon"><LightbulbIcon /></span>
                        <span className="ktp-tip-txt">{selectedItem.care}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="ktp-modal-right">
                <div
                  className="ktp-modal-right-image"
                  style={{ backgroundImage: `url(${selectedItem.image || '/api/placeholder/400/400'})` }}
                  onClick={() => openLightbox(selectedItem.image || '/api/placeholder/400/400')}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {lightboxImage && (
        <div className="ktp-lightbox-overlay" onClick={closeLightbox}>
          <button className="ktp-lightbox-close" onClick={closeLightbox}>×</button>
          <img
            className="ktp-lightbox-image"
            src={lightboxImage}
            alt="Full view"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default KitchenToolsPage;