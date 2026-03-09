import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Lunch.css';

const Lunch = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  // Categories Data
  const categories = [
    {
      id: 1,
      name: "Plain Vegetables",
      tagline: "Simple aur ghar ki sabziyan",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554",
      route: "/plain-veg",
      type: "veg"
    },
    {
      id: 2,
      name: "Chicken + Vegetables",
      tagline: "Chicken ke saath mazedar sabziyan",
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      route: "/lunch/chicken-vegetables",
      type: "chicken"
    },
    {
      id: 3,
      name: "Mutton + Vegetables",
      tagline: "Mutton aur sabzi ka perfect blend",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      route: "/lunch/mutton-vegetables",
      type: "mutton"
    },
    {
      id: 4,
      name: "Plain Dal",
      tagline: "Simple daalen ghar jaisi",
      image: "https://images.unsplash.com/photo-1546833999-bf9a581a1996d",
      route: "/lunch/plain-dal",
      type: "dal"
    },
    {
      id: 5,
      name: "Chicken + Dal",
      tagline: "Chicken ke saath daal ka maza",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      route: "/lunch/chicken-dal",
      type: "chicken"
    },
    {
      id: 6,
      name: "Mutton + Dal",
      tagline: "Mutton aur daal ka rich combination",
      image: "https://images.unsplash.com/photo-1589779262934-68e4c9d3b4c2",
      route: "/lunch/mutton-dal",
      type: "mutton"
    },
    {
      id: 7,
      name: "Egg Dishes",
      tagline: "Anday ke mazedar salan",
      image: "https://images.unsplash.com/photo-1584483766114-2c22c5e4f7b0",
      route: "/lunch/egg-dishes",
      type: "egg"
    },
    {
      id: 8,
      name: "Fish Dishes",
      tagline: "Machli ki special recipes",
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
      route: "/lunch/fish-dishes",
      type: "fish"
    },
    {
      id: 9,
      name: "Pure Chicken Dishes",
      tagline: "Sada chicken ke zabardast recipes",
      image: "https://images.unsplash.com/photo-1604908176997-125f25c813e5",
      route: "/lunch/pure-chicken",
      type: "chicken"
    },
    {
      id: 10,
      name: "Pure Mutton Dishes",
      tagline: "Sada mutton ka lutf",
      image: "https://images.unsplash.com/photo-1545247181-516773c7e8a2",
      route: "/lunch/pure-mutton",
      type: "mutton"
    },
    {
      id: 11,
      name: "Keema Dishes",
      tagline: "Qeema ki mazedar recipes",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce",
      route: "/lunch/keema-dishes",
      type: "keema"
    },
    {
      id: 12,
      name: "Rice Dishes",
      tagline: "Biryani, Pulao aur bhi kuch",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      route: "/lunch/rice-dishes",
      type: "rice"
    },
    {
      id: 13,
      name: "Breads",
      tagline: "Roti, Naan aur parathay",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
      route: "/lunch/breads",
      type: "bread"
    },
    {
      id: 14,
      name: "BBQ / Grills",
      tagline: "Tandoori maza ghar par",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd",
      route: "/lunch/bbq-grills",
      type: "bbq"
    },
    {
      id: 15,
      name: "Heavy Gravy Dishes",
      tagline: "Nihari, Haleem, Paye aur bhi",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356c36",
      route: "/lunch/heavy-gravy",
      type: "heavy"
    }
  ];

  // Filter categories based on active tab
  const filteredCategories = activeCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.type === activeCategory);

  // Tab click handler
  const handleTabClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="lunch-page">
      {/* Header Section */}
      <header className="lunch-header">
        <div className="lunch-header-content">
          <h1 className="lunch-page-title">Lunch Categories</h1>
          <p className="lunch-page-description">
            Discover 15+ categories with 500+ traditional Pakistani recipes - from hearty curries to sizzling BBQ
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="lunch-main">
        {/* Category Tabs */}
        <div className="category-tabs">
          <button 
            className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleTabClick('all')}
          >
            <span className="category-name">All</span>
          </button>
          <button 
            className={`category-tab ${activeCategory === 'veg' ? 'active' : ''}`}
            onClick={() => handleTabClick('veg')}
          >
            <span className="category-name">Veg</span>
          </button>
          <button 
            className={`category-tab ${activeCategory === 'chicken' ? 'active' : ''}`}
            onClick={() => handleTabClick('chicken')}
          >
            <span className="category-name">Chicken</span>
          </button>
          <button 
            className={`category-tab ${activeCategory === 'mutton' ? 'active' : ''}`}
            onClick={() => handleTabClick('mutton')}
          >
            <span className="category-name">Mutton</span>
          </button>
          <button 
            className={`category-tab ${activeCategory === 'dal' ? 'active' : ''}`}
            onClick={() => handleTabClick('dal')}
          >
            
            <span className="category-name">Dal</span>
          </button>
          <button 
            className={`category-tab ${activeCategory === 'rice' ? 'active' : ''}`}
            onClick={() => handleTabClick('rice')}
          >
            <span className="category-name">Rice</span>
          </button>
          <button 
            className={`category-tab ${activeCategory === 'bbq' ? 'active' : ''}`}
            onClick={() => handleTabClick('bbq')}
          >
            <span className="category-name">BBQ</span>
          </button>
        </div>

        {/* Category Info */}
        <div className="category-info">
          <h2 className="active-category-title">
            {activeCategory === 'all' ? 'All Categories' : 
             activeCategory === 'veg' ? 'Vegetarian Delights' :
             activeCategory === 'chicken' ? 'Chicken Specialties' :
             activeCategory === 'mutton' ? 'Mutton Specialties' :
             activeCategory === 'dal' ? 'Dal Creations' :
             activeCategory === 'rice' ? 'Rice Dishes' :
             activeCategory === 'bbq' ? 'BBQ & Grills' : 'All Categories'}
          </h2>
          <p className="category-description">
            {filteredCategories.length} categories • Authentic Pakistani flavors
          </p>
        </div>

        {/* Categories Grid */}
        <div className="lunch-grid-section">
          <div className="lunch-grid">
            {filteredCategories.map((category) => (
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

      {/* Footer / Back Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          <span>←</span> Back to Home
        </button>
      </div>
    </div>
  );
};

export default Lunch;