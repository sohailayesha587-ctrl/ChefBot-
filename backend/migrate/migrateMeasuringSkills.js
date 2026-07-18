const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const BeginnersGuide = require('../models/BeginnersGuide');

const allGuides = [];

const toolsDataMeas = [
  {
    name: "Measuring Cups (Liquid)",
    image: "LiqMT.png",
    tagline: "For measuring water, milk, oil and other liquids",
    fullDesc: "Liquid measuring cups are made of clear glass or plastic with a spout for pouring.",
    keyFeatures: ["Spout for easy pouring", "Clear measurement markings", "Heat resistant glass", "Dishwasher safe", "Metric and Imperial units"],
    properUsage: ["Place on flat surface", "Fill to marked line", "Bend to eye level", "Read bottom of meniscus", "Pour slowly from spout"],
    commonMistakes: ["Holding cup while reading", "Not using flat surface", "Pouring too fast", "Using for dry ingredients", "Wrong measurement reading"],
    types: [
      { name: "Glass Measuring Cup", image: "glass_measure_cup_liq.png", description: "Heat-resistant glass", capacity: "250ml, 500ml, 1L", bestFor: "Hot liquids" },
      { name: "Plastic Measuring Cup", image: "plastic_measure_cup_liq.png", description: "Lightweight plastic", capacity: "250ml, 500ml, 1L", bestFor: "Daily use" },
      { name: "Ceramic Measuring Cup", image: "ceramic_measure_cup_liq.png", description: "Microwave safe", capacity: "250ml, 500ml", bestFor: "Serving and measuring" },
      { name: "Stainless Steel Cup", image: "steel_measure_cup_liq.png", description: "Unbreakable", capacity: "250ml, 500ml, 1L", bestFor: "Commercial kitchens" }
    ]
  },
  {
    name: "Measuring Cups (Dry)",
    image: "CupsMT.png",
    tagline: "For measuring flour, sugar, rice and dry ingredients",
    fullDesc: "Dry measuring cups come in nested sets. They are filled to the brim and leveled off.",
    keyFeatures: ["Nested design for storage", "Flat rim for leveling", "Durable metal or plastic", "Clear size markings", "Stackable"],
    properUsage: ["Scoop ingredient generously", "Overfill above rim", "Use straight edge to level", "Don't tap or shake", "Use dry ingredients only"],
    commonMistakes: ["Packing flour into cup", "Using for liquids", "Not leveling properly", "Scooping from bag directly", "Tapping cup to level"],
    types: [
      { name: "Stainless Steel Cups", image: "steel_meas_cup_dry.png", description: "Professional grade", sizes: "1, 1/2, 1/3, 1/4 cups", bestFor: "Professional use" },
      { name: "Plastic Cups", image: "plastic_meas_cup_dryMT.png", description: "Colorful, lightweight", sizes: "1, 1/2, 1/3, 1/4 cups", bestFor: "Home kitchens" },
      { name: "Magnetic Cups", image: "mag_meas_cups_dry.png", description: "Stack with magnets", sizes: "1, 1/2, 1/3, 1/4 cups", bestFor: "Space saving" },
      { name: "Silicone Cups", image: "silicon_measuring_cups_dryMT.png", description: "Flexible, non-stick", sizes: "1, 1/2, 1/3, 1/4 cups", bestFor: "Sticky ingredients" }
    ]
  },
  {
    name: "Measuring Spoons",
    image: "SpoonsMT.png",
    tagline: "For measuring small amounts of spices and extracts",
    fullDesc: "Measuring spoons are used for small quantities of both dry and liquid ingredients.",
    keyFeatures: ["Nested design for storage", "Leveling edge on handle", "Both dry and liquid use", "Compact storage", "Clear size markings"],
    properUsage: ["Fill spoon completely", "Level with straight edge", "Pour carefully", "Use dry spoon for dry ingredients", "Wipe between uses"],
    commonMistakes: ["Using for large quantities", "Not leveling spices", "Confusing tbsp and tsp", "Measuring over the bowl", "Wet spoon for dry"],
    types: [
      { name: "Stainless Steel Spoons", image: "steel_meas_spoon.png", description: "Durable, dishwasher safe", sizes: "1 tbsp, 1 tsp, 1/2, 1/4 tsp", bestFor: "Daily use" },
      { name: "Plastic Spoons", image: "plastic_meas_spoon.png", description: "Lightweight, colorful", sizes: "1 tbsp, 1 tsp, 1/2, 1/4 tsp", bestFor: "Kids helping" },
      { name: "Magnetic Spoons", image: "magnetic_meas_spoon.png", description: "Stay together", sizes: "1 tbsp, 1 tsp, 1/2, 1/4, 1/8 tsp", bestFor: "Small kitchens" },
      { name: "Dual Sided Spoons", image: "dual_meas_spoon.png.png", description: "Two sizes in one", sizes: "Various combinations", bestFor: "Minimalist kitchens" }
    ]
  },
  {
    name: "Kitchen Scale",
    image: "KitScaleMT.png",
    tagline: "Most accurate way to measure ingredients",
    fullDesc: "A kitchen scale measures ingredients by weight instead of volume. Most accurate method.",
    keyFeatures: ["Digital display for accuracy", "Tare function to zero out bowl", "Multiple units grams and ounces", "Precise to 1 gram", "Auto-off saves battery"],
    properUsage: ["Place on flat surface", "Put bowl and press tare", "Add ingredient to desired weight", "Press tare between each", "Use one bowl for all"],
    commonMistakes: ["Not using tare function", "Uneven surface", "Low battery warnings", "Overloading capacity", "Forgetting to zero out"],
    types: [
      { name: "Digital Kitchen Scale", image: "digital_scaleMT.png", description: "Electronic, precise", capacity: "5kg, 1g precision", bestFor: "Baking, dieting" },
      { name: "Mechanical Scale", image: "mech_kichen_scaleMT.png", description: "Spring-based, no battery", capacity: "2kg", bestFor: "Basic kitchen use" },
      { name: "Smart Scale", image: "smart_kitchen_scale.png", description: "Bluetooth, app connected", capacity: "5kg", bestFor: "Nutrition tracking" },
      { name: "Pocket Scale", image: "pocket_kitchen_scale.png", description: "Compact, portable", capacity: "500g, 0.1g precision", bestFor: "Small quantities" }
    ]
  },
  {
    name: "Measuring Jug",
    image: "JugMT.png",
    tagline: "For larger quantities of liquids",
    fullDesc: "A measuring jug is a large capacity container with measurement markings.",
    keyFeatures: ["Large capacity up to 2 liters", "Easy-grip handle", "Pouring lip design", "Clear measurement markings", "Microwave safe options"],
    properUsage: ["Place on counter", "Fill to marked line at eye level", "Lift using handle", "Pour slowly", "Clean after each use"],
    commonMistakes: ["Holding while reading", "Spilling while pouring", "Not cleaning properly", "Using for dry ingredients", "Wrong measurement reading"],
    types: [
      { name: "Glass Measuring Jug", image: "glass_jugMT.png", description: "Heat-resistant", capacity: "1L, 1.5L, 2L", bestFor: "Hot liquids" },
      { name: "Plastic Measuring Jug", image: "plastic_jugMT.png", description: "Lightweight", capacity: "1L, 2L, 4L", bestFor: "Daily cooking" },
      { name: "Stainless Steel Jug", image: "steel_jugMT.png", description: "Unbreakable", capacity: "1L, 2L", bestFor: "Commercial kitchens" },
      { name: "Heatproof Glass Jug", image: "heat_jugMT.png", description: "Borosilicate", capacity: "1L, 1.5L", bestFor: "Boiling liquids" }
    ]
  },
  {
    name: "Food Thermometer",
    image: "FoodThermMT.png",
    tagline: "For checking food doneness and safety",
    fullDesc: "A food thermometer measures internal temperature of cooked meat, fish, and poultry.",
    keyFeatures: ["Instant digital readout", "Temperature range -50 to 300°C", "Food-safe stainless probe", "Auto-off feature", "Backlit display"],
    properUsage: ["Insert into thickest part", "Avoid touching bone", "Wait for stable reading", "Clean probe after each use", "Calibrate regularly"],
    commonMistakes: ["Touching bone or fat", "Not cleaning between uses", "Inserting too shallow", "Not calibrating", "Using for wrong food"],
    types: [
      { name: "Instant-Read Thermometer", image: "instant_thermometer.png", description: "Quick reading", range: "-50°C to 300°C", bestFor: "Meat, poultry" },
      { name: "Leave-In Probe", image: "leave_in_proble_thermometer.png", description: "Stays in meat", range: "0°C to 250°C", bestFor: "Roasting, smoking" },
      { name: "Infrared Thermometer", image: "infrared_thermometerMT.png", description: "No contact", range: "-50°C to 550°C", bestFor: "Pan temperature" },
      { name: "Candy Thermometer", image: "candy_thermometerMT.png", description: "High temperature", range: "40°C to 200°C", bestFor: "Candy making" }
    ]
  },
  {
    name: "Kitchen Timer",
    image: "kitchen_timer.png",
    tagline: "Track cooking and baking times accurately",
    fullDesc: "A kitchen timer helps you track multiple cooking times simultaneously.",
    keyFeatures: ["Multiple timer functions", "Loud alarm when time ends", "Magnetic back for fridge", "Count up and count down", "Memory function"],
    properUsage: ["Set desired time", "Start timer", "Place where you can hear", "Reset after alarm", "Use multiple for different dishes"],
    commonMistakes: ["Forgetting to start timer", "Setting wrong time", "Ignoring alarm", "Not resetting between uses", "Timer too far to hear"],
    types: [
      { name: "Digital Timer", image: "digital_kitchen_timerMT.png", description: "LCD display, precise", features: "Multiple timers", bestFor: "Modern kitchens" },
      { name: "Mechanical Timer", image: "mech_kitchen_timerMT.png", description: "Wind-up, classic", features: "No batteries", bestFor: "Traditional cooking" },
      { name: "Magnetic Timer", image: "mag_kitchen_timerMT.png", description: "Sticks to fridge", features: "Loud alarm", bestFor: "Busy kitchens" },
      { name: "App Timer", image: "app_kitchen_timerMT.png", description: "Smartphone based", features: "Voice control", bestFor: "Tech users" }
    ]
  },
  {
    name: "Portion Scoops",
    image: "PortionScoopsMT.png",
    tagline: "For consistent portion sizes",
    fullDesc: "Portion scoops give you the same amount every time. Perfect for cookies and meatballs.",
    keyFeatures: ["Spring-loaded release", "Consistent portions", "Ergonomic handle", "Durable stainless steel", "Color coded sizes"],
    properUsage: ["Scoop ingredient", "Level off with straight edge", "Press trigger to release", "Use same scoop for consistency", "Clean after each use"],
    commonMistakes: ["Wrong size selection", "Not leveling", "Forceful scooping", "Not cleaning trigger", "Using for wrong ingredients"],
    types: [
      { name: "Cookie Scoop", image: "cookie_scoopMT.png", description: "For uniform cookies", sizes: "#20, #24, #30", bestFor: "Baking" },
      { name: "Melon Baller", image: "melon_ballerMT.png", description: "Small, for fruits", sizes: "#40, #50", bestFor: "Fruit balls" },
      { name: "Ice Cream Scoop", image: "ice_cream_scoopMT.png", description: "Larger, anti-freeze", sizes: "#8, #10, #12", bestFor: "Ice cream" },
      { name: "Mini Scoop", image: "mini_scoop.png", description: "Tiny portions", sizes: "#60, #70, #100", bestFor: "Candy, nuts" }
    ]
  }
];

