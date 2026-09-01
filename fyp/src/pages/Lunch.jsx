import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lunch.css';

const Lunch = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "Plain Vegetables",
      image: "plainVegetable.jpg",
      route: "/plain-veg"
    },
    {
      id: 2,
      name: "Chicken Vegetables",
      image: "chickenVegetable.jpg",
      route: "/veg-chick"
    },
    {
      id: 3,
      name: "Mutton Vegetables",
      image: "muttonVegetable.jpg",
      route: "/veg-mutton"
    },
    {
      id: 4,
      name: "Plain Dal",
      image: "plainDal.jpg",
      route: "/plain-dal"
    },
    {
      id: 5,
      name: "Chicken Dal",
      image: "chickenDal.jpg",
      route: "/dal-chick"
    },
    {
      id: 6,
      name: "Mutton Dal",
      image: "muttonDal.jpg",
      route: "/dal-mutton"
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="lunch-page">
      {/* Header */}
      <header className="lunch-header">
        <div className="lunch-header-content">
          <h1 className="lunch-page-title">Lunch Offerings</h1>
          <p className="lunch-page-description">
            Delicious Lunch Creations
          </p>
        </div>
      </header>

      <main className="lunch-main">
        <div className="lunch-carousel">
          <button className="lunch-arrow lunch-arrow-left" onClick={scrollLeft}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="lunch-scroll-wrapper" ref={scrollContainerRef}>
            <div className="lunch-grid">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  onClick={() => navigate(category.route)}
                  className={`lunch-category-card ${index % 2 === 0 ? 'lunch-card-up' : 'lunch-card-down'}`}
                >
                  <div className="lunch-card-image-container">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="lunch-card-img"
                      loading="lazy"
                    />
                    <div className="lunch-card-overlay"></div>
                  </div>

                  <div className="lunch-card-content">
                    <h3 className="lunch-card-title">{category.name}</h3>
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

          <button className="lunch-arrow lunch-arrow-right" onClick={scrollRight}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/recipe-lunch')}>
          <span>←</span> Back to Categories
        </button>
      </div>

      <div className="lunch-bg-pattern"></div>
    </div>
  );
};

export default Lunch;