import React, { useState, useEffect } from 'react';
import './CookingMethodsPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CookingMethodsPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [cookingMethods, setCookingMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCookingMethods();
  }, []);

 const fetchCookingMethods = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get('http://localhost:5000/api/beginners-guide?category=cooking-methods');
    const guides = response.data.guides || [];
    
    // Parse and transform database guides into cooking methods format
    const methods = guides.map((guide, index) => {
      let content = {};
      try {
        const trimmed = guide.content?.trim();
        if (trimmed?.startsWith('{')) {
          content = JSON.parse(trimmed);
        } else if (typeof guide.content === 'object' && guide.content !== null) {
          content = guide.content;
        } else {
          content = { fullDesc: guide.content, tagline: guide.title };
        }
      } catch (e) {
        content = { fullDesc: guide.content, tagline: guide.title };
      }

      return {
        id: index + 1,
        name: guide.title,
        tagline: content.tagline || guide.title,
        fullDesc: content.fullDesc || guide.content,
        keyUses: content.keyUses || ['General cooking'],
        previewImg: guide.image || `${guide.title.replace(/\s/g, '')}Method.png`,
        temperature: content.temperature || 'Varies',
        equipment: content.equipment || 'Standard cookware',
        bestFor: content.bestFor || 'Various dishes',
        tips: content.tips || ['Follow recipe instructions', 'Practice for perfection'],
        steps: content.steps || [
          'Prepare ingredients',
          'Heat the cooking vessel',
          'Add ingredients as directed',
          'Cook until done',
          'Serve hot'
        ]
      };
    });

    if (methods.length === 0) {
      setCookingMethods(getDefaultMethods());
    } else {
      setCookingMethods(methods);
    }
  } catch (error) {
    console.error('Error fetching cooking methods:', error);
    setCookingMethods(getDefaultMethods());
    setError('Using offline data. Connect to internet for latest content.');
  } finally {
    setLoading(false);
  }
};
  const getDefaultMethods = () => {
    return [
      {
        id: 1, name: "Boiling", tagline: "Cooking in boiling water",
        fullDesc: "Boiling is a moist-heat cooking method where food is submerged in water at 100°C (212°F).",
        keyUses: ["Pasta", "Vegetables", "Eggs", "Rice"],
        previewImg: "BoilingMethod.png", temperature: "100°C (212°F)",
        equipment: "Saucepan, Stock pot", bestFor: "Pasta, hard vegetables, grains",
        tips: ["Use salted water", "Don't overcrowd", "Use rolling boil", "Ice bath stops cooking"],
        steps: ["Fill pot with water and bring to boil", "Add salt", "Add food carefully", "Cook recommended time", "Drain and serve"]
      },
      {
        id: 2, name: "Simmering", tagline: "Gentle cooking below boiling point",
        fullDesc: "Simmering cooks food in liquid at temperatures between 85-95°C (185-203°F).",
        keyUses: ["Soups", "Stews", "Sauces", "Grains"],
        previewImg: "SimmeringMethod.png", temperature: "85-95°C (185-203°F)",
        equipment: "Saucepan, Dutch oven", bestFor: "Tender meats, soups, sauces",
        tips: ["Maintain gentle bubbles", "Use lid to retain heat", "Stir occasionally", "Adjust heat as needed"],
        steps: ["Bring liquid to boil", "Reduce heat until gentle bubbles", "Add ingredients", "Cover partially", "Cook until tender"]
      },
      {
        id: 3, name: "Steaming", tagline: "Cooking with steam heat",
        fullDesc: "Steaming cooks food by exposing it to steam from boiling water.",
        keyUses: ["Vegetables", "Fish", "Dumplings", "Rice"],
        previewImg: "SteamingMethod.png", temperature: "100°C (212°F)",
        equipment: "Steamer basket, Bamboo steamer", bestFor: "Delicate vegetables, seafood, dim sum",
        tips: ["Don't let water touch food", "Use tight-fitting lid", "Check water level", "Layer foods properly"],
        steps: ["Add water to pot and boil", "Place steamer basket over water", "Arrange food in single layer", "Cover with lid", "Steam until cooked"]
      },
      {
        id: 4, name: "Sautéing", tagline: "Quick frying in minimal oil",
        fullDesc: "Sautéing cooks food quickly in a small amount of oil or fat over relatively high heat.",
        keyUses: ["Vegetables", "Meat pieces", "Shrimp", "Mushrooms"],
        previewImg: "SautingMethod.png", temperature: "Medium-high heat",
        equipment: "Skillet, Sauté pan", bestFor: "Quick-cooking ingredients, stir-fries",
        tips: ["Preheat pan properly", "Don't overcrowd pan", "Keep food moving", "Use high smoke point oil"],
        steps: ["Heat pan over medium-high heat", "Add oil until shimmering", "Add ingredients in single layer", "Cook 1-2 minutes to sear", "Toss frequently until cooked"]
      },
      {
        id: 5, name: "Pan-Frying", tagline: "Shallow frying in oil",
        fullDesc: "Pan-frying uses more oil than sautéing (about 1/4 to 1/2 inch deep) to cook food.",
        keyUses: ["Chicken cutlets", "Fish fillets", "Patties", "Potatoes"],
        previewImg: "Pan-FryingMethod.png", temperature: "Medium heat",
        equipment: "Skillet, Frying pan", bestFor: "Breaded foods, thick cuts, crispy textures",
        tips: ["Maintain oil temperature", "Don't flip too early", "Drain on paper towels", "Season immediately"],
        steps: ["Add oil to pan (1/4 to 1/2 inch deep)", "Heat oil to proper temperature", "Carefully add food", "Cook until golden brown", "Flip and cook through"]
      },
      {
        id: 6, name: "Deep-Frying", tagline: "Complete submersion in hot oil",
        fullDesc: "Deep-frying completely submerges food in hot oil (typically 175-190°C/350-375°F).",
        keyUses: ["French fries", "Chicken", "Doughnuts", "Fritters"],
        previewImg: "Deep-FryingMethod.png", temperature: "175-190°C (350-375°F)",
        equipment: "Deep fryer, Dutch oven", bestFor: "Battered foods, crispy snacks",
        tips: ["Use thermometer", "Fry in batches", "Drain properly", "Reuse oil properly"],
        steps: ["Fill fryer with oil and heat", "Pat food dry", "Carefully lower into oil", "Fry until golden brown", "Remove and drain"]
      },
      {
        id: 7, name: "Baking", tagline: "Dry heat cooking in oven",
        fullDesc: "Baking uses dry heat in an enclosed oven to cook food.",
        keyUses: ["Bread", "Cakes", "Casseroles", "Roasted vegetables"],
        previewImg: "BakingMethod.png", temperature: "150-250°C (300-480°F)",
        equipment: "Oven, Baking sheets", bestFor: "Baked goods, casseroles, one-pan meals",
        tips: ["Preheat oven", "Use middle rack", "Rotate pans", "Test for doneness"],
        steps: ["Preheat oven", "Prepare food in bakeware", "Place in center of oven", "Bake for recommended time", "Check doneness"]
      },
      {
        id: 8, name: "Roasting", tagline: "High-heat oven cooking",
        fullDesc: "Roasting uses dry heat at high temperatures (usually above 200°C/400°F) to cook food.",
        keyUses: ["Whole chicken", "Vegetables", "Large meat cuts", "Nuts"],
        previewImg: "RoastingMethod.png", temperature: "200-230°C (400-450°F)",
        equipment: "Roasting pan, Oven", bestFor: "Large meats, root vegetables",
        tips: ["Use roasting rack", "Baste occasionally", "Rest before carving", "Use meat thermometer"],
        steps: ["Preheat oven to high temperature", "Season food", "Place on roasting rack", "Roast until browned", "Rest before serving"]
      },
      {
        id: 9, name: "Grilling", tagline: "Direct heat from below",
        fullDesc: "Grilling cooks food with direct radiant heat from below.",
        keyUses: ["Burgers", "Steaks", "Vegetables", "Kebabs"],
        previewImg: "GrillingMethod.png", temperature: "High heat",
        equipment: "Grill, Barbecue", bestFor: "Meats, vegetables with structure",
        tips: ["Clean grill grates", "Oil food not grates", "Create heat zones", "Don't press food"],
        steps: ["Preheat grill to high heat", "Clean and oil grates", "Place food on grates", "Cook until grill marks appear", "Flip and cook to doneness"]
      },
      {
        id: 10, name: "Broiling", tagline: "Direct heat from above",
        fullDesc: "Broiling uses direct radiant heat from above the food.",
        keyUses: ["Cheese melting", "Fish fillets", "Toast toppings", "Thin meats"],
        previewImg: "BroilingMethod.png", temperature: "260-290°C (500-550°F)",
        equipment: "Oven broiler", bestFor: "Quick browning, thin cuts",
        tips: ["Watch carefully", "Use broiler pan", "Adjust rack position", "Preheat broiler"],
        steps: ["Preheat broiler for 5-10 minutes", "Place food on broiler pan", "Position rack 4-6 inches from heat", "Broil until browned", "Watch carefully to prevent burning"]
      },
      {
        id: 11, name: "Braising", tagline: "Slow cooking with moist heat",
        fullDesc: "Braising combines searing at high heat then slow cooking in liquid at low heat.",
        keyUses: ["Pot roast", "Short ribs", "Brisket", "Stews"],
        previewImg: "BraisingMethod.png", temperature: "Low heat (150°C/300°F)",
        equipment: "Dutch oven, Heavy pot", bestFor: "Tough meats, one-pot meals",
        tips: ["Sear well first", "Use tight-fitting lid", "Cook low and slow", "Skim fat from sauce"],
        steps: ["Sear meat in hot oil until browned", "Remove meat and sauté vegetables", "Add liquid and return meat", "Cover and cook at low temperature", "Reduce sauce and skim fat"]
      },
      {
        id: 12, name: "Stewing", tagline: "Slow simmering in liquid",
        fullDesc: "Stewing involves cooking small pieces of food completely submerged in liquid at low temperatures.",
        keyUses: ["Beef stew", "Curries", "Chili", "Ragù"],
        previewImg: "StewingMethod.png", temperature: "Low heat",
        equipment: "Stock pot, Dutch oven", bestFor: "Small meat pieces, hearty dishes",
        tips: ["Cut uniform pieces", "Brown meat first", "Skim fat regularly", "Add vegetables at right time"],
        steps: ["Brown meat pieces in batches", "Sauté vegetables in same pot", "Add liquid and return meat", "Simmer covered for 1-3 hours", "Adjust seasoning and serve"]
      }
    ];
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedMethod(null);
  };

  const getMethodCardClass = (methodName) => {
    const name = methodName.toLowerCase();
    if (name.includes('boil')) return 'boiling';
    if (name.includes('simmer')) return 'simmering';
    if (name.includes('steam')) return 'steaming';
    if (name.includes('sauté')) return 'sauteing';
    if (name.includes('pan-fry') || name.includes('panfry')) return 'pan-frying';
    if (name.includes('deep-fry') || name.includes('deepfry')) return 'deep-frying';
    if (name.includes('bake') && !name.includes('roast')) return 'baking';
    if (name.includes('roast')) return 'roasting';
    if (name.includes('grill')) return 'grilling';
    if (name.includes('broil')) return 'broiling';
    if (name.includes('brais')) return 'braising';
    if (name.includes('stew')) return 'stewing';
    return '';
  };

  if (loading) {
    return (
      <div className="cmp-container">
        <div className="loading-spinner">Loading cooking methods...</div>
      </div>
    );
  }

  return (
    <div className="cmp-container">
      <div className="cmp-layout">
        {/* SIDEBAR */}
        <aside className="cmp-sidebar">
          <div className="cmp-sidebar-header">
            <h2 className="cmp-sidebar-title">Cooking Methods</h2>
            <p className="cmp-sidebar-subtitle">Essential Techniques</p>
          </div>

          <div className="cmp-sidebar-methods">
            <ul className="cmp-methods-list">
              {cookingMethods.map(method => (
                <li 
                  key={method.id} 
                  className={`cmp-method-list-item ${selectedMethod?.id === method.id ? 'cmp-active' : ''}`}
                  onClick={() => handleMethodSelect(method)}
                >
                  <span className="cmp-method-list-name">{method.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="cmp-main">
          <header className="cmp-main-header">
            <div className="cmp-header-content">
              <h1 className="cmp-page-title">Essential Cooking Methods</h1>
              <p className="cmp-page-description">
                Master fundamental cooking techniques to elevate your culinary skills.
              </p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          {/* METHODS GRID */}
          <div className="cmp-methods-grid-section">
            <div className="cmp-methods-grid">
              {cookingMethods.map(method => (
                <div 
                  key={method.id} 
                  className="cmp-method-card"
                  onClick={() => handleMethodSelect(method)}
                >
                  <div 
                    className="cmp-card-image"
                    style={{ backgroundImage: `url(${method.previewImg})` }}
                  ></div>
                  
                  <div className="cmp-card-content">
                    <h3 className="cmp-card-title">{method.name}</h3>
                    <p className="cmp-card-description">{method.tagline}</p>
                    <div className="cmp-card-heat-type">
                      <span className={`cmp-heat-badge ${method.fullDesc.includes('moist') ? 'moist-heat' : 'dry-heat'}`}>
                        {method.fullDesc.includes('moist') ? 'Moist Heat' : 'Dry Heat'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* DETAIL MODAL */}
      {showDetailPanel && selectedMethod && (
        <div className="cmp-modal-overlay" onClick={closeDetailPanel}>
          <div className="cmp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cmp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="cmp-modal-header">
              <div className="cmp-modal-title">
                <h2>{selectedMethod.name}</h2>
                <p className="cmp-modal-subtitle">{selectedMethod.tagline}</p>
              </div>
            </div>

            <div className="cmp-modal-content">
              {/* LEFT SIDE - CONTENT */}
              <div className="cmp-modal-details">
                <div className="cmp-detail-section description-section">
                  <h3>Description</h3>
                  <p>{selectedMethod.fullDesc}</p>
                </div>

                <div className="cmp-detail-section uses-section">
                  <h3>Common Uses</h3>
                  <div className="cmp-uses-list">
                    {selectedMethod.keyUses.map((use, idx) => (
                      <div key={idx} className="cmp-use-item">
                        <span className="cmp-use-check">✓</span>
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cmp-detail-section details-section">
                  <h3>Method Details</h3>
                  <div className="cmp-details-list">
                    <div className="cmp-detail-item">
                      <span className="cmp-detail-label">Temperature:</span>
                      <span className="cmp-detail-value">{selectedMethod.temperature}</span>
                    </div>
                    <div className="cmp-detail-item">
                      <span className="cmp-detail-label">Equipment:</span>
                      <span className="cmp-detail-value">{selectedMethod.equipment}</span>
                    </div>
                    <div className="cmp-detail-item">
                      <span className="cmp-detail-label">Best For:</span>
                      <span className="cmp-detail-value">{selectedMethod.bestFor}</span>
                    </div>
                  </div>
                </div>

                <div className="cmp-detail-section steps-section">
                  <h3>Steps to {selectedMethod.name}</h3>
                  <div className="cmp-steps-list">
                    {selectedMethod.steps.map((step, idx) => (
                      <div key={idx} className="cmp-step-item">
                        <span className="cmp-step-number">{idx + 1}.</span>
                        <span className="cmp-step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cmp-detail-section tips-section">
                  <h3>Pro Tips</h3>
                  <div className="cmp-tips-list">
                    {selectedMethod.tips.map((tip, idx) => (
                      <div key={idx} className="cmp-tip-item">
                        <span className="cmp-tip-icon">💡</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - IMAGE */}
              <div className="cmp-modal-image-container">
                <div 
                  className="cmp-modal-main-image"
                  style={{ backgroundImage: `url(${selectedMethod.previewImg})` }}
                ></div>
                <div className="cmp-image-caption">
                  {selectedMethod.name} - Cooking Method
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
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

export default CookingMethodsPage;