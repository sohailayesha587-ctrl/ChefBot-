import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesRegionalPage.css';

const RecipesRegionalPage = () => {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState('pakistani');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef(null);

  const cuisines = [
    { id: 1, name: 'Pakistani', key: 'pakistani' },
    { id: 2, name: 'Continental', key: 'continental' },
    { id: 3, name: 'Chinese', key: 'chinese' },
    { id: 4, name: 'Italian', key: 'italian' },
    { id: 5, name: 'Turkish', key: 'turkish' }
  ];

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/recipes/subCategory/regional?limit=200')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching ${selectedCuisine} recipes:`, error);
        setLoading(false);
      });
  }, [selectedCuisine]);

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

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedRecipe(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="regional-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading {selectedCuisine} recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="regional-page">
      <header className="regional-header">
        <div className="regional-header-content">
          <h1 className="regional-title">Regional Recipes</h1>
          <p className="regional-description">
            Explore authentic dishes from around the world
          </p>
        </div>
      </header>

      <div className="cuisine-tabs">
        {cuisines.map(cuisine => (
          <button
            key={cuisine.id}
            className={`cuisine-tab ${selectedCuisine === cuisine.key ? 'active' : ''}`}
            onClick={() => setSelectedCuisine(cuisine.key)}
          >
            <span className="cuisine-name">{cuisine.name}</span>
            <span className="cuisine-count">({recipes.length})</span>
          </button>
        ))}
      </div>

      <main className="regional-main">
        <div className="regional-grid-section">
          <div className="regional-grid">
            {recipes.map(recipe => (
              <div 
                key={recipe._id} 
                className="regional-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div 
                  className="regional-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <div className="regional-card-content">
                  <h3 className="regional-card-title">{recipe.title}</h3>
                  <p className="regional-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={handleGoBack}>
          Back to Home
        </button>
      </div>

      {showDetailPanel && selectedRecipe && (
        <div className="regional-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="regional-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="regional-modal-close" onClick={closeDetailPanel}>
              ×
            </button>
            
            <div className="regional-modal-header">
              <div className="regional-modal-title">
                <h2>{selectedRecipe.title}</h2>
              </div>
            </div>

            <div className="regional-modal-content">
              <div className="regional-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="regional-ingredients-list">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="regional-ingredient-item">
                      <span className="regional-ingredient-bullet">•</span>
                      <span className="regional-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="regional-modal-steps">
                <h3>Steps to Make</h3>
                <div className="regional-steps-list">
                  {selectedRecipe.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="regional-step-item">
                      <span className="regional-step-number">{idx + 1}.</span>
                      <span className="regional-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="regional-modal-voice-container">
                <div className="voice-panel">
                  <h3>Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedRecipe.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.stepsRaw)}
                    >
                      {isPlaying ? 'Stop' : 'Start Voice Guide'}
                    </button>

                    <div className="step-controls">
                      <button 
                        className="step-btn prev"
                        onClick={speakPreviousStep}
                        disabled={currentStep <= 1}
                      >
                        Prev Step
                      </button>
                      <button 
                        className="step-btn next"
                        onClick={speakNextStep}
                        disabled={currentStep >= (selectedRecipe.stepsRaw?.length || 0)}
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                  
                  <div className="voice-hint">
                    Click Start to hear step-by-step instructions
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

export default RecipesRegionalPage;