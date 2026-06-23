import React from 'react';
import './BeginnersPage.css';
import { useNavigate } from 'react-router-dom';

const BeginnersPage = () => {
  const navigate = useNavigate();

  const skills = [
    {
      id: '01',
      img: 'KitchenTools.png',
      name: 'Kitchen Tools',
      link: '/kitchen-tools',
      desc: 'Tools that make cooking easier and more precise.'
    },
    {
      id: '02',
      img: 'CuttingTechniques.png',
      name: 'Cutting Techniques',
      link: '/cutting-techniques',
      desc: 'Tools that make cooking easier and more precise.'
    },
    {
      id: '03',
      img: 'CookingMethods.png',
      name: 'Cooking Methods',
      link: '/cooking-methods',
      desc: 'Heat-based techniques used to prepare and cook food.'
    },
    {
      id: '04',
      img: 'MeatCuts.png',
      name: 'Meat Cuts',
      link: '/meat-cuts',
      desc: 'Different portions of meat from various animal parts.'
    },
    {
      id: '05',
      img: 'KitchenAppliances.png',
      name: 'Kitchen Appliances',
      link: '/kitchen-appliances',
      desc: 'Electrical devices that assist with cooking and food preparation.'
    },
    {
      id: '06',
      img: 'PantryBasics.png',
      name: 'Pantry Basics',
      link: '/pantry-basics',
      desc: 'Staple ingredients that form the foundation of everyday cooking.'
    },
    {
      id: '07',
      img: 'MeasuringSkills.png',
      name: 'Measuring Skills',
      link: '/measuring-skills',
      desc: 'Techniques for accurately measuring ingredients.'
    },
    {
      id: '08',
      img: 'BakingEssentials.png',
      name: 'Bakery Essentials',
      link: '/bakery-essentials',
      desc: 'Must-have tools and ingredients for successful baking.'
    }
  ];

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <div className="beginners-page">
      <div className="fullscreen-kitchen-image">
        <div className="fullscreen-kitchen-content">
          <h1>Kitchen Mastery Guide</h1>
          <p>Essential skills every home cook needs to master</p>
          <p>Step-by-step tutorials and expert tips</p>
        </div>
      </div>
      
      <div className="guide-header">
        <h1>Kitchen Mastery Guide</h1>
        <p>Master essential kitchen skills in one place</p>
      </div>

      <div className="guide-sections-container">
        <div className="guide-sections-grid">
          {skills.map((item) => (
            <div 
              key={item.id} 
              className="guide-section-card"
              onClick={() => goTo(item.link)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && goTo(item.link)}
            >
              <div className="guide-card-header">
                <div className="guide-card-title">
                  <h3>{item.name}</h3>
                </div>
              </div>
              
              <div className="guide-card-image-container">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="guide-card-real-image"
                  loading="lazy"
                />
              </div>
              
              <div className="guide-card-content">
                <ul className="guide-card-features">
                  <li>{item.desc}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="back-home-container">
        <button className="back-home-btn" onClick={() => navigate('/home')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default BeginnersPage;