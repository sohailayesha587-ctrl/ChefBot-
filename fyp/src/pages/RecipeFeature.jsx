import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeFeature.css';

const RecipeFeature = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Recipe Types Data with Images
  const recipeTypes = [
    {
      id: 1,
      title: 'SOUPS',
      description: 'Warm and comforting soups for all seasons',
      path: '/soups',
      image: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfa9ec03-d4e8-4946-9649-cf7fe4f34059_1442x1103.heic'
    },
    {
      id: 2,
      title: 'DESSERTS',
      description: 'Sweet delights and delicious treats',
      path: '/desserts',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'MAIN COURSE',
      description: 'Hearty main dishes for every occasion',
      path: '/MainCourse',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAkO6PiyzExlXgDE-kZFg0VQlAt1sOqclhA&s'
    },
    {
      id: 4,
      title: 'BEVERAGES',
      description: 'Refreshing drinks for every mood',
      path: '/Beverage',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'BAKING',
      description: 'Freshly baked goods and pastries',
      path: '/Baking',
      image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'REGIONAL',
      description: 'Traditional and modern sweet dishes',
      path: '/Regional',
      image: 'https://c.ndtvimg.com/2024-07/ejbft7io_head_625x300_03_July_24.jpg?im=FeatureCrop,algorithm=dnn,width=384,height=384'
    },
    {
      id: 7,
      title: 'SALADS',
      description: 'Fresh and healthy salad recipes',
      path: '/Salads',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 8,
      title: 'SNACKS',
      description: 'Quick bites and appetizers',
      path: '/Snack',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Budget Friendly Categories Data with Images
  const budgetCategories = [
    {
      id: 1,
      title: 'BUDGET-FRIENDLY',
      description: 'Delicious meals that won\'t break the bank',
      path: '/BudgetFriendly',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'STUDENT RECIPES',
      description: 'Easy recipes perfect for student life',
      path: '/StudentRecipe',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'QUICK & EASY',
      description: 'Fast meals for busy weekdays',
      path: '/QuickRecipe',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'VEGETARIAN',
      description: 'Plant-based delicious recipes',
      path: '/Vege',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Premium Professional Hero Images
  const heroImages = [
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'
  ];

  // Auto slide hero images
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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <div className="recipe-feature-page">
      {/* ========== HERO BANNER ========== */}
      <section className="rf-hero-banner">
        <div className="rf-hero-slider">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`rf-hero-slide ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="rf-hero-content">
                <h2>Discover Culinary Excellence</h2>
                <p>Thousands of chef-curated recipes at your fingertips</p>
                <button 
                  className="rf-hero-cta-button"
                  onClick={() => navigate('/recipes')}
                >
                  Explore Recipes
                </button>
              </div>
            </div>
          ))}
          <div className="rf-slider-dots">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`rf-slider-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <main className="rf-main-content">
        
        {/* Recipe Types Section */}
        <section className="rf-recipe-types-section">
          <div className="rf-recipe-types-container">
            <div className="rf-section-header">
              <h2>Culinary Masterpieces</h2>
              <p>Chef-curated recipes to transform your cooking experience</p>
            </div>
            
            <div className="rf-recipe-grid">
              {recipeTypes.map((type) => (
                <div 
                  key={type.id}
                  className="rf-recipe-card"
                  onClick={() => handleRecipeTypeClick(type.path)}
                >
                  <div className="rf-card-image-container">
                    <img src={type.image} alt={type.title} className="rf-card-image" />
                    <div className="rf-card-overlay"></div>
                  </div>
                  <div className="rf-card-content">
                    <h3 className="rf-card-title">{type.title}</h3>
                    <p className="rf-card-description">{type.description}</p>
                    <button className="rf-card-button">
                      View Recipes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Budget Friendly Section */}
        <section className="rf-budget-section">
          <div className="rf-section-header">
            <h2>Smart Cooking Solutions</h2>
            <p>Restaurant-quality meals designed for everyday cooking</p>
          </div>

          <div className="rf-budget-grid">
            {budgetCategories.map((category) => (
              <div 
                key={category.id}
                className="rf-recipe-card"
                onClick={() => handleBudgetCategoryClick(category.path)}
              >
                <div className="rf-card-image-container">
                  <img src={category.image} alt={category.title} className="rf-card-image" />
                  <div className="rf-card-overlay"></div>
                </div>
                <div className="rf-card-content">
                  <h3 className="rf-card-title">{category.title}</h3>
                  <p className="rf-card-description">{category.description}</p>
                  <button className="rf-card-button">
                    Explore Recipes
                  </button>
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

        {/* Newsletter Section */}
        <section className="rf-newsletter-section">
          <div className="rf-newsletter-container">
            <h2>Join Our Culinary Community</h2>
            <p>Subscribe to get weekly recipes, cooking tips, and exclusive content</p>
            <form onSubmit={handleEmailSubmit} className="rf-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rf-email-input"
              />
              <button type="submit" className="rf-subscribe-button">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecipeFeature;