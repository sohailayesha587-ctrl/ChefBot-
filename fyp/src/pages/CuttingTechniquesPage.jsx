import React, { useState } from 'react';
import './CuttingTechniquesPage.css';

const CuttingTechniquesPage = () => {
  const [activeStyle, setActiveStyle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cuttingStyles = [
    { 
      id: 1, 
      title: "Julienne", 
      shortDesc: "Thin matchstick cuts for quick cooking.",
      detailedDescription: `The julienne cut creates uniform matchstick-shaped pieces, typically 1/8 inch thick and 2-3 inches long. This classic French technique ensures even cooking and elegant presentation.

**Key Characteristics:**
- Uniform 1/8" × 1/8" × 2-3" pieces
- Perfect for quick stir-frying or sautéing
- Creates beautiful, consistent texture
- Essential for Asian and French cuisine

**Perfect For:**
- Stir-fry vegetables
- Garnishes for soups and salads
- French vegetable soups
- Quick-cooking side dishes`,
      technique: `Step 1: Cut vegetable into 2-3 inch long pieces
Step 2: Slice lengthwise into 1/8 inch thick planks
Step 3: Stack planks and cut into 1/8 inch strips
Step 4: Keep strips uniform for even cooking
Step 5: Use for stir-fries or as garnish`,
      rule: "Always cut against the grain of the vegetable for cleaner cuts.",
      bestFor: "Carrots, bell peppers, zucchini, celery",
      proTip: "Chill vegetables in ice water for 30 minutes before cutting for extra crispiness.",
      tools: "Chef's knife, cutting board, mandoline (optional)",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 2, 
      title: "Brunoise", 
      shortDesc: "Tiny perfect cubes for fine dining.",
      detailedDescription: `The brunoise is the finest of all dice cuts, creating perfectly uniform 1/8 inch cubes. This precision cut requires patience and skill but results in exquisite presentation and even cooking.

**Key Characteristics:**
- 1/8 inch × 1/8 inch × 1/8 inch cubes
- Requires multiple precision cuts
- Time-consuming but beautiful
- Dissolves into sauces for texture

**Perfect For:**
- Garnishing fine dishes
- Soups and consommés
- Salsas and relishes
- Decorative elements`,
      technique: `Step 1: Start with julienne cuts (1/8" strips)
Step 2: Gather strips into a tight bundle
Step 3: Cut crosswise into 1/8 inch pieces
Step 4: Spread cubes to check uniformity
Step 5: Use immediately or store in cold water`,
      rule: "Work with a very sharp knife and clean cuts—no sawing motions.",
      bestFor: "Carrots, onions, celery, turnips",
      proTip: "Use a mandoline for perfectly uniform strips before cubing.",
      tools: "Sharp chef's knife, cutting board, mandoline recommended",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 3, 
      title: "Chiffonade", 
      shortDesc: "Elegant ribbon cuts for leafy greens.",
      detailedDescription: `The chiffonade technique creates delicate ribbons from leafy greens and herbs. This French method preserves flavor and creates beautiful presentation for both garnishes and cooked dishes.

**Key Characteristics:**
- Thin ribbon-like strips
- Perfect for leafy vegetables
- Releases maximum flavor
- Beautiful visual presentation

**Perfect For:**
- Basil, mint, and other herbs
- Spinach and other leafy greens
- Garnishing soups and pasta
- Salad presentations`,
      technique: `Step 1: Stack leaves neatly on top of each other
Step 2: Roll leaves tightly into a cigar shape
Step 3: Slice crosswise into thin ribbons
Step 4: Fluff ribbons gently with fingers
Step 5: Use immediately to prevent browning`,
      rule: "Always use a very sharp knife and cut in one smooth motion.",
      bestFor: "Basil, mint, spinach, kale, cabbage",
      proTip: "Chill leaves in refrigerator for 30 minutes before cutting for cleaner edges.",
      tools: "Sharp chef's knife, cutting board",
      image: "https://images.unsplash.com/photo-1519996409144-56c88c9aa612?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800"
    },
    { 
      id: 4, 
      title: "Dice", 
      shortDesc: "Versatile cubes for everyday cooking.",
      detailedDescription: `Dicing creates uniform cubes that cook evenly and look professional. Different sizes serve different purposes in cooking, from small dice for sauces to large dice for stews and roasts.

**Types of Dice:**
- **Large Dice:** 3/4 inch cubes (stews, roasting)
- **Medium Dice:** 1/2 inch cubes (soups, sautés)
- **Small Dice:** 1/4 inch cubes (sauces, salsas)
- **Brunoise:** 1/8 inch cubes (garnishes)

**Perfect For:**
- Soups and stews
- Sautéed vegetables
- Salsas and relishes
- Vegetable medleys`,
      technique: `Step 1: Trim vegetable and create flat sides
Step 2: Cut into uniform planks of desired thickness
Step 3: Cut planks into uniform sticks (batons)
Step 4: Cut sticks crosswise into cubes
Step 5: Maintain consistent size for even cooking`,
      rule: "The size of the dice determines cooking time—smaller dice cook faster.",
      bestFor: "Potatoes, carrots, onions, bell peppers",
      proTip: "Use the 'claw grip' with your non-cutting hand for safety and control.",
      tools: "Chef's knife, cutting board, ruler (for precision)",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 5, 
      title: "Slice", 
      shortDesc: "Basic cuts for all skill levels.",
      detailedDescription: `Slicing is the foundation of all knife skills, creating flat pieces of consistent thickness. Mastering different slicing techniques allows for proper cooking and beautiful presentation.

**Types of Slices:**
- **Rounds:** Circular slices (carrots, cucumbers)
- **Diagonal:** Angled cuts for more surface area
- **Bias:** Angled cuts for Asian dishes
- **Roll Cut:** Irregular cuts for uneven vegetables

**Perfect For:**
- Tomato and cucumber salads
- Stir-fry vegetables
- Potato and root vegetable dishes
- Bread and meat slicing`,
      technique: `Step 1: Secure vegetable with claw grip
Step 2: Position knife at desired angle
Step 3: Use smooth rocking motion
Step 4: Maintain consistent thickness
Step 5: Use sharp knife for clean cuts`,
      rule: "Let the knife do the work—apply minimal pressure with proper technique.",
      bestFor: "Tomatoes, cucumbers, potatoes, onions",
      proTip: "Sharpen your knife before slicing for cleaner, safer cuts.",
      tools: "Sharp chef's knife, cutting board, honing steel",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581092334652-d5728b8a5d3b?auto=format&fit=crop&w=800"
    },
    { 
      id: 6, 
      title: "Mince", 
      shortDesc: "Ultra-fine cuts for maximum flavor.",
      detailedDescription: `Mincing creates the smallest possible pieces, releasing maximum flavor and creating smooth textures. This technique is essential for garlic, herbs, and aromatics where you want flavor distributed throughout the dish.

**Key Characteristics:**
- Extremely fine pieces
- Releases maximum flavor compounds
- Creates smooth texture
- Essential for aromatics

**Perfect For:**
- Garlic, ginger, and shallots
- Fresh herbs (parsley, cilantro)
- Onions for sauces and pastes
- Flavor bases for soups and stews`,
      technique: `Step 1: Rough chop ingredient first
Step 2: Gather pieces into a tight pile
Step 3: Use rocking motion with knife tip anchored
Step 4: Continue chopping until desired fineness
Step 5: Scrape and gather occasionally`,
      rule: "Keep the tip of your knife on the board while rocking for control.",
      bestFor: "Garlic, ginger, onions, fresh herbs",
      proTip: "Sprinkle with a little salt to prevent sticking and enhance flavor extraction.",
      tools: "Sharp chef's knife, cutting board",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800"
    },
    { 
      id: 7, 
      title: "Batonnet", 
      shortDesc: "Thick sticks for roasting and frying.",
      detailedDescription: `The batonnet cut creates thick sticks, larger than julienne but smaller than French fries. This versatile cut is perfect for vegetables that will be roasted, fried, or served as crudités.

**Key Characteristics:**
- 1/4 inch × 1/4 inch × 2-3 inches
- Substantial texture and bite
- Holds shape during cooking
- Great for roasting and frying

**Perfect For:**
- French fries and steak fries
- Roasted vegetable sticks
- Crudités with dips
- Stir-fry with longer cooking times`,
      technique: `Step 1: Trim ends and create rectangular block
Step 2: Cut into 1/4 inch thick slabs
Step 3: Stack slabs and cut into 1/4 inch sticks
Step 4: Trim to 2-3 inch length
Step 5: Soak potatoes in cold water if frying`,
      rule: "Cut vegetables of similar density to ensure even cooking.",
      bestFor: "Potatoes, carrots, zucchini, cucumbers",
      proTip: "For perfect fries, soak cut potatoes in cold water for 1 hour to remove excess starch.",
      tools: "Chef's knife, cutting board, ruler for precision",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 8, 
      title: "Tourné", 
      shortDesc: "Football-shaped elegant cuts.",
      detailedDescription: `Tourné is an advanced knife cut that creates seven-sided football-shaped pieces. This classical French technique requires skill and patience but results in the most elegant vegetable presentation.

**Key Characteristics:**
- Seven equal sides
- Football or barrel shape
- 2 inches long, 3/4 inch diameter
- Time-consuming but impressive

**Perfect For:**
- Fine dining presentations
- Classical French cuisine
- Special occasion dishes
- Garnishing luxury meals`,
      technique: `Step 1: Cut vegetable into 2 inch cylinders
Step 2: Trim ends to create football shape
Step 3: Make seven equal angled cuts
Step 4: Rotate and trim for uniformity
Step 5: Practice with potatoes first`,
      rule: "Keep turning the vegetable while cutting to maintain seven equal sides.",
      bestFor: "Potatoes, carrots, turnips, zucchini",
      proTip: "Use a bird's beak paring knife for better control and curved cuts.",
      tools: "Bird's beak paring knife, cutting board, practice vegetables",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    }
  ];

  const handleStyleClick = (style) => {
    setActiveStyle(style);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveStyle(null);
  };

  return (
    <div className="cutting-styles-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Knife Skills Guide</h2>
        <ul className="styles-list">
          {cuttingStyles.map(style => (
            <li key={style.id} className="style-item">
              {style.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="content-header">
          <h1>Cutting & Knife Skills</h1>
          <p className="header-subtitle">Master professional cutting techniques for perfect results</p>
        </header>

        <div className="styles-grid">
          {cuttingStyles.map(style => (
            <div 
              key={style.id} 
              className="style-card"
              onClick={() => handleStyleClick(style)}
            >
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${style.image})` }}
              ></div>
              <div className="card-content">
                <h3>{style.title}</h3>
                <p className="card-desc">{style.shortDesc}</p>
                <div className="click-details">
                  Learn Technique →
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-text">
            © 2024 Culinary Knife Skills | Professional Cutting Techniques
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">Safety Guide</a>
            <a href="#" className="footer-link">Knife Selection</a>
            <a href="#" className="footer-link">Video Tutorials</a>
            <a href="#" className="footer-link">Chef Courses</a>
          </div>
        </div>
      </footer>

      {/* DETAILED POPUP MODAL */}
      {isModalOpen && activeStyle && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            
            {/* Main Image */}
            <div className="modal-header">
              <div 
                className="modal-image"
                style={{ backgroundImage: `url(${activeStyle.image})` }}
              ></div>
              <div className="modal-title-section">
                <h2>{activeStyle.title}</h2>
                <div className="modal-subtitle">{activeStyle.shortDesc}</div>
              </div>
            </div>
            
            <div className="modal-body">
              {/* Detailed Description Section */}
              <div className="section detailed-description">
                <h3>Complete Guide</h3>
                <div className="description-content">
                  {activeStyle.detailedDescription?.split('\n\n').map((paragraph, index) => (
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
                  {activeStyle.technique?.split('\n').map((step, index) => (
                    <div key={index} className="step-item">
                      <span className="step-number">{index + 1}</span>
                      <span className="step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Secondary Image */}
              {activeStyle.secondaryImage && (
                <div className="secondary-image-container">
                  <div 
                    className="secondary-image"
                    style={{ backgroundImage: `url(${activeStyle.secondaryImage})` }}
                  ></div>
                </div>
              )}
              
              {/* Info Grid */}
              <div className="info-grid">
                <div className="info-box best-for-box">
                  <h4>Best For</h4>
                  <p>{activeStyle.bestFor}</p>
                </div>
                
                <div className="info-box tools-box">
                  <h4>Essential Tools</h4>
                  <p>{activeStyle.tools}</p>
                </div>
                
                <div className="info-box rule-box">
                  <h4>Golden Rule</h4>
                  <p>{activeStyle.rule}</p>
                </div>
              </div>
              
              {/* Pro Tip Section */}
              <div className="pro-tip-section">
                <div className="pro-tip-icon">🔪</div>
                <div className="pro-tip-content">
                  <h4>Chef's Pro Tip</h4>
                  <p>{activeStyle.proTip}</p>
                </div>
              </div>
              
              {/* Safety Tips */}
              <div className="safety-tips">
                <h4>Safety Tips:</h4>
                <ul>
                  <li>Always use a sharp knife—dull knives are more dangerous</li>
                  <li>Keep fingers curled in a claw grip away from blade</li>
                  <li>Cut on a stable, non-slip cutting board</li>
                  <li>Focus completely on the task—no distractions</li>
                  <li>Clean as you go to prevent slipping hazards</li>
                  <li>Store knives properly in a block or on magnetic strip</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CuttingTechniquesPage;