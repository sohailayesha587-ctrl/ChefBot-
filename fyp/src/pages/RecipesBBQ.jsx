import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesBBQ.css';

const RecipesBBQ = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/bbq?limit=200')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching BBQ recipes:', error);
        setLoading(false);
      });
  }, []);

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
      <div className="bbq-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious BBQ recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bbq-page">
      <header className="bbq-header">
        <div className="bbq-header-content">
          <h1 className="bbq-title">BBQ & Grills</h1>
          <p className="bbq-description">
            Discover delicious BBQ recipes - tikka, boti, seekh kebab, chapli, bihari, reshmi, and much more
          </p>
        </div>
      </header>

      <main className="bbq-main">
        <div className="bbq-grid-section">
          <div className="bbq-grid">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bbq-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="bbq-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="bbq-card-content">
                  <h3 className="bbq-card-title">{recipe.title}</h3>
                  <p className="bbq-card-description">{recipe.tagline}</p>
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
        <div className="bbq-modal-overlay" onClick={handleCloseModal}>
          <div
            className="bbq-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="bbq-modal-close" onClick={handleCloseModal}>
              ×
            </button>
            
            <div className="bbq-modal-header">
              <div className="bbq-modal-title">
                <h2>{selectedRecipe.title}</h2>
              </div>
            </div>

            <div className="bbq-modal-content">
              <div className="bbq-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="bbq-ingredients-list">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, index) => (
                    <div key={index} className="bbq-ingredient-item">
                      <span className="bbq-ingredient-bullet">•</span>
                      <span className="bbq-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bbq-modal-steps">
                <h3>Steps to Make</h3>
                <div className="bbq-steps-list">
                  {selectedRecipe.stepsRaw?.map((step, index) => (
                    <div key={index} className="bbq-step-item">
                      <span className="bbq-step-number">{index + 1}.</span>
                      <span className="bbq-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bbq-modal-voice-container">
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

export default RecipesBBQ;