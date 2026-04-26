import React, { useState, useEffect } from 'react';
import './BeginnersPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BeginnersPage = () => {
  const navigate = useNavigate();
  const [skillCards, setSkillCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Route mapping for categories
  const routeMapping = {
    'Kitchen Tools': '/kitchen-tools',
    'Cutting Techniques': '/cutting-techniques',
    'Cooking Methods': '/cooking-methods',
    'Meat Cuts': '/meat-cuts',
    'Kitchen Appliances': '/kitchen-appliances',
    'Pantry Basics': '/pantry-basics',
    'Measuring Skills': '/measuring-skills',
    'Bakery Essentials': '/bakery-essentials'
  };

  // Image mapping
  const imageMapping = {
    'Kitchen Tools': 'KitchenTools.png',
    'Cutting Techniques': 'CuttingTechniques.png',
    'Cooking Methods': 'CookingMethods.png',
    'Meat Cuts': 'MeatCuts.png',
    'Kitchen Appliances': 'KitchenAppliances.png',
    'Pantry Basics': 'PantryBasics.png',
    'Measuring Skills': 'MeasuringSkills.png',
    'Bakery Essentials': 'BakingEssentials.png'
  };

  useEffect(() => {
    fetchSkillCards();
  }, []);

  const fetchSkillCards = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch guides with category 'basics' from database
      const response = await axios.get('http://localhost:5000/api/beginners-guide?category=basics');
      const guides = response.data.guides || [];
      
      // Transform database guides into skill cards format
      const cards = guides.map((guide, index) => {
        // Parse content if it's JSON string
        let content = guide.content;
        try {
          if (typeof content === 'string' && content.startsWith('{')) {
            const parsed = JSON.parse(content);
            content = parsed.features ? parsed.features.join(' ') : parsed.fullDesc || guide.content;
          }
        } catch (e) {
          // Keep as is
        }

        return {
          id: String(index + 1).padStart(2, '0'),
          image: imageMapping[guide.title] || `${guide.title.replace(/\s/g, '')}.png`,
          title: guide.title,
          route: routeMapping[guide.title] || `/${guide.title.toLowerCase().replace(/\s/g, '-')}`,
          features: [typeof content === 'string' ? content.substring(0, 100) : 'Learn essential skills']
        };
      });

      // If API fails or no data, use default cards
      if (cards.length === 0) {
        setSkillCards(getDefaultCards());
      } else {
        setSkillCards(cards);
      }
    } catch (error) {
      console.error('Error fetching skill cards:', error);
      // Fallback to default cards
      setSkillCards(getDefaultCards());
      setError('Using offline data. Connect to internet for latest content.');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultCards = () => {
    return [
      {
        id: '01',
        image: 'KitchenTools.png',
        title: 'Kitchen Tools',
        route: '/kitchen-tools',
        features: ['Tools that make cooking easier and more precise.']
      },
      {
        id: '02',
        image: 'CuttingTechniques.png',
        title: 'Cutting Techniques',
        route: '/cutting-techniques',
        features: ['Master various cutting techniques for safety and efficiency.']
      },
      {
        id: '03',
        image: 'CookingMethods.png',
        title: 'Cooking Methods',
        route: '/cooking-methods',
        features: ['Heat-based techniques used to prepare and cook food.']
      },
      {
        id: '04',
        image: 'MeatCuts.png',
        title: 'Meat Cuts',
        route: '/meat-cuts',
        features: ['Different portions of meat from various animal parts.']
      },
      {
        id: '05',
        image: 'KitchenAppliances.png',
        title: 'Kitchen Appliances',
        route: '/kitchen-appliances',
        features: ['Electrical devices that assist with cooking and food preparation.']
      },
      {
        id: '06',
        image: 'PantryBasics.png',
        title: 'Pantry Basics',
        route: '/pantry-basics',
        features: ['Staple ingredients that form the foundation of everyday cooking.']
      },
      {
        id: '07',
        image: 'MeasuringSkills.png',
        title: 'Measuring Skills',
        route: '/measuring-skills',
        features: ['Techniques for accurately measuring ingredients.']
      },
      {
        id: '08',
        image: 'BakingEssentials.png',
        title: 'Bakery Essentials',
        route: '/bakery-essentials',
        features: ['Must-have tools and ingredients for successful baking.']
      }
    ];
  };

  const handleCardClick = (route) => {
    navigate(route);
  };

  if (loading) {
    return (
      <div className="beginners-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading kitchen essentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="beginners-page">
      {/* Fullscreen Kitchen Image */}
      <div className="fullscreen-kitchen-image">
        <div className="fullscreen-kitchen-content">
          <h1>Kitchen Guidance</h1>
          <p>Essential skills every home cook needs to master</p>
          <p>Step-by-step tutorials and expert tips</p>
        </div>
      </div>
      
      {/* Kitchen Mastery Title */}
      <div className="guide-header">
        <h1>Kitchen Mastery Guide</h1>
        <p>Master essential kitchen skills in one place</p>
        {error && <p className="error-note">{error}</p>}
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
              <div className="guide-card-number" style={{display: 'none'}}>
                {card.id}
              </div>
              <div className="guide-card-accent" style={{display: 'none'}}></div>
              
              {/* TOP: Title */}
              <div className="guide-card-header">
                <div className="guide-card-title">
                  <h3>{card.title}</h3>
                </div>
              </div>
              
              {/* CENTER: REAL IMAGE */}
              <div className="guide-card-image-container">
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="guide-card-real-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=' + card.title;
                  }}
                />
              </div>
              
              {/* BOTTOM: Description */}
              <div className="guide-card-content">
                <ul className="guide-card-features">
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
      <div className="back-home-container">
        <button 
          className="back-home-btn"
          onClick={() => navigate('/home')}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default BeginnersPage;