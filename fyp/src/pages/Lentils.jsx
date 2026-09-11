import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Lentils.css';

const Lentils = () => {
  const navigate = useNavigate();
  const lentilCategories = [
    {
      id: 1,
      name: "Plain Dal",
      image: "plainDal.jpg",
      route: "/plain-dal",
      tagline: "Classic lentil curry with aromatic tempering"
    },
    {
      id: 2,
      name: "Chicken Dal",
      image: "chickenDal.jpg",
      route: "/dal-chick",
      tagline: "Protein-packed dal with chicken pieces"
    },
    {
      id: 3,
      name: "Mutton Dal",
      image: "muttonDal.jpg",
      route: "/dal-mutton",
      tagline: "Hearty lentil curry with flavorful mutton"
    }
  ];

  return (
    <div className="lentils-page">
      <header className="lentils-header">
        <div className="lentils-header-content">
          <h1 className="lentils-page-title">Lentil Specialties</h1>
          <p className="lentils-page-description">
            Protein-rich lentil recipes
          </p>
        </div>
      </header>

      <main className="lentils-main">
        <div className="lentils-grid-section">
          <div className="lentils-grid">
            {lentilCategories.map((category) => (
              <div
                key={category.id}
                className="lentils-category-card"
                onClick={() => navigate(category.route)}
              >
                <div
                  className="lentils-card-image"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="lentils-card-content">
                  <h3 className="lentils-card-title">{category.name}</h3>
                  <p className="lentils-card-description">{category.tagline}</p>
                  <div className="lentils-card-button">
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

      <div className="lentils-back-button-container">
        <button className="lentils-back-home-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back to Categories
        </button>
      </div>
    </div>
  );
};

export default Lentils;