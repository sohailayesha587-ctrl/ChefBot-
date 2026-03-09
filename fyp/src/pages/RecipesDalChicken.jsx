import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesDalChicken.css';

const RecipesDalChicken = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Chicken + Dal Recipes (30+ recipes)
  const chickenDalRecipes = [
    // ==================== CHICKEN + CHANA DAL (5) ====================
    { 
      id: 1, 
      name: "Chicken Chana Dal",
      tagline: "Chicken with split Bengal gram",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, curry cut",
        "1 cup chana dal (split Bengal gram)",
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
        "Wash and soak chana dal for 30 minutes.",
        "Heat oil in a large pot, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken pieces and fry on high heat for 5-7 minutes until color changes.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add soaked chana dal and 3 cups water. Stir well.",
        "Cover and cook on medium heat for 30-35 minutes until chicken and dal are tender.",
        "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 2, 
      name: "Chicken Chana Dal Fry",
      tagline: "Tempered chicken with chana dal",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, pieces",
        "1 cup chana dal",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Heat oil, add mustard and cumin seeds.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5-7 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add chana dal and 2.5 cups water.",
        "Cover and cook for 30-35 minutes until chicken and dal are tender.",
        "Add garam masala and coriander. Serve hot."
      ]
    },
    { 
      id: 3, 
      name: "Chicken Chana Dal Palak",
      tagline: "Chicken with chana dal and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "1 cup chana dal",
        "2 cups spinach, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add chana dal and 2.5 cups water.",
        "Cook for 30-35 minutes until chicken and dal are tender.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 4, 
      name: "Chicken Chana Dal Louki",
      tagline: "Chicken with chana dal and bottle gourd",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup chana dal",
        "2 cups louki, peeled and cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add chana dal and 2.5 cups water.",
        "Cook for 30-35 minutes until chicken, dal and louki are tender.",
        "Serve hot."
      ]
    },
    { 
      id: 5, 
      name: "Spicy Chicken Chana Dal",
      tagline: "Extra spicy chicken with chana dal",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup chana dal",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "3 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "2 green chilies, chopped"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and green chilies. Cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add chana dal and 2.5 cups water.",
        "Cook for 30-35 minutes until chicken and dal are tender.",
        "Sprinkle garam masala and serve."
      ]
    },

    // ==================== CHICKEN + MOONG DAL (5) ====================
    { 
      id: 6, 
      name: "Chicken Moong Dal",
      tagline: "Chicken with split yellow moong dal",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, pieces",
        "1 cup moong dal (split yellow lentils)",
        "2 onions, finely chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash moong dal. No need to soak.",
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5-7 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add moong dal and 2.5 cups water.",
        "Cover and cook for 25-30 minutes until chicken and dal are tender.",
        "Garnish with coriander and serve hot."
      ]
    },
    { 
      id: 7, 
      name: "Chicken Moong Dal Fry",
      tagline: "Tempered chicken with moong dal",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup moong dal",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash moong dal.",
        "Heat oil, add mustard and cumin seeds.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add moong dal and 2.5 cups water.",
        "Cook for 25-30 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 8, 
      name: "Chicken Moong Dal Palak",
      tagline: "Chicken with moong dal and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "1 cup moong dal",
        "2 cups spinach, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash moong dal.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add moong dal and 2.5 cups water.",
        "Cook for 25-30 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 9, 
      name: "Chicken Moong Dal Louki",
      tagline: "Chicken with moong dal and bottle gourd",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup moong dal",
        "2 cups louki, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash moong dal.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add moong dal and 2.5 cups water.",
        "Cook for 25-30 minutes until everything is tender.",
        "Serve hot."
      ]
    },
    { 
      id: 10, 
      name: "Light Chicken Moong Dal",
      tagline: "Light and healthy chicken with moong dal",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, skinless",
        "1 cup moong dal",
        "1 onion, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/4 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash moong dal.",
        "Heat oil, add cumin seeds and onions. Sauté until soft.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add turmeric, red chili powder and salt.",
        "Add moong dal and 2.5 cups water.",
        "Cook for 25-30 minutes.",
        "Garnish with coriander and serve."
      ]
    }
  ];
    // More recipes continue...
  const moreChickenDalRecipes = [
    // ==================== CHICKEN + MAASH DAL (4) ====================
    { 
      id: 11, 
      name: "Chicken Maash Dal",
      tagline: "Chicken with black lentils",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, pieces",
        "1 cup maash dal (black lentils)",
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
        "Fresh coriander"
      ],
      steps: [
        "Wash and soak maash dal for 2 hours.",
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5-7 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add soaked maash dal and 3 cups water.",
        "Cover and cook for 35-40 minutes until chicken and dal are tender.",
        "Sprinkle garam masala and garnish with coriander.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 12, 
      name: "Chicken Maash Dal Fry",
      tagline: "Tempered chicken with black lentils",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup maash dal",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak maash dal for 2 hours.",
        "Heat oil, add mustard and cumin seeds.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add maash dal and 3 cups water.",
        "Cook for 35-40 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 13, 
      name: "Chicken Maash Dal Palak",
      tagline: "Chicken with black lentils and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "1 cup maash dal",
        "2 cups spinach, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak maash dal for 2 hours.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add maash dal and 3 cups water.",
        "Cook for 35-40 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 14, 
      name: "Creamy Chicken Maash Dal",
      tagline: "Rich and creamy chicken with black lentils",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup maash dal",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1/4 cup cream",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak maash dal for 2 hours.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add maash dal and 3 cups water.",
        "Cook for 35-40 minutes.",
        "Add cream and simmer for 5 minutes.",
        "Serve hot."
      ]
    },

    // ==================== CHICKEN + MASOOR DAL (4) ====================
    { 
      id: 15, 
      name: "Chicken Masoor Dal",
      tagline: "Chicken with red lentils",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, pieces",
        "1 cup masoor dal (red lentils)",
        "2 onions, finely chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash masoor dal. No need to soak.",
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5-7 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add masoor dal and 2.5 cups water.",
        "Cover and cook for 20-25 minutes until chicken and dal are tender.",
        "Garnish with coriander and serve hot."
      ]
    },
    { 
      id: 16, 
      name: "Chicken Masoor Dal Fry",
      tagline: "Tempered chicken with red lentils",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup masoor dal",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash masoor dal.",
        "Heat oil, add mustard and cumin seeds.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add masoor dal and 2.5 cups water.",
        "Cook for 20-25 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 17, 
      name: "Chicken Masoor Dal Palak",
      tagline: "Chicken with red lentils and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "1 cup masoor dal",
        "2 cups spinach, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash masoor dal.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add masoor dal and 2.5 cups water.",
        "Cook for 20-25 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 18, 
      name: "Quick Chicken Masoor Dal",
      tagline: "Quick and easy chicken with red lentils",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, boneless cubes",
        "1 cup masoor dal",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/4 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash masoor dal.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add masoor dal and 2 cups water.",
        "Cook for 20 minutes until done.",
        "Serve hot."
      ]
    },

    // ==================== CHICKEN + MIX DAL (4) ====================
    { 
      id: 19, 
      name: "Chicken Mix Dal",
      tagline: "Chicken with mixed lentils",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1/3 cup chana dal",
        "1/3 cup moong dal",
        "1/3 cup masoor dal",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash all dals together. Soak chana dal separately for 30 minutes.",
        "Mix all dals.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5-7 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add mixed dals and 3 cups water.",
        "Cook for 30-35 minutes until chicken and dals are tender.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 20, 
      name: "Chicken Panchmel Dal",
      tagline: "Chicken with five lentils Rajasthani style",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1/4 cup each: chana dal, moong dal, masoor dal, urad dal, toor dal",
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
        "Wash all dals and soak for 1 hour.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add dals and 3 cups water.",
        "Cook for 35-40 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 21, 
      name: "Chicken Dal Makhani",
      tagline: "Creamy chicken with black lentils",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup whole urad dal",
        "1/4 cup rajma",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1/4 cup cream",
        "3 tbsp butter",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak urad dal and rajma overnight.",
        "Heat butter, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 3 cups water. Cook for 40-45 minutes.",
        "Add cream and simmer for 10 minutes.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 22, 
      name: "Chicken Dal Bukhara",
      tagline: "Peshawari style chicken with black dal",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup whole urad dal",
        "2 onions, finely chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1/4 cup cream",
        "1/4 cup butter",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak urad dal overnight.",
        "Heat butter, add cumin seeds and onions. Cook until brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add red chili powder and salt.",
        "Add dal and 3 cups water. Cook for 45 minutes.",
        "Add cream and garam masala. Simmer for 10 minutes.",
        "Serve with butter naan."
      ]
    }
  ];
    // Final recipes...
  const finalChickenDalRecipes = [
    // ==================== CHICKEN + DAL + SABZI (4) ====================
    { 
      id: 23, 
      name: "Chicken Dal Palak",
      tagline: "Chicken with lentils and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "1 cup mixed dal (moong + masoor)",
        "2 cups spinach, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash dal.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 2.5 cups water.",
        "Cook for 25-30 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 24, 
      name: "Chicken Dal Louki",
      tagline: "Chicken with lentils and bottle gourd",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup moong dal",
        "2 cups louki, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash dal.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add dal and 2.5 cups water.",
        "Cook for 25-30 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 25, 
      name: "Chicken Dal Tori",
      tagline: "Chicken with lentils and ridge gourd",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup chana dal",
        "2 cups tori, peeled and cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add tori and cook for 5 minutes.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add chana dal and 2.5 cups water.",
        "Cook for 30-35 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 26, 
      name: "Chicken Dal Methi",
      tagline: "Chicken with lentils and fenugreek",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "1 cup moong dal",
        "1 bunch methi, chopped",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash dal.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add methi and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 2.5 cups water.",
        "Cook for 25-30 minutes.",
        "Serve hot."
      ]
    },

    // ==================== CHICKEN + DAL SPECIAL (5) ====================
    { 
      id: 27, 
      name: "Chicken Dal Tadka",
      tagline: "Chicken with tempered lentils",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup toor dal",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp ghee",
        "1 tsp mustard seeds",
        "2 dried red chilies",
        "Few curry leaves",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash toor dal.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 2.5 cups water. Cook for 25-30 minutes.",
        "For tadka: Heat ghee, add mustard seeds, red chilies, curry leaves.",
        "Pour tadka over curry, add garam masala and coriander.",
        "Serve hot."
      ]
    },
    { 
      id: 28, 
      name: "Chicken Dal Fry",
      tagline: "Restaurant style chicken with dal fry",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup mixed dal (toor + moong)",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "1 capsicum, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1 tsp kasuri methi",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash dal.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add capsicum and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 2.5 cups water. Cook for 25-30 minutes.",
        "Add kasuri methi and garam masala. Serve."
      ]
    },
    { 
      id: 29, 
      name: "Hyderabadi Chicken Dal",
      tagline: "Hyderabadi style chicken with dal",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup chana dal",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander",
        "2 green chilies"
      ],
      steps: [
        "Wash and soak chana dal for 30 minutes.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and green chilies. Cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add chana dal and 2.5 cups water.",
        "Cook for 30-35 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 30, 
      name: "Punjabi Chicken Dal",
      tagline: "Punjabi style chicken with dal",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup maash dal",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp butter",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash and soak maash dal for 2 hours.",
        "Heat butter, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add turmeric, red chili powder and salt.",
        "Add maash dal and 3 cups water.",
        "Cook for 35-40 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 31, 
      name: "South Indian Chicken Dal",
      tagline: "South Indian style chicken with dal",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken",
        "1 cup toor dal",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 tsp asafoetida",
        "Few curry leaves",
        "1 tbsp lemon juice",
        "1/4 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash toor dal.",
        "Heat oil, add mustard seeds, cumin seeds, asafoetida and curry leaves.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 2.5 cups water.",
        "Cook for 25-30 minutes.",
        "Add lemon juice and serve."
      ]
    }
  ];

  // Combine all arrays
  const allChickenDalRecipes = [...chickenDalRecipes, ...moreChickenDalRecipes, ...finalChickenDalRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allChickenDalRecipes;

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
    <div className="chicken-dal-page">
      {/* Header */}
      <header className="chicken-dal-header">
        <div className="chicken-dal-header-content">
          <h1 className="chicken-dal-title">🍗 Chicken + Dal</h1>
          <p className="chicken-dal-description">
            Discover 30+ delicious chicken and dal recipes - protein-rich, flavorful aur ghar jaisa taste
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="chicken-dal-main">
        <div className="chicken-dal-grid-section">
          <div className="chicken-dal-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="chicken-dal-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="chicken-dal-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="chicken-dal-card-content">
                  <h3 className="chicken-dal-card-title">{recipe.name}</h3>
                  <p className="chicken-dal-card-description">{recipe.tagline}</p>
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
        <div className="chicken-dal-modal-overlay" onClick={handleCloseModal}>
          <div
            className="chicken-dal-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="chicken-dal-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="chicken-dal-modal-header">
              <div className="chicken-dal-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="chicken-dal-modal-content">
              {/* Column 1: Ingredients */}
              <div className="chicken-dal-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="chicken-dal-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="chicken-dal-ingredient-item">
                      <span className="chicken-dal-ingredient-bullet">•</span>
                      <span className="chicken-dal-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="chicken-dal-modal-steps">
                <h3>Steps to Make</h3>
                <div className="chicken-dal-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="chicken-dal-step-item">
                      <span className="chicken-dal-step-number">{index + 1}.</span>
                      <span className="chicken-dal-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="chicken-dal-modal-voice-container">
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

export default RecipesDalChicken;