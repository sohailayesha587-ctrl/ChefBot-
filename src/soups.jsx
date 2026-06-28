import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './soups.css';

const soups = () => {
  const navigate = useNavigate();
  const [selectedSoup, setSelectedSoup] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  const soups = [
    { 
      id: 1, 
      name: "Cream of Mushroom Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqiqU3xgsUs4bYX9IvYvXIEKw_-XIoyvFbQ&s",
      ingredients: [
        "500g fresh mushrooms, sliced",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "2 cups vegetable broth",
        "1 cup heavy cream",
        "2 tbsp butter",
        "2 tbsp all-purpose flour",
        "1 tsp thyme",
        "Salt and pepper to taste"
      ],
      steps: [
        "Melt butter in a large pot over medium heat.",
        "Add onions and garlic, sauté until translucent.",
        "Add mushrooms and cook until they release their moisture and brown slightly.",
        "Sprinkle flour and stir for 2 minutes to cook out raw flour taste.",
        "Gradually add vegetable broth while stirring to prevent lumps.",
        "Bring to a simmer and cook for 15 minutes until slightly thickened.",
        "Stir in cream and thyme, season with salt and pepper.",
        "Simmer for 5 more minutes, adjust seasoning, and serve hot."
      ]
    },
    { 
      id: 2, 
      name: "Creamy Noodles Soup",
      image: "https://www.twopeasandtheirpod.com/wp-content/uploads/2019/10/Creamy-Chicken-Noodle-Soup-3.jpg",
      ingredients: [
        "200g noodles",
        "4 cups chicken broth",
        "1 cup mixed vegetables (carrots, peas, corn)",
        "1 cup milk",
        "2 tbsp butter",
        "2 tbsp flour",
        "1 tsp black pepper",
        "Salt to taste"
      ],
      steps: [
        "Cook noodles according to package instructions, drain and set aside.",
        "In a pot, melt butter and stir in flour to make a roux, cook for 2 minutes.",
        "Slowly add chicken broth while whisking to prevent lumps.",
        "Add mixed vegetables and cook for 10 minutes until tender.",
        "Stir in milk and cooked noodles.",
        "Season with salt and pepper, simmer for 5 minutes.",
        "Serve hot garnished with fresh herbs."
      ]
    },
    { 
      id: 3, 
      name: "Egg Drop Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT91WUf88VTnCSrt3kQ9ChnM7D053vayxpBEg&s",
      ingredients: [
        "4 cups chicken broth",
        "2 eggs, lightly beaten",
        "2 tbsp cornstarch",
        "2 tbsp water",
        "1 tsp soy sauce",
        "1/2 tsp ginger, grated",
        "2 green onions, chopped",
        "1/4 tsp white pepper"
      ],
      steps: [
        "Bring chicken broth to a boil in a pot.",
        "Mix cornstarch with water to make a slurry.",
        "Add soy sauce, ginger, and white pepper to the broth.",
        "Slowly pour in cornstarch slurry while stirring continuously.",
        "Reduce heat to a simmer.",
        "Slowly drizzle beaten eggs into the soup while stirring gently in one direction.",
        "Cook for 1 minute until eggs set into ribbons.",
        "Garnish with green onions and serve immediately."
      ]
    },
    { 
      id: 4, 
      name: "Chicken Macroni Corn Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpQ9CCB50MahAFRH-KMbVuObrgRPLUbwzHlw&s",
      ingredients: [
        "200g chicken breast, diced",
        "1 cup macaroni",
        "1 cup sweet corn kernels",
        "1 carrot, diced",
        "4 cups chicken broth",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "2 tbsp soy sauce",
        "1 tsp black pepper",
        "2 tbsp oil"
      ],
      steps: [
        "Heat oil in a pot and sauté onions and garlic until fragrant.",
        "Add chicken and cook until no longer pink and lightly browned.",
        "Add carrots and corn, cook for 5 minutes stirring occasionally.",
        "Pour in chicken broth and bring to a boil.",
        "Add macaroni and cook until al dente (about 10-12 minutes).",
        "Season with soy sauce and black pepper.",
        "Simmer for 10 minutes until flavors combine.",
        "Serve hot with crusty bread."
      ]
    },
    { 
      id: 5, 
      name: "Chicken Soup",
      tagline: "Classic comforting chicken soup",
      image: "https://afoodcentriclife.com/wp-content/uploads/2014/01/chicken-vegetable-soup-pot-square-crop-0526.jpg",
      ingredients: [
        "1 whole chicken (or 500g chicken pieces)",
        "8 cups water",
        "2 carrots, sliced",
        "2 celery stalks, chopped",
        "1 onion, chopped",
        "3 cloves garlic",
        "1 bay leaf",
        "1 tsp thyme",
        "Salt and pepper to taste",
        "Fresh parsley for garnish"
      ],
      steps: [
        "Place chicken in a large pot with water.",
        "Bring to a boil, then reduce heat to simmer.",
        "Skim off any foam that rises to the surface.",
        "Add vegetables and herbs (carrots, celery, onion, garlic, bay leaf, thyme).",
        "Simmer for 45-60 minutes until chicken is tender.",
        "Remove chicken, shred the meat, and return to pot.",
        "Season with salt and pepper to taste.",
        "Simmer for another 10 minutes, garnish with parsley and serve hot."
      ]
    },
    { 
      id: 6, 
      name: "Vegetable Hot and Sour Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAVyVHIovVcsPXzZ8_kDA1VFX6ovci-VF5w&s",
      ingredients: [
        "4 cups vegetable broth",
        "1 cup mixed vegetables (carrots, cabbage, bell peppers)",
        "100g tofu, cubed",
        "2 tbsp soy sauce",
        "1 tbsp vinegar",
        "1 tbsp chili sauce",
        "2 tbsp cornstarch",
        "1/4 cup water",
        "1 tsp ginger, grated",
        "1 tsp garlic, minced"
      ],
      steps: [
        "Bring vegetable broth to a boil in a pot.",
        "Add mixed vegetables and cook for 8-10 minutes until tender-crisp.",
        "Add tofu, ginger, and garlic.",
        "In a bowl, mix cornstarch with water to make slurry.",
        "Add soy sauce, vinegar, and chili sauce to the soup.",
        "Slowly add cornstarch slurry while stirring continuously.",
        "Simmer for 5 minutes until soup thickens.",
        "Adjust seasoning and serve hot."
      ]
    },
    { 
      id: 7, 
      name: "Chicken Broth",
      image: "https://abraskitchen.com/wp-content/uploads/2021/11/Homemade-Nourishing-Chicken-Soup-from-Scratch.jpg",
      ingredients: [
        "2kg chicken bones/carcass",
        "12 cups water",
        "2 onions, quartered",
        "3 carrots, chopped",
        "4 celery stalks",
        "4 cloves garlic, smashed",
        "2 bay leaves",
        "1 tsp peppercorns",
        "Salt to taste"
      ],
      steps: [
        "Place chicken bones in a large pot with water.",
        "Bring to a boil, skim off impurities that rise to surface.",
        "Add all vegetables and aromatics.",
        "Reduce heat to low, partially cover, and simmer for 3 hours.",
        "Strain through fine mesh sieve or cheesecloth.",
        "Let cool, then refrigerate to remove fat layer from top.",
        "Use as base for soups or store frozen for up to 6 months."
      ]
    },
    { 
      id: 8, 
      name: "Chicken Vegetable Soup",
      image: "https://diethood.com/wp-content/uploads/2023/12/chicken-vegetable-soup-recipe-3.jpg",
      ingredients: [
        "300g chicken breast, cubed",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 potatoes, diced",
        "1 cup green beans, chopped",
        "4 cups chicken broth",
        "2 tomatoes, chopped",
        "1 tsp mixed herbs",
        "2 tbsp oil",
        "Salt and pepper to taste"
      ],
      steps: [
        "Heat oil in a pot and sauté onions until golden.",
        "Add chicken and cook until browned on all sides.",
        "Add carrots, potatoes, and green beans, cook for 5 minutes.",
        "Pour in chicken broth and bring to a boil.",
        "Add tomatoes and mixed herbs.",
        "Simmer for 30 minutes until vegetables are tender.",
        "Season with salt and pepper to taste.",
        "Serve hot with bread rolls or crackers."
      ]
    },
    { 
      id: 9, 
      name: "Mulligatawny Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVLLBgBh_x71ksVntrxbfzJhqM1M9cn1DOrQ&s",
      ingredients: [
        "1 cup red lentils",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 apples, peeled and diced",
        "4 cups vegetable broth",
        "2 tbsp curry powder",
        "1 tsp turmeric",
        "1 tsp cumin",
        "2 tbsp coconut milk",
        "2 tbsp oil"
      ],
      steps: [
        "Rinse lentils and soak for 30 minutes, then drain.",
        "Heat oil and sauté onions until soft.",
        "Add carrots and apples, cook for 5 minutes.",
        "Add spices (curry powder, turmeric, cumin) and cook until fragrant.",
        "Add lentils and vegetable broth, bring to boil.",
        "Simmer for 30 minutes until lentils are soft.",
        "Blend half the soup for creaminess (optional).",
        "Stir in coconut milk and serve hot."
      ]
    },
    { 
      id: 10, 
      name: "Chicken Tikka Corn Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyWXNwiW5kMyPwJ0ipRVRDZdGAVw3FRr61BQ&s",
      ingredients: [
        "200g chicken tikka pieces",
        "1 cup sweet corn",
        "1 bell pepper, chopped",
        "4 cups chicken broth",
        "1 cup cream",
        "2 tbsp tikka masala",
        "1 onion, chopped",
        "2 tbsp butter",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Sauté onions in butter until golden brown.",
        "Add chicken tikka pieces and cook for 5 minutes until heated through.",
        "Add bell pepper and sweet corn, cook for 3 minutes.",
        "Add tikka masala and cook for 2 minutes until fragrant.",
        "Pour in chicken broth and bring to simmer.",
        "Cook for 15 minutes until flavors blend.",
        "Stir in cream and heat through (don't boil).",
        "Garnish with fresh coriander and serve."
      ]
    },
    { 
      id: 11, 
      name: "Lentil Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdbZe-gy4koKqvF4b9ng5gLdTBLtT9cxPqXg&s",
      ingredients: [
        "1 cup brown lentils",
        "1 onion, chopped",
        "2 carrots, diced",
        "2 celery stalks, chopped",
        "4 cups vegetable broth",
        "2 cloves garlic, minced",
        "1 tsp cumin",
        "1 bay leaf",
        "2 tbsp lemon juice"
      ],
      steps: [
        "Rinse lentils and drain.",
        "Sauté onions, carrots, and celery in oil until soft (about 8 minutes).",
        "Add garlic and cumin, cook for 1 minute.",
        "Add lentils, vegetable broth, and bay leaf.",
        "Bring to boil, then reduce heat to simmer.",
        "Cook for 35-40 minutes until lentils are tender.",
        "Remove bay leaf and blend partially if desired.",
        "Stir in lemon juice and serve."
      ]
    },
    { 
      id: 12, 
      name: "Tomato Chicken Macaroni Soup",
      image: "https://eatthegains.com/wp-content/uploads/2022/11/Chicken-Tomato-Soup-10-1120x1120.jpg",
      ingredients: [
        "200g chicken breast, shredded",
        "1 cup macaroni",
        "4 cups tomato puree",
        "2 cups chicken broth",
        "1 onion, chopped",
        "2 cloves garlic",
        "1 tsp oregano",
        "1 tsp basil",
        "2 tbsp olive oil"
      ],
      steps: [
        "Cook macaroni according to package directions, drain and set aside.",
        "Heat olive oil and sauté onion and garlic until soft.",
        "Add shredded chicken and cook for 5 minutes.",
        "Add tomato puree and chicken broth.",
        "Season with oregano and basil.",
        "Simmer for 15 minutes until flavors meld.",
        "Add cooked macaroni and heat through.",
        "Serve hot with grated Parmesan cheese."
      ]
    },
    { 
      id: 13, 
      name: "Barley Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjCye450K5PpaObGWKQmMunXo0_cTTBoLPg&s",
      ingredients: [
        "1 cup pearl barley",
        "2 carrots, diced",
        "2 potatoes, diced",
        "1 onion, chopped",
        "4 cups vegetable broth",
        "2 tbsp tomato paste",
        "1 tsp thyme",
        "2 tbsp olive oil"
      ],
      steps: [
        "Rinse barley and soak for 30 minutes (optional).",
        "Heat oil and sauté onions until translucent.",
        "Add carrots and potatoes, cook for 5 minutes.",
        "Add barley and vegetable broth.",
        "Stir in tomato paste and thyme.",
        "Bring to boil, then reduce to simmer.",
        "Cook for 50-60 minutes until barley is tender.",
        "Season with salt and pepper and serve."
      ]
    },
    { 
      id: 14, 
      name: "Chicken Potato Soup",
      image: "https://valentinascorner.com/wp-content/uploads/2024/03/Creamy-Chicken-Potato-Soup-Recipe-1.jpg",
      ingredients: [
        "300g chicken, cubed",
        "3 potatoes, diced",
        "1 onion, chopped",
        "2 carrots, diced",
        "4 cups chicken broth",
        "1 cup milk",
        "2 tbsp flour",
        "2 tbsp butter",
        "Fresh dill for garnish"
      ],
      steps: [
        "Melt butter and sauté onions until soft.",
        "Add chicken and cook until no longer pink.",
        "Add potatoes and carrots, cook for 5 minutes.",
        "Sprinkle flour and stir for 2 minutes to coat.",
        "Gradually add chicken broth while stirring.",
        "Simmer for 20 minutes until vegetables are tender.",
        "Stir in milk and heat through (don't boil).",
        "Garnish with fresh dill and serve."
      ]
    },
    { 
      id: 15, 
      name: "Hareesa Soup",
      image: "https://onestophalal.com/cdn/shop/articles/hareesa-1697927464282_727ae026-7107-443f-87ca-f2ad241d870a_1200x.jpg?v=1697927657",
      ingredients: [
        "500g boneless chicken or mutton",
        "1 cup wheat, soaked overnight",
        "2 onions, finely chopped",
        "4 cloves garlic, minced",
        "2-inch ginger, grated",
        "1 tbsp red chili powder",
        "1 tsp garam masala",
        "1/2 cup ghee",
        "Salt to taste"
      ],
      steps: [
        "Pressure cook meat with wheat until very tender (about 45 minutes).",
        "Shred the meat finely using forks or hands.",
        "Heat ghee and sauté onions until golden brown.",
        "Add garlic and ginger, cook for 2 minutes.",
        "Add chili powder and garam masala, cook for 1 minute.",
        "Add shredded meat and wheat mixture with some cooking liquid.",
        "Cook on low heat for 2-3 hours, stirring occasionally.",
        "Serve hot with lemon wedges and fried onions."
      ]
    },
    { 
      id: 16, 
      name: "Cream of Chicken Soup",
      image: "https://www.recipetineats.com/tachyon/2023/07/Creamy-Tuscan-Chicken-Soup_3.jpg",
      ingredients: [
        "300g chicken breast",
        "4 cups chicken broth",
        "1 cup heavy cream",
        "1 onion, chopped",
        "2 tbsp butter",
        "2 tbsp flour",
        "1 tsp thyme",
        "Salt and pepper to taste"
      ],
      steps: [
        "Poach chicken in broth until cooked through (about 15-20 minutes).",
        "Remove chicken, shred or dice finely.",
        "Melt butter and sauté onions until soft.",
        "Add flour and cook for 2 minutes.",
        "Gradually add chicken broth while whisking.",
        "Simmer for 10 minutes until slightly thickened.",
        "Add shredded chicken and thyme.",
        "Stir in cream, heat through (don't boil), season and serve."
      ]
    },
    { 
      id: 17, 
      name: "Spinach Soup",
      image: "https://static01.nyt.com/images/2013/06/03/health/03recipehealth/03recipehealth-superJumbo.jpg",
      ingredients: [
        "500g fresh spinach",
        "1 onion, chopped",
        "2 cloves garlic",
        "3 cups vegetable broth",
        "1 cup milk",
        "2 tbsp butter",
        "Pinch of nutmeg",
        "Salt and pepper to taste"
      ],
      steps: [
        "Wash spinach thoroughly.",
        "Melt butter and sauté onion and garlic until soft.",
        "Add spinach and cook until wilted (about 3-4 minutes).",
        "Add vegetable broth and bring to boil.",
        "Simmer for 10 minutes.",
        "Blend until smooth using immersion blender.",
        "Return to pot, add milk and nutmeg.",
        "Heat through and serve."
      ]
    },
    { 
      id: 18, 
      name: "Restaurant Style Hot and Sour Soup",
      image: "https://redhousespice.com/wp-content/uploads/2021/08/Chinese-hot-and-sour-soup-1-scaled.jpg",
      ingredients: [
        "4 cups chicken broth",
        "100g chicken, shredded",
        "50g mushrooms, sliced",
        "50g bamboo shoots",
        "2 tbsp soy sauce",
        "2 tbsp vinegar",
        "1 tbsp chili sauce",
        "2 tbsp cornstarch",
        "1 egg, beaten"
      ],
      steps: [
        "Bring broth to boil in a pot.",
        "Add chicken, mushrooms, and bamboo shoots.",
        "Cook for 8 minutes until chicken is cooked.",
        "Mix cornstarch with water to make slurry.",
        "Add soy sauce, vinegar, and chili sauce.",
        "Add cornstarch slurry while stirring until thickened.",
        "Slowly drizzle beaten egg while stirring in one direction.",
        "Serve immediately with chili oil on side."
      ]
    },
    { 
      id: 19, 
      name: "Chicken Corn Soup",
      image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Amish-Chicken-Corn-Soup_EXPS_FT24_31049_EC_060524_1.jpg",
      ingredients: [
        "200g chicken breast, shredded",
        "1 can cream style corn",
        "4 cups chicken broth",
        "2 tbsp cornstarch",
        "1 egg white",
        "1 tsp ginger, grated",
        "2 spring onions, chopped",
        "Salt and white pepper"
      ],
      steps: [
        "Bring broth to boil in a pot.",
        "Add chicken and ginger, cook for 10 minutes.",
        "Add cream style corn and stir well.",
        "Mix cornstarch with water to make slurry.",
        "Add slurry while stirring until soup thickens slightly.",
        "Slowly pour in beaten egg white while stirring.",
        "Season with salt and white pepper.",
        "Garnish with spring onions and serve."
      ]
    },
    { 
      id: 20, 
      name: "Mixed Grain Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZGsoN2CzjBtlKPnz2ATrFnz2i1eR20avHuA&s",
      ingredients: [
        "1/2 cup barley",
        "1/2 cup quinoa",
        "1/4 cup lentils",
        "4 cups vegetable broth",
        "2 carrots, diced",
        "2 celery stalks, chopped",
        "1 onion, chopped",
        "2 tbsp olive oil"
      ],
      steps: [
        "Rinse all grains under cold water.",
        "Heat oil and sauté vegetables until soft (about 8 minutes).",
        "Add grains and cook for 2 minutes, stirring.",
        "Add vegetable broth and bring to boil.",
        "Reduce heat to simmer and cover.",
        "Cook for 45 minutes until grains are tender.",
        "Season with herbs and spices to taste.",
        "Serve hot with crusty bread."
      ]
    },
    { 
      id: 21, 
      name: "Hot and Sour Chicken Macaroni Soup",
      image: "https://www.yummytummyaarthi.com/wp-content/uploads/2022/07/hot-and-sour-chicken-soup-1-500x500.jpg",
      ingredients: [
        "200g chicken, shredded",
        "1 cup macaroni",
        "4 cups chicken broth",
        "2 tbsp soy sauce",
        "1 tbsp vinegar",
        "1 tbsp chili garlic sauce",
        "2 tbsp cornstarch",
        "1 cup mixed vegetables"
      ],
      steps: [
        "Cook macaroni according to package, drain and set aside.",
        "Bring broth to boil in a pot.",
        "Add chicken and vegetables, cook for 10 minutes.",
        "Add soy sauce, vinegar, and chili garlic sauce.",
        "Mix cornstarch with water to make slurry.",
        "Add slurry while stirring until soup thickens.",
        "Add cooked macaroni and heat through.",
        "Serve hot with extra chili sauce on side."
      ]
    },
    { 
      id: 22, 
      name: "Herbal Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWhSr-Av1kFPXW6tpS1_vI0qGUYhbZMCl42w&s",
      ingredients: [
        "300g chicken or pork ribs",
        "10 red dates",
        "20g goji berries",
        "15g dried longan",
        "10g dried polygonatum",
        "10g dried Chinese yam",
        "2 liters water",
        "Salt to taste"
      ],
      steps: [
        "Blanch meat in boiling water for 5 minutes, then rinse.",
        "Combine all ingredients in large pot with water.",
        "Bring to boil, then reduce heat to low simmer.",
        "Simmer for 1.5-2 hours until meat is very tender.",
        "Skim off any impurities that rise to surface.",
        "Season with salt if needed (traditionally unsalted).",
        "Strain and serve hot as nourishing broth.",
        "Discard herbs before serving."
      ]
    },
    { 
      id: 23, 
      name: "Mutton Broth",
      image: "https://www.foodireland.com/recipes/wp-content/uploads/2013/07/mutton-broth.jpg",
      ingredients: [
        "500g mutton with bones",
        "8 cups water",
        "1 onion, chopped",
        "4 cloves garlic",
        "1-inch ginger, sliced",
        "1 tsp whole black pepper",
        "4 cloves",
        "2 green cardamom",
        "1 cinnamon stick",
        "1 bay leaf",
        "Salt to taste",
        "Fresh coriander for garnish"
      ],
      steps: [
        "Wash mutton thoroughly and place in cooking pot.",
        "Add water, onion, garlic, ginger, and all whole spices.",
        "Bring to a boil, then reduce heat to low simmer.",
        "Simmer for 2-3 hours until mutton becomes very tender.",
        "Remove any foam that forms on surface during cooking.",
        "Add salt toward the end of cooking.",
        "Strain broth for clear soup, or serve with meat pieces.",
        "Garnish with fresh coriander and serve hot."
      ]
    },
    { 
      id: 24, 
      name: "Pumpkin Soup",
      image: "https://images.immediate.co.uk/production/volatile/sites/30/2021/07/Spicy-pumpkin-soup-fcf2fe5.jpg",
      ingredients: [
        "1 kg pumpkin, peeled and cubed",
        "1 onion, chopped",
        "2 cloves garlic",
        "4 cups vegetable broth",
        "1 cup coconut milk",
        "1 tsp cinnamon",
        "1/2 tsp nutmeg",
        "2 tbsp olive oil"
      ],
      steps: [
        "Toss pumpkin cubes with oil and roast at 200°C for 25 minutes.",
        "Sauté onion and garlic in pot until soft.",
        "Add roasted pumpkin and vegetable broth.",
        "Simmer for 15 minutes.",
        "Blend until very smooth using immersion blender.",
        "Return to pot, add coconut milk and spices.",
        "Heat through without boiling.",
        "Serve with roasted pumpkin seeds and cream swirl."
      ]
    },
    { 
      id: 25, 
      name: "Pot Pie Soup with Tender Pops",
      image: "https://i.ytimg.com/vi/JypPJvP2Kp4/maxresdefault.jpg",
      ingredients: [
        "300g chicken, cubed",
        "2 carrots, diced",
        "1 cup peas",
        "2 potatoes, diced",
        "4 cups chicken broth",
        "1 cup milk",
        "2 tbsp flour",
        "Puff pastry for topping"
      ],
      steps: [
        "Sauté chicken until cooked through, remove from pot.",
        "Sauté vegetables in same pot until tender (about 8 minutes).",
        "Add flour and cook for 2 minutes.",
        "Gradually add broth and milk while whisking.",
        "Add chicken back to pot.",
        "Simmer for 20 minutes until thickened.",
        "While soup simmers, bake puff pastry cut into small shapes.",
        "Serve soup with crispy pastry pops on top."
      ]
    },
    { 
      id: 26, 
      name: "Garlic Soup",
      image: "https://c.ndtvimg.com/2020-12/q9bvneb_sweet-corn-soup-recipe_625x300_16_December_20.jpg",
      ingredients: [
        "2 whole garlic bulbs",
        "1 onion, chopped",
        "4 cups vegetable broth",
        "1 cup cream",
        "2 tbsp olive oil",
        "Fresh thyme",
        "Salt and pepper"
      ],
      steps: [
        "Cut tops off garlic bulbs, drizzle with oil, wrap in foil.",
        "Roast at 190°C for 45-60 minutes until soft.",
        "Let cool, then squeeze out roasted garlic cloves.",
        "Sauté onion in pot until translucent.",
        "Add roasted garlic and broth.",
        "Simmer for 20 minutes.",
        "Blend until very smooth.",
        "Stir in cream and thyme, heat through and serve."
      ]
    },
    { 
      id: 27, 
      name: "Manchow Soup With Crispy Noodles",
      image: "https://www.secondrecipe.com/wp-content/uploads/2020/06/veg-manchow-soup.jpg",
      ingredients: [
        "4 cups vegetable broth",
        "1 cup mixed vegetables (carrots, cabbage, bell peppers)",
        "100g chicken or tofu",
        "2 tbsp soy sauce",
        "1 tbsp vinegar",
        "1 tbsp chili sauce",
        "2 tbsp cornstarch",
        "Crispy noodles for topping"
      ],
      steps: [
        "Sauté vegetables and protein until cooked.",
        "Add broth and bring to boil.",
        "Add soy sauce, vinegar, and chili sauce.",
        "Mix cornstarch with water to make slurry.",
        "Add slurry while stirring until soup thickens.",
        "Simmer for 10 minutes.",
        "Deep fry noodles until golden and crispy.",
        "Serve soup with generous amount of crispy noodles on top."
      ]
    },
    { 
      id: 28, 
      name: "Oats Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWZ_ZD63lz1QYsdz_Dw_tSKJwEss3DFqaFCg&s",
      ingredients: [
        "1 cup rolled oats",
        "4 cups vegetable broth",
        "1 carrot, grated",
        "1 onion, chopped",
        "2 cloves garlic",
        "1 tsp cumin",
        "2 tbsp lemon juice",
        "Fresh coriander"
      ],
      steps: [
        "Dry roast oats in pan for 2-3 minutes until fragrant.",
        "Sauté vegetables in pot until soft.",
        "Add oats and broth.",
        "Bring to boil, then reduce to simmer.",
        "Cook for 15 minutes until oats are soft.",
        "Add cumin and lemon juice.",
        "Garnish with fresh coriander.",
        "Serve hot with crusty bread."
      ]
    },
    { 
      id: 29, 
      name: "Creamy Chicken Macaroni Soup",
      image: "https://theunlikelybaker.com/wp-content/uploads/2025/11/4-Macaroni-Sopas.jpg",
      ingredients: [
        "200g chicken, cubed",
        "1 cup macaroni",
        "4 cups chicken broth",
        "1 cup cream",
        "1 onion, chopped",
        "2 tbsp butter",
        "2 tbsp flour",
        "1 tsp mixed herbs"
      ],
      steps: [
        "Cook macaroni according to package, drain and set aside.",
        "Sauté chicken until cooked through, remove from pot.",
        "Melt butter and sauté onions until soft.",
        "Add flour and cook for 2 minutes.",
        "Gradually add broth while whisking.",
        "Add chicken and herbs.",
        "Simmer for 15 minutes.",
        "Stir in cream and macaroni, heat through and serve."
      ]
    },
    { 
      id: 30, 
      name: "Paye Soup",
      image: "https://flavoredbyfatima.com/wp-content/uploads/2020/10/mutton-paya-mutton-trotters.jpeg",
      ingredients: [
        "4 lamb or goat trotters",
        "2 onions, chopped",
        "2-inch ginger, grated",
        "6 cloves garlic",
        "2 tbsp coriander powder",
        "1 tbsp red chili powder",
        "1 tsp turmeric",
        "Fresh ginger for garnish"
      ],
      steps: [
        "Clean trotters thoroughly, wash multiple times.",
        "Pressure cook trotters with water for 2 hours until very tender.",
        "Sauté onions in separate pan until golden brown.",
        "Add ginger, garlic, and spices, cook for 3 minutes.",
        "Add cooked trotters and broth.",
        "Simmer for 3-4 hours until soup becomes thick and gelatinous.",
        "Skim off excess fat if desired.",
        "Serve with fresh ginger, lemon, and chopped coriander."
      ]
    },
    { 
      id: 31, 
      name: "Tomato Soup",
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-recipe.jpg",
      ingredients: [
        "1 kg ripe tomatoes",
        "1 onion, chopped",
        "2 cloves garlic",
        "4 cups vegetable broth",
        "2 tbsp tomato paste",
        "1 tsp sugar",
        "Fresh basil",
        "2 tbsp cream"
      ],
      steps: [
        "Blanch tomatoes in boiling water, peel and chop.",
        "Sauté onion and garlic in pot until soft.",
        "Add tomatoes and tomato paste.",
        "Cook for 10 minutes until tomatoes break down.",
        "Add broth and simmer for 15 minutes.",
        "Blend until very smooth.",
        "Add sugar and fresh basil.",
        "Serve with cream drizzle and croutons."
      ]
    },
    { 
      id: 32, 
      name: "Thai Soup",
      image: "https://kaynutrition.com/wp-content/uploads/2023/10/thai-chicken-noodle-soup-1.jpg",
      ingredients: [
        "4 cups chicken or vegetable broth",
        "2 stalks lemongrass",
        "4 kaffir lime leaves",
        "2-inch galangal, sliced",
        "200g shrimp or chicken",
        "4 mushrooms, sliced",
        "2 tbsp fish sauce",
        "2 tbsp lime juice"
      ],
      steps: [
        "Bruise lemongrass stalks and add to broth.",
        "Add galangal slices and kaffir lime leaves.",
        "Bring to boil and simmer for 10 minutes.",
        "Add protein and mushrooms.",
        "Cook until protein is done (shrimp turn pink).",
        "Remove lemongrass and galangal before serving.",
        "Add fish sauce and lime juice.",
        "Serve with fresh cilantro leaves."
      ]
    },
    { 
      id: 33, 
      name: "Chicken Corn Soup",
      image: "https://www.maggi.lk/sites/default/files/srh_recipes/21f2b7c2ebc7628c987903ea4a638ee9.jpg",
      ingredients: [
        "200g chicken breast, shredded",
        "1 can corn kernels",
        "4 cups chicken broth",
        "2 tbsp cornstarch",
        "1 egg white",
        "1 tsp ginger, grated",
        "Spring onions",
        "White pepper"
      ],
      steps: [
        "Bring broth to boil in a pot.",
        "Add chicken and ginger.",
        "Cook for 10 minutes until chicken is done.",
        "Add corn kernels.",
        "Mix cornstarch with water for slurry.",
        "Add slurry while stirring until soup thickens.",
        "Drizzle egg white while stirring.",
        "Garnish with spring onions and white pepper."
      ]
    },
    { 
      id: 34, 
      name: "Mixed Vegetable Soup",
      image: "https://www.forkinthekitchen.com/wp-content/uploads/2022/04/220323.vegetable.barley.soup-3802.jpg",
      ingredients: [
        "2 cups mixed vegetables (carrots, peas, beans, corn)",
        "1 onion, chopped",
        "2 cloves garlic",
        "4 cups vegetable broth",
        "2 tomatoes, chopped",
        "1 tsp mixed herbs",
        "2 tbsp olive oil",
        "Salt and pepper"
      ],
      steps: [
        "Sauté onion and garlic in olive oil until soft.",
        "Add mixed vegetables, cook for 5 minutes.",
        "Add tomatoes and cook until soft.",
        "Add vegetable broth and herbs.",
        "Bring to boil, then simmer for 20 minutes.",
        "Season with salt and pepper.",
        "Blend partially if desired for texture.",
        "Serve hot with whole grain bread."
      ]
    },
    { 
      id: 35, 
      name: "Chicken Clear Soup",
      image: "https://sugarfreelondoner.com/wp-content/uploads/2023/11/clear-chicken-soup-1200.jpg",
      ingredients: [
        "300g chicken pieces",
        "6 cups water",
        "1 carrot, sliced",
        "2 celery stalks",
        "1 onion, quartered",
        "4 cloves garlic",
        "1-inch ginger",
        "Salt to taste"
      ],
      steps: [
        "Place chicken in pot with cold water.",
        "Bring to boil, immediately skim impurities.",
        "Add vegetables and aromatics.",
        "Reduce heat and simmer for 40 minutes.",
        "Remove chicken and shred meat.",
        "Strain broth through cheesecloth for clarity.",
        "Return shredded chicken to clear broth.",
        "Season lightly with salt and serve."
      ]
    },
    { 
      id: 36, 
      name: "Noodles Soup",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYT2yh9YBNNuh7RzN5J4gv5deNnVpsWUw4jA&s",
      ingredients: [
        "200g noodles",
        "4 cups broth (chicken or vegetable)",
        "1 cup mixed vegetables",
        "100g chicken or tofu",
        "2 tbsp soy sauce",
        "1 tsp sesame oil",
        "Spring onions",
        "Chili flakes (optional)"
      ],
      steps: [
        "Cook noodles according to package, drain and set aside.",
        "Bring broth to boil in a pot.",
        "Add vegetables and protein, cook for 10 minutes.",
        "Season with soy sauce and sesame oil.",
        "Place cooked noodles in serving bowls.",
        "Ladle hot broth with vegetables over noodles.",
        "Garnish with spring onions.",
        "Add chili flakes if desired and serve."
      ]
    },
    { 
      id: 37, 
      name: "19B Soup",
      image: "https://i.ytimg.com/vi/yqPFPNhqG1w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDYXmye0zIrwk7FMmzR8AruWEYTJA",
      ingredients: [
        "4 cups chicken broth",
        "200g chicken, shredded",
        "1 cup mixed vegetables",
        "2 tbsp soy sauce",
        "1 tbsp oyster sauce",
        "1 tsp white pepper",
        "2 tbsp cornstarch",
        "1 egg, beaten"
      ],
      steps: [
        "Bring broth to boil in a pot.",
        "Add chicken and vegetables.",
        "Cook for 15 minutes until vegetables are tender.",
        "Add soy sauce, oyster sauce, and white pepper.",
        "Mix cornstarch with water to make slurry.",
        "Add slurry while stirring until soup thickens.",
        "Slowly drizzle beaten egg while stirring.",
        "Garnish and serve hot."
      ]
    },
    { 
      id: 38, 
      name: "Fish Vegetable and Noodle Soup",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQSEhUSExMWFhUXGBYXGBgXGBoYGBgdGhcXFxgYGR4YHSggGBolHhcXITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGi0mICYtLS0vLS0tMC0tLS0tLy0tLS0tLS8tLS0tLS8tLS0tLi0tLS0vNS0tLy0vKy0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAAIHAQj/xABJEAABAgQDBQUEBwUFBwUBAAABAhEAAwQhBRIxBkFRYXETIjKBkQdCobEUI2LB0eHwM1JygpJDU6KywhVzg6Oz0/EkJTQ1VBb/xAAbAQACAwEBAQAAAAAAAAAAAAADBAABBQIGB//EADQRAAEEAQMBBAgGAgMAAAAAAAEAAgMRBBIhMUEFE1FxIjJhgZGhsfAUI0LB0eEz8RU0Uv/aAAwDAQACEQMRAD8A6ynd0P5ROgxWRMFolknj+uEFK5UyR+vjAHaqiBSZgGoZXy+9vSD5VwiCrlgpKVXBB+TPFVasFcFXKyLUk/vEAbtW9Iu0ky+5tOXl0aLW32ACTO7R2SsEFTkaAlupHyhWw2ZMmNLpsxfV2LbjlcWSNMyrWsCWhMxm6TOsVaZKnEZUgOsuWcIHeUd73OnMsIr0cqur/wBkkSJBPjU4cciBmX0Syd2aDWAbISpTTJzTZj5mN0A2uxutQYd5XCwEMeI4rKp0hU6YEA2A1UrklIuo8gIM2IDlCdIShmE7FUsllLT26xcGYAUg8Uo0HUuecMi1BKXUQlI3lkpH3CFOVi1fWnLQ0/Zo07adc9QHyp8yo/Zi1T+zPtVCZiNXMqFa5BZAPAZrAfwpTBPJcLXEtvsPk6z+0PCSCv8AxDuf4ooI28nTv/iYbUTQdCQQP8CVD4w84fgdFTN2VPKSRYKKcy/6lOr4xdmYokb4lKWudTcRxxf7PDpaR9sj/VNT8o87PaE/2FKnqpP/AHDHQDiyeMYMWTxivR8VdHwXPFJ2hTf6NTL5BSf+6IjmbRYvJ/bYSpQG+UVH/J2kdMTiSeMToq0mJsq3XKJftQkpVkqKaokK3ukFvI5VN5Qx4VtXR1DCVUIKjolRyL8krYnyh1qJEuanLMQhaTuWkKHoRCjjfssw6oBIlGQrjJOUf0F0fARdKrRKMhBqdh8Ww/vUNV9Ilj+yXYtwCZhKdP3VA8ozB/aQkL7CvkqpposSQrI/2knvI+I5xyrT/GwMQSZ6VpCkkKSbgpIII4gixjcKiUop0Khe2g2Eoqx1Kl9nMP8AaSu6SftDwq8w/ODgMbpVF0ouO4jsRiOGqM2kWZ0vU9mO8325RfN5P5Rb2d9oqFES6lPZqds4bI/MZXR8R0jriJsAdptiaSvcrRkm7pqLK/m3L8/IiOHMB5XTXELyRVhQBSsFJuCFBm3Gybjzi12lu6xO4ZgH9QY5ZXYPiGCkqS0+me6gCUfzpd5R53F9TpDJge2lNOTmcpU4BSoDMCd9j4eY43hZ7C3dHY7UnZhz+H4RkCP/AOkp/wC/R6iMgeseKJod4Jnkzik303QXk3YwGKXsf/EX6Gos28RqpFEO0b4H84o1M71/Rj2oWd3BukayUg/hEVIZjOCoqpSpU5OZKvgdyhwIO+FWkwZNF9UlLDUK/e5qPH9aQ/1E1KQVKISlIck2AEK0+SvElZQDLpUm6yO8s8gfloN97CirQdGIzZ6+ypEZ1b1nwgcQ9m+0bcM0HcK2Lkyj21Urt5x1zF09L3UBwsngkQXEyTSS+zlAJG/iTxUd5hWxXaMkkJMDc4N3K6a0uNBNNZjCEBgwAsBoPJoAVm0m5MKdRXKVcm294GVGNpHh7x9B+cKyZNcJyLE1e1NkzFVq3xCutbxKA6loTVYhNX7zDgm35x6iUd8ISZhWnH2eOqbf9sSh779HMSy8clfa9PzhXlU8WpMiFH5z+hTIwI+tppk43K+16fnBCRiko6Lbq4hP7Fi0WJcmBf8AJzN8PgrPZkR8U+009/CoHoXi/JqSNY53LJBtaC1HjExG/MOBv+cMxdtAf5G/D+P7Sc3ZB/Qb808y5wMD8e2cpq1GWokpmN4VEMtP8KhdPyinRYxLXY9089INSlkcxGxj5cU4thv78FjzY74jThS49imx+IYQpU6gWqop3zLlKDqA4lAbN/EhjyYQa2U2xkVyWSck0B1SlG/MpPvp568QI6ekgwgbc+zWXVE1NKfo9WO8FJ7qFq177eFX2x5gwygIjnjcTIRdlNrFqmGjrU9nVIOW7ALI3cAvfaytRDgJsRWrwXG6VxRTMiRMyIoiSJrhjcG145ztl7MAt6jDyJaw57HRB39w+4eR7vSHpEyLEme0SlFwL/Y+Jf8A5Jv9EZH0L2w4CMgfdt8F33r/ABKiRGxJBBEaShuiwkOIYQlJmePSoJBUSAAHJNgALknlGqA1oC1RNZO+joLSZZeaoe8QfCOQI9R9m8UXspCsQVmU6KRBsNDNI3ngPl10uYriyJSciGSlIYAWAEe4xiKJMsIQwSkMBwEc7xPEDMUS9oFJJpRI4y8qfE8WVMJvaAFfiaZet1bgNfPhFHFcWydxF1/5fzgTTySoubk8YzpZOpWvj49+Ssz6qZN103AafnFnCaclKgsMdzc3aJaeQwc7oJUksEONIzZptitaOAClFRU4zZSpykB9xcgEdNXi/KpomlSQCSNTHuPBWUJTYEhzyt6fnCJeXuoJkNDQtpVOSWAi1V4bNkgZpanOgAc/lE2xVQETkhQceFO8gmwPrD/hinIIfVQUDYk6uekVGwOeGuPJpJ5GYYjs3alzKmmBWu7j+rRMhcMG2pTKmgiWM00Nm0YoNzw94ekItXi6kTAlgwDl/hHUuKWyFg3TkEoljElVaPy5gJaLCYWp9apBQoazDwsANYYKZeYA+ohOWItAKJYKsgwTw7E1y97jgdIFpMTQBr3McHNNFBlja8aXC074fWpmh0ljvG/8xF9JhApZxQQQWaG7CsTE0MbL+f5x6bs3tcSkRy7O6Hof7Xnc3AMXpM4+iWfaXsEnEJfaymRVyx3F6ZwLhCz8lbjyJhF2P2oWtRpKoFNRLJS6gxVldwrgsMerPHdBHMfa7sMZ6TX0oIqZQBUEazEpu4bWYnUbyA12EbyylaTOiZE6EnZLab6TL7zCYlgsceChyP4wyyZ8S1aMImROhcC5c6LMubEUV7tIyKueMiKI1lvFmUndHi08IlQG5QRcoTtDVKQlMuW/azTlQ2oHvK+IA5kHcYllykUcgS06s6jxLfIaCIsJT2kxdYrTwSn3JG8ep81KELu1eKOSkGOXOoWrAs0EGxzEjMUb2hTxrE+zGVPjPwHGLmJVglpKj5DidwhYoKdVRNvcqN4zpH3uVq48PRZRyCouYP0dKIrKlJQpgQRubT13wWokZiIy8iQ8rcijAVyRRZtBrc8AIkWJcoM/GwEHaJCZYynxKA+G6FrEwPpIQQTYG3UvCYZqFk+5F177BS1M39mpAUp1C6XAAIN1A6jXzg5PSJckzVaAfOAlXOMvLlsL9OjwZqpSqqlVLCgk90v5wAtDtN8Ky4gK5s7SyZozy1BM1icqrpCvJmN+Ee1HtGVLIlokpWt2KtLgt56Qp0y5iaiTJld2YjNc737yi/vWEEKqUgEzGALklRPdzEurKN5fyEMteYnAt8OnXz/pJZLYRvJuOnj/AKTca6VPppipoT2oskbxwy+buYUq3B5cxQWoEKZuo5xJRTs5DOd+n6aCSJIUcqkvbUEOPSAu715B4I28/NKw9oRxW3SaPt49yETZCZoEtQAMspIbhxHk8EpUsBkj/wAwK2gpJkjvsVIuArkdUq4Hhx+EZsnKzLdMxayb95TgNwG6OHwO07n3LUZMxzdTOEamS8qm3jXlGqpwBbfAenmKExQUSVOXc6wVTTZhmFyBoNWHGFXxhpoqQzB4sqxLmRZkzikuIHyi0S0s0qd0lLFrsX52gDmdV29o4T7hNf2qb+Ia8+cEGeEfDaoy1hQ/XKHWRNCgFDQx63sftAzs7t59IfMeP8rzGfi90+28FcD9puzxwuuTWyA1POUcyRolRutHQ3UnmCN0E6DEQoAguCAQeIOkdY2owOXW00ynm+FY1GqSLpUOYLGPnjBFLkTJtFOsuSpQHkWLctCORjZOyQC6NJqHi3LmwrUVYdDBSXiCBqtAPAqAPziAqI32sZAz6ej+8R/UPxjyLsKLpS038oo4u+QSk+Kacv8AL73kbJ/nEFckD0d6oWs6SkhI5KUMym6gp/pju1yqmMzxJlhA0SG68/PWOYYjUZ1Ew27YVtmEc/xOpyIUrgLdd0LTu6JnHZe6Xcdqu0mZBon574M7KU37UjxCWrL1Y/G0LVIjMp4aaJ5RSpO8PGZkPrZb2NHspauiCpcsp039dS3SIqCqMsqBDpIOVW5PB/wi0mQoqzodJBSrodQRGtBRZlKSol3JNt5333a3hEvbpOrhaAvhXsLnGcpBKyQhTj0b4R7i0wGpSoEWCg4u7Fj+EGcNw3IlKbtxYE6al4r4pShK05ZaQRvIfq24O8LCS7PT/ao+CpTFylLTKIDMFJSbl/e3aWtf5XJU88ZigLDgBxv/ACuYrplSwhZCEiblXldgVlhcHeAVCFmXUFdSpUtRzIBKi1iWDptucRTYe8aSDVfd+9TWG+iU5Lp2Subd0DMGPe5s3J/SKM3DdFkFaGGUhTpbdzA8t8GNn6pycw3XHlpAurmzKZSkZCqSp2IDgPfyALFt0cwVVE7rF7UBZJY4KK4WUMAAOm4eR4cTeDEueFjKi7anQCAKKIT0Jmyyb6tY8L8WaDOCUzJYqLA6EC3PutxEaUd+qQskq3JkJWFSljOlYKVAOzddH5xz/D5RoKufLU+ZAVk4GzoV0IIPrHU5AuBCT7XJ0mV9Hma1L5Qke9LYuVcgpm6nmxXR23blO4MpD9B4KFVC0qaekhjx+I6jhDds6hITMYgllAkekczwrElJJdDpUe8gfqxHGHmlrGkrVLfMoBABDEW8VraWtvjJkHdPBKddBJ6jeCoqdBUjP7oVkJceIBz5ROgRSwCSvLPQsE5UdoG/eGhHUE9Y3oapKxmSYTnh0gOHC2ASbHgiCYZdm6z3Dv06wspMXqGYULG7fA8WcwTNeEplRCSMtKedzRwr22YWaatkV6B3ZgyL/iRx/iQf+WY7nJmZgFcRCf7W8H+k4bPDOqWO2TZy8vvFuqc484+gNcHtsLyhFFcDqq+ZNLOQP3U6efHzisaYDVhHmHTnSn09Iu1MsMT0gBO9IwAIVDsxxjI2yxkWqX1KipUrlFOjX/6ftP7wqX5KJIHkC0eVCimTMI1yLbrlLfFo9xE5JKUjQJDQ2UBc82lnutv1w/GEbaef3Uo4l/IQ14vMeYYR8eW85uAH4whKd1pYzeFmFyHIHGGj6OAlI328+LQEwoMoPz+TQXxNZmCXkSMwysXUCkAuqwsp2a+kZU1OdRNLcZbW7C0aoJ3emZ+8CAx5AAAAAWGvpGYLQzJcvPNOdRJuAzgFww3DlFOhKlZXOawHlqAIYsQUJUgJDIATZuAYMOGsKNYH220dx0kFa1OKJMrMlTNqGv8ADQWLwt0NYucVLfVTAdIHYGpa1KEx2VlLnTeC7+UMlHh/aBC5dkq8NrHmGMU/8tpj+amkB1odtXNaQl3zAskvpm1YfE9BGuzdAJngHeYOeD6O3y5ReXLTMV2ZAWAQSdwsxyvofxh2wCjopZyomXLHKqyrBgC+tuEU0l0YiBAPiTXKFO7uhqom/DdXaDZpIp0q99878iNPSE/F6yZJVkNgbhQcBXI/rdDNPxZS5mXOQ1iAWHINEGIYcisQUrUUXKgoa5iCSPUkaboK+OF5DY+Rt511SsWoX3+7T76SpIxGYDmd9WCberRcw7Gag515XCAVFLjMRo4cFxe8VK8ykZJSP2rhNtCNHLeXxg7S1KfrZyEDIlCZSd2ckjvHnYn0gNOYd/kVJOz4Du1p+NfdqjO2nrRKChIly8xIBJK1dctgPNxyhExOmmzlLmTFqXMsrMouS27kOQsI6BW1qlhsoZ3gP9DPeUwdrB9Tuvu/OI3NNpyDEjjGzaKBYRSlSh0c+UNMtagABAKTJVIDKsVXDGCWBFalHMSU3PzbWA5PpW7oEcU0Jj2YX9cxcgoUGZ/OA9dLTJnGUldzchmyudPRvWC+BzCielt5byMWtrsICZomAA573uQQLkW0b746Y4Oxjtwfr/YQNYZk0eo+iBTpk0KlhOUjN37+7lNxzfL8YLIXoYHIuxi3LWDZ7j4RmSm+AjSNTxgk3NKbgYuVUsKSQQ4III5HWA2zMyxHL5QdItHtuypdeM32bLyOYzTKQvkj6N2E6dIP9nMWj+hRR/pi7LmWZoIe06QZWL1PBeVY5vLQfnmhfRUNDTxuhsdsr/pGRQ+lmMjml3qX05iRaUeapSf6pqE/fEGPlpY/hHyESY0fqf8AiSP+vLiLH7yx/CPkIbKXXLsQPeV1PzhIry89fWHbEPErqfnCPUn65XWM1618Yboqk5lDs05QyR6M587+sG5G6BeF2/H0/XnBekuQl7P+TxkZBvZbkQoK7TuFJDEPpzY3+6CmLVxVTvKBUMpuBcfBz+cUlESVLUkdoES8zKOS41S55veIcMxEpORTpEzvDNcpzXAPrC7QWW8DhW5wcQFf2W2fWuWJqklRIXZ2CQgXKme7kAJHPg0Mm0FAEykB1ZcoLDupCrHdpoDBnZ0gSxkEsIASlgMpSwOfNzdj+niasm9qtUrKQgA5lEa2SQZe5Quz8of/AAokh1NNE/YWSct7ZqdwFz6jlhN2vFCow2YqomTyUkkAJSR3Wcg5hvLHe+nlBuipVTsy5MmalKS2WYAlejglLukHc7ForrmZZqZCgoTFnupKSM2p7rgZtN0ZIbPE51D5WtcyRSAb/NTYWtBmdpdwW3s466xBtHixyqRL1Vcke6TcsR6wdodmpymKmSOevoPvg3T4HTShnUApveUzfhBYMWYmyKb7dv7S8mXBG6x6R8BukHZPY6atBnkspVkZrs7hSzzZ2g1iUpEpKKaWXEtys8VH8IJ4rtAVDs5Iyp0zbz/DwgAtkB1EA6gE3PlvisvIZWiPc9T/AAFbHSOd3s5odB/K3koD3Lc4iMt9eMVKjEQPACWFyd/RolpKwLZtTGeWPAukxFMyWyw2quNhIVKfQ5h8mi5RUwQLF33xR2n7q5ZUQEjeeJIb5GCaUBgsggswva7G48rb4I8ERtHmutQsA9UTwKXmno4O/pp8W9YJbZTyTLBF+84cWuA8K6K0BcunnyJq0Tly8ipZWlSHJZYKWYWBN9D6ksbw9MiYyHyq73eUVF3vcw4YnRYZv9RHw6JAObJmD2AqsIllJGrdYgQv4xPLMZDk+5MezB73qPhDOnQwr7M+IdYaUb49f2H/ANf3ry/aX+Yr549tstsVl/ap5ZP9c5P3QiKFzHQfbkf/AHORa30cXbX6ycSPK3rHPppvGs7lIjheRkY0ZHNK19QY/wD/ABph/dCV/wBCkr/0xFiPekIP2B8A33QRraftJUyX++haP6klP3wIwmb2tHLVvYg+fe+SoYKGeFzbE099XUwj1oaerrHQselNMMImNoaa/ERmyjda+MeEQoJhALcGYb+UNGDSBlznX3X4wr4OlKljMciWALX0GvUwWl1y8vd3E8dH1EZMzRa243bJkxKpDoZGRQDv87NAiXQHO4bKwA5NGpmrmFJJci3CD8mhEuWFOSb89Lk3hI6hek8o+loAtMuEYQtMkTBOyhQClJyuCOBvvEG+wypds5yEJSkBLgB8oc2ewuYUNl8Z7BHYrWAgOpSllItqrMSwve8PyC8bGD3LmUy7Hnz9F57P75sh19fLhcxTjs9c9U0y5lLleWUKIUks1xa5BBHrBGhrJ1TOTMNOhS5SliUtSbpfulViwcDqHMM2LYFLqly+0KskslWVKmStRDd9r21DEaxsKuXTNKEoy0JRmzaIHeLpf3lAOo/nHLsaRri4v0t5++ituVGWBoZbvv3qaVKUE5pysx/dFk9OJ843m4albKm95tE6IHkNfOAFFtCKiplhJ+rclP2jlLH03QzYmfql3A7pudBbU8o7jMUrXO5DfHqebPj7EKVskT2g7E+HTySxLrBULIYJQh8gA3cT1tCnj02WS4AF9dSwGpgzOmdiFye8JiikIXbKQepDPoCWFoTcSIlrMopUZgLZdS/8tvnGI1r5Xa3c/f0UySJJNMW7Rx+61TWhLqIYXI+6J9laGZNKSCQAXJZwG3n8I9wrBjOmfWJ7iLkA91+BO+C2O7USqYdlJAKhYJTonrwgp/8ALBZXLck41sb6x+AVnG58umZCRmnTH7yrkcSH8OpAbnE2FygZeVZLKUlzrdlEa+UJmHrmVE3tZhKiphpYDQAcP1xh6ktlCdw+doDIzS9rRzaCyVweHuNlNtHOBGUgM2/QjT0hV2jn5ZqhnKitWZlkZZSUpbuNpmJcve3SLdTWhCUgKSFmyQpTEjUtv3fCEHEcRn5lqQlC1KVvDi1gNbhm3iNbLfqAi2T2LE4h0jU1YdLQsGcoJyodlFNzuZO9zHsovw8t0A5E2omywFlCVB8oQkhAO4sS8XKGjWFBSlAqYOfujEytJFAjb5/0tPFgfG23nc/JO+yyN/63wzI0MAtnJbJfl8//ABBxRZMem7IZpxgsDPdqmK+ePbbOfFEC/cp0D1VNNv6h6QhKVeGX2kV30jFKpQ0QRKDfYASf8QVC0URpHlKAKSMjWMila+sZSjADZ0ZV1VMfcWVJH2VXH+FSINImQu4tN+j10mf7k1PZr4WsSebKSf8AhwcrhAdraVlZmjnm0UiwVwMdl2roHSY5hilNmSpPWEMhtG0/iP2S/QzmG7Qi+7mOcGKc7vWAFM4LbxBqi6kklyTcknUniYyZwt+FxRygTmUIdpCMqUjXeRy5c4U8BlAnMogNxLQwJxmTuWHGnW3GEm0LNq55GggEoVjaxKmhQDEtbUk63G6Oi7PYl28pKrZm7w5xx7a6tzzRkLFnJPHlw0+MH9jMaMtiSSCwPT8YJDKcciXoefLxQ8qETxADkcLp02sloOUqAPDe50HnCXtNjwnfVyvcKgsKBBChYAjeN7g6NDbJo5apv0gPmUgJ8RKWdwW0BubjjFGv2cQtRWO6TctpGjniWWKoxYP0WRgviiluTp9UhUSwlRUkspJu2oIv5awfn49NmSjLVwZwO8q7NwvxjzEMBCJZXLBVm17pB5kg39YFolrBB4EG45x597pIiWkkX0vkLf8AypxqFGuPNS7TUuSUgAnML2J01PRLufSEyjqOyqFC5UpIUk3cFSgg343MN+N1QVLXxIydBv8AuhOnJyzpSj4tH6KB+YhjFcKPvXm4ppA9xPJu0W2yx76PLTTSbKIdR3j8zvhVwfCzMOZTt4lHfrHm0qCqsWHe4byhtpZISlMtPiLKUPLui3mYZLhDC3TyRZSQ8SrNBJSgC3eIty3P+uEMFAh0Pz+4RSkSsygkXIDfN4kxXEU06BLScy9w67zyhGKW5tXgmcaB0r9kOxWtUha5eYLUo90hLGWi3cf3i4JfnFWlkxBTyyTmUXJJJPW5gpIQwip5LK9XjwiNtKaTLi7TS3UBEEoWgvglNmU/kITY3W8BSeTS0lNeFScqOv3fp/OJsVqUypSlqLJQlS1HgEhz8BE0lDMBoLRzn25472NCZCT36hQlgb8gZSz08Kf5497jx93GGrxkr9byVwhEwzSuavxTFqWW4qJJ+JMbKBGtx6GPJYYAcIkTHRFqArTMnnGRL2Q4RkVSu19LonxQ2lpu3p1AB1p76OqXdI/iSVJ84IEAQJxbFBKAbxHwjeb/AChlDVvCKoVVIhYLqSMiuoAY+YY+cI+P0GRZLWMEdm8S+i1ZRMZMqffglJJsR0UW6LHCGLaXCs4NoDK3U1Eifoda4pi9JkXmGhiWhmWg9idBmBSdRC0hBQpjGNOzovQ4stik1YfVvLVIynvJUc1stiCx3vC/KWuXOCCbcdddddIu0c4guIIYjQAyu3JYDL1ckC0JNNOqtl3mQd42wd0ew7D5c5GVSEtozFwW1Bd+bwrVR+i1K6YEkIyso8FJCgDzAO60O2zZ7iVk7g72s3w4xzutqDV18yYjwrWySdMqQEg/0peOmsa5ptIdnukbIR0/ddZ2VxNSZSQu6WKnfQO3nvgrW7Rol+6Sni4EKeB4vIP1Sk9wJyhbm7WdvjA/aOpCSiVJUW0zHU7z8bQvHkZEbdDXCr94+I4+7Thw2SSkvaf2XRaDF5U9HaJWMoBJuGYal3ZhxjMQpklmSGN3Oj2+6EbCKsy2sCGYpayhwaHGgr5VZKJRMCr5S24hiUmCCf8AFROY8el09v8ABSs+MYHBzfVSvtFg4JHZu51SElrb0lrwsnZqpnTgRKKUJYBy1tX6x1Gpq6elCEzpqEFZIQFG6iA5Af8AV4lxSvTJlTJoQqYpCc3ZoDzC+gbUH84YxeziGanmjXHNJUTBryQ2yVxzEMKUKozFoLIygA6rUz/Mt0HODeH0yk+JytRctrxb5eTR0CfT08wJmTJYTMypWQdUuNDucM3lCrjcwpzJkpyg6q948dYRy2OZTXOB6bKY+G6Z1DYIfiNT9GlEJI7VQ6kPC/SIUo5lEknUm5i0KQk3dRN31gxRU6UU86YfdSPmA3m8CjA9VvJXoYMdsDKH3aqUssPqw4x7QKUsqcjLoAzEdecCCvOwQS5IHQADdw3ecM9DTZEgQGemN35Kcf6AViTL0AhxwGkypzeQ/GA2DYeVqH6YQ3yZYAYaCNDsbDL3967gfVee7TydtAW5LCPmf2obQGtxFYSXlSPq0cCUkhavNT34JEdl9qW1IoaNaklpswGXKbUKKT3v5Q56sN8fN0hDDnvj1R2WEFMDE8hLkRXTF6iRqeA+bD74pWFtlEZE2SMiqXVrtuNY0mUG1UdE/eeAgJh1KqYvtZhcn4chyinQUypis6y6jvMNVFJAg5XCF7R4X2kthZQuk8DwPI6HrygtsVjX0qSZE1+3lBiDqpItfmND5HfEtZKdMJ2MSpkhaa2nftJd1pF8yRqW3kCxG8cwI5UR/aLB7laR1hKxXDM4dOojqeCYtJxCnE6U1wAtLuUnhzHA74A4zg5QSpItvEJ5EAcLCbxsgsNLmUlRSWNoMCrUqV2QNnB63f1i1ieEZ+8nWAiJ+RWVVjGHKxzTXVeihmZI1G6FlHKonKQyg5AUBuU2ojdVBKlhRRYkEdHN28rdIpS5z3MW0ozB4ScXDqmw1p3WuGUpUQEJJPDV46Hg+zKMjz0BR4HQfnALYyfLlzDnYEhgTprpyeHhUxJWnvsz2fXdeHcOGKT8x+5vhZfaGRK092zYeKAbRYIlEvtJYYJ1A0bjCzR1HZKHZkA6njffDftZi6JchfeDnugcz+QPpCFTys6QASm4YizXeFs+GNkv5ew+Vo/Z7nvhPefYUuPS/pE6XMWCtaCggZilCglTqzMLG4a99DZ4Jy6gSp82fLzdpO8ZUp9+63IAO7AABhFGnlLC1BRBSNLuDZ3iQEhRS1mBBBBd+QuDyMLOyZtOjUaHtR/wsOq9KnnT5kwpJWbEHkeUT1tTmbfZrxXEbhMJFx4RtDQQVBJDFwAImlyx2a5bWW3Pe+hjcJiRKYoSlpsKOdaFYbgyJSs2p3Pu6QxYfRFahaN8PoCsi365w1UNEEBtTvMP4mJLmSWeOpWfm52jrut6GlCAw13mMxXEJdPKXNmqCJaASpR0AixMmBIcnTUx87e1HbU4jP8Ao0hX/pZZuRpNULZ+aB7vmeDeyijbCwNHAXmnuL3WUD2u2lXiVUqoUCmUnuykE+ED4ZibnyG6BU2Qwd9btFyllDRrDSJSQTpA+8s2u9FCkLRBakQyH/ePwT+Z+ECzLIXlbfYddIOAXCRokBPn73xJgwQyFmSMi12cZFqWul4eloNSIBUS4MyFQUrhXylxASoRlVBqWYp4jJ3xStJyqabh881tICpBftpA4G6loA1G8p8xHRMHxWRXyRNkqBB1D3SeB/GF+UqAlfgM6TNNZhqhLnark2EudxtoFHhoeRvFK00YngrHMn0haxDBkTfEGUIYdk9uZNaexmjsKpJyqlLs5+w/+U366wcrcKCtzGFpsZsgR4ch0ZXJqjDlyixDjjG8qbD7UYaU2IcQGqdn0qukseEYWRgyN4Fj5rex+0WOHpbIGlTRFg1dPky56561EpDpKbqVrowBD2DbuMEZ2DzUe645RGiUd6SOoI+cZ+vu7BHx5/pP+hLuD/HwS8ifNnuqbLUASWCi7WLFyX3+sMWF+GNuxcM0WJKGEDnn7wcUitaGhTiPCI2SIkRLMIk0oTSjkywAQA2jAM2pJeJALxbp6JStAfSClHgRN1WEEZHJMaY20rJkxx8lB5UkndBrD8FUbqsOesGqXDkI0DnjF4J4xuYfYZPpTH3BZGR2mTsxRU1OEhkhhG9RUJlpKlEJSkElRLAAXJJOg5xQx3HZFJKM2fMTLQN51J4JAupXIXjgftB9oE3EvqpQVKpQQb+OaQ7FbWCeCb3uSSzekZGyJtNFBZJLnlEvaf7SDWZqOjURI0mTbgzeKU8JfE6q6aotLICEh98bUdEAnMrw7/1xi7T1D2EvNqABw5hvjC0spdwmooK5WSJYQcx0MQSJ5mKfn8NzwTXJCcoUAkhmTqYHzkBEwh9TmdtR+ngbSCqcKNFV6sCVMCk3Lu5ux4ffBDDbxsiiE5k6X11PnHkySaeYEHRgQeMMxvHCA9qKZYyIfpIjIKh0n2kXdoN0q4XEKu4g1RLgqpGpRiRaXEVZKotoMclQIPOl5TEsiY0XauRmgaQxila0x/ZenrkgzU5ZgHdmosscj+8OR+EBJON4lhHdqUGupBpNR+1lj7W/+px9oaQ1U02CUlbxFFBs7tXR14HYTklRv2au7MH8pueocc4KTsPSd0c92y2MoZn1gQqTPdwqQGc/vKT4dTqwPOBEqbjdAjtETk1UlIDpmsVAaXzEK9FmAieNx02id08DUF1BeHEaH1iNVCd6QYRqH2xIQQmto5shX7ye8k82VlPpmhpw72iYbOHdq5aTo0x5R/5gAPlFuhjeNwoJXtVpWGIOqPhGycKlfu/P8YJU+JyZgdE2WscUrSr5GLInp4j1ELns3GP6B8EUZsw/UUKl4VK/c+cW5VAkaSxEs3EpSLqmy0jmtI+ZgJXe0DDpT56yUW3IJmH0lgmLb2djN4YPguXZcruSUwolHkIlCBvjmWK+2miRaSibOVuZIlp9V97/AAmFLE/abidT3ZEtFMk6FnW2/vTbeiYZpjB4IY1v4XcMSxaTToMydMRLQPeWoJHk+p5COYbT+2RAeXQSzNV/eLBTLHMJ8S/PKOsc1l4ZMqZuapmzJq76qKlFrm6ntbc0FEYVkTlCQG1YMTZi/r8YBJlsbsExHhPd62yB4nUz6qZ2tXNVNWOPhRyATZPQARvR0QWsE+EX4PwHLpBiooybPc2OjsA5PUNrBzCMIKMri5QojQNdNz0hSTJJCdZjBqBDDgpCVB8jEM19XJ6sYv4VQZT2hDJA8QsToTqWsIKdiQUySGBLm257g8i2vON1Ss5yAZZObKFG6lk8H0cj09IWdKSEy1gCA4nR+BaS/eID3JDAuQ3McY3xjApkyUJiE5ikOTYWAZr/AK0gtU4V2f1k5RShL21IA4DXRP5iGHCZqTTqXYI3BrsbceMGidsKSU43tc8wJxqzON/ODWMJQUJOR1Pq1gBr5uoCBE6peYJiblRLt1DW6QdwqWZ/dKXDHfY8PPSDajaXI2QX6Cnl6RkEf9l1X90f8P4xkF1lD0BN1ZhBlAlLlA3alP4jnGUM2HOehIDnX58oQJ9Sjtldl4M1hw4/F4fOyXTNTqi7LgXRKcCCcqKUU4EUqym3iLyY3KXilECSWi/TTo0qqVriKySxiioiPYpzFTJKndy7s2Vh6wGrsZBWUCV2ic2U6OTa7bgOJggJj6xvTUaEl0gB4T/Db87JrvhXG6H4ZgwBVmSFJUpRCFd4AK3XsYyr2Dw+b4qSWD9h5f8AkIhiliJBDLWhooJdzi42Ug1Hslw5WiZqP4Zj/wCcGKh9jlHum1HrL/7cdIIirV1OSwuohx+vT9CKe9rG6nLpjC80Fz6f7KqCUkqUucs8CtCfghAgZVbJ0KEOiQSxBzqUohQBvYq+WnGHGsnTFZg2u49FM/F3JgWqSZaUiYte/ugWSDduYJPoYypcsuNg0Frw4jGjcAlL66GRLQAiTLTdRzAEE3UBu8IYcesDp9O6mA7xKhlD5n94PpbR+kNEnKkZUqKiAVJS/eNgU8/gNeIgns1gKEfWnxmzBmcbhbQcYD3tJkgNCEYHgAkgLmMpZZr+F9X4FvhGSpQmqt3mdyAXfh0a/l5wfxdYSha+NgGfWzCFrDJ4SvsR45hCDuKXLHQ2FzfWBay82qa30bRKlwsLKppBYkZeYBueBJZucSCQV5iouSLMLBN3PwPHQQUn1CZSEJSmzqSL3cb77nJ9IqzMOURd3GgGuoYAje/y3xyXeC5HidkKrEKICUhL5RmINi9iAzZjpbhBekwwJlAqIOXvAjdvF+LHSL9LRmSAGCU5e8Tc6lwN1gw9TvijjNSUoyIOUPdV2ayVAvrcg+W6Og3xUDi40EDxdKp0xQIIKUZ0O48JJJNgxKS+94pU6pyh9UuwLAaZi7AMdCWfXdyizNnqByqJBUpBdwCcoFzuHi32DnWI6iYadSr5lqCSBq7lLXO90lL8AddYYa3UdlTzpbRQabPQFqM/uZXsPEpRAcEcbfOCWEY6lSmQltANH1F+sJeOTjMmDVzdRVa5G5tQw1/GMl1vZJIGujjV+AhssJGyzwGg7rof+0/tfL8IyOYfTFfuj4xkV+Hk8VXexeC+j8S0H8P3GOWbJeHzPzMZGRquSPRPlDoIJy4yMjlUp0RMmMjIiijqNIFTdYyMiFReJi9IjIyOVFblxII9jIivohuK/tZPU/dG2L6J6p+cZGRnZn+KTzH7J+D12eR/dVkbv41/OAOMftEfyf5RHkZGXF9/BaTPWKrYX+2T/DM+6GeR4ZXSMjI5l9b79iknA+/FDNq/2Kf4v9SYTqv/AO1T/vU/NMZGQaJdD1Pim8/t0f7xXyVBdHgP+8l/5hGRkVDwfNLS8j76rbEtT0X8hADHPD/IiMjI7HVdxdEu4z+3l9R80xFtL+3T/uD85kexkNQ8lDn4CTsQ/s/4R/0hAyq1T0P3RkZDcfISMvBUkZGRkNJVf//Z",
      ingredients: [
        "300g white fish fillets (cod, tilapia, or snapper)",
        "1 cup noodles",
        "4 cups fish or vegetable broth",
        "1 cup mixed vegetables",
        "2 tbsp fish sauce",
        "1 tbsp lime juice",
        "1 tsp ginger, grated",
        "Fresh cilantro"
      ],
      steps: [
        "Cook noodles according to package, drain and set aside.",
        "Bring broth to gentle simmer in pot.",
        "Add ginger and vegetables.",
        "Cook for 8 minutes until vegetables are tender.",
        "Add fish pieces gently to pot.",
        "Cook for 5 minutes until fish flakes easily.",
        "Add noodles, fish sauce, and lime juice.",
        "Garnish with fresh cilantro and serve."
      ]
    }
  ];

  const speakInstructions = (instructions, stepIndex = 0) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentStep(0);
        setProgress(0);
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
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
        };
        
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      speechSynthesisRef.current = null;
    }
  };

  const speakNextStep = () => {
    if (selectedSoup && currentStep < selectedSoup.steps.length) {
      stopSpeaking();
      speakInstructions(selectedSoup.steps, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedSoup && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedSoup.steps, currentStep - 2);
    }
  };

  const handleSoupSelect = (soup) => {
    setSelectedSoup(soup);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedSoup(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="soups-page">
      <header className="soups-header">
        <div className="soups-header-content">
          <h1 className="soups-page-title">Soup Recipe Collection</h1>
          <p className="soups-page-description">
            A curated selection of comforting and flavorful soups from around the world.
          </p>
        </div>
      </header>
      <main className="soups-main">
        <div className="soups-grid-section">
          <div className="soups-grid">
            {soups.map(soup => (
              <div 
                key={soup.id} 
                className="soups-technique-card"
                onClick={() => handleSoupSelect(soup)}
              >
                <div 
                  className="soups-card-image"
                  style={{ backgroundImage: `url(${soup.image})` }}
                ></div>
                
                <div className="soups-card-content">
                  <h3 className="soups-card-title">{soup.name}</h3>
                  <p className="soups-card-description">{soup.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="back-button-container">
        <button className="back-home-btn" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
      </div>
      {showDetailPanel && selectedSoup && (
        <div className="soups-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="soups-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedSoup.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="soups-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="soups-modal-header">
              <div className="soups-modal-title">
                <h2>{selectedSoup.name}</h2>
              </div>
            </div>

            <div className="soups-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="soups-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="soups-ingredients-list">
                  {selectedSoup.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="soups-ingredient-item">
                      <span className="soups-ingredient-bullet">•</span>
                      <span className="soups-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="soups-modal-steps">
                <h3>Steps to Make </h3>
                <div className="soups-steps-list">
                  {selectedSoup.steps.map((step, idx) => (
                    <div key={idx} className="soups-step-item">
                      <span className="soups-step-number">{idx + 1}.</span>
                      <span className="soups-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="soups-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedSoup.steps.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedSoup.steps)}
                    >
                      <i className={`fas fa-${isPlaying ? 'stop' : 'play'}`}></i>
                      {isPlaying ? ' Stop' : ' Start Voice Guide'}
                    </button>

                    <div className="step-controls">
                      <button 
                        className="step-btn prev"
                        onClick={speakPreviousStep}
                        disabled={currentStep <= 1}
                      >
                        <i className="fas fa-backward"></i> Prev
                      </button>
                      <button 
                        className="step-btn next"
                        onClick={speakNextStep}
                        disabled={currentStep >= selectedSoup.steps.length}
                      >
                        Next <i className="fas fa-forward"></i>
                      </button>
                    </div>
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

export default soups;