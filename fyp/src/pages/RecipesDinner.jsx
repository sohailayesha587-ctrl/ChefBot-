import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './RecipesDinner.css';

const RecipesDinner = () => {
  const scrollContainerRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "Plain Vegetables",
      image: "plainVegetable.jpg",
      route: "/lunch",
    
    },
    {
      id: 2,
      name: "Plain Daal",
      image: "plainDal.jpg",
      route: "/lunch",
     
    },
    {
      id: 3,
      name: "Egg Dishes",
      image: "egg.jpg",
      route: "/egg-dishes"
    },
    {
      id: 4,
      name: "Fish Dishes",
      image: "fish.jpg",
      route: "/fish-dishes"
    },
    {
      id: 5,
      name: "Chicken Dishes",
      image: "chicken.jpg",
      route: "/chicken"
    },
    {
      id: 6,
      name: "Mutton Dishes",
      image: "mutton.jpg",
      route: "/mutton"
    },
    {
      id: 7,
      name: "Keema Dishes",
      image: "keema.jpg",
      route: "/qeema"
    },
    {
      id: 8,
      name: "Rice Dishes",
      image: "rice.jpg",
      route: "/rice"
    },
    {
      id: 9,
      name: "Breads",
      image: "bread.jpg",
      route: "/breads"
    },
    {
      id: 10,
      name: "BBQ",
      image: "bbq.jpg",
      route: "/BBQ"
    },
    {
      id: 11,
      name: "Heavy Gravy",
      image: "heavyGravy.jpg",
      route: "/heavy-gravy"
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
    <div className="recipes-dinner-page">
      {/* Header */}
      <header className="recipes-dinner-header">
        <div className="recipes-dinner-header-content">
          <h1 className="recipes-dinner-title">Dinner Offerings</h1>
          <p className="recipes-dinner-description">
            Comforting Dinner Creations
          </p>
        </div>
      </header>

      <main className="recipes-dinner-main">
        <div className="recipes-dinner-carousel">
          <button className="recipes-dinner-arrow recipes-dinner-arrow-left" onClick={scrollLeft}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="recipes-dinner-scroll-wrapper" ref={scrollContainerRef}>
            <div className="recipes-dinner-grid">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={category.route}
                  state={category.state}
                  className={`recipes-dinner-card ${index % 2 === 0 ? 'recipes-dinner-card-up' : 'recipes-dinner-card-down'}`}
                >
                  <div className="recipes-dinner-card-image-container">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="recipes-dinner-card-img"
                      loading="lazy"
                    />
                    <div className="recipes-dinner-card-overlay"></div>
                    <span className="recipes-dinner-card-badge">
                      {category.recipeCount}
                    </span>
                  </div>

                  <div className="recipes-dinner-card-content">
                    <h3 className="recipes-dinner-card-title">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button className="recipes-dinner-arrow recipes-dinner-arrow-right" onClick={scrollRight}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>

      <div className="recipes-dinner-bg-pattern"></div>
    </div>
  );
};

export default RecipesDinner;