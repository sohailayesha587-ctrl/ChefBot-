import React, { useState } from 'react';
import './KitchenToolsPage.css';

const KitchenToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

  // KNIVES COMPARISON DATA
  const knivesData = [
    { 
      name: "Chef's Knife", 
      image: "Chef.png", 
      size: "8-10 inches", 
      bestFor: "All-purpose chopping, slicing"
    },
    { 
      name: "Paring Knife", 
      image: "Paring.png", 
      size: "3-4 inches", 
      bestFor: "Peeling, precision work"
    },
    { 
      name: "Bread Knife", 
      image: "Bread.png", 
      size: "8-10 inches", 
      bestFor: "Slicing crusty bread"
    },
    { 
      name: "Santoku Knife", 
      image: "tokuKnife.jpg", 
      size: "5-7 inches", 
      bestFor: "Japanese-style slicing"
    },
    { 
      name: "Boning Knife", 
      image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400", 
      size: "5-7 inches", 
      bestFor: "Removing bones from meat"
    },
    { 
      name: "Utility Knife", 
      image: "Utility.png", 
      size: "Heavy", 
      bestFor: "Heavy-duty chopping"
    },
    { 
      name: "Nakiri Knife", 
      image: "Nakiri.png", 
      size: "Heavy", 
      bestFor: "Heavy-duty chopping"
    }
  ];

  // CUTTING BOARD TYPES DATA
  const cuttingBoardTypes = [
    {
      name: "Bamboo",
      image: "BambooBoard.png",
      pros: ["Eco-friendly", "Lightweight", "Naturally antibacterial"],
      cons: ["Can dull knives faster", "Absorbs moisture"],
      bestFor: "General vegetable chopping, fruits",
    },
    {
      name: "Maple",
      image: "MappleBoard.png",
      pros: ["Durable", "Gentle on knives", "Natural antibacterial"],
      cons: ["Heavier", "More expensive"],
      bestFor: "All-purpose cutting, meat preparation",
    },
    {
      name: "Plastic",
      image: "PlasticBoard.png",
      pros: ["Dishwasher safe", "Lightweight", "Affordable"],
      cons: ["Can harbor bacteria", "Not eco-friendly"],
      bestFor: "Raw meat, fish, color-coded use",
    },
    {
      name: "Rubber",
      image: "RubberBoard.png",
      pros: ["Self-healing surface", "Gentle on knives", "Non-slip"],
      cons: ["Heavy", "Can stain"],
      bestFor: "Professional kitchens, heavy use",
    }
  ];

  // MIXING BOWL TYPES DATA
  const mixingBowlTypes = [
    {
      name: "Stainless Steel",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400",
      pros: ["Durable", "Non-reactive", "Dishwasher safe", "Won't absorb odors"],
      cons: ["Can be noisy", "Can dent if dropped"],
      bestFor: "Mixing, marinating, storing"
    },
    {
      name: "Glass",
      image: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?auto=format&fit=crop&w=400",
      pros: ["Heat-resistant", "Microwave safe", "Easy to clean", "Non-staining"],
      cons: ["Can break if dropped", "Heavier than other types"],
      bestFor: "Baking, microwave use, serving"
    },
    {
      name: "Ceramic/Porcelain",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Oven-safe", "Stylish appearance", "Non-reactive surface"],
      cons: ["Can chip or crack", "Heavier", "More expensive"],
      bestFor: "Serving, baking, mixing"
    },
    {
      name: "Plastic",
      image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400",
      pros: ["Lightweight", "Unbreakable", "Affordable", "Color variety"],
      cons: ["Can stain", "Not heat resistant", "Can absorb odors"],
      bestFor: "Everyday mixing, kids use, outdoor cooking"
    },
    {
      name: "Copper/Silicone",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Professional quality", "Flexible rim", "Heat conductive", "Non-slip base"],
      cons: ["Expensive", "Requires special care", "Heavier"],
      bestFor: "Professional kitchens, candy making, precise cooking"
    }
  ];

  // COOKWARE TYPES DATA
  const cookwareTypes = [
    {
      name: "Pressure Cooker",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
      pros: ["Fast cooking", "Energy saving", "Retains nutrients"],
      cons: ["Safety concerns", "Learning curve", "Limited recipes"],
      bestFor: "Rice, lentils, stews, one-pot meals"
    },
    {
      name: "Tawa/Griddle",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Even heating", "Large surface", "Versatile"],
      cons: ["Storage space", "Heavy", "Seasoning required"],
      bestFor: "Roti, paratha, pancakes, sandwiches"
    },
    {
      name: "Karahi/Wok",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
      pros: ["High heat cooking", "Versatile", "Quick cooking"],
      cons: ["Seasoning required", "Not for slow cooking", "Special care needed"],
      bestFor: "Stir-frying, deep-frying, Indian curries"
    },
    {
      name: "Skillet/Frying Pan",
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400",
      pros: ["Versatile", "Quick heating", "Easy to use"],
      cons: ["Limited capacity", "Food can stick", "Requires oil"],
      bestFor: "Sautéing, frying eggs, searing meat"
    },
    {
      name: "Saucepan",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
      pros: ["Even heating", "Pouring spout", "Lid included"],
      cons: ["Single purpose", "Limited size", "Can boil over"],
      bestFor: "Boiling water, making sauces, simmering"
    },
    {
      name: "Stock Pot",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Large capacity", "Versatile", "Lid included"],
      cons: ["Heavy", "Storage space", "Slow heating"],
      bestFor: "Soups, stocks, pasta, large batches"
    },
    {
      name: "Dutch Oven",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
      pros: ["Retains heat", "Versatile", "Oven safe"],
      cons: ["Expensive", "Heavy", "Requires seasoning"],
      bestFor: "Braising, stewing, baking bread"
    },
    {
      name: "Baking Dish",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Oven safe", "Even baking", "Serving dish"],
      cons: ["Single purpose", "Can break", "Storage space"],
      bestFor: "Casseroles, lasagna, baked dishes"
    }
  ];

  // COOKWARE MATERIALS DATA
  const cookwareMaterials = [
    {
      name: "Stainless Steel",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
      pros: ["Durable", "Non-reactive", "Dishwasher safe"],
      cons: ["Food can stick", "Heavier", "Can discolor"],
      bestFor: "All-purpose cooking, professional kitchens"
    },
    {
      name: "Glass",
      image: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?auto=format&fit=crop&w=400",
      pros: ["Heat-resistant", "Microwave safe", "Easy to clean"],
      cons: ["Can break", "Not for stovetop", "Limited use"],
      bestFor: "Baking dishes, microwave use, storage"
    },
    {
      name: "Non-Stick",
      image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400",
      pros: ["Easy cleaning", "Less oil needed", "Food doesn't stick"],
      cons: ["Coating wears off", "Not for high heat", "Scratches easily"],
      bestFor: "Eggs, pancakes, delicate foods"
    },
    {
      name: "Iron Cookware",
      image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400",
      pros: ["Natural non-stick", "Adds iron to food", "Durable"],
      cons: ["Heavy", "Requires seasoning", "Rusts if not cared"],
      bestFor: "High heat cooking, searing, traditional cooking"
    }
  ];

  // UTENSIL ITEMS DATA
  const utensilItems = [
    {
      name: "Wooden Spoon",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Gentle on cookware", "Doesn't conduct heat", "Natural antibacterial properties"],
      cons: ["Not dishwasher safe", "Requires oiling", "Can crack over time"],
      bestFor: "Stirring sauces, mixing batters, non-stick pans"
    },
    {
      name: "Spatula (Turner)",
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400",
      pros: ["Flipping food easily", "Thin edge slides under food", "Heat resistant"],
      cons: ["Can scratch pans if metal", "Limited to flipping tasks"],
      bestFor: "Flipping pancakes, burgers, eggs"
    },
    {
      name: "Whisk",
      image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400",
      pros: ["Efficient mixing", "Incorporates air", "Various sizes available"],
      cons: ["Difficult to clean", "Can splash liquids"],
      bestFor: "Beating eggs, mixing sauces, whipping cream"
    },
    {
      name: "Tongs",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400",
      pros: ["Secure grip", "Locks for storage", "Heat resistant tips"],
      cons: ["Can scratch pans", "Spring can wear out"],
      bestFor: "Turning meat, serving pasta, grilling"
    },
    {
      name: "Ladle",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
      pros: ["Deep bowl for liquids", "Long handle", "Easy pouring"],
      cons: ["Large size", "Limited to liquid foods"],
      bestFor: "Serving soups, stews, sauces, gravies"
    },
    {
      name: "Kitchen Shears",
      image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400",
      pros: ["Multi-purpose", "Easy to clean", "Can dismantle for washing"],
      cons: ["Need sharpening", "Not for heavy-duty cutting"],
      bestFor: "Cutting herbs, opening packages, snipping poultry"
    },
    {
      name: "Slotted Spoon",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400",
      pros: ["Drains liquids", "Versatile", "Easy to clean"],
      cons: ["Food can fall through", "Limited capacity"],
      bestFor: "Serving vegetables, pasta, fried foods"
    },
    {
      name: "Vegetable Peeler",
      image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400",
      pros: ["Easy to use", "Safe", "Creates thin peels"],
      cons: ["Blunt quickly", "Limited to peeling"],
      bestFor: "Peeling potatoes, carrots, fruits"
    }
  ];

  // CROCKERY ITEMS DATA
  const crockeryItems = [
    {
      name: "Dinner Plates",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Essential for meals", "Various sizes", "Easy to clean"],
      cons: ["Can break", "Storage space", "Sets needed"],
      bestFor: "Main course, formal dining, everyday meals"
    },
    {
      name: "Side Plates",
      image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400",
      pros: ["Multi-purpose", "Space saving", "Versatile"],
      cons: ["Small size", "Limited use", "Extra item"],
      bestFor: "Salad, bread, snacks, desserts"
    },
    {
      name: "Soup Bowls",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400",
      pros: ["Deep design", "Holds liquids", "Wide rim"],
      cons: ["Limited use", "Storage space", "Can break"],
      bestFor: "Soups, salads, cereals, pasta"
    },
    {
      name: "Cereal Bowls",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Versatile", "Everyday use", "Various sizes"],
      cons: ["Small capacity", "Limited to liquids", "Can chip"],
      bestFor: "Breakfast cereal, rice, desserts, snacks"
    },
    {
      name: "Mugs",
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400",
      pros: ["Heat resistant", "Easy to hold", "Microwave safe"],
      cons: ["Limited capacity", "Can stain", "Hand wash only"],
      bestFor: "Tea, coffee, hot chocolate, soups"
    },
    {
      name: "Water Glasses",
      image: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?auto=format&fit=crop&w=400",
      pros: ["Clear view", "Easy to clean", "Durable"],
      cons: ["Can break", "Heavy", "Storage space"],
      bestFor: "Water, juices, cold beverages"
    },
    {
      name: "Tea Cups & Saucers",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
      pros: ["Elegant", "Formal setting", "Saucer catches spills"],
      cons: ["Fragile", "Small capacity", "Hand wash only"],
      bestFor: "Formal tea, coffee, guests, special occasions"
    },
    {
      name: "Serving Bowls",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Large capacity", "Family style", "Versatile"],
      cons: ["Heavy", "Storage space", "Can break"],
      bestFor: "Salads, pasta, rice, snacks, family meals"
    }
  ];

  // CUTLERY ITEMS DATA
  const cutleryItems = [
    {
      name: "Dinner Fork",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Essential for meals", "Versatile", "Easy to clean"],
      cons: ["Food can get stuck", "Can bend if cheap quality"],
      bestFor: "Main course, salads, pasta"
    },
    {
      name: "Dinner Knife",
      image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400",
      pros: ["Sharp edge", "Essential cutting tool", "Durable"],
      cons: ["Needs sharpening", "Safety concern with kids"],
      bestFor: "Cutting meat, vegetables, spreading"
    },
    {
      name: "Tablespoon",
      image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400",
      pros: ["Multi-purpose", "Serving size", "Measuring tool"],
      cons: ["Too large for some foods", "Not for fine dining"],
      bestFor: "Serving food, measuring, eating main course"
    },
    {
      name: "Teaspoon",
      image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400",
      pros: ["Perfect size", "Versatile", "Easy to handle"],
      cons: ["Too small for some foods", "Can get lost easily"],
      bestFor: "Tea/coffee stirring, desserts, small portions"
    },
    {
      name: "Dessert Spoon",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400",
      pros: ["Perfect dessert size", "Elegant design", "Versatile"],
      cons: ["Limited use", "Specialized item"],
      bestFor: "Desserts, cereals, small servings"
    },
    {
      name: "Soup Spoon",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400",
      pros: ["Round bowl design", "Holds liquids", "Comfortable grip"],
      cons: ["Single purpose", "Large size"],
      bestFor: "Soups, stews, liquid-based foods"
    },
    {
      name: "Salad Fork",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
      pros: ["Smaller size", "Perfect for salads", "Lightweight"],
      cons: ["Limited use", "Similar to dinner fork"],
      bestFor: "Salads, appetizers, desserts"
    },
    {
      name: "Butter Knife",
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400",
      pros: ["Rounded edge", "Safe to use", "Spreading tool"],
      cons: ["Not for cutting", "Limited function"],
      bestFor: "Spreading butter, jams, soft cheeses"
    }
  ];

  // SERVINGWARE ITEMS DATA
  const servingwareItems = [
    {
      name: "Serving Bowls",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
      pros: ["Large capacity", "Family style serving", "Various sizes"],
      cons: ["Storage space", "Can break", "Heavy"],
      bestFor: "Salads, pasta, rice, snacks"
    },
    {
      name: "Platters",
      image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400",
      pros: ["Large surface", "Elegant presentation", "Versatile"],
      cons: ["Bulky", "Difficult to store", "Fragile"],
      bestFor: "Meat, biryani, roasts, cheese boards"
    },
    {
      name: "Gravy Boat",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400",
      pros: ["Easy pouring", "Lid keeps warm", "Elegant design"],
      cons: ["Single purpose", "Storage space", "Can break"],
      bestFor: "Gravies, sauces, dressings"
    },
    {
      name: "Butter Dish",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400",
      pros: ["Keeps butter fresh", "Covered design", "Elegant"],
      cons: ["Small capacity", "Needs frequent cleaning"],
      bestFor: "Butter, ghee, spreads"
    },
    {
      name: "Sugar Bowl",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
      pros: ["Keeps sugar dry", "With lid", "Easy to use"],
      cons: ["Small size", "Needs refilling"],
      bestFor: "Sugar, sweeteners, powdered spices"
    },
    {
      name: "Creamer",
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400",
      pros: ["Pouring spout", "Keeps milk fresh", "Elegant"],
      cons: ["Small capacity", "Needs frequent cleaning"],
      bestFor: "Milk, cream, liquid toppings"
    },
    {
      name: "Salad Bowl with Servers",
      image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400",
      pros: ["Complete set", "Includes servers", "Large size"],
      cons: ["Bulky", "Difficult to store", "Multiple pieces"],
      bestFor: "Salads, fresh vegetables, fruits"
    },
    {
      name: "Cake Stand",
      image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400",
      pros: ["Elevated display", "Elegant", "Centerpiece"],
      cons: ["Single purpose", "Storage space", "Fragile"],
      bestFor: "Cakes, desserts, pastries"
    }
  ];
