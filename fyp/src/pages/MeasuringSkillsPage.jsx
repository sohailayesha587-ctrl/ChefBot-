import React, { useState } from 'react';
import './MeasuringSkillsPage.css';

const MeasuringSkillsPage = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skills = [
    { 
      id: 1, 
      title: "Dry vs Liquid", 
      shortDesc: "Understanding measurement types.", 
      fullDesc: "Dry ingredients (flour, sugar, grains) must be measured in dry cups and leveled off. Liquid ingredients (water, milk, oil) require clear measuring cups with spouts and must be read at eye level.",
      detailedDescription: `Accurately measuring ingredients is the foundation of successful cooking and baking. The distinction between dry and liquid measurements is crucial because they are designed differently for precision.
      
**Dry Measuring Cups:**
- Made of metal or plastic
- Come in nested sets (¼, ⅓, ½, 1 cup)
- Designed to be filled to the brim and leveled
- Perfect for flour, sugar, grains, powders

**Liquid Measuring Cups:**
- Usually made of glass or clear plastic
- Have a spout for pouring
- Feature measurement markings on the side
- Must be viewed at eye level for accuracy

Using the wrong type can lead to measurement errors of up to 20%, which can ruin delicate recipes.`,
      bestFor: "All types of cooking and baking",
      proTip: "Never measure dry ingredients in liquid cups or vice versa.",
      tools: "Dry measuring cups, liquid measuring cups, straight-edge spatula",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800"
    },
    { 
      id: 2, 
      title: "The Scale Advantage", 
      shortDesc: "Why weight beats volume.", 
      fullDesc: "Professional chefs use digital kitchen scales because weight measurements (grams/ounces) are always accurate. Volume measurements (cups) can vary dramatically depending on how ingredients are packed.",
      detailedDescription: `Weight measurements provide consistent results that volume measurements can't match. A cup of flour can vary by 30 grams depending on how it's scooped and settled.
      
**Why Scales Are Superior:**
1. **Consistency:** 100g of flour is always 100g
2. **Less Cleanup:** Measure directly into mixing bowls
3. **Precision:** Accurate to 1 gram or 0.1 ounce
4. **Conversion Friendly:** Easy to scale recipes up or down
5. **International Recipes:** Most global recipes use weight

**Types of Kitchen Scales:**
- **Digital Scales:** Most accurate, easy to read
- **Mechanical Scales:** No batteries needed
- **Precision Scales:** For small amounts (yeast, spices)

Professional bakers measure almost everything by weight for predictable results every time.`,
      bestFor: "Precision baking, bread making, consistent results",
      proTip: "1 cup of flour can weigh anywhere from 120-150 grams depending on how it's packed.",
      tools: "Digital kitchen scale, batteries, mixing bowls",
      image: "https://images.unsplash.com/photo-1594339044197-39167bd43e6a?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800"
    },
    { 
      id: 3, 
      title: "Spoon & Level", 
      shortDesc: "The right way to measure dry ingredients.", 
      fullDesc: "For accurate flour measurement: 1) Fluff the flour in its container with a fork, 2) Gently spoon flour into measuring cup until overflowing, 3) Level off excess with straight edge of knife.",
      detailedDescription: `The spoon-and-level method is essential for accurate baking measurements. When flour is scooped directly from the bag, it becomes packed and compressed, leading to up to 25% more flour than intended.

**Step-by-Step Process:**
1. **Fluff First:** Use a fork to aerate the flour in its container
2. **Spoon Gently:** Lightly spoon flour into the measuring cup
3. **Overfill:** Let it mound above the rim
4. **Level Off:** Use the straight edge of a knife or spatula to remove excess

**Why It Matters:**
- Too much flour = dense, dry baked goods
- Too little flour = flat, spread-out results
- Proper measurement = consistent texture and rise

This technique is especially important for delicate pastries and cakes where precision matters most.`,
      bestFor: "Cakes, cookies, muffins, and breads",
      proTip: "Never scoop flour directly with measuring cup - it compacts the flour and adds up to 25% more.",
      tools: "Dry measuring cups, fork or whisk, straight-edge knife",
      image: "https://images.unsplash.com/photo-1595908129746-57ca1a63dd4d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800"
    },
    { 
      id: 4, 
      title: "Eye-Level Reading", 
      shortDesc: "Accurate liquid measurements.", 
      fullDesc: "Place liquid measuring cup on a flat surface and bend down so your eyes are level with the measurement line. Read from the bottom of the meniscus (the curve at liquid surface).",
      detailedDescription: `Accurate liquid measurement requires understanding the meniscus - the curve that forms at the surface of liquids in containers. This curvature can cause significant reading errors if not viewed properly.

**Correct Technique:**
1. **Flat Surface:** Place measuring cup on counter, not in hand
2. **Eye Level:** Bend down until your eyes are level with measurement mark
3. **Bottom of Curve:** Read from the lowest point of the meniscus
4. **Clean Cup:** Ensure cup is clean for clear visibility

**Common Errors:**
- Reading from above adds up to 2 tbsp extra
- Reading from below reduces amount by similar margin
- Holding cup instead of placing it flat causes tilting

This is critical for recipes where liquid ratios affect chemical reactions, like in baking or sauce making.`,
      bestFor: "Water, milk, oil, broth, and any liquid ingredients",
      proTip: "Reading from above can result in significant measurement errors.",
      tools: "Liquid measuring cup, flat surface, good lighting",
      image: "https://images.unsplash.com/photo-1590152435552-e78f6962315b?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581092334652-d5728b8a5d3b?auto=format&fit=crop&w=800"
    },
    { 
      id: 5, 
      title: "Temperature Timing", 
      shortDesc: "When thermometers are essential.", 
      fullDesc: "Some ingredients require specific temperatures: butter at room temperature for creaming, cold butter for pastry, warm liquid for yeast activation. Kitchen thermometers ensure precision.",
      detailedDescription: `Temperature control is as important as volume measurement in many recipes. Different cooking and baking processes require specific temperature ranges for optimal results.

**Critical Temperature Zones:**
- **Room Temperature Butter:** 65-68°F (18-20°C) for proper creaming
- **Cold Butter/Dough:** 40-45°F (4-7°C) for flaky pastry
- **Yeast Activation:** 105-115°F (40-46°C) for optimal rise
- **Candy Making:** Precise temperatures from 235°F to 310°F

**Essential Thermometers:**
- **Instant-Read:** Quick checks of liquids and meats
- **Oven Thermometer:** Verify actual oven temperature
- **Candy Thermometer:** High-temperature precision
- **Refrigerator Thermometer:** Ensure food safety

Professional kitchens use thermometers more often than measuring cups for certain applications.`,
      bestFor: "Baking, candy making, meat cooking, yeast breads",
      proTip: "Room temperature butter should be 65-68°F (18-20°C) for optimal baking.",
      tools: "Instant-read thermometer, candy thermometer, oven thermometer",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 6, 
      title: "The Pinch & Dash", 
      shortDesc: "Measuring without tools.", 
      fullDesc: "A pinch = amount between thumb and forefinger. A dash = quick shake from bottle. A smidgen = even smaller amount. These estimates work for seasonings where precision isn't critical.",
      detailedDescription: `Informal measurements have been used by cooks for centuries and still have their place in modern kitchens. These measurements rely on feel and experience rather than precise tools.

**Standardized Equivalents:**
- **Pinch:** 1/16 teaspoon (between thumb and forefinger)
- **Dash:** 1/8 teaspoon (quick shake from shaker)
- **Smidgen:** 1/32 teaspoon (smaller than a pinch)
- **Handful:** Approximately 1/2 cup
- **Dollop:** A small, irregular spoonful

**When to Use Them:**
- Seasoning to taste (salt, pepper, herbs)
- Recipes where exact amounts aren't critical
- When adding personal touch to dishes
- Quick cooking without stopping to measure

These measurements allow for creativity and adjustment based on personal preference and ingredient potency.`,
      bestFor: "Salt, pepper, herbs, spices",
      proTip: "Start with one pinch, taste, then add more if needed.",
      tools: "Fingers, experience, tasting spoons",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 7, 
      title: "Conversion Charts", 
      shortDesc: "Switching between measurement systems.", 
      fullDesc: "Essential conversions: 3 tsp = 1 tbsp, 4 tbsp = 1/4 cup, 16 tbsp = 1 cup. Metric conversions: 1 oz = 28g, 1 cup flour = 120g, 1 cup sugar = 200g.",
      detailedDescription: `Understanding measurement conversions is essential for adapting recipes, scaling quantities, and working with international recipes that use different systems.

**Essential Volume Conversions:**
- 3 teaspoons = 1 tablespoon
- 4 tablespoons = 1/4 cup
- 16 tablespoons = 1 cup
- 2 cups = 1 pint
- 4 cups = 1 quart
- 4 quarts = 1 gallon

**Weight Conversions:**
- 1 ounce = 28.35 grams
- 1 pound = 453.59 grams
- 1 kilogram = 2.2 pounds

**Ingredient-Specific Conversions:**
- All-purpose flour: 1 cup = 120g
- Granulated sugar: 1 cup = 200g
- Brown sugar (packed): 1 cup = 220g
- Butter: 1 cup = 227g (2 sticks)

Keep a conversion chart visible in your kitchen for quick reference.`,
      bestFor: "International recipes, scaling recipes up or down",
      proTip: "Keep a conversion chart inside your pantry door for quick reference.",
      tools: "Conversion chart, calculator, measuring tools",
      image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800"
    },
    { 
      id: 8, 
      title: "Sticky Ingredients", 
      shortDesc: "Measuring honey, syrup, etc.", 
      fullDesc: "For sticky ingredients like honey or molasses: lightly coat measuring cup/spoon with oil or cooking spray first. The ingredient will slide out easily without waste.",
      detailedDescription: `Sticky ingredients present unique measurement challenges. Their viscosity causes them to cling to measuring tools, leading to inaccurate measurements and wasted ingredients.

**Measurement Techniques:**
1. **Grease Method:** Lightly coat measuring tool with oil or cooking spray
2. **Warm Water Method:** Dip tool in warm water before measuring
3. **Weight Method:** Measure by weight instead of volume
4. **Displacement Method:** For syrups, measure oil first, then add syrup

**Special Considerations:**
- **Honey & Syrups:** Warm slightly for easier pouring
- **Peanut Butter:** Use greased tools or measure by weight
- **Molasses:** Grease tool thoroughly; measure quickly
- **Condensed Milk:** Use rubber spatula to remove all contents

These techniques ensure you get the full measured amount into your mixture without waste.`,
      bestFor: "Honey, molasses, corn syrup, peanut butter",
      proTip: "You can also measure sticky ingredients by weight for ultimate accuracy.",
      tools: "Measuring cups/spoons, cooking spray/oil, rubber spatula",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 9, 
      title: "Brown Sugar Packing", 
      shortDesc: "The exception to the rule.", 
      fullDesc: "Unlike flour, brown sugar must be firmly packed into measuring cup. Press down with spoon or fingers until sugar holds shape when inverted.",
      detailedDescription: `Brown sugar is unique among dry ingredients because it contains molasses, which adds moisture and creates clumping. This requires a different measurement approach than other dry ingredients.

**Proper Packing Technique:**
1. **Spoon Into Cup:** Add brown sugar to measuring cup
2. **Press Firmly:** Use back of spoon or fingers to pack down
3. **Add More:** Continue adding and packing until cup is full
4. **Level Off:** Level with straight edge
5. **Test:** Sugar should hold shape when cup is inverted

**Why Packing Is Necessary:**
- Ensures consistent measurement
- Incorporates proper moisture content
- Prevents air pockets
- Provides accurate sweetness level

**If Sugar Has Hardened:**
- Place with apple slice or bread in sealed container overnight
- Microwave briefly with damp paper towel
- Use food processor to break up clumps

Brown sugar should feel like wet sand when properly packed.`,
      bestFor: "Cookies, crumbles, sweet sauces",
      proTip: "If brown sugar has hardened, place with bread slice in sealed container overnight to soften.",
      tools: "Measuring cups, spoon for packing, airtight container",
      image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    }
  ];

  const handleSkillClick = (skill) => {
    setActiveSkill(skill);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveSkill(null);
  };

  return (
    <div className="measuring-skills-page">
      {/* SIDEBAR - JUST TEXT, NO LINKS */}
      <aside className="sidebar">
        <h2>Measurement Tools</h2>
        <ul className="features-list">
          {skills.map(skill => (
            <li 
              key={skill.id} 
              className="feature-item"
            >
              {skill.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT - ALL 9 CARDS */}
      <main className="main-content">
        <header className="content-header">
          <h1>Measuring Skills</h1>
        </header>

        <div className="features-grid">
          {skills.map(skill => (
            <div 
              key={skill.id} 
              className="feature-card"
              onClick={() => handleSkillClick(skill)}
            >
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${skill.image})` }}
              ></div>
              <div className="card-content">
                <h3>{skill.title}</h3>
                <p className="card-desc">{skill.shortDesc}</p>
                <div className="click-details">
                  View Details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* COMPLETE DETAILED POPUP */}
      {isModalOpen && activeSkill && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            
            {/* Main Image */}
            <div className="modal-header">
              <div 
                className="modal-image"
                style={{ backgroundImage: `url(${activeSkill.image})` }}
              ></div>
              <div className="modal-title-section">
                <h2>{activeSkill.title}</h2>
                <div className="modal-subtitle">{activeSkill.shortDesc}</div>
              </div>
            </div>
            
            <div className="modal-body">
              {/* Detailed Description Section */}
              <div className="section detailed-description">
                <h3>Complete Guide</h3>
                <div className="description-content">
                  {activeSkill.detailedDescription?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="description-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Secondary Image */}
              {activeSkill.secondaryImage && (
                <div className="secondary-image-container">
                  <div 
                    className="secondary-image"
                    style={{ backgroundImage: `url(${activeSkill.secondaryImage})` }}
                  ></div>
                </div>
              )}
              
              {/* Info Grid */}
              <div className="info-grid">
                <div className="info-box best-for-box">
                  <h4>Best Used For</h4>
                  <p>{activeSkill.bestFor}</p>
                </div>
                
                <div className="info-box tools-box">
                  <h4>Essential Tools</h4>
                  <p>{activeSkill.tools}</p>
                </div>
                
                <div className="info-box pro-tip-box">
                  <h4>Pro Chef's Tip</h4>
                  <p>{activeSkill.proTip}</p>
                </div>
              </div>
              
              {/* Key Points */}
              <div className="key-points">
                <h4>Key Takeaways:</h4>
                <ul>
                  <li>Always use the right tool for each measurement type</li>
                  <li>Consistency is key for repeatable results</li>
                  <li>When in doubt, weigh ingredients instead of using volume</li>
                  <li>Clean tools ensure accurate measurements</li>
                  <li>Practice develops intuitive measurement skills</li>
                  <li>Document your measurements for future reference</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeasuringSkillsPage;