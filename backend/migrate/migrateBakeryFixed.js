const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });
const User = require('../models/User');
const BeginnersGuide = require('../models/BeginnersGuide');
const allGuides = [];
const toolsData = [
  {
    name: "Stand Mixer",
    image: "StandMixer.png",
    tagline: "The workhorse of any bakery",
    fullDesc: "A stand mixer kneads dough, whips cream, and mixes batters automatically. It saves time and effort for all baking needs.",
    keyFeatures: ["6 to 10 speeds", "Dough hook for bread", "Flat beater for cakes", "Wire whisk for eggs", "Tilt-head design", "Timer function"],
    properUsage: ["Start on lowest speed", "Increase speed gradually", "Scrape bowl frequently", "Lock head before use", "Don't exceed two-thirds"],
    commonMistakes: ["Starting on high speed", "Overloading the bowl", "Using wrong attachment", "Not scraping bowl", "Forgetting to lock head"],
    types: [
      { name: "Professional Series", capacity: "5-7 quarts", bestFor: "Bread and large batches" },
      { name: "Home Series", capacity: "4-5 quarts", bestFor: "Cakes and everyday baking" }
    ]
  },
  {
    name: "Digital Kitchen Scale",
    image: "KitchenScales.png",
    tagline: "Precision measurement for perfect baking",
    fullDesc: "A digital scale measures ingredients by weight, which is much more accurate than using measuring cups.",
    keyFeatures: ["1 gram precision", "Tare function", "Grams, ounces, pounds", "Auto-off saves battery", "Large backlit display", "Capacity up to 10kg"],
    properUsage: ["Place on flat surface", "Put bowl press tare", "Add to correct weight", "Press tare between each", "Use one bowl only"],
    commonMistakes: ["Not using tare function", "Uneven surface", "Low battery warnings", "Overloading capacity", "Forgetting to zero out"],
    types: [
      { name: "Precision Scale", capacity: "3kg", bestFor: "Yeast, salt, spices" },
      { name: "Standard Scale", capacity: "10kg", bestFor: "Flour, sugar, batches" }
    ]
  },
  {
    name: "Oven Thermometer",
    image: "OvenThermometer.png",
    tagline: "Your oven lies - this tells truth",
    fullDesc: "Most ovens are inaccurate by 25-50°F. An oven thermometer shows the actual temperature inside.",
    keyFeatures: ["Easy to read dial", "Heat to 600°F", "Hangs on rack", "No batteries needed", "Stainless steel body", "Works in any oven"],
    properUsage: ["Hang in center rack", "Preheat 15 minutes", "Read temperature", "Adjust oven setting", "Check during baking"],
    commonMistakes: ["Placing near door", "Not preheating enough", "Ignoring hot spots", "Never cleaning it", "Trusting oven display"],
    types: [
      { name: "Analog Oven Thermometer", bestFor: "Simple and reliable" },
      { name: "Digital Probe Thermometer", bestFor: "Instant readings with alarms" }
    ]
  },
  {
    name: "Silicone Baking Mats",
    image: "SiliconBakingMats.png",
    tagline: "Reusable non-stick baking surface",
    fullDesc: "These mats replace parchment paper and aluminum foil. They provide a non-stick surface that lasts for years.",
    keyFeatures: ["Non-stick surface", "Heat to 480°F", "Reusable for years", "Dishwasher safe", "Measurement markings", "Grips countertop"],
    properUsage: ["Place on baking sheet", "Bake as usual", "Let cool completely", "Wash with soap", "Store flat or rolled"],
    commonMistakes: ["Cutting on mat", "Using sharp utensils", "Exceeding temperature limit", "Folding for storage", "Using metal scouring pads"],
    types: [
      { name: "Half Sheet", size: "16.5x11.5 inches", bestFor: "Cookies and pastries" },
      { name: "Quarter Sheet", size: "9.5x13 inches", bestFor: "Small batches and toaster ovens" }
    ]
  },
  {
    name: "Bench Scraper",
    image: "BenchScrappers.png",
    tagline: "The most versatile tool you need",
    fullDesc: "A bench scraper lifts, cuts, and scrapes dough. It also cleans work surfaces easily.",
    keyFeatures: ["Stainless steel blade", "Comfortable handle", "Ruler markings", "Durable construction", "Easy to clean", "Safe for non-stick"],
    properUsage: ["Lift sticky dough", "Cut through to divide", "Scrape surface clean", "Level measuring cups", "Transfer ingredients"],
    commonMistakes: ["Using as hammer", "Cutting frozen items", "Not cleaning immediately", "Storing while wet", "Using on glass boards"],
    types: [
      { name: "Stainless Steel Scraper", bestFor: "Heavy dough and professional use" },
      { name: "Plastic Scraper", bestFor: "Delicate pastries and scraping bowls" }
    ]
  },
  {
    name: "Pastry Blender",
    image: "PastryBlenders.png",
    tagline: "Perfect flaky pie crusts made easy",
    fullDesc: "This tool cuts cold butter into flour without warming it. Essential for pie crusts and biscuits.",
    keyFeatures: ["Multiple stainless blades", "Comfortable handle", "Cuts cold butter easily", "Dishwasher safe", "Sturdy construction", "Simple to use"],
    properUsage: ["Use very cold butter", "Press through flour", "Rock back and forth", "Stop at coarse meal", "Add liquid mix gently"],
    commonMistakes: ["Using warm butter", "Overworking mixture", "Pressing too hard", "Using food processor", "Not cleaning between wires"],
    types: [
      { name: "Wire Pastry Blender", blades: "5-7 wires", bestFor: "Pie crusts and home baking" },
      { name: "Solid Blade Blender", blades: "4-5 solid", bestFor: "Professional use and very cold butter" }
    ]
  },
  {
    name: "Cake Turntable",
    image: "CakeTurnTable.png",
    tagline: "Professional cake decorating at home",
    fullDesc: "A rotating platform that makes frosting cakes smooth and even. Essential for professional results.",
    keyFeatures: ["Smooth ball-bearing rotation", "Non-slip surface", "Sturdy weighted base", "Removable top", "Various sizes", "Durable construction"],
    properUsage: ["Place cake on board", "Center on turntable", "Hold spatula steady", "Spin while smoothing", "Clean after each use"],
    commonMistakes: ["Overloading weight limit", "Spinning too fast", "Not centering cake", "Forcing rotation", "Leaving in humid area"],
    types: [
      { name: "Plastic Turntable", diameter: "10-12 inches", bestFor: "Home bakers and standard cakes" },
      { name: "Metal Turntable", diameter: "12-16 inches", bestFor: "Professional decorators and heavy cakes" }
    ]
  },
  {
    name: "Dough Proofing Baskets",
    image: "DoughBaskets.png",
    tagline: "Professional artisan bread at home",
    fullDesc: "Also called bannetons, these baskets support bread dough during its final rise and create beautiful crust patterns.",
    keyFeatures: ["Natural rattan material", "Creates spiral patterns", "Absorbs moisture", "Breathable design", "Round or oval shapes", "Includes liner option"],
    properUsage: ["Dust heavily with flour", "Use rice flour best", "Place dough seam up", "Cover and let rise", "Turn out before baking"],
    commonMistakes: ["Not enough flour", "Using regular flour", "Washing with soap", "Storing while damp", "Skipping dusting step"],
    types: [
      { name: "Round Banneton", shape: "Boule", bestFor: "Round artisan loaves" },
      { name: "Oval Banneton", shape: "Batard", bestFor: "Oblong bread loaves" }
    ]
  }
];

const techniquesData = [
  {
    name: "Creaming Method",
    image: "CreamingMethod.png",
    tagline: "Foundation of cake making",
    fullDesc: "Beating butter and sugar together creates air pockets. This makes cakes and cookies light and fluffy.",
    steps: ["Bring butter to room temperature", "Beat butter until creamy", "Gradually add sugar", "Beat until light and fluffy", "Add eggs one at a time", "Alternate dry and wet ingredients"],
    tips: ["Use room temperature butter", "Scrape bowl frequently", "Beat for 3-5 minutes", "Look for pale yellow color", "Don't rush the process"],
    commonMistakes: ["Butter too cold", "Butter too hot", "Not creaming long enough", "Adding all sugar at once", "Adding eggs too quickly"],
    applications: ["Butter cakes", "Chocolate chip cookies", "Cupcakes", "Pound cake", "Sugar cookies"]
  },
  {
    name: "Folding Technique",
    image: "FoldingTechnique.png",
    tagline: "Gentle mixing for delicate batters",
    fullDesc: "A gentle mixing method that combines light and heavy mixtures without losing air bubbles.",
    steps: ["Add lighter mixture on top", "Cut through center with spatula", "Scoop from bottom", "Fold over top", "Rotate bowl slightly", "Repeat until combined"],
    tips: ["Use large rubber spatula", "Work quickly but gently", "Don't stir or mix", "Stop when streaks disappear", "Rotate bowl quarter turn"],
    commonMistakes: ["Stirring instead of folding", "Overmixing the batter", "Using wrong tool", "Working too slowly", "Not reaching bottom"],
    applications: ["Meringues", "Whipped cream", "Soufflés", "Chiffon cakes", "Mousse"]
  },
  {
    name: "Kneading Dough",
    image: "KneadingDough.png",
    tagline: "Developing gluten for bread",
    fullDesc: "Working dough to develop gluten, which gives bread its structure, chewiness, and ability to rise properly.",
    steps: ["Combine until shaggy mass", "Turn onto floured surface", "Push with heel of hand", "Fold dough over", "Rotate quarter turn", "Repeat 10-15 minutes"],
    tips: ["Use bench scraper", "Don't add too much flour", "Look for smooth elastic", "Test with windowpane", "Dough should spring back"],
    commonMistakes: ["Adding too much flour", "Under-kneading dough", "Over-kneading dough", "Wrong work surface", "Not testing readiness"],
    applications: ["Bread loaves", "Pizza dough", "Bagels", "Pretzels", "Focaccia"]
  },
  {
    name: "Blind Baking",
    image: "BlindBaking.png",
    tagline: "Pre-baking pie crust before filling",
    fullDesc: "Baking an empty pie crust prevents sogginess when adding wet fillings like custard or cream.",
    steps: ["Roll out place in pan", "Chill for 30 minutes", "Line with parchment paper", "Fill with pie weights", "Bake at 375°F 15 min", "Remove weights bake more"],
    tips: ["Always chill dough first", "Use pie weights or beans", "Prick bottom with fork", "Par-bake for custard pies", "Fully bake for cream pies"],
    commonMistakes: ["Not chilling dough", "Skipping the weights", "Overbaking crust", "Underbaking crust", "Filling while hot"],
    applications: ["Custard pies", "Quiches", "Lemon meringue", "Chocolate cream pie", "Tart shells"]
  },
  {
    name: "Tempering Chocolate",
    image: "TempChocolate.png",
    tagline: "Creating shiny, snappy chocolate",
    fullDesc: "Heating and cooling chocolate to specific temperatures creates stable crystals for shine and snap.",
    steps: ["Chop chocolate finely", "Melt two-thirds to 115°F", "Remove from heat", "Add remaining chocolate", "Stir until melted", "Cool to 82°F then rewarm"],
    tips: ["Use chocolate thermometer", "Work in cool room", "Keep chocolate dry", "Stir frequently", "Test on parchment paper"],
    commonMistakes: ["Getting water in chocolate", "Wrong temperatures", "Rushing the process", "Overheating", "Working in humid room"],
    applications: ["Chocolate decorations", "Chocolate dipped strawberries", "Chocolate bars", "Truffles", "Molded chocolates"]
  },
  {
    name: "Sugar Stages",
    image: "SugarStages.png",
    tagline: "Cooking sugar to perfect consistency",
    fullDesc: "Heating sugar syrup to different temperatures creates different textures for various candies.",
    steps: ["Combine sugar and water", "Heat without stirring", "Brush sides with water", "Use candy thermometer", "Watch temperature carefully", "Remove at target stage"],
    tips: ["Use clean saucepan", "Don't stir once boiling", "Add corn syrup", "Use deep pan", "Have ice water ready"],
    commonMistakes: ["Crystallization of sugar", "Wrong temperature", "Burnt sugar", "Stirring after boil", "Not cleaning pan sides"],
    applications: ["Caramel sauce", "Fudge", "Caramels", "Lollipops", "Marshmallows"]
  },
  {
    name: "Lamination",
    image: "Lamination.png",
    tagline: "Creating flaky pastry layers",
    fullDesc: "Folding butter into dough multiple times creates hundreds of thin layers that puff up during baking.",
    steps: ["Make dough base", "Create butter block", "Encase butter in dough", "Roll into rectangle", "Fold in thirds", "Chill between each fold"],
    tips: ["Keep everything cold", "Use European butter", "Mark folds with indent", "Rest between folds", "Chill overnight before baking"],
    commonMistakes: ["Butter too soft", "Not chilling enough", "Rushing process", "Butter breaks through", "Uneven thickness"],
    applications: ["Croissants", "Puff pastry", "Danish pastries", "Pain au chocolat", "Kouign-amann"]
  },
  {
    name: "Egg Wash Application",
    image: "EggWash.png",
    tagline: "Golden, shiny baked goods",
    fullDesc: "Brushing dough with egg mixture before baking creates a beautiful golden brown color and glossy shine.",
    steps: ["Crack egg into bowl", "Add liquid like water", "Whisk until combined", "Strain if needed", "Brush gently on dough", "Apply just before baking"],
    tips: ["Use room temperature egg", "Don't over-beat", "Apply thin even layer", "Avoid pooling", "Don't brush cut edges"],
    commonMistakes: ["Too thick application", "Brushing off rise", "Wrong type for item", "Letting it pool", "Applying too early"],
    applications: ["Bread loaves", "Pastries", "Pie crusts", "Croissants", "Dinner rolls"]
  }
];

const ingredientsData = [
  {
    name: "Flour Types",
    image: "FlourTypes.png",
    tagline: "Choosing the right flour matters",
    fullDesc: "Different flours have different protein contents. Higher protein means more gluten, which affects texture.",
    keyFeatures: ["AP flour for most baking", "Bread flour high protein", "Cake flour low protein", "Whole wheat adds fiber", "Gluten-free needs binders", "Self-rising flour"],
    properUsage: ["Measure flour by weight", "Sift before measuring", "Store in airtight container", "Check expiration date", "Bring to room temperature"],
    commonMistakes: ["Scooping from bag", "Packing into cup", "Using wrong flour", "Not sifting when needed", "Storing in warm place"],
    types: [
      { name: "All-Purpose Flour", protein: "10-12%", uses: "Cakes, cookies, quick breads" },
      { name: "Bread Flour", protein: "12-14%", uses: "Yeast breads, pizza dough" },
      { name: "Cake Flour", protein: "7-9%", uses: "Delicate cakes, pastries" }
    ],
    storage: "Store in airtight container in cool dry place"
  },
  {
    name: "Leavening Agents",
    image: "LeaveningAgents.png",
    tagline: "Making baked goods rise",
    fullDesc: "Leavening agents create gas bubbles in batter or dough. This makes baked goods light and airy.",
    keyFeatures: ["Baking soda needs acid", "Baking powder self-contained", "Yeast needs sugar warmth", "Double-acting works twice", "Check expiration dates"],
    properUsage: ["Mix soda with buttermilk", "Add powder to dry mix", "Activate yeast in warm water", "Let dough rise in warm place", "Don't overmix after adding"],
    commonMistakes: ["Using expired agents", "No acid for baking soda", "Water too hot kills yeast", "Not rising long enough", "Overmixing deflates bubbles"],
    types: [
      { name: "Baking Soda", activation: "Needs acid", uses: "Cookies, quick breads" },
      { name: "Baking Powder", activation: "Heat and moisture", uses: "Cakes, muffins, biscuits" },
      { name: "Yeast", activation: "Sugar, warmth, time", uses: "Breads, rolls, pastries" }
    ],
    storage: "Keep in cool dry place, check expiration dates"
  },
  {
    name: "Fats in Baking",
    image: "Fats.png",
    tagline: "Flavor, texture, and tenderness",
    fullDesc: "Fats add flavor, create tenderness, and provide moisture. Different fats give different results.",
    keyFeatures: ["Butter adds rich flavor", "Shortening makes flaky crust", "Oil makes moist cakes", "Lard for very flaky pastry", "Margarine is budget option"],
    properUsage: ["Use room temperature butter", "Cut cold butter into flour", "Measure oil in liquid cup", "Don't substitute randomly", "Store properly for freshness"],
    commonMistakes: ["Using wrong fat type", "Butter too soft or hard", "Overmixing after adding", "Not measuring correctly", "Using expired fats"],
    types: [
      { name: "Butter", flavor: "Rich creamy", texture: "Flaky tender", uses: "Pastries, cakes, cookies" },
      { name: "Shortening", flavor: "Neutral", texture: "Very flaky", uses: "Pie crusts, biscuits" },
      { name: "Oil", flavor: "Neutral", texture: "Moist dense", uses: "Quick breads, cakes" },
      { name: "Lard", flavor: "Slightly savory", texture: "Extremely flaky", uses: "Pie crusts, pastries" }
    ],
    storage: "Butter refrigerated, shortening room temperature"
  },
  {
    name: "Sweeteners",
    image: "Sweetners.png",
    tagline: "More than just sweetness",
    fullDesc: "Sweeteners provide flavor, moisture, browning, and structure. Each type affects baked goods differently.",
    keyFeatures: ["White sugar standard sweetener", "Brown sugar adds moisture", "Honey adds liquid sweetness", "Maple syrup distinct flavor", "Artificial sweeteners sugar-free"],
    properUsage: ["Cream with butter properly", "Pack brown sugar firmly", "Reduce liquid when using honey", "Measure sticky sweeteners carefully", "Store in airtight container"],
    commonMistakes: ["Using wrong sugar type", "Not packing brown sugar", "Too much honey makes dense", "Substituting without adjustment", "Letting sugar get hard"],
    types: [
      { name: "Granulated Sugar", properties: "Standard sweetener", effects: "Browning and tenderness" },
      { name: "Brown Sugar", properties: "Contains molasses", effects: "Moisture and flavor" },
      { name: "Honey", properties: "Liquid hygroscopic", effects: "Moisture and browning" },
      { name: "Maple Syrup", properties: "Liquid distinct flavor", effects: "Moisture and flavor" }
    ],
    storage: "Dry sweeteners airtight, liquids at room temperature"
  },
  {
    name: "Egg Functions",
    image: "EggFunction.png",
    tagline: "The multi-purpose ingredient",
    fullDesc: "Eggs serve many functions in baking. They provide structure, leavening, emulsification, flavor, and color.",
    keyFeatures: ["Eggs add structure", "Beaten eggs add air", "Yolks add richness", "Whites add volume", "Eggs help browning"],
    properUsage: ["Use room temperature eggs", "Separate cold eggs", "Beat eggs thoroughly", "Add one at a time", "Don't overbeat after adding"],
    commonMistakes: ["Using cold eggs", "Not beating enough", "Adding all at once", "Overbeating mixture", "Old eggs poor performance"],
    functions: [
      "Structure - proteins coagulate during baking",
      "Leavening - traps air when beaten",
      "Emulsification - binds fat and water",
      "Flavor - adds rich taste",
      "Color - golden brown when baked",
      "Moisture - adds liquid content"
    ],
    sizes: ["Small 43g", "Medium 50g", "Large 57g", "Extra Large 64g", "Jumbo 71g"],
    substitution: "1 egg = 1/4 cup applesauce, yogurt, or mashed banana"
  },
  {
    name: "Dairy Products",
    image: "DairyProducts.png",
    tagline: "Moisture, flavor, and richness",
    fullDesc: "Dairy adds moisture, fat, protein, and flavor. Different products have different fat contents.",
    keyFeatures: ["Milk for general baking", "Buttermilk adds tang", "Cream for richness", "Yogurt for moisture", "Sour cream for tenderness"],
    properUsage: ["Use room temperature dairy", "Sour milk with vinegar", "Don't boil dairy", "Measure liquid dairy carefully", "Check expiration dates"],
    commonMistakes: ["Using cold dairy", "Substituting incorrectly", "Soured milk not intended", "Using low-fat for richness", "Expired dairy products"],
    types: [
      { name: "Milk", fat: "0-3.5%", uses: "General baking and breads" },
      { name: "Buttermilk", fat: "1-2%", uses: "Tangy flavor and tenderizing" },
      { name: "Cream", fat: "18-36%", uses: "Richness and whipping" },
      { name: "Yogurt", fat: "0-10%", uses: "Moisture and tanginess" }
    ],
    storage: "Always refrigerate, check expiration dates"
  },
  {
    name: "Chocolate Types",
    image: "ChocolateTypes.png",
    tagline: "From cocoa beans to baked goods",
    fullDesc: "Different percentages of cocoa solids and sugar create different types of chocolate for different uses.",
    keyFeatures: ["Unsweetened for baking", "Bittersweet less sugar", "Semisweet most common", "Milk chocolate sweet", "White chocolate cocoa butter"],
    properUsage: ["Chop chocolate finely", "Melt gently over double boiler", "Don't get water in chocolate", "Cool before using", "Store in cool place"],
    commonMistakes: ["Overheating chocolate", "Getting water in chocolate", "Using wrong type", "Not chopping evenly", "Storing in warm place"],
    types: [
      { name: "Unsweetened", cocoa: "100%", sugar: "0%", uses: "Baking need added sugar" },
      { name: "Bittersweet", cocoa: "70-85%", sugar: "15-30%", uses: "Professional baking" },
      { name: "Semisweet", cocoa: "50-69%", sugar: "31-50%", uses: "Chips general baking" },
      { name: "Milk Chocolate", cocoa: "10-40%", sugar: "60-90%", uses: "Eating some baking" },
      { name: "White Chocolate", cocoa: "0%", sugar: "Varies", uses: "Decorating some baking" }
    ],
    storage: "Keep in cool dry place away from odors"
  },
  {
    name: "Flavorings & Extracts",
    image: "Flavouring.png",
    tagline: "Adding personality to baked goods",
    fullDesc: "Concentrated flavors that add character without adding significant liquid to recipes.",
    keyFeatures: ["Vanilla most common", "Almond very strong", "Lemon bright citrus", "Mint for freshness", "Coffee for depth"],
    properUsage: ["Add at end of mixing", "Use pure not imitation", "Start with small amount", "Taste before adding more", "Store away from light"],
    commonMistakes: ["Using too much extract", "Adding too early", "Using imitation vanilla", "Not adjusting for strength", "Expired flavorings"],
    types: [
      { name: "Vanilla Extract", strength: "Very strong", usage: "1-2 tsp per recipe" },
      { name: "Almond Extract", strength: "Extremely strong", usage: "1/4-1/2 tsp per recipe" },
      { name: "Lemon Extract", strength: "Strong", usage: "1/2-1 tsp per recipe" }
    ],
    storage: "Store in dark cupboard away from heat"
  }
];

