// 05-pure-chicken.js
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
require('dotenv').config({ path: '../.env' });
const recipesToMigrate = [
  // ==================== CHICKEN CURRIES (8) ====================
  {
    title: "Chicken Curry",
    tagline: "Classic Pakistani chicken curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken, curry cut",
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
    stepsRaw: [
      "Heat oil in a large pot, add cumin seeds and let them splutter.",
      "Add chopped onions and sauté until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chicken pieces and fry on high heat for 5-7 minutes until color changes.",
      "Add chopped tomatoes and cook until soft and mushy.",
      "Add turmeric, red chili, coriander powder and salt. Mix well.",
      "Add 1 cup water and bring to boil. Cover and cook on medium heat for 20-25 minutes.",
      "Sprinkle garam masala and garnish with fresh coriander and green chilies.",
      "Serve hot with naan or rice."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Karahi",
    tagline: "Traditional karahi style chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
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
    stepsRaw: [
      "Heat oil in a wok (karahi). Add chicken and fry on high heat for 5 minutes.",
      "Add ginger, garlic and green chilies. Cook for 2 minutes.",
      "Add tomatoes and cook until soft and oil separates.",
      "Add cumin seeds, red chili flakes, black pepper and salt.",
      "Cook on high heat until oil comes on top.",
      "Sprinkle lemon juice and coriander.",
      "Serve hot with naan."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Handi",
    tagline: "Slow-cooked creamy chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
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
    stepsRaw: [
      "Heat oil, add cumin seeds and onions. Sauté until golden.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add turmeric, red chili powder and salt.",
      "Add beaten yogurt and mix well.",
      "Cover and cook on low heat for 25 minutes.",
      "Add cream and garam masala. Simmer for 5 minutes.",
      "Garnish with coriander and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Qorma",
    tagline: "Rich and creamy chicken qorma",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
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
    stepsRaw: [
      "Heat oil, add whole spices and onions. Fry until golden brown.",
      "Remove half onions for garnish.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add turmeric, red chili powder and salt.",
      "Add beaten yogurt slowly, stirring continuously.",
      "Add 1/2 cup water and cook for 25 minutes.",
      "Add garam masala and garnish with fried onions."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 45,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Jalfrezi",
    tagline: "Spicy chicken with thick gravy",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken, boneless cubes",
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
    stepsRaw: [
      "Heat oil, add cumin seeds and onions. Sauté until golden.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chicken and fry until white.",
      "Add tomatoes and cook until soft.",
      "Add turmeric, red chili, coriander powder and salt.",
      "Cook on high heat until oil separates.",
      "Add capsicum and cook for 2 minutes.",
      "Sprinkle garam masala and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Lahori",
    tagline: "Lahori style spicy chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "2 onions, chopped",
      "2 tomatoes, chopped",
      "2 tbsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1 tsp turmeric",
      "2 tsp red chili powder",
      "1 tsp coriander powder",
      "1 tsp garam masala",
      "1/2 cup oil",
      "Salt to taste",
      "2 tbsp vinegar",
      "Fresh coriander"
    ],
    stepsRaw: [
      "Heat oil, add cumin seeds and onions. Sauté until golden.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add tomatoes and cook until soft.",
      "Add turmeric, red chili, coriander powder and salt.",
      "Add vinegar and 1/2 cup water. Cook for 20 minutes.",
      "Add garam masala and coriander. Serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Mughlai",
    tagline: "Royal Mughlai chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "1 cup yogurt",
      "1/2 cup cream",
      "2 onions, sliced",
      "2 tbsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "1 tsp turmeric",
      "1 tsp red chili powder",
      "1 tsp garam masala",
      "1/2 cup oil",
      "Salt to taste",
      "4 cloves",
      "2 cardamom",
      "1 cinnamon"
    ],
    stepsRaw: [
      "Heat oil, add whole spices and onions. Fry until brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add turmeric, red chili powder and salt.",
      "Add beaten yogurt and cook for 20 minutes.",
      "Add cream and simmer for 5 minutes.",
      "Sprinkle garam masala and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 45,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Do Pyaza",
    tagline: "Chicken with double onions",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
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
    stepsRaw: [
      "Heat oil, add cumin seeds and half onions. Sauté until golden.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add tomatoes and cook until soft.",
      "Add turmeric, red chili powder and salt.",
      "Cook for 15 minutes.",
      "Add remaining onions and garam masala.",
      "Cook for 5 minutes and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },

  // ==================== CHICKEN KARAHI VARIETIES (5) ====================
  {
    title: "White Chicken Karahi",
    tagline: "Creamy white karahi",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
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
    stepsRaw: [
      "Heat oil, add chicken and fry for 5 minutes.",
      "Add ginger, garlic and green chilies. Cook for 2 minutes.",
      "Add yogurt and cook on high heat until oil separates.",
      "Add white pepper, black pepper and salt.",
      "Cook for 10-15 minutes.",
      "Garnish with coriander and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Peshawari Chicken Karahi",
    tagline: "Peshawar style karahi",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
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
    stepsRaw: [
      "Heat oil in karahi, add chicken and fry for 5 minutes.",
      "Add ginger, garlic and green chilies.",
      "Add tomatoes and cook until soft.",
      "Add cumin, red chili flakes, black pepper and salt.",
      "Cook on high heat until oil separates.",
      "Serve with naan."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Spicy Chicken Karahi",
    tagline: "Extra spicy karahi",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "4 tomatoes",
      "2 tbsp ginger-garlic",
      "4 green chilies",
      "2 tsp red chili powder",
      "1 tsp cumin",
      "1 tsp pepper",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Heat oil, add chicken and fry.",
      "Add ginger-garlic and chilies.",
      "Add tomatoes and cook until soft.",
      "Add red chili, cumin, pepper and salt.",
      "Cook until oil separates.",
      "Serve hot."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Karahi with Gravy",
    tagline: "Karahi with extra gravy",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "4 tomatoes, pureed",
      "2 tbsp ginger-garlic",
      "4 green chilies",
      "1 tsp cumin",
      "2 tsp red chili",
      "1/2 cup oil",
      "Salt to taste",
      "Fresh coriander"
    ],
    stepsRaw: [
      "Heat oil, add chicken and fry.",
      "Add ginger-garlic and chilies.",
      "Add tomato puree and cook.",
      "Add spices and 1 cup water.",
      "Simmer for 20 minutes.",
      "Garnish and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Dry Chicken Karahi",
    tagline: "Dry karahi with no gravy",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "2 tomatoes, chopped",
      "2 tbsp ginger-garlic",
      "4 green chilies",
      "1 tsp cumin",
      "2 tsp red chili",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Heat oil, add chicken and fry until golden.",
      "Add ginger-garlic and chilies.",
      "Add tomatoes and cook until dry.",
      "Add spices and cook on high heat.",
      "Serve hot with raita."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 30,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },

  // ==================== CHICKEN MASALA (5) ====================
  {
    title: "Chicken Masala",
    tagline: "Spicy chicken masala",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
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
    stepsRaw: [
      "Heat oil, add cumin seeds and onions. Sauté until golden.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add tomato puree and cook until oil separates.",
      "Add turmeric, red chili, coriander powder and salt.",
      "Add 1/2 cup water and cook for 20 minutes.",
      "Add garam masala and coriander. Serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Tikka Masala",
    tagline: "Restaurant style tikka masala",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "500g chicken tikka pieces",
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
    stepsRaw: [
      "Heat oil, add cumin seeds and onions. Sauté until golden.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomato puree and cook until oil separates.",
      "Add turmeric, red chili powder and salt.",
      "Add chicken tikka and simmer for 10 minutes.",
      "Add cream and kasuri methi.",
      "Serve hot with naan."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Butter Masala",
    tagline: "Creamy butter chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "500g chicken, boneless",
      "2 onions, chopped",
      "2 tomatoes, pureed",
      "2 tbsp ginger-garlic paste",
      "1 tsp cumin",
      "1 tsp red chili",
      "1/2 cup cream",
      "2 tbsp butter",
      "1 tsp kasuri methi",
      "Salt to taste"
    ],
    stepsRaw: [
      "Heat butter, add cumin and onions. Sauté until golden.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add tomato puree and cook until butter separates.",
      "Add red chili and salt.",
      "Add chicken and cook for 15 minutes.",
      "Add cream and kasuri methi.",
      "Serve with naan."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Lababdar",
    tagline: "Rich and creamy lababdar",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
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
    stepsRaw: [
      "Heat oil, add cumin and onions. Sauté until golden.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add tomato puree and cook until oil separates.",
      "Add red chili and salt. Cook for 15 minutes.",
      "Add cream and garam masala.",
      "Serve hot."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Kolhapuri",
    tagline: "Spicy Kolhapuri style chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
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
    stepsRaw: [
      "Heat oil, add onions and sauté until brown.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add tomatoes and cook until soft.",
      "Add red chili, turmeric, garam masala and salt.",
      "Add coconut and 1/2 cup water.",
      "Cook for 20 minutes and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },

  // ==================== CHICKEN ROAST (3) ====================
  {
    title: "Oven Roasted Chicken",
    tagline: "Whole roasted chicken",
    image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 whole chicken",
      "1 cup yogurt",
      "2 tbsp ginger-garlic paste",
      "2 tsp red chili powder",
      "1 tsp turmeric",
      "1 tsp garam masala",
      "1 tsp cumin powder",
      "1 tsp coriander powder",
      "2 tbsp lemon juice",
      "2 tbsp oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Make slits on chicken.",
      "Mix all ingredients to make marinade.",
      "Marinate chicken for 4 hours.",
      "Preheat oven to 180°C.",
      "Place chicken in baking tray.",
      "Roast for 45-50 minutes, basting occasionally.",
      "Let rest for 10 minutes before carving.",
      "Serve with salad."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 60,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Tandoori Chicken",
    tagline: "Classic tandoori chicken",
    image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 whole chicken",
      "1 cup yogurt",
      "2 tbsp ginger-garlic paste",
      "2 tbsp tandoori masala",
      "2 tsp red chili powder",
      "1 tsp turmeric",
      "2 tbsp lemon juice",
      "2 tbsp oil",
      "Salt to taste",
      "Orange food color (optional)"
    ],
    stepsRaw: [
      "Make deep slits on chicken.",
      "Mix all ingredients for marinade.",
      "Marinate for 6 hours.",
      "Preheat oven to 200°C.",
      "Place chicken on rack with tray below.",
      "Bake for 30-35 minutes, turning once.",
      "Brush with oil and grill for 5 minutes.",
      "Serve with mint chutney."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 60,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Roast with Gravy",
    tagline: "Roasted chicken in gravy",
    image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 whole chicken",
      "2 onions, sliced",
      "2 tomatoes, chopped",
      "2 tbsp ginger-garlic",
      "1 tsp cumin",
      "1 tsp red chili",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Roast chicken in oven until golden.",
      "Heat oil, add cumin and onions. Sauté until golden.",
      "Add ginger-garlic and tomatoes. Cook until soft.",
      "Add red chili and salt.",
      "Add roasted chicken and 1 cup water.",
      "Simmer for 15 minutes.",
      "Serve hot."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 60,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },

  // ==================== CHICKEN BONELESS (4) ====================
  {
    title: "Chicken Boneless Curry",
    tagline: "Boneless chicken curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "500g boneless chicken cubes",
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
    stepsRaw: [
      "Heat oil, add cumin and onions. Sauté until golden.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add chicken and fry until white.",
      "Add tomato puree and cook until oil separates.",
      "Add turmeric, red chili and salt.",
      "Cook for 15 minutes.",
      "Add garam masala and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Malai Boti",
    tagline: "Creamy chicken cubes",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "500g boneless chicken cubes",
      "1/2 cup cream",
      "2 tbsp ginger-garlic paste",
      "2 tbsp green chili paste",
      "1 tsp white pepper",
      "1 tsp garam masala",
      "1 tbsp lemon juice",
      "2 tbsp oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Mix all ingredients except chicken.",
      "Add chicken and marinate for 2 hours.",
      "Heat oil in pan, add chicken.",
      "Cook on medium heat until done.",
      "Serve hot with naan."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 30,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Kali Mirch",
    tagline: "Black pepper chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "500g boneless chicken",
      "2 onions, chopped",
      "2 tbsp ginger-garlic",
      "2 tbsp black pepper, crushed",
      "1 tsp cumin",
      "1/2 cup yogurt",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Heat oil, add cumin and onions. Sauté until golden.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add yogurt and black pepper.",
      "Cook for 15 minutes.",
      "Serve hot."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Hariyali",
    tagline: "Green masala chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "500g boneless chicken",
      "1 cup mint-coriander chutney",
      "2 tbsp ginger-garlic",
      "2 green chilies",
      "1 tsp cumin",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Grind mint, coriander and chilies to paste.",
      "Heat oil, add cumin and chicken. Fry for 5 minutes.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add green paste and salt.",
      "Cook for 15 minutes.",
      "Serve with naan."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },

  // ==================== CHICKEN HANDI (3) ====================
  {
    title: "Chicken Handi",
    tagline: "Traditional handi chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "1 cup yogurt",
      "2 onions, chopped",
      "2 tbsp ginger-garlic",
      "1 tsp cumin",
      "1 tsp turmeric",
      "2 tsp red chili",
      "1 tsp garam masala",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Heat oil, add cumin and onions. Sauté until golden.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add turmeric, red chili and salt.",
      "Add yogurt and cook on low heat for 25 minutes.",
      "Add garam masala and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Handi with Cream",
    tagline: "Creamy handi chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "1 cup yogurt",
      "1/4 cup cream",
      "2 onions, chopped",
      "2 tbsp ginger-garlic",
      "1 tsp cumin",
      "1 tsp turmeric",
      "2 tsp red chili",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Heat oil, add cumin and onions. Sauté until golden.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add turmeric, red chili and salt.",
      "Add yogurt and cook for 20 minutes.",
      "Add cream and simmer for 5 minutes.",
      "Serve hot."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Spicy Chicken Handi",
    tagline: "Extra spicy handi",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "1 cup yogurt",
      "2 onions, chopped",
      "2 tbsp ginger-garlic",
      "1 tsp cumin",
      "1 tsp turmeric",
      "3 tsp red chili",
      "1 tsp garam masala",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Heat oil, add cumin and onions. Sauté until golden.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add chicken and fry for 5 minutes.",
      "Add turmeric, red chili and salt.",
      "Add yogurt and cook for 25 minutes.",
      "Add garam masala and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 40,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },

  // ==================== CHICKEN BHUNA (2) ====================
  {
    title: "Chicken Bhuna",
    tagline: "Dry bhuna chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "2 onions, chopped",
      "2 tomatoes, chopped",
      "2 tbsp ginger-garlic",
      "1 tsp cumin",
      "1 tsp turmeric",
      "2 tsp red chili",
      "1 tsp coriander powder",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Heat oil, add cumin and onions. Sauté until brown.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add chicken and fry until browned.",
      "Add tomatoes and cook until dry.",
      "Add turmeric, red chili, coriander and salt.",
      "Cook on low heat until oil separates and chicken is dry.",
      "Serve hot with naan."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  },
  {
    title: "Chicken Bhuna Masala",
    tagline: "Spicy bhuna masala",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    category: "Lunch",
    subCategory: "Chicken",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 kg chicken",
      "2 onions, chopped",
      "2 tomatoes, chopped",
      "2 tbsp ginger-garlic",
      "1 tsp cumin",
      "1 tsp turmeric",
      "2 tsp red chili",
      "1 tsp garam masala",
      "1/2 cup oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Heat oil, add cumin and onions. Sauté until brown.",
      "Add ginger-garlic and cook for 2 minutes.",
      "Add chicken and fry until browned.",
      "Add tomatoes and cook until dry.",
      "Add turmeric, red chili and salt.",
      "Cook on low heat for 20 minutes.",
      "Add garam masala and serve."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
    isHalal: true,
    budget: "standard",
mealTime: ["Lunch", "Dinner"],
ageGroup: ["adults"],
patientFriendly: ["general"]
  }
];

async function migrate() {
  try {
    // Check which environment variable is available
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGOURI;
    
    console.log('🔍 MONGODB_URI:', process.env.MONGODB_URI);
    console.log('🔍 MONGOURI:', process.env.MONGOURI);
    console.log('🔍 MONGO_URI:', process.env.MONGO_URI);
    console.log('🔍 Using URI:', mongoURI ? 'Found' : 'NOT FOUND');
    console.log('🔍 Current directory:', __dirname);
    
    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables. Please check your .env file');
    }
    
    console.log('🔌 Connecting to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      family: 4
    });
    
    console.log('✅ Connected to MongoDB!');

    let added = 0;
    let skipped = 0;

    for (let recipe of recipesToMigrate) {
      const existing = await Recipe.findOne({ title: recipe.title });
      if (!existing) {
        await Recipe.create(recipe);
        console.log(`✅ Added: ${recipe.title}`);
        added++;
      } else {
        console.log(`⚠️ Skipped: ${recipe.title} (already exists)`);
        skipped++;
      }
    }

    console.log('\n🎉 Migration Complete!');
    console.log(`📊 Added: ${added}, Skipped: ${skipped}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

migrate();