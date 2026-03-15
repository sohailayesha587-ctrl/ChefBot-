import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesDalMutton.css';

const RecipesDalMutton = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Mutton + Dal Recipes (30+ recipes)
  const muttonDalRecipes = [
    // ==================== MUTTON + CHANA DAL (5) ====================
    { 
      id: 1, 
      name: "Mutton Chana Dal",
      tagline: "Mutton with split Bengal gram",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton, curry cut",
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
        "Add mutton pieces and fry on high heat for 8-10 minutes until browned.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add soaked chana dal and 4 cups water. Stir well.",
        "Cover and cook on medium heat for 45-50 minutes until mutton and dal are tender.",
        "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 2, 
      name: "Mutton Chana Dal Fry",
      tagline: "Tempered mutton with chana dal",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton, pieces",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add chana dal and 3.5 cups water.",
        "Cover and cook for 45-50 minutes until mutton and dal are tender.",
        "Add garam masala and coriander. Serve hot."
      ]
    },
    { 
      id: 3, 
      name: "Mutton Chana Dal Palak",
      tagline: "Mutton with chana dal and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add chana dal and 3.5 cups water.",
        "Cook for 45-50 minutes until mutton and dal are tender.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 4, 
      name: "Mutton Chana Dal Louki",
      tagline: "Mutton with chana dal and bottle gourd",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add chana dal and 3.5 cups water.",
        "Cook for 45-50 minutes until mutton, dal and louki are tender.",
        "Serve hot."
      ]
    },
    { 
      id: 5, 
      name: "Spicy Mutton Chana Dal",
      tagline: "Extra spicy mutton with chana dal",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and green chilies. Cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add chana dal and 3.5 cups water.",
        "Cook for 45-50 minutes until mutton and dal are tender.",
        "Sprinkle garam masala and serve."
      ]
    },

    // ==================== MUTTON + MOONG DAL (5) ====================
    { 
      id: 6, 
      name: "Mutton Moong Dal",
      tagline: "Mutton with split yellow moong dal",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton, pieces",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add moong dal and 3.5 cups water.",
        "Cover and cook for 40-45 minutes until mutton and dal are tender.",
        "Garnish with coriander and serve hot."
      ]
    },
    { 
      id: 7, 
      name: "Mutton Moong Dal Fry",
      tagline: "Tempered mutton with moong dal",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add moong dal and 3.5 cups water.",
        "Cook for 40-45 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 8, 
      name: "Mutton Moong Dal Palak",
      tagline: "Mutton with moong dal and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add moong dal and 3.5 cups water.",
        "Cook for 40-45 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 9, 
      name: "Mutton Moong Dal Louki",
      tagline: "Mutton with moong dal and bottle gourd",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add moong dal and 3.5 cups water.",
        "Cook for 40-45 minutes until everything is tender.",
        "Serve hot."
      ]
    },
    { 
      id: 10, 
      name: "Light Mutton Moong Dal",
      tagline: "Light and healthy mutton with moong dal",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton, lean pieces",
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
        "Add mutton and fry for 5 minutes.",
        "Add turmeric, red chili powder and salt.",
        "Add moong dal and 3 cups water.",
        "Cook for 40-45 minutes.",
        "Garnish with coriander and serve."
      ]
    }
  ];
    // More recipes continue...
  const moreMuttonDalRecipes = [
    // ==================== MUTTON + MAASH DAL (4) ====================
    { 
      id: 11, 
      name: "Mutton Maash Dal",
      tagline: "Mutton with black lentils",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton, pieces",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add soaked maash dal and 4 cups water.",
        "Cover and cook for 50-55 minutes until mutton and dal are tender.",
        "Sprinkle garam masala and garnish with coriander.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 12, 
      name: "Mutton Maash Dal Fry",
      tagline: "Tempered mutton with black lentils",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add maash dal and 4 cups water.",
        "Cook for 50-55 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 13, 
      name: "Mutton Maash Dal Palak",
      tagline: "Mutton with black lentils and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add maash dal and 4 cups water.",
        "Cook for 50-55 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 14, 
      name: "Creamy Mutton Maash Dal",
      tagline: "Rich and creamy mutton with black lentils",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add maash dal and 4 cups water.",
        "Cook for 50-55 minutes.",
        "Add cream and simmer for 5 minutes.",
        "Serve hot."
      ]
    },

    // ==================== MUTTON + MASOOR DAL (4) ====================
    { 
      id: 15, 
      name: "Mutton Masoor Dal",
      tagline: "Mutton with red lentils",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton, pieces",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add masoor dal and 3.5 cups water.",
        "Cover and cook for 35-40 minutes until mutton and dal are tender.",
        "Garnish with coriander and serve hot."
      ]
    },
    { 
      id: 16, 
      name: "Mutton Masoor Dal Fry",
      tagline: "Tempered mutton with red lentils",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add masoor dal and 3.5 cups water.",
        "Cook for 35-40 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 17, 
      name: "Mutton Masoor Dal Palak",
      tagline: "Mutton with red lentils and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add masoor dal and 3.5 cups water.",
        "Cook for 35-40 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 18, 
      name: "Quick Mutton Masoor Dal",
      tagline: "Quick and easy mutton with red lentils",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton, boneless cubes",
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
        "Add mutton and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add masoor dal and 3 cups water.",
        "Cook for 35 minutes until done.",
        "Serve hot."
      ]
    },

    // ==================== MUTTON + MIX DAL (4) ====================
    { 
      id: 19, 
      name: "Mutton Mix Dal",
      tagline: "Mutton with mixed lentils",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add mixed dals and 4 cups water.",
        "Cook for 45-50 minutes until mutton and dals are tender.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 20, 
      name: "Mutton Panchmel Dal",
      tagline: "Mutton with five lentils Rajasthani style",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add dals and 4 cups water.",
        "Cook for 50-55 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 21, 
      name: "Mutton Dal Makhani",
      tagline: "Creamy mutton with black lentils",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 4 cups water. Cook for 60 minutes.",
        "Add cream and simmer for 10 minutes.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 22, 
      name: "Mutton Dal Bukhara",
      tagline: "Peshawari style mutton with black dal",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add red chili powder and salt.",
        "Add dal and 4 cups water. Cook for 60 minutes.",
        "Add cream and garam masala. Simmer for 10 minutes.",
        "Serve with butter naan."
      ]
    }
  ];
    // Final recipes...
  const finalMuttonDalRecipes = [
    // ==================== MUTTON + DAL + SABZI (4) ====================
    { 
      id: 23, 
      name: "Mutton Dal Palak",
      tagline: "Mutton with lentils and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 3.5 cups water.",
        "Cook for 40-45 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 24, 
      name: "Mutton Dal Louki",
      tagline: "Mutton with lentils and bottle gourd",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add louki and cook for 5 minutes.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add dal and 3.5 cups water.",
        "Cook for 40-45 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 25, 
      name: "Mutton Dal Tori",
      tagline: "Mutton with lentils and ridge gourd",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add tori and cook for 5 minutes.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add chana dal and 3.5 cups water.",
        "Cook for 45-50 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 26, 
      name: "Mutton Dal Methi",
      tagline: "Mutton with lentils and fenugreek",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add methi and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 3.5 cups water.",
        "Cook for 40-45 minutes.",
        "Serve hot."
      ]
    },

    // ==================== MUTTON + DAL SPECIAL (5) ====================
    { 
      id: 27, 
      name: "Mutton Dal Tadka",
      tagline: "Mutton with tempered lentils",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 3.5 cups water. Cook for 40-45 minutes.",
        "For tadka: Heat ghee, add mustard seeds, red chilies, curry leaves.",
        "Pour tadka over curry, add garam masala and coriander.",
        "Serve hot."
      ]
    },
    { 
      id: 28, 
      name: "Mutton Dal Fry",
      tagline: "Restaurant style mutton with dal fry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add capsicum and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 3.5 cups water. Cook for 40-45 minutes.",
        "Add kasuri methi and garam masala. Serve."
      ]
    },
    { 
      id: 29, 
      name: "Hyderabadi Mutton Dal",
      tagline: "Hyderabadi style mutton with dal",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and green chilies. Cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add chana dal and 3.5 cups water.",
        "Cook for 45-50 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 30, 
      name: "Punjabi Mutton Dal",
      tagline: "Punjabi style mutton with dal",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add turmeric, red chili powder and salt.",
        "Add maash dal and 4 cups water.",
        "Cook for 50-55 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 31, 
      name: "South Indian Mutton Dal",
      tagline: "South Indian style mutton with dal",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
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
        "Add mutton and fry for 8-10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add dal and 3.5 cups water.",
        "Cook for 40-45 minutes.",
        "Add lemon juice and serve."
      ]
    }
  ];

  // Combine all arrays
  const allMuttonDalRecipes = [...muttonDalRecipes, ...moreMuttonDalRecipes, ...finalMuttonDalRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allMuttonDalRecipes;

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
    <div className="mutton-dal-page">
      {/* Header */}
      <header className="mutton-dal-header">
        <div className="mutton-dal-header-content">
          <h1 className="mutton-dal-title">🥩 Mutton + Dal</h1>
          <p className="mutton-dal-description">
            Discover 30+ delicious mutton and dal recipes - rich, flavorful aur ghar jaisa taste
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="mutton-dal-main">
        <div className="mutton-dal-grid-section">
          <div className="mutton-dal-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="mutton-dal-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="mutton-dal-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="mutton-dal-card-content">
                  <h3 className="mutton-dal-card-title">{recipe.name}</h3>
                  <p className="mutton-dal-card-description">{recipe.tagline}</p>
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
        <div className="mutton-dal-modal-overlay" onClick={handleCloseModal}>
          <div
            className="mutton-dal-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="mutton-dal-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="mutton-dal-modal-header">
              <div className="mutton-dal-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="mutton-dal-modal-content">
              {/* Column 1: Ingredients */}
              <div className="mutton-dal-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="mutton-dal-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="mutton-dal-ingredient-item">
                      <span className="mutton-dal-ingredient-bullet">•</span>
                      <span className="mutton-dal-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="mutton-dal-modal-steps">
                <h3>Steps to Make</h3>
                <div className="mutton-dal-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="mutton-dal-step-item">
                      <span className="mutton-dal-step-number">{index + 1}.</span>
                      <span className="mutton-dal-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="mutton-dal-modal-voice-container">
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

export default RecipesDalMutton;