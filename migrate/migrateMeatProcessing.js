const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const BeginnersGuide = require('../models/BeginnersGuide');
const User = require('../models/User');

dotenv.config({ path: path.join(__dirname, '../.env') });

const allMeatGuides = [];

// Helper function
const addMeatGuide = (title, contentObj, category, image) => {
  allMeatGuides.push({
    title: title,
    content: JSON.stringify(contentObj),
    category: category,
    image: image,
    video: ''
  });
};

// ==================== BEEF - Deboning ====================
addMeatGuide(
  "Beef Boning Knife",
  {
    fullDesc: "Thin, narrow blade that flexes easily to follow bone contours. Essential for deboning beef primals like chuck, rib, and round. The flexibility allows you to work around bones without wasting meat, making it a crucial tool for any serious cook or butcher.",
    tagline: "Flexible precision for beef bone removal",
    tools: ["6-inch flexible boning knife", "Steel for honing", "Cutting board with groove", "Cut-resistant gloves"],
    steps: [
      "Identify bone structure - feel with fingers first",
      "Make initial cut along bone with knife tip facing bone",
      "Scrape meat away from bone using short, smooth strokes",
      "Follow natural seams where meat separates easily",
      "Remove bone completely and clean remaining cartilage"
    ],
    tips: "Keep knife sharp, use tip for detailed work, follow bone contour. A sharp knife is safer and more efficient than a dull one.",
    bestFor: "Beef chuck roll, rib sections, round cuts",
    type: "deboning",
    meatType: "beef"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Breaking Knife",
  {
    fullDesc: "Stiff, curved blade for breaking down large primal cuts. Separates muscles from bone in beef and pork. This heavy-duty knife is designed for the initial breakdown of large meat sections into smaller, manageable cuts.",
    tagline: "Heavy-duty primal cutting",
    tools: ["10-inch breaking knife", "Honing steel", "Heavy cutting board", "Safety gloves"],
    steps: [
      "Position primal cut on board",
      "Follow natural muscle seams",
      "Use curved blade to separate muscles",
      "Cut through connective tissue",
      "Separate into subprimal cuts"
    ],
    tips: "Use long smooth strokes, let knife do the work. The weight of the blade helps cut through connective tissue.",
    bestFor: "Beef primals, large roasts",
    type: "deboning",
    meatType: "beef"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1563620915-84718a1993da?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Beef Cleaver",
  {
    fullDesc: "Heavy rectangular blade that powers through bones and joints. Used for splitting ribs, cutting through joints, and portioning bone-in cuts. The cleaver's weight does most of the work, making it ideal for heavy-duty butchery tasks.",
    tagline: "Through-bone chopping",
    tools: ["8-inch cleaver", "Cutting board", "Safety gloves", "Steel mesh apron"],
    steps: [
      "Position bone on cutting board",
      "Raise cleaver with controlled motion",
      "Strike through bone with confidence",
      "Use heel of blade for thick bones",
      "Clean blade between cuts"
    ],
    tips: "Let weight of cleaver do work, aim accurately. Never use a cleaver on frozen meat as it can damage the blade.",
    bestFor: "Beef ribs, shank, joint separation",
    type: "deboning",
    meatType: "beef"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1593617999965-5dc82e9a1626?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Fillet Knife (Beef)",
  {
    fullDesc: "Long flexible blade for detailed work around bones and silver skin removal. Perfect for tenderloin preparation. The extreme flexibility allows you to follow the contours of bones precisely, minimizing meat waste.",
    tagline: "Precision trimming and detailing",
    tools: ["8-inch fillet knife", "Sharpening steel", "Cutting board", "Tweezers for silver skin"],
    steps: [
      "Remove silver skin with angled cuts",
      "Trim excess fat",
      "Separate chain meat",
      "Clean tenderloin surface",
      "Portion into steaks"
    ],
    tips: "Keep blade at slight angle, work slowly. The key to good filleting is patience and a very sharp blade.",
    bestFor: "Beef tenderloin, strip loin, silver skin removal",
    type: "deboning",
    meatType: "beef"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400"
);

// ==================== BEEF - Cleaning ====================
addMeatGuide(
  "Trimming Knife",
  {
    fullDesc: "Short, curved blade perfect for removing silver skin, excess fat, and connective tissue from steaks and roasts. This precision tool allows you to clean meat surfaces thoroughly while maintaining the integrity of the cut.",
    tagline: "Silver skin and fat removal",
    tools: ["4-inch trimming knife", "Sharpening steel", "Cutting board", "Paper towels"],
    steps: [
      "Identify silver skin direction",
      "Slide knife under membrane",
      "Angle blade slightly upward",
      "Push forward with gentle pressure",
      "Remove in one piece if possible"
    ],
    tips: "Keep blade cold, work on chilled meat. Trimming is easier when the meat is partially frozen.",
    bestFor: "Beef steaks, tenderloin, roasts",
    type: "cleaning",
    meatType: "beef"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1563620915-84718a1993da?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Kitchen Shears",
  {
    fullDesc: "Heavy-duty scissors for cutting through fat, trimming connective tissue, and portioning beef. A versatile tool that complements your knife work, especially useful for cutting through small bones and joints.",
    tagline: "Multi-purpose cutting",
    tools: ["Heavy-duty shears", "Cleaning brush", "Cutting board", "Towels"],
    steps: [
      "Open shears fully",
      "Position on fat/connective tissue",
      "Cut with firm pressure",
      "Clean blades between cuts",
      "Disassemble for thorough cleaning"
    ],
    tips: "Use notch for bone, wash immediately. Many quality shears can be taken apart for deep cleaning.",
    bestFor: "Fat trimming, connective tissue, portioning",
    type: "cleaning",
    meatType: "beef"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Meat Scraper",
  {
    fullDesc: "Stiff, blunt tool for scraping bones clean of meat and cartilage for stocks and broths. Perfect for maximizing yield when making homemade stocks, ensuring you extract every bit of flavor from bones.",
    tagline: "Bone and cartilage cleaning",
    tools: ["Stainless steel scraper", "Cutting board", "Stock pot", "Towels"],
    steps: [
      "Hold bone firmly",
      "Scrape away from body",
      "Remove all meat fragments",
      "Clean cartilage from joints",
      "Rinse bones thoroughly"
    ],
    tips: "Work over stock pot, save scraps for stock. Nothing goes to waste in professional butchery.",
    bestFor: "Beef bones, rib racks, stock preparation",
    type: "cleaning",
    meatType: "beef"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Tweezers/Pluckers",
  {
    fullDesc: "Precision tool for removing fine hairs, pin bones, and small bone fragments from beef cuts. Essential for achieving perfectly clean cuts, especially when preparing meat for high-end presentations.",
    tagline: "Fine hair and pin bone removal",
    tools: ["Stainless steel tweezers", "Magnifying lamp (optional)", "Paper towels", "Small bowl"],
    steps: [
      "Identify pin bones or hairs",
      "Grasp firmly at base",
      "Pull in direction of growth",
      "Remove completely",
      "Discard properly"
    ],
    tips: "Work under good light, check surface by feel. Your fingertips can detect small bones your eyes might miss.",
    bestFor: "Pin bones, hairs, small fragments",
    type: "cleaning",
    meatType: "beef"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400"
);

// ==================== BEEF - Cuts ====================
addMeatGuide(
  "Chuck Cuts",
  {
    fullDesc: "Chuck comes from the shoulder area. Well-marbled with rich beef flavor. Best for slow cooking, braising, and grinding. This primal cut offers exceptional value and depth of flavor that develops beautifully during long, slow cooking methods.",
    tagline: "Shoulder area - flavorful and economical",
    tools: ["Breaking knife", "Cleaver", "Cutting board", "Boning knife"],
    steps: [
      "Separate chuck from rib between 5th-6th rib",
      "Remove blade bone and related cartilage",
      "Separate clod and mock tender",
      "Divide into chuck roll and chuck tender",
      "Portion into steaks or roasts"
    ],
    tips: "Great for pot roast, stew meat, ground beef. The connective tissue breaks down during slow cooking, creating incredibly tender results.",
    bestFor: "Pot roast, stew meat, burgers, braising",
    type: "cuts",
    meatType: "beef"
  },
  "meat-processing",
  "ChickCut.png"
);

addMeatGuide(
  "Rib Cuts",
  {
    fullDesc: "Rib section between chuck and loin. Highly marbled, extremely tender. Home of Ribeye steak and Prime Rib. This is considered one of the most desirable primals due to its exceptional marbling and tenderness.",
    tagline: "Premium tender cuts",
    tools: ["Rib knife", "Bandsaw (for bone-in)", "Breaking knife", "Steel"],
    steps: [
      "Separate rib from chuck between 5th-6th rib",
      "Separate rib from loin between 12th-13th rib",
      "Remove back strap and feather bones",
      "Cut into ribeye steaks or leave whole for prime rib",
      "Trim excess fat cap"
    ],
    tips: "Best for grilling and roasting. The fat cap should be trimmed to about 1/4 inch for optimal flavor.",
    bestFor: "Ribeye steak, prime rib, rib roast",
    type: "cuts",
    meatType: "beef"
  },
  "meat-processing",
  "RibCut.png"
);

addMeatGuide(
  "Loin Cuts",
  {
    fullDesc: "Loin runs from ribs to hip. Least exercised area, most tender. Home of T-bone, Porterhouse, Strip, and Tenderloin. This primal produces the most expensive and sought-after cuts due to exceptional tenderness.",
    tagline: "Most tender cuts",
    tools: ["Boning knife", "Bandsaw (for bone-in)", "Breaking knife", "Fillet knife"],
    steps: [
      "Separate short loin from sirloin",
      "Remove tenderloin whole",
      "Cut strip loin into New York strips",
      "Cut T-bone/Porterhouse from bone-in sections",
      "Trim silver skin from tenderloin"
    ],
    tips: "Most expensive cuts, best for quick high-heat cooking. The tenderloin should be cleaned of all silver skin for the best texture.",
    bestFor: "NY Strip, Filet Mignon, T-bone, Porterhouse",
    type: "cuts",
    meatType: "beef"
  },
  "meat-processing",
  "LoinCut.png"
);

addMeatGuide(
  "Round Cuts",
  {
    fullDesc: "Round comes from the hind leg. Lean and tough, but flavorful. Best with moist heat or thin slicing. This primal is very lean, making it a healthier choice but requires specific cooking techniques to be tender.",
    tagline: "Lean hind leg cuts",
    tools: ["Breaking knife", "Boning knife", "Meat mallet", "Slicing knife"],
    steps: [
      "Separate round from sirloin",
      "Separate top round, bottom round, eye of round",
      "Remove fat and connective tissue",
      "Cut into roasts or steaks",
      "Cube or tenderize for various uses"
    ],
    tips: "Marinate for tenderness, slice thin against grain. The key to tender round cuts is to never overcook them and always slice against the grain.",
    bestFor: "Roast beef, cube steak, jerky, stew meat",
    type: "cuts",
    meatType: "beef"
  },
  "meat-processing",
  "RoundCut.png"
);

addMeatGuide(
  "Brisket",
  {
    fullDesc: "Brisket comes from the chest area between front legs. Tough but incredibly flavorful when cooked properly. The brisket has two muscles - the flat and the point - each with different characteristics that benefit from low-and-slow cooking.",
    tagline: "Flavorful chest cut",
    tools: ["Brisket knife", "Trimming knife", "Injector (optional)", "Smoker or Dutch oven"],
    steps: [
      "Separate whole brisket",
      "Trim fat cap to 1/4 inch",
      "Separate flat and point muscles",
      "Remove hard fat between muscles",
      "Trim edges square for even cooking"
    ],
    tips: "Low and slow cooking, perfect for BBQ. The internal temperature should reach 200-205°F for the collagen to fully break down.",
    bestFor: "BBQ brisket, corned beef, pastrami",
    type: "cuts",
    meatType: "beef"
  },
  "meat-processing",
  "BrisketCut.png"
);

addMeatGuide(
  "Plate Cuts",
  {
    fullDesc: "Plate is the belly area below ribs. Rich, fatty, flavorful. Home of skirt steak and short ribs. This primal offers some of the most intensely beefy flavors, perfect for grilling and braising.",
    tagline: "Belly area cuts",
    tools: ["Breaking knife", "Boning knife", "Cleaver (for ribs)", "Slicing knife"],
    steps: [
      "Separate plate from brisket and flank",
      "Remove skirt steak (inside and outside)",
      "Cut short ribs from plate",
      "Trim excess fat",
      "Portion into serving sizes"
    ],
    tips: "Skirt steak great for fajitas, short ribs for braising. The outside skirt is more tender than the inside skirt.",
    bestFor: "Skirt steak, short ribs, ground beef",
    type: "cuts",
    meatType: "beef"
  },
  "meat-processing",
  "PlateCut.png"
);

addMeatGuide(
  "Flank Cuts",
  {
    fullDesc: "Flank comes from the belly area near hind legs. Single long, flat muscle with distinct grain. Very beefy flavor. This lean cut is known for its bold beef taste and is best when marinated and cooked quickly to medium-rare.",
    tagline: "Lean belly cut",
    tools: ["Flank knife", "Slicing knife", "Meat tenderizer", "Cutting board"],
    steps: [
      "Separate whole flank steak",
      "Remove silver skin and membrane",
      "Trim excess fat",
      "Score surface lightly if desired",
      "Slice against grain for serving"
    ],
    tips: "Marinate, cook quickly, slice thin against grain. Slicing against the grain is essential for flank steak - it shortens the muscle fibers for a more tender bite.",
    bestFor: "Flank steak, London broil, fajitas",
    type: "cuts",
    meatType: "beef"
  },
  "meat-processing",
  "FlankCut.png"
);

addMeatGuide(
  "Shank Cuts",
  {
    fullDesc: "Shank comes from the leg. Tough, sinewy, but full of flavor. Contains marrow bone that adds richness to dishes. This cut is all about slow cooking - the long, gentle heat transforms tough connective tissue into rich, silky gelatin.",
    tagline: "Leg cuts with marrow bone",
    tools: ["Bandsaw", "Cleaver", "Boning knife", "Stock pot"],
    steps: [
      "Separate foreshank and hindshank",
      "Cut crosswise into 2-inch sections",
      "Clean bone edges",
      "Trim excessive sinew",
      "Tie with twine to hold shape"
    ],
    tips: "Long braising, marrow adds richness. The marrow can be scooped out and spread on bread as a delicacy.",
    bestFor: "Osso buco, braised beef shank, beef stock",
    type: "cuts",
    meatType: "beef"
  },
  "meat-processing",
  "ShankCut.png"
);

// ==================== LAMB - All ====================
addMeatGuide(
  "Lamb Boning Knife",
  {
    fullDesc: "Flexible blade designed specifically for lamb. Follows curved bones of shoulder and leg easily. The lamb's smaller, more delicate bone structure requires a knife that can navigate tight spaces while maintaining precision.",
    tagline: "Precision deboning for lamb",
    tools: ["6-inch boning knife", "Honing steel", "Cutting board", "Safety gloves"],
    steps: [
      "Follow natural muscle seams",
      "Cut along bone contours",
      "Scrape meat clean from bones",
      "Remove shoulder blade whole",
      "Clean leg bones at joints"
    ],
    tips: "Work slowly, let knife follow bone. Lamb fat solidifies quickly when cold, so work with slightly tempered meat for easier trimming.",
    bestFor: "Lamb shoulder, leg, rack preparation",
    type: "deboning",
    meatType: "lamb"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Lamb Trimming Knife",
  {
    fullDesc: "Remove excess fat cap and silver skin from lamb cuts. Essential for cleaning racks and loins. Lamb has a distinctive fat that should be properly trimmed to prevent gamey flavors while retaining enough for moisture and flavor.",
    tagline: "Fat and silver skin removal",
    tools: ["4-inch trimming knife", "Paper towels", "Cutting board", "Sharpening steel"],
    steps: [
      "Remove thick outer fat cap",
      "Peel silver skin from racks",
      "Clean frenching bones",
      "Trim connective tissue",
      "Final surface cleaning"
    ],
    tips: "Chill meat before trimming. Frenching lamb racks - scraping the bones clean - creates an elegant presentation for special occasions.",
    bestFor: "Lamb racks, loins, chops",
    type: "cleaning",
    meatType: "lamb"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1563620915-84718a1993da?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Lamb Shoulder Cuts",
  {
    fullDesc: "Lamb shoulder is well-exercised, very flavorful. Best for slow cooking and braising. This cut benefits greatly from long, slow cooking methods that break down connective tissue and release its rich, savory flavor.",
    tagline: "Flavorful, economical cuts",
    tools: ["Boning knife", "Breaking knife", "Butcher twine", "Cutting board"],
    steps: [
      "Remove shoulder blade bone",
      "Roll and tie shoulder roast",
      "Cut shoulder chops",
      "Cube for stew meat",
      "Trim excess fat"
    ],
    tips: "Great for curries and braises. The bone-in shoulder roast is excellent for slow roasting - the bone adds flavor and helps retain moisture.",
    bestFor: "Shoulder roast, shoulder chops, lamb stew",
    type: "cuts",
    meatType: "lamb"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Lamb Rack Cuts",
  {
    fullDesc: "Lamb rack is premium cut from rib section. Can be roasted whole or cut into chops. This is the most elegant lamb cut, prized for its tenderness, mild flavor, and beautiful presentation when frenched.",
    tagline: "Elegant, tender cuts",
    tools: ["Rack knife", "Frenched knife", "Cleaver", "Cutting board"],
    steps: [
      "French rack - scrape meat from bone ends",
      "Remove chine bone",
      "Trim fat cap to 1/4 inch",
      "Separate into rib chops",
      "Tie rack for roasting"
    ],
    tips: "French bones for elegant presentation. Ask your butcher to french the rack if you're unsure - it requires precision work.",
    bestFor: "Rack of lamb, lamb rib chops",
    type: "cuts",
    meatType: "lamb"
  },
  "meat-processing",
  "LambRibCut.png"
);

addMeatGuide(
  "Lamb Loin Cuts",
  {
    fullDesc: "Lamb loin is tender, mild flavor. Home of loin chops and tenderloin. This is the most tender part of the lamb, comparable to beef tenderloin, and requires minimal cooking to preserve its delicate texture.",
    tagline: "Most tender cuts",
    tools: ["Boning knife", "Slicing knife", "Cutting board", "Butcher twine"],
    steps: [
      "Remove tenderloin whole",
      "Cut loin chops from bone-in section",
      "Trim silver skin",
      "Portion noisettes from boneless loin",
      "Tie for roasting"
    ],
    tips: "Quick, high-heat cooking. Loin chops are sometimes called 'mini T-bones' and cook perfectly on a hot grill.",
    bestFor: "Loin chops, lamb tenderloin, noisettes",
    type: "cuts",
    meatType: "lamb"
  },
  "meat-processing",
  "LambLoinCut.png"
);

addMeatGuide(
  "Lamb Leg Cuts",
  {
    fullDesc: "Lamb leg is lean, versatile. Can be roasted bone-in, boneless, or cut into steaks. This large primal cut offers multiple preparation options, from impressive holiday roasts to quick-cooking leg steaks for weeknight meals.",
    tagline: "Classic roasting cuts",
    tools: ["Boning knife", "Trussing needle", "Butcher twine", "Cutting board"],
    steps: [
      "Remove aitch bone and leg bone",
      "Butterfly leg for even cooking",
      "Roll and tie boneless roast",
      "Cut leg steaks from bone-in section",
      "Trim excess fat"
    ],
    tips: "Great for roasting, grilling. Butterflying the leg creates a uniform thickness that ensures even cooking throughout.",
    bestFor: "Leg of lamb, leg steaks, butterflied leg",
    type: "cuts",
    meatType: "lamb"
  },
  "meat-processing",
  "LambLegCut.png"
);

addMeatGuide(
  "Lamb Shank Cuts",
  {
    fullDesc: "Lamb shanks are tough but become tender and rich when braised. Full of flavor and collagen. The long, slow braising transforms this humble cut into a luxurious dish with meat that falls off the bone.",
    tagline: "Rich, gelatinous cuts",
    tools: ["Cleaver", "Boning knife", "Butcher twine", "Dutch oven"],
    steps: [
      "Separate foreshanks",
      "Trim excess fat and sinew",
      "French bone if desired",
      "Tie with twine to hold shape",
      "Portion crosswise for osso buco"
    ],
    tips: "Long, slow braising. The marrow in the center adds incredible richness to braising liquids.",
    bestFor: "Braised lamb shanks, lamb osso buco",
    type: "cuts",
    meatType: "lamb"
  },
  "meat-processing",
  "LambShankCut.png"
);

// ==================== POULTRY ====================
addMeatGuide(
  "Poultry Boning Knife",
  {
    fullDesc: "Thin, flexible blade perfect for following chicken and turkey bone structure. Essential for supreme cuts. The light weight and precise control of this knife make it ideal for delicate poultry work and minimizing waste.",
    tagline: "Flexible deboning for chicken",
    tools: ["5-inch boning knife", "Kitchen shears", "Cutting board", "Paper towels"],
    steps: [
      "Remove legs and thighs",
      "Separate breast from carcass",
      "Remove wishbone",
      "Debone thighs",
      "Supreme chicken breasts"
    ],
    tips: "Save carcass for stock. The carcass, wings, and neck make excellent chicken stock - don't throw them away.",
    bestFor: "Chicken, turkey, game birds",
    type: "deboning",
    meatType: "poultry"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Poultry Shears",
  {
    fullDesc: "Heavy-duty shears for cutting through joints, trimming fat, and spatchcocking birds. This versatile tool is essential for anyone who regularly works with whole birds, making quick work of joints that would be difficult with a knife.",
    tagline: "Multi-purpose poultry cutting",
    tools: ["Poultry shears", "Cutting board", "Cleaning brush", "Towels"],
    steps: [
      "Remove backbone for spatchcock",
      "Cut through joints between legs/thighs",
      "Trim excess fat and skin",
      "Remove wishbone",
      "Clean cavity thoroughly"
    ],
    tips: "Use notch for bones, wash immediately. Spatchcocking (removing the backbone) allows the bird to lay flat for faster, more even cooking.",
    bestFor: "Spatchcocking, portioning, trimming",
    type: "cleaning",
    meatType: "poultry"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Whole Chicken Cuts",
  {
    fullDesc: "Whole chicken can be roasted whole or broken down into parts. Most economical way to buy poultry. Learning to break down a whole chicken is a foundational skill that saves money and gives you control over portion sizes.",
    tagline: "Versatile whole bird",
    tools: ["Chef knife", "Poultry shears", "Cutting board", "Butcher twine"],
    steps: [
      "Remove giblets from cavity",
      "Rinse and pat dry",
      "Truss for roasting",
      "Or breakdown into 8 pieces",
      "Save carcass for stock"
    ],
    tips: "Dry skin thoroughly for crispy results. An air-dried chicken in the refrigerator overnight produces the crispiest skin when roasted.",
    bestFor: "Roast chicken, stock, multiple meals",
    type: "cuts",
    meatType: "poultry"
  },
  "meat-processing",
  "WholeChickenCut.png"
);

addMeatGuide(
  "Chicken Breast Cuts",
  {
    fullDesc: "Boneless skinless chicken breast is lean and mild. Can be pounded, grilled, sautéed, or baked. This versatile cut is a kitchen staple that adapts to countless cooking methods and flavor profiles.",
    tagline: "Lean, versatile cut",
    tools: ["Fillet knife", "Meat mallet", "Cutting board", "Plastic wrap"],
    steps: [
      "Remove tenderloin",
      "Trim fat and cartilage",
      "Butterfly for even thickness",
      "Pound to even thickness",
      "Portion into cutlets"
    ],
    tips: "Pound to even thickness for even cooking. Placing the breast between two sheets of plastic wrap prevents tearing while pounding.",
    bestFor: "Chicken piccata, parmesan, salads, sandwiches",
    type: "cuts",
    meatType: "poultry"
  },
  "meat-processing",
  "ChikBreastCut.png"
);

addMeatGuide(
  "Chicken Thigh Cuts",
  {
    fullDesc: "Chicken thighs are darker, more flavorful, and stay moist during cooking. Available bone-in or boneless. This is often considered the best part of the chicken due to its superior flavor and forgiving nature - it's very difficult to overcook.",
    tagline: "Juicy, flavorful cut",
    tools: ["Boning knife", "Kitchen shears", "Cutting board", "Paper towels"],
    steps: [
      "Remove bone (for boneless)",
      "Trim excess fat and skin",
      "Butterfly for even thickness",
      "Portion into bite-sized pieces",
      "Leave whole for grilling"
    ],
    tips: "More forgiving than breast, hard to overcook. The higher fat content means thighs stay juicy even when cooked to higher temperatures.",
    bestFor: "Grilling, stir-fry, braising, curries",
    type: "cuts",
    meatType: "poultry"
  },
  "meat-processing",
  "ChickThighCut.png"
);

addMeatGuide(
  "Chicken Leg Quarter Cuts",
  {
    fullDesc: "Leg quarter includes thigh and drumstick attached. Economical and flavorful, great for roasting. This classic cut is perfect for casual meals, picnics, and any time you want a substantial, satisfying portion of dark meat.",
    tagline: "Drumstick and thigh together",
    tools: ["Chef knife", "Kitchen shears", "Cutting board", "Paper towels"],
    steps: [
      "Separate thigh from drumstick at joint",
      "Remove backbone",
      "Trim excess skin and fat",
      "Score meat for marinade",
      "Leave whole for roasting"
    ],
    tips: "Great value, full of flavor. Scoring the skin helps marinades penetrate and allows fat to render more effectively.",
    bestFor: "Roasted chicken, fried chicken, braised chicken",
    type: "cuts",
    meatType: "poultry"
  },
  "meat-processing",
  "ChickLegQuarter.png"
);

addMeatGuide(
  "Chicken Wings Cuts",
  {
    fullDesc: "Chicken wings divided into drumette, flat, and tip. Popular for frying and saucing. The two main edible parts - the drumette and the flat - have different textures, making wings interesting to eat and perfect for game-day snacking.",
    tagline: "Perfect for appetizers",
    tools: ["Chef knife", "Kitchen shears", "Cutting board", "Paper towels"],
    steps: [
      "Separate drumette from flat at joint",
      "Remove wing tip",
      "Trim excess skin",
      "Cut flat into two pieces",
      "Pat dry before cooking"
    ],
    tips: "Dry thoroughly for crispy skin. Baking powder (not baking soda) on the skin before baking creates extra crispy wings without frying.",
    bestFor: "Buffalo wings, grilled wings, appetizers",
    type: "cuts",
    meatType: "poultry"
  },
  "meat-processing",
  "ChickWingsCut.png"
);

addMeatGuide(
  "Ground Poultry Cuts",
  {
    fullDesc: "Ground chicken or turkey from trimmings and dark meat. Leaner alternative to ground beef. A healthier option that still delivers protein and versatility, though it requires different handling than ground beef due to its lower fat content.",
    tagline: "Lean ground meat",
    tools: ["Meat grinder", "Mixing bowl", "Spatula", "Parchment paper"],
    steps: [
      "Chill meat and grinder parts",
      "Cut into 1-inch cubes",
      "Grind through coarse plate",
      "Mix gently",
      "Portion and shape"
    ],
    tips: "Add fat or moisture for lean ground breast. Ground chicken breast can be dry - adding a small amount of olive oil or grated onion helps keep burgers moist.",
    bestFor: "Burgers, meatballs, tacos, chili",
    type: "cuts",
    meatType: "poultry"
  },
  "meat-processing",
  "GroundPoltery.png"
);

// ==================== FISH ====================
addMeatGuide(
  "Fish Fillet Knife",
  {
    fullDesc: "Long, extremely flexible blade that glides along the backbone. Essential for clean fish fillets. The flexibility allows you to follow the contours of the fish's bones, separating the fillet with minimal waste and leaving the skeleton clean.",
    tagline: "Ultra-flexible for fish",
    tools: ["8-inch fillet knife", "Fish scaler", "Cutting board", "Tweezers for pin bones"],
    steps: [
      "Scale fish if needed",
      "Cut behind gills to backbone",
      "Run knife along backbone",
      "Lift fillet away from ribs",
      "Remove pin bones with tweezers"
    ],
    tips: "Keep knife very sharp, work slowly. A sharp fillet knife is the most important tool - dull knives tear the delicate flesh.",
    bestFor: "Round fish, flat fish, all species",
    type: "deboning",
    meatType: "fish"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Fish Scaler",
  {
    fullDesc: "Tool for removing fish scales before filleting. Prevents scales from flying everywhere. Scaling can be messy - using the right tool and technique contains the mess and makes the job much faster.",
    tagline: "Scale removal tool",
    tools: ["Fish scaler", "Running water", "Plastic bag", "Cutting board"],
    steps: [
      "Rinse fish",
      "Hold tail firmly",
      "Scrape from tail to head",
      "Work under running water",
      "Rinse thoroughly"
    ],
    tips: "Scale in plastic bag to contain mess. Working under cold running water helps wash scales away immediately.",
    bestFor: "All scaled fish",
    type: "cleaning",
    meatType: "fish"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Whole Fish Cuts",
  {
    fullDesc: "Whole fish can be baked, grilled, or poached. Looks impressive and retains maximum moisture. Cooking fish whole preserves the natural moisture and flavor better than any other method, and the presentation is stunning.",
    tagline: "Beautiful presentation",
    tools: ["Chef knife", "Kitchen shears", "Fish scaler", "Cutting board"],
    steps: [
      "Scale and gut fish",
      "Remove gills",
      "Rinse cavity thoroughly",
      "Score skin for even cooking",
      "Pat dry before cooking"
    ],
    tips: "Check for freshness: clear eyes, red gills, fresh sea smell. The eyes should be bright and bulging, not sunken.",
    bestFor: "Baking, grilling, poaching",
    type: "cuts",
    meatType: "fish"
  },
  "meat-processing",
  "WholeFishCuts.png"
);

addMeatGuide(
  "Fish Fillet Cuts",
  {
    fullDesc: "Boneless, skin-on or skin-off fillets. Most popular fish cut for versatility. Fillets are the go-to choice for most home cooks - they're easy to cook, quick to prepare, and work well with almost any cooking method.",
    tagline: "Boneless portions",
    tools: ["Fillet knife", "Tweezers", "Cutting board", "Paper towels"],
    steps: [
      "Remove pin bones with tweezers",
      "Trim belly flap",
      "Score skin to prevent curling",
      "Portion into serving sizes",
      "Pat dry before cooking"
    ],
    tips: "Cook skin-side down first for crispy skin. Patting the skin dry before cooking is essential for achieving crispy results.",
    bestFor: "Pan-searing, baking, grilling",
    type: "cuts",
    meatType: "fish"
  },
  "meat-processing",
  "FishFillet.png"
);

addMeatGuide(
  "Fish Steak Cuts",
  {
    fullDesc: "Crosswise cuts through larger fish with bone-in. Holds together well for grilling. Fish steaks are perfect for grilling because the bone helps hold the flesh together and adds flavor during cooking.",
    tagline: "Cross-section cuts",
    tools: ["Chef knife", "Cleaver", "Cutting board", "Paper towels"],
    steps: [
      "Scale and gut fish",
      "Remove head",
      "Cut 1-inch thick steaks",
      "Rinse and pat dry",
      "Remove bloodline if desired"
    ],
    tips: "Great for firm-fleshed fish like salmon. Salmon, tuna, and swordfish are excellent choices for steaks.",
    bestFor: "Grilling, broiling, baking",
    type: "cuts",
    meatType: "fish"
  },
  "meat-processing",
  "FishSteakCut.png"
);

addMeatGuide(
  "Fish Loin Cuts",
  {
    fullDesc: "Thick, center-cut portions from large fish like tuna, salmon, cod. Most premium cut. The loin is the thickest, most even part of the fish, prized by chefs for its perfect cooking characteristics and presentation.",
    tagline: "Premium center cuts",
    tools: ["Slicing knife", "Fillet knife", "Cutting board", "Paper towels"],
    steps: [
      "Remove dark bloodline",
      "Trim thin belly edge",
      "Cut crosswise into portions",
      "Remove pin bones",
      "Pat dry before cooking"
    ],
    tips: "Cook like steak - sear outside, rare inside. For tuna, a quick sear on all sides leaves the center rare and sashimi-like.",
    bestFor: "Searing, sushi/sashimi, grilling",
    type: "cuts",
    meatType: "fish"
  },
  "meat-processing",
  "FishLoincCut.png"
);

addMeatGuide(
  "Fish Tail Section Cuts",
  {
    fullDesc: "Tail section is thinner and leaner than center cuts. Cooks quickly, good value. The tail is often overlooked but offers great value - it cooks in minutes and is perfect for quick weeknight meals.",
    tagline: "Leaner rear portion",
    tools: ["Chef knife", "Fillet knife", "Cutting board", "Paper towels"],
    steps: [
      "Separate tail from loin",
      "Remove skin if desired",
      "Check for bones",
      "Portion into serving sizes",
      "Pat dry before cooking"
    ],
    tips: "More economical, great for sandwiches. The tail meat is perfect for fish tacos, sandwiches, and fish cakes.",
    bestFor: "Fish sandwiches, tacos, quick cooking",
    type: "cuts",
    meatType: "fish"
  },
  "meat-processing",
  "FishTailCut.png"
);

addMeatGuide(
  "Fish Head & Bones Cuts",
  {
    fullDesc: "Fish heads and bones are rich in collagen and flavor. Essential for fish stock. These 'scraps' are actually the foundation of many classic sauces and soups - don't throw them away if you want restaurant-quality results.",
    tagline: "For stocks and soups",
    tools: ["Cleaver", "Stock pot", "Cheesecloth", "Cutting board"],
    steps: [
      "Remove gills (bitter)",
      "Rinse thoroughly",
      "Chop into smaller pieces",
      "Cover with cold water",
      "Simmer 30-45 minutes"
    ],
    tips: "Never boil, skim foam, don't overcook. A simmer (not a boil) and short cooking time (30-45 minutes) produce the cleanest, most flavorful fish stock.",
    bestFor: "Fish stock, soups, bisques",
    type: "cuts",
    meatType: "fish"
  },
  "meat-processing",
  "FishHeadCut.png"
);

// ==================== GAME ====================
addMeatGuide(
  "Game Boning Knife",
  {
    fullDesc: "Flexible blade designed for venison, rabbit, and wild boar. Follows unique bone structures of game animals. Wild game has different fat distribution and bone structure than domestic meat, requiring a nimble knife that can follow unusual contours.",
    tagline: "Specialized for wild game",
    tools: ["6-inch boning knife", "Honing steel", "Cutting board", "Game shears"],
    steps: [
      "Remove hide/skin",
      "Follow natural muscle seams",
      "Cut along bone contours",
      "Remove silver skin",
      "Separate primal cuts"
    ],
    tips: "Game meat is lean, work carefully. The lack of marbling means game meat dries out quickly - handle minimally and cook with added fat.",
    bestFor: "Venison, rabbit, wild boar",
    type: "deboning",
    meatType: "game"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Game Shears",
  {
    fullDesc: "Heavy-duty shears for cutting through game bird bones, rabbit joints, and trimming wild game. Essential for processing wild birds and small game, where the bones are often too thick for standard poultry shears.",
    tagline: "Heavy-duty game processing",
    tools: ["Game shears", "Cutting board", "Cleaning brush", "Towels"],
    steps: [
      "Remove shot pellets",
      "Trim bruised meat",
      "Cut joints for portioning",
      "Remove silver skin",
      "Clean cavity thoroughly"
    ],
    tips: "Inspect carefully for shot. Always run your fingers through game meat to locate any remaining shot pellets before cooking.",
    bestFor: "Pheasant, quail, rabbit, venison trimming",
    type: "cleaning",
    meatType: "game"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Venison Cuts",
  {
    fullDesc: "Venison is very lean, deep red, and rich flavor. Similar structure to beef but much leaner. This wild meat requires special handling - the lack of fat means it's easy to overcook, but the reward is an intensely flavorful, healthy protein.",
    tagline: "Lean, rich deer meat",
    tools: ["Boning knife", "Breaking knife", "Game saw", "Cutting board"],
    steps: [
      "Remove silver skin (essential)",
      "Separate hindquarter, forequarter, loin",
      "Cut steaks from loin",
      "Cube shoulder for stew",
      "Grind trimmings"
    ],
    tips: "Add fat when grinding, don't overcook. Adding pork fat (about 20%) to ground venison creates burgers that rival beef.",
    bestFor: "Venison steaks, roasts, stew, jerky, burgers",
    type: "cuts",
    meatType: "game"
  },
  "meat-processing",
  "https://images.unsplash.com/photo-1607623814075-e51df0bdc416?auto=format&fit=crop&w=400"
);

addMeatGuide(
  "Rabbit Cuts",
  {
    fullDesc: "Rabbit is lean, mild, and similar to chicken. Whole rabbit can be roasted or cut into pieces. This delicate meat has a flavor profile between chicken and pork, with a tender texture that responds well to both quick and slow cooking methods.",
    tagline: "Delicate white meat",
    tools: ["Boning knife", "Game shears", "Cutting board", "Paper towels"],
    steps: [
      "Remove saddle (back)",
      "Separate hind legs",
      "Separate forelegs",
      "Cut loin into medallions",
      "Save bones for stock"
    ],
    tips: "Brine to keep moist, don't overcook. A simple brine of salt, sugar, and herbs for 4-6 hours helps keep rabbit moist during cooking.",
    bestFor: "Roasted rabbit, braised rabbit, rabbit stew",
    type: "cuts",
    meatType: "game"
  },
  "meat-processing",
  "RabbitCut.png"
);

addMeatGuide(
  "Pheasant/Quail Cuts",
  {
    fullDesc: "Pheasant and quail are lean game birds with delicate flavor. Similar to chicken but more refined. These wild birds have less fat than domestic poultry, requiring careful cooking to prevent drying out.",
    tagline: "Elegant game birds",
    tools: ["Game shears", "Boning knife", "Cutting board", "Butcher twine"],
    steps: [
      "Remove breast meat",
      "Separate legs and thighs",
      "French wing tips",
      "Save carcass for stock",
      "Truss for roasting"
    ],
    tips: "Bard with bacon to prevent drying. Wrapping the lean breast with bacon or salt pork adds moisture and flavor during roasting.",
    bestFor: "Roasted game birds, grilled, braised",
    type: "cuts",
    meatType: "game"
  },
  "meat-processing",
  "QuailCut.png"
);

addMeatGuide(
  "Elk/Moose Cuts",
  {
    fullDesc: "Similar to venison but milder, sweeter. Very lean, requires careful cooking. These large game animals produce substantial cuts that can be prepared like beef, but the leanness demands attention to prevent toughness.",
    tagline: "Lean, sweet venison",
    tools: ["Breaking knife", "Boning knife", "Game saw", "Cutting board"],
    steps: [
      "Remove all silver skin",
      "Separate primals",
      "Cut steaks from loin",
      "Cube for stew",
      "Grind trimmings with fat"
    ],
    tips: "Add pork fat when grinding. A 70/30 ratio of elk to pork fat produces excellent burgers and sausage.",
    bestFor: "Steaks, roasts, burgers, jerky",
    type: "cuts",
    meatType: "game"
  },
  "meat-processing",
  "ElkCut.png"
);

// ==================== MIGRATION FUNCTION ====================
const migrateMeatProcessing = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

   const admin = await User.findOne({ email: 'chefbot.ai.kitchen@gmail.com' });
    if (!admin) {
      console.error('❌ Admin not found! Please create admin first.');
      process.exit(1);
    }

    // Filter valid guides
    const validGuides = allMeatGuides.filter(g => g.title && g.content);
    console.log(`📊 Total meat guides prepared: ${allMeatGuides.length}`);
    console.log(`✅ Valid guides: ${validGuides.length}`);

    if (validGuides.length === 0) {
      console.warn('⚠️ No valid guides to insert!');
      process.exit(0);
    }

    // Insert with createdBy
    const toInsert = validGuides.map(g => ({ ...g, createdBy: admin._id }));
    const result = await BeginnersGuide.insertMany(toInsert);
    
    console.log(`✅ ${result.length} meat processing guides inserted successfully!`);
    console.log('📋 Categories added: meat-processing');
    process.exit(0);
    
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
};

migrateMeatProcessing();