import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './UrduPublicHome.css';

const UrduPublicHome = () => {
  const navigate = useNavigate();
  
  // Carousel Data - AI Assistant as FIRST item
  const furnitureItems = [
    {
      id: 1,
      title: "AI شیف بوٹ اسسٹنٹ",
      description: "اپنی پینٹری میں موجود اشیاء کی بنیاد پر فوری کھانے کے مشورے حاصل کریں۔ ہمارا AI شیف بوٹ آپ کے لیے ذاتی نوعیت کے کھانے تیار کرتا ہے!",
      image: "ai.jpg",
      bgImage: "ai.jpg"
    },
    {
      id: 2,
      title: "پینٹری اشیاء محفوظ کریں",
      description: "اپنی تمام پینٹری کی ضروری اشیاء کو ایک جگہ منظم اور ٹریک کریں تاکہ آپ کبھی بھی اجزاء ختم نہ ہونے پائیں۔",
      image: "pantry-staples.jpg",
      bgImage: "pantryitems.jpg"
    },
    {
      id: 3,
      title: "ریسیپی ڈائری",
      description: "اپنی ترکیبوں کے مجموعے سے ترکیبیں دریافت کریں اور اپنے کھانا پکانے کے سفر کو ٹریک کریں۔",
      image: "recipe.jpg",
      bgImage: "recipe.jpg"
    },
    {
      id: 4,
      title: "اپنی شاپنگ لسٹ بنائیں",
      description: "آسانی سے اپنی شاپنگ لسٹ بنائیں اور منظم کریں تاکہ آپ کبھی بھی خریدنے والی چیز نہ بھولیں۔",
      image: "shoppinglist.png",
      bgImage: "shoppinglist.png"
    },
    {
      id: 5,
      title: "ابتدائی افراد کے لیے رہنمائی",
      description: "ابتدائی افراد کے لیے خاص طور پر تیار کردہ مکمل رہنمائی اور تجاویز حاصل کریں تاکہ آسانی سے شروع کریں۔",
      image: "beginners.jpg",
      bgImage: "beginners.jpg"
    },
    {
      id: 6,
      title: "اپنے کھانے کی منصوبہ بندی کریں",
      description: "گروسری کی فہرست سے لے کر اپنے کھانا پکانے کے شیڈول کو منظم کرنے تک ہفتہ وار کھانے کی منصوبہ بندی کریں۔",
      image: "plannermeal.jpg",
      bgImage: "plannermeal.jpg"
    }
  ];

  // State
  const [currentCenterIndex, setCurrentCenterIndex] = useState(0);
  const heroBackgroundRef = useRef(null);

  // Initialize Carousel
  useEffect(() => {
    if (heroBackgroundRef.current) {
      heroBackgroundRef.current.style.backgroundImage = `url('${furnitureItems[currentCenterIndex].bgImage}')`;
    }
    
    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevItem();
      if (e.key === 'ArrowRight') nextItem();
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCenterIndex]);

  // Next item
  const nextItem = () => {
    setCurrentCenterIndex((prevIndex) => (prevIndex + 1) % furnitureItems.length);
  };

  // Previous item
  const prevItem = () => {
    setCurrentCenterIndex((prevIndex) => (prevIndex - 1 + furnitureItems.length) % furnitureItems.length);
  };

  // Handle card hover
  const handleCardHover = (bgImage) => {
    if (heroBackgroundRef.current) {
      heroBackgroundRef.current.style.backgroundImage = `url('${bgImage}')`;
    }
  };

  // Handle mouse leave - reset to current center card
  const handleCardLeave = () => {
    if (heroBackgroundRef.current) {
      heroBackgroundRef.current.style.backgroundImage = `url('${furnitureItems[currentCenterIndex].bgImage}')`;
    }
  };

  // Handle card click
  const handleCardClick = (index) => {
    setCurrentCenterIndex(index);
    // Click par confirm karne ke liye background set karein
    if (heroBackgroundRef.current) {
      heroBackgroundRef.current.style.backgroundImage = `url('${furnitureItems[index].bgImage}')`;
    }
  };

  // Calculate card position for 6 items
  const getCardStyle = (index) => {
    const position = index - currentCenterIndex;
    
    if (position === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: '10',
        opacity: '1'
      };
    } else if (position === -2 || (position === 4 && currentCenterIndex === 0)) {
      return {
        transform: 'translateX(-400px) scale(0.7)',
        zIndex: '1',
        opacity: '0.7'
      };
    } else if (position === -1 || (position === 5 && currentCenterIndex === 0)) {
      return {
        transform: 'translateX(-200px) scale(0.85)',
        zIndex: '2',
        opacity: '0.8'
      };
    } else if (position === 1 || (position === -5 && currentCenterIndex === 5)) {
      return {
        transform: 'translateX(200px) scale(0.85)',
        zIndex: '2',
        opacity: '0.8'
      };
    } else if (position === 2 || (position === -4 && currentCenterIndex === 5)) {
      return {
        transform: 'translateX(400px) scale(0.7)',
        zIndex: '1',
        opacity: '0.7'
      };
    } else {
      return {
        opacity: '0',
        transform: 'translateX(1000px)'
      };
    }
  };

  return (
    <>
      {/* HERO + CAROUSEL SECTION - ONLY MAIN CONTENT */}
      <section className="urdu-hero-carousel-section">
        {/* Background ONLY for hero section */}
        <div className="urdu-hero-background-container" ref={heroBackgroundRef}></div>
        <div className="urdu-hero-background-overlay"></div>

        {/* Left Content */}
        <div className="urdu-hero-left-section">
          <div className="urdu-hero-section-tag"></div>
          
          <h1 className="urdu-hero-main-heading">آج کھانے میں کیا پکائیں؟ </h1>
          <h2 className="urdu-hero-second-heading">آئیے شیف بوٹ سے پوچھتے ہیں</h2>
          
          <p className="urdu-hero-description">"شیف بوٹ: آپ کا سمارٹ کچن AI جو آپ کے پاس موجود چیزوں سے آئیڈیاز پکاتا ہے!"</p>
        </div>

        {/* Right Carousel */}
        <div className="urdu-hero-right-section">
          <div className="urdu-carousel-container" id="carouselContainer">
            <div className="urdu-carousel-track" id="carouselTrack">
              {/* Cards - AI Assistant as FIRST item */}
              {furnitureItems.map((item, index) => {
                const isCenterCard = index === currentCenterIndex;
                const cardStyle = getCardStyle(index);
                
                return (
                  <div
                    key={item.id}
                    className={`urdu-carousel-item ${isCenterCard ? 'urdu-center-card' : 'urdu-side-card'}`}
                    data-index={index}
                    style={cardStyle}
                    onMouseEnter={() => handleCardHover(item.bgImage)}
                    onMouseLeave={handleCardLeave}
                    onClick={() => handleCardClick(index)}
                  >
                    {/* Sabhi cards ke liye same content */}
                    <div className="urdu-item-image" style={{backgroundImage: `url('${item.image}')`}}></div>
                    <div className="urdu-item-content">
                      <h3 className="urdu-item-title">{item.title}</h3>
                      <p className="urdu-item-description">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="urdu-carousel-indicators" id="indicators">
              {/* Indicators - NOW 6 INDICATORS */}
              {furnitureItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`urdu-indicator ${index === currentCenterIndex ? 'urdu-active' : ''}`}
                  data-index={index}
                  onClick={() => setCurrentCenterIndex(index)}
                ></div>
              ))}
            </div>
            
            <div className="urdu-navigation-buttons">
              <button className="urdu-nav-btn" onClick={prevItem}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="urdu-nav-btn" onClick={nextItem}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EXISTING SECTIONS - ONLY MAIN CONTENT */}
      <section className="urdu-section-boxes">
        <div className="urdu-content-box urdu-box-1 urdu-content-left">
          <div className="urdu-colored-box">
            <h2>AI شیف بوٹ اسسٹنٹ</h2>
            <p className="urdu-box-description">اپنی پینٹری میں موجود اشیاء کی بنیاد پر فوری کھانے کے مشورے حاصل کریں۔ ہمارا AI شیف بوٹ آپ کے لیے ذاتی نوعیت کے کھانے تیار کرتا ہے!</p>
            <button className="urdu-btn" onClick={() => navigate('/login-page')}>
              شیف بوٹ سے پوچھیں 
            </button>
          </div>
        </div>

        <div className="urdu-content-box urdu-box-2 urdu-content-right">
          <div className="urdu-colored-box">
            <h2>ریسیپی ڈائری</h2>
            <p className="urdu-box-description">اپنی ترکیبوں کے مجموعے سے ترکیبیں دریافت کریں اور اپنے کھانا پکانے کے سفر کو ٹریک کریں۔</p>
            <button className="urdu-btn" onClick={() => navigate('/login-page')}>
              آزمائیں
            </button>
          </div>
        </div>

        <div className="urdu-content-box urdu-box-3 urdu-content-left">
          <div className="urdu-colored-box">
            <h2>ابتدائی افراد کے لیے مکمل رہنمائی</h2>
            <p className="urdu-box-description">ابتدائی افراد کے لیے خاص طور پر تیار کردہ مکمل رہنمائی اور تجاویز حاصل کریں تاکہ آسانی سے شروع کریں۔</p>
            <button className="urdu-btn" onClick={() => navigate('/login-page')}>
              گائیڈ دیکھیں
            </button>
          </div>
        </div>

        <div className="urdu-content-box urdu-box-4 urdu-content-right">
          <div className="urdu-colored-box">
            <h2>پینٹری اشیاء محفوظ کریں</h2>
            <p className="urdu-box-description">اپنی تمام پینٹری کی ضروری اشیاء کو ایک جگہ منظم اور ٹریک کریں تاکہ آپ کبھی بھی اجزاء ختم نہ ہونے پائیں۔</p>
            <button className="urdu-btn" onClick={() => navigate('/login-page')}>
              پینٹری بھریں
            </button>
          </div>
        </div>

        {/* RECIPE CARDS SECTION */}
        <section className="urdu-recipe-section-container">
          <h2 className="urdu-section-title">مشہور ریسیپیز</h2>
          <div className="urdu-recipe-section">
            <div className="urdu-recipe-card">
              <img src="speghetti_public.jpg" alt="اسپگیٹی کاربونارا" />
              <h3>اسپگیٹی</h3>
              <p>انڈے، پنیر اور پینسیٹا کے ساتھ کریمی اطالوی پاستا</p>
             <button className="urdu-btn" onClick={() => navigate('/login-page')}>ریسیپی دیکھیں</button>
            </div>
            <div className="urdu-recipe-card">
              <img src="tikka_public.jpg" alt="چکن تکہ مصالحہ" />
              <h3>چکن تکہ مصالحہ</h3>
              <p>غنی اور کریمی ٹماٹر ساس میں نرم چکن</p>
             <button className="urdu-btn" onClick={() => navigate('/login-page')}>ریسیپی دیکھیں</button>
            </div>
            <div className="urdu-recipe-card">
              <img src="pizza_public.jpg" alt="مارگریٹا پیزا" />
              <h3>مارگریٹا پیزا</h3>
              <p>تازہ ٹماٹر، موزاریلا اور تلسی کے ساتھ کلاسک پیزا</p>
              <button className="urdu-btn" onClick={() => navigate('/login-page')}>ریسیپی دیکھیں</button>
            </div>
            <div className="urdu-recipe-card">
              <img src="cake_public.jpg" alt="چاکلیٹ کیک" />
              <h3>چاکلیٹ کیک</h3>
              <p>نم کیک جس میں بھرپور فراسٹنگ جو منہ میں پگھل جائے۔</p>
              <button className="urdu-btn" onClick={() => navigate('/login-page')}>ریسیپی دیکھیں</button>
            </div>
          </div>
        </section>

        <div className="urdu-content-box urdu-box-5 urdu-content-left">
          <div className="urdu-colored-box">
            <h2>اپنی شاپنگ لسٹ بنائیں</h2>
            <p className="urdu-box-description">آسانی سے اپنی شاپنگ لسٹ بنائیں اور منظم کریں تاکہ آپ کبھی بھی خریدنے والی چیز نہ بھولیں۔</p>
            <button className="urdu-btn" onClick={() => navigate('/login-page')}>
              شاپنگ کریں
            </button>
          </div>
        </div>
        
        <div className="urdu-content-box urdu-box-6 urdu-content-right">
          <div className="urdu-colored-box">
            <h2>سمارٹ کھانے کی منصوبہ بندی</h2>
            <p className="urdu-box-description">گروسری کی فہرست سے لے کر اپنے کھانا پکانے کے شیڈول کو منظم کرنے تک ہفتہ وار کھانے کی منصوبہ بندی کریں۔</p>
            <button className="urdu-btn" onClick={() => navigate('/login-page')}>
              منصوبہ بندی شروع کریں
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UrduPublicHome;