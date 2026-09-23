import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BeginnersPage.css';

const skillCards = [
  {
    id: '01',
    image: 'KitchenTools.png',
    title: 'Kitchen Tools',
    route: '/kitchen-tools'
  },
  {
    id: '02',
    image: 'CuttingTechniques.png',
    title: 'Cutting Techniques',
    route: '/cutting-techniques'
  },
  {
    id: '03',
    image: 'CookingMethods.png',
    title: 'Cooking Methods',
    route: '/cooking-methods'
  },
  {
    id: '04',
    image: 'MeatCuts.png',
    title: 'Meat Cuts',
    route: '/meat-cuts'
  },
  {
    id: '05',
    image: 'KitchenAppliances.png',
    title: 'Kitchen Appliances',
    route: '/kitchen-appliances'
  },
  {
    id: '06',
    image: 'PantryBasics.png',
    title: 'Pantry Basics',
    route: '/pantry-basics'
  },
  {
    id: '07',
    image: 'MeasuringSkills.png',
    title: 'Measuring Skills',
    route: '/measuring-skills'
  },
  {
    id: '08',
    image: 'BakingEssentials.png',
    title: 'Bakery Essentials',
    route: '/bakery-essentials'
  }
];

const BeginnersPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => navigate(route);

  return (
    <div className="beginners-page">
      <div className="hero-split">
        <div className="hero-text-side">
          <h1 className="hero-title">Kitchen Guidance</h1>
          <div className="hero-divider"></div>
          <p className="hero-desc">Essential skills every home cook needs to master</p>
        </div>

        <div className="hero-image-side">
          <img src="beginners.jpg" alt="Kitchen" className="hero-img" />
          <div className="hero-img-slice" aria-hidden="true"></div>
          <div className="hero-img-tint" aria-hidden="true"></div>
        </div>
      </div>

      <div className="guide-sections-container">
        <div className="guide-sections-grid">
          {skillCards.map((card, index) => (
            <div
              key={card.id}
              className="guide-section-card"
              onClick={() => handleCardClick(card.route)}
              role="button"
              tabIndex={0}
              style={{ animationDelay: `${index * 0.07}s` }}
              onKeyPress={(e) => e.key === 'Enter' && handleCardClick(card.route)}
            >
              <div className="card-glow-ring" aria-hidden="true"></div>

              <div className="guide-card-image-container">
                <img
                  src={card.image}
                  alt={card.title}
                  className="guide-card-real-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x200/284a4b/ffffff?text=${encodeURIComponent(card.title)}`;
                  }}
                />
                <div className="card-img-overlay" aria-hidden="true"></div>
              </div>

              <div className="guide-card-body">
                <h3 className="guide-card-title">{card.title}</h3>
                <div className="guide-card-cta">
                  <span>Explore</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="card-bottom-bar" aria-hidden="true"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="beg-back-home-container">
        <button className="beg-back-home-btn" onClick={() => navigate('/home')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BeginnersPage;