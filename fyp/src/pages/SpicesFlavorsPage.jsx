import React, { useState } from 'react';
import './SpicesFlavorsPage.css';

const SpicesFlavorsPage = () => {
  const [activeSpice, setActiveSpice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const spicesFlavors = [
    { 
      id: 1, 
      title: "Cumin", 
      shortDesc: "Earthy, warm spice essential in global cuisines.",
      detailedDescription: `Cumin is one of the most widely used spices in the world, known for its distinctive warm, earthy, and slightly bitter flavor. It's a seed from the Cuminum cyminum plant and is often toasted before use to enhance its aromatic qualities.

**Flavor Profile:**
- Earthy and warm
- Slightly bitter and nutty
- Pungent aroma when toasted
- Essential in spice blends
- Available as whole seeds or ground

**Culinary Uses:**
- Indian curries and dals
- Mexican chili and tacos
- Middle Eastern dishes
- North African tagines
- Rice and grain dishes

Cumin is a foundational spice that adds depth and warmth to dishes across multiple cuisines.`,
      pairings: `• Lentils and legumes
• Rice and grains
• Root vegetables
• Lamb and beef
• Chicken and poultry
• Tomato-based sauces
• Yogurt and raita`,
      storage: "Store in airtight container away from light and heat. Whole seeds last 2-3 years, ground 6 months.",
      bestFor: "Curries, chili, Mexican dishes, Middle Eastern cuisine",
      proTip: "Toast whole cumin seeds in a dry pan for 30-60 seconds until fragrant before grinding for maximum flavor.",
      heatLevel: "Mild (no heat)",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 2, 
      title: "Cinnamon", 
      shortDesc: "Sweet, warm bark used in sweet and savory dishes.",
      detailedDescription: `Cinnamon comes from the inner bark of several tree species from the genus Cinnamomum. There are two main types: Ceylon (true cinnamon) and Cassia (common cinnamon), each with distinct flavor profiles and uses.

**Types of Cinnamon:**
- **Ceylon Cinnamon:** Delicate, sweet, tan-colored sticks
- **Cassia Cinnamon:** Strong, spicy, dark brown sticks
- **Ground Cinnamon:** Convenient but loses flavor faster
- **Cinnamon Oil:** Highly concentrated for baking

**Culinary Applications:**
- Sweet baked goods
- Spiced beverages
- Curries and stews
- Breakfast dishes
- Fruit compotes

Cinnamon adds warmth and sweetness to both desserts and savory dishes, particularly in Middle Eastern and Asian cuisines.`,
      pairings: `• Apples and pears
• Chocolate and cocoa
• Sweet potatoes and squash
• Rice and oatmeal
• Coffee and tea
• Lamb and chicken
• Pumpkin and winter squash`,
      storage: "Store sticks in airtight container for 2-3 years. Ground cinnamon lasts 6 months to 1 year.",
      bestFor: "Baking, desserts, curries, hot drinks, breakfast foods",
      proTip: "Add a cinnamon stick to your rice cooker for subtly fragrant rice that pairs well with curries.",
      heatLevel: "Warm (no heat)",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 3, 
      title: "Paprika", 
      shortDesc: "Vibrant red powder made from dried peppers.",
      detailedDescription: `Paprika is made from dried and ground peppers, ranging from sweet to hot varieties. The flavor and heat level depend on the type of peppers used and whether seeds and membranes are included in the grind.

**Types of Paprika:**
- **Sweet Paprika:** Mild, slightly sweet, vibrant red
- **Hot Paprika:** Spicy with noticeable heat
- **Smoked Paprika:** Made from smoked peppers, intense flavor
- **Hungarian Paprika:** Several grades of varying quality

**Culinary Uses:**
- Goulash and stews
- Deviled eggs
- Potato dishes
- Meat rubs
- Spanish dishes (paella, chorizo)
- Garnish for color

Paprika adds both color and flavor to dishes, with smoked paprika bringing a distinctive barbecue-like quality.`,
      pairings: `• Chicken and poultry
• Potatoes and root vegetables
• Eggs and egg dishes
• Seafood and fish
• Rice and grains
• Soups and stews
• Cream-based sauces`,
      storage: "Store in airtight container away from light. Loses potency after 6 months.",
      bestFor: "Goulash, Spanish cuisine, meat rubs, deviled eggs, color garnish",
      proTip: "Add paprika at the end of cooking or bloom it in oil to prevent bitterness from overcooking.",
      heatLevel: "Sweet: Mild | Hot: Medium | Smoked: Varies",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800"
    },
    { 
      id: 4, 
      title: "Turmeric", 
      shortDesc: "Golden spice with earthy flavor and health benefits.",
      detailedDescription: `Turmeric comes from the rhizome of the Curcuma longa plant and is known for its vibrant yellow color and earthy, slightly bitter flavor. It's a staple in Indian and Southeast Asian cuisines and is celebrated for its anti-inflammatory properties.

**Characteristics:**
- Bright yellow-orange color
- Earthy, slightly bitter taste
- Mild peppery aroma
- Stains easily (use caution)
- Fresh root and powder forms

**Health Benefits:**
- Anti-inflammatory properties
- Antioxidant rich
- May aid digestion
- Contains curcumin (active compound)
- Used in traditional medicine

Turmeric is essential for curry powders and adds both color and subtle flavor to dishes.`,
      pairings: `• Cauliflower and root vegetables
• Rice and lentils
• Chicken and fish
• Coconut milk-based dishes
• Eggs and tofu
• Smoothies and golden milk
• Pickles and preserved foods`,
      storage: "Store in airtight container away from light. Fresh turmeric root can be refrigerated for 2-3 weeks.",
      bestFor: "Curries, rice dishes, health drinks, coloring agent",
      proTip: "Combine turmeric with black pepper to increase curcumin absorption by up to 2000%.",
      heatLevel: "Mild (no heat)",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581092334652-d5728b8a5d3b?auto=format&fit=crop&w=800"
    },
    { 
      id: 5, 
      title: "Cardamom", 
      shortDesc: "Aromatic pods with complex, sweet-spicy flavor.",
      detailedDescription: `Cardamom is one of the world's most expensive spices after saffron and vanilla. It comes in two main varieties: green cardamom (true cardamom) and black cardamom, each with distinct flavor profiles and uses.

**Types of Cardamom:**
- **Green Cardamom:** Sweet, floral, versatile
- **Black Cardamom:** Smoky, camphorous, for savory dishes
- **White Cardamom:** Bleached green cardamom
- **Cardamom Seeds:** Removed from pods

**Culinary Applications:**
- Indian sweets and desserts
- Coffee and tea (Arabic coffee, chai)
- Scandinavian baking
- Curries and rice dishes
- Meat marinades

Cardamom adds a sophisticated, complex flavor to both sweet and savory dishes across multiple culinary traditions.`,
      pairings: `• Coffee and tea beverages
• Rice pudding and desserts
• Apple and pear dishes
• Chicken and lamb
• Sweet breads and pastries
• Fruit compotes
• Chocolate desserts`,
      storage: "Store whole pods in airtight container for up to 1 year. Ground cardamom loses flavor quickly.",
      bestFor: "Chai tea, Indian sweets, Scandinavian baking, coffee flavoring",
      proTip: "Crush cardamom pods lightly with the side of a knife to release seeds while keeping them contained.",
      heatLevel: "Warm (mild heat)",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 6, 
      title: "Coriander", 
      shortDesc: "Fresh herb and dried spice with citrusy notes.",
      detailedDescription: `Coriander refers to both the fresh leaves (cilantro) and the dried seeds of the Coriandrum sativum plant. The seeds have a warm, citrusy flavor completely different from the fresh herb, which some people find soapy-tasting.

**Two Forms:**
- **Coriander Seeds:** Warm, citrusy, slightly sweet
- **Fresh Cilantro:** Bright, citrusy, herbaceous
- **Ground Coriander:** Convenient but loses flavor

**Culinary Uses:**
- Indian curry blends
- Pickling spices
- Sausages and charcuterie
- Mexican and Thai dishes (fresh)
- Middle Eastern cuisine
- Baking (in some breads)

Coriander seeds are a key component in many global spice blends and add depth to dishes without overwhelming heat.`,
      pairings: `• Citrus fruits and juices
• Chicken and fish
• Lentils and beans
• Root vegetables
• Pork and sausages
• Rice and grain dishes
• Tomato-based sauces`,
      storage: "Store seeds in airtight container for 2-3 years. Fresh cilantro should be refrigerated with stems in water.",
      bestFor: "Curry powders, pickling, sausages, Mexican and Asian cuisines",
      proTip: "Toast coriander seeds lightly before grinding to enhance their citrusy, aromatic qualities.",
      heatLevel: "Mild (no heat)",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800"
    },
    { 
      id: 7, 
      title: "Chili Powder", 
      shortDesc: "Blend of ground chilies and other spices.",
      detailedDescription: `Chili powder is typically a blend of ground dried chilies with other spices like cumin, garlic powder, oregano, and sometimes salt. It's different from pure ground chilies (like cayenne) and varies significantly by region and brand.

**Common Blends:**
- **American Chili Powder:** Mild, often includes cumin
- **Ancho Chili Powder:** Made from dried poblano peppers
- **Chipotle Powder:** Smoky, made from smoked jalapeños
- **Pure Chili Powders:** Cayenne, paprika, etc.

**Culinary Applications:**
- Chili con carne
- Taco seasoning
- Barbecue rubs
- Enchilada sauce
- Spiced nuts
- Meat marinades

Chili powder adds warmth and complexity to dishes, with the specific blend determining the heat level and flavor profile.`,
      pairings: `• Ground beef and meats
• Beans and legumes
• Tomatoes and tomato sauce
• Cheese and dairy
• Corn and tortillas
• Onions and garlic
• Chocolate (in mole sauce)`,
      storage: "Store in airtight container for 6 months to 1 year. Smell to check freshness.",
      bestFor: "Chili, tacos, Mexican dishes, barbecue rubs, spiced snacks",
      proTip: "Make your own chili powder blend to control heat level and avoid additives like salt and anti-caking agents.",
      heatLevel: "Mild to Hot (varies by blend)",
      image: "https://images.unsplash.com/photo-1551183053-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800"
    },
    { 
      id: 8, 
      title: "Ginger", 
      shortDesc: "Pungent, spicy root used fresh and dried.",
      detailedDescription: `Ginger is the rhizome of the Zingiber officinale plant, used worldwide for its pungent, spicy-sweet flavor. It's available fresh, dried, powdered, candied, and pickled, each form offering different culinary applications.

**Forms of Ginger:**
- **Fresh Ginger:** Pungent, spicy, versatile
- **Ground Ginger:** Warm, less pungent, for baking
- **Pickled Ginger:** Sweet-tart, with sushi
- **Candied Ginger:** Sweet and spicy, for desserts
- **Ginger Paste:** Convenient for curries

**Culinary Uses:**
- Asian stir-fries and curries
- Baked goods and desserts
- Beverages (ginger ale, tea)
- Marinades and sauces
- Pickles and preserves

Ginger adds a distinctive warmth and zing to dishes while also offering digestive benefits.`,
      pairings: `• Garlic and scallions
• Soy sauce and sesame
• Citrus fruits
• Carrots and squash
• Chicken and seafood
• Pumpkin and sweet potatoes
• Honey and maple syrup`,
      storage: "Fresh ginger can be refrigerated for 3 weeks or frozen for 6 months. Ground ginger lasts 1 year.",
      bestFor: "Asian cuisine, baking, beverages, marinades, digestive aid",
      proTip: "Freeze fresh ginger and grate it frozen - no need to peel, and it grates easily without stringy fibers.",
      heatLevel: "Medium (warming heat)",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800",
      secondaryImage: "https://images.unsplash.com/photo-1581092334652-d5728b8a5d3b?auto=format&fit=crop&w=800"
    }
  ];

  const handleSpiceClick = (spice) => {
    setActiveSpice(spice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveSpice(null);
  };

  return (
    <div className="spices-flavors-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Spices & Flavors</h2>
        <ul className="spices-list">
          {spicesFlavors.map(spice => (
            <li key={spice.id} className="spice-item">
              {spice.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="content-header">
          <h1>Essential Spices & Flavors</h1>
          <p className="header-subtitle">Explore the world of spices that transform ordinary dishes into extraordinary meals</p>
        </header>

        <div className="spices-grid">
          {spicesFlavors.map(spice => (
            <div 
              key={spice.id} 
              className="spice-card"
              onClick={() => handleSpiceClick(spice)}
            >
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${spice.image})` }}
              ></div>
              <div className="card-content">
                <h3>{spice.title}</h3>
                <p className="card-desc">{spice.shortDesc}</p>
                <div className="click-details">
                  Explore Flavor →
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* DETAILED POPUP MODAL */}
      {isModalOpen && activeSpice && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            
            {/* Main Image */}
            <div className="modal-header">
              <div 
                className="modal-image"
                style={{ backgroundImage: `url(${activeSpice.image})` }}
              ></div>
              <div className="modal-title-section">
                <h2>{activeSpice.title}</h2>
                <div className="modal-subtitle">{activeSpice.shortDesc}</div>
              </div>
            </div>
            
            <div className="modal-body">
              {/* Detailed Description Section */}
              <div className="section detailed-description">
                <h3>Complete Guide</h3>
                <div className="description-content">
                  {activeSpice.detailedDescription?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="description-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Pairings Section */}
              <div className="section pairings-section">
                <h3>Perfect Pairings</h3>
                <div className="pairings-content">
                  {activeSpice.pairings?.split('\n').map((pairing, index) => (
                    <div key={index} className="pairing-item">
                      <span className="pairing-icon">+</span>
                      <span className="pairing-text">{pairing}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Secondary Image */}
              {activeSpice.secondaryImage && (
                <div className="secondary-image-container">
                  <div 
                    className="secondary-image"
                    style={{ backgroundImage: `url(${activeSpice.secondaryImage})` }}
                  ></div>
                </div>
              )}
              
              {/* Info Grid */}
              <div className="info-grid">
                <div className="info-box best-for-box">
                  <h4>Best For</h4>
                  <p>{activeSpice.bestFor}</p>
                </div>
                
                <div className="info-box heat-box">
                  <h4>Heat Level</h4>
                  <p>{activeSpice.heatLevel}</p>
                </div>
                
                <div className="info-box storage-box">
                  <h4>Storage Tips</h4>
                  <p>{activeSpice.storage}</p>
                </div>
              </div>
              
              {/* Pro Tip Section */}
              <div className="pro-tip-section">
                <div className="pro-tip-icon">🌿</div>
                <div className="pro-tip-content">
                  <h4>Chef's Pro Tip</h4>
                  <p>{activeSpice.proTip}</p>
                </div>
              </div>
              
              {/* Usage Tips */}
              <div className="usage-tips">
                <h4>Spice Master Tips:</h4>
                <ul>
                  <li>Buy whole spices and grind as needed for maximum freshness</li>
                  <li>Toast spices in dry pan before use to enhance flavors</li>
                  <li>Store spices away from heat, light, and moisture</li>
                  <li>Start with small amounts - you can always add more</li>
                  <li>Combine complementary spices for complex flavor profiles</li>
                  <li>Smell your spices regularly - they lose potency over time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpicesFlavorsPage;