import React, { useState } from 'react';
import './TableSettingsPage.css';

const TableSettingsPage = () => {
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  // TABLE SETTINGS DATA
  const tableSettings = [
    {
      id: 1,
      name: "Basic Table Setting",
      tagline: "Everyday casual dining",
      fullDesc: "The basic table setting is used for everyday meals and casual dining. It includes essential utensils for a simple meal, typically with just one course. This setting is perfect for breakfast, lunch, or casual family dinners.",
      keyUses: ["Family dinners", "Breakfast", "Lunch", "Casual meals"],
      previewImg: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=400",
      placementRules: [
        "Placemat optional",
        "Dinner plate in center",
        "Fork on left of plate",
        "Knife on right, blade facing plate",
        "Spoon right of knife",
        "Water glass above knife tip",
        "Napkin left of fork or on plate"
      ],
      utensils: "Dinner fork, knife, teaspoon, water glass, napkin",
      occasions: "Daily meals, casual dining, family gatherings",
      tips: ["Keep it simple and functional", "Use casual dinnerware", "Napkin can be folded simply", "Add plate charger for formal touch"]
    },
    {
      id: 2,
      name: "Informal Table Setting",
      tagline: "Semi-formal occasions",
      fullDesc: "The informal table setting is used for semi-formal occasions like dinner parties, holiday meals, or special family gatherings. It includes more utensils than basic setting but less than formal. Suitable for 2-3 course meals.",
      keyUses: ["Dinner parties", "Holiday meals", "Anniversaries", "Special occasions"],
      previewImg: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=400",
      placementRules: [
        "Placemat or tablecloth",
        "Dinner plate in center",
        "Salad plate on dinner plate",
        "Forks left of plate (dinner fork inside)",
        "Knives right of plate (dinner knife inside)",
        "Spoons right of knives",
        "Bread plate top left",
        "Drink glasses top right",
        "Napkin on dinner plate or left"
      ],
      utensils: "Salad fork, dinner fork, dinner knife, teaspoon, soup spoon, bread plate, butter knife, water glass, wine glass, napkin",
      occasions: "Dinner parties, celebrations, holiday meals",
      tips: ["Use matching dinnerware", "Leave 1 inch between place settings", "Align bottoms of utensils", "Glassware in order of use"]
    },
    {
      id: 3,
      name: "Formal Table Setting",
      tagline: "Elegant multi-course dining",
      fullDesc: "The formal table setting is used for elegant dinners, weddings, fine dining restaurants, and special ceremonies. It follows strict etiquette rules with multiple utensils for each course. Typically used for 4+ course meals.",
      keyUses: ["Weddings", "Fine dining", "State dinners", "Gala events"],
      previewImg: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=400",
      placementRules: [
        "Tablecloth required",
        "Charger plate in center",
        "Salad plate on charger",
        "Bread plate top left with butter knife",
        "Forks left (outside in: salad, fish, dinner)",
        "Knives right (outside in: fish, dinner)",
        "Spoons right of knives",
        "Glasses top right (water, red wine, white wine)",
        "Napkin on charger or left",
        "Dessert utensils above plate"
      ],
      utensils: "Salad fork, fish fork, dinner fork, fish knife, dinner knife, soup spoon, teaspoon, dessert utensils, bread plate, multiple glasses, napkin",
      occasions: "Black tie events, weddings, diplomatic dinners",
      tips: ["All utensils 1 inch from table edge", "Utensils 1/2 inch apart", "Glassware in diagonal arrangement", "Napkin with simple fold"]
    },
    {
      id: 4,
      name: "Buffet Table Setting",
      tagline: "Self-service style",
      fullDesc: "The buffet table setting allows guests to serve themselves from a central table. It's practical for large gatherings where serving individually isn't feasible. The focus is on organizing food logically and providing convenient serving areas.",
      keyUses: ["Large parties", "Corporate events", "Wedding receptions", "Holiday gatherings"],
      previewImg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400",
      placementRules: [
        "Table with tablecloth",
        "Plates at beginning of line",
        "Flatware wrapped in napkins at end",
        "Food in logical order (appetizers to desserts)",
        "Serving utensils for each dish",
        "Drink station separate",
        "Clear traffic flow path",
        "Multiple stations for large crowds"
      ],
      utensils: "Dinner plates, salad plates, bowls, wrapped flatware sets, serving utensils, beverage glasses",
      occasions: "Large gatherings, cocktail parties, office events",
      tips: ["Create logical flow", "Label dishes clearly", "Keep hot foods hot", "Provide trash/recycle stations"]
    },
    {
      id: 5,
      name: "Family Style Setting",
      tagline: "Shared meal serving",
      fullDesc: "Family style setting places serving dishes on the dining table for everyone to share. It creates a warm, communal atmosphere where dishes are passed around. This encourages interaction and conversation during meals.",
      keyUses: ["Family meals", "Thanksgiving", "Sunday dinners", "Intimate gatherings"],
      previewImg: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400",
      placementRules: [
        "Individual place settings",
        "Serving dishes in center",
        "Serving utensils with each dish",
        "Platters within easy reach",
        "Trivets for hot dishes",
        "Butter, salt, pepper accessible",
        "Water pitcher on table",
        "Extra serving space"
      ],
      utensils: "Individual place settings, serving platters, serving utensils, gravy boats, condiment dishes",
      occasions: "Holiday meals, family dinners, friendly gatherings",
      tips: ["Arrange for easy passing", "Provide serving utensils", "Keep hot dishes insulated", "Leave space for elbow room"]
    },
    {
      id: 6,
      name: "Breakfast Table Setting",
      tagline: "Morning meal arrangement",
      fullDesc: "The breakfast table setting is simplified for morning meals. It typically includes fewer utensils and is designed for efficiency. Coffee/tea service is often incorporated directly into the place setting or nearby.",
      keyUses: ["Breakfast", "Brunch", "Morning meetings", "Hotel service"],
      previewImg: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?auto=format&fit=crop&w=400",
      placementRules: [
        "Placemat or bare table",
        "Dinner plate or bowl in center",
        "Fork left of plate",
        "Knife right of plate",
        "Spoon right of knife or on bowl",
        "Cup and saucer top right",
        "Juice glass above knife",
        "Napkin left or on plate",
        "Bread plate optional"
      ],
      utensils: "Breakfast fork, knife, teaspoon, juice glass, coffee cup/saucer, napkin",
      occasions: "Morning meals, brunch, business breakfasts",
      tips: ["Keep it simple", "Include coffee/tea service", "Use bright colors", "Consider toast or bread plate"]
    }
  ];

  const handleSettingSelect = (setting) => {
    setSelectedSetting(setting);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedSetting(null);
  };

  return (
    <div className="tsp-container">
      <div className="tsp-layout">
        {/* SIDEBAR */}
        <aside className="tsp-sidebar">
          <div className="tsp-sidebar-header">
            <h2 className="tsp-sidebar-title">Table Settings</h2>
            <p className="tsp-sidebar-subtitle">Dining Arrangements</p>
          </div>

          <div className="tsp-sidebar-settings">
            <ul className="tsp-settings-list">
              {tableSettings.map(setting => (
                <li 
                  key={setting.id} 
                  className={`tsp-setting-list-item ${selectedSetting?.id === setting.id ? 'tsp-active' : ''}`}
                  onClick={() => handleSettingSelect(setting)}
                >
                  <span className="tsp-setting-list-name">{setting.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="tsp-main">
          <header className="tsp-main-header">
            <div className="tsp-header-content">
              <h1 className="tsp-page-title">Table Setting Styles</h1>
              <p className="tsp-page-description">
                Learn proper table arrangements for every dining occasion.
              </p>
            </div>
          </header>

          {/* SETTINGS GRID */}
          <div className="tsp-settings-grid-section">
            <div className="tsp-settings-grid">
              {tableSettings.map(setting => (
                <div 
                  key={setting.id} 
                  className="tsp-setting-card"
                  onClick={() => handleSettingSelect(setting)}
                >
                  <div 
                    className="tsp-card-image"
                    style={{ backgroundImage: `url(${setting.previewImg})` }}
                  ></div>
                  
                  <div className="tsp-card-content">
                    <h3 className="tsp-card-title">{setting.name}</h3>
                    <p className="tsp-card-description">{setting.tagline}</p>
                    <div className="tsp-card-formality">
                      <span className={`tsp-formality-badge ${setting.name.toLowerCase().includes('basic') ? 'casual' : setting.name.toLowerCase().includes('formal') ? 'formal' : 'semi-formal'}`}>
                        {setting.name.toLowerCase().includes('basic') ? 'Casual' : setting.name.toLowerCase().includes('formal') ? 'Formal' : 'Semi-Formal'}
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
      {showDetailPanel && selectedSetting && (
        <div className="tsp-modal-overlay" onClick={closeDetailPanel}>
          <div className="tsp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="tsp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="tsp-modal-header">
              <div className="tsp-modal-title">
                <h2>{selectedSetting.name}</h2>
                <p className="tsp-modal-subtitle">{selectedSetting.tagline}</p>
              </div>
            </div>

            <div className="tsp-modal-content">
              {/* LEFT SIDE - CONTENT (65%) */}
              <div className="tsp-modal-details">
                {/* DESCRIPTION */}
                <div className="tsp-detail-section description-section">
                  <h3>Description</h3>
                  <p>{selectedSetting.fullDesc}</p>
                </div>

                {/* COMMON USES - HORIZONTAL */}
                <div className="tsp-detail-section uses-section">
                  <h3>Common Uses</h3>
                  <div className="tsp-uses-list">
                    {selectedSetting.keyUses.map((use, idx) => (
                      <div key={idx} className="tsp-use-item">
                        <span className="tsp-use-check">✓</span>
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TABLE DETAILS */}
                <div className="tsp-detail-section details-section">
                  <h3>Setting Details</h3>
                  <div className="tsp-details-list">
                    <div className="tsp-detail-item">
                      <span className="tsp-detail-label">Required Utensils:</span>
                      <span className="tsp-detail-value">{selectedSetting.utensils}</span>
                    </div>
                    <div className="tsp-detail-item">
                      <span className="tsp-detail-label">Typical Occasions:</span>
                      <span className="tsp-detail-value">{selectedSetting.occasions}</span>
                    </div>
                  </div>
                </div>

                {/* PLACEMENT RULES */}
                <div className="tsp-detail-section steps-section">
                  <h3>Placement Rules</h3>
                  <div className="tsp-steps-list">
                    {selectedSetting.placementRules.map((rule, idx) => (
                      <div key={idx} className="tsp-step-item">
                        <span className="tsp-step-number">{idx + 1}.</span>
                        <span className="tsp-step-text">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TIPS */}
                <div className="tsp-detail-section tips-section">
                  <h3>Setting Tips</h3>
                  <div className="tsp-tips-list">
                    {selectedSetting.tips.map((tip, idx) => (
                      <div key={idx} className="tsp-tip-item">
                        <span className="tsp-tip-icon">💡</span>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - IMAGE (35%) */}
              <div className="tsp-modal-image-container">
                <div 
                  className="tsp-modal-main-image"
                  style={{ backgroundImage: `url(${selectedSetting.previewImg})` }}
                ></div>
                <div className="tsp-image-caption">
                  {selectedSetting.name} - Table Setting
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSettingsPage;