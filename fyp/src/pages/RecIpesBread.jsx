import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesBread.css';

const RecipesBread = () => {
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // All Bread Recipes (30+ recipes)
  const breadRecipes = [
    // ==================== ROTI (4) ====================
    { 
      id: 1, 
      name: "Tawa Roti",
      tagline: "Simple whole wheat flatbread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups whole wheat flour",
        "Water as needed",
        "1 tsp salt",
        "1 tbsp oil",
        "Extra flour for dusting"
      ],
      steps: [
        "Mix flour and salt in a bowl.",
        "Add water gradually and knead into soft dough.",
        "Add oil and knead for 5 minutes.",
        "Cover and rest for 30 minutes.",
        "Divide dough into small balls.",
        "Roll each ball into circle using rolling pin.",
        "Heat tawa, cook roti on both sides.",
        "Press with cloth to puff up.",
        "Serve hot with curry."
      ]
    },
    { 
      id: 2, 
      name: "Phulka",
      tagline: "Puffed roti cooked on direct flame",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups whole wheat flour",
        "Water as needed",
        "1 tsp salt",
        "1 tbsp oil"
      ],
      steps: [
        "Knead soft dough with flour, salt and water.",
        "Rest for 30 minutes.",
        "Roll into medium-thick circles.",
        "Cook on tawa until spots appear.",
        "Place directly on flame until puffed.",
        "Serve hot with butter."
      ]
    },
    { 
      id: 3, 
      name: "Jowar Roti",
      tagline: "Sorghum flatbread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups jowar flour",
        "Hot water as needed",
        "1 tsp salt",
        "1 tbsp oil"
      ],
      steps: [
        "Mix flour and salt.",
        "Add hot water gradually and knead.",
        "Make dough balls while warm.",
        "Roll between plastic sheets.",
        "Cook on tawa on both sides.",
        "Serve hot with curry."
      ]
    },
    { 
      id: 4, 
      name: "Bajra Roti",
      tagline: "Pearl millet flatbread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups bajra flour",
        "Hot water",
        "1 tsp salt",
        "1 tbsp ghee"
      ],
      steps: [
        "Knead dough with hot water.",
        "Make balls and pat with hands.",
        "Cook on tawa with ghee.",
        "Serve hot with butter."
      ]
    },

    // ==================== PARATHA (6) ====================
    { 
      id: 5, 
      name: "Simple Paratha",
      tagline: "Layered flatbread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups whole wheat flour",
        "Water as needed",
        "1 tsp salt",
        "2 tbsp oil",
        "Extra oil for cooking"
      ],
      steps: [
        "Knead dough with flour, salt and water.",
        "Rest for 30 minutes.",
        "Roll into circle, apply oil and fold.",
        "Roll again into circle.",
        "Cook on tawa with oil until golden.",
        "Serve with yogurt or pickle."
      ]
    },
    { 
      id: 6, 
      name: "Lachha Paratha",
      tagline: "Layered flaky paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "Water",
        "1 tsp salt",
        "2 tbsp oil",
        "Oil for cooking"
      ],
      steps: [
        "Knead soft dough.",
        "Roll thin, apply oil and sprinkle flour.",
        "Fold like fan, then coil.",
        "Roll into circle.",
        "Cook with oil until crisp."
      ]
    },
    { 
      id: 7, 
      name: "Aloo Paratha",
      tagline: "Potato stuffed paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "3 potatoes, boiled and mashed",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tsp cumin powder",
        "1 tsp red chili",
        "1/2 tsp garam masala",
        "Salt to taste",
        "Oil for cooking"
      ],
      steps: [
        "Mix mashed potatoes with onions, chilies and spices.",
        "Knead dough and make balls.",
        "Stuff potato mixture in dough.",
        "Roll carefully and cook with oil.",
        "Serve with butter and yogurt."
      ]
    },
    { 
      id: 8, 
      name: "Gobhi Paratha",
      tagline: "Cauliflower stuffed paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1 cup cauliflower, grated",
        "1 onion, chopped",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp red chili",
        "Salt to taste",
        "Oil for cooking"
      ],
      steps: [
        "Mix grated cauliflower with spices.",
        "Stuff in dough balls.",
        "Roll and cook with oil.",
        "Serve with pickle."
      ]
    },
    { 
      id: 9, 
      name: "Mooli Paratha",
      tagline: "Radish stuffed paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1 radish, grated",
        "1 onion, chopped",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp red chili",
        "Salt to taste",
        "Oil for cooking"
      ],
      steps: [
        "Squeeze water from grated radish.",
        "Mix with spices.",
        "Stuff in dough and cook.",
        "Serve with yogurt."
      ]
    },
    { 
      id: 10, 
      name: "Paneer Paratha",
      tagline: "Cottage cheese stuffed paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "200g paneer, grated",
        "1 onion, chopped",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp red chili",
        "1/2 tsp garam masala",
        "Salt to taste",
        "Oil for cooking"
      ],
      steps: [
        "Mix paneer with onions, chilies and spices.",
        "Stuff in dough.",
        "Roll and cook with oil.",
        "Serve with chutney."
      ]
    },

    // ==================== NAAN (5) ====================
    { 
      id: 11, 
      name: "Tandoori Naan",
      tagline: "Restaurant style naan",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups all-purpose flour",
        "1/2 cup yogurt",
        "1 tsp yeast",
        "1 tsp sugar",
        "1 tsp salt",
        "1 tbsp oil",
        "Water as needed",
        "Butter for brushing"
      ],
      steps: [
        "Dissolve yeast and sugar in warm water.",
        "Mix flour, salt, yogurt and yeast mixture.",
        "Knead soft dough, rest for 2 hours.",
        "Divide into balls, roll into teardrop shape.",
        "Cook in preheated tandoor or oven at 250°C.",
        "Brush with butter and serve."
      ]
    },
    { 
      id: 12, 
      name: "Garlic Naan",
      tagline: "Naan with garlic butter",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp yeast",
        "1 tsp sugar",
        "1 tsp salt",
        "2 tbsp garlic, chopped",
        "Butter for brushing",
        "Fresh coriander"
      ],
      steps: [
        "Prepare naan dough and rise.",
        "Roll naan, sprinkle garlic.",
        "Bake until golden.",
        "Brush with garlic butter and coriander."
      ]
    },
    { 
      id: 13, 
      name: "Butter Naan",
      tagline: "Soft naan with butter",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp yeast",
        "1 tsp sugar",
        "1 tsp salt",
        "Butter for brushing"
      ],
      steps: [
        "Make naan dough.",
        "Roll and bake.",
        "Brush generously with butter.",
        "Serve hot."
      ]
    },
    { 
      id: 14, 
      name: "Cheese Naan",
      tagline: "Naan stuffed with cheese",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp yeast",
        "1 tsp sugar",
        "1 tsp salt",
        "1/2 cup grated cheese",
        "Butter"
      ],
      steps: [
        "Prepare naan dough.",
        "Stuff with cheese before rolling.",
        "Bake and brush with butter.",
        "Serve hot."
      ]
    },
    { 
      id: 15, 
      name: "Peshawari Naan",
      tagline: "Naan stuffed with nuts and coconut",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp yeast",
        "1 tsp sugar",
        "1 tsp salt",
        "For filling: coconut, almonds, pistachios, sugar",
        "Butter"
      ],
      steps: [
        "Mix filling ingredients.",
        "Stuff in naan dough.",
        "Roll and bake.",
        "Brush with butter."
      ]
    }
  ];
    // More recipes continue...
  const moreBreadRecipes = [
    // ==================== ROGHNI NAAN (3) ====================
    { 
      id: 16, 
      name: "Roghni Naan",
      tagline: "Traditional sesame naan",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp yeast",
        "1 tsp sugar",
        "1 tsp salt",
        "2 tbsp oil",
        "Sesame seeds for topping",
        "Butter for brushing"
      ],
      steps: [
        "Dissolve yeast and sugar in warm water.",
        "Mix flour, salt, yogurt, oil and yeast mixture.",
        "Knead soft dough, rest for 2 hours.",
        "Divide into balls, roll into shape.",
        "Sprinkle sesame seeds.",
        "Bake in hot oven until golden.",
        "Brush with butter and serve."
      ]
    },
    { 
      id: 17, 
      name: "Kabuli Naan",
      tagline: "Afghan style naan",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp yeast",
        "1 tsp sugar",
        "1 tsp salt",
        "2 tbsp oil",
        "Nigella seeds",
        "Butter"
      ],
      steps: [
        "Prepare dough and rise.",
        "Roll into oblong shape.",
        "Sprinkle nigella seeds.",
        "Bake until golden.",
        "Brush with butter."
      ]
    },
    { 
      id: 18, 
      name: "Ammi's Roghni Naan",
      tagline: "Homestyle roghni naan",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp baking powder",
        "1 tsp sugar",
        "1 tsp salt",
        "2 tbsp oil",
        "Milk for brushing",
        "Sesame seeds"
      ],
      steps: [
        "Mix all ingredients with milk to make dough.",
        "Rest for 1 hour.",
        "Roll and sprinkle sesame.",
        "Cook on tawa with oil.",
        "Serve hot."
      ]
    },

    // ==================== SHEERMAL (2) ====================
    { 
      id: 19, 
      name: "Sheermal",
      tagline: "Saffron flavored sweet flatbread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup milk",
        "1/4 cup sugar",
        "1/4 cup ghee",
        "1/2 tsp saffron strands",
        "1/2 tsp cardamom powder",
        "1 tsp yeast",
        "1 tsp salt"
      ],
      steps: [
        "Warm milk and add saffron.",
        "Dissolve yeast and sugar in milk.",
        "Mix flour, cardamom, salt and ghee.",
        "Add milk mixture and knead soft dough.",
        "Rest for 2 hours.",
        "Divide into balls, roll thick.",
        "Bake in oven at 180°C for 15 minutes.",
        "Brush with milk and serve."
      ]
    },
    { 
      id: 20, 
      name: "Kashmiri Sheermal",
      tagline: "Kashmiri style sheermal",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup milk",
        "1/4 cup sugar",
        "1/4 cup ghee",
        "1/2 tsp saffron",
        "1/2 tsp cardamom",
        "1 tsp yeast",
        "Poppy seeds"
      ],
      steps: [
        "Prepare sheermal dough.",
        "Roll and sprinkle poppy seeds.",
        "Bake until golden.",
        "Serve warm."
      ]
    },

    // ==================== KULCHA (3) ====================
    { 
      id: 21, 
      name: "Plain Kulcha",
      tagline: "Leavened flatbread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp baking powder",
        "1 tsp sugar",
        "1 tsp salt",
        "2 tbsp oil",
        "Milk for brushing"
      ],
      steps: [
        "Mix all ingredients to make soft dough.",
        "Rest for 1 hour.",
        "Divide into balls, roll out.",
        "Cook on tawa with oil.",
        "Brush with milk and serve."
      ]
    },
    { 
      id: 22, 
      name: "Aloo Kulcha",
      tagline: "Potato stuffed kulcha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp baking powder",
        "For filling: 2 potatoes boiled",
        "1 onion chopped",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp red chili",
        "Salt to taste"
      ],
      steps: [
        "Make kulcha dough.",
        "Mix mashed potatoes with spices for filling.",
        "Stuff filling in dough balls.",
        "Roll and cook on tawa with oil.",
        "Serve with chole."
      ]
    },
    { 
      id: 23, 
      name: "Paneer Kulcha",
      tagline: "Paneer stuffed kulcha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "1/2 cup yogurt",
        "1 tsp baking powder",
        "For filling: 200g paneer grated",
        "1 onion chopped",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp red chili",
        "Salt to taste"
      ],
      steps: [
        "Make dough.",
        "Mix paneer filling.",
        "Stuff and roll.",
        "Cook on tawa.",
        "Serve with chutney."
      ]
    },

    // ==================== BREAD PAKORA (2) ====================
    { 
      id: 24, 
      name: "Bread Pakora",
      tagline: "Fried bread fritters",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "8 bread slices",
        "1 cup besan",
        "1 onion, chopped",
        "2 green chilies, chopped",
        "1 tsp red chili powder",
        "1/2 tsp turmeric",
        "1 tsp cumin seeds",
        "Salt to taste",
        "Oil for frying"
      ],
      steps: [
        "Mix besan with water to make thick batter.",
        "Add onions, chilies and spices.",
        "Dip bread slices in batter.",
        "Deep fry until golden.",
        "Serve with chutney."
      ]
    },
    { 
      id: 25, 
      name: "Aloo Bread Pakora",
      tagline: "Bread pakora with potato filling",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "8 bread slices",
        "2 potatoes boiled and mashed",
        "1 onion chopped",
        "2 green chilies",
        "1 tsp chaat masala",
        "1 cup besan",
        "Spices for batter",
        "Oil for frying"
      ],
      steps: [
        "Mix potatoes with onions, chilies and chaat masala.",
        "Make besan batter.",
        "Spread potato mixture on bread, cover with another slice.",
        "Dip in batter and deep fry.",
        "Serve hot."
      ]
    },

    // ==================== BREAD SANDWICH (3) ====================
    { 
      id: 26, 
      name: "Grilled Sandwich",
      tagline: "Classic grilled sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "8 bread slices",
        "Butter",
        "2 potatoes boiled and sliced",
        "1 cucumber sliced",
        "1 tomato sliced",
        "1 onion sliced",
        "Chaat masala",
        "Green chutney"
      ],
      steps: [
        "Butter bread slices.",
        "Spread chutney on one slice.",
        "Layer vegetables, sprinkle chaat masala.",
        "Cover with another slice.",
        "Grill in sandwich maker until golden.",
        "Serve with ketchup."
      ]
    },
    { 
      id: 27, 
      name: "Bombay Sandwich",
      tagline: "Mumbai style grilled sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "8 bread slices",
        "Butter",
        "Potatoes boiled sliced",
        "Cucumber sliced",
        "Tomato sliced",
        "Onion sliced",
        "Green chutney",
        "Chaat masala",
        "Cheese slices"
      ],
      steps: [
        "Butter bread, spread chutney.",
        "Layer vegetables and cheese.",
        "Sprinkle chaat masala.",
        "Grill until golden.",
        "Serve hot."
      ]
    },
    { 
      id: 28, 
      name: "Cheese Sandwich",
      tagline: "Cheese grilled sandwich",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "8 bread slices",
        "Butter",
        "Cheese slices",
        "Tomato slices",
        "Oregano",
        "Chili flakes"
      ],
      steps: [
        "Butter bread.",
        "Place cheese and tomato.",
        "Sprinkle oregano and chili flakes.",
        "Grill until cheese melts.",
        "Serve hot."
      ]
    },

    // ==================== BREAD ROLL (2) ====================
    { 
      id: 29, 
      name: "Bread Roll",
      tagline: "Crispy bread rolls",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "8 bread slices",
        "2 potatoes boiled and mashed",
        "1 onion chopped",
        "2 green chilies",
        "1 tsp red chili",
        "1/2 tsp garam masala",
        "Salt to taste",
        "Breadcrumbs",
        "Oil for frying"
      ],
      steps: [
        "Mix potatoes with onions, chilies and spices.",
        "Roll bread slices thin, cut edges.",
        "Place filling, roll and seal.",
        "Dip in water, coat with breadcrumbs.",
        "Deep fry until golden.",
        "Serve with sauce."
      ]
    },
    { 
      id: 30, 
      name: "Veg Bread Roll",
      tagline: "Vegetable bread rolls",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "8 bread slices",
        "1 cup mixed vegetables cooked",
        "1 onion chopped",
        "2 green chilies",
        "1 tsp chaat masala",
        "Breadcrumbs",
        "Oil for frying"
      ],
      steps: [
        "Mix vegetables with spices.",
        "Roll bread, fill and seal.",
        "Coat with breadcrumbs.",
        "Fry until golden.",
        "Serve."
      ]
    }
  ];
    // Final recipes...
  const finalBreadRecipes = [
    // ==================== SWEET BREAD (3) ====================
    { 
      id: 31, 
      name: "Meetha Paratha",
      tagline: "Sweet stuffed paratha",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups flour",
        "For filling: 1/2 cup grated jaggery",
        "2 tbsp coconut grated",
        "2 tbsp nuts crushed",
        "1/2 tsp cardamom",
        "Ghee for cooking"
      ],
      steps: [
        "Mix filling ingredients.",
        "Knead dough.",
        "Stuff filling in dough balls.",
        "Roll and cook with ghee.",
        "Serve hot."
      ]
    },
    { 
      id: 32, 
      name: "Banana Bread",
      tagline: "Sweet banana bread",
      image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
      ingredients: [
        "2 cups flour",
        "3 ripe bananas mashed",
        "1/2 cup sugar",
        "1/4 cup oil",
        "1 tsp baking soda",
        "1 tsp vanilla",
        "1/2 cup nuts"
      ],
      steps: [
        "Mix mashed bananas with sugar and oil.",
        "Add flour and baking soda.",
        "Add nuts and vanilla.",
        "Pour in loaf pan.",
        "Bake at 180°C for 50 minutes.",
        "Cool and slice."
      ]
    },
    { 
      id: 33, 
      name: "Puri",
      tagline: "Deep fried Indian bread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups whole wheat flour",
        "Water as needed",
        "1 tsp salt",
        "1 tbsp oil",
        "Oil for deep frying"
      ],
      steps: [
        "Knead stiff dough with flour, salt and water.",
        "Add oil and knead well.",
        "Rest for 30 minutes.",
        "Roll into small circles.",
        "Deep fry in hot oil until puffed.",
        "Serve with chole or halwa."
      ]
    },
    { 
      id: 34, 
      name: "Bhatura",
      tagline: "Fried leavened bread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups all-purpose flour",
        "1/4 cup semolina",
        "1/2 cup yogurt",
        "1 tsp baking powder",
        "1 tsp sugar",
        "1 tsp salt",
        "Oil for frying"
      ],
      steps: [
        "Mix all ingredients with water to make soft dough.",
        "Rest for 2 hours.",
        "Roll into large circles.",
        "Deep fry until golden and puffed.",
        "Serve with chole."
      ]
    },
    { 
      id: 35, 
      name: "Roomali Roti",
      tagline: "Handkerchief thin bread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups all-purpose flour",
        "Water as needed",
        "1 tsp salt",
        "1 tbsp oil"
      ],
      steps: [
        "Knead very soft dough.",
        "Rest for 1 hour.",
        "Roll extremely thin.",
        "Cook on inverted tawa or hot surface.",
        "Fold and serve."
      ]
    },
    { 
      id: 36, 
      name: "Missi Roti",
      tagline: "Spiced gram flour flatbread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "1 cup whole wheat flour",
        "1 cup besan",
        "1 onion chopped",
        "2 green chilies",
        "1 tsp cumin",
        "1 tsp red chili",
        "1/2 tsp turmeric",
        "2 tbsp oil",
        "Salt to taste",
        "Water to knead"
      ],
      steps: [
        "Mix flours, spices, onions and chilies.",
        "Add oil and water to knead dough.",
        "Rest for 30 minutes.",
        "Roll and cook on tawa with oil.",
        "Serve with butter."
      ]
    },
    { 
      id: 37, 
      name: "Thepla",
      tagline: "Gujarati spiced flatbread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups whole wheat flour",
        "1/2 cup besan",
        "1 cup methi leaves chopped",
        "1 tsp ginger-chili paste",
        "1 tsp cumin",
        "1 tsp red chili",
        "1/2 tsp turmeric",
        "2 tbsp oil",
        "Salt to taste",
        "Yogurt for kneading"
      ],
      steps: [
        "Mix all ingredients with yogurt to make dough.",
        "Rest for 30 minutes.",
        "Roll thin and cook on tawa with oil.",
        "Serve with pickle."
      ]
    },
    { 
      id: 38, 
      name: "Makki di Roti",
      tagline: "Cornmeal flatbread",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      ingredients: [
        "2 cups makki ka atta",
        "Hot water as needed",
        "Salt to taste",
        "Ghee for cooking"
      ],
      steps: [
        "Mix flour and salt.",
        "Add hot water gradually and knead.",
        "Make balls and pat with hands.",
        "Cook on tawa with ghee.",
        "Serve with sarson ka saag."
      ]
    }
  ];

  // Combine all arrays
  const allBreadRecipes = [...breadRecipes, ...moreBreadRecipes, ...finalBreadRecipes];
  // ==================== FUNCTIONS & LOGIC ====================

  // Filter to show all recipes
  const recipesList = allBreadRecipes;

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
    <div className="bread-page">
      {/* Header */}
      <header className="bread-header">
        <div className="bread-header-content">
          <h1 className="bread-title">🍞 Breads</h1>
          <p className="bread-description">
            Discover 35+ delicious bread recipes - roti, paratha, naan, kulcha, sheermal aur bhi bahut kuch
          </p>
        </div>
      </header>

      {/* Main Content - Grid */}
      <main className="bread-main">
        <div className="bread-grid-section">
          <div className="bread-grid">
            {recipesList.map((recipe) => (
              <div
                key={recipe.id}
                className="bread-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="bread-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="bread-card-content">
                  <h3 className="bread-card-title">{recipe.name}</h3>
                  <p className="bread-card-description">{recipe.tagline}</p>
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
        <div className="bread-modal-overlay" onClick={handleCloseModal}>
          <div
            className="bread-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="bread-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="bread-modal-header">
              <div className="bread-modal-title">
                <h2>{selectedRecipe.name}</h2>
              </div>
            </div>

            <div className="bread-modal-content">
              {/* Column 1: Ingredients */}
              <div className="bread-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="bread-ingredients-list">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="bread-ingredient-item">
                      <span className="bread-ingredient-bullet">•</span>
                      <span className="bread-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Steps */}
              <div className="bread-modal-steps">
                <h3>Steps to Make</h3>
                <div className="bread-steps-list">
                  {selectedRecipe.steps.map((step, index) => (
                    <div key={index} className="bread-step-item">
                      <span className="bread-step-number">{index + 1}.</span>
                      <span className="bread-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Voice Instructions */}
              <div className="bread-modal-voice-container">
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

export default RecipesBread;