const servingCutleryItem = {
  name: "Serving Cutlery Collection",
  image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
  pros: ["Complete serving set", "Various types", "Elegant presentation"],
  cons: ["Multiple pieces", "Storage space", "Needs regular cleaning"],
  bestFor: "Serving food at parties, family gatherings, special occasions",
  description: "Includes serving spoons (large, slotted, solid), serving forks, serving tongs, serving ladles, pie servers, cake slicers, and cheese knives."
};
  // KITCHEN ESSENTIALS - 8 TOOLS
  const kitchenEssentials = [
    { 
      id: 1, 
      name: "Chef's Knife", 
      tagline: "Master tool for precision cutting",
      fullDesc: `The chef's knife handles 90% of kitchen cutting. 8-inch blade ideal for most tasks.`,
      keyUses: ["Chopping vegetables", "Slicing meats", "Mincing herbs", "Dicing onions"],
      previewImg: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400",
    },
    { 
      id: 2, 
      name: "Cutting Board", 
      tagline: "Safe surface for food prep",
      fullDesc: `Protects knives and counters. Different materials suit different needs. Wood has natural antibacterial properties.`,
      keyUses: ["Chopping vegetables", "Slicing meats", "Meal prep", "Dough rolling"],
      previewImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
    },
    { 
      id: 3, 
      name: "Mixing Bowls", 
      tagline: "Versatile containers for mixing",
      fullDesc: `Nested sets save space. Stainless steel won't absorb odors or stains. Essential for food preparation.`,
      keyUses: ["Mixing batters", "Marinating meat", "Storing ingredients", "Kneading dough"],
      previewImg: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400",
    },
    { 
      id: 4, 
      name: "Cookware Set", 
      tagline: "Foundation of kitchen cooking",
      fullDesc: `Quality pans distribute heat evenly. Includes pressure cooker, tawa, karahi, skillet, saucepan, stock pot, dutch oven, and baking dish.`,
      keyUses: ["Sautéing vegetables", "Boiling pasta", "Frying eggs", "Making curries"],
      previewImg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400",
    },
    { 
      id: 5, 
      name: "Utensil Set", 
      tagline: "Tools for cooking and serving",
      fullDesc: `Right tool for each task improves efficiency. Includes wooden spoon, spatula, whisk, tongs, ladle, kitchen shears, slotted spoon, and vegetable peeler.`,
      keyUses: ["Stirring sauces", "Flipping pancakes", "Serving food", "Mixing ingredients"],
      previewImg: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400",
    },
    { 
      id: 6, 
      name: "Crockery Set", 
      tagline: "Complete dining essentials",
      fullDesc: `Complete dinnerware set including dinner plates, side plates, soup bowls, cereal bowls, mugs, water glasses, tea cups & saucers, and serving bowls. Essential for family meals and entertaining guests.`,
      keyUses: ["Serving meals", "Formal dining", "Everyday use", "Entertaining guests"],
      previewImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400",
    },
    { 
      id: 7, 
      name: "Cutlery Set", 
      tagline: "Essential eating utensils",
      fullDesc: `Complete cutlery set including dinner fork, dinner knife, tablespoon, teaspoon, dessert spoon, soup spoon, salad fork, and butter knife. Essential for every meal.`,
      keyUses: ["Eating meals", "Formal dining", "Everyday use", "Entertaining"],
      previewImg: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400",
    },
    { 
      id: 8, 
      name: "Servingware Set", 
      tagline: "Elegant serving essentials",
      fullDesc: `Complete servingware set including serving bowls, platters, gravy boat, butter dish, sugar bowl, creamer, salad bowl with servers, and cake stand. Plus serving spoons collection for elegant presentation.`,
      keyUses: ["Serving food", "Entertaining guests", "Special occasions", "Family gatherings"],
      previewImg: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400",
    }
  ];

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedTool(null);
  };

  // Helper functions for card classes
  const getKnifeCardClass = (knifeName) => {
    const name = knifeName.toLowerCase();
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
    const name = boardName.toLowerCase();
    if (name.includes('bamboo')) return 'board-bamboo';
    if (name.includes('maple')) return 'board-maple';
    if (name.includes('plastic')) return 'board-plastic';
    if (name.includes('rubber')) return 'board-rubber';
    return '';
  };

  const getBowlCardClass = (bowlName) => {
    const name = bowlName.toLowerCase();
    if (name.includes('stainless')) return 'bowl-steel';
    if (name.includes('glass')) return 'bowl-glass';
    if (name.includes('ceramic') || name.includes('porcelain')) return 'bowl-ceramic';
    if (name.includes('plastic')) return 'bowl-plastic';
    if (name.includes('copper') || name.includes('silicone')) return 'bowl-copper';
    return '';
  };

  const getUtensilCardClass = (utensilName) => {
    const name = utensilName.toLowerCase();
    if (name.includes('wooden') || name.includes('spoon')) return 'utensil-wooden';
    if (name.includes('spatula')) return 'utensil-spatula';
    if (name.includes('whisk')) return 'utensil-whisk';
    if (name.includes('tongs')) return 'utensil-tongs';
    if (name.includes('ladle')) return 'utensil-ladle';
    if (name.includes('shears') || name.includes('scissors')) return 'utensil-shears';
    if (name.includes('slotted')) return 'utensil-slotted';
    if (name.includes('peeler')) return 'utensil-peeler';
    return '';
  };

  const getCookwareTypeClass = (cookwareName) => {
    const name = cookwareName.toLowerCase();
    if (name.includes('pressure')) return 'cookware-pressure';
    if (name.includes('tawa') || name.includes('griddle')) return 'cookware-tawa';
    if (name.includes('karahi') || name.includes('wok')) return 'cookware-karahi';
    if (name.includes('skillet') || name.includes('frying')) return 'cookware-skillet';
    if (name.includes('saucepan')) return 'cookware-saucepan';
    if (name.includes('stock')) return 'cookware-stock';
    if (name.includes('dutch')) return 'cookware-dutch';
    if (name.includes('baking')) return 'cookware-baking';
    return '';
  };

  const getCookwareMaterialClass = (materialName) => {
    const name = materialName.toLowerCase();
    if (name.includes('stainless')) return 'cookware-steel';
    if (name.includes('glass')) return 'cookware-glass';
    if (name.includes('non-stick')) return 'cookware-nonstick';
    if (name.includes('iron')) return 'cookware-iron';
    return '';
  };

  const getCrockeryCardClass = (crockeryName) => {
    const name = crockeryName.toLowerCase();
    if (name.includes('dinner') || name.includes('plate')) return 'crockery-plate';
    if (name.includes('side')) return 'crockery-side';
    if (name.includes('soup')) return 'crockery-soup';
    if (name.includes('cereal')) return 'crockery-cereal';
    if (name.includes('mug')) return 'crockery-mug';
    if (name.includes('water') || name.includes('glass')) return 'crockery-glass';
    if (name.includes('tea') || name.includes('cup')) return 'crockery-tea';
    if (name.includes('serving')) return 'crockery-serving';
    return '';
  };

  const getCutleryCardClass = (cutleryName) => {
    const name = cutleryName.toLowerCase();
    if (name.includes('fork') && name.includes('dinner')) return 'cutlery-dinner-fork';
    if (name.includes('knife') && name.includes('dinner')) return 'cutlery-dinner-knife';
    if (name.includes('tablespoon')) return 'cutlery-tablespoon';
    if (name.includes('teaspoon')) return 'cutlery-teaspoon';
    if (name.includes('dessert')) return 'cutlery-dessert';
    if (name.includes('soup')) return 'cutlery-soup';
    if (name.includes('salad')) return 'cutlery-salad';
    if (name.includes('butter')) return 'cutlery-butter';
    return '';
  };

  const getServingwareCardClass = (servingwareName) => {
    const name = servingwareName.toLowerCase();
    if (name.includes('serving') && name.includes('bowl')) return 'servingware-bowl';
    if (name.includes('platter')) return 'servingware-platter';
    if (name.includes('gravy')) return 'servingware-gravy';
    if (name.includes('butter') && name.includes('dish')) return 'servingware-butter';
    if (name.includes('sugar')) return 'servingware-sugar';
    if (name.includes('creamer')) return 'servingware-creamer';
    if (name.includes('salad') && name.includes('bowl')) return 'servingware-salad';
    if (name.includes('cake')) return 'servingware-cake';
    return '';
  };

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
                  onClick={() => handleToolSelect(tool)}
                >
                  <span className="ktp-tool-list-name">{tool.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="ktp-main">
          <header className="ktp-main-header">
            <div className="ktp-header-content">
              <h1 className="ktp-page-title">Essential Kitchen Tools</h1>
              <p className="ktp-page-description">
                Build your perfect kitchen with these must-have tools and equipment.
              </p>
            </div>
          </header>

          {/* TOOLS GRID - SIMPLIFIED */}
          <div className="ktp-tools-grid-section">
            <div className="ktp-tools-grid">
              {kitchenEssentials.map(tool => (
                <div 
                  key={tool.id} 
                  className="ktp-tool-card"
                  onClick={() => handleToolSelect(tool)}
                >
                  <div 
                    className="ktp-card-image"
                    style={{ backgroundImage: `url(${tool.previewImg})` }}
                  ></div>
                  
                  <div className="ktp-card-content">
                    <h3 className="ktp-card-title">{tool.name}</h3>
                    <p className="ktp-card-description">{tool.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* DETAIL MODAL */}
      {showDetailPanel && selectedTool && (
        <div className="ktp-modal-overlay" onClick={closeDetailPanel}>
          <div className="ktp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ktp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="ktp-modal-header">
              <div className="ktp-modal-title">
                <h2>{selectedTool.name}</h2>
                <p className="ktp-modal-subtitle">{selectedTool.tagline}</p>
              </div>
            </div>

            <div className="ktp-modal-content">
              <div className="ktp-modal-details">
                {/* DESCRIPTION */}
                <div className="ktp-detail-section description-section">
                  <h3>Description</h3>
                  <p>{selectedTool.fullDesc}</p>
                </div>

                {/* COMMON USES */}
                <div className="ktp-detail-section uses-section">
                  <h3>Common Uses</h3>
                  <div className="ktp-uses-list">
                    {selectedTool.keyUses.map((use, idx) => (
                      <div key={idx} className="ktp-use-item">
                        <span className="ktp-use-check">✓</span>
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KNIVES CARDS - ONLY FOR CHEF'S KNIFE */}
                {selectedTool.name === "Chef's Knife" && (
                  <div className="ktp-knives-cards-section">
                    <h3 className="ktp-knives-cards-heading">Essential Kitchen Knives</h3>
                    
                    <div className="ktp-knives-cards-grid">
                      {knivesData.map((knife, index) => (
                        <div 
                          key={index} 
                          className={`ktp-knife-card ${getKnifeCardClass(knife.name)}`}
                        >
                          <div 
                            className="ktp-knife-card-image"
                            style={{ backgroundImage: `url(${knife.image})` }}
                          ></div>
                          
                          <div className="ktp-knife-card-content">
                            <h4 className="ktp-knife-card-title">{knife.name}</h4>
                            <div className="ktp-knife-card-size">{knife.size}</div>
                            <div className="ktp-knife-card-best">
                              <span className="ktp-knife-card-best-label">Best For</span>
                              <p className="ktp-knife-card-best-text">{knife.bestFor}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CUTTING BOARD TYPES - ONLY FOR CUTTING BOARD */}
                {selectedTool.name === "Cutting Board" && (
                  <div className="ktp-boards-cards-section">
                    <h3 className="ktp-boards-cards-heading">Cutting Board Materials</h3>
                    
                    <div className="ktp-boards-cards-grid">
                      {cuttingBoardTypes.map((board, index) => (
                        <div 
                          key={index} 
                          className={`ktp-board-card ${getBoardCardClass(board.name)}`}
                        >
                          <div 
                            className="ktp-board-card-image"
                            style={{ backgroundImage: `url(${board.image})` }}
                          ></div>
                          
                          <div className="ktp-board-card-content">
                            <h4 className="ktp-board-card-title">{board.name}</h4>
                            
                            {/* PROS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Pros:</div>
                              <div className="ktp-info-content">
                                {board.pros.map((pro, idx) => (
                                  <div key={idx} className="ktp-info-pros-item">
                                    <span className="ktp-info-pros-icon">✓</span>
                                    <span>{pro}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* CONS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Cons:</div>
                              <div className="ktp-info-content">
                                {board.cons.map((con, idx) => (
                                  <div key={idx} className="ktp-info-cons-item">
                                    <span className="ktp-info-cons-icon">✗</span>
                                    <span>{con}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* BEST FOR - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Best For:</div>
                              <div className="ktp-info-content">
                                <div className="ktp-info-text">{board.bestFor}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MIXING BOWL TYPES - ONLY FOR MIXING BOWLS */}
                {selectedTool.name === "Mixing Bowls" && (
                  <div className="ktp-bowls-cards-section">
                    <h3 className="ktp-bowls-cards-heading">Mixing Bowl Materials</h3>
                    
                    <div className="ktp-bowls-cards-grid">
                      {mixingBowlTypes.map((bowl, index) => (
                        <div 
                          key={index} 
                          className={`ktp-bowl-card ${getBowlCardClass(bowl.name)}`}
                        >
                          <div 
                            className="ktp-bowl-card-image"
                            style={{ backgroundImage: `url(${bowl.image})` }}
                          ></div>
                          
                          <div className="ktp-bowl-card-content">
                            <h4 className="ktp-bowl-card-title">{bowl.name}</h4>
                            
                            {/* PROS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Pros:</div>
                              <div className="ktp-info-content">
                                {bowl.pros.map((pro, idx) => (
                                  <div key={idx} className="ktp-info-pros-item">
                                    <span className="ktp-info-pros-icon">✓</span>
                                    <span>{pro}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* CONS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Cons:</div>
                              <div className="ktp-info-content">
                                {bowl.cons.map((con, idx) => (
                                  <div key={idx} className="ktp-info-cons-item">
                                    <span className="ktp-info-cons-icon">✗</span>
                                    <span>{con}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* BEST FOR - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Best For:</div>
                              <div className="ktp-info-content">
                                <div className="ktp-info-text">{bowl.bestFor}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* COOKWARE TYPES - ONLY FOR COOKWARE SET */}
                {selectedTool.name === "Cookware Set" && (
                  <>
                    <div className="ktp-cookware-types-section">
                      <h3 className="ktp-cookware-types-heading">Cookware Types</h3>
                      
                      <div className="ktp-cookware-types-grid">
                        {cookwareTypes.map((cookware, index) => (
                          <div 
                            key={index} 
                            className={`ktp-cookware-type-card ${getCookwareTypeClass(cookware.name)}`}
                          >
                            <div 
                              className="ktp-cookware-type-card-image"
                              style={{ backgroundImage: `url(${cookware.image})` }}
                            ></div>
                            
                            <div className="ktp-cookware-type-card-content">
                              <h4 className="ktp-cookware-type-card-title">{cookware.name}</h4>
                              
                              {/* PROS - HORIZONTAL LAYOUT */}
                              <div className="ktp-info-row">
                                <div className="ktp-info-heading">Pros:</div>
                                <div className="ktp-info-content">
                                  {cookware.pros.map((pro, idx) => (
                                    <div key={idx} className="ktp-info-pros-item">
                                      <span className="ktp-info-pros-icon">✓</span>
                                      <span>{pro}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* CONS - HORIZONTAL LAYOUT */}
                              <div className="ktp-info-row">
                                <div className="ktp-info-heading">Cons:</div>
                                <div className="ktp-info-content">
                                  {cookware.cons.map((con, idx) => (
                                    <div key={idx} className="ktp-info-cons-item">
                                      <span className="ktp-info-cons-icon">✗</span>
                                      <span>{con}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* BEST FOR - HORIZONTAL LAYOUT */}
                              <div className="ktp-info-row">
                                <div className="ktp-info-heading">Best For:</div>
                                <div className="ktp-info-content">
                                  <div className="ktp-info-text">{cookware.bestFor}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* COOKWARE MATERIALS */}
                    <div className="ktp-cookware-materials-section">
                      <h3 className="ktp-cookware-materials-heading">Cookware Materials</h3>
                      
                      <div className="ktp-cookware-materials-grid">
                        {cookwareMaterials.map((material, index) => (
                          <div 
                            key={index} 
                            className={`ktp-cookware-material-card ${getCookwareMaterialClass(material.name)}`}
                          >
                            <div 
                              className="ktp-cookware-material-card-image"
                              style={{ backgroundImage: `url(${material.image})` }}
                            ></div>
                            
                            <div className="ktp-cookware-material-card-content">
                              <h4 className="ktp-cookware-material-card-title">{material.name}</h4>
                              
                              {/* PROS - HORIZONTAL LAYOUT */}
                              <div className="ktp-info-row">
                                <div className="ktp-info-heading">Pros:</div>
                                <div className="ktp-info-content">
                                  {material.pros.map((pro, idx) => (
                                    <div key={idx} className="ktp-info-pros-item">
                                      <span className="ktp-info-pros-icon">✓</span>
                                      <span>{pro}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* CONS - HORIZONTAL LAYOUT */}
                              <div className="ktp-info-row">
                                <div className="ktp-info-heading">Cons:</div>
                                <div className="ktp-info-content">
                                  {material.cons.map((con, idx) => (
                                    <div key={idx} className="ktp-info-cons-item">
                                      <span className="ktp-info-cons-icon">✗</span>
                                      <span>{con}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* BEST FOR - HORIZONTAL LAYOUT */}
                              <div className="ktp-info-row">
                                <div className="ktp-info-heading">Best For:</div>
                                <div className="ktp-info-content">
                                  <div className="ktp-info-text">{material.bestFor}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* UTENSIL ITEMS - ONLY FOR UTENSIL SET */}
                {selectedTool.name === "Utensil Set" && (
                  <div className="ktp-utensils-cards-section">
                    <h3 className="ktp-utensils-cards-heading">Cooking Utensils</h3>
                    
                    <div className="ktp-utensils-cards-grid">
                      {utensilItems.map((utensil, index) => (
                        <div 
                          key={index} 
                          className={`ktp-utensil-card ${getUtensilCardClass(utensil.name)}`}
                        >
                          <div 
                            className="ktp-utensil-card-image"
                            style={{ backgroundImage: `url(${utensil.image})` }}
                          ></div>
                          
                          <div className="ktp-utensil-card-content">
                            <h4 className="ktp-utensil-card-title">{utensil.name}</h4>
                            
                            {/* PROS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Pros:</div>
                              <div className="ktp-info-content">
                                {utensil.pros.map((pro, idx) => (
                                  <div key={idx} className="ktp-info-pros-item">
                                    <span className="ktp-info-pros-icon">✓</span>
                                    <span>{pro}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* CONS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Cons:</div>
                              <div className="ktp-info-content">
                                {utensil.cons.map((con, idx) => (
                                  <div key={idx} className="ktp-info-cons-item">
                                    <span className="ktp-info-cons-icon">✗</span>
                                    <span>{con}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* BEST FOR - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Best For:</div>
                              <div className="ktp-info-content">
                                <div className="ktp-info-text">{utensil.bestFor}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CROCKERY ITEMS - ONLY FOR CROCKERY SET */}
                {selectedTool.name === "Crockery Set" && (
                  <div className="ktp-crockery-cards-section">
                    <h3 className="ktp-crockery-cards-heading">Crockery Items</h3>
                    
                    <div className="ktp-crockery-cards-grid">
                      {crockeryItems.map((crockery, index) => (
                        <div 
                          key={index} 
                          className={`ktp-crockery-card ${getCrockeryCardClass(crockery.name)}`}
                        >
                          <div 
                            className="ktp-crockery-card-image"
                            style={{ backgroundImage: `url(${crockery.image})` }}
                          ></div>
                          
                          <div className="ktp-crockery-card-content">
                            <h4 className="ktp-crockery-card-title">{crockery.name}</h4>
                            
                            {/* PROS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Pros:</div>
                              <div className="ktp-info-content">
                                {crockery.pros.map((pro, idx) => (
                                  <div key={idx} className="ktp-info-pros-item">
                                    <span className="ktp-info-pros-icon">✓</span>
                                    <span>{pro}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* CONS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Cons:</div>
                              <div className="ktp-info-content">
                                {crockery.cons.map((con, idx) => (
                                  <div key={idx} className="ktp-info-cons-item">
                                    <span className="ktp-info-cons-icon">✗</span>
                                    <span>{con}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* BEST FOR - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Best For:</div>
                              <div className="ktp-info-content">
                                <div className="ktp-info-text">{crockery.bestFor}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CUTLERY ITEMS - ONLY FOR CUTLERY SET */}
                {selectedTool.name === "Cutlery Set" && (
                  <div className="ktp-cutlery-cards-section">
                    <h3 className="ktp-cutlery-cards-heading">Cutlery Items</h3>
                    
                    <div className="ktp-cutlery-cards-grid">
                      {cutleryItems.map((cutlery, index) => (
                        <div 
                          key={index} 
                          className={`ktp-cutlery-card ${getCutleryCardClass(cutlery.name)}`}
                        >
                          <div 
                            className="ktp-cutlery-card-image"
                            style={{ backgroundImage: `url(${cutlery.image})` }}
                          ></div>
                          
                          <div className="ktp-cutlery-card-content">
                            <h4 className="ktp-cutlery-card-title">{cutlery.name}</h4>
                            
                            {/* PROS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Pros:</div>
                              <div className="ktp-info-content">
                                {cutlery.pros.map((pro, idx) => (
                                  <div key={idx} className="ktp-info-pros-item">
                                    <span className="ktp-info-pros-icon">✓</span>
                                    <span>{pro}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* CONS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Cons:</div>
                              <div className="ktp-info-content">
                                {cutlery.cons.map((con, idx) => (
                                  <div key={idx} className="ktp-info-cons-item">
                                    <span className="ktp-info-cons-icon">✗</span>
                                    <span>{con}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* BEST FOR - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Best For:</div>
                              <div className="ktp-info-content">
                                <div className="ktp-info-text">{cutlery.bestFor}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SERVINGWARE ITEMS - ONLY FOR SERVINGWARE SET */}
                {selectedTool.name === "Servingware Set" && (
                  <div className="ktp-servingware-cards-section">
                    <h3 className="ktp-servingware-cards-heading">Servingware Items</h3>
                    
                    <div className="ktp-servingware-cards-grid">
                      {servingwareItems.map((servingware, index) => (
                        <div 
                          key={index} 
                          className={`ktp-servingware-card ${getServingwareCardClass(servingware.name)}`}
                        >
                          <div 
                            className="ktp-servingware-card-image"
                            style={{ backgroundImage: `url(${servingware.image})` }}
                          ></div>
                          
                          <div className="ktp-servingware-card-content">
                            <h4 className="ktp-servingware-card-title">{servingware.name}</h4>
                            
                            {/* PROS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Pros:</div>
                              <div className="ktp-info-content">
                                {servingware.pros.map((pro, idx) => (
                                  <div key={idx} className="ktp-info-pros-item">
                                    <span className="ktp-info-pros-icon">✓</span>
                                    <span>{pro}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* CONS - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Cons:</div>
                              <div className="ktp-info-content">
                                {servingware.cons.map((con, idx) => (
                                  <div key={idx} className="ktp-info-cons-item">
                                    <span className="ktp-info-cons-icon">✗</span>
                                    <span>{con}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* BEST FOR - HORIZONTAL LAYOUT */}
                            <div className="ktp-info-row">
                              <div className="ktp-info-heading">Best For:</div>
                              <div className="ktp-info-content">
                                <div className="ktp-info-text">{servingware.bestFor}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenToolsPage;