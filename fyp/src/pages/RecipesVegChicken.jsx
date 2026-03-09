import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesVegChicken.css';

const RecipesVegChicken = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Chicken + Vegetables Recipes (60+ recipes)
  const chickenVegRecipes = [
    // ==================== CHICKEN + ALOO BASED (8) ====================
    { 
      id: 1, 
      name: "Chicken Aloo",
      tagline: "Classic chicken and potato curry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken, cut into pieces",
        "3 potatoes, cubed",
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
        "Add ginger-garlic paste and cook for 2 minutes until raw smell goes away.",
        "Add chicken pieces and fry on high heat for 5-7 minutes until color changes.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add potatoes and 1 cup water. Stir well.",
        "Cover and cook on medium heat for 25-30 minutes until chicken and potatoes are tender.",
        "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
        "Serve hot with naan or roti."
      ]
    },
    { 
      id: 2, 
      name: "Chicken Aloo Matar",
      tagline: "Chicken with potatoes and peas",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, curry cut",
        "2 potatoes, cubed",
        "1 cup green peas",
        "2 onions, chopped",
        "2 tomatoes, pureed",
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
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry until white and slightly browned.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add potatoes and 1 cup water. Cover and cook for 15 minutes.",
        "Add peas and cook for another 10 minutes until everything is tender.",
        "Sprinkle garam masala and garnish with fresh coriander.",
        "Serve hot with naan or roti."
      ]
    },
    { 
      id: 3, 
      name: "Chicken Aloo Baingan",
      tagline: "Chicken with potato and eggplant",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g chicken, pieces",
        "2 potatoes, cubed",
        "2 eggplants, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add potatoes and 1/2 cup water. Cook for 10 minutes.",
        "Add eggplants and mix gently. Cover and cook for 15 minutes.",
        "Garnish with coriander and serve hot."
      ]
    },
    { 
      id: 4, 
      name: "Chicken Aloo Shimla Mirch",
      tagline: "Chicken with potato and capsicum",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken, boneless cubes",
        "2 potatoes, cubed",
        "2 capsicum, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
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
        "Add chicken and fry until white.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add potatoes and 1/2 cup water. Cook for 15 minutes.",
        "Add capsicum and cook for 5-7 minutes.",
        "Sprinkle garam masala and serve hot."
      ]
    },
    { 
      id: 5, 
      name: "Chicken Aloo Gobhi",
      tagline: "Chicken with potato and cauliflower",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "500g chicken, pieces",
        "2 potatoes, cubed",
        "1 cauliflower, florets",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add potatoes and 1 cup water. Cook for 15 minutes.",
        "Add cauliflower and cook for 10-12 minutes until tender.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 6, 
      name: "Chicken Aloo Palak",
      tagline: "Chicken with potato and spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken, pieces",
        "2 potatoes, cubed",
        "500g spinach, blanched and pureed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add potatoes and 1/2 cup water. Cook for 15 minutes.",
        "Add spinach puree and mix well. Simmer for 10 minutes.",
        "Sprinkle garam masala and serve hot."
      ]
    },
    { 
      id: 7, 
      name: "Chicken Aloo Tamatar",
      tagline: "Chicken with potato and tomato gravy",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken, pieces",
        "2 potatoes, cubed",
        "4 tomatoes, chopped",
        "2 onions, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until mushy (about 8-10 minutes).",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add potatoes and 1 cup water. Cover and cook until tender.",
        "Serve hot with roti or naan."
      ]
    },
    { 
      id: 8, 
      name: "Chicken Aloo Beans",
      tagline: "Chicken with potato and beans",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken, boneless cubes",
        "2 potatoes, sliced",
        "200g green beans, chopped",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1/2 cup water. Cook for 10 minutes.",
        "Add beans and cook for 10 more minutes.",
        "Serve hot with roti."
      ]
    },

    // ==================== CHICKEN + MATAR BASED (5) ====================
    { 
      id: 9, 
      name: "Chicken Matar",
      tagline: "Classic chicken and peas curry",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, pieces",
        "1 cup green peas",
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
        "Fresh coriander"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry until white and slightly browned.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add 1 cup water, cover and cook for 20 minutes until chicken is almost done.",
        "Add peas and cook for another 10 minutes.",
        "Sprinkle garam masala and garnish with fresh coriander.",
        "Serve hot with naan or roti."
      ]
    },
    { 
      id: 10, 
      name: "Chicken Matar Malai",
      tagline: "Creamy chicken with peas",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "500g chicken, boneless cubes",
        "1 cup green peas",
        "1 cup cream",
        "2 onions, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp white pepper",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry until white.",
        "Add white pepper and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add peas and cook for 5 minutes.",
        "Add cream and simmer for 5 minutes (don't boil).",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 11, 
      name: "Chicken Matar Pulao",
      tagline: "Chicken and peas rice pilaf",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g chicken, pieces",
        "1 cup peas",
        "2 cups basmati rice",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon stick",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak rice for 30 minutes.",
        "Heat oil, add whole spices and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add salt and 3 cups water. Cook until chicken is half done.",
        "Add rice and peas. Cover and cook on low heat until rice is done.",
        "Sprinkle garam masala and serve with raita."
      ]
    },
    { 
      id: 12, 
      name: "Chicken Matar Korma",
      tagline: "Rich chicken and peas korma",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "1 cup peas",
        "1 cup yogurt",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, fry onions until golden. Remove half for garnish.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add spices and salt. Mix well.",
        "Add beaten yogurt slowly, stirring continuously.",
        "Add 1/2 cup water and cook for 20 minutes.",
        "Add peas and cook for 10 minutes.",
        "Garnish with fried onions and serve."
      ]
    },
    { 
      id: 13, 
      name: "Chicken Matar Keema",
      tagline: "Chicken mince with peas",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      ingredients: [
        "500g chicken mince",
        "1 cup peas",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken mince and fry until color changes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add peas and cook for 10 minutes.",
        "Serve with naan or paratha."
      ]
    },

    // ==================== CHICKEN + PALAK BASED (4) ====================
    { 
      id: 14, 
      name: "Chicken Palak",
      tagline: "Chicken in spinach gravy",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken, pieces",
        "500g spinach, blanched and pureed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add spinach puree and simmer for 10 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 15, 
      name: "Chicken Palak Malai",
      tagline: "Creamy chicken spinach curry",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken, boneless",
        "500g spinach, pureed",
        "1 cup cream",
        "2 onions, chopped",
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
        "Add chicken and fry for 5 minutes.",
        "Add turmeric, red chili powder and salt.",
        "Add spinach puree and cook for 10 minutes.",
        "Add cream and simmer for 5 minutes.",
        "Sprinkle garam masala and serve with naan."
      ]
    },
    { 
      id: 16, 
      name: "Chicken Palak Aloo",
      tagline: "Chicken with spinach and potato",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "2 potatoes, cubed",
        "500g spinach, pureed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1 cup water. Cook for 15 minutes.",
        "Add spinach puree and cook for 10 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 17, 
      name: "Chicken Palak Matar",
      tagline: "Chicken with spinach and peas",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "1 cup peas",
        "500g spinach, pureed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add peas and spinach puree. Cook for 10 minutes.",
        "Serve with roti."
      ]
    },

    // ==================== CHICKEN + SHIMLA MIRCH BASED (4) ====================
    { 
      id: 18, 
      name: "Chicken Shimla Mirch",
      tagline: "Chicken with capsicum",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken, boneless cubes",
        "3 capsicum, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
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
        "Add chicken and fry until white.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add capsicum and cook for 5-7 minutes.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 19, 
      name: "Chicken Shimla Mirch Aloo",
      tagline: "Chicken with capsicum and potato",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "2 potatoes, cubed",
        "2 capsicum, cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1/2 cup water. Cook for 15 minutes.",
        "Add capsicum and cook for 5 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 20, 
      name: "Chicken Shimla Mirch Matar",
      tagline: "Chicken with capsicum and peas",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "2 capsicum, cubed",
        "1 cup peas",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add peas and cook for 5 minutes.",
        "Add capsicum and cook for 5 more minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 21, 
      name: "Chicken Shimla Mirch Pyaz",
      tagline: "Chicken with capsicum and onion",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "2 capsicum, sliced",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp soy sauce",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and half the onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Cook for 15 minutes until chicken is done.",
        "Add capsicum and remaining onions. Cook for 5 minutes.",
        "Serve hot with roti."
      ]
    },

    // ==================== CHICKEN + GOBHI BASED (3) ====================
    { 
      id: 22, 
      name: "Chicken Gobhi",
      tagline: "Chicken with cauliflower",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "500g chicken",
        "1 cauliflower, florets",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add cauliflower and cook for 10-12 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 23, 
      name: "Chicken Gobhi Aloo",
      tagline: "Chicken with cauliflower and potato",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "500g chicken",
        "1 cauliflower, florets",
        "2 potatoes, cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1 cup water. Cook for 15 minutes.",
        "Add cauliflower and cook for 10 minutes.",
        "Serve with roti."
      ]
    },
    { 
      id: 24, 
      name: "Chicken Gobhi Matar",
      tagline: "Chicken with cauliflower and peas",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "500g chicken",
        "1 cauliflower, florets",
        "1 cup peas",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1 cup water and cook for 15 minutes.",
        "Add cauliflower and peas. Cook for 10 minutes.",
        "Serve hot."
      ]
    },

    // ==================== CHICKEN + BAINGAN BASED (3) ====================
    { 
      id: 25, 
      name: "Chicken Baingan",
      tagline: "Chicken with eggplant",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g chicken",
        "2 eggplants, cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add eggplants and mix gently. Cook for 10 minutes.",
        "Serve hot with roti."
      ]
    },
    { 
      id: 26, 
      name: "Chicken Baingan Aloo",
      tagline: "Chicken with eggplant and potato",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g chicken",
        "2 eggplants, cubed",
        "2 potatoes, cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1/2 cup water. Cook for 15 minutes.",
        "Add eggplants and cook for 10 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 27, 
      name: "Chicken Baingan Bharta",
      tagline: "Chicken with mashed eggplant",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g chicken, minced",
        "2 eggplants, roasted and mashed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 green chilies, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Roast eggplants on flame, peel and mash. Set aside.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken mince and fry until white.",
        "Add tomatoes and green chilies. Cook until soft.",
        "Add spices and salt. Mix well.",
        "Add mashed eggplant and cook for 10 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },

    // ==================== CHICKEN + TORI/LOUKI BASED (3) ====================
    { 
      id: 28, 
      name: "Chicken Tori",
      tagline: "Chicken with ridge gourd",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "500g tori, peeled and cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add tori and cook for 10-12 minutes.",
        "Serve hot with roti."
      ]
    },
    { 
      id: 29, 
      name: "Chicken Louki",
      tagline: "Chicken with bottle gourd",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "500g louki, peeled and cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add louki and cook for 15 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 30, 
      name: "Chicken Tori Aloo",
      tagline: "Chicken with ridge gourd and potato",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "400g tori, cubed",
        "2 potatoes, cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1/2 cup water. Cook for 10 minutes.",
        "Add tori and cook for 10-12 minutes.",
        "Serve hot."
      ]
    }
  ];
    // ==================== PART 2 - MORE RECIPES (30 more) ====================
  
  // Add these after the first 30 recipes, before the functions
  
  const moreChickenVegRecipes = [
    // ==================== CHICKEN + KARELA BASED (3) ====================
    { 
      id: 31, 
      name: "Chicken Karela",
      tagline: "Chicken with bitter gourd",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g chicken",
        "3 karela, sliced",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp amchur powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Rub karela with salt, keep for 30 mins, rinse and squeeze.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add karela and cook for 10-12 minutes.",
        "Sprinkle amchur and serve."
      ]
    },
    { 
      id: 32, 
      name: "Chicken Karela Aloo",
      tagline: "Chicken with bitter gourd and potato",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g chicken",
        "2 karela, sliced",
        "2 potatoes, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp amchur",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Rub karela with salt, rinse and squeeze.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1/2 cup water. Cook for 15 minutes.",
        "Add karela and cook for 10 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 33, 
      name: "Chicken Karela Masala",
      tagline: "Spicy chicken with bitter gourd",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "500g chicken",
        "3 karela, sliced",
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
        "Rub karela with salt, rinse and squeeze.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add spices and salt. Mix well.",
        "Add 1 cup water and cook for 20 minutes.",
        "Add karela and cook for 10 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },

    // ==================== CHICKEN + METHI BASED (3) ====================
    { 
      id: 34, 
      name: "Chicken Methi",
      tagline: "Chicken with fenugreek leaves",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "1 bunch methi, chopped",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add methi and cook for 5-7 minutes.",
        "Serve hot with roti."
      ]
    },
    { 
      id: 35, 
      name: "Chicken Methi Malai",
      tagline: "Creamy chicken with fenugreek",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken, boneless",
        "1 bunch methi, chopped",
        "1 cup cream",
        "2 onions, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp white pepper",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add white pepper and salt.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add methi and cook for 5 minutes.",
        "Add cream and simmer for 5 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 36, 
      name: "Chicken Methi Aloo",
      tagline: "Chicken with fenugreek and potato",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "1 bunch methi, chopped",
        "2 potatoes, cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1 cup water. Cook for 15 minutes.",
        "Add methi and cook for 5 minutes.",
        "Serve hot."
      ]
    },

    // ==================== CHICKEN + BEANS BASED (3) ====================
    { 
      id: 37, 
      name: "Chicken Beans",
      tagline: "Chicken with green beans",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "200g beans, chopped",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add beans and cook for 10 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 38, 
      name: "Chicken Beans Aloo",
      tagline: "Chicken with beans and potato",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "200g beans, chopped",
        "2 potatoes, cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1 cup water. Cook for 15 minutes.",
        "Add beans and cook for 10 minutes.",
        "Serve with roti."
      ]
    },
    { 
      id: 39, 
      name: "Chicken Beans Matar",
      tagline: "Chicken with beans and peas",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "200g beans, chopped",
        "1 cup peas",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1 cup water and cook for 15 minutes.",
        "Add beans and peas. Cook for 10 minutes.",
        "Serve hot."
      ]
    },

    // ==================== CHICKEN + TINDA/KERA BASED (3) ====================
    { 
      id: 40, 
      name: "Chicken Tinday",
      tagline: "Chicken with apple gourd",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "500g tinday, peeled and cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add tinday and cook for 15 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 41, 
      name: "Chicken Keray",
      tagline: "Chicken with ivory gourd",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "500g keray, peeled and cubed",
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
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add keray and cook for 15 minutes.",
        "Serve with roti."
      ]
    },
    { 
      id: 42, 
      name: "Chicken Kaddu",
      tagline: "Chicken with pumpkin",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "500g kaddu, cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tbsp jaggery",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add kaddu and jaggery. Cook for 15 minutes.",
        "Serve hot."
      ]
    },

    // ==================== CHICKEN + ARVI BASED (2) ====================
    { 
      id: 43, 
      name: "Chicken Arvi",
      tagline: "Chicken with colocasia",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "500g arvi, boiled and peeled",
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
        "Boil arvi until tender, peel and slice.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add 1/2 cup water and cook for 15 minutes.",
        "Add arvi and cook for 10 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 44, 
      name: "Chicken Arvi Aloo",
      tagline: "Chicken with colocasia and potato",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "300g arvi, boiled",
        "2 potatoes, cubed",
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
        "Boil arvi until tender, peel and slice.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1 cup water. Cook for 15 minutes.",
        "Add arvi and cook for 10 minutes.",
        "Serve hot."
      ]
    },

    // ==================== CHICKEN + MIX VEGETABLES (6) ====================
    { 
      id: 45, 
      name: "Chicken Mix Vegetable",
      tagline: "Chicken with mixed vegetables",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "1 cup cauliflower florets",
        "1 cup peas",
        "1 cup carrots, cubed",
        "1 cup beans, chopped",
        "2 potatoes, cubed",
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
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add spices and salt. Mix well.",
        "Add potatoes and 1 cup water. Cook for 10 minutes.",
        "Add all other vegetables and cook for 15 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 46, 
      name: "Chicken Jalfrezi",
      tagline: "Chicken with mixed veggies in thick gravy",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken, boneless cubes",
        "1 capsicum, cubed",
        "1 carrot, sliced",
        "1 onion, sliced",
        "1 tomato, sliced",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "1 tbsp soy sauce"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until soft.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry until white.",
        "Add spices and salt. Mix well.",
        "Add all vegetables and stir-fry on high heat for 5 minutes.",
        "Add soy sauce and 1/4 cup water.",
        "Cook for 5-7 minutes until vegetables are tender-crisp.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 47, 
      name: "Chicken Karahi with Veggies",
      tagline: "Traditional karahi with vegetables",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken, with bones",
        "2 tomatoes, chopped",
        "2 green chilies, slit",
        "1 capsicum, sliced",
        "1 onion, sliced",
        "1 tbsp ginger, julienned",
        "1 tsp cumin seeds",
        "1 tsp red chili flakes",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil in a wok (karahi). Add chicken and fry until white.",
        "Add ginger and green chilies. Fry for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili flakes, cumin and salt.",
        "Cook on high heat until oil separates.",
        "Add capsicum and onion. Cook for 3-4 minutes.",
        "Sprinkle garam masala and coriander.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 48, 
      name: "Chicken Handi with Veg",
      tagline: "Slow-cooked chicken with vegetables",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "1 cup mixed vegetables",
        "1 cup yogurt",
        "2 onions, chopped",
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
        "Add chicken and fry for 5 minutes.",
        "Add spices and salt. Mix well.",
        "Add beaten yogurt slowly, stirring continuously.",
        "Add 1/2 cup water and cook for 20 minutes.",
        "Add vegetables and cook for 15 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 49, 
      name: "Chicken Vegetable Curry",
      tagline: "Simple chicken and vegetable curry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "2 cups mixed vegetables",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp coriander powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add spices and salt. Mix well.",
        "Add 1 cup water and cook for 15 minutes.",
        "Add vegetables and cook for 15 minutes.",
        "Serve with rice or roti."
      ]
    },
    { 
      id: 50, 
      name: "Chicken Vegetable Korma",
      tagline: "Rich korma with vegetables",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken",
        "1 cup mixed vegetables",
        "1 cup yogurt",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, fry onions until golden. Remove half for garnish.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add spices and salt. Mix well.",
        "Add beaten yogurt slowly, stirring continuously.",
        "Add 1/2 cup water and cook for 20 minutes.",
        "Add vegetables and cook for 15 minutes.",
        "Garnish with fried onions and serve."
      ]
    },

    // ==================== CHICKEN + SEASONAL VEGETABLES (5) ====================
    { 
      id: 51, 
      name: "Chicken Saag",
      tagline: "Chicken with mustard greens",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "500g mustard greens, chopped",
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
        "Boil mustard greens until soft, blend to coarse paste.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add saag and 1/2 cup water. Cook for 20 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 52, 
      name: "Chicken Sarson Ka Saag",
      tagline: "Punjabi style chicken with mustard greens",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g chicken",
        "500g sarson (mustard greens)",
        "100g bathua (optional)",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp cornmeal",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Boil greens until soft, blend to coarse paste.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spices and salt. Mix well.",
        "Add saag and cornmeal mixed with water.",
        "Simmer for 30 minutes, stirring occasionally.",
        "Serve with makai ki roti."
      ]
    },
    { 
      id: 53, 
      name: "Chicken Kaddu Ka Bharta",
      tagline: "Mashed pumpkin with chicken",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken, minced",
        "500g kaddu, roasted and mashed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 green chilies, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Roast kaddu pieces in oven or on tawa until soft. Peel and mash.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken mince and fry until white.",
        "Add tomatoes and green chilies. Cook until soft.",
        "Add spices and salt. Mix well.",
        "Add mashed kaddu and cook for 10 minutes.",
        "Sprinkle garam masala and serve."
      ]
    },
    { 
      id: 54, 
      name: "Chicken Lauki Kofta",
      tagline: "Chicken with bottle gourd dumplings",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g chicken, minced",
        "500g lauki, grated",
        "1 cup besan",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "Oil for frying",
        "Salt to taste"
      ],
      steps: [
        "Mix grated lauki with besan, salt and spices to make kofta mixture.",
        "Shape into small balls and deep fry until golden. Set aside.",
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken mince and fry until white.",
        "Add tomato puree and cook until oil separates.",
        "Add spices and 2 cups water to make gravy.",
        "Add fried kofta and simmer for 10 minutes.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 55, 
      name: "Chicken Vegetable Pulao",
      tagline: "Fragrant rice with chicken and veggies",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g chicken, pieces",
        "2 cups basmati rice",
        "1 cup mixed vegetables",
        "2 onions, sliced",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon stick",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash and soak rice for 30 minutes.",
        "Heat oil, add whole spices and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5 minutes.",
        "Add vegetables and salt. Cook for 5 minutes.",
        "Add 3 cups water and bring to boil.",
        "Add rice and cook until water is absorbed.",
        "Reduce heat, cover and cook for 15 minutes.",
        "Garnish with coriander and serve with raita."
      ]
    }
  ];

  // Combine both arrays
  const allChickenVegRecipes = [...chickenVegRecipes, ...moreChickenVegRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allChickenVegRecipes;

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
    <div className="chicken-veg-page">
      {/* Header */}
      <header className="chicken-veg-header">
        <div className="chicken-veg-header-content">
          <h1 className="chicken-veg-title">🍗 Chicken + Vegetables</h1>
          <p className="chicken-veg-description">
            Discover 55+ delicious chicken and vegetable recipes - perfect for a hearty meal
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="chicken-veg-main">
        <div className="chicken-veg-grid-section">
          <div className="chicken-veg-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="chicken-veg-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="chicken-veg-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="chicken-veg-card-content">
                  <h3 className="chicken-veg-card-title">{recipe.name}</h3>
                  <p className="chicken-veg-card-description">{recipe.tagline}</p>
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
        <div className="chicken-veg-modal-overlay" onClick={handleCloseModal}>
          <div
            className="chicken-veg-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="chicken-veg-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="chicken-veg-modal-header">
              <div className="chicken-veg-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="chicken-veg-modal-content">
              {/* Column 1: Ingredients */}
              <div className="chicken-veg-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="chicken-veg-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="chicken-veg-ingredient-item">
                      <span className="chicken-veg-ingredient-bullet">•</span>
                      <span className="chicken-veg-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="chicken-veg-modal-steps">
                <h3>Steps to Make</h3>
                <div className="chicken-veg-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="chicken-veg-step-item">
                      <span className="chicken-veg-step-number">{index + 1}.</span>
                      <span className="chicken-veg-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="chicken-veg-modal-voice-container">
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

export default RecipesVegChicken;