const temperatureData = [
  {
    name: "Oven Temperatures",
    image: "OvenTemp.png",
    tagline: "Perfect baking temperatures",
    fullDesc: "Different baked goods need different oven temperatures. Using the right temperature ensures proper rising and browning.",
    temperatures: [
      "Very Slow: 250-275°F - Drying meringues",
      "Slow: 300°F - Rich fruit cakes",
      "Moderately Slow: 325°F - Cakes cookies",
      "Moderate: 350°F - Most baking",
      "Moderately Hot: 375-400°F - Pastries pies",
      "Hot: 425-450°F - Bread puff pastry",
      "Very Hot: 475-500°F - Pizza artisan bread"
    ],
    keyFeatures: ["Preheat always", "Use oven thermometer", "Know hot spots", "Don't open door", "Rotate pans halfway"],
    properUsage: ["Preheat 15-20 minutes", "Place rack in center", "Check temperature before baking", "Don't crowd the oven", "Cool completely before storing"],
    commonMistakes: ["Not preheating enough", "Opening door too often", "Wrong rack position", "Overcrowding oven", "Trusting oven display"],
    conversion: "°C = (°F - 32) × 5/9"
  },
  {
    name: "Ingredient Temperatures",
    image: "IngredientsTemp.png",
    tagline: "The importance of temperature",
    fullDesc: "Ingredient temperature significantly affects baking results, especially in butter-based recipes and yeast doughs.",
    ingredients: [
      { name: "Butter", temp: "Room temp 65-70°F", reason: "Creams properly with sugar" },
      { name: "Eggs", temp: "Room temperature", reason: "Better emulsion more volume" },
      { name: "Milk for Yeast", temp: "105-115°F", reason: "Activates yeast without killing" },
      { name: "Heavy Cream", temp: "Very cold", reason: "Whips to better volume" }
    ],
    keyFeatures: ["Room temperature butter", "Warm eggs whip better", "Cold cream whips best", "Warm milk activates yeast", "Cold liquids for pastry"],
    properUsage: ["Take butter out 1 hour early", "Warm eggs in water", "Use thermometer for yeast liquid", "Keep cream chilled until use", "Don't microwave butter"],
    commonMistakes: ["Using cold butter", "Cold eggs in batter", "Hot liquid kills yeast", "Warm cream won't whip", "Melted butter in pastry"],
    tips: "To warm eggs place in warm water 5-10 minutes",
    cooling: "To cool butter cut into cubes and freeze 10-15 minutes"
  },
  {
    name: "Proofing Temperatures",
    image: "ProofingTemp.png",
    tagline: "Perfect dough rising conditions",
    fullDesc: "Yeast activity depends on temperature. Different temperatures create different fermentation characteristics.",
    stages: [
      "Bulk Fermentation: 75-78°F",
      "First Proof: 75-80°F",
      "Final Proof: 80-85°F",
      "Retardation: 35-50°F for slow proof"
    ],
    keyFeatures: ["Warm spot for rising", "Humidity helps dough", "Cold slows fermentation", "Warm speeds up", "Consistent temperature important"],
    properUsage: ["Use oven with light on", "Microwave with hot water", "Proofing box best", "Room temperature works", "Cover dough to prevent drying"],
    commonMistakes: ["Too hot kills yeast", "Too cold slow rise", "Drafty location", "No humidity dries dough", "Under or over proofing"],
    signs: "Doubled in size, finger indentation remains",
    overproofing: "Dough collapses when touched, smells sour"
  },
  {
    name: "Sugar Temperature Stages",
    image: "SugarTemp.png",
    tagline: "Candy making precision",
    fullDesc: "Sugar syrup reaches different consistencies at specific temperatures. Each stage is used for different confections.",
    stages: [
      "Thread: 230-235°F - Syrups",
      "Soft Ball: 235-240°F - Fudge",
      "Firm Ball: 245-250°F - Caramels",
      "Hard Ball: 250-265°F - Nougat",
      "Soft Crack: 270-290°F - Taffy",
      "Hard Crack: 300-310°F - Lollipops",
      "Caramel: 320-350°F - Caramel sauce"
    ],
    keyFeatures: ["Use candy thermometer", "Don't stir once boiling", "Brush sides with water", "Work quickly at final stage", "Sugar burns severely"],
    properUsage: ["Use clean deep pan", "Add corn syrup", "Have ice water ready", "Test in cold water", "Warm utensils before use"],
    commonMistakes: ["Crystallization", "Wrong temperature", "Burnt sugar", "Stirring after boil", "Not cleaning pan sides"],
    testing: "Cold water test - drop syrup in ice water",
    equipment: "Candy thermometer and heavy saucepan"
  },
  {
    name: "Chocolate Tempering",
    image: "ChocolateTemp.png",
    tagline: "Perfect tempering temperatures",
    fullDesc: "Tempering chocolate involves precise temperature control to create stable cocoa butter crystals for shine and snap.",
    temperatures: [
      "Dark Chocolate: Melt to 115-120°F, cool to 80-82°F, reheat to 88-90°F",
      "Milk Chocolate: Melt to 110-115°F, cool to 80-82°F, reheat to 86-88°F",
      "White Chocolate: Melt to 110°F, cool to 79-81°F, reheat to 84-86°F"
    ],
    keyFeatures: ["Use chocolate thermometer", "Work in cool room", "Keep chocolate dry", "Stir frequently", "Test on parchment"],
    properUsage: ["Chop chocolate finely", "Melt two-thirds only", "Add remaining chocolate", "Stir until melted", "Test before using"],
    commonMistakes: ["Getting water in chocolate", "Wrong temperatures", "Rushing process", "Overheating", "Working in humid room"],
    methods: ["Seeding - add chopped chocolate to melted", "Tabling - spread on marble", "Microwave - short bursts stirring frequently"],
    signs: "Shiny appearance and crisp snap",
    storage: "Tempered chocolate sets quickly at room temperature"
  },
  {
    name: "Cooling & Setting",
    image: "CoolingStages.png",
    tagline: "Post-baking temperature control",
    fullDesc: "Proper cooling prevents sogginess, cracking, and ensures proper texture development in baked goods.",
    items: [
      { name: "Breads", cooling: "Wire rack completely", time: "1-2 hours minimum" },
      { name: "Cakes", cooling: "10 minutes in pan then rack", time: "Completely cool before frosting" },
      { name: "Cookies", cooling: "2 minutes on sheet then rack", time: "Completely cool before storing" },
      { name: "Pastries", cooling: "Wire rack elevated", time: "Until room temperature" }
    ],
    keyFeatures: ["Use wire rack", "Cool completely before frosting", "Don't rush cooling", "Air circulation important", "Don't stack warm goods"],
    properUsage: ["Remove from pan after time", "Place on wire rack", "Let air circulate", "Cool to room temperature", "Wrap only when cool"],
    commonMistakes: ["Cooling in pan too long", "Frosting warm cake", "Stacking warm cookies", "No air circulation", "Refrigerating warm goods"],
    tips: "Don't refrigerate warm baked goods",
    freezing: "Only freeze completely cooled items"
  },
  {
    name: "Storage Temperatures",
    image: "StorageTemp.png",
    tagline: "Keeping baked goods fresh",
    fullDesc: "Different baked goods need different storage conditions to maintain freshness and prevent spoilage.",
    storage: [
      { name: "Bread", temp: "Room temperature", container: "Paper bag or bread box", duration: "2-3 days" },
      { name: "Cakes with Frosting", temp: "Room temperature", container: "Cake carrier", duration: "2-3 days" },
      { name: "Pastries with Custard", temp: "Refrigerated", container: "Airtight container", duration: "1-2 days" },
      { name: "Cookies", temp: "Room temperature", container: "Airtight with parchment", duration: "1 week" }
    ],
    keyFeatures: ["Room temp for most", "Refrigerate custard items", "Freeze for long storage", "Airtight containers", "Keep away from heat"],
    properUsage: ["Cool completely before storing", "Wrap properly", "Label with date", "Freeze in portions", "Thaw at room temperature"],
    commonMistakes: ["Storing while warm", "Wrong container type", "Too humid conditions", "Freezing too long", "Not wrapping properly"],
    freezing: "Wrap well and label with date",
    thawing: "Thaw at room temperature, don't microwave"
  },
  {
    name: "Temperature Troubleshooting",
    image: "TempTrouble.png",
    tagline: "Fixing temperature-related issues",
    fullDesc: "Common baking problems often relate to temperature control issues during preparation, baking, or cooling.",
    problems: [
      "Dense cake - butter too cold or oven too cool",
      "Tough cookies - overmixed or butter too warm",
      "Bread didn't rise - yeast killed by hot liquid",
      "Soggy bottom - not cooled on rack",
      "Burnt edges - oven too hot or wrong rack position",
      "Pale baked goods - oven too cool or not preheated",
      "Cracked cheesecake - too rapid temperature change",
      "Flat cookies - butter too warm or dough not chilled"
    ],
    keyFeatures: ["Use oven thermometer", "Room temperature ingredients", "Preheat adequately", "Check oven calibration", "Allow proper cooling"],
    properUsage: ["Check temperature before baking", "Rotate pans halfway", "Don't open door early", "Cool on wire rack", "Chill dough when needed"],
    commonMistakes: ["Skipping preheat", "Opening oven door", "Wrong rack position", "Hot pan on cold surface", "Frosting warm cake"],
    solutions: [
      "Use oven thermometer",
      "Bring ingredients to proper temperature",
      "Preheat adequately",
      "Check oven calibration",
      "Use correct rack position",
      "Allow proper cooling time",
      "Chill dough when specified",
      "Avoid temperature shocks"
    ],
    equipment: "Oven thermometer and instant-read thermometer"
  }
];