const techniquesDataMeas = [
  {
    name: "Leveling Dry Ingredients",
    image: "MTLevel-Dry.png",
    tagline: "Get accurate flour and sugar every time",
    fullDesc: "Leveling is the proper way to measure dry ingredients for consistent baking results.",
    steps: ["Scoop ingredient into cup", "Overfill slightly above rim", "Use straight edge like knife", "Sweep across to remove excess", "Don't tap or shake cup"],
    tips: "Use dry measuring cups only. Never scoop flour directly from bag - spoon it in instead.",
    commonMistakes: ["Packing flour into cup", "Using liquid cup", "Tapping cup to level", "Scooping from bag", "Not using straight edge"],
    usage: ["Flour", "Sugar", "Cocoa powder", "Baking soda", "Baking powder"]
  },
  {
    name: "Meniscus Reading",
    image: "MTMeniscus.png",
    tagline: "Read liquid measurements accurately",
    fullDesc: "The meniscus is the curved surface of liquid. Reading the bottom gives accurate measurements.",
    steps: ["Place cup on flat surface", "Pour liquid to just below mark", "Bend down to eye level", "Read bottom of curved surface", "Add or remove liquid as needed"],
    tips: "Use clear measuring cup. Ensure good lighting. Place on counter, don't hold in hand.",
    commonMistakes: ["Reading from above", "Holding cup in hand", "Ignoring the curve", "Not at eye level", "Reading from top of curve"],
    usage: ["Water", "Milk", "Oil", "Vinegar", "Honey", "Syrups"]
  },
  {
    name: "Spoon and Level Method",
    image: "MTSpoonLevel.png",
    tagline: "The right way to measure flour",
    fullDesc: "Spooning flour into your measuring cup and leveling gives consistent results every time.",
    steps: ["Fluff flour with spoon", "Gently spoon into cup", "Overfill above rim", "Level with straight edge", "Don't tap or shake"],
    tips: "Never scoop directly from bag. Don't tap cup. Use spoon to transfer flour.",
    commonMistakes: ["Scooping from bag", "Packing flour down", "Tapping cup", "Shaking cup", "Using liquid cup"],
    usage: ["All-purpose flour", "Whole wheat flour", "Bread flour", "Cake flour"]
  },
  {
    name: "Brown Sugar Packing",
    image: "MTBrownSugar.png",
    tagline: "Measure brown sugar correctly",
    fullDesc: "Brown sugar must be packed firmly to remove air pockets. Should hold its shape when turned out.",
    steps: ["Place sugar in cup", "Press down firmly with spoon", "Add more sugar and press again", "Continue until full", "Level with rim when packed"],
    tips: "Use fresh, moist brown sugar. Should hold shape when turned out. Press firmly but don't overpack.",
    commonMistakes: ["Not packing enough", "Using stale hard sugar", "Over-packing", "Loose fluffy sugar", "Not leveling"],
    usage: ["Brown sugar", "Moist coconut", "Grated cheese"]
  },
  {
    name: "Taring a Scale",
    image: "MTScale.png",
    tagline: "Zero out your scale for easy measuring",
    fullDesc: "The tare function subtracts bowl weight so you only measure the ingredients.",
    steps: ["Place empty bowl on scale", "Press tare/zero button", "Add first ingredient to weight", "Press tare again", "Add next ingredient"],
    tips: "Use lightweight bowls. Check scale is level. Don't overload scale. Tare between each ingredient.",
    commonMistakes: ["Forgetting to tare", "Uneven surface", "Overloading scale", "Not taring between", "Zeroing with wrong bowl"],
    usage: ["Baking", "Meal prep", "Diet tracking", "Portion control"]
  },
  {
    name: "Sticky Ingredient Method",
    image: "MTStickyIng.png",
    tagline: "Measure honey, syrup without waste",
    fullDesc: "Light oil coating helps sticky ingredients slide right out of the measuring cup.",
    steps: ["Lightly oil measuring cup", "Add sticky ingredient", "Fill to correct mark", "Pour out easily", "No sticky residue left"],
    tips: "Use warm utensils for easier flow. Scrape with spatula if needed. Works for peanut butter too.",
    commonMistakes: ["Not greasing first", "Wasting ingredient", "Inaccurate measurement", "Using cold utensils", "Not scraping"],
    usage: ["Honey", "Maple syrup", "Molasses", "Corn syrup", "Peanut butter"]
  },
  {
    name: "Butter Measurement",
    image: "MTButter.png",
    tagline: "Measure butter quickly and accurately",
    fullDesc: "Butter wrappers have measurement marks. One stick equals 1/2 cup or 8 tablespoons.",
    methods: ["Use markings on butter wrapper", "Water displacement method", "Kitchen scale most accurate", "Pre-marked butter dish"],
    tips: "Soften butter for cup measurements. Use cold for scale. Water displacement works for any amount.",
    commonMistakes: ["Guessing amounts", "Not using wrapper marks", "Melting butter to measure", "Using wrong method", "Not softening for cups"],
    usage: ["Butter", "Margarine", "Shortening", "Cream cheese"]
  },
  {
    name: "Eye-Level Measurement",
    image: "MTEyeLevel.png",
    tagline: "Avoid reading errors",
    fullDesc: "Bend down to eye level for accurate readings. Reading from above or below gives wrong amounts.",
    steps: ["Place measuring cup on counter", "Bend or crouch to eye level", "Align eyes with measurement mark", "Check liquid level", "Adjust if needed"],
    tips: "Use well-lit area. Wear glasses if needed. Practice makes perfect. Don't trust angled views.",
    commonMistakes: ["Reading from above", "Angled viewing", "Poor lighting", "Holding cup", "Rushing"],
    usage: ["All precise measurements", "Liquid and dry ingredients"]
  }
];

