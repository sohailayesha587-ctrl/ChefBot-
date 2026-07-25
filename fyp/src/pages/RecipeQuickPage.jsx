import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeQuickPage.css';

const RecipeQuickPage = () => {
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
    fetch('http://localhost:5000/api/recipes/subCategory/quick?limit=200')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quick recipes:', error);
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
      <div className="quick-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading quick recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quick-page">
      <header className="quick-header">
        <div className="quick-header-content">
          <h1 className="quick-page-title">Time Saving Recipes</h1>
          <p className="quick-page-description">
            Perfect for low effort days, quick to prepare and ready in minutes.
          </p>
        </div>
      </header>

      <main className="quick-main">
        <div className="quick-grid-section">
          <div className="quick-grid">
            {recipes.map(recipe => (
              <div
                key={recipe._id}
                className="quick-technique-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div
                  className="quick-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>

                <div className="quick-card-content">
                  <h3 className="quick-card-title">{recipe.title}</h3>
                  <p className="quick-card-description">{recipe.tagline}</p>
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
        <div className="quick-modal-overlay" onClick={closeDetailPanel}>
          <div
            className="quick-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="quick-modal-close" onClick={closeDetailPanel}>
              ×
            </button>

            <div className="quick-modal-header">
              <div className="quick-modal-title">
                <h2>{selectedRecipe.title}</h2>
              </div>
            </div>

            <div className="quick-modal-content">
              <div className="quick-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="quick-ingredients-list">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="quick-ingredient-item">
                      <span className="quick-ingredient-bullet">•</span>
                      <span className="quick-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-modal-steps">
                <h3>Steps to Make</h3>
                <div className="quick-steps-list">
                  {selectedRecipe.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="quick-step-item">
                      <span className="quick-step-number">{idx + 1}.</span>
                      <span className="quick-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-modal-voice-container">
                <div className="voice-panel">
                  <h3>Voice Instructions</h3>

                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-info">
                      <span>
                        Step {currentStep} of {selectedRecipe.stepsRaw?.length || 0}
                      </span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() =>
                        isPlaying
                          ? stopSpeaking()
                          : speakInstructions(selectedRecipe.stepsRaw)
                      }
                    >
                      {isPlaying ? 'Stop' : 'Start Voice Guide'}
                    </button>

                    <div className="step-controls">
                      <button
                        className="step-btn prev"
                        onClick={speakPreviousStep}
                        disabled={currentStep <= 1}
                      >
                        Prev
                      </button>
                      <button
                        className="step-btn next"
                        onClick={speakNextStep}
                        disabled={currentStep >= (selectedRecipe.stepsRaw?.length || 0)}
                      >
                        Next
                      </button>
                    </div>
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

export default RecipeQuickPage;