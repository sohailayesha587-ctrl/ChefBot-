import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeFeature.css';

const RecipeFeature = () => {
  const navigate = useNavigate();
  const [recipeCounts, setRecipeCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const recipeTypes = [
    { id: 1, title: 'BREAKFAST', description: 'Start your day with delicious morning meals', path: '/BreakFast', category: 'Breakfast', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAkO6PiyzExlXgDE-kZFg0VQlAt1sOqclhA&s' },
    { id: 2, title: 'LUNCH', description: 'Hearty and satisfying midday meals', path: '/recipe-lunch', category: 'Lunch', image: 'https://substackcdn.com/image/fetch/$s_!Xw3X!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfa9ec03-d4e8-4946-9649-cf7fe4f34059_1442x1103.heic' },
    { id: 3, title: 'DINNER', description: 'Perfect main courses for evening meals', path: '/recipe-dinner', category: 'Dinner', image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/budget_christmas_dinner_51479_16x9.jpg' },
    { id: 4, title: 'SOUPS', description: 'Warm and comforting soups for all seasons', path: '/soups', category: 'Soups', image: 'https://www.recipetineats.com/tachyon/2017/07/Spanish-Vegetable-Soup-landscape.jpg' },
    { id: 5, title: 'APPETIZERS', description: 'Perfect starters and finger foods', path: '/appetizers', category: 'Appetizers', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvN6Xg-4V5MxMpdpLtGrg-PySzcF4SVdIquw&s' },
    { id: 6, title: 'SNACKS', description: 'Quick bites for any time of day', path: '/Snack', category: 'Snacks', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 7, title: 'DESSERTS', description: 'Sweet delights and indulgent treats', path: '/desserts', category: 'Desserts', image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 8, title: 'BAKING', description: 'Freshly baked goods and pastries', path: '/Baking', category: 'Baking', image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 9, title: 'BEVERAGES', description: 'Refreshing drinks for every mood', path: '/Beverage', category: 'Beverages', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 10, title: 'SALADS', description: 'Fresh and healthy salad recipes', path: '/Salads', category: 'Salads', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 11, title: 'REGIONAL', description: 'Traditional and authentic regional dishes', path: '/Regional', category: 'Regional', image: 'https://sukhis.com/app/uploads/2022/07/image4.jpg' },
    { id: 12, title: 'JUNK FOOD', description: 'Indulgent comfort food favorites', path: '/cheat-meal', category: 'CheatMeal', image: 'https://www.shutterstock.com/image-photo/foods-enhancing-risk-cancer-junk-260nw-2658908621.jpg' }
  ];

  const budgetCategories = [
    { id: 1, title: 'BUDGET-FRIENDLY', path: '/BudgetFriendly', category: 'Budget', image: 'https://img.freepik.com/free-photo/top-view-food-banquet_23-2149893441.jpg?semt=ais_incoming&w=740&q=80', features: ['Budget-friendly meals', 'Save money cooking', 'Affordable ingredients', 'Meal prep tips'] },
    { id: 2, title: 'STUDENT RECIPES', path: '/StudentRecipe', category: 'Student', image: 'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/tomato_squash_and_chilli_94289_16x9.jpg', features: ['Easy student meals', 'Dorm room cooking', 'Quick recipes', 'Minimal equipment'] },
    { id: 3, title: 'QUICK & EASY', path: '/QuickRecipe', category: 'Quick', image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/5/1/0/fnk_buffalo-chicken-enchiladas-h1_s4x3.jpg.rend.hgtvcom.616.462.85.suffix/1525187347682.webp', features: ['15-min meals', 'Simple recipes', 'Minimal cleanup', 'Busy weeknights'] },
    { id: 4, title: 'VEGETARIAN', path: '/Vege', category: 'Vegetarian', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuzWxur665VJ98iGoUPClxLcKmi0RLYF5GdQ&s', features: ['Meat-free meals', 'Plant-based protein', 'Healthy options', 'Vegetarian classics'] }
  ];

  // ✅ FETCH RECIPE COUNTS WITH TOKEN
  useEffect(() => {
    const fetchCounts = async () => {
      const token = localStorage.getItem('token');  // ✅ Get token
      
      const counts = {};
      
      for (const type of recipeTypes) {
        if (type.category) {
          try {
            const response = await fetch(`http://localhost:5000/api/recipes/count?category=${type.category}`, {
              headers: {
                'Authorization': `Bearer ${token}`,  // ✅ Add token
                'Content-Type': 'application/json'
              }
            });
            
            if (response.status === 401) {
              console.log('Unauthorized - redirecting to login');
              navigate('/login-page');
              return;
            }
            
            const data = await response.json();
            counts[type.category] = data.count || 0;
          } catch (error) {
            console.error(`Error fetching count for ${type.category}:`, error);
            counts[type.category] = 0;
          }
        }
      }
      
      setRecipeCounts(counts);
      setLoading(false);
    };
    
    fetchCounts();
  }, [navigate]);

  const handleRecipeTypeClick = (path) => navigate(path);
  const handleBudgetCategoryClick = (path) => navigate(path);

  return (
    <div className="rf-homepage">

      {/* HERO - Single Image Like Pantry */}
      <section className="rf-hero-banner">
        <div className="rf-hero-single">
          <div className="rf-hero-content">
            <h1>Discover Delicious Recipes</h1>
            <p>Explore thousands of recipes from around the world</p>
          </div>
        </div>
      </section>

      <main className="rf-main-content">

        {/* Recipe Types Section - With Green Line Like Pantry */}
        <section className="rf-recipe-types-section">
          <div className="rf-recipe-types-container">
            <div className="rf-section-header">
              <h2>Culinary Masterpieces</h2>
              <p>Chef-curated recipes to transform your cooking experience</p>
            </div>

            <div className="rf-recipe-types-grid">
              {recipeTypes.map((type) => (
                <div
                  key={type.id}
                  className="rf-circle-card-wrapper"
                  onClick={() => handleRecipeTypeClick(type.path)}
                >
                  <div className="rf-circle-card">
                    <div className="rf-circle-image-container">
                      <img
                        src={type.image}
                        alt={type.title}
                        className="rf-circle-image"
                      />
                    </div>
                  </div>
                  <h3 className="rf-circle-card-title">
                    {type.title}
                    {!loading && recipeCounts[type.category] > 0 && (
                      <span className="recipe-count"> ({recipeCounts[type.category]})</span>
                    )}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Budget Section */}
        <section className="rf-budget-friendly-section">
          <div className="rf-section-header">
            <h2>Smart Cooking Solutions</h2>
            <p>Restaurant-quality meals designed for everyday cooking</p>
          </div>

          <div className="rf-budget-grid-new">
            {budgetCategories.map((category) => (
              <div
                key={category.id}
                className="rf-budget-card-new"
                onClick={() => handleBudgetCategoryClick(category.path)}
              >
                <div className="rf-budget-card-header">
                  <h3 className="rf-budget-card-title">{category.title}</h3>
                </div>

                <div className="rf-budget-card-image-container">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="rf-budget-card-image"
                  />
                </div>

                <div className="rf-budget-card-content">
                  <ul className="rf-budget-card-features">
                    {category.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="rf-features-section">
          <div className="rf-section-header">
            <h2>Elevate Your Cooking Journey</h2>
            <p>Advanced features designed for modern home chefs</p>
          </div>

          <div className="rf-features-grid">
            <div className="rf-feature-card">
              <div className="rf-feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>AI-Powered Recipes</h3>
              <p>Get personalized recipe suggestions based on your preferences</p>
            </div>

            <div className="rf-feature-card">
              <div className="rf-feature-icon">
                <i className="fas fa-step-forward"></i>
              </div>
              <h3>Step-by-Step Guide</h3>
              <p>Detailed cooking instructions with timers and tips</p>
            </div>

            <div className="rf-feature-card">
              <div className="rf-feature-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <h3>Meal Planning</h3>
              <p>Smart weekly meal plans with automatic grocery lists</p>
            </div>

            <div className="rf-feature-card">
              <div className="rf-feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Quick Cooking</h3>
              <p>Fast and easy recipes for busy schedules</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default RecipeFeature;