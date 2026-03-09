import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UrduHomePage.css';

const UrduHomePage = () => {
  const [email, setEmail] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);
  const [showMealSuggestor, setShowMealSuggestor] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
    if (!showChatbot) {
      setUnreadMessages(0);
    }
  };

  // یہ فنکشن شامل کریں
  const toggleMealSuggestor = () => {
    setShowMealSuggestor(!showMealSuggestor);
  };

  // فیچرز ارے - صرف 5 آئٹمز
  const features = [
    {
      image: 'pantry-staples.jpg',
      title: 'سمارٹ پینٹری',
      path: '/urdu-smart-pantry'
    },
    {
      image: 'recipe.jpg',
      title: 'ریسیپی ڈیٹا بیس',
      path: '/urdu-recipes'
    },
    {
      image: 'plannermeal.jpg',
      title: 'کھانے کا منصوبہ',
      path: '/urdu-meal-planner'
    },
    {
      image: 'shoppinglist.png',
      title: 'سمارٹ شاپنگ',
      path: '/urdu-smart-shopping'
    },
    {
      image: 'beginners.jpg',
      title: 'ابتدائی رہنمائی',
      path: '/urdu-guidance'
    }
  ];

  const recipes = [
    {
      image: "home_biryani.jpg",
      name: "چکن بریانی",
      description: "مسالہ دار چکن خوشبودار چاول کے ساتھ۔",
      category: "مرکزی",
    },
    {
      image: "home_veg_salad.jpg",
      name: "ویجی سلاد",
      description: "تازہ سبزیاں ہلکے ڈریسنگ کے ساتھ۔",
      category: "سلاد",
    },
    {
      image: "home_icecream.jpg",
      name: "چاکلیٹ آئس کریم",
      description: "غنی، نم مٹھاس بھرے آئس کریم کے ساتھ۔",
      category: "میٹھا",
    }
  ];

  const guidanceImages = [
    "home_m.jpg",
    "home_m2.jpg",
    "home_m3.jpg"
  ];

  const foodImages = [
    "home1.jpg",
    "home2.jpg",
    "home3.jpg",
  ];

  return (
    <div className="urdu-home-container">
      {/* ہیرو سیکشن */}
      <section className="urdu-chefbot-hero">
        <div className="urdu-chefbot-slider">
          <img src="/1.png" alt="شیف بوٹ تصویر 1" className="urdu-chefbot-slide-image" />
          <img src="/2.png" alt="شیف بوٹ تصویر 2" className="urdu-chefbot-slide-image" />
        </div>
      </section>

      {/* فیچرز سیکشن */}
      <section className="urdu-h-features-section">
        <h2 className="urdu-h-features-title">ہماری شاندار خصوصیات</h2>
        
        {/* نقطوں والی لائنوں کے ساتھ دائرہ */}
        <div className="urdu-circle-with-lines">
          <div className="urdu-dotted-line urdu-left-line"></div>
          
          {/* دائرہ فیچر */}
          <div className="urdu-feature-circle urdu-clickable-circle" onClick={toggleMealSuggestor}>
            <div className="urdu-circle-icon">🍽️</div>
            
            <div className="urdu-circle-click-hint">
             
            </div>
          </div>
          
          <div className="urdu-dotted-line urdu-right-line"></div>
        </div>
        
        <div className="urdu-h-features-grid">
          {features.map((feature, index) => (
            <Link 
              to={feature.path} 
              key={index} 
              className="urdu-h-feature-box"
              style={{textDecoration: 'none'}}
            >
              <div className="urdu-h-feature-image">
                <img src={feature.image} alt={feature.title} />
              </div>
              <div className="urdu-h-feature-content">
                <h3 className="urdu-h-feature-title">{feature.title}</h3>
                <span className="urdu-h-feature-link">
                  دریافت کریں <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ہیرو 2 */}
      <section className="urdu-hero-section1">
        <div className="urdu-hero-left">
          <h2>ڈیجیٹل کھانا پکانا</h2>
          <p>شیف بوٹ کی ریسیپی تجاویز کے ساتھ پینٹری کی اشیاء کو مزیدار کھانوں میں تبدیل کریں۔</p>
          <Link to="/urdu-contact" className="urdu-contact-link">سیکھنا شروع کریں →</Link>
        </div>
        <div className="urdu-hero-center">
          <h1>گروسری کی ضرورت نہیں! شیف بوٹ کے ساتھ پینٹری کی اشیاء سے پکائیں۔</h1>
        </div>
        <div className="urdu-hero-right">
          <img src="beginners.jpg" alt="سمارٹ کچن" />
        </div>
      </section>

      {/* کھانے کی نمائش */}
      <section className="urdu-food-showcase">
        {foodImages.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            className="urdu-food-image" 
            alt={`کھانا پکانا ${index + 1}`} 
          />
        ))}
      </section>

      {/* کلاسز سیکشن */}
      <section className="urdu-classes-section">
        <img 
          src="home_gui.jpg" 
          className="urdu-classes-image" 
          alt="AI کچن" 
        />
        <div className="urdu-classes-content">
          <div className="urdu-section-label">کھانا پکانا سیکھیں</div>
          <h2>ابتدائی افراد کے لیے رہنمائی<br />آسان <span className="urdu-italic">بنائی گئی</span></h2>
          <p>
            قدم بہ قدم ہدایات، پینٹری آرگنائزنگ ٹپس، اور سمارٹ شاپنگ گائیڈنس کے ساتھ کھانا پکانے کے بنیادی اصول سیکھیں۔ 
            اعتماد اور آسانی کے ساتھ کھانا پکانے کا سفر شروع کرنے والوں کے لیے بہترین۔
          </p>
        </div>
      </section>

      {/* کھانے کا منصوبہ سیکشن */}
      <section className="urdu-m-plan-section">
        <div className="urdu-m-plan-header">
          <div className="urdu-m-plan-title">
            <div className="urdu-section-label">کھانے کا منصوبہ</div>
            <h2>سمارٹ کھانے کی منصوبہ بندی کے ساتھ پھر کبھی نہ سوچیں 'رات کے کھانے میں کیا بنائیں؟'</h2>
          </div>
          <Link to="/urdu-meal-planner" className="urdu-btn">منصوبہ بنائیں</Link>
        </div>
        <div className="urdu-m-plan-grid">
          {guidanceImages.map((image, index) => (
            <div className="urdu-m-plan-card" key={index}>
              <img src={image} alt={`منصوبہ ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
       
      {/* ریسیپی سیکشن */}
      <section className="urdu-h-recipes-section">
        <div className="urdu-h-recipes-container">
          <h2 className="urdu-h-recipes-title">مشہور ریسیپیز</h2>
          <p className="urdu-h-recipes-subtitle">
            شیف بوٹ AI کی تیار کردہ مزیدار ریسیپیز دریافت کریں
          </p>
          <div className="urdu-h-recipes-grid">
            {recipes.map((recipe, index) => (
              <div key={index} className="urdu-h-recipe-card">
                <div className="urdu-h-recipe-image">
                  <img src={recipe.image} alt={recipe.name} />
                  <div className="urdu-recipe-category">{recipe.category}</div>
                </div>
                <div className="urdu-h-recipe-content">
                  <h3 className="urdu-h-recipe-name">{recipe.name}</h3>
                  <p className="urdu-h-recipe-description">{recipe.description}</p>
                  <Link to="/urdu-recipes" className="urdu-h-recipe-btn">ریسیپی دیکھیں</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* کھانے کی تجویز پاپ اپ */}
      {showMealSuggestor && (
        <div className="urdu-meal-suggestor-popup active">
          <div className="urdu-meal-suggestor-popup-header">
            <h3><i className="fas fa-robot"></i> کھانے کی تجویز چیٹ</h3>
            <button className="urdu-close-popup" onClick={toggleMealSuggestor}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="urdu-meal-suggestor-chat-body">
            <div className="urdu-chat-message urdu-bot">
              <div className="urdu-message-content">
                <p>ہیلو! میں آپ کا کھانے کی تجویز دینے والا بوٹ ہوں۔</p>
                <p>مجھ سے کھانے کے آئیڈیاز پوچھیں جیسے:</p>
                <p>• "ناشتے کی تجاویز"</p>
                <p>• "جلد لنچ کے آئیڈیاز"</p>
                <p>• "سبزی خور ڈنر"</p>
              </div>
            </div>
          </div>
          
          <div className="urdu-meal-suggestor-chat-footer">
            <input 
              type="text" 
              className="urdu-chat-input" 
              placeholder="کھانے کی تجاویز پوچھیں..."
            />
            <button className="urdu-chat-send-btn">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      {/* ========== چیٹ بوٹ آئیکون ========== */}
      <div className="urdu-chatbot-icon" onClick={toggleChatbot}>
        <i className="fas fa-robot"></i>
        {unreadMessages > 0 && (
          <span className="urdu-chatbot-badge">{unreadMessages}</span>
        )}
      </div>

      {/* چیٹ بوٹ موڈل */}
      {showChatbot && (
        <div className="urdu-chatbot-modal active">
          <div className="urdu-chatbot-header">
            <h3><i className="fas fa-robot"></i> شیف بوٹ اسسٹنٹ</h3>
            <button className="urdu-close-chatbot" onClick={toggleChatbot}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="urdu-chatbot-body">
            <p>ہیلو! میں شیف بوٹ ہوں۔ آج میں کھانا پکانے میں آپ کی کس طرح مدد کر سکتا ہوں؟ 🍳</p>
          </div>
          <div className="urdu-chatbot-footer">
            <input 
              type="text" 
              className="urdu-chatbot-input" 
              placeholder="اپنا پیغام لکھیں..."
            />
            <button className="urdu-chatbot-send">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrduHomePage;