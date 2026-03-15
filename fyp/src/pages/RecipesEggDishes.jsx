import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesEggDishes.css';

const RecipesEggDishes = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Egg Dishes Recipes (30+ recipes)
  const eggRecipes = [
    // ==================== EGG CURRIES (8) ====================
    { 
      id: 1, 
      name: "Anda Curry",
      tagline: "Classic egg curry in spicy gravy",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs, boiled and peeled",
        "2 onions, finely chopped",
        "2 tomatoes, pureed",
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
        "Make slits on boiled eggs and lightly fry in 1 tbsp oil until golden. Set aside.",
        "Heat remaining oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add 1 cup water and bring to boil. Simmer for 5 minutes.",
        "Add fried eggs and cook for 5-7 minutes.",
        "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
        "Serve hot with rice or roti."
      ]
    },
    { 
      id: 2, 
      name: "Anda Masala",
      tagline: "Spicy egg masala gravy",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs, boiled",
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
        "Make slits on boiled eggs.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add 1 cup water and simmer for 5 minutes.",
        "Add eggs and cook for 5 minutes.",
        "Sprinkle garam masala and coriander. Serve."
      ]
    },
    { 
      id: 3, 
      name: "Dhaba Style Egg Curry",
      tagline: "Punjabi dhaba style egg curry",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs, boiled",
        "2 onions, finely chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Butter for garnish"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add 1 cup water and simmer for 10 minutes.",
        "Add boiled eggs and cook for 5 minutes.",
        "Add garam masala and butter. Serve hot."
      ]
    },
    { 
      id: 4, 
      name: "Anda Aloo Curry",
      tagline: "Egg and potato curry",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "4 eggs, boiled",
        "2 potatoes, boiled and cubed",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
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
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add potatoes and 1 cup water. Simmer for 5 minutes.",
        "Add boiled eggs and cook for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 5, 
      name: "Anda Matar Curry",
      tagline: "Egg and peas curry",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "4 eggs, boiled",
        "1 cup green peas",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
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
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add peas and 1 cup water. Cook for 5 minutes.",
        "Add boiled eggs and cook for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 6, 
      name: "Anda Palak Curry",
      tagline: "Egg and spinach curry",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "4 eggs, boiled",
        "2 cups spinach, blanched and pureed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach puree, turmeric, red chili and salt.",
        "Add 1/2 cup water and simmer for 5 minutes.",
        "Add boiled eggs and cook for 5 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 7, 
      name: "Kerala Egg Curry",
      tagline: "Coconut based egg curry",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs, boiled",
        "1 cup coconut milk",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp mustard seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "Few curry leaves",
        "1/4 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add mustard seeds and curry leaves.",
        "Add onions and sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add coconut milk and simmer for 5 minutes (don't boil).",
        "Add boiled eggs and cook for 5 minutes.",
        "Serve with rice or appam."
      ]
    },
    { 
      id: 8, 
      name: "Anda Do Pyaza",
      tagline: "Egg curry with double onions",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs, boiled",
        "2 large onions, sliced",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and half the onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add 1 cup water and simmer for 5 minutes.",
        "Add boiled eggs and remaining onions.",
        "Cook for 5 minutes, add garam masala and serve."
      ]
    },

    // ==================== EGG MASALA (5) ====================
    { 
      id: 9, 
      name: "Anda Bhurji",
      tagline: "Indian style scrambled eggs",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs",
        "1 onion, finely chopped",
        "2 green chilies, chopped",
        "1 tomato, finely chopped",
        "1 tbsp ginger-garlic paste",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander, chopped"
      ],
      steps: [
        "Beat eggs in a bowl with salt and turmeric.",
        "Heat oil in a pan, add onions and sauté until soft.",
        "Add ginger-garlic paste and green chilies. Cook for 1 minute.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and mix well.",
        "Pour beaten eggs and stir continuously on low heat.",
        "Cook until eggs are scrambled and cooked through.",
        "Garnish with coriander and serve with bread or paratha."
      ]
    },
    { 
      id: 10, 
      name: "Anda Bhurji Masala",
      tagline: "Spicy scrambled eggs",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs",
        "1 onion, chopped",
        "1 capsicum, chopped",
        "2 green chilies, chopped",
        "1 tomato, chopped",
        "1 tbsp ginger-garlic paste",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Beat eggs with salt and turmeric.",
        "Heat oil, add onions and sauté until golden.",
        "Add ginger-garlic paste, green chilies and capsicum.",
        "Cook for 2 minutes, then add tomatoes.",
        "Add red chili powder and mix.",
        "Pour eggs and stir until scrambled.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 11, 
      name: "Anda Bhurji with Paneer",
      tagline: "Scrambled eggs with cottage cheese",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs",
        "100g paneer, crumbled",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tomato, chopped",
        "1 tbsp ginger-garlic paste",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Beat eggs with salt and turmeric.",
        "Heat oil, add onions and sauté until golden.",
        "Add ginger-garlic paste and green chilies.",
        "Add tomatoes and cook until soft.",
        "Add crumbled paneer and red chili powder. Mix well.",
        "Pour eggs and stir until scrambled.",
        "Serve hot with roti."
      ]
    },
    { 
      id: 12, 
      name: "Anda Bhurji Pav",
      tagline: "Scrambled eggs with bread",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tomato, chopped",
        "1 tbsp ginger-garlic paste",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "2 tbsp oil",
        "Salt to taste",
        "4 pav buns",
        "Butter for toasting"
      ],
      steps: [
        "Prepare anda bhurji as per basic recipe.",
        "Toast pav buns with butter until golden.",
        "Serve hot bhurji with buttered pav."
      ]
    },
    { 
      id: 13, 
      name: "Anda Ghotala",
      tagline: "Maharashtrian style egg scramble",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tomato, chopped",
        "1 tbsp ginger-garlic paste",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp goda masala",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Beat eggs with salt and turmeric.",
        "Heat oil, add onions and sauté until brown.",
        "Add ginger-garlic paste and green chilies.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and goda masala.",
        "Pour eggs and scramble until done.",
        "Garnish with coriander and serve."
      ]
    }
  ];
    // More recipes continue...
  const moreEggRecipes = [
    // ==================== EGG CURRIES WITH VEGETABLES (5) ====================
    { 
      id: 14, 
      name: "Anda Aloo Matar",
      tagline: "Egg with potato and peas",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "4 eggs, boiled",
        "2 potatoes, cubed",
        "1/2 cup peas",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
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
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili powder and salt.",
        "Add potatoes and 1 cup water. Cook for 10 minutes.",
        "Add peas and cook for 5 minutes.",
        "Add boiled eggs and simmer for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 15, 
      name: "Anda Shimla Mirch",
      tagline: "Egg with capsicum",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "4 eggs, boiled",
        "2 capsicum, cubed",
        "1 onion, sliced",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until soft.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add capsicum and cook for 3-4 minutes.",
        "Add boiled eggs and mix gently.",
        "Cook for 2 minutes and serve."
      ]
    },
    { 
      id: 16, 
      name: "Anda Gobhi",
      tagline: "Egg with cauliflower",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "4 eggs, boiled",
        "1 cauliflower, florets",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add cauliflower and 1/2 cup water. Cook for 8-10 minutes.",
        "Add boiled eggs and cook for 2 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 17, 
      name: "Anda Baingan",
      tagline: "Egg with eggplant",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "4 eggs, boiled",
        "2 eggplants, cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add eggplants and cook for 10 minutes.",
        "Add boiled eggs and mix gently.",
        "Cook for 2 minutes and serve."
      ]
    },
    { 
      id: 18, 
      name: "Anda Palak",
      tagline: "Egg with spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "4 eggs, boiled",
        "2 cups spinach, chopped",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add turmeric, red chili powder and salt.",
        "Add boiled eggs and simmer for 5 minutes.",
        "Serve hot."
      ]
    },

    // ==================== EGG KEEMA (3) ====================
    { 
      id: 19, 
      name: "Anda Keema",
      tagline: "Egg with minced meat",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "4 eggs, boiled",
        "250g chicken mince",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1/4 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mince and fry until browned.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add boiled eggs and simmer for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 20, 
      name: "Anda Keema Matar",
      tagline: "Egg with mince and peas",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "4 eggs, boiled",
        "250g chicken mince",
        "1/2 cup peas",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1/4 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mince and fry until browned.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add peas and 1/2 cup water. Cook for 15 minutes.",
        "Add boiled eggs and simmer for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 21, 
      name: "Anda Keema Aloo",
      tagline: "Egg with mince and potato",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "4 eggs, boiled",
        "250g chicken mince",
        "2 potatoes, cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1/4 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add mince and fry until browned.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add potatoes and 1 cup water. Cook for 15 minutes.",
        "Add boiled eggs and simmer for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },

    // ==================== EGG DALS (3) ====================
    { 
      id: 22, 
      name: "Anda Dal",
      tagline: "Egg with lentils",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "4 eggs, boiled",
        "1 cup masoor dal",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and cook dal with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Add boiled eggs and cook for 5 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 23, 
      name: "Anda Chana Dal",
      tagline: "Egg with chana dal",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "4 eggs, boiled",
        "1 cup chana dal, soaked",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook chana dal with turmeric and salt until soft.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Add boiled eggs and cook for 5 minutes.",
        "Serve."
      ]
    },
    { 
      id: 24, 
      name: "Anda Dal Palak",
      tagline: "Egg with lentils and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "4 eggs, boiled",
        "1 cup moong dal",
        "2 cups spinach, chopped",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook moong dal with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach and cook until wilted.",
        "Add red chili powder and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Add boiled eggs and cook for 5 minutes.",
        "Serve hot."
      ]
    }
  ];
    // Final recipes...
  const finalEggRecipes = [
    // ==================== EGG RICE (3) ====================
    { 
      id: 25, 
      name: "Egg Fried Rice",
      tagline: "Chinese style egg fried rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "4 eggs, scrambled",
        "2 cups cooked rice",
        "1 onion, chopped",
        "1/2 cup carrots, diced",
        "1/2 cup peas",
        "2 tbsp soy sauce",
        "1 tbsp oil",
        "Salt to taste",
        "Spring onions for garnish"
      ],
      steps: [
        "Heat oil in a wok, add onions and sauté for 1 minute.",
        "Add carrots and peas, stir-fry for 2 minutes.",
        "Add cooked rice and mix well.",
        "Add soy sauce and salt. Mix thoroughly.",
        "Add scrambled eggs and mix gently.",
        "Garnish with spring onions and serve hot."
      ]
    },
    { 
      id: 26, 
      name: "Egg Biryani",
      tagline: "Fragrant rice with eggs",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "6 eggs, boiled",
        "2 cups basmati rice",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon stick",
        "1 tsp biryani masala",
        "1/2 cup oil",
        "Salt to taste",
        "Saffron milk",
        "Fresh coriander"
      ],
      steps: [
        "Wash and soak rice for 30 minutes.",
        "Heat oil, add whole spices and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add biryani masala and salt.",
        "Add 3 cups water and bring to boil.",
        "Add rice and cook until 70% done.",
        "Layer with boiled eggs, saffron milk and coriander.",
        "Dum for 15 minutes and serve."
      ]
    },
    { 
      id: 27, 
      name: "Egg Pulao",
      tagline: "Simple rice with eggs",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "4 eggs, boiled",
        "2 cups rice",
        "1 onion, sliced",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "2 cloves",
        "1 cardamom",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak rice for 30 minutes.",
        "Heat oil, add whole spices and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add 3 cups water and salt. Bring to boil.",
        "Add rice and cook until done.",
        "Gently mix in boiled eggs.",
        "Serve hot with raita."
      ]
    },

    // ==================== EGG PARATHAS (3) ====================
    { 
      id: 28, 
      name: "Anda Paratha",
      tagline: "Stuffed egg paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 eggs",
        "2 cups whole wheat flour",
        "1 onion, finely chopped",
        "2 green chilies, chopped",
        "1/2 tsp red chili powder",
        "Salt to taste",
        "Oil for cooking"
      ],
      steps: [
        "Knead dough with flour, salt and water. Rest for 30 minutes.",
        "Beat eggs with onion, chilies, red chili and salt.",
        "Roll out dough into circle.",
        "Pour egg mixture on half, fold and seal edges.",
        "Cook on tawa with oil until golden on both sides.",
        "Serve hot with yogurt or pickle."
      ]
    },
    { 
      id: 29, 
      name: "Egg Cheese Paratha",
      tagline: "Stuffed egg and cheese paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 eggs",
        "2 cups flour",
        "1/4 cup grated cheese",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "Salt to taste",
        "Oil for cooking"
      ],
      steps: [
        "Prepare dough and rest.",
        "Beat eggs with onion, chilies, cheese and salt.",
        "Roll dough, fill with egg mixture, seal and roll again.",
        "Cook on tawa with oil until golden.",
        "Serve hot."
      ]
    },
    { 
      id: 30, 
      name: "Egg Keema Paratha",
      tagline: "Egg and mince stuffed paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 eggs",
        "2 cups flour",
        "100g chicken mince, cooked",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1/2 tsp red chili",
        "Salt to taste",
        "Oil for cooking"
      ],
      steps: [
        "Prepare dough.",
        "Beat eggs with cooked mince, onion, chilies and spices.",
        "Stuff in dough, roll and cook on tawa.",
        "Serve hot with raita."
      ]
    },

    // ==================== EGG SANDWICHES (2) ====================
    { 
      id: 31, 
      name: "Egg Sandwich",
      tagline: "Classic egg sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "4 eggs, scrambled",
        "8 bread slices",
        "2 tbsp butter",
        "Salt and pepper to taste",
        "Lettuce leaves"
      ],
      steps: [
        "Prepare scrambled eggs with salt and pepper.",
        "Butter bread slices.",
        "Place scrambled eggs and lettuce between two slices.",
        "Grill if desired and serve."
      ]
    },
    { 
      id: 32, 
      name: "Egg Mayo Sandwich",
      tagline: "Egg mayonnaise sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "4 eggs, boiled and mashed",
        "4 tbsp mayonnaise",
        "8 bread slices",
        "2 tbsp butter",
        "Salt and pepper to taste",
        "Lettuce"
      ],
      steps: [
        "Mix mashed eggs with mayonnaise, salt and pepper.",
        "Butter bread slices.",
        "Spread egg mixture on bread, add lettuce.",
        "Cover with another slice and serve."
      ]
    },

    // ==================== EGG APPETIZERS (3) ====================
    { 
      id: 33, 
      name: "Egg Pakora",
      tagline: "Deep fried egg fritters",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "4 eggs, boiled",
        "1 cup besan",
        "1 onion, sliced",
        "2 green chilies, chopped",
        "1/2 tsp red chili",
        "1/2 tsp ajwain",
        "Salt to taste",
        "Oil for frying"
      ],
      steps: [
        "Mix besan with water to make thick batter.",
        "Add onions, chilies, red chili, ajwain and salt.",
        "Dip boiled eggs in batter and deep fry until golden.",
        "Cut into halves and serve with chutney."
      ]
    },
    { 
      id: 34, 
      name: "Egg Devil",
      tagline: "Spicy fried eggs",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "6 eggs, boiled",
        "1 cup breadcrumbs",
        "2 eggs, beaten",
        "1 tsp red chili powder",
        "1/2 tsp pepper",
        "Salt to taste",
        "Oil for frying"
      ],
      steps: [
        "Cut boiled eggs in half.",
        "Mix breadcrumbs with red chili, pepper and salt.",
        "Dip eggs in beaten egg, then in breadcrumbs.",
        "Deep fry until golden.",
        "Serve hot with sauce."
      ]
    },
    { 
      id: 35, 
      name: "Egg Cutlet",
      tagline: "Egg and potato cutlets",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "4 eggs, boiled and mashed",
        "2 potatoes, boiled and mashed",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1/2 tsp red chili",
        "1/2 tsp garam masala",
        "Salt to taste",
        "Breadcrumbs for coating",
        "Oil for frying"
      ],
      steps: [
        "Mix mashed eggs and potatoes with onions, chilies and spices.",
        "Shape into cutlets.",
        "Coat with breadcrumbs.",
        "Shallow fry until golden.",
        "Serve with ketchup."
      ]
    }
  ];

  // Combine all arrays
  const allEggRecipes = [...eggRecipes, ...moreEggRecipes, ...finalEggRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allEggRecipes;

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
    <div className="egg-page">
      {/* Header */}
      <header className="egg-header">
        <div className="egg-header-content">
          <h1 className="egg-title">🥚 Egg Dishes</h1>
          <p className="egg-description">
            Discover 35+ delicious egg recipes - curries, masala, bhurji aur bhi bahut kuch
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="egg-main">
        <div className="egg-grid-section">
          <div className="egg-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="egg-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="egg-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="egg-card-content">
                  <h3 className="egg-card-title">{recipe.name}</h3>
                  <p className="egg-card-description">{recipe.tagline}</p>
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
        <div className="egg-modal-overlay" onClick={handleCloseModal}>
          <div
            className="egg-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="egg-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="egg-modal-header">
              <div className="egg-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="egg-modal-content">
              {/* Column 1: Ingredients */}
              <div className="egg-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="egg-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="egg-ingredient-item">
                      <span className="egg-ingredient-bullet">•</span>
                      <span className="egg-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="egg-modal-steps">
                <h3>Steps to Make</h3>
                <div className="egg-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="egg-step-item">
                      <span className="egg-step-number">{index + 1}.</span>
                      <span className="egg-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="egg-modal-voice-container">
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

export default RecipesEggDishes;