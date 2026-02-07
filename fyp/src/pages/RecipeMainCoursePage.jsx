

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeMainCoursePage.css';

const RecipeMainCoursePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceInstructions, setShowVoiceInstructions] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);
  const autoPlayStartedRef = useRef(false);

  // Main Course images array
  const mainCourseImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwaF6-1Auf1DuOXo9FhalxTrx1j-BnkoOu4A&s", // Biryani
    "https://ikneadtoeat.com/wp-content/uploads/2020/02/White-Chicken-Karahi-3.jpg", // White Karahi
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0pyTpZG0PaszsXAAjHHVsfW1DJtX8WSseA&s", // Chicken Changezi
    "https://images.immediate.co.uk/production/volatile/sites/30/2024/12/Nihari-2c750c0.jpg?resize=768,713", // Nihari
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_M3ClivyRkqSWk2UdFroJXXBgmIde1tKPOw&s", // Pulao
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-188u8p8ff9HhSTH4nxwHEnL47n8bcRcy_Q&s", // Seekh Kabab
    "https://www.teaforturmeric.com/wp-content/uploads/2022/04/Chapli-Kabab-13.jpg", // Chapli Kabab
    "https://shwetainthekitchen.com/wp-content/uploads/2024/02/Lauki-Kofta-Curry.jpg", // Kofta
    "https://recipe52.com/wp-content/uploads/2022/03/chicken-handi-10.jpg", // Chicken Handi
    "https://static.toiimg.com/photo/52554168.cms", // Mutton Korma
    "https://untoldrecipesbynosheen.com/wp-content/uploads/2021/08/aloo-gosht-new-featured.jpg", // Aloo Gosht
    "https://recipe52.com/wp-content/uploads/2020/05/Daal-Chawal-Palidu-DCP-29.jpg", // Daal Chawal
    "https://thecurrymommy.com/wp-content/uploads/2021/09/chicken-kheema-recipe-chicken-keema-recipe-indian-ground-mince-meat.jpg", // Keema
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStJqIM6vVUQjjs8E7HDqOVFTdqB-MeJnDDOg&s", // Tandoori Champ
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnLV_Dq4nc6uUZ0RD9IPp96gGGv7JAKDj47A&s", // Fish Curry
    "https://www.whiskaffair.com/wp-content/uploads/2020/06/Chicken-Tikka-2-3.jpg", // Chicken Tikka
    "https://www.flourandspiceblog.com/wp-content/uploads/2022/01/IMG_5953.jpg", // Mutton Roast
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6x_U-Lh-fFDoAqCG3jGVcE0-6Jn5APuwR-Q&s", // Chicken Roast
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkeJn13kzR0EiSZJmX_2jQJEh4VmHc1PiUw&s", // Lobia
    "https://i.ytimg.com/vi/YkE1gSl8uuE/sddefault.jpg", // Shahi Tukda
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9KvmihSbogLiTxAgkioSKOO8aHCnkHfDwLA&s", // Spaghetti
    "https://images.unsplash.com/photo-1600891964092-4316c288032e", // Beef Steak
    "https://www.licious.in/blog/wp-content/uploads/2020/12/Grilled-Chicken-min-600x600.jpg", // Grilled Chicken
    "https://dinnerthendessert.com/wp-content/uploads/2024/02/fish-and-chips-1x1-1.jpg", // Fish and Chips
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", // Beef Burger
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", // Pizza
    "https://images.unsplash.com/photo-1574894709920-11b28e7367e3", // Lasagna
    "https://iwashyoudry.com/wp-content/uploads/2022/08/Chicken-Alfredo-Low-Res-21.jpg", // Chicken Alfredo
    "https://images.unsplash.com/photo-1600891964092-4316c288032e", // Beef Stroganoff
    "https://kalejunkie.com/wp-content/uploads/2024/02/KJChickenParmesan_Shot5_110.jpg", // Chicken Parmesan
    "https://assets.bonappetit.com/photos/64349ba03fd52da4745a35f4/1:1/w_3563,h_3563,c_limit/04102023-ratatouille-lede.jpg", // Ratatouille
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZfcobXlYx9o-ZFdQJ7RhoTAG1ox0hfy6gSQ&s", // Shepherd's Pie
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYV7VXm6vtJNsssrvlOUeMB5buH6wQWGqe6A&s", // Chicken Cordon Bleu
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0o1vUg4qmzBkGit2v2zc86QT-lGD8_oSgTA&s", // Beef Wellington
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS6kh2bCCe4dv3YDCIH1YN34dM9Lj1Yuj5dA&s", // Chicken Kiev
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNJ7ovuPEU5IQUw83twVqAEFtgXu28_yZweg&s", // Paella
    "https://www.recipetineats.com/tachyon/2019/03/Greek-Moussaka_3-re-edited-SQ.jpg?resize=500%2C375", // Moussaka
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhOGk6bET8iIk6d4Lg4sgFf_SppIvi-Qj6NQ&s", // Chicken Fajitas
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ddh7C_A5gr3FQ2uulORjQxDrHTqwfrQG3w&s", // Beef Tacos
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5dLdtHbB5gJeq_70QmjNSMsILUie7tnpdA&s"  // Chicken Quesadilla
  ];

  // All Main Course Recipes with Complete Details
  const mainCourseRecipes = [
    { 
      id: 1, 
      name: "Biryani Recipe",
      ingredients: [
        "2 cups basmati rice",
        "500g chicken/mutton pieces",
        "2 large onions, thinly sliced",
        "2 tomatoes, chopped",
        "1 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "Whole spices: 4 cloves, 4 cardamoms, 2 cinnamon sticks",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "2 tsp biryani masala",
        "Fresh mint and coriander leaves",
        "Saffron strands soaked in milk",
        "4 tbsp ghee or oil",
        "Salt to taste"
      ],
      instructions: [
        "Wash and soak basmati rice for 30 minutes.",
        "Heat oil in large pan, fry onions until golden brown.",
        "Add ginger-garlic paste and sauté for 2 minutes.",
        "Add tomatoes and cook until soft.",
        "Add chicken/mutton pieces, yogurt, and all spices.",
        "Cook until meat is 70% done.",
        "In separate pot, boil rice with salt until 70% cooked.",
        "Layer cooked meat and rice in heavy-bottomed pot.",
        "Add fried onions, mint, coriander between layers.",
        "Drizzle saffron milk and ghee on top.",
        "Cover with tight lid, cook on low heat for 20 minutes.",
        "Let it rest for 10 minutes before serving.",
        "Serve hot with raita."
      ]
    },
    { 
      id: 2, 
      name: "White Karahi Recipe",
      ingredients: [
        "500g boneless chicken",
        "1 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "1 cup cream",
        "4 tbsp butter",
        "1 tsp white pepper powder",
        "1 tsp crushed black pepper",
        "1 tsp garam masala",
        "2 green chilies, slit",
        "Fresh coriander for garnish",
        "1 tsp salt",
        "1 tbsp ginger julienne"
      ],
      instructions: [
        "Heat butter in karahi, add ginger-garlic paste.",
        "Sauté for 1 minute until fragrant.",
        "Add chicken pieces, cook on high heat for 5 minutes.",
        "Reduce heat, add yogurt while stirring continuously.",
        "Cook until chicken is tender and yogurt thickens.",
        "Add cream, white pepper, black pepper, and salt.",
        "Simmer for 10 minutes on low heat.",
        "Add green chilies and garam masala.",
        "Garnish with ginger julienne and fresh coriander.",
        "Serve hot with naan or roti."
      ]
    },
    { 
      id: 3, 
      name: "Chicken Changezi Recipe",
      ingredients: [
        "500g chicken, cut into pieces",
        "2 large onions, chopped",
        "2 tomatoes, pureed",
        "1/2 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "4 tbsp oil",
        "1 cup water",
        "Fresh coriander for garnish",
        "Salt to taste",
        "1 tbsp kasuri methi"
      ],
      instructions: [
        "Heat oil in pan, fry onions until golden brown.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add tomato puree, cook until oil separates.",
        "Add all spices and mix well.",
        "Add chicken pieces, cook for 5 minutes.",
        "Add yogurt and mix thoroughly.",
        "Add water, cover and cook until chicken is tender.",
        "Crush kasuri methi between palms and add.",
        "Cook until gravy thickens to desired consistency.",
        "Garnish with fresh coriander.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 4, 
      name: "Nihari Recipe",
      ingredients: [
        "1kg beef/mutton with bones",
        "2 tbsp wheat flour",
        "2 large onions, sliced",
        "2 tbsp ginger paste",
        "2 tbsp garlic paste",
        "Nihari masala: 2 tbsp",
        "1/2 cup oil",
        "8 cups water",
        "Ginger julienne for garnish",
        "Green chilies for garnish",
        "Fresh coriander for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Heat oil in large pot, fry onions until golden.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add meat and nihari masala, cook for 10 minutes.",
        "Add water, bring to boil then reduce heat.",
        "Simmer for 4-5 hours until meat is tender.",
        "Mix wheat flour with water to make smooth paste.",
        "Add paste to nihari to thicken gravy.",
        "Cook for another 30 minutes.",
        "Garnish with ginger julienne, green chilies, and coriander.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 5, 
      name: "Pulao Recipe",
      ingredients: [
        "2 cups basmati rice",
        "500g chicken/mutton (optional)",
        "1 large onion, sliced",
        "2 tomatoes, chopped",
        "Whole spices: 4 cloves, 4 cardamoms, 2 cinnamon",
        "1 tsp cumin seeds",
        "2 tbsp ginger-garlic paste",
        "1 tsp turmeric powder",
        "2 tsp garam masala",
        "4 tbsp oil/ghee",
        "4 cups water",
        "Fresh coriander for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Wash and soak rice for 30 minutes.",
        "Heat oil/ghee in pot, add whole spices and cumin.",
        "Add onions, fry until golden brown.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add tomatoes, cook until soft.",
        "Add meat (if using), cook for 10 minutes.",
        "Add rice and all spices, mix gently.",
        "Add water and salt, bring to boil.",
        "Reduce heat, cover and cook until rice is done.",
        "Let it rest for 10 minutes before serving.",
        "Garnish with fresh coriander.",
        "Serve hot with raita or salad."
      ]
    },
    { 
      id: 6, 
      name: "Seekh Kabab Recipe",
      ingredients: [
        "500g minced beef/chicken",
        "1 large onion, finely chopped",
        "2 tbsp ginger-garlic paste",
        "2 tbsp coriander powder",
        "1 tbsp cumin powder",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp chickpea flour",
        "2 tbsp oil",
        "Fresh coriander, chopped",
        "Salt to taste",
        "Skewers for shaping"
      ],
      instructions: [
        "Mix all ingredients thoroughly in large bowl.",
        "Knead mixture for 5-10 minutes.",
        "Cover and refrigerate for 2 hours.",
        "Take small portion, shape around skewers.",
        "Preheat grill or barbecue.",
        "Brush kababs with oil.",
        "Grill for 10-12 minutes, turning occasionally.",
        "Cook until golden brown and cooked through.",
        "Serve hot with mint chutney and naan."
      ]
    },
    { 
      id: 7, 
      name: "Chapli Kabab Recipe",
      ingredients: [
        "500g minced beef",
        "1 large onion, finely chopped",
        "2 tomatoes, finely chopped",
        "2 green chilies, finely chopped",
        "2 tbsp ginger-garlic paste",
        "1 tbsp coriander seeds, crushed",
        "1 tbsp pomegranate seeds, crushed",
        "1 egg",
        "2 tbsp corn flour",
        "Fresh coriander, chopped",
        "Oil for frying",
        "Salt to taste"
      ],
      instructions: [
        "Mix all ingredients in large bowl.",
        "Knead mixture for 5 minutes.",
        "Divide into equal portions.",
        "Shape into round patties.",
        "Heat oil in pan on medium heat.",
        "Fry kababs until golden brown on both sides.",
        "Drain on paper towels.",
        "Serve hot with naan and salad."
      ]
    },
    { 
      id: 8, 
      name: "Kofta Recipe",
      ingredients: [
        "For koftas: 500g minced meat",
        "1 onion, grated",
        "2 tbsp ginger-garlic paste",
        "1 tsp garam masala",
        "1 egg",
        "2 tbsp bread crumbs",
        "For gravy: 2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp yogurt",
        "1 tsp turmeric powder",
        "2 tsp coriander powder",
        "Oil for frying",
        "Fresh coriander for garnish"
      ],
      instructions: [
        "Mix all kofta ingredients thoroughly.",
        "Shape into round balls.",
        "Heat oil, fry koftas until golden brown.",
        "For gravy: Heat oil, fry onions until golden.",
        "Add ginger-garlic paste, sauté.",
        "Add tomato puree and spices, cook until oil separates.",
        "Add yogurt and water, simmer for 10 minutes.",
        "Add fried koftas to gravy.",
        "Simmer for 10 minutes on low heat.",
        "Garnish with fresh coriander.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 9, 
      name: "Chicken Handi Recipe",
      ingredients: [
        "500g boneless chicken",
        "1 cup yogurt",
        "1/2 cup cream",
        "2 tbsp ginger-garlic paste",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "1 tsp garam masala",
        "4 tbsp butter",
        "Fresh coriander for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Heat butter in handi, fry onions until golden.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add tomatoes, cook until soft.",
        "Add chicken and spices, cook for 5 minutes.",
        "Add yogurt, mix well.",
        "Cover and cook until chicken is tender.",
        "Add cream, simmer for 5 minutes.",
        "Garnish with fresh coriander.",
        "Serve hot in same handi with naan."
      ]
    },
    { 
      id: 10, 
      name: "Mutton Korma Recipe",
      ingredients: [
        "1kg mutton with bones",
        "2 cups yogurt",
        "2 onions, fried and ground to paste",
        "2 tbsp ginger-garlic paste",
        "1 cup fried onions",
        "1/2 cup cashew paste",
        "1/2 cup poppy seed paste",
        "1 tsp turmeric powder",
        "1 tsp garam masala",
        "4 tbsp ghee",
        "Saffron strands",
        "Salt to taste"
      ],
      instructions: [
        "Heat ghee in heavy-bottomed pot.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add mutton, cook for 10 minutes.",
        "Add fried onion paste and yogurt.",
        "Add all spices except garam masala.",
        "Add cashew and poppy seed paste.",
        "Add water, cover and cook until mutton is tender.",
        "Add garam masala and saffron.",
        "Simmer for 10 minutes.",
        "Garnish with fried onions.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 11, 
      name: "Aloo Gosht Recipe",
      ingredients: [
        "500g mutton/beef",
        "4 potatoes, peeled and cubed",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "2 tsp coriander powder",
        "4 tbsp oil",
        "Fresh coriander for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Heat oil in pressure cooker.",
        "Fry onions until golden brown.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add tomatoes, cook until soft.",
        "Add meat and spices, cook for 5 minutes.",
        "Add potatoes and water.",
        "Pressure cook for 6-7 whistles.",
        "Let pressure release naturally.",
        "Garnish with fresh coriander.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 12, 
      name: "Daal Chawal Recipe",
      ingredients: [
        "1 cup yellow lentils (moong daal)",
        "1/2 cup red lentils (masoor daal)",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "2 green chilies, slit",
        "1 tsp turmeric powder",
        "1 tsp cumin seeds",
        "2 tbsp ghee",
        "Fresh coriander for garnish",
        "For rice: 2 cups basmati rice",
        "Salt to taste"
      ],
      instructions: [
        "Wash and soak lentils for 30 minutes.",
        "Boil lentils with turmeric and salt until soft.",
        "Heat ghee in separate pan.",
        "Add cumin seeds, let them splutter.",
        "Add onions, fry until golden.",
        "Add tomatoes and green chilies, cook until soft.",
        "Add this tempering to cooked lentils.",
        "Simmer for 10 minutes.",
        "Cook rice separately.",
        "Serve hot daal with steamed rice.",
        "Garnish with fresh coriander."
      ]
    },
    { 
      id: 13, 
      name: "Keema Recipe",
      ingredients: [
        "500g minced meat (beef/chicken)",
        "2 onions, finely chopped",
        "2 tomatoes, finely chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "2 tsp coriander powder",
        "1 cup green peas",
        "4 tbsp oil",
        "Fresh coriander for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Heat oil in pan, fry onions until golden.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add tomatoes, cook until soft.",
        "Add minced meat, break up lumps.",
        "Add all spices, mix well.",
        "Cook until meat is browned.",
        "Add green peas and water.",
        "Cover and cook for 15 minutes.",
        "Garnish with fresh coriander.",
        "Serve hot with naan or paratha."
      ]
    },
    { 
      id: 14, 
      name: "Tandoori Champ Masala Gravy Recipe",
      ingredients: [
        "8 lamb chops",
        "1 cup yogurt",
        "2 tbsp tandoori masala",
        "2 tbsp ginger-garlic paste",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "4 tbsp oil",
        "For gravy: 2 onions, pureed",
        "2 tomatoes, pureed",
        "1/2 cup cream",
        "Fresh coriander for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Marinate lamb chops in yogurt and spices for 4 hours.",
        "Grill or bake until cooked.",
        "For gravy: Heat oil, fry onion puree until golden.",
        "Add tomato puree and spices, cook until oil separates.",
        "Add cream, simmer for 5 minutes.",
        "Add grilled chops to gravy.",
        "Simmer for 10 minutes.",
        "Garnish with fresh coriander.",
        "Serve hot with naan."
      ]
    },
    { 
      id: 15, 
      name: "Fish Curry Recipe",
      ingredients: [
        "500g fish fillets",
        "2 onions, chopped",
        "2 tomatoes, pureed",
        "2 tbsp ginger-garlic paste",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "1 tsp cumin powder",
        "1 tsp coriander powder",
        "Tamarind pulp (2 tbsp)",
        "4 tbsp oil",
        "Fresh coriander for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Marinate fish with turmeric and salt for 15 minutes.",
        "Shallow fry fish until golden, set aside.",
        "Heat oil, fry onions until golden.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add tomato puree and spices, cook until oil separates.",
        "Add tamarind pulp and water.",
        "Simmer for 10 minutes.",
        "Gently add fried fish to curry.",
        "Cook for 5 minutes on low heat.",
        "Garnish with fresh coriander.",
        "Serve hot with rice."
      ]
    },
    { 
      id: 16, 
      name: "Chicken Tikka Recipe",
      ingredients: [
        "500g boneless chicken, cubed",
        "1 cup yogurt",
        "2 tbsp ginger-garlic paste",
        "2 tbsp lemon juice",
        "2 tbsp tikka masala",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Bell peppers and onions for skewers",
        "Salt to taste",
        "Skewers for grilling"
      ],
      instructions: [
        "Mix all ingredients except vegetables.",
        "Marinate chicken for 4 hours or overnight.",
        "Thread chicken and vegetables on skewers.",
        "Preheat grill or oven to 200°C.",
        "Brush with oil.",
        "Grill for 15-20 minutes, turning occasionally.",
        "Brush with butter while grilling.",
        "Serve hot with mint chutney and salad."
      ]
    },
    { 
      id: 17, 
      name: "Mutton Roast Recipe",
      ingredients: [
        "1kg mutton with bones",
        "4 potatoes, peeled and halved",
        "2 onions, sliced",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "Whole spices: 4 cloves, 4 cardamoms, 2 cinnamon",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "4 tbsp oil",
        "Fresh coriander for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Heat oil in pressure cooker.",
        "Add whole spices, let them splutter.",
        "Fry onions until golden brown.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add tomatoes, cook until soft.",
        "Add mutton and spices, cook for 10 minutes.",
        "Add potatoes and water.",
        "Pressure cook for 6-7 whistles.",
        "Let pressure release naturally.",
        "If gravy is thin, cook uncovered to thicken.",
        "Garnish with fresh coriander.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 18, 
      name: "Chicken Roast Recipe",
      ingredients: [
        "1 whole chicken (1.5kg)",
        "2 tbsp ginger-garlic paste",
        "2 tbsp lemon juice",
        "2 tbsp yogurt",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "2 tsp garam masala",
        "4 tbsp butter",
        "Potatoes for roasting",
        "Salt to taste"
      ],
      instructions: [
        "Clean and pat dry chicken.",
        "Make marinade with all ingredients except butter.",
        "Apply marinade inside and outside chicken.",
        "Marinate for 4 hours or overnight.",
        "Preheat oven to 180°C.",
        "Place chicken in roasting pan with potatoes.",
        "Dot with butter.",
        "Roast for 1.5 hours, basting occasionally.",
        "Increase temperature to 200°C for last 15 minutes.",
        "Let rest for 15 minutes before carving.",
        "Serve hot with gravy and roasted potatoes."
      ]
    },
    { 
      id: 19, 
      name: "Lobia Recipe",
      ingredients: [
        "2 cups black-eyed peas (lobia), soaked overnight",
        "2 onions, chopped",
        "2 tomatoes, chopped",
        "2 tbsp ginger-garlic paste",
        "1 tsp turmeric powder",
        "2 tsp red chili powder",
        "2 tsp coriander powder",
        "1 tsp garam masala",
        "4 tbsp oil",
        "Fresh coriander for garnish",
        "Salt to taste"
      ],
      instructions: [
        "Pressure cook soaked lobia until soft.",
        "Heat oil in pan, fry onions until golden.",
        "Add ginger-garlic paste, sauté for 2 minutes.",
        "Add tomatoes, cook until soft.",
        "Add all spices, mix well.",
        "Add cooked lobia with its water.",
        "Simmer for 15-20 minutes.",
        "Add garam masala.",
        "Cook until gravy thickens.",
        "Garnish with fresh coriander.",
        "Serve hot with naan or rice."
      ]
    },
    { 
      id: 20, 
      name: "Shahi Tukda Recipe",
      ingredients: [
        "6 slices white bread",
        "2 cups milk",
        "1/2 cup sugar",
        "1/4 cup condensed milk",
        "1/4 cup cream",
        "1/2 tsp cardamom powder",
        "Saffron strands",
        "Chopped nuts for garnish",
        "Ghee for frying",
        "Silver leaf for decoration (optional)"
      ],
      instructions: [
        "Cut bread slices into triangles or squares.",
        "Heat ghee, fry bread until golden brown.",
        "Drain on paper towels.",
        "In saucepan, heat milk until boiling.",
        "Add sugar and condensed milk.",
        "Cook until slightly thickened.",
        "Add cardamom powder and saffron.",
        "Arrange fried bread in serving dish.",
        "Pour hot milk mixture over bread.",
        "Let it soak for 30 minutes.",
        "Top with cream and chopped nuts.",
        "Decorate with silver leaf if using.",
        "Serve warm or chilled."
      ]
    },
    { 
      id: 21, 
      name: "Spaghetti Carbonara",
      ingredients: [
        "400g spaghetti",
        "200g bacon or pancetta, diced",
        "3 eggs",
        "1 cup grated Parmesan cheese",
        "2 cloves garlic, minced",
        "Black pepper",
        "Salt to taste",
        "Fresh parsley for garnish"
      ],
      instructions: [
        "Cook spaghetti according to package directions.",
        "While pasta cooks, fry bacon until crispy.",
        "In bowl, whisk eggs with Parmesan cheese.",
        "Drain pasta, reserving 1 cup pasta water.",
        "Immediately add hot pasta to egg mixture.",
        "Add bacon and garlic, toss quickly.",
        "Add pasta water to create creamy sauce.",
        "Season with black pepper and salt.",
        "Garnish with fresh parsley.",
        "Serve immediately."
      ]
    },
    { 
      id: 22, 
      name: "Beef Steak",
      ingredients: [
        "2 beef steaks (250g each)",
        "2 tbsp olive oil",
        "4 tbsp butter",
        "4 cloves garlic, crushed",
        "Fresh rosemary/thyme",
        "Salt and black pepper",
        "For sauce: 1/2 cup red wine",
        "1/2 cup beef broth"
      ],
      instructions: [
        "Bring steaks to room temperature.",
        "Season generously with salt and pepper.",
        "Heat oil in heavy skillet until smoking.",
        "Sear steaks for 3-4 minutes per side.",
        "Add butter, garlic, and herbs.",
        "Baste steaks with butter for 2 minutes.",
        "Remove steaks, let rest for 5 minutes.",
        "For sauce: Add wine to pan, deglaze.",
        "Add beef broth, reduce by half.",
        "Pour sauce over steaks.",
        "Serve with mashed potatoes and vegetables."
      ]
    },
    { 
      id: 23, 
      name: "Grilled Chicken",
      ingredients: [
        "4 chicken breasts",
        "1/4 cup olive oil",
        "3 tbsp lemon juice",
        "2 tbsp honey",
        "2 cloves garlic, minced",
        "1 tsp paprika",
        "1 tsp dried oregano",
        "Salt and pepper to taste",
        "Fresh herbs for garnish"
      ],
      instructions: [
        "Mix oil, lemon juice, honey, and spices.",
        "Marinate chicken for 2 hours.",
        "Preheat grill to medium-high.",
        "Grill chicken for 6-7 minutes per side.",
        "Brush with marinade while grilling.",
        "Cook until internal temperature reaches 75°C.",
        "Let rest for 5 minutes before slicing.",
        "Garnish with fresh herbs.",
        "Serve with grilled vegetables."
      ]
    },
    { 
      id: 24, 
      name: "Fish and Chips",
      ingredients: [
        "4 white fish fillets",
        "1 cup flour",
        "1 cup beer",
        "1 tsp baking powder",
        "4 large potatoes",
        "Oil for frying",
        "Salt and vinegar",
        "Lemon wedges",
        "Tartar sauce for serving"
      ],
      instructions: [
        "Cut potatoes into thick chips.",
        "Soak chips in cold water for 30 minutes.",
        "Make batter with flour, beer, and baking powder.",
        "Dry chips thoroughly.",
        "Heat oil to 160°C, fry chips until soft.",
        "Increase oil temperature to 190°C.",
        "Dip fish in batter, fry until golden.",
        "Refry chips until crispy.",
        "Drain on paper towels.",
        "Season with salt and vinegar.",
        "Serve with lemon wedges and tartar sauce."
      ]
    },
    { 
      id: 25, 
      name: "Beef Burger",
      ingredients: [
        "500g ground beef",
        "1 onion, finely chopped",
        "1 egg",
        "1/2 cup breadcrumbs",
        "4 burger buns",
        "4 slices cheese",
        "Lettuce, tomato, onion slices",
        "Ketchup and mayonnaise",
        "Salt and pepper",
        "Butter for toasting buns"
      ],
      instructions: [
        "Mix beef, onion, egg, and breadcrumbs.",
        "Season with salt and pepper.",
        "Form into 4 patties.",
        "Grill or pan-fry for 4-5 minutes per side.",
        "Add cheese slice during last minute.",
        "Toast burger buns with butter.",
        "Assemble burgers with lettuce, tomato, onion.",
        "Add sauces as desired.",
        "Serve with fries."
      ]
    },
    { 
      id: 26, 
      name: "Pizza Margherita",
      ingredients: [
        "Pizza dough for 1 large pizza",
        "1 cup pizza sauce",
        "200g fresh mozzarella",
        "Fresh basil leaves",
        "2 tbsp olive oil",
        "Salt to taste",
        "Cornmeal for dusting"
      ],
      instructions: [
        "Preheat oven with pizza stone to 250°C.",
        "Roll out pizza dough on floured surface.",
        "Dust pizza peel with cornmeal.",
        "Transfer dough to pizza peel.",
        "Spread pizza sauce evenly.",
        "Tear mozzarella and distribute.",
        "Drizzle with olive oil.",
        "Slide pizza onto hot stone.",
        "Bake for 10-12 minutes until crust is golden.",
        "Remove from oven, top with fresh basil.",
        "Slice and serve immediately."
      ]
    },
    { 
      id: 27, 
      name: "Lasagna",
      ingredients: [
        "12 lasagna noodles",
        "500g ground beef",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "800g tomato sauce",
        "500g ricotta cheese",
        "1 egg",
        "2 cups shredded mozzarella",
        "1 cup grated Parmesan",
        "Fresh basil",
        "Salt and pepper"
      ],
      instructions: [
        "Cook lasagna noodles according to package.",
        "Brown beef with onion and garlic.",
        "Add tomato sauce, simmer for 20 minutes.",
        "Mix ricotta with egg and basil.",
        "In baking dish, layer noodles, meat sauce, ricotta.",
        "Repeat layers, ending with meat sauce.",
        "Top with mozzarella and Parmesan.",
        "Cover with foil, bake at 180°C for 25 minutes.",
        "Remove foil, bake for 25 more minutes.",
        "Let rest for 15 minutes before serving."
      ]
    },
    { 
      id: 28, 
      name: "Chicken Alfredo",
      ingredients: [
        "400g fettuccine",
        "2 chicken breasts, sliced",
        "1 cup heavy cream",
        "1/2 cup butter",
        "1 cup grated Parmesan",
        "3 cloves garlic, minced",
        "Fresh parsley",
        "Salt and pepper",
        "Olive oil"
      ],
      instructions: [
        "Cook pasta according to package directions.",
        "Season chicken with salt and pepper.",
        "Heat oil, cook chicken until golden.",
        "In separate pan, melt butter.",
        "Add garlic, sauté for 1 minute.",
        "Add cream, bring to simmer.",
        "Stir in Parmesan until melted.",
        "Add cooked chicken to sauce.",
        "Toss pasta with sauce.",
        "Garnish with parsley.",
        "Serve immediately."
      ]
    },
    { 
      id: 29, 
      name: "Beef Stroganoff",
      ingredients: [
        "500g beef sirloin, sliced",
        "1 onion, sliced",
        "250g mushrooms, sliced",
        "2 tbsp flour",
        "1 cup beef broth",
        "1/2 cup sour cream",
        "2 tbsp tomato paste",
        "2 tbsp butter",
        "Egg noodles for serving",
        "Fresh dill for garnish"
      ],
      instructions: [
        "Cook egg noodles according to package.",
        "Season beef with salt and pepper.",
        "Heat butter, sear beef quickly, set aside.",
        "In same pan, cook onions until soft.",
        "Add mushrooms, cook until browned.",
        "Sprinkle flour, cook for 1 minute.",
        "Add beef broth and tomato paste.",
        "Simmer until thickened.",
        "Return beef to pan.",
        "Stir in sour cream off heat.",
        "Serve over egg noodles.",
        "Garnish with fresh dill."
      ]
    },
    { 
      id: 30, 
      name: "Chicken Parmesan",
      ingredients: [
        "4 chicken breasts",
        "1 cup flour",
        "2 eggs, beaten",
        "2 cups breadcrumbs",
        "2 cups marinara sauce",
        "2 cups shredded mozzarella",
        "1/2 cup grated Parmesan",
        "Oil for frying",
        "Fresh basil",
        "Salt and pepper"
      ],
      instructions: [
        "Pound chicken breasts to even thickness.",
        "Season with salt and pepper.",
        "Dredge in flour, then eggs, then breadcrumbs.",
        "Heat oil, fry chicken until golden.",
        "Place in baking dish.",
        "Top each with marinara sauce.",
        "Add mozzarella and Parmesan.",
        "Bake at 200°C for 20 minutes.",
        "Broil for 2 minutes until cheese bubbles.",
        "Garnish with fresh basil.",
        "Serve with pasta."
      ]
    },
    { 
      id: 31, 
      name: "Ratatouille",
      ingredients: [
        "1 eggplant, diced",
        "2 zucchinis, sliced",
        "1 bell pepper, chopped",
        "1 onion, chopped",
        "3 tomatoes, chopped",
        "3 cloves garlic, minced",
        "2 tbsp olive oil",
        "Fresh thyme",
        "Salt and pepper",
        "Fresh basil for garnish"
      ],
      instructions: [
        "Salt eggplant, let sit for 30 minutes, rinse.",
        "Heat oil in large pot.",
        "Cook onions until translucent.",
        "Add garlic, cook for 1 minute.",
        "Add eggplant, cook for 5 minutes.",
        "Add zucchini and bell pepper.",
        "Cook for 5 more minutes.",
        "Add tomatoes and thyme.",
        "Simmer for 20 minutes.",
        "Season with salt and pepper.",
        "Garnish with fresh basil.",
        "Serve warm or at room temperature."
      ]
    },
    { 
      id: 32, 
      name: "Shepherd's Pie",
      ingredients: [
        "500g ground lamb/beef",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 cloves garlic, minced",
        "1 cup beef broth",
        "2 tbsp tomato paste",
        "1 cup frozen peas",
        "4 large potatoes",
        "1/2 cup milk",
        "4 tbsp butter",
        "Salt and pepper"
      ],
      instructions: [
        "Boil potatoes until soft, mash with milk and butter.",
        "Brown meat in pan, set aside.",
        "In same pan, cook onions and carrots until soft.",
        "Add garlic, cook for 1 minute.",
        "Return meat to pan.",
        "Add tomato paste and beef broth.",
        "Simmer for 10 minutes.",
        "Stir in peas.",
        "Transfer to baking dish.",
        "Top with mashed potatoes.",
        "Bake at 200°C for 25 minutes.",
        "Broil for 5 minutes until golden."
      ]
    },
    { 
      id: 33, 
      name: "Chicken Cordon Bleu",
      ingredients: [
        "4 chicken breasts",
        "4 slices ham",
        "4 slices Swiss cheese",
        "1 cup flour",
        "2 eggs, beaten",
        "2 cups breadcrumbs",
        "4 tbsp butter",
        "Salt and pepper",
        "Toothpicks for securing"
      ],
      instructions: [
        "Pound chicken breasts thin.",
        "Season with salt and pepper.",
        "Place ham and cheese on each breast.",
        "Roll up tightly, secure with toothpicks.",
        "Dredge in flour, then eggs, then breadcrumbs.",
        "Heat butter in pan.",
        "Brown chicken on all sides.",
        "Transfer to baking dish.",
        "Bake at 180°C for 25 minutes.",
        "Let rest for 5 minutes before slicing.",
        "Serve with creamy sauce."
      ]
    },
    { 
      id: 34, 
      name: "Beef Wellington",
      ingredients: [
        "500g beef tenderloin",
        "200g mushrooms, finely chopped",
        "8 slices prosciutto",
        "2 tbsp Dijon mustard",
        "500g puff pastry",
        "1 egg for egg wash",
        "Salt and pepper",
        "2 tbsp olive oil"
      ],
      instructions: [
        "Season beef, sear in hot oil on all sides.",
        "Brush with mustard, let cool.",
        "Cook mushrooms until dry, season, cool.",
        "Lay prosciutto on plastic wrap.",
        "Spread mushroom mixture over prosciutto.",
        "Place beef on top, wrap tightly.",
        "Refrigerate for 30 minutes.",
        "Roll out pastry, wrap beef completely.",
        "Brush with egg wash.",
        "Bake at 200°C for 25-30 minutes.",
        "Let rest for 10 minutes before slicing."
      ]
    },
    { 
      id: 35, 
      name: "Chicken Kiev",
      ingredients: [
        "4 chicken breasts",
        "1/2 cup butter, softened",
        "2 tbsp fresh parsley, chopped",
        "1 clove garlic, minced",
        "1 cup flour",
        "2 eggs, beaten",
        "2 cups breadcrumbs",
        "Oil for frying",
        "Salt and pepper"
      ],
      instructions: [
        "Mix butter with parsley and garlic.",
        "Form into 4 logs, freeze for 30 minutes.",
        "Cut pocket in each chicken breast.",
        "Insert butter log into pocket.",
        "Season chicken with salt and pepper.",
        "Dredge in flour, then eggs, then breadcrumbs.",
        "Heat oil to 175°C.",
        "Fry chicken until golden brown.",
        "Bake at 180°C for 20 minutes.",
        "Serve immediately."
      ]
    },
    { 
      id: 36, 
      name: "Paella",
      ingredients: [
        "2 cups short-grain rice",
        "500g chicken, cubed",
        "200g shrimp",
        "200g mussels",
        "1 onion, chopped",
        "1 bell pepper, sliced",
        "3 cloves garlic, minced",
        "1 tsp saffron threads",
        "4 cups chicken broth",
        "1 cup frozen peas",
        "Lemon wedges",
        "Olive oil",
        "Salt and pepper"
      ],
      instructions: [
        "Heat oil in paella pan.",
        "Brown chicken, set aside.",
        "Cook onions and peppers until soft.",
        "Add garlic, cook for 1 minute.",
        "Add rice, stir to coat.",
        "Add saffron and hot broth.",
        "Bring to boil, then reduce heat.",
        "Arrange chicken and seafood on top.",
        "Cook without stirring for 20 minutes.",
        "Add peas during last 5 minutes.",
        "Let rest for 10 minutes.",
        "Serve with lemon wedges."
      ]
    },
    { 
      id: 37, 
      name: "Moussaka",
      ingredients: [
        "2 eggplants, sliced",
        "500g ground lamb",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "400g tomato sauce",
        "1 tsp cinnamon",
        "For béchamel: 4 tbsp butter",
        "4 tbsp flour",
        "2 cups milk",
        "2 eggs",
        "1/2 cup Parmesan",
        "Salt and pepper"
      ],
      instructions: [
        "Salt eggplant, let sit for 30 minutes, rinse and pat dry.",
        "Brown eggplant in oil, set aside.",
        "Brown lamb with onions and garlic.",
        "Add tomato sauce and cinnamon, simmer.",
        "For béchamel: Melt butter, add flour.",
        "Cook for 2 minutes, gradually add milk.",
        "Cook until thickened, cool slightly.",
        "Whisk in eggs and Parmesan.",
        "Layer eggplant and meat sauce in dish.",
        "Top with béchamel sauce.",
        "Bake at 180°C for 45 minutes.",
        "Let cool for 15 minutes before serving."
      ]
    },
    { 
      id: 38, 
      name: "Chicken Fajitas",
      ingredients: [
        "3 chicken breasts, sliced",
        "2 bell peppers, sliced",
        "1 onion, sliced",
        "2 tbsp fajita seasoning",
        "2 tbsp olive oil",
        "8 flour tortillas",
        "For serving: salsa, guacamole, sour cream",
        "Lime wedges",
        "Fresh cilantro"
      ],
      instructions: [
        "Marinate chicken with 1 tbsp oil and seasoning.",
        "Heat remaining oil in large skillet.",
        "Cook chicken until browned, set aside.",
        "In same pan, cook peppers and onions until soft.",
        "Return chicken to pan, mix well.",
        "Warm tortillas.",
        "Serve chicken mixture with warm tortillas.",
        "Offer salsa, guacamole, and sour cream.",
        "Garnish with cilantro.",
        "Serve with lime wedges."
      ]
    },
    { 
      id: 39, 
      name: "Beef Tacos",
      ingredients: [
        "500g ground beef",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "2 tbsp taco seasoning",
        "12 taco shells",
        "For toppings: lettuce, tomato, cheese",
        "Salsa and sour cream",
        "Fresh cilantro",
        "Lime wedges",
        "Oil for cooking"
      ],
      instructions: [
        "Brown beef in pan, drain excess fat.",
        "Add onions and garlic, cook until soft.",
        "Add taco seasoning and water.",
        "Simmer for 10 minutes.",
        "Warm taco shells according to package.",
        "Prepare all toppings.",
        "Fill taco shells with beef mixture.",
        "Add desired toppings.",
        "Garnish with cilantro.",
        "Serve with lime wedges."
      ]
    },
    { 
      id: 40, 
      name: "Chicken Quesadilla",
      ingredients: [
        "2 chicken breasts, cooked and shredded",
        "4 large flour tortillas",
        "2 cups shredded cheese",
        "1 bell pepper, diced",
        "1 onion, diced",
        "2 tbsp oil",
        "Salsa for serving",
        "Sour cream for serving",
        "Guacamole for serving",
        "Salt and pepper"
      ],
      instructions: [
        "Heat 1 tbsp oil in pan.",
        "Cook peppers and onions until soft.",
        "Mix with shredded chicken.",
        "Place tortilla in clean pan.",
        "Sprinkle cheese on half of tortilla.",
        "Add chicken mixture on top of cheese.",
        "Sprinkle more cheese.",
        "Fold tortilla over.",
        "Cook until golden on both sides.",
        "Repeat with remaining tortillas.",
        "Cut into wedges.",
        "Serve with salsa, sour cream, and guacamole."
      ]
    }
  ];

  // Voice instructions handler
  const speakInstructions = (instructions, stepIndex = 0, autoStart = true) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        speechSynthesisRef.current = null;
        return;
      }

      if (stepIndex >= 0 && stepIndex < instructions.length) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = `Step ${stepIndex + 1}: ${instructions[stepIndex]}`;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        setCurrentStep(stepIndex + 1);
        const stepProgress = ((stepIndex + 1) / instructions.length) * 100;
        setProgress(stepProgress);
        
        utterance.onstart = () => {
          setIsPlaying(true);
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
          
          if (stepIndex < instructions.length - 1) {
            setTimeout(() => {
              if (showVoiceInstructions && !speechSynthesisRef.current) {
                speakInstructions(instructions, stepIndex + 1, true);
              }
            }, 1000);
          }
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
        };
        
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } else {
        const utterance = new SpeechSynthesisUtterance();
        let fullText = "";
        instructions.forEach((step, index) => {
          fullText += `Step ${index + 1}: ${step}. `;
        });
        
        utterance.text = fullText;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onstart = () => {
          setIsPlaying(true);
          setCurrentStep(1);
          setProgress(10);
        };
        
        const totalTime = fullText.length * 0.05;
        const intervalTime = totalTime * 10;
        let currentProgress = 10;
        
        const progressInterval = setInterval(() => {
          if (currentProgress < 90) {
            currentProgress += 5;
            setProgress(currentProgress);
          }
        }, intervalTime / 18);
        
        utterance.onend = () => {
          clearInterval(progressInterval);
          setIsPlaying(false);
          setCurrentStep(instructions.length);
          setProgress(100);
          speechSynthesisRef.current = null;
        };
        
        utterance.onerror = () => {
          clearInterval(progressInterval);
          setIsPlaying(false);
          setCurrentStep(0);
          setProgress(0);
          speechSynthesisRef.current = null;
        };
        
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert('Your browser does not support text-to-speech. Please use a modern browser like Chrome or Edge.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      speechSynthesisRef.current = null;
    }
  };

  const speakNextStep = () => {
    if (selectedRecipe && currentStep < selectedRecipe.instructions.length) {
      stopSpeaking();
      speakInstructions(selectedRecipe.instructions, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedRecipe && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedRecipe.instructions, currentStep - 2);
    }
  };

  const speakStep = (stepIndex) => {
    if (selectedRecipe && stepIndex >= 0 && stepIndex < selectedRecipe.instructions.length) {
      stopSpeaking();
      speakInstructions(selectedRecipe.instructions, stepIndex);
    }
  };

  const toggleVoiceInstructions = () => {
    const newState = !showVoiceInstructions;
    setShowVoiceInstructions(newState);
    
    if (newState && selectedRecipe && !autoPlayStartedRef.current) {
      autoPlayStartedRef.current = true;
      setTimeout(() => {
        if (showVoiceInstructions && selectedRecipe) {
          speakInstructions(selectedRecipe.instructions, 0, true);
        }
      }, 500);
    } else if (!newState && isPlaying) {
      stopSpeaking();
      setCurrentStep(0);
      setProgress(0);
      autoPlayStartedRef.current = false;
    }
  };

  useEffect(() => {
    if (isModalOpen && showVoiceInstructions && selectedRecipe && !autoPlayStartedRef.current) {
      autoPlayStartedRef.current = true;
      setTimeout(() => {
        if (showVoiceInstructions && selectedRecipe && isModalOpen) {
          speakInstructions(selectedRecipe.instructions, 0, true);
        }
      }, 800);
    }
    
    return () => {
      stopSpeaking();
      autoPlayStartedRef.current = false;
    };
  }, [isModalOpen, showVoiceInstructions, selectedRecipe]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      autoPlayStartedRef.current = false;
    };
  }, []);

  // Navigation Handlers
  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
    setIsPlaying(false);
    setShowVoiceInstructions(false);
    setCurrentStep(0);
    setProgress(0);
    autoPlayStartedRef.current = false;
  };

  const closeModal = () => {
    stopSpeaking();
    setIsModalOpen(false);
    setSelectedRecipe(null);
    setIsPlaying(false);
    setShowVoiceInstructions(false);
    setCurrentStep(0);
    setProgress(0);
    autoPlayStartedRef.current = false;
  };

  const handleGoBack = () => {
    navigate('/');
  };

  // Filter recipes based on search
  const filteredRecipes = mainCourseRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };

  return (
    <div className="maincourse-page">
      {/* Header */}
      <header className="maincourse-header">
        <div className="header-content">
          <h1>Global Main Course Selection</h1>
          <p>Delicious dishes inspired by world cuisines</p>
        </div>
      </header>
      {/* Main Content */}
      <main className="maincourse-main">
        <div className="maincourse-container">
          {filteredRecipes.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No recipes found matching "{searchTerm}"</h3>
              <p>Try searching for something else</p>
              <button 
                className="clear-search-button"
                onClick={() => setSearchTerm('')}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <div className="recipes-grid">
                {filteredRecipes.map((recipe) => (
                  <div key={recipe.id} className="recipe-card">
                    <div className="recipe-card-image">
                      <img 
                        src={mainCourseImages[recipe.id - 1] || mainCourseImages[0]}
                        alt={recipe.name}
                        className="recipe-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="recipe-card-content">
                      <h3 className="recipe-name">{recipe.name}</h3>
                      <button 
                        className="view-recipe-btn"
                        onClick={() => handleViewRecipe(recipe)}
                      >
                        <i className="fas fa-utensils"></i> View Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="back-button-container">
                <button className="back-home-btn" onClick={handleGoBack}>
                  <i className="fas fa-arrow-left"></i> Back to Home
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Recipe Modal */}
      {isModalOpen && selectedRecipe && (
        <div className="recipe-modal-overlay">
          <div className="recipe-modal">
            <div className="modal-header">
              <h2 className="modal-title" style={{color: 'white'}}>{selectedRecipe.name}</h2>
              <button className="modal-close-btn" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="instructions-toggle-container">
              <div className="instructions-toggle">
                <button 
                  className={`instruction-tab ${!showVoiceInstructions ? 'active' : ''}`}
                  onClick={() => setShowVoiceInstructions(false)}
                >
                  <i className="fas fa-file-alt"></i> Text Instructions
                </button>
                <button 
                  className={`instruction-tab ${showVoiceInstructions ? 'active' : ''}`}
                  onClick={toggleVoiceInstructions}
                >
                  <i className="fas fa-volume-up"></i> Voice Instructions
                </button>
              </div>
            </div>
            
            <div className="modal-content">
              {!showVoiceInstructions && (
                <div className="recipe-section">
                  <div className="section-header">
                    <h3><i className="fas fa-clipboard-list"></i> Ingredients</h3>
                  </div>
                  <div className="section-content">
                    <ul className="ingredients-list">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {!showVoiceInstructions ? (
                <div className="recipe-section">
                  <div className="section-header">
                    <h3><i className="fas fa-list-ol"></i> Instructions</h3>
                  </div>
                  <div className="section-content">
                    <ol className="instructions-list">
                      {selectedRecipe.instructions.map((step, index) => (
                        <li key={index}>
                          <div className="instruction-step">
                            <span className="step-number">{index + 1}.</span>
                            <span className="step-text">{step}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ) : (
                <div className="recipe-section">
                  <div className="section-header">
                    <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                    <div className="voice-status">
                      <div className={`voice-status-indicator ${isPlaying ? 'playing' : 'paused'}`}>
                        <i className={`fas fa-${isPlaying ? 'volume-up' : 'volume-mute'}`}></i>
                        <span>{isPlaying ? 'Playing Automatically' : 'Ready to Play'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="section-content">
                    <div className="voice-player">
                      <div className="voice-player-header">
                        <div className="voice-recipe-info">
                          <h4>🎤 Voice Guide for {selectedRecipe.name}</h4>
                        </div>
                      </div>
                      
                      <div className="voice-controls-main">
                        <div className="voice-progress-container">
                          <div className="voice-progress-bar">
                            <div 
                              className="voice-progress-fill" 
                              style={{width: `${progress}%`}}
                            ></div>
                          </div>
                          <div className="voice-progress-info">
                            <span>Progress: {Math.round(progress)}%</span>
                            <span>Step {currentStep} of {selectedRecipe.instructions.length}</span>
                          </div>
                        </div>
                        
                        <div className="voice-buttons">
                          <button 
                            className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                            onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.instructions)}
                          >
                            <i className={`fas fa-${isPlaying ? 'stop' : 'play'}`}></i>
                            {isPlaying ? ' Stop Auto-Play' : ' Restart Guide'}
                          </button>
                        </div>
                        
                        <div className="step-navigation">
                          <button 
                            className="step-nav-btn prev"
                            onClick={speakPreviousStep}
                            disabled={currentStep <= 1}
                          >
                            <i className="fas fa-backward"></i> Previous Step
                          </button>
                          
                          <button 
                            className="step-nav-btn next"
                            onClick={speakNextStep}
                            disabled={currentStep >= selectedRecipe.instructions.length}
                          >
                            Next Step <i className="fas fa-forward"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="voice-steps-overview">
                        <h5>
                          <i className="fas fa-list-ol"></i> Steps Overview
                          <span className="steps-count">
                            {currentStep}/{selectedRecipe.instructions.length} Completed
                          </span>
                        </h5>
                        <div className="steps-container">
                          {selectedRecipe.instructions.map((step, index) => (
                            <div 
                              key={index} 
                              className={`step-item ${index < currentStep ? 'completed' : ''} ${index === currentStep - 1 && isPlaying ? 'current' : ''}`}
                              onClick={() => speakStep(index)}
                              style={{cursor: 'pointer'}}
                            >
                              <div className="step-number-circle">
                                {index < currentStep ? (
                                  <i className="fas fa-check"></i>
                                ) : (
                                  <span>{index + 1}</span>
                                )}
                              </div>
                              <div className="step-content">
                                <div className="step-title">Step {index + 1}</div>
                                <div className="step-text-preview">{step.substring(0, 60)}...</div>
                              </div>
                              <div className="step-play-btn">
                                <i className="fas fa-play"></i>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="modal-actions">
                <button className="close-modal-btn" onClick={closeModal}>
                  <i className="fas fa-times"></i> Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeMainCoursePage;