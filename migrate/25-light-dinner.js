// 14-light-dinner.js - COMPLETE (40 recipes)
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
require('dotenv').config({ path: '../.env' });

const recipesToMigrate = [
  // ==================== SOUPS (6) ====================
  {
    title: "Chicken Corn Soup",
    tagline: "Light chicken and corn soup - comforting and warm",
    image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
    category: "Light Dinner",
    subCategory: "Soups",
    cuisine: "Chinese",
    ingredientsRaw: [
      "200g chicken breast - boiled and shredded",
      "1 cup sweet corn kernels (fresh or canned)",
      "1 medium carrot - julienned",
      "2 tablespoons cornflour",
      "1 large egg - beaten",
      "4 cups chicken stock",
      "1 teaspoon white pepper powder",
      "1 teaspoon salt",
      "1 tablespoon soy sauce",
      "2 spring onions - chopped for garnish"
    ],
    stepsRaw: [
      "In a large pot, bring the chicken stock to a boil over medium heat.",
      "Add shredded chicken and sweet corn kernels. Simmer for 8-10 minutes.",
      "Add julienned carrots and cook for 2-3 minutes until slightly soft.",
      "In a small bowl, mix cornflour with 1/4 cup of cold water to make a smooth slurry.",
      "Slowly pour the cornflour slurry into the soup while stirring continuously to prevent lumps.",
      "Continue stirring until the soup thickens, about 2-3 minutes.",
      "Reduce heat to low. Slowly drizzle the beaten egg into the soup while stirring gently to create egg ribbons.",
      "Add soy sauce, white pepper powder, and salt. Mix well.",
      "Simmer for 2-3 more minutes.",
      "Garnish with chopped spring onions and serve hot."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 25,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Hot & Sour Soup",
    tagline: "Tangy and spicy soup - perfect for cold evenings",
    image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
    category: "Light Dinner",
    subCategory: "Soups",
    cuisine: "Chinese",
    ingredientsRaw: [
      "4 cups chicken or vegetable stock",
      "100g chicken breast - shredded",
      "1/2 cup mushrooms - thinly sliced",
      "1/4 cup bamboo shoots - julienned",
      "2 tablespoons soy sauce",
      "2 tablespoons white vinegar",
      "1 tablespoon red chili sauce",
      "1 teaspoon white pepper powder",
      "2 tablespoons cornflour",
      "1 large egg - beaten",
      "2 spring onions - chopped"
    ],
    stepsRaw: [
      "Bring the stock to a boil in a large pot over medium heat.",
      "Add shredded chicken, mushrooms, and bamboo shoots. Simmer for 5-7 minutes.",
      "Add soy sauce, vinegar, chili sauce, and white pepper. Mix well.",
      "In a small bowl, mix cornflour with 1/4 cup of cold water to make a smooth slurry.",
      "Pour the slurry into the soup while stirring continuously. Cook until thickened, about 2-3 minutes.",
      "Reduce heat to low. Slowly drizzle the beaten egg into the soup while stirring gently.",
      "Simmer for 2-3 minutes.",
      "Garnish with spring onions and serve hot."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 25,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Tomato Soup",
    tagline: "Creamy tomato soup - classic and comforting",
    image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
    category: "Light Dinner",
    subCategory: "Soups",
    cuisine: "Continental",
    ingredientsRaw: [
      "6 large ripe tomatoes - chopped",
      "1 medium onion - chopped",
      "2 cloves garlic - minced",
      "2 cups vegetable stock",
      "1/4 cup heavy cream",
      "2 tablespoons butter",
      "1 teaspoon sugar",
      "Salt and black pepper to taste",
      "Fresh basil or coriander for garnish"
    ],
    stepsRaw: [
      "Heat butter in a large pot over medium heat. Add chopped onions and garlic. Sauté for 3-4 minutes until soft and translucent.",
      "Add chopped tomatoes and cook for 8-10 minutes until they become soft and mushy.",
      "Add vegetable stock and bring to a boil. Reduce heat and simmer for 15-20 minutes.",
      "Remove from heat and let it cool slightly. Blend the soup with an immersion blender until smooth.",
      "Strain the soup through a fine-mesh strainer for a silky texture (optional).",
      "Return the soup to the pot. Add sugar, salt, and black pepper. Mix well.",
      "Stir in the heavy cream and simmer for 5 minutes on low heat. Do not boil after adding cream.",
      "Serve hot, garnished with fresh basil or coriander, and a drizzle of cream."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 35,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Vegetable Soup",
    tagline: "Healthy mixed vegetable soup - light and nutritious",
    image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
    category: "Light Dinner",
    subCategory: "Soups",
    cuisine: "Continental",
    ingredientsRaw: [
      "1 medium carrot - diced",
      "1 medium potato - diced",
      "1/2 cup green peas",
      "1/2 cup green beans - chopped",
      "1 medium onion - chopped",
      "2 cloves garlic - minced",
      "4 cups vegetable stock",
      "1 teaspoon mixed dried herbs",
      "Salt and black pepper to taste",
      "Fresh parsley for garnish"
    ],
    stepsRaw: [
      "Heat 1 tablespoon of oil in a large pot over medium heat. Add onions and garlic. Sauté for 2-3 minutes until soft.",
      "Add all the vegetables (carrots, potatoes, peas, beans) and cook for 5-6 minutes, stirring occasionally.",
      "Add vegetable stock and bring to a boil. Reduce heat and simmer for 15-20 minutes until vegetables are tender.",
      "Add mixed herbs, salt, and black pepper. Mix well.",
      "For a thicker soup, mash some vegetables with the back of a spoon.",
      "Simmer for 2-3 more minutes.",
      "Garnish with fresh parsley and serve hot with crusty bread."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 30,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Lentil Soup",
    tagline: "Protein-rich lentil soup - hearty and healthy",
    image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
    category: "Light Dinner",
    subCategory: "Soups",
    cuisine: "Continental",
    ingredientsRaw: [
      "1 cup red lentils (masoor dal) - washed",
      "1 medium onion - chopped",
      "2 medium carrots - diced",
      "2 cloves garlic - minced",
      "4 cups vegetable stock",
      "1 teaspoon cumin powder",
      "1 tablespoon lemon juice",
      "Salt and black pepper to taste",
      "Fresh coriander for garnish"
    ],
    stepsRaw: [
      "Heat 1 tablespoon of oil in a large pot over medium heat. Add onions and garlic. Sauté for 3-4 minutes until soft.",
      "Add carrots and cook for 3-4 minutes.",
      "Add red lentils and vegetable stock. Bring to a boil.",
      "Reduce heat to low, cover, and simmer for 25-30 minutes until the lentils are very soft.",
      "Using an immersion blender, blend the soup partially for a creamy texture, leaving some lentils whole.",
      "Add cumin powder, salt, and black pepper. Mix well.",
      "Stir in lemon juice and simmer for 2-3 minutes.",
      "Garnish with fresh coriander and serve hot with bread."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 40,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Chicken Noodle Soup",
    tagline: "Comforting chicken noodle soup - classic remedy",
    image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
    category: "Light Dinner",
    subCategory: "Soups",
    cuisine: "Continental",
    ingredientsRaw: [
      "200g chicken breast - boiled and shredded",
      "100g egg noodles",
      "1 medium carrot - julienned",
      "4 cups chicken stock",
      "2 spring onions - chopped",
      "1 teaspoon ginger - grated",
      "1 tablespoon soy sauce",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "Bring the chicken stock to a boil in a large pot over medium heat.",
      "Add grated ginger and bring to a simmer.",
      "Add egg noodles and cook according to package instructions (about 5-7 minutes).",
      "Add shredded chicken and julienned carrots. Cook for 3-4 minutes until carrots are tender-crisp.",
      "Add soy sauce, salt, and black pepper. Mix well.",
      "Simmer for 2-3 minutes.",
      "Garnish with spring onions and serve hot."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 25,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },

  // ==================== SALADS (5) ====================
  {
    title: "Chicken Caesar Salad",
    tagline: "Classic Caesar salad - creamy and satisfying",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    category: "Light Dinner",
    subCategory: "Salads",
    cuisine: "Italian",
    ingredientsRaw: [
      "200g grilled chicken breast - sliced",
      "1 head romaine lettuce - chopped",
      "1/2 cup croutons",
      "1/4 cup grated Parmesan cheese",
      "1/2 cup mayonnaise",
      "2 tablespoons lemon juice",
      "1 teaspoon garlic paste",
      "1 teaspoon Dijon mustard",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "For the dressing: In a small bowl, whisk together mayonnaise, lemon juice, garlic paste, mustard, salt, and pepper until smooth.",
      "In a large salad bowl, add the chopped romaine lettuce.",
      "Pour the dressing over the lettuce and toss well to coat.",
      "Top with sliced grilled chicken, croutons, and grated Parmesan cheese.",
      "Add a final sprinkle of black pepper.",
      "Serve immediately."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 15,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Greek Salad",
    tagline: "Fresh Greek salad - Mediterranean flavors",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    category: "Light Dinner",
    subCategory: "Salads",
    cuisine: "Greek",
    ingredientsRaw: [
      "2 large tomatoes - cut into cubes",
      "1 cucumber - cut into cubes",
      "1 medium red onion - thinly sliced",
      "1/2 cup Kalamata olives",
      "100g feta cheese - cut into cubes",
      "2 tablespoons extra virgin olive oil",
      "1 tablespoon lemon juice",
      "1 teaspoon dried oregano",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "In a large salad bowl, combine tomatoes, cucumber, red onion, and olives.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour the dressing over the vegetables and toss gently to combine.",
      "Top with feta cheese cubes.",
      "Serve immediately or chill for 15 minutes before serving."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 15,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Fruit Chaat",
    tagline: "Fresh Pakistani fruit salad - sweet and tangy",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    category: "Light Dinner",
    subCategory: "Salads",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 apple - chopped",
      "1 banana - sliced",
      "1 orange - segmented",
      "1/2 cup green grapes",
      "1/2 cup pomegranate seeds",
      "1 tablespoon lemon juice",
      "1 teaspoon chaat masala",
      "1/2 teaspoon black pepper powder",
      "1/2 teaspoon salt"
    ],
    stepsRaw: [
      "In a large bowl, combine all the chopped fruits: apple, banana, orange, grapes, and pomegranate seeds.",
      "Sprinkle lemon juice over the fruits to prevent browning.",
      "Add chaat masala, black pepper, and salt.",
      "Toss gently to coat all fruits evenly with the spices.",
      "Serve immediately for the best taste and texture."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Chicken Avocado Salad",
    tagline: "Healthy chicken avocado salad - rich in good fats",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    category: "Light Dinner",
    subCategory: "Salads",
    cuisine: "Continental",
    ingredientsRaw: [
      "200g grilled chicken - diced",
      "1 ripe avocado - sliced",
      "2 cups mixed salad greens",
      "1/2 cup cherry tomatoes - halved",
      "1/4 cup corn kernels",
      "2 tablespoons olive oil",
      "1 tablespoon lemon juice",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "Arrange the mixed salad greens on a serving plate or in a bowl.",
      "Top with diced grilled chicken, sliced avocado, cherry tomatoes, and corn.",
      "In a small bowl, whisk together olive oil, lemon juice, salt, and pepper.",
      "Drizzle the dressing over the salad.",
      "Serve immediately."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 15,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Pasta Salad",
    tagline: "Cold pasta salad - perfect for summer dinners",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    category: "Light Dinner",
    subCategory: "Salads",
    cuisine: "Italian",
    ingredientsRaw: [
      "200g pasta (penne or fusilli) - cooked and cooled",
      "1/2 cup bell peppers - diced (red, yellow, green)",
      "1/2 cup black olives - sliced",
      "1/4 cup corn kernels",
      "2 tablespoons mayonnaise",
      "1 tablespoon plain yogurt",
      "1 teaspoon Dijon mustard",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "Cook pasta according to package instructions. Drain and rinse with cold water to cool completely. Set aside.",
      "In a small bowl, mix mayonnaise, yogurt, mustard, salt, and pepper to make the dressing.",
      "In a large bowl, combine the cooled pasta, bell peppers, olives, and corn.",
      "Pour the dressing over the pasta and toss well to coat evenly.",
      "Chill in the refrigerator for at least 30 minutes before serving.",
      "Serve cold."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 40,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },

  // ==================== SANDWICHES (5) ====================
  {
    title: "Grilled Chicken Sandwich",
    tagline: "Classic grilled chicken sandwich - hot and crispy",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
    category: "Light Dinner",
    subCategory: "Sandwiches",
    cuisine: "Continental",
    ingredientsRaw: [
      "2 slices of bread",
      "100g grilled chicken breast - sliced",
      "Lettuce leaves",
      "2 slices of tomato",
      "2 slices of onion",
      "1 tablespoon mayonnaise",
      "1 teaspoon mustard",
      "Butter for grilling"
    ],
    stepsRaw: [
      "Spread mayonnaise on one bread slice and mustard on the other.",
      "On the mayonnaise side, layer lettuce, grilled chicken slices, tomato, and onion.",
      "Top with the other bread slice, mustard side down.",
      "Butter the outside of both bread slices.",
      "Heat a pan or sandwich press over medium heat. Place the sandwich in the pan.",
      "Grill for 2-3 minutes per side until golden brown and crispy.",
      "Cut in half and serve hot with fries."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Club Sandwich",
    tagline: "Triple-decker sandwich - filling and delicious",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
    category: "Light Dinner",
    subCategory: "Sandwiches",
    cuisine: "Continental",
    ingredientsRaw: [
      "3 slices of bread",
      "100g cooked chicken - sliced",
      "2 bacon strips - cooked",
      "Lettuce leaves",
      "2 slices of tomato",
      "2 tablespoons mayonnaise",
      "Butter for toasting"
    ],
    stepsRaw: [
      "Toast the bread slices until lightly golden.",
      "Spread mayonnaise on one side of each toast.",
      "On the first slice, layer lettuce, chicken slices, and more lettuce.",
      "Place the second slice on top, mayonnaise side down.",
      "On the second slice, layer bacon, tomato slices, and lettuce.",
      "Top with the third slice, mayonnaise side down.",
      "Secure the sandwich with toothpicks and cut into 4 triangles.",
      "Serve with potato chips or fries."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 15,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Veg Sandwich",
    tagline: "Healthy vegetable sandwich - light and fresh",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
    category: "Light Dinner",
    subCategory: "Sandwiches",
    cuisine: "Continental",
    ingredientsRaw: [
      "2 slices of bread",
      "Cucumber slices",
      "Tomato slices",
      "Onion rings",
      "Lettuce leaves",
      "1 tablespoon green chutney",
      "Butter for spreading"
    ],
    stepsRaw: [
      "Butter one side of each bread slice.",
      "Spread green chutney on the buttered side of both slices.",
      "On one slice, layer lettuce, cucumber, tomato, and onion.",
      "Cover with the other slice, chutney side down.",
      "For a warm sandwich, grill on a pan with a little butter until golden.",
      "Cut in half and serve with ketchup."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 8,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Egg Sandwich",
    tagline: "Simple egg sandwich - quick and satisfying",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
    category: "Light Dinner",
    subCategory: "Sandwiches",
    cuisine: "Continental",
    ingredientsRaw: [
      "2 slices of bread",
      "2 large eggs - scrambled",
      "Lettuce leaves",
      "1 tablespoon mayonnaise",
      "Butter for grilling",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "Scramble the eggs in a pan with a pinch of salt and pepper. Set aside.",
      "Spread mayonnaise on one side of each bread slice.",
      "On one slice, place lettuce leaves and the scrambled eggs.",
      "Cover with the other slice, mayonnaise side down.",
      "Butter the outside of both slices.",
      "Grill in a pan or sandwich press for 2-3 minutes per side until golden brown.",
      "Serve hot."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Tuna Sandwich",
    tagline: "Tuna mayo sandwich - quick and protein-rich",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
    category: "Light Dinner",
    subCategory: "Sandwiches",
    cuisine: "Continental",
    ingredientsRaw: [
      "2 slices of bread",
      "1 can tuna - drained and flaked",
      "2 tablespoons mayonnaise",
      "1 tablespoon red onion - finely chopped",
      "Lettuce leaves",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "In a small bowl, mix the flaked tuna with mayonnaise, chopped onion, salt, and pepper.",
      "Toast the bread slices lightly if desired.",
      "Spread the tuna mixture on one bread slice.",
      "Top with lettuce leaves.",
      "Cover with the second bread slice.",
      "Grill lightly or serve as is.",
      "Cut in half and serve."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 8,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },

  // ==================== WRAPS & ROLLS (5) ====================
  {
    title: "Chicken Wrap",
    tagline: "Grilled chicken wrap - portable and delicious",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
    category: "Light Dinner",
    subCategory: "Wraps",
    cuisine: "Continental",
    ingredientsRaw: [
      "1 large flour tortilla",
      "200g grilled chicken strips",
      "Lettuce leaves",
      "Tomato slices",
      "Onion slices",
      "2 tablespoons mayonnaise",
      "1 teaspoon chili sauce"
    ],
    stepsRaw: [
      "Warm the tortilla on a hot tawa or in a pan for 20-30 seconds on each side.",
      "Spread mayonnaise and chili sauce evenly over the tortilla.",
      "Arrange lettuce, chicken strips, tomato, and onion in the center of the tortilla.",
      "Fold the sides inward, then roll tightly from the bottom.",
      "Cut in half diagonally and serve with fries."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Chicken Shawarma",
    tagline: "Middle Eastern style wrap - spiced and tangy",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
    category: "Light Dinner",
    subCategory: "Wraps",
    cuisine: "Middle Eastern",
    ingredientsRaw: [
      "1 pita bread",
      "200g chicken shawarma slices",
      "Garlic sauce (toum)",
      "Pickles",
      "French fries",
      "Tomato slices"
    ],
    stepsRaw: [
      "Warm the pita bread on a hot pan for 30 seconds per side.",
      "Spread garlic sauce generously on the pita.",
      "Arrange chicken shawarma, pickles, fries, and tomato slices in the center.",
      "Roll tightly like a burrito, folding the bottom first.",
      "Wrap in foil to hold shape.",
      "Serve hot."
    ],
    isVegetarian: false,
    difficulty: "Medium",
    cookingTime: 15,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Seekh Kebab Roll",
    tagline: "Kebab paratha roll - Pakistani street food",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
    category: "Light Dinner",
    subCategory: "Wraps",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 paratha",
      "2 seekh kebabs",
      "Onion slices",
      "Green chutney",
      "Raita (yogurt sauce)"
    ],
    stepsRaw: [
      "Cook the paratha on a hot tawa until golden on both sides.",
      "Grill or pan-fry the seekh kebabs until hot.",
      "Place the kebabs on the paratha.",
      "Top with onion slices, drizzle with green chutney and raita.",
      "Roll tightly and serve hot."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Veg Wrap",
    tagline: "Vegetable wrap - healthy and colorful",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
    category: "Light Dinner",
    subCategory: "Wraps",
    cuisine: "Continental",
    ingredientsRaw: [
      "1 tortilla",
      "Mixed grilled vegetables (zucchini, bell peppers, onion)",
      "Lettuce leaves",
      "2 tablespoons hummus",
      "Bell pepper strips"
    ],
    stepsRaw: [
      "Warm the tortilla on a hot pan.",
      "Spread hummus evenly over the tortilla.",
      "Layer lettuce, grilled vegetables, and bell pepper strips.",
      "Roll tightly and cut in half.",
      "Serve with extra hummus."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Egg Roll",
    tagline: "Egg paratha roll - quick and satisfying",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f",
    category: "Light Dinner",
    subCategory: "Wraps",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 paratha",
      "2 eggs - scrambled",
      "Onion slices",
      "Green chilies - chopped",
      "Green chutney"
    ],
    stepsRaw: [
      "Cook the paratha on a hot tawa until golden on both sides.",
      "Scramble the eggs in a separate pan with salt and pepper.",
      "Place the scrambled eggs on the paratha.",
      "Top with onion slices, green chilies, and green chutney.",
      "Roll tightly and serve hot."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  // 19-light-dinner-remaining.js - Light Dinner Remaining (19 recipes)
  // ==================== LIGHT CURRIES (4) ====================
  {
    title: "Moong Dal",
    tagline: "Light yellow lentil dal - easy to digest",
    image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
    category: "Light Dinner",
    subCategory: "Light Curries",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 cup moong dal (split yellow lentils) - washed",
      "1 medium onion - finely chopped",
      "2 medium tomatoes - finely chopped",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon red chili powder",
      "2 tablespoons oil",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    stepsRaw: [
      "Wash moong dal thoroughly. In a pressure cooker, add dal, 2 cups of water, turmeric, and salt. Pressure cook for 2-3 whistles until soft.",
      "Heat oil in a pan over medium heat. Add cumin seeds and let them crackle for 30 seconds.",
      "Add chopped onions and sauté for 4-5 minutes until golden brown.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add chopped tomatoes and cook for 5-6 minutes until soft.",
      "Add red chili powder and salt. Mix well and cook for 2 minutes.",
      "Add the cooked dal and 1/2 cup of water. Simmer for 5-7 minutes.",
      "Garnish with fresh coriander and serve hot with rice or roti."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 30,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Mix Dal",
    tagline: "Light mixed lentil curry - nutritious",
    image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
    category: "Light Dinner",
    subCategory: "Light Curries",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1/2 cup moong dal",
      "1/2 cup masoor dal (red lentils)",
      "1 medium onion - chopped",
      "2 medium tomatoes - chopped",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric",
      "1 teaspoon red chili powder",
      "2 tablespoons oil",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    stepsRaw: [
      "Wash both dals together. Pressure cook with turmeric, salt, and 2.5 cups of water for 2-3 whistles.",
      "Heat oil in a pan. Add cumin seeds and onions. Sauté until golden.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomatoes and cook until soft.",
      "Add red chili powder and salt. Mix well.",
      "Add the cooked dal and simmer for 5-7 minutes.",
      "Garnish with coriander and serve."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 30,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Vegetable Curry",
    tagline: "Light mixed vegetable curry - healthy and tasty",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    category: "Light Dinner",
    subCategory: "Light Curries",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "2 cups mixed vegetables (cauliflower, carrots, peas, beans)",
      "1 medium onion - chopped",
      "2 medium tomatoes - pureed",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric",
      "1 teaspoon red chili powder",
      "2 tablespoons oil",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    stepsRaw: [
      "Heat oil in a pan. Add cumin seeds and onions. Sauté until golden.",
      "Add ginger-garlic paste and cook for 2 minutes.",
      "Add tomato puree and cook until oil separates.",
      "Add turmeric, red chili powder, and salt. Mix well.",
      "Add mixed vegetables and 1 cup of water. Cover and cook for 15-20 minutes until vegetables are tender.",
      "Garnish with coriander and serve with roti or rice."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 30,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Kadhi",
    tagline: "Yogurt curry - tangy and comforting",
    image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
    category: "Light Dinner",
    subCategory: "Light Curries",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 cup plain yogurt",
      "2 tablespoons besan (gram flour)",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder",
      "1 teaspoon red chili powder",
      "2 cups warm water",
      "Salt to taste",
      "For tadka: 2 tbsp oil, 1 tsp cumin, 1 tsp mustard seeds, few curry leaves, 2 dried red chilies"
    ],
    stepsRaw: [
      "In a bowl, whisk yogurt, besan, and 1/2 cup water until smooth. Add remaining water, turmeric, red chili, and salt. Mix well.",
      "Pour the mixture into a pot and bring to a boil over medium heat, stirring continuously to prevent curdling.",
      "Reduce heat and simmer for 20-25 minutes, stirring occasionally, until the kadhi thickens.",
      "For tadka: Heat oil in a small pan. Add cumin seeds, mustard seeds, curry leaves, and dried red chilies. Let them crackle.",
      "Pour the tadka over the kadhi.",
      "Serve hot with steamed rice."
    ],
    isVegetarian: true,
    difficulty: "Medium",
    cookingTime: 35,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },

  // ==================== LIGHT RICE DISHES (4) ====================
  {
    title: "Khichdi",
    tagline: "Rice and lentil porridge - ultimate comfort food",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
    category: "Light Dinner",
    subCategory: "Light Rice",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1/2 cup basmati rice",
      "1/2 cup moong dal",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric powder",
      "2 tablespoons ghee",
      "Salt to taste",
      "3 cups warm water"
    ],
    stepsRaw: [
      "Wash rice and moong dal together thoroughly.",
      "Heat ghee in a pressure cooker over medium heat. Add cumin seeds and let them crackle.",
      "Add the washed rice and dal. Stir well for 2 minutes.",
      "Add turmeric powder, salt, and 3 cups of warm water.",
      "Close the pressure cooker lid and cook for 3-4 whistles.",
      "Let the pressure release naturally. Open the lid and mash lightly with a spoon.",
      "Serve hot with yogurt and pickle."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 25,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Vegetable Khichdi",
    tagline: "Khichdi with vegetables - more nutritious",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
    category: "Light Dinner",
    subCategory: "Light Rice",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1/2 cup rice",
      "1/2 cup moong dal",
      "1 cup mixed vegetables (carrots, peas, beans)",
      "1 teaspoon cumin seeds",
      "1/2 teaspoon turmeric",
      "2 tablespoons ghee",
      "Salt to taste",
      "3 cups water"
    ],
    stepsRaw: [
      "Wash rice and dal together.",
      "Heat ghee in a pressure cooker. Add cumin seeds and let them crackle.",
      "Add vegetables and sauté for 2-3 minutes.",
      "Add rice, dal, turmeric, and salt. Stir well.",
      "Add 3 cups of water and pressure cook for 3-4 whistles.",
      "Let pressure release naturally. Serve hot with yogurt."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 30,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Lemon Rice",
    tagline: "Tangy lemon rice - refreshing and flavorful",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
    category: "Light Dinner",
    subCategory: "Light Rice",
    cuisine: "Indian",
    ingredientsRaw: [
      "1 cup cooked rice (cooled)",
      "1 lemon - juiced",
      "1 teaspoon mustard seeds",
      "1 teaspoon urad dal",
      "2 dried red chilies",
      "Few curry leaves",
      "1/2 teaspoon turmeric powder",
      "2 tablespoons oil",
      "Salt to taste",
      "2 tablespoons peanuts"
    ],
    stepsRaw: [
      "Heat oil in a pan over medium heat. Add mustard seeds and let them crackle.",
      "Add urad dal, dried red chilies, curry leaves, and peanuts. Sauté until golden.",
      "Add turmeric powder and stir for 30 seconds.",
      "Turn off the heat. Add lemon juice and salt. Mix well.",
      "Add the cooled rice and mix gently until the tempering is evenly distributed.",
      "Serve at room temperature with papad."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 15,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Curd Rice",
    tagline: "Yogurt rice - cooling and soothing",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
    category: "Light Dinner",
    subCategory: "Light Rice",
    cuisine: "South Indian",
    ingredientsRaw: [
      "1 cup cooked rice",
      "1 cup plain yogurt",
      "1/2 cup milk",
      "1 teaspoon mustard seeds",
      "1 teaspoon urad dal",
      "Few curry leaves",
      "2 tablespoons oil",
      "Salt to taste"
    ],
    stepsRaw: [
      "Mash the cooked rice lightly with a spoon.",
      "Add yogurt and milk to the rice. Mix well. Add salt to taste.",
      "Heat oil in a small pan. Add mustard seeds and let them crackle.",
      "Add urad dal and curry leaves. Sauté until golden.",
      "Pour this tempering over the rice mixture.",
      "Mix well and refrigerate for 30 minutes.",
      "Serve chilled."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 20,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },

  // ==================== LIGHT BREAKFAST FOR DINNER (3) ====================
  {
    title: "Anda Paratha",
    tagline: "Egg stuffed paratha - quick dinner option",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    category: "Light Dinner",
    subCategory: "Breakfast for Dinner",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "2 parathas (store-bought or homemade)",
      "2 large eggs",
      "1 medium onion - finely chopped",
      "2 green chilies - finely chopped",
      "Salt and black pepper to taste",
      "Oil for cooking"
    ],
    stepsRaw: [
      "Cook the paratha on a hot tawa for 1 minute on each side until half done.",
      "In a bowl, beat the eggs with chopped onions, green chilies, salt, and pepper.",
      "Pour the egg mixture over the paratha on the tawa.",
      "Top with the second paratha and press gently.",
      "Flip carefully and cook until the egg is set and the parathas are golden brown.",
      "Serve hot with chai or yogurt."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 15,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Omelette with Toast",
    tagline: "Simple egg dinner - light and fast",
    image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
    category: "Light Dinner",
    subCategory: "Breakfast for Dinner",
    cuisine: "International",
    ingredientsRaw: [
      "3 large eggs",
      "1 medium onion - finely chopped",
      "1 medium tomato - finely chopped",
      "2 green chilies - finely chopped",
      "2 slices of bread",
      "Butter for cooking",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "In a bowl, beat the eggs with onions, tomatoes, green chilies, salt, and pepper.",
      "Heat butter in a pan over medium heat. Pour the egg mixture into the pan.",
      "Cook for 2-3 minutes until the bottom is set. Flip and cook the other side for 1-2 minutes.",
      "Toast the bread slices until golden.",
      "Serve the omelette with the toast."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Bread Omelette",
    tagline: "Bread with egg - crispy and delicious",
    image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
    category: "Light Dinner",
    subCategory: "Breakfast for Dinner",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "2 large eggs",
      "2 slices of bread",
      "1 medium onion - finely chopped",
      "2 green chilies - finely chopped",
      "Butter for cooking",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "In a bowl, beat the eggs with onions, green chilies, salt, and pepper.",
      "Dip each bread slice into the egg mixture, coating both sides.",
      "Heat butter in a pan over medium heat. Place the egg-coated bread slices in the pan.",
      "Cook for 2-3 minutes per side until golden brown and crispy.",
      "Serve hot with ketchup."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },

  // ==================== YOGURT BASED (3) ====================
  {
    title: "Dahi Bhalla",
    tagline: "Lentil fritters in yogurt - classic chaat",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    category: "Light Dinner",
    subCategory: "Yogurt Based",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "For bhallas: 1 cup urad dal - soaked for 4 hours",
      "1 teaspoon ginger paste",
      "Salt to taste",
      "Oil for deep frying",
      "For serving: 2 cups plain yogurt - beaten",
      "Tamarind chutney",
      "Green chutney",
      "Chaat masala",
      "Roasted cumin powder",
      "Red chili powder"
    ],
    stepsRaw: [
      "Drain the soaked urad dal and grind to a smooth paste with a little water.",
      "Add ginger paste and salt. Whisk the batter vigorously for 5-7 minutes until fluffy.",
      "Heat oil in a deep pan. Drop small portions of the batter into the hot oil.",
      "Deep fry until golden brown and crispy. Drain on paper towels.",
      "Soak the fried bhallas in warm water for 15-20 minutes.",
      "Gently squeeze out the water from each bhalla.",
      "Arrange the bhallas in a serving dish. Pour beaten yogurt over them.",
      "Top with tamarind chutney and green chutney.",
      "Sprinkle chaat masala, cumin powder, and red chili powder.",
      "Chill before serving."
    ],
    isVegetarian: true,
    difficulty: "Hard",
    cookingTime: 90,
    servings: 4,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Fruit Yogurt",
    tagline: "Yogurt with fruits - healthy dessert",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    category: "Light Dinner",
    subCategory: "Yogurt Based",
    cuisine: "International",
    ingredientsRaw: [
      "1 cup plain yogurt",
      "1 apple - chopped",
      "1 banana - sliced",
      "1 tablespoon honey",
      "2 tablespoons mixed nuts - chopped",
      "1/2 teaspoon cardamom powder"
    ],
    stepsRaw: [
      "Beat the yogurt in a bowl until smooth and creamy.",
      "Add honey and cardamom powder. Mix well.",
      "Add the chopped apple and banana slices. Stir gently.",
      "Top with chopped nuts.",
      "Serve chilled."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Raita",
    tagline: "Yogurt with vegetables - cooling side dish",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    category: "Light Dinner",
    subCategory: "Yogurt Based",
    cuisine: "Pakistani",
    ingredientsRaw: [
      "1 cup plain yogurt",
      "1/2 cucumber - grated",
      "1/2 teaspoon roasted cumin powder",
      "1/2 teaspoon chaat masala",
      "Salt to taste",
      "Fresh coriander for garnish"
    ],
    stepsRaw: [
      "Beat the yogurt in a bowl until smooth and creamy.",
      "Squeeze out excess water from the grated cucumber.",
      "Add the cucumber to the yogurt. Mix well.",
      "Add roasted cumin powder, chaat masala, and salt. Mix again.",
      "Garnish with fresh coriander.",
      "Serve chilled."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 10,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },

  // ==================== LIGHT FAST FOOD (3) ====================
  {
    title: "Chicken Burger",
    tagline: "Simple chicken burger - homemade",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
    category: "Light Dinner",
    subCategory: "Fast Food",
    cuisine: "International",
    ingredientsRaw: [
      "1 burger bun",
      "1 chicken patty (homemade or frozen)",
      "Lettuce leaves",
      "1 slice of tomato",
      "1 slice of onion",
      "1 tablespoon mayonnaise",
      "1 teaspoon ketchup"
    ],
    stepsRaw: [
      "Toast the burger bun on a hot pan until lightly golden.",
      "Cook the chicken patty according to package instructions or pan-fry until golden and cooked through.",
      "Spread mayonnaise on the bottom bun and ketchup on the top bun.",
      "Place lettuce, the chicken patty, tomato slice, and onion slice on the bottom bun.",
      "Cover with the top bun.",
      "Serve immediately with fries."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 15,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Chicken Nuggets",
    tagline: "Crispy chicken nuggets - kids favorite",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
    category: "Light Dinner",
    subCategory: "Fast Food",
    cuisine: "International",
    ingredientsRaw: [
      "200g chicken breast - cut into small cubes",
      "1/2 cup all-purpose flour",
      "1 large egg - beaten",
      "1 cup breadcrumbs",
      "1 teaspoon red chili powder",
      "1/2 teaspoon garlic powder",
      "Salt to taste",
      "Oil for deep frying"
    ],
    stepsRaw: [
      "Season the chicken cubes with red chili powder, garlic powder, and salt.",
      "Set up a breading station: flour in one bowl, beaten egg in another, breadcrumbs in a third.",
      "Coat each chicken piece in flour, then dip in egg, then coat in breadcrumbs.",
      "Heat oil in a deep pan over medium heat.",
      "Deep fry the chicken nuggets for 3-4 minutes until golden brown and cooked through.",
      "Drain on paper towels and serve hot with ketchup."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 20,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "French Fries",
    tagline: "Crispy potato fries - perfect snack",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add",
    category: "Light Dinner",
    subCategory: "Fast Food",
    cuisine: "International",
    ingredientsRaw: [
      "3 large potatoes",
      "Oil for deep frying",
      "Salt to taste",
      "Chaat masala for sprinkling"
    ],
    stepsRaw: [
      "Peel the potatoes and cut them into thin, even strips (about 1/4 inch thick).",
      "Soak the potato strips in cold water for 30 minutes to remove excess starch.",
      "Drain and pat dry completely with paper towels.",
      "Heat oil in a deep pan over medium heat.",
      "Deep fry the potatoes in batches for 3-4 minutes until golden and crispy.",
      "Remove with a slotted spoon and drain on paper towels.",
      "Sprinkle with salt and chaat masala.",
      "Serve hot."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 25,
    servings: 3,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },

   // ==================== GRILLED ITEMS (2) ====================
  {
    title: "Grilled Fish",
    tagline: "Light grilled fish - healthy and delicious",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    category: "Light Dinner",
    subCategory: "Grilled",
    cuisine: "International",
    ingredientsRaw: [
      "200g firm white fish fillet (salmon, cod, or sea bass)",
      "1 tablespoon lemon juice",
      "1 teaspoon garlic paste",
      "1 teaspoon red chili powder",
      "1/2 teaspoon cumin powder",
      "Salt to taste",
      "1 tablespoon oil for grilling"
    ],
    stepsRaw: [
      "Wash the fish fillet and pat dry with paper towels.",
      "In a small bowl, mix lemon juice, garlic paste, red chili powder, cumin powder, and salt.",
      "Apply the marinade to the fish fillet and let it rest for 15-20 minutes.",
      "Heat a grill pan or tawa over medium heat. Brush with oil.",
      "Place the fish fillet on the hot pan. Cook for 3-4 minutes per side until golden and cooked through.",
      "Serve hot with a side salad and lemon wedges."
    ],
    isVegetarian: false,
    difficulty: "Easy",
    cookingTime: 20,
    servings: 1,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  },
  {
    title: "Grilled Vegetables",
    tagline: "Charred vegetable platter - light and healthy",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
    category: "Light Dinner",
    subCategory: "Grilled",
    cuisine: "International",
    ingredientsRaw: [
      "1 zucchini - sliced",
      "1 capsicum (bell pepper) - sliced",
      "1 onion - sliced into rings",
      "1 tomato - thick slices",
      "2 tablespoons olive oil",
      "1 teaspoon dried oregano",
      "Salt and black pepper to taste"
    ],
    stepsRaw: [
      "In a large bowl, combine all the sliced vegetables.",
      "Add olive oil, oregano, salt, and black pepper. Toss well to coat.",
      "Heat a grill pan or tawa over medium-high heat.",
      "Place the vegetables in a single layer on the hot pan.",
      "Grill for 2-3 minutes per side until char marks appear and vegetables are tender-crisp.",
      "Serve hot with mint chutney."
    ],
    isVegetarian: true,
    difficulty: "Easy",
    cookingTime: 15,
    servings: 2,
    isActive: true,
      isHalal: true,
    budget: "economy",
mealTime: ["Dinner"],
ageGroup: ["adults", "seniors", "kids"],
patientFriendly: ["general", "diabetes", "heart", "bp", "lowsalt", "lowfat"]
  }
];

async function migrate() {
  try {
    console.log('🔌 Connecting to MongoDB...');
const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGOURI;
if (!mongoURI) throw new Error('MongoDB URI not found');
await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000, family: 4 });   
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