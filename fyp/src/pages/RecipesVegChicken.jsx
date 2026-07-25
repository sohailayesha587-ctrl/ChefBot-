import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesVegChicken.css';

const RecipesVegChicken = () => {
  const navigate = useNavigate();
  const [chickenVegRecipes, setChickenVegRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const speechRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/veg-chicken?limit=200')
      .then(res => res.json())
      .then(data => {
        setCategories(['All', ...(data.categories || [])]);
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

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
        setChickenVegRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [selectedCategory]);

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
        speechRef.current = null;
      }
    };
  }, []);

  const speakInstructions = (steps, stepIndex = 0) => {
    if (!steps || steps.length === 0) return;

    if ('speechSynthesis' in window) {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Step ${stepIndex + 1}: ${steps[stepIndex]}`;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = 'en-US';

      setCurrentStep(stepIndex + 1);
      setProgress(((stepIndex + 1) / steps.length) * 100);
      setIsPlaying(true);

      utterance.onend = () => {
        setIsPlaying(false);
        speechRef.current = null;

        if (stepIndex + 1 < steps.length) {
          setTimeout(() => {
            speakInstructions(steps, stepIndex + 1);
          }, 1500);
        }
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        speechRef.current = null;
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && speechRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      speechRef.current = null;
    }
  };

  const speakNextStep = () => {
    if (selectedRecipe && currentStep < selectedRecipe.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedRecipe.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedRecipe && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedRecipe.stepsRaw, currentStep - 2);
    }
  };

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
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedRecipe(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  if (loading) {
    return (
      <div className="chicken-veg-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chicken-veg-page">
        <div className="error-container">
          <p>Error loading recipes: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="chicken-veg-page">
      <header className="chicken-veg-header">
        <div className="chicken-veg-header-content">
          <h1 className="chicken-veg-title">Recipe Collection</h1>
          <p className="chicken-veg-description">
            Discover delicious recipes - chicken, mutton, rice, qeema, vegetables, and much more
          </p>
        </div>
      </header>

      <div className="category-filter-container">
        <label className="category-filter-label">Filter by Category:</label>
        <select 
          className="category-filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat === 'All' ? 'All Recipes' : cat}
            </option>
          ))}
        </select>
        
        <div className="recipe-count">
          {chickenVegRecipes.length} recipes found
        </div>
      </div>

      <main className="chicken-veg-main">
        <div className="chicken-veg-grid-section">
          <div className="chicken-veg-grid">
            {chickenVegRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="chicken-veg-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="chicken-veg-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="chicken-veg-card-content">
                  <h3 className="chicken-veg-card-title">{recipe.title}</h3>
                  <p className="chicken-veg-card-description">{recipe.tagline}</p>
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
          Back to Lunch Categories
        </button>
      </div>

      {showDetailPanel && selectedRecipe && (
        <div className="chicken-veg-modal-overlay" onClick={handleCloseModal}>
          <div
            className="chicken-veg-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="chicken-veg-modal-close" onClick={handleCloseModal}>
              ×
            </button>
            
            <div className="chicken-veg-modal-header">
              <div className="chicken-veg-modal-title">
                <h2>{selectedRecipe.title}</h2>
                {selectedRecipe.category && (
                  <span className="recipe-category-tag">{selectedRecipe.category}</span>
                )}
              </div>
            </div>

            <div className="chicken-veg-modal-content">
              <div className="chicken-veg-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="chicken-veg-ingredients-list">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, index) => (
                    <div key={index} className="chicken-veg-ingredient-item">
                      <span className="chicken-veg-ingredient-bullet">•</span>
                      <span className="chicken-veg-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chicken-veg-modal-steps">
                <h3>Steps to Make</h3>
                <div className="chicken-veg-steps-list">
                  {selectedRecipe.stepsRaw?.map((step, index) => (
                    <div key={index} className="chicken-veg-step-item">
                      <span className="chicken-veg-step-number">{index + 1}.</span>
                      <span className="chicken-veg-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chicken-veg-modal-voice-container">
                <div className="voice-panel">
                  <h3>Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedRecipe.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="current-step-display">
                    <p>
                      <strong>Step {currentStep}:</strong> {selectedRecipe.stepsRaw?.[currentStep - 1]}
                    </p>
                  </div>

                  <button
                    className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                    onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.stepsRaw)}
                  >
                    {isPlaying ? 'Stop' : 'Start Voice Guide'}
                  </button>

                  <div className="step-controls">
                    <button
                      className="step-btn"
                      onClick={speakPreviousStep}
                      disabled={currentStep <= 1}
                    >
                      Previous
                    </button>
                    <button
                      className="step-btn"
                      onClick={() => {
                        stopSpeaking();
                        speakInstructions(selectedRecipe.stepsRaw, 0);
                      }}
                    >
                      Restart
                    </button>
                    <button
                      className="step-btn"
                      onClick={speakNextStep}
                      disabled={currentStep >= (selectedRecipe.stepsRaw?.length || 0)}
                    >
                      Next
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

export default RecipesVegChicken;