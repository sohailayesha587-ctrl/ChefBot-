const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const BeginnersGuide = require('../models/BeginnersGuide');

const skillCards = [
  { id: '01', image: 'KitchenTools.png', title: 'Kitchen Tools', route: '/kitchen-tools', features: [ 'Tools that make cooking easier and more precise.' ] },
  { id: '02', image: 'CuttingTechniques.png', title: 'Cutting Techniques', route: '/cutting-techniques', features: [ 'Tools that make cooking easier and more precise.' ] },
  { id: '03', image: 'CookingMethods.png', title: 'Cooking Methods', route: '/cooking-methods', features: [ 'Heat-based techniques used to prepare and cook food.' ] },
  { id: '04', image: 'MeatCuts.png', title: 'Meat Cuts', route: '/meat-cuts', features: [ 'Different portions of meat from various animal parts.' ] },
  { id: '05', image: 'KitchenAppliances.png', title: 'Kitchen Appliances', route: '/kitchen-appliances', features: [ 'Electrical devices that assist with cooking and food preparation.' ] },
  { id: '06', image: 'PantryBasics.png', title: 'Pantry Basics', route: '/pantry-basics', features: [ 'Staple ingredients that form the foundation of everyday cooking.' ] },
  { id: '07', image: 'MeasuringSkills.png', title: 'Measuring Skills', route: '/measuring-skills', features: [ 'Techniques for accurately measuring ingredients.' ] },
  { id: '08', image: 'BakingEssentials.png', title: 'Bakery Essentials', route: '/bakery-essentials', features: [ 'Must-have tools and ingredients for successful baking.' ] }
];

