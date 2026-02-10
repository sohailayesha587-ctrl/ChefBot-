import React, { useState } from 'react';
import './PantryBasicsPage.css';

const PantryBasicsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);

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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Important",
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

  // SECTION 2: SPICES DATA WITH TYPES
  const spicesData = [
    {
      id: 1,
      name: "Turmeric Powder",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "Golden spice with health benefits",
      fullDesc: "Bright yellow powder with anti-inflammatory properties. Essential for Indian curries and rice dishes. Contains curcumin which has medicinal properties. Used both as spice and natural coloring agent.",
      storageTips: "Store in airtight container away from light. Keep in cool, dry place.",
      shelfLife: "2-3 years",
      keyUses: ["Curries", "Rice", "Vegetables", "Health drinks"],
      essentiality: "Essential",
      types: [
        {
          name: "Ground Turmeric",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Finely powdered turmeric",
          bestFor: "Daily cooking, Curries"
        },
        {
          name: "Turmeric Root",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Fresh turmeric root",
          bestFor: "Juices, Herbal remedies"
        },
        {
          name: "Kashmiri Turmeric",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Bright colored variety",
          bestFor: "Colorful dishes, Rice"
        }
      ]
    },
    {
      id: 2,
      name: "Red Chili Powder",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800",
      tagline: "Adds heat and color to dishes",
      fullDesc: "Made from dried red chilies. Available in different heat levels from mild to very hot. Adds both spiciness and vibrant red color to dishes. Rich in vitamin C and antioxidants.",
      storageTips: "Store in airtight glass containers. Keep away from moisture.",
      shelfLife: "1-2 years",
      keyUses: ["Curries", "Marinades", "Chutneys", "Sauces"],
      essentiality: "Essential",
      types: [
        {
          name: "Kashmiri Red Chili",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Mild heat, bright red color",
          bestFor: "Colorful curries, Rice"
        },
        {
          name: "Regular Chili Powder",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "Medium heat level",
          bestFor: "Daily cooking, Curries"
        },
        {
          name: "Byadgi Chili",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "Deep red, medium hot",
          bestFor: "Sambar, Rasam, Chutneys"
        }
      ]
    },
    {
      id: 3,
      name: "Coriander Powder",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800",
      tagline: "Aromatic spice for curries",
      fullDesc: "Ground coriander seeds with citrusy, slightly sweet flavor. Base for many Indian spice blends. Helps in digestion and adds depth to dishes. Often used in combination with cumin.",
      storageTips: "Store in cool, dark place in airtight container",
      shelfLife: "1-2 years",
      keyUses: ["Curry powders", "Vegetable dishes", "Marinades"],
      essentiality: "Essential",
      types: [
        {
          name: "Roasted Coriander",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "Dry roasted and ground",
          bestFor: "Curries, Masalas"
        },
        {
          name: "Whole Coriander Seeds",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "Whole dried seeds",
          bestFor: "Tempering, Pickles"
        }
      ]
    },
    {
      id: 4,
      name: "Cumin Seeds",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800",
      tagline: "Essential for tempering",
      fullDesc: "Small seeds with earthy, warming flavor. Used whole or ground. Essential for tadka/tempering. Aids in digestion and adds distinctive aroma to dishes. Common in Indian, Mexican, and Middle Eastern cuisines.",
      storageTips: "Store in airtight container in dark place",
      shelfLife: "2-3 years",
      keyUses: ["Tempering", "Curries", "Rice dishes", "Snacks"],
      essentiality: "Essential",
      types: [
        {
          name: "Black Cumin (Shah Jeera)",
          image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300",
          description: "Thinner and darker seeds",
          bestFor: "Biryani, Pulao, Special dishes"
        },
        {
          name: "Regular Cumin",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Common cumin seeds",
          bestFor: "Daily cooking, Tempering"
        }
      ]
    },
    {
      id: 5,
      name: "Mustard Seeds",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800",
      tagline: "Pungent seeds for tempering",
      fullDesc: "Small black or yellow seeds that pop when heated in oil. Essential for South Indian and Bengali cooking. Adds nutty flavor and aroma. Contains antioxidants and anti-inflammatory properties.",
      storageTips: "Store in airtight container",
      shelfLife: "2-3 years",
      keyUses: ["Tempering", "Pickles", "Curries", "Chutneys"],
      essentiality: "Important",
      types: [
        {
          name: "Black Mustard Seeds",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Small black seeds, pungent",
          bestFor: "South Indian, Bengali cuisine"
        },
        {
          name: "Yellow Mustard Seeds",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "Milder than black seeds",
          bestFor: "Pickles, Western dishes"
        }
      ]
    },
    {
      id: 6,
      name: "Garam Masala",
      image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=800",
      tagline: "Warming spice blend",
      fullDesc: "Aromatic blend of spices like cardamom, cinnamon, cloves, black pepper. Added at end of cooking. 'Garam' means hot/warm, referring to warming properties. Each family has their own secret recipe.",
      storageTips: "Store in airtight container to preserve aroma",
      shelfLife: "6 months - 1 year",
      keyUses: ["Curries", "Rice dishes", "Meat dishes", "Vegetables"],
      essentiality: "Important",
      types: [
        {
          name: "North Indian Garam Masala",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "Rich blend with mace, nutmeg",
          bestFor: "Mughlai dishes, Meat curries"
        },
        {
          name: "Bengali Garam Masala",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "With green cardamom, cinnamon",
          bestFor: "Fish curries, Bengali dishes"
        }
      ]
    },
    {
      id: 7,
      name: "Asafoetida (Hing)",
      image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=800",
      tagline: "Digestive aid with strong aroma",
      fullDesc: "Strong-smelling resin used in small quantities. Believed to aid digestion and reduce gas from lentils. Has anti-flatulent properties. Used especially in vegetarian cooking to enhance flavors.",
      storageTips: "Store in airtight double container (strong smell)",
      shelfLife: "Indefinite",
      keyUses: ["Daal tempering", "Vegetable dishes", "Pickles"],
      essentiality: "Important",
      types: [
        {
          name: "Pure Hing",
          image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=300",
          description: "Pure resin, very strong",
          bestFor: "Medicinal use, Small quantities"
        },
        {
          name: "Hing Powder",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Mixed with flour",
          bestFor: "Daily cooking, Daal"
        }
      ]
    },
    {
      id: 8,
      name: "Cardamom (Elaichi)",
      image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=800",
      tagline: "Queen of spices",
      fullDesc: "Aromatic pods used whole or ground. Green cardamom for sweets/savory, black for savory dishes. One of the world's most expensive spices. Adds complex flavor and aroma to both food and beverages.",
      storageTips: "Store in airtight container to preserve flavor",
      shelfLife: "1-2 years",
      keyUses: ["Biryani", "Desserts", "Tea", "Curries"],
      essentiality: "Important",
      types: [
        {
          name: "Green Cardamom",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Small green pods, aromatic",
          bestFor: "Sweets, Biryani, Tea"
        },
        {
          name: "Black Cardamom",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Large black pods, smoky",
          bestFor: "Savory dishes, Meat curries"
        }
      ]
    }
  ];

  // SECTION 3: STAPLES DATA WITH TYPES - UPDATED WITH WHITE & BLACK CHANA
  const staplesData = [
    {
      id: 1,
      name: "Pulses (Daal)",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800",
      tagline: "Protein-packed legumes",
      fullDesc: "Various lentils and pulses that are staple protein sources. Each type has unique cooking properties and nutritional benefits. Rich in protein, fiber, and essential nutrients. Essential for vegetarian diets. Includes different types of chickpeas (chana) which are versatile and nutritious.",
      storageTips: "Store in airtight containers in cool, dry place. Check for insects periodically.",
      shelfLife: "1-2 years",
      keyUses: ["Curries", "Soups", "Sprouts", "Flour", "Snacks"],
      essentiality: "Essential",
      types: [
        {
          name: "Toor Daal",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Yellow split pigeon peas",
          cookingTime: "30-40 mins",
          bestFor: "Sambar, Plain daal"
        },
        {
          name: "Moong Daal",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Split green gram",
          cookingTime: "20-25 mins",
          bestFor: "Khichdi, Light daal"
        },
        {
          name: "Masoor Daal",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Red lentils",
          cookingTime: "15-20 mins",
          bestFor: "Soup, Healthy meals"
        },
        {
          name: "Chana Daal",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Split chickpeas",
          cookingTime: "45-50 mins",
          bestFor: "Hearty daal, Snacks"
        },
        {
          name: "White Chana",
          image: "https://images.unsplash.com/photo-1540420828642-fca2c5c18abb?auto=format&fit=crop&w=300",
          description: "Whole white chickpeas",
          cookingTime: "60-90 mins",
          bestFor: "Chole, Salads, Snacks"
        },
        {
          name: "Black Chana",
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=300",
          description: "Whole black chickpeas",
          cookingTime: "60-90 mins",
          bestFor: "Kala chana curry, Sprouts"
        }
      ]
    },
    {
      id: 2,
      name: "Grains",
      image: "https://images.unsplash.com/photo-1569929238190-8697014b5d8b?auto=format&fit=crop&w=800",
      tagline: "Various grains for different dishes",
      fullDesc: "Collection of different grains used in Indian cooking for variety in meals and nutrition. Provide carbohydrates for energy, along with fiber, vitamins, and minerals. Different grains have different textures and flavors.",
      storageTips: "Store in airtight containers, keep dry. Use within recommended time for best quality.",
      shelfLife: "6 months - 2 years",
      keyUses: ["Main dishes", "Side dishes", "Breakfast", "Health foods"],
      essentiality: "Essential",
      types: [
        {
          name: "Basmati Rice",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Long grain aromatic rice",
          cookingTime: "15-20 mins",
          bestFor: "Biryani, Pulao, Plain rice"
        },
        {
          name: "Brown Rice",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Whole grain rice with bran",
          cookingTime: "30-35 mins",
          bestFor: "Healthy meals, Diabetic diets"
        },
        {
          name: "Quinoa",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Protein-rich pseudo-grain",
          cookingTime: "15-20 mins",
          bestFor: "Salads, Healthy substitutes"
        },
        {
          name: "Oats",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Rolled or steel-cut oats",
          cookingTime: "5-10 mins",
          bestFor: "Breakfast, Healthy snacks"
        }
      ]
    },
    {
      id: 3,
      name: "Flours",
      image: "https://images.unsplash.com/photo-1625937320885-8e4d56fd8c57?auto=format&fit=crop&w=800",
      tagline: "Various flours for baking and cooking",
      fullDesc: "Different types of flours used for specific dishes and dietary requirements. Each flour has unique properties that make it suitable for particular recipes. Important for diverse cooking and baking needs.",
      storageTips: "Store in airtight containers, use within months. Refrigerate for longer shelf life.",
      shelfLife: "3-6 months",
      keyUses: ["Baking", "Roti making", "Thickening", "Batters"],
      essentiality: "Essential",
      types: [
        {
          name: "Whole Wheat Flour (Atta)",
          image: "https://images.unsplash.com/photo-1605197581314-d2d0b3929a73?auto=format&fit=crop&w=300",
          description: "For daily rotis and chapatis",
          bestFor: "Roti, Paratha, Poori"
        },
        {
          name: "All-Purpose Flour (Maida)",
          image: "https://images.unsplash.com/photo-1587057706176-2f6c52f30c9b?auto=format&fit=crop&w=300",
          description: "Refined wheat flour",
          bestFor: "Baking, Bread, Snacks"
        },
        {
          name: "Besan (Gram Flour)",
          image: "https://images.unsplash.com/photo-1587734195503-904137cec4a6?auto=format&fit=crop&w=300",
          description: "Made from chickpeas",
          bestFor: "Pakoras, Kadhi, Cheela"
        },
        {
          name: "Rice Flour",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Made from ground rice",
          bestFor: "Dosa, Idli, Snacks"
        }
      ]
    },
    {
      id: 4,
      name: "Dry Fruits & Nuts",
      image: "https://images.unsplash.com/photo-1543859969-71b9f3cbb6d7?auto=format&fit=crop&w=800",
      tagline: "Nutritional powerhouse",
      fullDesc: "Collection of nuts and dry fruits for snacking, cooking, and garnishing dishes. Rich in healthy fats, proteins, vitamins, and minerals. Can be used in both sweet and savory dishes for added nutrition and flavor.",
      storageTips: "Store in airtight containers in refrigerator. Freeze for long-term storage.",
      shelfLife: "6-12 months",
      keyUses: ["Snacking", "Garnishing", "Desserts", "Health foods"],
      essentiality: "Important",
      types: [
        {
          name: "Almonds",
          image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300",
          description: "Brain food, vitamin E rich",
          bestFor: "Snacks, Milk, Garnishing"
        },
        {
          name: "Cashews",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300",
          description: "Creamy, rich in minerals",
          bestFor: "Curries, Sweets, Snacks"
        },
        {
          name: "Walnuts",
          image: "https://images.unsplash.com/photo-1593532842320-5dcd39c35ed5?auto=format&fit=crop&w=300",
          description: "Omega-3 rich, brain shaped",
          bestFor: "Salads, Baking, Health"
        },
        {
          name: "Raisins",
          image: "https://images.unsplash.com/photo-1589923186741-b7d59d6b2c4c?auto=format&fit=crop&w=300",
          description: "Dried grapes, natural sweetener",
          bestFor: "Sweets, Rice dishes, Snacks"
        }
      ]
    }
  ];

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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Essential",
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
      essentiality: "Regular",
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
      essentiality: "Regular",
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
      essentiality: "Regular",
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
      case 'spices': return spicesData;
      case 'staples': return staplesData;
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
    
    if (category === 'spices') {
      if (name.includes('turmeric')) return 'spices-turmeric';
      if (name.includes('chili')) return 'spices-chili';
      if (name.includes('coriander')) return 'spices-coriander';
      if (name.includes('cumin')) return 'spices-cumin';
      if (name.includes('mustard')) return 'spices-mustard';
      if (name.includes('garam')) return 'spices-garam';
      if (name.includes('hing') || name.includes('asafoetida')) return 'spices-hing';
      if (name.includes('cardamom') || name.includes('elaichi')) return 'spices-cardamom';
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
                      <div className={`pbp-essentiality-badge ${item.essentiality.toLowerCase()}`}>
                        {item.essentiality}
                      </div>
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

      <div className="pbp-modal-content">
        <div className="pbp-modal-layout">
          {/* LEFT SIDE - ALL CONTENT + TYPES (65%) */}
          <div className="pbp-modal-left">
            {/* DESCRIPTION */}
            <div className="pbp-detail-section">
              <h3>Description</h3>
              <div className="pbp-detail-content">
                <p>{selectedItem.fullDesc}</p>
              </div>
            </div>

            {/* STORAGE TIPS */}
            <div className="pbp-detail-section">
              <h3>Storage Tips</h3>
              <div className="pbp-detail-content">
                <p>{selectedItem.storageTips}</p>
              </div>
            </div>

            {/* SHELF LIFE */}
            <div className="pbp-detail-section">
              <h3>Shelf Life</h3>
              <div className="pbp-detail-content">
                <p>{selectedItem.shelfLife}</p>
              </div>
            </div>

            {/* COMMON USES */}
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

            {/* TYPES SECTION - SIDE BY SIDE CARDS */}
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
                        {type.cookingTime && (
                          <div className="pbp-type-info">
                            <span className="pbp-type-info-item">⏱️ {type.cookingTime}</span>
                          </div>
                        )}
                        {type.smokePoint && (
                          <div className="pbp-type-info">
                            <span className="pbp-type-info-item">🔥 {type.smokePoint}</span>
                          </div>
                        )}
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

          {/* RIGHT SIDE - SINGLE BIG IMAGE (35%) */}
          <div className="pbp-modal-right">
            <div className="pbp-main-image-container">
              <div 
                className="pbp-main-image"
                style={{ backgroundImage: `url(${selectedItem.image})` }}
              >
                <div className="pbp-image-overlay">
                  <div className={`pbp-essentiality-badge-large ${selectedItem.essentiality.toLowerCase()}`}>
                    {selectedItem.essentiality}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
              
    </div>
  );
};

export default PantryBasicsPage;