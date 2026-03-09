import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeRegionalPage.css';

const RecipeRegionalPage = () => {
  const navigate = useNavigate();
  const [selectedFood, setSelectedFood] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeProvince, setActiveProvince] = useState('Punjab');
  const speechSynthesisRef = useRef(null);

  // Provincial Foods Data with Complete Recipes and Images
  const provincialFoods = {
    Punjab: [
      { 
        id: 1, 
        name: "Sarson Saag With Makki Roti",
        tagline: "Punjabi winter special - mustard greens with corn bread",
        image: "https://c.ndtvimg.com/2022-07/g2rnr1u_saag_120x90_08_July_22.png",
        ingredients: [
          "1 kg mustard leaves (sarson)",
          "500g spinach (palak)",
          "250g corn flour (makki ka atta)",
          "4-5 green chilies",
          "2 inch ginger piece",
          "4-5 garlic cloves",
          "1 large onion, finely chopped",
          "2 tomatoes, chopped",
          "1 tsp turmeric powder",
          "1 tsp red chili powder",
          "Salt to taste",
          "2 tbsp ghee (clarified butter)",
          "Water as needed"
        ],
        steps: [
          "Wash mustard leaves and spinach thoroughly and chop finely.",
          "Grind green chilies, ginger and garlic to make a paste.",
          "In a pressure cooker, add chopped greens, chili-ginger-garlic paste, and salt.",
          "Cook for 4 whistles on medium heat.",
          "Let it cool, then mash the cooked greens using a masher.",
          "Heat ghee in a pan, add chopped onion and sauté until golden brown.",
          "Add chopped tomatoes, turmeric, and red chili powder. Cook until tomatoes soften.",
          "Add the mashed greens mixture and cook for 15-20 minutes on low heat.",
          "For makki roti: Mix corn flour with water to make a soft dough.",
          "Take a portion of dough, place between plastic sheets, and press to make roti.",
          "Cook on hot tawa with ghee until golden brown spots appear.",
          "Serve hot sarson saag with makki roti and white butter."
        ]
      },
      { 
        id: 2, 
        name: "Nihari",
        tagline: "Slow-cooked beef stew with aromatic spices",
        image: "https://images.immediate.co.uk/production/volatile/sites/30/2024/12/Nihari-2c750c0.jpg",
        ingredients: [
          "1 kg beef shank with bones",
          "2 large onions, sliced",
          "4 tbsp wheat flour",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "1 tsp turmeric powder",
          "2 tbsp red chili powder",
          "2 tbsp coriander powder",
          "1 tbsp fennel seeds",
          "1 tsp garam masala powder",
          "1/2 cup oil or ghee",
          "Salt to taste",
          "Ginger slices and green chilies for garnish",
          "Fresh coriander for garnish"
        ],
        steps: [
          "In a large pot, heat oil and fry onions until golden brown. Remove and set aside.",
          "In same oil, add beef pieces and sear on all sides.",
          "Add ginger paste, garlic paste and all dry spices except garam masala.",
          "Add enough water to cover the meat, bring to boil then simmer for 3-4 hours until meat is tender.",
          "Make a slurry with wheat flour and 1/2 cup water, mix until smooth.",
          "Slowly add slurry to nihari while stirring continuously.",
          "Cook for another 30 minutes until gravy thickens.",
          "Add garam masala and adjust salt.",
          "Garnish with fried onions, ginger slices, green chilies and fresh coriander.",
          "Serve hot with naan or sheermal."
        ]
      },
      { 
        id: 3, 
        name: "Paye",
        tagline: "Rich gelatinous trotter soup",
        image: "https://cdn-food.tribune.com.pk/gallery/tNCz9ztiO1l09O1KRGChdW8sw3JSXyzSPsoKNqTb.jpeg",
        ingredients: [
          "8-10 goat or lamb trotters (paye)",
          "2 large onions, chopped",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "1 tsp turmeric powder",
          "2 tbsp red chili powder",
          "1 tbsp coriander powder",
          "1 tsp garam masala",
          "1/2 cup oil",
          "Salt to taste",
          "Water as needed",
          "Ginger slices for garnish",
          "Fresh coriander for garnish",
          "Lemon wedges for serving"
        ],
        steps: [
          "Clean trotters thoroughly and soak in water for 1 hour.",
          "In a pressure cooker, heat oil and fry onions until golden.",
          "Add ginger-garlic paste and sauté for 2 minutes.",
          "Add all dry spices and cook for 1 minute.",
          "Add cleaned trotters and mix well with spices.",
          "Add enough water to cover the trotters.",
          "Close lid and cook for 8-10 whistles until trotters are very tender.",
          "Let pressure release naturally.",
          "Open lid and cook on high heat to thicken gravy if needed.",
          "Adjust seasoning and add garam masala.",
          "Garnish with ginger slices and fresh coriander.",
          "Serve hot with naan or tandoori roti."
        ]
      },
      { 
        id: 4, 
        name: "Chicken Karahi",
        tagline: "Spicy and tangy wok-cooked chicken",
        image: "https://untoldrecipesbynosheen.com/wp-content/uploads/2025/01/charsi-chicken-featured.jpg",
        ingredients: [
          "1 kg chicken, cut into pieces",
          "4 tomatoes, chopped",
          "2 onions, finely chopped",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "4-5 green chilies, slit",
          "1 tsp turmeric powder",
          "2 tbsp red chili powder",
          "1 tbsp coriander powder",
          "1 tsp garam masala",
          "1/2 cup oil",
          "Salt to taste",
          "Fresh coriander for garnish",
          "Ginger slices for garnish",
          "1 tsp black pepper"
        ],
        steps: [
          "Heat oil in a wok (karahi), add chopped onions and sauté until golden.",
          "Add ginger-garlic paste and cook for 2 minutes.",
          "Add chicken pieces and fry until they change color.",
          "Add all dry spices except garam masala, mix well.",
          "Add chopped tomatoes and green chilies, mix thoroughly.",
          "Cover and cook on medium heat until chicken is tender and tomatoes are mushy.",
          "Uncover and cook on high heat to thicken gravy.",
          "Add garam masala and black pepper, mix well.",
          "Garnish with fresh coriander and ginger slices.",
          "Serve hot with naan or roti."
        ]
      },
      { 
        id: 5, 
        name: "Mutton Karahi",
        tagline: "Tender mutton cooked in its own juices",
        image: "https://i.pinimg.com/736x/dc/9c/b0/dc9cb0bf4e3336dce6a965ba53439a0d.jpg",
        ingredients: [
          "1 kg mutton, cut into pieces",
          "4 tomatoes, chopped",
          "2 onions, finely chopped",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "4-5 green chilies",
          "1 tsp turmeric powder",
          "2 tbsp red chili powder",
          "1 tbsp coriander powder",
          "1 tsp garam masala",
          "1/2 cup oil or ghee",
          "Salt to taste",
          "Fresh ginger, julienned",
          "Fresh coriander, chopped"
        ],
        steps: [
          "Heat oil in a wok, add onions and fry until golden brown.",
          "Add ginger-garlic paste and sauté for 2 minutes.",
          "Add mutton pieces and fry until browned on all sides.",
          "Add turmeric, red chili powder, coriander powder and salt.",
          "Add chopped tomatoes and green chilies, mix well.",
          "Add 1 cup water, cover and cook on low heat for 1-1.5 hours until mutton is tender.",
          "Remove lid and cook on high heat to thicken gravy.",
          "Add garam masala and mix well.",
          "Garnish with julienned ginger and fresh coriander.",
          "Serve hot with naan or tandoori roti."
        ]
      },
      { 
        id: 6, 
        name: "Lahori Chargha",
        tagline: "Deep-fried whole chicken with Lahori spices",
        image: "https://i.ytimg.com/vi/nYBztlmoXHU/maxresdefault.jpg",
        ingredients: [
          "1 whole chicken (about 1.5 kg)",
          "2 cups yogurt",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "2 tbsp red chili powder",
          "1 tbsp garam masala",
          "1 tsp turmeric powder",
          "2 tbsp lemon juice",
          "1 tbsp cumin powder",
          "1 tbsp coriander powder",
          "Salt to taste",
          "Oil for deep frying",
          "Food color (optional)",
          "Chat masala for sprinkling"
        ],
        steps: [
          "Clean chicken thoroughly and make deep cuts on breast and legs.",
          "In a large bowl, mix yogurt with all spices and lemon juice.",
          "Apply marinade generously all over chicken, inside and outside.",
          "Cover and refrigerate for at least 6 hours or overnight.",
          "Remove chicken from refrigerator 1 hour before cooking.",
          "Heat oil in a large deep pan for deep frying.",
          "Carefully lower chicken into hot oil, breast side down first.",
          "Fry on medium heat for 15-20 minutes until golden brown.",
          "Turn carefully and fry other side for 15-20 minutes.",
          "Remove and drain on paper towels.",
          "Sprinkle chat masala before serving.",
          "Serve hot with raita and salad."
        ]
      },
      { 
        id: 7, 
        name: "Paneer Tikka",
        tagline: "Grilled cottage cheese with spices",
        image: "https://spicecravings.com/wp-content/uploads/2020/10/Paneer-Tikka-Featured-1.jpg",
        ingredients: [
          "500g paneer, cut into cubes",
          "1 cup thick yogurt",
          "2 tbsp ginger-garlic paste",
          "2 tbsp lemon juice",
          "1 tbsp red chili powder",
          "1 tbsp coriander powder",
          "1 tsp garam masala",
          "1 tsp chaat masala",
          "1 tsp kasoori methi (dried fenugreek leaves)",
          "2 tbsp mustard oil",
          "Salt to taste",
          "1 capsicum, cut into squares",
          "1 onion, cut into squares",
          "1 tomato, cut into squares",
          "Skewers for grilling"
        ],
        steps: [
          "In a bowl, mix yogurt with all spices, lemon juice and mustard oil.",
          "Add paneer cubes, capsicum, onion and tomato to marinade.",
          "Mix gently to coat everything evenly.",
          "Cover and marinate for 2-3 hours in refrigerator.",
          "Thread marinated paneer and vegetables alternately onto skewers.",
          "Preheat oven to 200°C or prepare grill.",
          "Place skewers on baking tray and cook for 15-20 minutes until slightly charred.",
          "Alternatively, cook on stovetop grill pan.",
          "Brush with butter or oil while cooking.",
          "Sprinkle chaat masala and lemon juice before serving.",
          "Serve hot with mint chutney and onion rings."
        ]
      },
      { 
        id: 8, 
        name: "Dal Makhani",
        tagline: "Creamy black lentils slow-cooked with butter",
        image: "https://www.sharmispassions.com/wp-content/uploads/2012/05/dal-makhani7.jpg",
        ingredients: [
          "1 cup whole black lentils (sabut urad dal)",
          "1/4 cup red kidney beans (rajma)",
          "2 onions, finely chopped",
          "3 tomatoes, pureed",
          "2 tbsp ginger-garlic paste",
          "2 green chilies, chopped",
          "1 tsp turmeric powder",
          "2 tsp red chili powder",
          "1 tsp garam masala",
          "1/2 cup cream",
          "2 tbsp butter",
          "2 tbsp oil",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        steps: [
          "Soak black lentils and kidney beans overnight in water.",
          "Drain and pressure cook with 4 cups water and salt for 6-7 whistles.",
          "Heat oil and butter in a pan, add onions and fry until golden.",
          "Add ginger-garlic paste and green chilies, sauté for 2 minutes.",
          "Add tomato puree and cook until oil separates.",
          "Add all dry spices and cook for 1 minute.",
          "Add cooked dal along with its water, mix well.",
          "Simmer on low heat for 30-40 minutes, stirring occasionally.",
          "Add cream and mix well, cook for another 10 minutes.",
          "Add garam masala and adjust seasoning.",
          "Garnish with cream and fresh coriander.",
          "Serve hot with naan or rice."
        ]
      },
      { 
        id: 9, 
        name: "Aloo Paratha",
        tagline: "Stuffed flatbread with spiced potatoes",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxNJiuPVKv48BB7Tz2wVfLjMyLvPnatfq1vg&s",
        ingredients: [
          "For dough: 2 cups whole wheat flour",
          "Water as needed",
          "Salt to taste",
          "For filling: 4 potatoes, boiled and mashed",
          "1 onion, finely chopped",
          "2 green chilies, chopped",
          "1 tsp cumin seeds",
          "1/2 tsp red chili powder",
          "1/2 tsp garam masala",
          "Salt to taste",
          "Fresh coriander, chopped",
          "Ghee or oil for cooking"
        ],
        steps: [
          "Mix flour, salt and water to make soft dough. Cover and rest for 30 minutes.",
          "For filling: Mix mashed potatoes with all filling ingredients.",
          "Divide dough and filling into equal portions.",
          "Take one dough ball, flatten and place filling in center.",
          "Bring edges together to seal the filling completely.",
          "Gently roll out into round paratha, dusting with flour as needed.",
          "Heat tawa and cook paratha on both sides with ghee until golden brown.",
          "Press edges gently while cooking for even cooking.",
          "Repeat with remaining dough and filling.",
          "Serve hot with yogurt, pickle or butter."
        ]
      },
      { 
        id: 10, 
        name: "Aloo Gosht",
        tagline: "Classic meat and potato curry",
        image: "https://untoldrecipesbynosheen.com/wp-content/uploads/2021/08/aloo-gosht-new-featured.jpg",
        ingredients: [
          "500g mutton or beef",
          "4 potatoes, peeled and quartered",
          "2 onions, chopped",
          "2 tomatoes, chopped",
          "2 tbsp ginger-garlic paste",
          "1 tsp turmeric powder",
          "2 tbsp red chili powder",
          "1 tbsp coriander powder",
          "1 tsp garam masala",
          "1/2 cup oil",
          "Salt to taste",
          "Fresh coriander for garnish",
          "Water as needed"
        ],
        steps: [
          "Heat oil in a pressure cooker, add onions and fry until golden.",
          "Add ginger-garlic paste and sauté for 2 minutes.",
          "Add meat and fry until browned on all sides.",
          "Add all dry spices except garam masala, mix well.",
          "Add tomatoes and cook until soft and oil separates.",
          "Add potatoes and mix gently.",
          "Add 2 cups water, cover and cook for 4-5 whistles.",
          "Let pressure release naturally.",
          "Open lid, add garam masala and cook on high heat to thicken gravy.",
          "Garnish with fresh coriander.",
          "Serve hot with naan or rice."
        ]
      },
      { 
        id: 11, 
        name: "Keema Curry",
        tagline: "Spiced minced meat curry",
        image: "https://aromaticessence.co/wp-content/uploads/2023/11/chicken_keema_featured.jpg",
        ingredients: [
          "500g minced meat (beef or mutton)",
          "2 onions, finely chopped",
          "2 tomatoes, chopped",
          "2 tbsp ginger-garlic paste",
          "1 tsp turmeric powder",
          "2 tbsp red chili powder",
          "1 tbsp coriander powder",
          "1 tsp garam masala",
          "1/2 cup oil",
          "Salt to taste",
          "Fresh coriander for garnish",
          "2 green chilies, chopped",
          "1 tsp cumin seeds"
        ],
        steps: [
          "Heat oil in a pan, add cumin seeds and let them crackle.",
          "Add onions and fry until golden brown.",
          "Add ginger-garlic paste and green chilies, sauté for 2 minutes.",
          "Add minced meat and cook until it changes color and water dries up.",
          "Add all dry spices except garam masala, mix well.",
          "Add tomatoes and cook until soft and oil separates.",
          "Add 1 cup water, cover and simmer for 20-25 minutes.",
          "Uncover and cook on high heat to thicken gravy if needed.",
          "Add garam masala and mix well.",
          "Garnish with fresh coriander.",
          "Serve hot with naan or paratha."
        ]
      },
      { 
        id: 12, 
        name: "Kadhi Pakora",
        tagline: "Yogurt curry with gram flour fritters",
        image: "https://i.ytimg.com/vi/DjdnEFQJ6xM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD2ifiDUdOnXN-zpJeOfq0dKWiZzw",
        ingredients: [
          "For pakoras: 1 cup gram flour (besan)",
          "1 onion, chopped",
          "1 green chili, chopped",
          "1/2 tsp baking soda",
          "Water as needed",
          "Oil for deep frying",
          "For kadhi: 1 cup yogurt",
          "1/2 cup gram flour",
          "1 tsp turmeric powder",
          "1 tbsp red chili powder",
          "1 tsp fenugreek seeds",
          "1/2 tsp asafoetida",
          "2 tbsp oil",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        steps: [
          "For pakoras: Mix gram flour with onion, chili, baking soda and salt.",
          "Add water gradually to make thick batter.",
          "Heat oil and drop spoonfuls of batter, fry until golden brown.",
          "For kadhi: Whisk yogurt with gram flour until smooth.",
          "Add 4 cups water, turmeric, red chili powder and salt, mix well.",
          "Heat oil in a pan, add fenugreek seeds and asafoetida.",
          "Add kadhi mixture slowly while stirring continuously.",
          "Cook on medium heat for 15-20 minutes, stirring occasionally.",
          "Add fried pakoras to kadhi and simmer for 5 minutes.",
          "Garnish with fresh coriander.",
          "Serve hot with steamed rice."
        ]
      },
      { 
        id: 13, 
        name: "Punjabi Biryani",
        tagline: "Aromatic layered rice with meat and spices",
        image: "https://i.ytimg.com/vi/qOvXoqjEALM/maxresdefault.jpg",
        ingredients: [
          "500g basmati rice",
          "500g chicken or mutton",
          "2 onions, sliced",
          "2 tomatoes, chopped",
          "2 tbsp ginger-garlic paste",
          "1 cup yogurt",
          "Whole spices: 2 bay leaves, 4 cloves, 4 cardamom, 1 cinnamon stick",
          "1 tsp turmeric powder",
          "2 tbsp biryani masala",
          "Saffron strands soaked in milk",
          "2 tbsp ghee",
          "Oil for frying",
          "Salt to taste",
          "Fresh mint and coriander"
        ],
        steps: [
          "Wash and soak rice for 30 minutes.",
          "Heat oil and fry onions until golden brown, remove half for garnish.",
          "In same oil, add whole spices, then ginger-garlic paste.",
          "Add meat and fry until browned.",
          "Add tomatoes, yogurt and all spices except biryani masala.",
          "Cook until meat is tender and gravy thickens.",
          "Boil rice with salt until 70% cooked, drain.",
          "In a heavy-bottomed pot, layer meat, rice, fried onions, mint and coriander.",
          "Repeat layers, ending with rice layer.",
          "Sprinkle biryani masala, saffron milk and ghee on top.",
          "Cover tightly and cook on low heat for 20 minutes.",
          "Let it rest for 10 minutes before serving.",
          "Serve hot with raita."
        ]
      },
      { 
        id: 14, 
        name: "Keema Naan",
        tagline: "Stuffed bread with spiced minced meat",
        image: "https://www.chilitochoc.com/wp-content/uploads/2025/03/keema-naan-recipe.jpg",
        ingredients: [
          "For dough: 3 cups flour",
          "1 tsp yeast",
          "1 tsp sugar",
          "1 cup warm milk",
          "Salt to taste",
          "For filling: 250g minced meat",
          "1 onion, chopped",
          "2 green chilies, chopped",
          "1 tbsp ginger-garlic paste",
          "1 tsp garam masala",
          "1/2 tsp red chili powder",
          "Salt to taste",
          "Fresh coriander, chopped",
          "Butter for brushing"
        ],
        steps: [
          "Dissolve yeast and sugar in warm milk, let it froth for 10 minutes.",
          "Mix flour and salt, add yeast mixture to make soft dough.",
          "Cover and let it rise for 2 hours.",
          "For filling: Cook minced meat with all spices until dry.",
          "Add onion, chilies and coriander, mix well and cool.",
          "Divide dough into equal portions, roll into balls.",
          "Flatten each ball, place filling in center, seal and roll out gently.",
          "Cook on hot tawa until bubbles appear, then flip.",
          "Apply butter on both sides while cooking.",
          "Alternatively, bake in preheated oven at 200°C for 10-12 minutes.",
          "Serve hot with raita or curry."
        ]
      },
      { 
        id: 15, 
        name: "Kheer",
        tagline: "Creamy rice pudding with nuts",
        image: "https://mypahadidukan.com/cdn/shop/articles/Kesar_Kheer_Recipe_ad0e3b6b-d2aa-45b9-89e0-a7e986ea0bec.jpg?v=1761216555",
        ingredients: [
          "1 liter full-fat milk",
          "1/2 cup basmati rice, washed and soaked",
          "1/2 cup sugar",
          "1/4 cup condensed milk",
          "1/2 tsp cardamom powder",
          "2 tbsp chopped nuts (almonds, pistachios)",
          "1 tbsp raisins",
          "Saffron strands (optional)",
          "Rose water (optional)"
        ],
        steps: [
          "Boil milk in a heavy-bottomed pan.",
          "Add soaked rice and simmer on low heat, stirring occasionally.",
          "Cook until rice is completely soft and milk reduces to half.",
          "Add sugar and condensed milk, mix well.",
          "Continue cooking until desired consistency is reached.",
          "Add cardamom powder and mix.",
          "In a small pan, lightly roast nuts and raisins in ghee.",
          "Add roasted nuts and raisins to kheer.",
          "Add saffron and rose water if using.",
          "Serve warm or chilled, garnished with more nuts."
        ]
      },
      { 
        id: 16, 
        name: "Gajar ka Halwa",
        tagline: "Rich carrot pudding with nuts",
        image: "https://www.cookwithmanali.com/wp-content/uploads/2015/01/Gajar-Halwa-Indian.jpg",
        ingredients: [
          "1 kg carrots, grated",
          "1 liter full-fat milk",
          "1 cup sugar",
          "1/2 cup khoya (milk solids)",
          "1/2 cup ghee",
          "1/2 tsp cardamom powder",
          "1/4 cup chopped nuts (almonds, pistachios)",
          "1 tbsp raisins",
          "Saffron strands (optional)"
        ],
        steps: [
          "Heat ghee in a heavy-bottomed pan.",
          "Add grated carrots and sauté for 10 minutes.",
          "Add milk and cook on medium heat until milk is absorbed.",
          "Add sugar and cook until carrots are soft and mixture thickens.",
          "Crumble khoya and add to halwa, mix well.",
          "Add cardamom powder and mix.",
          "In a small pan, fry nuts and raisins in ghee until golden.",
          "Add fried nuts and raisins to halwa.",
          "Add saffron if using.",
          "Serve hot or warm, garnished with more nuts."
        ]
      },
      { 
        id: 17, 
        name: "Jalebi",
        tagline: "Crispy spiral-shaped sweet in saffron syrup",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykH9IAD-m09RbUrjmiavrZqZL_x2ZZ-FTZg&s",
        ingredients: [
          "For batter: 1 cup all-purpose flour",
          "2 tbsp corn flour",
          "1/2 tsp baking powder",
          "1/2 tsp yeast",
          "Water as needed",
          "For syrup: 2 cups sugar",
          "1 cup water",
          "1/2 tsp cardamom powder",
          "Few saffron strands",
          "1 tsp lemon juice",
          "Oil for deep frying"
        ],
        steps: [
          "Mix flour, corn flour, baking powder and yeast.",
          "Add water gradually to make thick flowing batter.",
          "Cover and ferment for 8-10 hours or overnight.",
          "For syrup: Boil sugar and water until one-string consistency.",
          "Add cardamom, saffron and lemon juice, keep warm.",
          "Heat oil in a flat pan, not too hot.",
          "Fill batter in a piping bag or squeeze bottle.",
          "Pipe concentric circles directly into hot oil.",
          "Fry until golden and crisp on both sides.",
          "Immediately dip in warm syrup for 30 seconds.",
          "Remove and drain on wire rack.",
          "Serve warm or at room temperature."
        ]
      },
      { 
        id: 18, 
        name: "Pinni",
        tagline: "Traditional Punjabi sweet wheat balls",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4yZvoat08yLtAq5DHQfV106XiIvs17diZXA&s",
        ingredients: [
          "2 cups whole wheat flour",
          "1 cup ghee",
          "1 cup sugar",
          "1/2 cup semolina",
          "1/2 cup chopped nuts (almonds, cashews)",
          "1/4 cup desiccated coconut",
          "1 tsp cardamom powder",
          "2 tbsp milk powder",
          "Edible gum (optional)"
        ],
        steps: [
          "Heat ghee in a heavy-bottomed pan.",
          "Add wheat flour and semolina, roast on low heat until golden brown and aromatic.",
          "Add chopped nuts and coconut, roast for 2-3 minutes.",
          "Remove from heat and let it cool slightly.",
          "Add sugar, cardamom powder and milk powder, mix well.",
          "While still warm, take portions and shape into round pinnis.",
          "Press gently to make firm balls.",
          "Let them cool completely to set.",
          "Store in airtight container.",
          "Can be stored for 2-3 weeks."
        ]
      },
      { 
        id: 19, 
        name: "Halwa Puri",
        tagline: "Semolina halwa with deep-fried bread",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwEQMfU7viD2s9o4CRY2EryGfkJqs50bBN_A&s",
        ingredients: [
          "For halwa: 1 cup semolina",
          "1 cup sugar",
          "4 cups water",
          "1/2 cup ghee",
          "1/4 tsp cardamom powder",
          "Food color (optional)",
          "For puri: 2 cups flour",
          "Water as needed",
          "Oil for deep frying",
          "Salt to taste"
        ],
        steps: [
          "For halwa: Heat ghee in a pan, add semolina and roast until golden.",
          "In another pan, boil water with sugar to make syrup.",
          "Carefully add hot syrup to roasted semolina while stirring continuously.",
          "Cook until halwa thickens and leaves sides of pan.",
          "Add cardamom powder and food color if using.",
          "For puri: Mix flour, salt and water to make stiff dough.",
          "Cover and rest for 30 minutes.",
          "Divide dough into small balls, roll out into small circles.",
          "Heat oil and fry puris until they puff up and turn golden.",
          "Serve hot puris with halwa and chickpea curry."
        ]
      },
      { 
        id: 20, 
        name: "Chana Chaat",
        tagline: "Spicy chickpea salad with chutneys",
        image: "https://www.chocolatesandchai.com/wp-content/uploads/2024/07/Chana-Chaat-Featured.jpg",
        ingredients: [
          "2 cups boiled chickpeas",
          "1 onion, finely chopped",
          "1 tomato, chopped",
          "1 cucumber, chopped",
          "2 boiled potatoes, chopped",
          "2 green chilies, chopped",
          "1/4 cup fresh coriander, chopped",
          "2 tbsp tamarind chutney",
          "2 tbsp mint chutney",
          "1 tsp chaat masala",
          "1/2 tsp red chili powder",
          "Salt to taste",
          "Lemon juice to taste",
          "Sev for garnish"
        ],
        steps: [
          "In a large bowl, mix boiled chickpeas, onion, tomato, cucumber and potatoes.",
          "Add green chilies and fresh coriander.",
          "Add tamarind chutney, mint chutney and lemon juice.",
          "Add chaat masala, red chili powder and salt.",
          "Mix everything gently but thoroughly.",
          "Adjust seasoning according to taste.",
          "Garnish with sev and more fresh coriander.",
          "Serve immediately as a snack or appetizer."
        ]
      }
    ],
    Sindh: [
      { 
        id: 21, 
        name: "Sindhi Biryani",
        tagline: "Spicy layered rice dish from Sindh",
        image: "https://images.deliveryhero.io/image/fd-pk/LH/az6q-listing.jpg",
        ingredients: [
          "500g basmati rice",
          "500g mutton or chicken",
          "2 onions, sliced",
          "2 tomatoes, chopped",
          "1 cup yogurt",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "Whole spices: bay leaves, cloves, cardamom, cinnamon",
          "2 tbsp biryani masala",
          "1 tsp turmeric",
          "1/2 cup oil",
          "Salt to taste",
          "Fresh mint and coriander",
          "Saffron milk",
          "Fried onions"
        ],
        steps: [
          "Wash and soak rice for 30 minutes.",
          "Marinate meat with yogurt, ginger-garlic paste, and half the spices.",
          "Heat oil, fry onions until golden, set aside for garnish.",
          "Cook marinated meat until tender, set aside.",
          "Boil rice with salt and whole spices until 70% cooked.",
          "In heavy pot, layer meat, rice, fried onions, mint, and coriander.",
          "Repeat layers, sprinkle biryani masala and saffron milk.",
          "Cover tightly and cook on low heat for 20 minutes.",
          "Let it rest for 10 minutes before serving.",
          "Serve hot with raita and salad."
        ]
      },
      { 
        id: 22, 
        name: "Sai Bhaji",
        tagline: "Sindhi spinach and lentil curry",
        image: "https://images.archanaskitchen.com/images/recipes/indian/main-course/north-indian-vegetarian-recipes/dal-recipes/Sindhi_Sai_Bhaji_Recipe_10_60fff9913e.jpg",
        ingredients: [
          "2 cups spinach",
          "1 cup chana dal (split chickpeas)",
          "1 onion, chopped",
          "2 tomatoes, chopped",
          "2 green chilies",
          "1 tbsp ginger-garlic paste",
          "1 tsp turmeric",
          "1 tsp red chili powder",
          "1/2 tsp garam masala",
          "2 tbsp oil",
          "Salt to taste",
          "Water as needed"
        ],
        steps: [
          "Wash and soak chana dal for 30 minutes.",
          "Wash spinach thoroughly and chop.",
          "Heat oil, sauté onions until golden.",
          "Add ginger-garlic paste and green chilies, cook for 2 minutes.",
          "Add tomatoes and cook until soft.",
          "Add all spices and mix well.",
          "Add soaked dal and spinach.",
          "Add water, cover and cook until dal is tender.",
          "Mash lightly with spoon.",
          "Serve hot with rice or roti."
        ]
      },
      { 
        id: 23, 
        name: "Koki",
        tagline: "Sindhi-style spiced flatbread",
        image: "https://images.squarespace-cdn.com/content/v1/578753d7d482e9c3a909de40/1670476246847-CXXOWNG6U3BV47G0R1X0/62193220_893548307661795_8840174405858177766_n.jpg?format=2500w",
        ingredients: [
          "2 cups whole wheat flour",
          "1 onion, finely chopped",
          "2 green chilies, chopped",
          "1/4 cup fresh coriander, chopped",
          "1 tsp cumin seeds",
          "1/2 tsp red chili powder",
          "Salt to taste",
          "Water as needed",
          "Ghee for cooking"
        ],
        steps: [
          "Mix flour with all ingredients except water and ghee.",
          "Add water gradually to make stiff dough.",
          "Divide into equal portions.",
          "Roll out each portion into thick roti.",
          "Cook on hot tawa with ghee until golden brown on both sides.",
          "Press with spatula while cooking.",
          "Serve hot with yogurt or pickle."
        ]
      },
      { 
        id: 24, 
        name: "Dal Pakwan",
        tagline: "Sindhi breakfast - lentils with crispy flatbread",
        image: "https://www.secondrecipe.com/wp-content/uploads/2021/02/dal-pakwaan-2021-2-500x500.jpg",
        ingredients: [
          "For dal: 1 cup chana dal",
          "1 tsp cumin seeds",
          "1/2 tsp asafoetida",
          "1 tsp red chili powder",
          "1/2 tsp turmeric",
          "Salt to taste",
          "For pakwan: 2 cups flour",
          "1/2 tsp carom seeds",
          "Salt to taste",
          "Water as needed",
          "Oil for frying",
          "Tamarind chutney for serving"
        ],
        steps: [
          "Soak chana dal for 2 hours.",
          "Pressure cook dal with turmeric and salt until soft.",
          "Temper with cumin seeds and asafoetida.",
          "For pakwan: Mix flour, carom seeds, and salt.",
          "Add water to make stiff dough, rest for 30 minutes.",
          "Divide dough, roll out thin circles.",
          "Prick with fork and deep fry until crisp.",
          "Serve dal with pakwan and tamarind chutney."
        ]
      },
      { 
        id: 25, 
        name: "Seyal Mani",
        tagline: "Spicy leftover bread curry",
        image: "https://img-cdn.publive.online/fit-in/1200x675/sanjeev-kapoor/media/post_banners/ff3071ffeb8e2cb21c85974fca89a0c515f82d7a9512e930c1cec0c0e2ab38fb.jpg",
        ingredients: [
          "Leftover rotis or bread slices",
          "2 onions, sliced",
          "2 tomatoes, chopped",
          "2 green chilies",
          "1 tbsp ginger-garlic paste",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp coriander powder",
          "Fresh coriander",
          "Oil for cooking",
          "Water as needed"
        ],
        steps: [
          "Tear rotis into bite-sized pieces.",
          "Heat oil, sauté onions until golden.",
          "Add ginger-garlic paste and green chilies.",
          "Add tomatoes and cook until soft.",
          "Add all spices and cook for 2 minutes.",
          "Add water to make gravy.",
          "Add torn rotis, mix gently.",
          "Cook for 5 minutes until rotis absorb flavors.",
          "Garnish with fresh coriander.",
          "Serve hot."
        ]
      },
      { 
        id: 26, 
        name: "Seyal Dabroti",
        tagline: "Spicy bread curry with tomatoes",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXLEbeA_qhXdxoxSBP_01P4s6df92P45cBMw&s",
        ingredients: [
          "Leftover bread slices",
          "2 onions, chopped",
          "2 tomatoes, pureed",
          "2 green chilies",
          "1 tbsp ginger paste",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp cumin seeds",
          "Fresh coriander",
          "Oil for cooking",
          "Water as needed"
        ],
        steps: [
          "Toast bread slices lightly.",
          "Heat oil, add cumin seeds.",
          "Add onions and sauté until golden.",
          "Add ginger paste and green chilies.",
          "Add tomato puree and cook until oil separates.",
          "Add spices and water to make gravy.",
          "Add toasted bread slices.",
          "Cook for 5-7 minutes until bread absorbs gravy.",
          "Garnish with fresh coriander.",
          "Serve immediately."
        ]
      },
      { 
        id: 27, 
        name: "Bhee Patata",
        tagline: "Sindhi lotus stem and potato curry",
        image: "https://sindhirasoi.com/wp-content/uploads/2009/01/bheepatata.jpg",
        ingredients: [
          "250g lotus stem (bhee)",
          "2 potatoes, cubed",
          "1 onion, chopped",
          "2 tomatoes, chopped",
          "1 tbsp ginger-garlic paste",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp coriander powder",
          "Oil for cooking",
          "Salt to taste",
          "Fresh coriander"
        ],
        steps: [
          "Clean and slice lotus stem.",
          "Boil lotus stem and potatoes until tender.",
          "Heat oil, sauté onions until golden.",
          "Add ginger-garlic paste and cook for 2 minutes.",
          "Add tomatoes and cook until soft.",
          "Add all spices and mix well.",
          "Add boiled lotus stem and potatoes.",
          "Cook for 10 minutes on low heat.",
          "Garnish with fresh coriander.",
          "Serve hot with roti."
        ]
      },
      { 
        id: 28, 
        name: "Kadhi Chawal",
        tagline: "Sindhi yogurt curry with rice",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7JakS3VBVB0s_eDi0Sco2U0wVoeocJz81oA&s",
        ingredients: [
          "For kadhi: 1 cup yogurt",
          "1/2 cup gram flour",
          "1 tsp turmeric",
          "1 tsp red chili powder",
          "1/2 tsp fenugreek seeds",
          "1/2 tsp mustard seeds",
          "Curry leaves",
          "Oil for tempering",
          "Salt to taste",
          "For rice: 2 cups basmati rice",
          "Water for cooking"
        ],
        steps: [
          "Whisk yogurt with gram flour until smooth.",
          "Add 4 cups water, turmeric, and salt.",
          "Heat oil, add fenugreek and mustard seeds.",
          "Add curry leaves and pour into yogurt mixture.",
          "Cook on medium heat for 20 minutes, stirring occasionally.",
          "For rice: Wash and soak rice for 30 minutes.",
          "Cook rice with salt until done.",
          "Serve hot kadhi with steamed rice."
        ]
      },
      { 
        id: 29, 
        name: "Pallo Fish",
        tagline: "Sindhi-style Hilsa fish curry",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ZPOOP2ATuoBdV2s1vjEB5X1s7t9v0xY4Bg&s",
        ingredients: [
          "4 pieces Palla fish (Hilsa)",
          "2 onions, ground to paste",
          "2 tomatoes, pureed",
          "2 tbsp ginger-garlic paste",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp coriander powder",
          "1/2 tsp garam masala",
          "Oil for cooking",
          "Salt to taste",
          "Fresh coriander"
        ],
        steps: [
          "Clean fish and apply turmeric and salt.",
          "Heat oil, shallow fry fish until golden, set aside.",
          "In same oil, add onion paste and cook until golden.",
          "Add ginger-garlic paste and cook for 2 minutes.",
          "Add tomato puree and cook until oil separates.",
          "Add all spices and cook for 2 minutes.",
          "Add water to make gravy.",
          "Add fried fish and simmer for 10 minutes.",
          "Garnish with fresh coriander.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 30, 
        name: "Sindhi Pulao",
        tagline: "Aromatic rice with meat and spices",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTixFcVtLdTDFxZ0mwIHiqxbNEYiTlU2fA5zA&s",
        ingredients: [
          "2 cups basmati rice",
          "500g mutton or chicken",
          "2 onions, sliced",
          "2 tomatoes, chopped",
          "1 cup yogurt",
          "2 tbsp ginger-garlic paste",
          "Whole spices",
          "2 tsp pulao masala",
          "1/2 cup oil",
          "Salt to taste",
          "Fried onions",
          "Fresh mint"
        ],
        steps: [
          "Wash and soak rice for 30 minutes.",
          "Marinate meat with yogurt and half the spices.",
          "Heat oil, fry onions until golden.",
          "Add ginger-garlic paste and whole spices.",
          "Add marinated meat and cook until tender.",
          "Add tomatoes and cook until soft.",
          "Add rice, water, and remaining spices.",
          "Cook covered until rice is done.",
          "Garnish with fried onions and mint.",
          "Serve hot with raita."
        ]
      },
      { 
        id: 31, 
        name: "Aloo Tuk",
        tagline: "Crispy Sindhi-style potato snack",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDTeW5SD9i9_t9M52D7aVO8uQKcwXQ-YvuQQ&s",
        ingredients: [
          "4 large potatoes",
          "1 tsp red chili powder",
          "1/2 tsp chaat masala",
          "1/2 tsp cumin powder",
          "Salt to taste",
          "Oil for deep frying",
          "Tamarind chutney for serving",
          "Fresh coriander for garnish"
        ],
        steps: [
          "Boil potatoes until just tender, not too soft.",
          "Peel and flatten slightly with palm.",
          "Deep fry until golden and crispy.",
          "Sprinkle all spices while still hot.",
          "Drizzle with tamarind chutney.",
          "Garnish with fresh coriander.",
          "Serve hot as snack."
        ]
      },
      { 
        id: 32, 
        name: "Besan ki Sabzi",
        tagline: "Sindhi gram flour curry",
        image: "https://i.ytimg.com/vi/nALDfHFa2NY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBf1KnWcSxgkm5sGb5tBWy4ZFRJ8w",
        ingredients: [
          "2 cups gram flour",
          "2 onions, chopped",
          "2 tomatoes, chopped",
          "2 green chilies",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp cumin seeds",
          "1/2 tsp asafoetida",
          "Oil for cooking",
          "Salt to taste",
          "Fresh coriander"
        ],
        steps: [
          "Mix gram flour with water to make thick batter.",
          "Heat oil, add cumin seeds and asafoetida.",
          "Add onions and sauté until golden.",
          "Add green chilies and tomatoes.",
          "Cook until tomatoes are soft.",
          "Add all spices and mix well.",
          "Add gram flour batter, stirring continuously.",
          "Cook until mixture thickens and leaves sides.",
          "Garnish with fresh coriander.",
          "Serve hot with roti."
        ]
      },
      { 
        id: 33, 
        name: "Bhugal Bhee",
        tagline: "Stir-fried lotus stem",
        image: "https://i.ytimg.com/vi/UuQd7Ujcfro/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDOAIXIo_TMiK0YAkHvIufOWxDpWQ",
        ingredients: [
          "250g lotus stem",
          "2 onions, chopped",
          "2 tomatoes, chopped",
          "1 tbsp ginger-garlic paste",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp coriander powder",
          "Oil for cooking",
          "Salt to taste",
          "Fresh coriander"
        ],
        steps: [
          "Clean and slice lotus stem.",
          "Boil until tender, drain.",
          "Heat oil, sauté onions until golden.",
          "Add ginger-garlic paste and cook for 2 minutes.",
          "Add tomatoes and cook until soft.",
          "Add all spices and mix well.",
          "Add boiled lotus stem.",
          "Cook for 10-15 minutes on low heat.",
          "Garnish with fresh coriander.",
          "Serve hot."
        ]
      },
      { 
        id: 34, 
        name: "Karela Gosht",
        tagline: "Meat curry with bitter gourd",
        image: "https://i.ytimg.com/vi/Y5neYE9835g/maxresdefault.jpg",
        ingredients: [
          "500g mutton",
          "4 bitter gourds (karela)",
          "2 onions, chopped",
          "2 tomatoes, chopped",
          "2 tbsp ginger-garlic paste",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp coriander powder",
          "Oil for cooking",
          "Salt to taste"
        ],
        steps: [
          "Cut bitter gourds, remove seeds, salt and set aside for 30 minutes.",
          "Wash and squeeze out bitterness.",
          "Heat oil, fry bitter gourds until golden, set aside.",
          "In same oil, cook mutton with onions and spices until tender.",
          "Add tomatoes and cook until soft.",
          "Add fried bitter gourds, simmer for 10 minutes.",
          "Serve hot with roti."
        ]
      },
      { 
        id: 35, 
        name: "Sindhi Kadi",
        tagline: "Tangy gram flour curry with vegetables",
        image: "https://www.whiskaffair.com/wp-content/uploads/2021/06/Sindhi-Kadhi-2-3.jpg",
        ingredients: [
          "1 cup yogurt",
          "1/2 cup gram flour",
          "1 tsp turmeric",
          "1 tsp red chili powder",
          "1/2 tsp fenugreek seeds",
          "1/2 tsp mustard seeds",
          "Curry leaves",
          "2 tbsp tamarind pulp",
          "Oil for tempering",
          "Salt to taste",
          "Vegetables of choice"
        ],
        steps: [
          "Whisk yogurt with gram flour until smooth.",
          "Add 4 cups water, turmeric, and salt.",
          "Add vegetables and cook until tender.",
          "Heat oil, add fenugreek and mustard seeds.",
          "Add curry leaves and pour tempering into kadi.",
          "Add tamarind pulp and mix well.",
          "Simmer for 10 minutes.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 36, 
        name: "Mitho Lolo",
        tagline: "Sindhi sweet flatbread",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4AocMWkgq90dkNh0wXySWer0Y36zs7IKiLQ&s",
        ingredients: [
          "2 cups wheat flour",
          "1/2 cup jaggery, grated",
          "1/4 cup ghee",
          "1/2 tsp cardamom powder",
          "Water as needed",
          "Ghee for cooking"
        ],
        steps: [
          "Mix flour with jaggery and cardamom powder.",
          "Add ghee and rub into flour.",
          "Add water gradually to make soft dough.",
          "Divide into portions, roll out thick rotis.",
          "Cook on tawa with ghee until golden on both sides.",
          "Serve warm."
        ]
      },
      { 
        id: 37, 
        name: "Gur Papdi",
        tagline: "Sindhi jaggery sweet squares",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdmJs0XuoeNDjxNhVDpZt8SWijKnmeefOfTQ&s",
        ingredients: [
          "1 cup whole wheat flour",
          "1 cup jaggery, grated",
          "1/2 cup ghee",
          "1/2 tsp cardamom powder",
          "2 tbsp chopped nuts"
        ],
        steps: [
          "Heat ghee in a pan.",
          "Add wheat flour and roast on low heat until golden.",
          "Add jaggery and cardamom powder.",
          "Mix well until jaggery melts.",
          "Pour into greased tray, spread evenly.",
          "Sprinkle chopped nuts and press lightly.",
          "Cut into squares while warm.",
          "Let it cool completely before storing."
        ]
      },
      { 
        id: 38, 
        name: "Khajoor Pak",
        tagline: "Date and coconut sweet rolls",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYLrJhey5xJe1X4oeoWeXN687Mqi1eE4Zn2Q&s",
        ingredients: [
          "250g dates, pitted",
          "1 cup desiccated coconut",
          "1/2 cup ghee",
          "1/2 cup milk powder",
          "1/2 tsp cardamom powder",
          "Chopped nuts for garnish"
        ],
        steps: [
          "Chop dates finely.",
          "Heat ghee in a pan.",
          "Add dates and cook on low heat until soft.",
          "Add coconut and milk powder.",
          "Mix well and cook for 5 minutes.",
          "Add cardamom powder and mix.",
          "Spread on greased tray, press firmly.",
          "Garnish with chopped nuts.",
          "Cut into pieces when cool."
        ]
      },
      { 
        id: 39, 
        name: "Rabri",
        tagline: "Thickened sweetened milk with nuts",
        image: "https://www.flavoursonplate.com/wp-content/uploads/2018/12/Rabri-recipe-1.jpg",
        ingredients: [
          "2 liters full-fat milk",
          "1/2 cup sugar",
          "1/2 tsp cardamom powder",
          "2 tbsp chopped nuts",
          "Saffron strands"
        ],
        steps: [
          "Boil milk in heavy-bottomed pan.",
          "Simmer on low heat, stirring occasionally.",
          "When layer forms on top, push to sides.",
          "Continue until milk reduces to one-third.",
          "Add sugar and cardamom powder.",
          "Mix well and cook for 5 minutes.",
          "Add saffron and half the nuts.",
          "Chill completely before serving.",
          "Garnish with remaining nuts."
        ]
      },
      { 
        id: 40, 
        name: "Thadal",
        tagline: "Sindhi cold almond drink",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCpFNlDd4mEAIMvFEbU7n_wRuWnT298E2trWilCCeHQ-Q54zhdhb3UHMCqF_N9WnFu-ontcOKtXa_Ddr47Nj2raWQ1ZShh-tkjauD6wl4yT-g4jOq3-4qS7BeZx8Z7q-kwJA0gbOUQ8ARF/s1600/044.jpg",
        ingredients: [
          "1/2 cup almonds, soaked",
          "1/4 cup melon seeds",
          "1/4 cup poppy seeds",
          "2 tbsp fennel seeds",
          "1 tsp cardamom powder",
          "1/2 tsp black pepper",
          "1/2 tsp nutmeg powder",
          "Sugar to taste",
          "Milk as needed",
          "Ice cubes"
        ],
        steps: [
          "Soak almonds overnight, peel.",
          "Soak melon seeds, poppy seeds, and fennel seeds for 2 hours.",
          "Grind all soaked ingredients with little water to make paste.",
          "Strain through muslin cloth.",
          "Add milk to strained liquid.",
          "Add sugar and all spices.",
          "Mix well and chill.",
          "Serve cold with ice cubes."
        ]
      }
    ],
    KPK: [
      { 
        id: 41, 
        name: "Chapli Kabab",
        tagline: "Spiced flattened beef patties from Peshawar",
        image: "https://www.chilitochoc.com/wp-content/uploads/2023/06/easy-pakistani-beef-chapli-kabab-500x500.jpg",
        ingredients: [
          "500g minced beef",
          "1 onion, finely chopped",
          "2 tomatoes, finely chopped",
          "2 green chilies, chopped",
          "1/4 cup fresh coriander, chopped",
          "1/4 cup fresh mint, chopped",
          "1 tbsp ginger-garlic paste",
          "1 tsp red chili powder",
          "1 tsp coriander powder",
          "1 tsp cumin powder",
          "1 egg",
          "2 tbsp corn flour",
          "Oil for frying",
          "Salt to taste"
        ],
        steps: [
          "Mix all ingredients except oil thoroughly.",
          "Knead mixture for 5 minutes.",
          "Cover and refrigerate for 1 hour.",
          "Take portions and shape into flat round kababs.",
          "Heat oil in pan, shallow fry until golden brown on both sides.",
          "Press with spatula while cooking.",
          "Serve hot with naan and salad."
        ]
      },
      { 
        id: 42, 
        name: "Peshawari Karahi",
        tagline: "Simple yet flavorful meat karahi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAH1j7-w2Co9beTUEryPcKwd_HjfeyFYb3eA&s",
        ingredients: [
          "1 kg chicken or mutton",
          "2 onions, sliced",
          "4 tomatoes, chopped",
          "2 tbsp ginger-garlic paste",
          "4-5 green chilies",
          "1 tsp turmeric powder",
          "2 tbsp red chili powder",
          "1 tbsp coriander powder",
          "1/2 cup oil or ghee",
          "Salt to taste",
          "Fresh coriander for garnish",
          "Ginger slices for garnish"
        ],
        steps: [
          "Heat oil in wok, add onions and fry until golden.",
          "Add ginger-garlic paste and green chilies, sauté.",
          "Add meat and fry until browned.",
          "Add all spices and mix well.",
          "Add tomatoes and cook until soft and oil separates.",
          "Cook until meat is tender.",
          "Garnish with fresh coriander and ginger slices.",
          "Serve hot with naan."
        ]
      },
      { 
        id: 43, 
        name: "Shinwari Roast",
        tagline: "Simple roasted lamb from Shinwari tribe",
        image: "https://images.deliveryhero.io/image/fd-pk/LH/r78j-listing.jpg",
        ingredients: [
          "1 kg lamb leg or shoulder",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "2 tbsp lemon juice",
          "1 tbsp black pepper",
          "1 tbsp salt",
          "1 tsp cumin powder",
          "1/2 cup oil",
          "Potatoes for roasting",
          "Onions for serving"
        ],
        steps: [
          "Make deep cuts in meat.",
          "Mix all spices with oil and lemon juice to make marinade.",
          "Apply marinade generously all over meat.",
          "Marinate for at least 4 hours or overnight.",
          "Preheat oven to 180°C.",
          "Roast meat for 1.5-2 hours until tender.",
          "Add potatoes around meat halfway through cooking.",
          "Rest for 15 minutes before slicing.",
          "Serve with onions and naan."
        ]
      },
      { 
        id: 44, 
        name: "Peshawari Naan",
        tagline: "Sweet and nutty stuffed naan",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8GvvStdu7pyhZ_9L3wKH50IcfXEPK_kW54g&s",
        ingredients: [
          "3 cups flour",
          "1 tsp yeast",
          "1 tsp sugar",
          "1 cup warm milk",
          "2 tbsp yogurt",
          "2 tbsp ghee",
          "Salt to taste",
          "Kalongi (nigella seeds) for topping",
          "Butter for brushing"
        ],
        steps: [
          "Dissolve yeast and sugar in warm milk.",
          "Mix flour, salt, yogurt and ghee.",
          "Add yeast mixture and knead to soft dough.",
          "Cover and let rise for 2 hours.",
          "Divide dough, roll into oval shape.",
          "Sprinkle kalongi, press lightly.",
          "Bake in hot tandoor or oven at 250°C for 5-7 minutes.",
          "Brush with butter and serve hot."
        ]
      },
      { 
        id: 45, 
        name: "Namak Mandi Karahi",
        tagline: "Famous Namak Mandi style karahi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQItXJwoSHjfWHASje-47X0Erz3Up5KOPwe7A&s",
        ingredients: [
          "1 kg mutton, cut into pieces",
          "1 cup oil or ghee",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "1 tbsp black pepper",
          "1 tbsp salt",
          "1 tsp cumin seeds",
          "Green chilies for garnish",
          "Fresh coriander for garnish",
          "Ginger slices for garnish"
        ],
        steps: [
          "Heat oil in wok until smoking hot.",
          "Add mutton and fry on high heat for 10 minutes.",
          "Add ginger-garlic paste and fry for 5 minutes.",
          "Add black pepper, salt and cumin seeds.",
          "Cover and cook on low heat until meat is tender.",
          "Uncover and cook on high heat to thicken gravy.",
          "Garnish with green chilies, coriander and ginger.",
          "Serve hot with naan."
        ]
      },
      { 
        id: 46, 
        name: "Kabuli Pulao",
        tagline: "Afghan-style rice with carrots and raisins",
        image: "https://www.thedeliciouscrescent.com/wp-content/uploads/2024/08/Kabuli-Pulao-1.jpg",
        ingredients: [
          "2 cups basmati rice",
          "500g mutton with bones",
          "2 carrots, julienned",
          "1/2 cup raisins",
          "1/2 cup almonds, sliced",
          "1 onion, sliced",
          "2 tbsp sugar",
          "1 tsp cardamom powder",
          "1 tsp cumin seeds",
          "Oil for cooking",
          "Salt to taste"
        ],
        steps: [
          "Wash and soak rice for 30 minutes.",
          "Cook mutton with salt until tender.",
          "Heat oil, fry onions until golden, set aside.",
          "In same oil, caramelize sugar until brown.",
          "Add carrots and fry for 2 minutes.",
          "Add boiled mutton and mix well.",
          "Add rice, water, and spices.",
          "Cook covered until rice is done.",
          "Garnish with fried onions, raisins and almonds.",
          "Serve hot."
        ]
      },
      { 
        id: 47, 
        name: "Mutton Shorba",
        tagline: "Light and flavorful mutton soup",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhD805SmrgVj9G_QxA9bEumIXg-ggCX_AyHA&s",
        ingredients: [
          "500g mutton with bones",
          "2 onions, chopped",
          "2 tomatoes, chopped",
          "2 tbsp ginger-garlic paste",
          "1 tsp turmeric powder",
          "1 tsp red chili powder",
          "1 tsp garam masala",
          "2 liters water",
          "Fresh coriander for garnish",
          "Lemon wedges for serving"
        ],
        steps: [
          "In pressure cooker, add all ingredients except garam masala.",
          "Cook for 6-7 whistles until meat is tender.",
          "Let pressure release naturally.",
          "Remove meat from bones if desired.",
          "Add garam masala and simmer for 10 minutes.",
          "Adjust seasoning.",
          "Garnish with fresh coriander.",
          "Serve hot with lemon wedges."
        ]
      },
      { 
        id: 48, 
        name: "Kachaloo Salad",
        tagline: "Spiced potato salad",
        image: "https://www.thesecretingredient.in/wp-content/uploads/2014/09/Aloo-Kachalu-Chat-1.jpg",
        ingredients: [
          "4 boiled potatoes, cubed",
          "1 onion, finely chopped",
          "2 tomatoes, chopped",
          "2 green chilies, chopped",
          "1/4 cup fresh coriander, chopped",
          "1 tsp chaat masala",
          "1/2 tsp red chili powder",
          "Salt to taste",
          "Lemon juice to taste"
        ],
        steps: [
          "Mix all vegetables in bowl.",
          "Add all spices and lemon juice.",
          "Mix gently but thoroughly.",
          "Adjust seasoning to taste.",
          "Chill for 30 minutes before serving.",
          "Serve as side dish."
        ]
      },
      { 
        id: 49, 
        name: "Seekh Kabab",
        tagline: "Minced meat skewers with spices",
        image: "https://foodiesterminal.com/wp-content/uploads/2019/04/Mutton-seekh-kabab-recipe-14.jpg",
        ingredients: [
          "500g minced beef",
          "1 onion, finely chopped",
          "2 green chilies, chopped",
          "1/4 cup fresh coriander, chopped",
          "1/4 cup fresh mint, chopped",
          "1 tbsp ginger-garlic paste",
          "1 tsp garam masala",
          "1 tsp red chili powder",
          "1 egg",
          "2 tbsp gram flour",
          "Salt to taste",
          "Skewers for grilling"
        ],
        steps: [
          "Mix all ingredients except egg and gram flour.",
          "Knead mixture for 5 minutes.",
          "Add egg and gram flour, mix well.",
          "Cover and refrigerate for 2 hours.",
          "Wet hands, shape mixture around skewers.",
          "Grill on barbecue or oven until cooked through.",
          "Brush with oil while cooking.",
          "Serve hot with naan and chutney."
        ]
      },
      { 
        id: 50, 
        name: "Gola Kabab",
        tagline: "Round meatballs in gravy",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUioMbi-TY4tlUac__F_tMK7HQlIgqjHww5g&s",
        ingredients: [
          "500g minced beef",
          "1 onion, grated",
          "1 tbsp ginger-garlic paste",
          "1 tsp red chili powder",
          "1 tsp coriander powder",
          "1/2 tsp garam masala",
          "1 egg",
          "2 tbsp breadcrumbs",
          "Oil for frying",
          "Salt to taste"
        ],
        steps: [
          "Mix all ingredients thoroughly.",
          "Shape into small round balls.",
          "Heat oil, deep fry until golden brown.",
          "Drain on paper towels.",
          "Serve hot with chutney."
        ]
      },
      { 
        id: 51, 
        name: "Bannu Charsi Tikka",
        tagline: "Famous Bannu-style grilled meat",
        image: "https://i.ytimg.com/vi/7-JtQZ7B2xI/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGHIgUig7MA8=&rs=AOn4CLC7KAOC35tht4WAtgYBXb8H-qDBgw",
        ingredients: [
          "1 kg beef or mutton, cubed",
          "1 cup oil",
          "1 tbsp ginger paste",
          "1 tbsp garlic paste",
          "1 tbsp black pepper",
          "1 tbsp salt",
          "1 tsp cumin powder",
          "Lemon wedges for serving",
          "Onion rings for serving"
        ],
        steps: [
          "Mix all spices with oil to make marinade.",
          "Apply marinade to meat cubes.",
          "Marinate for at least 4 hours.",
          "Thread onto skewers.",
          "Grill on charcoal or in oven until cooked.",
          "Brush with oil while cooking.",
          "Serve hot with lemon and onions."
        ]
      },
      { 
        id: 52, 
        name: "Mutton Shinwari",
        tagline: "Traditional Shinwari-style mutton",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcDD8YrkUt7U9wfDWw9IRKo2y8jLG-XmFKDw&s",
        ingredients: [
          "1 kg mutton, cut into pieces",
          "1/2 cup oil",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "1 tbsp black pepper",
          "1 tbsp salt",
          "1 tsp cumin seeds",
          "Green chilies for garnish",
          "Fresh coriander for garnish"
        ],
        steps: [
          "Heat oil until smoking hot.",
          "Add mutton and fry on high heat.",
          "Add ginger-garlic paste and fry.",
          "Add spices and mix well.",
          "Cover and cook on low heat until tender.",
          "Uncover and cook on high to thicken.",
          "Garnish with green chilies and coriander.",
          "Serve hot with naan."
        ]
      },
      { 
        id: 53, 
        name: "Shahi Tukda",
        tagline: "Royal bread pudding with saffron",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM9vY_INotQ8fwxR6Ew23JaVXErngetz8BDg&s",
        ingredients: [
          "8 slices bread",
          "1 liter milk",
          "1/2 cup sugar",
          "1/2 tsp cardamom powder",
          "2 tbsp chopped nuts",
          "Saffron strands",
          "Ghee for frying",
          "2 tbsp condensed milk"
        ],
        steps: [
          "Cut bread slices into triangles.",
          "Fry in ghee until golden, set aside.",
          "Boil milk until reduced to half.",
          "Add sugar, cardamom and condensed milk.",
          "Add saffron and half the nuts.",
          "Arrange fried bread in serving dish.",
          "Pour hot milk mixture over bread.",
          "Garnish with remaining nuts.",
          "Serve warm or chilled."
        ]
      },
      { 
        id: 54, 
        name: "Kawa",
        tagline: "Traditional green tea with spices",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREXDXc3FVaWPPgvG8GRqD4bJEx9_e7aWI6hA&s",
        ingredients: [
          "4 cups water",
          "2 tbsp green tea leaves",
          "4-5 cardamom pods",
          "1 inch cinnamon stick",
          "2-3 cloves",
          "Sugar to taste",
          "Pistachios for garnish"
        ],
        steps: [
          "Boil water with all spices for 10 minutes.",
          "Add green tea leaves, simmer for 2 minutes.",
          "Strain into cups.",
          "Add sugar to taste.",
          "Garnish with crushed pistachios.",
          "Serve hot."
        ]
      },
      { 
        id: 55, 
        name: "Sajji",
        tagline: "Whole roasted lamb Balochi-style",
        image: "https://www.tandoorihut.com.pk/wp-content/uploads/2014/12/mutton-leg.jpg",
        ingredients: [
          "1 whole lamb or chicken",
          "1 cup oil",
          "2 tbsp salt",
          "1 tbsp black pepper",
          "1 tbsp cumin powder",
          "Lemon juice",
          "Rice for serving",
          "Salad for serving"
        ],
        steps: [
          "Clean meat thoroughly.",
          "Make marinade with oil and spices.",
          "Apply marinade all over meat.",
          "Marinate for 6-8 hours.",
          "Skewer and roast over charcoal slowly.",
          "Baste with oil while cooking.",
          "Cook until golden and tender.",
          "Serve with rice and salad."
        ]
      },
      { 
        id: 56, 
        name: "Kaak",
        tagline: "Traditional hard bread rings",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1QvbyBP6QfbSbZ--ToLeiV9P26_kWzCdihw&s",
        ingredients: [
          "3 cups flour",
          "1/2 cup ghee",
          "1 tsp yeast",
          "1 tsp sugar",
          "Warm water as needed",
          "Sesame seeds for topping",
          "Salt to taste"
        ],
        steps: [
          "Dissolve yeast and sugar in warm water.",
          "Mix flour, salt and ghee.",
          "Add yeast mixture and knead to stiff dough.",
          "Cover and rise for 2 hours.",
          "Shape into rings or ovals.",
          "Sprinkle sesame seeds.",
          "Bake at 180°C for 20-25 minutes until golden.",
          "Cool completely before storing."
        ]
      },
      { 
        id: 57, 
        name: "Balochi Pulao",
        tagline: "Balochistan-style meat rice",
        image: "https://i.ytimg.com/vi/A4ZC-xNNt7c/maxresdefault.jpg",
        ingredients: [
          "2 cups basmati rice",
          "500g mutton",
          "2 onions, sliced",
          "1 tsp cumin seeds",
          "1 tsp black pepper",
          "1 tsp salt",
          "1/2 cup oil",
          "Carrots for garnish",
          "Raisins for garnish"
        ],
        steps: [
          "Wash and soak rice for 30 minutes.",
          "Cook mutton with salt until tender.",
          "Heat oil, fry onions until golden.",
          "Add cumin seeds and black pepper.",
          "Add cooked mutton and rice.",
          "Add water and cook covered until rice is done.",
          "Garnish with fried carrots and raisins.",
          "Serve hot."
        ]
      },
      { 
        id: 58, 
        name: "Dampukht",
        tagline: "Slow-cooked sealed pot meat",
        image: "https://afghancooks.com/wp-content/uploads/2023/03/IMG_5747_jpg.jpg",
        ingredients: [
          "1 kg mutton",
          "2 cups yogurt",
          "2 onions, sliced",
          "2 tbsp ginger-garlic paste",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp garam masala",
          "1/2 cup oil",
          "Dough for sealing",
          "Salt to taste"
        ],
        steps: [
          "Mix all ingredients except dough.",
          "Place in heavy pot with tight lid.",
          "Seal lid with dough.",
          "Cook on very low heat for 4-5 hours.",
          "Break seal carefully.",
          "Serve hot with naan."
        ]
      },
      { 
        id: 59, 
        name: "Khadda Kabab",
        tagline: "Smoked meat kabab",
        image: "https://i.ytimg.com/vi/tOtuQ8YBUvE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB6RKABKJKPqCZNtPPcJcELUh4GPg",
        ingredients: [
          "1 kg mutton, cubed",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "1 tbsp black pepper",
          "1 tbsp salt",
          "1 tsp cumin powder",
          "1/2 cup oil",
          "Charcoal for smoking",
          "Green chilies for serving"
        ],
        steps: [
          "Mix all spices with oil for marinade.",
          "Marinate meat for 4 hours.",
          "Place in pan, cover tightly.",
          "Make hot charcoal, place in center of meat.",
          "Pour oil over charcoal, cover immediately.",
          "Let it smoke for 10 minutes.",
          "Remove charcoal and cook meat until tender.",
          "Serve hot with green chilies."
        ]
      },
      { 
        id: 60, 
        name: "Chai",
        tagline: "Traditional spiced tea",
        image: "https://carameltintedlife.com/wp-content/uploads/2021/01/Masala-Chai-.jpg",
        ingredients: [
          "4 cups water",
          "4 tsp black tea leaves",
          "4 tsp sugar",
          "4 green cardamom pods",
          "2 cups milk",
          "Ginger slice (optional)"
        ],
        steps: [
          "Boil water with cardamom and ginger.",
          "Add tea leaves, simmer for 2 minutes.",
          "Add milk and bring to boil.",
          "Add sugar and simmer for 2 minutes.",
          "Strain into cups.",
          "Serve hot."
        ]
      }
    ],
    Balochistan: [
      { 
        id: 61, 
        name: "Sajji",
        tagline: "Whole roasted lamb Balochi-style",
        image: "https://www.tandoorihut.com.pk/wp-content/uploads/2014/12/mutton-leg.jpg",
        ingredients: [
          "1 whole lamb or chicken",
          "1 cup oil",
          "2 tbsp salt",
          "1 tbsp black pepper",
          "1 tbsp cumin powder",
          "Lemon juice",
          "Rice for serving",
          "Salad for serving"
        ],
        steps: [
          "Clean meat thoroughly.",
          "Make marinade with oil and spices.",
          "Apply marinade all over meat.",
          "Marinate for 6-8 hours.",
          "Skewer and roast over charcoal slowly.",
          "Baste with oil while cooking.",
          "Cook until golden and tender.",
          "Serve with rice and salad."
        ]
      },
      { 
        id: 62, 
        name: "Kaak",
        tagline: "Traditional hard bread rings",
        image: "https://hadiaslebanesecuisine.com/blog/wp-content/uploads/2024/09/a-kaak-kaak.jpg",
        ingredients: [
          "3 cups flour",
          "1/2 cup ghee",
          "1 tsp yeast",
          "1 tsp sugar",
          "Warm water as needed",
          "Sesame seeds for topping",
          "Salt to taste"
        ],
        steps: [
          "Dissolve yeast and sugar in warm water.",
          "Mix flour, salt and ghee.",
          "Add yeast mixture and knead to stiff dough.",
          "Cover and rise for 2 hours.",
          "Shape into rings or ovals.",
          "Sprinkle sesame seeds.",
          "Bake at 180°C for 20-25 minutes until golden.",
          "Cool completely before storing."
        ]
      },
      { 
        id: 63, 
        name: "Balochi Pulao",
        tagline: "Balochistan-style meat rice",
        image: "https://i.ytimg.com/vi/A4ZC-xNNt7c/maxresdefault.jpg",
        ingredients: [
          "2 cups basmati rice",
          "500g mutton",
          "2 onions, sliced",
          "1 tsp cumin seeds",
          "1 tsp black pepper",
          "1 tsp salt",
          "1/2 cup oil",
          "Carrots for garnish",
          "Raisins for garnish"
        ],
        steps: [
          "Wash and soak rice for 30 minutes.",
          "Cook mutton with salt until tender.",
          "Heat oil, fry onions until golden.",
          "Add cumin seeds and black pepper.",
          "Add cooked mutton and rice.",
          "Add water and cook covered until rice is done.",
          "Garnish with fried carrots and raisins.",
          "Serve hot."
        ]
      },
      { 
        id: 64, 
        name: "Landi",
        tagline: "Dried meat preserved for winter",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkPW4UXT4McGrmgBhRUTUtleFlfV1yU81IRg&s",
        ingredients: [
          "1 whole lamb",
          "2 tbsp salt",
          "1 tbsp black pepper",
          "1 tbsp cumin powder",
          "String for hanging",
          "Smoke for drying"
        ],
        steps: [
          "Clean lamb thoroughly.",
          "Rub with salt and spices.",
          "Hang in cool, dry place for 2-3 weeks.",
          "Smoke lightly during drying process.",
          "Once dried, store in airtight container.",
          "To cook: Soak in water overnight.",
          "Cook like regular meat.",
          "Use in pulao or curries."
        ]
      },
      { 
        id: 65, 
        name: "Kabuli Pulao",
        tagline: "Afghan-style rice with carrots and raisins",
        image: "https://images.squarespace-cdn.com/content/v1/61269a9c93caaf2301aabdcd/a5d51b61-f695-4eeb-9090-26238b8c1ca4/Kabuli+Pulau+-+Qabel+Polo+-+I+got+it+from+my+Maman-3.jpg",
        ingredients: [
          "2 cups basmati rice",
          "500g mutton with bones",
          "2 carrots, julienned",
          "1/2 cup raisins",
          "1/2 cup almonds, sliced",
          "1 onion, sliced",
          "2 tbsp sugar",
          "1 tsp cardamom powder",
          "1 tsp cumin seeds",
          "Oil for cooking",
          "Salt to taste"
        ],
        steps: [
          "Wash and soak rice for 30 minutes.",
          "Cook mutton with salt until tender.",
          "Heat oil, fry onions until golden, set aside.",
          "In same oil, caramelize sugar until brown.",
          "Add carrots and fry for 2 minutes.",
          "Add boiled mutton and mix well.",
          "Add rice, water, and spices.",
          "Cook covered until rice is done.",
          "Garnish with fried onions, raisins and almonds.",
          "Serve hot."
        ]
      },
      { 
        id: 66, 
        name: "Mutton Roosh",
        tagline: "Simple mutton curry",
        image: "https://stewwithsaba.com/wp-content/uploads/2024/06/IMG_6887-edited.jpg",
        ingredients: [
          "1 kg mutton, cubed",
          "2 onions, chopped",
          "2 tomatoes, chopped",
          "2 tbsp ginger-garlic paste",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp garam masala",
          "1/2 cup oil",
          "Salt to taste",
          "Fresh coriander"
        ],
        steps: [
          "Heat oil, sauté onions until golden.",
          "Add ginger-garlic paste and cook.",
          "Add mutton and fry until browned.",
          "Add spices and mix well.",
          "Add tomatoes and cook until soft.",
          "Add water, cover and cook until tender.",
          "Add garam masala and simmer.",
          "Garnish with fresh coriander.",
          "Serve hot with bread."
        ]
      },
      { 
        id: 67, 
        name: "Dampukht",
        tagline: "Slow-cooked sealed pot meat",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_TNcrfqMuNLaf9T_DBN9VYqppW4ui7-PWbQ&s",
        ingredients: [
          "1 kg mutton",
          "2 cups yogurt",
          "2 onions, sliced",
          "2 tbsp ginger-garlic paste",
          "1 tsp turmeric",
          "2 tsp red chili powder",
          "1 tsp garam masala",
          "1/2 cup oil",
          "Dough for sealing",
          "Salt to taste"
        ],
        steps: [
          "Mix all ingredients except dough.",
          "Place in heavy pot with tight lid.",
          "Seal lid with dough.",
          "Cook on very low heat for 4-5 hours.",
          "Break seal carefully.",
          "Serve hot with naan."
        ]
      },
      { 
        id: 68, 
        name: "Khadda Kabab",
        tagline: "Smoked meat kabab",
        image: "https://i.ytimg.com/vi/tOtuQ8YBUvE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB6RKABKJKPqCZNtPPcJcELUh4GPg",
        ingredients: [
          "1 kg mutton, cubed",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "1 tbsp black pepper",
          "1 tbsp salt",
          "1 tsp cumin powder",
          "1/2 cup oil",
          "Charcoal for smoking",
          "Green chilies for serving"
        ],
        steps: [
          "Mix all spices with oil for marinade.",
          "Marinate meat for 4 hours.",
          "Place in pan, cover tightly.",
          "Make hot charcoal, place in center of meat.",
          "Pour oil over charcoal, cover immediately.",
          "Let it smoke for 10 minutes.",
          "Remove charcoal and cook meat until tender.",
          "Serve hot with green chilies."
        ]
      },
      { 
        id: 69, 
        name: "Sheermal",
        tagline: "Saffron-flavored sweet flatbread",
        image: "https://www.thedeliciouscrescent.com/wp-content/uploads/2023/06/Sheermal-5.jpg",
        ingredients: [
          "2 cups flour",
          "1/2 cup ghee",
          "1/2 cup milk",
          "1/4 cup sugar",
          "1/2 tsp saffron strands",
          "1/2 tsp cardamom powder",
          "Milk for brushing"
        ],
        steps: [
          "Soak saffron in warm milk.",
          "Mix flour, ghee, sugar and cardamom.",
          "Add saffron milk and knead to soft dough.",
          "Cover and rest for 1 hour.",
          "Divide and roll out thick rounds.",
          "Brush with milk.",
          "Bake at 180°C for 15-20 minutes until golden.",
          "Serve warm."
        ]
      },
      { 
        id: 70, 
        name: "Bolani",
        tagline: "Stuffed Afghan flatbread",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIArsYMdn33TA5T8HPBlgY6UWeZoumirbvaA&s",
        ingredients: [
          "For dough: 2 cups flour",
          "Water as needed",
          "Salt to taste",
          "For filling: 4 potatoes, boiled and mashed",
          "1 onion, chopped",
          "2 green chilies, chopped",
          "Fresh coriander, chopped",
          "Spices to taste",
          "Oil for frying"
        ],
        steps: [
          "Make soft dough with flour, water and salt.",
          "Mix all filling ingredients.",
          "Divide dough, roll out circles.",
          "Place filling on half, fold and seal edges.",
          "Fry in oil until golden on both sides.",
          "Serve hot with yogurt."
        ]
      },
      { 
        id: 71, 
        name: "Mantu",
        tagline: "Afghan meat dumplings",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH9K_NbadXNfBnB-SlXQoXESQthhHCN0syxA&s",
        ingredients: [
          "For wrappers: 2 cups flour",
          "Water as needed",
          "Salt to taste",
          "For filling: 500g minced beef",
          "1 onion, chopped",
          "2 garlic cloves, minced",
          "Spices to taste",
          "For topping: Yogurt",
          "Tomato sauce",
          "Mint leaves"
        ],
        steps: [
          "Make dough, rest for 30 minutes.",
          "Mix filling ingredients.",
          "Roll dough thin, cut into circles.",
          "Place filling, fold and seal.",
          "Steam for 20-25 minutes.",
          "Serve with yogurt and tomato sauce.",
          "Garnish with mint."
        ]
      },
      { 
        id: 72, 
        name: "Ashak",
        tagline: "Afghan leek dumplings",
        image: "https://i.ytimg.com/vi/jALnPwz0dA4/maxresdefault.jpg",
        ingredients: [
          "For dough: 2 cups flour",
          "Water as needed",
          "Salt to taste",
          "For filling: Leeks, chopped",
          "Spring onions, chopped",
          "Fresh herbs",
          "For sauce: Yogurt",
          "Mint sauce",
          "Meat sauce (optional)"
        ],
        steps: [
          "Make dough, rest for 30 minutes.",
          "Prepare filling with leeks and herbs.",
          "Roll dough thin, cut into circles.",
          "Place filling, fold and seal.",
          "Boil until they float.",
          "Serve with yogurt and mint sauce."
        ]
      },
      { 
        id: 73, 
        name: "Shorwa",
        tagline: "Afghan meat and vegetable soup",
        image: "https://afghanyummyfood.com/wp-content/uploads/2021/03/shorwa-500x375.png",
        ingredients: [
          "500g mutton with bones",
          "2 onions, chopped",
          "2 carrots, chopped",
          "2 potatoes, cubed",
          "1 turnip, chopped",
          "2 tbsp tomato paste",
          "Spices to taste",
          "Water as needed",
          "Fresh herbs for garnish"
        ],
        steps: [
          "Brown meat in pot.",
          "Add onions and cook until soft.",
          "Add vegetables and tomato paste.",
          "Add water and spices.",
          "Simmer for 2-3 hours until tender.",
          "Adjust seasoning.",
          "Garnish with fresh herbs.",
          "Serve hot."
        ]
      },
      { 
        id: 74, 
        name: "Kebab-e-Barg",
        tagline: "Grilled marinated beef strips",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWKvA98mdCgkR1okxdXMV77Rxd0HNN9iFZzA&s",
        ingredients: [
          "500g beef fillet, sliced thin",
          "1 onion, grated",
          "2 tbsp olive oil",
          "1 tsp saffron water",
          "Salt and pepper to taste",
          "Sumac for serving",
          "Barbecue for grilling"
        ],
        steps: [
          "Pound meat slices thin.",
          "Mix with onion, oil and saffron.",
          "Marinate for 4 hours.",
          "Thread onto skewers.",
          "Grill on barbecue until done.",
          "Sprinkle with sumac.",
          "Serve with rice."
        ]
      },
      { 
        id: 75, 
        name: "Kebab-e-Kubideh",
        tagline: "Grilled minced meat skewers",
        image: "https://images.squarespace-cdn.com/content/v1/61269a9c93caaf2301aabdcd/4ca69245-ee8f-4f54-9046-437e363fed21/Kabab+Koobideh-4.jpg",
        ingredients: [
          "500g minced lamb",
          "1 onion, grated",
          "1 egg yolk",
          "Salt and pepper to taste",
          "Sumac for serving",
          "Skewers for grilling"
        ],
        steps: [
          "Mix all ingredients thoroughly.",
          "Knead for 5 minutes.",
          "Divide and shape around skewers.",
          "Grill until cooked through.",
          "Serve with rice and sumac."
        ]
      },
      { 
        id: 76, 
        name: "Jujeh Kabab",
        tagline: "Saffron chicken kababs",
        image: "https://images.food52.com/WCGfYjPwZL2dmx4w_cJuyOOaJCg=/d1402b3d-e498-4d94-a8e4-37460507e526--IMG-20250709-WA0000.jpg?w=3840&q=75",
        ingredients: [
          "1 kg chicken pieces",
          "1 onion, grated",
          "2 tbsp lemon juice",
          "1 tsp saffron water",
          "Salt and pepper to taste",
          "Butter for basting",
          "Skewers for grilling"
        ],
        steps: [
          "Mix marinade ingredients.",
          "Marinate chicken for 4 hours.",
          "Thread onto skewers.",
          "Grill, basting with butter.",
          "Serve with rice and salad."
        ]
      },
      { 
        id: 77, 
        name: "Tahchin",
        tagline: "Persian crispy rice cake",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9S0YgfQC3Jt2wLk7EIU1TWs3RcmTjjcQnnw&s",
        ingredients: [
          "2 cups basmati rice",
          "500g chicken or lamb",
          "2 cups yogurt",
          "3 egg yolks",
          "Saffron water",
          "Butter for cooking",
          "Salt to taste",
          "Barberries for garnish"
        ],
        steps: [
          "Cook rice until 70% done.",
          "Mix yogurt with egg yolks and saffron.",
          "Layer rice and meat in pot.",
          "Pour yogurt mixture over.",
          "Cover and cook on low heat for 2 hours.",
          "Invert onto plate.",
          "Garnish with barberries.",
          "Serve hot."
        ]
      },
      { 
        id: 78, 
        name: "Fesenjan",
        tagline: "Walnut and pomegranate stew",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCIRvwswu10qrpAfMUr6QAsqaCOJX6Kyi9iQ&s",
        ingredients: [
          "500g chicken or duck",
          "2 cups walnuts, ground",
          "1 cup pomegranate molasses",
          "2 onions, chopped",
          "Sugar to taste",
          "Oil for cooking",
          "Salt to taste"
        ],
        steps: [
          "Brown meat in oil, set aside.",
          "Sauté onions until golden.",
          "Add ground walnuts, cook for 10 minutes.",
          "Add pomegranate molasses and water.",
          "Add meat, simmer for 1 hour.",
          "Add sugar if needed.",
          "Serve with rice."
        ]
      },
      { 
        id: 79, 
        name: "Ghalieh Mahi",
        tagline: "Persian herb fish stew",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9ek_YuIyf0RjfMLLpF28QjhKvD1rXGE4s1MYJM16I6CUBZ6tH7r6kGntB2X2J3SmHD6wRQLsCA53WYzQlQS98Zzu3dtsPTw1GUvrC7F7SjOvQj6VABNv7V7SZv4747yFLmqjFSfiwS1B8vqp99wA_aShbqn_X4v4JmjAAoOUVzltvloGfwc7XPL6img/s4032/Ghalieh%20Mahi_TS.jpg",
        ingredients: [
          "500g fish fillets",
          "2 bunches fresh herbs (coriander, fenugreek)",
          "2 onions, chopped",
          "3 cloves garlic",
          "1 tbsp tamarind paste",
          "Spices to taste",
          "Oil for cooking",
          "Salt to taste"
        ],
        steps: [
          "Chop herbs finely.",
          "Sauté onions and garlic until golden.",
          "Add herbs and cook for 10 minutes.",
          "Add tamarind and spices.",
          "Add fish, cook gently for 15 minutes.",
          "Serve with rice."
        ]
      },
      { 
        id: 80, 
        name: "Mirza Ghasemi",
        tagline: "Smoky eggplant and tomato dip",
        image: "https://images.squarespace-cdn.com/content/v1/61269a9c93caaf2301aabdcd/2bb756a5-b33e-4b5e-a248-bdad4333b14b/Vegan+Mirza+Ghasemi-2.jpg",
        ingredients: [
          "4 large eggplants",
          "4 eggs",
          "4 tomatoes, grated",
          "4 cloves garlic, minced",
          "Turmeric powder",
          "Oil for cooking",
          "Salt to taste"
        ],
        steps: [
          "Grill eggplants until soft, peel and chop.",
          "Sauté garlic in oil.",
          "Add grated tomatoes and cook.",
          "Add eggplant and spices, cook for 15 minutes.",
          "Make wells, crack eggs into them.",
          "Cover until eggs are cooked.",
          "Serve with bread."
        ]
      }
    ],
    Kashmir: [
      { 
        id: 81, 
        name: "Kashmiri Pulao",
        tagline: "Fragrant rice with dry fruits and saffron",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCKjG6AyO3VM5U1Ks6sP7Fq4JRiCoA3r19ig&s",
        ingredients: [
          "2 cups basmati rice",
          "1/2 cup dry fruits (almonds, cashews, raisins)",
          "2 tbsp ghee",
          "4 green cardamoms",
          "2 cinnamon sticks",
          "4 cloves",
          "1 tsp saffron strands",
          "1/2 cup milk",
          "Salt to taste",
          "Sugar to taste"
        ],
        steps: [
          "Wash and soak rice for 30 minutes.",
          "Soak saffron in warm milk.",
          "Heat ghee, add whole spices.",
          "Add dry fruits and fry until golden.",
          "Add rice and sauté for 2 minutes.",
          "Add water, salt and sugar.",
          "Cook until rice is done.",
          "Add saffron milk and mix gently.",
          "Garnish with more dry fruits.",
          "Serve hot."
        ]
      },
      { 
        id: 82, 
        name: "Rogan Josh",
        tagline: "Signature Kashmiri red lamb curry",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgZRD0QKjIQ3bSuy0HLwuUdkb4qMQnJ4DV8g&s",
        ingredients: [
          "1 kg mutton with bones",
          "2 cups yogurt",
          "2 onions, ground to paste",
          "2 tbsp ginger paste",
          "2 tbsp garlic paste",
          "2 tbsp Kashmiri red chili powder",
          "1 tsp fennel powder",
          "1 tsp dry ginger powder",
          "1/2 cup mustard oil",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        steps: [
          "Heat mustard oil until smoking, then cool slightly.",
          "Add onion paste and cook until golden.",
          "Add ginger-garlic paste and cook for 2 minutes.",
          "Add mutton and fry until browned.",
          "Add all spices and mix well.",
          "Add yogurt and cook until oil separates.",
          "Add water, cover and cook until meat is tender.",
          "Garnish with fresh coriander.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 83, 
        name: "Yakhni",
        tagline: "Kashmiri yogurt-based mutton curry",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZjE0pJ0MRlZ0Y8GgB5hy_SwEEOMwGnm12uw&s",
        ingredients: [
          "1 kg mutton with bones",
          "2 cups yogurt",
          "2 tbsp ginger paste",
          "1 tsp fennel powder",
          "1 tsp dry ginger powder",
          "1/2 cup mustard oil",
          "Salt to taste",
          "Fresh mint for garnish",
          "2 bay leaves"
        ],
        steps: [
          "Heat mustard oil, add bay leaves.",
          "Add mutton and fry until browned.",
          "Add ginger paste and cook for 2 minutes.",
          "Whisk yogurt with fennel and dry ginger powder.",
          "Add yogurt mixture to meat, stirring continuously.",
          "Add water and salt.",
          "Cover and cook until meat is tender.",
          "Garnish with fresh mint.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 84, 
        name: "Gushtaba",
        tagline: "Royal Kashmiri meatballs in yogurt gravy",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwfyQIQEXiW6mpzDfUha7ZKJAFo-O7HFXgNQ&s",
        ingredients: [
          "For meatballs: 500g minced mutton",
          "1/2 cup mutton fat",
          "1 tsp ginger powder",
          "1 tsp fennel powder",
          "Salt to taste",
          "For gravy: 2 cups yogurt",
          "1 tsp dry ginger powder",
          "1 tsp fennel powder",
          "2 tbsp ghee",
          "Salt to taste"
        ],
        steps: [
          "Pound minced meat with fat until smooth paste.",
          "Add spices and shape into large balls.",
          "Poach meatballs in simmering water for 30 minutes.",
          "For gravy: Heat ghee, add spices.",
          "Add yogurt and cook until oil separates.",
          "Add poached meatballs and simmer for 15 minutes.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 85, 
        name: "Rista",
        tagline: "Kashmiri red meatballs in spicy gravy",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJaxugwAnt2_TZjIRbz-V96D01L19NqoMx7A&s",
        ingredients: [
          "500g minced mutton",
          "1/2 cup mutton fat",
          "1 tsp ginger powder",
          "1 tsp fennel powder",
          "Salt to taste",
          "For gravy: Kashmiri red chili paste",
          "2 tbsp mustard oil",
          "Spices to taste"
        ],
        steps: [
          "Pound minced meat with fat until smooth.",
          "Add spices and shape into balls.",
          "Poach in simmering water for 30 minutes.",
          "For gravy: Heat oil, add chili paste and spices.",
          "Add meatballs and cook for 15 minutes.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 86, 
        name: "Tabak Maaz",
        tagline: "Fried lamb ribs Kashmiri style",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxnqOJl7t7deLGaAmwFG7v9vMcE85fzeV_8w&s",
        ingredients: [
          "1 kg lamb ribs",
          "2 cups milk",
          "1 tsp ginger powder",
          "1 tsp fennel powder",
          "Salt to taste",
          "Ghee for frying",
          "Spices for marination"
        ],
        steps: [
          "Boil ribs with milk and spices until tender.",
          "Drain and cool.",
          "Heat ghee in pan.",
          "Fry ribs until golden and crispy.",
          "Drain on paper towels.",
          "Serve hot as starter."
        ]
      },
      { 
        id: 87, 
        name: "Nadru Yakhni",
        tagline: "Lotus stem in yogurt gravy",
        image: "https://i.ytimg.com/vi/_CrkqqW9nVQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD5hdIaUrUli11blRoQHFM_4rwoYQ",
        ingredients: [
          "500g lotus stem slices",
          "2 cups yogurt",
          "1 tsp ginger powder",
          "1 tsp fennel powder",
          "2 tbsp ghee",
          "Salt to taste",
          "Fresh mint for garnish"
        ],
        steps: [
          "Boil lotus stem until tender, drain.",
          "Whisk yogurt with spices.",
          "Heat ghee, add yogurt mixture.",
          "Cook until oil separates.",
          "Add boiled lotus stem.",
          "Simmer for 10 minutes.",
          "Garnish with mint.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 88, 
        name: "Dum Aloo",
        tagline: "Baby potatoes in Kashmiri gravy",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBr31R5hdlJeZfSKo1k6MS8E2Ffyp5Oitdw&s",
        ingredients: [
          "500g baby potatoes",
          "2 cups yogurt",
          "1 tsp ginger powder",
          "1 tsp fennel powder",
          "2 tbsp mustard oil",
          "Salt to taste",
          "Fresh coriander for garnish"
        ],
        steps: [
          "Boil potatoes until tender, prick with fork.",
          "Heat oil, fry potatoes until golden.",
          "Whisk yogurt with spices.",
          "Add yogurt mixture to potatoes.",
          "Cook until gravy thickens.",
          "Garnish with coriander.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 89, 
        name: "Haak",
        tagline: "Kashmiri collard greens",
        image: "https://i0.wp.com/mamanushka.com/wp-content/uploads/2019/02/Kashmiri-greens-haakh-recipe-serving-via-mamanushka-blog.jpg?fit=740%2C925&ssl=1",
        ingredients: [
          "1 kg collard greens (haak)",
          "2 tbsp mustard oil",
          "1 tsp ginger powder",
          "1 tsp asafoetida",
          "Salt to taste",
          "Water as needed"
        ],
        steps: [
          "Wash greens thoroughly.",
          "Heat oil, add asafoetida.",
          "Add greens and salt.",
          "Add water, cover and cook until tender.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 90, 
        name: "Modur Pulao",
        tagline: "Sweet Kashmiri pulao with dry fruits",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC_BGFGxyYM7_ZLuJ7RUwT7jfmhE-ZRLZIHA&s",
        ingredients: [
          "2 cups basmati rice",
          "1/2 cup dry fruits",
          "2 tbsp ghee",
          "4 green cardamoms",
          "2 cinnamon sticks",
          "1 tsp saffron",
          "1/2 cup milk",
          "Salt to taste",
          "Sugar to taste"
        ],
        steps: [
          "Wash and soak rice for 30 minutes.",
          "Soak saffron in milk.",
          "Heat ghee, add whole spices.",
          "Add dry fruits and fry.",
          "Add rice and sauté.",
          "Add water, salt and sugar.",
          "Cook until rice is done.",
          "Add saffron milk.",
          "Serve hot."
        ]
      },
      { 
        id: 91, 
        name: "Kashmiri Chai",
        tagline: "Pink traditional Kashmiri tea",
        image: "https://hildaskitchenblog.com/wp-content/uploads/2025/05/kashmiri-pink-chai-4.jpg",
        ingredients: [
          "4 cups water",
          "2 tbsp green tea leaves",
          "1/2 tsp baking soda",
          "4 green cardamoms",
          "2 cups milk",
          "Salt to taste",
          "Pistachios for garnish"
        ],
        steps: [
          "Boil water with tea leaves and baking soda.",
          "Simmer until dark red color appears.",
          "Add cardamoms and salt.",
          "Add milk and bring to boil.",
          "Pour back and forth to create froth.",
          "Garnish with pistachios.",
          "Serve hot."
        ]
      },
      { 
        id: 92, 
        name: "Sheer Chai",
        tagline: "Kashmiri pink milk tea",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJNJ12J7if0tdZ2Hj3qpATuF4yVYANtsc9uA&s",
        ingredients: [
          "4 cups water",
          "2 tbsp green tea leaves",
          "4 green cardamoms",
          "2 cups milk",
          "Salt to taste",
          "Sugar to taste"
        ],
        steps: [
          "Boil water with tea leaves.",
          "Simmer until pink color appears.",
          "Add cardamoms and salt.",
          "Add milk and sugar.",
          "Bring to boil.",
          "Strain and serve hot."
        ]
      },
      { 
        id: 93, 
        name: "Kahwa",
        tagline: "Kashmiri saffron green tea",
        image: "https://www.sharmispassions.com/wp-content/uploads/2023/03/KashmiriKahwa2.jpg",
        ingredients: [
          "4 cups water",
          "2 tbsp green tea leaves",
          "4 green cardamoms",
          "2 cinnamon sticks",
          "Saffron strands",
          "Honey to taste",
          "Almonds for garnish"
        ],
        steps: [
          "Boil water with spices.",
          "Add tea leaves, simmer for 2 minutes.",
          "Add saffron and honey.",
          "Strain into cups.",
          "Garnish with almonds.",
          "Serve hot."
        ]
      },
      { 
        id: 94, 
        name: "Phirni",
        tagline: "Kashmiri rice pudding",
        image: "https://hinzcooking.com/wp-content/uploads/2022/03/phirni.jpg",
        ingredients: [
          "1/2 cup rice, soaked",
          "1 liter milk",
          "1/2 cup sugar",
          "1/2 tsp cardamom powder",
          "2 tbsp chopped nuts",
          "Saffron strands",
          "Rose water (optional)"
        ],
        steps: [
          "Grind soaked rice to coarse paste.",
          "Boil milk in heavy pan.",
          "Add rice paste, stirring continuously.",
          "Cook until thickened.",
          "Add sugar and cardamom.",
          "Add saffron and nuts.",
          "Pour into bowls, chill.",
          "Serve cold."
        ]
      },
      { 
        id: 95, 
        name: "Shufta",
        tagline: "Kashmiri dry fruit sweet",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQVgB6DUaN5pTdFHvKGuNHhTEFDpFZV3BTDw&s",
        ingredients: [
          "1 cup dry fruits (almonds, cashews, walnuts)",
          "1/2 cup dates, chopped",
          "1/2 cup raisins",
          "1/4 cup ghee",
          "1/2 cup sugar",
          "1 tsp cardamom powder",
          "2 tbsp rose water"
        ],
        steps: [
          "Heat ghee, fry dry fruits until golden.",
          "Add dates and raisins.",
          "Add sugar and cardamom.",
          "Cook until sugar melts.",
          "Add rose water.",
          "Cool completely before storing.",
          "Serve as dessert."
        ]
      },
      { 
        id: 96, 
        name: "Seekh Tujji",
        tagline: "Kashmiri minced meat skewers",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPAe4gv27vlEEd2AKk0YXixGnlSv7_VYCDWQ&s",
        ingredients: [
          "500g minced mutton",
          "1 onion, grated",
          "2 green chilies, chopped",
          "1 tbsp ginger paste",
          "1 tbsp garlic paste",
          "1 tsp garam masala",
          "Salt to taste",
          "Skewers for grilling"
        ],
        steps: [
          "Mix all ingredients thoroughly.",
          "Divide and shape around skewers.",
          "Grill until cooked through.",
          "Serve hot with chutney."
        ]
      },
      { 
        id: 97, 
        name: "Kabargah",
        tagline: "Kashmiri fried ribs",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxoEtbQ3HZ2SXctEoy-dhxkCXSzfCGPjW1Rg&s",
        ingredients: [
          "1 kg lamb ribs",
          "2 cups milk",
          "1 tsp ginger powder",
          "1 tsp fennel powder",
          "Salt to taste",
          "Ghee for frying"
        ],
        steps: [
          "Boil ribs with milk and spices until tender.",
          "Drain and cool.",
          "Heat ghee, fry ribs until crispy.",
          "Drain on paper towels.",
          "Serve hot."
        ]
      },
      { 
        id: 98, 
        name: "Kashmiri Saag",
        tagline: "Kashmiri-style greens",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnXpyHdkCg1QR4fZfX8jsSDaRIYEKzulpkqw&s",
        ingredients: [
          "500g spinach",
          "250g mustard greens",
          "2 tbsp mustard oil",
          "1 tsp ginger powder",
          "Salt to taste",
          "Water as needed"
        ],
        steps: [
          "Wash greens thoroughly.",
          "Heat oil, add ginger powder.",
          "Add greens and salt.",
          "Add water, cover and cook until tender.",
          "Serve hot with rice."
        ]
      },
      { 
        id: 99, 
        name: "Nadru Monje",
        tagline: "Lotus stem fritters",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTur0779gsEP62XOUEkB1e1iMHwe54E_XHqPA&s",
        ingredients: [
          "500g lotus stem slices",
          "1 cup gram flour",
          "1 tsp red chili powder",
          "1 tsp ajwain",
          "Water as needed",
          "Oil for frying",
          "Salt to taste"
        ],
        steps: [
          "Make batter with gram flour and spices.",
          "Dip lotus stem slices in batter.",
          "Deep fry until golden.",
          "Drain on paper towels.",
          "Serve hot as snack."
        ]
      },
      { 
        id: 100, 
        name: "Kashmiri Muji Chetin",
        tagline: "Radish yogurt relish",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVcmDVmQrBL4vLV1PFoMf4RRIDy4Aivzf3Vw&s",
        ingredients: [
          "2 radishes, grated",
          "1 cup yogurt",
          "1 tsp ginger powder",
          "1/2 tsp red chili powder",
          "Salt to taste",
          "Fresh mint for garnish"
        ],
        steps: [
          "Squeeze excess water from radishes.",
          "Mix with yogurt and spices.",
          "Chill for 30 minutes.",
          "Garnish with mint.",
          "Serve as side dish."
        ]
      }
    ]
  };

  // Voice instructions handler
  const speakInstructions = (steps, stepIndex = 0) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentStep(0);
        setProgress(0);
        speechSynthesisRef.current = null;
        return;
      }

      if (stepIndex >= 0 && stepIndex < steps.length) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = `Step ${stepIndex + 1}: ${steps[stepIndex]}`;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        setCurrentStep(stepIndex + 1);
        const stepProgress = ((stepIndex + 1) / steps.length) * 100;
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
    if (selectedFood && currentStep < selectedFood.steps.length) {
      stopSpeaking();
      speakInstructions(selectedFood.steps, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedFood && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedFood.steps, currentStep - 2);
    }
  };

  const handleFoodSelect = (food) => {
    setSelectedFood(food);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedFood(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleProvinceClick = (province) => {
    setActiveProvince(province);
  };

  // Province icons (using simple text icons as placeholders)
  const provinceIcons = {
    Punjab: '',
    Sindh: '',
    KPK: '',
    Balochistan: '',
    Kashmir: ''
  };

  return (
    <div className="regional-page">
      {/* Header */}
      <header className="regional-header">
        <div className="regional-header-content">
          <h1 className="regional-page-title">Taste of Tradition</h1>
          <p className="regional-page-description">
            Timeless recipes inspired by regional excellence.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="regional-main">
        <div className="regional-container">
          
          {/* Province Tabs */}
          <div className="province-tabs">
            {Object.keys(provincialFoods).map((province) => (
              <button
                key={province}
                className={`province-tab ${activeProvince === province ? 'active' : ''}`}
                onClick={() => handleProvinceClick(province)}
              >
                <span className="province-icon">{provinceIcons[province]}</span>
                <span className="province-name">{province}</span>
              </button>
            ))}
          </div>

          {/* Active Province Info */}
          <div className="province-info">
            <h2 className="active-province-title">
              {provinceIcons[activeProvince]} {activeProvince} Culinary Legacy
            </h2>
            <p className="province-description">
              {activeProvince === 'Punjab' && "The land of five rivers, famous for its rich and hearty cuisine."}
              {activeProvince === 'Sindh' && "Known for its spicy and flavorful dishes with unique spices."}
              {activeProvince === 'KPK' && "Mountainous region famous for meat dishes and traditional cooking methods."}
              {activeProvince === 'Balochistan' && "Desert region known for its unique meat preparations and breads."}
              {activeProvince === 'Kashmir' && "Valley region famous for its aromatic dishes and warm hospitality."}
            </p>
          </div>

          {/* Foods Grid */}
          <div className="regional-grid-section">
            <div className="regional-grid">
              {provincialFoods[activeProvince].map((food) => (
                <div 
                  key={food.id} 
                  className="regional-technique-card"
                  onClick={() => handleFoodSelect(food)}
                >
                  <div 
                    className="regional-card-image"
                    style={{ backgroundImage: `url(${food.image})` }}
                  ></div>
                  
                  <div className="regional-card-content">
                    <h3 className="regional-card-title">{food.name}</h3>
                    <p className="regional-card-description">{food.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Simple Back Button */}
          <div className="back-button-container">
            <button className="back-home-btn" onClick={handleGoBack}>
              <i className="fas fa-arrow-left"></i> Back to Home
            </button>
          </div>
        </div>
      </main>

      {/* DETAIL MODAL with SELECTED FOOD IMAGE as Background */}
      {showDetailPanel && selectedFood && (
        <div className="regional-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="regional-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedFood.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="regional-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="regional-modal-header">
              <div className="regional-modal-title">
                <h2>{selectedFood.name}</h2>
              </div>
            </div>

            <div className="regional-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="regional-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="regional-ingredients-list">
                  {selectedFood.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="regional-ingredient-item">
                      <span className="regional-ingredient-bullet">•</span>
                      <span className="regional-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="regional-modal-steps">
                <h3>Steps to Make</h3>
                <div className="regional-steps-list">
                  {selectedFood.steps.map((step, idx) => (
                    <div key={idx} className="regional-step-item">
                      <span className="regional-step-number">{idx + 1}.</span>
                      <span className="regional-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="regional-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedFood.steps.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedFood.steps)}
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
                        disabled={currentStep >= selectedFood.steps.length}
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

export default RecipeRegionalPage;