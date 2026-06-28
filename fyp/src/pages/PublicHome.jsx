import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PublicHome.css';

const PublicHome = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const bgBox = useRef(null);
  
  const slides = [
    {
      id: 1,
      heading: "ChefBot Assistant",
      text: "Get instant meal suggestions based on what's in your pantry. ChefBot creates personalized meals just for you!",
      pic: "ai.jpg",
      back: "ai.jpg"
    },
    {
      id: 2,
      heading: "Save Pantry Items",
      text: "Keep, organize and track all your pantry essentials in one place so you never run out of ingredients again.",
      pic: "pantry-staples.jpg",
      back: "pantry-staples.jpg"
    },
    {
      id: 3,
      heading: "Recipe Diary",
      text: "Explore your recipes from recipes collection and track your cooking journey.",
      pic: "recipe.jpg",
      back: "recipe.jpg"
    },
    {
      id: 4,
      heading: "Add your Shopping List",
      text: "Create and manage your shopping list easily so you never forget what to buy.",
      pic: "shoppinglist.png",
      back: "shoppinglist.png"
    },
    {
      id: 5,
      heading: "Guidance For Beginners",
      text: "Get complete guidance and tips designed especially for beginners to start with ease.",
      pic: "beginners.jpg",
      back: "beginners.jpg"
    },
    {
      id: 6,
      heading: "Plan your Meals",
      text: "Plan your weekly meals form grocery lists to organize your cooking schedule.",
      pic: "plannermeal.jpg",
      back: "plannermeal.jpg"
    }
  ];

 

  useEffect(() => {
    if (bgBox.current) {
      bgBox.current.style.backgroundImage = `url('${slides[current].back}')`;
    }
    
    const pressKey = (e) => {
      if (e.key === 'ArrowLeft') {
        goBack();
      }
      if (e.key === 'ArrowRight') {
        goForward();
      }
    };
    
    document.addEventListener('keydown', pressKey);
    
    return () => {
      document.removeEventListener('keydown', pressKey);
    };
  }, [current]);

  const mouseOverCard = (picUrl) => {
    if (bgBox.current) {
      bgBox.current.style.backgroundImage = `url('${picUrl}')`;
    }
  };

  const mouseOutCard = () => {
    if (bgBox.current) {
      bgBox.current.style.backgroundImage = `url('${slides[current].back}')`;
    }
  };

  const clickCard = (index) => {
    setCurrent(index);
    
    if (bgBox.current) {
      bgBox.current.style.backgroundImage = `url('${slides[index].back}')`;
    }
  };

  const cardPosition = (index) => {
    const diff = index - current;
    
    if (diff === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: '10',
        opacity: '1'
      };
    } 
    else if (diff === -2 || (diff === 4 && current === 0)) {
      return {
        transform: 'translateX(-400px) scale(0.7)',
        zIndex: '1',
        opacity: '0.7'
      };
    } 
    else if (diff === -1 || (diff === 5 && current === 0)) {
      return {
        transform: 'translateX(-200px) scale(0.85)',
        zIndex: '2',
        opacity: '0.8'
      };
    } 
    else if (diff === 1 || (diff === -5 && current === 5)) {
      return {
        transform: 'translateX(200px) scale(0.85)',
        zIndex: '2',
        opacity: '0.8'
      };
    } 
    else if (diff === 2 || (diff === -4 && current === 5)) {
      return {
        transform: 'translateX(400px) scale(0.7)',
        zIndex: '1',
        opacity: '0.7'
      };
    } 
    else {
      return {
        opacity: '0',
        transform: 'translateX(1000px)'
      };
    }
  };

  const goForward = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const goBack = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <section className="hero-carousel-section">
        <div className="hero-background-container" ref={bgBox}></div>
        <div className="hero-background-overlay"></div>

        <div className="hero-left-section">
          <div className="hero-section-tag"></div>
          <h1 className="hero-main-heading">AJ KHANE MEIN KIYA PAKAEN?</h1>
          <h2 className="hero-second-heading">Let's ask CHEFBOT</h2>
          <p className="hero-description">"ChefBot: Your smart kitchen AI that cooks up ideas from what you have!"</p>
        </div>

        <div className="hero-right-section">
          <div className="carousel-container">
            <div className="carousel-track">
              {slides.map((item, index) => {
                const isCenter = index === current;
                const style = cardPosition(index);
                
                return (
                  <div
                    key={item.id}
                    className={`carousel-item ${isCenter ? 'center-card' : 'side-card'}`}
                    data-index={index}
                    style={style}
                    onMouseEnter={() => mouseOverCard(item.back)}
                    onMouseLeave={mouseOutCard}
                    onClick={() => clickCard(index)}
                  >
                    <div className="item-image" style={{backgroundImage: `url('${item.pic}')`}}></div>
                    <div className="item-content">
                      <h3 className="item-title">{item.heading}</h3>
                      <p className="item-description">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="carousel-indicators">
              {slides.map((item, index) => (
                <div
                  key={item.id}
                  className={`indicator ${index === current ? 'active' : ''}`}
                  data-index={index}
                  onClick={() => setCurrent(index)}
                ></div>
              ))}
            </div>
            
            <button className="carousel-btn prev-btn" onClick={goBack}>
              ‹
            </button>
            <button className="carousel-btn next-btn" onClick={goForward}>
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="section-boxes">
        <div className="content-box box-1 content-left">
          <div className="colored-box">
            <h2>AI ChefBot Assistant</h2>
            <p className="box-description">Get instant meal suggestions based on what's in your pantry. Our AI ChefBot creates personalized meals just for you!</p>
            <button className="btn" onClick={() => navigate('/login-page')}>
              Ask ChefBot Now
            </button>
          </div>
        </div>

        <div className="content-box box-2 content-right">
          <div className="colored-box">
            <h2>Recipe Diary</h2>
            <p className="box-description">Explore your recipes from recipes collection and track your cooking journey.</p>
            <button className="btn" onClick={() => navigate('/login-page')}>
              Try Now
            </button>
          </div>
        </div>

        <div className="content-box box-3 content-left">
          <div className="colored-box">
            <h2>Complete Guidance for Beginners</h2>
            <p className="box-description">Get complete guidance and tips designed especially for beginners to start with ease.</p>
            <button className="btn" onClick={() => navigate('/login-page')}>
              Explore Guide
            </button>
          </div>
        </div>

        <div className="content-box box-4 content-right">
          <div className="colored-box">
            <h2>Store Pantry Items</h2>
            <p className="box-description">Keep, organize and track all your pantry essentials in one place so you never run out of ingredients again.</p>
            <button className="btn" onClick={() => navigate('/login-page')}>
              Fill Your Pantry
            </button>
          </div>
        </div>

        <section className="recipe-section-container">
          <h2 className="section-title">Popular Recipes</h2>
          <div className="recipe-section">
            <div className="recipe-card">
              <img src="speghetti_public.jpg" alt="Spaghetti Carbonara" />
              <h3>Spaghetti</h3>
              <p>Creamy Italian pasta with eggs, cheese, and pancetta</p>
              <button className="btn" onClick={() => navigate('/login-page')}>
                View Recipe
              </button>
            </div>
            <div className="recipe-card">
              <img src="tikka_public.jpg" alt="Chicken Tikka Masala" />
              <h3>Chicken Tikka Masala</h3>
              <p>Tender chicken in rich and creamy tomato sauce</p>
              <button className="btn" onClick={() => navigate('/login-page')}>
                View Recipe
              </button>
            </div>
            <div className="recipe-card">
              <img src="pizza_public.jpg" alt="Margherita Pizza" />
              <h3>Margherita Pizza</h3>
              <p>Classic pizza with fresh tomatoes, mozzarella and basil</p>
              <button className="btn" onClick={() => navigate('/login-page')}>
                View Recipe
              </button>
            </div>
            <div className="recipe-card">
              <img src="cake_public.jpg" alt="Beef Tacos" />
              <h3>Chocolate Cake</h3>
              <p>Moist cake with rich frosting that melts in your mouth.</p>
              <button className="btn" onClick={() => navigate('/login-page')}>
                View Recipe
              </button>
            </div>
          </div>
        </section>

        <div className="content-box box-5 content-left">
          <div className="colored-box">
            <h2>Create Your Shopping List</h2>
            <p className="box-description">Create and manage your shopping list easily so you never forget what to buy.</p>
            <button className="btn" onClick={() => navigate('/login-page')}>
              Get Shopping
            </button>
          </div>
        </div>
        
        <div className="content-box box-6 content-right">
          <div className="colored-box">
            <h2>Smart Meal Planning</h2>
            <p className="box-description">Plan your weekly meals form grocery lists to organize your cooking schedule.</p>
            <button className="btn" onClick={() => navigate('/login-page')}>
              Start Planning
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicHome;