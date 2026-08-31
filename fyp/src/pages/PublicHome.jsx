import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LanguagePopup from '../components/LanguagePopup';
import './PublicHome.css';

const PublicHome = () => {
  const navigate = useNavigate();
  
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const furnitureItems = [
    { id: 1, title: "ChefBot Assistant", description: "Get instant meal suggestions based on what's in your pantry. Our ChefBot creates personalized meals just for you!", image: "ai.jpg", bgImage: "ai.jpg" },
    { id: 2, title: "Save Pantry Items", description: "Keep, organize and track all your pantry essentials in one place so you never run out of ingredients again.", image: "pantry-staples.jpg", bgImage: "pantry-staples.jpg" },
    { id: 3, title: "Recipe Diary", description: "Explore your recipes from recipes collection and track your cooking journey.", image: "recipe.jpg", bgImage: "recipe.jpg" },
    { id: 4, title: "Add your Shopping List", description: "Create and manage your shopping list easily so you never forget what to buy.", image: "shoppinglist.png", bgImage: "shoppinglist.png" },
    { id: 5, title: "Guidance For Beginners", description: "Get complete guidance and tips designed especially for beginners to start with ease.", image: "beginners.jpg", bgImage: "beginners.jpg" },
    { id: 6, title: "Plan your Meals", description: "Plan your weekly meals form grocery lists to organize your cooking schedule.", image: "plannermeal.jpg", bgImage: "plannermeal.jpg" }
  ];

  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);
  const heroBackgroundRef = useRef(null);
  const timeoutRef = useRef(null);
  const redirectTimeoutRef = useRef(null);
  const toastShownRef = useRef(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipes?limit=200');
        const data = await response.json();
        if (data.recipes && Array.isArray(data.recipes)) {
          const shuffled = [...data.recipes].sort(() => 0.5 - Math.random());
          setRecipes(shuffled.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedLanguage = localStorage.getItem('userLanguage');
    const isLoggedIn = !!token;
    
    if (isLoggedIn && savedLanguage && !toastShownRef.current) {
      toastShownRef.current = true;
      toast.info("You are already logged in! Redirecting to dashboard...");
      
      redirectTimeoutRef.current = setTimeout(() => {
        window.location.href = savedLanguage === 'urdu' ? '/urdu-home' : '/home';
      }, 2000);
      return;
    }
    
    if (isLoggedIn && !savedLanguage && !toastShownRef.current) {
      toastShownRef.current = true;
      localStorage.setItem('userLanguage', 'en');
      localStorage.setItem('languageSelectedByLoggedInUser', 'true');
      toast.info("Setting default language... Redirecting to dashboard");
      
      redirectTimeoutRef.current = setTimeout(() => {
        window.location.href = '/home';
      }, 1500);
      return;
    }
    
    const sessionLanguageSelected = sessionStorage.getItem('sessionLanguageSelected');
    
    if (sessionLanguageSelected === 'true') {
      console.log('Session me language already selected - popup nahi aayega');
      return;
    }
    
    if (!isLoggedIn && sessionLanguageSelected !== 'true') {
      console.log('New session - showing language popup in 5 seconds');
      timeoutRef.current = setTimeout(() => {
        setShowLanguagePopup(true);
      }, 5000);
    }
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
    
  }, []);

useLayoutEffect(() => {
  if (heroBackgroundRef.current) {
    heroBackgroundRef.current.style.backgroundImage = `url('${furnitureItems[currentCenterIndex].bgImage}')`;
  }
}, [currentCenterIndex]);

  useEffect(() => {
    if (!isMobile) {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') prevItem();
        if (e.key === 'ArrowRight') nextItem();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentCenterIndex, isMobile]);

  const prevItem = () => {
    setCurrentCenterIndex((prev) => 
      prev === 0 ? furnitureItems.length - 1 : prev - 1
    );
  };

  const nextItem = () => {
    setCurrentCenterIndex((prev) => 
      prev === furnitureItems.length - 1 ? 0 : prev + 1
    );
  };

  const handleCardHover = (bgImage) => {
    if (!isMobile && heroBackgroundRef.current) {
      heroBackgroundRef.current.style.backgroundImage = `url('${bgImage}')`;
    }
  };

  const handleCardLeave = () => {
    if (!isMobile && heroBackgroundRef.current) {
      heroBackgroundRef.current.style.backgroundImage = `url('${furnitureItems[currentCenterIndex].bgImage}')`;
    }
  };

  const handleCardClick = (index) => {
    setCurrentCenterIndex(index);
    if (!isMobile && heroBackgroundRef.current) {
      heroBackgroundRef.current.style.backgroundImage = `url('${furnitureItems[index].bgImage}')`;
    }
  };

  const getDesktopCardStyle = (index) => {
    const position = index - currentCenterIndex;
    
    if (position === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: 10,
        opacity: 1
      };
    } else if (position === -2 || (position === 4 && currentCenterIndex === 0)) {
      return {
        transform: 'translateX(-400px) scale(0.7)',
        zIndex: 1,
        opacity: 0.7
      };
    } else if (position === -1 || (position === 5 && currentCenterIndex === 0)) {
      return {
        transform: 'translateX(-200px) scale(0.85)',
        zIndex: 2,
        opacity: 0.8
      };
    } else if (position === 1 || (position === -5 && currentCenterIndex === 5)) {
      return {
        transform: 'translateX(200px) scale(0.85)',
        zIndex: 2,
        opacity: 0.8
      };
    } else if (position === 2 || (position === -4 && currentCenterIndex === 5)) {
      return {
        transform: 'translateX(400px) scale(0.7)',
        zIndex: 1,
        opacity: 0.7
      };
    } else {
      return {
        opacity: 0,
        transform: 'translateX(1000px)',
        pointerEvents: 'none'
      };
    }
  };

  const getMobileCardStyle = (index) => {
    const position = index - currentCenterIndex;
    const totalItems = furnitureItems.length;
    
    let adjustedPosition = position;
    if (position > totalItems / 2) adjustedPosition = position - totalItems;
    if (position < -totalItems / 2) adjustedPosition = position + totalItems;
    
    if (adjustedPosition === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: 10,
        opacity: 1
      };
    } else if (adjustedPosition === -2) {
      return {
        transform: 'translateX(-220px) scale(0.6)',
        zIndex: 1,
        opacity: 0.5
      };
    } else if (adjustedPosition === -1) {
      return {
        transform: 'translateX(-110px) scale(0.8)',
        zIndex: 2,
        opacity: 0.7
      };
    } else if (adjustedPosition === 1) {
      return {
        transform: 'translateX(110px) scale(0.8)',
        zIndex: 2,
        opacity: 0.7
      };
    } else if (adjustedPosition === 2) {
      return {
        transform: 'translateX(220px) scale(0.6)',
        zIndex: 1,
        opacity: 0.5
      };
    } else {
      return {
        opacity: 0,
        transform: 'translateX(300px)',
        pointerEvents: 'none'
      };
    }
  };

  const getCardStyle = (index) => {
    return isMobile ? getMobileCardStyle(index) : getDesktopCardStyle(index);
  };

  const mobilePrevItem = () => {
    setCurrentCenterIndex((prev) => 
      prev === 0 ? furnitureItems.length - 1 : prev - 1
    );
  };

  const mobileNextItem = () => {
    setCurrentCenterIndex((prev) => 
      prev === furnitureItems.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div>
        <p>Loading delicious recipes...</p>
      </div>
    );
  }

  return (
    <>
      <section className="pk-hero-carousel-section">
<div
  className="pk-hero-background-container"
  ref={heroBackgroundRef}
  style={{ backgroundImage: `url('${furnitureItems[currentCenterIndex].bgImage}')` }}
></div>        <div className="pk-hero-background-overlay"></div>

        <div className="pk-hero-left-section">
          <div className="pk-hero-section-tag"></div>
          <h1 className="pk-hero-main-heading">What should we cook today?</h1>
          <h2 className="pk-hero-second-heading">Let's ask CHEFBOT</h2>
          <p className="pk-hero-description">"Your smart kitchen that cooks up ideas from what you have!"</p>
        </div>

        <div className="pk-hero-right-section">
          <div className="pk-carousel-container">
            <div className="pk-carousel-track">
              {furnitureItems.map((item, index) => {
                const cardStyle = getCardStyle(index);
                return (
                  <div
                    key={item.id}
                    className={`pk-carousel-item ${index === currentCenterIndex ? 'pk-center-card' : 'pk-side-card'}`}
                    style={cardStyle}
                    onMouseEnter={() => handleCardHover(item.bgImage)}
                    onMouseLeave={handleCardLeave}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="pk-item-image" style={{backgroundImage: `url('${item.image}')`}}></div>
                    <div className="pk-item-content">
                      <h3 className="pk-item-title">{item.title}</h3>
                      <p className="pk-item-description">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {!isMobile && (
              <div className="pk-carousel-indicators">
                {furnitureItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`pk-indicator ${index === currentCenterIndex ? 'pk-active' : ''}`}
                    onClick={() => setCurrentCenterIndex(index)}
                  ></div>
                ))}
              </div>
            )}
            
            {isMobile && (
              <div className="pk-mobile-indicators">
                {furnitureItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`pk-mobile-indicator ${index === currentCenterIndex ? 'pk-mobile-active' : ''}`}
                    onClick={() => setCurrentCenterIndex(index)}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pk-section-boxes">
        <div className="pk-content-box pk-box-1 pk-content-left"
                    style={{ backgroundImage: "url('/ai.jpg')" }}
>
          <div className="pk-colored-box">
            <h2>ChefBot Assistant</h2>
            <p className="pk-box-description">ChefBot creates meal suggestions based on what's in your pantry!</p>
            <button className="pk-btn" onClick={() => navigate('/login-page')}>Ask ChefBot</button>
          </div>
        </div>

        <div className="pk-content-box pk-box-2 pk-content-right"
                    style={{ backgroundImage: "url('/recipe.jpg')" }}
>
 <div className="pk-colored-box">
            <h2>Recipe Diary</h2>
            <p className="pk-box-description">Explore recipes from recipes collection.</p>
            <button className="pk-btn" onClick={() => navigate('/login-page')}>Explore Recipes</button>
          </div>
        </div>

        <div className="pk-content-box pk-box-3 pk-content-left"
        style={{ backgroundImage: "url('/beginners.jpg')" }}
>

          <div className="pk-colored-box">
            <h2>Complete Guidance for Beginners</h2>
            <p className="pk-box-description">Get complete guidance and tips for beginners.</p>
            <button className="pk-btn" onClick={() => navigate('/login-page')}>Explore Guide</button>
          </div>
        </div>

        <div className="pk-content-box pk-box-4 pk-content-right"
                  style={{ backgroundImage: "url('/pantry-staples.jpg')" }}
>

          <div className="pk-colored-box">
            <h2>Store Pantry Items</h2>
            <p className="pk-box-description">Keep, organize and track all your pantry essentials in one place.</p>
            <button className="pk-btn" onClick={() => navigate('/login-page')}>Fill Your Pantry</button>
          </div>
        </div>

        <div className="pk-recipe-wrapper">
          <h2 className="pk-recipe-main-title">Popular Recipes</h2>
          <div className="pk-recipe-scroll-container">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="pk-recipe-card-item">
                <img 
                  src={recipe.image || 'https://via.placeholder.com/280x160?text=No+Image'} 
                  alt={recipe.title} 
                  className="pk-recipe-card-img" 
                />
                <h3 className="pk-recipe-card-heading">{recipe.title}</h3>
                <p className="pk-recipe-card-text">
                  {recipe.category || 'Delicious'} • {recipe.cookingTime || '30'} mins
                </p>
                <button 
                  className="pk-recipe-card-button" 
                  onClick={() => navigate(`/recipe-detail/${recipe._id}`)}
                >
                  View Recipe
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="pk-content-box pk-box-5 pk-content-left"
                  style={{ backgroundImage: "url('/shoppinglist.png')" }}
>

          <div className="pk-colored-box">
            <h2>Create Your Shopping List</h2>
            <p className="pk-box-description">Create and manage your shopping list easily.</p>
            <button className="pk-btn" onClick={() => navigate('/login-page')}>Get Shopping</button>
          </div>
        </div>
        
        <div className="pk-content-box pk-box-6 pk-content-right"
                  style={{ backgroundImage: "url('/plannermeal.jpg')" }}
>
          <div className="pk-colored-box">
            <h2>Smart Meal Planning</h2>
            <p className="pk-box-description">Plan your weekly meals form grocery lists.</p>
            <button className="pk-btn" onClick={() => navigate('/login-page')}>Start Planning</button>
          </div>
        </div>
      </section>

      {showLanguagePopup && <LanguagePopup />}
    </>
  );
};

export default PublicHome;