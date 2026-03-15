import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesHeavyGravy.css';

const RecipesHeavyGravy = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Heavy Gravy Recipes (30+ recipes)
  const gravyRecipes = [
    // ==================== NIHARI (5) ====================
    { 
      id: 1, 
      name: "Beef Nihari",
      tagline: "Slow-cooked spicy beef stew",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "1 kg beef shank with bone",
        "1/2 cup oil or ghee",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "2 tbsp nihari masala",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "1 tsp salt",
        "4 cups water",
        "1/4 cup wheat flour (for thickening)",
        "1/2 cup water (for flour slurry)",
        "For garnish: ginger julienne, green chilies, coriander, lemon wedges"
      ],
      steps: [
        "Heat oil in a large pot, add onions and fry until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add beef and fry on high heat for 10 minutes until browned.",
        "Add nihari masala, turmeric, red chili and salt. Mix well.",
        "Add 4 cups water and bring to boil.",
        "Cover and cook on low heat for 2-3 hours until meat is very tender.",
        "Mix wheat flour with 1/2 cup water to make smooth slurry.",
        "Add slurry to nihari, stirring continuously to avoid lumps.",
        "Simmer for 15-20 minutes until gravy thickens.",
        "Serve hot with naan, garnished with ginger, chilies, coriander and lemon."
      ]
    },
    { 
      id: 2, 
      name: "Mutton Nihari",
      tagline: "Nihari with mutton",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "1 kg mutton shanks",
        "1/2 cup oil",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tbsp nihari masala",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp salt",
        "4 cups water",
        "1/4 cup flour"
      ],
      steps: [
        "Fry onions, add ginger-garlic.",
        "Add mutton and spices. Fry.",
        "Add water and cook for 2 hours.",
        "Add flour slurry to thicken.",
        "Simmer and serve."
      ]
    },
    { 
      id: 3, 
      name: "Chicken Nihari",
      tagline: "Quick chicken nihari",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "1 kg chicken",
        "1/2 cup oil",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tbsp nihari masala",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp salt",
        "3 cups water",
        "2 tbsp flour"
      ],
      steps: [
        "Fry onions and ginger-garlic.",
        "Add chicken and spices. Fry.",
        "Add water and cook for 30 minutes.",
        "Add flour slurry and simmer.",
        "Serve with naan."
      ]
    },
    { 
      id: 4, 
      name: "Bong Nihari",
      tagline: "Nihari with bone marrow",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "1 kg beef with marrow bones",
        "1/2 cup oil",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tbsp nihari masala",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp salt",
        "4 cups water",
        "1/4 cup flour"
      ],
      steps: [
        "Cook as regular nihari.",
        "Ensure marrow bones are included.",
        "Serve with extra marrow on top."
      ]
    },
    { 
      id: 5, 
      name: "Special Nihari",
      tagline: "Restaurant style nihari",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "1 kg beef",
        "1/2 cup oil",
        "3 onions",
        "3 tbsp ginger-garlic",
        "3 tbsp nihari masala",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp salt",
        "1 tsp garam masala",
        "4 cups water",
        "1/4 cup flour",
        "Ginger, chilies, coriander for garnish"
      ],
      steps: [
        "Follow nihari recipe.",
        "Add extra spices for richness.",
        "Garnish generously."
      ]
    },

    // ==================== HALEEM (5) ====================
    { 
      id: 6, 
      name: "Beef Haleem",
      tagline: "Slow-cooked meat and lentil porridge",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g beef",
        "1 cup wheat (dalia)",
        "1/2 cup chana dal",
        "1/2 cup moong dal",
        "1/2 cup masoor dal",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "2 tsp red chili powder",
        "1 tsp turmeric",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1 cup oil",
        "Salt to taste",
        "For garnish: fried onions, ginger, green chilies, coriander, lemon"
      ],
      steps: [
        "Soak wheat and dals for 2 hours.",
        "Pressure cook beef with salt and turmeric until tender.",
        "Separately cook wheat and dals until very soft.",
        "Heat oil, fry onions until golden. Remove half for garnish.",
        "Add ginger-garlic to remaining onions, cook for 2 minutes.",
        "Add spices and cook for 1 minute.",
        "Add cooked beef with its stock. Shred the meat.",
        "Add cooked wheat and dals. Mix well.",
        "Whisk continuously on low heat for 30-40 minutes until well blended.",
        "Adjust consistency with water if needed.",
        "Top with fried onions, ginger, chilies, coriander and lemon.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 7, 
      name: "Mutton Haleem",
      tagline: "Haleem with mutton",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g mutton",
        "1 cup wheat",
        "1/2 cup chana dal",
        "1/2 cup moong dal",
        "1/2 cup masoor dal",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp garam masala",
        "1 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook mutton with spices.",
        "Cook dals and wheat separately.",
        "Mix and blend well.",
        "Garnish and serve."
      ]
    },
    { 
      id: 8, 
      name: "Chicken Haleem",
      tagline: "Lighter chicken haleem",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup wheat",
        "1/2 cup chana dal",
        "1/2 cup moong dal",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook chicken until tender, shred.",
        "Cook dals and wheat.",
        "Mix and blend.",
        "Garnish and serve."
      ]
    },
    { 
      id: 9, 
      name: "Hyderabadi Haleem",
      tagline: "Famous Hyderabadi haleem",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g beef or mutton",
        "1 cup wheat",
        "1/2 cup chana dal",
        "1/2 cup moong dal",
        "1/2 cup rice",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp garam masala",
        "1 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook meat with spices.",
        "Cook grains and dals together.",
        "Blend until smooth.",
        "Garnish generously."
      ]
    },
    { 
      id: 10, 
      name: "Special Haleem",
      tagline: "Restaurant style haleem",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g mixed meat",
        "1 cup wheat",
        "1/2 cup chana dal",
        "1/2 cup moong dal",
        "1/2 cup masoor dal",
        "3 onions",
        "3 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp garam masala",
        "1 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Combine all cooking methods.",
        "Blend to perfection.",
        "Garnish with fried onions and nuts."
      ]
    },

    // ==================== PAYE (SIRI PAYE) (4) ====================
    { 
      id: 11, 
      name: "Mutton Paye",
      tagline: "Trotters curry",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "4 mutton trotters (paye), cleaned",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "2 tsp red chili powder",
        "1 tsp turmeric",
        "1 tsp salt",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "6 cups water",
        "1/4 cup flour (for thickening)",
        "For garnish: ginger, green chilies, coriander, lemon"
      ],
      steps: [
        "Clean trotters thoroughly, remove hair if any.",
        "Heat oil in large pot, fry onions until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add trotters and fry for 10 minutes.",
        "Add all spices except garam masala. Mix well.",
        "Add 6 cups water and bring to boil.",
        "Cover and cook on low heat for 3-4 hours until meat is falling off bones.",
        "Mix flour with water to make slurry, add to curry.",
        "Simmer for 20 minutes until thickened.",
        "Add garam masala and serve hot with naan."
      ]
    },
    { 
      id: 12, 
      name: "Beef Paye",
      tagline: "Beef trotters curry",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "4 beef trotters",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp salt",
        "1 tsp cumin",
        "1/2 cup oil",
        "6 cups water",
        "1/4 cup flour"
      ],
      steps: [
        "Clean trotters well.",
        "Fry onions, add ginger-garlic.",
        "Add trotters and spices.",
        "Add water and cook for 3-4 hours.",
        "Add flour slurry and simmer.",
        "Serve hot."
      ]
    },
    { 
      id: 13, 
      name: "Kashmiri Paye",
      tagline: "Kashmiri style trotters",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "4 mutton trotters",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp fennel powder",
        "1 tsp dry ginger",
        "1 tsp salt",
        "1/2 cup oil",
        "1 cup yogurt",
        "6 cups water"
      ],
      steps: [
        "Cook trotters with spices.",
        "Add yogurt for tanginess.",
        "Cook until tender.",
        "Serve with naan."
      ]
    },
    { 
      id: 14, 
      name: "Special Paye",
      tagline: "Rich and creamy paye",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "4 trotters",
        "3 onions",
        "3 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1/2 cup oil",
        "6 cups water",
        "1/4 cup flour",
        "1/2 cup yogurt"
      ],
      steps: [
        "Follow basic paye recipe.",
        "Add yogurt for richness.",
        "Garnish well and serve."
      ]
    }
  ];
    // More recipes continue...
  const moreGravyRecipes = [
    // ==================== KHICHDA (3) ====================
    { 
      id: 15, 
      name: "Beef Khichda",
      tagline: "Rich meat and lentil porridge",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g beef",
        "1 cup rice",
        "1/2 cup chana dal",
        "1/2 cup moong dal",
        "1/2 cup masoor dal",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "2 tsp red chili powder",
        "1 tsp turmeric",
        "1 tsp cumin powder",
        "1 tsp garam masala",
        "1 cup oil",
        "Salt to taste",
        "For garnish: fried onions, ginger, green chilies, coriander, lemon"
      ],
      steps: [
        "Soak rice and dals for 30 minutes.",
        "Pressure cook beef with salt and turmeric until tender.",
        "In another pot, cook rice and dals with water until very soft.",
        "Heat oil, fry onions until golden. Remove half for garnish.",
        "Add ginger-garlic to remaining onions, cook for 2 minutes.",
        "Add red chili, cumin and salt. Cook for 1 minute.",
        "Add cooked beef with stock. Shred the meat.",
        "Add cooked rice and dals. Mix well.",
        "Cook on low heat for 20-30 minutes, stirring continuously.",
        "Mash with wooden spoon until well blended.",
        "Add garam masala and mix.",
        "Top with fried onions and serve."
      ]
    },
    { 
      id: 16, 
      name: "Mutton Khichda",
      tagline: "Khichda with mutton",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g mutton",
        "1 cup rice",
        "1/2 cup chana dal",
        "1/2 cup moong dal",
        "1/2 cup masoor dal",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook mutton with spices until tender.",
        "Cook rice and dals separately.",
        "Mix and blend well.",
        "Garnish and serve."
      ]
    },
    { 
      id: 17, 
      name: "Chicken Khichda",
      tagline: "Lighter chicken version",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup rice",
        "1/2 cup chana dal",
        "1/2 cup moong dal",
        "2 onions",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook chicken and shred.",
        "Cook rice and dals.",
        "Mix and blend.",
        "Serve hot."
      ]
    },

    // ==================== KORMA (4) ====================
    { 
      id: 18, 
      name: "Chicken Korma",
      tagline: "Rich creamy chicken curry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "1 cup yogurt",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon stick",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "1/4 cup cream",
        "2 tbsp almond paste",
        "2 tbsp fried onions for garnish"
      ],
      steps: [
        "Heat oil, add whole spices and onions. Fry until golden brown.",
        "Remove half onions for garnish.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add turmeric, red chili and salt. Mix well.",
        "Add beaten yogurt slowly, stirring continuously.",
        "Add 1/2 cup water and cook on low heat for 20 minutes.",
        "Add cream and almond paste. Simmer for 5 minutes.",
        "Add garam masala and garnish with fried onions.",
        "Serve with naan or rice."
      ]
    },
    { 
      id: 19, 
      name: "Mutton Korma",
      tagline: "Royal mutton korma",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "1 cup yogurt",
        "2 onions",
        "2 tbsp ginger-garlic",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "1/4 cup cream",
        "2 tbsp almond paste"
      ],
      steps: [
        "Fry onions until golden.",
        "Add ginger-garlic and spices.",
        "Add mutton and fry.",
        "Add yogurt and cook until tender.",
        "Add cream and almond paste.",
        "Serve hot."
      ]
    },
    { 
      id: 20, 
      name: "Shahi Korma",
      tagline: "Royal rich korma",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "1 cup yogurt",
        "2 onions",
        "2 tbsp ginger-garlic",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1 tsp turmeric",
        "1 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "1/2 cup cream",
        "2 tbsp almond paste",
        "1 tbsp kewra water",
        "Silver leaf for garnish"
      ],
      steps: [
        "Prepare korma as usual.",
        "Add extra cream and kewra water.",
        "Garnish with silver leaf.",
        "Serve royally."
      ]
    },
    { 
      id: 21, 
      name: "Nawabi Korma",
      tagline: "Nawabi style korma",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg meat",
        "1 cup yogurt",
        "2 onions",
        "2 tbsp ginger-garlic",
        "Whole spices",
        "1 tsp turmeric",
        "1 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "1/2 cup cream",
        "2 tbsp almond paste",
        "2 tbsp cashew paste"
      ],
      steps: [
        "Cook meat with spices.",
        "Add nut pastes and cream.",
        "Garnish and serve."
      ]
    },

    // ==================== KARAHI GRAVY (3) ====================
    { 
      id: 22, 
      name: "Chicken Karahi",
      tagline: "Traditional karahi with thick gravy",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "4 tomatoes, chopped",
        "2 tbsp ginger, julienned",
        "2 tbsp garlic, chopped",
        "4 green chilies",
        "1 tsp cumin seeds",
        "1 tsp red chili flakes",
        "1 tsp black pepper",
        "1 tsp salt",
        "1/2 cup oil",
        "1 cup water",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil in karahi, add chicken and fry for 5 minutes.",
        "Add ginger, garlic and green chilies. Cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add cumin, red chili flakes, black pepper and salt.",
        "Add 1 cup water and cook on high heat until oil separates.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 23, 
      name: "Mutton Karahi",
      tagline: "Mutton karahi with thick gravy",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "4 tomatoes",
        "2 tbsp ginger",
        "2 tbsp garlic",
        "4 green chilies",
        "1 tsp cumin",
        "1 tsp red chili",
        "1 tsp pepper",
        "1 tsp salt",
        "1/2 cup oil",
        "1 cup water"
      ],
      steps: [
        "Fry mutton until browned.",
        "Add ginger-garlic and spices.",
        "Add tomatoes and water.",
        "Cook until mutton is tender.",
        "Serve with naan."
      ]
    },
    { 
      id: 24, 
      name: "White Karahi",
      tagline: "Creamy white gravy karahi",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "1 cup yogurt",
        "2 tbsp ginger",
        "2 tbsp garlic",
        "4 green chilies",
        "1 tsp white pepper",
        "1 tsp black pepper",
        "1 tsp salt",
        "1/2 cup oil",
        "1/2 cup cream"
      ],
      steps: [
        "Fry chicken with ginger-garlic.",
        "Add yogurt and cook until oil separates.",
        "Add cream and peppers.",
        "Simmer and serve."
      ]
    },

    // ==================== HANDI (3) ====================
    { 
      id: 25, 
      name: "Chicken Handi",
      tagline: "Slow-cooked creamy chicken",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "1 cup yogurt",
        "2 onions, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "1/4 cup cream",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add turmeric, red chili and salt.",
        "Add beaten yogurt and mix well.",
        "Add 1/2 cup water and cook on low heat for 25 minutes.",
        "Add cream and garam masala.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 26, 
      name: "Mutton Handi",
      tagline: "Creamy mutton handi",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "1 cup yogurt",
        "2 onions",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "1/4 cup cream"
      ],
      steps: [
        "Fry onions and ginger-garlic.",
        "Add mutton and spices. Fry.",
        "Add yogurt and cook until tender.",
        "Add cream and serve."
      ]
    },
    { 
      id: 27, 
      name: "Vegetable Handi",
      tagline: "Mixed veg in creamy gravy",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554",
      ingredients: [
        "2 cups mixed vegetables",
        "1 cup yogurt",
        "2 onions",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste",
        "1/4 cup cream"
      ],
      steps: [
        "Sauté onions and ginger-garlic.",
        "Add vegetables and spices.",
        "Add yogurt and cook.",
        "Add cream and serve."
      ]
    },

    // ==================== DAL GRAVY (3) ====================
    { 
      id: 28, 
      name: "Dal Makhani",
      tagline: "Creamy black lentils",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup whole urad dal",
        "1/4 cup rajma",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp red chili",
        "1/2 tsp turmeric",
        "1/2 cup cream",
        "3 tbsp butter",
        "Salt to taste"
      ],
      steps: [
        "Soak dal and rajma overnight.",
        "Pressure cook until very soft.",
        "Mash some dal with spoon.",
        "Heat butter, add cumin and onions.",
        "Add ginger-garlic and tomato puree.",
        "Add spices and dal.",
        "Simmer on low heat for 30 minutes.",
        "Add cream and serve."
      ]
    },
    { 
      id: 29, 
      name: "Dal Bukhara",
      tagline: "Creamy black dal from Peshawar",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup urad dal",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp red chili",
        "1/2 cup cream",
        "3 tbsp butter",
        "Salt to taste"
      ],
      steps: [
        "Cook dal until very soft.",
        "Mash well.",
        "Add butter and cream.",
        "Simmer for 1 hour.",
        "Serve with butter naan."
      ]
    },
    { 
      id: 30, 
      name: "Dal Fry",
      tagline: "Tempered lentils",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup toor dal",
        "1 onion",
        "1 tomato",
        "1 tsp cumin",
        "1 tsp mustard",
        "2 red chilies",
        "2 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Cook dal until soft.",
        "Temper with ghee, cumin, mustard, chilies.",
        "Add to dal and simmer.",
        "Serve hot."
      ]
    }
  ];
    // Final recipes...
  const finalGravyRecipes = [
    // ==================== ACHAAR GOSHT (2) ====================
    { 
      id: 31, 
      name: "Achaar Gosht",
      tagline: "Pickle flavored meat curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton or beef",
        "2 tbsp ginger-garlic",
        "2 tbsp pickle masala",
        "1 tsp fennel seeds",
        "1 tsp mustard seeds",
        "1 tsp fenugreek seeds",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1/2 cup oil",
        "1 cup yogurt",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add seeds and ginger-garlic.",
        "Add meat and fry until browned.",
        "Add pickle masala and spices.",
        "Add yogurt and water.",
        "Cook until meat is tender.",
        "Serve with naan."
      ]
    },
    { 
      id: 32, 
      name: "Chicken Achaar",
      tagline: "Chicken pickle curry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "2 tbsp ginger-garlic",
        "2 tbsp pickle masala",
        "1 tsp fennel",
        "1 tsp mustard",
        "2 tsp red chili",
        "1/2 cup oil",
        "1/2 cup yogurt",
        "Salt to taste"
      ],
      steps: [
        "Marinate chicken with pickle masala.",
        "Cook with spices.",
        "Serve hot."
      ]
    },

    // ==================== ROGAN JOSH (2) ====================
    { 
      id: 33, 
      name: "Kashmiri Rogan Josh",
      tagline: "Red Kashmiri curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp fennel",
        "2 tsp red chili",
        "1 tsp dry ginger",
        "1 cup yogurt",
        "1/2 cup oil",
        "1 tsp garam masala",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add spices.",
        "Add mutton and fry.",
        "Add yogurt and water.",
        "Cook until tender.",
        "Garnish and serve."
      ]
    },
    { 
      id: 34, 
      name: "Rogan Josh Gravy",
      tagline: "Thick rogan josh",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp fennel",
        "2 tsp red chili",
        "1 cup yogurt",
        "1/2 cup oil",
        "1 tsp garam masala"
      ],
      steps: [
        "Fry onions and spices.",
        "Add mutton and cook.",
        "Add yogurt and simmer.",
        "Serve."
      ]
    },

    // ==================== LAHORI CHICKEN (2) ====================
    { 
      id: 35, 
      name: "Lahori Chicken",
      tagline: "Spicy Lahori style curry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 tsp coriander",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Fry onions until golden.",
        "Add ginger-garlic and chicken.",
        "Add tomatoes and spices.",
        "Cook until chicken is tender.",
        "Serve with naan."
      ]
    },
    { 
      id: 36, 
      name: "Lahori Karahi",
      tagline: "Lahori style karahi",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "4 tomatoes",
        "2 tbsp ginger-garlic",
        "4 green chilies",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp salt",
        "1/2 cup oil",
        "Fresh coriander"
      ],
      steps: [
        "Cook chicken with spices.",
        "Add tomatoes and cook until thick.",
        "Garnish and serve."
      ]
    },

    // ==================== PESHAWARI CHICKEN (2) ====================
    { 
      id: 37, 
      name: "Peshawari Chicken",
      tagline: "Peshawar style chicken curry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp black pepper",
        "1 tsp cumin",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Fry onions until brown.",
        "Add ginger-garlic and chicken.",
        "Add tomatoes and spices.",
        "Cook until done.",
        "Serve with naan."
      ]
    },
    { 
      id: 38, 
      name: "Peshawari Karahi",
      tagline: "Peshawari style karahi",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "4 tomatoes",
        "2 tbsp ginger",
        "2 tbsp garlic",
        "4 green chilies",
        "1 tsp cumin",
        "1 tsp red chili flakes",
        "1 tsp pepper",
        "1/2 cup oil"
      ],
      steps: [
        "Cook chicken in karahi.",
        "Add tomatoes and spices.",
        "Cook until oil separates.",
        "Serve hot."
      ]
    },

    // ==================== BHUNA GOSHT (2) ====================
    { 
      id: 39, 
      name: "Bhuna Gosht",
      tagline: "Dry meat curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp coriander",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions.",
        "Add ginger-garlic and mutton.",
        "Fry until browned.",
        "Add tomatoes and spices.",
        "Cook on low heat until dry and tender.",
        "Serve with naan."
      ]
    },
    { 
      id: 40, 
      name: "Chicken Bhuna",
      tagline: "Dry chicken curry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "1 kg chicken",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp coriander",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Fry chicken with spices until dry.",
        "Serve hot."
      ]
    },

    // ==================== KOFTA (3) ====================
    { 
      id: 41, 
      name: "Meatball Curry",
      tagline: "Kofta in thick gravy",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "1 onion",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp red chili",
        "1 egg",
        "2 tbsp breadcrumbs",
        "For gravy: 2 onions, 2 tomatoes",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Make kofta with mince and spices.",
        "Fry kofta lightly.",
        "Prepare gravy with onions and tomatoes.",
        "Add kofta and simmer.",
        "Serve with naan."
      ]
    },
    { 
      id: 42, 
      name: "Nargisi Kofta",
      tagline: "Kofta stuffed with egg",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "4 boiled eggs",
        "1 onion",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1 raw egg",
        "For gravy: 2 onions, 2 tomatoes",
        "1/2 cup oil"
      ],
      steps: [
        "Wrap mince around boiled eggs.",
        "Fry until golden.",
        "Prepare gravy and add kofta.",
        "Simmer and serve."
      ]
    },
    { 
      id: 43, 
      name: "Malai Kofta",
      tagline: "Creamy kofta curry",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "1 onion",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1/4 cup cream",
        "1 egg",
        "For gravy: 2 onions, 2 tomatoes",
        "1/4 cup cream",
        "1/2 cup oil"
      ],
      steps: [
        "Make kofta and fry.",
        "Prepare creamy gravy.",
        "Add kofta and serve."
      ]
    },

    // ==================== SPECIAL (2) ====================
    { 
      id: 44, 
      name: "Nalli Nihari",
      tagline: "Bone marrow nihari",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "1 kg nalli (shanks)",
        "2 tbsp ginger-garlic",
        "2 tbsp nihari masala",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "1/4 cup flour",
        "Salt to taste"
      ],
      steps: [
        "Cook nalli with spices until tender.",
        "Add flour slurry to thicken.",
        "Serve with naan."
      ]
    },
    { 
      id: 45, 
      name: "Bheja Masala",
      tagline: "Brain curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g lamb brain",
        "1 onion",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Clean and boil brain until firm.",
        "Slice brain pieces.",
        "Prepare masala with onions and tomatoes.",
        "Add brain and cook gently.",
        "Garnish and serve."
      ]
    }
  ];

  // Combine all arrays
  const allGravyRecipes = [...gravyRecipes, ...moreGravyRecipes, ...finalGravyRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allGravyRecipes;

  // Handle card click
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailPanel(true);
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowDetailPanel(false);
    setSelectedRecipe(null);
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  // Voice synthesis functions
  const speakStep = (stepText) => {
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(stepText);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      // Move to next step automatically if playing
      if (isPlaying && currentStep < selectedRecipe.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else if (isPlaying && currentStep === selectedRecipe.steps.length - 1) {
        setIsPlaying(false);
        setCurrentStep(0);
      }
    };

    utterance.onerror = () => {
      console.error('Speech synthesis error');
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    speechSynthesisRef.current = utterance;
  };

  const handlePlayPause = () => {
    if (!selectedRecipe) return;

    if (isPlaying) {
      // Pause
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Start playing from current step
      setIsPlaying(true);
      speakStep(selectedRecipe.steps[currentStep]);
    }
  };

  const handleNextStep = () => {
    if (!selectedRecipe) return;
    
    if (currentStep < selectedRecipe.steps.length - 1) {
      // Cancel current speech
      window.speechSynthesis.cancel();
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
      
      // If was playing, start speaking new step
      if (isPlaying) {
        speakStep(selectedRecipe.steps[currentStep + 1]);
      }
    }
  };

  const handlePrevStep = () => {
    if (!selectedRecipe) return;
    
    if (currentStep > 0) {
      // Cancel current speech
      window.speechSynthesis.cancel();
      
      // Move to previous step
      setCurrentStep(prev => prev - 1);
      
      // If was playing, start speaking new step
      if (isPlaying) {
        speakStep(selectedRecipe.steps[currentStep - 1]);
      }
    }
  };

  const handleRestart = () => {
    if (!selectedRecipe) return;
    
    // Cancel current speech
    window.speechSynthesis.cancel();
    
    // Reset to first step
    setCurrentStep(0);
    
    // If was playing, start from beginning
    if (isPlaying) {
      speakStep(selectedRecipe.steps[0]);
    }
  };

  // Update progress when current step changes
  useEffect(() => {
    if (selectedRecipe) {
      setProgress(((currentStep + 1) / selectedRecipe.steps.length) * 100);
    }
  }, [currentStep, selectedRecipe]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ==================== RENDER UI ====================

  return (
    <div className="heavy-gravy-page">
      {/* Header */}
      <header className="heavy-gravy-header">
        <div className="heavy-gravy-header-content">
          <h1 className="heavy-gravy-title">🍲 Heavy Gravy Dishes</h1>
          <p className="heavy-gravy-description">
            Discover 45+ rich and flavorful heavy gravy recipes - Nihari, Haleem, Paye, Korma, Handi aur bhi bahut kuch
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="heavy-gravy-main">
        <div className="heavy-gravy-grid-section">
          <div className="heavy-gravy-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="heavy-gravy-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="heavy-gravy-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="heavy-gravy-card-content">
                  <h3 className="heavy-gravy-card-title">{recipe.name}</h3>
                  <p className="heavy-gravy-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back to Lunch Categories
        </button>
      </div>

      {/* Modal for Recipe Details */}
      {showDetailPanel && selectedRecipe && (
        <div className="heavy-gravy-modal-overlay" onClick={handleCloseModal}>
          <div
            className="heavy-gravy-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="heavy-gravy-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="heavy-gravy-modal-header">
              <div className="heavy-gravy-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="heavy-gravy-modal-content">
              {/* Column 1: Ingredients */}
              <div className="heavy-gravy-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="heavy-gravy-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="heavy-gravy-ingredient-item">
                      <span className="heavy-gravy-ingredient-bullet">•</span>
                      <span className="heavy-gravy-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="heavy-gravy-modal-steps">
                <h3>Steps to Make</h3>
                <div className="heavy-gravy-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="heavy-gravy-step-item">
                      <span className="heavy-gravy-step-number">{index + 1}.</span>
                      <span className="heavy-gravy-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="heavy-gravy-modal-voice-container">
                <div className="voice-panel">
                  <h3>
                    <i>🔊</i> Voice Instructions
                  </h3>
                  
                  {/* Progress Bar */}
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep + 1} of {selectedRecipe.steps.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  {/* Current Step Display */}
                  <div className="current-step-display">
                    <p>
                      <strong>Step {currentStep + 1}:</strong> {selectedRecipe.steps[currentStep]}
                    </p>
                  </div>

                  {/* Voice Controls */}
                  <button
                    className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <>⏸️ Pause Reading</>
                    ) : (
                      <>▶️ Play Reading</>
                    )}
                  </button>

                  <div className="step-controls">
                    <button
                      className="step-btn"
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                    >
                      ⏮️ Previous
                    </button>
                    <button
                      className="step-btn"
                      onClick={handleRestart}
                      title="Restart from beginning"
                    >
                      🔄 Restart
                    </button>
                    <button
                      className="step-btn"
                      onClick={handleNextStep}
                      disabled={currentStep === selectedRecipe.steps.length - 1}
                    >
                      Next ⏭️
                    </button>
                  </div>

                  {/* Keyboard Instructions */}
                  <div className="voice-hint">
                    <small>Use ⏮️ ⏭️ buttons or restart to navigate</small>
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

export default RecipesHeavyGravy;