const cookingMethods = [
  {
    id: 1, name: "Boiling", tagline: "Cooking in boiling water", fullDesc: "Boiling is a moist and heat cooking method where food is submerged in water at 100°C (212°F). This method is excellent for cooking pasta, vegetables, eggs, and grains. It is a fast cooking method that retains nutrients when done properly.",
    keyUses: ["Pasta", "Vegetables", "Eggs", "Rice"], previewImg: "BoilingMethod.png", temperature: "100°C (212°F)", equipment: "Saucepan, Stock pot", bestFor: "Pasta, hard vegetables, grains",
    tips: ["Use salted water for flavor", "Don't overcrowd the pot", "Use rolling boil for pasta", "Ice bath stops cooking"],
    steps: [ "Fill a pot with water and bring to a rolling boil.", "Add salt to the boiling water for flavor.", "Carefully add the food to the boiling water.", "Cook for the recommended time, stirring occasionally.", "Drain and serve immediately or shock in ice water." ]
  },
  {
    id: 2, name: "Simmering", tagline: "Gentle cooking below boiling point", fullDesc: "Simmering cooks food in liquid at temperatures between 85-95°C (185-203°F). The liquid shows small bubbles and gentle movement. This method is perfect for delicate foods that need slow, even cooking without breaking apart.",
    keyUses: ["Soups", "Stews", "Sauces", "Grains"], previewImg: "SimmeringMethod.png", temperature: "85-95°C (185-203°F)", equipment: "Saucepan, Dutch oven", bestFor: "Tender meats, soups, sauces",
    tips: ["Maintain gentle bubbles", "Use lid to retain heat", "Stir occasionally", "Adjust heat as needed"],
    steps: [ "Bring liquid to a boil first.", "Reduce heat until bubbles are small and gentle.", "Add ingredients to the simmering liquid.", "Cover partially to allow steam to escape.", "Cook until food is tender and flavors meld." ]
  },
  {
    id: 3, name: "Steaming", tagline: "Cooking with steam heat", fullDesc: "Steaming cooks food by exposing it to steam from boiling water. This moist and heated method preserves nutrients, color, and texture better than boiling. Food doesn't touch the water, preventing nutrient loss.",
    keyUses: ["Vegetables", "Fish", "Dumplings", "Rice"], previewImg: "SteamingMethod.png", temperature: "100°C (212°F)", equipment: "Steamer basket, Bamboo steamer", bestFor: "Delicate vegetables, seafood, dim sum",
    tips: ["Do not let water touch food", "Use tight fitting lid", "Check water level", "Layer foods properly"],
    steps: [ "Add water to a pot and bring to a boil.", "Place steamer basket over (not in) the water.", "Arrange food in a single layer in the basket.", "Cover with tight-fitting lid to trap steam.", "Steam for recommended time until cooked." ]
  },
  {
    id: 4, name: "Sauteing", tagline: "Quick frying in minimal oil", fullDesc: "Sauteing cooks food quickly in a small amount of oil or fat over relatively high heat. The French word 'sauter' means 'to jump', referring to the tossing motion. This method creates flavorful browned surfaces while keeping interiors tender.",
    keyUses: ["Vegetables", "Meat pieces", "Shrimp", "Mushrooms"], previewImg: "SautingMethod.png", temperature: "Medium to high heat", equipment: "Skillet, Saute pan", bestFor: "Quick cooking ingredients, stir fries",
    tips: ["Preheat pan properly", "Do not crowd pan", "Keep food moving", "Use high smoke point oil"],
    steps: [ "Heat pan over medium-high heat.", "Add small amount of oil and heat until shimmering.", "Add ingredients in a single layer.", "Cook without moving for 1-2 minutes to sear.", "Toss or stir frequently until cooked through." ]
  },
  {
    id: 5, name: "Pan-Frying", tagline: "Shallow frying in oil", fullDesc: "Pan-frying uses more oil than sauteing (about 1/4 to 1/2 inch deep) to cook food. The oil should come about halfway up the food. This method creates a crispy exterior while cooking the interior through conduction.",
    keyUses: ["Chicken cutlets", "Fish fillets", "Patties", "Potatoes"], previewImg: "Pan-FryingMethod.png", temperature: "Medium heat", equipment: "Skillet, Frying pan", bestFor: "Breaded foods, thick cuts, crispy textures",
    tips: ["Maintain oil temperature", "Do not flip too early", "Drain on paper towels", "Season immediately"],
    steps: [ "Add oil to pan (1/4 to 1/2 inch deep).", "Heat oil to proper temperature (not smoking).", "Carefully add food to the hot oil.", "Cook until golden brown on one side.", "Flip and cook until golden brown and cooked through." ]
  },
  {
    id: 6, name: "Deep-Frying", tagline: "Complete submersion in hot oil", fullDesc: "Deep frying completely submerges food in hot oil (typically 175-190°C/350-375°F). This creates a crispy, golden exterior while sealing in moisture. Proper temperature control is crucial to prevent oil absorption.",
    keyUses: ["French fries", "Chicken", "Doughnuts", "Fritters"], previewImg: "Deep-FryingMethod.png", temperature: "175-190°C (350-375°F)", equipment: "Deep fryer, Dutch oven", bestFor: "Battered foods, crispy snacks",
    tips: ["Use thermometer", "Fry in batches", "Drain properly", "Reuse oil properly"],
    steps: [ "Fill fryer with oil and heat to proper temperature.", "Pat food dry and coat if battering/breading.", "Carefully lower food into hot oil.", "Fry until golden brown and cooked through.", "Remove and drain on paper towels." ]
  },
  {
    id: 7, name: "Baking", tagline: "Dry heat cooking in oven", fullDesc: "Baking uses dry heat in an oven to cook food. Hot air circulates around the food, cooking it evenly. This method is ideal for foods that need structure development like bread, cakes, and casseroles.",
    keyUses: ["Bread", "Cakes", "Casseroles", "Roasted vegetables"], previewImg: "BakingMethod.png", temperature: "150-250°C (300-480°F)", equipment: "Oven, Baking sheets", bestFor: "Baked goods, casseroles, one pan meals",
    tips: ["Preheat oven", "Use middle rack", "Test for doneness"],
    steps: [ "Preheat oven to required temperature.", "Prepare food and place in appropriate bakeware.", "Place in center of preheated oven.", "Bake for recommended time.", "Check for doneness and remove from oven." ]
  },
  {
    id: 8, name: "Roasting", tagline: "High heat oven cooking", fullDesc: "Roasting uses dry heat at high temperatures (usually above 200°C/400°F) to cook food, typically meat or vegetables. The high heat caramelizes the exterior while keeping the interior moist. Often used for larger cuts of meat.",
    keyUses: ["Whole chicken", "Vegetables", "Large meat cuts", "Nuts"], previewImg: "RoastingMethod.png", temperature: "200-230°C (400-450°F)", equipment: "Roasting pan, Oven", bestFor: "Large meats, root vegetables",
    tips: ["Use roasting rack", "Baste occasionally", "Rest before carving", "Use meat thermometer"],
    steps: [ "Preheat oven to high temperature.", "Season food and place on roasting rack.", "Roast until exterior is browned.", "Reduce heat if needed for even cooking.", "Rest before serving for juicier results." ]
  },
  {
    id: 9, name: "Grilling", tagline: "Direct heat from below", fullDesc: "Grilling cooks food with direct radiant heat from below. This method creates marks and smoky flavor. Perfect for quick cooking foods that benefit from high heat and caramelization.",
    keyUses: ["Burgers", "Steaks", "Vegetables", "Kebabs"], previewImg: "GrillingMethod.png", temperature: "High heat", equipment: "Grill, Barbecue", bestFor: "Meats, vegetables with structure",
    tips: ["Clean grill grates", "Oil food not grates", "Create heat zones", "Don't press food"],
    steps: [ "Preheat grill to high heat.", "Clean and oil grill grates.", "Place food on hot grill grates.", "Cook until grill marks appear.", "Flip and cook to desired doneness." ]
  },
  {
    id: 10, name: "Broiling", 
    tagline: "Direct heat from above", 
    fullDesc: "Broiling uses direct radiant heat from above the food. Similar to an upside down grill, it quickly browns and cooks the surface of food. Excellent for melting cheese, browning toppings, or cooking thin cuts.",
    keyUses: ["Cheese melting", "Fish fillets", "Toast toppings", "Thin meats"], previewImg: "BroilingMethod.png", temperature: "260-290°C (500-550°F)", equipment: "Oven broiler", bestFor: "Quick browning, thin cuts",
    tips: ["Watch carefully", "Use broiler pan", "Adjust rack position", "Preheat broiler"],
    steps: [ "Preheat broiler for 5-10 minutes.", "Place food on broiler pan or baking sheet.", "Position rack 4-6 inches from heat source.", "Broil until browned and cooked.", "Watch carefully to prevent burning." ]
  },
  {
    id: 11, name: "Braising", tagline: "Slow cooking with moist heat", fullDesc: "Braising combines searing at high heat then slow cooking in liquid at low heat. This two step method is perfect for tough cuts of meat that become tender with long, slow cooking. The liquid can become a flavorful sauce.",
    keyUses: ["Pot roast", "Short ribs", "Brisket", "Stews"], previewImg: "BraisingMethod.png", temperature: "Low heat (150°C/300°F)", equipment: "Dutch oven, Heavy pot", bestFor: "Tough meats, one-pot meals",
    tips: ["Sear well first", "Use tight fitting lid", "Cook low and slow", "Skim fat from sauce"],
    steps: [ "Sear meat in hot oil until browned.", "Remove meat and saute vegetables.", "Add liquid and return meat to pot.", "Cover and cook at low temperature for hours.", "Reduce sauce and skim fat before serving." ]
  },
  {
    id: 12, name: "Stewing", tagline: "Slow simmering in liquid", fullDesc: "Stewing involves cooking small pieces of food completely submerged in liquid at low temperatures for extended periods. Similar to braising but with more liquid and smaller food pieces. Creates tender results with flavorful broth.",
    keyUses: ["Beef stew", "Curries", "Chilli"], previewImg: "StewingMethod.png", temperature: "Low heat", equipment: "Stock pot, Dutch oven", bestFor: "Small meat pieces, hearty dishes",
    tips: ["Cut uniform pieces", "Brown meat first", "Skim fat regularly", "Add vegetables at right time"],
    steps: [ "Brown meat pieces in batches.", "Sauté vegetables in same pot.", "Add liquid and return meat to pot.", "Simmer covered for 1-3 hours.", "Adjust seasoning and serve hot." ]
  }
];

