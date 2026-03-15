import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesBBQ.css';

const RecipesBBQ = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All BBQ & Grill Recipes (40+ recipes)
  const bbqRecipes = [
    // ==================== CHICKEN TIKKA (6) ====================
    { 
      id: 1, 
      name: "Chicken Tikka",
      tagline: "Classic grilled chicken tikka",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg chicken, bone-in pieces",
        "1 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "2 tbsp lemon juice",
        "2 tsp red chili powder",
        "1 tsp turmeric",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1 tsp salt",
        "2 tbsp oil",
        "1 tsp chaat masala",
        "Charcoal for smoke"
      ],
      steps: [
        "Make deep cuts on chicken pieces.",
        "Mix yogurt with all spices, ginger-garlic, lemon juice and oil.",
        "Apply marinade to chicken, coating well. Refrigerate for 4-6 hours.",
        "For smoky flavor: Heat charcoal, place in bowl with ghee, cover for 10 minutes.",
        "Preheat grill to medium-high heat.",
        "Thread chicken onto skewers or place on grill.",
        "Grill for 15-20 minutes, turning occasionally, until charred and cooked.",
        "Sprinkle chaat masala and serve with chutney."
      ]
    },
    { 
      id: 2, 
      name: "Malai Tikka",
      tagline: "Creamy white tikka",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg boneless chicken cubes",
        "1 cup cream",
        "1/2 cup yogurt",
        "2 tbsp ginger paste",
        "2 tbsp garlic paste",
        "2 tbsp green chili paste",
        "1 tsp white pepper",
        "1 tsp cardamom powder",
        "1 tsp salt",
        "2 tbsp oil",
        "2 tbsp lemon juice",
        "Charcoal for smoke"
      ],
      steps: [
        "Mix cream, yogurt, ginger, garlic, chili paste and spices.",
        "Add chicken and marinate for 4 hours.",
        "Add smoky flavor using charcoal method.",
        "Skewer chicken and grill on medium heat for 15 minutes.",
        "Baste with oil while grilling.",
        "Serve with green chutney."
      ]
    },
    { 
      id: 3, 
      name: "Hariyali Tikka",
      tagline: "Green marinated tikka",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg chicken",
        "1 cup fresh coriander",
        "1 cup fresh mint",
        "4 green chilies",
        "2 tbsp ginger-garlic paste",
        "1/2 cup yogurt",
        "1 tsp cumin powder",
        "1 tsp chaat masala",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Grind coriander, mint and chilies to fine paste.",
        "Mix with yogurt, ginger-garlic, spices and oil.",
        "Marinate chicken for 4 hours.",
        "Skewer and grill until cooked and charred.",
        "Serve with onion rings."
      ]
    },
    { 
      id: 4, 
      name: "Achari Tikka",
      tagline: "Pickle flavored tikka",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg chicken",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tbsp pickle masala",
        "1 tsp fennel seeds",
        "1 tsp mustard seeds",
        "1 tsp fenugreek seeds",
        "1 tsp red chili",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Dry roast and grind fennel, mustard and fenugreek.",
        "Mix with yogurt, pickle masala and spices.",
        "Marinate chicken for 4 hours.",
        "Grill until charred and cooked.",
        "Serve with mint chutney."
      ]
    },
    { 
      id: 5, 
      name: "Afghani Tikka",
      tagline: "Afghani style chicken",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg chicken",
        "1 cup cream",
        "1/2 cup yogurt",
        "2 tbsp ginger-garlic",
        "1 tsp white pepper",
        "1 tsp cardamom",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Mix cream, yogurt, ginger-garlic and spices.",
        "Marinate chicken for 4 hours.",
        "Grill until golden and cooked.",
        "Serve with naan."
      ]
    },
    { 
      id: 6, 
      name: "Balochi Tikka",
      tagline: "Balochistan style spicy tikka",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg mutton or beef",
        "2 tbsp ginger-garlic",
        "2 tbsp red chili powder",
        "1 tbsp coriander powder",
        "1 tsp cumin",
        "1 tsp black pepper",
        "2 tbsp mustard oil",
        "Salt to taste",
        "Charcoal for smoke"
      ],
      steps: [
        "Mix all spices with oil and ginger-garlic.",
        "Apply to meat and marinate overnight.",
        "Add smoky flavor with charcoal.",
        "Grill on charcoal until tender and charred.",
        "Serve with naan."
      ]
    },

    // ==================== BOTI (4) ====================
    { 
      id: 7, 
      name: "Chicken Boti",
      tagline: "Boneless chicken cubes",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg boneless chicken cubes",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tbsp lemon juice",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Mix all marinade ingredients.",
        "Add chicken and marinate for 4 hours.",
        "Thread onto skewers.",
        "Grill on medium heat for 15 minutes.",
        "Serve with chutney."
      ]
    },
    { 
      id: 8, 
      name: "Malai Boti",
      tagline: "Creamy chicken boti",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg boneless chicken",
        "1 cup cream",
        "1/2 cup yogurt",
        "2 tbsp ginger paste",
        "2 tbsp garlic paste",
        "1 tsp white pepper",
        "1 tsp cardamom",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Mix cream, yogurt, pastes and spices.",
        "Marinate chicken for 4 hours.",
        "Skewer and grill until golden.",
        "Serve with raita."
      ]
    },
    { 
      id: 9, 
      name: "Achari Boti",
      tagline: "Pickle flavored boti",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg chicken",
        "1 cup yogurt",
        "2 tbsp pickle masala",
        "1 tsp fennel",
        "1 tsp mustard",
        "1 tsp red chili",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Mix all ingredients for marinade.",
        "Add chicken and marinate.",
        "Grill until charred.",
        "Serve with salad."
      ]
    },
    { 
      id: 10, 
      name: "Beef Boti",
      tagline: "Tender beef cubes",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg beef cubes",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tbsp papaya paste",
        "2 tsp red chili",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Mix all ingredients.",
        "Marinate beef for 6 hours.",
        "Grill until tender and charred.",
        "Serve with naan."
      ]
    },

    // ==================== SEEKH KEBAB (5) ====================
    { 
      id: 11, 
      name: "Chicken Seekh Kebab",
      tagline: "Minced chicken kebabs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g chicken mince",
        "1 onion, finely chopped",
        "2 tbsp ginger-garlic paste",
        "2 green chilies, chopped",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp red chili powder",
        "1/2 tsp garam masala",
        "1/2 tsp chaat masala",
        "2 tbsp fresh coriander, chopped",
        "1 tbsp mint leaves, chopped",
        "1 egg (optional)",
        "Salt to taste",
        "2 tbsp oil"
      ],
      steps: [
        "Mix all ingredients in a bowl.",
        "Knead well for 5-10 minutes until mixture binds.",
        "Refrigerate for 1 hour.",
        "Take mixture and mold onto skewers in sausage shape.",
        "Grill on medium heat, turning frequently, until cooked.",
        "Baste with oil while grilling.",
        "Serve with mint chutney and onions."
      ]
    },
    { 
      id: 12, 
      name: "Mutton Seekh Kebab",
      tagline: "Spicy mutton kebabs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g mutton mince",
        "1 onion, chopped",
        "2 tbsp ginger-garlic",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp red chili",
        "1/2 tsp garam masala",
        "2 tbsp coriander leaves",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Mix all ingredients well.",
        "Mold onto skewers.",
        "Grill until charred and cooked.",
        "Serve with naan."
      ]
    },
    { 
      id: 13, 
      name: "Beef Seekh Kebab",
      tagline: "Beef mince kebabs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g beef mince",
        "1 onion",
        "2 tbsp ginger-garlic",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp red chili",
        "1/2 tsp garam masala",
        "2 tbsp coriander",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Mix all ingredients.",
        "Mold on skewers.",
        "Grill until done.",
        "Serve with chutney."
      ]
    },
    { 
      id: 14, 
      name: "Hariyali Seekh Kebab",
      tagline: "Green herb kebabs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g mince",
        "1 cup fresh coriander",
        "1/2 cup mint",
        "4 green chilies",
        "1 onion",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp chaat masala",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Grind coriander, mint, chilies to paste.",
        "Mix with mince and spices.",
        "Mold onto skewers.",
        "Grill until cooked.",
        "Serve."
      ]
    },
    { 
      id: 15, 
      name: "Cheese Seekh Kebab",
      tagline: "Kebabs stuffed with cheese",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g mince",
        "100g cheese cubes",
        "1 onion",
        "2 tbsp ginger-garlic",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp red chili",
        "1 tsp salt",
        "2 tbsp coriander leaves"
      ],
      steps: [
        "Mix mince with spices.",
        "Take portion, place cheese cube inside, shape kebab.",
        "Grill until cooked and cheese melts.",
        "Serve hot."
      ]
    }
  ];
    // More recipes continue...
  const moreBBQRecipes = [
    // ==================== CHAPLI KEBAB (3) ====================
    { 
      id: 16, 
      name: "Chapli Kebab",
      tagline: "Peshawari style minced kebabs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g beef mince",
        "1 onion, finely chopped",
        "2 tomatoes, finely chopped",
        "2 tbsp ginger-garlic paste",
        "2 green chilies, chopped",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp red chili powder",
        "1 tsp pomegranate seeds (anardana)",
        "1 tsp garam masala",
        "2 tbsp coriander leaves",
        "2 tbsp mint leaves",
        "4 tbsp cornflour",
        "1 egg",
        "Salt to taste",
        "Oil for frying"
      ],
      steps: [
        "Mix all ingredients in a bowl.",
        "Knead well and rest for 30 minutes.",
        "Take portions and flatten into patties.",
        "Heat oil in pan, shallow fry until golden on both sides.",
        "Serve with naan and raita."
      ]
    },
    { 
      id: 17, 
      name: "Chicken Chapli Kebab",
      tagline: "Chicken version of chapli",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g chicken mince",
        "1 onion",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp red chili",
        "1 tsp anardana",
        "2 tbsp cornflour",
        "1 egg",
        "Salt to taste"
      ],
      steps: [
        "Mix all ingredients.",
        "Shape into patties.",
        "Shallow fry until golden.",
        "Serve with chutney."
      ]
    },
    { 
      id: 18, 
      name: "Peshawari Chapli Kebab",
      tagline: "Authentic Peshawari recipe",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g beef mince",
        "1 onion",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp red chili",
        "1 tbsp anardana",
        "2 tbsp cornflour",
        "1 egg",
        "Salt to taste"
      ],
      steps: [
        "Mix thoroughly.",
        "Make round patties.",
        "Shallow fry on low heat.",
        "Serve with naan."
      ]
    },

    // ==================== BIHARI KEBAB (3) ====================
    { 
      id: 19, 
      name: "Bihari Kebab",
      tagline: "Spicy thin meat kebabs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g beef, thinly sliced",
        "1 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "2 tbsp raw papaya paste",
        "2 tsp red chili powder",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp garam masala",
        "1 tsp salt",
        "2 tbsp oil",
        "1 tsp chaat masala"
      ],
      steps: [
        "Pound beef slices thin.",
        "Mix all marinade ingredients.",
        "Marinate beef for 6 hours.",
        "Thread onto flat skewers.",
        "Grill on charcoal until charred.",
        "Sprinkle chaat masala and serve."
      ]
    },
    { 
      id: 20, 
      name: "Chicken Bihari Kebab",
      tagline: "Chicken version",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g chicken, thin slices",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "1 tbsp papaya paste",
        "2 tsp red chili",
        "1 tsp cumin",
        "1 tsp salt"
      ],
      steps: [
        "Marinate chicken.",
        "Grill on skewers.",
        "Serve hot."
      ]
    },
    { 
      id: 21, 
      name: "Bihari Boti",
      tagline: "Bihari style boti",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g beef cubes",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "1 tbsp papaya",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1 tsp salt"
      ],
      steps: [
        "Marinate beef.",
        "Thread on skewers.",
        "Grill until tender.",
        "Serve."
      ]
    },

    // ==================== TANDOORI LEGS (3) ====================
    { 
      id: 22, 
      name: "Tandoori Chicken Legs",
      tagline: "Spicy grilled chicken legs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "6 chicken legs",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tbsp tandoori masala",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 tsp salt",
        "2 tbsp oil",
        "Red food color (optional)"
      ],
      steps: [
        "Make slits on chicken legs.",
        "Mix all marinade ingredients.",
        "Marinate for 4 hours.",
        "Grill on medium heat for 20-25 minutes.",
        "Baste with oil while grilling.",
        "Serve with mint chutney."
      ]
    },
    { 
      id: 23, 
      name: "Chicken Leg Piece",
      tagline: "Simple grilled chicken leg",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "4 chicken legs",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp salt"
      ],
      steps: [
        "Marinate chicken.",
        "Grill until cooked.",
        "Serve with salad."
      ]
    },
    { 
      id: 24, 
      name: "Hariyali Chicken Leg",
      tagline: "Green marinated legs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "4 chicken legs",
        "1 cup coriander-mint chutney",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp chaat masala",
        "1 tsp salt"
      ],
      steps: [
        "Marinate legs in green paste.",
        "Grill until charred.",
        "Serve."
      ]
    },

    // ==================== RESHMI KEBAB (3) ====================
    { 
      id: 25, 
      name: "Reshmi Kebab",
      tagline: "Silky smooth kebabs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g chicken mince",
        "1/2 cup cream",
        "2 tbsp ginger-garlic",
        "2 tbsp green chili paste",
        "1 tsp white pepper",
        "1 tsp cardamom powder",
        "1 tsp salt",
        "2 tbsp cornflour",
        "Oil for brushing"
      ],
      steps: [
        "Mix all ingredients well.",
        "Shape into patties or on skewers.",
        "Grill on low heat until cooked.",
        "Brush with oil.",
        "Serve with chutney."
      ]
    },
    { 
      id: 26, 
      name: "Reshmi Tikka",
      tagline: "Silky chicken tikka",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g boneless chicken",
        "1/2 cup cream",
        "2 tbsp ginger-garlic",
        "2 tbsp green chili",
        "1 tsp white pepper",
        "1 tsp cardamom",
        "1 tsp salt"
      ],
      steps: [
        "Cut chicken into cubes.",
        "Mix with marinade.",
        "Grill on skewers.",
        "Serve."
      ]
    },
    { 
      id: 27, 
      name: "Malai Reshmi",
      tagline: "Creamy reshmi kebab",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g chicken",
        "1 cup cream",
        "2 tbsp ginger paste",
        "2 tbsp garlic paste",
        "1 tsp white pepper",
        "1 tsp salt"
      ],
      steps: [
        "Marinate chicken.",
        "Grill until done.",
        "Serve."
      ]
    },

    // ==================== GALOUTI KEBAB (2) ====================
    { 
      id: 28, 
      name: "Galouti Kebab",
      tagline: "Melt-in-mouth kebabs",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g beef mince",
        "1 tbsp raw papaya paste",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "1 tsp cardamom powder",
        "1 tsp nutmeg powder",
        "1 tsp mace powder",
        "1 tsp salt",
        "2 tbsp fried onions paste",
        "2 tbsp ghee"
      ],
      steps: [
        "Mix mince with papaya paste and spices.",
        "Rest for 2 hours.",
        "Add fried onion paste.",
        "Knead well until smooth.",
        "Shape into small patties.",
        "Shallow fry on low heat until golden.",
        "Serve with ulte tawe ka paratha."
      ]
    },
    { 
      id: 29, 
      name: "Chicken Galouti",
      tagline: "Chicken version",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g chicken mince",
        "1 tbsp papaya",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp garam masala",
        "1 tsp salt",
        "2 tbsp fried onions"
      ],
      steps: [
        "Mix all ingredients.",
        "Make small patties.",
        "Shallow fry.",
        "Serve."
      ]
    }
  ];
    // Final recipes...
  const finalBBQRecipes = [
    // ==================== GRILLED FISH (3) ====================
    { 
      id: 30, 
      name: "Fish Tikka",
      tagline: "Grilled fish fillets",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish fillets",
        "1/2 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tbsp lemon juice",
        "2 tsp red chili",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Cut fish into cubes.",
        "Mix marinade ingredients.",
        "Marinate fish for 1 hour.",
        "Thread onto skewers.",
        "Grill for 5-7 minutes each side.",
        "Serve with lemon wedges."
      ]
    },
    { 
      id: 31, 
      name: "Grilled Fish",
      tagline: "Whole grilled fish",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "1 whole fish (pomfret or sea bass)",
        "2 tbsp ginger-garlic",
        "2 tbsp lemon juice",
        "2 tsp red chili",
        "1 tsp turmeric",
        "1 tsp cumin",
        "1 tsp salt",
        "2 tbsp oil"
      ],
      steps: [
        "Clean and make slits on fish.",
        "Apply marinade inside and outside.",
        "Rest for 1 hour.",
        "Grill on medium heat for 10-12 minutes each side.",
        "Serve with chutney."
      ]
    },
    { 
      id: 32, 
      name: "Tandoori Fish",
      tagline: "Tandoor style fish",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "500g fish",
        "1/2 cup yogurt",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp coriander",
        "1 tsp red chili",
        "1 tsp chaat masala",
        "1 tsp salt"
      ],
      steps: [
        "Marinate fish.",
        "Grill until charred.",
        "Sprinkle chaat masala.",
        "Serve."
      ]
    },

    // ==================== GRILLED VEGETABLES (3) ====================
    { 
      id: 33, 
      name: "Grilled Veg Platter",
      tagline: "Mixed grilled vegetables",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "2 capsicum, cubed",
        "2 onions, cubed",
        "2 tomatoes, thick slices",
        "1 zucchini, sliced",
        "1 eggplant, sliced",
        "2 tbsp olive oil",
        "1 tsp red chili",
        "1 tsp cumin",
        "1 tsp oregano",
        "1 tsp salt"
      ],
      steps: [
        "Mix vegetables with oil and spices.",
        "Thread onto skewers.",
        "Grill until charred and tender.",
        "Serve with mint chutney."
      ]
    },
    { 
      id: 34, 
      name: "Tandoori Mushroom",
      tagline: "Grilled mushrooms",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g button mushrooms",
        "1/2 cup yogurt",
        "2 tbsp ginger-garlic",
        "1 tsp red chili",
        "1 tsp cumin",
        "1 tsp chaat masala",
        "1 tsp salt"
      ],
      steps: [
        "Mix mushrooms with marinade.",
        "Rest for 30 minutes.",
        "Grill on skewers for 5-7 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 35, 
      name: "Tandoori Paneer",
      tagline: "Grilled cottage cheese",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "500g paneer, cubed",
        "1 capsicum, cubed",
        "1 onion, cubed",
        "1/2 cup yogurt",
        "2 tbsp ginger-garlic",
        "1 tsp red chili",
        "1 tsp cumin",
        "1 tsp chaat masala",
        "1 tsp salt"
      ],
      steps: [
        "Mix paneer and veggies with marinade.",
        "Rest for 30 minutes.",
        "Thread onto skewers.",
        "Grill until charred.",
        "Serve with chutney."
      ]
    },

    // ==================== KEBAB MASALA (2) ====================
    { 
      id: 36, 
      name: "Seekh Kebab Masala",
      tagline: "Kebabs in spicy gravy",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "12 seekh kebabs",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp red chili",
        "1/2 tsp turmeric",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Prepare seekh kebabs and set aside.",
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and cook.",
        "Add tomato puree and spices. Cook until oil separates.",
        "Add 1 cup water and simmer.",
        "Add kebabs and cook for 5 minutes.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 37, 
      name: "Chapli Kebab Karahi",
      tagline: "Chapli kebabs in karahi",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "6 chapli kebabs",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp red chili",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Prepare chapli kebabs.",
        "Heat oil, add ginger-garlic and tomatoes.",
        "Add spices and cook.",
        "Add kebabs and simmer for 5 minutes.",
        "Garnish and serve."
      ]
    },

    // ==================== TANDOORI SPECIALS (3) ====================
    { 
      id: 38, 
      name: "Tandoori Raan",
      tagline: "Whole grilled leg of lamb",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 whole lamb leg",
        "2 cups yogurt",
        "4 tbsp ginger-garlic",
        "2 tbsp red chili",
        "1 tbsp turmeric",
        "1 tbsp cumin",
        "1 tbsp coriander",
        "1 tbsp garam masala",
        "1 tsp nutmeg",
        "1 tsp mace",
        "1 tbsp salt",
        "1/2 cup oil",
        "Charcoal for smoke"
      ],
      steps: [
        "Make deep slits on leg.",
        "Mix all marinade ingredients.",
        "Apply generously and marinate overnight.",
        "Add charcoal smoke.",
        "Roast on low heat for 2-3 hours, turning occasionally.",
        "Baste with oil while roasting.",
        "Serve with naan and chutney."
      ]
    },
    { 
      id: 39, 
      name: "Mutton Chops",
      tagline: "Grilled mutton chops",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 kg mutton chops",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tbsp raw papaya",
        "2 tsp red chili",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1 tsp salt"
      ],
      steps: [
        "Marinate chops for 6 hours.",
        "Grill on charcoal until charred and tender.",
        "Serve with mint chutney."
      ]
    },
    { 
      id: 40, 
      name: "Tandoori Quail",
      tagline: "Grilled quail (Bater)",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "6 quails",
        "1 cup yogurt",
        "2 tbsp ginger-garlic",
        "2 tsp red chili",
        "1 tsp cumin",
        "1 tsp garam masala",
        "1 tsp salt"
      ],
      steps: [
        "Clean and make slits on quails.",
        "Marinate for 4 hours.",
        "Grill on medium heat for 10-12 minutes.",
        "Serve with salad."
      ]
    },

    // ==================== BBQ SAUCES (3) ====================
    { 
      id: 41, 
      name: "Mint Chutney",
      tagline: "Fresh mint chutney",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 bunch fresh mint",
        "1 bunch fresh coriander",
        "4 green chilies",
        "2 tbsp ginger",
        "1 tbsp lemon juice",
        "1 tsp cumin powder",
        "1 tsp chaat masala",
        "Salt to taste"
      ],
      steps: [
        "Wash all herbs.",
        "Grind all ingredients to fine paste.",
        "Add water as needed.",
        "Serve with all BBQ items."
      ]
    },
    { 
      id: 42, 
      name: "Tamarind Chutney",
      tagline: "Sweet and sour chutney",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 cup tamarind pulp",
        "1/2 cup jaggery",
        "1 tsp cumin powder",
        "1 tsp ginger powder",
        "1 tsp red chili",
        "1 tsp salt",
        "1 cup water"
      ],
      steps: [
        "Boil tamarind with water.",
        "Add jaggery and spices.",
        "Cook until thick.",
        "Cool and serve."
      ]
    },
    { 
      id: 43, 
      name: "Garlic Yogurt Sauce",
      tagline: "Creamy garlic sauce",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 cup yogurt",
        "4 cloves garlic, crushed",
        "1 tsp salt",
        "1 tsp black pepper",
        "2 tbsp fresh cream"
      ],
      steps: [
        "Whisk yogurt until smooth.",
        "Add crushed garlic and spices.",
        "Add cream and mix.",
        "Chill and serve."
      ]
    }
  ];

  // Combine all arrays
  const allBBQRecipes = [...bbqRecipes, ...moreBBQRecipes, ...finalBBQRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allBBQRecipes;

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
    <div className="bbq-page">
      {/* Header */}
      <header className="bbq-header">
        <div className="bbq-header-content">
          <h1 className="bbq-title">🔥 BBQ & Grills</h1>
          <p className="bbq-description">
            Discover 40+ delicious BBQ recipes - tikka, boti, seekh kebab, chapli, bihari, reshmi aur bhi bahut kuch
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="bbq-main">
        <div className="bbq-grid-section">
          <div className="bbq-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="bbq-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="bbq-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="bbq-card-content">
                  <h3 className="bbq-card-title">{recipe.name}</h3>
                  <p className="bbq-card-description">{recipe.tagline}</p>
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
        <div className="bbq-modal-overlay" onClick={handleCloseModal}>
          <div
            className="bbq-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="bbq-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="bbq-modal-header">
              <div className="bbq-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="bbq-modal-content">
              {/* Column 1: Ingredients */}
              <div className="bbq-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="bbq-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="bbq-ingredient-item">
                      <span className="bbq-ingredient-bullet">•</span>
                      <span className="bbq-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="bbq-modal-steps">
                <h3>Steps to Make</h3>
                <div className="bbq-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="bbq-step-item">
                      <span className="bbq-step-number">{index + 1}.</span>
                      <span className="bbq-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="bbq-modal-voice-container">
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

export default RecipesBBQ;