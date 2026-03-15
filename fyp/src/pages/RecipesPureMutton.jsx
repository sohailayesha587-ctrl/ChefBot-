import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesPureMutton.css';

const RecipesPureMutton = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Pure Mutton Recipes (40+ recipes)
  const muttonRecipes = [
    // ==================== MUTTON CURRIES (8) ====================
    { 
      id: 1, 
      name: "Mutton Curry",
      tagline: "Classic Pakistani mutton curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton, curry cut",
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
        "Heat oil in a large pot, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mutton pieces and fry on high heat for 8-10 minutes until browned.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add 2 cups water and bring to boil. Cover and cook on medium heat for 45-50 minutes.",
        "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 2, 
      name: "Mutton Karahi",
      tagline: "Traditional karahi style mutton",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "4 tomatoes, chopped",
        "2 tbsp ginger, julienned",
        "2 tbsp garlic, chopped",
        "4 green chilies, slit",
        "1 tsp cumin seeds",
        "1 tsp red chili flakes",
        "1 tsp black pepper",
        "1 tsp salt",
        "1/2 cup oil",
        "Fresh coriander",
        "1 lemon, juiced"
      ],
      steps: [
        "Heat oil in a wok (karahi). Add mutton and fry on high heat for 10 minutes.",
        "Add ginger, garlic and green chilies. Cook for 2 minutes.",
        "Add tomatoes and cook until soft and oil separates.",
        "Add cumin seeds, red chili flakes, black pepper and salt.",
        "Cook on high heat until oil comes on top and mutton is tender.",
        "Sprinkle lemon juice and coriander.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 3, 
      name: "Mutton Handi",
      tagline: "Slow-cooked creamy mutton",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "1 cup yogurt",
        "2 onions, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "1/4 cup cream",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add turmeric, red chili powder and salt.",
        "Add beaten yogurt and mix well.",
        "Add 1 cup water and cook on low heat for 45-50 minutes.",
        "Add cream and garam masala. Simmer for 5 minutes.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 4, 
      name: "Mutton Qorma",
      tagline: "Rich and creamy mutton qorma",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "1 cup yogurt",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon stick"
      ],
      steps: [
        "Heat oil, add whole spices and onions. Fry until golden brown.",
        "Remove half onions for garnish.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add turmeric, red chili powder and salt.",
        "Add beaten yogurt slowly, stirring continuously.",
        "Add 1 cup water and cook for 50 minutes until mutton is tender.",
        "Add garam masala and garnish with fried onions."
      ]
    },
    { 
      id: 5, 
      name: "Mutton Rogan Josh",
      tagline: "Kashmiri style mutton rogan josh",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp fennel powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "1/2 cup yogurt"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili, fennel powder and salt.",
        "Add yogurt and 1 cup water. Cook for 45-50 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 6, 
      name: "Mutton Do Pyaza",
      tagline: "Mutton with double onions",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "3 onions, sliced",
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
        "Heat oil, add cumin seeds and half onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add 1 cup water and cook for 45 minutes.",
        "Add remaining onions and garam masala.",
        "Cook for 5 minutes and serve."
      ]
    },
    { 
      id: 7, 
      name: "Mutton Bhuna",
      tagline: "Dry bhuna mutton",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
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
        "Heat oil, add cumin seeds and onions. Sauté until brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mutton and fry until browned.",
        "Add tomatoes and cook until dry.",
        "Add turmeric, red chili, coriander and salt.",
        "Add 1/2 cup water and cook on low heat until mutton is tender and dry.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 8, 
      name: "Mutton Jalfrezi",
      tagline: "Spicy mutton with thick gravy",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton, boneless cubes",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 capsicum, sliced",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mutton and fry until browned.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add 1 cup water and cook for 45 minutes.",
        "Add capsicum and cook for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },

    // ==================== MUTTON KARAHI VARIETIES (4) ====================
    { 
      id: 9, 
      name: "White Mutton Karahi",
      tagline: "Creamy white karahi",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "1 cup yogurt",
        "2 tbsp ginger paste",
        "2 tbsp garlic paste",
        "4 green chilies",
        "1 tsp white pepper",
        "1 tsp black pepper",
        "1 tsp salt",
        "1/2 cup oil",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil, add mutton and fry for 10 minutes.",
        "Add ginger, garlic and green chilies. Cook for 2 minutes.",
        "Add yogurt and cook on high heat until oil separates.",
        "Add white pepper, black pepper and salt.",
        "Cook for 30-35 minutes until mutton is tender.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 10, 
      name: "Peshawari Mutton Karahi",
      tagline: "Peshawar style karahi",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "4 tomatoes, chopped",
        "2 tbsp ginger, julienned",
        "2 tbsp garlic, chopped",
        "4 green chilies",
        "1 tsp cumin seeds",
        "1 tsp red chili flakes",
        "1 tsp black pepper",
        "1 tsp salt",
        "1/2 cup oil"
      ],
      steps: [
        "Heat oil in karahi, add mutton and fry for 10 minutes.",
        "Add ginger, garlic and green chilies.",
        "Add tomatoes and cook until soft.",
        "Add cumin, red chili flakes, black pepper and salt.",
        "Cook on high heat until oil separates and mutton is tender.",
        "Serve with naan."
      ]
    },
    { 
      id: 11, 
      name: "Spicy Mutton Karahi",
      tagline: "Extra spicy karahi",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "4 tomatoes",
        "2 tbsp ginger-garlic",
        "4 green chilies",
        "2 tsp red chili powder",
        "1 tsp cumin",
        "1 tsp pepper",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add mutton and fry.",
        "Add ginger-garlic and chilies.",
        "Add tomatoes and cook until soft.",
        "Add red chili, cumin, pepper and salt.",
        "Cook until oil separates and mutton is tender.",
        "Serve hot."
      ]
    },
    { 
      id: 12, 
      name: "Dry Mutton Karahi",
      tagline: "Dry karahi with no gravy",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "4 green chilies",
        "1 tsp cumin",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add mutton and fry until golden.",
        "Add ginger-garlic and chilies.",
        "Add tomatoes and cook until dry.",
        "Add spices and cook on high heat until mutton is tender.",
        "Serve hot with raita."
      ]
    }
  ];
    // More recipes continue...
  const moreMuttonRecipes = [
    // ==================== MUTTON MASALA (5) ====================
    { 
      id: 13, 
      name: "Mutton Masala",
      tagline: "Spicy mutton masala",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add 1.5 cups water and cook for 45-50 minutes.",
        "Add garam masala and coriander. Serve."
      ]
    },
    { 
      id: 14, 
      name: "Mutton Tikka Masala",
      tagline: "Restaurant style tikka masala",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton tikka pieces",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp kasuri methi",
        "1/2 cup cream",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add mutton tikka and simmer for 30 minutes.",
        "Add cream and kasuri methi.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 15, 
      name: "Mutton Butter Masala",
      tagline: "Creamy butter mutton",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton, boneless",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin",
        "2 tsp red chili",
        "1/2 cup cream",
        "2 tbsp butter",
        "1 tsp kasuri methi",
        "Salt to taste",
        "1/2 cup oil"
      ],
      steps: [
        "Pressure cook mutton with salt until tender.",
        "Heat butter and oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add tomato puree and cook until butter separates.",
        "Add red chili and salt.",
        "Add cooked mutton and simmer for 15 minutes.",
        "Add cream and kasuri methi.",
        "Serve with naan."
      ]
    },
    { 
      id: 16, 
      name: "Mutton Lababdar",
      tagline: "Rich and creamy lababdar",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/4 cup cream",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Pressure cook mutton with salt.",
        "Heat oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add red chili and salt.",
        "Add mutton and cook for 15 minutes.",
        "Add cream and garam masala.",
        "Serve hot."
      ]
    },
    { 
      id: 17, 
      name: "Mutton Kolhapuri",
      tagline: "Spicy Kolhapuri style mutton",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "2 tsp red chili powder",
        "1 tsp turmeric",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "1 tbsp coconut, grated"
      ],
      steps: [
        "Heat oil, add onions and sauté until brown.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili, turmeric, garam masala and salt.",
        "Add coconut and 1 cup water.",
        "Cook for 45 minutes and serve."
      ]
    },

    // ==================== MUTTON ROGAN JOSH VARIETIES (3) ====================
    { 
      id: 18, 
      name: "Kashmiri Rogan Josh",
      tagline: "Authentic Kashmiri rogan josh",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, sliced",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp fennel powder",
        "1 tsp dry ginger powder",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup yogurt",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add fennel, dry ginger, red chili and salt.",
        "Add yogurt and 1 cup water.",
        "Cook for 45-50 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 19, 
      name: "Easy Rogan Josh",
      tagline: "Simple rogan josh recipe",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "2 tsp rogan josh masala",
        "1 tsp turmeric",
        "1/2 cup yogurt",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add onions and sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add rogan josh masala, turmeric and salt.",
        "Add yogurt and 1 cup water.",
        "Cook for 45 minutes and serve."
      ]
    },
    { 
      id: 20, 
      name: "Pressure Cooker Rogan Josh",
      tagline: "Quick pressure cooker version",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "2 tsp rogan josh masala",
        "1/2 cup yogurt",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil in pressure cooker, add onions and sauté.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomatoes and cook for 5 minutes.",
        "Add rogan josh masala and salt.",
        "Add yogurt and 1/2 cup water.",
        "Pressure cook for 20 minutes.",
        "Serve hot."
      ]
    },

    // ==================== MUTTON KOFTA (4) ====================
    { 
      id: 21, 
      name: "Mutton Kofta Curry",
      tagline: "Meatballs in spicy gravy",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mutton mince",
        "1 onion, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1 egg",
        "2 tbsp breadcrumbs",
        "For gravy: 2 onions, 2 tomatoes",
        "Oil for frying",
        "Salt to taste"
      ],
      steps: [
        "Mix mince with onion, ginger-garlic, spices, egg and breadcrumbs.",
        "Shape into small balls and shallow fry until golden.",
        "Prepare onion-tomato gravy in a pan.",
        "Add fried kofta to gravy and simmer for 15 minutes.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 22, 
      name: "Mutton Kofta in Yogurt Gravy",
      tagline: "Kofta in creamy yogurt sauce",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mutton mince",
        "1 onion, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1 egg",
        "For gravy: 1 cup yogurt",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Prepare kofta and fry.",
        "Heat oil, add onions and sauté.",
        "Add tomato puree and cook.",
        "Add beaten yogurt and spices.",
        "Add kofta and simmer for 15 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 23, 
      name: "Nargisi Kofta",
      tagline: "Stuffed kofta with boiled eggs",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mutton mince",
        "4 boiled eggs",
        "1 onion, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1 egg (raw)",
        "Oil for frying",
        "For gravy: 2 onions, 2 tomatoes",
        "Salt to taste"
      ],
      steps: [
        "Mix mince with spices, raw egg and onion.",
        "Wrap mince around boiled eggs to cover completely.",
        "Shallow fry until golden.",
        "Prepare gravy and add kofta.",
        "Simmer for 10 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 24, 
      name: "Malai Kofta",
      tagline: "Creamy kofta curry",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g mutton mince",
        "1 onion, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1/4 cup cream",
        "1 egg",
        "For gravy: 2 onions, 2 tomatoes",
        "1/4 cup cream",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Prepare kofta with mince, spices and egg. Fry.",
        "Prepare gravy with onions and tomatoes.",
        "Add cream to gravy.",
        "Add kofta and simmer.",
        "Serve hot with naan."
      ]
    },

    // ==================== MUTTON RARA (2) ====================
    { 
      id: 25, 
      name: "Mutton Rara",
      tagline: "Mutton with mince gravy",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton pieces",
        "250g mutton mince",
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
        "Heat oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mutton pieces and fry for 10 minutes.",
        "Add mince and fry until browned.",
        "Add tomatoes and cook until soft.",
        "Add red chili and salt.",
        "Add 1 cup water and cook for 45 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 26, 
      name: "Mutton Rara Masala",
      tagline: "Spicy rara masala",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g mutton",
        "250g mutton mince",
        "2 onions, chopped",
        "2 tomatoes, pureed",
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
        "Add mutton and mince, fry.",
        "Add tomato puree and cook.",
        "Add spices and water.",
        "Cook until tender.",
        "Serve hot."
      ]
    }
  ];
    // Final recipes...
  const finalMuttonRecipes = [
    // ==================== MUTTON REGIONAL (5) ====================
    { 
      id: 27, 
      name: "Hyderabadi Mutton",
      tagline: "Hyderabadi style mutton curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup yogurt",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili, garam masala and salt.",
        "Add yogurt and 1 cup water.",
        "Cook for 45 minutes and serve."
      ]
    },
    { 
      id: 28, 
      name: "Punjabi Mutton",
      tagline: "Punjabi style mutton curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp garam masala",
        "2 tbsp butter",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil and butter, add cumin and onions.",
        "Sauté until golden, add ginger-garlic.",
        "Add mutton and fry for 10 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili and salt.",
        "Add 1 cup water and cook for 45 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 29, 
      name: "Kerala Mutton Curry",
      tagline: "Kerala style coconut mutton",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "1 cup coconut milk",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp mustard seeds",
        "1 tsp turmeric",
        "2 tsp red chili",
        "Curry leaves",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add mustard seeds and curry leaves.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili and salt.",
        "Add coconut milk and 1/2 cup water.",
        "Simmer for 40 minutes and serve."
      ]
    },
    { 
      id: 30, 
      name: "Chettinad Mutton",
      tagline: "Spicy Chettinad mutton",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp fennel seeds",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp pepper",
        "1/2 cup coconut, grated",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Dry roast fennel, cumin and coconut. Grind to paste.",
        "Heat oil, add onions and sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add ground paste, red chili, pepper and salt.",
        "Add 1 cup water and cook for 45 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 31, 
      name: "Goan Mutton Curry",
      tagline: "Goan style coconut curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "1 cup coconut milk",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tbsp vinegar",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add mutton and fry for 10 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili and salt.",
        "Add coconut milk and vinegar.",
        "Simmer for 40 minutes and serve."
      ]
    },

    // ==================== MUTTON CHOPS (3) ====================
    { 
      id: 32, 
      name: "Mutton Chops Curry",
      tagline: "Curry with mutton chops",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton chops",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add chops and fry for 10 minutes.",
        "Add tomato puree and cook.",
        "Add spices and 1 cup water.",
        "Cook for 40 minutes.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 33, 
      name: "Mutton Chops Karahi",
      tagline: "Karahi style chops",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton chops",
        "4 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "4 green chilies",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp pepper",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add chops and fry.",
        "Add ginger-garlic and chilies.",
        "Add tomatoes and cook.",
        "Add spices and cook until tender.",
        "Serve hot."
      ]
    },
    { 
      id: 34, 
      name: "Grilled Mutton Chops",
      tagline: "Oven grilled chops",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton chops",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp cumin",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Marinate chops with all ingredients for 4 hours.",
        "Preheat oven to 180°C.",
        "Place chops on baking tray.",
        "Bake for 30-35 minutes, turning once.",
        "Grill for 5 minutes for charred effect.",
        "Serve with salad."
      ]
    },

    // ==================== MUTTON LEG (2) ====================
    { 
      id: 35, 
      name: "Mutton Leg Roast",
      tagline: "Whole leg roasted",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 mutton leg",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Make slits on leg.",
        "Marinate with all ingredients overnight.",
        "Preheat oven to 160°C.",
        "Roast for 2-3 hours, basting occasionally.",
        "Rest for 15 minutes before carving.",
        "Serve with mint chutney."
      ]
    },
    { 
      id: 36, 
      name: "Mutton Leg Curry",
      tagline: "Leg pieces in curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 mutton leg, cut into pieces",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions.",
        "Add ginger-garlic and cook.",
        "Add leg pieces and fry.",
        "Add tomato puree and spices.",
        "Add 2 cups water and cook for 1 hour.",
        "Add garam masala and serve."
      ]
    },

    // ==================== MUTTON BHUNA (2) ====================
    { 
      id: 37, 
      name: "Mutton Bhuna Ghost",
      tagline: "Dry bhuna mutton",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté until brown.",
        "Add ginger-garlic and cook.",
        "Add mutton and fry until browned.",
        "Add tomatoes and cook until dry.",
        "Add spices and 1/2 cup water.",
        "Cook on low heat until mutton is tender and dry.",
        "Serve with naan."
      ]
    },
    { 
      id: 38, 
      name: "Mutton Bhuna Masala",
      tagline: "Spicy bhuna masala",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton",
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
        "Add mutton and fry.",
        "Add tomatoes and cook until dry.",
        "Add spices and cook until tender.",
        "Add garam masala and serve."
      ]
    },

    // ==================== MUTTON NALLI (3) ====================
    { 
      id: 39, 
      name: "Mutton Nalli Curry",
      tagline: "Bone marrow curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg mutton nalli (shanks)",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin and onions.",
        "Add ginger-garlic and cook.",
        "Add nalli and fry.",
        "Add tomato puree and spices.",
        "Add 1 cup water and cook for 1 hour.",
        "Add garam masala and serve."
      ]
    },
    { 
      id: 40, 
      name: "Nalli Nihari",
      tagline: "Nihari with bone marrow",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "1 kg nalli",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp nihari masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add nalli and fry.",
        "Add ginger-garlic and spices.",
        "Add 2 cups water and cook for 2 hours.",
        "Serve with naan."
      ]
    },
    { 
      id: 41, 
      name: "Nalli Biryani",
      tagline: "Biryani with bone marrow",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g nalli",
        "2 cups rice",
        "2 onions, sliced",
        "2 tbsp ginger-garlic",
        "1 tsp biryani masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook nalli with spices until tender.",
        "Layer with parboiled rice.",
        "Dum for 20 minutes.",
        "Serve with raita."
      ]
    }
  ];

  // Combine all arrays
  const allMuttonRecipes = [...muttonRecipes, ...moreMuttonRecipes, ...finalMuttonRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allMuttonRecipes;

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
    <div className="pure-mutton-page">
      {/* Header */}
      <header className="pure-mutton-header">
        <div className="pure-mutton-header-content">
          <h1 className="pure-mutton-title">🥩 Pure Mutton Dishes</h1>
          <p className="pure-mutton-description">
            Discover 40+ delicious mutton recipes - curries, karahi, rogan josh, kofta aur bhi bahut kuch
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="pure-mutton-main">
        <div className="pure-mutton-grid-section">
          <div className="pure-mutton-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="pure-mutton-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="pure-mutton-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="pure-mutton-card-content">
                  <h3 className="pure-mutton-card-title">{recipe.name}</h3>
                  <p className="pure-mutton-card-description">{recipe.tagline}</p>
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
        <div className="pure-mutton-modal-overlay" onClick={handleCloseModal}>
          <div
            className="pure-mutton-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="pure-mutton-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="pure-mutton-modal-header">
              <div className="pure-mutton-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="pure-mutton-modal-content">
              {/* Column 1: Ingredients */}
              <div className="pure-mutton-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="pure-mutton-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="pure-mutton-ingredient-item">
                      <span className="pure-mutton-ingredient-bullet">•</span>
                      <span className="pure-mutton-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="pure-mutton-modal-steps">
                <h3>Steps to Make</h3>
                <div className="pure-mutton-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="pure-mutton-step-item">
                      <span className="pure-mutton-step-number">{index + 1}.</span>
                      <span className="pure-mutton-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="pure-mutton-modal-voice-container">
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

export default RecipesPureMutton;