import React, { useState, useEffect } from 'react';
import './KitchenToolsPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KitchenToolsPage = () => {
  const navigate = useNavigate();
  
  // ===== STATES =====
  const [selectedTool, setSelectedTool] = useState(null);
  const [cookwareTab, setCookwareTab] = useState('types');
  const [crockeryTab, setCrockeryTab] = useState('dining');
  const [servingTab, setServingTab] = useState('servingware');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ===== DATA STATES =====
  const [kitchenEssentials, setKitchenEssentials] = useState([]);
  const [knivesData, setKnivesData] = useState([]);
  const [cuttingBoardTypes, setCuttingBoardTypes] = useState([]);
  const [mixingBowlTypes, setMixingBowlTypes] = useState([]);
  const [utensilItems, setUtensilItems] = useState([]);
  const [cookwareTypes, setCookwareTypes] = useState([]);
  const [cookwareMaterials, setCookwareMaterials] = useState([]);
  const [crockeryItems, setCrockeryItems] = useState([]);
  const [cutleryItems, setCutleryItems] = useState([]);
  const [servingwareItems, setServingwareItems] = useState([]);
  const [servingCutleryItem, setServingCutleryItem] = useState(null);

  // ===== HELPER: Merge content fields =====
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
      category: content.category || guide.category || ''
    };
  };

  // ===== FETCH DATA FROM BACKEND =====
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/beginners-guide?mainCategory=kitchen-tools');
      const allGuides = response.data.guides || [];
      
      console.log('Total guides fetched:', allGuides.length);
      
      const essentials = allGuides.filter(g => g.subCategory === 'essentials');
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
      
      const servingItems = servingware.filter(g => g.content?.servingType !== 'cutlery-set').map(mergeContent);
      const servingCutlery = servingware.find(g => g.content?.servingType === 'cutlery-set');
      setServingwareItems(servingItems);
      setServingCutleryItem(servingCutlery ? mergeContent(servingCutlery) : null);
      
      if (essentials.length > 0 && !selectedTool) {
        setSelectedTool(mergeContent(essentials[0]));
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // ===== HELPER FUNCTIONS FOR CARD CLASSES =====
  const getKnifeCardClass = (knifeName) => {
    const name = knifeName?.toLowerCase() || '';
    if (name.includes('chef')) return 'chef';
    if (name.includes('paring')) return 'paring';
    if (name.includes('bread')) return 'bread';
    if (name.includes('santoku')) return 'santoku';
    if (name.includes('boning')) return 'boning';
    if (name.includes('utility')) return 'utility';
    if (name.includes('nakiri')) return 'nakiri';
    return '';
  };

  const getBoardCardClass = (boardName) => {
    const name = boardName?.toLowerCase() || '';
    if (name.includes('bamboo')) return 'board-bamboo';
    if (name.includes('maple')) return 'board-maple';
    if (name.includes('plastic')) return 'board-plastic';
    if (name.includes('rubber')) return 'board-rubber';
    return '';
  };

  const getBowlCardClass = (bowlName) => {
    const name = bowlName?.toLowerCase() || '';
    if (name.includes('stainless')) return 'bowl-steel';
    if (name.includes('glass')) return 'bowl-glass';
    if (name.includes('ceramic') || name.includes('porcelain')) return 'bowl-ceramic';
    if (name.includes('plastic')) return 'bowl-plastic';
    return '';
  };

  const getUtensilCardClass = (utensilName) => {
    const name = utensilName?.toLowerCase() || '';
    if (name.includes('wooden')) return 'utensil-wooden';
    if (name.includes('spatula')) return 'utensil-spatula';
    if (name.includes('whisk')) return 'utensil-whisk';
    if (name.includes('tongs')) return 'utensil-tongs';
    if (name.includes('ladle')) return 'utensil-ladle';
    if (name.includes('shears')) return 'utensil-shears';
    if (name.includes('slotted')) return 'utensil-slotted';
    if (name.includes('peeler')) return 'utensil-peeler';
    return '';
  };

  const getCookwareTypeClass = (cookwareName) => {
    const name = cookwareName?.toLowerCase() || '';
    if (name.includes('pressure')) return 'cookware-pressure';
    if (name.includes('tawa')) return 'cookware-tawa';
    if (name.includes('karahi')) return 'cookware-karahi';
    if (name.includes('skillet')) return 'cookware-skillet';
    if (name.includes('saucepan')) return 'cookware-saucepan';
    if (name.includes('stock')) return 'cookware-stock';
    if (name.includes('dutch')) return 'cookware-dutch';
    return '';
  };

  const getCookwareMaterialClass = (materialName) => {
    const name = materialName?.toLowerCase() || '';
    if (name.includes('stainless')) return 'cookware-steel';
    if (name.includes('non-stick')) return 'cookware-nonstick';
    if (name.includes('cast')) return 'cookware-iron';
    return '';
  };

  const getCrockeryCardClass = (name) => {
    const n = name?.toLowerCase() || '';
    if (n.includes('dinner') && n.includes('plate')) return 'crockery-dinner';
    if (n.includes('side')) return 'crockery-side';
    if (n.includes('soup')) return 'crockery-soup';
    if (n.includes('cereal')) return 'crockery-cereal';
    if (n.includes('mug')) return 'crockery-mug';
    if (n.includes('tea') && n.includes('cup')) return 'crockery-tea';
    return '';
  };

  const getCutleryCardClass = (name) => {
    const n = name?.toLowerCase() || '';
    if (n.includes('dinner') && n.includes('fork')) return 'cutlery-dinner-fork';
    if (n.includes('dinner') && n.includes('knife')) return 'cutlery-dinner-knife';
    if (n.includes('tablespoon')) return 'cutlery-tablespoon';
    if (n.includes('teaspoon')) return 'cutlery-teaspoon';
    if (n.includes('soup')) return 'cutlery-soup';
    if (n.includes('butter')) return 'cutlery-butter';
    return '';
  };

  const getServingwareCardClass = (name) => {
    const n = name?.toLowerCase() || '';
    if (n.includes('serving') && n.includes('bowl')) return 'servingware-bowl';
    if (n.includes('platter')) return 'servingware-platter';
    if (n.includes('gravy')) return 'servingware-gravy';
    if (n.includes('salad')) return 'servingware-salad';
    return '';
  };

  const getFilteredCrockery = () => {
    if (crockeryTab === 'dining') return crockeryItems.filter(item => item.category === 'dining');
    if (crockeryTab === 'tea') return crockeryItems.filter(item => item.category === 'tea');
    if (crockeryTab === 'water') return crockeryItems.filter(item => item.category === 'water');
    return crockeryItems;
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="ktp-container">
        <div className="loading-spinner">Loading kitchen tools...</div>
      </div>
    );
  }

  return (
    <div className="ktp-container">
      <div className="ktp-layout">
        {/* SIDEBAR */}
        <aside className="ktp-sidebar">
          <div className="ktp-sidebar-header">
            <h2 className="ktp-sidebar-title">Kitchen Tools</h2>
            <p className="ktp-sidebar-subtitle">Essential Equipment</p>
          </div>
          <div className="ktp-sidebar-tools">
            <ul className="ktp-tools-list">
              {kitchenEssentials.map(tool => (
                <li
                  key={tool.id}
                  className={`ktp-tool-list-item ${selectedTool?.id === tool.id ? 'ktp-active' : ''}`}
                  onClick={() => setSelectedTool(tool)}
                >
                  <span className="ktp-tool-list-name">{tool.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="ktp-main">
          {error && <div className="error-message" style={{color: 'orange', textAlign: 'center', padding: '10px'}}>{error}</div>}
          
          {selectedTool && (
            <>
              <header className="ktp-main-header">
                <div className="ktp-header-content">
                  <h1 className="ktp-page-title">{selectedTool.name}</h1>
                  <p className="ktp-page-description">{selectedTool.tagline}</p>
                </div>
              </header>

              <div className="ktp-content-area">
                {/* KNIVES */}
                {selectedTool.name === "Chef's Knife" && knivesData.length > 0 && (
                  <div className="ktp-section">
                    <h3 className="ktp-section-heading">Kitchen Knives ({knivesData.length})</h3>
                    <div className="ktp-cards-grid">
                      {knivesData.map(knife => (
                        <div key={knife.id} className={`ktp-card ${getKnifeCardClass(knife.name)}`} onClick={() => openModal(knife)}>
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${knife.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{knife.name}</h4>
                            <div className="ktp-card-size">{knife.size || knife.bestFor}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CUTTING BOARDS */}
                {selectedTool.name === "Cutting Board" && cuttingBoardTypes.length > 0 && (
                  <div className="ktp-section">
                    <h3 className="ktp-section-heading">Cutting Boards ({cuttingBoardTypes.length})</h3>
                    <div className="ktp-cards-grid">
                      {cuttingBoardTypes.map(board => (
                        <div key={board.id} className={`ktp-card ${getBoardCardClass(board.name)}`} onClick={() => openModal(board)}>
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${board.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{board.name}</h4>
                            <div className="ktp-card-material">{board.bestFor || board.material}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MIXING BOWLS */}
                {selectedTool.name === "Mixing Bowls" && mixingBowlTypes.length > 0 && (
                  <div className="ktp-section">
                    <h3 className="ktp-section-heading">Mixing Bowls ({mixingBowlTypes.length})</h3>
                    <div className="ktp-cards-grid">
                      {mixingBowlTypes.map(bowl => (
                        <div key={bowl.id} className={`ktp-card ${getBowlCardClass(bowl.name)}`} onClick={() => openModal(bowl)}>
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${bowl.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{bowl.name}</h4>
                            <div className="ktp-card-material">{bowl.sizes || bowl.capacity || bowl.material}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* UTENSILS */}
                {selectedTool.name === "Utensil Set" && utensilItems.length > 0 && (
                  <div className="ktp-section">
                    <h3 className="ktp-section-heading">Kitchen Utensils ({utensilItems.length})</h3>
                    <div className="ktp-cards-grid">
                      {utensilItems.map(utensil => (
                        <div key={utensil.id} className={`ktp-card ${getUtensilCardClass(utensil.name)}`} onClick={() => openModal(utensil)}>
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${utensil.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{utensil.name}</h4>
                            <div className="ktp-card-material">{utensil.material}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* COOKWARE */}
                {selectedTool.name === "Cookware Set" && (
                  <div className="ktp-section">
                    <div className="ktp-tabs">
                      <button className={`ktp-tab ${cookwareTab === 'types' ? 'ktp-tab-active' : ''}`} onClick={() => setCookwareTab('types')}>Cookware Types ({cookwareTypes.length})</button>
                      <button className={`ktp-tab ${cookwareTab === 'materials' ? 'ktp-tab-active' : ''}`} onClick={() => setCookwareTab('materials')}>Materials ({cookwareMaterials.length})</button>
                    </div>
                    {cookwareTab === 'types' && (
                      <div className="ktp-cards-grid">
                        {cookwareTypes.map(item => (
                          <div key={item.id} className={`ktp-card ${getCookwareTypeClass(item.name)}`} onClick={() => openModal(item)}>
                            <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className="ktp-card-content">
                              <h4 className="ktp-card-title">{item.name}</h4>
                              <div className="ktp-card-material">{item.material}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {cookwareTab === 'materials' && (
                      <div className="ktp-cards-grid">
                        {cookwareMaterials.map(item => (
                          <div key={item.id} className={`ktp-card ${getCookwareMaterialClass(item.name)}`} onClick={() => openModal(item)}>
                            <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className="ktp-card-content">
                              <h4 className="ktp-card-title">{item.name}</h4>
                              <div className="ktp-card-material">{item.durability}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* CROCKERY */}
                {selectedTool.name === "Crockery Set" && crockeryItems.length > 0 && (
                  <div className="ktp-section">
                    <div className="ktp-tabs">
                      <button className={`ktp-tab ${crockeryTab === 'dining' ? 'ktp-tab-active' : ''}`} onClick={() => setCrockeryTab('dining')}>Dining ({crockeryItems.filter(i => i.category === 'dining').length})</button>
                      <button className={`ktp-tab ${crockeryTab === 'tea' ? 'ktp-tab-active' : ''}`} onClick={() => setCrockeryTab('tea')}>Tea ({crockeryItems.filter(i => i.category === 'tea').length})</button>
                      <button className={`ktp-tab ${crockeryTab === 'water' ? 'ktp-tab-active' : ''}`} onClick={() => setCrockeryTab('water')}>Water ({crockeryItems.filter(i => i.category === 'water').length})</button>
                    </div>
                    <div className="ktp-cards-grid">
                      {getFilteredCrockery().map(item => (
                        <div key={item.id} className={`ktp-card ${getCrockeryCardClass(item.name)}`} onClick={() => openModal(item)}>
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{item.name}</h4>
                            <div className="ktp-card-material">{item.material}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CUTLERY */}
                {selectedTool.name === "Cutlery Set" && cutleryItems.length > 0 && (
                  <div className="ktp-section">
                    <h3 className="ktp-section-heading">Cutlery ({cutleryItems.length})</h3>
                    <div className="ktp-cards-grid">
                      {cutleryItems.map(item => (
                        <div key={item.id} className={`ktp-card ${getCutleryCardClass(item.name)}`} onClick={() => openModal(item)}>
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{item.name}</h4>
                            <div className="ktp-card-material">{item.material}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SERVINGWARE */}
                {selectedTool.name === "Servingware Set" && (
                  <div className="ktp-section">
                    <div className="ktp-tabs">
                      <button className={`ktp-tab ${servingTab === 'servingware' ? 'ktp-tab-active' : ''}`} onClick={() => setServingTab('servingware')}>Servingware ({servingwareItems.length})</button>
                      <button className={`ktp-tab ${servingTab === 'cutlery' ? 'ktp-tab-active' : ''}`} onClick={() => setServingTab('cutlery')}>Cutlery Set</button>
                    </div>
                    {servingTab === 'servingware' && (
                      <div className="ktp-cards-grid">
                        {servingwareItems.map(item => (
                          <div key={item.id} className={`ktp-card ${getServingwareCardClass(item.name)}`} onClick={() => openModal(item)}>
                            <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className="ktp-card-content">
                              <h4 className="ktp-card-title">{item.name}</h4>
                              <div className="ktp-card-material">{item.capacity || item.sizes || 'Serving Set'}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {servingTab === 'cutlery' && servingCutleryItem && (
                      <div className="ktp-cards-grid">
                        <div className="ktp-card" onClick={() => openModal(servingCutleryItem)}>
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${servingCutleryItem.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{servingCutleryItem.name}</h4>
                            <div className="ktp-card-material">Complete Set</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* MODAL - SARI FIELDS KE SAATH */}
      {showModal && selectedItem && (
        <div className="ktp-modal-overlay" onClick={closeModal}>
          <div className="ktp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ktp-modal-close" onClick={closeModal}>×</button>
            
            <div className="ktp-modal-content">
              <div className="ktp-modal-left">
                {/* TITLE */}
                <div className="ktp-modal-title">
                  <h2>{selectedItem.name}</h2>
                  {selectedItem.tagline && <p className="ktp-modal-subtitle">{selectedItem.tagline}</p>}
                </div>

                {/* QUICK SPECS - ALL FIELDS */}
                <div className="ktp-quick-specs">
                  {selectedItem.price && <span className="ktp-spec-badge price">💰 {selectedItem.price}</span>}
                  {selectedItem.priceRange && <span className="ktp-spec-badge">💵 {selectedItem.priceRange}</span>}
                  {selectedItem.size && <span className="ktp-spec-badge">📏 {selectedItem.size}</span>}
                  {selectedItem.sizes && <span className="ktp-spec-badge">📐 {selectedItem.sizes}</span>}
                  {selectedItem.material && <span className="ktp-spec-badge">⚙️ {selectedItem.material}</span>}
                  {selectedItem.capacity && <span className="ktp-spec-badge">📦 {selectedItem.capacity}</span>}
                  {selectedItem.diameter && <span className="ktp-spec-badge">🟤 {selectedItem.diameter}</span>}
                  {selectedItem.length && <span className="ktp-spec-badge">📏 {selectedItem.length}</span>}
                  {selectedItem.durability && <span className="ktp-spec-badge">⏳ {selectedItem.durability}</span>}
                </div>

                {/* BEST FOR */}
                {selectedItem.bestFor && (
                  <div className="ktp-best-for">
                    <h3>🎯 Best For</h3>
                    <p>{selectedItem.bestFor}</p>
                  </div>
                )}

                {/* DESCRIPTION */}
                {(selectedItem.fullDesc || selectedItem.description) && (
                  <div className="ktp-modal-description">
                    <h3>📝 Description</h3>
                    <p>{selectedItem.fullDesc || selectedItem.description}</p>
                  </div>
                )}

                {/* PROS */}
                {selectedItem.pros && selectedItem.pros.length > 0 && (
                  <div className="ktp-pros-section">
                    <h3>✅ Pros / Advantages</h3>
                    <div className="ktp-pros-row">
                      {selectedItem.pros.map((pro, idx) => (
                        <span key={idx} className="ktp-pros-badge">✓ {pro}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CONS */}
                {selectedItem.cons && selectedItem.cons.length > 0 && (
                  <div className="ktp-cons-section">
                    <h3>❌ Cons / Disadvantages</h3>
                    <div className="ktp-cons-row">
                      {selectedItem.cons.map((con, idx) => (
                        <span key={idx} className="ktp-cons-badge">✗ {con}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* KEY USES */}
                {selectedItem.keyUses && selectedItem.keyUses.length > 0 && (
                  <div className="ktp-key-uses">
                    <h3>🔪 Common Uses</h3>
                    <div className="ktp-uses-row">
                      {selectedItem.keyUses.map((use, idx) => (
                        <span key={idx} className="ktp-use-badge">• {use}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CARE & MAINTENANCE */}
                {selectedItem.care && (
                  <div className="ktp-care-section">
                    <h3>🧼 Care & Maintenance</h3>
                    <p>{selectedItem.care}</p>
                  </div>
                )}

                {/* ADDITIONAL DETAILS */}
                <div className="ktp-additional-details">
                  {selectedItem.sizes && !selectedItem.capacity && <p><strong>Sizes:</strong> {selectedItem.sizes}</p>}
                  {selectedItem.diameter && <p><strong>Diameter:</strong> {selectedItem.diameter}</p>}
                  {selectedItem.length && <p><strong>Length:</strong> {selectedItem.length}</p>}
                  {selectedItem.bladeType && <p><strong>Blade Type:</strong> {selectedItem.bladeType}</p>}
                  {selectedItem.materialType && <p><strong>Material Type:</strong> {selectedItem.materialType}</p>}
                </div>

                <button className="ktp-view-details-btn">View Full Specifications →</button>
              </div>

              <div className="ktp-modal-right">
                <div className="ktp-modal-image-container">
                  <div className="ktp-modal-image" style={{ backgroundImage: `url(${selectedItem.image})` }}></div>
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

export default KitchenToolsPage;