import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeSoupPage.css';

const RecipeSoupPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSoup, setSelectedSoup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceInstructions, setShowVoiceInstructions] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);
  const autoPlayStartedRef = useRef(false);

  // Soup images array
  const soupImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqiqU3xgsUs4bYX9IvYvXIEKw_-XIoyvFbQ&s", // Cream of Mushroom Soup
    "https://www.twopeasandtheirpod.com/wp-content/uploads/2019/10/Creamy-Chicken-Noodle-Soup-3.jpg", // Creamy Noodles Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT91WUf88VTnCSrt3kQ9ChnM7D053vayxpBEg&s", // Egg Drop Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpQ9CCB50MahAFRH-KMbVuObrgRPLUbwzHlw&s", // Chicken Macroni Corn Soup
    "https://afoodcentriclife.com/wp-content/uploads/2014/01/chicken-vegetable-soup-pot-square-crop-0526.jpg", // Chicken Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAVyVHIovVcsPXzZ8_kDA1VFX6ovci-VF5w&s", // Vegetable Hot and Sour Soup
    "https://abraskitchen.com/wp-content/uploads/2021/11/Homemade-Nourishing-Chicken-Soup-from-Scratch.jpg", // Chicken Broth
    "https://diethood.com/wp-content/uploads/2023/12/chicken-vegetable-soup-recipe-3.jpg", // Chicken Vegetable Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVLLBgBh_x71ksVntrxbfzJhqM1M9cn1DOrQ&s", // Mulligatawny Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWXNwiW5kMyPwJ0ipRVRDZdGAVw3FRr61BQ&s", // Chicken Tikka Corn Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdbZe-gy4koKqvF4b9ng5gLdTBLtT9cxPqXg&s", // Lentil Soup
    "https://eatthegains.com/wp-content/uploads/2022/11/Chicken-Tomato-Soup-10-1120x1120.jpg", // Tomato Chicken Macaroni Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjCye450K5PpaObGWKQmMunXo0_cTTBoLPg&s", // Barley Soup
    "https://valentinascorner.com/wp-content/uploads/2024/03/Creamy-Chicken-Potato-Soup-Recipe-1.jpg", // Chicken Potato Soup
    "https://onestophalal.com/cdn/shop/articles/hareesa-1697927464282_727ae026-7107-443f-87ca-f2ad241d870a_1200x.jpg?v=1697927657", // Hareesa Soup
    "https://www.recipetineats.com/tachyon/2023/07/Creamy-Tuscan-Chicken-Soup_3.jpg", // Cream of Chicken Soup
    "https://static01.nyt.com/images/2013/06/03/health/03recipehealth/03recipehealth-superJumbo.jpg", // Spinach Soup
    "https://redhousespice.com/wp-content/uploads/2021/08/Chinese-hot-and-sour-soup-1-scaled.jpg", // Restaurant Style Hot and Sour Soup
    "https://www.tasteofhome.com/wp-content/uploads/2018/01/Amish-Chicken-Corn-Soup_EXPS_FT24_31049_EC_060524_1.jpg", // Chicken Corn Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZGsoN2CzjBtlKPnz2ATrFnz2i1eR20avHuA&s", // Mixed Grain Soup
    "https://www.yummytummyaarthi.com/wp-content/uploads/2022/07/hot-and-sour-chicken-soup-1-500x500.jpg", // Hot and Sour Chicken Macaroni Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWhSr-Av1kFPXW6tpS1_vI0qGUYhbZMCl42w&s", // Herbal Soup
    "https://www.foodireland.com/recipes/wp-content/uploads/2013/07/mutton-broth.jpg", // Cream of Mushroom Soup
    "https://images.immediate.co.uk/production/volatile/sites/30/2021/07/Spicy-pumpkin-soup-fcf2fe5.jpg", // Pumpkin Soup
    "https://i.ytimg.com/vi/JypPJvP2Kp4/maxresdefault.jpg", // Pot Pie Soup with Tender Pops
    "https://c.ndtvimg.com/2020-12/q9bvneb_sweet-corn-soup-recipe_625x300_16_December_20.jpg", // Garlic Soup
    "https://www.secondrecipe.com/wp-content/uploads/2020/06/veg-manchow-soup.jpg", // Manchow Soup with Crispy Noodles
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWZ_ZD63lz1QYsdz_Dw_tSKJwEss3DFqaFCg&s", // Oats Soup
    "https://theunlikelybaker.com/wp-content/uploads/2025/11/4-Macaroni-Sopas.jpg", // Creamy Chicken Macaroni Soup
    "https://flavoredbyfatima.com/wp-content/uploads/2020/10/mutton-paya-mutton-trotters.jpeg", // Paye Soup
    "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-recipe.jpg", // Tomato Soup
    "https://kaynutrition.com/wp-content/uploads/2023/10/thai-chicken-noodle-soup-1.jpg", // Thai Soup
    "https://www.maggi.lk/sites/default/files/srh_recipes/21f2b7c2ebc7628c987903ea4a638ee9.jpg", // Chicken Corn Soup
    "https://www.forkinthekitchen.com/wp-content/uploads/2022/04/220323.vegetable.barley.soup-3802.jpg", // Mixed Vegetable Soup
    "https://sugarfreelondoner.com/wp-content/uploads/2023/11/clear-chicken-soup-1200.jpg", // Chicken Clear Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYT2yh9YBNNuh7RzN5J4gv5deNnVpsWUw4jA&s", // Noodles Soup
    "https://i.ytimg.com/vi/yqPFPNhqG1w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDYXmye0zIrwk7FMmzR8AruWEYTJA", // 19B Soup
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9QYX7gZb0ZvPyexK40_Nspt-9MnPOwaagQ&s"  // Fish Vegetable and Noodle Soup
  ];

  // All Soups Data
  const soups = [
    { 
      id: 1, 
      name: "Cream of Mushroom Soup",
      ingredients: [
        "500g fresh mushrooms, sliced",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "2 cups vegetable broth",
        "1 cup heavy cream",
        "2 tbsp butter",
        "2 tbsp all-purpose flour",
        "1 tsp thyme",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Melt butter in a large pot over medium heat.",
        "Add onions and garlic, sauté until translucent.",
        "Add mushrooms and cook until they release their moisture.",
        "Sprinkle flour and stir for 2 minutes.",
        "Gradually add vegetable broth while stirring.",
        "Bring to a simmer and cook for 15 minutes.",
        "Stir in cream and thyme, season with salt and pepper.",
        "Simmer for 5 more minutes and serve hot."
      ]
    },
    { 
      id: 2, 
      name: "Creamy Noodles Soup",
      ingredients: [
        "200g noodles",
        "4 cups chicken broth",
        "1 cup mixed vegetables (carrots, peas, corn)",
        "1 cup milk",
        "2 tbsp butter",
        "2 tbsp flour",
        "1 tsp black pepper",
        "Salt to taste"
      ],
      instructions: [
        "Cook noodles according to package instructions, drain and set aside.",
        "In a pot, melt butter and stir in flour to make a roux.",
        "Slowly add chicken broth while whisking.",
        "Add mixed vegetables and cook for 10 minutes.",
        "Stir in milk and cooked noodles.",
        "Season with salt and pepper, simmer for 5 minutes.",
        "Serve hot garnished with fresh herbs."
      ]
    },
    { 
      id: 3, 
      name: "Egg Drop Soup",
      ingredients: [
        "4 cups chicken broth",
        "2 eggs, lightly beaten",
        "2 tbsp cornstarch",
        "2 tbsp water",
        "1 tsp soy sauce",
        "1/2 tsp ginger, grated",
        "2 green onions, chopped",
        "1/4 tsp white pepper"
      ],
      instructions: [
        "Bring chicken broth to a boil in a pot.",
        "Mix cornstarch with water to make a slurry.",
        "Add soy sauce, ginger, and white pepper to the broth.",
        "Slowly pour in cornstarch slurry while stirring.",
        "Reduce heat to a simmer.",
        "Slowly drizzle beaten eggs into the soup while stirring gently.",
        "Cook for 1 minute until eggs set.",
        "Garnish with green onions and serve immediately."
      ]
    },
    { 
      id: 4, 
      name: "Chicken Macroni Corn Soup",
      ingredients: [
        "200g chicken breast, diced",
        "1 cup macaroni",
        "1 cup sweet corn kernels",
        "1 carrot, diced",
        "4 cups chicken broth",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "2 tbsp soy sauce",
        "1 tsp black pepper",
        "2 tbsp oil"
      ],
      instructions: [
        "Heat oil in a pot and sauté onions and garlic until fragrant.",
        "Add chicken and cook until no longer pink.",
        "Add carrots and corn, cook for 5 minutes.",
        "Pour in chicken broth and bring to a boil.",
        "Add macaroni and cook until al dente.",
        "Season with soy sauce and black pepper.",
        "Simmer for 10 minutes until flavors combine.",
        "Serve hot with crusty bread."
      ]
    },
    { 
      id: 5, 
      name: "Chicken Soup",
      ingredients: [
        "1 whole chicken (or 500g chicken pieces)",
        "8 cups water",
        "2 carrots, sliced",
        "2 celery stalks, chopped",
        "1 onion, chopped",
        "3 cloves garlic",
        "1 bay leaf",
        "1 tsp thyme",
        "Salt and pepper to taste",
        "Fresh parsley for garnish"
      ],
      instructions: [
        "Place chicken in a large pot with water.",
        "Bring to a boil, then reduce heat to simmer.",
        "Skim off any foam that rises to the surface.",
        "Add vegetables and herbs.",
        "Simmer for 45-60 minutes until chicken is tender.",
        "Remove chicken, shred the meat, and return to pot.",
        "Season with salt and pepper.",
        "Simmer for another 10 minutes and serve hot."
      ]
    },
    { 
      id: 6, 
      name: "Vegetable Hot and Sour Soup",
      ingredients: [
        "4 cups vegetable broth",
        "1 cup mixed vegetables (carrots, cabbage, bell peppers)",
        "100g tofu, cubed",
        "2 tbsp soy sauce",
        "1 tbsp vinegar",
        "1 tbsp chili sauce",
        "2 tbsp cornstarch",
        "1/4 cup water",
        "1 tsp ginger, grated",
        "1 tsp garlic, minced"
      ],
      instructions: [
        "Bring vegetable broth to a boil in a pot.",
        "Add mixed vegetables and cook for 8-10 minutes.",
        "Add tofu, ginger, and garlic.",
        "In a bowl, mix cornstarch with water to make slurry.",
        "Add soy sauce, vinegar, and chili sauce to the soup.",
        "Slowly add cornstarch slurry while stirring.",
        "Simmer for 5 minutes until soup thickens.",
        "Adjust seasoning and serve hot."
      ]
    },
    { 
      id: 7, 
      name: "Chicken Broth",
      ingredients: [
        "2kg chicken bones/carcass",
        "12 cups water",
        "2 onions, quartered",
        "3 carrots, chopped",
        "4 celery stalks",
        "4 cloves garlic, smashed",
        "2 bay leaves",
        "1 tsp peppercorns",
        "Salt to taste"
      ],
      instructions: [
        "Place chicken bones in a large pot with water.",
        "Bring to a boil, skim off impurities.",
        "Add all vegetables and aromatics.",
        "Reduce heat to low, partially cover, and simmer for 3 hours.",
        "Strain through fine mesh sieve.",
        "Let cool, then refrigerate to remove fat.",
        "Use as base for soups or store frozen."
      ]
    },
    { 
      id: 8, 
      name: "Chicken Vegetable Soup",
      ingredients: [
        "300g chicken breast, cubed",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 potatoes, diced",
        "1 cup green beans, chopped",
        "4 cups chicken broth",
        "2 tomatoes, chopped",
        "1 tsp mixed herbs",
        "2 tbsp oil",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Heat oil in a pot and sauté onions until golden.",
        "Add chicken and cook until browned.",
        "Add carrots, potatoes, and green beans, cook for 5 minutes.",
        "Pour in chicken broth and bring to a boil.",
        "Add tomatoes and mixed herbs.",
        "Simmer for 30 minutes until vegetables are tender.",
        "Season with salt and pepper.",
        "Serve hot with bread rolls."
      ]
    },
    { 
      id: 9, 
      name: "Mulligatawny Soup",
      ingredients: [
        "1 cup red lentils",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 apples, peeled and diced",
        "4 cups vegetable broth",
        "2 tbsp curry powder",
        "1 tsp turmeric",
        "1 tsp cumin",
        "2 tbsp coconut milk",
        "2 tbsp oil"
      ],
      instructions: [
        "Rinse lentils and soak for 30 minutes.",
        "Heat oil and sauté onions until soft.",
        "Add carrots and apples, cook for 5 minutes.",
        "Add spices and cook until fragrant.",
        "Add lentils and vegetable broth, bring to boil.",
        "Simmer for 30 minutes until lentils are soft.",
        "Blend half the soup for creaminess.",
        "Stir in coconut milk and serve hot."
      ]
    },
    { 
      id: 10, 
      name: "Chicken Tikka Corn Soup",
      ingredients: [
        "200g chicken tikka pieces",
        "1 cup sweet corn",
        "1 bell pepper, chopped",
        "4 cups chicken broth",
        "1 cup cream",
        "2 tbsp tikka masala",
        "1 onion, chopped",
        "2 tbsp butter",
        "Fresh coriander for garnish"
      ],
      instructions: [
        "Sauté onions in butter until golden.",
        "Add chicken tikka pieces and cook for 5 minutes.",
        "Add bell pepper and sweet corn, cook for 3 minutes.",
        "Add tikka masala and cook for 2 minutes.",
        "Pour in chicken broth and bring to simmer.",
        "Cook for 15 minutes until flavors blend.",
        "Stir in cream and heat through.",
        "Garnish with fresh coriander and serve."
      ]
    },
    { 
      id: 11, 
      name: "Lentil Soup",
      ingredients: [
        "1 cup brown lentils",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 celery stalks, chopped",
        "4 cups vegetable broth",
        "2 cloves garlic, minced",
        "1 tsp cumin",
        "1 bay leaf",
        "2 tbsp lemon juice"
      ],
      instructions: [
        "Rinse lentils and drain.",
        "Sauté onions, carrots, and celery in oil until soft.",
        "Add garlic and cumin, cook for 1 minute.",
        "Add lentils, vegetable broth, and bay leaf.",
        "Bring to boil, then reduce heat to simmer.",
        "Cook for 35-40 minutes until lentils are tender.",
        "Remove bay leaf and blend partially if desired.",
        "Stir in lemon juice and serve."
      ]
    },
    { 
      id: 12, 
      name: "Tomato Chicken Macaroni Soup",
      ingredients: [
        "200g chicken breast, shredded",
        "1 cup macaroni",
        "4 cups tomato puree",
        "2 cups chicken broth",
        "1 onion, chopped",
        "2 cloves garlic",
        "1 tsp oregano",
        "1 tsp basil",
        "2 tbsp olive oil"
      ],
      instructions: [
        "Cook macaroni according to package directions, drain.",
        "Heat olive oil and sauté onion and garlic.",
        "Add shredded chicken and cook for 5 minutes.",
        "Add tomato puree and chicken broth.",
        "Season with oregano and basil.",
        "Simmer for 15 minutes.",
        "Add cooked macaroni and heat through.",
        "Serve hot with grated cheese."
      ]
    },
    { 
      id: 13, 
      name: "Barley Soup",
      ingredients: [
        "1 cup pearl barley",
        "2 carrots, diced",
        "2 potatoes, diced",
        "1 onion, chopped",
        "4 cups vegetable broth",
        "2 tbsp tomato paste",
        "1 tsp thyme",
        "2 tbsp olive oil"
      ],
      instructions: [
        "Rinse barley and soak for 30 minutes.",
        "Heat oil and sauté onions until translucent.",
        "Add carrots and potatoes, cook for 5 minutes.",
        "Add barley and vegetable broth.",
        "Stir in tomato paste and thyme.",
        "Bring to boil, then reduce to simmer.",
        "Cook for 50-60 minutes until barley is tender.",
        "Season with salt and pepper."
      ]
    },
    { 
      id: 14, 
      name: "Chicken Potato Soup",
      ingredients: [
        "300g chicken, cubed",
        "3 potatoes, diced",
        "1 onion, chopped",
        "2 carrots, diced",
        "4 cups chicken broth",
        "1 cup milk",
        "2 tbsp flour",
        "2 tbsp butter",
        "Fresh dill for garnish"
      ],
      instructions: [
        "Melt butter and sauté onions until soft.",
        "Add chicken and cook until no longer pink.",
        "Add potatoes and carrots, cook for 5 minutes.",
        "Sprinkle flour and stir for 2 minutes.",
        "Gradually add chicken broth while stirring.",
        "Simmer for 20 minutes until vegetables are tender.",
        "Stir in milk and heat through.",
        "Garnish with fresh dill."
      ]
    },
    { 
      id: 15, 
      name: "Hareesa Soup",
      ingredients: [
        "500g boneless chicken or mutton",
        "1 cup wheat, soaked overnight",
        "2 onions, finely chopped",
        "4 cloves garlic, minced",
        "2-inch ginger, grated",
        "1 tbsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup ghee",
        "Salt to taste"
      ],
      instructions: [
        "Pressure cook meat with wheat until very tender.",
        "Shred the meat finely.",
        "Heat ghee and sauté onions until golden brown.",
        "Add garlic and ginger, cook for 2 minutes.",
        "Add chili powder and garam masala.",
        "Add shredded meat and wheat mixture.",
        "Cook on low heat for 2-3 hours, stirring occasionally.",
        "Serve hot with lemon wedges."
      ]
    },
    { 
      id: 16, 
      name: "Cream of Chicken Soup",
      ingredients: [
        "300g chicken breast",
        "4 cups chicken broth",
        "1 cup heavy cream",
        "1 onion, chopped",
        "2 tbsp butter",
        "2 tbsp flour",
        "1 tsp thyme",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Poach chicken in broth until cooked, then shred.",
        "Melt butter and sauté onions until soft.",
        "Add flour and cook for 2 minutes.",
        "Gradually add chicken broth while whisking.",
        "Add shredded chicken and thyme.",
        "Simmer for 15 minutes.",
        "Stir in cream and heat through.",
        "Season and serve hot."
      ]
    },
    { 
      id: 17, 
      name: "Spinach Soup",
      ingredients: [
        "500g fresh spinach",
        "1 onion, chopped",
        "2 cloves garlic",
        "3 cups vegetable broth",
        "1 cup milk",
        "2 tbsp butter",
        "Pinch of nutmeg",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Wash spinach thoroughly.",
        "Melt butter and sauté onion and garlic.",
        "Add spinach and cook until wilted.",
        "Add vegetable broth and bring to boil.",
        "Simmer for 10 minutes.",
        "Blend until smooth.",
        "Return to pot, add milk and nutmeg.",
        "Heat through and serve."
      ]
    },
    { 
      id: 18, 
      name: "Restaurant Style Hot and Sour Soup",
      ingredients: [
        "4 cups chicken broth",
        "100g chicken, shredded",
        "50g mushrooms, sliced",
        "50g bamboo shoots",
        "2 tbsp soy sauce",
        "2 tbsp vinegar",
        "1 tbsp chili sauce",
        "2 tbsp cornstarch",
        "1 egg, beaten"
      ],
      instructions: [
        "Bring broth to boil.",
        "Add chicken, mushrooms, and bamboo shoots.",
        "Cook for 8 minutes.",
        "Mix cornstarch with water for slurry.",
        "Add soy sauce, vinegar, and chili sauce.",
        "Add cornstarch slurry while stirring.",
        "Slowly drizzle beaten egg while stirring.",
        "Serve immediately."
      ]
    },
    { 
      id: 19, 
      name: "Chicken Corn Soup",
      ingredients: [
        "200g chicken breast, shredded",
        "1 can cream style corn",
        "4 cups chicken broth",
        "2 tbsp cornstarch",
        "1 egg white",
        "1 tsp ginger, grated",
        "2 spring onions, chopped",
        "Salt and white pepper"
      ],
      instructions: [
        "Bring broth to boil.",
        "Add chicken and ginger, cook for 10 minutes.",
        "Add cream style corn.",
        "Mix cornstarch with water for slurry.",
        "Add slurry while stirring until thickened.",
        "Slowly pour in beaten egg white.",
        "Season with salt and white pepper.",
        "Garnish with spring onions."
      ]
    },
    { 
      id: 20, 
      name: "Mixed Grain Soup",
      ingredients: [
        "1/2 cup barley",
        "1/2 cup quinoa",
        "1/4 cup lentils",
        "4 cups vegetable broth",
        "2 carrots, diced",
        "2 celery stalks, chopped",
        "1 onion, chopped",
        "2 tbsp olive oil"
      ],
      instructions: [
        "Rinse all grains.",
        "Heat oil and sauté vegetables.",
        "Add grains and cook for 2 minutes.",
        "Add vegetable broth.",
        "Bring to boil, then reduce to simmer.",
        "Cook for 45 minutes until grains are tender.",
        "Season with herbs and spices.",
        "Serve hot."
      ]
    },
    { 
      id: 21, 
      name: "Hot and Sour Chicken Macaroni Soup",
      ingredients: [
        "200g chicken, shredded",
        "1 cup macaroni",
        "4 cups chicken broth",
        "2 tbsp soy sauce",
        "1 tbsp vinegar",
        "1 tbsp chili garlic sauce",
        "2 tbsp cornstarch",
        "1 cup mixed vegetables"
      ],
      instructions: [
        "Cook macaroni, drain and set aside.",
        "Bring broth to boil.",
        "Add chicken and vegetables, cook for 10 minutes.",
        "Add soy sauce, vinegar, and chili sauce.",
        "Mix cornstarch with water for slurry.",
        "Add slurry while stirring until thickened.",
        "Add cooked macaroni.",
        "Serve hot."
      ]
    },
    { 
      id: 22, 
      name: "Herbal Soup",
      ingredients: [
        "300g chicken or pork ribs",
        "10 red dates",
        "20g goji berries",
        "15g dried longan",
        "10g dried polygonatum",
        "10g dried Chinese yam",
        "2 liters water",
        "Salt to taste"
      ],
      instructions: [
        "Blanch meat in boiling water, then rinse.",
        "Combine all ingredients in large pot.",
        "Bring to boil, then reduce to simmer.",
        "Simmer for 1.5-2 hours.",
        "Skim off any impurities.",
        "Season with salt if needed.",
        "Strain and serve hot.",
        "Discard herbs before serving."
      ]
    },
    { 
      id: 23, 
      name: "Mutton Broth",
      ingredients: [
       " Mutton with bones",

"Water",

"Onion",

"Garlic cloves",

"Ginger",

"Whole black pepper",

"Cloves",

"Green cardamom",

"Cinnamon stick",

"Bay leaf",

"Salt",

"Fresh coriander",

"Green chilies (optional)"
      ],
      instructions: [
        "Wash the mutton thoroughly and place it in a cooking pot.",
        "Add water, onion, garlic, ginger, and all whole spices.",
        "Bring to a boil, then reduce the heat and let it simmer until the mutton becomes tender and the broth turns rich and flavorful.",
        "Remove any foam that forms on the surface during cooking.",
        "Add salt and optional green chilies toward the end.",
        "Strain the broth for a clear soup, or serve it with the meat pieces.",
        "Garnish with fresh coriander and serve hot.",
        
      ]
    },
    { 
      id: 24, 
      name: "Pumpkin Soup",
      ingredients: [
        "1 kg pumpkin, peeled and cubed",
        "1 onion, chopped",
        "2 cloves garlic",
        "4 cups vegetable broth",
        "1 cup coconut milk",
        "1 tsp cinnamon",
        "1/2 tsp nutmeg",
        "2 tbsp olive oil"
      ],
      instructions: [
        "Roast pumpkin cubes with oil until tender.",
        "Sauté onion and garlic until soft.",
        "Add roasted pumpkin and broth.",
        "Simmer for 15 minutes.",
        "Blend until very smooth.",
        "Return to pot, add coconut milk and spices.",
        "Heat through without boiling.",
        "Serve with pumpkin seeds."
      ]
    },
    { 
      id: 25, 
      name: "Pot Pie Soup with Tender Pops",
      ingredients: [
        "300g chicken, cubed",
        "2 carrots, diced",
        "1 cup peas",
        "2 potatoes, diced",
        "4 cups chicken broth",
        "1 cup milk",
        "2 tbsp flour",
        "Puff pastry for topping"
      ],
      instructions: [
        "Sauté chicken until cooked, remove from pot.",
        "Sauté vegetables until tender.",
        "Add flour and cook for 2 minutes.",
        "Gradually add broth and milk.",
        "Add chicken back to pot.",
        "Simmer for 20 minutes.",
        "Bake puff pastry separately.",
        "Serve soup with pastry on top."
      ]
    },
    { 
      id: 26, 
      name: "Garlic Soup",
      ingredients: [
        "2 whole garlic bulbs",
        "1 onion, chopped",
        "4 cups vegetable broth",
        "1 cup cream",
        "2 tbsp olive oil",
        "Fresh thyme",
        "Salt and pepper"
      ],
      instructions: [
        "Roast garlic bulbs until soft and caramelized.",
        "Squeeze out garlic cloves.",
        "Sauté onion until translucent.",
        "Add roasted garlic and broth.",
        "Simmer for 20 minutes.",
        "Blend until smooth.",
        "Stir in cream and thyme.",
        "Heat through and serve."
      ]
    },
    { 
      id: 27, 
      name: "Manchow Soup With Crispy Noodles",
      ingredients: [
        "4 cups vegetable broth",
        "1 cup mixed vegetables",
        "100g chicken or tofu",
        "2 tbsp soy sauce",
        "1 tbsp vinegar",
        "1 tbsp chili sauce",
        "2 tbsp cornstarch",
        "Crispy noodles for topping"
      ],
      instructions: [
        "Sauté vegetables and protein until cooked.",
        "Add broth and bring to boil.",
        "Add soy sauce, vinegar, and chili sauce.",
        "Mix cornstarch with water for slurry.",
        "Add slurry while stirring until thickened.",
        "Simmer for 10 minutes.",
        "Deep fry noodles until crispy.",
        "Serve soup with crispy noodles on top."
      ]
    },
    { 
      id: 28, 
      name: "Oats Soup",
      ingredients: [
        "1 cup rolled oats",
        "4 cups vegetable broth",
        "1 carrot, grated",
        "1 onion, chopped",
        "2 cloves garlic",
        "1 tsp cumin",
        "2 tbsp lemon juice",
        "Fresh coriander"
      ],
      instructions: [
        "Dry roast oats for 2-3 minutes.",
        "Sauté vegetables until soft.",
        "Add oats and broth.",
        "Bring to boil, then reduce to simmer.",
        "Cook for 15 minutes until oats are soft.",
        "Add cumin and lemon juice.",
        "Garnish with coriander.",
        "Serve hot."
      ]
    },
    { 
      id: 29, 
      name: "Creamy Chicken Macaroni Soup",
      ingredients: [
        "200g chicken, cubed",
        "1 cup macaroni",
        "4 cups chicken broth",
        "1 cup cream",
        "1 onion, chopped",
        "2 tbsp butter",
        "2 tbsp flour",
        "1 tsp mixed herbs"
      ],
      instructions: [
        "Cook macaroni, drain and set aside.",
        "Sauté chicken until cooked, remove.",
        "Melt butter and sauté onions.",
        "Add flour and cook for 2 minutes.",
        "Gradually add broth while whisking.",
        "Add chicken and herbs.",
        "Simmer for 15 minutes.",
        "Stir in cream and macaroni."
      ]
    },
    { 
      id: 30, 
      name: "Paye Soup",
      ingredients: [
        "4 lamb or goat trotters",
        "2 onions, chopped",
        "2-inch ginger, grated",
        "6 cloves garlic",
        "2 tbsp coriander powder",
        "1 tbsp red chili powder",
        "1 tsp turmeric",
        "Fresh ginger for garnish"
      ],
      instructions: [
        "Clean trotters thoroughly.",
        "Pressure cook trotters with water for 2 hours.",
        "Sauté onions until golden brown.",
        "Add ginger, garlic, and spices.",
        "Add cooked trotters and broth.",
        "Simmer for 3-4 hours until gelatinous.",
        "Skim off excess fat.",
        "Serve with fresh ginger and lemon."
      ]
    },
    { 
      id: 31, 
      name: "Tomato Soup",
      ingredients: [
        "1 kg ripe tomatoes",
        "1 onion, chopped",
        "2 cloves garlic",
        "4 cups vegetable broth",
        "2 tbsp tomato paste",
        "1 tsp sugar",
        "Fresh basil",
        "2 tbsp cream"
      ],
      instructions: [
        "Blanch tomatoes, peel and chop.",
        "Sauté onion and garlic until soft.",
        "Add tomatoes and tomato paste.",
        "Cook for 10 minutes until tomatoes break down.",
        "Add broth and simmer for 15 minutes.",
        "Blend until smooth.",
        "Add sugar and basil.",
        "Serve with cream drizzle."
      ]
    },
    { 
      id: 32, 
      name: "Thai Soup",
      ingredients: [
        "4 cups chicken or vegetable broth",
        "2 stalks lemongrass",
        "4 kaffir lime leaves",
        "2-inch galangal, sliced",
        "200g shrimp or chicken",
        "4 mushrooms, sliced",
        "2 tbsp fish sauce",
        "2 tbsp lime juice"
      ],
      instructions: [
        "Bruise lemongrass and add to broth.",
        "Add galangal and kaffir lime leaves.",
        "Bring to boil and simmer for 10 minutes.",
        "Add protein and mushrooms.",
        "Cook until protein is done.",
        "Remove lemongrass and galangal.",
        "Add fish sauce and lime juice.",
        "Serve with fresh cilantro."
      ]
    },
    { 
      id: 33, 
      name: "Chicken Corn Soup",
      ingredients: [
        "200g chicken breast, shredded",
        "1 can corn kernels",
        "4 cups chicken broth",
        "2 tbsp cornstarch",
        "1 egg white",
        "1 tsp ginger, grated",
        "Spring onions",
        "White pepper"
      ],
      instructions: [
        "Bring broth to boil.",
        "Add chicken and ginger.",
        "Cook for 10 minutes.",
        "Add corn kernels.",
        "Mix cornstarch with water.",
        "Add slurry while stirring.",
        "Drizzle egg white while stirring.",
        "Garnish with spring onions."
      ]
    },
    { 
      id: 34, 
      name: "Mixed Vegetable Soup",
      ingredients: [
        "2 cups mixed vegetables",
        "1 onion, chopped",
        "2 cloves garlic",
        "4 cups vegetable broth",
        "2 tomatoes, chopped",
        "1 tsp mixed herbs",
        "2 tbsp olive oil",
        "Salt and pepper"
      ],
      instructions: [
        "Sauté onion and garlic until soft.",
        "Add mixed vegetables, cook for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add vegetable broth and herbs.",
        "Bring to boil, then simmer for 20 minutes.",
        "Season with salt and pepper.",
        "Blend partially if desired.",
        "Serve hot."
      ]
    },
    { 
      id: 35, 
      name: "Chicken Clear Soup",
      ingredients: [
        "300g chicken pieces",
        "6 cups water",
        "1 carrot, sliced",
        "2 celery stalks",
        "1 onion, quartered",
        "4 cloves garlic",
        "1-inch ginger",
        "Salt to taste"
      ],
      instructions: [
        "Place chicken in pot with water.",
        "Bring to boil, skim impurities.",
        "Add vegetables and aromatics.",
        "Simmer for 40 minutes.",
        "Remove chicken and shred.",
        "Strain broth through cheesecloth.",
        "Return chicken to clear broth.",
        "Season and serve."
      ]
    },
    { 
      id: 36, 
      name: "Noodles Soup",
      ingredients: [
        "200g noodles",
        "4 cups broth",
        "1 cup mixed vegetables",
        "100g chicken or tofu",
        "2 tbsp soy sauce",
        "1 tsp sesame oil",
        "Spring onions",
        "Chili flakes"
      ],
      instructions: [
        "Cook noodles according to package.",
        "Bring broth to boil.",
        "Add vegetables and protein.",
        "Cook for 10 minutes.",
        "Add cooked noodles.",
        "Season with soy sauce and sesame oil.",
        "Garnish with spring onions.",
        "Serve with chili flakes."
      ]
    },
    { 
      id: 37, 
      name: "19B Soup",
      ingredients: [
        "4 cups chicken broth",
        "200g chicken, shredded",
        "1 cup mixed vegetables",
        "2 tbsp soy sauce",
        "1 tbsp oyster sauce",
        "1 tsp white pepper",
        "2 tbsp cornstarch",
        "1 egg, beaten"
      ],
      instructions: [
        "Bring broth to boil.",
        "Add chicken and vegetables.",
        "Cook for 15 minutes.",
        "Add soy sauce and oyster sauce.",
        "Mix cornstarch with water for slurry.",
        "Add slurry while stirring.",
        "Drizzle beaten egg while stirring.",
        "Season with white pepper."
      ]
    },
    { 
      id: 38, 
      name: "Fish Vegetable and Noodle Soup",
      ingredients: [
        "300g white fish fillets",
        "1 cup noodles",
        "4 cups fish or vegetable broth",
        "1 cup mixed vegetables",
        "2 tbsp fish sauce",
        "1 tbsp lime juice",
        "1 tsp ginger, grated",
        "Fresh cilantro"
      ],
      instructions: [
        "Cook noodles, drain and set aside.",
        "Bring broth to simmer.",
        "Add ginger and vegetables.",
        "Cook for 8 minutes.",
        "Add fish pieces gently.",
        "Cook for 5 minutes until fish flakes.",
        "Add noodles, fish sauce, and lime juice.",
        "Garnish with cilantro."
      ]
    }
  ];

  // Voice instructions handler
  const speakInstructions = (instructions, stepIndex = 0, autoStart = true) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        speechSynthesisRef.current = null;
        return;
      }

      if (stepIndex >= 0 && stepIndex < instructions.length) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = `Step ${stepIndex + 1}: ${instructions[stepIndex]}`;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        setCurrentStep(stepIndex + 1);
        const stepProgress = ((stepIndex + 1) / instructions.length) * 100;
        setProgress(stepProgress);
        
        utterance.onstart = () => {
          setIsPlaying(true);
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
          
          if (stepIndex < instructions.length - 1) {
            setTimeout(() => {
              if (showVoiceInstructions && !speechSynthesisRef.current) {
                speakInstructions(instructions, stepIndex + 1, true);
              }
            }, 1000);
          }
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
        };
        
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } else {
        const utterance = new SpeechSynthesisUtterance();
        let fullText = "";
        instructions.forEach((step, index) => {
          fullText += `Step ${index + 1}: ${step}. `;
        });
        
        utterance.text = fullText;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onstart = () => {
          setIsPlaying(true);
          setCurrentStep(1);
          setProgress(10);
        };
        
        const totalTime = fullText.length * 0.05;
        const intervalTime = totalTime * 10;
        let currentProgress = 10;
        
        const progressInterval = setInterval(() => {
          if (currentProgress < 90) {
            currentProgress += 5;
            setProgress(currentProgress);
          }
        }, intervalTime / 18);
        
        utterance.onend = () => {
          clearInterval(progressInterval);
          setIsPlaying(false);
          setCurrentStep(instructions.length);
          setProgress(100);
          speechSynthesisRef.current = null;
        };
        
        utterance.onerror = () => {
          clearInterval(progressInterval);
          setIsPlaying(false);
          setCurrentStep(0);
          setProgress(0);
          speechSynthesisRef.current = null;
        };
        
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert('Your browser does not support text-to-speech. Please use a modern browser like Chrome or Edge.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      speechSynthesisRef.current = null;
    }
  };

  const speakNextStep = () => {
    if (selectedSoup && currentStep < selectedSoup.instructions.length) {
      stopSpeaking();
      speakInstructions(selectedSoup.instructions, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedSoup && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedSoup.instructions, currentStep - 2);
    }
  };

  const speakStep = (stepIndex) => {
    if (selectedSoup && stepIndex >= 0 && stepIndex < selectedSoup.instructions.length) {
      stopSpeaking();
      speakInstructions(selectedSoup.instructions, stepIndex);
    }
  };

  const toggleVoiceInstructions = () => {
    const newState = !showVoiceInstructions;
    setShowVoiceInstructions(newState);
    
    if (newState && selectedSoup && !autoPlayStartedRef.current) {
      autoPlayStartedRef.current = true;
      setTimeout(() => {
        if (showVoiceInstructions && selectedSoup) {
          speakInstructions(selectedSoup.instructions, 0, true);
        }
      }, 500);
    } else if (!newState && isPlaying) {
      stopSpeaking();
      setCurrentStep(0);
      setProgress(0);
      autoPlayStartedRef.current = false;
    }
  };

  useEffect(() => {
    if (isModalOpen && showVoiceInstructions && selectedSoup && !autoPlayStartedRef.current) {
      autoPlayStartedRef.current = true;
      setTimeout(() => {
        if (showVoiceInstructions && selectedSoup && isModalOpen) {
          speakInstructions(selectedSoup.instructions, 0, true);
        }
      }, 800);
    }
    
    return () => {
      stopSpeaking();
      autoPlayStartedRef.current = false;
    };
  }, [isModalOpen, showVoiceInstructions, selectedSoup]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      autoPlayStartedRef.current = false;
    };
  }, []);

  // Navigation Handlers
  const handleViewRecipe = (soup) => {
    setSelectedSoup(soup);
    setIsModalOpen(true);
    setIsPlaying(false);
    setShowVoiceInstructions(false);
    setCurrentStep(0);
    setProgress(0);
    autoPlayStartedRef.current = false;
  };

  const closeModal = () => {
    stopSpeaking();
    setIsModalOpen(false);
    setSelectedSoup(null);
    setIsPlaying(false);
    setShowVoiceInstructions(false);
    setCurrentStep(0);
    setProgress(0);
    autoPlayStartedRef.current = false;
  };

  const handleGoBack = () => {
    navigate('/');
  };

  // Filter soups based on search
  const filteredSoups = soups.filter(soup =>
    soup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="soups-page">
      {/* Header */}
      <header className="soups-header">
        <div className="header-content">
          <h1>Soup Recipe Collection</h1>
          <p>A curated selection of comforting and flavorful soups</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="soups-main">
        <div className="soups-container">
          {filteredSoups.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No soups found matching "{searchTerm}"</h3>
              <p>Try searching for something else</p>
              <button 
                className="clear-search-button"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="soups-grid">
                {filteredSoups.map((soup) => (
                  <div key={soup.id} className="soup-card">
                    <div className="soup-card-image">
                      <img 
                        src={soupImages[soup.id - 1] || soupImages[0]}
                        alt={soup.name}
                        className="soup-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="soup-card-content">
                      <h3 className="soup-name">{soup.name}</h3>
                      <button 
                        className="view-recipe-btn"
                        onClick={() => handleViewRecipe(soup)}
                      >
                        <i className="fas fa-utensils"></i> View Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="back-button-container">
                <button className="back-home-btn" onClick={handleGoBack}>
                  <i className="fas fa-arrow-left"></i> Back to Home
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Recipe Modal */}
      {isModalOpen && selectedSoup && (
        <div className="recipe-modal-overlay">
          <div className="recipe-modal">
            <div className="modal-header">
              <h2 className="modal-title" style={{color: 'white'}}>{selectedSoup.name}</h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="instructions-toggle-container">
              <div className="instructions-toggle">
                <button 
                  className={`instruction-tab ${!showVoiceInstructions ? 'active' : ''}`}
                  onClick={() => setShowVoiceInstructions(false)}
                >
                  <i className="fas fa-file-alt"></i> Text Instructions
                </button>
                <button 
                  className={`instruction-tab ${showVoiceInstructions ? 'active' : ''}`}
                  onClick={toggleVoiceInstructions}
                >
                  <i className="fas fa-volume-up"></i> Voice Instructions
                </button>
              </div>
            </div>
            
            <div className="modal-content">
              {!showVoiceInstructions && (
                <div className="recipe-section">
                  <div className="section-header">
                    <h3><i className="fas fa-clipboard-list"></i> Ingredients</h3>
                  </div>
                  <div className="section-content">
                    <ul className="ingredients-list">
                      {selectedSoup.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {!showVoiceInstructions ? (
                <div className="recipe-section">
                  <div className="section-header">
                    <h3><i className="fas fa-list-ol"></i> Instructions</h3>
                  </div>
                  <div className="section-content">
                    <ol className="instructions-list">
                      {selectedSoup.instructions.map((step, index) => (
                        <li key={index}>
                          <div className="instruction-step">
                            <span className="step-number">{index + 1}.</span>
                            <span className="step-text">{step}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="recipe-section">
                  <div className="section-header">
                    <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                    <div className="voice-status">
                      <div className={`voice-status-indicator ${isPlaying ? 'playing' : 'paused'}`}>
                        <i className={`fas fa-${isPlaying ? 'volume-up' : 'volume-mute'}`}></i>
                        <span>{isPlaying ? 'Playing Automatically' : 'Ready to Play'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="section-content">
                    <div className="voice-player">
                      <div className="voice-player-header">
                        <div className="voice-recipe-info">
                          <h4>🎤 Voice Guide for {selectedSoup.name}</h4>
                        </div>
                      </div>
                      
                      <div className="voice-controls-main">
                        <div className="voice-progress-container">
                          <div className="voice-progress-bar">
                            <div 
                              className="voice-progress-fill" 
                              style={{width: `${progress}%`}}
                            ></div>
                          </div>
                          <div className="voice-progress-info">
                            <span>Progress: {Math.round(progress)}%</span>
                            <span>Step {currentStep} of {selectedSoup.instructions.length}</span>
                          </div>
                        </div>
                        
                        <div className="voice-buttons">
                          <button 
                            className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                            onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedSoup.instructions)}
                          >
                            <i className={`fas fa-${isPlaying ? 'stop' : 'play'}`}></i>
                            {isPlaying ? ' Stop Auto-Play' : ' Restart Guide'}
                          </button>
                        </div>
                        
                        <div className="step-navigation">
                          <button 
                            className="step-nav-btn prev"
                            onClick={speakPreviousStep}
                            disabled={currentStep <= 1}
                          >
                            <i className="fas fa-backward"></i> Previous Step
                          </button>
                          
                          <button 
                            className="step-nav-btn next"
                            onClick={speakNextStep}
                            disabled={currentStep >= selectedSoup.instructions.length}
                          >
                            Next Step <i className="fas fa-forward"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="voice-steps-overview">
                        <h5>
                          <i className="fas fa-list-ol"></i> Steps Overview
                          <span className="steps-count">
                            {currentStep}/{selectedSoup.instructions.length} Completed
                          </span>
                        </h5>
                        <div className="steps-container">
                          {selectedSoup.instructions.map((step, index) => (
                            <div 
                              key={index} 
                              className={`step-item ${index < currentStep ? 'completed' : ''} ${index === currentStep - 1 && isPlaying ? 'current' : ''}`}
                              onClick={() => speakStep(index)}
                              style={{cursor: 'pointer'}}
                            >
                              <div className="step-number-circle">
                                {index < currentStep ? (
                                  <i className="fas fa-check"></i>
                                ) : (
                                  <span>{index + 1}</span>
                                )}
                              </div>
                              <div className="step-content">
                                <div className="step-title">Step {index + 1}</div>
                                <div className="step-text-preview">{step.substring(0, 60)}...</div>
                              </div>
                              <div className="step-play-btn">
                                <i className="fas fa-play"></i>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="modal-actions">
                <button className="close-modal-btn" onClick={closeModal}>
                  <i className="fas fa-times"></i> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSoupPage;