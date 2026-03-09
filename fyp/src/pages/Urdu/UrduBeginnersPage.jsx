import React from 'react';
import './UrduBeginnersPage.css';
import { useNavigate } from 'react-router-dom';

const UrduBeginnersPage = () => {
  const navigate = useNavigate();

  const skillCards = [
    {
      id: '01',
      image: 'KitchenTools.png',
      title: 'باورچی خانے کے اوزار',
      titleEn: 'Kitchen Tools',
      route: '/urdu-kitchen-tools',
      features: [
        'کھانا پکانے کو آسان اور درست بنانے والے اوزار'
      ]
    },
    {
      id: '02',
      image: 'CuttingTechniques.png',
      title: 'کاٹنے کی تکنیکیں',
      titleEn: 'Cutting Techniques',
      route: '/urdu-cutting-techniques',
      features: [
        'کھانا پکانے کو آسان اور درست بنانے والے اوزار'
      ]
    },
    {
      id: '03',
      image: 'CookingMethods.png',
      title: 'پکانے کے طریقے',
      titleEn: 'Cooking Methods',
      route: '/urdu-cooking-methods',
      features: [
        'کھانا تیار کرنے اور پکانے کی گرمی پر مبنی تکنیکیں'
      ]
    },
    {
      id: '04',
      image: 'MeatCuts.png',
      title: 'گوشت کے ٹکڑے',
      titleEn: 'Meat Cuts',
      route: '/urdu-meat-cuts',
      features: [
        'جانوروں کے مختلف حصوں سے گوشت کے مختلف ٹکڑے'
      ]
    },
    {
      id: '05',
      image: 'KitchenAppliances.png',
      title: 'باورچی خانے کے آلات',
      titleEn: 'Kitchen Appliances',
      route: '/urdu-kitchen-appliances',
      features: [
        'برقی آلات جو کھانا پکانے اور تیار کرنے میں مدد دیتے ہیں'
      ]
    },
    {
      id: '06',
      image: 'PantryBasics.png',
      title: 'پینٹری کی بنیادی چیزیں',
      titleEn: 'Pantry Basics',
      route: '/urdu-pantry-basics',
      features: [
        'بنیادی اجزاء جو روزمرہ کھانا پکانے کی بنیاد ہیں'
      ]
    },
    {
      id: '07',
      image: 'MeasuringSkills.png',
      title: 'ناپنے کی مہارتیں',
      titleEn: 'Measuring Skills',
      route: '/urdu-measuring-skills',
      features: [
        'اجزاء کو درست طریقے سے ناپنے کی تکنیکیں'
      ]
    },
    {
      id: '08',
      image: 'BakingEssentials.png',
      title: 'بیکری کی ضروری چیزیں',
      titleEn: 'Bakery Essentials',
      route: '/urdu-bakery-essentials',
      features: [
        'کامیاب بیکنگ کے لیے ضروری اوزار اور اجزاء'
      ]
    }
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="urdu-beginners-page">
      {/* Fullscreen Kitchen Image */}
      <div className="urdu-fullscreen-kitchen-image">
        <div className="urdu-fullscreen-kitchen-content">
          <h1>باورچی خانے کی مہارت گائیڈ</h1>
          <p>ہر گھریلو باورچی کے لیے ضروری مہارتیں</p>
          <p>مرحلہ وار سبق اور ماہرین کی تجاویز</p>
        </div>
      </div>
      
      {/* Kitchen Mastery Title */}
      <div className="urdu-guide-header">
        <h1>باورچی خانے کی مہارت گائیڈ</h1>
        <p>ایک جگہ پر ضروری باورچی خانے کی مہارتیں سیکھیں</p>
      </div>

      {/* Skills Grid */}
      <div className="urdu-guide-sections-container">
        <div className="urdu-guide-sections-grid">
          {skillCards.map((card) => (
            <div 
              key={card.id} 
              className="urdu-guide-section-card"
              onClick={() => handleCardClick(card.route)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && handleCardClick(card.route)}
            >
              {/* HIDE Card Number */}
              <div className="urdu-guide-card-number" style={{display: 'none'}}>
                {card.id}
              </div>
              
              {/* HIDE Card Accent */}
              <div className="urdu-guide-card-accent" style={{display: 'none'}}></div>
              
              {/* TOP: Title */}
              <div className="urdu-guide-card-header">
                <div className="urdu-guide-card-title">
                  <h3>{card.title}</h3>
                  <span className="urdu-guide-card-title-en">{card.titleEn}</span>
                </div>
              </div>
              
              {/* CENTER: REAL IMAGE */}
              <div className="urdu-guide-card-image-container">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="urdu-guide-card-real-image"
                  loading="lazy"
                />
              </div>
              
              {/* BOTTOM: Description */}
              <div className="urdu-guide-card-content">
                <ul className="urdu-guide-card-features">
                  {card.features.map((feature, index) => (
                    <li key={index}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Back to Home Button */}
      <div className="urdu-back-home-container">
        <button 
          className="urdu-back-home-btn"
          onClick={() => navigate('/home')}
        >
          ← ہوم پیج پر واپس جائیں
        </button>
      </div>
    </div>
  );
};

export default UrduBeginnersPage;