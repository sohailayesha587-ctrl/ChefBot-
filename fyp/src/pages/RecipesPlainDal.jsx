import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesPlainDal.css';

const RecipesPlainDal = () => {
  const navigate = useNavigate();
  const [dalRecipes, setDalRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDal, setSelectedDal] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);
  
  // ✅ NEW: Category filter state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  // ✅ FETCH ALL CATEGORIES FIRST
  useEffect(() => {
fetch('http://localhost:5000/api/recipes/subCategory/plain-dal?limit=200')
      .then(res => res.json())
      .then(data => {
        setCategories(['All', ...(data.categories || [])]);
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // ✅ FETCH RECIPES BASED ON SELECTED CATEGORY
  useEffect(() => {
    setLoading(true);
    let url = 'http://localhost:5000/api/recipes?limit=100';
    if (selectedCategory !== 'All') {
      url = `http://localhost:5000/api/recipes?category=${selectedCategory}&limit=100`;
    }
    
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch recipes');
        }
        return res.json();
      })
      .then(data => {
        setDalRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleDalClick = (dal) => {
    setSelectedDal(dal);
    setShowDetailPanel(true);
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const handleCloseModal = () => {
    setShowDetailPanel(false);
    setSelectedDal(null);
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const speakStep = (stepText) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(stepText);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      if (isPlaying && currentStep < selectedDal.stepsRaw.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else if (isPlaying && currentStep === selectedDal.stepsRaw.length - 1) {
        setIsPlaying(false);
        setCurrentStep(0);
      }
    };

    utterance.onerror = () => {
      console.error('Speech synthesis error');
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    speechSynthesisRef.current = utterance;
  };

  const handlePlayPause = () => {
    if (!selectedDal) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakStep(selectedDal.stepsRaw[currentStep]);
    }
  };

  const handleNextStep = () => {
    if (!selectedDal) return;
    
    if (currentStep < selectedDal.stepsRaw.length - 1) {
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev + 1);
      if (isPlaying) {
        speakStep(selectedDal.stepsRaw[currentStep + 1]);
      }
    }
  };

  const handlePrevStep = () => {
    if (!selectedDal) return;
    
    if (currentStep > 0) {
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev - 1);
      if (isPlaying) {
        speakStep(selectedDal.stepsRaw[currentStep - 1]);
      }
    }
  };

  const handleRestart = () => {
    if (!selectedDal) return;
    
    window.speechSynthesis.cancel();
    setCurrentStep(0);
    if (isPlaying) {
      speakStep(selectedDal.stepsRaw[0]);
    }
  };

  useEffect(() => {
    if (selectedDal) {
      setProgress(((currentStep + 1) / selectedDal.stepsRaw.length) * 100);
    }
  }, [currentStep, selectedDal]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="dal-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious recipes...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="dal-page">
        <div className="error-container">
          <p>Error loading recipes: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dal-page">
      <header className="dal-header">
        <div className="dal-header-content">
          <h1 className="dal-title">🍛 Recipe Collection</h1>
          <p className="dal-description">
            Discover delicious recipes - dal, rice, qeema, chicken, mutton, vegetables, and much more!
          </p>
        </div>
      </header>

      {/* ✅ NEW: Category Filter Dropdown */}
      <div className="category-filter-container">
        <label className="category-filter-label">Filter by Category:</label>
        <select 
          className="category-filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat === 'All' ? '📋 All Recipes' : `🍲 ${cat}`}
            </option>
          ))}
        </select>
        
        <div className="recipe-count">
          {dalRecipes.length} recipes found
        </div>
      </div>

      <main className="dal-main">
        <div className="dal-grid-section">
          <div className="dal-grid">
            {dalRecipes.map((dal) => (
              <div
                key={dal._id}
                className="dal-card"
                onClick={() => handleDalClick(dal)}
              >
                <div
                  className="dal-card-image"
                  style={{ backgroundImage: `url(${dal.image})` }}
                />
                <div className="dal-card-content">
                  <h3 className="dal-card-title">{dal.title}</h3>
                  <p className="dal-card-description">{dal.tagline}</p>
                  {dal.category && (
                    <span className="recipe-category-badge">{dal.category}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back to Lunch Categories
        </button>
      </div>

      {showDetailPanel && selectedDal && (
        <div className="dal-modal-overlay" onClick={handleCloseModal}>
          <div
            className="dal-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedDal.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="dal-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="dal-modal-header">
              <div className="dal-modal-title">
                <h2>{selectedDal.title}</h2>
                {selectedDal.category && (
                  <span className="recipe-category-tag">{selectedDal.category}</span>
                )}
              </div>
            </div>

            <div className="dal-modal-content">
              <div className="dal-modal-ingredients">
                <h3>🛒 Ingredients</h3>
                <div className="dal-ingredients-list">
                  {selectedDal.ingredientsRaw?.map((ingredient, index) => (
                    <div key={index} className="dal-ingredient-item">
                      <span className="dal-ingredient-bullet">•</span>
                      <span className="dal-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dal-modal-steps">
                <h3>👨‍🍳 Steps to Make</h3>
                <div className="dal-steps-list">
                  {selectedDal.stepsRaw?.map((step, index) => (
                    <div key={index} className="dal-step-item">
                      <span className="dal-step-number">{index + 1}.</span>
                      <span className="dal-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dal-modal-voice-container">
                <div className="voice-panel">
                  <h3>
                    <span>🔊</span> Voice Instructions
                  </h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep + 1} of {selectedDal.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="current-step-display">
                    <p>
                      <strong>Step {currentStep + 1}:</strong> {selectedDal.stepsRaw?.[currentStep]}
                    </p>
                  </div>

                  <button
                    className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <>⏸️ Pause Reading</>
                    ) : (
                      <>▶️ Play Reading</>
                    )}
                  </button>

                  <div className="step-controls">
                    <button
                      className="step-btn"
                      onClick={handlePrevStep}
                      disabled={currentStep === 0}
                    >
                      ⏮️ Previous
                    </button>
                    <button
                      className="step-btn"
                      onClick={handleRestart}
                      title="Restart from beginning"
                    >
                      🔄 Restart
                    </button>
                    <button
                      className="step-btn"
                      onClick={handleNextStep}
                      disabled={currentStep === (selectedDal.stepsRaw?.length || 0) - 1}
                    >
                      Next ⏭️
                    </button>
                  </div>

                  <div className="voice-hint">
                    <small>Use buttons to navigate through steps</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesPlainDal;