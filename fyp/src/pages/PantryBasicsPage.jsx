import React, { useState } from 'react';
import './PantryBasicsPage.css';
import { useNavigate } from 'react-router-dom';
const PantryBasicsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
const [spiceCategory, setSpiceCategory] = useState('all');
const [staplesCategory, setStaplesCategory] = useState('all'); // Add this

const getFilteredSpices = () => {
    if (spiceCategory === 'all') return spicesData;
    return spicesData.filter(spice => spice.category === spiceCategory);
  };
  const getFilteredStaples = () => {
  if (staplesCategory === 'all') return staplesData;
  return staplesData.filter(item => item.category === staplesCategory);
};
// SECTION 1: KITCHEN BASICS DATA WITH TYPES
  const kitchenBasicsData = [
    {
      id: 1,
      name: "Rice",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
      tagline: "Main staple food for every meal",
      fullDesc: "Rice is a versatile grain that forms the base of many meals. Comes in varieties like Basmati, Jasmine, Brown, and White rice. It's a carbohydrate-rich food that provides energy and can be cooked in various ways including boiling, steaming, or frying.",
      storageTips: "Store in airtight container, keep away from moisture and pests. Use oxygen absorbers for long-term storage.",
      shelfLife: "White rice: 2-3 years, Brown rice: 6 months",
      keyUses: ["Biryani", "Plain rice", "Fried rice", "Rice pudding"],
      types: [
        {
          name: "Basmati Rice",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Long grain aromatic rice from India/Pakistan",
          cookingTime: "15-20 minutes",
          bestFor: "Biryani, Pulao, Fried Rice"
        },
        {
          name: "Brown Rice",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Whole grain rice with bran layer intact",
          cookingTime: "30-35 minutes",
          bestFor: "Healthy meals, Diabetic diets"
        },
        {
          name: "Jasmine Rice",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Fragrant rice from Thailand",
          cookingTime: "15-18 minutes",
          bestFor: "Thai curries, Sticky rice"
        },
        {
          name: "Sona Masoori",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Medium grain rice from South India",
          cookingTime: "12-15 minutes",
          bestFor: "Daily meals, Lemon rice"
        }
      ]
    },
    {
      id: 2,
      name: "Wheat Flour",
      image: "https://images.unsplash.com/photo-1625937320885-8e4d56fd8c57?auto=format&fit=crop&w=800",
      tagline: "Essential for breads and rotis",
      fullDesc: "Whole wheat flour or atta is used for making rotis, parathas, and various Indian breads. It contains the bran, germ, and endosperm of wheat, making it more nutritious than refined flour.",
      storageTips: "Store in airtight container in cool, dry place. Freeze for long-term storage.",
      shelfLife: "3-6 months",
      keyUses: ["Roti/Chapati", "Paratha", "Poori", "Bread"],
      types: [
        {
          name: "Whole Wheat (Atta)",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "Stone ground whole wheat flour",
          bestFor: "Roti, Chapati, Paratha"
        },
        {
          name: "All Purpose (Maida)",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "Refined wheat flour",
          bestFor: "Baking, Bread, Cakes"
        },
        {
          name: "Besan (Gram Flour)",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "Made from chickpeas",
          bestFor: "Pakoras, Kadhi, Cheela"
        },
        {
          name: "Semolina (Sooji)",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "Coarse wheat flour",
          bestFor: "Upma, Halwa, Rava Idli"
        }
      ]
    },
    {
      id: 3,
      name: "Cooking Oil",
      image: "https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&w=800",
      tagline: "Essential cooking medium",
      fullDesc: "Various types: Mustard oil, Vegetable oil, Olive oil, Coconut oil. Each has different smoking points and health benefits. Oils are used for frying, sautéing, and as a flavor carrier.",
      storageTips: "Store in dark glass bottles away from light. Keep in cool place to prevent rancidity.",
      shelfLife: "1-2 years (depends on type)",
      keyUses: ["Frying", "Sautéing", "Tempering", "Marinating"],
      types: [
        {
          name: "Mustard Oil",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Pungent oil from mustard seeds",
          smokePoint: "250°C",
          bestFor: "Indian cooking, Pickles"
        },
        {
          name: "Sunflower Oil",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Light neutral flavored oil",
          smokePoint: "230°C",
          bestFor: "Daily cooking, Frying"
        },
        {
          name: "Olive Oil",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Healthy oil from olives",
          smokePoint: "190°C",
          bestFor: "Salads, Italian, Low heat"
        },
        {
          name: "Coconut Oil",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Aromatic oil from coconuts",
          smokePoint: "175°C",
          bestFor: "South Indian, Baking"
        }
      ]
    },
    {
      id: 4,
      name: "Salt",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800",
      tagline: "Basic seasoning for all dishes",
      fullDesc: "Essential mineral for cooking and health. Available as table salt, sea salt, rock salt, and iodized salt. Salt enhances flavor, preserves food, and is necessary for bodily functions.",
      storageTips: "Store in airtight container to prevent clumping. Add rice grains to absorb moisture.",
      shelfLife: "Indefinite",
      keyUses: ["Seasoning", "Preserving", "Baking", "Marinating"],
      types: [
        {
          name: "Table Salt",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "Refined iodized salt",
          bestFor: "General cooking, Baking"
        },
        {
          name: "Sea Salt",
          image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=300",
          description: "Natural salt from seawater",
          bestFor: "Finishing, Salads"
        },
        {
          name: "Rock Salt",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "Large crystal Himalayan salt",
          bestFor: "Health drinks, Chaat"
        },
        {
          name: "Kosher Salt",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "Coarse grain salt",
          bestFor: "Meat, Professional cooking"
        }
      ]
    },
    {
      id: 5,
      name: "Sugar",
      image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=800",
      tagline: "Sweetening agent for desserts and drinks",
      fullDesc: "Comes in various forms: white sugar, brown sugar, jaggery, honey. Each has different flavor profiles and nutritional values. Sugar provides quick energy and enhances flavors in both sweet and savory dishes.",
      storageTips: "Store in airtight container away from moisture. Keep in cool, dry place.",
      shelfLife: "2+ years",
      keyUses: ["Tea/Coffee", "Desserts", "Baking", "Sweet dishes"],
      types: [
        {
          name: "White Sugar",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "Refined granulated sugar",
          bestFor: "Tea, Coffee, Baking"
        },
        {
          name: "Brown Sugar",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Sugar with molasses",
          bestFor: "Cookies, Cakes, Sauces"
        },
        {
          name: "Jaggery (Gur)",
          image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
          description: "Unrefined cane sugar",
          bestFor: "Indian sweets, Health drinks"
        },
        {
          name: "Honey",
          image: "https://images.unsplash.com/photo-1536599018109-73a2d2c5000f?auto=format&fit=crop&w=300",
          description: "Natural sweetener from bees",
          bestFor: "Health, Dressings, Drinks"
        }
      ]
    },
    {
      id: 6,
      name: "Tea/Coffee",
      image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=800",
      tagline: "Daily beverages",
      fullDesc: "Tea leaves or coffee beans/powder for morning and evening beverages. Essential for most households. Contains caffeine which provides energy and alertness. Both have antioxidants and health benefits when consumed in moderation.",
      storageTips: "Store in airtight containers away from strong odors. Keep in dark, cool place.",
      shelfLife: "6 months - 1 year",
      keyUses: ["Morning tea/coffee", "Evening drinks", "Guests"],
      types: [
        {
          name: "Assam Tea",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Strong Indian black tea",
          bestFor: "Masala chai, Milk tea"
        },
        {
          name: "Green Tea",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Unoxidized tea leaves",
          bestFor: "Health, Weight loss"
        },
        {
          name: "Coffee Beans",
          image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300",
          description: "Whole coffee beans",
          bestFor: "Fresh coffee, Espresso"
        },
        {
          name: "Instant Coffee",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "Solubilized coffee powder",
          bestFor: "Quick coffee, Baking"
        }
      ]
    },
    {
      id: 7,
      name: "Milk",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800",
      tagline: "Daily dairy essential",
      fullDesc: "Fresh milk or long-life milk packets. Can be used as-is or converted to curd, paneer, butter, ghee. Rich in calcium, protein, and vitamins. Essential for children's growth and bone health.",
      storageTips: "Refrigerate immediately, use within expiry date. Freeze milk for longer storage.",
      shelfLife: "Fresh: 2-3 days, UHT: 6 months unopened",
      keyUses: ["Tea/Coffee", "Cereals", "Cooking", "Desserts"],
      types: [
        {
          name: "Fresh Milk",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Pasteurized cow/buffalo milk",
          bestFor: "Daily use, Tea, Coffee"
        },
        {
          name: "UHT Milk",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Long shelf life milk",
          bestFor: "Storage, Emergency"
        },
        {
          name: "Soy Milk",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Plant based milk",
          bestFor: "Vegans, Lactose intolerant"
        },
        {
          name: "Almond Milk",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Nut based milk",
          bestFor: "Health, Low calorie"
        }
      ]
    },
    {
      id: 8,
      name: "Vinegar",
      image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800",
      tagline: "Acidic preservative and flavor enhancer",
      fullDesc: "Used for pickling, marinades, and adding tang to dishes. Types: white vinegar, apple cider vinegar. Vinegar is acidic and helps in preserving food, tenderizing meat, and balancing flavors in dishes.",
      storageTips: "Store in cool, dark place. Keep bottle tightly closed.",
      shelfLife: "Indefinite",
      keyUses: ["Pickling", "Marinades", "Salad dressings", "Cleaning"],
      types: [
        {
          name: "White Vinegar",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "Clear distilled vinegar",
          bestFor: "Pickling, Cleaning"
        },
        {
          name: "Apple Cider",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "Vinegar from apples",
          bestFor: "Health, Salad dressings"
        },
        {
          name: "Balsamic",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "Aged Italian vinegar",
          bestFor: "Salads, Gourmet dishes"
        },
        {
          name: "Rice Vinegar",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "Mild Asian vinegar",
          bestFor: "Sushi, Asian cuisine"
        }
      ]
    }
  ];