const estimationDataMeas = [
  {
    name: "Visual Estimation",
    image: "VisualET.png",
    tagline: "Measure by sight when tools aren't available",
    fullDesc: "With practice, you can estimate quantities using visual cues and everyday objects.",
    techniques: ["Compare to tennis ball (1/2 cup)", "Divide pan mentally", "Use finger knuckle depth", "Estimate by handfuls"],
    tips: "Practice with measured amounts first. Your estimates will improve over time.",
    accuracy: "±10-20% with practice",
    whenToUse: "Stir-fries, soups, salads, casual cooking",
    whenNotToUse: "Baking, exact recipes, first attempts",
    usage: ["Portion sizes", "Vegetables", "Bulk ingredients", "Pasta", "Rice"]
  },
  {
    name: "Hand Measurements",
    image: "HandMeasureET.png",
    tagline: "Use your hand as a measuring guide",
    fullDesc: "Your hand is always with you. Use it to estimate serving sizes and ingredient amounts.",
    measurements: ["Pinch = thumb and two fingers", "Dash = 1/8 teaspoon", "Handful = about 1/2 cup", "Palm = about 3 oz protein", "Thumb tip = 1 tablespoon"],
    tips: "Practice with measured amounts first. Your hand size relates to your body size.",
    usage: ["Spices", "Herbs", "Grains", "Protein portions", "Nuts", "Seeds"]
  },
  {
    name: "Pinch and Dash System",
    image: "PachET.png",
    tagline: "Measure tiny amounts without spoons",
    fullDesc: "Professional chefs use pinches and dashes for small amounts of spices and seasonings.",
    definitions: ["Pinch = between thumb and forefinger", "Dash = quick shake from bottle", "Smidgen = half a pinch", "Drop = single liquid drop"],
    equivalents: ["1 pinch ≈ 1/16 teaspoon", "2 pinches ≈ 1/8 teaspoon", "1 dash ≈ 1/8 teaspoon liquid", "30 drops ≈ 1/2 teaspoon"],
    usage: ["Salt", "Pepper", "Spices", "Extracts", "Hot sauce", "Seasonings"]
  },
  {
    name: "Volume by Eye",
    image: "VolumeET.png",
    tagline: "Estimate cups using common containers",
    fullDesc: "Compare amounts to containers you know. A tea mug, yogurt cup, or soda can help you visualize.",
    references: ["Tea mug = about 1 cup", "Small yogurt cup = 1/2 cup", "Soda can = 12 oz (1.5 cups)", "Wine glass = 5-6 oz", "Rice bowl = 1 cup cooked rice"],
    tips: "Measure water into different containers to learn. Memorize common package sizes.",
    accuracy: "Improves with regular practice",
    usage: ["Pasta", "Rice", "Vegetables", "Liquids", "Soups", "Stews"]
  },
  {
    name: "Weight Estimation",
    image: "WeightET.png",
    tagline: "Guess weight by feel and comparison",
    fullDesc: "Lift ingredients to estimate weight. Compare to familiar objects like a tennis ball or baseball.",
    comparisons: ["Tennis ball = 2 oz (60g)", "Baseball = 5 oz (140g)", "Deck of cards = 3 oz meat", "Smartphone = 6-7 oz", "Can of soda = 12 oz"],
    tips: "Practice with scale first. Note how different weights feel in your hand.",
    usage: ["Fruits", "Vegetables", "Meat portions", "Cheese", "Fish fillets"]
  },
  {
    name: "Portion Estimation",
    image: "PortionET.png",
    tagline: "Build balanced meals without measuring",
    fullDesc: "Use your hand to estimate serving sizes for balanced meals and portion control.",
    guidelines: ["Protein = palm-sized", "Carbs = fist-sized", "Vegetables = two handfuls", "Fats = thumb-sized", "Cheese = two dice-sized"],
    plateMethod: ["1/2 plate non-starchy vegetables", "1/4 plate protein", "1/4 plate carbohydrates"],
    usage: ["Meal planning", "Diet control", "Buffet servings", "Weight management", "Healthy eating"]
  },
  {
    name: "Seasoning by Taste",
    image: "TasteET.png",
    tagline: "Add seasonings without measuring",
    fullDesc: "Experienced cooks season by taste. Start with less, add more as needed.",
    process: ["Start with less than recipe suggests", "Add gradually", "Taste frequently", "Consider dish volume", "Balance flavors"],
    tips: ["Salt early, herbs late", "Acids brighten at end", "Sweet balances spice", "Umami enhances depth"],
    usage: ["Soups", "Stews", "Sauces", "Marinades", "Curries", "Gravies"]
  },
  {
    name: "Cooking Time Estimation",
    image: "CookTimeET.png",
    tagline: "Know when food is done without a timer",
    fullDesc: "Use visual, sound, and smell cues to know when food is cooked perfectly.",
    indicators: ["Color change (browning, translucent)", "Texture (fork-tender, al dente)", "Smell (aromas developing)", "Sound (sizzling changes)", "Sight (bubbles, reduction)"],
    timeReferences: ["Boil water: 5-10 minutes", "Sauté vegetables: 5-7 minutes", "Cook rice: 15-20 minutes", "Bake chicken: 25-30 minutes"],
    usage: ["All cooking processes", "Boiling", "Sautéing", "Roasting", "Baking"]
  }
];