const decoratingData = [
  {
    name: "Piping Bags & Tips",
    image: "PipingBags.png",
    tagline: "Essential for cake decorating",
    fullDesc: "Piping bags and tips let you apply frosting, cream, and decorations in controlled patterns and shapes.",
    keyFeatures: ["Disposable plastic bags", "Reusable cloth bags", "Metal decorating tips", "Coupler for tips", "Practice sheets available"],
    properUsage: ["Fill bag half full", "Twist top to close", "Cut tip to size", "Insert coupler for changes", "Practice on parchment first"],
    commonMistakes: ["Overfilling the bag", "Using wrong tip size", "Not twisting top", "Bag too warm", "Not practicing first"],
    types: [
      { name: "Disposable Bags", material: "Plastic", bestFor: "Buttercream and royal icing" },
      { name: "Reusable Bags", material: "Silicone or nylon", bestFor: "Frequent use and professionals" },
      { name: "Couplers", material: "Plastic", bestFor: "Changing tips without changing bags" }
    ],
    tipTypes: [
      "Round tips - writing dots outlines",
      "Star tips - stars shells borders",
      "Leaf tips - leaves ruffles",
      "Petal tips - flowers ribbons",
      "Specialty tips - basketweave grass"
    ],
    cleaning: "Disposable bags discard, reusable bags wash immediately"
  },
  {
    name: "Offset Spatulas",
    image: "OffSetSpatulas.png",
    tagline: "Smooth frosting application",
    fullDesc: "Angled blades make frosting application and smoothing easier, especially on cake sides.",
    sizes: [
      { name: "Small", length: "4-5 inches", uses: "Detail work and filling cupcakes" },
      { name: "Medium", length: "6-7 inches", uses: "Standard cake decorating" },
      { name: "Large", length: "9-10 inches", uses: "Large cakes and crumb coating" }
    ],
    keyFeatures: ["Angled blade", "Flexible tip", "Comfortable handle", "Stainless steel", "Easy to clean"],
    properUsage: ["Use for frosting application", "Hold at slight angle", "Smooth with flat edge", "Clean between colors", "Don't use for cutting"],
    commonMistakes: ["Using wrong size", "Too much pressure", "Not cleaning between colors", "Using as knife", "Bent blade"],
    materials: ["Stainless steel blade", "Flexible tip for smooth finish", "Comfortable handle"],
    techniques: ["Crumb coat thin layer", "Final coat smooth application", "Swirls for texture", "Smooth flat finish"]
  },
  {
    name: "Cake Combs",
    image: "CakeCombs.png",
    tagline: "Creating textured finishes",
    fullDesc: "Tools with patterned edges that create decorative textures on cake frosting for professional looking results.",
    patterns: ["Straight lines classic look", "Scalloped wavy pattern", "Ridged multiple lines", "Square geometric pattern", "Combination multiple patterns"],
    keyFeatures: ["Various pattern edges", "Plastic or metal", "Easy to clean", "Creates texture", "Reusable"],
    properUsage: ["Apply thick frosting layer", "Chill briefly until firm", "Hold comb at 45 degree", "Rotate turntable while pressing", "Clean comb between passes"],
    commonMistakes: ["Frosting too thin", "Not chilling enough", "Pressing too hard", "Not cleaning comb", "Uneven pressure"],
    materials: ["Plastic affordable various patterns", "Metal durable precise edges", "Acrylic clear see-through"],
    usage: ["Apply thick layer of frosting", "Chill briefly to set", "Hold comb at angle", "Rotate turntable while applying pressure", "Clean comb between passes"]
  },
  {
    name: "Fondant Tools",
    image: "FondantTools.png",
    tagline: "Working with sugar paste",
    fullDesc: "Specialized tools for rolling, cutting, shaping, and adding details to fondant decorations for cakes.",
    tools: [
      { name: "Rolling Pin", use: "Rolling fondant evenly without sticking" },
      { name: "Smoothers", use: "Removing air bubbles for smooth finish" },
      { name: "Cutters", use: "Cutting shapes and letters" },
      { name: "Embossers", use: "Adding texture patterns" },
      { name: "Modeling Tools", use: "Adding fine details and shapes" }
    ],
    keyFeatures: ["Non-stick rolling pin", "Dual smoothers", "Sharp cutters", "Detail tools", "Easy to clean"],
    properUsage: ["Dust surface with cornstarch", "Roll fondant evenly", "Use smoothers for smooth finish", "Cut with sharp cutters", "Water brush for attaching"],
    commonMistakes: ["Fondant too dry", "Not enough dusting", "Air bubbles not removed", "Cutters not sharp", "Too much water"],
    essentials: ["Cornstarch for dusting", "Fondant mat", "Pizza cutter for trimming", "Water brush for attaching"],
    storage: "Keep in airtight container away from humidity"
  },
  {
    name: "Airbrush Kit",
    image: "AirBrushKit.png",
    tagline: "Professional coloring and effects",
    fullDesc: "A spray system for applying even color, creating gradients, and adding special effects to cakes and cookies.",
    components: ["Air compressor provides pressure", "Airbrush gun applies color", "Hose connects compressor to gun", "Food-safe colors", "Cleaning kit for maintenance"],
    keyFeatures: ["Adjustable pressure", "Fine spray control", "Multiple colors", "Easy to clean", "Professional results"],
    properUsage: ["Thin colors properly", "Practice on paper first", "Clean immediately after use", "Use in ventilated area", "Protect work surface"],
    commonMistakes: ["Colors too thick", "Not cleaning properly", "Spraying too close", "Clogged nozzles", "Skipping practice"],
    techniques: ["Base coating even color", "Gradients smooth transitions", "Stenciling precise patterns", "Shadowing depth and dimension", "Metallics gold silver pearl"],
    colors: ["Liquid colors ready to use", "Gel colors need thinning", "Powder colors mix with alcohol", "Metallic dusts mix with vodka"],
    cleaning: "Clean immediately after every use"
  },
  {
    name: "Stencils & Molds",
    image: "Stencils.png",
    tagline: "Creating consistent patterns",
    fullDesc: "Tools for creating repeated patterns and shapes with precision and consistency on cakes and cookies.",
    types: [
      { name: "Plastic Stencils", material: "Flexible plastic", patterns: "Lace geometric floral" },
      { name: "Metal Stencils", material: "Thin metal", patterns: "Detailed intricate designs" },
      { name: "Silicone Molds", material: "Food-grade silicone", patterns: "3D shapes figures flowers" }
    ],
    keyFeatures: ["Reusable patterns", "Multiple designs", "Easy to clean", "Flexible or rigid", "Professional results"],
    properUsage: ["Hold stencil firmly", "Apply medium with spatula", "Lift straight up", "Clean between uses", "Freeze molds for release"],
    commonMistakes: ["Stencil moves during use", "Too much medium", "Lifting at angle", "Not cleaning properly", "Warped storage"],
    techniques: ["Hold stencil firmly against surface", "Apply medium with spatula or brush", "Lift straight up carefully", "Clean stencil between uses", "For molds press material firmly"],
    storage: "Store flat to prevent warping"
  },
  {
    name: "Coloring Tools",
    image: "ColoringTools.png",
    tagline: "Adding vibrant colors",
    fullDesc: "Tools and materials for coloring frostings, fondants, chocolates, and other baking mediums.",
    colorTypes: [
      { name: "Gel Colors", intensity: "Very high", uses: "Buttercream royal icing" },
      { name: "Liquid Colors", intensity: "Medium", uses: "Thin icings airbrushing" },
      { name: "Powder Colors", intensity: "High when activated", uses: "Dusting painting" },
      { name: "Natural Colors", intensity: "Low to medium", uses: "All mediums" }
    ],
    keyFeatures: ["Gel colors concentrated", "Liquid colors thin", "Powder colors vibrant", "Natural colors healthy", "Mixable for custom shades"],
    properUsage: ["Add color gradually", "Use toothpick for gels", "Mix thoroughly", "Color deepens over time", "Start with white base"],
    commonMistakes: ["Adding too much at once", "Not mixing enough", "Using wrong type", "Color fades when baked", "Stained hands"],
    tools: ["Toothpicks for small amounts", "Spatulas for mixing", "Gloves to prevent staining", "Separate containers for custom colors"],
    tips: ["Add color gradually", "Colors deepen over time", "Use white base for bright colors", "Store colors away from light"]
  },
  {
    name: "Finishing Tools",
    image: "FinishingTools.png",
    tagline: "The final touches",
    fullDesc: "Tools for adding final decorations and perfecting the presentation of baked goods.",
    tools: [
      { name: "Cake Leveler", function: "Even cake layers" },
      { name: "Cake Lifter", function: "Moving cakes safely" },
      { name: "Cake Boards", function: "Support and presentation" },
      { name: "Drip Bottles", function: "Controlled ganache drips" },
      { name: "Sprinkle Shakers", function: "Even sprinkle distribution" },
      { name: "Edible Glitter", function: "Sparkle effect" },
      { name: "Luster Dust", function: "Metallic shine" },
      { name: "Edible Markers", function: "Drawing and writing" }
    ],
    keyFeatures: ["Leveler for flat cakes", "Lifter safe transport", "Boards for support", "Bottles for ganache", "Shakers for sprinkles"],
    properUsage: ["Level cakes before stacking", "Use lifter for heavy cakes", "Board size matches cake", "Squeeze bottle gently", "Shake sprinkles evenly"],
    commonMistakes: ["Skipping leveling", "Dropping cake without lifter", "Wrong board size", "Ganache drips too fast", "Sprinkles clumped"],
    presentation: ["Cake stands elevate display", "Cake domes protect while showing", "Boxes for transport and gifting", "Ribbons decorative finishing"]
  }
];

toolsData.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'tools',
    image: item.image,
    video: ''
  });
});

techniquesData.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'techniques',
    image: item.image,
    video: ''
  });
});

ingredientsData.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'ingredients',
    image: item.image,
    video: ''
  });
});

temperatureData.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'temperature',
    image: item.image,
    video: ''
  });
});

decoratingData.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'decorating',
    image: item.image,
  });
});

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const admin = await User.findOne({ email: 'chefbot.ai.kitchen@gmail.com' });
    if (!admin) {
      console.error('Admin not found!');
      process.exit(1);
    }

    const toInsert = allGuides.map(g => ({ ...g, createdBy: admin._id }));
    const result = await BeginnersGuide.insertMany(toInsert);
    console.log(`${result.length} bakery guides inserted (tools, techniques, ingredients, temperature, decorating)`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

migrate();