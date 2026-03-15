import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesLightDinner.css';

const RecipesLightDinner = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Light Dinner Recipes (30+ recipes)
  const lightDinnerRecipes = [
    // ==================== SOUPS (6) ====================
    { 
      id: 1, 
      name: "Chicken Corn Soup",
      tagline: "Light chicken and corn soup",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "200g chicken, shredded",
        "1 cup sweet corn kernels",
        "1 carrot, julienned",
        "2 tbsp cornflour",
        "1 egg, beaten",
        "4 cups chicken stock",
        "1 tsp white pepper",
        "1 tsp salt",
        "1 tbsp soy sauce",
        "2 spring onions, chopped"
      ],
      steps: [
        "Boil chicken stock in a pot.",
        "Add shredded chicken and corn. Simmer for 10 minutes.",
        "Mix cornflour with water to make slurry.",
        "Add slurry to soup, stirring until thickened.",
        "Slowly drizzle beaten egg while stirring.",
        "Add soy sauce, pepper and salt.",
        "Garnish with spring onions and serve hot."
      ]
    },
    { 
      id: 2, 
      name: "Hot & Sour Soup",
      tagline: "Tangy and spicy soup",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "4 cups chicken stock",
        "100g chicken, shredded",
        "1/2 cup mushrooms, sliced",
        "1/4 cup bamboo shoots",
        "2 tbsp soy sauce",
        "2 tbsp vinegar",
        "1 tbsp chili sauce",
        "1 tsp white pepper",
        "2 tbsp cornflour",
        "1 egg, beaten"
      ],
      steps: [
        "Bring stock to boil, add chicken and vegetables.",
        "Mix cornflour with water and add to soup.",
        "Add soy sauce, vinegar, chili sauce and pepper.",
        "Slowly add beaten egg while stirring.",
        "Simmer for 5 minutes and serve hot."
      ]
    },
    { 
      id: 3, 
      name: "Tomato Soup",
      tagline: "Creamy tomato soup",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "6 ripe tomatoes, chopped",
        "1 onion, chopped",
        "2 cloves garlic",
        "2 cups vegetable stock",
        "1/4 cup cream",
        "2 tbsp butter",
        "1 tsp sugar",
        "Salt and pepper to taste"
      ],
      steps: [
        "Sauté onion and garlic in butter.",
        "Add tomatoes and cook until soft.",
        "Add stock and simmer for 20 minutes.",
        "Blend until smooth, then strain.",
        "Add sugar, salt and pepper.",
        "Stir in cream and serve hot."
      ]
    },
    { 
      id: 4, 
      name: "Vegetable Soup",
      tagline: "Healthy mixed veg soup",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "1 carrot, diced",
        "1 potato, diced",
        "1/2 cup peas",
        "1/2 cup beans, chopped",
        "1 onion, chopped",
        "2 cloves garlic",
        "4 cups vegetable stock",
        "1 tsp mixed herbs",
        "Salt and pepper to taste"
      ],
      steps: [
        "Sauté onion and garlic.",
        "Add all vegetables and cook for 5 minutes.",
        "Add stock and simmer until vegetables are tender.",
        "Add herbs, salt and pepper.",
        "Serve hot with bread."
      ]
    },
    { 
      id: 5, 
      name: "Lentil Soup",
      tagline: "Protein-rich lentil soup",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "1 cup red lentils",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 cloves garlic",
        "4 cups vegetable stock",
        "1 tsp cumin",
        "1 tbsp lemon juice",
        "Salt and pepper to taste"
      ],
      steps: [
        "Sauté onion and garlic.",
        "Add lentils, carrots and stock.",
        "Simmer for 30 minutes until lentils are soft.",
        "Blend partially if desired.",
        "Add cumin, lemon juice, salt and pepper.",
        "Serve hot."
      ]
    },
    { 
      id: 6, 
      name: "Chicken Noodle Soup",
      tagline: "Comforting chicken soup",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      ingredients: [
        "200g chicken, shredded",
        "100g noodles",
        "1 carrot, julienned",
        "4 cups chicken stock",
        "2 spring onions",
        "1 tsp ginger, grated",
        "1 tbsp soy sauce",
        "Salt and pepper to taste"
      ],
      steps: [
        "Boil stock with ginger.",
        "Add noodles and cook for 5 minutes.",
        "Add chicken and carrots.",
        "Add soy sauce, salt and pepper.",
        "Garnish with spring onions and serve."
      ]
    },

    // ==================== SALADS (5) ====================
    { 
      id: 7, 
      name: "Chicken Caesar Salad",
      tagline: "Classic Caesar salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      ingredients: [
        "200g grilled chicken, sliced",
        "1 romaine lettuce, chopped",
        "1/2 cup croutons",
        "1/4 cup parmesan cheese",
        "For dressing: 1/2 cup mayo",
        "2 tbsp lemon juice",
        "1 tsp garlic paste",
        "1 tsp mustard",
        "Salt and pepper"
      ],
      steps: [
        "Mix all dressing ingredients.",
        "Toss lettuce with dressing.",
        "Top with chicken, croutons and cheese.",
        "Serve immediately."
      ]
    },
    { 
      id: 8, 
      name: "Greek Salad",
      tagline: "Fresh Greek salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      ingredients: [
        "2 tomatoes, cubed",
        "1 cucumber, cubed",
        "1 onion, sliced",
        "1/2 cup olives",
        "100g feta cheese, cubed",
        "2 tbsp olive oil",
        "1 tbsp lemon juice",
        "1 tsp oregano",
        "Salt and pepper"
      ],
      steps: [
        "Mix all vegetables in a bowl.",
        "Whisk olive oil, lemon juice and oregano.",
        "Pour dressing over salad.",
        "Top with feta cheese.",
        "Serve chilled."
      ]
    },
    { 
      id: 9, 
      name: "Fruit Chaat",
      tagline: "Fresh Pakistani fruit salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      ingredients: [
        "1 apple, chopped",
        "1 banana, sliced",
        "1 orange, segmented",
        "1/2 cup grapes",
        "1/2 cup pomegranate seeds",
        "1 tbsp lemon juice",
        "1 tsp chaat masala",
        "1/2 tsp black pepper",
        "1/2 tsp salt"
      ],
      steps: [
        "Mix all fruits in a bowl.",
        "Sprinkle lemon juice and spices.",
        "Toss gently and serve immediately."
      ]
    },
    { 
      id: 10, 
      name: "Chicken Avocado Salad",
      tagline: "Healthy chicken salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      ingredients: [
        "200g grilled chicken, diced",
        "1 avocado, sliced",
        "1 cup mixed greens",
        "1/2 cup cherry tomatoes",
        "1/4 cup corn",
        "2 tbsp olive oil",
        "1 tbsp lemon juice",
        "Salt and pepper"
      ],
      steps: [
        "Arrange greens on plate.",
        "Top with chicken, avocado, tomatoes and corn.",
        "Drizzle with olive oil and lemon juice.",
        "Season and serve."
      ]
    },
    { 
      id: 11, 
      name: "Pasta Salad",
      tagline: "Cold pasta salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      ingredients: [
        "200g pasta, cooked",
        "1/2 cup bell peppers, diced",
        "1/2 cup olives",
        "1/4 cup corn",
        "2 tbsp mayonnaise",
        "1 tbsp yogurt",
        "1 tsp mustard",
        "Salt and pepper"
      ],
      steps: [
        "Mix mayonnaise, yogurt and mustard.",
        "Add pasta and vegetables.",
        "Toss well and chill.",
        "Serve cold."
      ]
    },

    // ==================== SANDWICHES (5) ====================
    { 
      id: 12, 
      name: "Grilled Chicken Sandwich",
      tagline: "Classic grilled sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "2 bread slices",
        "100g grilled chicken, sliced",
        "Lettuce leaves",
        "Tomato slices",
        "Onion slices",
        "1 tbsp mayonnaise",
        "1 tsp mustard",
        "Butter for grilling"
      ],
      steps: [
        "Spread mayonnaise and mustard on bread.",
        "Layer chicken, lettuce, tomato and onion.",
        "Top with another bread slice.",
        "Butter the outside and grill until golden.",
        "Serve hot with fries."
      ]
    },
    { 
      id: 13, 
      name: "Club Sandwich",
      tagline: "Triple-decker sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "3 bread slices",
        "100g chicken, cooked",
        "2 bacon strips, cooked",
        "Lettuce",
        "Tomato slices",
        "2 tbsp mayonnaise",
        "Butter"
      ],
      steps: [
        "Toast bread slices.",
        "Spread mayonnaise on each slice.",
        "Layer chicken and lettuce on first slice.",
        "Top with second slice, add bacon and tomato.",
        "Cover with third slice.",
        "Cut into triangles and serve."
      ]
    },
    { 
      id: 14, 
      name: "Veg Sandwich",
      tagline: "Healthy vegetable sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "2 bread slices",
        "Cucumber slices",
        "Tomato slices",
        "Onion slices",
        "Lettuce",
        "1 tbsp green chutney",
        "Butter"
      ],
      steps: [
        "Spread chutney on bread.",
        "Layer all vegetables.",
        "Cover with second slice.",
        "Grill if desired.",
        "Serve with ketchup."
      ]
    },
    { 
      id: 15, 
      name: "Egg Sandwich",
      tagline: "Simple egg sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "2 bread slices",
        "2 eggs, scrambled",
        "Lettuce",
        "1 tbsp mayonnaise",
        "Butter"
      ],
      steps: [
        "Spread mayonnaise on bread.",
        "Place scrambled eggs and lettuce.",
        "Cover with second slice.",
        "Grill until golden.",
        "Serve hot."
      ]
    },
    { 
      id: 16, 
      name: "Tuna Sandwich",
      tagline: "Tuna mayo sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "2 bread slices",
        "1 can tuna, drained",
        "2 tbsp mayonnaise",
        "1 tbsp onion, chopped",
        "Lettuce",
        "Salt and pepper"
      ],
      steps: [
        "Mix tuna with mayonnaise and onion.",
        "Spread on bread.",
        "Add lettuce and cover.",
        "Grill and serve."
      ]
    },

    // ==================== WRAPS & ROLLS (5) ====================
    { 
      id: 17, 
      name: "Chicken Wrap",
      tagline: "Grilled chicken wrap",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
      ingredients: [
        "1 tortilla wrap",
        "200g grilled chicken strips",
        "Lettuce",
        "Tomato slices",
        "Onion slices",
        "2 tbsp mayonnaise",
        "1 tsp chili sauce"
      ],
      steps: [
        "Warm tortilla on tawa.",
        "Spread sauces on tortilla.",
        "Place chicken and vegetables.",
        "Roll tightly and cut in half.",
        "Serve with fries."
      ]
    },
    { 
      id: 18, 
      name: "Chicken Shawarma",
      tagline: "Middle Eastern style wrap",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
      ingredients: [
        "1 pita bread",
        "200g chicken shawarma",
        "Garlic sauce",
        "Pickles",
        "Fries",
        "Tomato slices"
      ],
      steps: [
        "Warm pita bread.",
        "Spread garlic sauce.",
        "Add chicken, pickles, fries and tomato.",
        "Roll tightly and serve."
      ]
    },
    { 
      id: 19, 
      name: "Seekh Kebab Roll",
      tagline: "Kebab paratha roll",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
      ingredients: [
        "1 paratha",
        "2 seekh kebabs",
        "Onion slices",
        "Green chutney",
        "Raita"
      ],
      steps: [
        "Warm paratha on tawa.",
        "Place kebabs and onions.",
        "Drizzle chutney and raita.",
        "Roll and serve."
      ]
    },
    { 
      id: 20, 
      name: "Veg Wrap",
      tagline: "Vegetable wrap",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
      ingredients: [
        "1 tortilla",
        "Mixed vegetables, grilled",
        "Lettuce",
        "Hummus",
        "Bell peppers"
      ],
      steps: [
        "Spread hummus on tortilla.",
        "Add vegetables and lettuce.",
        "Roll and serve."
      ]
    },
    { 
      id: 21, 
      name: "Egg Roll",
      tagline: "Egg paratha roll",
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
      ingredients: [
        "1 paratha",
        "2 eggs, scrambled",
        "Onion slices",
        "Green chilies",
        "Chutney"
      ],
      steps: [
        "Cook paratha.",
        "Place scrambled eggs and onions.",
        "Add chutney and roll.",
        "Serve hot."
      ]
    }
  ];
    // More light dinner recipes...
  const moreLightDinnerRecipes = [
    // ==================== LIGHT CURRIES (4) ====================
    { 
      id: 22, 
      name: "Moong Dal",
      tagline: "Light yellow lentil dal",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup moong dal",
        "1 onion, chopped",
        "2 tomatoes, chopped",
        "1 tsp cumin seeds",
        "1/2 tsp turmeric",
        "1 tsp red chili powder",
        "2 tbsp oil",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Wash and pressure cook dal with turmeric.",
        "Heat oil, add cumin and onions.",
        "Add tomatoes and cook until soft.",
        "Add red chili and salt.",
        "Add cooked dal and simmer for 5 minutes.",
        "Garnish with coriander and serve."
      ]
    },
    { 
      id: 23, 
      name: "Mix Dal",
      tagline: "Light mixed lentil curry",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1/2 cup moong dal",
        "1/2 cup masoor dal",
        "1 onion",
        "2 tomatoes",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "1 tsp red chili",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Cook dals together.",
        "Prepare tadka and mix.",
        "Serve with rice."
      ]
    },
    { 
      id: 24, 
      name: "Vegetable Curry",
      tagline: "Light mixed veg curry",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554",
      ingredients: [
        "2 cups mixed vegetables",
        "1 onion, chopped",
        "2 tomatoes, pureed",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "1 tsp red chili",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Sauté onions and spices.",
        "Add tomatoes and cook.",
        "Add vegetables and water.",
        "Simmer until tender.",
        "Serve with roti."
      ]
    },
    { 
      id: 25, 
      name: "Kadhi",
      tagline: "Yogurt curry",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      ingredients: [
        "1 cup yogurt",
        "2 tbsp besan",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "1 tsp red chili",
        "2 cups water",
        "Salt to taste",
        "For tadka: oil, cumin, curry leaves"
      ],
      steps: [
        "Mix yogurt, besan and water.",
        "Bring to boil, stirring continuously.",
        "Add spices and simmer for 20 minutes.",
        "Prepare tadka and add to kadhi.",
        "Serve with rice."
      ]
    },

    // ==================== LIGHT RICE DISHES (4) ====================
    { 
      id: 26, 
      name: "Khichdi",
      tagline: "Rice and lentil porridge",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1/2 cup rice",
        "1/2 cup moong dal",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "2 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Wash rice and dal together.",
        "Pressure cook with 3 cups water.",
        "Temper with cumin in ghee.",
        "Serve with yogurt and pickle."
      ]
    },
    { 
      id: 27, 
      name: "Vegetable Khichdi",
      tagline: "Khichdi with vegetables",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1/2 cup rice",
        "1/2 cup dal",
        "1 cup mixed vegetables",
        "1 tsp cumin",
        "1/2 tsp turmeric",
        "2 tbsp ghee",
        "Salt to taste"
      ],
      steps: [
        "Cook rice and dal with vegetables.",
        "Temper with cumin.",
        "Serve hot."
      ]
    },
    { 
      id: 28, 
      name: "Lemon Rice",
      tagline: "Tangy lemon rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup cooked rice",
        "1 lemon, juiced",
        "1 tsp mustard seeds",
        "1 tsp urad dal",
        "2 red chilies",
        "Curry leaves",
        "1/2 tsp turmeric",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Heat oil, add mustard, dal, chilies, curry leaves.",
        "Add turmeric and lemon juice.",
        "Mix with rice.",
        "Serve with papad."
      ]
    },
    { 
      id: 29, 
      name: "Curd Rice",
      tagline: "Yogurt rice",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      ingredients: [
        "1 cup cooked rice",
        "1 cup yogurt",
        "1/2 cup milk",
        "1 tsp mustard seeds",
        "1 tsp urad dal",
        "Curry leaves",
        "2 tbsp oil",
        "Salt to taste"
      ],
      steps: [
        "Mash rice lightly.",
        "Mix with yogurt and milk.",
        "Temper with mustard, dal and curry leaves.",
        "Pour over rice mixture.",
        "Chill and serve."
      ]
    },

    // ==================== LIGHT BREAKFAST FOR DINNER (3) ====================
    { 
      id: 30, 
      name: "Anda Paratha",
      tagline: "Egg stuffed paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 parathas",
        "2 eggs",
        "1 onion, chopped",
        "2 green chilies",
        "Salt and pepper"
      ],
      steps: [
        "Cook paratha on tawa.",
        "Beat eggs with onions and spices.",
        "Pour on paratha and flip.",
        "Cook until egg is set.",
        "Serve with chai."
      ]
    },
    { 
      id: 31, 
      name: "Omelette with Toast",
      tagline: "Simple egg dinner",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "3 eggs",
        "1 onion, chopped",
        "1 tomato, chopped",
        "2 green chilies",
        "2 bread slices",
        "Butter",
        "Salt and pepper"
      ],
      steps: [
        "Beat eggs with vegetables and spices.",
        "Cook omelette in butter.",
        "Toast bread.",
        "Serve omelette with toast."
      ]
    },
    { 
      id: 32, 
      name: "Bread Omelette",
      tagline: "Bread with egg",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      ingredients: [
        "2 eggs",
        "2 bread slices",
        "1 onion",
        "2 green chilies",
        "Butter"
      ],
      steps: [
        "Beat eggs with onions and chilies.",
        "Dip bread in egg mixture.",
        "Fry in butter until golden.",
        "Serve with ketchup."
      ]
    },

    // ==================== YOGURT BASED (3) ====================
    { 
      id: 33, 
      name: "Dahi Bhalla",
      tagline: "Lentil fritters in yogurt",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      ingredients: [
        "For bhallas: 1 cup urad dal",
        "1 tsp ginger paste",
        "Salt",
        "Oil for frying",
        "For serving: 2 cups yogurt",
        "Tamarind chutney",
        "Green chutney",
        "Chaat masala"
      ],
      steps: [
        "Soak dal, grind to paste.",
        "Add ginger and salt, whisk until fluffy.",
        "Drop small portions in hot oil and fry until golden.",
        "Soak fried bhallas in warm water for 15 minutes.",
        "Squeeze and place in serving dish.",
        "Beat yogurt and pour over bhallas.",
        "Top with chutneys and chaat masala.",
        "Chill before serving."
      ]
    },
    { 
      id: 34, 
      name: "Fruit Yogurt",
      tagline: "Yogurt with fruits",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      ingredients: [
        "1 cup yogurt",
        "1 apple, chopped",
        "1 banana, sliced",
        "1 tbsp honey",
        "2 tbsp nuts",
        "1/2 tsp cardamom"
      ],
      steps: [
        "Beat yogurt until smooth.",
        "Add honey and cardamom.",
        "Top with fruits and nuts.",
        "Serve chilled."
      ]
    },
    { 
      id: 35, 
      name: "Raita",
      tagline: "Yogurt with vegetables",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      ingredients: [
        "1 cup yogurt",
        "1/2 cucumber, grated",
        "1/2 tsp cumin powder",
        "1/2 tsp chaat masala",
        "Salt to taste",
        "Fresh coriander"
      ],
      steps: [
        "Beat yogurt until smooth.",
        "Add cucumber and spices.",
        "Garnish with coriander.",
        "Serve chilled."
      ]
    },

    // ==================== LIGHT FAST FOOD (3) ====================
    { 
      id: 36, 
      name: "Chicken Burger",
      tagline: "Simple chicken burger",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
      ingredients: [
        "1 burger bun",
        "1 chicken patty",
        "Lettuce",
        "Tomato slice",
        "Onion slice",
        "1 tbsp mayo",
        "1 tsp ketchup"
      ],
      steps: [
        "Toast bun.",
        "Fry chicken patty.",
        "Spread sauces on bun.",
        "Layer lettuce, patty, tomato, onion.",
        "Cover and serve."
      ]
    },
    { 
      id: 37, 
      name: "Chicken Nuggets",
      tagline: "Crispy chicken nuggets",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
      ingredients: [
        "200g chicken breast, cubed",
        "1/2 cup flour",
        "1 egg, beaten",
        "1 cup breadcrumbs",
        "1 tsp red chili",
        "1/2 tsp garlic powder",
        "Salt",
        "Oil for frying"
      ],
      steps: [
        "Season chicken with spices.",
        "Coat in flour, dip in egg, coat in breadcrumbs.",
        "Deep fry until golden.",
        "Serve with ketchup."
      ]
    },
    { 
      id: 38, 
      name: "French Fries",
      tagline: "Crispy potato fries",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
      ingredients: [
        "3 potatoes",
        "Oil for frying",
        "Salt",
        "Chaat masala"
      ],
      steps: [
        "Cut potatoes into thin strips.",
        "Soak in cold water for 30 minutes.",
        "Drain and pat dry.",
        "Deep fry until golden and crispy.",
        "Sprinkle salt and chaat masala.",
        "Serve hot."
      ]
    },

    // ==================== GRILLED ITEMS (2) ====================
    { 
      id: 39, 
      name: "Grilled Fish",
      tagline: "Light grilled fish",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      ingredients: [
        "200g fish fillet",
        "1 tbsp lemon juice",
        "1 tsp garlic paste",
        "1 tsp red chili",
        "1/2 tsp cumin",
        "Salt",
        "1 tbsp oil"
      ],
      steps: [
        "Marinate fish with spices for 30 minutes.",
        "Grill on tawa with oil.",
        "Serve with salad."
      ]
    },
    { 
      id: 40, 
      name: "Grilled Vegetables",
      tagline: "Charred veg platter",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      ingredients: [
        "1 zucchini, sliced",
        "1 capsicum, sliced",
        "1 onion, sliced",
        "1 tomato, sliced",
        "2 tbsp olive oil",
        "1 tsp oregano",
        "Salt and pepper"
      ],
      steps: [
        "Toss vegetables with oil and spices.",
        "Grill on tawa or grill pan.",
        "Serve with mint chutney."
      ]
    }
  ];

  // Combine all arrays
  const allLightDinnerRecipes = [...lightDinnerRecipes, ...moreLightDinnerRecipes];

  // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allLightDinnerRecipes;

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
    <div className="light-dinner-page">
      {/* Header */}
      <header className="light-dinner-header">
        <div className="light-dinner-header-content">
          <h1 className="light-dinner-title">🌙 Light Dinner Options</h1>
          <p className="light-dinner-description">
            Discover 40+ light and healthy dinner recipes - soups, salads, sandwiches, wraps, light curries aur bhi bahut kuch
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="light-dinner-main">
        <div className="light-dinner-grid-section">
          <div className="light-dinner-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="light-dinner-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="light-dinner-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="light-dinner-card-content">
                  <h3 className="light-dinner-card-title">{recipe.name}</h3>
                  <p className="light-dinner-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back to Dinner Categories
        </button>
      </div>

      {/* Modal for Recipe Details */}
      {showDetailPanel && selectedRecipe && (
        <div className="light-dinner-modal-overlay" onClick={handleCloseModal}>
          <div
            className="light-dinner-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="light-dinner-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="light-dinner-modal-header">
              <div className="light-dinner-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="light-dinner-modal-content">
              {/* Column 1: Ingredients */}
              <div className="light-dinner-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="light-dinner-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="light-dinner-ingredient-item">
                      <span className="light-dinner-ingredient-bullet">•</span>
                      <span className="light-dinner-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="light-dinner-modal-steps">
                <h3>Steps to Make</h3>
                <div className="light-dinner-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="light-dinner-step-item">
                      <span className="light-dinner-step-number">{index + 1}.</span>
                      <span className="light-dinner-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="light-dinner-modal-voice-container">
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

export default RecipesLightDinner;