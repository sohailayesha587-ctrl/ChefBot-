import React from 'react';
import './BeginnersPage.css';
import { useNavigate } from 'react-router-dom';

const BeginnersPage = () => {
  const navigate = useNavigate();

  const skillCards = [
    {
      id: 1,
      icon: 'fas fa-tools',
      title: 'Kitchen Tools',
      route: '/kitchen-tools',
      features: [
        'Essential knives set',
        'Cutting boards types',
        'Pots & pans selection',
        'Measuring tools'
      ],
      tag: 'ESSENTIAL'
    },
    {
      id: 2,
      icon: 'fas fa-cut',
      title: 'Cutting Techniques',
      route: '/cutting-techniques',
      features: [
        'Julienne & dice cuts',
        'Mincing methods',
        'Knife safety rules',
        'Practice exercises'
      ],
      tag: 'SKILL'
    },
    {
      id: 3,
      icon: 'fas fa-fire',
      title: 'Cooking Methods',
      route: '/cooking-methods',
      features: [
        'Boiling & steaming',
        'Sautéing & frying',
        'Roasting & baking',
        'Grilling basics'
      ],
      tag: 'METHOD'
    },
    {
      id: 4,
      icon: 'fas fa-drumstick-bite',
      title: 'Meat Cuts',
      route: '/meat-cuts',
      features: [
        'Chicken parts guide',
        'Beef cuts chart',
        'Lamb pieces',
        'Fish preparation'
      ],
      tag: 'PROTEIN'
    },
    {
      id: 5,
      icon: 'fas fa-utensils',
      title: 'Table Settings',
      route: '/table-settings',
      features: [
        'Casual setup guide',
        'Formal arrangement',
        'Glassware placement',
        'Napkin folding'
      ],
      tag: 'ETIQUETTE'
    },
    {
      id: 6,
      icon: 'fas fa-mortar-pestle',
      title: 'Spices & Flavors',
      route: '/spices-flavors',
      features: [
        'Essential spices list',
        'Flavor balancing',
        'Herb pairing guide',
        'Taste profiles'
      ],
      tag: 'FLAVOR'
    },
    {
      id: 7,
      icon: 'fas fa-temperature-high',
      title: 'Food Safety',
      route: '/food-safety',
      features: [
        'Temperature control',
        'Storage methods',
        'Cross-contamination',
        'Shelf life guide'
      ],
      tag: 'SAFETY'
    },
    {
      id: 8,
      icon: 'fas fa-clock',
      title: 'Kitchen Timing',
      route: '/kitchen-timing',
      features: [
        'Mise en place',
        'Meal prep strategies',
        'Multi-course timing',
        'Efficient workflow'
      ],
      tag: 'TIMING'
    },
    {
      id: 9,
      icon: 'fas fa-book-open',
      title: 'Basic Recipes',
      route: '/basic-recipes',
      features: [
        'Perfect rice every time',
        'Basic sauces mastery',
        'Simple dishes',
        'Baking fundamentals'
      ],
      tag: 'RECIPES'
    },
    {
      id: 10,
      icon: 'fas fa-graduation-cap',
      title: 'Learning Resources',
      route: '/learning-resources',
      features: [
        'Recommended books',
        'YouTube channels',
        'Weekly practice plans',
        'Advanced skills'
      ],
      tag: 'LEARNING'
    },
    {
      id: 11,
      icon: 'fas fa-weight',
      title: 'Measuring Skills',
      route: '/measuring-skills',
      features: [
        'Weight vs volume',
        'Measuring cups & spoons',
        'Kitchen scale usage',
        'Conversion charts'
      ],
      tag: 'PRECISION'
    },
    {
      id: 12,
      icon: 'fas fa-birthday-cake',
      title: 'Bakery Essentials',
      route: '/bakery-essentials',
      features: [
        'Dough kneading techniques',
        'Proofing & fermentation',
        'Oven temperature control',
        'Decorative piping skills'
      ],
      tag: 'BAKING'
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="beginners-page">
      {/* ========== YEH NEW PICTURE SECTION ADD KARNA ========== */}
  <div className="fullscreen-kitchen-image">
    <div className="fullscreen-kitchen-content">
      <h1>Kitchen Mastery Guide</h1>
      <p>Essential skills every home cook needs to master</p>
      <p>Step-by-step tutorials and expert tips</p>
    </div>
  </div>
      {/* Kitchen Mastery Title */}
      <div className="guide-header">
        <h1>Kitchen Mastery Guide</h1>
        <p>Master 12 essential kitchen skills in one place</p>
      </div>

      {/* Skills Grid */}
      <div className="guide-sections-container">
        <div className="guide-sections-grid">
          {skillCards.map((card) => (
            <div 
              key={card.id} 
              className="guide-section-card"
              onClick={() => handleCardClick(card.route)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleCardClick(card.route)}
            >
              <div className="guide-card-accent"></div>
              
              {/* Card Number */}
              <div className="guide-card-number">
                {card.id}
              </div>
              
              <div className="guide-card-header">
                <div className="guide-card-icon-wrapper">
                  <i className={card.icon}></i>
                </div>
                <div className="guide-card-title">
                  <h3>{card.title}</h3>
                </div>
              </div>
              
              <div className="guide-card-content">
                <ul className="guide-card-features">
                  {card.features.map((feature, index) => (
                    <li key={index}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="guide-card-footer">
                <span className="guide-card-tag">{card.tag}</span>
                <div className="guide-card-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty placeholders for layout if needed (optional) */}
          <div className="guide-empty-card"></div>
          <div className="guide-empty-card"></div>
        </div>
      </div>
    </div>
  );
};

export default BeginnersPage;