// ===== SPICES DATA WITH CATEGORIES =====
const spicesData = [
  // 🌿 WHOLE SPICES (Sabut Masale) - 20 items
  {
    id: 101,
    name: "Cumin Seeds",
    urduName: "زیرہ",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "zeera.png",
    tagline: "Warm, earthy flavor essential for tempering",
    fullDesc: "Cumin seeds are a staple spice in Indian cooking. They have a warm, earthy flavor with slight bitterness. Used whole for tempering (tadka) in dals, curries, and rice dishes. Also ground into powder for various spice blends.",
    keyFeatures: ["Earthy aroma", "Digestive aid", "Essential for tadka", "Rich in iron"],
    properUsage: "Add to hot oil for tempering, toast lightly before grinding",
    commonMistakes: ["Burning in hot oil", "Using stale seeds", "Not toasting before grinding"],
    types: [
      {
        name: "Regular Cumin",
        description: "Standard variety, light brown",
        bestFor: "Everyday cooking, tadka"
      },
      {
        name: "Black Cumin (Shah Zeera)",
        description: "Darker, sweeter, more aromatic",
        bestFor: "Biryani, rich dishes, Kashmiri cuisine"
      }
    ]
  },
  {
    id: 102,
    name: "Coriander Seeds",
    urduName: "دھنیا",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "dhania.png",
    tagline: "Citrusy, floral seeds that form curry base",
    fullDesc: "Coriander seeds have a warm, citrusy, slightly sweet flavor. They are a fundamental spice in Indian cuisine, used both whole and ground. Combined with cumin to form the base of many curries.",
    keyFeatures: ["Citrus notes", "Cooling effect", "Versatile use", "Digestive properties"],
    properUsage: "Dry roast until fragrant, grind for powder, use whole in pickles",
    commonMistakes: ["Over-roasting (becomes bitter)", "Buying pre-ground only", "Not storing properly"],
    types: [
      {
        name: "Whole Coriander",
        description: "Round, beige seeds",
        bestFor: "Curries, spice blends, pickling"
      },
      {
        name: "Ground Coriander",
        description: "Powdered form",
        bestFor: "Quick cooking, marinades"
      }
    ]
  },
  {
    id: 103,
    name: "Fennel Seeds",
    urduName: "سونف",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "saunf.png",
    tagline: "Sweet, licorice-like seeds for flavor and digestion",
    fullDesc: "Fennel seeds have a sweet, licorice-like flavor with cooling properties. Commonly used as mouth freshener after meals, in teas, and as spice in curries, breads, and pickles.",
    keyFeatures: ["Sweet aroma", "Digestive aid", "Mouth freshener", "Cooling effect"],
    properUsage: "Chew raw after meals, use in tempering, grind for spice blends",
    commonMistakes: ["Overpowering dishes", "Using too many seeds", "Not roasting before use"],
    types: [
      {
        name: "Sweet Fennel",
        description: "Common variety, greenish",
        bestFor: "Mouth freshener, curries"
      },
      {
        name: "Roasted Fennel",
        description: "Toasted for enhanced flavor",
        bestFor: "Tea, digestive aids"
      }
    ]
  },
  {
    id: 104,
    name: "Fenugreek Seeds",
    urduName: "میتھی دانہ",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "methi-dana.png",
    tagline: "Bitter seeds that add depth to pickles and curries",
    fullDesc: "Fenugreek seeds have a strong, bitter taste with maple-like aroma. Used in pickles, curry powders, and as flavoring agent. Also known for medicinal properties including blood sugar control.",
    keyFeatures: ["Bitter taste", "Maple aroma when roasted", "Medicinal properties", "Strong flavor"],
    properUsage: "Soak before use, roast to reduce bitterness, use sparingly",
    commonMistakes: ["Using too much (overpowers dish)", "Not roasting raw seeds", "Skipping soaking"],
    types: [
      {
        name: "Whole Methi Dana",
        description: "Small, hard, brown seeds",
        bestFor: "Pickles, spice blends"
      },
      {
        name: "Sprouted Methi",
        description: "Germinated seeds",
        bestFor: "Salads, less bitter"
      }
    ]
  },
  {
    id: 105,
    name: "Mustard Seeds",
    urduName: "رائی / سرسوں",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "rai.png",
    tagline: "Pungent seeds that crackle in hot oil",
    fullDesc: "Mustard seeds are tiny, pungent seeds that pop when added to hot oil, releasing nutty flavor. Essential for tempering in South Indian cooking, pickles, and curries.",
    keyFeatures: ["Pungent flavor", "Crackling sound in oil", "Preservative properties", "Rich in oils"],
    properUsage: "Add to hot oil until they pop, grind for paste, use in pickles",
    commonMistakes: ["Burning in oil", "Using stale seeds", "Not letting them pop"],
    types: [
      {
        name: "Brown Mustard",
        description: "Common in Indian cooking",
        bestFor: "Tadka, curries, pickles"
      },
      {
        name: "Yellow Mustard",
        description: "Milder, larger seeds",
        bestFor: "Western cooking, mustard sauce"
      },
      {
        name: "Black Mustard",
        description: "Strongest flavor",
        bestFor: "Bengali cuisine, pickling"
      }
    ]
  },
  {
    id: 106,
    name: "Carom Seeds",
    urduName: "اجوائن",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "ajwain.png",
    tagline: "Thyme-like seeds for digestion and breads",
    fullDesc: "Carom seeds look like small cumin but taste like thyme with strong pungency. Excellent for digestion, used in breads, parathas, and lentil dishes. Also helps relieve gas and indigestion.",
    keyFeatures: ["Thyme-like flavor", "Powerful digestive", "Strong aroma", "Medicinal properties"],
    properUsage: "Use sparingly, crush slightly before use, add to dough",
    commonMistakes: ["Using too much (very strong)", "Not crushing", "Skipping in heavy meals"],
    types: [
      {
        name: "Regular Ajwain",
        description: "Common variety",
        bestFor: "Breads, lentil dishes"
      },
      {
        name: "Carom Oil",
        description: "Extracted essential oil",
        bestFor: "Medicinal use"
      }
    ]
  },
  {
    id: 107,
    name: "Nigella Seeds",
    urduName: "کلونجی",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "kalonji.png",
    tagline: "Black seeds with onion-like flavor",
    fullDesc: "Also known as onion seeds or black cumin. Have a slightly bitter, onion-like flavor. Used in naan bread, pickles, and vegetable dishes. Believed to have numerous health benefits.",
    keyFeatures: ["Onion-like taste", "Black triangular seeds", "Medicinal properties", "Aromatic"],
    properUsage: "Sprinkle on breads before baking, use in pickles, temper in oil",
    commonMistakes: ["Confusing with black sesame", "Using too many seeds", "Not toasting"],
    types: [
      {
        name: "Kalonji Seeds",
        description: "Small black seeds",
        bestFor: "Naan, pickles, vegetable dishes"
      },
      {
        name: "Kalonji Oil",
        description: "Extracted oil",
        bestFor: "Medicinal use, hair care"
      }
    ]
  },
  {
    id: 108,
    name: "Poppy Seeds",
    urduName: "خشخاش",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "khas-khas.png",
    tagline: "Creamy white seeds for thickening and flavor",
    fullDesc: "Poppy seeds are tiny, oil-rich seeds with nutty flavor. Used in Indian cuisine for thickening curries, in spice blends, and in sweets. Ground to paste for creamy gravies.",
    keyFeatures: ["Creamy texture when ground", "Nutty flavor", "Thickening agent", "Mild sedative properties"],
    properUsage: "Soak and grind for paste, roast dry for sprinkling",
    commonMistakes: ["Not grinding finely enough", "Using stale seeds", "Skipping soaking"],
    types: [
      {
        name: "White Poppy Seeds",
        description: "Common in Indian cooking",
        bestFor: "Curries, korma, thickening"
      },
      {
        name: "Black Poppy Seeds",
        description: "Smaller, stronger flavor",
        bestFor: "Baking, sprinkling"
      }
    ]
  },
  {
    id: 109,
    name: "Sesame Seeds",
    urduName: "تل",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "til.png",
    tagline: "Nutty seeds for tempering, sweets, and garnishing",
    fullDesc: "Sesame seeds are tiny, flat seeds with nutty flavor when roasted. Used in tempering, in sweets like til ke laddoo, sprinkled on breads, and ground into tahini.",
    keyFeatures: ["Nutty flavor when roasted", "High in oil", "Rich in calcium", "Versatile use"],
    properUsage: "Roast until golden for enhanced flavor, use in tempering, grind for paste",
    commonMistakes: ["Burning while roasting", "Using untoasted in some dishes", "Not storing in cool place"],
    types: [
      {
        name: "White Sesame",
        description: "Common variety",
        bestFor: "General cooking, sweets"
      },
      {
        name: "Black Sesame",
        description: "More intense flavor",
        bestFor: "Garnishing, medicinal use"
      }
    ]
  },
  {
    id: 110,
    name: "Celery Seeds",
    urduName: "اجوائن (اجمود)",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "ajmod.png",
    tagline: "Strong celery-flavored tiny seeds",
    fullDesc: "Celery seeds are tiny brown seeds with strong celery flavor. Used in pickling, spice blends, and as seasoning. Not as common in everyday Indian cooking but used in some regional cuisines.",
    keyFeatures: ["Strong celery taste", "Tiny seeds", "Aromatic", "Good for pickling"],
    properUsage: "Use sparingly due to strong flavor, crush before use",
    commonMistakes: ["Using too many seeds", "Not crushing for flavor release"],
    types: [
      {
        name: "Whole Celery Seeds",
        description: "Small brown seeds",
        bestFor: "Pickling, spice blends"
      },
      {
        name: "Ground Celery",
        description: "Powdered form",
        bestFor: "Seasoning, rubs"
      }
    ]
  },
  {
    id: 111,
    name: "Dill Seeds",
    urduName: "سووا / سونف",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "sowa.png",
    tagline: "Aromatic seeds similar to fennel but milder",
    fullDesc: "Dill seeds are similar to fennel but milder and more aromatic. Used in pickling, breads, and some vegetable dishes. Also have digestive properties.",
    keyFeatures: ["Mild fennel-like flavor", "Aromatic", "Digestive aid", "Good for pickling"],
    properUsage: "Use in pickles, crush for breads, add to vegetable dishes",
    commonMistakes: ["Confusing with fennel", "Using too many seeds"],
    types: [
      {
        name: "European Dill",
        description: "Common variety",
        bestFor: "Pickling, breads"
      },
      {
        name: "Indian Dill",
        description: "Milder variety",
        bestFor: "Vegetable dishes"
      }
    ]
  },
  {
    id: 112,
    name: "Aniseed",
    urduName: "ولایتی سونف",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "vilayati-saunf.png",
    tagline: "Sweet licorice-flavored seeds",
    fullDesc: "Aniseed has strong licorice flavor, sweeter than fennel. Used in baking, teas, and some spice blends. Different from Indian fennel (saunf) but sometimes confused.",
    keyFeatures: ["Strong licorice flavor", "Sweet taste", "Aromatic", "Digestive properties"],
    properUsage: "Use in baked goods, teas, chew after meals",
    commonMistakes: ["Confusing with fennel", "Overpowering dishes"],
    types: [
      {
        name: "Whole Aniseed",
        description: "Small gray-brown seeds",
        bestFor: "Baking, teas"
      },
      {
        name: "Star Anise",
        description: "Different spice altogether",
        bestFor: "Chinese cooking, biryani"
      }
    ]
  },
  {
    id: 113,
    name: "Caraway Seeds",
    urduName: "سیاہ زیرہ",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "kala-zeera.png",
    tagline: "Dark, aromatic seeds for rich dishes",
    fullDesc: "Caraway seeds are darker and more aromatic than regular cumin. Used in Mughlai cuisine, biryanis, and some breads. More expensive and used sparingly.",
    keyFeatures: ["Dark color", "Strong aroma", "Sweet flavor", "Premium spice"],
    properUsage: "Use whole in biryanis, crush for spice blends, use sparingly",
    commonMistakes: ["Confusing with cumin", "Using too many (very strong)"],
    types: [
      {
        name: "Kashmiri Cumin",
        description: "Premium variety",
        bestFor: "Biryani, rich curries"
      },
      {
        name: "European Caraway",
        description: "Common in Western cooking",
        bestFor: "Rye bread, sauerkraut"
      }
    ]
  },
  {
    id: 114,
    name: "Bishop's Weed",
    urduName: "اجوائن (دوسری قسم)",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "ajwain-2.png",
    tagline: "Strong digestive seeds, similar to carom",
    fullDesc: "Similar to carom seeds but slightly different. Used in pickles, breads, and as digestive aid. Common in North Indian cooking.",
    keyFeatures: ["Strong flavor", "Digestive aid", "Aromatic", "Used in pickles"],
    properUsage: "Crush slightly before use, add to dough, use in tempering",
    commonMistakes: ["Using too much", "Not crushing seeds"],
    types: [
      {
        name: "Regular Ajwain",
        description: "Common variety",
        bestFor: "Breads, lentil dishes"
      }
    ]
  },
  {
    id: 115,
    name: "Radhuni",
    urduName: "اجوائن (بنگالی)",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "ajmod-bengali.png",
    tagline: "Bengali spice similar to celery seeds",
    fullDesc: "Radhuni is a Bengali spice similar to celery seeds but with stronger flavor. Essential in Bengali five-spice blend (panch phoron) and fish curries.",
    keyFeatures: ["Strong aroma", "Essential for panch phoron", "Used in Bengali cuisine", "Unique flavor"],
    properUsage: "Use in panch phoron, temper in oil for fish curries",
    commonMistakes: ["Using too many seeds", "Substituting incorrectly"],
    types: [
      {
        name: "Radhuni Seeds",
        description: "Small brown seeds",
        bestFor: "Bengali cuisine, fish curries"
      }
    ]
  },
  {
    id: 116,
    name: "Cubeb Pepper",
    urduName: "کباب چینی",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "kabab-chini.png",
    tagline: "Aromatic pepper with tail-like stem",
    fullDesc: "Cubeb pepper looks like black pepper but with a stem. Has a camphor-like aroma and pungent taste. Used in spice blends, biryanis, and some medicinal preparations.",
    keyFeatures: ["Tail-like stem", "Camphor aroma", "Pungent taste", "Less common"],
    properUsage: "Use whole in biryanis, grind for spice blends",
    commonMistakes: ["Confusing with black pepper", "Using too many"],
    types: [
      {
        name: "Whole Cubeb",
        description: "With stem attached",
        bestFor: "Biryani, spice blends"
      }
    ]
  },
  {
    id: 117,
    name: "Stone Flower",
    urduName: "داگڑ پھول / پتھر کا پھول",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "dagad-phool.png",
    tagline: "Earthy, mushroom-like lichen for spice blends",
    fullDesc: "Stone flower is a lichen used in spice blends like Goda masala and some biryanis. Has earthy, mushroom-like flavor. Not a seed but included here as whole spice.",
    keyFeatures: ["Earthy flavor", "Lichen (not seed)", "Used in Goda masala", "Unique aroma"],
    properUsage: "Soak before use, grind in spice blends, use sparingly",
    commonMistakes: ["Using too much (bitter)", "Not soaking", "Skipping in regional blends"],
    types: [
      {
        name: "Dagad Phool",
        description: "Blackish lichen",
        bestFor: "Goda masala, biryani"
      }
    ]
  },
  {
    id: 118,
    name: "Black Pepper",
    urduName: "کالی مرچ",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "kali-mirch.png",
    tagline: "The king of spices, pungent and versatile",
    fullDesc: "Black pepper is the most widely used spice globally. Has pungent, hot flavor from piperine. Used whole in spice blends, crushed for marinades, ground for table use. Essential in every kitchen.",
    keyFeatures: ["Pungent heat", "Most traded spice", "Digestive stimulant", "Universal seasoning"],
    properUsage: "Grind fresh for best flavor, use whole in pickling and spice blends",
    commonMistakes: ["Using pre-ground only", "Not grinding fresh", "Storing in light"],
    types: [
      {
        name: "Tellicherry Pepper",
        description: "Premium large berries",
        bestFor: "Fine dining, fresh grinding"
      },
      {
        name: "Malabar Pepper",
        description: "Classic Indian variety",
        bestFor: "Everyday use"
      },
      {
        name: "Green Peppercorns",
        description: "Unripe, milder",
        bestFor: "Pickling, sauces"
      }
    ]
  },
  {
    id: 119,
    name: "Long Pepper",
    urduName: "پیپلی",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "pippali.png",
    tagline: "Ancient spice, hotter and more complex than black pepper",
    fullDesc: "Long pepper looks like a catkin and has a hotter, more complex flavor than black pepper. Used in Ayurvedic medicine, spice blends, and pickles. Was more common in ancient times.",
    keyFeatures: ["Catkin-like appearance", "Complex heat", "Ayurvedic uses", "Ancient spice"],
    properUsage: "Use whole in spice blends, grind for medicinal preparations",
    commonMistakes: ["Confusing with black pepper", "Using too much"],
    types: [
      {
        name: "Pippali",
        description: "Indian long pepper",
        bestFor: "Ayurvedic remedies"
      },
      {
        name: "Indonesian Long Pepper",
        description: "Different variety",
        bestFor: "Spice blends"
      }
    ]
  },
  {
    id: 120,
    name: "Dried Red Chili",
    urduName: "سوکھی لال مرچ",
    category: "whole",
    categoryDisplay: "Whole Spices",
    image: "sookhi-lal-mirch.png",
    tagline: "Whole dried chilies for heat and color",
    fullDesc: "Whole dried red chilies are used in Indian cooking for heat and color. Can be used whole in tempering, broken into pieces, or ground into powder. Different varieties provide different heat levels.",
    keyFeatures: ["Provides heat", "Adds red color", "Long shelf life", "Varieties for different uses"],
    properUsage: "Add whole to hot oil for tempering, soak and grind for paste, break for heat control",
    commonMistakes: ["Burning (becomes bitter)", "Using wrong variety for dish", "Not adjusting for heat"],
    types: [
      {
        name: "Kashmiri Chili",
        description: "Mild heat, deep red color",
        bestFor: "Color-rich dishes, tandoori"
      },
      {
        name: "Guntur Chili",
        description: "Very hot, bright red",
        bestFor: "Spicy curries, Andhra cuisine"
      },
      {
        name: "Byadgi Chili",
        description: "Moderate heat, deep color",
        bestFor: "Rasam, sambar"
      }
    ]
  },

  // 🌶️ GROUND SPICES (Pisay Masale) - 15 items
  {
    id: 201,
    name: "Turmeric Powder",
    urduName: "ہلدی",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "haldi.png",
    tagline: "Golden spice for color, flavor, and health",
    fullDesc: "Turmeric powder is the ground form of turmeric root. Gives yellow color to curries, has earthy flavor, and is prized for anti-inflammatory properties. Essential in almost every Indian dish.",
    keyFeatures: ["Golden yellow color", "Earthy flavor", "Anti-inflammatory", "Preservative properties"],
    properUsage: "Add early in cooking to mellow raw flavor, use small amounts",
    commonMistakes: ["Adding too much (bitter)", "Using stale powder", "Not cooking out raw flavor"],
    types: [
      {
        name: "Regular Turmeric",
        description: "Common variety",
        bestFor: "Everyday cooking"
      },
      {
        name: "Kasturi Turmeric",
        description: "More aromatic",
        bestFor: "Skin care, special dishes"
      }
    ]
  },
  {
    id: 202,
    name: "Red Chili Powder",
    urduName: "لال مرچ پاؤڈر",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "lal-mirch-powder.png",
    tagline: "Ground chilies for heat in every bite",
    fullDesc: "Red chili powder is the ground form of dried red chilies. Provides heat and some color to dishes. Heat level varies by chili variety used. Essential in most Indian curries.",
    keyFeatures: ["Provides heat", "Adds some color", "Quick to use", "Various heat levels"],
    properUsage: "Add during cooking, mix well, adjust amount to taste",
    commonMistakes: ["Using too much (overpowers)", "Using low-quality powder (less color)", "Not adjusting for spice tolerance"],
    types: [
      {
        name: "Kashmiri Chili Powder",
        description: "Mild heat, deep red color",
        bestFor: "Color-rich dishes"
      },
      {
        name: "Regular Chili Powder",
        description: "Moderate heat",
        bestFor: "Everyday cooking"
      },
      {
        name: "Extra Hot Powder",
        description: "Very spicy",
        bestFor: "Spicy cuisine, Andhra food"
      }
    ]
  },
  {
    id: 203,
    name: "Cumin Powder",
    urduName: "زیرہ پاؤڈر",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "zeera-powder.png",
    tagline: "Ground cumin for quick earthy flavor",
    fullDesc: "Cumin powder is ground from roasted or raw cumin seeds. Adds warm, earthy flavor to dishes quickly. Used in curries, marinades, spice blends, and as finishing spice.",
    keyFeatures: ["Earthy flavor", "Quick to use", "Essential in garam masala", "Digestive aid"],
    properUsage: "Add during cooking or as finishing, best when ground fresh",
    commonMistakes: ["Using stale powder", "Not roasting before grinding", "Adding too much"],
    types: [
      {
        name: "Roasted Cumin Powder",
        description: "More nutty, less raw",
        bestFor: "Finishing, chaat"
      },
      {
        name: "Raw Cumin Powder",
        description: "Stronger flavor",
        bestFor: "Curries, cooking"
      }
    ]
  },
  {
    id: 204,
    name: "Coriander Powder",
    urduName: "دھنیا پاؤڈر",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "dhania-powder.png",
    tagline: "Citrusy ground spice for curry base",
    fullDesc: "Coriander powder is ground coriander seeds. Has mild, citrusy, slightly sweet flavor. Forms the bulk of many curry powders along with cumin. Used in large quantities as base spice.",
    keyFeatures: ["Citrus notes", "Mild flavor", "Bulk of curry powders", "Cooling effect"],
    properUsage: "Use generously as base spice, add early in cooking",
    commonMistakes: ["Using too little (curry lacks depth)", "Using stale powder", "Not roasting"],
    types: [
      {
        name: "Regular Coriander Powder",
        description: "Standard grind",
        bestFor: "Everyday cooking"
      },
      {
        name: "Freshly Ground",
        description: "More aromatic",
        bestFor: "Special dishes"
      }
    ]
  },
  {
    id: 205,
    name: "Garam Masala Powder",
    urduName: "گرم مصالحہ",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "garam-masala.png",
    tagline: "Aromatic spice blend for finishing rich dishes",
    fullDesc: "Garam masala is a blend of warming spices like cardamom, cinnamon, cloves, and cumin. Added at the end of cooking for aroma. Different regions have different recipes.",
    keyFeatures: ["Complex aroma", "Warming spices", "Added at end", "Regional variations"],
    properUsage: "Add at end of cooking, sprinkle as garnish, use sparingly",
    commonMistakes: ["Adding too early (loses aroma)", "Using too much", "Buying low-quality blend"],
    types: [
      {
        name: "Punjabi Garam Masala",
        description: "Hearty, robust",
        bestFor: "North Indian curries"
      },
      {
        name: "Lucknowi Garam Masala",
        description: "More aromatic, delicate",
        bestFor: "Awadhi cuisine, biryani"
      },
      {
        name: "Homemade Blend",
        description: "Fresh, customizable",
        bestFor: "Best flavor"
      }
    ]
  },
  {
    id: 206,
    name: "Black Pepper Powder",
    urduName: "کالی مرچ پاؤڈر",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "kali-mirch-powder.png",
    tagline: "Ground pepper for instant pungent heat",
    fullDesc: "Ground black pepper is used for quick addition of pungent heat. Often used in Western dishes, marinades, and as table seasoning. Best when ground fresh from whole peppercorns.",
    keyFeatures: ["Pungent heat", "Universal seasoning", "Quick to use", "Best fresh"],
    properUsage: "Add near end of cooking, use as finishing spice",
    commonMistakes: ["Using pre-ground only", "Adding too early (loses punch)"],
    types: [
      {
        name: "Fine Ground",
        description: "Standard powder",
        bestFor: "General use"
      },
      {
        name: "Coarse Ground",
        description: "Cracked pepper",
        bestFor: "Steaks, marinades"
      }
    ]
  },
  {
    id: 207,
    name: "Dry Ginger Powder",
    urduName: "سونٹھ",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "sonth.png",
    tagline: "Pungent dried ginger for spice blends",
    fullDesc: "Dry ginger powder (sonth) is made from dried ginger root. More pungent and concentrated than fresh ginger. Used in spice blends, teas, and some sweets.",
    keyFeatures: ["Concentrated pungency", "Long shelf life", "Used in spice blends", "Ayurvedic uses"],
    properUsage: "Use sparingly, rehydrate for some uses, add to spice blends",
    commonMistakes: ["Substituting fresh ginger directly", "Using too much", "Confusing with fresh"],
    types: [
      {
        name: "Sonth",
        description: "Indian dry ginger",
        bestFor: "Spice blends, chai"
      },
      {
        name: "Ground Ginger",
        description: "Western style",
        bestFor: "Baking"
      }
    ]
  },
  {
    id: 208,
    name: "Mango Powder",
    urduName: "آمچور",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "amchoor.png",
    tagline: "Tangy souring agent from dried mango",
    fullDesc: "Amchoor is made from dried unripe green mangoes. Adds sourness without moisture. Used in chaats, curries, and spice blends like chaat masala.",
    keyFeatures: ["Tangy flavor", "Dry souring agent", "Fruity notes", "Essential for chaat"],
    properUsage: "Add at end of cooking for tang, use in marinades",
    commonMistakes: ["Using lemon juice instead (adds moisture)", "Adding too early", "Not storing airtight"],
    types: [
      {
        name: "Amchoor Powder",
        description: "Standard form",
        bestFor: "Curries, chaat"
      },
      {
        name: "Dried Mango Slices",
        description: "Whole form",
        bestFor: "Pickles, grinding fresh"
      }
    ]
  },
  {
    id: 209,
    name: "Pomegranate Seed Powder",
    urduName: "انار دانہ",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "anardana.png",
    tagline: "Tangy-sweet powder from dried pomegranate",
    fullDesc: "Anardana is made from dried pomegranate seeds. Has tangy-sweet flavor. Used in chutneys, curries, and as souring agent in some dishes.",
    keyFeatures: ["Tangy-sweet flavor", "Dried seeds", "Used in chutneys", "Digestive properties"],
    properUsage: "Grind to powder or use whole, add to curries for tang",
    commonMistakes: ["Using too much (very tangy)", "Not grinding when needed"],
    types: [
      {
        name: "Whole Anardana",
        description: "Dried seeds",
        bestFor: "Chutneys, grinding"
      },
      {
        name: "Ground Anardana",
        description: "Powdered form",
        bestFor: "Quick use in curries"
      }
    ]
  },
  {
    id: 210,
    name: "Asafoetida",
    urduName: "ہینگ",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "hing.png",
    tagline: "Pungent resin that adds onion-garlic flavor",
    fullDesc: "Asafoetida is a dried resin with strong, pungent smell that becomes onion-garlic like when cooked. Used in small amounts in lentil dishes and vegetarian cooking. Aids digestion.",
    keyFeatures: ["Strong pungent smell (cooking mellows)", "Onion-garlic substitute", "Digestive aid", "Used in small amounts"],
    properUsage: "Add to hot oil/ghee at start of cooking, use tiny pinch only",
    commonMistakes: ["Using too much (overpowers)", "Adding raw (smell remains)", "Not using in lentils"],
    types: [
      {
        name: "Compounded Hing",
        description: "Mixed with flour, common",
        bestFor: "Everyday cooking"
      },
      {
        name: "Pure Hing",
        description: "Pure resin, stronger",
        bestFor: "Medicinal use, strong flavor"
      }
    ]
  },
  {
    id: 211,
    name: "Clove Powder",
    urduName: "لونگ پاؤڈر",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "laung-powder.png",
    tagline: "Intensely aromatic ground cloves",
    fullDesc: "Clove powder is ground from dried clove buds. Has intense, sweet, pungent aroma. Used sparingly in spice blends, garam masala, and some desserts.",
    keyFeatures: ["Intense aroma", "Numbing effect", "Sweet-pungent taste", "Used sparingly"],
    properUsage: "Use tiny amounts, add to spice blends",
    commonMistakes: ["Using too much (medicinal taste)", "Not grinding fresh"],
    types: [
      {
        name: "Whole Cloves",
        description: "For grinding fresh",
        bestFor: "Best flavor"
      },
      {
        name: "Ground Cloves",
        description: "Pre-ground",
        bestFor: "Convenience"
      }
    ]
  },
  {
    id: 212,
    name: "Cardamom Powder",
    urduName: "الائچی پاؤڈر",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "elaichi-powder.png",
    tagline: "Sweet, floral powder for desserts and chai",
    fullDesc: "Cardamom powder is ground from green cardamom pods. Has sweet, floral, citrusy aroma. Used in chai, desserts, spice blends, and some savory dishes.",
    keyFeatures: ["Sweet floral aroma", "Expensive", "Essential for chai", "Used in desserts"],
    properUsage: "Add at end of cooking, use in baking, sprinkle on desserts",
    commonMistakes: ["Adding too early (loses aroma)", "Using pre-ground only", "Not removing pods before grinding"],
    types: [
      {
        name: "Green Cardamom Powder",
        description: "Sweet, aromatic",
        bestFor: "Desserts, chai"
      },
      {
        name: "Black Cardamom Powder",
        description: "Smoky, camphor-like",
        bestFor: "Savory dishes, biryani"
      }
    ]
  },
  {
    id: 213,
    name: "Cinnamon Powder",
    urduName: "دار چینی پاؤڈر",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "dalchini-powder.png",
    tagline: "Sweet, warm powder for baking and curries",
    fullDesc: "Cinnamon powder is ground from cinnamon bark. Has sweet, warm flavor. Used in baking, spice blends, and some curries. Two types: Ceylon (true) and Cassia.",
    keyFeatures: ["Sweet warmth", "Two varieties", "Used in sweet and savory", "Aromatic"],
    properUsage: "Add to baking, use in spice blends, sprinkle on desserts",
    commonMistakes: ["Confusing Ceylon with Cassia", "Adding too much (overpowers)", "Using stale powder"],
    types: [
      {
        name: "Ceylon Cinnamon",
        description: "True cinnamon, milder",
        bestFor: "Baking, desserts"
      },
      {
        name: "Cassia Cinnamon",
        description: "Stronger, common",
        bestFor: "Curries, spice blends"
      }
    ]
  },
  {
    id: 214,
    name: "Nutmeg Powder",
    urduName: "جائفل پاؤڈر",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "jaiphal-powder.png",
    tagline: "Warm, nutty powder for small amounts",
    fullDesc: "Nutmeg powder is ground from nutmeg seeds. Has warm, nutty, slightly sweet flavor. Used in very small amounts in desserts, spice blends, and some savory dishes like korma.",
    keyFeatures: ["Warm, nutty flavor", "Use very sparingly", "Slightly sweet", "Aromatic"],
    properUsage: "Grate fresh for best flavor, use tiny pinch only",
    commonMistakes: ["Using too much (toxic in large amounts)", "Not grating fresh", "Confusing with mace"],
    types: [
      {
        name: "Whole Nutmeg",
        description: "Grate as needed",
        bestFor: "Fresh flavor"
      },
      {
        name: "Ground Nutmeg",
        description: "Pre-ground",
        bestFor: "Convenience"
      }
    ]
  },
  {
    id: 215,
    name: "Mace Powder",
    urduName: "جاوتری پاؤڈر",
    category: "ground",
    categoryDisplay: "Ground Spices",
    image: "javitri-powder.png",
    tagline: "Delicate, warm powder from nutmeg covering",
    fullDesc: "Mace is the lacy covering around nutmeg seed. Has similar but more delicate flavor than nutmeg. Used in light-colored dishes, korma, and spice blends.",
    keyFeatures: ["Delicate nutmeg flavor", "More expensive", "Used in light dishes", "Aromatic"],
    properUsage: "Use small amounts, add to light curries and spice blends",
    commonMistakes: ["Confusing with nutmeg", "Using too much", "Not storing properly"],
    types: [
      {
        name: "Whole Mace",
        description: "Blades of mace",
        bestFor: "Fresh grinding"
      },
      {
        name: "Ground Mace",
        description: "Powdered form",
        bestFor: "Convenience"
      }
    ]
  },

  // 🌰 AROMATIC SPICES (Khushbodar Masale) - 12 items
  {
    id: 301,
    name: "Green Cardamom",
    urduName: "چھوٹی الائچی",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "choti-elaichi.png",
    tagline: "The queen of spices, sweet and floral",
    fullDesc: "Green cardamom is one of the most aromatic spices. Small green pods containing black seeds. Used in chai, desserts, biryanis, and spice blends. Known as the 'queen of spices'.",
    keyFeatures: ["Sweet floral aroma", "Expensive", "Versatile use", "Digestive aid"],
    properUsage: "Crush lightly before use, add to chai, use whole in biryani",
    commonMistakes: ["Using too many pods", "Not crushing to release flavor", "Storing without airtight container"],
    types: [
      {
        name: "Small Green Cardamom",
        description: "Most common",
        bestFor: "Chai, desserts, garam masala"
      },
      {
        name: "Large Green Cardamom",
        description: "Less common",
        bestFor: "Rice dishes"
      }
    ]
  },
  {
    id: 302,
    name: "Black Cardamom",
    urduName: "بڑی الائچی",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "badi-elaichi.png",
    tagline: "Smoky, camphor-like large pods",
    fullDesc: "Black cardamom has large, wrinkled black pods with smoky, camphor-like aroma. Used in savory dishes, biryanis, and some spice blends. Not for sweets.",
    keyFeatures: ["Smoky aroma", "Camphor notes", "Large size", "Savory dishes only"],
    properUsage: "Crush lightly, use whole in rice dishes, remove before serving",
    commonMistakes: ["Using in sweets", "Not removing from dish", "Confusing with green"],
    types: [
      {
        name: "Regular Black Cardamom",
        description: "Smoky variety",
        bestFor: "Biryani, meat dishes"
      }
    ]
  },
  {
    id: 303,
    name: "Cinnamon",
    urduName: "دار چینی",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "dalchini.png",
    tagline: "Sweet bark for warming dishes",
    fullDesc: "Cinnamon is bark rolled into sticks. Has sweet, warm flavor. Used whole in rice dishes, curries, and teas. Also ground for baking and spice blends.",
    keyFeatures: ["Sweet warmth", "Two varieties", "Used whole or ground", "Aromatic"],
    properUsage: "Add whole to rice and curries, remove before serving, grind for blends",
    commonMistakes: ["Leaving large pieces in dish", "Using wrong variety", "Not storing properly"],
    types: [
      {
        name: "Ceylon Cinnamon",
        description: "Thin, multiple layers",
        bestFor: "Desserts, light dishes"
      },
      {
        name: "Cassia",
        description: "Thick, single layer",
        bestFor: "Savory dishes"
      }
    ]
  },
  {
    id: 304,
    name: "Cloves",
    urduName: "لونگ",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "laung.png",
    tagline: "Intensely aromatic flower buds",
    fullDesc: "Cloves are dried flower buds with intense, sweet-pungent aroma. Used whole in rice dishes, curries, and teas. Also ground for spice blends. Small amount goes a long way.",
    keyFeatures: ["Intense aroma", "Numbing effect", "Sweet-pungent", "Use sparingly"],
    properUsage: "Add whole to dishes, remove before serving, use 2-3 cloves maximum",
    commonMistakes: ["Using too many (overpowers)", "Leaving in dish", "Not removing before serving"],
    types: [
      {
        name: "Whole Cloves",
        description: "Dried flower buds",
        bestFor: "Rice, curries, tea"
      },
      {
        name: "Clove Powder",
        description: "Ground form",
        bestFor: "Spice blends"
      }
    ]
  },
  {
    id: 305,
    name: "Nutmeg",
    urduName: "جائفل",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "jaiphal.png",
    tagline: "Warm, nutty seed used in small amounts",
    fullDesc: "Nutmeg is the seed of nutmeg fruit. Has warm, nutty, slightly sweet flavor. Grated fresh over desserts, used in korma, and in spice blends. Use very small amounts.",
    keyFeatures: ["Warm, nutty flavor", "Grate fresh", "Use sparingly", "Slightly sweet"],
    properUsage: "Grate fresh over dishes just before serving, add to spice blends",
    commonMistakes: ["Using too much (toxic in large amounts)", "Not grating fresh", "Storing whole incorrectly"],
    types: [
      {
        name: "Whole Nutmeg",
        description: "Keep whole, grate as needed",
        bestFor: "Fresh grating"
      }
    ]
  },
  {
    id: 306,
    name: "Mace",
    urduName: "جاوتری",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "javitri.png",
    tagline: "Delicate lacy covering of nutmeg",
    fullDesc: "Mace is the lacy red covering around nutmeg seed. Has similar but more delicate flavor. Used in light-colored dishes, korma, and some desserts. More expensive than nutmeg.",
    keyFeatures: ["Delicate nutmeg flavor", "Lacy appearance", "Light dishes", "Expensive"],
    properUsage: "Use whole or ground, add to light curries",
    commonMistakes: ["Confusing with nutmeg", "Using in wrong dishes", "Not storing properly"],
    types: [
      {
        name: "Whole Mace",
        description: "Red blades",
        bestFor: "Light curries, korma"
      }
    ]
  },
  {
    id: 307,
    name: "Star Anise",
    urduName: "بادیان",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "badyan.png",
    tagline: "Star-shaped spice with strong licorice flavor",
    fullDesc: "Star anise is a star-shaped spice with strong licorice flavor. Used in Chinese cooking, biryanis, and some spice blends. Not related to aniseed but similar flavor.",
    keyFeatures: ["Star shape", "Strong licorice flavor", "Chinese cooking", "Aromatic"],
    properUsage: "Use whole in rice dishes, remove before serving, use sparingly",
    commonMistakes: ["Using too many", "Confusing with aniseed", "Not removing from dish"],
    types: [
      {
        name: "Whole Star Anise",
        description: "Brown star-shaped",
        bestFor: "Biryani, Chinese dishes"
      }
    ]
  },
  {
    id: 308,
    name: "Bay Leaves",
    urduName: "تیز پات",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "tez-pata.png",
    tagline: "Subtle, herbal leaves for rice and curries",
    fullDesc: "Bay leaves are dried leaves with subtle herbal, slightly floral aroma. Used in rice dishes (biryani, pulao), curries, and soups. Removed before serving.",
    keyFeatures: ["Subtle herbal aroma", "Large leaves", "Essential for rice", "Remove before serving"],
    properUsage: "Add whole to dishes, remove before eating, use 1-2 leaves",
    commonMistakes: ["Using too many", "Not removing before serving", "Using old leaves (no flavor)"],
    types: [
      {
        name: "Indian Bay Leaf",
        description: "Cinnamon-like aroma",
        bestFor: "Indian cooking"
      },
      {
        name: "Turkish Bay Leaf",
        description: "More herbal",
        bestFor: "Western cooking"
      }
    ]
  },
  {
    id: 309,
    name: "Dried Fenugreek Leaves",
    urduName: "کسوری میتھی",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "kasuri-methi.png",
    tagline: "Dried leaves with unique fenugreek aroma",
    fullDesc: "Kasuri methi is dried fenugreek leaves. Has unique, slightly bitter, maple-like aroma. Used as finishing herb in curries, especially butter chicken, and vegetable dishes.",
    keyFeatures: ["Unique aroma", "Dried leaves", "Finishing herb", "Essential for some dishes"],
    properUsage: "Crush between palms before adding, add at end of cooking",
    commonMistakes: ["Adding too early", "Not crushing (releases aroma)", "Using too much (bitter)"],
    types: [
      {
        name: "Kasuri Methi",
        description: "Dried leaves",
        bestFor: "Curries, finishing"
      }
    ]
  },
  {
    id: 310,
    name: "Curry Leaves",
    urduName: "کڑی پتہ",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "kari-patta.png",
    tagline: "Fragrant leaves essential for South Indian cooking",
    fullDesc: "Curry leaves are fresh or dried leaves with distinct citrusy aroma. Essential in South Indian cooking, used in tempering for dals, sambar, and chutneys. Fresh is best.",
    keyFeatures: ["Citrusy aroma", "South Indian essential", "Use in tempering", "Better fresh"],
    properUsage: "Add to hot oil until crisp, use in tempering, can be dried",
    commonMistakes: ["Using only dried (less flavor)", "Burning in oil", "Not using in South Indian dishes"],
    types: [
      {
        name: "Fresh Curry Leaves",
        description: "Best flavor",
        bestFor: "All dishes"
      },
      {
        name: "Dried Curry Leaves",
        description: "Less aromatic",
        bestFor: "When fresh unavailable"
      }
    ]
  },
  {
    id: 311,
    name: "Dried Mint",
    urduName: "خشک پودینہ",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "sukha-pudina.png",
    tagline: "Dried mint for teas and chutneys",
    fullDesc: "Dried mint is dehydrated mint leaves. Has concentrated mint flavor. Used in teas, chutneys, and as finishing herb. Good alternative when fresh mint unavailable.",
    keyFeatures: ["Concentrated mint", "Dried herb", "Good for tea", "Long shelf life"],
    properUsage: "Crush before use, add at end, use less than fresh",
    commonMistakes: ["Using too much", "Adding too early", "Not crushing"],
    types: [
      {
        name: "Dried Mint",
        description: "Crushed leaves",
        bestFor: "Tea, chutneys"
      }
    ]
  },
  {
    id: 312,
    name: "Dried Rose Petals",
    urduName: "خشک گلاب کی پنکھڑیاں",
    category: "aromatic",
    categoryDisplay: "Aromatic Spices",
    image: "gulab.png",
    tagline: "Floral petals for sweets and garnishing",
    fullDesc: "Dried rose petals add floral fragrance and color. Used in desserts, sweets, and as garnish. Also used in some spice blends like garam masala in some regions.",
    keyFeatures: ["Floral aroma", "Pretty color", "Used in sweets", "Garnishing"],
    properUsage: "Sprinkle on desserts, grind for spice blends, use in teas",
    commonMistakes: ["Using fragrant (non-edible) roses", "Adding too many", "Not storing properly"],
    types: [
      {
        name: "Dried Rose Petals",
        description: "Whole petals",
        bestFor: "Garnishing"
      },
      {
        name: "Rose Powder",
        description: "Ground petals",
        bestFor: "Spice blends, face packs"
      }
    ]
  },

  // 🧂 TEMPER SPICES (Baghar/Bargi ke Masale) - 8 items
  {
    id: 401,
    name: "Mustard Seeds",
    urduName: "رائی",
    category: "temper",
    categoryDisplay: "Temper Spices",
    image: "rai.png",
    tagline: "Pungent seeds that pop in oil",
    fullDesc: "Mustard seeds are essential for tempering in South Indian cooking. They pop and crackle when added to hot oil, releasing nutty flavor. Used in dals, sambar, and vegetable dishes.",
    keyFeatures: ["Pop in hot oil", "Nutty flavor when tempered", "Essential for tadka", "Pungent"],
    properUsage: "Add to hot oil until they pop (1-2 seconds), then add other ingredients",
    commonMistakes: ["Burning (become bitter)", "Adding to cool oil", "Not letting them pop fully"],
    types: [
      {
        name: "Brown Mustard",
        description: "Common in Indian cooking",
        bestFor: "Tempering"
      },
      {
        name: "Yellow Mustard",
        description: "Milder, larger",
        bestFor: "Pickling"
      }
    ]
  },
  {
    id: 402,
    name: "Cumin Seeds",
    urduName: "زیرہ",
    category: "temper",
    categoryDisplay: "Temper Spices",
    image: "zeera.png",
    tagline: "Earthy seeds for tempering dals and curries",
    fullDesc: "Cumin seeds are widely used for tempering. They release earthy, nutty flavor when added to hot oil. Essential for dals, vegetable dishes, and rice.",
    keyFeatures: ["Earthy flavor when tempered", "Quick cooking", "Essential for tadka", "Digestive aid"],
    properUsage: "Add to hot oil until they sizzle and darken slightly",
    commonMistakes: ["Burning (become bitter)", "Using stale seeds", "Not using enough oil"],
    types: [
      {
        name: "Regular Cumin",
        description: "Most common",
        bestFor: "All tempering"
      },
      {
        name: "Black Cumin",
        description: "More aromatic",
        bestFor: "Special dishes"
      }
    ]
  },
  {
    id: 403,
    name: "Fenugreek Seeds",
    urduName: "میتھی دانہ",
    category: "temper",
    categoryDisplay: "Temper Spices",
    image: "methi-dana.png",
    tagline: "Bitter seeds for tempering pickles and dals",
    fullDesc: "Fenugreek seeds are used in tempering for their unique bitter flavor. Essential for pickles, some dals, and vegetable dishes. Use sparingly.",
    keyFeatures: ["Bitter taste", "Strong flavor", "Used in pickles", "Medicinal properties"],
    properUsage: "Add small amount to hot oil until they darken",
    commonMistakes: ["Using too many (very bitter)", "Burning", "Not using in pickles"],
    types: [
      {
        name: "Whole Methi Dana",
        description: "Small hard seeds",
        bestFor: "Tempering, pickles"
      }
    ]
  },
  {
    id: 404,
    name: "Urad Dal",
    urduName: "اڑد دال",
    category: "temper",
    categoryDisplay: "Temper Spices",
    image: "urad-dal.png",
    tagline: "Split black gram for tempering",
    fullDesc: "Urad dal (split black gram) is used in tempering for its nutty flavor when fried. Turns golden and crispy. Used in dals, vegetable dishes, and South Indian cooking.",
    keyFeatures: ["Nutty flavor when fried", "Turns crispy", "Essential for some tadkas", "High protein"],
    properUsage: "Add to hot oil until golden brown",
    commonMistakes: ["Burning (becomes bitter)", "Not frying enough", "Using too much"],
    types: [
      {
        name: "Split Urad Dal",
        description: "White, split",
        bestFor: "Tempering"
      },
      {
        name: "Whole Urad Dal",
        description: "Black with skin",
        bestFor: "Dals, curries"
      }
    ]
  },
  {
    id: 405,
    name: "Chana Dal",
    urduName: "چنا دال",
    category: "temper",
    categoryDisplay: "Temper Spices",
    image: "chana-dal.png",
    tagline: "Split chickpeas for nutty tempering",
    fullDesc: "Chana dal (split chickpeas) is used in tempering for its nutty flavor and crunchy texture. Turns golden when fried. Used in South Indian dishes and some dals.",
    keyFeatures: ["Nutty flavor", "Crunchy texture", "Used in South Indian cooking", "High protein"],
    properUsage: "Add to hot oil until golden brown",
    commonMistakes: ["Burning", "Not soaking for some uses", "Using too much"],
    types: [
      {
        name: "Chana Dal",
        description: "Split chickpeas",
        bestFor: "Tempering"
      }
    ]
  },
  {
    id: 406,
    name: "Curry Leaves",
    urduName: "کڑی پتہ",
    category: "temper",
    categoryDisplay: "Temper Spices",
    image: "kari-patta.png",
    tagline: "Fragrant leaves for tempering",
    fullDesc: "Curry leaves are essential in tempering, especially in South Indian cooking. They become crisp and release citrusy aroma when added to hot oil.",
    keyFeatures: ["Citrusy aroma when tempered", "Crispy texture", "Essential for South Indian tadka", "Fresh best"],
    properUsage: "Add to hot oil until crisp (10-15 seconds)",
    commonMistakes: ["Burning", "Using only dried (less flavor)", "Adding too early"],
    types: [
      {
        name: "Fresh Curry Leaves",
        description: "Best for tempering",
        bestFor: "All tadkas"
      }
    ]
  },
  {
    id: 407,
    name: "Red Chili (Whole)",
    urduName: "سوکھی لال مرچ",
    category: "temper",
    categoryDisplay: "Temper Spices",
    image: "sookhi-lal-mirch.png",
    tagline: "Whole dried chilies for heat in tempering",
    fullDesc: "Whole dried red chilies are added to tempering for heat and color. They puff up and darken slightly in hot oil. Use whole or broken into pieces.",
    keyFeatures: ["Adds heat", "Adds red color", "Puffs in oil", "Varieties for different heat"],
    properUsage: "Add whole to hot oil until they puff, break for more heat release",
    commonMistakes: ["Burning (bitter)", "Using too many", "Not adjusting for heat level"],
    types: [
      {
        name: "Kashmiri Chili",
        description: "Mild, good color",
        bestFor: "Color-rich tadka"
      },
      {
        name: "Guntur Chili",
        description: "Very hot",
        bestFor: "Spicy tadka"
      }
    ]
  },
  {
    id: 408,
    name: "Asafoetida",
    urduName: "ہینگ",
    category: "temper",
    categoryDisplay: "Temper Spices",
    image: "hing.png",
    tagline: "Pungent resin added at start of tempering",
    fullDesc: "Asafoetida is added to hot oil at the very beginning of tempering. It releases onion-garlic aroma and aids digestion. Essential in lentil dishes.",
    keyFeatures: ["Pungent smell (mellows when cooked)", "Onion-garlic substitute", "Digestive aid", "Used in small amounts"],
    properUsage: "Add pinch to hot oil first, then add other tempering ingredients",
    commonMistakes: ["Adding too much", "Adding to cool oil", "Skipping in lentil dishes"],
    types: [
      {
        name: "Compounded Hing",
        description: "Mixed with flour",
        bestFor: "Everyday tempering"
      }
    ]
  },

  // 💫 DRIED FLOWERS & BUDS - 5 items
  {
    id: 501,
    name: "Saffron",
    urduName: "زعفران / کیسر",
    category: "flowers",
    categoryDisplay: "Dried Flowers & Buds",
    image: "kesar.png",
    tagline: "The most expensive spice, for color and aroma",
    fullDesc: "Saffron is the dried stigma of crocus flowers. Most expensive spice in the world. Adds golden color, honey-like floral aroma to biryanis, desserts, and sweets. Use very sparingly.",
    keyFeatures: ["Golden color", "Floral, honey aroma", "Most expensive spice", "Use tiny amount"],
    properUsage: "Soak in warm milk/water before use, add at end, crush slightly",
    commonMistakes: ["Using too much", "Buying fake saffron", "Adding directly (not soaking)", "Storing improperly"],
    types: [
      {
        name: "Kashmiri Saffron",
        description: "Deep color, strong aroma",
        bestFor: "Biryani, desserts"
      },
      {
        name: "Spanish Saffron",
        description: "Good quality",
        bestFor: "Paella, European dishes"
      },
      {
        name: "Iranian Saffron",
        description: "Most common",
        bestFor: "General use"
      }
    ]
  },
  {
    id: 502,
    name: "Dried Rose Petals",
    urduName: "خشک گلاب کی پنکھڑیاں",
    category: "flowers",
    categoryDisplay: "Dried Flowers & Buds",
    image: "gulab.png",
    tagline: "Floral petals for fragrance and garnish",
    fullDesc: "Dried rose petals add floral fragrance to desserts, sweets, and some rice dishes. Also used as garnish and in spice blends. Choose edible, unsprayed roses.",
    keyFeatures: ["Floral fragrance", "Pretty color", "Edible garnish", "Used in sweets"],
    properUsage: "Sprinkle on desserts, crush for spice blends, use in teas",
    commonMistakes: ["Using non-edible roses", "Using too many", "Not storing properly"],
    types: [
      {
        name: "Red Rose Petals",
        description: "Deep color",
        bestFor: "Garnishing"
      },
      {
        name: "Pink Rose Petals",
        description: "Lighter color",
        bestFor: "Teas, desserts"
      }
    ]
  },
  {
    id: 503,
    name: "Mace",
    urduName: "جاوتری",
    category: "flowers",
    categoryDisplay: "Dried Flowers & Buds",
    image: "javitri.png",
    tagline: "Lacy covering of nutmeg",
    fullDesc: "Mace is the dried lacy covering (aril) around nutmeg seed. Has warm, delicate flavor. Used in light-colored dishes, korma, and spice blends.",
    keyFeatures: ["Delicate flavor", "Lacy appearance", "From nutmeg fruit", "Aromatic"],
    properUsage: "Use whole or ground, add to light curries",
    commonMistakes: ["Confusing with nutmeg", "Using too much", "Not storing properly"],
    types: [
      {
        name: "Whole Mace",
        description: "Red-brown blades",
        bestFor: "Light curries"
      }
    ]
  },
  {
    id: 504,
    name: "Cloves",
    urduName: "لونگ",
    category: "flowers",
    categoryDisplay: "Dried Flowers & Buds",
    image: "laung.png",
    tagline: "Dried flower buds with intense aroma",
    fullDesc: "Cloves are dried flower buds of clove tree. Have intense, sweet-pungent aroma. Used whole in rice dishes, curries, and teas.",
    keyFeatures: ["Flower buds", "Intense aroma", "Numbing effect", "Use sparingly"],
    properUsage: "Use whole in dishes, remove before serving",
    commonMistakes: ["Using too many", "Leaving in dish", "Not removing before serving"],
    types: [
      {
        name: "Whole Cloves",
        description: "Dried buds",
        bestFor: "All uses"
      }
    ]
  },
  {
    id: 505,
    name: "Capers",
    urduName: "کاپرز",
    category: "flowers",
    categoryDisplay: "Dried Flowers & Buds",
    image: "capers.png",
    tagline: "Pickled flower buds for tangy flavor",
    fullDesc: "Capers are pickled flower buds of caper bush. Have tangy, salty, lemony flavor. Used in Mediterranean cooking, pastas, salads, and sauces. Not common in Indian cooking.",
    keyFeatures: ["Tangy, salty flavor", "Pickled buds", "Mediterranean spice", "Adds brightness"],
    properUsage: "Rinse before use to reduce salt, add at end of cooking",
    commonMistakes: ["Not rinsing (too salty)", "Adding too early", "Using in wrong dishes"],
    types: [
      {
        name: "Nonpareil Capers",
        description: "Smallest, most tender",
        bestFor: "Salads, sauces"
      },
      {
        name: "Larger Capers",
        description: "More intense",
        bestFor: "Cooking"
      }
    ]
  },

  // 🧂 SPECIALTY SALTS - 6 items
  {
    id: 601,
    name: "Black Salt",
    urduName: "کالا نمک",
    category: "salts",
    categoryDisplay: "Specialty Salts",
    image: "kala-namak.png",
    tagline: "Pinkish-gray salt with sulfurous aroma",
    fullDesc: "Black salt (kala namak) is a volcanic rock salt with pinkish-gray color and distinctive sulfurous aroma. Essential for chaats, chutneys, and raitas. Adds unique savory flavor.",
    keyFeatures: ["Sulfurous aroma", "Pinkish-gray color", "Essential for chaat", "Digestive aid"],
    properUsage: "Add at end of cooking, sprinkle on fruits, use in chutneys",
    commonMistakes: ["Using for regular cooking", "Adding too early (aroma dissipates)", "Confusing with regular salt"],
    types: [
      {
        name: "Kala Namak",
        description: "Indian black salt",
        bestFor: "Chaat, raita, chutney"
      },
      {
        name: "Himalayan Black Salt",
        description: "Similar properties",
        bestFor: "Same uses"
      }
    ]
  },
  {
    id: 602,
    name: "Pink Salt",
    urduName: "گلابی نمک",
    category: "salts",
    categoryDisplay: "Specialty Salts",
    image: "pink-salt.png",
    tagline: "Himalayan salt with mineral-rich pink color",
    fullDesc: "Himalayan pink salt is mined from ancient sea beds. Gets pink color from trace minerals. Used as finishing salt, in cooking, and for its perceived health benefits.",
    keyFeatures: ["Pink color", "Trace minerals", "Milder than table salt", "Finishing salt"],
    properUsage: "Use as finishing salt, grind fresh for cooking",
    commonMistakes: ["Using too much (expensive)", "Not grinding", "Expecting health miracles"],
    types: [
      {
        name: "Fine Pink Salt",
        description: "Ground",
        bestFor: "Cooking"
      },
      {
        name: "Coarse Pink Salt",
        description: "Crystals",
        bestFor: "Grinding, finishing"
      }
    ]
  },
  {
    id: 603,
    name: "Rock Salt",
    urduName: "سیندھا نمک",
    category: "salts",
    categoryDisplay: "Specialty Salts",
    image: "sendha-namak.png",
    tagline: "White salt used during fasting",
    fullDesc: "Rock salt (sendha namak) is a pure, white salt without additives. Used during religious fasting in India. Also used in some Ayurvedic preparations and pickles.",
    keyFeatures: ["White color", "No additives", "Used during fasting", "Purer than table salt"],
    properUsage: "Use during fasting, in pickles, grind as needed",
    commonMistakes: ["Using for everyday cooking (expensive)", "Confusing with other salts"],
    types: [
      {
        name: "Sendha Namak",
        description: "Indian rock salt",
        bestFor: "Fasting, pickles"
      }
    ]
  },
  {
    id: 604,
    name: "Celtic Salt",
    urduName: "سیلٹک نمک",
    category: "salts",
    categoryDisplay: "Specialty Salts",
    image: "celtic-salt.png",
    tagline: "Gray sea salt from France",
    fullDesc: "Celtic salt is hand-harvested sea salt from France. Gray color from clay minerals. Has moist texture and complex flavor. Used as finishing salt.",
    keyFeatures: ["Gray color", "Moist texture", "Complex flavor", "Finishing salt"],
    properUsage: "Use as finishing salt, sprinkle on dishes just before serving",
    commonMistakes: ["Using for cooking (expensive)", "Not storing properly (dries out)"],
    types: [
      {
        name: "Celtic Sea Salt",
        description: "Gray, moist",
        bestFor: "Finishing"
      }
    ]
  },
  {
    id: 605,
    name: "Smoked Salt",
    urduName: "دھوئیں والا نمک",
    category: "salts",
    categoryDisplay: "Specialty Salts",
    image: "smoked-salt.png",
    tagline: "Salt with smoky flavor",
    fullDesc: "Smoked salt is salt smoked over wood fire. Adds smoky flavor without actual smoking. Used in marinades, rubs, and as finishing salt.",
    keyFeatures: ["Smoky flavor", "Various wood types", "Adds smoke without cooking", "Finishing salt"],
    properUsage: "Use as finishing salt, in rubs, on grilled foods",
    commonMistakes: ["Using too much (strong)", "Adding during cooking (smoke dissipates)"],
    types: [
      {
        name: "Applewood Smoked",
        description: "Mild smoke",
        bestFor: "Vegetables, fish"
      },
      {
        name: "Hickory Smoked",
        description: "Strong smoke",
        bestFor: "Meats, barbecue"
      }
    ]
  },
  {
    id: 606,
    name: "Flaky Sea Salt",
    urduName: "فلکی سمندری نمک",
    category: "salts",
    categoryDisplay: "Specialty Salts",
    image: "flaky-salt.png",
    tagline: "Delicate, pyramid-shaped salt crystals",
    fullDesc: "Flaky sea salt has thin, pyramid-shaped crystals that dissolve quickly. Provides crunchy texture and bursts of saltiness. Used as finishing salt on steaks, salads, and chocolates.",
    keyFeatures: ["Pyramid crystals", "Quick dissolving", "Crunchy texture", "Finishing salt"],
    properUsage: "Pinch between fingers and sprinkle just before serving",
    commonMistakes: ["Using for cooking (disappears)", "Crushing crystals", "Adding too early"],
    types: [
      {
        name: "Maldon Salt",
        description: "Famous English salt",
        bestFor: "Finishing everything"
      },
      {
        name: "Fleur de Sel",
        description: "French hand-harvested",
        bestFor: "Fine dining"
      }
    ]
  }
];

  // SECTION 3: STAPLES DATA WITH TYPES - UPDATED WITH WHITE & BLACK CHANA
 // SECTION 3: STAPLES DATA WITH 8 CATEGORIES
