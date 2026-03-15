import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesFish.css';

const RecipesFish = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Fish Recipes (35+ recipes)
  const fishRecipes = [
    // ==================== FISH CURRIES (8) ====================
    { 
      id: 1, 
      name: "Fish Curry",
      tagline: "Classic Pakistani fish curry",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish fillets (rohu or any firm fish)",
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
        "2 green chilies, slit",
        "1 cup water"
      ],
      steps: [
        "Clean and wash fish pieces. Apply salt and turmeric, set aside for 15 minutes.",
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add 1 cup water and bring to boil. Simmer for 5 minutes.",
        "Gently add fish pieces and cook for 8-10 minutes.",
        "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
        "Serve hot with rice."
      ]
    },
    { 
      id: 2, 
      name: "Fish Masala",
      tagline: "Spicy fish masala gravy",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
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
        "Marinate fish with turmeric and salt.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add red chili powder and salt.",
        "Add 1 cup water and simmer for 5 minutes.",
        "Add fish and cook for 8-10 minutes.",
        "Sprinkle garam masala and coriander. Serve."
      ]
    },
    { 
      id: 3, 
      name: "Fish Curry with Coconut",
      tagline: "South Indian style fish curry",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
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
        "Add coconut milk and simmer for 5 minutes.",
        "Add fish and cook for 8-10 minutes.",
        "Serve with rice."
      ]
    },
    { 
      id: 4, 
      name: "Fish Kadhai",
      tagline: "Kadhai style fish curry",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 capsicum, sliced",
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
        "Add tomatoes and capsicum. Cook until soft.",
        "Add turmeric, red chili, coriander powder and salt.",
        "Add 1/2 cup water and simmer.",
        "Add fish and cook for 8-10 minutes.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 5, 
      name: "Fish Do Pyaza",
      tagline: "Fish with double onions",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
        "2 large onions, sliced",
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
        "Add tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt.",
        "Add 1/2 cup water and simmer.",
        "Add fish and remaining onions.",
        "Cook for 8-10 minutes, add garam masala and serve."
      ]
    },
    { 
      id: 6, 
      name: "Fish Jalfrezi",
      tagline: "Fish with mixed veggies",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish, boneless cubes",
        "1 capsicum, sliced",
        "1 onion, sliced",
        "1 tomato, sliced",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "1/2 cup oil",
        "Salt to taste",
        "1 tbsp soy sauce"
      ],
      steps: [
        "Lightly fry fish cubes and set aside.",
        "Heat oil, add cumin seeds and onions. Sauté for 2 minutes.",
        "Add ginger-garlic paste and cook for 1 minute.",
        "Add capsicum and tomato. Stir fry for 2 minutes.",
        "Add turmeric, red chili, salt and soy sauce.",
        "Add fried fish and mix gently.",
        "Serve hot."
      ]
    },
    { 
      id: 7, 
      name: "Fish Malai Curry",
      tagline: "Creamy fish curry",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
        "1 cup cream",
        "2 onions, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp white pepper",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add cumin seeds and onions. Sauté until soft.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add turmeric, white pepper and salt.",
        "Add 1/2 cup water and simmer.",
        "Add fish and cook for 5 minutes.",
        "Add cream and simmer for 5 minutes.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 8, 
      name: "Fish Kofta Curry",
      tagline: "Fish balls in spicy gravy",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish, minced",
        "1 onion, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin powder",
        "1 tsp red chili powder",
        "1 egg",
        "2 tbsp breadcrumbs",
        "For gravy: 2 onions, 2 tomatoes",
        "Oil for frying",
        "Salt to taste"
      ],
      steps: [
        "Mix minced fish with onion, ginger-garlic, spices, egg and breadcrumbs.",
        "Shape into small balls and deep fry until golden.",
        "Prepare onion-tomato gravy as base.",
        "Add fried kofta to gravy and simmer for 10 minutes.",
        "Serve hot with rice."
      ]
    },

    // ==================== FISH FRY (5) ====================
    { 
      id: 9, 
      name: "Fish Fry",
      tagline: "Crispy fried fish",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish fillets",
        "1 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1/2 tsp turmeric",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tbsp lemon juice",
        "Salt to taste",
        "Oil for frying",
        "1/2 cup rice flour or semolina"
      ],
      steps: [
        "Clean fish and make slits.",
        "Mix all spices with lemon juice to make marinade.",
        "Apply marinade to fish and rest for 30 minutes.",
        "Coat with rice flour or semolina.",
        "Heat oil and shallow fry until golden and crispy on both sides.",
        "Serve hot with mint chutney."
      ]
    },
    { 
      id: 10, 
      name: "Karachi Fish Fry",
      tagline: "Famous Karachi style fish fry",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish slices",
        "1 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1/2 tsp turmeric",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1 tbsp lemon juice",
        "Salt to taste",
        "1/2 cup chickpea flour",
        "2 tbsp rice flour",
        "Oil for frying"
      ],
      steps: [
        "Marinate fish with spices and lemon juice for 30 minutes.",
        "Mix chickpea flour and rice flour with water to make thick batter.",
        "Dip fish in batter and deep fry until golden and crispy.",
        "Serve hot with raita and salad."
      ]
    },
    { 
      id: 11, 
      name: "Tawa Fish Fry",
      tagline: "Griddle fried fish",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
        "1 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1/2 tsp turmeric",
        "1 tsp fish masala",
        "1 tbsp lemon juice",
        "Salt to taste",
        "Oil for frying"
      ],
      steps: [
        "Marinate fish with spices for 30 minutes.",
        "Heat oil on tawa/griddle.",
        "Place fish and cook on medium heat.",
        "Flip carefully and cook other side until golden.",
        "Serve hot with onion rings and lemon."
      ]
    },
    { 
      id: 12, 
      name: "Andhra Fish Fry",
      tagline: "Spicy Andhra style fish fry",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
        "2 tbsp ginger-garlic paste",
        "2 tsp red chili powder",
        "1/2 tsp turmeric",
        "1 tsp cumin powder",
        "1 tsp pepper powder",
        "1 tbsp lemon juice",
        "Salt to taste",
        "Oil for frying"
      ],
      steps: [
        "Marinate fish with all spices for 1 hour.",
        "Heat oil in pan.",
        "Shallow fry until crispy and golden.",
        "Serve hot with onion slices."
      ]
    },
    { 
      id: 13, 
      name: "Fish Finger",
      tagline: "Crispy fish fingers",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish fillets, cut into strips",
        "1 cup all-purpose flour",
        "2 eggs, beaten",
        "1 cup breadcrumbs",
        "1 tsp red chili powder",
        "1/2 tsp pepper",
        "Salt to taste",
        "Oil for deep frying"
      ],
      steps: [
        "Season fish strips with salt and pepper.",
        "Coat in flour, dip in egg, then coat in breadcrumbs.",
        "Repeat for double coating if desired.",
        "Deep fry until golden and crispy.",
        "Serve with tartar sauce or ketchup."
      ]
    }
  ];
    // More recipes continue...
  const moreFishRecipes = [
    // ==================== FISH TIKKA (4) ====================
    { 
      id: 14, 
      name: "Fish Tikka",
      tagline: "Grilled fish tikka",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish cubes",
        "1/2 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1 tbsp lemon juice",
        "2 tbsp oil",
        "Salt to taste",
        "1 capsicum, cubed",
        "1 onion, cubed"
      ],
      steps: [
        "Mix yogurt with all spices, ginger-garlic, lemon juice and oil.",
        "Add fish cubes and marinate for 2 hours.",
        "Thread fish onto skewers alternating with capsicum and onion.",
        "Grill in oven or on tawa until charred and cooked.",
        "Brush with oil while cooking.",
        "Serve hot with mint chutney."
      ]
    },
    { 
      id: 15, 
      name: "Malai Fish Tikka",
      tagline: "Creamy malai fish tikka",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish cubes",
        "1/2 cup cream",
        "2 tbsp ginger-garlic paste",
        "2 tbsp green chili paste",
        "1 tsp white pepper",
        "1 tsp garam masala",
        "1 tbsp lemon juice",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Mix cream with all spices and pastes.",
        "Marinate fish for 2 hours.",
        "Skewer and grill until cooked.",
        "Serve hot with salad."
      ]
    },
    { 
      id: 16, 
      name: "Hariyali Fish Tikka",
      tagline: "Green marinated fish tikka",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
        "1 cup mint-coriander chutney",
        "2 tbsp ginger-garlic paste",
        "2 green chilies",
        "1 tsp cumin powder",
        "1 tsp chaat masala",
        "1 tbsp lemon juice",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Grind mint, coriander, chilies to make paste.",
        "Mix with ginger-garlic, spices and oil.",
        "Marinate fish for 2 hours.",
        "Grill until done.",
        "Sprinkle chaat masala and serve."
      ]
    },
    { 
      id: 17, 
      name: "Fish Tikka Boti",
      tagline: "Boneless fish tikka pieces",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish boneless cubes",
        "1/2 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1 tsp tandoori masala",
        "1 tbsp mustard oil",
        "Salt to taste"
      ],
      steps: [
        "Mix all ingredients and marinate for 2 hours.",
        "Grill on skewers or in oven.",
        "Serve with onion rings and lemon."
      ]
    },

    // ==================== FISH PULAO/BIRYANI (3) ====================
    { 
      id: 18, 
      name: "Fish Pulao",
      tagline: "Fragrant rice with fish",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g fish, fried",
        "2 cups basmati rice",
        "2 onions, sliced",
        "2 tomatoes, chopped",
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
        "Add tomatoes and cook until soft.",
        "Add 3 cups water and salt. Bring to boil.",
        "Add rice and cook until 70% done.",
        "Layer with fried fish and garam masala.",
        "Cover and dum for 15 minutes.",
        "Serve with raita."
      ]
    },
    { 
      id: 19, 
      name: "Fish Biryani",
      tagline: "Spicy fish biryani",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g fish, fried",
        "2 cups basmati rice",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
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
        "Cook rice with whole spices until 70% done.",
        "Prepare masala with onions, tomatoes and ginger-garlic.",
        "Layer in pot: rice, masala, fried fish.",
        "Repeat layers, add saffron milk and coriander.",
        "Cover and dum for 20 minutes.",
        "Serve with raita."
      ]
    },
    { 
      id: 20, 
      name: "Fish Fried Rice",
      tagline: "Chinese style fish fried rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "250g fish, boneless cubes",
        "2 cups cooked rice",
        "1 onion, chopped",
        "1/2 cup carrots, diced",
        "1/2 cup peas",
        "2 tbsp soy sauce",
        "1 tbsp oil",
        "Salt to taste",
        "Spring onions"
      ],
      steps: [
        "Lightly fry fish cubes and set aside.",
        "Heat oil, add onions and vegetables. Stir fry for 2 minutes.",
        "Add rice and mix well.",
        "Add soy sauce and salt.",
        "Add fried fish and mix gently.",
        "Garnish with spring onions and serve."
      ]
    },

    // ==================== FISH PAKORA (2) ====================
    { 
      id: 21, 
      name: "Fish Pakora",
      tagline: "Crispy fish fritters",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish, boneless cubes",
        "1 cup besan",
        "1 tbsp ginger-garlic paste",
        "1 tsp red chili powder",
        "1/2 tsp turmeric",
        "1 tsp ajwain",
        "Salt to taste",
        "Oil for frying"
      ],
      steps: [
        "Mix besan with spices, ginger-garlic and water to make batter.",
        "Dip fish cubes in batter.",
        "Deep fry until golden and crispy.",
        "Serve hot with chutney."
      ]
    },
    { 
      id: 22, 
      name: "Fish Manchurian",
      tagline: "Indo-Chinese style fish",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish cubes",
        "1 cup cornflour",
        "1 egg",
        "1 tbsp ginger-garlic paste",
        "For sauce: 1 onion, 1 capsicum",
        "2 tbsp soy sauce",
        "1 tbsp chili sauce",
        "1 tbsp vinegar",
        "Oil for frying"
      ],
      steps: [
        "Mix cornflour, egg, ginger-garlic and salt to make batter.",
        "Coat fish and deep fry until crispy.",
        "Stir fry onions and capsicum in oil.",
        "Add sauces and cornflour slurry.",
        "Add fried fish and mix well.",
        "Serve hot."
      ]
    },

    // ==================== FISH CUTLETS (2) ====================
    { 
      id: 23, 
      name: "Fish Cutlet",
      tagline: "Crispy fish cutlets",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish, boiled and mashed",
        "2 potatoes, boiled and mashed",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tsp ginger paste",
        "1 tsp red chili powder",
        "1/2 tsp pepper",
        "Salt to taste",
        "Breadcrumbs for coating",
        "Oil for frying"
      ],
      steps: [
        "Mix mashed fish and potatoes with onions, chilies, ginger and spices.",
        "Shape into cutlets.",
        "Coat with breadcrumbs.",
        "Shallow fry until golden.",
        "Serve with ketchup."
      ]
    },
    { 
      id: 24, 
      name: "Fish Kebab",
      tagline: "Fish seekh kebabs",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish, minced",
        "1 onion, chopped",
        "2 tbsp ginger-garlic paste",
        "2 green chilies, chopped",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1/2 cup breadcrumbs",
        "1 egg",
        "Salt to taste",
        "Oil for shallow frying"
      ],
      steps: [
        "Mix all ingredients well.",
        "Shape into kebabs on skewers.",
        "Shallow fry until golden and cooked.",
        "Serve with mint chutney."
      ]
    }
  ];
    // Final recipes...
  const finalFishRecipes = [
    // ==================== FISH MASALA (3) ====================
    { 
      id: 25, 
      name: "Fish Masala Fry",
      tagline: "Spicy masala coated fish",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish slices",
        "2 tbsp ginger-garlic paste",
        "2 tsp red chili powder",
        "1 tsp turmeric",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tbsp lemon juice",
        "Salt to taste",
        "2 tbsp rice flour",
        "Oil for frying"
      ],
      steps: [
        "Make thick paste of spices with little water.",
        "Coat fish with masala and rest for 30 minutes.",
        "Sprinkle rice flour.",
        "Shallow fry until golden.",
        "Serve hot."
      ]
    },
    { 
      id: 26, 
      name: "Fish 65",
      tagline: "Spicy South Indian fish starter",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish cubes",
        "2 tbsp ginger-garlic paste",
        "2 tsp red chili powder",
        "1 tsp pepper",
        "1 tbsp cornflour",
        "1 tbsp rice flour",
        "1 egg",
        "Salt to taste",
        "Oil for frying",
        "Curry leaves",
        "1 tsp mustard seeds"
      ],
      steps: [
        "Marinate fish with ginger-garlic, spices, flours and egg for 1 hour.",
        "Deep fry until crispy.",
        "Temper with mustard seeds and curry leaves.",
        "Toss fried fish in this tempering.",
        "Serve hot."
      ]
    },
    { 
      id: 27, 
      name: "Fish Chili",
      tagline: "Spicy chili fish",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish cubes",
        "2 tbsp cornflour",
        "1 tbsp soy sauce",
        "1 tbsp chili sauce",
        "1 tbsp vinegar",
        "1 onion, sliced",
        "1 capsicum, sliced",
        "2 green chilies, slit",
        "1 tbsp ginger-garlic paste",
        "Oil for frying"
      ],
      steps: [
        "Coat fish in cornflour and deep fry.",
        "Stir fry onions, capsicum, chilies in oil.",
        "Add sauces and little water.",
        "Add fried fish and toss well.",
        "Serve hot."
      ]
    },

    // ==================== FISH WITH VEGETABLES (3) ====================
    { 
      id: 28, 
      name: "Fish Aloo",
      tagline: "Fish with potato curry",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
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
        "Lightly fry fish and set aside.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add potatoes, spices and 1 cup water. Cook until potatoes are done.",
        "Add fried fish and simmer for 5 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 29, 
      name: "Fish Palak",
      tagline: "Fish with spinach",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g fish",
        "2 cups spinach, blanched and pureed",
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
        "Lightly fry fish.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add spinach puree and spices. Simmer for 5 minutes.",
        "Add fish and cook for 5 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 30, 
      name: "Fish Matar",
      tagline: "Fish with peas",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
        "1 cup peas",
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
        "Lightly fry fish.",
        "Heat oil, add cumin seeds and onions. Sauté until golden.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add peas and spices. Cook for 5 minutes.",
        "Add fish and simmer for 5 minutes.",
        "Serve hot."
      ]
    },

    // ==================== FISH ROTI/ROLL (2) ====================
    { 
      id: 31, 
      name: "Fish Roll",
      tagline: "Fish kathi roll",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "250g fish fingers",
        "4 parathas or rotis",
        "1 onion, sliced",
        "1 capsicum, sliced",
        "1/2 cup cabbage, shredded",
        "Mayonnaise or mint chutney",
        "Chaat masala"
      ],
      steps: [
        "Prepare fish fingers by frying.",
        "Warm parathas on tawa.",
        "Spread chutney or mayonnaise.",
        "Place fish fingers, onions, capsicum, cabbage.",
        "Sprinkle chaat masala.",
        "Roll tightly and serve."
      ]
    },
    { 
      id: 32, 
      name: "Fish Sandwich",
      tagline: "Grilled fish sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "200g fish fingers",
        "8 bread slices",
        "Butter",
        "Lettuce leaves",
        "Tomato slices",
        "Onion slices",
        "Mayonnaise"
      ],
      steps: [
        "Toast bread slices with butter.",
        "Spread mayonnaise on one slice.",
        "Place lettuce, tomato, onion.",
        "Add fish fingers.",
        "Cover with another slice.",
        "Grill if desired and serve."
      ]
    },

    // ==================== FISH SOUP (2) ====================
    { 
      id: 33, 
      name: "Fish Soup",
      tagline: "Clear fish soup",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "250g fish bones and head",
        "1 onion, chopped",
        "1 inch ginger",
        "2 cloves garlic",
        "1 tsp pepper",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Boil fish bones with onion, ginger, garlic in 4 cups water.",
        "Simmer for 30 minutes.",
        "Strain the stock.",
        "Add pepper and salt.",
        "Garnish with coriander and serve hot."
      ]
    },
    { 
      id: 34, 
      name: "Fish Manchow Soup",
      tagline: "Spicy Chinese fish soup",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "200g fish, minced",
        "4 cups chicken stock",
        "1 onion, chopped",
        "2 tbsp soy sauce",
        "1 tbsp chili sauce",
        "1 tbsp vinegar",
        "1 tsp pepper",
        "1 egg, beaten",
        "2 tbsp cornflour",
        "Spring onions"
      ],
      steps: [
        "Boil stock with soy sauce, chili sauce, vinegar.",
        "Add fish mince and cook for 5 minutes.",
        "Add cornflour slurry to thicken.",
        "Slowly add beaten egg while stirring.",
        "Add pepper and spring onions.",
        "Serve hot with fried noodles."
      ]
    },

    // ==================== FISH PICKLE (1) ====================
    { 
      id: 35, 
      name: "Fish Pickle",
      tagline: "Spicy fish pickle",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish, fried",
        "1/2 cup mustard oil",
        "2 tbsp ginger-garlic paste",
        "2 tbsp red chili powder",
        "1 tbsp turmeric",
        "1 tbsp fenugreek seeds",
        "1 tbsp mustard seeds",
        "1/2 cup vinegar",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add fenugreek and mustard seeds.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add red chili, turmeric and salt. Cook for 1 minute.",
        "Add vinegar and bring to boil.",
        "Add fried fish and mix well.",
        "Cool and store in glass jar.",
        "Rest for 2 days before eating."
      ]
    }
  ];

  // Combine all arrays
  const allFishRecipes = [...fishRecipes, ...moreFishRecipes, ...finalFishRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allFishRecipes;

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
    <div className="fish-page">
      {/* Header */}
      <header className="fish-header">
        <div className="fish-header-content">
          <h1 className="fish-title">🐟 Fish Dishes</h1>
          <p className="fish-description">
            Discover 35+ delicious fish recipes - curries, fries, tikka, biryani aur bhi bahut kuch
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="fish-main">
        <div className="fish-grid-section">
          <div className="fish-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="fish-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="fish-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="fish-card-content">
                  <h3 className="fish-card-title">{recipe.name}</h3>
                  <p className="fish-card-description">{recipe.tagline}</p>
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
        <div className="fish-modal-overlay" onClick={handleCloseModal}>
          <div
            className="fish-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="fish-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="fish-modal-header">
              <div className="fish-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="fish-modal-content">
              {/* Column 1: Ingredients */}
              <div className="fish-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="fish-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="fish-ingredient-item">
                      <span className="fish-ingredient-bullet">•</span>
                      <span className="fish-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="fish-modal-steps">
                <h3>Steps to Make</h3>
                <div className="fish-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="fish-step-item">
                      <span className="fish-step-number">{index + 1}.</span>
                      <span className="fish-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="fish-modal-voice-container">
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

export default RecipesFish;