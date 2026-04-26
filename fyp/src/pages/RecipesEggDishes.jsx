import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesEggDishes.css';

const RecipesEggDishes = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);
  
  // ✅ NEW: Category filter state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

 
  // ✅ FETCH RECIPES BASED ON SELECTED CATEGORY
  useEffect(() => {
    setLoading(true);
fetch('http://localhost:5000/api/recipes/subCategory/egg-dishes?limit=200')
    
    
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
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
    setSelectedRecipe(null);
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
      if (isPlaying && currentStep < selectedRecipe.stepsRaw.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else if (isPlaying && currentStep === selectedRecipe.stepsRaw.length - 1) {
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
    if (!selectedRecipe) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakStep(selectedRecipe.stepsRaw[currentStep]);
    }
  };

  const handleNextStep = () => {
    if (!selectedRecipe) return;
    
    if (currentStep < selectedRecipe.stepsRaw.length - 1) {
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev + 1);
      if (isPlaying) {
        speakStep(selectedRecipe.stepsRaw[currentStep + 1]);
      }
    }
  };

  const handlePrevStep = () => {
    if (!selectedRecipe) return;
    
    if (currentStep > 0) {
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev - 1);
      if (isPlaying) {
        speakStep(selectedRecipe.stepsRaw[currentStep - 1]);
      }
    }
  };

  const handleRestart = () => {
    if (!selectedRecipe) return;
    
    window.speechSynthesis.cancel();
    setCurrentStep(0);
    if (isPlaying) {
      speakStep(selectedRecipe.stepsRaw[0]);
    }
  };

  useEffect(() => {
    if (selectedRecipe && selectedRecipe.stepsRaw) {
      setProgress(((currentStep + 1) / selectedRecipe.stepsRaw.length) * 100);
    }
  }, [currentStep, selectedRecipe]);

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
      <div className="egg-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="egg-page">
      <header className="egg-header">
        <div className="egg-header-content">
          <h1 className="egg-title">🥚 Recipe Collection</h1>
          <p className="egg-description">
            Discover delicious recipes - egg dishes, dal, rice, qeema, chicken, mutton, and much more!
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
          {recipes.length} recipes found
        </div>
      </div>

      <main className="egg-main">
        <div className="egg-grid-section">
          <div className="egg-grid">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="egg-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="egg-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="egg-card-content">
                  <h3 className="egg-card-title">{recipe.title}</h3>
                  <p className="egg-card-description">{recipe.tagline}</p>
                  {recipe.category && (
                    <span className="recipe-category-badge">{recipe.category}</span>
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

      {showDetailPanel && selectedRecipe && (
        <div className="egg-modal-overlay" onClick={handleCloseModal}>
          <div
            className="egg-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="egg-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="egg-modal-header">
              <div className="egg-modal-title">
                <h2>{selectedRecipe.title}</h2>
                {selectedRecipe.category && (
                  <span className="recipe-category-tag">{selectedRecipe.category}</span>
                )}
              </div>
            </div>

            <div className="egg-modal-content">
              <div className="egg-modal-ingredients">
                <h3>🛒 Ingredients</h3>
                <div className="egg-ingredients-list">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, index) => (
                    <div key={index} className="egg-ingredient-item">
                      <span className="egg-ingredient-bullet">•</span>
                      <span className="egg-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="egg-modal-steps">
                <h3>👨‍🍳 Steps to Make</h3>
                <div className="egg-steps-list">
                  {selectedRecipe.stepsRaw?.map((step, index) => (
                    <div key={index} className="egg-step-item">
                      <span className="egg-step-number">{index + 1}.</span>
                      <span className="egg-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="egg-modal-voice-container">
                <div className="voice-panel">
                  <h3>
                    <span>🔊</span> Voice Instructions
                  </h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep + 1} of {selectedRecipe.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="current-step-display">
                    <p>
                      <strong>Step {currentStep + 1}:</strong> {selectedRecipe.stepsRaw?.[currentStep]}
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
                      disabled={currentStep === (selectedRecipe.stepsRaw?.length || 0) - 1}
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

export default RecipesEggDishes;