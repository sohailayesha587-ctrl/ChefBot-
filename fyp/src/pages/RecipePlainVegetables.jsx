import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipePlainVegetables.css';

const RecipePlainVegetables = () => {
  const navigate = useNavigate();
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Plain Vegetables Data (55+ recipes)
  const RecipePlainVegetables = [
    // ==================== ALOO BASED (11) ====================
    { 
      id: 1, 
      name: "Aloo Ki Sabzi",
      tagline: "Simple aur classic potato curry",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554",
      ingredients: [
        "4 potatoes, boiled and cubed",
        "2 tomatoes, chopped",
        "1 onion, chopped",
        "2 green chilies, slit",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add green chilies and chopped tomatoes, cook until soft.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add boiled potatoes and mix gently with spices.",
        "Cook for 5-7 minutes on low heat, stirring occasionally.",
        "Garnish with fresh coriander and serve hot with roti."
      ]
    },
    { 
      id: 2, 
      name: "Aloo Matar",
      tagline: "Potato and peas curry",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      ingredients: [
        "3 potatoes, cubed",
        "1 cup green peas",
        "2 onions, finely chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes until raw smell goes away.",
        "Add tomato puree and cook until oil separates from masala.",
        "Add turmeric, red chili powder and salt. Mix well.",
        "Add potatoes and peas, stir to coat with masala.",
        "Add 1 cup water, cover and cook until potatoes are tender (about 15-20 minutes).",
        "Sprinkle garam masala and garnish with fresh coriander.",
        "Serve hot with naan or roti."
      ]
    },
    { 
      id: 3, 
      name: "Aloo Baingan",
      tagline: "Potato and eggplant curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "2 potatoes, cubed",
        "2 eggplants, cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add potatoes and cook for 5 minutes, stirring occasionally.",
        "Add eggplants and mix gently to avoid breaking them.",
        "Cover and cook on low heat for 15-20 minutes until vegetables are tender.",
        "Garnish with fresh coriander and serve hot with roti."
      ]
    },
    { 
      id: 4, 
      name: "Aloo Shimla Mirch",
      tagline: "Potato and bell pepper stir-fry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "3 potatoes, sliced",
        "2 bell peppers (capsicum), sliced",
        "1 onion, sliced",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp dry mango powder (amchur)",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add sliced onions and sauté until translucent.",
        "Add sliced potatoes and cook for 8-10 minutes until half done.",
        "Add sliced bell peppers and all spices except amchur.",
        "Cook until potatoes and peppers are tender (about 8-10 minutes).",
        "Sprinkle amchur powder and mix well.",
        "Serve hot as a side dish with dal-chawal."
      ]
    },
    { 
      id: 5, 
      name: "Aloo Gobhi",
      tagline: "Potato and cauliflower dry curry",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "2 potatoes, cubed",
        "1 cauliflower, cut into florets",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add ginger-garlic paste and cook for 1 minute.",
        "Add chopped tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add potatoes and cauliflower florets, mix gently to coat with masala.",
        "Cover and cook on low heat for 15-20 minutes, stirring occasionally.",
        "Garnish with fresh coriander and serve hot with roti."
      ]
    },
    { 
      id: 6, 
      name: "Aloo Palak",
      tagline: "Potato and spinach curry",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "3 potatoes, cubed",
        "500g spinach, blanched and pureed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh cream (optional)"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add chopped tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt. Mix well.",
        "Add potatoes and cook for 10 minutes, stirring occasionally.",
        "Add spinach puree and mix well. Add 1/2 cup water if needed.",
        "Cover and simmer for 10-15 minutes until potatoes are tender.",
        "Sprinkle garam masala and a drizzle of fresh cream if desired.",
        "Serve hot with roti or naan."
      ]
    },
    { 
      id: 7, 
      name: "Aloo Tamatar",
      tagline: "Potato tomato curry",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554",
      ingredients: [
        "3 potatoes, cubed",
        "4 tomatoes, chopped",
        "1 onion, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add chopped tomatoes and cook until they turn mushy (about 8-10 minutes).",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add potatoes and 1 cup water. Stir well.",
        "Cover and cook until potatoes are tender (about 15-20 minutes).",
        "Mash some potatoes with the back of spoon to thicken the gravy.",
        "Garnish with fresh coriander and serve hot with roti or paratha."
      ]
    },
    { 
      id: 8, 
      name: "Aloo Beans",
      tagline: "Potato and green beans stir-fry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "2 potatoes, thinly sliced",
        "200g green beans, chopped into 1-inch pieces",
        "1 onion, sliced",
        "1 tsp mustard seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tbsp oil",
        "Salt to taste",
        "Fresh coconut, grated (optional)"
      ],
      steps: [
        "Heat oil in a pan, add mustard seeds and let them splutter.",
        "Add sliced onions and sauté until translucent.",
        "Add potatoes and beans, stir well to combine.",
        "Add turmeric, red chili powder and salt. Mix well.",
        "Cover and cook on low heat for 15 minutes, stirring occasionally.",
        "Check if vegetables are tender; cook longer if needed.",
        "Garnish with fresh grated coconut if desired.",
        "Serve as a side dish with dal and rice."
      ]
    },
    { 
      id: 9, 
      name: "Aloo Karela",
      tagline: "Potato and bitter gourd curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "2 potatoes, cubed",
        "2 karela (bitter gourd), sliced",
        "1 onion, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp amchur powder (dry mango)",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Rub karela slices with salt and keep aside for 30 minutes. Rinse well and squeeze out bitter juice.",
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add karela and fry until lightly browned (about 5-7 minutes).",
        "Add potatoes and spices (turmeric, red chili, salt). Mix well.",
        "Cover and cook on low heat for 15-20 minutes until both vegetables are tender.",
        "Sprinkle amchur powder and mix well.",
        "Serve hot with roti."
      ]
    },
    { 
      id: 10, 
      name: "Aloo Methi",
      tagline: "Potato with fenugreek leaves",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "3 potatoes, cubed",
        "1 bunch fenugreek leaves (methi), finely chopped",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add green chilies and chopped methi leaves. Cook until leaves wilt (about 3-4 minutes).",
        "Add potatoes and spices (turmeric, red chili, salt). Mix well.",
        "Cover and cook on low heat for 15-20 minutes until potatoes are tender.",
        "Stir occasionally to prevent sticking.",
        "Serve hot with roti or paratha."
      ]
    },
    { 
      id: 11, 
      name: "Aloo Pyaz",
      tagline: "Potato and onion stir-fry",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554",
      ingredients: [
        "3 potatoes, sliced",
        "2 onions, sliced",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add sliced onions and sauté until light golden.",
        "Add sliced potatoes and all spices (turmeric, red chili, coriander, salt).",
        "Mix well and cover with lid.",
        "Cook on low heat for 15 minutes, stirring occasionally.",
        "Cook until potatoes are tender and slightly crispy on edges.",
        "Serve as a side dish with dal and rice."
      ]
    },

    // ==================== BHINDI BASED (3) ====================
    { 
      id: 12, 
      name: "Bhindi Masala",
      tagline: "Spicy okra stir-fry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g bhindi (okra), sliced",
        "1 onion, finely chopped",
        "2 tomatoes, finely chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp amchur powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash bhindi and dry completely with a kitchen towel before slicing (this prevents stickiness).",
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add chopped tomatoes and cook until soft and mushy.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add sliced bhindi and mix gently to coat with masala.",
        "Cover and cook on low heat for 10-12 minutes, stirring occasionally.",
        "Sprinkle amchur powder and cook uncovered for 2 more minutes.",
        "Serve hot with roti."
      ]
    },
    { 
      id: 13, 
      name: "Bhindi Do Pyaza",
      tagline: "Okra with double onions",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g bhindi (okra), sliced",
        "2 large onions, sliced",
        "2 tomatoes, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Wash and dry bhindi completely before slicing.",
        "Heat oil in a pan, add cumin seeds and half of the sliced onions.",
        "Sauté until onions are golden brown.",
        "Add chopped tomatoes and cook until soft.",
        "Add turmeric, red chili powder and salt. Mix well.",
        "Add sliced bhindi and mix gently.",
        "Cover and cook for 10 minutes on low heat.",
        "Add remaining raw onions and garam masala.",
        "Cook for 2 more minutes and serve hot."
      ]
    },
    { 
      id: 14, 
      name: "Bhindi Salan",
      tagline: "Okra in yogurt gravy",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g bhindi (okra), whole with stems",
        "1 cup yogurt, beaten well",
        "1 onion, finely chopped",
        "2 tbsp oil",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Wash and dry bhindi completely. Remove stems but keep whole.",
        "Heat 1 tbsp oil in a pan, fry bhindi for 5-7 minutes until tender. Remove and set aside.",
        "In the same pan, add remaining oil and cumin seeds. Add onions and sauté until golden.",
        "Add turmeric, red chili, coriander powder and salt. Cook for 1 minute.",
        "Reduce heat to low and add beaten yogurt slowly, stirring continuously to prevent curdling.",
        "Cook for 5 minutes until oil separates from gravy.",
        "Add fried bhindi and mix gently.",
        "Simmer for 5 more minutes, garnish with fresh coriander and serve."
      ]
    },

    // ==================== BAINGAN BASED (5) ====================
    { 
      id: 15, 
      name: "Baingan Bharta",
      tagline: "Smoky mashed eggplant",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "2 large eggplants (baingan)",
        "1 onion, finely chopped",
        "2 tomatoes, finely chopped",
        "2 green chilies, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander, chopped"
      ],
      steps: [
        "Wash eggplants and pat dry. Apply little oil and roast directly on gas flame until skin is charred and flesh is soft (turn occasionally for even roasting).",
        "Let them cool, then peel off the charred skin.",
        "Mash the soft pulp with a fork or hands. Set aside.",
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add chopped onions and sauté until golden brown.",
        "Add chopped tomatoes and green chilies, cook until tomatoes are soft.",
        "Add turmeric, red chili powder and salt. Mix well.",
        "Add mashed eggplant and mix thoroughly.",
        "Cook for 8-10 minutes, stirring occasionally.",
        "Sprinkle garam masala and fresh coriander. Serve hot with roti."
      ]
    },
    { 
      id: 16, 
      name: "Baingan Masala",
      tagline: "Spicy eggplant curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "2 eggplants (baingan), cubed",
        "1 onion, finely chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes until raw smell goes away.",
        "Add tomato puree and cook until oil separates from masala (about 5-7 minutes).",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add cubed eggplants and mix gently to coat with masala.",
        "Add 1/2 cup water, cover and cook on medium heat for 15-20 minutes until eggplants are tender.",
        "Garnish with fresh coriander and serve hot with roti or rice."
      ]
    },
    { 
      id: 17, 
      name: "Baingan Ka Salan",
      tagline: "Hyderabadi eggplant curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "2 eggplants (baingan), slit lengthwise",
        "1 onion, finely chopped",
        "2 tbsp roasted peanuts",
        "1 tbsp sesame seeds",
        "1 tbsp coconut powder",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Tamarind pulp (optional)"
      ],
      steps: [
        "Make a fine paste of roasted peanuts, sesame seeds and coconut with little water. Set aside.",
        "Heat oil in a pan, fry slit eggplants until soft (about 5-7 minutes). Remove and set aside.",
        "In the same oil, add cumin seeds and onions. Sauté until golden brown.",
        "Add turmeric, red chili, coriander powder and salt. Cook for 1 minute.",
        "Add the peanut-sesame paste and cook until oil separates (about 5 minutes).",
        "Add 1 cup water and bring to boil.",
        "Add fried eggplants and tamarind pulp if using.",
        "Simmer for 10 minutes until gravy thickens.",
        "Serve hot with rice or roti."
      ]
    },
    { 
      id: 18, 
      name: "Bharwa Baingan",
      tagline: "Stuffed eggplants",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "8 small eggplants (baingan), slit crosswise",
        "1 onion, finely chopped",
        "2 tbsp roasted peanuts, crushed",
        "1 tbsp sesame seeds",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "1 tsp amchur powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Mix crushed peanuts, sesame seeds, all spices (turmeric, red chili, coriander, amchur) and salt to make the stuffing.",
        "Carefully stuff this mixture into the slit eggplants, keeping them intact.",
        "Heat oil in a wide pan, add cumin seeds and chopped onions. Sauté until golden.",
        "Gently place the stuffed eggplants in the pan in a single layer.",
        "Cover and cook on very low heat for 20-25 minutes, turning occasionally to cook evenly.",
        "Cook until eggplants are tender and masala is dry.",
        "Garnish with fresh coriander and serve hot with roti."
      ]
    },
    { 
      id: 19, 
      name: "Baingan Aloo",
      tagline: "Eggplant and potato curry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "2 potatoes, cubed",
        "2 eggplants, cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add chopped tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add potatoes and cook for 5 minutes, stirring occasionally.",
        "Add eggplants and mix gently to avoid breaking them.",
        "Cover and cook on low heat for 15-20 minutes until both vegetables are tender.",
        "Garnish with fresh coriander and serve hot with roti."
      ]
    },

    // ==================== GOBHI BASED (3) ====================
    { 
      id: 20, 
      name: "Gobhi Matar",
      tagline: "Cauliflower and peas curry",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cauliflower (gobhi), cut into florets",
        "1 cup green peas (matar)",
        "1 onion, finely chopped",
        "2 tomatoes, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add chopped tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add cauliflower florets and green peas, mix gently to coat with masala.",
        "Cover and cook on low heat for 15 minutes, stirring occasionally.",
        "Cook until cauliflower is tender but not mushy.",
        "Garnish with fresh coriander and serve hot with roti."
      ]
    },
    { 
      id: 21, 
      name: "Gobhi Aloo",
      tagline: "Cauliflower and potato curry",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cauliflower (gobhi), cut into florets",
        "2 potatoes, cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add chopped tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add potatoes and cauliflower florets, mix gently.",
        "Cover and cook on low heat for 20 minutes, stirring occasionally.",
        "Check if vegetables are tender; cook longer if needed.",
        "Garnish with fresh coriander and serve hot with roti."
      ]
    },
    { 
      id: 22, 
      name: "Gobhi Ka Salan",
      tagline: "Cauliflower in gravy",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cauliflower (gobhi), cut into florets",
        "1 onion, finely chopped",
        "2 tomatoes, pureed",
        "1 tbsp ginger-garlic paste",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp garam masala",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add ginger-garlic paste and cook for 2 minutes.",
        "Add tomato puree and cook until oil separates (about 5-7 minutes).",
        "Add turmeric, red chili powder and salt. Mix well.",
        "Add cauliflower florets and 1 cup water. Stir well.",
        "Cover and cook on medium heat until cauliflower is tender (about 15 minutes).",
        "Sprinkle garam masala and mix gently.",
        "Garnish with fresh coriander and serve hot with roti or rice."
      ]
    },

    // ==================== TORI / LOUKI BASED (2) ====================
    { 
      id: 23, 
      name: "Tori Ki Sabzi",
      tagline: "Ridge gourd curry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g tori (ridge gourd), peeled and cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add chopped tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add tori cubes and mix gently to coat with masala.",
        "Cover and cook on low heat for 10-12 minutes (tori releases water, so no need to add extra).",
        "Cook until tori is tender but not mushy.",
        "Garnish with fresh coriander and serve hot with roti."
      ]
    },
    { 
      id: 24, 
      name: "Louki Ki Sabzi",
      tagline: "Bottle gourd curry",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      ingredients: [
        "500g louki (bottle gourd), peeled and cubed",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add chopped tomatoes and cook until soft.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add louki cubes and mix gently.",
        "Cover and cook on low heat for 15 minutes (louki releases water, so no need to add extra).",
        "Cook until louki is tender and translucent.",
        "Garnish with fresh coriander and serve hot with roti."
      ]
    },

    // ==================== KARELA BASED (2) ====================
    { 
      id: 25, 
      name: "Karela Ki Sabzi",
      tagline: "Bitter gourd stir-fry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "4 karela (bitter gourd), thinly sliced",
        "1 onion, sliced",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp amchur powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Rub karela slices with salt and keep aside for 30 minutes. Rinse well and squeeze out bitter juice completely.",
        "Heat oil in a pan, add cumin seeds and let them splutter.",
        "Add sliced onions and sauté until golden brown.",
        "Add karela slices and fry until lightly browned and crispy (about 10-12 minutes).",
        "Add turmeric, red chili powder and salt. Mix well and cook for 5 more minutes.",
        "Sprinkle amchur powder and mix well.",
        "Serve hot with roti."
      ]
    },
    { 
      id: 26, 
      name: "Karela Aloo",
      tagline: "Bitter gourd and potato stir-fry",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      ingredients: [
        "2 karela (bitter gourd), sliced",
        "2 potatoes, sliced",
        "1 onion, sliced",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp amchur powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Rub karela slices with salt and keep aside for 30 minutes. Rinse well and squeeze out bitter juice.",
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add potatoes and cook for 5 minutes.",
        "Add karela slices and fry until lightly browned.",
        "Add turmeric, red chili powder and salt. Mix well.",
        "Cover and cook on low heat for 15 minutes until both vegetables are tender.",
        "Sprinkle amchur powder and mix well.",
        "Serve hot with roti."
      ]
    },

    // ==================== METHI / PALAK BASED (3) ====================
    { 
      id: 27, 
      name: "Methi Aloo",
      tagline: "Fenugreek leaves with potatoes",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "2 potatoes, cubed",
        "1 bunch fenugreek leaves (methi), finely chopped",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add green chilies and chopped methi leaves. Cook until leaves wilt (about 3-4 minutes).",
        "Add potatoes and spices (turmeric, red chili, salt). Mix well.",
        "Cover and cook on low heat for 15-20 minutes until potatoes are tender.",
        "Stir occasionally to prevent sticking.",
        "Serve hot with roti."
      ]
    },
    { 
      id: 28, 
      name: "Methi Ki Sabzi",
      tagline: "Fenugreek leaves curry",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "2 bunches fenugreek leaves (methi), finely chopped",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "2 green chilies, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "1 tsp coriander powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add green chilies and chopped tomatoes, cook until soft.",
        "Add turmeric, red chili, coriander powder and salt. Mix well.",
        "Add chopped methi leaves and mix well.",
        "Cover and cook on low heat for 10-12 minutes until leaves are completely cooked.",
        "Serve hot with roti."
      ]
    },
    { 
      id: 29, 
      name: "Palak Ki Sabzi",
      tagline: "Simple spinach stir-fry",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "500g spinach (palak), washed and chopped",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric powder",
        "1 tsp red chili powder",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
        "Add green chilies and chopped spinach. Cook until spinach wilts (about 3-4 minutes).",
        "Add turmeric, red chili powder and salt. Mix well.",
        "Cover and cook on low heat for 5-7 minutes.",
        "Serve hot with roti."
      ]
    },
 
    // ==================== PART 2 - ADD REMAINING 25+ RECIPES ====================
  
  // Matar Based (2)
  { 
    id: 30, 
    name: "Matar Ki Sabzi",
    tagline: "Green peas curry",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
    ingredients: [
      "2 cups green peas",
      "1 onion, finely chopped",
      "2 tomatoes, pureed",
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
      "Heat oil in a pan, add cumin seeds and onions. Sauté until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomato puree and cook until oil separates.",
      "Add turmeric, red chili, coriander powder and salt. Mix well.",
      "Add green peas and 1/2 cup water.",
      "Cover and cook for 10-12 minutes until peas are tender.",
      "Sprinkle garam masala and garnish with fresh coriander.",
      "Serve hot with roti or puri."
    ]
  },
  { 
    id: 31, 
    name: "Matar Aloo",
    tagline: "Peas and potato curry",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
    ingredients: [
      "2 potatoes, cubed",
      "1 cup green peas",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric powder",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "1 tsp garam masala",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil in a pan, add cumin seeds and onions. Sauté until golden.",
      "Add tomatoes and cook until soft.",
      "Add turmeric, red chili, coriander powder and salt.",
      "Add potatoes and cook for 5 minutes.",
      "Add peas and 1/2 cup water.",
      "Cover and cook until potatoes are tender.",
      "Sprinkle garam masala and serve."
    ]
  },

  // Shimla Mirch Based (2)
  { 
    id: 32, 
    name: "Shimla Mirch Aloo",
    tagline: "Capsicum and potato stir-fry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "2 potatoes, sliced",
      "2 capsicum, sliced",
      "1 onion, sliced",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp amchur",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add potatoes and cook for 8 minutes.",
      "Add capsicum and spices, cook until tender.",
      "Sprinkle amchur and serve."
    ]
  },
  { 
    id: 33, 
    name: "Shimla Mirch Matar",
    tagline: "Capsicum and peas curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "2 capsicum, cubed",
      "1 cup peas",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add capsicum and peas, cook for 10 minutes.",
      "Serve hot."
    ]
  },

  // Beans Based (2)
  { 
    id: 34, 
    name: "Beans Aloo",
    tagline: "Green beans with potatoes",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "200g beans, chopped",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "1 tsp mustard seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add mustard seeds and onions.",
      "Add potatoes and cook for 5 minutes.",
      "Add beans and spices, mix well.",
      "Cover and cook for 15 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 35, 
    name: "Beans Matar",
    tagline: "Beans and peas stir-fry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "200g beans, chopped",
      "1 cup peas",
      "1 onion, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add beans and cook for 5 minutes.",
      "Add peas and spices, mix well.",
      "Cover and cook for 10 minutes.",
      "Serve hot."
    ]
  },

  // Tinda / Kera / Kaddu Based (4)
  { 
    id: 36, 
    name: "Tinday Ki Sabzi",
    tagline: "Apple gourd curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "500g tinday, peeled and cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add tinday and mix gently.",
      "Cover and cook for 15 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 37, 
    name: "Keray Ki Sabzi",
    tagline: "Ivory gourd curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "500g keray, peeled and cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add keray and mix gently.",
      "Cover and cook for 15 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 38, 
    name: "Kaddu Ki Sabzi",
    tagline: "Pumpkin curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "500g kaddu, cubed",
      "1 tsp mustard seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tbsp jaggery",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add mustard seeds.",
      "Add kaddu and spices, mix well.",
      "Cover and cook for 15 minutes.",
      "Add jaggery and cook for 5 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 39, 
    name: "Kaddu Aloo",
    tagline: "Pumpkin and potato curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "300g kaddu, cubed",
      "2 potatoes, cubed",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds.",
      "Add potatoes and cook for 5 minutes.",
      "Add kaddu and spices, mix well.",
      "Cover and cook for 15 minutes.",
      "Serve hot."
    ]
  },

  // Arvi Based (2)
  { 
    id: 40, 
    name: "Arvi Ki Sabzi",
    tagline: "Colocasia root curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "500g arvi, boiled and peeled",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Boil arvi until tender, peel and slice.",
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add arvi slices and mix gently.",
      "Cook for 8-10 minutes and serve."
    ]
  },
  { 
    id: 41, 
    name: "Arvi Aloo",
    tagline: "Colocasia with potatoes",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "300g arvi, boiled",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add potatoes and cook for 5 minutes.",
      "Add arvi and cook for 10 minutes.",
      "Serve hot."
    ]
  },

  // Mix Vegetables (8)
  { 
    id: 42, 
    name: "Mix Vegetable Sabzi",
    tagline: "Mixed vegetables curry",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    ingredients: [
      "1 cup cauliflower florets",
      "1 cup peas",
      "1 cup carrots, cubed",
      "1 cup beans, chopped",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomato puree and cook until oil separates.",
      "Add turmeric, red chili powder and salt.",
      "Add all vegetables and mix well.",
      "Add 1/2 cup water, cover and cook until tender.",
      "Sprinkle garam masala and serve."
    ]
  },
  { 
    id: 43, 
    name: "Bhindi Aloo",
    tagline: "Okra and potato stir-fry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "250g bhindi, sliced",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp amchur",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add potatoes and cook for 8 minutes.",
      "Add bhindi and spices, mix gently.",
      "Cover and cook for 10 minutes.",
      "Sprinkle amchur and serve."
    ]
  },
  { 
    id: 44, 
    name: "Gobhi Matar Aloo",
    tagline: "Cauliflower peas potato",
    image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
    ingredients: [
      "1 cup cauliflower florets",
      "1/2 cup peas",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add potatoes and cook for 5 minutes.",
      "Add cauliflower and peas, mix well.",
      "Cover and cook for 15 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 45, 
    name: "Shimla Mirch Matar Aloo",
    tagline: "Capsicum peas potato",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "2 capsicum, cubed",
      "1/2 cup peas",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add potatoes and cook for 5 minutes.",
      "Add capsicum and peas, cook for 10 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 46, 
    name: "Tori Aloo",
    tagline: "Ridge gourd with potato",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "400g tori, peeled and cubed",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add potatoes and cook for 5 minutes.",
      "Add tori and mix gently.",
      "Cover and cook for 12 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 47, 
    name: "Aloo Matar Shimla Mirch",
    tagline: "Potato peas capsicum",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
    ingredients: [
      "2 potatoes, cubed",
      "1/2 cup peas",
      "2 capsicum, cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add potatoes and cook for 5 minutes.",
      "Add peas and capsicum, cook for 10 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 48, 
    name: "Gobhi Shimla Mirch Aloo",
    tagline: "Cauliflower capsicum potato",
    image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
    ingredients: [
      "1 cup cauliflower florets",
      "2 capsicum, cubed",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add potatoes and cook for 5 minutes.",
      "Add cauliflower and capsicum, cook for 15 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 49, 
    name: "Beans Matar Aloo",
    tagline: "Beans peas potato",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "200g beans, chopped",
      "1/2 cup peas",
      "2 potatoes, cubed",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add potatoes and cook for 5 minutes.",
      "Add beans and peas, cook for 15 minutes.",
      "Serve hot."
    ]
  },

  // Seasonal / Special (6)
  { 
    id: 50, 
    name: "Seasonal Mix Sabzi",
    tagline: "Fresh seasonal vegetables",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    ingredients: [
      "2 cups mixed seasonal vegetables",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "1 tsp garam masala",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add seasonal vegetables and mix.",
      "Add 1/2 cup water, cover and cook until tender.",
      "Sprinkle garam masala and serve."
    ]
  },
  { 
    id: 51, 
    name: "Lauki Kofta",
    tagline: "Bottle gourd dumplings in gravy",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "500g lauki, grated",
      "1 cup besan (gram flour)",
      "1 onion, chopped",
      "2 tomatoes, pureed",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "Oil for frying",
      "Salt to taste"
    ],
    steps: [
      "Mix grated lauki with besan and salt to make kofta mixture.",
      "Shape into small balls and deep fry until golden.",
      "Heat oil, add cumin seeds and onions.",
      "Add tomato puree and cook until oil separates.",
      "Add spices and water to make gravy.",
      "Add fried kofta and simmer for 5 minutes.",
      "Serve hot with roti."
    ]
  },
  { 
    id: 52, 
    name: "Karela Bharwa",
    tagline: "Stuffed bitter gourd",
    image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
    ingredients: [
      "4 karela, slit",
      "1 onion, chopped",
      "2 tbsp roasted peanuts, crushed",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp amchur",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Rub karela with salt, keep for 30 mins, rinse and squeeze.",
      "Mix onion, peanuts, spices for stuffing.",
      "Stuff karela with mixture.",
      "Heat oil, fry stuffed karela until tender.",
      "Serve hot."
    ]
  },
  { 
    id: 53, 
    name: "Aloo Chana",
    tagline: "Potato and chickpeas curry",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
    ingredients: [
      "2 potatoes, cubed",
      "1 cup chickpeas (boiled)",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "1 tsp garam masala",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add potatoes and cook for 10 minutes.",
      "Add boiled chickpeas and 1/2 cup water.",
      "Simmer for 10 minutes, sprinkle garam masala.",
      "Serve hot."
    ]
  },
  { 
    id: 54, 
    name: "Aloo Matar Paneer",
    tagline: "Potato peas with cottage cheese",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
    ingredients: [
      "2 potatoes, cubed",
      "1/2 cup peas",
      "200g paneer, cubed",
      "1 onion, chopped",
      "2 tomatoes, pureed",
      "1 tbsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomato puree and cook until oil separates.",
      "Add spices and mix well.",
      "Add potatoes and cook for 10 minutes.",
      "Add peas and 1/2 cup water, cook for 5 minutes.",
      "Add paneer and garam masala, simmer for 2 minutes.",
      "Serve hot."
    ]
  },
  { 
    id: 55, 
    name: "Sem Ki Sabzi",
    tagline: "Flat beans curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    ingredients: [
      "500g sem (flat beans), chopped",
      "1 onion, chopped",
      "2 tomatoes, chopped",
      "1 tsp cumin seeds",
      "1/2 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp coriander powder",
      "1 tsp garam masala",
      "2 tbsp oil",
      "Salt to taste"
    ],
    steps: [
      "Heat oil, add cumin seeds and onions.",
      "Add tomatoes and cook until soft.",
      "Add spices and mix well.",
      "Add sem and mix well.",
      "Cover and cook for 15-20 minutes until tender.",
      "Sprinkle garam masala and serve."
    ]
  }
];
  // ==================== FUNCTIONS & LOGIC ====================
  // Filter to show all vegetables
  const vegetablesList = RecipePlainVegetables;

  // Handle card click
  const handleVegetableClick = (vegetable) => {
    setSelectedVegetable(vegetable);
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
    setSelectedVegetable(null);
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
      if (isPlaying && currentStep < selectedVegetable.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else if (isPlaying && currentStep === selectedVegetable.steps.length - 1) {
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
    if (!selectedVegetable) return;

    if (isPlaying) {
      // Pause
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Start playing from current step
      setIsPlaying(true);
      speakStep(selectedVegetable.steps[currentStep]);
    }
  };

  const handleNextStep = () => {
    if (!selectedVegetable) return;
    
    if (currentStep < selectedVegetable.steps.length - 1) {
      // Cancel current speech
      window.speechSynthesis.cancel();
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
      
      // If was playing, start speaking new step
      if (isPlaying) {
        speakStep(selectedVegetable.steps[currentStep + 1]);
      }
    }
  };

  const handlePrevStep = () => {
    if (!selectedVegetable) return;
    
    if (currentStep > 0) {
      // Cancel current speech
      window.speechSynthesis.cancel();
      
      // Move to previous step
      setCurrentStep(prev => prev - 1);
      
      // If was playing, start speaking new step
      if (isPlaying) {
        speakStep(selectedVegetable.steps[currentStep - 1]);
      }
    }
  };

  const handleRestart = () => {
    if (!selectedVegetable) return;
    
    // Cancel current speech
    window.speechSynthesis.cancel();
    
    // Reset to first step
    setCurrentStep(0);
    
    // If was playing, start from beginning
    if (isPlaying) {
      speakStep(selectedVegetable.steps[0]);
    }
  };

  // Update progress when current step changes
  useEffect(() => {
    if (selectedVegetable) {
      setProgress(((currentStep + 1) / selectedVegetable.steps.length) * 100);
    }
  }, [currentStep, selectedVegetable]);

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
    <div className="vegetables-page">
      {/* Header */}
      <header className="vegetables-header">
        <div className="vegetables-header-content">
          <h1 className="vegetables-page-title">Plain Vegetables</h1>
          <p className="vegetables-page-description">
            Discover 55+ traditional Pakistani vegetable recipes - simple, healthy aur ghar jaisa taste
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="vegetables-main">
        <div className="vegetables-grid-section">
          <div className="vegetables-grid">
            {vegetablesList.map((vegetable) => (
              <div
                key={vegetable.id}
                className="vegetables-technique-card"
                onClick={() => handleVegetableClick(vegetable)}
              >
                <div
                  className="vegetables-card-image"
                  style={{ backgroundImage: `url(${vegetable.image})` }}
                />
                <div className="vegetables-card-content">
                  <h3 className="vegetables-card-title">{vegetable.name}</h3>
                  <p className="vegetables-card-description">{vegetable.tagline}</p>
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
      {showDetailPanel && selectedVegetable && (
        <div className="vegetables-modal-overlay" onClick={handleCloseModal}>
          <div
            className="vegetables-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedVegetable.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="vegetables-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="vegetables-modal-header">
              <div className="vegetables-modal-title">
                <h2>{selectedVegetable.name}</h2>
              </div>
            </div>

            <div className="vegetables-modal-content">
              {/* Column 1: Ingredients */}
              <div className="vegetables-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="vegetables-ingredients-list">
                  {selectedVegetable.ingredients.map((ingredient, index) => (
                    <div key={index} className="vegetables-ingredient-item">
                      <span className="vegetables-ingredient-bullet">•</span>
                      <span className="vegetables-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="vegetables-modal-steps">
                <h3>Steps to Make</h3>
                <div className="vegetables-steps-list">
                  {selectedVegetable.steps.map((step, index) => (
                    <div key={index} className="vegetables-step-item">
                      <span className="vegetables-step-number">{index + 1}.</span>
                      <span className="vegetables-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="vegetables-modal-voice-container">
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
                      <span>Step {currentStep + 1} of {selectedVegetable.steps.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  {/* Current Step Display */}
                  <div className="current-step-display">
                    <p>
                      <strong>Step {currentStep + 1}:</strong> {selectedVegetable.steps[currentStep]}
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
                      disabled={currentStep === selectedVegetable.steps.length - 1}
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

export default RecipePlainVegetables;