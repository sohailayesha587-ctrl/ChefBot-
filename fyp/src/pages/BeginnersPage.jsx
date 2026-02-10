import React from 'react';
import './BeginnersPage.css';
import { useNavigate } from 'react-router-dom';

const BeginnersPage = () => {
  const navigate = useNavigate();

  const skillCards = [
    {
      
      icon: 'fas fa-tools',
      title: 'Kitchen Tools',
      route: '/kitchen-tools',
      features: [
        'Essential knives set',
        'Cutting boards types',
        'Pots & pans selection',
      ],
      tag: 'ESSENTIAL'
    },
    {
     
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
      
      icon: 'fas fa-mortar-pestle',
      title: 'Pantry Basics',
      route: '/pantry-basics',
      features: [
        'Essential spices list',
        'Flavor balancing',
        'Herb pairing guide',
        'Taste profiles'
      ],
      tag: 'FLAVOR'
    },
    {
     
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
        <p>Master essential kitchen skills in one place</p>
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