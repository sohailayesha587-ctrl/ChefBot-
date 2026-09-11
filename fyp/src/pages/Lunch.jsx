import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Lunch.css';

const Lunch = () => {
  const navigate = useNavigate();
  const vegCategories = [
    {
      id: 1,
      name: "Plain Vegetables",
      image: "plainVegetable.jpg",
      route: "/plain-veg",
      tagline: "Fresh seasonal vegetables cooked with mild spices"
    },
    {
      id: 2,
      name: "Chicken Vegetables",
      image: "chickenVegetable.jpg",
      route: "/veg-chick",
      tagline: "Vegetables cooked with tender chicken pieces"
    },
    {
      id: 3,
      name: "Mutton Vegetables",
      image: "muttonVegetable.jpg",
      route: "/veg-mutton",
      tagline: "Rich vegetable curry with succulent mutton"
    }
  ];

  return (
    <div className="lunch-page">
      <header className="lunch-header">
        <div className="lunch-header-content">
          <h1 className="lunch-page-title">Vegetarian Delights</h1>
          <p className="lunch-page-description">
            Fresh and healthy vegetable recipes
          </p>
        </div>
      </header>

      <main className="lunch-main">
        {/* 3 Cards Grid */}
        <div className="lunch-grid-section">
          <div className="lunch-grid">
            {vegCategories.map((category) => (
              <div
                key={category.id}
                className="lunch-category-card"
                onClick={() => navigate(category.route)}
              >
                <div
                  className="lunch-card-image"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="lunch-card-content">
                  <h3 className="lunch-card-title">{category.name}</h3>
                  <p className="lunch-card-description">{category.tagline}</p>
                  <div className="lunch-card-button">
                    <span>Explore Recipes</span>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back to Categories
        </button>
      </div>
    </div>
  );
};

export default Lunch;