const cuttingTechniques = [
  {
    id: 1, name: "Julienne", tagline: "Matchstick style thin strips", fullDesc: "Julienne is a knife technique that produces thin, matchstick sized strips of vegetables or fruits. It is 5-7cm long. It is essential for dishes that require quick cooking and uniform texture.",
    keyUses: ["Stir fries", "Salads", "Garnishes", "Asian dishes"], previewImg: "JulienneCut.png", knife: "Chef's knife or Santoku",
    tips: ["Keep fingers curled under", "Create planks first, then strips", "Maintain uniform thickness"],
    steps: [ "Wash and peel the vegetable if needed.", "Trim the ends and cut into 5-7 cm long segments.", "Slice the segments into 4 mm thick planks.", "Stack the planks and slice lengthwise into 4 mm thick strips.", "Keep cuts even for uniform matchstick sized pieces." ]
  },
  {
    id: 2, name: "Brunoise", tagline: "Fine 3mm cubes", fullDesc: "Brunoise is an extremely fine dice cut. It's the smallest of the dice cuts and requires precision knife work. Often used for garnishes or ingredients that need to cook quickly or melt into dishes.",
    keyUses: ["Sauces", "Soups", "Garnishes", "Stuffings"], previewImg: "BrunoiseCut.png", knife: "Sharp Chef's knife",
    tips: ["Start with julienne cuts", "Use claw grip for safety", "Keep knife very sharp"],
    steps: [ "Start with julienne-cut vegetables (strips).", "Gather the julienne strips into a tight bundle.", "Slice across the bundle at 3mm intervals.", "Keep the pieces as uniform as possible.", "Use a gentle rocking motion for precision cuts." ]
  },
  {
    id: 3, name: "Chiffonade", tagline: "Fine ribbon cuts for leafy greens", fullDesc: "Chiffonade is a technique for cutting leafy herbs and vegetables into thin, ribbon like strips. Meaning 'made of rags' in French, it is perfect for herbs and leafy greens where you want maximum flavor and elegant presentation.",
    keyUses: ["Herb garnishes", "Salads", "Pasta dishes", "Garnishes"], previewImg: "ChiffonadeCut.png", knife: "Chef's knife",
    tips: ["Stack leaves neatly", "Roll tightly before cutting", "Use gentle sawing motion"],
    steps: [ "Wash and thoroughly dry the leaves.", "Stack 5-10 leaves of similar size neatly.", "Roll the stack tightly into a cigar shape.", "Slice across the roll into thin ribbons (1-3mm wide).", "Separate the ribbons gently with your fingers." ]
  },
  {
    id: 4, name: "Dice", tagline: "Uniform cube cuts", fullDesc: "Dicing involves cutting food into uniform cube shaped pieces. There are different sizes: large dice (20mm), medium dice (12mm), and small dice (6mm). Uniform dicing ensures even cooking and professional presentation.",
    keyUses: ["Sautéing", "Soups", "Stews", "Salads"], previewImg: "DiceCut.png", knife: "Chef's knife",
    tips: ["Create planks then batons", "Maintain consistent pressure", "Use cutting board anchors"],
    steps: [ "Trim and square off the vegetable.", "Slice into uniform planks of desired thickness.", "Stack planks and cut into uniform batons.", "Line up batons and cut into cubes.", "Adjust size based on recipe requirements." ]
  },
  {
    id: 5, name: "Slice", tagline: "Basic cross sectional cuts", fullDesc: "Slicing is the most fundamental cutting technique, involving cutting food into flat, broad pieces. The thickness can vary from paper thin to thick slices depending on the recipe requirements.",
    keyUses: ["Sandwiches", "Roasting", "Frying", "Presentation"], previewImg: "SliceCut.png", knife: "Chef's knife or Santoku",
    tips: ["Use rocking motion", "Keep slices even", "Anchor food with flat side down"],
    steps: [ "Create a flat surface by cutting a thin slice off one side.", "Place the flat side down on the cutting board.", "Use claw grip to hold the food securely.", "Slice to desired thickness using a smooth motion.", "Keep slices consistent for even cooking." ]
  },
  {
    id: 6, name: "Mince", tagline: "Finely chopped pieces", fullDesc: "Mincing involves cutting food into very small, irregular pieces that are smaller than a dice. The goal is to create tiny pieces that distribute flavor evenly throughout a dish without being noticeable.",
    keyUses: ["Garlic", "Onions", "Herbs", "Flavor bases"], previewImg: "MinceCut.png", knife: "Chef's knife",
    tips: ["Rock knife back and forth", "Gather and chop repeatedly", "Use curved blade efficiently"],
    steps: [ "Start with finely chopped pieces.", "Place the tip of the knife on the cutting board.", "Rock the knife back and forth while moving across the pile.", "Gather the pieces and repeat the process.", "Continue until desired fineness is achieved." ]
  },
  {
    id: 7, name: "Batonnet", tagline: "Stick shaped cuts", fullDesc: "Batonnet produces stick shaped pieces, typically 5-6cm long. It's larger than julienne and serves as a starting point for medium dice cuts. Perfect for vegetables that will be served as side dishes or in stews.",
    keyUses: ["French fries", "Vegetable sticks", "Stir-fries"], previewImg: "BatonnetCut.png", knife: "Chef's knife",
    tips: ["Trim sides first", "Measure thickness", "Keep consistent length"],
    steps: [ "Trim and square off the vegetable.", "Cut into 5-6cm long segments.", "Slice each segment into 6mm thick planks.", "Stack planks and cut into 6mm thick sticks.", "Maintain uniform size throughout." ]
  },
  {
    id: 8, name: "Tourne", tagline: "Football shaped decorative cuts", fullDesc: "Tourne (or turned) is an advanced knife technique that produces seven sided and football shaped pieces. It is a decorative cut used in fine dining to create elegant vegetable presentations that cook evenly.",
    keyUses: ["Fine dining", "Garnishes", "Roasted vegetables", "Special occasions"], previewImg: "TourneCut.png", knife: "Paring knife or tourne knife",
    tips: ["Use small paring knife", "Practice on carrots first", "Maintain seven equal sides"],
    steps: [ "Peel the vegetable and cut into 5cm lengths.", "Hold the vegetable at an angle with your thumb.", "Make a shallow cut along the length, rotating after each cut.", "Create seven equal sides around the vegetable.", "Trim ends for uniform football shapes." ]
  }
];

const allGuides = [];

skillCards.forEach(card => {
  allGuides.push({
    title: card.title,
    content: card.features.join(' '),
    category: 'basics',
    image: card.image,
    video: ''
  });
});
cookingMethods.forEach(method => {
  allGuides.push({
    title: method.name,
content: method,
    category: 'cooking-methods',
    image: method.previewImg,
    video: ''
  });
});
cuttingTechniques.forEach(tech => {
  allGuides.push({
    title: tech.name,
content: tech,
    category: 'cutting-techniques',
    image: tech.previewImg,
    video: ''
  });
});

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const admin = await User.findOne({  email: 'chefbot.ai.kitchen@gmail.com' });
    if (!admin) {
      console.error('Admin not found! Please create admin first.');
      process.exit(1);
    }

    const guidesToInsert = allGuides.map(g => ({ ...g, createdBy: admin._id }));
    const result = await BeginnersGuide.insertMany(guidesToInsert);
    console.log(` ${result.length} beginners guides inserted.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

migrate();