const staplesData = [
  // ===== 1. RICE (15 types) =====
  {
    id: 201,
    name: "Basmati Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Long grain aromatic rice",
    fullDesc: "Basmati rice is a long-grain aromatic rice known for its fragrance and delicate flavor. Grown primarily in the Indian subcontinent, it's the preferred rice for biryanis, pulaos, and special occasion dishes.",
    storageTips: "Store in airtight container in cool, dry place. Can be stored for years.",
    shelfLife: "2-3 years",
    keyUses: ["Biryani", "Pulao", "Fried rice", "Plain rice"],
    nutritionalInfo: "High in carbohydrates, low in fat, contains protein and iron",
    healthBenefits: ["Quick energy source", "Gluten-free", "Easily digestible"],
    cookingTips: "Soak for 30 minutes before cooking. Use 1:2 rice to water ratio.",
    types: [
      {
        name: "Extra Long Basmati",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Premium grade, extra long grains",
        cookingTime: "15-18 mins",
        bestFor: "Biryani, Special occasions",
        waterRatio: "1:2",
        glycemicIndex: "Medium"
      },
      {
        name: "Regular Basmati",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Standard basmati, good for daily use",
        cookingTime: "15-18 mins",
        bestFor: "Daily meals, Pulao",
        waterRatio: "1:2",
        glycemicIndex: "Medium"
      }
    ]
  },
  {
    id: 202,
    name: "Brown Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
    tagline: "Whole grain rice with bran layer",
    fullDesc: "Brown rice is whole grain rice with the inedible outer hull removed but bran layer intact. It's more nutritious than white rice, with higher fiber content and a nutty flavor. Takes longer to cook but offers more health benefits.",
    storageTips: "Store in airtight container in cool, dry place. Refrigerate for longer shelf life.",
    shelfLife: "6 months",
    keyUses: ["Healthy meals", "Bowls", "Salads", "Side dishes"],
    nutritionalInfo: "High in fiber, magnesium, B vitamins, and antioxidants",
    healthBenefits: ["Heart healthy", "Blood sugar control", "Weight management", "Digestive health"],
    cookingTips: "Rinse well. Use 1:2.5 rice to water ratio. Cook longer than white rice.",
    types: [
      {
        name: "Short Grain Brown Rice",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Plumper, softer texture",
        cookingTime: "30-35 mins",
        bestFor: "Rice bowls, Sushi",
        waterRatio: "1:2.5",
        glycemicIndex: "Low"
      },
      {
        name: "Long Grain Brown Rice",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Separate fluffy grains",
        cookingTime: "35-40 mins",
        bestFor: "Pulao, Biryani, Side dishes",
        waterRatio: "1:2.5",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 203,
    name: "Sona Masoori Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=800",
    tagline: "Medium grain rice from South India",
    fullDesc: "Sona Masoori is a medium-grain rice popular in South Indian cooking. It's lightweight, aromatic, and cooks quickly. Perfect for daily meals, lemon rice, and coconut rice.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "1-2 years",
    keyUses: ["Daily meals", "Lemon rice", "Coconut rice", "Curd rice"],
    nutritionalInfo: "Lower starch content, easily digestible",
    healthBenefits: ["Light on stomach", "Quick cooking", "Good for daily use"],
    cookingTips: "No soaking required. Use 1:1.5 rice to water ratio.",
    types: [
      {
        name: "Raw Sona Masoori",
        image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
        description: "Unpolished variety",
        cookingTime: "12-15 mins",
        bestFor: "Daily cooking",
        waterRatio: "1:1.5",
        glycemicIndex: "Medium"
      },
      {
        name: "Parboiled Sona Masoori",
        image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
        description: "Partially boiled, retains nutrients",
        cookingTime: "15-18 mins",
        bestFor: "Idli, Dosa, Pulao",
        waterRatio: "1:2",
        glycemicIndex: "Medium"
      }
    ]
  },
  {
    id: 204,
    name: "Jasmine Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Fragrant rice from Thailand",
    fullDesc: "Jasmine rice is a long-grain rice with a subtle floral aroma and slightly sticky texture when cooked. Native to Thailand, it's perfect for Asian curries, stir-fries, and coconut rice dishes.",
    storageTips: "Store in airtight container away from strong odors.",
    shelfLife: "1-2 years",
    keyUses: ["Thai curries", "Sticky rice", "Asian dishes", "Coconut rice"],
    nutritionalInfo: "Good source of carbohydrates, low in fat",
    healthBenefits: ["Gluten-free", "Quick energy", "Easy to digest"],
    cookingTips: "Rinse until water runs clear. Use 1:1.5 rice to water ratio.",
    types: [
      {
        name: "White Jasmine Rice",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Classic fragrant variety",
        cookingTime: "12-15 mins",
        bestFor: "Thai cuisine, Curries",
        waterRatio: "1:1.5",
        glycemicIndex: "Medium"
      },
      {
        name: "Brown Jasmine Rice",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Whole grain version",
        cookingTime: "30-35 mins",
        bestFor: "Healthier option",
        waterRatio: "1:2.5",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 205,
    name: "Ponni Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Popular South Indian rice variety",
    fullDesc: "Ponni rice is a hybrid rice variety developed in Tamil Nadu. It's known for its medium grains, non-sticky texture, and excellent taste. Widely used in South Indian households for daily cooking.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "1-2 years",
    keyUses: ["Daily meals", "Ven Pongal", "Rice dishes"],
    nutritionalInfo: "Good carbohydrate source, easily digestible",
    healthBenefits: ["Light on stomach", "Good for daily consumption"],
    cookingTips: "Use 1:2 rice to water ratio for perfect texture.",
    types: [
      {
        name: "Raw Ponni Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Unpolished variety",
        cookingTime: "12-15 mins",
        bestFor: "Daily cooking",
        waterRatio: "1:2",
        glycemicIndex: "Medium"
      },
      {
        name: "Parboiled Ponni Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Retains more nutrients",
        cookingTime: "15-18 mins",
        bestFor: "Idli, Dosa batter",
        waterRatio: "1:2",
        glycemicIndex: "Medium"
      }
    ]
  },
  {
    id: 206,
    name: "Parboiled Rice (Sela Rice)",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Partially boiled, nutrient-rich rice",
    fullDesc: "Parboiled rice, also known as sela rice, is rice that has been partially boiled in the husk. This process drives nutrients from the bran into the grain, making it more nutritious than white rice while maintaining firm texture.",
    storageTips: "Store in airtight container. Keeps well for long periods.",
    shelfLife: "2-3 years",
    keyUses: ["Biryani", "Pulao", "Daily meals", "Idli-Dosa batter"],
    nutritionalInfo: "Higher in thiamine, niacin, and minerals than white rice",
    healthBenefits: ["More nutritious", "Firmer texture", "Better for diabetes"],
    cookingTips: "Soak for 30 minutes before cooking. Use 1:2 water ratio.",
    types: [
      {
        name: "Single Boiled Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Lightly parboiled",
        cookingTime: "15-18 mins",
        bestFor: "Daily cooking",
        waterRatio: "1:2",
        glycemicIndex: "Medium-Low"
      },
      {
        name: "Double Boiled Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Fully parboiled, firmest texture",
        cookingTime: "18-20 mins",
        bestFor: "Biryani, South Indian dishes",
        waterRatio: "1:2.2",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 207,
    name: "Red Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Nutrient-rich whole grain rice",
    fullDesc: "Red rice gets its color from anthocyanins, the same antioxidants found in berries. It's a whole grain rice with a nutty flavor, chewy texture, and significantly more nutrients than white rice.",
    storageTips: "Store in airtight container. Refrigerate for longer shelf life.",
    shelfLife: "6-8 months",
    keyUses: ["Healthy meals", "Salads", "Buddha bowls", "Side dishes"],
    nutritionalInfo: "Rich in antioxidants, iron, zinc, magnesium, and B vitamins",
    healthBenefits: ["High in antioxidants", "Heart healthy", "Blood sugar control", "Weight management"],
    cookingTips: "Soak for 2-3 hours before cooking. Use 1:2.5 water ratio.",
    types: [
      {
        name: "Short Grain Red Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Plumper, softer texture",
        cookingTime: "35-40 mins",
        bestFor: "Rice bowls",
        waterRatio: "1:2.5",
        glycemicIndex: "Low"
      },
      {
        name: "Long Grain Red Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Separate grains after cooking",
        cookingTime: "40-45 mins",
        bestFor: "Salads, Side dishes",
        waterRatio: "1:2.5",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 208,
    name: "Black Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Forbidden rice, packed with antioxidants",
    fullDesc: "Black rice, also known as forbidden rice, is a deep purple-black rice that turns dark purple when cooked. It's rich in anthocyanins (the same antioxidants found in blueberries) and has a nutty, slightly sweet flavor.",
    storageTips: "Store in airtight container away from light and moisture.",
    shelfLife: "1 year",
    keyUses: ["Desserts", "Salads", "Buddha bowls", "Porridge"],
    nutritionalInfo: "Very high in antioxidants, fiber, iron, and vitamin E",
    healthBenefits: ["Powerful antioxidants", "Heart health", "Detoxifying", "Anti-inflammatory"],
    cookingTips: "Soak overnight. Use 1:2.5 water ratio. Cooks like brown rice.",
    types: [
      {
        name: "Chinese Black Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Most common variety",
        cookingTime: "30-35 mins",
        bestFor: "Desserts, Salads",
        waterRatio: "1:2.5",
        glycemicIndex: "Low"
      },
      {
        name: "Indonesian Black Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Slightly sweeter flavor",
        cookingTime: "35-40 mins",
        bestFor: "Puddings, Sweet dishes",
        waterRatio: "1:2.5",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 209,
    name: "Arborio Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Italian short-grain rice for risotto",
    fullDesc: "Arborio rice is a short-grain Italian rice named after the town of Arborio. It has high starch content, which creates the creamy texture essential for authentic risotto. The grains remain firm in the center (al dente) while the outer layer becomes creamy.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "2 years",
    keyUses: ["Risotto", "Rice pudding", "Creamy rice dishes"],
    nutritionalInfo: "High in carbohydrates, good source of energy",
    healthBenefits: ["Quick energy", "Easily digestible", "Gluten-free"],
    cookingTips: "Do not rinse (removes starch needed for creaminess). Add liquid gradually.",
    types: [
      {
        name: "Superfino Arborio",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Largest grains, highest quality",
        cookingTime: "18-20 mins",
        bestFor: "Classic risotto",
        waterRatio: "Gradual addition",
        glycemicIndex: "Medium"
      }
    ]
  },
  {
    id: 210,
    name: "Glutinous Rice (Sticky Rice)",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Sticky, sweet rice for desserts and Asian dishes",
    fullDesc: "Glutinous rice, also called sticky or sweet rice, is a type of rice that becomes very sticky when cooked. Despite the name, it contains no gluten. It's essential for many Asian desserts, dumplings, and savory dishes.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Desserts", "Dumplings", "Thai sticky rice", "Rice cakes"],
    nutritionalInfo: "High in carbohydrates, low in fiber",
    healthBenefits: ["Quick energy", "Gluten-free", "Easy to digest"],
    cookingTips: "Soak for at least 4 hours or overnight. Steam, don't boil.",
    types: [
      {
        name: "Thai Glutinous Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Long grain sticky rice",
        cookingTime: "20-25 mins (steamed)",
        bestFor: "Mango sticky rice",
        waterRatio: "Steaming method",
        glycemicIndex: "High"
      },
      {
        name: "Japanese Glutinous Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Short grain, very sticky",
        cookingTime: "20-25 mins",
        bestFor: "Mochi, Rice cakes",
        waterRatio: "Steaming method",
        glycemicIndex: "High"
      }
    ]
  },
  {
    id: 211,
    name: "Matta Rice (Kerala Red Rice)",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Rosematta rice, staple of Kerala",
    fullDesc: "Matta rice, also known as Kerala red rice or Rosematta rice, is a coarse, parboiled rice with a distinct reddish-brown color and robust flavor. It's the traditional rice for Kerala's famous fish curry and is known for its nutritional value.",
    storageTips: "Store in airtight container. Keeps well for long periods.",
    shelfLife: "1-2 years",
    keyUses: ["Fish curry", "Kerala meals", "Kanji (rice porridge)", "Idli"],
    nutritionalInfo: "Rich in fiber, minerals, and B vitamins from parboiling",
    healthBenefits: ["High fiber", "Sustained energy", "Nutrient-rich"],
    cookingTips: "Soak for 30 minutes. Use 1:2.5 water ratio. Needs more water than white rice.",
    types: [
      {
        name: "Palakkadan Matta",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Traditional variety from Palakkad",
        cookingTime: "25-30 mins",
        bestFor: "Kerala meals",
        waterRatio: "1:2.5",
        glycemicIndex: "Medium"
      }
    ]
  },
  {
    id: 212,
    name: "Gobindobhog Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Aromatic rice from Bengal",
    fullDesc: "Gobindobhog is a short-grain, aromatic rice from West Bengal, India. It has a distinctive sweet fragrance and is traditionally used in Bengali cuisine for khichuri, payesh (rice pudding), and festive dishes. The grains are small, white, and buttery in texture.",
    storageTips: "Store in airtight container away from strong odors.",
    shelfLife: "1 year",
    keyUses: ["Khichuri", "Payesh (Rice pudding)", "Bengali cuisine", "Festive dishes"],
    nutritionalInfo: "Aromatic compounds, easily digestible carbohydrates",
    healthBenefits: ["Digestible", "Aromatic", "Cultural significance"],
    cookingTips: "Rinse gently. Use 1:1.8 water ratio. Do not overcook.",
    types: [
      {
        name: "Organic Gobindobhog",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Traditional variety",
        cookingTime: "12-15 mins",
        bestFor: "Bengali dishes",
        waterRatio: "1:1.8",
        glycemicIndex: "Medium"
      }
    ]
  },
  {
    id: 213,
    name: "Ambemohar Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Mango-scented rice from Maharashtra",
    fullDesc: "Ambemohar is a short-grain, aromatic rice from Maharashtra, India. It has a distinct mango-like fragrance (the name means 'mango blossom') and is prized for its soft, fluffy texture when cooked. Perfect for daily meals and traditional Maharashtrian dishes.",
    storageTips: "Store in airtight container to preserve aroma.",
    shelfLife: "1 year",
    keyUses: ["Daily meals", "Puran Poli", "Maharashtrian cuisine"],
    nutritionalInfo: "Aromatic compounds, carbohydrates",
    healthBenefits: ["Digestible", "Aromatic", "Cultural importance"],
    cookingTips: "No soaking needed. Use 1:1.5 water ratio.",
    types: [
      {
        name: "Traditional Ambemohar",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Heirloom variety",
        cookingTime: "12-15 mins",
        bestFor: "Daily meals",
        waterRatio: "1:1.5",
        glycemicIndex: "Medium"
      }
    ]
  },
  {
    id: 214,
    name: "Jeera Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Small grain rice resembling cumin seeds",
    fullDesc: "Jeera rice is a small-grain rice variety that resembles cumin seeds (jeera). It's highly aromatic and used in many Indian dishes, especially in Gujarati and Rajasthani cuisine. Known for its delicate flavor and light texture.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Jeera rice dish", "Pulao", "Gujarati thali"],
    nutritionalInfo: "Light, easily digestible carbohydrates",
    healthBenefits: ["Easy to digest", "Light on stomach"],
    cookingTips: "Rinse well. Use 1:1.5 water ratio.",
    types: [
      {
        name: "Gujarati Jeera Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Traditional variety",
        cookingTime: "12-15 mins",
        bestFor: "Jeera rice, Pulao",
        waterRatio: "1:1.5",
        glycemicIndex: "Medium"
      }
    ]
  },
  {
    id: 215,
    name: "Wild Rice",
    category: "rice",
    categoryDisplay: "Rice",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
    tagline: "Actually a grass seed, not true rice",
    fullDesc: "Wild rice is not actually rice but the seed of aquatic grass native to North America. It has a chewy outer shell, nutty flavor, and is more protein-rich than true rice. Often mixed with other rices for texture and nutrition.",
    storageTips: "Store in airtight container. Can be refrigerated for longer shelf life.",
    shelfLife: "1-2 years",
    keyUses: ["Salads", "Stuffings", "Soups", "Mixed rice dishes"],
    nutritionalInfo: "High in protein, fiber, B vitamins, magnesium, and antioxidants",
    healthBenefits: ["High protein", "Heart healthy", "Rich in antioxidants", "Blood sugar control"],
    cookingTips: "Rinse thoroughly. Use 1:3 water ratio. Cooks like pasta - drain excess water.",
    types: [
      {
        name: "Canadian Wild Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Longer grains",
        cookingTime: "45-50 mins",
        bestFor: "Salads, Stuffings",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      },
      {
        name: "American Wild Rice",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
        description: "Traditional variety",
        cookingTime: "45-55 mins",
        bestFor: "Soups, Blends",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      }
    ]
  },

  // ===== 2. WHEAT FLOURS (4 most important) =====
  {
    id: 301,
    name: "Whole Wheat Flour (Atta)",
    category: "wheatflours",
    categoryDisplay: "Wheat Flours",
    image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=800",
    tagline: "For daily rotis and chapatis",
    fullDesc: "Whole wheat flour, or atta, is made by grinding whole wheat grains including the bran, germ, and endosperm. It's the staple flour for Indian households, used to make rotis, chapatis, parathas, and puris. Rich in fiber and nutrients.",
    storageTips: "Store in airtight container in cool, dry place. Can be refrigerated for longer shelf life.",
    shelfLife: "3-4 months",
    keyUses: ["Roti/Chapati", "Paratha", "Poori", "Thepla"],
    nutritionalInfo: "High in fiber, protein, B vitamins, iron, and magnesium",
    healthBenefits: ["Digestive health", "Sustained energy", "Heart health", "Blood sugar control"],
    cookingTips: "Knead with warm water for soft rotis. Rest dough for 15-20 minutes.",
    types: [
      {
        name: "Stone Ground Atta (Chakki)",
        image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
        description: "Traditionally ground, retains more nutrients",
        bestFor: "Daily rotis, Parathas",
        gluten: "Yes",
        fiber: "High"
      },
      {
        name: "Organic Whole Wheat Flour",
        image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
        description: "Chemical-free, premium quality",
        bestFor: "Health-conscious cooking",
        gluten: "Yes",
        fiber: "High"
      }
    ]
  },
  {
    id: 302,
    name: "All-Purpose Flour (Maida)",
    category: "wheatflours",
    categoryDisplay: "Wheat Flours",
    image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=800",
    tagline: "Refined wheat flour for baking",
    fullDesc: "All-purpose flour, or maida, is refined wheat flour with the bran and germ removed. It has a finer texture and is essential for baking, making bread, cakes, cookies, and many Indian snacks like samosas, bhaturas, and naan.",
    storageTips: "Store in airtight container. Keep away from moisture and pests.",
    shelfLife: "6-8 months",
    keyUses: ["Baking", "Naan", "Bhatura", "Samosas", "Cakes", "Cookies"],
    nutritionalInfo: "Lower in fiber than whole wheat, enriched with iron and B vitamins",
    healthBenefits: ["Quick energy", "Versatile for baking"],
    cookingTips: "Sift before use for lighter texture. Can be mixed with whole wheat for healthier options.",
    types: [
      {
        name: "Unbleached Maida",
        image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
        description: "Naturally aged, no chemical bleaching",
        bestFor: "Baking, Bread",
        gluten: "Yes",
        fiber: "Low"
      },
      {
        name: "Bleached Maida",
        image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
        description: "Chemically treated for whiter color",
        bestFor: "Cakes, Pastries",
        gluten: "Yes",
        fiber: "Low"
      }
    ]
  },
  {
    id: 303,
    name: "Semolina (Sooji/Rava)",
    category: "wheatflours",
    categoryDisplay: "Wheat Flours",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800",
    tagline: "Coarse wheat flour for upma and halwa",
    fullDesc: "Semolina, known as sooji or rava, is coarse-ground wheat middlings. It's used in both sweet and savory dishes - from upma and rava idli to sooji halwa and rava kesari. Also essential for making pasta and couscous.",
    storageTips: "Store in airtight container. Check for insects periodically.",
    shelfLife: "6-12 months",
    keyUses: ["Upma", "Rava Idli", "Sooji Halwa", "Rava Dosa", "Pasta"],
    nutritionalInfo: "Good source of protein, fiber, and B vitamins",
    healthBenefits: ["Easily digestible", "Quick energy", "Versatile"],
    cookingTips: "Roast in ghee/oil before adding water to avoid lumps and enhance flavor.",
    types: [
      {
        name: "Fine Sooji",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
        description: "Finely ground, quick cooking",
        bestFor: "Halwa, Rava Idli, Upma",
        gluten: "Yes",
        fiber: "Medium"
      },
      {
        name: "Coarse Rava",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
        description: "Coarser texture",
        bestFor: "Rava Dosa, Pasta",
        gluten: "Yes",
        fiber: "Medium"
      }
    ]
  },
  {
    id: 304,
    name: "Besan (Gram Flour)",
    category: "wheatflours",
    categoryDisplay: "Wheat Flours",
    image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=800",
    tagline: "Chickpea flour, essential for pakoras",
    fullDesc: "Besan, or gram flour, is made from ground chickpeas. It's a staple in Indian cooking, used for pakoras, kadhi, cheela, and many sweets like besan ladoo and mysore pak. It's naturally gluten-free and high in protein.",
    storageTips: "Store in airtight container. Can turn rancid if exposed to heat or moisture.",
    shelfLife: "3-6 months",
    keyUses: ["Pakoras", "Kadhi", "Besan Chilla", "Ladoo", "Mysore Pak"],
    nutritionalInfo: "High in protein, fiber, iron, and folate. Gluten-free.",
    healthBenefits: ["High protein", "Gluten-free", "Good for diabetics", "Heart health"],
    cookingTips: "Roast before use to remove raw flavor. Mix with water gradually to avoid lumps.",
    types: [
      {
        name: "Regular Besan",
        image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
        description: "Common variety",
        bestFor: "Pakoras, Kadhi, Sweets",
        gluten: "No",
        fiber: "High"
      },
      {
        name: "Roasted Besan",
        image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
        description: "Pre-roasted, nutty flavor",
        bestFor: "Sweets, Chilla",
        gluten: "No",
        fiber: "High"
      }
    ]
  },

  // ===== 3. MILLETS (7 types) =====
  {
    id: 401,
    name: "Pearl Millet (Bajra)",
    category: "millets",
    categoryDisplay: "Millets",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Nutrient-rich millet, staple in Rajasthan",
    fullDesc: "Pearl millet, known as bajra, is a drought-resistant grain widely cultivated in Africa and India. It's a staple in Rajasthani cuisine, used to make bajra roti, khichdi, and porridge. Highly nutritious with more protein than rice or corn.",
    storageTips: "Store in airtight container away from moisture. Can be refrigerated.",
    shelfLife: "6-8 months",
    keyUses: ["Bajra Roti", "Khichdi", "Porridge", "Baking"],
    nutritionalInfo: "High in protein, fiber, iron, magnesium, and antioxidants",
    healthBenefits: ["Heart healthy", "Blood sugar control", "Digestive health", "Gluten-free"],
    cookingTips: "Soak for 4-6 hours before cooking. Mix with wheat flour for softer rotis.",
    types: [
      {
        name: "Whole Bajra",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Whole grains",
        cookingTime: "30-40 mins",
        bestFor: "Porridge, Khichdi",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 402,
    name: "Sorghum (Jowar)",
    category: "millets",
    categoryDisplay: "Millets",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Ancient grain, gluten-free flour",
    fullDesc: "Sorghum, or jowar, is an ancient cereal grain native to Africa. It's a staple in many parts of India, used to make jowar roti, bhakri, and porridge. Naturally gluten-free and rich in antioxidants.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "6-12 months",
    keyUses: ["Jowar Roti", "Bhakri", "Porridge", "Baking"],
    nutritionalInfo: "High in protein, fiber, iron, and B vitamins. Gluten-free.",
    healthBenefits: ["Gluten-free", "Heart health", "Blood sugar control", "Digestive health"],
    cookingTips: "Mix with warm water for dough. Rest for 15-20 minutes before rolling.",
    types: [
      {
        name: "Whole Jowar",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Whole grains",
        cookingTime: "35-45 mins",
        bestFor: "Porridge, Khichdi",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 403,
    name: "Finger Millet (Ragi/Nachni)",
    category: "millets",
    categoryDisplay: "Millets",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Calcium-rich millet, superfood for all ages",
    fullDesc: "Finger millet, known as ragi or nachni, is a powerhouse of nutrition. It's one of the richest sources of calcium among plant foods, making it excellent for bone health. Used to make ragi mudde, porridge, roti, and cookies.",
    storageTips: "Store in airtight container away from moisture and light.",
    shelfLife: "6 months",
    keyUses: ["Ragi Mudde", "Porridge", "Roti", "Cookies", "Dosa"],
    nutritionalInfo: "Very high in calcium, iron, protein, and amino acids",
    healthBenefits: ["Bone health", "Anemia prevention", "Diabetes management", "Weight control"],
    cookingTips: "Roast before making flour for better flavor. Soak grains overnight for cooking.",
    types: [
      {
        name: "Whole Ragi",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Small reddish-brown grains",
        cookingTime: "30-40 mins",
        bestFor: "Mudde, Porridge",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 404,
    name: "Foxtail Millet (Kangni)",
    category: "millets",
    categoryDisplay: "Millets",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Low glycemic index millet",
    fullDesc: "Foxtail millet, known as kangni or thinai, is one of the oldest cultivated millets. It has a low glycemic index, making it excellent for diabetics. Used to make upma, pulao, dosa, and idli.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "1 year",
    keyUses: ["Upma", "Pulao", "Dosa", "Idli", "Porridge"],
    nutritionalInfo: "Rich in carbohydrates, protein, fiber, and iron",
    healthBenefits: ["Diabetes management", "Heart health", "Weight loss", "Digestive health"],
    cookingTips: "Roast lightly before cooking for nutty flavor. Use 1:3 water ratio.",
    types: [
      {
        name: "Whole Foxtail Millet",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Small yellow grains",
        cookingTime: "20-25 mins",
        bestFor: "Upma, Pulao",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 405,
    name: "Barnyard Millet (Sanwa)",
    category: "millets",
    categoryDisplay: "Millets",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Light, easily digestible millet",
    fullDesc: "Barnyard millet, known as sanwa or samak ke chawal, is a light, easily digestible grain. It's popular during fasting (vrat) in India. Cooks quickly and can be used as a rice substitute in many dishes.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1 year",
    keyUses: ["Fasting meals", "Khichdi", "Pulao", "Porridge", "Upma"],
    nutritionalInfo: "High in fiber, iron, and phosphorus. Low in fat.",
    healthBenefits: ["Easily digestible", "Good for fasting", "Weight management", "Heart health"],
    cookingTips: "Rinse well. Use 1:2.5 water ratio. Cooks faster than other millets.",
    types: [
      {
        name: "Whole Barnyard Millet",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Small white grains",
        cookingTime: "15-20 mins",
        bestFor: "Fasting, Khichdi",
        waterRatio: "1:2.5",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 406,
    name: "Kodo Millet (Kodon)",
    category: "millets",
    categoryDisplay: "Millets",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "High antioxidant millet",
    fullDesc: "Kodo millet, known as kodon, is rich in antioxidants and polyphenols. It has a nutty flavor and is used in various dishes like porridge, pulao, and dosa. Particularly beneficial for diabetics due to its low glycemic index.",
    storageTips: "Store in airtight container away from moisture and pests.",
    shelfLife: "1 year",
    keyUses: ["Porridge", "Pulao", "Dosa", "Idli", "Khichdi"],
    nutritionalInfo: "High in fiber, protein, iron, and antioxidants",
    healthBenefits: ["Diabetes management", "Heart health", "Antioxidant rich", "Weight control"],
    cookingTips: "Soak for 4-6 hours before cooking. Use 1:3 water ratio.",
    types: [
      {
        name: "Whole Kodo Millet",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Small brown grains",
        cookingTime: "30-35 mins",
        bestFor: "Pulao, Porridge",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 407,
    name: "Little Millet (Kutki)",
    category: "millets",
    categoryDisplay: "Millets",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Tiny grains, big nutrition",
    fullDesc: "Little millet, known as kutki or samai, has tiny grains that are rich in B vitamins and minerals. It's similar to rice in texture and can be used in a variety of dishes including upma, pulao, and dosa.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "1 year",
    keyUses: ["Upma", "Pulao", "Dosa", "Idli", "Porridge"],
    nutritionalInfo: "High in B vitamins, iron, calcium, and magnesium",
    healthBenefits: ["Bone health", "Energy production", "Diabetes management", "Heart health"],
    cookingTips: "Roast lightly before cooking for better flavor. Use 1:3 water ratio.",
    types: [
      {
        name: "Whole Little Millet",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Tiny yellow-white grains",
        cookingTime: "20-25 mins",
        bestFor: "Upma, Pulao",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      }
    ]
  },

  // ===== 4. OTHER GRAINS (8 types) =====
  {
    id: 501,
    name: "Quinoa",
    category: "othergrains",
    categoryDisplay: "Other Grains",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Protein-rich pseudo-grain",
    fullDesc: "Quinoa is a pseudo-grain (seed) that's become popular as a superfood. It's a complete protein, containing all nine essential amino acids. Naturally gluten-free, it's used in salads, bowls, and as a rice substitute.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "1-2 years",
    keyUses: ["Salads", "Buddha bowls", "Rice substitute", "Breakfast porridge"],
    nutritionalInfo: "Complete protein, high in fiber, magnesium, iron, and antioxidants",
    healthBenefits: ["Complete protein source", "Gluten-free", "Heart health", "Blood sugar control"],
    cookingTips: "Rinse thoroughly before cooking to remove bitter saponins. Use 1:2 water ratio.",
    types: [
      {
        name: "White Quinoa",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Mildest flavor, fluffy texture",
        cookingTime: "15 mins",
        bestFor: "Salads, Side dishes",
        waterRatio: "1:2",
        glycemicIndex: "Low"
      },
      {
        name: "Red Quinoa",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Nutty flavor, holds shape well",
        cookingTime: "15-20 mins",
        bestFor: "Cold salads, Bowls",
        waterRatio: "1:2",
        glycemicIndex: "Low"
      },
      {
        name: "Black Quinoa",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Earthy flavor, crunchy texture",
        cookingTime: "15-20 mins",
        bestFor: "Colorful dishes",
        waterRatio: "1:2",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 502,
    name: "Oats",
    category: "othergrains",
    categoryDisplay: "Other Grains",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
    tagline: "Heart-healthy breakfast grain",
    fullDesc: "Oats are a whole grain known for their heart-healthy beta-glucan fiber. They're a popular breakfast choice and can be used in both sweet and savory dishes. Rich in antioxidants and nutrients.",
    storageTips: "Store in airtight container. Can be refrigerated for longer shelf life.",
    shelfLife: "1 year",
    keyUses: ["Breakfast porridge", "Overnight oats", "Baking", "Smoothies"],
    nutritionalInfo: "High in soluble fiber (beta-glucan), protein, manganese, and antioxidants",
    healthBenefits: ["Lower cholesterol", "Heart health", "Blood sugar control", "Digestive health"],
    cookingTips: "Use rolled oats for porridge, steel-cut for chewier texture. Toast before cooking for nutty flavor.",
    types: [
      {
        name: "Rolled Oats",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Steamed and flattened",
        cookingTime: "5-10 mins",
        bestFor: "Porridge, Baking",
        waterRatio: "1:2",
        glycemicIndex: "Low"
      },
      {
        name: "Steel-Cut Oats",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Chopped, not rolled",
        cookingTime: "20-30 mins",
        bestFor: "Chewy porridge",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      },
      {
        name: "Instant Oats",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Pre-cooked and dried",
        cookingTime: "1-2 mins",
        bestFor: "Quick breakfast",
        waterRatio: "1:2",
        glycemicIndex: "Medium"
      }
    ]
  },
  {
    id: 503,
    name: "Barley (Jau)",
    category: "othergrains",
    categoryDisplay: "Other Grains",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Ancient grain, high in fiber",
    fullDesc: "Barley is one of the oldest cultivated grains, known for its nutty flavor and chewy texture. It's particularly high in fiber, especially beta-glucan, which helps lower cholesterol. Used in soups, stews, and as a rice substitute.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "1-2 years",
    keyUses: ["Soups", "Stews", "Risotto-style dishes", "Salads", "Porridge"],
    nutritionalInfo: "High in soluble fiber, selenium, copper, and B vitamins",
    healthBenefits: ["Lower cholesterol", "Heart health", "Blood sugar control", "Digestive health"],
    cookingTips: "Soak pearled barley for 1 hour, hulled barley overnight. Use 1:3 water ratio.",
    types: [
      {
        name: "Pearled Barley",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Husk and bran removed",
        cookingTime: "25-30 mins",
        bestFor: "Soups, Salads",
        waterRatio: "1:3",
        glycemicIndex: "Medium"
      },
      {
        name: "Hulled Barley",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Only inedible hull removed",
        cookingTime: "45-60 mins",
        bestFor: "Nutrient-rich dishes",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 504,
    name: "Corn (Makai)",
    category: "othergrains",
    categoryDisplay: "Other Grains",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
    tagline: "Versatile grain, can be eaten fresh or dried",
    fullDesc: "Corn or maize is a versatile grain that can be eaten fresh, dried, or ground into flour. It's a staple in many cuisines, used for making tortillas, cornbread, polenta, and various Indian dishes like makki di roti.",
    storageTips: "Store dried corn in airtight container. Fresh corn refrigerate.",
    shelfLife: "Dried: 1-2 years, Fresh: 5-7 days",
    keyUses: ["Makki di Roti", "Cornbread", "Polenta", "Popcorn", "Salads"],
    nutritionalInfo: "Rich in carbohydrates, fiber, B vitamins, and antioxidants (lutein, zeaxanthin)",
    healthBenefits: ["Eye health", "Digestive health", "Energy source", "Gluten-free"],
    cookingTips: "Fresh corn: boil 5-7 mins. Dried corn: soak overnight, cook 45-60 mins.",
    types: [
      {
        name: "Sweet Corn",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Fresh, sweet variety",
        cookingTime: "5-7 mins",
        bestFor: "Salads, Grilling, Snacks",
        glycemicIndex: "Medium"
      },
      {
        name: "Dried Corn",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Whole dried kernels",
        cookingTime: "45-60 mins",
        bestFor: "Soups, Stews",
        glycemicIndex: "Medium"
      },
      {
        name: "Popcorn",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Special variety that pops",
        cookingTime: "2-5 mins",
        bestFor: "Snacking",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 505,
    name: "Buckwheat (Kuttu)",
    category: "othergrains",
    categoryDisplay: "Other Grains",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Gluten-free pseudo-grain for fasting",
    fullDesc: "Buckwheat, known as kuttu, is a pseudo-grain popular during Hindu fasting (vrat). Despite its name, it's not related to wheat and is gluten-free. The groats are used in porridge, while the flour makes kuttu ka atta for puris and chillas.",
    storageTips: "Store in airtight container away from moisture and light.",
    shelfLife: "1 year",
    keyUses: ["Kuttu ka Atta", "Fasting puris", "Kuttu Khichdi", "Porridge"],
    nutritionalInfo: "High in protein, fiber, magnesium, and antioxidants (rutin)",
    healthBenefits: ["Gluten-free", "Heart health", "Blood sugar control", "Anti-inflammatory"],
    cookingTips: "Toast groats before cooking for nutty flavor. Use 1:2 water ratio for groats.",
    types: [
      {
        name: "Buckwheat Groats",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Whole hulled seeds",
        cookingTime: "15-20 mins",
        bestFor: "Porridge, Khichdi",
        waterRatio: "1:2",
        glycemicIndex: "Low"
      },
      {
        name: "Buckwheat Flour",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Ground from groats",
        bestFor: "Puris, Chillas, Pancakes",
        gluten: "No",
        fiber: "High"
      }
    ]
  },
  {
    id: 506,
    name: "Amaranth (Ramdana/Chaulai)",
    category: "othergrains",
    categoryDisplay: "Other Grains",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Ancient grain, complete protein",
    fullDesc: "Amaranth, known as ramdana or chaulai, is an ancient grain that was a staple of Aztec and Inca civilizations. It's a complete protein and particularly rich in lysine, an amino acid often lacking in grains. Used in porridge, popped like popcorn, and as flour.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "6-12 months",
    keyUses: ["Porridge", "Popped amaranth", "Flour for baking", "Laddoos"],
    nutritionalInfo: "Complete protein, high in fiber, iron, magnesium, and calcium",
    healthBenefits: ["Complete protein", "Bone health", "Heart health", "Gluten-free"],
    cookingTips: "Use 1:3 water ratio for cooking grains. Toast before cooking for nutty flavor.",
    types: [
      {
        name: "Amaranth Seeds",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Tiny golden seeds",
        cookingTime: "20-25 mins",
        bestFor: "Porridge, Salads",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      },
      {
        name: "Amaranth Flour",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Ground amaranth",
        bestFor: "Baking, Rotis",
        gluten: "No",
        fiber: "High"
      },
      {
        name: "Popped Amaranth",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Heat-popped seeds",
        bestFor: "Laddoos, Granola",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 507,
    name: "Rye",
    category: "othergrains",
    categoryDisplay: "Other Grains",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Hardy grain for dense, flavorful breads",
    fullDesc: "Rye is a cereal grain closely related to wheat and barley. It's known for its distinctive slightly sour flavor and is traditionally used in European breads like pumpernickel and rye bread. Rye flour makes dense, heavy breads due to its low gluten content.",
    storageTips: "Store in airtight container away from moisture and pests.",
    shelfLife: "1 year",
    keyUses: ["Rye bread", "Pumpernickel", "Crispbread", "Whiskey"],
    nutritionalInfo: "High in fiber, B vitamins, iron, and magnesium",
    healthBenefits: ["Digestive health", "Heart health", "Blood sugar control", "Satiety"],
    cookingTips: "Rye flour has less gluten than wheat - mix with wheat flour for lighter breads.",
    types: [
      {
        name: "Whole Rye Berries",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Whole grains",
        cookingTime: "45-60 mins",
        bestFor: "Soups, Salads",
        waterRatio: "1:3",
        glycemicIndex: "Low"
      },
      {
        name: "Rye Flour",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Ground rye berries",
        bestFor: "Rye bread",
        gluten: "Low",
        fiber: "High"
      }
    ]
  },
  {
    id: 508,
    name: "Tapioca (Sabudana)",
    category: "othergrains",
    categoryDisplay: "Other Grains",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
    tagline: "Starch pearls for fasting and desserts",
    fullDesc: "Tapioca, known as sabudana, is starch extracted from cassava root. It's not a true grain but used like one in Indian cooking. Popular during fasting, used to make sabudana khichdi, vada, and kheer. Also used in puddings and bubble tea.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Sabudana Khichdi", "Vada", "Kheer", "Bubble tea", "Pudding"],
    nutritionalInfo: "Primarily carbohydrates, low in protein and fat",
    healthBenefits: ["Quick energy", "Easily digestible", "Gluten-free", "Good for fasting"],
    cookingTips: "Soak overnight for khichdi. Rinse before use. Do not overcook or they become mushy.",
    types: [
      {
        name: "Small Pearl Tapioca",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Tiny pearls, cooks quickly",
        cookingTime: "10-15 mins after soaking",
        bestFor: "Khichdi, Vada",
        glycemicIndex: "High"
      },
      {
        name: "Large Pearl Tapioca",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
        description: "Large pearls, chewy texture",
        cookingTime: "30-45 mins",
        bestFor: "Bubble tea, Puddings",
        glycemicIndex: "High"
      }
    ]
  },
    // ===== 5. PULSES (17 types) =====
  {
    id: 601,
    name: "Toor Daal (Pigeon Pea)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Yellow split pigeon peas, staple daal",
    fullDesc: "Toor daal, also known as arhar daal or pigeon pea, is one of the most widely consumed lentils in India. It has a mild, nutty flavor and forms the base of many everyday meals. Essential for sambar and everyday dal preparation.",
    storageTips: "Store in airtight container in cool, dry place. Check for insects periodically.",
    shelfLife: "1-2 years",
    keyUses: ["Sambar", "Plain Dal", "Dal Fry", "Dal Tadka"],
    nutritionalInfo: "High in protein (22%), fiber, folate, magnesium, and potassium",
    healthBenefits: ["Heart healthy", "Good for digestion", "Energy booster", "Blood sugar control"],
    cookingTips: "Pressure cook for 3-4 whistles. Can be cooked with vegetables for added nutrition.",
    types: [
      {
        name: "Regular Toor Dal",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Common variety, oil-coated for shine",
        cookingTime: "30-40 mins (pressure cooker)",
        bestFor: "Daily dal, Sambar",
        protein: "22%",
        glycemicIndex: "Low"
      },
      {
        name: "Unpolished Toor Dal",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "No oil coating, more natural",
        cookingTime: "35-45 mins",
        bestFor: "Health-conscious cooking",
        protein: "22%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 602,
    name: "Moong Dal (Split Green Gram)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
    tagline: "Light, easy-to-digest dal",
    fullDesc: "Moong dal is split and skinned green gram. It's one of the lightest and most digestible dals, making it perfect for people with sensitive stomachs, during illness, or for babies. Used in khichdi, soups, and simple dal preparations.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Khichdi", "Moong Dal Soup", "Dal Fry", "Cheela (pancakes)"],
    nutritionalInfo: "High in protein (24%), fiber, iron, and potassium",
    healthBenefits: ["Easy to digest", "Good for weight loss", "Detoxifying", "Cooling effect"],
    cookingTips: "Cooks quickly. No soaking needed. Use 1:3 dal to water ratio.",
    types: [
      {
        name: "Yellow Moong Dal",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Split and skinned, yellow color",
        cookingTime: "20-25 mins",
        bestFor: "Khichdi, Dal, Soup",
        protein: "24%",
        glycemicIndex: "Low"
      },
      {
        name: "Whole Moong (Green Gram)",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Whole green gram with skin",
        cookingTime: "35-40 mins",
        bestFor: "Sprouts, Curries",
        protein: "24%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 603,
    name: "Masoor Dal (Red Lentil)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Quick-cooking pinkish-red lentils",
    fullDesc: "Masoor dal are red lentils that cook very quickly and turn golden-yellow when cooked. They have a slightly earthy, nutty flavor and are popular in both Indian and Western cuisine. Excellent for soups and quick dal preparations.",
    storageTips: "Store in airtight container. Keep away from moisture.",
    shelfLife: "1 year",
    keyUses: ["Masoor Dal Curry", "Lentil Soup", "Salads", "Dal Makhani (with urad)"],
    nutritionalInfo: "High in protein (26%), fiber, iron, and folate",
    healthBenefits: ["Heart healthy", "Good for anemia", "Quick energy", "Weight management"],
    cookingTips: "No soaking needed. Cooks in 15-20 minutes. Skim off foam while cooking.",
    types: [
      {
        name: "Red Masoor Dal",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Split red lentils",
        cookingTime: "15-20 mins",
        bestFor: "Quick dal, Soup",
        protein: "26%",
        glycemicIndex: "Low"
      },
      {
        name: "Brown Masoor (Whole)",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Whole brown lentils",
        cookingTime: "25-30 mins",
        bestFor: "Salads, Side dishes",
        protein: "26%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 604,
    name: "Chana Dal (Split Chickpea)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=800",
    tagline: "Split Bengal gram, nutty and hearty",
    fullDesc: "Chana dal is split chickpeas (Bengal gram). It has a nutty flavor and holds its shape well when cooked, making it perfect for hearty curries, snacks, and sweet dishes. It's richer and more substantial than other dals.",
    storageTips: "Store in airtight container. Check for insects regularly.",
    shelfLife: "1-2 years",
    keyUses: ["Chana Dal Curry", "Vada", "Chutney", "Payasam/Kheer", "Halwa"],
    nutritionalInfo: "High in protein (20%), fiber, iron, and complex carbohydrates",
    healthBenefits: ["Sustained energy", "Good for diabetes", "Heart healthy", "Weight management"],
    cookingTips: "Soak for 2-3 hours before cooking for softer texture. Pressure cook for 4-5 whistles.",
    types: [
      {
        name: "Regular Chana Dal",
        image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
        description: "Common variety, golden yellow",
        cookingTime: "40-50 mins",
        bestFor: "Curries, Snacks",
        protein: "20%",
        glycemicIndex: "Low"
      },
      {
        name: "Roasted Chana Dal",
        image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
        description: "Dry roasted, used in snacks",
        bestFor: "Chutney, Snack mix",
        protein: "20%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 605,
    name: "Urad Dal (Black Gram)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Creamy, rich dal for special dishes",
    fullDesc: "Urad dal, or black gram, is a rich, creamy lentil used in many North Indian specialties. It's the key ingredient in dal makhani, and when ground with rice, makes idli and dosa batter. It has a unique earthy flavor and mucilaginous texture when cooked.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Dal Makhani", "Idli/Dosa Batter", "Vada", "Papad", "Khari (Punjabi dish)"],
    nutritionalInfo: "High in protein (25%), fiber, iron, and calcium",
    healthBenefits: ["Bone health", "Energy booster", "Good for skin", "Digestive health"],
    cookingTips: "Soak overnight for idli/dosa batter. Whole urad takes longer to cook than split.",
    types: [
      {
        name: "Whole Urad (Sabut)",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Whole black gram with skin",
        cookingTime: "50-60 mins",
        bestFor: "Dal Makhani, Curries",
        protein: "25%",
        glycemicIndex: "Low"
      },
      {
        name: "Split Urad (Dhuli)",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Split and skinned, white color",
        cookingTime: "30-40 mins",
        bestFor: "Idli/Dosa batter, Vada",
        protein: "25%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 606,
    name: "Rajma (Kidney Beans)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Large kidney beans for rajma chawal",
    fullDesc: "Rajma are kidney beans, a beloved ingredient in North Indian cuisine. The iconic dish 'rajma chawal' (kidney beans with rice) is a comfort food classic. They have a creamy texture and absorb flavors beautifully.",
    storageTips: "Store in airtight container. Keep away from moisture and pests.",
    shelfLife: "1-2 years",
    keyUses: ["Rajma Curry", "Rajma Chawal", "Salads", "Burritos"],
    nutritionalInfo: "High in protein, fiber, iron, and folate",
    healthBenefits: ["Heart healthy", "Blood sugar control", "Digestive health", "Weight management"],
    cookingTips: "Soak overnight (8-10 hours). Pressure cook for 5-6 whistles. Never eat raw or undercooked.",
    types: [
      {
        name: "Red Rajma",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Common red kidney beans",
        cookingTime: "45-60 mins (after soaking)",
        bestFor: "Rajma Curry, Mexican dishes",
        protein: "24%",
        glycemicIndex: "Low"
      },
      {
        name: "Chitra Rajma",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Smaller, speckled variety",
        cookingTime: "40-50 mins",
        bestFor: "North Indian cuisine",
        protein: "24%",
        glycemicIndex: "Low"
      },
      {
        name: "White Rajma",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "White kidney beans",
        cookingTime: "45-55 mins",
        bestFor: "Salads, Soups",
        protein: "24%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 607,
    name: "Chole (Kabuli Chana)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1540420828642-fca2c5c18abb?auto=format&fit=crop&w=800",
    tagline: "White chickpeas for chole bhature",
    fullDesc: "Chole, also known as Kabuli chana or chickpeas, are large, light-colored chickpeas. They're the star ingredient in the famous North Indian dish 'chole bhature'. They have a nutty flavor and firm texture that holds up well in curries.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "1-2 years",
    keyUses: ["Chole Bhature", "Chole Kulche", "Chana Masala", "Salads", "Hummus"],
    nutritionalInfo: "High in protein (19%), fiber, folate, and manganese",
    healthBenefits: ["Heart healthy", "Blood sugar control", "Weight management", "Digestive health"],
    cookingTips: "Soak overnight (8-10 hours). Pressure cook for 4-5 whistles. Add tea bags for dark color.",
    types: [
      {
        name: "Large Kabuli Chana",
        image: "https://images.unsplash.com/photo-1540420828642-fca2c5c18abb?auto=format&fit=crop&w=300",
        description: "Large, light-colored chickpeas",
        cookingTime: "45-60 mins",
        bestFor: "Chole, Curries",
        protein: "19%",
        glycemicIndex: "Low"
      },
      {
        name: "Desi Chana (Brown)",
        image: "https://images.unsplash.com/photo-1540420828642-fca2c5c18abb?auto=format&fit=crop&w=300",
        description: "Smaller, darker chickpeas",
        cookingTime: "50-65 mins",
        bestFor: "Curries, Snacks",
        protein: "20%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 608,
    name: "Kala Chana (Black Chickpeas)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Small black chickpeas, earthy flavor",
    fullDesc: "Kala chana, or black chickpeas, are smaller and darker than regular chickpeas with a stronger, earthier flavor and firmer texture. They're highly nutritious and popular in North Indian and Bengali cuisine. Often eaten as sprouted or in curries.",
    storageTips: "Store in airtight container. Check for insects periodically.",
    shelfLife: "1-2 years",
    keyUses: ["Kala Chana Curry", "Chaat", "Sprouts", "Snacks"],
    nutritionalInfo: "Very high in protein (20%), fiber, iron, and antioxidants",
    healthBenefits: ["High protein", "Good for anemia", "Digestive health", "Weight management"],
    cookingTips: "Soak overnight (8-10 hours). Pressure cook for 5-6 whistles. Sprout for salads.",
    types: [
      {
        name: "Whole Kala Chana",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Small black chickpeas",
        cookingTime: "50-65 mins",
        bestFor: "Curries, Sprouts",
        protein: "20%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 609,
    name: "Lobhia (Black Eyed Peas)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Creamy beans with black eye",
    fullDesc: "Lobhia, also known as black-eyed peas or cowpeas, are creamy beans with a distinctive black spot. They're popular in Southern Indian cuisine and are known for being easy to digest. Used in curries, stir-fries, and as a side dish.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Lobhia Curry", "Stir-fry", "Salads", "South Indian dishes"],
    nutritionalInfo: "High in protein (24%), fiber, folate, and potassium",
    healthBenefits: ["Heart healthy", "Digestive health", "Energy booster", "Bone health"],
    cookingTips: "Soak for 4-6 hours. Cooks faster than other beans. Can be sprouted.",
    types: [
      {
        name: "Regular Lobhia",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Creamy beans with black eye",
        cookingTime: "30-40 mins",
        bestFor: "Curries, Salads",
        protein: "24%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 610,
    name: "Matar (Green Peas)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Sweet, versatile green peas",
    fullDesc: "Matar, or green peas, are one of the most beloved vegetables in Indian cuisine. They can be used fresh, frozen, or dried. Dried matar (whole dried peas) are used in curries, while split matar (matar dal) is less common but used in some regions.",
    storageTips: "Store dried peas in airtight container. Fresh/frozen peas in freezer.",
    shelfLife: "Dried: 1 year, Frozen: 6-8 months",
    keyUses: ["Matar Paneer", "Matar Kulcha", "Aloo Matar", "Samosa filling", "Matar Kachori"],
    nutritionalInfo: "Rich in protein, fiber, vitamins A, C, K, and iron",
    healthBenefits: ["Eye health", "Immune booster", "Digestive health", "Heart health"],
    cookingTips: "Dried peas: soak overnight. Fresh/frozen: add towards end of cooking.",
    types: [
      {
        name: "Fresh/Frozen Peas",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Fresh or frozen green peas",
        cookingTime: "5-10 mins",
        bestFor: "Vegetable dishes, Pulao",
        protein: "5%",
        glycemicIndex: "Low"
      },
      {
        name: "Dried Green Peas",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Whole dried peas",
        cookingTime: "40-50 mins after soaking",
        bestFor: "Curries, Snacks",
        protein: "22%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 611,
    name: "Moath Dal (Moth Bean)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Small brown beans, popular in Rajasthan",
    fullDesc: "Moath dal, also known as moth bean or mat bean, is a small, brownish bean popular in Rajasthan and North India. It's drought-resistant and highly nutritious. Used to make the famous Rajasthani dish 'moath dal ka chilla' and various curries.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Moath Dal Curry", "Chilla (pancakes)", "Khichdi", "Sprouts"],
    nutritionalInfo: "High in protein, fiber, iron, and calcium",
    healthBenefits: ["Bone health", "Digestive health", "Energy booster"],
    cookingTips: "Soak for 4-6 hours. Cooks faster than other beans. Can be sprouted easily.",
    types: [
      {
        name: "Whole Moath",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Small brown beans",
        cookingTime: "35-45 mins",
        bestFor: "Curries, Sprouts",
        protein: "23%",
        glycemicIndex: "Low"
      },
      {
        name: "Split Moath Dal",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Split version, cooks faster",
        cookingTime: "25-30 mins",
        bestFor: "Dal, Chilla",
        protein: "23%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 612,
    name: "Kulthi Dal (Horse Gram)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Brown lentil with medicinal properties",
    fullDesc: "Kulthi dal, or horse gram, is a brownish-red lentil known for its medicinal properties in Ayurveda. It's particularly valued for its ability to dissolve kidney stones and aid in weight loss. Popular in South Indian and Himalayan cuisine.",
    storageTips: "Store in airtight container. Keep away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Kulith Saar (soup)", "Usal", "Sprouts", "Medicinal preparations"],
    nutritionalInfo: "Very high in protein (22-25%), iron, calcium, and phosphorus",
    healthBenefits: ["Kidney stone prevention", "Weight loss", "Digestive health", "Anti-inflammatory"],
    cookingTips: "Soak overnight (8-10 hours). Pressure cook for 5-6 whistles. Water can be used medicinally.",
    types: [
      {
        name: "Whole Kulthi",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Small brown-red lentils",
        cookingTime: "50-60 mins",
        bestFor: "Soup, Medicinal use",
        protein: "22%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 613,
    name: "Soybean",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "High-protein bean for vegetarian protein",
    fullDesc: "Soybeans are one of the few plant-based complete proteins, containing all essential amino acids. They're incredibly versatile and used to make tofu, tempeh, soy milk, and various Indian dishes. An excellent meat substitute for vegetarians.",
    storageTips: "Store in airtight container away from moisture and light.",
    shelfLife: "1 year",
    keyUses: ["Soy chunks", "Tofu", "Soy milk", "Curries", "Snacks"],
    nutritionalInfo: "Complete protein (36-40%), high in fiber, iron, calcium, and omega-3 fatty acids",
    healthBenefits: ["Complete protein source", "Heart health", "Bone health", "Menopause relief"],
    cookingTips: "Soak overnight. Remove skin for better digestibility. Must be cooked thoroughly.",
    types: [
      {
        name: "Whole Soybeans",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Small yellow beans",
        cookingTime: "60-90 mins after soaking",
        bestFor: "Curries, Snacks",
        protein: "36%",
        glycemicIndex: "Low"
      },
      {
        name: "Soy Chunks (Nutrela)",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Textured vegetable protein",
        cookingTime: "10-15 mins (boil)",
        bestFor: "Curries, Pulao",
        protein: "52%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 614,
    name: "Val Dal (Field Bean)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Flat beans popular in Konkan region",
    fullDesc: "Val dal, also known as field beans or broad beans, are flat, oval beans popular in Maharashtra, Goa, and Konkan regions. They have a unique flavor and are used in curries, usal, and as a side dish. Also available dried or fresh.",
    storageTips: "Store dried val in airtight container. Fresh val in refrigerator.",
    shelfLife: "Dried: 1 year, Fresh: 5-7 days",
    keyUses: ["Val Usal", "Curries", "Side dish", "Maharashtrian cuisine"],
    nutritionalInfo: "High in protein, fiber, iron, and B vitamins",
    healthBenefits: ["Digestive health", "Heart health", "Energy booster"],
    cookingTips: "Dried val: soak overnight. Fresh val: remove strings, cook until tender.",
    types: [
      {
        name: "Dried Val",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Dried field beans",
        cookingTime: "40-50 mins after soaking",
        bestFor: "Usal, Curries",
        protein: "24%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 615,
    name: "Whole Moong (Green Gram)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
    tagline: "Whole green gram for sprouts and curries",
    fullDesc: "Whole moong, or green gram with skin, is a highly nutritious lentil. It's most popular for making bean sprouts, which are used in salads and stir-fries. Also used in curries, especially in South India, and has a slightly different flavor than split moong.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Sprouts", "Curries", "Salads", "Stir-fries"],
    nutritionalInfo: "High in protein (24%), fiber, iron, and potassium",
    healthBenefits: ["Easy to digest", "Good for weight loss", "Detoxifying", "Cooling effect"],
    cookingTips: "For sprouts: soak overnight, drain, keep moist for 1-2 days. For cooking: soak 4-6 hours.",
    types: [
      {
        name: "Whole Green Moong",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
        description: "Small green beans with skin",
        cookingTime: "35-40 mins after soaking",
        bestFor: "Sprouts, Curries",
        protein: "24%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 616,
    name: "Whole Masoor (Brown Lentil)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Whole brown lentils, earthy flavor",
    fullDesc: "Whole masoor, or brown lentils, are lentils with their skin intact. They have an earthier flavor than split red masoor and hold their shape better when cooked. Popular in Western cuisine for salads and soups, and also used in Indian dishes.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Lentil soup", "Salads", "Curries", "Side dishes"],
    nutritionalInfo: "High in protein (26%), fiber, iron, and folate",
    healthBenefits: ["Heart healthy", "Good for anemia", "Digestive health"],
    cookingTips: "Soak for 2-4 hours before cooking. Don't overcook if you want them to hold shape.",
    types: [
      {
        name: "Whole Brown Masoor",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Small brown lentils",
        cookingTime: "25-30 mins after soaking",
        bestFor: "Salads, Soups",
        protein: "26%",
        glycemicIndex: "Low"
      }
    ]
  },
  {
    id: 617,
    name: "Whole Urad (Black Gram)",
    category: "pulses",
    categoryDisplay: "Pulses",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
    tagline: "Whole black gram for hearty curries",
    fullDesc: "Whole urad, or black gram with skin, is a rich, earthy lentil that's essential for dishes like dal makhani. It has a distinctive black skin and creamy white interior. Takes longer to cook than split urad but has a superior flavor and texture.",
    storageTips: "Store in airtight container away from moisture.",
    shelfLife: "1-2 years",
    keyUses: ["Dal Makhani", "Hearty curries", "Punjabi cuisine"],
    nutritionalInfo: "High in protein (25%), fiber, iron, and calcium",
    healthBenefits: ["Bone health", "Energy booster", "Digestive health"],
    cookingTips: "Soak overnight (8-10 hours). Pressure cook for 5-6 whistles. Don't add salt until cooked.",
    types: [
      {
        name: "Whole Black Urad",
        image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
        description: "Black gram with skin",
        cookingTime: "50-60 mins after soaking",
        bestFor: "Dal Makhani, Curries",
        protein: "25%",
        glycemicIndex: "Low"
      }
    ]
  },
    // ===== 8. SEEDS (8 types) =====
  {
    id: 901,
    name: "Watermelon Seeds (Tarbooz ke Beej)",
    category: "seeds",
    categoryDisplay: "Seeds",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Tiny seeds, big nutrition",
    fullDesc: "Watermelon seeds are small but packed with nutrition. They're rich in protein, healthy fats, and minerals. In India, they're often dried and roasted as a snack, or ground into powder for use in curries and chutneys. Also used in traditional medicine.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "1 year",
    keyUses: ["Snacking (roasted)", "Chutney powder", "Thickening agent", "Smoothies"],
    nutritionalInfo: "High in protein, magnesium, iron, and healthy fats",
    healthBenefits: ["Heart health", "Energy booster", "Skin health", "Blood sugar control"],
    cookingTips: "Roast until they pop for snacking. Grind into powder for use in recipes.",
    types: [
      {
        name: "Raw Watermelon Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Unroasted, can be sprouted",
        bestFor: "Sprouting, Grinding",
        soaking: "8-10 hours",
        benefits: "Highest nutrition"
      },
      {
        name: "Roasted Watermelon Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Crispy, salted snack",
        bestFor: "Snacking",
        benefits: "Crunchy flavor"
      }
    ]
  },
  {
    id: 902,
    name: "Pumpkin Seeds (Kaddu ke Beej)",
    category: "seeds",
    categoryDisplay: "Seeds",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Flat green seeds, zinc rich",
    fullDesc: "Pumpkin seeds, also known as pepitas, are flat, dark green seeds with a chewy texture and nutty flavor. They're one of the best sources of zinc and are excellent for prostate health. Popular roasted as a snack or sprinkled on salads.",
    storageTips: "Store in airtight container. Refrigerate for longer shelf life.",
    shelfLife: "6-12 months",
    keyUses: ["Snacking", "Salads", "Trail mix", "Baking", "Smoothies"],
    nutritionalInfo: "Rich in zinc, magnesium, iron, and healthy fats",
    healthBenefits: ["Prostate health", "Immune support", "Heart health", "Sleep aid"],
    cookingTips: "Roast with salt and spices for snacking. Great in granola and trail mix.",
    types: [
      {
        name: "Raw Pumpkin Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Unroasted, with shell",
        bestFor: "Roasting, Sprouting",
        soaking: "6-8 hours",
        benefits: "Highest zinc"
      },
      {
        name: "Shelled Pumpkin Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Green kernels only",
        bestFor: "Snacking, Salads",
        benefits: "Ready to eat"
      },
      {
        name: "Roasted Pumpkin Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Seasoned, crunchy",
        bestFor: "Snacking",
        benefits: "Enhanced flavor"
      }
    ]
  },
  {
    id: 903,
    name: "Sunflower Seeds",
    category: "seeds",
    categoryDisplay: "Seeds",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Tiny seeds from sunflower heads",
    fullDesc: "Sunflower seeds come from the center of sunflower heads. They have a mild, nutty flavor and are popular in trail mixes, salads, and baking. Rich in vitamin E and selenium. Also used to make sunflower seed butter for those with nut allergies.",
    storageTips: "Store in airtight container. Refrigerate for longer shelf life.",
    shelfLife: "6-12 months",
    keyUses: ["Snacking", "Salads", "Trail mix", "Baking", "Sunflower butter"],
    nutritionalInfo: "Rich in vitamin E, selenium, healthy fats, and protein",
    healthBenefits: ["Heart health", "Skin health", "Thyroid function", "Antioxidant rich"],
    cookingTips: "Toast for enhanced flavor. Great in granola, breads, and salads.",
    types: [
      {
        name: "In-Shell Sunflower",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Whole seeds with shell",
        bestFor: "Snacking (crack with teeth)",
        benefits: "Fun to eat"
      },
      {
        name: "Shelled Sunflower",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Kernels only",
        bestFor: "Baking, Salads",
        benefits: "Convenient"
      },
      {
        name: "Roasted Sunflower",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Salted or unsalted",
        bestFor: "Snacking",
        benefits: "Crunchy"
      }
    ]
  },
  {
    id: 904,
    name: "Flax Seeds (Alsi)",
    category: "seeds",
    categoryDisplay: "Seeds",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Tiny brown seeds, omega-3 powerhouse",
    fullDesc: "Flax seeds, also known as linseeds or alsi, are tiny brown or golden seeds that are one of the richest plant sources of omega-3 fatty acids. They're also packed with fiber and lignans. Must be ground for nutrient absorption. Used in smoothies, baking, and as egg substitute.",
    storageTips: "Store whole seeds in airtight container. Ground seeds in refrigerator.",
    shelfLife: "Whole: 1 year, Ground: 3 months",
    keyUses: ["Smoothies", "Baking", "Egg substitute", "Porridge", "Digestive health"],
    nutritionalInfo: "Very high in omega-3 (ALA), fiber, and lignans",
    healthBenefits: ["Heart health", "Digestive health", "Hormonal balance", "Anti-inflammatory"],
    cookingTips: "Grind just before use for maximum nutrition. Use 1 tbsp ground flax + 3 tbsp water = 1 egg.",
    types: [
      {
        name: "Brown Flax Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Most common variety",
        bestFor: "Grinding, Health uses",
        soaking: "Overnight",
        benefits: "Omega-3 rich"
      },
      {
        name: "Golden Flax Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Milder flavor",
        bestFor: "Baking, Smoothies",
        soaking: "Overnight",
        benefits: "Same nutrition"
      },
      {
        name: "Ground Flax (Flaxmeal)",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Pre-ground, convenient",
        bestFor: "Quick use",
        benefits: "Ready to use"
      }
    ]
  },
  {
    id: 905,
    name: "Chia Seeds",
    category: "seeds",
    categoryDisplay: "Seeds",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Tiny seeds that form a gel",
    fullDesc: "Chia seeds are tiny black or white seeds from the Salvia hispanica plant. They're famous for their ability to absorb up to 10-12 times their weight in water, forming a gel-like consistency. Rich in omega-3s, fiber, and protein. Used in puddings, smoothies, and as an egg substitute.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "2 years",
    keyUses: ["Chia pudding", "Smoothies", "Egg substitute", "Overnight oats", "Garnishing"],
    nutritionalInfo: "High in omega-3 (ALA), fiber, protein, calcium, and antioxidants",
    healthBenefits: ["Heart health", "Digestive health", "Hydration", "Bone health", "Blood sugar control"],
    cookingTips: "Soak in liquid for at least 20 minutes to form gel. Use 1 tbsp chia + 3 tbsp water = 1 egg.",
    types: [
      {
        name: "Black Chia Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Most common variety",
        bestFor: "Puddings, Smoothies",
        soaking: "20 mins",
        benefits: "Omega-3 rich"
      },
      {
        name: "White Chia Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Less common, same nutrition",
        bestFor: "Light-colored dishes",
        soaking: "20 mins",
        benefits: "Same as black"
      }
    ]
  },
  {
    id: 906,
    name: "Sesame Seeds (Til)",
    category: "seeds",
    categoryDisplay: "Seeds",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Tiny seeds, big calcium content",
    fullDesc: "Sesame seeds are tiny, flat seeds with a nutty flavor when roasted. They're one of the oldest cultivated crops and are incredibly rich in calcium. Used extensively in Indian cuisine for tempering, making til ke laddoo (winter sweets), chutneys, and garnishing breads.",
    storageTips: "Store in airtight container. Can be refrigerated to prevent rancidity.",
    shelfLife: "6-12 months",
    keyUses: ["Tempering (tadka)", "Til Ke Laddoo", "Garnishing", "Tahini", "Chutney"],
    nutritionalInfo: "Very high in calcium, healthy fats, iron, and magnesium",
    healthBenefits: ["Bone health", "Heart health", "Skin health", "Warming for winter"],
    cookingTips: "Roast until golden for enhanced nutty flavor. Grind into tahini for hummus.",
    types: [
      {
        name: "White Sesame Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Hulled, most common",
        bestFor: "Tempering, Sweets, Garnishing",
        roasting: "2-3 mins",
        benefits: "High calcium"
      },
      {
        name: "Black Sesame Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "With hull, stronger flavor",
        bestFor: "Medicinal use, Garnishing",
        roasting: "2-3 mins",
        benefits: "More antioxidants"
      },
      {
        name: "Roasted Sesame Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Pre-roasted",
        bestFor: "Quick use",
        benefits: "Ready to use"
      }
    ]
  },
  {
    id: 907,
    name: "Poppy Seeds (Khashkhas)",
    category: "seeds",
    categoryDisplay: "Seeds",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Tiny white seeds for thickening",
    fullDesc: "Poppy seeds are tiny, oil-rich seeds with a nutty flavor. In Indian cuisine, they're used to thicken curries and add richness. White poppy seeds are ground into a paste for creamy gravies like korma. Also used in sweets and as a filling in pastries.",
    storageTips: "Store in airtight container away from light.",
    shelfLife: "1 year",
    keyUses: ["Thickening curries", "Korma paste", "Sweets", "Baking", "Garnishing"],
    nutritionalInfo: "Rich in calcium, phosphorus, healthy fats, and fiber",
    healthBenefits: ["Bone health", "Digestive health", "Sleep aid", "Skin health"],
    cookingTips: "Soak and grind for creamy gravies. Roast dry for sprinkling on breads.",
    types: [
      {
        name: "White Poppy Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Common in Indian cooking",
        bestFor: "Curries, Korma paste",
        soaking: "2-3 hours",
        benefits: "Creamy texture"
      },
      {
        name: "Black/Blue Poppy Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Smaller, stronger flavor",
        bestFor: "Baking, Sprinkling",
        benefits: "Intense flavor"
      }
    ]
  },
  {
    id: 908,
    name: "Melon Seeds (Kharbuza ke Beej)",
    category: "seeds",
    categoryDisplay: "Seeds",
    image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
    tagline: "Creamy seeds from muskmelon",
    fullDesc: "Melon seeds, from muskmelon or cantaloupe, are creamy-white seeds with a mild, nutty flavor. They're highly nutritious and often dried and roasted as a snack. Also ground into powder for use in smoothies, chutneys, and as a thickener in some regional cuisines.",
    storageTips: "Store in airtight container in cool, dry place.",
    shelfLife: "1 year",
    keyUses: ["Snacking (roasted)", "Smoothies", "Chutney powder", "Thickening"],
    nutritionalInfo: "Rich in protein, healthy fats, iron, and zinc",
    healthBenefits: ["Heart health", "Energy booster", "Skin health", "Immune support"],
    cookingTips: "Roast until lightly browned for snacking. Grind into powder for smoothies.",
    types: [
      {
        name: "Raw Melon Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Unroasted, can be sprouted",
        bestFor: "Sprouting, Grinding",
        soaking: "6-8 hours",
        benefits: "Highest nutrition"
      },
      {
        name: "Roasted Melon Seeds",
        image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
        description: "Salted, crunchy snack",
        bestFor: "Snacking",
        benefits: "Crunchy flavor"
      }
    ]
  }
];

// Add this to your getCurrentData function - it already uses getFilteredStaples
// Make sure you have the staplesCategory state and getFilteredStaples function

  // SECTION 4: DAILY VEGETABLES DATA WITH TYPES
  const dailyVegetablesData = [
    {
      id: 1,
      name: "Onions",
      image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=800",
      tagline: "Base for most Indian dishes",
      fullDesc: "Essential aromatic vegetable. Used raw in salads, sautéed as base for curries, or fried as garnish. Onions add depth and sweetness to dishes when cooked. Rich in antioxidants and anti-inflammatory compounds.",
      storageTips: "Store in cool, dry, well-ventilated place. Avoid storing with potatoes.",
      shelfLife: "2-3 months",
      keyUses: ["Curry base", "Salads", "Garnish", "Pickles"],
      types: [
        {
          name: "Red Onions",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Sharp flavor, purple-red skin",
          bestFor: "Raw salads, Chutneys, Garnish"
        },
        {
          name: "White Onions",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Milder flavor, white skin",
          bestFor: "Mexican dishes, Cooking"
        },
        {
          name: "Shallots",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Small, mild, multi-lobed",
          bestFor: "South Indian, Thai cuisine"
        }
      ]
    },
    {
      id: 2,
      name: "Garlic",
      image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=800",
      tagline: "Flavor enhancer",
      fullDesc: "Pungent cloves used for flavor base. Can be used fresh, minced, paste, or powder. Garlic has medicinal properties including antibacterial and antiviral effects. Essential in most world cuisines.",
      storageTips: "Store in cool, dry place with air circulation. Keep away from moisture.",
      shelfLife: "3-5 months",
      keyUses: ["Curry base", "Marinades", "Sauces", "Tempering"],
      types: [
        {
          name: "Regular Garlic",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Common white garlic bulbs",
          bestFor: "Daily cooking, Curries"
        },
        {
          name: "Elephant Garlic",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "Large cloves, milder flavor",
          bestFor: "Roasting, Mild dishes"
        }
      ]
    },
    {
      id: 3,
      name: "Ginger",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800",
      tagline: "Versatile root with health benefits",
      fullDesc: "Fresh root with spicy, warming flavor. Used in cooking, tea, and as digestive aid. Contains gingerol with anti-inflammatory and antioxidant effects. Helps with nausea, digestion, and cold symptoms.",
      storageTips: "Store in cool, dry place or refrigerate. Can be frozen for longer storage.",
      shelfLife: "2-3 weeks fresh, longer as paste",
      keyUses: ["Curry paste", "Tea", "Marinades", "Digestive aid"],
      types: [
        {
          name: "Fresh Ginger",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "Raw ginger root",
          bestFor: "Cooking, Tea, Juices"
        },
        {
          name: "Young Ginger",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "Tender, less fibrous",
          bestFor: "Pickling, Salads"
        }
      ]
    },
    {
      id: 4,
      name: "Tomatoes",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
      tagline: "Adds tanginess and body to dishes",
      fullDesc: "Versatile fruit/vegetable used fresh, cooked, or as paste. Base for many gravies and sauces. Rich in lycopene (antioxidant), vitamins C and K. Cooking increases lycopene availability.",
      storageTips: "Store at room temperature until ripe, then refrigerate. Don't refrigerate unripe tomatoes.",
      shelfLife: "1-2 weeks",
      keyUses: ["Curries", "Salads", "Sauces", "Chutneys"],
      types: [
        {
          name: "Roma Tomatoes",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Plum tomatoes, less seeds",
          bestFor: "Sauces, Paste, Cooking"
        },
        {
          name: "Cherry Tomatoes",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Small, sweet tomatoes",
          bestFor: "Salads, Garnish"
        },
        {
          name: "Beefsteak Tomatoes",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Large, juicy tomatoes",
          bestFor: "Slicing, Sandwiches"
        }
      ]
    },
    {
      id: 5,
      name: "Potatoes",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800",
      tagline: "Versatile staple vegetable",
      fullDesc: "Can be boiled, fried, roasted, mashed. Stores well and used in numerous dishes. Good source of carbohydrates, potassium, and vitamin C. Different varieties have different textures for specific uses.",
      storageTips: "Store in cool, dark, well-ventilated place. Don't store with onions.",
      shelfLife: "3-5 weeks",
      keyUses: ["Curries", "Snacks", "Side dishes", "Mashed"],
      types: [
        {
          name: "Russet Potatoes",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "Starchy, fluffy when cooked",
          bestFor: "Mashing, Baking, Frying"
        },
        {
          name: "Red Potatoes",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "Waxy, hold shape well",
          bestFor: "Salads, Roasting, Curries"
        }
      ]
    },
    {
      id: 6,
      name: "Carrots",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "Sweet root vegetable",
      fullDesc: "Orange root vegetable rich in beta-carotene. Can be eaten raw, cooked, or in salads. Beta-carotene converts to vitamin A in body, important for vision and immunity. Natural sweetness enhances dishes.",
      storageTips: "Refrigerate in plastic bag, remove greens first. Can be stored in sand for months.",
      shelfLife: "3-4 weeks",
      keyUses: ["Salads", "Curries", "Juices", "Snacks"],
      types: [
        {
          name: "Regular Carrots",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "Standard orange carrots",
          bestFor: "Cooking, Juices, Salads"
        },
        {
          name: "Baby Carrots",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "Small, tender carrots",
          bestFor: "Snacking, Salads"
        }
      ]
    },
    {
      id: 7,
      name: "Cauliflower",
      image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=800",
      tagline: "Versatile cruciferous vegetable",
      fullDesc: "White florets that can be roasted, curried, or made into rice substitute. High in fiber. Part of brassica family with cancer-fighting compounds. Low in calories, high in vitamins C and K.",
      storageTips: "Refrigerate in perforated plastic bag. Store stem-side up to prevent moisture buildup.",
      shelfLife: "1-2 weeks",
      keyUses: ["Curries", "Roasted", "Rice substitute", "Snacks"],
      types: [
        {
          name: "White Cauliflower",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Common white variety",
          bestFor: "Curries, Roasting"
        },
        {
          name: "Orange Cauliflower",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Rich in beta-carotene",
          bestFor: "Colorful dishes"
        }
      ]
    },
    {
      id: 8,
      name: "Cabbage",
      image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=800",
      tagline: "Crunchy leafy vegetable",
      fullDesc: "Green or purple leaves that can be cooked or eaten raw. Good for salads and stir-fries. High in vitamin C and fiber. Fermented cabbage makes sauerkraut and kimchi with probiotic benefits.",
      storageTips: "Refrigerate in plastic bag. Remove outer leaves if wilted.",
      shelfLife: "1-2 weeks",
      keyUses: ["Salads", "Stir-fries", "Curries", "Pickles"],
      types: [
        {
          name: "Green Cabbage",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Common variety, tightly packed",
          bestFor: "Coleslaw, Cooking"
        },
        {
          name: "Red Cabbage",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Purple-red color",
          bestFor: "Salads, Pickling"
        }
      ]
    }
  ];

  // Get current data based on selected category
  const getCurrentData = () => {
  switch (selectedCategory) {
    case 'basics': return kitchenBasicsData;
    case 'spices': return getFilteredSpices();
    case 'staples': return getFilteredStaples();  // Update this
    case 'vegetables': return dailyVegetablesData;
    default: return kitchenBasicsData;
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

  // Helper function for card classes
  const getCardClass = (itemName, category) => {
    const name = itemName.toLowerCase();
    
    if (category === 'basics') {
      if (name.includes('rice')) return 'basics-rice';
      if (name.includes('flour') || name.includes('atta')) return 'basics-flour';
      if (name.includes('oil')) return 'basics-oil';
      if (name.includes('salt')) return 'basics-salt';
      if (name.includes('sugar')) return 'basics-sugar';
      if (name.includes('tea') || name.includes('coffee')) return 'basics-beverage';
      if (name.includes('milk')) return 'basics-dairy';
      if (name.includes('vinegar')) return 'basics-vinegar';
    }

    
    if (category === 'staples') {
      if (name.includes('pulses') || name.includes('daal')) return 'staples-pulses';
      if (name.includes('grain')) return 'staples-grains';
      if (name.includes('flour')) return 'staples-flour';
      if (name.includes('dry') || name.includes('nut')) return 'staples-nuts';
    }
    
    if (category === 'vegetables') {
      if (name.includes('onion')) return 'vegetables-onion';
      if (name.includes('garlic')) return 'vegetables-garlic';
      if (name.includes('ginger')) return 'vegetables-ginger';
      if (name.includes('tomato')) return 'vegetables-tomato';
      if (name.includes('potato')) return 'vegetables-potato';
      if (name.includes('carrot')) return 'vegetables-carrot';
      if (name.includes('cauliflower')) return 'vegetables-cauliflower';
      if (name.includes('cabbage')) return 'vegetables-cabbage';
    }
    
    return '';
  };

  return (
    <div className="pbp-container">
      <div className="pbp-layout">
        {/* SIDEBAR */}
        <aside className="pbp-sidebar">
          <div className="pbp-sidebar-header">
            <h2 className="pbp-sidebar-title">Pantry Basics</h2>
            <p className="pbp-sidebar-subtitle">Essential Food Items</p>
          </div>

          <div className="pbp-sidebar-categories">
            <ul className="pbp-categories-list">
              <li 
                className={`pbp-category-item ${selectedCategory === 'basics' ? 'pbp-active' : ''}`}
                onClick={() => setSelectedCategory('basics')}
              >
                <span className="pbp-category-name">Kitchen Basics</span>
              </li>
              <li 
                className={`pbp-category-item ${selectedCategory === 'spices' ? 'pbp-active' : ''}`}
                onClick={() => setSelectedCategory('spices')}
              >
                <span className="pbp-category-name">Spices</span>
              </li>
              <li 
                className={`pbp-category-item ${selectedCategory === 'staples' ? 'pbp-active' : ''}`}
                onClick={() => setSelectedCategory('staples')}
              >
                <span className="pbp-category-name">Staples</span>
              </li>
              <li 
                className={`pbp-category-item ${selectedCategory === 'vegetables' ? 'pbp-active' : ''}`}
                onClick={() => setSelectedCategory('vegetables')}
              >
                <span className="pbp-category-name">Daily Vegetables</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="pbp-main">
          <header className="pbp-main-header">
            <div className="pbp-header-content">
              <h1 className="pbp-page-title">
                {selectedCategory === 'basics' && 'Kitchen Basics'}
                {selectedCategory === 'spices' && 'Essential Spices'}
                {selectedCategory === 'staples' && 'Pantry Staples'}
                {selectedCategory === 'vegetables' && 'Daily-Use Vegetables'}
              </h1>
              <p className="pbp-page-description">
                {selectedCategory === 'basics' && 'Essential items every kitchen should have for daily cooking.'}
                {selectedCategory === 'spices' && 'Aromatic spices that form the foundation of flavorful cooking.'}
                {selectedCategory === 'staples' && 'Long-lasting pantry items for varied and nutritious meals.'}
                {selectedCategory === 'vegetables' && 'Fresh vegetables for daily cooking and healthy meals.'}
              </p>
            </div>
          </header>

          {/* ITEMS GRID */}
          <div className="pbp-items-grid-section">
            {/* ===== YEH ADD KARO - FILTER BUTTONS YAHAN PAR ===== */}
  {selectedCategory === 'spices' && (
    <div className="spice-filter-buttons">
      <button 
        className={`spice-filter-btn ${spiceCategory === 'all' ? 'active' : ''}`}
        onClick={() => setSpiceCategory('all')}
      >
        All Spices (66)
      </button>
      <button 
        className={`spice-filter-btn ${spiceCategory === 'whole' ? 'active' : ''}`}
        onClick={() => setSpiceCategory('whole')}
      >
        Whole Spices (20)
      </button>
      <button 
        className={`spice-filter-btn ${spiceCategory === 'ground' ? 'active' : ''}`}
        onClick={() => setSpiceCategory('ground')}
      >
        Ground Spices (15)
      </button>
      <button 
        className={`spice-filter-btn ${spiceCategory === 'aromatic' ? 'active' : ''}`}
        onClick={() => setSpiceCategory('aromatic')}
      >
        Aromatic Spices (12)
      </button>
      <button 
        className={`spice-filter-btn ${spiceCategory === 'temper' ? 'active' : ''}`}
        onClick={() => setSpiceCategory('temper')}
      >
        Temper Spices (8)
      </button>
      <button 
        className={`spice-filter-btn ${spiceCategory === 'flowers' ? 'active' : ''}`}
        onClick={() => setSpiceCategory('flowers')}
      >
        Dried Flowers (5)
      </button>
      <button 
        className={`spice-filter-btn ${spiceCategory === 'salts' ? 'active' : ''}`}
        onClick={() => setSpiceCategory('salts')}
      >
        Specialty Salts (6)
      </button>
    </div>
  )}
{/* Staples Filter Buttons */}
{selectedCategory === 'staples' && (
  <div className="staples-filter-buttons">
    <button 
      className={`staples-filter-btn ${staplesCategory === 'all' ? 'active' : ''}`}
      onClick={() => setStaplesCategory('all')}
    >
      All Staples (81)
    </button>
    <button 
      className={`staples-filter-btn ${staplesCategory === 'rice' ? 'active' : ''}`}
      onClick={() => setStaplesCategory('rice')}
    >
      Rice (15)
    </button>
    <button 
      className={`staples-filter-btn ${staplesCategory === 'wheatflours' ? 'active' : ''}`}
      onClick={() => setStaplesCategory('wheatflours')}
    >
      Wheat Flours (4)
    </button>
    <button 
      className={`staples-filter-btn ${staplesCategory === 'millets' ? 'active' : ''}`}
      onClick={() => setStaplesCategory('millets')}
    >
      Millets (7)
    </button>
    <button 
      className={`staples-filter-btn ${staplesCategory === 'othergrains' ? 'active' : ''}`}
      onClick={() => setStaplesCategory('othergrains')}
    >
      Other Grains (8)
    </button>
    <button 
      className={`staples-filter-btn ${staplesCategory === 'pulses' ? 'active' : ''}`}
      onClick={() => setStaplesCategory('pulses')}
    >
      Pulses (17)
    </button>
    <button 
      className={`staples-filter-btn ${staplesCategory === 'nuts' ? 'active' : ''}`}
      onClick={() => setStaplesCategory('nuts')}
    >
      Nuts (10)
    </button>
    <button 
      className={`staples-filter-btn ${staplesCategory === 'dryfruits' ? 'active' : ''}`}
      onClick={() => setStaplesCategory('dryfruits')}
    >
      Dry Fruits (12)
    </button>
    <button 
      className={`staples-filter-btn ${staplesCategory === 'seeds' ? 'active' : ''}`}
      onClick={() => setStaplesCategory('seeds')}
    >
      Seeds (8)
    </button>
  </div>
)}
            <div className="pbp-items-grid">
              {getCurrentData().map(item => (
                <div 
                  key={item.id} 
                  className={`pbp-item-card ${getCardClass(item.name, selectedCategory)}`}
                  onClick={() => handleItemSelect(item)}
                >
                  <div 
                    className="pbp-card-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  
                  <div className="pbp-card-content">
                    <div className="pbp-card-header">
                      <h3 className="pbp-card-title">{item.name}</h3>
                      
                    </div>
                    <p className="pbp-card-description">{item.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

{showDetailPanel && selectedItem && (
  <div className="pbp-modal-overlay" onClick={closeDetailPanel}>
    <div className="pbp-modal" onClick={(e) => e.stopPropagation()}>
      <button className="pbp-modal-close" onClick={closeDetailPanel}>×</button>
      
      <div className="pbp-modal-header">
        <div className="pbp-modal-title">
          <h2>{selectedItem.name}</h2>
          <p className="pbp-modal-subtitle">{selectedItem.tagline}</p>
        </div>
      </div>

      {/* DIRECT 2-COLUMN LAYOUT - NO EXTRA WRAPPERS */}
      <div className="pbp-modal-content">
        {/* LEFT SIDE - SCROLLABLE CONTENT (65%) */}
<div className="pbp-modal-left">
  <div className="pbp-modal-details">
    
    {/* URDU NAME - Spices ke liye */}
    {selectedItem.urduName && (
      <div className="pbp-detail-section">
        <h3>Urdu Name</h3>
        <div className="pbp-detail-content">
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{selectedItem.urduName}</p>
        </div>
      </div>
    )}

    {/* DESCRIPTION - Sabke liye */}
    <div className="pbp-detail-section">
      <h3>Description</h3>
      <div className="pbp-detail-content">
        <p>{selectedItem.fullDesc}</p>
      </div>
    </div>

    {/* ===== SPICES KE LIYE SPECIAL SECTIONS ===== */}
    {selectedCategory === 'spices' && (
      <>
        {/* KEY FEATURES */}
        {selectedItem.keyFeatures && selectedItem.keyFeatures.length > 0 && (
          <div className="pbp-detail-section">
            <h3>✨ Key Features</h3>
            <div className="pbp-features-grid">
              {selectedItem.keyFeatures.map((feature, idx) => (
                <div key={idx} className="pbp-feature-item">{feature}</div>
              ))}
            </div>
          </div>
        )}

        {/* PROPER USAGE */}
        {selectedItem.properUsage && (
          <div className="pbp-detail-section">
            <h3>📝 Proper Usage</h3>
            <div className="pbp-detail-content">
              <p>{selectedItem.properUsage}</p>
            </div>
          </div>
        )}

        {/* COMMON MISTAKES */}
        {selectedItem.commonMistakes && selectedItem.commonMistakes.length > 0 && (
          <div className="pbp-detail-section">
            <h3>❌ Common Mistakes</h3>
            <div className="pbp-mistakes-grid">
              {selectedItem.commonMistakes.map((mistake, idx) => (
                <div key={idx} className="pbp-mistake-item">{mistake}</div>
              ))}
            </div>
          </div>
        )}
      </>
    )}

    {/* ===== BASICS/STAPLES/VEGETABLES KE LIYE SECTIONS ===== */}
    {selectedCategory !== 'spices' && (
      <>
        {/* STORAGE TIPS */}
        {selectedItem.storageTips && (
          <div className="pbp-detail-section">
            <h3>Storage Tips</h3>
            <div className="pbp-detail-content">
              <p>{selectedItem.storageTips}</p>
            </div>
          </div>
        )}

        {/* SHELF LIFE */}
        {selectedItem.shelfLife && (
          <div className="pbp-detail-section">
            <h3>Shelf Life</h3>
            <div className="pbp-detail-content">
              <p>{selectedItem.shelfLife}</p>
            </div>
          </div>
        )}

        {/* COMMON USES */}
        {selectedItem.keyUses && selectedItem.keyUses.length > 0 && (
          <div className="pbp-detail-section">
            <h3>Common Uses</h3>
            <div className="pbp-detail-content">
              <div className="pbp-uses-list">
                {selectedItem.keyUses.map((use, idx) => (
                  <div key={idx} className="pbp-use-item">
                    <span className="pbp-use-check">✓</span>
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    )}

    {/* TYPES SECTION - Sabke liye */}
    {selectedItem.types && selectedItem.types.length > 0 && (
      <div className="pbp-types-section">
        <h3 className="pbp-types-heading">Types & Varieties</h3>
        <div className="pbp-types-grid">
          {selectedItem.types.map((type, index) => (
            <div key={index} className="pbp-type-card">
              <div 
                className="pbp-type-image"
                style={{ backgroundImage: `url(${type.image})` }}
              ></div>
              <div className="pbp-type-content">
                <h4>{type.name}</h4>
                <p className="pbp-type-desc">{type.description}</p>
                <div className="pbp-type-best">
                  <strong>Best For:</strong> {type.bestFor}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    
  </div>
</div>
        {/* RIGHT SIDE - FIXED IMAGE (35%) */}
        <div className="pbp-modal-right">
          <div className="pbp-main-image-container">
            <div 
              className="pbp-main-image"
              style={{ backgroundImage: `url(${selectedItem.image})` }}
            ></div>
            <div className="pbp-image-overlay">
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
 {/* Back to Home Button */}
 <div className="back-home-container">
         <button 
  className="back-home-btn"
  onClick={() => {
    try {
      navigate('/guidance');
    } catch (error) {
      window.location.href = '/guidance';
    }
  }}
>
  ← Back to Guidance Page
</button>
      </div>
    </div>
  );
};

export default PantryBasicsPage;