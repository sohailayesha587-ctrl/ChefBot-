import React, { useState, useEffect } from 'react';
import './KitchenToolsPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KitchenToolsPage = () => {
  const navigate = useNavigate();
  
  // ===== STATES =====
  const [selectedTool, setSelectedTool] = useState(null);
  const [cookwareTab, setCookwareTab] = useState('types');
  const [crockeryTab, setCrockeryTab] = useState('dining');
  const [servingTab, setServingTab] = useState('servingware');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ===== DATA STATES =====
  const [kitchenEssentials, setKitchenEssentials] = useState([]);
  const [knivesData, setKnivesData] = useState([]);
  const [cuttingBoardTypes, setCuttingBoardTypes] = useState([]);
  const [mixingBowlTypes, setMixingBowlTypes] = useState([]);
  const [utensilItems, setUtensilItems] = useState([]);
  const [cookwareTypes, setCookwareTypes] = useState([]);
  const [cookwareMaterials, setCookwareMaterials] = useState([]);
  const [crockeryItems, setCrockeryItems] = useState([]);
  const [cutleryItems, setCutleryItems] = useState([]);
  const [servingwareItems, setServingwareItems] = useState([]);
  const [servingCutleryItem, setServingCutleryItem] = useState(null);

  // ===== STATIC FALLBACK DATA (in case API fails) =====
  const getFallbackData = () => {
    return {
      kitchenEssentials: [
        { id: 1, name: "Chef's Knife", tagline: "Master tool for precision cutting", fullDesc: "The chef's knife handles 90% of kitchen cutting.", keyUses: ["Chopping vegetables", "Slicing meats"], previewImg: "Chefs.png" },
        { id: 2, name: "Cutting Board", tagline: "Safe surface for food prep", fullDesc: "Protects knives and counters.", keyUses: ["Chopping vegetables", "Slicing meats"], previewImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400" },
        { id: 3, name: "Mixing Bowls", tagline: "Versatile containers for mixing", fullDesc: "Nested sets save space.", keyUses: ["Mixing batters", "Marinating meat"], previewImg: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400" },
        { id: 4, name: "Cookware Set", tagline: "Foundation of kitchen cooking", fullDesc: "Quality pans distribute heat evenly.", keyUses: ["Sautéing vegetables", "Boiling pasta"], previewImg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400" },
        { id: 5, name: "Utensil Set", tagline: "Tools for cooking and serving", fullDesc: "Right tool for each task improves efficiency.", keyUses: ["Stirring sauces", "Flipping pancakes"], previewImg: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400" },
        { id: 6, name: "Crockery Set", tagline: "Complete dining essentials", fullDesc: "Complete dinnerware set.", keyUses: ["Serving meals", "Formal dining"], previewImg: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400" },
        { id: 7, name: "Cutlery Set", tagline: "Essential eating utensils", fullDesc: "Complete cutlery set.", keyUses: ["Eating meals", "Formal dining"], previewImg: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400" },
        { id: 8, name: "Servingware Set", tagline: "Elegant serving essentials", fullDesc: "Complete servingware set.", keyUses: ["Serving food", "Entertaining guests"], previewImg: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400" }
      ],
      knivesData: [
        { id: 1, name: "Chef's Knife", image: "Chefs.png", size: "8-10 inches", bestFor: "All-purpose chopping", material: "High-carbon steel", price: "$50-$200", fullDesc: "The most versatile knife.", care: "Hand wash only", durability: "Lifetime", pros: ["Versatile", "Precise"], cons: ["Requires sharpening"] },
        { id: 2, name: "Paring Knife", image: "Paring.png", size: "3-4 inches", bestFor: "Peeling", material: "Stainless steel", price: "$20-$60", fullDesc: "Small knife for detailed tasks.", care: "Hand wash", durability: "5-10 years", pros: ["Precise", "Lightweight"], cons: ["Limited use"] },
        { id: 3, name: "Bread Knife", image: "Bread.png", size: "8-10 inches", bestFor: "Slicing bread", material: "Stainless steel", price: "$30-$80", fullDesc: "Serrated edge for bread.", care: "Hand wash only", durability: "5-10 years", pros: ["Serrated edge", "Long blade"], cons: ["Difficult to sharpen"] },
        { id: 4, name: "Santoku Knife", image: "Santoku.png", size: "5-7 inches", bestFor: "Japanese slicing", material: "Japanese steel", price: "$60-$150", fullDesc: "Japanese all-purpose knife.", care: "Hand wash", durability: "Lifetime", pros: ["Granton edges", "Lightweight"], cons: ["Expensive"] },
        { id: 5, name: "Boning Knife", image: "Boning.png", size: "5-7 inches", bestFor: "Removing bones", material: "Flexible steel", price: "$25-$70", fullDesc: "Thin flexible blade.", care: "Hand wash", durability: "5-10 years", pros: ["Flexible", "Precise"], cons: ["Fragile tip"] },
        { id: 6, name: "Utility Knife", image: "Utility.png", size: "4-6 inches", bestFor: "Small tasks", material: "Stainless steel", price: "$15-$45", fullDesc: "Mid-sized utility knife.", care: "Hand wash", durability: "5-10 years", pros: ["Versatile", "Affordable"], cons: ["Not specialized"] },
        { id: 7, name: "Nakiri Knife", image: "Nakiri.png", size: "6-7 inches", bestFor: "Vegetable chopping", material: "Carbon steel", price: "$70-$180", fullDesc: "Japanese vegetable knife.", care: "Hand wash, dry immediately", durability: "Lifetime", pros: ["Straight edge", "Perfect for veggies"], cons: ["Not for meat", "Rusts easily"] }
      ],
      cuttingBoardTypes: [
        { id: 1, name: "Bamboo", image: "BambooBoard.png", pros: ["Eco-friendly", "Lightweight"], cons: ["Can dull knives"], bestFor: "Vegetable chopping", care: "Hand wash, oil monthly", price: "$20-$50", fullDesc: "Sustainable bamboo board.", durability: "3-5 years" },
        { id: 2, name: "Maple", image: "MappleBoard.png", pros: ["Durable", "Gentle on knives"], cons: ["Heavier", "Expensive"], bestFor: "All-purpose cutting", care: "Hand wash, oil regularly", price: "$50-$150", fullDesc: "Hard maple cutting board.", durability: "10+ years" },
        { id: 3, name: "Plastic", image: "PlasticBoard.png", pros: ["Dishwasher safe", "Affordable"], cons: ["Harbors bacteria"], bestFor: "Raw meat, fish", care: "Dishwasher safe", price: "$10-$30", fullDesc: "Plastic cutting board.", durability: "1-2 years" },
        { id: 4, name: "Rubber", image: "RubberBoard.png", pros: ["Self-healing", "Non-slip"], cons: ["Heavy", "Expensive"], bestFor: "Professional kitchens", care: "Hand wash", price: "$40-$100", fullDesc: "Rubber cutting board.", durability: "5-7 years" }
      ],
      mixingBowlTypes: [
        { id: 1, name: "Stainless Steel", image: "SteelBowl.png", pros: ["Durable", "Non-reactive"], cons: ["Noisy", "Can dent"], bestFor: "Mixing, marinating", sizes: "1-5 quart set", care: "Dishwasher safe", price: "$30-$80", fullDesc: "Stainless steel bowls.", durability: "Lifetime" },
        { id: 2, name: "Glass", image: "GlassBowl.png", pros: ["Heat-resistant", "Microwave safe"], cons: ["Can break", "Heavier"], bestFor: "Baking, serving", sizes: "0.5-4 quart set", care: "Dishwasher safe", price: "$25-$60", fullDesc: "Glass mixing bowls.", durability: "5-10 years" },
        { id: 3, name: "Ceramic/Porcelain", image: "CeramicBowl.png", pros: ["Oven-safe", "Stylish"], cons: ["Can chip", "Expensive"], bestFor: "Serving, baking", sizes: "Various", care: "Hand wash", price: "$40-$100", fullDesc: "Ceramic bowls.", durability: "10+ years" },
        { id: 4, name: "Plastic", image: "PlasticBowl.png", pros: ["Lightweight", "Unbreakable"], cons: ["Can stain", "Not heat resistant"], bestFor: "Everyday mixing", sizes: "Set of 3-5", care: "Dishwasher safe", price: "$15-$40", fullDesc: "Plastic bowls.", durability: "2-3 years" },
        { id: 5, name: "Copper/Silicone", image: "CopperBowl.png", pros: ["Professional quality", "Heat conductive"], cons: ["Expensive", "Requires care"], bestFor: "Professional kitchens", sizes: "2-3 quart", care: "Hand wash", price: "$80-$200", fullDesc: "Copper bowls.", durability: "Lifetime" }
      ],
      utensilItems: [
        { id: 1, name: "Wooden Spoon", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Gentle on cookware", "Natural antibacterial"], cons: ["Not dishwasher safe"], bestFor: "Stirring sauces", material: "Beechwood", care: "Hand wash, oil monthly", price: "$5-$15", fullDesc: "Wooden spoon.", durability: "5+ years" },
        { id: 2, name: "Spatula (Turner)", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400", pros: ["Flipping food easily", "Heat resistant"], cons: ["Can scratch pans"], bestFor: "Flipping pancakes", material: "Silicone", care: "Dishwasher safe", price: "$8-$20", fullDesc: "Spatula for flipping.", durability: "3-5 years" },
        { id: 3, name: "Whisk", image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400", pros: ["Efficient mixing", "Incorporates air"], cons: ["Difficult to clean"], bestFor: "Beating eggs", material: "Stainless steel", care: "Hand wash", price: "$6-$18", fullDesc: "Wire whisk.", durability: "5+ years" },
        { id: 4, name: "Tongs", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400", pros: ["Secure grip", "Heat resistant"], cons: ["Can scratch pans"], bestFor: "Turning meat", material: "Stainless steel", care: "Dishwasher safe", price: "$10-$25", fullDesc: "Kitchen tongs.", durability: "5-10 years" },
        { id: 5, name: "Ladle", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Deep bowl", "Long handle"], cons: ["Large size"], bestFor: "Serving soups", material: "Stainless steel", care: "Dishwasher safe", price: "$8-$20", fullDesc: "Soup ladle.", durability: "10+ years" },
        { id: 6, name: "Kitchen Shears", image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400", pros: ["Multi-purpose", "Easy to clean"], cons: ["Need sharpening"], bestFor: "Cutting herbs", material: "Stainless steel", care: "Hand wash", price: "$12-$30", fullDesc: "Kitchen shears.", durability: "5-10 years" },
        { id: 7, name: "Slotted Spoon", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400", pros: ["Drains liquids", "Versatile"], cons: ["Food falls through"], bestFor: "Serving vegetables", material: "Stainless steel", care: "Dishwasher safe", price: "$7-$18", fullDesc: "Slotted spoon.", durability: "10+ years" },
        { id: 8, name: "Vegetable Peeler", image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400", pros: ["Easy to use", "Safe"], cons: ["Blunt quickly"], bestFor: "Peeling potatoes", material: "Stainless steel", care: "Hand wash", price: "$5-$15", fullDesc: "Vegetable peeler.", durability: "2-3 years" }
      ],
      cookwareTypes: [
        { id: 1, name: "Pressure Cooker", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Fast cooking", "Energy saving"], cons: ["Safety concerns"], bestFor: "Rice, lentils", material: "Stainless steel", capacity: "3-10 liters", care: "Hand wash", price: "$40-$150", fullDesc: "Pressure cooker.", durability: "10+ years" },
        { id: 2, name: "Tawa/Griddle", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Even heating", "Large surface"], cons: ["Storage space"], bestFor: "Roti, paratha", material: "Cast iron", diameter: "8-12 inches", care: "Season regularly", price: "$15-$50", fullDesc: "Tawa for flatbreads.", durability: "Lifetime" },
        { id: 3, name: "Karahi/Wok", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["High heat cooking", "Versatile"], cons: ["Seasoning required"], bestFor: "Stir-frying", material: "Carbon steel", capacity: "2-5 liters", care: "Season before use", price: "$25-$80", fullDesc: "Karahi for curries.", durability: "Lifetime" },
        { id: 4, name: "Skillet/Frying Pan", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400", pros: ["Versatile", "Quick heating"], cons: ["Limited capacity"], bestFor: "Sautéing, frying", material: "Non-stick", diameter: "8-12 inches", care: "Hand wash", price: "$20-$100", fullDesc: "Frying pan.", durability: "5-10 years" },
        { id: 5, name: "Saucepan", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Even heating", "Pouring spout"], cons: ["Single purpose"], bestFor: "Making sauces", material: "Stainless steel", capacity: "1-4 quarts", care: "Dishwasher safe", price: "$25-$80", fullDesc: "Saucepan.", durability: "10+ years" },
        { id: 6, name: "Stock Pot", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Large capacity", "Versatile"], cons: ["Heavy", "Storage space"], bestFor: "Soups, stocks", material: "Stainless steel", capacity: "8-20 quarts", care: "Dishwasher safe", price: "$30-$120", fullDesc: "Stock pot.", durability: "10+ years" },
        { id: 7, name: "Dutch Oven", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Retains heat", "Versatile"], cons: ["Expensive", "Heavy"], bestFor: "Braising, stewing", material: "Enameled cast iron", capacity: "4-7 quarts", care: "Hand wash", price: "$50-$300", fullDesc: "Dutch oven.", durability: "Lifetime" },
        { id: 8, name: "Baking Dish", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Oven safe", "Even baking"], cons: ["Single purpose"], bestFor: "Casseroles", material: "Glass", sizes: "Various", care: "Dishwasher safe", price: "$15-$60", fullDesc: "Baking dish.", durability: "5-10 years" }
      ],
      cookwareMaterials: [
        { id: 1, name: "Stainless Steel", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Durable", "Non-reactive"], cons: ["Food can stick"], bestFor: "All-purpose cooking", care: "Dishwasher safe", durability: "Lifetime", price: "$$-$$$", fullDesc: "Stainless steel cookware." },
        { id: 2, name: "Glass", image: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?auto=format&fit=crop&w=400", pros: ["Heat-resistant", "Easy to clean"], cons: ["Can break"], bestFor: "Baking dishes", care: "Dishwasher safe", durability: "5-10 years", price: "$-$$", fullDesc: "Glass bakeware." },
        { id: 3, name: "Non-Stick", image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400", pros: ["Easy cleaning", "Less oil needed"], cons: ["Coating wears off"], bestFor: "Eggs, pancakes", care: "Hand wash", durability: "2-5 years", price: "$-$$", fullDesc: "Non-stick pans." },
        { id: 4, name: "Cast Iron", image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400", pros: ["Natural non-stick", "Durable"], cons: ["Heavy", "Requires seasoning"], bestFor: "High heat cooking", care: "Season regularly", durability: "Lifetime", price: "$$-$$$", fullDesc: "Cast iron cookware." }
      ],
      crockeryItems: [
        { id: 1, name: "Dinner Plates", category: "dining", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Essential", "Easy to clean"], cons: ["Can break"], bestFor: "Main course", material: "Ceramic", care: "Dishwasher safe", price: "$5-$25", fullDesc: "Dinner plates.", durability: "5-10 years" },
        { id: 2, name: "Side Plates", category: "dining", image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400", pros: ["Multi-purpose", "Space saving"], cons: ["Small size"], bestFor: "Salad, bread", material: "Ceramic", care: "Dishwasher safe", price: "$3-$15", fullDesc: "Side plates.", durability: "5-10 years" },
        { id: 3, name: "Soup Bowls", category: "dining", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400", pros: ["Deep design", "Holds liquids"], cons: ["Limited use"], bestFor: "Soups", material: "Ceramic", capacity: "12-20 oz", care: "Dishwasher safe", price: "$4-$18", fullDesc: "Soup bowls.", durability: "5-10 years" },
        { id: 4, name: "Cereal Bowls", category: "dining", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Versatile", "Everyday use"], cons: ["Small capacity"], bestFor: "Breakfast cereal", material: "Ceramic", capacity: "16-24 oz", care: "Dishwasher safe", price: "$3-$12", fullDesc: "Cereal bowls.", durability: "3-5 years" },
        { id: 5, name: "Serving Bowls", category: "dining", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Large capacity", "Family style"], cons: ["Heavy"], bestFor: "Salads, pasta", material: "Ceramic", capacity: "1-3 quarts", care: "Dishwasher safe", price: "$10-$35", fullDesc: "Serving bowls.", durability: "5-10 years" },
        { id: 6, name: "Tea Cups & Saucers", category: "tea", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Elegant", "Formal"], cons: ["Fragile"], bestFor: "Formal tea", material: "Porcelain", capacity: "6-8 oz", care: "Hand wash", price: "$10-$40", fullDesc: "Tea cups.", durability: "10+ years" },
        { id: 7, name: "Mugs", category: "tea", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400", pros: ["Heat resistant", "Large capacity"], cons: ["Can stain"], bestFor: "Tea, coffee", material: "Ceramic", capacity: "10-16 oz", care: "Dishwasher safe", price: "$5-$20", fullDesc: "Mugs.", durability: "5-10 years" },
        { id: 8, name: "Sugar Bowl", category: "tea", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Keeps sugar dry", "With lid"], cons: ["Small size"], bestFor: "Sugar service", material: "Ceramic", capacity: "8-12 oz", care: "Dishwasher safe", price: "$8-$20", fullDesc: "Sugar bowl.", durability: "5-10 years" },
        { id: 9, name: "Creamer", category: "tea", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400", pros: ["Pouring spout", "Elegant"], cons: ["Small capacity"], bestFor: "Milk, cream", material: "Ceramic", capacity: "6-10 oz", care: "Dishwasher safe", price: "$6-$18", fullDesc: "Creamer.", durability: "5-10 years" },
        { id: 10, name: "Water Glasses", category: "water", image: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?auto=format&fit=crop&w=400", pros: ["Clear view", "Easy to clean"], cons: ["Can break"], bestFor: "Water, juices", material: "Glass", capacity: "10-16 oz", care: "Dishwasher safe", price: "$2-$10", fullDesc: "Water glasses.", durability: "3-5 years" },
        { id: 11, name: "Juice Glasses", category: "water", image: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?auto=format&fit=crop&w=400", pros: ["Smaller size", "Stackable"], cons: ["Small capacity"], bestFor: "Juices", material: "Glass", capacity: "6-8 oz", care: "Dishwasher safe", price: "$1-$6", fullDesc: "Juice glasses.", durability: "3-5 years" },
        { id: 12, name: "Pitcher", category: "water", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Large capacity", "Easy pouring"], cons: ["Bulky"], bestFor: "Serving drinks", material: "Glass", capacity: "1-2 liters", care: "Dishwasher safe", price: "$10-$30", fullDesc: "Pitcher.", durability: "3-5 years" }
      ],
      cutleryItems: [
        { id: 1, name: "Dinner Fork", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Essential", "Versatile"], cons: ["Food can get stuck"], bestFor: "Main course", material: "Stainless steel", length: "7-8 inches", care: "Dishwasher safe", price: "$2-$8", fullDesc: "Dinner fork.", durability: "10+ years" },
        { id: 2, name: "Dinner Knife", image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400", pros: ["Sharp edge", "Durable"], cons: ["Needs sharpening"], bestFor: "Cutting meat", material: "Stainless steel", length: "8-9 inches", care: "Dishwasher safe", price: "$3-$10", fullDesc: "Dinner knife.", durability: "10+ years" },
        { id: 3, name: "Tablespoon", image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400", pros: ["Multi-purpose", "Strong"], cons: ["Too large for some"], bestFor: "Serving food", material: "Stainless steel", length: "6-7 inches", care: "Dishwasher safe", price: "$2-$6", fullDesc: "Tablespoon.", durability: "10+ years" },
        { id: 4, name: "Teaspoon", image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400", pros: ["Perfect size", "Essential"], cons: ["Too small for some"], bestFor: "Tea stirring", material: "Stainless steel", length: "5-6 inches", care: "Dishwasher safe", price: "$1-$5", fullDesc: "Teaspoon.", durability: "10+ years" },
        { id: 5, name: "Dessert Spoon", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400", pros: ["Perfect dessert size", "Elegant"], cons: ["Limited use"], bestFor: "Desserts", material: "Stainless steel", length: "6-7 inches", care: "Dishwasher safe", price: "$2-$7", fullDesc: "Dessert spoon.", durability: "10+ years" },
        { id: 6, name: "Soup Spoon", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400", pros: ["Round bowl", "Holds liquids"], cons: ["Single purpose"], bestFor: "Soups", material: "Stainless steel", length: "6-7 inches", care: "Dishwasher safe", price: "$2-$7", fullDesc: "Soup spoon.", durability: "10+ years" },
        { id: 7, name: "Salad Fork", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Smaller size", "Elegant"], cons: ["Limited use"], bestFor: "Salads", material: "Stainless steel", length: "6-7 inches", care: "Dishwasher safe", price: "$2-$6", fullDesc: "Salad fork.", durability: "10+ years" },
        { id: 8, name: "Butter Knife", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400", pros: ["Rounded edge", "Safe"], cons: ["Not for cutting"], bestFor: "Spreading butter", material: "Stainless steel", length: "6-7 inches", care: "Dishwasher safe", price: "$2-$6", fullDesc: "Butter knife.", durability: "10+ years" }
      ],
      servingwareItems: [
        { id: 1, name: "Serving Bowls", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400", pros: ["Large capacity", "Beautiful"], cons: ["Storage space"], bestFor: "Salads, pasta", material: "Ceramic", capacity: "1-3 quarts", care: "Dishwasher safe", price: "$10-$35", fullDesc: "Serving bowls.", durability: "5-10 years" },
        { id: 2, name: "Platters", image: "https://images.unsplash.com/photo-1587334994507-9b731baa1e46?auto=format&fit=crop&w=400", pros: ["Large surface", "Elegant"], cons: ["Bulky"], bestFor: "Meat, biryani", material: "Ceramic", sizes: "12-16 inches", care: "Hand wash", price: "$15-$50", fullDesc: "Platters.", durability: "5-10 years" },
        { id: 3, name: "Gravy Boat", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400", pros: ["Easy pouring", "No drips"], cons: ["Single purpose"], bestFor: "Gravies", material: "Ceramic", capacity: "12-16 oz", care: "Hand wash", price: "$10-$25", fullDesc: "Gravy boat.", durability: "10+ years" },
        { id: 4, name: "Butter Dish", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400", pros: ["Keeps butter fresh", "Covered"], cons: ["Small capacity"], bestFor: "Butter", material: "Ceramic", capacity: "4-8 oz", care: "Dishwasher safe", price: "$8-$20", fullDesc: "Butter dish.", durability: "5-10 years" },
        { id: 5, name: "Sugar Bowl", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Keeps sugar dry", "With lid"], cons: ["Small size"], bestFor: "Sugar service", material: "Ceramic", capacity: "8-12 oz", care: "Dishwasher safe", price: "$8-$20", fullDesc: "Sugar bowl.", durability: "5-10 years" },
        { id: 6, name: "Creamer", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400", pros: ["Pouring spout", "Elegant"], cons: ["Small capacity"], bestFor: "Milk, cream", material: "Ceramic", capacity: "6-10 oz", care: "Dishwasher safe", price: "$6-$18", fullDesc: "Creamer.", durability: "5-10 years" },
        { id: 7, name: "Salad Bowl with Servers", image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400", pros: ["Complete set", "Large size"], cons: ["Bulky"], bestFor: "Salads", material: "Wood", capacity: "2-4 quarts", care: "Hand wash", price: "$20-$60", fullDesc: "Salad bowl.", durability: "5-10 years" },
        { id: 8, name: "Cake Stand", image: "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400", pros: ["Elevated display", "Centerpiece"], cons: ["Single purpose"], bestFor: "Cakes", material: "Glass", diameter: "10-12 inches", care: "Hand wash", price: "$15-$45", fullDesc: "Cake stand.", durability: "10+ years" }
      ],
      servingCutleryItem: {
        id: 1, name: "Serving Cutlery Collection", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400", pros: ["Complete serving set", "Elegant"], cons: ["Multiple pieces"], bestFor: "Serving food", material: "Stainless steel", care: "Hand wash", price: "$30-$80", fullDesc: "Complete serving cutlery set.", durability: "10+ years", description: "Includes serving spoons, forks, tongs, ladles."
      }
    };
  };

  // ===== FETCH DATA FROM API =====
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all categories
      const categories = [
        'kitchen-tools', 'knives', 'cutting-boards', 'mixing-bowls', 
        'utensils', 'cookware', 'crockery', 'cutlery', 'servingware'
      ];
      
      const results = await Promise.all(
        categories.map(async (cat) => {
          try {
            const response = await axios.get(`http://localhost:5000/api/beginners-guide?category=${cat}`);
            return { category: cat, data: response.data.guides || [] };
          } catch (err) {
            console.error(`Error fetching ${cat}:`, err);
            return { category: cat, data: [] };
          }
        })
      );

      // Parse and set data
      results.forEach(result => {
        const parsedData = result.data.map(guide => {
          let content = {};
          try {
            content = JSON.parse(guide.content);
          } catch (e) {
            content = guide.content;
          }
          return { ...content, id: guide._id, image: guide.image };
        });

        switch (result.category) {
          case 'kitchen-tools':
            if (parsedData.length) setKitchenEssentials(parsedData);
            break;
          case 'knives':
            if (parsedData.length) setKnivesData(parsedData);
            break;
          case 'cutting-boards':
            if (parsedData.length) setCuttingBoardTypes(parsedData);
            break;
          case 'mixing-bowls':
            if (parsedData.length) setMixingBowlTypes(parsedData);
            break;
          case 'utensils':
            if (parsedData.length) setUtensilItems(parsedData);
            break;
          case 'cookware':
            if (parsedData.length) {
              const types = parsedData.filter(i => i.type === 'cookware-type');
              const materials = parsedData.filter(i => i.type === 'cookware-material');
              if (types.length) setCookwareTypes(types);
              if (materials.length) setCookwareMaterials(materials);
            }
            break;
          case 'crockery':
            if (parsedData.length) setCrockeryItems(parsedData);
            break;
          case 'cutlery':
            if (parsedData.length) setCutleryItems(parsedData);
            break;
          case 'servingware':
            if (parsedData.length) {
              const items = parsedData.filter(i => i.type !== 'serving-cutlery');
              const cutlery = parsedData.find(i => i.type === 'serving-cutlery');
              if (items.length) setServingwareItems(items);
              if (cutlery) setServingCutleryItem(cutlery);
            }
            break;
          default:
            break;
        }
      });

      // If no data from API, use fallback
      if (kitchenEssentials.length === 0) {
        const fallback = getFallbackData();
        setKitchenEssentials(fallback.kitchenEssentials);
        setKnivesData(fallback.knivesData);
        setCuttingBoardTypes(fallback.cuttingBoardTypes);
        setMixingBowlTypes(fallback.mixingBowlTypes);
        setUtensilItems(fallback.utensilItems);
        setCookwareTypes(fallback.cookwareTypes);
        setCookwareMaterials(fallback.cookwareMaterials);
        setCrockeryItems(fallback.crockeryItems);
        setCutleryItems(fallback.cutleryItems);
        setServingwareItems(fallback.servingwareItems);
        setServingCutleryItem(fallback.servingCutleryItem);
        setError('Using offline data. Connect to internet for latest content.');
      }
      
      // Set initial selected tool
      if (kitchenEssentials.length > 0 && !selectedTool) {
        setSelectedTool(kitchenEssentials[0]);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      // Use fallback data
      const fallback = getFallbackData();
      setKitchenEssentials(fallback.kitchenEssentials);
      setKnivesData(fallback.knivesData);
      setCuttingBoardTypes(fallback.cuttingBoardTypes);
      setMixingBowlTypes(fallback.mixingBowlTypes);
      setUtensilItems(fallback.utensilItems);
      setCookwareTypes(fallback.cookwareTypes);
      setCookwareMaterials(fallback.cookwareMaterials);
      setCrockeryItems(fallback.crockeryItems);
      setCutleryItems(fallback.cutleryItems);
      setServingwareItems(fallback.servingwareItems);
      setServingCutleryItem(fallback.servingCutleryItem);
      setSelectedTool(fallback.kitchenEssentials[0]);
      setError('Using offline data. Connect to internet for latest content.');
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for card classes
  const getKnifeCardClass = (knifeName) => {
    const name = knifeName?.toLowerCase() || '';
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
    const name = boardName?.toLowerCase() || '';
    if (name.includes('bamboo')) return 'board-bamboo';
    if (name.includes('maple')) return 'board-maple';
    if (name.includes('plastic')) return 'board-plastic';
    if (name.includes('rubber')) return 'board-rubber';
    return '';
  };

  const getBowlCardClass = (bowlName) => {
    const name = bowlName?.toLowerCase() || '';
    if (name.includes('stainless')) return 'bowl-steel';
    if (name.includes('glass')) return 'bowl-glass';
    if (name.includes('ceramic') || name.includes('porcelain')) return 'bowl-ceramic';
    if (name.includes('plastic')) return 'bowl-plastic';
    if (name.includes('copper') || name.includes('silicone')) return 'bowl-copper';
    return '';
  };

  const getUtensilCardClass = (utensilName) => {
    const name = utensilName?.toLowerCase() || '';
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
    const name = cookwareName?.toLowerCase() || '';
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
    const name = materialName?.toLowerCase() || '';
    if (name.includes('stainless')) return 'cookware-steel';
    if (name.includes('glass')) return 'cookware-glass';
    if (name.includes('non-stick')) return 'cookware-nonstick';
    if (name.includes('iron') || name.includes('cast')) return 'cookware-iron';
    return '';
  };

  const getCrockeryCardClass = (crockeryName) => {
    const name = crockeryName?.toLowerCase() || '';
    if (name.includes('dinner') && name.includes('plate')) return 'crockery-dinner';
    if (name.includes('side')) return 'crockery-side';
    if (name.includes('soup')) return 'crockery-soup';
    if (name.includes('cereal')) return 'crockery-cereal';
    if (name.includes('mug')) return 'crockery-mug';
    if (name.includes('water') && name.includes('glass')) return 'crockery-water';
    if (name.includes('juice')) return 'crockery-juice';
    if (name.includes('pitcher')) return 'crockery-pitcher';
    if (name.includes('tea') && name.includes('cup')) return 'crockery-tea';
    if (name.includes('sugar')) return 'crockery-sugar';
    if (name.includes('creamer')) return 'crockery-creamer';
    if (name.includes('serving') && name.includes('bowl')) return 'crockery-serving';
    return '';
  };

  const getCutleryCardClass = (cutleryName) => {
    const name = cutleryName?.toLowerCase() || '';
    if (name.includes('dinner') && name.includes('fork')) return 'cutlery-dinner-fork';
    if (name.includes('dinner') && name.includes('knife')) return 'cutlery-dinner-knife';
    if (name.includes('tablespoon')) return 'cutlery-tablespoon';
    if (name.includes('teaspoon')) return 'cutlery-teaspoon';
    if (name.includes('dessert')) return 'cutlery-dessert';
    if (name.includes('soup')) return 'cutlery-soup';
    if (name.includes('salad')) return 'cutlery-salad';
    if (name.includes('butter')) return 'cutlery-butter';
    return '';
  };

  const getServingwareCardClass = (servingwareName) => {
    const name = servingwareName?.toLowerCase() || '';
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

  // Filter crockery items by category
  const getFilteredCrockery = () => {
    if (crockeryTab === 'dining') {
      return crockeryItems.filter(item => item.category === 'dining');
    } else if (crockeryTab === 'tea') {
      return crockeryItems.filter(item => item.category === 'tea');
    } else if (crockeryTab === 'water') {
      return crockeryItems.filter(item => item.category === 'water');
    }
    return [];
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="ktp-container">
        <div className="loading-spinner">Loading kitchen tools...</div>
      </div>
    );
  }

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
                  onClick={() => setSelectedTool(tool)}
                >
                  <span className="ktp-tool-list-name">{tool.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="ktp-main">
          {error && <div className="error-message" style={{color: 'orange', textAlign: 'center', padding: '10px'}}>{error}</div>}
          
          {selectedTool && (
            <>
              <header className="ktp-main-header">
                <div className="ktp-header-content">
                  <h1 className="ktp-page-title">{selectedTool.name}</h1>
                  <p className="ktp-page-description">{selectedTool.tagline}</p>
                </div>
              </header>

              <div className="ktp-content-area">
                {/* Chef's Knife - KNIVES */}
                {selectedTool.name === "Chef's Knife" && knivesData.length > 0 && (
                  <div className="ktp-knives-section">
                    <h3 className="ktp-section-heading">Kitchen Knives ({knivesData.length})</h3>
                    <div className="ktp-cards-grid">
                      {knivesData.map((knife) => (
                        <div 
                          key={knife.id} 
                          className={`ktp-card ktp-knife-card ${getKnifeCardClass(knife.name)}`}
                          onClick={() => openModal({...knife, type: 'knife', category: 'Knife'})}
                        >
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${knife.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{knife.name}</h4>
                            <div className="ktp-card-size">{knife.size}</div>
                            <div className="ktp-card-best">{knife.bestFor}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cutting Board - BOARDS */}
                {selectedTool.name === "Cutting Board" && cuttingBoardTypes.length > 0 && (
                  <div className="ktp-boards-section">
                    <h3 className="ktp-section-heading">Cutting Boards ({cuttingBoardTypes.length})</h3>
                    <div className="ktp-cards-grid">
                      {cuttingBoardTypes.map((board) => (
                        <div 
                          key={board.id} 
                          className={`ktp-card ktp-board-card ${getBoardCardClass(board.name)}`}
                          onClick={() => openModal({...board, type: 'board', category: 'Cutting Board'})}
                        >
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${board.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{board.name}</h4>
                            <div className="ktp-card-material">{board.bestFor}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mixing Bowls */}
                {selectedTool.name === "Mixing Bowls" && mixingBowlTypes.length > 0 && (
                  <div className="ktp-bowls-section">
                    <h3 className="ktp-section-heading">Mixing Bowls ({mixingBowlTypes.length})</h3>
                    <div className="ktp-cards-grid">
                      {mixingBowlTypes.map((bowl) => (
                        <div 
                          key={bowl.id} 
                          className={`ktp-card ktp-bowl-card ${getBowlCardClass(bowl.name)}`}
                          onClick={() => openModal({...bowl, type: 'bowl', category: 'Mixing Bowl'})}
                        >
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${bowl.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{bowl.name}</h4>
                            <div className="ktp-card-material">{bowl.sizes}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Utensil Set */}
                {selectedTool.name === "Utensil Set" && utensilItems.length > 0 && (
                  <div className="ktp-utensils-section">
                    <h3 className="ktp-section-heading">Kitchen Utensils ({utensilItems.length})</h3>
                    <div className="ktp-cards-grid">
                      {utensilItems.map((utensil) => (
                        <div 
                          key={utensil.id} 
                          className={`ktp-card ktp-utensil-card ${getUtensilCardClass(utensil.name)}`}
                          onClick={() => openModal({...utensil, type: 'utensil', category: 'Utensil'})}
                        >
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${utensil.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{utensil.name}</h4>
                            <div className="ktp-card-material">{utensil.material}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cookware Set */}
                {selectedTool.name === "Cookware Set" && (
                  <div className="ktp-cookware-section">
                    <div className="ktp-tabs">
                      <button className={`ktp-tab ${cookwareTab === 'types' ? 'ktp-tab-active' : ''}`} onClick={() => setCookwareTab('types')}>
                        Cookware Types ({cookwareTypes.length})
                      </button>
                      <button className={`ktp-tab ${cookwareTab === 'materials' ? 'ktp-tab-active' : ''}`} onClick={() => setCookwareTab('materials')}>
                        Cookware Materials ({cookwareMaterials.length})
                      </button>
                    </div>

                    {cookwareTab === 'types' && cookwareTypes.length > 0 && (
                      <div className="ktp-cookware-types-section">
                        <div className="ktp-cards-grid">
                          {cookwareTypes.map((item) => (
                            <div key={item.id} className={`ktp-card ktp-cookware-type-card ${getCookwareTypeClass(item.name)}`} onClick={() => openModal({...item, type: 'cookware-type', category: 'Cookware'})}>
                              <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                              <div className="ktp-card-content">
                                <h4 className="ktp-card-title">{item.name}</h4>
                                <div className="ktp-card-material">{item.material}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {cookwareTab === 'materials' && cookwareMaterials.length > 0 && (
                      <div className="ktp-cookware-materials-section">
                        <div className="ktp-cards-grid">
                          {cookwareMaterials.map((item) => (
                            <div key={item.id} className={`ktp-card ktp-cookware-material-card ${getCookwareMaterialClass(item.name)}`} onClick={() => openModal({...item, type: 'cookware-material', category: 'Cookware Material'})}>
                              <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                              <div className="ktp-card-content">
                                <h4 className="ktp-card-title">{item.name}</h4>
                                <div className="ktp-card-material">{item.durability}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Crockery Set */}
                {selectedTool.name === "Crockery Set" && crockeryItems.length > 0 && (
                  <div className="ktp-crockery-section">
                    <div className="ktp-tabs">
                      <button className={`ktp-tab ${crockeryTab === 'dining' ? 'ktp-tab-active' : ''}`} onClick={() => setCrockeryTab('dining')}>Dining Set</button>
                      <button className={`ktp-tab ${crockeryTab === 'tea' ? 'ktp-tab-active' : ''}`} onClick={() => setCrockeryTab('tea')}>Tea Set</button>
                      <button className={`ktp-tab ${crockeryTab === 'water' ? 'ktp-tab-active' : ''}`} onClick={() => setCrockeryTab('water')}>Water Set</button>
                    </div>
                    <div className="ktp-crockery-items-section">
                      <div className="ktp-cards-grid">
                        {getFilteredCrockery().map((item) => (
                          <div key={item.id} className={`ktp-card ktp-crockery-card ${getCrockeryCardClass(item.name)}`} onClick={() => openModal({...item, type: 'crockery', category: 'Crockery'})}>
                            <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                            <div className="ktp-card-content">
                              <h4 className="ktp-card-title">{item.name}</h4>
                              <div className="ktp-card-material">{item.material}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Cutlery Set */}
                {selectedTool.name === "Cutlery Set" && cutleryItems.length > 0 && (
                  <div className="ktp-cutlery-section">
                    <h3 className="ktp-section-heading">Cutlery ({cutleryItems.length})</h3>
                    <div className="ktp-cards-grid">
                      {cutleryItems.map((item) => (
                        <div key={item.id} className={`ktp-card ktp-cutlery-card ${getCutleryCardClass(item.name)}`} onClick={() => openModal({...item, type: 'cutlery', category: 'Cutlery'})}>
                          <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                          <div className="ktp-card-content">
                            <h4 className="ktp-card-title">{item.name}</h4>
                            <div className="ktp-card-material">{item.material}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Servingware Set */}
                {selectedTool.name === "Servingware Set" && (
                  <div className="ktp-servingware-section">
                    <div className="ktp-tabs">
                      <button className={`ktp-tab ${servingTab === 'servingware' ? 'ktp-tab-active' : ''}`} onClick={() => setServingTab('servingware')}>
                        Servingware ({servingwareItems.length})
                      </button>
                      <button className={`ktp-tab ${servingTab === 'cutlery' ? 'ktp-tab-active' : ''}`} onClick={() => setServingTab('cutlery')}>
                        Serving Cutlery (1)
                      </button>
                    </div>

                    {servingTab === 'servingware' && servingwareItems.length > 0 && (
                      <div className="ktp-servingware-items-section">
                        <div className="ktp-cards-grid">
                          {servingwareItems.map((item) => (
                            <div key={item.id} className={`ktp-card ktp-servingware-card ${getServingwareCardClass(item.name)}`} onClick={() => openModal({...item, type: 'servingware', category: 'Servingware'})}>
                              <div className="ktp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                              <div className="ktp-card-content">
                                <h4 className="ktp-card-title">{item.name}</h4>
                                <div className="ktp-card-material">{item.capacity || item.sizes || item.diameter}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {servingTab === 'cutlery' && servingCutleryItem && (
                      <div className="ktp-serving-cutlery-section">
                        <div className="ktp-cards-grid">
                          <div className="ktp-card ktp-serving-cutlery-card" onClick={() => openModal({...servingCutleryItem, type: 'serving-cutlery', category: 'Serving Cutlery'})}>
                            <div className="ktp-card-image" style={{ backgroundImage: `url(${servingCutleryItem.image})` }}></div>
                            <div className="ktp-card-content">
                              <h4 className="ktp-card-title">{servingCutleryItem.name}</h4>
                              <div className="ktp-card-material">Complete Set</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      {/* MODAL */}
      {showModal && selectedItem && (
        <div className="ktp-modal-overlay" onClick={closeModal}>
          <div className="ktp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ktp-modal-close" onClick={closeModal}>×</button>
            
            <div className="ktp-modal-content">
              <div className="ktp-modal-left">
                <div className="ktp-modal-title">
                  <h2>{selectedItem.name}</h2>
                  {selectedItem.bestFor && <p className="ktp-modal-subtitle">{selectedItem.bestFor}</p>}
                </div>

                <div className="ktp-quick-specs">
                  {selectedItem.price && <span className="ktp-spec-badge price">💰 {selectedItem.price}</span>}
                  {selectedItem.size && <span className="ktp-spec-badge">📏 {selectedItem.size}</span>}
                  {selectedItem.material && <span className="ktp-spec-badge">⚙️ {selectedItem.material}</span>}
                  {selectedItem.capacity && <span className="ktp-spec-badge">📦 {selectedItem.capacity}</span>}
                  {selectedItem.durability && <span className="ktp-spec-badge">⏳ {selectedItem.durability}</span>}
                </div>

                {selectedItem.fullDesc && (
                  <div className="ktp-modal-description">
                    <h3>📝 Description</h3>
                    <p>{selectedItem.fullDesc}</p>
                  </div>
                )}

                {selectedItem.pros && selectedItem.pros.length > 0 && (
                  <div className="ktp-pros-cons-section">
                    <h3>⭐ Pros & Cons</h3>
                    <div className="ktp-pros-row">{selectedItem.pros.map((pro, idx) => (<span key={idx} className="ktp-pros-badge">✓ {pro}</span>))}</div>
                    <div className="ktp-cons-row">{selectedItem.cons.map((con, idx) => (<span key={idx} className="ktp-cons-badge">✗ {con}</span>))}</div>
                  </div>
                )}

                {selectedItem.keyUses && (
                  <div className="ktp-key-uses">
                    <h3>🔪 Common Uses</h3>
                    <div className="ktp-uses-row">{selectedItem.keyUses.map((use, idx) => (<span key={idx} className="ktp-use-badge">• {use}</span>))}</div>
                  </div>
                )}

                {selectedItem.care && (
                  <div className="ktp-care-section">
                    <h3>🧼 Care & Maintenance</h3>
                    <p>{selectedItem.care}</p>
                  </div>
                )}

                <div className="ktp-additional-details">
                  {selectedItem.sizes && !selectedItem.capacity && <p><strong>Sizes:</strong> {selectedItem.sizes}</p>}
                  {selectedItem.diameter && <p><strong>Diameter:</strong> {selectedItem.diameter}</p>}
                  {selectedItem.length && <p><strong>Length:</strong> {selectedItem.length}</p>}
                  {selectedItem.description && <p><strong>Includes:</strong> {selectedItem.description}</p>}
                </div>

                <button className="ktp-view-details-btn">View Full Specifications →</button>
              </div>

              <div className="ktp-modal-right">
                <div className="ktp-modal-image-container">
                  <div className="ktp-modal-image" style={{ backgroundImage: `url(${selectedItem.image})` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="back-home-container">
        <button className="back-home-btn" onClick={() => navigate('/guidance')}>← Back to Guidance Page</button>
      </div>
    </div>
  );
};

export default KitchenToolsPage;