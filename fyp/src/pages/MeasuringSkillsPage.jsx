import React, { useState, useEffect } from 'react';
import './MeasuringSkillsPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MeasuringSkillsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('tools');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data states
  const [toolsData, setToolsData] = useState([]);
  const [techniquesData, setTechniquesData] = useState([]);
  const [estimationData, setEstimationData] = useState([]);
  const [conversionData, setConversionData] = useState([]);
  const [precisionData, setPrecisionData] = useState([]);

  // Category mapping for API
  const categoryMapping = {
    tools: 'measuring-tools',
    techniques: 'measuring-techniques',
    estimation: 'estimation',
    conversions: 'conversions',
    precision: 'precision'
  };

  // API Base URL - Change this to your backend URL
 const API_BASE_URL = 'http://localhost:5000';

  // Static fallback data (complete data already here)
  const getFallbackData = () => {
    return {
      tools: [
        { id: 1, name: "Measuring Cups (Liquid)", image: "LiqMT.png", tagline: "Transparent cups with spout for liquids", fullDesc: "Specially designed for measuring liquids. Made of clear glass or plastic with measurement markings in ml and fl oz. Have a spout for easy pouring.", keyFeatures: ["Spout for pouring", "Eye-level reading", "Metric & Imperial marks", "Heat resistant"], properUsage: "Place on flat surface, fill to mark, read at eye level, pour slowly from spout", commonMistakes: ["Holding cup while reading", "Not using flat surface", "Pouring too fast"], types: [{ name: "Glass Measuring Cup", description: "Heat-resistant borosilicate glass", capacity: "250ml, 500ml, 1L", bestFor: "Hot liquids, precise measurements" }, { name: "Plastic Measuring Cup", description: "Lightweight, durable plastic", capacity: "250ml, 500ml, 1L", bestFor: "Daily use, safety with kids" }] },
        { id: 2, name: "Measuring Cups (Dry)", image: "CupsMT.png", tagline: "Nested cups for dry ingredients", fullDesc: "Set of nesting cups for measuring dry ingredients like flour, sugar, rice. Usually come in set of 4: 1 cup, 1/2 cup, 1/3 cup, 1/4 cup.", keyFeatures: ["Nested design", "Flat rim for leveling", "Easy storage", "Stackable"], properUsage: "Scoop ingredient, overfill, level with straight edge", commonMistakes: ["Packing flour", "Using for liquids", "Not leveling properly"], types: [{ name: "Metal Measuring Cups", description: "Stainless steel, durable", sizes: "1, 1/2, 1/3, 1/4 cups", bestFor: "Professional use, longevity" }, { name: "Plastic Measuring Cups", description: "Colorful, lightweight", sizes: "1, 1/2, 1/3, 1/4 cups", bestFor: "Home kitchens, baking" }] },
        { id: 3, name: "Measuring Spoons", image: "SpoonsMT.png", tagline: "For small ingredient measurements", fullDesc: "Set of spoons for measuring small quantities of both dry and liquid ingredients. Standard set includes: 1 tbsp, 1 tsp, 1/2 tsp, 1/4 tsp.", keyFeatures: ["Nested design", "Leveling edge", "Both dry & liquid use", "Compact storage"], properUsage: "Fill spoon, level with straight edge, pour carefully", commonMistakes: ["Using for large quantities", "Not leveling spices", "Confusing tbsp & tsp"], types: [{ name: "Standard Measuring Spoons", description: "Basic 4-piece set", sizes: "1 tbsp, 1 tsp, 1/2 tsp, 1/4 tsp", bestFor: "General cooking" }, { name: "Extended Set", description: "Includes 1/8 tsp, 1/2 tbsp", sizes: "6-8 pieces", bestFor: "Baking, precise recipes" }] },
        { id: 4, name: "Kitchen Scale", image: "KitScaleMT.png", tagline: "Precision weight measurement", fullDesc: "Digital or analog scale for measuring ingredients by weight. Most accurate method for baking. Can measure in grams, ounces, pounds.", keyFeatures: ["Digital display", "Tare function", "Multiple units", "Precise to 1g"], properUsage: "Place bowl, press tare, add ingredient, read weight", commonMistakes: ["Not using tare function", "Uneven surface", "Battery issues"], types: [{ name: "Digital Kitchen Scale", description: "Electronic, precise", capacity: "Up to 5kg, 1g precision", bestFor: "Baking, dieting" }, { name: "Mechanical Scale", description: "Spring-based, no battery", capacity: "Up to 2kg", bestFor: "Basic kitchen use" }] },
        { id: 5, name: "Measuring Jug", image: "JugMT.png", tagline: "Large capacity liquid measurement", fullDesc: "Large jug with measurement markings for bigger quantities of liquids. Usually 1-2 liter capacity. Essential for measuring water for rice, stock for soups.", keyFeatures: ["Large capacity", "Easy-grip handle", "Pouring lip", "Clear markings"], properUsage: "Place on counter, fill to mark, lift to pour", commonMistakes: ["Holding while reading", "Spilling while pouring", "Not cleaning properly"], types: [{ name: "Plastic Measuring Jug", description: "Lightweight, durable", capacity: "1L, 2L, 4L", bestFor: "Daily cooking" }, { name: "Glass Measuring Jug", description: "Heat-resistant, easy to clean", capacity: "1L, 1.5L, 2L", bestFor: "Hot liquids" }] },
        { id: 6, name: "Food Thermometer", image: "FoodThermMT.png", tagline: "Temperature measurement for cooking", fullDesc: "Essential for food safety and perfect cooking. Measures internal temperature of meat, oil temperature for frying, candy temperature for desserts.", keyFeatures: ["Instant read", "Digital display", "Food-safe probe", "Auto-off"], properUsage: "Insert into thickest part, wait for reading, clean after use", commonMistakes: ["Touching bone", "Not cleaning probe", "Wrong placement"], types: [{ name: "Instant-Read Thermometer", description: "Quick reading, portable", range: "-50°C to 300°C", bestFor: "Meat, poultry" }, { name: "Oven Thermometer", description: "For oven temperature", range: "50°C - 300°C", bestFor: "Baking, roasting" }] },
        { id: 7, name: "Kitchen Timer", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Time management in cooking", fullDesc: "Essential for perfect cooking results. Helps track cooking times for various dishes. Can be mechanical, digital, or app-based.", keyFeatures: ["Multiple timers", "Loud alarm", "Magnetic back", "Count up/down"], properUsage: "Set time, start timer, attend to other tasks", commonMistakes: ["Forgetting to start", "Setting wrong time", "Ignoring alarm"], types: [{ name: "Digital Kitchen Timer", description: "Electronic, precise", features: "Multiple timers, memory", bestFor: "Modern kitchens" }, { name: "Mechanical Timer", description: "Wind-up, classic", features: "No battery needed", bestFor: "Traditional cooking" }] },
        { id: 8, name: "Portion Scoops", image: "PortionScoopsMT.png", tagline: "Consistent portion control", fullDesc: "Also called dishers or ice cream scoops. Used for consistent portioning of cookie dough, rice, batter, etc.", keyFeatures: ["Release mechanism", "Ergonomic handle", "Standardized sizes", "Durable construction"], properUsage: "Scoop, level, release with trigger", commonMistakes: ["Wrong size selection", "Not leveling", "Forceful scooping"], types: [{ name: "Cookie Scoop", description: "For uniform cookies", sizes: "#20, #24, #30", bestFor: "Baking, catering" }, { name: "Rice Scoop", description: "For portioning rice", capacity: "1/2 cup, 3/4 cup", bestFor: "Meal prep" }] }
      ],
      techniques: [
        { id: 1, name: "Leveling Dry Ingredients", image: "MTLevel-Dry.png", tagline: "Perfect flat measurements", fullDesc: "Technique for measuring dry ingredients like flour, sugar, baking powder. Ensures exact amount by removing excess.", steps: ["Scoop ingredient with measuring cup", "Overfill slightly above rim", "Use straight edge (knife, spatula)", "Sweep across to remove excess"], tips: "Use dry measuring cups only, don't shake or tap cup", commonMistakes: ["Packing flour", "Using liquid cup", "Not using straight edge"], applications: "Flour, sugar, cocoa powder, baking soda" },
        { id: 2, name: "Meniscus Reading (Liquids)", image: "MTMeniscus.png", tagline: "Accurate liquid measurement", fullDesc: "Reading the curved surface of liquid in measuring cup. Read from bottom of curve for accuracy.", steps: ["Place measuring cup on flat surface", "Pour liquid to just below desired mark", "Bend down to eye level", "Read from bottom of curve (meniscus)"], tips: "Use clear measuring cup, ensure good lighting", commonMistakes: ["Reading from above", "Holding cup in hand", "Ignoring curve"], applications: "Water, milk, oil, syrups, vinegar" },
        { id: 3, name: "Spoon & Level Method", image: "MTSpoonLevel.png", tagline: "Proper flour measurement", fullDesc: "Correct method for measuring flour without packing it. Aerates flour and gives consistent results.", steps: ["Fluff flour in container with spoon", "Gently spoon flour into measuring cup", "Overfill above rim", "Level with straight edge"], tips: "Never scoop directly from bag, don't shake cup", commonMistakes: ["Scooping from bag", "Packing flour", "Tapping cup"], applications: "All-purpose flour, whole wheat flour" },
        { id: 4, name: "Brown Sugar Packing", image: "MTBrownSugar.png", tagline: "Measuring moist ingredients", fullDesc: "Technique for measuring brown sugar, which needs to be packed to remove air pockets.", steps: ["Place brown sugar in measuring cup", "Press down firmly with back of spoon", "Add more sugar and press again", "Level with rim when packed"], tips: "Should hold shape when turned out, use fresh moist brown sugar", commonMistakes: ["Not packing enough", "Using stale sugar", "Over-packing"], applications: "Brown sugar, moist coconut" },
        { id: 5, name: "Taring a Scale", image: "MTScale.png", tagline: "Zeroing scale with container", fullDesc: "Using tare function to subtract container weight. Allows sequential adding of multiple ingredients to same bowl.", steps: ["Place empty bowl on scale", "Press tare/zero button", "Add first ingredient to desired weight", "Press tare again, add next ingredient"], tips: "Use lightweight bowls, check scale is level", commonMistakes: ["Forgetting to tare", "Uneven surface", "Overloading scale"], applications: "Baking, meal prep, diet tracking" },
        { id: 6, name: "Sticky Ingredient Method", image: "MTStickyIng.png", tagline: "Measuring honey, syrup", fullDesc: "Technique for measuring sticky ingredients without waste. Uses oil or water coating for easy release.", steps: ["Lightly oil or spray measuring cup/spoon", "Add sticky ingredient", "Level if needed", "Easily pour out without sticking"], tips: "Use warm utensils for easier flow, scrape with spatula", commonMistakes: ["Not greasing", "Wasting ingredient", "Inaccurate measurement"], applications: "Honey, maple syrup, molasses, peanut butter" },
        { id: 7, name: "Butter Measurement", image: "MTButter.png", tagline: "Measuring solid fats", fullDesc: "Methods for measuring butter and shortening. Can use measurement marks on wrapper, water displacement, or scale.", methods: ["Use markings on butter wrapper", "Water displacement method", "Kitchen scale (most accurate)", "Pre-marked butter dish"], tips: "Soften butter for cups, use cold for scale", commonMistakes: ["Guessing amounts", "Not using wrapper marks", "Melting butter"], applications: "Butter, margarine, shortening" },
        { id: 8, name: "Eye-Level Measurement", image: "MTEyeLevel.png", tagline: "Avoiding parallax error", fullDesc: "Positioning yourself at eye level with measurement markings to avoid reading errors.", steps: ["Place measuring vessel on counter", "Bend or crouch to eye level", "Align eyes with measurement mark", "Adjust liquid/ingredient to exact mark"], tips: "Use well-lit area, wear glasses if needed", commonMistakes: ["Reading from above", "Angled viewing", "Poor lighting"], applications: "All precise measurements" }
      ],
      estimation: [
        { id: 1, name: "Visual Estimation", image: "VisualET.png", tagline: "Measuring by sight", fullDesc: "Estimating quantities without tools using visual cues. Develops with experience.", techniques: ["Compare to known objects (tennis ball = 1/2 cup)", "Divide pan/pot mentally into portions", "Use finger measurements (knuckle depth)", "Estimate by handfuls"], accuracy: "±10-20% with practice", whenToUse: "Stir-fries, soups, salads, casual cooking", whenNotToUse: "Baking, exact recipes, first attempts" },
        { id: 2, name: "Hand Measurements", image: "HandMeasureET.png", tagline: "Using your hand as guide", fullDesc: "Traditional method using hand parts as measurement references.", measurements: ["Pinch = thumb & 1-2 fingers", "Dash = 1/8 teaspoon", "Smidgen = 1/32 teaspoon", "Handful = about 1/2 cup", "Palm = about 3 oz protein"], tips: "Practice with measured amounts first, note your personal sizes", applications: "Spices, herbs, grains, protein portions" },
        { id: 3, name: "Pinch & Dash System", image: "PachET.png", tagline: "Small quantity estimation", fullDesc: "Traditional measurements for very small amounts, especially spices.", definitions: ["Pinch = thumb & forefinger", "Dash = 2-3 drops or quick shake", "Smidgen = half a pinch", "Drop = single drop from bottle"], equivalents: ["1 pinch ≈ 1/16 teaspoon", "2 pinches ≈ 1/8 teaspoon", "1 dash ≈ 1/8 teaspoon liquid", "3 drops ≈ 1/4 teaspoon"], applications: "Salt, pepper, spices, extracts" },
        { id: 4, name: "Volume by Eye", image: "VolumeET.png", tagline: "Estimating cups & liters", fullDesc: "Estimating volume measurements without tools by comparing to common containers.", references: ["Tea mug = about 1 cup", "Small yogurt cup = 1/2 cup", "Soda can = 12 oz (1.5 cups)", "Wine glass = 5-6 oz", "Rice bowl = 1 cup cooked rice"], practiceTips: ["Measure water into different containers", "Memorize common package sizes", "Practice with clear containers first"], accuracy: "Improves with regular practice" },
        { id: 5, name: "Weight Estimation", image: "WeightET.png", tagline: "Guessing weight by feel", fullDesc: "Estimating weight of ingredients, especially produce and meat, by heft and size comparison.", comparisons: ["Tennis ball = 2 oz", "Baseball = 5 oz", "Deck of cards = 3 oz meat", "Smartphone = 6-7 oz", "Can of soda = 12 oz"], techniques: ["Practice with scale first", "Compare to known weighted objects", "Consider density differences"], applications: "Fruits, vegetables, meat portions" },
        { id: 6, name: "Portion Estimation", image: "PortionET.png", tagline: "Serving size by eye", fullDesc: "Estimating proper serving sizes for balanced meals without weighing or measuring.", guidelines: ["Protein = palm-sized", "Carbs = fist-sized", "Vegetables = two handfuls", "Fats = thumb-sized", "Cheese = two dice-sized"], plateMethod: ["1/2 plate non-starchy vegetables", "1/4 plate protein", "1/4 plate carbohydrates"], applications: "Meal planning, diet control, buffet servings" },
        { id: 7, name: "Seasoning by Taste", image: "TasteET.png", tagline: "Adjusting flavors intuitively", fullDesc: "Adding seasonings without measurements based on taste, smell, and experience.", process: ["Start with less than recipe suggests", "Add gradually, tasting frequently", "Consider dish volume and cooking time", "Balance flavors (salt, acid, sweet, umami)"], tips: ["Salt early, herbs late", "Acids brighten at end", "Sweet balances spice", "Umami enhances depth"], applications: "Soups, stews, sauces, marinades" },
        { id: 8, name: "Cooking Time Estimation", image: "CookTimeET.png", tagline: "Timing without clock", fullDesc: "Estimating cooking times based on experience, visual cues, and sensory signals.", indicators: ["Color change (browning, transparency)", "Texture (fork-tender, al dente)", "Smell (aromas developing)", "Sound (sizzling changes)", "Sight (bubbles, reduction)"], timeReferences: ["Boil water: 5-10 minutes", "Sauté vegetables: 5-7 minutes", "Cook rice: 15-20 minutes", "Bake chicken: 25-30 minutes"], applications: "All cooking processes" }
      ],
      conversions: [
        { id: 1, name: "Volume Conversions", image: "VolumeCS.png", tagline: "Cups, tablespoons, milliliters", fullDesc: "Converting between different volume measurement units commonly used in recipes.", commonConversions: ["1 tablespoon = 3 teaspoons", "1/4 cup = 4 tablespoons", "1/3 cup = 5 tablespoons + 1 teaspoon", "1/2 cup = 8 tablespoons", "1 cup = 16 tablespoons", "1 cup = 240 ml", "1 quart = 4 cups", "1 gallon = 16 cups"], metricConversions: ["1 teaspoon = 5 ml", "1 tablespoon = 15 ml", "1 fluid ounce = 30 ml", "1 cup = 240 ml", "1 pint = 480 ml", "1 quart = 960 ml", "1 liter = 4.2 cups"], tips: "Use measuring spoons within cups, memorize key ratios" },
        { id: 2, name: "Weight Conversions", image: "WeightCS.png", tagline: "Grams, ounces, pounds", fullDesc: "Converting between weight measurement systems for precise ingredient measurement.", commonConversions: ["1 ounce = 28 grams", "4 ounces = 113 grams (1/4 pound)", "8 ounces = 227 grams (1/2 pound)", "16 ounces = 454 grams (1 pound)", "1 kilogram = 2.2 pounds", "1 pound = 454 grams"], bakingConversions: ["1 cup flour = 120-125g", "1 cup sugar = 200g", "1 cup butter = 227g", "1 cup water = 240g", "1 cup honey = 340g"], tips: "Weigh for accuracy, volume varies by ingredient" },
        { id: 3, name: "Temperature Conversions", image: "TemperatureCS.png", tagline: "Celsius ↔ Fahrenheit", fullDesc: "Converting oven and cooking temperatures between Celsius and Fahrenheit systems.", formula: ["°F to °C: Subtract 32, multiply by 5/9", "°C to °F: Multiply by 9/5, add 32"], commonTemperatures: ["Freezing: 0°C = 32°F", "Room temp: 20°C = 68°F", "Body temp: 37°C = 98.6°F", "Simmer: 85°C = 185°F", "Boiling: 100°C = 212°F"], ovenTemperatures: ["Very cool: 120°C = 250°F", "Cool: 150°C = 300°F", "Moderate: 180°C = 350°F", "Hot: 200°C = 400°F", "Very hot: 230°C = 450°F"], tips: "Memorize key points, use oven thermometer" },
        { id: 4, name: "Recipe Scaling", image: "RecipeCS.png", tagline: "Adjusting recipe quantities", fullDesc: "Increasing or decreasing recipe quantities while maintaining proper ratios and cooking times.", scalingRules: ["Multiply all ingredients by same factor", "Adjust cooking times (not linear)", "Consider pan size changes", "Adjust seasoning carefully"], commonMultipliers: ["Half recipe: Multiply by 0.5", "Double recipe: Multiply by 2", "Triple recipe: Multiply by 3", "Quarter recipe: Multiply by 0.25"], exceptions: ["Spices: Increase slightly less", "Salt: Increase carefully, taste", "Baking powder/soda: Exact scaling", "Eggs: Round to nearest whole"], tips: "Write down conversions, check pan capacity" },
        { id: 5, name: "Imperial to Metric", image: "ImperialCS.png", tagline: "US measurements to metric", fullDesc: "Converting American recipe measurements to metric system used in most other countries.", volumeConversions: ["1 teaspoon = 5 ml", "1 tablespoon = 15 ml", "1 fluid ounce = 30 ml", "1 cup = 240 ml", "1 pint = 480 ml", "1 quart = 960 ml", "1 gallon = 3.8 liters"], weightConversions: ["1 ounce = 28 grams", "1 pound = 454 grams", "1 pound = 0.45 kilograms"], ovenConversions: ["250°F = 120°C", "300°F = 150°C", "350°F = 180°C", "400°F = 200°C", "450°F = 230°C"], tips: "Round to convenient metric amounts, use scale for accuracy" },
        { id: 6, name: "Ingredient Substitutions", image: "IngredientCS.png", tagline: "Converting ingredients", fullDesc: "Substituting ingredients when originals aren't available while maintaining similar properties.", commonSubstitutions: ["1 cup buttermilk = 1 cup milk + 1 tbsp vinegar", "1 cup cake flour = 1 cup flour - 2 tbsp", "1 tsp baking powder = 1/4 tsp baking soda + 1/2 tsp cream of tartar", "1 cup honey = 1 1/4 cup sugar + 1/4 cup water", "1 cup oil = 1 cup melted butter"], dairySubstitutions: ["1 cup milk = 1 cup water + 1/4 cup dry milk", "1 cup cream = 3/4 cup milk + 1/4 cup butter", "1 cup yogurt = 1 cup buttermilk"], tips: "Consider flavor and texture changes, test when possible" },
        { id: 7, name: "Pan Size Conversions", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Adjusting for different pans", fullDesc: "Converting recipes for different pan sizes and shapes while maintaining baking times and results.", commonPanSizes: ["8-inch round = 6-inch round × 1.8", "9-inch round = 8-inch round × 1.3", "13×9 inch = two 9-inch rounds", "Loaf pan = 8×4 inch or 9×5 inch"], areaCalculations: ["Round pan: π × radius²", "Square/rectangular: length × width", "Compare areas to adjust quantities"], adjustmentRules: ["Keep depth similar (1-2 inch difference max)", "Adjust time for thickness changes", "Check doneness with toothpick"], tips: "Fill pans 2/3 full, use parchment paper" },
        { id: 8, name: "Measurement Equivalents", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Quick reference conversions", fullDesc: "Memorizing common measurement equivalents for quick mental calculations in the kitchen.", mustKnowEquivalents: ["3 teaspoons = 1 tablespoon", "4 tablespoons = 1/4 cup", "16 tablespoons = 1 cup", "2 cups = 1 pint", "2 pints = 1 quart", "4 quarts = 1 gallon", "8 fluid ounces = 1 cup", "16 ounces = 1 pound"], metricEquivalents: ["5 ml = 1 teaspoon", "15 ml = 1 tablespoon", "240 ml = 1 cup", "1 liter = 4.2 cups", "28 grams = 1 ounce", "454 grams = 1 pound"], handyEquivalents: ["Butter: 1 stick = 1/2 cup = 8 tbsp = 113g", "Sugar: 1 cup = 200g = 7 oz", "Flour: 1 cup = 120g = 4.25 oz", "Rice: 1 cup raw = 3 cups cooked"], tips: "Create cheat sheet for fridge door" }
      ],
      precision: [
        { id: 1, name: "Baking Precision", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Exact measurements for baking", fullDesc: "Techniques for achieving the precision required in baking where chemical reactions depend on exact ratios.", criticalRules: ["Use scale for dry ingredients", "Measure liquids at eye level", "Room temperature ingredients", "Precise oven temperature", "Exact timing"], commonErrors: ["Scooping flour from bag", "Not leveling measurements", "Guessing small amounts", "Substituting without adjustment"], toolsRequired: ["Digital kitchen scale", "Proper measuring cups/spoons", "Oven thermometer", "Kitchen timer"], tips: "Weigh ingredients, follow recipes exactly, don't improvise in baking" },
        { id: 2, name: "Scale Calibration", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Ensuring scale accuracy", fullDesc: "Regular calibration and maintenance of kitchen scales for consistent, accurate measurements.", calibrationMethods: ["Use calibration weights", "Coins (US nickel = 5g)", "Water (1ml = 1g at 4°C)", "Manufacturer's instructions"], maintenanceTips: ["Clean after each use", "Store in dry place", "Replace batteries regularly", "Check zero before each use", "Avoid overloading"], accuracyCheck: ["Weigh known object", "Check at different weights", "Test tare function", "Verify on different surfaces"], tips: "Calibrate monthly, use on hard flat surface, handle gently" },
        { id: 3, name: "Micro Measurements", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Measuring tiny amounts", fullDesc: "Techniques for accurately measuring very small quantities crucial in baking and specialized cooking.", toolsForMicro: ["1/8 and 1/16 tsp measures", "Digital scale (1g precision)", "Medicine droppers", "Micro measuring spoons"], techniques: ["Use scale for under 1 tsp", "Dropper for liquids", "Dip & sweep for powders", "Divide known amounts"], criticalAmounts: ["Yeast: 2.25 tsp per packet", "Baking soda: exact amounts", "Salt: affects fermentation", "Spices: balance flavors"], tips: "Invest in micro spoons, use scale for accuracy, practice with water" },
        { id: 4, name: "Consistent Portioning", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Uniform food portions", fullDesc: "Creating identical portions for consistent cooking, professional presentation, and controlled servings.", portioningTools: ["Cookie/ice cream scoops", "Kitchen scale", "Measuring cups", "Portion control plates", "Divided containers"], techniques: ["Weigh each portion", "Use same scoop size", "Divide total by number", "Visual markers in pans"], benefits: ["Even cooking", "Professional appearance", "Consistent nutrition", "Cost control", "Waste reduction"], tips: "Weigh first few, then eyeball, use consistent tools" },
        { id: 5, name: "Temperature Precision", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Exact temperature control", fullDesc: "Achieving and maintaining precise temperatures crucial for candy making, meat cooking, and baking.", criticalTemperatures: ["Meat doneness temperatures", "Candy stages (soft ball, hard crack)", "Yeast activation (105-115°F)", "Chocolate tempering", "Oil for frying"], tools: ["Instant-read thermometer", "Candy thermometer", "Oven thermometer", "Infrared thermometer"], techniques: ["Calibrate thermometers regularly", "Measure in thickest part", "Avoid bone/fat pockets", "Allow for carryover cooking"], tips: "Invest in quality thermometer, calibrate monthly, clean probes" },
        { id: 6, name: "Hydration Ratios", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Baking with exact water ratios", fullDesc: "Precise water-to-flour ratios essential for bread baking, pasta making, and dough preparation.", commonRatios: ["Bread: 60-75% hydration", "Pasta: 50% hydration", "Pie crust: 30-40% hydration", "Cookie dough: 15-25%"], calculation: ["Hydration % = (water weight ÷ flour weight) × 100", "Baker's percentages", "Adjust for humidity", "Account for other liquids"], effects: ["Higher hydration: more open crumb", "Lower hydration: denser texture", "Affects fermentation time", "Changes handling properties"], tips: "Weigh ingredients, adjust for climate, keep notes" },
        { id: 7, name: "Ingredient Ratios", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Mastering recipe ratios", fullDesc: "Understanding and applying fundamental ingredient ratios that form the basis of countless recipes.", basicRatios: ["Pie dough: 3:2:1 (flour:fat:water)", "Biscuits: 3:1:2 (flour:fat:liquid)", "Pancakes: 2:2:1:1/2 (flour:liquid:egg:fat)", "Vinaigrette: 3:1 (oil:vinegar)", "Rice: 1:2 (rice:water)"], application: ["Scale up/down easily", "Create variations", "Troubleshoot failures", "Memorize less recipes"], benefits: ["Flexibility in cooking", "Better understanding", "Easier improvisation", "Confidence in kitchen"], tips: "Learn ratios instead of recipes, practice with variations" },
        { id: 8, name: "Measurement Documentation", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800", tagline: "Recording exact measurements", fullDesc: "System for documenting precise measurements, adjustments, and results for consistent reproduction.", documentationMethods: ["Recipe journal/notebook", "Digital notes app", "Photograph measurements", "Spreadsheet tracking"], whatToRecord: ["Exact weights/measures", "Brands of ingredients", "Equipment used", "Time/temperature", "Results and adjustments"], benefits: ["Reproduce successes", "Avoid repeating mistakes", "Track improvements", "Share exact recipes"], tips: "Be consistent, include details, review regularly" }
      ]
    };
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = ['measuring-tools', 'measuring-techniques', 'estimation', 'conversions', 'precision'];
      
      const results = await Promise.all(
        categories.map(async (cat) => {
          try {
            // FIXED: Using relative URL instead of hardcoded localhost
            const response = await axios.get(`/api/beginners-guide?category=${cat}`);
            return { category: cat, data: response.data.guides || [] };
          } catch (err) {
            console.error(`Error fetching ${cat}:`, err);
            return { category: cat, data: [] };
          }
        })
      );

      let hasData = false;
      
      results.forEach(result => {
        const parsedData = result.data.map(guide => {
          let content = {};
          try {
            content = JSON.parse(guide.content);
          } catch (e) {
            content = { fullDesc: guide.content, tagline: guide.title };
          }
          return { ...content, id: guide._id, image: guide.image, name: guide.title };
        });

        switch (result.category) {
          case 'measuring-tools':
            if (parsedData.length) { setToolsData(parsedData); hasData = true; }
            break;
          case 'measuring-techniques':
            if (parsedData.length) { setTechniquesData(parsedData); hasData = true; }
            break;
          case 'estimation':
            if (parsedData.length) { setEstimationData(parsedData); hasData = true; }
            break;
          case 'conversions':
            if (parsedData.length) { setConversionData(parsedData); hasData = true; }
            break;
          case 'precision':
            if (parsedData.length) { setPrecisionData(parsedData); hasData = true; }
            break;
          default:
            break;
        }
      });

      if (!hasData) {
        const fallback = getFallbackData();
        setToolsData(fallback.tools);
        setTechniquesData(fallback.techniques);
        setEstimationData(fallback.estimation);
        setConversionData(fallback.conversions);
        setPrecisionData(fallback.precision);
        setError('Using offline data. Connect to internet for latest content.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      const fallback = getFallbackData();
      setToolsData(fallback.tools);
      setTechniquesData(fallback.techniques);
      setEstimationData(fallback.estimation);
      setConversionData(fallback.conversions);
      setPrecisionData(fallback.precision);
      setError('Using offline data. Connect to internet for latest content.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentData = () => {
    switch (selectedCategory) {
      case 'tools': return toolsData;
      case 'techniques': return techniquesData;
      case 'estimation': return estimationData;
      case 'conversions': return conversionData;
      case 'precision': return precisionData;
      default: return toolsData;
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedItem(null);
  };

  if (loading) {
    return (
      <div className="msp-container">
        <div className="loading-spinner">Loading measuring skills...</div>
      </div>
    );
  }

  return (
    <div className="msp-container">
      <div className="msp-layout">
        {/* SIDEBAR */}
        <aside className="msp-sidebar">
          <div className="msp-sidebar-header">
            <h2 className="msp-sidebar-title">Measuring Skills</h2>
          </div>

          <div className="msp-sidebar-categories">
            <ul className="msp-categories-list">
              <li className={`msp-category-item ${selectedCategory === 'tools' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('tools')}>
                <span className="msp-category-name">Tools & Equipment</span>
              </li>
              <li className={`msp-category-item ${selectedCategory === 'techniques' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('techniques')}>
                <span className="msp-category-name">Measuring Techniques</span>
              </li>
              <li className={`msp-category-item ${selectedCategory === 'estimation' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('estimation')}>
                <span className="msp-category-name">Estimation Skills</span>
              </li>
              <li className={`msp-category-item ${selectedCategory === 'conversions' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('conversions')}>
                <span className="msp-category-name">Conversion Skills</span>
              </li>
              <li className={`msp-category-item ${selectedCategory === 'precision' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('precision')}>
                <span className="msp-category-name">Precision Skills</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="msp-main">
          {error && <div className="error-message" style={{color: 'orange', textAlign: 'center', padding: '10px'}}>{error}</div>}
          
          <header className="msp-main-header">
            <div className="msp-header-content">
              <h1 className="msp-page-title">
                {selectedCategory === 'tools' && 'Measuring Tools & Equipment'}
                {selectedCategory === 'techniques' && 'Measuring Techniques'}
                {selectedCategory === 'estimation' && 'Estimation Skills'}
                {selectedCategory === 'conversions' && 'Conversion Skills'}
                {selectedCategory === 'precision' && 'Precision Skills'}
              </h1>
              <p className="msp-page-description">
                {selectedCategory === 'tools' && 'Essential tools for accurate kitchen measurements and their proper usage.'}
                {selectedCategory === 'techniques' && 'Proper methods and techniques for measuring ingredients accurately.'}
                {selectedCategory === 'estimation' && 'Skills for estimating quantities when precise measuring isn\'t possible.'}
                {selectedCategory === 'conversions' && 'Converting between measurement systems and adjusting recipes.'}
                {selectedCategory === 'precision' && 'Advanced skills for exact measurements in baking and precision cooking.'}
              </p>
            </div>
          </header>

          {/* ITEMS GRID */}
          <div className="msp-items-grid-section">
            <div className="msp-items-grid">
              {getCurrentData().map(item => (
                <div key={item.id} className="msp-item-card" onClick={() => handleItemSelect(item)}>
                  <div className="msp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="msp-card-content">
                    <div className="msp-card-header">
                      <h3 className="msp-card-title">{item.name}</h3>
                    </div>
                    <p className="msp-card-description">{item.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL */}
      {showDetailPanel && selectedItem && (
        <div className="msp-modal-overlay" onClick={closeDetailPanel}>
          <div className="msp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="msp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="msp-modal-header">
              <div className="msp-modal-title">
                <h2>{selectedItem.name}</h2>
                <p className="msp-modal-subtitle">{selectedItem.tagline}</p>
              </div>
            </div>

            <div className="msp-modal-content">
              <div className="msp-modal-left">
                <div className="msp-modal-details">
                  <div className="msp-detail-section">
                    <h3>📋 Description</h3>
                    <div className="msp-detail-content"><p>{selectedItem.fullDesc}</p></div>
                  </div>

                  {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
                    <div className="msp-detail-section">
                      <h3>✅ Key Features</h3>
                      <div className="msp-features-horizontal">
                        {selectedItem.keyFeatures.map((feature, idx) => (<div key={idx} className="msp-feature-box">{feature}</div>))}
                      </div>
                    </div>
                  )}

                  {selectedItem.steps && selectedItem.steps.length > 0 && (
                    <div className="msp-detail-section">
                      <h3>📋 Step-by-Step Process</h3>
                      <div className="msp-detail-content">
                        <ol className="msp-steps-list">{selectedItem.steps.map((step, idx) => (<li key={idx} className="msp-step-item">{step}</li>))}</ol>
                      </div>
                    </div>
                  )}

                  {selectedItem.properUsage && (
                    <div className="msp-detail-section">
                      <h3>📝 Proper Usage</h3>
                      <div className="msp-detail-content"><p>{selectedItem.properUsage}</p></div>
                    </div>
                  )}

                  {selectedItem.tips && (
                    <div className="msp-detail-section">
                      <h3>💡 Pro Tips</h3>
                      <div className="msp-detail-content"><p>{selectedItem.tips}</p></div>
                    </div>
                  )}

                  {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
                    <div className="msp-detail-section">
                      <h3>❌ Common Mistakes</h3>
                      <div className="msp-mistakes-horizontal">
                        {selectedItem.commonMistakes.map((mistake, idx) => (<div key={idx} className="msp-mistake-box">{mistake}</div>))}
                      </div>
                    </div>
                  )}

                  {selectedItem.commonConversions && selectedItem.commonConversions.length > 0 && (
                    <div className="msp-detail-section">
                      <h3>🔄 Common Conversions</h3>
                      <div className="msp-conversions-grid">
                        {selectedItem.commonConversions.map((conv, idx) => (<div key={idx} className="msp-conversion-box">{conv}</div>))}
                      </div>
                    </div>
                  )}

                  {selectedItem.criticalRules && selectedItem.criticalRules.length > 0 && (
                    <div className="msp-detail-section">
                      <h3>🎯 Critical Rules</h3>
                      <div className="msp-critical-rules-grid">
                        {selectedItem.criticalRules.map((rule, idx) => (<div key={idx} className="msp-critical-rule-box">{rule}</div>))}
                      </div>
                    </div>
                  )}

                  {selectedItem.types && selectedItem.types.length > 0 && (
                    <div className="msp-types-section">
                      <h3 className="msp-types-heading">🔧 Types & Varieties</h3>
                      <div className="msp-types-grid">
                        {selectedItem.types.map((type, idx) => (
                          <div key={idx} className="msp-type-card">
                            <div className="msp-type-image" style={{ backgroundImage: `url(${type.image})` }}></div>
                            <div className="msp-type-content">
                              <h4>{type.name}</h4>
                              <p className="msp-type-desc">{type.description}</p>
                              <div className="msp-type-best"><strong>Best For:</strong> {type.bestFor}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="msp-modal-right">
                <div className="msp-main-image-container">
                  <div className="msp-main-image" style={{ backgroundImage: `url(${selectedItem.image})` }}></div>
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

export default MeasuringSkillsPage;