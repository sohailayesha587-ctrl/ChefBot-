import React, { useState } from 'react';
import './MeatCutsPage .css';

const MeatCutsPage = () => {
  const [activeCut, setActiveCut] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const meatCuts = [
    { 
      id: 1, 
      title: "Ribeye Steak", 
      shortDesc: "Rich, well-marbled cut from the rib section.",
      detailedDescription: `The ribeye steak comes from the rib section of the beef, specifically ribs 6 through 12. This cut is prized for its exceptional marbling (intramuscular fat), which melts during cooking to create incredible juiciness and flavor.

**Characteristics:**
- Excellent marbling throughout
- Rich, beefy flavor
- Tender texture
- Distinct "eye" of fat in center
- Bone-in (rib steak) or boneless

**Grades:**
- **Prime:** Highest marbling, most expensive
- **Choice:** Good marbling, widely available
- **Select:** Leaner, less marbling

The ribeye is considered one of the best steaks for grilling and pan-searing due to its fat content and flavor.`,
      cookingMethods: `• Grilling (high heat, 4-6 minutes per side)
• Pan-searing (cast iron skillet, butter basting)
• Broiling (oven broiler, 4-6 inches from heat)
• Reverse sear (low oven then high-heat sear)
• Smoking (low and slow for extra tenderness)`,
      bestFor: "Grilling, pan-searing, special occasions",
      proTip: "Let ribeye come to room temperature for 30 minutes before cooking for more even doneness.",
      tenderness: "Very tender (9/10)",
      priceRange: "$$$ - Premium cut",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 2, 
      title: "Filet Mignon", 
      shortDesc: "Most tender cut from the tenderloin.",
      detailedDescription: `Filet mignon comes from the smaller end of the beef tenderloin, which is a muscle that does very little work, resulting in extreme tenderness but less fat and marbling compared to other premium cuts.

**Characteristics:**
- Extremely tender (butter knife tender)
- Mild, delicate flavor
- Lean with little marbling
- Small, cylindrical shape
- Often wrapped in bacon for added fat

**Size Variations:**
- Petite filet: 4-6 oz
- Standard filet: 8 oz
- Châteaubriand: Center-cut for two

Filet mignon is prized for its texture rather than flavor, making it perfect for those who prefer very tender meat with subtle beef taste.`,
      cookingMethods: `• Pan-searing with butter basting
• Grilling over high heat (quick cook)
• Oven roasting (for thicker cuts)
• Beef Wellington (wrapped in pastry)
• Steak Diane (pan sauce preparation)`,
      bestFor: "Special occasions, romantic dinners, tender steak lovers",
      proTip: "Cook filet mignon to no more than medium-rare (130°F) to prevent it from drying out.",
      tenderness: "Extremely tender (10/10)",
      priceRange: "$$$$ - Most expensive cut",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 3, 
      title: "New York Strip", 
      shortDesc: "Balanced flavor and tenderness from the short loin.",
      detailedDescription: `The New York strip steak comes from the short loin, behind the ribs but before the tenderloin. It's known for its perfect balance of tenderness and robust beefy flavor, with a characteristic strip of fat along one edge.

**Characteristics:**
- Good marbling but less than ribeye
- Firm texture with beefy flavor
- Strip of fat along one side
- Boneless cut
- Consistent thickness

**Alternative Names:**
- Strip steak
- Kansas City strip
- Ambassador steak
- Club steak (with bone)

The New York strip offers the best of both worlds: good tenderness without being as fatty as ribeye, and more flavor than filet mignon.`,
      cookingMethods: `• Grilling over direct high heat
• Pan-searing in cast iron
• Broiling in oven
• Reverse sear method
• Restaurant-style butter finish`,
      bestFor: "Steakhouse experience, balanced flavor preference",
      proTip: "Cook with the fat side down first to render the fat and use it to baste the steak.",
      tenderness: "Tender (8/10)",
      priceRange: "$$$ - Premium cut",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800"
    },
    { 
      id: 4, 
      title: "Brisket", 
      shortDesc: "Tough cut perfect for low-and-slow cooking.",
      detailedDescription: `Brisket comes from the breast or lower chest of the beef. It's a tough cut with lots of connective tissue that requires long, slow cooking to break down into tender, flavorful meat. It's the star of Texas barbecue.

**Characteristics:**
- Two main parts: flat and point
- Heavy marbling and connective tissue
- Requires long cooking time
- Becomes extremely tender when cooked properly
- Excellent for smoking

**Preparation Styles:**
- Texas-style (salt and pepper rub)
- Jewish-style (braised with vegetables)
- Korean-style (galbi jjim)
- Corned beef (brined and boiled)

Brisket transforms from one of the toughest cuts to one of the most tender and flavorful when cooked with patience and proper technique.`,
      cookingMethods: `• Smoking (225°F for 12-16 hours)
• Braising (low oven with liquid)
• Slow cooking (crockpot/instant pot)
• Pressure cooking (for faster results)
• Oven roasting (covered, low temperature)`,
      bestFor: "Barbecue, Jewish holidays, large gatherings",
      proTip: "Cook brisket to an internal temperature of 195°F-205°F for perfect tenderness.",
      tenderness: "Tough when raw, very tender when cooked properly",
      priceRange: "$$ - Economical for large cuts",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581092334652-d5728b8a5d3b?auto=format&fit=crop&w=800"
    },
    { 
      id: 5, 
      title: "Chuck Roast", 
      shortDesc: "Versatile, flavorful cut for pot roasts.",
      detailedDescription: `Chuck roast comes from the shoulder area of the beef. It's a well-exercised muscle with lots of connective tissue and marbling, making it perfect for moist-heat cooking methods that break down the tough fibers.

**Characteristics:**
- Rich beefy flavor
- Lots of connective tissue
- Good marbling
- Inexpensive compared to steaks
- Becomes fork-tender when braised

**Common Uses:**
- Pot roast (classic American dish)
- Beef stew
- Barbacoa
- Ground beef (chuck makes excellent burgers)
- Beef bourguignon

Chuck roast is the workhorse of the kitchen - affordable, flavorful, and versatile for countless comforting dishes.`,
      cookingMethods: `• Braising (low and slow with liquid)
• Slow cooking (6-8 hours)
• Pressure cooking (1-2 hours)
• Oven roasting (covered, 325°F for 3-4 hours)
• Instant pot (for quick tenderizing)`,
      bestFor: "Pot roasts, stews, braises, comfort food",
      proTip: "Cut chuck roast against the grain for maximum tenderness after cooking.",
      tenderness: "Tough when raw, tender when braised",
      priceRange: "$ - Economical family meal",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 6, 
      title: "Flank Steak", 
      shortDesc: "Lean, flavorful cut perfect for marinating.",
      detailedDescription: `Flank steak comes from the abdominal muscles of the cow. It's a lean cut with long, noticeable muscle fibers and intense beefy flavor. While not naturally tender, it becomes excellent when properly prepared.

**Characteristics:**
- Long, visible muscle grains
- Lean with little fat
- Intense beef flavor
- Best when marinated
- Must be sliced thinly against the grain

**International Dishes:**
- Fajitas (Mexican)
- London broil (American)
- Stir-fry (Asian)
- Rollatini (Italian)
- Roulade (French)

Flank steak is a budget-friendly alternative to premium steaks that delivers incredible flavor when treated with the right techniques.`,
      cookingMethods: `• Grilling over high heat
• Broiling in oven
• Pan-searing quickly
• Stir-frying (thin slices)
• Marinating (4-24 hours before cooking)`,
      bestFor: "Fajitas, stir-fries, marinated dishes, budget meals",
      proTip: "Always slice flank steak thinly against the grain to maximize tenderness.",
      tenderness: "Moderately tough (5/10)",
      priceRange: "$$ - Good value",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 7, 
      title: "Short Ribs", 
      shortDesc: "Rich, bone-in cut for braising.",
      detailedDescription: `Short ribs come from the brisket, chuck, or plate areas. They're cut across the bone into individual portions with rich marbling and connective tissue that melts into luxurious tenderness during slow cooking.

**Characteristics:**
- Bone-in for extra flavor
- Excellent marbling
- Rich, beefy flavor
- Becomes fall-off-the-bone tender
- Two styles: English cut and flanken cut

**Preparation Styles:**
- Braised short ribs (classic)
- Korean galbi (marinated, grilled)
- Barbecue smoked ribs
- Red wine braised
- Pressure cooker style

Short ribs offer restaurant-quality results at home with their luxurious texture and deep flavor profile.`,
      cookingMethods: `• Braising (2-3 hours in liquid)
• Slow cooking (6-8 hours)
• Pressure cooking (45-60 minutes)
• Oven roasting (low and slow)
• Grilling (for Korean-style after marinating)`,
      bestFor: "Special dinners, luxurious braises, winter comfort food",
      proTip: "Brown short ribs well before braising to develop deep flavor in the sauce.",
      tenderness: "Tough when raw, extremely tender when braised",
      priceRange: "$$ - Moderate price for premium results",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581092334652-d5728b8a5d3b?auto=format&fit=crop&w=800"
    },
    { 
      id: 8, 
      title: "Sirloin Steak", 
      shortDesc: "Versatile, affordable steak for everyday meals.",
      detailedDescription: `Sirloin steak comes from the rear back portion of the cow, just past the short loin. It's a large area that produces several different cuts with varying degrees of tenderness and flavor.

**Types of Sirloin:**
- **Top sirloin:** Most tender of sirloins
- **Bottom sirloin:** Less tender, good for grinding
- **Tri-tip:** Triangular cut from bottom sirloin
- **Sirloin tip:** Lean, good for roasting or kabobs

**Characteristics:**
- Good beef flavor
- Moderate tenderness
- Less expensive than premium cuts
- Versatile for many cooking methods
- Can be grilled, broiled, or pan-fried

Sirloin offers excellent value for everyday steak meals without sacrificing too much on flavor or texture.`,
      cookingMethods: `• Grilling over medium-high heat
• Pan-searing with butter
• Broiling (4-6 inches from heat)
• Marinating for extra tenderness
• Cutting for stir-fry or kabobs`,
      bestFor: "Everyday meals, family dinners, budget-friendly steaks",
      proTip: "Use a meat mallet to tenderize sirloin steaks before cooking for better texture.",
      tenderness: "Moderately tender (6/10)",
      priceRange: "$$ - Good everyday value",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    }
  ];

  const handleCutClick = (cut) => {
    setActiveCut(cut);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveCut(null);
  };

  return (
    <div className="meat-cuts-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Meat Cuts Guide</h2>
        <ul className="cuts-list">
          {meatCuts.map(cut => (
            <li key={cut.id} className="cut-item">
              {cut.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="content-header">
          <h1>Beef Cuts & Steaks</h1>
          <p className="header-subtitle">Master the art of selecting and cooking different beef cuts</p>
        </header>

        <div className="cuts-grid">
          {meatCuts.map(cut => (
            <div 
              key={cut.id} 
              className="cut-card"
              onClick={() => handleCutClick(cut)}
            >
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${cut.image})` }}
              ></div>
              <div className="card-content">
                <h3>{cut.title}</h3>
                <p className="card-desc">{cut.shortDesc}</p>
                <div className="click-details">
                  Learn More →
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* NO FOOTER HERE - It's in the layout */}

      {/* DETAILED POPUP MODAL */}
      {isModalOpen && activeCut && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            
            {/* Main Image */}
            <div className="modal-header">
              <div 
                className="modal-image"
                style={{ backgroundImage: `url(${activeCut.image})` }}
              ></div>
              <div className="modal-title-section">
                <h2>{activeCut.title}</h2>
                <div className="modal-subtitle">{activeCut.shortDesc}</div>
              </div>
            </div>
            
            <div className="modal-body">
              {/* Detailed Description Section */}
              <div className="section detailed-description">
                <h3>Complete Guide</h3>
                <div className="description-content">
                  {activeCut.detailedDescription?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="description-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Cooking Methods Section */}
              <div className="section cooking-methods-section">
                <h3>Recommended Cooking Methods</h3>
                <div className="methods-content">
                  {activeCut.cookingMethods?.split('\n').map((method, index) => (
                    <div key={index} className="method-item">
                      <span className="method-icon">•</span>
                      <span className="method-text">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Secondary Image */}
              {activeCut.secondaryImage && (
                <div className="secondary-image-container">
                  <div 
                    className="secondary-image"
                    style={{ backgroundImage: `url(${activeCut.secondaryImage})` }}
                  ></div>
                </div>
              )}
              
              {/* Info Grid */}
              <div className="info-grid">
                <div className="info-box best-for-box">
                  <h4>Best For</h4>
                  <p>{activeCut.bestFor}</p>
                </div>
                
                <div className="info-box tenderness-box">
                  <h4>Tenderness</h4>
                  <p>{activeCut.tenderness}</p>
                </div>
                
                <div className="info-box price-box">
                  <h4>Price Range</h4>
                  <p>{activeCut.priceRange}</p>
                </div>
              </div>
              
              {/* Pro Tip Section */}
              <div className="pro-tip-section">
                <div className="pro-tip-icon">🥩</div>
                <div className="pro-tip-content">
                  <h4>Butcher's Pro Tip</h4>
                  <p>{activeCut.proTip}</p>
                </div>
              </div>
              
              {/* Cooking Tips */}
              <div className="cooking-tips">
                <h4>Essential Cooking Tips:</h4>
                <ul>
                  <li>Always pat meat dry before cooking for better searing</li>
                  <li>Let steak rest for 5-10 minutes after cooking for juicier results</li>
                  <li>Use a meat thermometer for perfect doneness every time</li>
                  <li>Season generously with salt and pepper before cooking</li>
                  <li>Cut against the grain for maximum tenderness</li>
                  <li>Invest in a good cast iron skillet for perfect steak searing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeatCutsPage;