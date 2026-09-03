import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './RecipesLunch.css';

const RecipesLunch= () => {
  const scrollContainerRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "Vegetable Dishes",
      image: "plainVegetable.jpg",
      route: "/lunch",
    
    },
    {
      id: 2,
      name: "Lentils(Daal) Dishes",
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
    <div className="recipes-lunch-page">
      <header className="recipes-lunch-header">
        <div className="recipes-lunch-header-content">
          <h1 className="recipes-lunch-title">Lunch Offerings</h1>
          <p className="recipes-lunch-description">
            Comforting Lunch Creations
          </p>
        </div>
      </header>

      <main className="recipes-lunch-main">
        <div className="recipes-lunch-carousel">
          <button className="recipes-lunch-arrow recipes-lunch-arrow-left" onClick={scrollLeft}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="recipes-lunch-scroll-wrapper" ref={scrollContainerRef}>
            <div className="recipes-lunch-grid">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={category.route}
                  state={category.state}
                  className={`recipes-lunch-card ${index % 2 === 0 ? 'recipes-lunch-card-up' : 'recipes-lunch-card-down'}`}
                >
                  <div className="recipes-lunch-card-image-container">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="recipes-lunch-card-img"
                      loading="lazy"
                    />
                    <div className="recipes-lunch-card-overlay"></div>
                    <span className="recipes-lunch-card-badge">
                      {category.recipeCount}
                    </span>
                  </div>

                  <div className="recipes-lunch-card-content">
                    <h3 className="recipes-lunch-card-title">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <button className="recipes-lunch-arrow recipes-lunch-arrow-right" onClick={scrollRight}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>

      <div className="recipes-lunch-bg-pattern"></div>
    </div>
  );
};

export default RecipesLunch;