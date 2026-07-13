import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
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
const foodImages = [
  "home1.jpg",
  "home2.jpg",
  "home3.jpg",
];
  const recipes = [
    {
      image: "home_biryani.jpg",
      name: "Chicken Biryani",
      description: "Spiced chicken with aromatic rice.",
      category: "Main",
    },
    {
      image: "home_veg_salad.jpg",
      name: "Veg Salad",
      description: "Fresh veggies tossed with light dressing.",
      category: "Salad",
    },
    {
      image: "home_icecream.jpg",
      name: "Chocolate Ice Cream",
      description: "Rich, moist with creamy frosting ice cream.",
      category: "Dessert",
    }
  ];

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
              Tailored recipes using ingredients you already have.
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
        <h2 className="h-features-title">Our Amazing Features</h2>
        <div className="h-features-grid">
          {features.map((feature, index) => (
            <Link 
              to={feature.path} 
              key={index} 
              className="h-feature-box"
            >
              <div className="h-feature-image">
                <img src={feature.image} alt={feature.title} />
              </div>
              <div className="h-feature-content">
                <h3 className="h-feature-title">{feature.title}</h3>
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
      <section className="hero-section1">
        <div className="hero-left">
          <h2>Digital Cooking</h2>
          <p>Turn pantry items into delicious meals with ChefBot's recipe suggestions.</p>
          <Link to="/" className="contact-link">Start Learning →</Link>
        </div>
        <div className="hero-center">
          <h1>No grocery trip needed! Cook from pantry items with ChefBot.</h1>
        </div>
        <div className="hero-right">
          <img src="beginners.jpg" alt="Smart kitchen" />
        </div>
      </section>

      <section className="food-showcase">
        {foodImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            className="food-image" 
            alt={`Cooking ${index + 1}`} 
          />
        ))}
      </section>

      <section className="classes-section">
        <img 
          src="home_gui.jpg" 
          className="classes-image" 
          alt="AI Kitchen" 
        />
        <div className="classes-content">
          <div className="section-label">LEARN TO COOK</div>
          <h2>Guidance for beginners<br />made <span className="italic">easy</span></h2>
          <p>
            Master cooking basics with step-by-step instructions, pantry organization tips, and smart shopping guidance. 
            Perfect for those starting their cooking journey with confidence and ease.
          </p>
        </div>
      </section>
<section className="m_plan-section">
  <div className="m_plan-header">
    <div>
      <span className="section-label-light">Meal Planner</span>
      <h2>Never wonder 'What's for dinner?' again.</h2>
      <p className="m_plan-subtitle">Smart weekly meal planning that saves time, money and mental energy.</p>
    </div>
    <Link to="/meal-planner" className="btn">Let's Plan</Link>
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
       
      <section className="h-recipes-section">
        <div className="h-recipes-container">
          <h2 className="h-recipes-title">Popular Recipes</h2>
          <p className="h-recipes-subtitle">
            Discover delicious recipes curated by ChefBot AI
          </p>
          <div className="h-recipes-grid">
            {recipes.map((recipe, index) => (
              <div key={index} className="h-recipe-card">
                <div className="h-recipe-image">
                  <img src={recipe.image} alt={recipe.name} />
                  <div className="recipe-category">{recipe.category}</div>
                </div>
                <div className="h-recipe-content">
                  <h3 className="h-recipe-name">{recipe.name}</h3>
                  <p className="h-recipe-description">{recipe.description}</p>
                  <Link to="/recipes" className="h-recipe-btn">View Recipe</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
     
    </div>
  );
};

export default HomePage;