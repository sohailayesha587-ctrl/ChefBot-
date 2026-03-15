import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesQeema.css';

const RecipesQeema = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Qeema Recipes (35+ recipes)
  const qeemaRecipes = [
    // ==================== BASIC QEEMA (5) ====================
    { 
      id: 1, 
      name: "Simple Qeema",
      tagline: "Basic minced meat curry",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mutton or chicken mince",
        "2 onions, finely chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander for garnish",
        "2 green chilies, slit"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mince and fry on high heat for 8-10 minutes until color changes and it's browned.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add 1/2 cup water and cook on medium heat for 15-20 minutes.",
        "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 2, 
      name: "Qeema Masala",
      tagline: "Spicy minced meat masala",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mince and fry until browned.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili and salt.",
        "Cook for 15 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 3, 
      name: "Qeema Karahi",
      tagline: "Karahi style minced meat",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "3 tomatoes, chopped",
        "2 tbsp ginger, julienned",
        "2 tbsp garlic, chopped",
        "4 green chilies",
        "1 tsp cumin seeds",
        "1 tsp red chili flakes",
        "1 tsp black pepper",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil in karahi, add mince and fry until browned.",
        "Add ginger, garlic and green chilies. Cook for 2 minutes.",
        "Add tomatoes and cook until soft and oil separates.",
        "Add cumin, red chili flakes, black pepper and salt.",
        "Cook on high heat until oil comes on top.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 4, 
      name: "Qeema Bhuna",
      tagline: "Dry bhuna mince",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté until brown.",
        "Add ginger-garlic and cook.",
        "Add mince and fry until browned and dry.",
        "Add tomatoes and cook until dry.",
        "Add spices and cook on low heat until oil separates.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 5, 
      name: "Qeema Handi",
      tagline: "Creamy handi qeema",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "1/2 cup yogurt",
        "2 onions, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/4 cup cream",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add turmeric, red chili and salt.",
        "Add yogurt and cook for 15 minutes.",
        "Add cream and simmer.",
        "Serve hot."
      ]
    },

    // ==================== QEEMA + MATAR (4) ====================
    { 
      id: 6, 
      name: "Qeema Matar",
      tagline: "Mince with peas",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "1 cup green peas",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mince and fry until browned.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili and salt.",
        "Add 1/2 cup water and cook for 10 minutes.",
        "Add peas and cook for 5-7 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 7, 
      name: "Qeema Matar Pulao",
      tagline: "Rice with mince and peas",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "300g mince",
        "1 cup peas",
        "2 cups basmati rice",
        "2 onions, sliced",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak rice for 30 minutes.",
        "Heat oil, add whole spices and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mince and fry until browned.",
        "Add peas and salt. Cook for 5 minutes.",
        "Add 3 cups water and bring to boil.",
        "Add rice and cook until water is absorbed.",
        "Cover and cook on low heat for 15 minutes.",
        "Serve with raita."
      ]
    },
    { 
      id: 8, 
      name: "Qeema Matar Curry",
      tagline: "Mince and peas curry",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "1 cup peas",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomato puree and cook.",
        "Add spices and 1 cup water.",
        "Cook for 15 minutes.",
        "Add peas and cook for 5 minutes.",
        "Serve."
      ]
    },
    { 
      id: 9, 
      name: "Qeema Matar Masala",
      tagline: "Spicy mince with peas",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "1 cup peas",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add red chili and salt.",
        "Add 1/2 cup water and cook.",
        "Add peas and garam masala.",
        "Serve."
      ]
    },

    // ==================== QEEMA + ALOO (4) ====================
    { 
      id: 10, 
      name: "Qeema Aloo",
      tagline: "Mince with potatoes",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "2 potatoes, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mince and fry until browned.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili and salt.",
        "Add potatoes and 1 cup water.",
        "Cook for 20 minutes until potatoes are tender.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 11, 
      name: "Qeema Aloo Matar",
      tagline: "Mince with potato and peas",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "2 potatoes, cubed",
        "1/2 cup peas",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add spices and potatoes.",
        "Add 1 cup water and cook for 15 minutes.",
        "Add peas and cook for 5 minutes.",
        "Serve."
      ]
    },
    { 
      id: 12, 
      name: "Qeema Aloo Bhaji",
      tagline: "Dry mince with potatoes",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "3 potatoes, sliced",
        "2 onions, sliced",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry until dry.",
        "Add potatoes and spices.",
        "Cook on low heat until potatoes are tender.",
        "Serve with roti."
      ]
    },
    { 
      id: 13, 
      name: "Qeema Aloo Karahi",
      tagline: "Karahi style mince with potatoes",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "2 potatoes, cubed",
        "3 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "4 green chilies",
        "1 tsp cumin",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add mince and fry.",
        "Add ginger-garlic and chilies.",
        "Add tomatoes and cook.",
        "Add potatoes and spices.",
        "Add 1/2 cup water and cook until potatoes are done.",
        "Serve hot."
      ]
    }
  ];
    // More recipes continue...
  const moreQeemaRecipes = [
    // ==================== QEEMA + PALAK (3) ====================
    { 
      id: 14, 
      name: "Qeema Palak",
      tagline: "Mince with spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mince",
        "2 cups spinach, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mince and fry until browned.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili and salt.",
        "Cook for 10 minutes and serve."
      ]
    },
    { 
      id: 15, 
      name: "Qeema Palak Matar",
      tagline: "Mince with spinach and peas",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mince",
        "1 cup spinach",
        "1/2 cup peas",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add spinach and peas.",
        "Add spices and cook.",
        "Serve hot."
      ]
    },
    { 
      id: 16, 
      name: "Qeema Palak Curry",
      tagline: "Spinach mince curry",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mince",
        "2 cups spinach",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomato puree and cook.",
        "Add spinach and spices.",
        "Add 1/2 cup water and simmer.",
        "Serve."
      ]
    },

    // ==================== QEEMA + SHIMLA MIRCH (3) ====================
    { 
      id: 17, 
      name: "Qeema Shimla Mirch",
      tagline: "Mince with capsicum",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "2 capsicum, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add capsicum and spices.",
        "Cook for 10 minutes.",
        "Serve."
      ]
    },
    { 
      id: 18, 
      name: "Qeema Shimla Mirch Aloo",
      tagline: "Mince with capsicum and potato",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "1 capsicum, chopped",
        "2 potatoes, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add potatoes and 1 cup water.",
        "Cook for 15 minutes.",
        "Add capsicum and cook for 5 minutes.",
        "Serve."
      ]
    },
    { 
      id: 19, 
      name: "Qeema Shimla Mirch Matar",
      tagline: "Mince with capsicum and peas",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "1 capsicum, chopped",
        "1/2 cup peas",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add peas and cook for 5 minutes.",
        "Add capsicum and spices.",
        "Cook for 5 minutes.",
        "Serve."
      ]
    },

    // ==================== QEEMA + BAINGAN (2) ====================
    { 
      id: 20, 
      name: "Qeema Baingan",
      tagline: "Mince with eggplant",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mince",
        "2 eggplants, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add eggplants and spices.",
        "Add 1/2 cup water and cook until eggplants are tender.",
        "Serve."
      ]
    },
    { 
      id: 21, 
      name: "Qeema Baingan Bharta",
      tagline: "Mince with mashed eggplant",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mince",
        "2 eggplants, roasted and mashed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 green chilies",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Roast eggplants, peel and mash.",
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add mashed eggplant and spices.",
        "Cook for 10 minutes.",
        "Serve."
      ]
    },

    // ==================== QEEMA + KARELA (2) ====================
    { 
      id: 22, 
      name: "Qeema Karela",
      tagline: "Mince with bitter gourd",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mince",
        "3 karela, sliced",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp amchur",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Rub karela with salt, rinse and squeeze.",
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add karela and spices.",
        "Cook until karela is tender.",
        "Add amchur and serve."
      ]
    },
    { 
      id: 23, 
      name: "Qeema Karela Aloo",
      tagline: "Mince with bitter gourd and potato",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mince",
        "2 karela, sliced",
        "2 potatoes, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Rub karela with salt, rinse.",
        "Heat oil, add cumin and onions.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add potatoes and 1 cup water.",
        "Cook for 15 minutes.",
        "Add karela and cook until tender.",
        "Serve."
      ]
    },

    // ==================== QEEMA + GOBHI (2) ====================
    { 
      id: 24, 
      name: "Qeema Gobhi",
      tagline: "Mince with cauliflower",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "500g mince",
        "1 cauliflower, florets",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add cauliflower and spices.",
        "Add 1/2 cup water and cook until cauliflower is tender.",
        "Serve."
      ]
    },
    { 
      id: 25, 
      name: "Qeema Gobhi Aloo",
      tagline: "Mince with cauliflower and potato",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "500g mince",
        "1/2 cauliflower",
        "2 potatoes, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add potatoes and 1 cup water.",
        "Cook for 10 minutes.",
        "Add cauliflower and cook until tender.",
        "Serve."
      ]
    }
  ];
    // Final recipes...
  const finalQeemaRecipes = [
    // ==================== QEEMA + METHI (2) ====================
    { 
      id: 26, 
      name: "Qeema Methi",
      tagline: "Mince with fenugreek leaves",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mince",
        "1 bunch methi, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add methi and cook until wilted.",
        "Add spices and cook for 10 minutes.",
        "Serve."
      ]
    },
    { 
      id: 27, 
      name: "Qeema Methi Aloo",
      tagline: "Mince with fenugreek and potato",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mince",
        "1 bunch methi",
        "2 potatoes, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add potatoes and 1 cup water.",
        "Cook for 15 minutes.",
        "Add methi and spices.",
        "Cook for 5 minutes and serve."
      ]
    },

    // ==================== QEEMA + BEANS (2) ====================
    { 
      id: 28, 
      name: "Qeema Beans",
      tagline: "Mince with green beans",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "200g beans, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add beans and spices.",
        "Add 1/2 cup water and cook until beans are tender.",
        "Serve."
      ]
    },
    { 
      id: 29, 
      name: "Qeema Beans Aloo",
      tagline: "Mince with beans and potato",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "200g beans",
        "2 potatoes, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add potatoes and 1 cup water.",
        "Cook for 15 minutes.",
        "Add beans and cook until tender.",
        "Serve."
      ]
    },

    // ==================== QEEMA + TINDA/KADDU (2) ====================
    { 
      id: 30, 
      name: "Qeema Tinday",
      tagline: "Mince with apple gourd",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "500g tinday, peeled and cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add tinday and spices.",
        "Add 1/2 cup water and cook until tinday is tender.",
        "Serve."
      ]
    },
    { 
      id: 31, 
      name: "Qeema Kaddu",
      tagline: "Mince with pumpkin",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "500g kaddu, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tbsp jaggery",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add mince and fry.",
        "Add tomatoes and cook.",
        "Add kaddu and spices.",
        "Add jaggery and 1/2 cup water.",
        "Cook until kaddu is tender.",
        "Serve."
      ]
    },

    // ==================== QEEMA SPECIALITIES (4) ====================
    { 
      id: 32, 
      name: "Qeema Naan",
      tagline: "Mince stuffed naan",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "250g mince, cooked",
        "2 cups flour",
        "1 tsp yeast",
        "1 tsp sugar",
        "1/2 cup yogurt",
        "1 tbsp oil",
        "Salt to taste",
        "Butter for brushing"
      ],
      steps: [
        "Mix flour, yeast, sugar, salt, yogurt and water to make dough.",
        "Let it rise for 2 hours.",
        "Divide dough into balls.",
        "Stuff each ball with cooked mince.",
        "Roll out and cook on tawa.",
        "Brush with butter and serve."
      ]
    },
    { 
      id: 33, 
      name: "Qeema Paratha",
      tagline: "Mince stuffed paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "250g mince, cooked",
        "2 cups whole wheat flour",
        "1 tsp salt",
        "Water for kneading",
        "Oil for cooking"
      ],
      steps: [
        "Knead dough with flour, salt and water. Rest for 30 minutes.",
        "Roll out dough, place mince in center.",
        "Fold and roll again.",
        "Cook on tawa with oil until golden.",
        "Serve with yogurt."
      ]
    },
    { 
      id: 34, 
      name: "Qeema Samosa",
      tagline: "Mince stuffed samosas",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "250g mince, cooked",
        "2 cups flour",
        "1/4 cup oil",
        "1 tsp salt",
        "Water for dough",
        "Oil for frying"
      ],
      steps: [
        "Mix flour, oil and salt. Add water to make dough.",
        "Roll small circles, cut in half.",
        "Form cones, fill with mince.",
        "Seal edges and deep fry until golden.",
        "Serve with chutney."
      ]
    },
    { 
      id: 35, 
      name: "Qeema Biryani",
      tagline: "Biryani with minced meat",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g mince",
        "2 cups basmati rice",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1 tsp biryani masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook mince with spices until done.",
        "Parboil rice with whole spices.",
        "Layer rice and mince in pot.",
        "Add biryani masala and coriander.",
        "Dum for 20 minutes.",
        "Serve with raita."
      ]
    },
    { 
      id: 36, 
      name: "Qeema Cutlet",
      tagline: "Crispy mince cutlets",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mince",
        "2 potatoes, boiled and mashed",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tsp ginger paste",
        "1 tsp red chili",
        "1/2 tsp pepper",
        "Salt to taste",
        "Breadcrumbs",
        "Egg for coating",
        "Oil for frying"
      ],
      steps: [
        "Mix mince, potatoes, onion, chilies, ginger and spices.",
        "Shape into cutlets.",
        "Dip in egg, coat with breadcrumbs.",
        "Shallow fry until golden.",
        "Serve with ketchup."
      ]
    }
  ];

  // Combine all arrays
  const allQeemaRecipes = [...qeemaRecipes, ...moreQeemaRecipes, ...finalQeemaRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allQeemaRecipes;

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
    <div className="qeema-page">
      {/* Header */}
      <header className="qeema-header">
        <div className="qeema-header-content">
          <h1 className="qeema-title">🥘 Qeema Dishes</h1>
          <p className="qeema-description">
            Discover 35+ delicious minced meat recipes - qeema matar, qeema aloo, qeema paratha aur bhi bahut kuch
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="qeema-main">
        <div className="qeema-grid-section">
          <div className="qeema-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="qeema-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="qeema-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="qeema-card-content">
                  <h3 className="qeema-card-title">{recipe.name}</h3>
                  <p className="qeema-card-description">{recipe.tagline}</p>
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
        <div className="qeema-modal-overlay" onClick={handleCloseModal}>
          <div
            className="qeema-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="qeema-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="qeema-modal-header">
              <div className="qeema-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="qeema-modal-content">
              {/* Column 1: Ingredients */}
              <div className="qeema-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="qeema-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="qeema-ingredient-item">
                      <span className="qeema-ingredient-bullet">•</span>
                      <span className="qeema-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="qeema-modal-steps">
                <h3>Steps to Make</h3>
                <div className="qeema-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="qeema-step-item">
                      <span className="qeema-step-number">{index + 1}.</span>
                      <span className="qeema-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="qeema-modal-voice-container">
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

export default RecipesQeema;