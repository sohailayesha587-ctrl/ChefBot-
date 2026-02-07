

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeBakingPage.css';

const RecipeBakingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCake, setSelectedCake] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoiceInstructions, setShowVoiceInstructions] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);
  const autoPlayStartedRef = useRef(false);

  // Cake images array
  const cakeImages = [
    "https://taylorandcolledge.ie/wp-content/uploads/2022/12/Vanilla-Sponge-Cake-Website-Image-scaled.jpeg", // Vanilla Sponge Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPAVsSBNsyUzNya7rQU6Cb3s88EhcNT97hhw&s", // Chocolate Mug Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBa3I-TLJmKEAfIxyvpjKoCvXBmulsE9C6Ew&s", // Banana Bread
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQedyHGj1yIBACcB9f12oQOuOFZfn8FxfdfJw&s", // Butter Pound Cake
    "https://images.immediate.co.uk/production/volatile/sites/30/2023/02/Irish-coffee-cake-e23e0f0.jpg", // Coffee Cake
    "https://images.unsplash.com/photo-1599599810769-bcde5a160d32", // Vegan Sugar Cookies
    "https://www.twopeasandtheirpod.com/wp-content/uploads/2022/10/Soft-Peanut-Butter-Cookies-16-500x500.jpg", // Peanut Butter Cookies
    "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/vegan_peanut_choc_cake_64828_16x9.jpg", // Vegan Chocolate Cake
    "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7", // American Red Velvet
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTanuHBasCHpLk0_eoWortqRkdOV3_TbWUYlQ&s", // Yogurt Pound Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGeCOIMxR-Q-vqsPGWBcMwHzgph6C36UumEg&s", // Japanese Cheesecake
    "https://static01.nyt.com/images/2014/04/07/dining/orangeflan-still/orangeflan-still-superJumbo.jpg", // Spanish Orange Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Qu0vAF4GgA-nFxLQca7gHmrnGNklAhewBA&s", // Cinnamon Rolls
    "https://bakerbynature.com/wp-content/uploads/2011/05/Blueberry-Muffins-1-of-1.jpg", // Blueberry Muffins
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7KGXGkHz01bB8pH8fHHNGXpxK4_ZF1BqiJg&s", // Cherry Almond Coffee Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKGu9ONn5KlCyny1dV8HDGrtsMKybPtkMig&s", // Swedish Princess Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcSK0q_8hsHxqGKyhHkENFFlo5Gywjk9Pz8Q&s", // Russian Honey Cake
    "https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2019-10/almond-roll.jpg?itok=7IzXxgDh", // Almond Sponge Roll
    "https://theunlikelybaker.com/wp-content/uploads/2024/08/Chocolate-Butter-Mochi-Feature.jpg", // Chocolate Butter Cake
    "https://img.sndimg.com/food/image/upload/q_92,fl_progressive,w_1200,c_scale/v1/img/recipes/39/01/3/aeAtoOWHSeWQh9UD7W3K_0S9A6192.jpg", // Whipped Cream Frosting
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587", // Chocolate Fudge Cake
    "https://www.amummytoo.co.uk/wp-content/uploads/2024/03/lemon-drizzle-cake-recipe-serving.jpg", // Lemon Drizzle Cake
    "https://vikalinka.com/wp-content/uploads/2022/03/Carrot-Cake-14-Edit.jpg", // Carrot Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJqwjQTeFo1FQEB9xLqYMFcWHpt0gXOJ5UQ&s", // Marble Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnRIq-0EjSkxVDSfqmfljHVNKk0_UV87Ob9A&s", // Coconut Cake
    "https://britneybreaksbread.com/wp-content/uploads/2025/05/strawberry-shortcake-with-pound-cake-2.jpg", // Strawberry Shortcake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV64SvGoK8tvOktVcC__8q99fEXRmHztmiaA&s", // Pineapple Upside Down Cake
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr4PHChVfFJRLTOkLFLASOeVFVECM1VLi09A&s", // Fluffy Vanilla Cake
    "https://i.ytimg.com/vi/D7ZTYrTLv8A/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLABv0l7wmdZvMsfrPlLjazrS9U2fQ", // French Heart Puff
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Z1IBAdxCGUZ-0tQv7ZVmvXTC8aAPLPDMfA&s", // Cake Rusk
  ];

  // Complete Cakes Data with Pakistani-style Recipes (Simple English)
  const cakes = [
    { 
      id: 1, 
      name: "Vanilla Sponge Cake",
      ingredients: [
        "2 cups maida (all-purpose flour)",
        "2 cups sugar",
        "1 cup butter, room temperature",
        "4 eggs",
        "1 cup milk",
        "2 tsp vanilla essence",
        "1 tbsp baking powder",
        "1/2 tsp salt"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C).",
        "Grease and flour two 9-inch round cake pans.",
        "Cream butter and sugar until light and fluffy.",
        "Add eggs one at a time, beating well after each.",
        "Mix in vanilla essence.",
        "In separate bowl, whisk flour, baking powder, and salt.",
        "Add dry ingredients to butter mixture alternately with milk.",
        "Divide batter evenly between pans.",
        "Bake for 25-30 minutes or until toothpick comes out clean.",
        "Cool in pans for 10 minutes before transferring to wire racks."
      ]
    },
    { 
      id: 2, 
      name: "Chocolate Mug Cake",
      ingredients: [
        "4 tbsp all-purpose flour",
        "4 tbsp sugar",
        "2 tbsp cocoa powder",
        "1/4 tsp baking powder",
        "3 tbsp milk",
        "2 tbsp vegetable oil",
        "1/4 tsp vanilla essence",
        "1 tbsp chocolate chips (optional)"
      ],
      instructions: [
        "In microwave-safe mug, mix flour, sugar, cocoa powder, and baking powder.",
        "Add milk, oil, and vanilla essence. Mix until smooth.",
        "Stir in chocolate chips if using.",
        "Microwave on high for 1 minute 30 seconds to 2 minutes.",
        "Let cool for 1 minute before enjoying.",
        "Top with ice cream if desired."
      ]
    },
    { 
      id: 3, 
      name: "Banana Bread",
      ingredients: [
        "3 ripe bananas, mashed",
        "1/3 cup melted butter",
        "1 cup sugar",
        "1 egg, beaten",
        "1 tsp vanilla essence",
        "1 tsp baking soda",
        "Pinch of salt",
        "1 1/2 cups all-purpose flour",
        "1/2 cup chopped walnuts (optional)"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease a 9x5 inch loaf pan.",
        "Mash bananas with fork until smooth.",
        "Stir melted butter into bananas.",
        "Mix in sugar, egg, and vanilla essence.",
        "Add baking soda and salt, mix thoroughly.",
        "Gradually add flour, mixing until just incorporated.",
        "Fold in chopped walnuts if using.",
        "Pour batter into prepared pan.",
        "Bake for 60-65 minutes or until toothpick comes out clean.",
        "Cool completely before slicing."
      ]
    },
    { 
      id: 4, 
      name: "Butter Pound Cake",
      ingredients: [
        "2 cups all-purpose flour",
        "2 cups sugar",
        "1 cup butter, softened",
        "5 eggs",
        "1/2 cup yogurt",
        "1 tsp vanilla essence",
        "1/2 tsp baking powder",
        "1/4 tsp salt"
      ],
      instructions: [
        "Preheat oven to 325°F (165°C). Grease a tube pan.",
        "Cream butter and sugar until fluffy.",
        "Add eggs one at a time, beating well after each.",
        "Mix in vanilla essence and yogurt.",
        "In separate bowl, whisk flour, baking powder, and salt.",
        "Gradually add dry ingredients to butter mixture.",
        "Pour batter into prepared pan.",
        "Bake for 60-75 minutes or until golden brown.",
        "Cool in pan for 20 minutes before removing."
      ]
    },
    { 
      id: 5, 
      name: "Coffee Cake",
      ingredients: [
        "2 cups all-purpose flour",
        "1 cup sugar",
        "1/2 cup butter, softened",
        "2 eggs",
        "1 cup yogurt",
        "1 tsp vanilla essence",
        "1 tsp baking powder",
        "1/2 tsp baking soda",
        "1/4 tsp salt",
        "For topping: 1/2 cup brown sugar, 1/2 cup chopped walnuts, 2 tsp cinnamon"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease a 9-inch square pan.",
        "Make topping: Mix brown sugar, walnuts, and cinnamon.",
        "Cream butter and sugar until fluffy.",
        "Add eggs one at a time.",
        "Mix in vanilla essence and yogurt.",
        "In separate bowl, whisk flour, baking powder, baking soda, and salt.",
        "Gradually add dry ingredients to butter mixture.",
        "Spread half of batter in pan.",
        "Sprinkle with half of topping.",
        "Top with remaining batter and sprinkle with remaining topping.",
        "Bake for 35-40 minutes until golden brown."
      ]
    },
    { 
      id: 6, 
      name: "Vegan Sugar Cookies",
      ingredients: [
        "2 1/2 cups all-purpose flour",
        "1 cup vegan butter, softened",
        "1 cup sugar",
        "1/4 cup almond milk",
        "2 tsp vanilla essence",
        "1 tbsp cornstarch",
        "1 tsp baking powder",
        "1/2 tsp salt"
      ],
      instructions: [
        "Cream vegan butter and sugar until fluffy.",
        "Add almond milk and vanilla essence, mix well.",
        "In separate bowl, whisk flour, cornstarch, baking powder, and salt.",
        "Gradually add dry ingredients to wet mixture.",
        "Divide dough in half, shape into disks, wrap, chill for 1 hour.",
        "Preheat oven to 350°F (180°C).",
        "Roll dough to 1/4-inch thickness on floured surface.",
        "Cut with cookie cutters.",
        "Bake for 8-10 minutes until edges are lightly golden.",
        "Cool on baking sheets for 5 minutes."
      ]
    },
    { 
      id: 7, 
      name: "Peanut Butter Cookies",
      ingredients: [
        "1 cup creamy peanut butter",
        "1 cup sugar",
        "1 egg",
        "1 tsp vanilla essence",
        "1 tsp baking soda",
        "Pinch of salt",
        "Sugar for rolling"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C).",
        "Mix peanut butter, sugar, egg, vanilla, baking soda, and salt.",
        "Form dough into 1-inch balls and roll in sugar.",
        "Place on baking sheets and flatten with fork.",
        "Bake for 8-10 minutes until edges are set.",
        "Let cool on baking sheets for 5 minutes.",
        "Store in airtight container."
      ]
    },
    { 
      id: 8, 
      name: "Vegan Chocolate Cake",
      ingredients: [
        "1 1/2 cups all-purpose flour",
        "1 cup sugar",
        "1/4 cup cocoa powder",
        "1 tsp baking soda",
        "1/2 tsp salt",
        "1 cup water",
        "1/3 cup vegetable oil",
        "1 tsp vanilla essence",
        "1 tsp vinegar"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease an 8-inch pan.",
        "Whisk together flour, sugar, cocoa powder, baking soda, and salt.",
        "Make a well and add water, oil, vanilla, and vinegar.",
        "Mix until just combined (batter will be thin).",
        "Pour into prepared pan.",
        "Bake for 30-35 minutes or until toothpick comes out clean.",
        "Cool in pan for 10 minutes.",
        "Frost with vegan chocolate frosting if desired."
      ]
    },
    { 
      id: 9, 
      name: "American Red Velvet",
      ingredients: [
        "2 1/2 cups all-purpose flour",
        "1 1/2 cups sugar",
        "1 cup buttermilk",
        "1/2 cup butter, softened",
        "2 eggs",
        "2 tbsp red food coloring",
        "1 tsp vanilla essence",
        "1 tsp baking soda",
        "1 tsp vinegar",
        "1 tsp cocoa powder",
        "1/2 tsp salt"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease two 9-inch pans.",
        "Whisk flour, cocoa powder, and salt.",
        "Cream butter and sugar until fluffy.",
        "Add eggs one at a time.",
        "Mix in food coloring and vanilla.",
        "Add flour mixture alternately with buttermilk.",
        "Mix baking soda and vinegar, fold into batter.",
        "Divide batter between pans.",
        "Bake for 25-30 minutes.",
        "Cool completely before frosting with cream cheese frosting."
      ]
    },
    { 
      id: 10, 
      name: "Yogurt Pound Cake",
      ingredients: [
        "1 1/2 cups all-purpose flour",
        "1 cup plain yogurt",
        "1 cup sugar",
        "3 eggs",
        "1/2 cup vegetable oil",
        "1 tsp baking powder",
        "1/2 tsp baking soda",
        "1 tsp vanilla essence",
        "Pinch of salt"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease a loaf pan.",
        "Whisk flour, baking powder, baking soda, and salt.",
        "Beat eggs and sugar until pale and fluffy.",
        "Add yogurt, oil, and vanilla essence, mix well.",
        "Gradually fold in dry ingredients.",
        "Pour batter into pan.",
        "Bake for 45-50 minutes until golden brown.",
        "Cool in pan for 10 minutes.",
        "Dust with powdered sugar before serving."
      ]
    },
    { 
      id: 11, 
      name: "Japanese Cheesecake",
      ingredients: [
        "250g cream cheese",
        "50g butter",
        "100ml milk",
        "60g cake flour",
        "20g cornstarch",
        "6 eggs, separated",
        "120g sugar",
        "1 tsp lemon juice",
        "1/4 tsp cream of tartar"
      ],
      instructions: [
        "Preheat oven to 320°F (160°C). Prepare water bath.",
        "Melt cream cheese, butter, and milk over double boiler.",
        "Remove from heat, sift in flour and cornstarch, mix well.",
        "Add egg yolks one at a time, mixing after each.",
        "Beat egg whites with cream of tartar until foamy.",
        "Gradually add sugar, beating until stiff peaks form.",
        "Fold egg whites into cheese mixture in three batches.",
        "Pour into springform pan lined with parchment.",
        "Place in water bath and bake for 70-80 minutes.",
        "Turn off oven and let cake cool inside for 1 hour.",
        "Chill for at least 4 hours before serving."
      ]
    },
    { 
      id: 12, 
      name: "Spanish Orange Cake",
      ingredients: [
        "2 cups all-purpose flour",
        "1 1/2 cups sugar",
        "3 eggs",
        "1 cup fresh orange juice",
        "1/2 cup vegetable oil",
        "Zest of 2 oranges",
        "1 tbsp baking powder",
        "1/2 tsp salt",
        "Powdered sugar for dusting"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease a bundt pan.",
        "Whisk flour, baking powder, and salt.",
        "Beat eggs and sugar until pale and fluffy.",
        "Add orange juice, oil, and orange zest, mix well.",
        "Gradually add dry ingredients, mixing until combined.",
        "Pour batter into pan.",
        "Bake for 45-50 minutes until golden brown.",
        "Cool in pan for 15 minutes.",
        "Dust with powdered sugar before serving."
      ]
    },
    { 
      id: 13, 
      name: "Cinnamon Rolls",
      ingredients: [
        "For dough: 3 cups all-purpose flour",
        "1/4 cup sugar",
        "1 tsp salt",
        "2 1/4 tsp instant yeast",
        "3/4 cup warm milk",
        "1/4 cup melted butter",
        "1 egg",
        "For filling: 1/2 cup brown sugar",
        "2 tbsp cinnamon powder",
        "1/4 cup softened butter",
        "For icing: 1 cup powdered sugar",
        "2 tbsp milk",
        "1/2 tsp vanilla essence"
      ],
      instructions: [
        "Mix warm milk, sugar, and yeast, let sit for 5 minutes.",
        "Combine flour and salt.",
        "Add yeast mixture, melted butter, and egg to flour.",
        "Knead until smooth dough forms (8-10 minutes).",
        "Place in greased bowl, cover, let rise for 1 hour.",
        "Roll dough into 12x18 inch rectangle.",
        "Spread softened butter evenly.",
        "Mix brown sugar and cinnamon, sprinkle over butter.",
        "Roll dough tightly from long edge into log.",
        "Cut into 12 equal pieces.",
        "Place in greased baking pan, cover, let rise 30 minutes.",
        "Preheat oven to 350°F (175°C).",
        "Bake for 20-25 minutes until golden brown.",
        "Mix icing ingredients, drizzle over warm rolls.",
        "Serve warm."
      ]
    },
    { 
      id: 14, 
      name: "Blueberry Muffins",
      ingredients: [
        "2 cups all-purpose flour",
        "1 cup sugar",
        "1/2 cup melted butter",
        "2 eggs",
        "1 cup buttermilk",
        "2 tsp baking powder",
        "1/2 tsp baking soda",
        "1 tsp vanilla essence",
        "1/2 tsp salt",
        "1 1/2 cups fresh blueberries",
        "2 tbsp flour for coating blueberries"
      ],
      instructions: [
        "Preheat oven to 400°F (200°C). Line muffin tin.",
        "Whisk flour, baking powder, baking soda, and salt.",
        "Whisk melted butter and sugar until combined.",
        "Add eggs one at a time, beating well after each.",
        "Mix in buttermilk and vanilla essence.",
        "Gradually fold in dry ingredients (do not overmix).",
        "Toss blueberries with 2 tbsp flour to coat.",
        "Gently fold blueberries into batter.",
        "Divide batter among muffin cups, filling each 2/3 full.",
        "Bake for 18-20 minutes until golden brown.",
        "Cool in pan for 5 minutes.",
        "Serve warm or at room temperature."
      ]
    },
    { 
      id: 15, 
      name: "Cherry Almond Coffee Cake",
      ingredients: [
        "2 cups all-purpose flour",
        "3/4 cup sugar",
        "1/2 cup butter, softened",
        "2 eggs",
        "1 cup yogurt",
        "1 tsp almond essence",
        "1 tsp baking powder",
        "1/2 tsp baking soda",
        "1/4 tsp salt",
        "1 cup fresh or frozen cherries, pitted",
        "For topping: 1/4 cup sliced almonds, 2 tbsp sugar"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease a 9-inch square pan.",
        "Cream butter and sugar until fluffy.",
        "Add eggs one at a time.",
        "Mix in yogurt and almond essence.",
        "Whisk flour, baking powder, baking soda, and salt.",
        "Gradually add dry ingredients to butter mixture.",
        "Fold in cherries.",
        "Spread batter in pan.",
        "Sprinkle with almonds and sugar.",
        "Bake for 35-40 minutes until golden brown.",
        "Cool in pan for 15 minutes before serving.",
        "Serve with coffee or tea."
      ]
    },
    { 
      id: 16, 
      name: "Swedish Princess Cake",
      ingredients: [
        "For cake: 3 eggs",
        "3/4 cup sugar",
        "3/4 cup all-purpose flour",
        "1 tsp baking powder",
        "For filling: 2 cups whipped cream",
        "1 cup vanilla custard",
        "1 cup strawberry jam",
        "For covering: Marzipan (almond paste)",
        "Green food coloring"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C).",
        "Beat eggs and sugar until fluffy.",
        "Sift flour and baking powder, fold into egg mixture.",
        "Pour into cake pan.",
        "Bake for 25 minutes.",
        "Cool cake and cut into layers.",
        "Spread jam on cake layer.",
        "Add whipped cream and custard layer.",
        "Place top layer.",
        "Cover whole cake with whipped cream.",
        "Color marzipan green and roll out.",
        "Cover cake with marzipan.",
        "Decorate with marzipan rose."
      ]
    },
    { 
      id: 17, 
      name: "Russian Honey Cake",
      ingredients: [
        "3 eggs",
        "1 cup honey",
        "1 cup sugar",
        "2 cups all-purpose flour",
        "1 tsp baking soda",
        "1/2 cup butter",
        "For cream: 2 cups sour cream",
        "1 cup whipped cream",
        "1/2 cup powdered sugar"
      ],
      instructions: [
        "Melt butter, honey, sugar together.",
        "Let cool slightly.",
        "Add eggs, mix well.",
        "Mix flour and baking soda.",
        "Divide dough into 8-10 thin layers.",
        "Bake each layer for 5-7 minutes.",
        "Mix sour cream, whipped cream, powdered sugar for cream.",
        "Spread cream between cake layers.",
        "Cover top and sides with cream.",
        "Decorate with cake crumbs.",
        "Refrigerate for 12 hours before serving."
      ]
    },
    { 
      id: 18, 
      name: "Almond Sponge Roll",
      ingredients: [
        "4 eggs, separated",
        "3/4 cup sugar",
        "3/4 cup ground almonds",
        "1/4 cup all-purpose flour",
        "1 tsp vanilla essence",
        "For filling: 1 1/2 cups whipped cream",
        "1/2 cup powdered sugar",
        "Sliced almonds for decoration"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C).",
        "Line baking sheet with parchment paper.",
        "Beat egg whites until stiff peaks form.",
        "Gradually add sugar while beating.",
        "Add egg yolks and vanilla essence.",
        "Mix ground almonds and flour, fold into egg mixture.",
        "Spread batter on baking sheet.",
        "Bake for 10-12 minutes.",
        "Roll cake in warm towel.",
        "Let cool completely.",
        "Mix whipped cream and powdered sugar.",
        "Unroll cake, spread cream, roll again.",
        "Decorate with sliced almonds."
      ]
    },
    { 
      id: 19, 
      name: "Chocolate Butter Cake",
      ingredients: [
        "1 3/4 cups all-purpose flour",
        "2 cups sugar",
        "3/4 cup cocoa powder",
        "1 1/2 tsp baking powder",
        "1 1/2 tsp baking soda",
        "1 tsp salt",
        "2 eggs",
        "1 cup milk",
        "1/2 cup vegetable oil",
        "2 tsp vanilla essence",
        "1 cup boiling water"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease cake pans.",
        "Mix flour, sugar, cocoa, baking powder, baking soda, salt.",
        "Beat eggs, milk, oil, vanilla essence together.",
        "Add wet ingredients to dry, mix well.",
        "Add boiling water, mix (batter will be thin).",
        "Divide batter between pans.",
        "Bake for 30-35 minutes.",
        "Cool completely before frosting with chocolate buttercream."
      ]
    },
    { 
      id: 20, 
      name: "Whipped Cream Frosting",
      ingredients: [
        "2 cups heavy cream",
        "1/2 cup powdered sugar",
        "1 tsp vanilla essence"
      ],
      instructions: [
        "Chill bowl and beaters in refrigerator.",
        "Pour heavy cream into cold bowl.",
        "Beat on medium speed until soft peaks form.",
        "Gradually add powdered sugar while beating.",
        "Add vanilla essence.",
        "Beat until stiff peaks form.",
        "Use immediately to frost cakes.",
        "Refrigerate if not using right away."
      ]
    },
    { 
      id: 21, 
      name: "Chocolate Fudge Cake",
      ingredients: [
        "1 3/4 cups all-purpose flour",
        "2 cups sugar",
        "3/4 cup cocoa powder",
        "1 1/2 tsp baking powder",
        "1 1/2 tsp baking soda",
        "1 tsp salt",
        "2 eggs",
        "1 cup milk",
        "1/2 cup vegetable oil",
        "2 tsp vanilla essence",
        "1 cup boiling water",
        "For fudge frosting: 1 cup chocolate chips, 1/2 cup cream"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Prepare cake pans.",
        "Mix dry ingredients in large bowl.",
        "Beat eggs, milk, oil, vanilla together.",
        "Add wet ingredients to dry, mix well.",
        "Add boiling water, mix until smooth.",
        "Divide batter between pans.",
        "Bake for 30-35 minutes.",
        "For frosting: Heat cream until steaming.",
        "Pour over chocolate chips, let sit 2 minutes.",
        "Whisk until smooth and glossy.",
        "Frost cooled cake with chocolate fudge."
      ]
    },
    { 
      id: 22, 
      name: "Lemon Drizzle Cake",
      ingredients: [
        "1 3/4 cups all-purpose flour",
        "1 cup sugar",
        "1/2 cup butter, room temperature",
        "3 eggs",
        "1/2 cup milk",
        "Zest of 2 lemons",
        "Juice of 1 lemon",
        "1 tsp baking powder",
        "1/2 tsp baking soda",
        "1/4 tsp salt",
        "For drizzle: 1/2 cup powdered sugar, 2 tbsp lemon juice"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease loaf pan.",
        "Cream butter and sugar until fluffy.",
        "Add eggs one at a time.",
        "Mix in lemon zest and juice.",
        "Whisk flour, baking powder, baking soda, salt.",
        "Add milk and flour mixture alternately to batter.",
        "Pour batter into pan.",
        "Bake for 45-50 minutes.",
        "Mix powdered sugar and lemon juice for drizzle.",
        "Poke holes in warm cake with skewer.",
        "Pour drizzle over warm cake.",
        "Let cool completely before slicing."
      ]
    },
    { 
      id: 23, 
      name: "Carrot Cake",
      ingredients: [
        "2 cups grated carrots",
        "2 cups all-purpose flour",
        "1 1/2 cups sugar",
        "1 cup vegetable oil",
        "4 eggs",
        "1 cup chopped walnuts",
        "1 tsp baking powder",
        "1 tsp baking soda",
        "1 tsp cinnamon powder",
        "1/2 tsp nutmeg powder",
        "1/2 tsp salt",
        "For cream cheese frosting: 200g cream cheese, 1/2 cup butter, 2 cups powdered sugar"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease cake pans.",
        "Beat eggs and sugar until fluffy.",
        "Add oil, mix well.",
        "Mix flour, baking powder, baking soda, cinnamon, nutmeg, salt.",
        "Add dry ingredients to egg mixture.",
        "Fold in carrots and walnuts.",
        "Divide batter between pans.",
        "Bake for 30-35 minutes.",
        "For frosting: Beat cream cheese and butter until smooth.",
        "Gradually add powdered sugar.",
        "Frost cooled cake layers.",
        "Decorate with extra walnuts."
      ]
    },
    { 
      id: 24, 
      name: "Marble Cake",
      ingredients: [
        "2 cups all-purpose flour",
        "1 1/2 cups sugar",
        "1 cup butter, room temperature",
        "4 eggs",
        "1 cup milk",
        "1 tsp vanilla essence",
        "1 tsp baking powder",
        "1/2 tsp baking soda",
        "1/4 tsp salt",
        "1/4 cup cocoa powder",
        "2 tbsp hot water"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease bundt pan.",
        "Cream butter and sugar until fluffy.",
        "Add eggs one at a time.",
        "Mix in vanilla essence.",
        "Whisk flour, baking powder, baking soda, salt.",
        "Add milk and flour mixture alternately to batter.",
        "Divide batter in half.",
        "Mix cocoa powder and hot water, add to one half.",
        "Alternate spoonfuls of vanilla and chocolate batter in pan.",
        "Swirl with knife for marble effect.",
        "Bake for 45-50 minutes.",
        "Cool in pan for 15 minutes."
      ]
    },
    { 
      id: 25, 
      name: "Coconut Cake",
      ingredients: [
        "2 cups all-purpose flour",
        "1 1/2 cups sugar",
        "1 cup butter, room temperature",
        "4 eggs",
        "1 cup coconut milk",
        "1 cup grated coconut",
        "1 tsp baking powder",
        "1/2 tsp baking soda",
        "1/4 tsp salt",
        "1 tsp vanilla essence",
        "For frosting: 2 cups whipped cream, 1 cup grated coconut"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease cake pans.",
        "Cream butter and sugar until fluffy.",
        "Add eggs one at a time.",
        "Mix in vanilla essence.",
        "Whisk flour, baking powder, baking soda, salt.",
        "Add coconut milk and flour mixture alternately.",
        "Fold in grated coconut.",
        "Divide batter between pans.",
        "Bake for 25-30 minutes.",
        "Cool completely.",
        "Frost with whipped cream.",
        "Coat with grated coconut."
      ]
    },
    { 
      id: 26, 
      name: "Strawberry Shortcake",
      ingredients: [
        "2 cups all-purpose flour",
        "1/3 cup sugar",
        "1 tbsp baking powder",
        "1/2 tsp salt",
        "1/2 cup cold butter",
        "2/3 cup milk",
        "1 egg",
        "For filling: 2 cups sliced strawberries, 2 tbsp sugar",
        "For cream: 2 cups whipped cream"
      ],
      instructions: [
        "Preheat oven to 425°F (220°C).",
        "Mix flour, sugar, baking powder, salt.",
        "Cut cold butter into flour mixture.",
        "Beat milk and egg together, add to flour mixture.",
        "Knead gently, roll out, cut into circles.",
        "Bake for 15 minutes until golden.",
        "Mix strawberries with sugar.",
        "Split shortcakes in half.",
        "Fill with whipped cream and strawberries.",
        "Top with other half.",
        "Serve immediately."
      ]
    },
    { 
      id: 27, 
      name: "Pineapple Upside Down Cake",
      ingredients: [
        "For topping: 1/4 cup butter",
        "1/2 cup brown sugar",
        "6-7 pineapple rings",
        "Maraschino cherries",
        "For cake: 1 1/2 cups all-purpose flour",
        "1 cup sugar",
        "1/2 cup butter, room temperature",
        "2 eggs",
        "1/2 cup pineapple juice",
        "1 tsp baking powder",
        "1/2 tsp baking soda",
        "1/4 tsp salt"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C).",
        "Melt butter in cake pan.",
        "Sprinkle brown sugar over butter.",
        "Arrange pineapple rings and cherries.",
        "Cream butter and sugar until fluffy.",
        "Add eggs one at a time.",
        "Whisk flour, baking powder, baking soda, salt.",
        "Add pineapple juice and flour mixture alternately.",
        "Pour batter over pineapple arrangement.",
        "Bake for 35-40 minutes.",
        "Immediately invert onto serving plate.",
        "Serve warm."
      ]
    },
    { 
      id: 28, 
      name: "Fluffy Vanilla Cake",
      ingredients: [
        "2 1/4 cups all-purpose flour",
        "1 1/2 cups sugar",
        "3/4 cup butter, room temperature",
        "3 eggs",
        "1 cup milk",
        "2 1/2 tsp baking powder",
        "1/2 tsp salt",
        "2 tsp vanilla essence"
      ],
      instructions: [
        "Preheat oven to 350°F (180°C). Grease cake pans.",
        "Cream butter and sugar until fluffy.",
        "Add eggs one at a time.",
        "Mix in vanilla essence.",
        "Whisk flour, baking powder, salt.",
        "Add milk and flour mixture alternately.",
        "Divide batter between pans.",
        "Bake for 25-30 minutes.",
        "Cool completely before frosting."
      ]
    },
    { 
      id: 29, 
      name: "French Heart Puff",
      ingredients: [
        "1 sheet puff pastry",
        "1 cup chocolate hazelnut spread",
        "1 egg, beaten",
        "1 tbsp milk",
        "Powdered sugar for dusting"
      ],
      instructions: [
        "Preheat oven to 400°F (200°C).",
        "Roll out puff pastry.",
        "Cut heart shapes with cookie cutter.",
        "Spread chocolate on half the hearts.",
        "Top with remaining hearts.",
        "Seal edges with fork.",
        "Mix egg and milk, brush on pastries.",
        "Bake for 15-20 minutes until puffed and golden.",
        "Dust with powdered sugar.",
        "Serve warm."
      ]
    },
    { 
      id: 30, 
      name: "Cake Rusk",
      ingredients: [
        "Leftover cake or plain cake",
        "1/2 cup sugar",
        "1/2 cup milk",
        "1/2 tsp cardamom powder",
        "Ghee for frying"
      ],
      instructions: [
        "Cut cake into 1-inch thick slices.",
        "Boil sugar and milk to make syrup.",
        "Add cardamom powder to syrup.",
        "Dip cake slices in syrup briefly.",
        "Heat ghee in pan.",
        "Fry cake slices until golden brown.",
        "Drain on paper towels.",
        "Let cool completely.",
        "Store in airtight container.",
        "Serve with tea."
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
    if (selectedCake && currentStep < selectedCake.instructions.length) {
      stopSpeaking();
      speakInstructions(selectedCake.instructions, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedCake && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedCake.instructions, currentStep - 2);
    }
  };

  const speakStep = (stepIndex) => {
    if (selectedCake && stepIndex >= 0 && stepIndex < selectedCake.instructions.length) {
      stopSpeaking();
      speakInstructions(selectedCake.instructions, stepIndex);
    }
  };

  const toggleVoiceInstructions = () => {
    const newState = !showVoiceInstructions;
    setShowVoiceInstructions(newState);
    
    if (newState && selectedCake && !autoPlayStartedRef.current) {
      autoPlayStartedRef.current = true;
      setTimeout(() => {
        if (showVoiceInstructions && selectedCake) {
          speakInstructions(selectedCake.instructions, 0, true);
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
    if (isModalOpen && showVoiceInstructions && selectedCake && !autoPlayStartedRef.current) {
      autoPlayStartedRef.current = true;
      setTimeout(() => {
        if (showVoiceInstructions && selectedCake && isModalOpen) {
          speakInstructions(selectedCake.instructions, 0, true);
        }
      }, 800);
    }
    
    return () => {
      stopSpeaking();
      autoPlayStartedRef.current = false;
    };
  }, [isModalOpen, showVoiceInstructions, selectedCake]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      autoPlayStartedRef.current = false;
    };
  }, []);

  // Navigation Handlers
  const handleViewRecipe = (cake) => {
    setSelectedCake(cake);
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
    setSelectedCake(null);
    setIsPlaying(false);
    setShowVoiceInstructions(false);
    setCurrentStep(0);
    setProgress(0);
    autoPlayStartedRef.current = false;
  };

  const handleGoBack = () => {
    navigate('/');
  };

  // Filter cakes based on search
  const filteredCakes = cakes.filter(cake =>
    cake.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Search
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="baking-page">
      {/* Header */}
      <header className="baking-header">
        <div className="header-content">
          <h1>Cakes & Bakes Collection</h1>
          <p>Discover delicious cakes and baked goods from around the world</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="baking-main">
        <div className="baking-container">
          {filteredCakes.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No cakes found matching "{searchTerm}"</h3>
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
              <div className="cakes-grid">
                {filteredCakes.map((cake) => (
                  <div key={cake.id} className="cake-card">
                    <div className="cake-card-image">
                      <img 
                        src={cakeImages[cake.id - 1] || cakeImages[0]}
                        alt={cake.name}
                        className="cake-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="cake-card-content">
                      <h3 className="cake-name">{cake.name}</h3>
                      <button 
                        className="view-recipe-btn"
                        onClick={() => handleViewRecipe(cake)}
                      >
                        <i className="fas fa-birthday-cake"></i> View Recipe
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
      {isModalOpen && selectedCake && (
        <div className="recipe-modal-overlay">
          <div className="recipe-modal">
            <div className="modal-header">
              <h2 className="modal-title" style={{color: 'white'}}>{selectedCake.name}</h2>
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
                      {selectedCake.ingredients.map((ingredient, index) => (
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
                      {selectedCake.instructions.map((step, index) => (
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
                          <h4>🎤 Voice Guide for {selectedCake.name}</h4>
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
                            <span>Step {currentStep} of {selectedCake.instructions.length}</span>
                          </div>
                        </div>
                        
                        <div className="voice-buttons">
                          <button 
                            className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                            onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedCake.instructions)}
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
                            disabled={currentStep >= selectedCake.instructions.length}
                          >
                            Next Step <i className="fas fa-forward"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div className="voice-steps-overview">
                        <h5>
                          <i className="fas fa-list-ol"></i> Steps Overview
                          <span className="steps-count">
                            {currentStep}/{selectedCake.instructions.length} Completed
                          </span>
                        </h5>
                        <div className="steps-container">
                          {selectedCake.instructions.map((step, index) => (
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

export default RecipeBakingPage;