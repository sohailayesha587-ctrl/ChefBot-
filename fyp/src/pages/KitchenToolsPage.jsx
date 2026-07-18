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

  const API_URL = 'http://localhost:5000/api/guides';

  const mergeContent = (guide) => {
    const content = guide.content || {};
    return {
      id: guide._id,
      image: guide.image || content.image || '',
      name: guide.title || content.name || '',
      tagline: content.tagline || '',
      fullDesc: content.fullDesc || '',
      description: content.description || '',
      keyUses: content.keyUses || [],
      bestFor: content.bestFor || '',
      type: content.type || '',
      material: content.material || '',
      price: content.price || '',
      priceRange: content.priceRange || '',
      durability: content.durability || '',
      pros: content.pros || [],
      cons: content.cons || [],
      care: content.care || '',
      size: content.size || '',
      sizes: content.sizes || '',
      capacity: content.capacity || '',
      diameter: content.diameter || '',
      length: content.length || '',
      bladeType: content.bladeType || '',
      utensilType: content.utensilType || '',
      cookwareType: content.cookwareType || '',
      crockeryType: content.crockeryType || '',
      cutleryType: content.cutleryType || '',
      servingType: content.servingType || '',
      materialType: content.materialType || '',
      category: content.category || guide.category || '',
      items: content.items || [],
      commonItems: content.commonItems || [],
      subcategory: content.subcategory || ''
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
      const response = await axios.get(API_URL, {
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

    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load kitchen tools');
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

  const cleanText = (text) => {
    if (!text) return '';
    return text.replace(/\\n/g, ' ').replace(/\\"/g, '"').replace(/\\/g, '');
  };

  if (loading) {
    return (
      <div className="ktp-container">
        <div className="loading-spinner">Loading kitchen tools...</div>
      </div>
    );
  }

  const currentItems = getCurrentItems();

  return (
    <div className="ktp-container">
      <div className="ktp-mobile-topbar">
        <button
          className={`ktp-hamburger ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <span /><span /><span />
        </button>
        <h1 className="ktp-page-title">Kitchen Tools</h1>
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
          {error ? (
            <div className="ktp-error-container">
              <div className="ktp-error-icon">🔒</div>
              <h2>Authentication Required</h2>
              <p>{error}</p>
              <button className="ktp-login-btn" onClick={() => navigate('/login')}>
                Go to Login
              </button>
            </div>
          ) : selectedTool ? (
            <>
              <header className="ktp-main-header">
                <h1 className="ktp-page-title">{selectedTool.name}</h1>
                <p className="ktp-page-description">
                  {selectedTool.tagline || 'Explore our collection of kitchen tools'}
                </p>
              </header>

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

                <div className="ktp-cards-grid">
                  {currentItems.length > 0 ? (
                    currentItems.map(item => (
                      <div key={item.id} className="ktp-card" onClick={() => openModal(item)}>
                        <div
                          className="ktp-card-image"
                          style={{ backgroundImage: `url(${item.image || 'https://via.placeholder.com/300x200?text=No+Image'})` }}
                        />
                        <div className="ktp-card-content">
                          <h4 className="ktp-card-title">{item.name}</h4>
                          <p className="ktp-card-sub">{item.tagline || item.material || item.bestFor || 'Kitchen Essential'}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="ktp-empty-state">
                      <p>No items found in this category.</p>
                      <p className="ktp-empty-sub">Please check back later.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="ktp-loading">Loading...</div>
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
              <div className="ktp-modal-hero-label">KITCHEN TOOL</div>
              <h2 className="ktp-modal-hero-title">{selectedItem.name}</h2>
              {selectedItem.tagline && (
                <p className="ktp-modal-hero-subtitle">{selectedItem.tagline}</p>
              )}
            </div>

            <div className="ktp-modal-inner">
              <div className="ktp-modal-left">
                {(selectedItem.fullDesc || selectedItem.description) && (
                  <>
                    <div className="ktp-msec">
                      <div className="ktp-msec-label">ABOUT THIS TOOL</div>
                      <p className="ktp-msec-text">{cleanText(selectedItem.fullDesc || selectedItem.description)}</p>
                    </div>
                    <hr className="ktp-mdivider" />
                  </>
                )}

                {selectedItem.bestFor && (
                  <>
                    <div className="ktp-msec">
                      <div className="ktp-msec-label">BEST FOR</div>
                      <div className="ktp-best-badge">{selectedItem.bestFor}</div>
                    </div>
                    <hr className="ktp-mdivider" />
                  </>
                )}

                {selectedItem.keyUses?.length > 0 && (
                  <>
                    <div className="ktp-msec">
                      <div className="ktp-msec-label">COMMON USES</div>
                      <div className="ktp-uses-wrap">
                        {selectedItem.keyUses.map((use, idx) => (
                          <div key={idx} className="ktp-use-tag">{use}</div>
                        ))}
                      </div>
                    </div>
                    <hr className="ktp-mdivider" />
                  </>
                )}

                {(selectedItem.material || selectedItem.price || selectedItem.durability || selectedItem.size || selectedItem.capacity) && (
                  <>
                    <div className="ktp-msec">
                      <div className="ktp-msec-label">SPECIFICATIONS</div>
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
                        <div className="ktp-msec-label">PROS</div>
                        {selectedItem.pros.map((pro, idx) => (
                          <div key={idx} className="ktp-pro-card">{pro}</div>
                        ))}
                      </div>
                    )}
                    {selectedItem.cons?.length > 0 && (
                      <div className="ktp-msec">
                        <div className="ktp-msec-label">CONS</div>
                        {selectedItem.cons.map((con, idx) => (
                          <div key={idx} className="ktp-con-card">{con}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedItem.care && (
                  <div className="ktp-msec">
                    <div className="ktp-msec-label">CARE INSTRUCTIONS</div>
                    <div className="ktp-care-card">{selectedItem.care}</div>
                  </div>
                )}
              </div>

              <div className="ktp-modal-right">
                <div
                  className="ktp-modal-right-image"
                  style={{ backgroundImage: `url(${selectedItem.image || 'https://via.placeholder.com/400x400?text=No+Image'})` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenToolsPage;