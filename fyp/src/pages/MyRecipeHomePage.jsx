import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyRecipeHomepage.css';

const MyRecipeHomepage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const recipeTypes = [
    { 
      id: 1, 
      title: 'BREAKFAST', 
      path: '/BreakFast', 
     image: "channa-puri.jpg",
    },
    { 
      id: 2, 
      title: 'LUNCH', 
      path: '/recipe-lunch', 
      image: "pakistani-pulao.jpg", 
    },
    { 
      id: 3, 
      title: 'DINNER', 
      path: '/recipe-dinner', 
      image: "achari-chicken.jpg",
    },
    { 
      id: 4, 
      title: 'SOUPS', 
      path: '/soups', 
      image: "Restaurant-Style-Hot-and-Sour-Soup.jpg", 
    },
    { 
      id: 5, 
      title: 'APPETIZERS', 
      path: '/appetizers', 
      image: "hot-and-spicy-wings.jpg", 
    },
    { 
      id: 6, 
      title: 'SNACKS', 
      path: '/Snack', 
      image: "gol-gappay.jpg",
    },
    { 
      id: 7, 
      title: 'DESSERTS', 
      path: '/desserts', 
      image: "Qissa-Khawani-Kheer.jpg",
    },
    { 
      id: 8, 
      title: 'BAKING', 
      path: '/Baking', 
      image: "cherry-almond-coffee.jpg",
    },
    { 
      id: 9, 
      title: 'BEVERAGES', 
      path: '/Beverage', 
      image: "badam-milk.jpg",
    },
    { 
      id: 10, 
      title: 'SALADS', 
      path: '/Salads', 
      image: "cucumber-salad.jpg",
    },
    { 
      id: 11, 
      title: 'REGIONAL', 
      path: '/Regional', 
      image: "Ratatouille.jpg", 
    },
    { 
      id: 12, 
      title: 'CHEAT MEAL', 
      path: '/cheat-meal', 
      image: "fried-chicken.jpg",
    }
  ];

const budgetCategories = [
  { 
    id: 2, 
    title: 'STUDENT RECIPES', 
    path: '/StudentRecipe', 
    image: "yogurt-with-fruits.jpg", 
    features: ['Easy student meals for quick dorm room cooking'] 
  },
  { 
    id: 3, 
    title: 'QUICK And EASY', 
    path: '/QuickRecipe', 
    image: "french-fries.jpg", 
    features: ['Simple 15-minute meals with minimal cleanup'] 
  },
  { 
    id: 4, 
    title: 'VEGETARIAN', 
    path: '/Vege', 
    image: "anda-shimla-mirch.jpg", 
    features: ['Healthy meat-free meals with plant-based protein'] 
  }
];
  const heroImages = [
    "heroImage.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => prev === heroImages.length - 1 ? 0 : prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleRecipeTypeClick = (path) => navigate(path);
  const handleBudgetCategoryClick = (path) => navigate(path);

  return (
    <div className="rf-homepage">

      <section className="rf-hero-banner">
        <div className="rf-hero-split">

          <div className="rf-hero-text-side">
            <span className="rf-hero-eyebrow">Fresh & Flavorful</span>
            <h1 className="rf-hero-title">
              Culinary <em>Masterpieces</em><br />Made Simple
            </h1>
            <div className="rf-hero-divider"></div>
            <p className="rf-hero-desc">
              Chef-curated recipes to transform your everyday cooking into something extraordinary.
            </p>
            <p className="rf-hero-sub">
              From quick weeknight dinners to show-stopping desserts.
            </p>
          </div>

          <div className="rf-hero-image-side">
            <div className="rf-hero-slider">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`rf-hero-slide ${index === currentImageIndex ? 'active' : ''}`}
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              ))}
            </div>
            <div className="rf-hero-img-tint"></div>
            <div className="rf-hero-img-slice"></div>
          </div>

        </div>
      </section>

      <main className="rf-main-content">

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
                  <h3 className="rf-circle-card-title">{type.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

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

export default MyRecipeHomepage;