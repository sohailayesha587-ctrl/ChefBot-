import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Lunch from './Lunch';

const HomePage = () => {
   const [recipes, setRecipes] = useState([]);
  const features = [
    {
      image: 'image.png',
      title: 'Meal Suggestion',
      path: '/meal-suggestion'
    },
    {
      image: 'pantry-staples.jpg',
      title: 'Pantry List',
      path: '/smart-pantry'
    },
    {
      image: 'recipe.jpg',
      title: 'Recipe Database',
      path: '/recipes'
    },
    {
      image: 'plannermeal.jpg',
      title: 'Meal Planner',
      path: '/meal-planner'
    },
    {
      image: 'shoppinglist.png',
      title: 'Shopping List',
      path: '/smart-shopping'
    },
    {
      image: 'beginners.jpg',
      title: 'Beginners Guidance',
      path: '/guidance'
    }
  ];
  

  const stats = [
    { number: '500+', label: 'Recipes' },
    { number: '50K+', label: 'Happy Cooks' },
    { number: '6', label: 'Smart Tools' },
    { number: '4.9★', label: 'User Rating' },
  ];
 useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipes?subCategory=appetizers&limit=10');
        const data = await response.json();
        if (data.recipes) {
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error('Error:', error);
        setRecipes([
          { _id: '1', image: 'home_biryani.jpg', title: 'Chicken Biryani', category: 'Main Course', cookingTime: '45 min' },
          { _id: '2', image: 'home_veg_salad.jpg', title: 'Chicken Karahi', category: 'Main Course', cookingTime: '30 min' },
          { _id: '3', image: 'home_icecream.jpg', title: 'Gulab Jamun', category: 'Dessert', cookingTime: '25 min' },
        ]);
      }
    };
    fetchRecipes();
  }, []);

  const weekDays = [
    { img: 'meal1.jpg', day: 'Monday' },
    { img: 'meal3.jpg', day: 'Tuesday' },
    { img: 'meal4.jpg', day: 'Wednesday' },
    { img: 'meal5.jpg', day: 'Thursday' },
    { img: 'meal6.jpg', day: 'Friday' },
    { img: 'meal7.jpg', day: 'Saturday' },
    { img: 'meal8.jpg', day: 'Sunday' },
  ];


  return (
    <div className="home-container">
     <div className="my-hero-wrapper">
        <video className="my-hero-video" autoPlay loop muted playsInline>
          <source src="/chefbot.mp4" type="video/mp4" />
        </video>
        <div className="my-hero-overlay"></div>

        <div className="my-particles">
          <div className="my-particle"></div>
          <div className="my-particle"></div>
          <div className="my-particle"></div>
          <div className="my-particle"></div>
        </div>

        <div className="my-hero-content">
          <div className="my-hero-text">
            <h1 className="my-hero-title">
              Never Stress <br /> Over<br />
              <span className="my-hero-highlight">"What to Cook"</span>
            </h1>
            <p className="my-hero-subtitle">
              Explore meal suggestions & recipes using ingredients you already have.
            </p>
            <div className="my-hero-buttons">
              <a href="#" className="my-btn-primary">
                <i className="fas fa-utensils"></i> Start
              </a>
              <a href="#" className="my-btn-secondary">
                <i className="fas fa-book-open"></i> Browse
              </a>
            </div>
          </div>
        </div>

      </div>
 
      <section className="h-features-section">
        <div className="h-features-header">
          <h2 className="h-features-title">Our Core Features</h2>
        </div>
        <div className="h-features-grid">
          {features.map((item, index) => (
            <Link to={item.path} key={index} className="h-feature-box">
              <div className="h-feature-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="h-feature-content">
                <h3 className="h-feature-title">{item.title}</h3>
                <span className="h-feature-link">
                  Explore <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

        <div className="my-steps-wrapper">
          <div className="my-steps-container">
            <div className="my-step-card">
              <span className="my-step-number">1</span>
              <span className="my-step-icon"><i className="fas fa-box"></i></span>
              <div className="my-step-text">
                <h4>Fill Pantry</h4>
                <p>Add ingredients</p>
              </div>
            </div>
            <div className="my-step-card">
              <span className="my-step-number">2</span>
              <span className="my-step-icon"><i className="fas fa-robot"></i></span>
              <div className="my-step-text">
                <h4>Get Recipes</h4>
                <p>AI suggestions</p>
              </div>
            </div>
            <div className="my-step-card">
              <span className="my-step-number">3</span>
              <span className="my-step-icon"><i className="fas fa-calendar-alt"></i></span>
              <div className="my-step-text">
                <h4>Plan Week</h4>
                <p>Schedule meals</p>
              </div>
            </div>
            <div className="my-step-card">
              <span className="my-step-number">4</span>
              <span className="my-step-icon"><i className="fas fa-utensils"></i></span>
              <div className="my-step-text">
                <h4>Cook!</h4>
                <p>Step-by-step</p>
              </div>
            </div>
          </div>
        </div>

      
      <section className="digital-banner">
        <div className="digital-banner-left">
         
          <h2 className="digital-banner-title">
            Personalized Meal <br/>Suggestions
          </h2>
          <p className="digital-banner-desc">
            Find the perfect meal recommendations based on your cravings and available ingredients
          </p>
          <div className="digital-banner-btn-wrapper">
            <Link to="/smart-pantry" className="digital-banner-btn">
              Find Meal <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
        <div className="digital-banner-right">
          <div className="digital-banner-img-wrap">
            <img src="image.png" alt="Smart kitchen" />
          </div>
          <div className="digital-stats-row">
            {stats.map((s, i) => (
              <div className="digital-stat" key={i}>
                <span className="digital-stat-num">{s.number}</span>
                <span className="digital-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pantry-mini-section">
        <div className="pantry-mini-header">
          <h2 className="pantry-mini-title">
            Pantry & <span className="pantry-mini-highlight">Shopping</span>
          </h2>
          <p className="pantry-mini-desc">Track what you have. Know what you need.</p>
        </div>

        <div className="pantry-mini-grid">
          <Link to="/smart-pantry" className="pantry-mini-card">
            <div className="pantry-mini-img">
              <img src="pantry-staples.jpg" alt="Pantry" />
            </div>
            <div className="pantry-mini-info">
              <h3>Smart Pantry</h3>
              <p>Track ingredients & get recipes</p>
            </div>
            <span className="pantry-mini-arrow">→</span>
          </Link>

          <Link to="/smart-shopping" className="pantry-mini-card">
            <div className="pantry-mini-img">
              <img src="shoppinglist.png" alt="Shopping" />
            </div>
            <div className="pantry-mini-info">
              <h3>Shopping List</h3>
              <p>Track what you need to buy</p>
            </div>
            <span className="pantry-mini-arrow">→</span>
          </Link>
        </div>
      </section>

       <section className="classes-section">
        <div className="classes-img-wrap">
          <img src="beginners.jpg" className="classes-image" alt="AI Kitchen" />
          
        </div>
        <div className="classes-content">
          <h2>Guidance for beginners<br />made easy</h2>
         
          <div className="classes-checklist">
            <div className="classes-check-item"><i className="fas fa-check-circle"></i> Step-by-step instructions</div>
            <div className="classes-check-item"><i className="fas fa-check-circle"></i> Pantry organization tips</div>
            <div className="classes-check-item"><i className="fas fa-check-circle"></i> Smart shopping guidance</div>
          </div>
          <Link to="/guidance" className="classes-cta-btn">
            Start Your Journey <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

<section className="m_plan-section">
  <div className="m_plan-header">
    <div>
      <h2>Never wonder 'What's for dinner?' again.</h2>
    </div>
    <Link to="/meal-planner" className="m_plan-btn">Let's Plan</Link>
  </div>

  <div className="m_plan-grid">
    {weekDays.map((item, index) => (
      <div className="m_plan-card animate" key={index}>
        <img src={item.img} alt={item.day} />
        <div className="m_plan-card-overlay">
          <span className="m_plan-card-day">{item.day}</span>
        </div>
      </div>
    ))}
  </div>
</section>
       
      <section className="hp-recipes-section">
        <div className="hp-recipes-container">
          <div className="hp-recipes-header">
            <h2 className="hp-recipes-title">Popular Recipes</h2>
          </div>
          <div className="hp-recipes-scroll-wrapper">
            <div className="hp-recipes-scroll">
              {recipes.map((recipe) => (
                <div key={recipe._id} className="hp-recipe-card-mini">
                  <div className="hp-recipe-card-image-mini">
                    <img src={recipe.image || 'recipe.jpg'} alt={recipe.title} />
                  </div>
                  <div className="hp-recipe-card-body-mini">
                    <h3 className="hp-recipe-card-title-mini">{recipe.title}</h3>
                    <Link to={`/recipe/${recipe._id}`} className="hp-recipe-card-btn-mini">
                      View Recipe →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hp-recipes-footer">
            <Link to="/recipes" className="hp-recipes-view-all">View All Recipes →</Link>
          </div>
        </div>
      </section>

     
     
    </div>
  );
};

export default HomePage;