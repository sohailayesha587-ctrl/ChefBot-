import React, { useState } from 'react';
import './TableSettingsPage.css';

const TableSettingsPage = () => {
  const [activeSetting, setActiveSetting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const settings = [
    { 
      id: 1, 
      title: "Basic Setting", 
      shortDesc: "Simple and clean for everyday meals.",
      detailedDescription: `This is the everyday setup used for a simple meal like breakfast or lunch. It's minimal, practical, and perfect for daily family meals where formality isn't required but organization still matters.

**Key Characteristics:**
- One fork, one knife, one spoon
- Single water glass
- Napkin placement varies
- Casual and approachable

**Perfect For:**
- Family breakfasts
- Quick lunches
- Informal weekend meals
- Daily dining routine`,
      steps: `Step 1: Place the dinner plate in the center
Step 2: Place the napkin to the left of the plate
Step 3: Place the fork on the napkin
Step 4: Place the knife to the right of the plate (blade facing in)
Step 5: Place the water glass above the knife`,
      rule: "Think of the word FORKS. From left to right: F(ork), O(plate), K(nife), S(poon).",
      bestFor: "Everyday breakfast or lunch",
      proTip: "The knife blade must always face the plate!",
      tools: "Dinner plate, fork, knife, water glass, napkin",
      image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 2, 
      title: "Informal Dinner", 
      shortDesc: "Elegant yet relaxed for dinner guests.",
      detailedDescription: `Use this when you have guests over for a nice 3-course dinner. It strikes the perfect balance between casual and formal, making guests feel special without being overly rigid.

**Key Characteristics:**
- Multiple glasses for different drinks
- Soup spoon included
- Napkin placement options
- Slightly more elaborate than basic

**Perfect For:**
- Dinner parties with friends
- Date nights at home
- Holiday meals with family
- Weekend entertaining`,
      steps: `Step 1: Dinner plate in the center
Step 2: Soup bowl on top of the plate
Step 3: Dinner fork to the left
Step 4: Knife to the right, then soup spoon next to it
Step 5: Water glass and wine glass at the top right`,
      rule: "The glass closest to the guest's hand should be the water glass.",
      bestFor: "Casual dinner parties with friends",
      proTip: "Place the napkin on top of the plate for a modern look.",
      tools: "Dinner plate, soup bowl, dinner fork, knife, soup spoon, water glass, wine glass",
      image: "https://images.unsplash.com/photo-1517054011397-c85ec01fd634?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 3, 
      title: "Formal Setting", 
      shortDesc: "The ultimate guide for fancy dining.",
      detailedDescription: `The "Royal" look for weddings, holidays, or 5-star events. This setting follows traditional etiquette rules and is designed for multi-course meals with wine pairings.

**Key Characteristics:**
- Charger plate as base
- Multiple forks and knives
- Bread plate with butter knife
- Multiple glasses arranged by size
- Dessert utensils above plate

**Perfect For:**
- Weddings and formal receptions
- Holiday feasts (Thanksgiving, Christmas)
- Fine dining experiences
- Business dinners`,
      steps: `Step 1: Place a large decorative plate (Charger) down first
Step 2: Salad fork and Dinner fork to the left
Step 3: Knife, Salad knife, and Spoon to the right
Step 4: Bread plate and butter knife at top left
Step 5: Dessert spoon and fork horizontally above the plate`,
      rule: "Always use the silverware from the outside in as the meal progresses!",
      bestFor: "Weddings or multi-course holiday meals",
      proTip: "Start with the cutlery furthest from the plate and work your way in!",
      tools: "Charger plate, dinner plate, salad fork, dinner fork, knife, salad knife, spoon, bread plate, butter knife, dessert utensils, multiple glasses",
      image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800"
    },
    { 
      id: 4, 
      title: "Buffet Style", 
      shortDesc: "Smart layout for large parties.",
      detailedDescription: `When guests serve themselves from a large table. This practical setup maximizes flow and minimizes congestion while ensuring guests have everything they need when they sit down.

**Key Characteristics:**
- Plates at beginning of buffet line
- Silverware at end of line or at table
- Drinks on separate table
- Napkins with silverware or at table
- Multiple serving stations possible

**Perfect For:**
- Large parties and gatherings
- Corporate events
- Weddings with buffet service
- Holiday open houses`,
      steps: `Step 1: Stack plates at the very beginning of the buffet line
Step 2: Place silverware and napkins at the very end so guests don't have to carry them while serving food
Step 3: Put drinks on a separate table to avoid spills
Step 4: Arrange food in logical order: appetizers, mains, sides, salads
Step 5: Provide multiple serving utensils for each dish`,
      rule: "Don't put the cutlery at the start; it's hard for guests to hold forks while scooping food!",
      bestFor: "Large parties and gatherings",
      proTip: "Create a separate drinks table to prevent beverage spills on the buffet line.",
      tools: "Buffet tables, serving dishes, serving utensils, plates, silverware, napkins, drink station",
      image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 5, 
      title: "Bistro Style", 
      shortDesc: "European café-style casual dining.",
      detailedDescription: `The relaxed European approach to table setting, often seen in cafes and bistros. It's minimal, charming, and focuses on creating a cozy atmosphere rather than formal presentation.

**Key Characteristics:**
- Utensils wrapped in napkin
- No charger plate
- Minimal glassware
- Rustic, casual presentation
- Often includes bread basket

**Perfect For:**
- Casual European-style dinners
- Café and bistro dining
- Rustic themed events
- Intimate gatherings`,
      steps: `Step 1: Place dinner plate slightly off-center for casual feel
Step 2: Wrap utensils in napkin and place diagonally
Step 3: Wine glass at 2 o'clock position
Step 4: Bread plate optional, often served in basket
Step 5: Salt and pepper shakers placed together`,
      rule: "Utensils wrapped in napkins should have the tips pointing toward the guest.",
      bestFor: "European-style casual dining",
      proTip: "Use cloth napkins for a more authentic bistro feel.",
      tools: "Dinner plate, fork, knife, wine glass, cloth napkin, bread basket",
      image: "https://images.unsplash.com/photo-1554679665-f5537f187268?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800"
    },
    { 
      id: 6, 
      title: "Family Style", 
      shortDesc: "Shared dishes in the center of the table.",
      detailedDescription: `Traditional family dining where large serving dishes are placed in the center of the table and everyone serves themselves. This encourages conversation and sharing while keeping the individual place settings simple.

**Key Characteristics:**
- Simple individual place settings
- Large serving dishes in center
- Serving utensils for each dish
- Passing dishes encouraged
- Casual, communal atmosphere

**Perfect For:**
- Family holiday meals
- Sunday dinners
- Casual entertaining
- Potluck gatherings`,
      steps: `Step 1: Set simple individual place settings (plate, fork, knife, napkin)
Step 2: Place serving dishes in center with serving utensils
Step 3: Arrange drinks within easy reach
Step 4: Include extra plates for second helpings
Step 5: Provide trivets or hot pads for warm dishes`,
      rule: "Serving dishes should be arranged in order of use: appetizers first, then mains, then sides.",
      bestFor: "Family gatherings and casual dinners",
      proTip: "Place serving spoons with handles facing outward for easy access.",
      tools: "Individual plates, serving dishes, serving utensils, trivets, family-style bowls",
      image: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581092334652-d5728b8a5d3b?auto=format&fit=crop&w=800"
    }
  ];

  const handleSettingClick = (setting) => {
    setActiveSetting(setting);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveSetting(null);
  };

  return (
    <div className="table-settings-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Dining Guide</h2>
        <ul className="settings-list">
          {settings.map(setting => (
            <li key={setting.id} className="setting-item">
              {setting.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="content-header">
          <h1>Table Setting Styles</h1>
          <p className="header-subtitle">Master the art of beautiful table arrangements</p>
        </header>

        <div className="settings-grid">
          {settings.map(setting => (
            <div 
              key={setting.id} 
              className="setting-card"
              onClick={() => handleSettingClick(setting)}
            >
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${setting.image})` }}
              ></div>
              <div className="card-content">
                <h3>{setting.title}</h3>
                <p className="card-desc">{setting.shortDesc}</p>
                <div className="click-details">
                  View Details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    

      {/* DETAILED POPUP MODAL */}
      {isModalOpen && activeSetting && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            
            {/* Main Image */}
            <div className="modal-header">
              <div 
                className="modal-image"
                style={{ backgroundImage: `url(${activeSetting.image})` }}
              ></div>
              <div className="modal-title-section">
                <h2>{activeSetting.title}</h2>
                <div className="modal-subtitle">{activeSetting.shortDesc}</div>
              </div>
            </div>
            
            <div className="modal-body">
              {/* Detailed Description Section */}
              <div className="section detailed-description">
                <h3>Complete Guide</h3>
                <div className="description-content">
                  {activeSetting.detailedDescription?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="description-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Steps Section */}
              <div className="section steps-section">
                <h3>Step-by-Step Setup</h3>
                <div className="steps-content">
                  {activeSetting.steps?.split('\n').map((step, index) => (
                    <div key={index} className="step-item">
                      <span className="step-number">{index + 1}</span>
                      <span className="step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Secondary Image */}
              {activeSetting.secondaryImage && (
                <div className="secondary-image-container">
                  <div 
                    className="secondary-image"
                    style={{ backgroundImage: `url(${activeSetting.secondaryImage})` }}
                  ></div>
                </div>
              )}
              
              {/* Info Grid */}
              <div className="info-grid">
                <div className="info-box best-for-box">
                  <h4>Best Used For</h4>
                  <p>{activeSetting.bestFor}</p>
                </div>
                
                <div className="info-box tools-box">
                  <h4>Required Tools</h4>
                  <p>{activeSetting.tools}</p>
                </div>
                
                <div className="info-box pro-tip-box">
                  <h4>Golden Rule</h4>
                  <p>{activeSetting.rule}</p>
                </div>
              </div>
              
              {/* Pro Tip Section */}
              <div className="pro-tip-section">
                <div className="pro-tip-icon">💡</div>
                <div className="pro-tip-content">
                  <h4>Expert Pro Tip</h4>
                  <p>{activeSetting.proTip}</p>
                </div>
              </div>
              
              {/* Etiquette Notes */}
              <div className="etiquette-notes">
                <h4>Etiquette Notes:</h4>
                <ul>
                  <li>Always pass dishes to the right</li>
                  <li>Place used utensils on the plate, not the table</li>
                  <li>Napkin on lap immediately after sitting</li>
                  <li>Wait for host to start eating</li>
                  <li>Keep elbows off the table during the meal</li>
                  <li>Place used utensils at 4:20 position on plate when finished</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableSettingsPage;