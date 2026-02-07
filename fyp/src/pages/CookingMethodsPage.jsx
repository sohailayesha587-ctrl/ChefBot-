import React, { useState } from 'react';
import './CookingMethodsPage.css';

const CookingMethodsPage = () => {
  const [activeMethod, setActiveMethod] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cookingMethods = [
    { 
      id: 1, 
      title: "Sautéing", 
      shortDesc: "Quick cooking with minimal oil over high heat.",
      detailedDescription: `Sautéing is a quick cooking method that uses a small amount of oil or fat in a shallow pan over relatively high heat. The word 'sauté' comes from the French verb 'sauter,' meaning 'to jump,' referring to the tossing motion used while cooking.

**Key Characteristics:**
- High heat cooking
- Small amount of oil
- Constant stirring or tossing
- Preserves texture and nutrients
- Quick cooking time (3-10 minutes)

**Best Pans for Sautéing:**
- Sauté pan (straight sides)
- Skillet (sloped sides)
- Wok (for stir-frying)
- Cast iron skillet

This method is perfect for vegetables, thin cuts of meat, and seafood that cook quickly.`,
      technique: `1. Heat pan over medium-high to high heat
2. Add small amount of oil (1-2 tbsp)
3. Wait until oil shimmers but doesn't smoke
4. Add food in single layer (don't overcrowd)
5. Stir or toss frequently
6. Cook until desired doneness
7. Season at the end for best flavor`,
      bestFor: "Vegetables, chicken breasts, shrimp, thinly sliced meats",
      proTip: "Pat food completely dry before sautéing to ensure proper browning and prevent steaming.",
      temperature: "Medium-high to high heat (350°F - 400°F)",
      equipment: "Sauté pan or skillet, wooden spoon or spatula, high smoke point oil",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 2, 
      title: "Roasting", 
      shortDesc: "Dry heat cooking in the oven for caramelization.",
      detailedDescription: `Roasting is a dry-heat cooking method that uses hot air to cook food, usually in an oven. This method creates beautiful caramelization through the Maillard reaction and is excellent for developing deep, complex flavors.

**Key Characteristics:**
- Dry heat cooking
- High temperature (usually 400°F+)
- Creates caramelized exterior
- Concentrates flavors
- Best for larger, dense foods

**Types of Roasting:**
- High-heat roasting (425°F+)
- Low-and-slow roasting (275°F-325°F)
- Combination roasting (start high, finish low)

Roasting transforms vegetables into sweet, tender delights and creates crispy skin on meats and poultry.`,
      technique: `1. Preheat oven to proper temperature
2. Prepare food (pat dry, season, oil)
3. Use shallow roasting pan or baking sheet
4. Don't overcrowd the pan
5. Rotate pan halfway through cooking
6. Use meat thermometer for accuracy
7. Let rest before cutting/serving`,
      bestFor: "Whole chickens, beef roasts, root vegetables, potatoes",
      proTip: "Leave space between pieces on the baking sheet for proper air circulation and even browning.",
      temperature: "350°F - 450°F (depending on item)",
      equipment: "Roasting pan, baking sheet, oven thermometer, meat thermometer",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 3, 
      title: "Braising", 
      shortDesc: "Slow cooking with both dry and moist heat.",
      detailedDescription: `Braising is a combination cooking method that uses both dry and moist heat. Food is typically seared first at high temperature, then finished in a covered pot with liquid at lower temperature for a longer time.

**Key Characteristics:**
- Two-step cooking process
- Low and slow finish
- Moist heat environment
- Breaks down tough fibers
- Creates rich, concentrated sauces

**Perfect Foods for Braising:**
- Tough cuts of meat (chuck, brisket, short ribs)
- Root vegetables
- Dried beans and legumes
- Cabbage and hearty greens

This method transforms inexpensive, tough cuts into tender, flavorful dishes with minimal effort.`,
      technique: `1. Season and dredge food if desired
2. Sear in hot oil until browned
3. Remove food and sauté aromatics
4. Deglaze pan with liquid (wine, stock)
5. Return food to pan, add more liquid
6. Cover and simmer low and slow
7. Finish sauce by reducing liquid`,
      bestFor: "Tough meat cuts, root vegetables, stews, pot roasts",
      proTip: "Don't rush the searing step—proper browning creates the foundation of flavor for the entire dish.",
      temperature: "Sear: High heat | Braise: Low heat (275°F - 325°F)",
      equipment: "Dutch oven or heavy pot with lid, tongs, meat thermometer",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800"
    },
    { 
      id: 4, 
      title: "Steaming", 
      shortDesc: "Gentle cooking with hot vapor.",
      detailedDescription: `Steaming is a moist-heat cooking method that uses hot vapor to cook food. This gentle technique preserves nutrients, color, and texture better than most other cooking methods.

**Key Characteristics:**
- Moist heat cooking
- Low temperature (212°F/100°C maximum)
- Preserves nutrients and color
- Doesn't require fat
- Delicate cooking method

**Steaming Methods:**
- Bamboo steamer (traditional)
- Metal steamer basket
- Electric steamer
- Microwave steaming
- Pressure cooker steaming

Steaming is particularly good for delicate foods like fish, dumplings, and vegetables that can easily overcook.`,
      technique: `1. Bring water to a boil in pot
2. Place steamer basket above water level
3. Arrange food in single layer
4. Cover tightly to trap steam
5. Don't peek—maintain steam
6. Check for doneness at minimum time
7. Season after cooking`,
      bestFor: "Vegetables, fish, dumplings, rice, tamales",
      proTip: "Add herbs, citrus slices, or spices to the steaming water to infuse subtle flavors into the food.",
      temperature: "212°F (100°C) - boiling point of water",
      equipment: "Steamer basket, pot with lid, bamboo steamer, electric steamer",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581092334652-d5728b8a5d3b?auto=format&fit=crop&w=800"
    },
    { 
      id: 5, 
      title: "Grilling", 
      shortDesc: "Direct heat cooking with characteristic grill marks.",
      detailedDescription: `Grilling is a dry-heat cooking method that uses direct radiant heat from below. It creates characteristic grill marks and a smoky flavor, especially when using charcoal or wood chips.

**Key Characteristics:**
- Direct heat from below
- High temperature cooking
- Creates grill marks
- Smoky flavor (especially with charcoal)
- Quick cooking method

**Grilling Methods:**
- Charcoal grilling (traditional smoky flavor)
- Gas grilling (convenient, controllable)
- Wood-fired grilling (intense flavor)
- Indoor grill pans (year-round option)

Grilling is perfect for foods that cook quickly and benefit from caramelization and smoky flavors.`,
      technique: `1. Preheat grill for 10-15 minutes
2. Clean and oil grill grates
3. Pat food dry and season
4. Place on hot grill at angle for marks
5. Don't move food until it releases easily
6. Use two-zone fire for control
7. Let rest before serving`,
      bestFor: "Steaks, burgers, chicken pieces, vegetables, seafood",
      proTip: "Let meat come to room temperature for 30 minutes before grilling for more even cooking.",
      temperature: "High heat (400°F - 550°F)",
      equipment: "Grill, tongs, grill brush, meat thermometer, instant-read thermometer",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 6, 
      title: "Poaching", 
      shortDesc: "Gentle cooking in barely simmering liquid.",
      detailedDescription: `Poaching is a moist-heat cooking method that involves cooking food in liquid at a temperature just below boiling (160°F - 180°F). This gentle technique is perfect for delicate foods that can easily fall apart or overcook.

**Key Characteristics:**
- Low temperature cooking
- Moist heat environment
- Gentle on delicate foods
- Infuses flavor from poaching liquid
- Preserves moisture and tenderness

**Types of Poaching:**
- Shallow poaching (small amount of liquid)
- Deep poaching (completely submerged)
- Court bouillon (flavored poaching liquid)
- Oil poaching (for extra richness)

Poaching creates tender, moist results without adding fat or aggressive cooking methods.`,
      technique: `1. Prepare poaching liquid (season well)
2. Heat to just below simmer (tiny bubbles)
3. Add food, maintaining temperature
4. Don't let liquid boil (gentle bubbles only)
5. Cook until just done (check frequently)
6. Remove with slotted spoon
7. Reduce liquid for sauce if desired`,
      bestFor: "Fish fillets, eggs, chicken breasts, fruit, delicate seafood",
      proTip: "Use a thermometer to maintain perfect poaching temperature (165°F - 180°F).",
      temperature: "160°F - 180°F (just below simmering)",
      equipment: "Shallow pan, thermometer, slotted spoon, fine-mesh strainer",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 7, 
      title: "Frying", 
      shortDesc: "Cooking by immersion in hot oil.",
      detailedDescription: `Frying is a cooking method where food is submerged in hot oil or fat. This creates a crispy exterior while keeping the interior moist. There are several types of frying, each with different applications.

**Types of Frying:**
- **Deep frying:** Completely submerged in oil
- **Shallow frying:** Partially submerged
- **Pan frying:** Small amount of oil, similar to sautéing
- **Stir frying:** Very high heat, constant motion
- **Air frying:** Hot air circulation with minimal oil

Proper frying creates food with a crispy exterior and tender interior without being greasy.`,
      technique: `1. Choose oil with high smoke point
2. Heat oil to proper temperature (use thermometer)
3. Pat food completely dry
4. Dredge or batter as recipe directs
5. Fry in batches (don't overcrowd)
6. Drain on wire rack, not paper towels
7. Season immediately after frying`,
      bestFor: "Chicken, potatoes, doughnuts, tempura, fritters",
      proTip: "Use a thermometer to maintain oil temperature—temperature drops when adding food cause greasy results.",
      temperature: "325°F - 375°F (depending on food)",
      equipment: "Deep fryer or heavy pot, thermometer, spider strainer, wire rack",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800"
    },
    { 
      id: 8, 
      title: "Baking", 
      shortDesc: "Dry heat cooking in enclosed oven.",
      detailedDescription: `Baking is a dry-heat cooking method that uses hot air circulating in an enclosed oven. While similar to roasting, baking typically refers to breads, pastries, and desserts, though the terms are often used interchangeably.

**Key Characteristics:**
- Dry heat in enclosed space
- Even heat distribution
- Creates crust or crust formation
- Chemical reactions (leavening, caramelization)
- Precise temperature control

**Baking Applications:**
- Breads and pastries
- Cakes and cookies
- Casseroles and gratins
- Pizza and flatbreads
- Egg dishes (quiches, soufflés)

Baking relies on precise measurements and temperatures for consistent results.`,
      technique: `1. Preheat oven thoroughly
2. Prepare pans (grease, line, flour)
3. Measure ingredients accurately
4. Follow recipe mixing instructions
5. Bake in center of oven
6. Rotate pans halfway if needed
7. Test for doneness (toothpick, thermometer)`,
      bestFor: "Breads, cakes, cookies, casseroles, pies, pastries",
      proTip: "Invest in an oven thermometer—most home ovens run hot or cold, affecting baking results.",
      temperature: "300°F - 450°F (varies widely by recipe)",
      equipment: "Oven, baking sheets, cake pans, mixing bowls, measuring tools, oven thermometer",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    }
  ];

  const handleMethodClick = (method) => {
    setActiveMethod(method);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveMethod(null);
  };

  return (
    <div className="cooking-methods-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Cooking Methods</h2>
        <ul className="methods-list">
          {cookingMethods.map(method => (
            <li key={method.id} className="method-item">
              {method.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="content-header">
          <h1>Cooking Techniques & Methods</h1>
          <p className="header-subtitle">Master professional cooking techniques for perfect results every time</p>
        </header>

        <div className="methods-grid">
          {cookingMethods.map(method => (
            <div 
              key={method.id} 
              className="method-card"
              onClick={() => handleMethodClick(method)}
            >
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${method.image})` }}
              ></div>
              <div className="card-content">
                <h3>{method.title}</h3>
                <p className="card-desc">{method.shortDesc}</p>
                <div className="click-details">
                  Learn Technique →
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* NO FOOTER HERE - It's in the main layout */}

      {/* DETAILED POPUP MODAL */}
      {isModalOpen && activeMethod && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            
            {/* Main Image */}
            <div className="modal-header">
              <div 
                className="modal-image"
                style={{ backgroundImage: `url(${activeMethod.image})` }}
              ></div>
              <div className="modal-title-section">
                <h2>{activeMethod.title}</h2>
                <div className="modal-subtitle">{activeMethod.shortDesc}</div>
              </div>
            </div>
            
            <div className="modal-body">
              {/* Detailed Description Section */}
              <div className="section detailed-description">
                <h3>Complete Guide</h3>
                <div className="description-content">
                  {activeMethod.detailedDescription?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="description-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Technique Section */}
              <div className="section technique-section">
                <h3>Step-by-Step Technique</h3>
                <div className="technique-content">
                  {activeMethod.technique?.split('\n').map((step, index) => (
                    <div key={index} className="step-item">
                      <span className="step-number">{index + 1}</span>
                      <span className="step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Secondary Image */}
              {activeMethod.secondaryImage && (
                <div className="secondary-image-container">
                  <div 
                    className="secondary-image"
                    style={{ backgroundImage: `url(${activeMethod.secondaryImage})` }}
                  ></div>
                </div>
              )}
              
              {/* Info Grid */}
              <div className="info-grid">
                <div className="info-box best-for-box">
                  <h4>Best For</h4>
                  <p>{activeMethod.bestFor}</p>
                </div>
                
                <div className="info-box temperature-box">
                  <h4>Temperature Range</h4>
                  <p>{activeMethod.temperature}</p>
                </div>
                
                <div className="info-box equipment-box">
                  <h4>Essential Equipment</h4>
                  <p>{activeMethod.equipment}</p>
                </div>
              </div>
              
              {/* Pro Tip Section */}
              <div className="pro-tip-section">
                <div className="pro-tip-icon">🔥</div>
                <div className="pro-tip-content">
                  <h4>Chef's Pro Tip</h4>
                  <p>{activeMethod.proTip}</p>
                </div>
              </div>
              
              {/* Safety Notes */}
              <div className="safety-notes">
                <h4>Important Safety Notes:</h4>
                <ul>
                  <li>Always use appropriate heat-resistant utensils</li>
                  <li>Keep flammable materials away from cooking areas</li>
                  <li>Use oven mitts or pot holders for hot items</li>
                  <li>Never leave cooking food unattended</li>
                  <li>Keep a fire extinguisher in or near the kitchen</li>
                  <li>Use proper ventilation when cooking with high heat</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookingMethodsPage;