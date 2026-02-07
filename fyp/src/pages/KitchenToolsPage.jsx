import React, { useState } from 'react';
import './KitchenToolsPage.css';

const KitchenToolsPage = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const kitchenTools = [
    { 
      id: 1, 
      title: "Chef's Knife", 
      shortDesc: "The essential all-purpose kitchen knife.",
      detailedDescription: `The chef's knife is the most important tool in any kitchen. With its broad, tapered blade and curved edge, it's designed for a variety of tasks including chopping, slicing, dicing, and mincing.

**Key Features:**
- Blade length: 8-10 inches
- Curved edge for rocking motion
- Heavy blade for cutting through tough ingredients
- Versatile for most cutting tasks

**Types of Chef's Knives:**
- **German-style:** Heavier with more curved blade
- **Japanese-style:** Lighter, thinner, and sharper
- **French-style:** Longer, narrower blade

A quality chef's knife can last a lifetime with proper care and maintenance.`,
      uses: `• Chopping vegetables and herbs
• Slicing meats and fish
• Mincing garlic and onions
• Crushing garlic with the flat side
• Rough chopping nuts and chocolate`,
      maintenance: "Hand wash and dry immediately. Sharpen regularly with honing steel. Professional sharpening every 6-12 months.",
      bestFor: "All-purpose cutting, chopping, slicing",
      proTip: "Hold the knife with a pinch grip—thumb and index finger on the blade—for better control and precision.",
      materials: "High-carbon stainless steel, full tang construction",
      image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 2, 
      title: "Cutting Board", 
      shortDesc: "Essential surface for safe food preparation.",
      detailedDescription: `A good cutting board protects your countertops and your knives while providing a stable surface for food preparation. Different materials offer various benefits for different types of cooking.

**Types of Cutting Boards:**
- **Wooden Boards:** Natural antibacterial properties, gentle on knives
- **Plastic Boards:** Dishwasher safe, budget-friendly, good for meats
- **Bamboo Boards:** Sustainable, durable, harder than wood
- **Composite Boards:** Non-porous, easy to clean, often dishwasher safe

Having multiple boards for different purposes (meats, vegetables, bread) helps prevent cross-contamination.`,
      uses: `• Chopping and slicing vegetables
• Preparing meats and poultry
• Cutting bread and baked goods
• Serving cheese and charcuterie
• Protecting counter surfaces`,
      maintenance: "Clean after each use. Wood boards need occasional oiling. Replace when deeply scored or worn.",
      bestFor: "Food preparation, knife protection, serving",
      proTip: "Use separate cutting boards for raw meats and vegetables to prevent cross-contamination.",
      materials: "Wood, bamboo, plastic, rubber, composite materials",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 3, 
      title: "Mixing Bowls", 
      shortDesc: "Versatile bowls for mixing, storing, and serving.",
      detailedDescription: `A set of mixing bowls in various sizes is essential for everything from baking to salad preparation. They're used for mixing ingredients, marinating, storing, and sometimes even serving.

**Types of Mixing Bowls:**
- **Stainless Steel:** Durable, lightweight, won't absorb odors
- **Glass:** Microwave and oven safe, easy to clean
- **Ceramic:** Attractive for serving, heavy and stable
- **Plastic:** Lightweight, often with lids for storage
- **Copper:** Excellent for whipping egg whites, beautiful but expensive

Nested sets save space and ensure you always have the right size bowl for any task.`,
      uses: `• Mixing batters and doughs
• Whipping cream and egg whites
• Marinating meats and vegetables
• Storing prepped ingredients
• Serving salads and sides`,
      maintenance: "Most are dishwasher safe. Avoid extreme temperature changes with glass bowls.",
      bestFor: "Baking, mixing, marinating, storing",
      proTip: "Place a damp towel under your mixing bowl to prevent it from sliding while you whisk or mix.",
      materials: "Stainless steel, glass, ceramic, plastic, copper",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800"
    },
    { 
      id: 4, 
      title: "Measuring Tools", 
      shortDesc: "Precision tools for accurate ingredient measurement.",
      detailedDescription: `Accurate measurements are crucial for successful cooking and baking. A complete set of measuring tools ensures consistency and repeatability in your recipes.

**Essential Measuring Tools:**
- **Dry Measuring Cups:** For flour, sugar, grains (level off with straight edge)
- **Liquid Measuring Cups:** Clear with spout, read at eye level
- **Measuring Spoons:** For small amounts of liquids and dry ingredients
- **Kitchen Scale:** Most accurate method, essential for baking
- **Thermometers:** For meats, candy, oil, and baking temperatures

Professional bakers measure most ingredients by weight for ultimate accuracy.`,
      uses: `• Measuring dry ingredients (flour, sugar)
• Measuring liquids (water, milk, oil)
• Portioning small amounts (spices, extracts)
• Weighing ingredients for precision baking
• Checking cooking temperatures`,
      maintenance: "Hand wash to preserve markings. Store nested to save space.",
      bestFor: "Baking, recipe accuracy, portion control",
      proTip: "Invest in a digital kitchen scale—it's the most accurate way to measure ingredients.",
      materials: "Plastic, stainless steel, glass, silicone",
      image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 5, 
      title: "Cookware Set", 
      shortDesc: "Essential pots and pans for everyday cooking.",
      detailedDescription: `A good cookware set forms the foundation of your kitchen. Different pans serve different purposes, and quality materials ensure even heating and durability.

**Essential Pieces:**
- **Saucepan with Lid:** For sauces, grains, and reheating
- **Stock Pot:** For soups, stocks, and boiling pasta
- **Sauté Pan:** Wide, shallow pan for frying and sautéing
- **Skillet/Frying Pan:** Sloped sides for easy turning
- **Dutch Oven:** Versatile for braising, stewing, and baking

**Common Materials:**
- **Stainless Steel:** Durable, non-reactive, oven-safe
- **Cast Iron:** Excellent heat retention, needs seasoning
- **Non-stick:** Easy cleanup, great for eggs and fish
- **Copper:** Superior heat conductivity, requires maintenance`,
      uses: `• Boiling, simmering, and steaming
• Sautéing and stir-frying
• Frying and deep-frying
• Braising and stewing
• Baking and roasting`,
      maintenance: "Follow manufacturer instructions. Avoid metal utensils on non-stick surfaces. Season cast iron regularly.",
      bestFor: "General cooking, baking, versatile meal preparation",
      proTip: "Invest in one quality piece at a time rather than buying a cheap set all at once.",
      materials: "Stainless steel, cast iron, aluminum, copper, ceramic",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 6, 
      title: "Utensils", 
      shortDesc: "Essential tools for cooking and serving.",
      detailedDescription: `A collection of well-chosen utensils makes cooking more efficient and enjoyable. From stirring to flipping to serving, each utensil has a specific purpose.

**Essential Utensils:**
- **Wooden Spoons:** Gentle on cookware, don't conduct heat
- **Spatulas:** For flipping and scraping (silicone for non-stick)
- **Tongs:** Versatile for gripping, turning, and serving
- **Whisks:** For beating, whipping, and emulsifying
- **Ladles:** For serving soups, stews, and sauces
- **Slotted Spoon:** For draining liquids while serving

Having the right tool for each task makes cooking safer and more precise.`,
      uses: `• Stirring and mixing while cooking
• Flipping foods (pancakes, burgers)
• Serving foods and portioning
• Draining liquids from solids
• Whisking sauces and dressings`,
      maintenance: "Most are dishwasher safe. Wood utensils should be hand washed and occasionally oiled.",
      bestFor: "Cooking, serving, food preparation",
      proTip: "Keep frequently used utensils in a countertop container for easy access while cooking.",
      materials: "Wood, silicone, stainless steel, nylon, bamboo",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581092334652-d5728b8a5d3b?auto=format&fit=crop&w=800"
    },
    { 
      id: 7, 
      title: "Small Appliances", 
      shortDesc: "Electric tools that make cooking easier.",
      detailedDescription: `Small appliances can save time and expand your cooking capabilities. While not all are essential, certain appliances are invaluable for specific tasks.

**Most Useful Small Appliances:**
- **Food Processor:** Chopping, slicing, shredding, making dough
- **Stand Mixer:** Kneading dough, whipping, mixing batters
- **Blender:** Smoothies, soups, sauces, purees
- **Immersion Blender:** Handheld for soups and sauces
- **Toaster Oven:** Versatile for toasting, baking, broiling
- **Electric Kettle:** Quick boiling water for tea, coffee, cooking

Choose appliances based on your cooking style and frequency of use.`,
      uses: `• Chopping and processing ingredients
• Mixing and kneading doughs
• Blending smoothies and soups
• Grinding spices and coffee
• Quick boiling for various uses`,
      maintenance: "Clean after each use. Follow manufacturer care instructions. Store properly to save counter space.",
      bestFor: "Time-saving, specialized tasks, convenience",
      proTip: "Invest in multi-functional appliances to save money and storage space.",
      materials: "Plastic, stainless steel, glass, various motor components",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 8, 
      title: "Baking Essentials", 
      shortDesc: "Specialized tools for baking success.",
      detailedDescription: `Baking requires precision and specialized tools. Having the right baking equipment ensures consistent results and makes the process more enjoyable.

**Essential Baking Tools:**
- **Baking Sheets:** For cookies, roasting vegetables
- **Cake Pans:** Various sizes and shapes
- **Muffin Tins:** For cupcakes and muffins
- **Loaf Pans:** For bread and pound cakes
- **Pie Dishes:** Glass or ceramic for even baking
- **Cooling Racks:** Allow air circulation for even cooling
- **Rolling Pin:** For dough and pastry
- **Pastry Brush:** For glazes and egg washes

Quality bakeware distributes heat evenly for perfect results.`,
      uses: `• Baking cookies, cakes, and pastries
• Roasting vegetables and meats
• Making bread and pizza
• Creating pies and tarts
• Cooling baked goods properly`,
      maintenance: "Hand wash recommended. Avoid abrasive cleaners. Dry thoroughly to prevent rust.",
      bestFor: "Baking, roasting, pastry making",
      proTip: "Line baking sheets with parchment paper or silicone mats for easy cleanup and even baking.",
      materials: "Aluminum, steel, glass, ceramic, silicone",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    }
  ];

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveTool(null);
  };

  return (
    <div className="kitchen-tools-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Kitchen Tools Guide</h2>
        <ul className="tools-list">
          {kitchenTools.map(tool => (
            <li key={tool.id} className="tool-item">
              {tool.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="content-header">
          <h1>Essential Kitchen Tools</h1>
          <p className="header-subtitle">Build your perfect kitchen with these must-have tools and equipment</p>
        </header>

        <div className="tools-grid">
          {kitchenTools.map(tool => (
            <div 
              key={tool.id} 
              className="tool-card"
              onClick={() => handleToolClick(tool)}
            >
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${tool.image})` }}
              ></div>
              <div className="card-content">
                <h3>{tool.title}</h3>
                <p className="card-desc">{tool.shortDesc}</p>
                <div className="click-details">
                  Learn More →
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

    

      {/* DETAILED POPUP MODAL */}
      {isModalOpen && activeTool && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            
            {/* Main Image */}
            <div className="modal-header">
              <div 
                className="modal-image"
                style={{ backgroundImage: `url(${activeTool.image})` }}
              ></div>
              <div className="modal-title-section">
                <h2>{activeTool.title}</h2>
                <div className="modal-subtitle">{activeTool.shortDesc}</div>
              </div>
            </div>
            
            <div className="modal-body">
              {/* Detailed Description Section */}
              <div className="section detailed-description">
                <h3>Complete Guide</h3>
                <div className="description-content">
                  {activeTool.detailedDescription?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="description-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Uses Section */}
              <div className="section uses-section">
                <h3>Common Uses</h3>
                <div className="uses-content">
                  {activeTool.uses?.split('\n').map((use, index) => (
                    <div key={index} className="use-item">
                      <span className="use-icon">✓</span>
                      <span className="use-text">{use}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Secondary Image */}
              {activeTool.secondaryImage && (
                <div className="secondary-image-container">
                  <div 
                    className="secondary-image"
                    style={{ backgroundImage: `url(${activeTool.secondaryImage})` }}
                  ></div>
                </div>
              )}
              
              {/* Info Grid */}
              <div className="info-grid">
                <div className="info-box best-for-box">
                  <h4>Best For</h4>
                  <p>{activeTool.bestFor}</p>
                </div>
                
                <div className="info-box materials-box">
                  <h4>Common Materials</h4>
                  <p>{activeTool.materials}</p>
                </div>
                
                <div className="info-box maintenance-box">
                  <h4>Care & Maintenance</h4>
                  <p>{activeTool.maintenance}</p>
                </div>
              </div>
              
              {/* Pro Tip Section */}
              <div className="pro-tip-section">
                <div className="pro-tip-icon">💡</div>
                <div className="pro-tip-content">
                  <h4>Expert Recommendation</h4>
                  <p>{activeTool.proTip}</p>
                </div>
              </div>
              
              {/* Investment Tips */}
              <div className="investment-tips">
                <h4>Smart Buying Tips:</h4>
                <ul>
                  <li>Invest in quality for frequently used tools</li>
                  <li>Buy versatile tools that serve multiple purposes</li>
                  <li>Consider maintenance requirements before purchasing</li>
                  <li>Read reviews from professional chefs and home cooks</li>
                  <li>Test tools in-store when possible for ergonomics</li>
                  <li>Start with essentials and expand as your skills grow</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenToolsPage;