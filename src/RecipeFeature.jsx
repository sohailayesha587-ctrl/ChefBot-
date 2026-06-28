import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const RecipeFeature = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const recipeTypes = [
    {
      id: 1,
      title: 'SOUPS',
      path: '/soups',
      image: 'https://substackcdn.com/image/fetch/$s_!Xw3X!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfa9ec03-d4e8-4946-9649-cf7fe4f34059_1442x1103.heic'
    },
    {
      id: 2,
      title: 'DESSERTS',
      path: '/desserts',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'MAIN COURSE',
      path: '/MainCourse',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAkO6PiyzExlXgDE-kZFg0VQlAt1sOqclhA&s'
    },
    {
      id: 4,
      title: 'BEVERAGES',
      path: '/Beverage',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'BAKING',
      path: '/Baking',
      image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'REGIONAL',
      path: '/Regional',
      image: 'https://c.ndtvimg.com/2024-07/ejbft7io_head_625x300_03_July_24.jpg?im=FeatureCrop,algorithm=dnn,width=384,height=384'
    },
    {
      id: 7,
      title: 'SALADS',
      path: '/Salads',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 8,
      title: 'SNACKS',
      path: '/Snack',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];
  const budgetCategories = [
    {
      id: 1,
      title: 'BUDGET-FRIENDLY',
      path: '/BudgetFriendly',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      
    },
    {
      id: 2,
      title: 'STUDENT RECIPES',
      path: '/StudentRecipe',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      
    },
    {
      id: 3,
      title: 'QUICK & EASY',
      path: '/QuickRecipe',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
     
    },
    {
      id: 4,
      title: 'VEGETARIAN',
      path: '/Vege',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      
    }
  ];
  const heroImages = [
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Navigation Handlers
  const handleRecipeTypeClick = (path) => {
    navigate(path);
  };

  const handleBudgetCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className="homepage">

      <section className="hero-banner">
        <div className="hero-slider">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
          <div className="slider-dots">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <main className="main-content">
        <section className="recipe-types-section">
          <div className="recipe-types-container">
            <div className="section-header">
              <h2>Culinary Masterpieces</h2>
              <p>Chef-curated recipes to transform your cooking experience</p>
            </div>
            
            <div className="recipe-types-grid">
              {recipeTypes.map((type) => (
                <div 
                  key={type.id}
                  className="circle-card-wrapper"
                  onClick={() => handleRecipeTypeClick(type.path)}
                >
                  <div className="circle-card">
                    <div className="circle-image-container">
                      <img src={type.image} alt={type.title} className="circle-image" />
                    </div>
                  </div>
                  <h3 className="circle-card-title">{type.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="budget-friendly-section">
          <div className="section-header">
            <h2>Smart Cooking Solutions</h2>
            <p>Restaurant-quality meals designed for everyday cooking</p>
          </div>

          <div className="budget-grid-new">
            {budgetCategories.map((category) => (
              <div 
                key={category.id}
                className="budget-card-new"
                onClick={() => handleBudgetCategoryClick(category.path)}
              >
                <div className="budget-card-header">
                  <h3 className="budget-card-title">{category.title}</h3>
                </div>
                <div className="budget-card-image-container">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="budget-card-image"
                  />
                </div>
                <div className="budget-card-content">
                  <ul className="budget-card-features">
                    {category.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <div className="section-header">
            <h2>Elevate Your Cooking Journey</h2>
            <p>Advanced features designed for modern home chefs</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>AI-Powered Recipes</h3>
              <p>Get personalized recipe suggestions based on your preferences</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-step-forward"></i>
              </div>
              <h3>Step-by-Step Guide</h3>
              <p>Detailed cooking instructions with timers and tips</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <h3>Meal Planning</h3>
              <p>Smart weekly meal plans with automatic grocery lists</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
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