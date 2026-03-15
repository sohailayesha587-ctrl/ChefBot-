import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesRice.css';

const RecipesRice = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Rice Recipes (40+ recipes)
  const riceRecipes = [
    // ==================== BIRYANI (6) ====================
    { 
      id: 1, 
      name: "Chicken Biryani",
      tagline: "Classic Pakistani chicken biryani",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 kg chicken, curry cut",
        "2 cups basmati rice",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon stick",
        "1 tsp turmeric",
        "2 tsp red chili powder",
        "1 tsp biryani masala",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander",
        "Mint leaves",
        "Saffron milk",
        "1 cup yogurt"
      ],
      steps: [
        "Wash and soak rice for 30 minutes.",
        "Heat oil, add whole spices and onions. Sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add chicken and fry for 5-7 minutes.",
        "Add tomatoes and cook until soft.",
        "Add yogurt, turmeric, red chili and salt. Cook for 10 minutes.",
        "Boil rice separately with salt and whole spices until 70% done.",
        "Layer in pot: rice, chicken masala, rice.",
        "Sprinkle biryani masala, coriander, mint and saffron milk.",
        "Cover and cook on low heat (dum) for 20 minutes.",
        "Serve hot with raita."
      ]
    },
    { 
      id: 2, 
      name: "Mutton Biryani",
      tagline: "Rich mutton biryani",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 kg mutton",
        "2 cups basmati rice",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp biryani masala",
        "1/2 cup oil",
        "Salt to taste",
        "1 cup yogurt",
        "Saffron milk"
      ],
      steps: [
        "Pressure cook mutton with spices until tender.",
        "Cook rice until 70% done.",
        "Layer rice and mutton in pot.",
        "Add biryani masala and saffron milk.",
        "Dum for 20 minutes.",
        "Serve with raita."
      ]
    },
    { 
      id: 3, 
      name: "Beef Biryani",
      tagline: "Spicy beef biryani",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 kg beef",
        "2 cups rice",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "2 tsp red chili",
        "1 tsp biryani masala",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook beef with spices until tender.",
        "Prepare rice separately.",
        "Layer and dum.",
        "Serve hot."
      ]
    },
    { 
      id: 4, 
      name: "Vegetable Biryani",
      tagline: "Biryani with mixed vegetables",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "2 cups mixed vegetables",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste",
        "1 cup yogurt"
      ],
      steps: [
        "Cook vegetables with spices and yogurt.",
        "Layer with parboiled rice.",
        "Dum for 15 minutes.",
        "Serve with raita."
      ]
    },
    { 
      id: 5, 
      name: "Kachchi Biryani",
      tagline: "Raw meat layered biryani",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 kg mutton",
        "2 cups rice",
        "2 onions, sliced",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "2 tsp red chili",
        "1 cup yogurt",
        "1/2 cup oil",
        "Salt to taste",
        "Saffron milk"
      ],
      steps: [
        "Marinate raw mutton with spices and yogurt.",
        "Layer with soaked rice.",
        "Add water and cook on low heat.",
        "Dum for 45 minutes.",
        "Serve hot."
      ]
    },
    { 
      id: 6, 
      name: "Sindhi Biryani",
      tagline: "Spicy Sindhi style biryani",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 kg chicken",
        "2 cups rice",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "2 tsp red chili",
        "1 tsp biryani masala",
        "1/2 cup oil",
        "Salt to taste",
        "Potatoes, cubed",
        "Prunes",
        "Fresh coriander"
      ],
      steps: [
        "Cook chicken with potatoes and spices.",
        "Layer with rice and prunes.",
        "Dum for 20 minutes.",
        "Serve with salad."
      ]
    },

    // ==================== PULAO (6) ====================
    { 
      id: 7, 
      name: "Chicken Pulao",
      tagline: "Simple chicken rice pilaf",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g chicken",
        "2 cups basmati rice",
        "2 onions, sliced",
        "2 tbsp ginger-garlic",
        "1 tsp cumin seeds",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1 tsp black pepper",
        "1/2 cup oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash and soak rice for 30 minutes.",
        "Heat oil, add whole spices and onions. Sauté until golden.",
        "Add ginger-garlic and cook for 2 minutes.",
        "Add chicken and fry until color changes.",
        "Add 3 cups water and salt. Bring to boil.",
        "Add rice and cook on medium heat until water is absorbed.",
        "Cover and cook on low heat for 10 minutes.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 8, 
      name: "Mutton Pulao",
      tagline: "Fragrant mutton pulao",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g mutton",
        "2 cups rice",
        "2 onions",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1 tsp pepper",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook mutton with spices until half done.",
        "Add rice and water.",
        "Cook until rice is done.",
        "Serve hot."
      ]
    },
    { 
      id: 9, 
      name: "Beef Pulao",
      tagline: "Hearty beef pulao",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g beef",
        "2 cups rice",
        "2 onions",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1 tsp pepper",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Pressure cook beef with spices.",
        "Add rice and cook.",
        "Serve with raita."
      ]
    },
    { 
      id: 10, 
      name: "Yakhni Pulao",
      tagline: "Rice cooked in meat stock",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g meat with bones",
        "2 cups rice",
        "2 onions",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1 tsp pepper",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Boil meat with spices to make yakhni (stock).",
        "Strain stock and use to cook rice.",
        "Add fried onions and serve."
      ]
    },
    { 
      id: 11, 
      name: "Matar Pulao",
      tagline: "Rice with green peas",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "1 cup peas",
        "2 onions, sliced",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add whole spices and onions.",
        "Add rice and peas, sauté for 2 minutes.",
        "Add 3 cups water and salt.",
        "Cook until rice is done.",
        "Serve with yogurt."
      ]
    },
    { 
      id: 12, 
      name: "Aloo Pulao",
      tagline: "Rice with potatoes",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "2 potatoes, cubed",
        "2 onions",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add whole spices and onions.",
        "Add potatoes and fry for 2 minutes.",
        "Add rice and water.",
        "Cook until rice and potatoes are done.",
        "Serve hot."
      ]
    }
  ];
    // More recipes continue...
  const moreRiceRecipes = [
    // ==================== FRIED RICE (4) ====================
    { 
      id: 13, 
      name: "Chicken Fried Rice",
      tagline: "Chinese style chicken fried rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups cooked rice",
        "200g chicken, boneless cubes",
        "1 onion, chopped",
        "1/2 cup carrots, diced",
        "1/2 cup peas",
        "2 eggs, scrambled",
        "2 tbsp soy sauce",
        "1 tbsp oil",
        "Salt to taste",
        "Spring onions"
      ],
      steps: [
        "Heat oil in wok, add chicken and stir-fry until cooked.",
        "Add onions, carrots and peas. Stir-fry for 2 minutes.",
        "Add cooked rice and mix well.",
        "Add soy sauce and salt.",
        "Add scrambled eggs and mix gently.",
        "Garnish with spring onions and serve."
      ]
    },
    { 
      id: 14, 
      name: "Egg Fried Rice",
      tagline: "Simple egg fried rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups cooked rice",
        "3 eggs, scrambled",
        "1 onion, chopped",
        "1/2 cup carrots",
        "1/2 cup peas",
        "2 tbsp soy sauce",
        "1 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add onions and vegetables. Stir-fry.",
        "Add rice and soy sauce.",
        "Add scrambled eggs and mix.",
        "Serve hot."
      ]
    },
    { 
      id: 15, 
      name: "Vegetable Fried Rice",
      tagline: "Fried rice with mixed vegetables",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "1 cup mixed vegetables",
        "1 onion",
        "2 tbsp soy sauce",
        "1 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Cook rice and cool.",
        "Stir-fry vegetables in oil.",
        "Add rice and sauces.",
        "Serve hot."
      ]
    },
    { 
      id: 16, 
      name: "Shrimp Fried Rice",
      tagline: "Prawn fried rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "200g shrimp",
        "1 onion",
        "1/2 cup vegetables",
        "2 tbsp soy sauce",
        "1 tbsp oil"
      ],
      steps: [
        "Stir-fry shrimp until pink.",
        "Add vegetables and rice.",
        "Add soy sauce and serve."
      ]
    },

    // ==================== KICHIRI (4) ====================
    { 
      id: 17, 
      name: "Simple Khichdi",
      tagline: "Rice and lentil porridge",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup rice",
        "1/2 cup moong dal",
        "1 onion, chopped",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "2 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Wash rice and dal together.",
        "Heat ghee, add cumin and onions.",
        "Add rice-dal, turmeric and salt.",
        "Add 3 cups water and pressure cook for 3 whistles.",
        "Serve with yogurt and pickle."
      ]
    },
    { 
      id: 18, 
      name: "Vegetable Khichdi",
      tagline: "Khichdi with vegetables",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup rice",
        "1/2 cup dal",
        "1 cup mixed vegetables",
        "1 onion",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "2 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Heat ghee, add cumin and onions.",
        "Add vegetables and sauté.",
        "Add rice, dal, turmeric and salt.",
        "Add water and cook until done.",
        "Serve with papad."
      ]
    },
    { 
      id: 19, 
      name: "Masala Khichdi",
      tagline: "Spiced khichdi",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup rice",
        "1/2 cup dal",
        "1 onion",
        "1 tomato",
        "1 tsp ginger-garlic",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "1 tsp red chili",
        "2 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Heat ghee, add cumin and onions.",
        "Add ginger-garlic and tomatoes.",
        "Add rice, dal and spices.",
        "Add water and cook.",
        "Serve hot."
      ]
    },
    { 
      id: 20, 
      name: "Moong Dal Khichdi",
      tagline: "Comforting moong dal khichdi",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup rice",
        "1 cup moong dal",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "2 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Wash rice and dal.",
        "Pressure cook with turmeric and salt.",
        "Temper with cumin in ghee.",
        "Serve with yogurt."
      ]
    },

    // ==================== TAHARI (3) ====================
    { 
      id: 21, 
      name: "Chicken Tahari",
      tagline: "Karachi style chicken with rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g chicken",
        "2 cups rice",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1 tsp garam masala",
        "1/2 cup oil",
        "Salt to taste",
        "Potatoes, cubed"
      ],
      steps: [
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and chicken. Fry.",
        "Add tomatoes and potatoes. Cook.",
        "Add spices and 3 cups water.",
        "Add rice and cook until done.",
        "Serve with salad."
      ]
    },
    { 
      id: 22, 
      name: "Beef Tahari",
      tagline: "Beef with rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "500g beef",
        "2 cups rice",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook beef with spices until tender.",
        "Add rice and water.",
        "Cook until rice is done.",
        "Serve."
      ]
    },
    { 
      id: 23, 
      name: "Vegetable Tahari",
      tagline: "Vegetable rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "2 cups vegetables",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Sauté onions and ginger-garlic.",
        "Add vegetables and spices.",
        "Add water and rice.",
        "Cook until done.",
        "Serve."
      ]
    },

    // ==================== ZARDA (2) ====================
    { 
      id: 24, 
      name: "Zarda",
      tagline: "Sweet yellow rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup basmati rice",
        "3/4 cup sugar",
        "1/4 cup ghee",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "Yellow food color",
        "1/4 cup milk",
        "2 tbsp raisins",
        "2 tbsp almonds, sliced",
        "2 tbsp pistachios",
        "1 tsp rose water"
      ],
      steps: [
        "Wash and soak rice for 30 minutes.",
        "Boil rice until 70% done. Drain.",
        "Heat ghee, add whole spices.",
        "Add milk with food color.",
        "Add rice and sugar. Mix gently.",
        "Cover and cook on low heat for 15 minutes.",
        "Add dry fruits and rose water.",
        "Serve warm."
      ]
    },
    { 
      id: 25, 
      name: "Kashmiri Zarda",
      tagline: "Kashmiri style sweet rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup rice",
        "3/4 cup sugar",
        "1/4 cup ghee",
        "4 cardamom",
        "1 cinnamon",
        "Saffron strands",
        "2 tbsp milk",
        "Mixed dry fruits"
      ],
      steps: [
        "Cook rice until half done.",
        "Heat ghee, add spices.",
        "Add rice and sugar.",
        "Add saffron milk.",
        "Cook on low heat.",
        "Garnish with dry fruits."
      ]
    }
  ];
    // Final recipes...
  const finalRiceRecipes = [
    // ==================== SPECIAL RICE (5) ====================
    { 
      id: 26, 
      name: "Tehri",
      tagline: "Spicy vegetable rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "2 potatoes, cubed",
        "1 cup peas",
        "1 cup cauliflower",
        "2 onions, sliced",
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
        "Heat oil, add cumin and onions. Sauté.",
        "Add ginger-garlic and tomatoes. Cook.",
        "Add all vegetables and spices. Sauté for 5 minutes.",
        "Add 3 cups water and salt.",
        "Add rice and cook until done.",
        "Serve with raita."
      ]
    },
    { 
      id: 27, 
      name: "Kabuli Pulao",
      tagline: "Afghan style rice with carrots and raisins",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "500g mutton",
        "2 carrots, julienned",
        "1/2 cup raisins",
        "1/2 cup almonds",
        "2 onions, sliced",
        "1 tsp cumin",
        "4 cloves",
        "2 cardamom",
        "1 cinnamon",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook mutton with spices until tender.",
        "Cook rice separately.",
        "Fry carrots and raisins in oil.",
        "Layer rice and mutton.",
        "Top with carrots and raisins.",
        "Cover and steam for 10 minutes.",
        "Serve."
      ]
    },
    { 
      id: 28, 
      name: "Mandhi",
      tagline: "Yemeni style spiced rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups basmati rice",
        "500g chicken",
        "2 onions, sliced",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp black pepper",
        "1 tsp cardamom powder",
        "1 tsp cloves powder",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Marinate chicken with spices.",
        "Roast chicken in oven until done.",
        "Cook rice in chicken stock.",
        "Serve rice topped with chicken."
      ]
    },
    { 
      id: 29, 
      name: "Kabsa",
      tagline: "Saudi Arabian spiced rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "500g chicken",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp pepper",
        "1 tsp cardamom",
        "1 tsp cloves",
        "1 cinnamon",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook chicken with spices.",
        "Add rice and water.",
        "Cook until rice is done.",
        "Serve with chicken on top."
      ]
    },
    { 
      id: 30, 
      name: "Jeera Rice",
      tagline: "Simple cumin flavored rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup rice",
        "1 tsp cumin seeds",
        "1 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Wash and soak rice.",
        "Heat ghee, add cumin seeds.",
        "Add rice and 2 cups water.",
        "Cook until rice is done.",
        "Serve with dal."
      ]
    },
    { 
      id: 31, 
      name: "Coconut Rice",
      tagline: "Rice with coconut",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup rice",
        "1/2 cup coconut, grated",
        "1 tsp mustard seeds",
        "1 tsp urad dal",
        "1 dried red chili",
        "Curry leaves",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Cook rice and cool.",
        "Heat oil, add mustard, dal, chili, curry leaves.",
        "Add coconut and fry until golden.",
        "Mix with rice and serve."
      ]
    },
    { 
      id: 32, 
      name: "Lemon Rice",
      tagline: "Tangy lemon rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup rice",
        "1 lemon, juiced",
        "1 tsp mustard seeds",
        "1 tsp urad dal",
        "1 tsp chana dal",
        "2 dried red chilies",
        "Curry leaves",
        "1/2 tsp turmeric",
        "2 tbsp oil",
        "Salt to taste",
        "Peanuts"
      ],
      steps: [
        "Cook rice and cool.",
        "Heat oil, add mustard, dals, chilies, curry leaves.",
        "Add turmeric, peanuts and lemon juice.",
        "Mix with rice and serve."
      ]
    },
    { 
      id: 33, 
      name: "Tomato Rice",
      tagline: "Rice with tomatoes",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup rice",
        "2 tomatoes, pureed",
        "1 onion, chopped",
        "1 tbsp ginger-garlic",
        "1 tsp mustard seeds",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "1 tsp red chili",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add mustard and cumin.",
        "Add onions and ginger-garlic. Sauté.",
        "Add tomato puree and spices. Cook.",
        "Add rice and 2 cups water.",
        "Cook until rice is done.",
        "Serve with raita."
      ]
    },

    // ==================== RICE WITH MEAT (4) ====================
    { 
      id: 34, 
      name: "Keema Rice",
      tagline: "Rice with minced meat",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "300g mince",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook mince with spices.",
        "Add rice and water.",
        "Cook until rice is done.",
        "Serve."
      ]
    },
    { 
      id: 35, 
      name: "Aloo Keema Rice",
      tagline: "Rice with mince and potatoes",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "300g mince",
        "2 potatoes, cubed",
        "2 onions",
        "2 tomatoes",
        "2 tbsp ginger-garlic",
        "1 tsp cumin",
        "1 tsp turmeric",
        "2 tsp red chili",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook mince and potatoes with spices.",
        "Add rice and water.",
        "Cook until done.",
        "Serve with raita."
      ]
    },
    { 
      id: 36, 
      name: "Egg Rice",
      tagline: "Rice with eggs",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "4 boiled eggs",
        "2 onions",
        "1 tsp cumin",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook rice with cumin and salt.",
        "Fry boiled eggs in oil.",
        "Serve rice topped with eggs."
      ]
    },
    { 
      id: 37, 
      name: "Fish Rice",
      tagline: "Rice with fried fish",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "2 cups rice",
        "4 fish fillets",
        "2 onions",
        "1 tsp cumin",
        "1/2 cup oil",
        "Salt to taste"
      ],
      steps: [
        "Cook plain rice.",
        "Fry fish with spices.",
        "Serve rice with fish."
      ]
    },

    // ==================== RICE DESSERTS (3) ====================
    { 
      id: 38, 
      name: "Kheer",
      tagline: "Rice pudding",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1/2 cup rice",
        "1 liter milk",
        "3/4 cup sugar",
        "4 cardamom",
        "2 tbsp raisins",
        "2 tbsp almonds, sliced",
        "2 tbsp pistachios",
        "1 tsp rose water"
      ],
      steps: [
        "Wash and soak rice for 30 minutes.",
        "Boil milk in heavy bottom pan.",
        "Add rice and cook on low heat until rice is soft.",
        "Add sugar and cardamom. Cook for 10 minutes.",
        "Add dry fruits and rose water.",
        "Serve chilled or warm."
      ]
    },
    { 
      id: 39, 
      name: "Phirni",
      tagline: "Ground rice pudding",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1/4 cup rice, soaked and ground",
        "1 liter milk",
        "3/4 cup sugar",
        "4 cardamom",
        "2 tbsp almonds",
        "2 tbsp pistachios",
        "1 tsp rose water"
      ],
      steps: [
        "Soak rice for 2 hours, grind to paste.",
        "Boil milk, add rice paste stirring continuously.",
        "Cook until thick, add sugar and cardamom.",
        "Pour into serving bowls.",
        "Garnish with nuts and chill."
      ]
    },
    { 
      id: 40, 
      name: "Rice Kheer with Mango",
      tagline: "Mango rice pudding",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1/2 cup rice",
        "1 liter milk",
        "3/4 cup sugar",
        "2 mangoes, pureed",
        "4 cardamom",
        "2 tbsp pistachios"
      ],
      steps: [
        "Make kheer as usual.",
        "Cool completely.",
        "Add mango puree and mix.",
        "Chill and serve."
      ]
    }
  ];

  // Combine all arrays
  const allRiceRecipes = [...riceRecipes, ...moreRiceRecipes, ...finalRiceRecipes];
    // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allRiceRecipes;

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
    <div className="rice-page">
      {/* Header */}
      <header className="rice-header">
        <div className="rice-header-content">
          <h1 className="rice-title">🍚 Rice Dishes</h1>
          <p className="rice-description">
            Discover 40+ delicious rice recipes - biryani, pulao, fried rice, khichdi, zarda aur bhi bahut kuch
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="rice-main">
        <div className="rice-grid-section">
          <div className="rice-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="rice-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="rice-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="rice-card-content">
                  <h3 className="rice-card-title">{recipe.name}</h3>
                  <p className="rice-card-description">{recipe.tagline}</p>
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
        <div className="rice-modal-overlay" onClick={handleCloseModal}>
          <div
            className="rice-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="rice-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="rice-modal-header">
              <div className="rice-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="rice-modal-content">
              {/* Column 1: Ingredients */}
              <div className="rice-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="rice-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="rice-ingredient-item">
                      <span className="rice-ingredient-bullet">•</span>
                      <span className="rice-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="rice-modal-steps">
                <h3>Steps to Make</h3>
                <div className="rice-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="rice-step-item">
                      <span className="rice-step-number">{index + 1}.</span>
                      <span className="rice-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="rice-modal-voice-container">
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

export default RecipesRice;