const conversionDataMeas = [
  {
    name: "Volume Conversions",
    image: "VolumeCS.png",
    tagline: "Convert between cups, tablespoons, milliliters",
    fullDesc: "Knowing how to convert between measurement units helps you use recipes from any country.",
    commonConversions: ["3 tsp = 1 tbsp", "4 tbsp = 1/4 cup", "16 tbsp = 1 cup", "2 cups = 1 pint", "2 pints = 1 quart", "4 quarts = 1 gallon", "8 fl oz = 1 cup", "16 oz = 1 lb"],
    metricConversions: ["1 tsp = 5 ml", "1 tbsp = 15 ml", "1 cup = 240 ml", "1 liter = 4.2 cups", "1 quart = 960 ml"],
    usage: ["Recipe scaling", "International recipes", "Adjusting serving sizes"]
  },
  {
    name: "Weight Conversions",
    image: "WeightCS.png",
    tagline: "Convert grams to ounces to pounds",
    fullDesc: "Weight conversions help you use recipes from different countries and use kitchen scales properly.",
    commonConversions: ["1 oz = 28 grams", "4 oz (1/4 lb) = 113 grams", "8 oz (1/2 lb) = 227 grams", "16 oz (1 lb) = 454 grams", "1 kg = 2.2 lbs"],
    bakingConversions: ["1 cup flour = 120-125g", "1 cup sugar = 200g", "1 cup butter = 227g", "1 cup honey = 340g", "1 cup brown sugar = 220g packed"],
    usage: ["Baking", "Diet tracking", "International recipes", "Meal prep"]
  },
  {
    name: "Temperature Conversions",
    image: "TemperatureCS.png",
    tagline: "Convert Celsius to Fahrenheit",
    fullDesc: "Different countries use different temperature scales. Know how to convert between them.",
    formula: ["°F to °C: Subtract 32, multiply by 5/9", "°C to °F: Multiply by 9/5, add 32"],
    commonTemps: ["Freezing: 0°C = 32°F", "Room temp: 20°C = 68°F", "Body temp: 37°C = 98.6°F", "Simmer: 85°C = 185°F", "Boiling: 100°C = 212°F"],
    ovenTemps: ["Very cool: 120°C = 250°F", "Cool: 150°C = 300°F", "Moderate: 180°C = 350°F", "Hot: 200°C = 400°F", "Very hot: 230°C = 450°F"],
    usage: ["Oven settings", "Candy making", "Meat doneness", "International recipes"]
  },
  {
    name: "Recipe Scaling",
    image: "RecipeCS.png",
    tagline: "Double or halve recipes correctly",
    fullDesc: "Increase or decrease recipe quantities while keeping flavors balanced and cooking times adjusted.",
    scalingRules: ["Multiply all ingredients by same factor", "Adjust cooking times", "Consider pan size", "Adjust seasoning carefully"],
    commonMultipliers: ["Half recipe: multiply by 0.5", "Double recipe: multiply by 2", "Triple recipe: multiply by 3", "Quarter recipe: multiply by 0.25"],
    exceptions: ["Spices: increase slightly less", "Salt: increase carefully", "Baking powder/soda: exact scaling", "Eggs: round to nearest whole"],
    usage: ["Feeding more people", "Feeding fewer people", "Adjusting pan sizes", "Meal prep"]
  },
  {
    name: "Imperial to Metric",
    image: "ImperialCS.png",
    tagline: "Convert US measurements to metric",
    fullDesc: "American recipes use cups and ounces. Most of the world uses grams and milliliters.",
    volumeConversions: ["1 tsp = 5 ml", "1 tbsp = 15 ml", "1 fl oz = 30 ml", "1 cup = 240 ml", "1 pint = 480 ml", "1 quart = 960 ml", "1 gallon = 3.8 L"],
    weightConversions: ["1 oz = 28 g", "1 lb = 454 g", "1 lb = 0.45 kg"],
    ovenConversions: ["250°F = 120°C", "300°F = 150°C", "350°F = 180°C", "400°F = 200°C", "450°F = 230°C"],
    usage: ["Using international recipes", "Kitchen scales", "Travel cooking"]
  },
  {
    name: "Ingredient Substitutions",
    image: "IngredientCS.png",
    tagline: "Replace missing ingredients",
    fullDesc: "When you're missing an ingredient, these substitutions work well in most recipes.",
    commonSubstitutions: ["1 cup buttermilk = 1 cup milk + 1 tbsp vinegar", "1 cup cake flour = 1 cup flour - 2 tbsp", "1 tsp baking powder = 1/4 tsp baking soda + 1/2 tsp cream of tartar", "1 cup honey = 1 1/4 cup sugar + 1/4 cup water", "1 cup oil = 1 cup melted butter"],
    dairySubstitutions: ["1 cup milk = 1 cup water + 1/4 cup dry milk", "1 cup cream = 3/4 cup milk + 1/4 cup butter", "1 cup yogurt = 1 cup buttermilk"],
    usage: ["Emergency cooking", "Dietary restrictions", "Missing ingredients", "Pantry substitutions"]
  },
  {
    name: "Pan Size Conversions",
    image: "Pan_size.png",
    tagline: "Adjust recipes for different pans",
    fullDesc: "Using the wrong pan size affects baking time and results. Convert recipes to fit your pans.",
    commonPanSizes: ["8-inch round = 6-inch round × 1.8", "9-inch round = 8-inch round × 1.3", "13×9 inch = two 9-inch rounds", "Loaf pan = 8×4 or 9×5 inch"],
    areaCalculations: ["Round pan: π × radius²", "Square/rectangular: length × width", "Compare areas to adjust quantities"],
    adjustmentRules: ["Keep depth similar (1-2 inch difference)", "Adjust time for thickness changes", "Check doneness with toothpick"],
    usage: ["Cakes", "Brownies", "Casseroles", "Breads", "Lasagna"]
  },
  {
    name: "Measurement Equivalents",
    image: "Meas_equi.png",
    tagline: "Quick reference for common conversions",
    fullDesc: "Memorize these common equivalents for quick mental calculations in the kitchen.",
    mustKnow: ["3 tsp = 1 tbsp", "4 tbsp = 1/4 cup", "16 tbsp = 1 cup", "2 cups = 1 pint", "2 pints = 1 quart", "4 quarts = 1 gallon", "8 fl oz = 1 cup", "16 oz = 1 lb"],
    metricEquivalents: ["5 ml = 1 tsp", "15 ml = 1 tbsp", "240 ml = 1 cup", "1 L = 4.2 cups", "28 g = 1 oz", "454 g = 1 lb"],
    handyEquivalents: ["Butter: 1 stick = 1/2 cup = 8 tbsp = 113g", "Sugar: 1 cup = 200g = 7 oz", "Flour: 1 cup = 120g = 4.25 oz", "Rice: 1 cup raw = 3 cups cooked"],
    usage: ["Everyday cooking", "Quick adjustments", "Mental math", "Recipe adaptations"]
  }
];

