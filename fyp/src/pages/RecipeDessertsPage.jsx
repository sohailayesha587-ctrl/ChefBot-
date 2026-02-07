

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeDessertsPage.css';

const RecipeDessertsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceInstructions, setShowVoiceInstructions] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);
  const autoPlayStartedRef = useRef(false);

  // Dessert images array
  const dessertImages = [
    "https://www.pamperedchef.com/iceberg/com/recipe/90681-lg.jpg", // Banana Bread
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTteHOGvjLLeBttASHPCw_KgtqDygdeOknrZQ&s", // Mango Caramel Delight
    "https://www.tasteofhome.com/wp-content/uploads/2025/03/Chocolate-Delight_EXPS_TOHcom25_187568_MD_P2_02_14_16.jpg", // Chocolate Delight
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSauqIWN0iDBYFhBxMDLlVESIsOoOdPMPUYkQ&s", // Suji Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwcJMdLwL7F8K5JjD7oiePvPBGgePsEUOKA&s", // Sweet Dumplings
    "https://www.tasteofhome.com/wp-content/uploads/2018/01/Cherry-Delight-Dessert_EXPS_TOHcom23_27515_P2_MD_03_22_4b.jpg", // Cherry Delight
    "https://cdn.shopify.com/s/files/1/2352/6587/files/Sicilian_watermelon_pudding_480x480.jpg?v=1688077194", // Watermelon Pudding
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQku-7sjzuSPoVKz1VQIvQqlj6xtAY7WREZow&s", // Custard Falooda
    "https://ninjacreamiicecream.com/wordpress/wp-content/uploads/2024/10/Custard-Ice-Cream-Recipe-500x500.jpg", // Custard Ice Cream
    "https://naturalicecreams.in/wp-content/uploads/2023/07/MALAI-BREAD-PUDDING.png", // Bread Malai Pudding
    "https://www.recipetineats.com/tachyon/2025/09/Panna-cotta_9.jpg", // Custard Panna Cotta
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR55pxjaeiqH06OeQokjJFocol63vD2UQSikw&s", // Qissa Khawani Kheer
    "https://img-global.cpcdn.com/recipes/e35cd0f4072233d3/680x781cq80/walnut-halwa-recipe-main-photo.jpg", // Walnut Halwa
    "https://images.squarespace-cdn.com/content/v1/62ec1fc995263d65f21175de/2e262f7b-92d1-4e3d-8bf3-d7bac61af1c1/cinnamonrolls9.jpg", // Cinnamon Rolls
    "https://i0.wp.com/aartimadan.com/wp-content/uploads/2019/08/gulab-jamun-recipe-1.jpg?fit=750%2C421&ssl=1", // Bread Gulab Jamun
    "https://www.tasteofhome.com/wp-content/uploads/2023/07/mango-delight-072823-TOH-09-Lauren-Habermehl-JVedit.jpg?fit=680%2C454", // Creamy Mango Delight
    "https://www.cookwithmanali.com/wp-content/uploads/2025/09/Date-bites-arranged-in-a-golden-plate-1200x1818.jpg", // Kunafa Dates
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2YS3_T7G2vIvvf1fMG3-PExF2TgyvXvS9Tw&s", // Kunafa Chocolate
    "https://images.squarespace-cdn.com/content/v1/619f613dde2c6f4f7f9e84a2/164a93e5-c164-4274-8178-b36163c7795f/image00005.jpeg", // Chocolate Strawberry Crepes
    "https://i.ytimg.com/vi/iDcekQeBGOY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD3qP3vvqf2_13B9Aqippq2G5QxXA"  // Sweet Milk Balls
  ];

  // All Desserts Data with Complete Recipes
  const desserts = [
    { 
      id: 1, 
      name: "Banana Bread Recipe",
      ingredients: [
        "3 ripe bananas, mashed",
        "1/3 cup melted butter",
        "1 cup sugar",
        "1 egg, beaten",
        "1 teaspoon vanilla extract",
        "1 teaspoon baking soda",
        "Pinch of salt",
        "1 1/2 cups all-purpose flour",
        "1/2 cup chopped walnuts (optional)"
      ],
      instructions: [
        "Preheat oven to 350°F (175°C). Grease a 9x5 inch loaf pan.",
        "In a large bowl, mash the ripe bananas with a fork until smooth.",
        "Stir the melted butter into the mashed bananas.",
        "Mix in the sugar, egg, and vanilla extract until well combined.",
        "Add the baking soda and salt, and mix thoroughly.",
        "Gradually add the flour, mixing until just incorporated.",
        "Fold in chopped walnuts if using.",
        "Pour batter into prepared loaf pan.",
        "Bake for 60-65 minutes, or until a toothpick inserted comes out clean.",
        "Cool in pan for 10 minutes, then transfer to wire rack to cool completely."
      ]
    },
    { 
      id: 2, 
      name: "Mango Caramel Delight Recipe",
      ingredients: [
        "2 large ripe mangoes, peeled and diced",
        "1 cup sugar (for caramel)",
        "1/4 cup water",
        "1 cup heavy cream",
        "1 teaspoon vanilla extract",
        "1/2 cup condensed milk",
        "1/2 cup whipped cream",
        "1/4 cup chopped pistachios for garnish"
      ],
      instructions: [
        "To make caramel: Heat sugar and water in a pan on medium heat.",
        "Cook without stirring until sugar melts and turns golden brown.",
        "Carefully add heavy cream while stirring continuously.",
        "Cook for 2-3 minutes until smooth caramel forms.",
        "Remove from heat and stir in vanilla extract.",
        "Let caramel cool completely.",
        "In a blender, blend 1 1/2 mangoes with condensed milk until smooth.",
        "In serving glasses, layer mango puree, caramel sauce, and whipped cream.",
        "Top with remaining diced mangoes.",
        "Garnish with chopped pistachios and serve chilled."
      ]
    },
    { 
      id: 3, 
      name: "Chocolate Delight Recipe",
      ingredients: [
        "1 1/2 cups chocolate cookies, crushed",
        "1/2 cup melted butter",
        "1 cup semi-sweet chocolate chips",
        "1 cup heavy cream",
        "1/2 cup sugar",
        "1 teaspoon vanilla extract",
        "2 cups whipped cream",
        "Chocolate shavings for garnish"
      ],
      instructions: [
        "Mix crushed cookies with melted butter until well combined.",
        "Press mixture into bottom of serving glasses to form base.",
        "Refrigerate for 15 minutes to set.",
        "Heat heavy cream in saucepan until steaming hot but not boiling.",
        "Pour hot cream over chocolate chips, let sit for 2 minutes.",
        "Whisk until smooth and glossy chocolate ganache forms.",
        "Stir in sugar and vanilla extract until dissolved.",
        "Let ganache cool to room temperature.",
        "Layer whipped cream over cookie base in glasses.",
        "Pour chocolate ganache over whipped cream.",
        "Top with more whipped cream and chocolate shavings.",
        "Chill for at least 2 hours before serving."
      ]
    },
    { 
      id: 4, 
      name: "Suji Cake Recipe",
      ingredients: [
        "1 cup semolina (suji)",
        "1 cup sugar",
        "1 cup yogurt",
        "1/2 cup vegetable oil",
        "1/2 cup milk",
        "1 teaspoon baking powder",
        "1/2 teaspoon baking soda",
        "1 teaspoon cardamom powder",
        "1/4 cup chopped nuts (almonds, cashews)",
        "1 tablespoon ghee"
      ],
      instructions: [
        "Preheat oven to 350°F (175°C). Grease a cake pan.",
        "In a large bowl, combine semolina and yogurt.",
        "Let the mixture rest for 20 minutes to soften semolina.",
        "Add sugar and mix well until sugar dissolves.",
        "Pour in vegetable oil and milk, mix thoroughly.",
        "Add baking powder, baking soda, and cardamom powder.",
        "Mix until smooth batter forms.",
        "Heat ghee in small pan, fry nuts until golden brown.",
        "Add fried nuts to batter and mix.",
        "Pour batter into prepared cake pan.",
        "Bake for 35-40 minutes or until toothpick comes out clean.",
        "Cool completely before slicing."
      ]
    },
    { 
      id: 5, 
      name: "Sweet Dumplings Recipe",
      ingredients: [
        "1 cup all-purpose flour",
        "2 tablespoons semolina",
        "2 tablespoons ghee",
        "1/4 cup milk (or as needed)",
        "Pinch of salt",
        "1 cup sugar",
        "1 cup water",
        "4-5 cardamom pods",
        "Oil for frying",
        "Chopped pistachios for garnish"
      ],
      instructions: [
        "For syrup: Combine sugar, water, and cardamom pods in pan.",
        "Bring to boil, simmer for 10 minutes until slightly thickened.",
        "Remove from heat and keep syrup warm.",
        "For dough: Mix flour, semolina, ghee, and salt in bowl.",
        "Gradually add milk to form stiff dough.",
        "Cover dough and let rest for 15 minutes.",
        "Divide dough into small equal portions.",
        "Roll each portion into smooth balls.",
        "Heat oil in deep pan on medium heat.",
        "Fry dumplings until golden brown and puffed up.",
        "Immediately transfer hot dumplings to warm sugar syrup.",
        "Soak for 15-20 minutes, turning occasionally.",
        "Serve garnished with chopped pistachios."
      ]
    },
    { 
      id: 6, 
      name: "Cherry Delight Recipe",
      ingredients: [
        "2 cups fresh cherries, pitted",
        "1 cup cherry juice",
        "1/2 cup sugar",
        "1 tablespoon cornstarch",
        "2 tablespoons water",
        "1 cup whipped cream",
        "1 cup vanilla custard",
        "1/2 cup crushed digestive biscuits",
        "2 tablespoons melted butter"
      ],
      instructions: [
        "Mix crushed biscuits with melted butter for base.",
        "Press mixture into bottom of serving glasses.",
        "Refrigerate for 15 minutes.",
        "In saucepan, combine cherries, cherry juice, and sugar.",
        "Bring to boil, then reduce heat and simmer for 10 minutes.",
        "Mix cornstarch with water to make smooth slurry.",
        "Add slurry to cherry mixture, stirring continuously.",
        "Cook for 2-3 minutes until thickened.",
        "Remove from heat and cool completely.",
        "Layer vanilla custard over biscuit base.",
        "Top with cherry compote.",
        "Finish with whipped cream layer.",
        "Garnish with fresh cherries and serve chilled."
      ]
    },
    { 
      id: 7, 
      name: "Watermelon Pudding Recipe",
      ingredients: [
        "3 cups watermelon, deseeded and chopped",
        "1/2 cup sugar",
        "2 tablespoons agar-agar powder",
        "1/4 cup cold water",
        "1 cup milk",
        "1/4 cup condensed milk",
        "1 teaspoon vanilla extract",
        "Fresh mint leaves for garnish"
      ],
      instructions: [
        "Blend watermelon until smooth puree forms.",
        "Strain through sieve to remove any pulp.",
        "In small bowl, soak agar-agar in cold water for 10 minutes.",
        "Heat milk in saucepan, add soaked agar-agar.",
        "Cook on low heat, stirring until agar-agar dissolves completely.",
        "Add sugar and condensed milk, stir until sugar dissolves.",
        "Remove from heat and stir in watermelon puree.",
        "Add vanilla extract and mix well.",
        "Pour mixture into serving bowls or mold.",
        "Refrigerate for 3-4 hours until set.",
        "Garnish with fresh mint leaves before serving.",
        "Serve chilled."
      ]
    },
    { 
      id: 8, 
      name: "Custard Falooda Recipe",
      ingredients: [
        "2 cups milk",
        "3 tablespoons custard powder",
        "1/4 cup sugar",
        "1/2 cup falooda seeds (sabja/tukmaria)",
        "1/2 cup cooked vermicelli",
        "1/2 cup mixed fruits (mango, banana, apple)",
        "2 scoops vanilla ice cream",
        "1/4 cup rose syrup",
        "Chopped nuts for garnish"
      ],
      instructions: [
        "Soak falooda seeds in water for 30 minutes, drain.",
        "Cook vermicelli according to package instructions, drain.",
        "Mix custard powder with 1/4 cup cold milk to smooth paste.",
        "Heat remaining milk in saucepan.",
        "When milk is warm, add custard paste, stirring continuously.",
        "Add sugar and cook on medium heat until thickened.",
        "Remove from heat and cool completely.",
        "In tall glasses, add soaked falooda seeds as first layer.",
        "Add layer of cooked vermicelli.",
        "Pour cooled custard over vermicelli.",
        "Add mixed fruits as next layer.",
        "Drizzle rose syrup over fruits.",
        "Top with vanilla ice cream scoop.",
        "Garnish with chopped nuts and serve immediately."
      ]
    },
    { 
      id: 9, 
      name: "Custard Ice Cream Recipe",
      ingredients: [
        "2 cups heavy cream",
        "1 cup whole milk",
        "3/4 cup sugar",
        "4 egg yolks",
        "1 tablespoon custard powder",
        "1 teaspoon vanilla extract",
        "Pinch of salt",
        "1/4 cup chopped nuts (optional)"
      ],
      instructions: [
        "Mix custard powder with 2 tablespoons milk to smooth paste.",
        "In saucepan, heat milk and heavy cream until steaming.",
        "In separate bowl, whisk egg yolks and sugar until pale.",
        "Slowly pour hot milk mixture into egg yolks, whisking constantly.",
        "Return mixture to saucepan, add custard paste.",
        "Cook on low heat, stirring constantly until thickened.",
        "Strain through fine sieve to remove any lumps.",
        "Stir in vanilla extract and salt.",
        "Cool completely, then chill in refrigerator for 4 hours.",
        "Churn in ice cream maker according to manufacturer's instructions.",
        "If no ice cream maker, freeze mixture, stirring every 30 minutes.",
        "Fold in chopped nuts before final freezing.",
        "Freeze for at least 6 hours before serving."
      ]
    },
    { 
      id: 10, 
      name: "Bread Malai Pudding Recipe",
      ingredients: [
        "6 slices white bread, crusts removed",
        "2 cups milk",
        "1/2 cup sugar",
        "1/2 cup condensed milk",
        "1/4 cup cream",
        "1 teaspoon cardamom powder",
        "1/4 cup chopped nuts (almonds, pistachios)",
        "2 tablespoons ghee",
        "Saffron strands for garnish"
      ],
      instructions: [
        "Cut bread slices into small pieces or triangles.",
        "Heat ghee in pan, lightly toast bread pieces until golden.",
        "In saucepan, heat milk until it comes to boil.",
        "Reduce heat, add sugar and condensed milk.",
        "Cook for 10 minutes, stirring occasionally.",
        "Add toasted bread pieces to milk mixture.",
        "Cook on low heat until bread absorbs milk and softens.",
        "Add cream and cardamom powder, mix well.",
        "Remove from heat and let cool slightly.",
        "Transfer to serving dish, press gently to level.",
        "Garnish with chopped nuts and saffron strands.",
        "Chill in refrigerator for at least 2 hours.",
        "Serve cold."
      ]
    },
    { 
      id: 11, 
      name: "Custard Panna Cotta Recipe",
      ingredients: [
        "2 cups heavy cream",
        "1/2 cup sugar",
        "2 teaspoons gelatin powder",
        "1/4 cup cold water",
        "1 teaspoon vanilla extract",
        "1 cup mixed berry compote",
        "Fresh mint leaves for garnish"
      ],
      instructions: [
        "Soak gelatin in cold water for 5 minutes to bloom.",
        "Heat heavy cream and sugar in saucepan until steaming.",
        "Remove from heat, add bloomed gelatin, stir until dissolved.",
        "Add vanilla extract and mix well.",
        "Strain mixture through fine sieve.",
        "Pour into serving glasses or molds.",
        "Refrigerate for at least 4 hours until set.",
        "To serve, run knife around edges to loosen.",
        "Dip mold in warm water for few seconds if needed.",
        "Invert onto serving plate.",
        "Top with mixed berry compote.",
        "Garnish with fresh mint leaves.",
        "Serve chilled."
      ]
    },
    { 
      id: 12, 
      name: "Qissa Khawani Kheer Recipe",
      ingredients: [
        "1/2 cup basmati rice",
        "1 liter full-fat milk",
        "1/2 cup sugar",
        "1/4 cup condensed milk",
        "1 teaspoon cardamom powder",
        "1/4 cup mixed nuts (almonds, pistachios, cashews)",
        "1 tablespoon ghee",
        "Saffron strands soaked in 2 tablespoons milk",
        "Rose water for flavor (optional)"
      ],
      instructions: [
        "Wash rice and soak in water for 30 minutes.",
        "Heat ghee in heavy-bottomed pan, fry nuts until golden, set aside.",
        "Drain rice and add to same pan, lightly roast for 2 minutes.",
        "Add milk and bring to boil, stirring occasionally.",
        "Reduce heat to low, simmer until rice is completely cooked.",
        "Stir frequently to prevent sticking.",
        "When rice is soft and milk reduces by half, add sugar.",
        "Add condensed milk and cardamom powder.",
        "Cook for another 10 minutes until desired consistency.",
        "Add saffron milk and fried nuts (reserve some for garnish).",
        "Add rose water if using, mix well.",
        "Remove from heat and cool to room temperature.",
        "Garnish with remaining nuts, serve warm or chilled."
      ]
    },
    { 
      id: 13, 
      name: "Walnut Halwa Recipe",
      ingredients: [
        "2 cups walnuts, finely ground",
        "1 cup sugar",
        "1 cup water",
        "1/2 cup ghee",
        "1/2 cup milk",
        "1/4 cup khoya (milk solids), grated",
        "1 teaspoon cardamom powder",
        "Saffron strands soaked in 2 tablespoons milk",
        "Silver leaf (varq) for garnish"
      ],
      instructions: [
        "Soak ground walnuts in milk for 30 minutes.",
        "Make sugar syrup: Combine sugar and water in pan.",
        "Cook until one-string consistency syrup forms.",
        "Heat ghee in heavy-bottomed pan on medium heat.",
        "Add soaked walnuts (with milk) to ghee.",
        "Cook, stirring continuously, until mixture thickens.",
        "Add sugar syrup gradually while stirring.",
        "Cook until halwa starts leaving sides of pan.",
        "Add grated khoya and cardamom powder.",
        "Continue cooking until ghee separates.",
        "Add saffron milk, mix well.",
        "Remove from heat and transfer to serving dish.",
        "Garnish with silver leaf and serve warm."
      ]
    },
    { 
      id: 14, 
      name: "Cinnamon Rolls Recipe",
      ingredients: [
        "For dough: 3 cups all-purpose flour",
        "1/4 cup sugar",
        "1 teaspoon salt",
        "2 1/4 teaspoons instant yeast",
        "3/4 cup warm milk",
        "1/4 cup melted butter",
        "1 egg",
        "For filling: 1/2 cup brown sugar",
        "2 tablespoons cinnamon powder",
        "1/4 cup softened butter",
        "For icing: 1 cup powdered sugar",
        "2 tablespoons milk",
        "1/2 teaspoon vanilla extract"
      ],
      instructions: [
        "Mix warm milk, sugar, and yeast, let sit for 5 minutes until foamy.",
        "In large bowl, combine flour and salt.",
        "Add yeast mixture, melted butter, and egg to flour.",
        "Knead until smooth elastic dough forms (8-10 minutes).",
        "Place dough in greased bowl, cover, let rise for 1 hour.",
        "Punch down dough, roll into 12x18 inch rectangle.",
        "Spread softened butter evenly over dough.",
        "Mix brown sugar and cinnamon, sprinkle over butter.",
        "Roll dough tightly from long edge into log.",
        "Cut into 12 equal pieces using dental floss or sharp knife.",
        "Place rolls in greased baking pan, cover, let rise 30 minutes.",
        "Preheat oven to 350°F (175°C).",
        "Bake for 20-25 minutes until golden brown.",
        "Mix icing ingredients until smooth, drizzle over warm rolls.",
        "Serve warm."
      ]
    },
    { 
      id: 15, 
      name: "Bread Gulab Jamun Recipe",
      ingredients: [
        "6 slices white bread, crusts removed",
        "1/4 cup milk powder",
        "2 tablespoons all-purpose flour",
        "1/4 teaspoon baking powder",
        "2 tablespoons yogurt",
        "1/4 cup milk (as needed)",
        "Oil for frying",
        "For syrup: 1 1/2 cups sugar",
        "1 1/2 cups water",
        "4-5 cardamom pods",
        "1 teaspoon rose water",
        "Chopped pistachios for garnish"
      ],
      instructions: [
        "Make syrup: Combine sugar, water, and cardamom in pan.",
        "Boil for 10 minutes until slightly thickened, add rose water.",
        "Keep syrup warm.",
        "Tear bread into small pieces, soak in milk for 5 minutes.",
        "Squeeze out excess milk from bread.",
        "Add milk powder, flour, baking powder, and yogurt.",
        "Knead into soft dough, adding milk if needed.",
        "Divide dough into small equal portions.",
        "Roll each portion into smooth crack-free balls.",
        "Heat oil on medium heat (not too hot).",
        "Fry balls until golden brown, turning frequently.",
        "Immediately transfer hot gulab jamuns to warm syrup.",
        "Soak for at least 1 hour, turning occasionally.",
        "Garnish with chopped pistachios, serve warm or cold."
      ]
    },
    { 
      id: 16, 
      name: "Creamy Mango Delight Recipe",
      ingredients: [
        "2 large ripe mangoes, pureed",
        "1 cup whipped cream",
        "1/2 cup condensed milk",
        "1/2 cup mango pieces (for layering)",
        "1/2 cup digestive biscuits, crushed",
        "2 tablespoons melted butter",
        "1 teaspoon vanilla extract",
        "1/4 cup chopped nuts for garnish"
      ],
      instructions: [
        "Mix crushed biscuits with melted butter for base.",
        "Press mixture into bottom of serving glasses.",
        "Refrigerate for 15 minutes.",
        "In large bowl, combine mango puree and condensed milk.",
        "Add vanilla extract, mix well.",
        "Gently fold in whipped cream until just combined.",
        "Layer mango cream mixture over biscuit base.",
        "Add layer of fresh mango pieces.",
        "Repeat layers until glass is full.",
        "Top with remaining whipped cream.",
        "Garnish with chopped nuts and mango pieces.",
        "Chill for at least 2 hours before serving.",
        "Serve cold."
      ]
    },
    { 
      id: 17, 
      name: "Kunafa Dates Recipe",
      ingredients: [
        "250g kunafa dough (kataifi), thawed",
        "1 cup pitted dates, chopped",
        "1/2 cup walnuts, chopped",
        "1 teaspoon cinnamon powder",
        "1/2 cup ghee, melted",
        "For syrup: 1 cup sugar",
        "1/2 cup water",
        "1 tablespoon lemon juice",
        "1 teaspoon orange blossom water",
        "1/4 cup pistachios, crushed for garnish"
      ],
      instructions: [
        "Make syrup: Combine sugar, water, and lemon juice.",
        "Boil for 10 minutes until slightly thickened.",
        "Remove from heat, add orange blossom water.",
        "Let syrup cool completely.",
        "Preheat oven to 350°F (175°C).",
        "Separate kunafa threads with fingers.",
        "Mix dates, walnuts, and cinnamon for filling.",
        "Brush baking dish with melted ghee.",
        "Spread half of kunafa dough in dish, pressing down.",
        "Spread date-walnut filling evenly.",
        "Top with remaining kunafa dough, press down gently.",
        "Pour remaining melted ghee evenly over top.",
        "Bake for 30-35 minutes until golden brown.",
        "Pour cold syrup over hot kunafa.",
        "Garnish with crushed pistachios, let rest 10 minutes.",
        "Serve warm."
      ]
    },
    { 
      id: 18, 
      name: "Kunafa Chocolate Recipe",
      ingredients: [
        "250g kunafa dough (kataifi), thawed",
        "200g dark chocolate, chopped",
        "1/2 cup heavy cream",
        "1/2 cup ghee, melted",
        "1/4 cup sugar",
        "1 teaspoon vanilla extract",
        "For chocolate sauce: 1/2 cup chocolate chips",
        "1/4 cup cream",
        "Chopped almonds for garnish"
      ],
      instructions: [
        "Make chocolate ganache: Heat cream until steaming.",
        "Pour over chopped chocolate, let sit 2 minutes.",
        "Whisk until smooth, add vanilla extract.",
        "Preheat oven to 350°F (175°C).",
        "Separate kunafa threads with fingers.",
        "Brush baking dish with melted ghee.",
        "Mix kunafa with sugar and remaining ghee.",
        "Press half of kunafa mixture into baking dish.",
        "Spread chocolate ganache evenly over kunafa.",
        "Top with remaining kunafa mixture, press gently.",
        "Bake for 30-35 minutes until golden and crisp.",
        "Make chocolate sauce: Heat cream, pour over chocolate chips.",
        "Stir until smooth sauce forms.",
        "Drizzle chocolate sauce over baked kunafa.",
        "Garnish with chopped almonds.",
        "Let cool slightly before serving."
      ]
    },
    { 
      id: 19, 
      name: "Chocolate Strawberry Crepes Recipe",
      ingredients: [
        "For crepes: 1 cup all-purpose flour",
        "2 eggs",
        "1 1/4 cups milk",
        "2 tablespoons melted butter",
        "2 tablespoons sugar",
        "Pinch of salt",
        "For filling: 1 cup sliced strawberries",
        "1/2 cup chocolate hazelnut spread",
        "1 cup whipped cream",
        "For chocolate sauce: 1/2 cup chocolate chips",
        "1/4 cup cream",
        "Powdered sugar for dusting"
      ],
      instructions: [
        "Make crepe batter: Whisk eggs, milk, and melted butter.",
        "Add flour, sugar, and salt, whisk until smooth.",
        "Let batter rest for 30 minutes.",
        "Heat non-stick pan over medium heat.",
        "Pour 1/4 cup batter, swirl to coat pan thinly.",
        "Cook for 1-2 minutes until edges lift.",
        "Flip and cook for 30 seconds more.",
        "Repeat with remaining batter.",
        "Make chocolate sauce: Heat cream, pour over chocolate chips.",
        "Stir until smooth sauce forms.",
        "Spread chocolate hazelnut spread on each crepe.",
        "Add sliced strawberries and whipped cream.",
        "Fold crepes into triangles or roll.",
        "Drizzle with chocolate sauce.",
        "Dust with powdered sugar before serving.",
        "Serve immediately."
      ]
    },
    { 
      id: 20, 
      name: "Sweet Milk Balls Recipe",
      ingredients: [
        "1 liter full-fat milk",
        "1/2 cup sugar",
        "1/4 cup milk powder",
        "1 tablespoon ghee",
        "1/2 teaspoon cardamom powder",
        "1/4 cup chopped nuts (pistachios, almonds)",
        "Oil for frying",
        "For coating: 1/4 cup powdered sugar",
        "1 teaspoon cinnamon powder"
      ],
      instructions: [
        "Boil milk in heavy-bottomed pan.",
        "Reduce heat, simmer until milk reduces to half.",
        "Add sugar and milk powder, stir continuously.",
        "Cook until mixture thickens and leaves sides of pan.",
        "Add ghee and cardamom powder, mix well.",
        "Remove from heat, let cool slightly.",
        "Add chopped nuts to mixture.",
        "When cool enough to handle, shape into small balls.",
        "Heat oil in deep pan on medium heat.",
        "Fry balls until golden brown, turning gently.",
        "Drain on paper towels.",
        "Mix powdered sugar and cinnamon for coating.",
        "Roll warm balls in cinnamon-sugar mixture.",
        "Let cool completely before serving.",
        "Store in airtight container."
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
    if (selectedDessert && currentStep < selectedDessert.instructions.length) {
      stopSpeaking();
      speakInstructions(selectedDessert.instructions, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedDessert && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedDessert.instructions, currentStep - 2);
    }
  };

  const speakStep = (stepIndex) => {
    if (selectedDessert && stepIndex >= 0 && stepIndex < selectedDessert.instructions.length) {
      stopSpeaking();
      speakInstructions(selectedDessert.instructions, stepIndex);
    }
  };

  const toggleVoiceInstructions = () => {
    const newState = !showVoiceInstructions;
    setShowVoiceInstructions(newState);
    
    if (newState && selectedDessert && !autoPlayStartedRef.current) {
      autoPlayStartedRef.current = true;
      setTimeout(() => {
        if (showVoiceInstructions && selectedDessert) {
          speakInstructions(selectedDessert.instructions, 0, true);
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
    if (isModalOpen && showVoiceInstructions && selectedDessert && !autoPlayStartedRef.current) {
      autoPlayStartedRef.current = true;
      setTimeout(() => {
        if (showVoiceInstructions && selectedDessert && isModalOpen) {
          speakInstructions(selectedDessert.instructions, 0, true);
        }
      }, 800);
    }
    
    return () => {
      stopSpeaking();
      autoPlayStartedRef.current = false;
    };
  }, [isModalOpen, showVoiceInstructions, selectedDessert]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      autoPlayStartedRef.current = false;
    };
  }, []);

  // Navigation Handlers
  const handleViewRecipe = (dessert) => {
    setSelectedDessert(dessert);
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
    setSelectedDessert(null);
    setIsPlaying(false);
    setShowVoiceInstructions(false);
    setCurrentStep(0);
    setProgress(0);
    autoPlayStartedRef.current = false;
  };

  const handleGoBack = () => {
    navigate('/');
  };

  // Filter desserts based on search
  const filteredDesserts = desserts.filter(dessert =>
    dessert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };

  return (
    <div className="desserts-page">
      {/* Header */}
      <header className="desserts-header">
        <div className="header-content">
          <h1>Signature Dessert Selection</h1>
          <p>A refined selection of traditional and classic sweet dishes</p>
        </div>
      </header>

      

      {/* Main Content */}
      <main className="desserts-main">
        <div className="desserts-container">
          {filteredDesserts.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No desserts found matching "{searchTerm}"</h3>
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
              <div className="desserts-grid">
                {filteredDesserts.map((dessert) => (
                  <div key={dessert.id} className="dessert-card">
                    <div className="dessert-card-image">
                      <img 
                        src={dessertImages[dessert.id - 1] || dessertImages[0]}
                        alt={dessert.name}
                        className="dessert-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="dessert-card-content">
                      <h3 className="dessert-name">{dessert.name}</h3>
                      <button 
                        className="view-recipe-btn"
                        onClick={() => handleViewRecipe(dessert)}
                      >
                        <i className="fas fa-cookie-bite"></i> View Recipe
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
      {isModalOpen && selectedDessert && (
        <div className="recipe-modal-overlay">
          <div className="recipe-modal">
            <div className="modal-header">
              <h2 className="modal-title" style={{color: 'white'}}>{selectedDessert.name}</h2>
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
                      {selectedDessert.ingredients.map((ingredient, index) => (
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
                      {selectedDessert.instructions.map((step, index) => (
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
                          <h4>🎤 Voice Guide for {selectedDessert.name}</h4>
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
                            <span>Step {currentStep} of {selectedDessert.instructions.length}</span>
                          </div>
                        </div>
                        
                        <div className="voice-buttons">
                          <button 
                            className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                            onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedDessert.instructions)}
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
                            disabled={currentStep >= selectedDessert.instructions.length}
                          >
                            Next Step <i className="fas fa-forward"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="voice-steps-overview">
                        <h5>
                          <i className="fas fa-list-ol"></i> Steps Overview
                          <span className="steps-count">
                            {currentStep}/{selectedDessert.instructions.length} Completed
                          </span>
                        </h5>
                        <div className="steps-container">
                          {selectedDessert.instructions.map((step, index) => (
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

export default RecipeDessertsPage;