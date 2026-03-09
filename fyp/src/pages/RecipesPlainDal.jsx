import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesPlainDal.css';

const RecipesPlainDal = () => {
  const navigate = useNavigate();
  const [selectedDal, setSelectedDal] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Plain Dal Recipes (30+ recipes)
  const dalRecipes = [
    // ==================== CHANA DAL BASED (5) ====================
    { 
      id: 1, 
      name: "Chana Dal",
      tagline: "Simple split Bengal gram lentils",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup chana dal (split Bengal gram)",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "2 tbsp oil or ghee",
        "Salt to taste",
        "Fresh coriander for garnish",
        "2 green chilies, slit"
      ],
      steps: [
        "Wash chana dal thoroughly and soak for 30 minutes.",
        "Pressure cook dal with 2 cups water, turmeric and salt for 3-4 whistles until soft.",
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add red chili powder, coriander powder and salt. Mix well.",
        "Add cooked dal and simmer for 10-15 minutes.",
        "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
        "Serve hot with rice or roti."
      ]
    },
    { 
      id: 2, 
      name: "Chana Dal Fry",
      tagline: "Tempered chana dal with onions and tomatoes",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup chana dal",
        "1 onion, finely chopped",
        "2 tomatoes, finely chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "2 tbsp ghee",
        "Salt to taste",
        "Fresh coriander",
        "1 lemon, juiced"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Pressure cook dal with turmeric and salt until soft but not mushy.",
        "Heat ghee in a pan, add mustard and cumin seeds.",
        "Add onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili, coriander powder and salt. Mix well.",
        "Add cooked dal and simmer for 10 minutes.",
        "Add garam masala, lemon juice and coriander.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 3, 
      name: "Chana Dal Palak",
      tagline: "Chana dal with spinach",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup chana dal",
        "2 cups spinach, chopped",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Pressure cook dal with turmeric and salt until soft.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add red chili, coriander powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 4, 
      name: "Chana Dal Louki",
      tagline: "Chana dal with bottle gourd",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup chana dal",
        "2 cups louki (bottle gourd), peeled and cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Pressure cook dal with turmeric and salt until soft.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add red chili, coriander powder and salt.",
        "Add cooked dal and simmer until louki is tender.",
        "Serve hot with rice."
      ]
    },
    { 
      id: 5, 
      name: "Chana Dal with Spinach",
      tagline: "Healthy chana dal and spinach combination",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup chana dal",
        "2 cups spinach, chopped",
        "1 onion, chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Pressure cook dal with turmeric and salt until soft.",
        "Heat ghee, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add spinach and cook until wilted.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },

    // ==================== MOONG DAL BASED (6) ====================
    { 
      id: 6, 
      name: "Moong Dal",
      tagline: "Simple split yellow moong dal",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup moong dal (split yellow lentils)",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil or ghee",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash moong dal thoroughly. No need to soak.",
        "Pressure cook dal with 2 cups water, turmeric and salt for 2-3 whistles.",
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chopped tomatoes and cook until soft.",
        "Add red chili powder, coriander powder and salt. Mix well.",
        "Add cooked dal and simmer for 5-7 minutes.",
        "Garnish with fresh coriander and serve hot."
      ]
    },
    { 
      id: 7, 
      name: "Moong Dal Fry",
      tagline: "Tempered moong dal with onions",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup moong dal",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp ghee",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash moong dal and pressure cook with turmeric and salt.",
        "Heat ghee, add mustard and cumin seeds.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 8, 
      name: "Moong Dal Palak",
      tagline: "Moong dal with spinach",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup moong dal",
        "2 cups spinach, chopped",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash moong dal and pressure cook with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 9, 
      name: "Moong Dal Louki",
      tagline: "Moong dal with bottle gourd",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup moong dal",
        "2 cups louki, peeled and cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash moong dal and pressure cook with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add red chili, coriander powder and salt.",
        "Add cooked dal and simmer until louki is tender.",
        "Serve hot."
      ]
    },
    { 
      id: 10, 
      name: "Moong Dal with Spinach",
      tagline: "Healthy moong dal and spinach",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup moong dal",
        "2 cups spinach, chopped",
        "1 onion, chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Wash moong dal and pressure cook with turmeric and salt.",
        "Heat ghee, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add spinach and cook until wilted.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 11, 
      name: "Moong Dal Khichdi",
      tagline: "Comforting rice and lentil porridge",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1/2 cup moong dal",
        "1/2 cup rice",
        "1 onion, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "2 tbsp ghee",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash rice and dal together.",
        "Heat ghee in a pressure cooker, add cumin seeds.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add rice and dal, turmeric and salt.",
        "Add 3 cups water and pressure cook for 3-4 whistles.",
        "Let pressure release naturally.",
        "Garnish with coriander and serve with yogurt."
      ]
    }
  ];
    // More recipes continue...
  const moreDalRecipes = [
    // ==================== MAASH DAL BASED (4) ====================
    { 
      id: 12, 
      name: "Maash Ki Dal",
      tagline: "Black lentils with rich creamy texture",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup maash dal (black lentils)",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "2 tbsp oil or ghee",
        "Salt to taste",
        "Fresh coriander",
        "2 green chilies, slit"
      ],
      steps: [
        "Wash maash dal thoroughly and soak for 2 hours.",
        "Pressure cook dal with 2 cups water, turmeric and salt for 4-5 whistles until soft.",
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add red chili powder, coriander powder and salt. Mix well.",
        "Add cooked dal and simmer for 15-20 minutes.",
        "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
        "Serve hot with rice or roti."
      ]
    },
    { 
      id: 13, 
      name: "Maash Dal Fry",
      tagline: "Tempered black lentils",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup maash dal",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp ghee",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash and soak maash dal for 2 hours.",
        "Pressure cook dal with turmeric and salt until soft.",
        "Heat ghee, add mustard and cumin seeds.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 14, 
      name: "Maash Dal Palak",
      tagline: "Black lentils with spinach",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup maash dal",
        "2 cups spinach, chopped",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak maash dal for 2 hours.",
        "Pressure cook dal with turmeric and salt until soft.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 15, 
      name: "Maash Dal Louki",
      tagline: "Black lentils with bottle gourd",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup maash dal",
        "2 cups louki, peeled and cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak maash dal for 2 hours.",
        "Pressure cook dal with turmeric and salt until soft.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add red chili, coriander powder and salt.",
        "Add cooked dal and simmer until louki is tender.",
        "Serve hot."
      ]
    },

    // ==================== MASOOR DAL BASED (4) ====================
    { 
      id: 16, 
      name: "Masoor Dal",
      tagline: "Simple red lentils",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup masoor dal (red lentils)",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash masoor dal thoroughly. No need to soak.",
        "Pressure cook dal with 2 cups water, turmeric and salt for 2-3 whistles.",
        "Heat oil in a pan, add cumin seeds.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder, coriander powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 17, 
      name: "Masoor Dal Fry",
      tagline: "Tempered red lentils",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup masoor dal",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp ghee",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash masoor dal and pressure cook with turmeric and salt.",
        "Heat ghee, add mustard and cumin seeds.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 18, 
      name: "Masoor Dal Palak",
      tagline: "Red lentils with spinach",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup masoor dal",
        "2 cups spinach, chopped",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash masoor dal and pressure cook with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 19, 
      name: "Masoor Dal Louki",
      tagline: "Red lentils with bottle gourd",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup masoor dal",
        "2 cups louki, peeled and cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash masoor dal and pressure cook with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add red chili, coriander powder and salt.",
        "Add cooked dal and simmer until louki is tender.",
        "Serve hot."
      ]
    },

    // ==================== MIX DAL (3) ====================
    { 
      id: 20, 
      name: "Mix Dal",
      tagline: "Mili juli dal - combination of lentils",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1/3 cup chana dal",
        "1/3 cup moong dal",
        "1/3 cup masoor dal",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash all dals together and soak chana dal separately for 30 minutes.",
        "Mix all dals and pressure cook with turmeric and salt for 3-4 whistles.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili, coriander powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "Sprinkle garam masala and coriander. Serve."
      ]
    },
    { 
      id: 21, 
      name: "Panchmel Dal",
      tagline: "Five lentils Rajasthani style",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1/4 cup each: chana dal, moong dal, masoor dal, urad dal, toor dal",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic-green chili paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp ghee",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash all dals and soak for 1 hour.",
        "Pressure cook with turmeric and salt for 4-5 whistles.",
        "Heat ghee, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic-chili paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 22, 
      name: "Dal Makhani",
      tagline: "Creamy black lentils",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup whole urad dal (sabut urad)",
        "1/4 cup rajma (kidney beans)",
        "1 onion, finely chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1/4 cup cream",
        "3 tbsp butter",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak urad dal and rajma overnight.",
        "Pressure cook with turmeric and salt for 5-6 whistles until very soft.",
        "Mash some dal with the back of spoon.",
        "Heat butter, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer on low heat for 30 minutes.",
        "Add cream and garam masala. Simmer for 5 minutes.",
        "Serve hot with naan or rice."
      ]
    }
  ];
    // Add more recipes...
  const finalDalRecipes = [
    // ==================== DAL + SABZI (5) ====================
    { 
      id: 23, 
      name: "Dal Palak",
      tagline: "Lentils with spinach",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup mixed dal (moong + masoor)",
        "2 cups spinach, chopped",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash dal and pressure cook with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 24, 
      name: "Dal Louki",
      tagline: "Lentils with bottle gourd",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup moong dal",
        "2 cups louki, cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash dal and pressure cook with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add red chili, coriander powder and salt.",
        "Add cooked dal and simmer until louki is tender.",
        "Serve hot."
      ]
    },
    { 
      id: 25, 
      name: "Dal Tori",
      tagline: "Lentils with ridge gourd",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup chana dal",
        "2 cups tori, peeled and cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Pressure cook dal with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add tori and cook for 5 minutes.",
        "Add red chili, coriander powder and salt.",
        "Add cooked dal and simmer until tori is tender.",
        "Serve hot."
      ]
    },
    { 
      id: 26, 
      name: "Dal Karela",
      tagline: "Lentils with bitter gourd",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup toor dal",
        "2 karela, sliced",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp amchur powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Rub karela with salt, keep for 30 mins, rinse and squeeze.",
        "Wash dal and pressure cook with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add karela and fry for 5 minutes.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "Sprinkle amchur and serve."
      ]
    },
    { 
      id: 27, 
      name: "Dal Methi",
      tagline: "Lentils with fenugreek leaves",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup moong dal",
        "1 bunch methi, chopped",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash dal and pressure cook with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add methi and cook until wilted.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Serve hot."
      ]
    },

    // ==================== SPECIAL DAL (5) ====================
    { 
      id: 28, 
      name: "Dal Tadka",
      tagline: "Tempered lentils with ghee",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup toor dal",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp ghee",
        "1 tsp mustard seeds",
        "2 dried red chilies",
        "Few curry leaves",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash toor dal and pressure cook with turmeric and salt until soft.",
        "Heat 1 tbsp ghee, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "For tadka: Heat remaining ghee, add mustard seeds, red chilies, curry leaves.",
        "Pour tadka over dal, add garam masala and coriander.",
        "Serve hot with rice or roti."
      ]
    },
    { 
      id: 29, 
      name: "Dal Fry",
      tagline: "Restaurant style dal fry",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup mixed dal (toor + moong)",
        "1 onion, finely chopped",
        "2 tomatoes, pureed",
        "1 capsicum, finely chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp butter",
        "1 tsp kasuri methi",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash dal and pressure cook with turmeric and salt.",
        "Heat butter, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add capsicum and cook for 2 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "Add kasuri methi, garam masala and coriander.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 30, 
      name: "Dal Bukhara",
      tagline: "Creamy black dal from Peshawar",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup whole urad dal",
        "1/4 cup rajma",
        "2 onions, finely chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup cream",
        "1/4 cup butter",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak dal and rajma overnight.",
        "Pressure cook with salt for 5-6 whistles until very soft.",
        "Mash dal well with a masher.",
        "Heat butter, add cumin seeds and onions. Cook until brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add red chili powder and salt.",
        "Add dal and simmer on low heat for 1 hour.",
        "Add cream and garam masala. Simmer for 10 minutes.",
        "Serve with butter naan."
      ]
    },
    { 
      id: 31, 
      name: "Gujarati Dal",
      tagline: "Sweet and sour Gujarati style dal",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup toor dal",
        "1 tbsp ginger-green chili paste",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1/2 tsp asafoetida",
        "Few curry leaves",
        "1 tbsp jaggery",
        "1 tbsp lemon juice",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash toor dal and pressure cook with turmeric until soft.",
        "Whisk dal until smooth.",
        "Heat oil, add mustard seeds, cumin seeds, asafoetida and curry leaves.",
        "Add ginger-chili paste and cook for 1 minute.",
        "Add red chili powder and salt.",
        "Add dal and bring to boil.",
        "Add jaggery and lemon juice. Simmer for 5 minutes.",
        "Garnish with coriander and serve with rice."
      ]
    },
    { 
      id: 32, 
      name: "Rajasthani Dal",
      tagline: "Spicy Rajasthani style dal",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup chana dal",
        "2 tbsp ghee",
        "1 tsp cumin seeds",
        "1 tsp mustard seeds",
        "2 dried red chilies",
        "1 onion, chopped",
        "2 tbsp ginger-garlic paste",
        "2 tomatoes, chopped",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash and soak chana dal for 1 hour.",
        "Pressure cook dal with turmeric and salt.",
        "Heat ghee, add cumin, mustard and red chilies.",
        "Add onions and sauté until brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 10 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    }
  ];

  // Combine all arrays
  const allDalRecipes = [...dalRecipes, ...moreDalRecipes, ...finalDalRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allDalRecipes;

  // Handle card click
  const handleDalClick = (dal) => {
    setSelectedDal(dal);
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
    setSelectedDal(null);
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
      if (isPlaying && currentStep < selectedDal.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else if (isPlaying && currentStep === selectedDal.steps.length - 1) {
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
    if (!selectedDal) return;

    if (isPlaying) {
      // Pause
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Start playing from current step
      setIsPlaying(true);
      speakStep(selectedDal.steps[currentStep]);
    }
  };

  const handleNextStep = () => {
    if (!selectedDal) return;
    
    if (currentStep < selectedDal.steps.length - 1) {
      // Cancel current speech
      window.speechSynthesis.cancel();
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
      
      // If was playing, start speaking new step
      if (isPlaying) {
        speakStep(selectedDal.steps[currentStep + 1]);
      }
    }
  };

  const handlePrevStep = () => {
    if (!selectedDal) return;
    
    if (currentStep > 0) {
      // Cancel current speech
      window.speechSynthesis.cancel();
      
      // Move to previous step
      setCurrentStep(prev => prev - 1);
      
      // If was playing, start speaking new step
      if (isPlaying) {
        speakStep(selectedDal.steps[currentStep - 1]);
      }
    }
  };

  const handleRestart = () => {
    if (!selectedDal) return;
    
    // Cancel current speech
    window.speechSynthesis.cancel();
    
    // Reset to first step
    setCurrentStep(0);
    
    // If was playing, start from beginning
    if (isPlaying) {
      speakStep(selectedDal.steps[0]);
    }
  };

  // Update progress when current step changes
  useEffect(() => {
    if (selectedDal) {
      setProgress(((currentStep + 1) / selectedDal.steps.length) * 100);
    }
  }, [currentStep, selectedDal]);

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
    <div className="dal-page">
      {/* Header */}
      <header className="dal-header">
        <div className="dal-header-content">
          <h1 className="dal-title">🫘 Plain Dal</h1>
          <p className="dal-description">
            Discover 30+ traditional Pakistani dal recipes - healthy, protein-rich aur ghar jaisa taste
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="dal-main">
        <div className="dal-grid-section">
          <div className="dal-grid">
            {recipesList.map((dal) => (
              <div
                key={dal.id}
                className="dal-card"
                onClick={() => handleDalClick(dal)}
              >
                <div
                  className="dal-card-image"
                  style={{ backgroundImage: `url(${dal.image})` }}
                />
                <div className="dal-card-content">
                  <h3 className="dal-card-title">{dal.name}</h3>
                  <p className="dal-card-description">{dal.tagline}</p>
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
      {showDetailPanel && selectedDal && (
        <div className="dal-modal-overlay" onClick={handleCloseModal}>
          <div
            className="dal-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedDal.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="dal-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="dal-modal-header">
              <div className="dal-modal-title">
                <h2>{selectedDal.name}</h2>
              </div>
            </div>

            <div className="dal-modal-content">
              {/* Column 1: Ingredients */}
              <div className="dal-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="dal-ingredients-list">
                  {selectedDal.ingredients.map((ingredient, index) => (
                    <div key={index} className="dal-ingredient-item">
                      <span className="dal-ingredient-bullet">•</span>
                      <span className="dal-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="dal-modal-steps">
                <h3>Steps to Make</h3>
                <div className="dal-steps-list">
                  {selectedDal.steps.map((step, index) => (
                    <div key={index} className="dal-step-item">
                      <span className="dal-step-number">{index + 1}.</span>
                      <span className="dal-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="dal-modal-voice-container">
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
                      <span>Step {currentStep + 1} of {selectedDal.steps.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  {/* Current Step Display */}
                  <div className="current-step-display">
                    <p>
                      <strong>Step {currentStep + 1}:</strong> {selectedDal.steps[currentStep]}
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
                      disabled={currentStep === selectedDal.steps.length - 1}
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

export default RecipesPlainDal;