const precisionDataMeas = [
  {
    name: "Baking Precision",
    image: "baking_pre.png",
    tagline: "Exact measurements for successful baking",
    fullDesc: "Baking is a science. Precise measurements are essential for chemical reactions to work properly.",
    criticalRules: ["Use scale for dry ingredients", "Measure liquids at eye level", "Room temperature ingredients", "Precise oven temperature", "Exact timing"],
    commonErrors: ["Scooping flour from bag", "Not leveling measurements", "Guessing small amounts", "Substituting without adjustment"],
    toolsRequired: ["Digital kitchen scale", "Proper measuring cups", "Oven thermometer", "Kitchen timer"],
    usage: ["Cakes", "Cookies", "Breads", "Pastries", "All baking recipes"]
  },
  {
    name: "Scale Calibration",
    image: "scale_cal.png",
    tagline: "Keep your scale accurate",
    fullDesc: "Regular calibration ensures your kitchen scale gives accurate readings every time.",
    calibrationMethods: ["Use calibration weights", "Coins (US nickel = 5g)", "Water (1ml = 1g at 4°C)", "Manufacturer instructions"],
    maintenanceTips: ["Clean after each use", "Store in dry place", "Replace batteries regularly", "Check zero before each use", "Avoid overloading"],
    accuracyCheck: ["Weigh known object", "Check at different weights", "Test tare function", "Verify on different surfaces"],
    usage: ["Kitchen scales", "Baking", "Precision cooking", "Diet tracking"]
  },
  {
    name: "Micro Measurements",
    image: "micro_measurements.png",
    tagline: "Measuring very small amounts accurately",
    fullDesc: "Small amounts of yeast, baking powder, and salt need precise measurement for good results.",
    toolsForMicro: ["1/8 and 1/16 tsp measures", "Digital scale (1g precision)", "Medicine droppers", "Micro measuring spoons"],
    techniques: ["Use scale for under 1 tsp", "Dropper for liquids", "Dip and sweep for powders", "Divide known amounts"],
    criticalAmounts: ["Yeast: 2.25 tsp per packet", "Baking soda: exact amounts", "Salt: affects fermentation", "Spices: balance flavors"],
    usage: ["Yeast breads", "Baking powder recipes", "Spice blends", "Extracts", "Seasonings"]
  },
  {
    name: "Consistent Portioning",
    image: "con_portion.png",
    tagline: "Make every portion the same size",
    fullDesc: "Consistent portions cook evenly and look professional. Important for baking and meal prep.",
    portioningTools: ["Cookie scoops", "Kitchen scale", "Measuring cups", "Portion control plates", "Divided containers"],
    techniques: ["Weigh each portion", "Use same scoop size", "Divide total by number", "Visual markers in pans"],
    benefits: ["Even cooking", "Professional appearance", "Consistent nutrition", "Cost control", "Waste reduction"],
    usage: ["Cookies", "Meatballs", "Cupcakes", "Meal prep", "Burgers", "Patties"]
  },
  {
    name: "Temperature Precision",
    image: "temp_pre.png",
    tagline: "Exact temperature control for perfect results",
    fullDesc: "Candy making, meat doneness, and baking all require precise temperature control.",
    criticalTemperatures: ["Meat doneness temperatures", "Candy stages (soft ball, hard crack)", "Yeast activation (105-115°F)", "Chocolate tempering", "Oil for frying"],
    tools: ["Instant-read thermometer", "Candy thermometer", "Oven thermometer", "Infrared thermometer"],
    techniques: ["Calibrate thermometers regularly", "Measure in thickest part", "Avoid bone/fat pockets", "Allow for carryover cooking"],
    usage: ["Candy making", "Meat cooking", "Frying", "Chocolate work", "Baking"]
  },
  {
    name: "Hydration Ratios",
    image: "hyd_ratios.png",
    tagline: "Perfect water-to-flour ratios for bread",
    fullDesc: "The amount of water relative to flour determines bread texture, from dense to open crumb.",
    commonRatios: ["Bread: 60-75% hydration", "Pasta: 50% hydration", "Pie crust: 30-40% hydration", "Cookie dough: 15-25%"],
    calculation: ["Hydration % = (water weight ÷ flour weight) × 100", "Baker's percentages", "Adjust for humidity", "Account for other liquids"],
    effects: ["Higher hydration: more open crumb", "Lower hydration: denser texture", "Affects fermentation time", "Changes handling properties"],
    usage: ["Bread making", "Pizza dough", "Pasta", "Pastry dough", "Cookie dough"]
  },
  {
    name: "Ingredient Ratios",
    image: "ing_ratio.png",
    tagline: "Master the basic ratios",
    fullDesc: "Many recipes are based on simple ratios. Learn them and you can cook without recipes.",
    basicRatios: ["Pie dough: 3:2:1 (flour:fat:water)", "Biscuits: 3:1:2 (flour:fat:liquid)", "Pancakes: 2:2:1:1/2 (flour:liquid:egg:fat)", "Vinaigrette: 3:1 (oil:vinegar)", "Rice: 1:2 (rice:water)"],
    application: ["Scale up/down easily", "Create variations", "Troubleshoot failures", "Memorize less recipes"],
    benefits: ["Flexibility in cooking", "Better understanding", "Easier improvisation", "Confidence in kitchen"],
    usage: ["Pie dough", "Biscuits", "Pancakes", "Vinaigrette", "Rice dishes"]
  },
  {
    name: "Measurement Documentation",
    image: "measurement_doc.png",
    tagline: "Record your measurements for perfect repeats",
    fullDesc: "Write down exactly what you used to recreate successful dishes every time.",
    documentationMethods: ["Recipe journal/notebook", "Digital notes app", "Photograph measurements", "Spreadsheet tracking"],
    whatToRecord: ["Exact weights/measures", "Brands of ingredients", "Equipment used", "Time/temperature", "Results and adjustments"],
    benefits: ["Reproduce successes", "Avoid repeating mistakes", "Track improvements", "Share exact recipes"],
    usage: ["Recipe development", "Baking logs", "Meal planning", "Diet tracking", "Kitchen experiments"]
  }
];

toolsDataMeas.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'measuring-tools',
    image: item.image,
  });
});

techniquesDataMeas.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'measuring-techniques',
    image: item.image,
  });
});

estimationDataMeas.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'estimation',
    image: item.image,
  });
});

conversionDataMeas.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'conversions',
    image: item.image,
  });
});

precisionDataMeas.forEach(item => {
  allGuides.push({
    title: item.name,
    content: JSON.stringify(item),
    category: 'precision',
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
    console.log(` ${result.length} measuring skills guides inserted (measuring-tools, measuring-techniques, estimation, conversions, precision)`);
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

migrate();