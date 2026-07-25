import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesPureMutton.css';

const RecipesPureMutton = () => {
  const navigate = useNavigate();
  const [muttonRecipes, setMuttonRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/pure-mutton?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch mutton recipes');
        }
        return res.json();
      })
      .then(data => {
        setMuttonRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching mutton recipes:', error);
        setError(error.message);
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
      <div className="pure-mutton-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious mutton recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pure-mutton-page">
        <div className="error-container">
          <p>Error loading recipes: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pure-mutton-page">
      <header className="pure-mutton-header">
        <div className="pure-mutton-header-content">
          <h1 className="pure-mutton-title">Pure Mutton Dishes</h1>
          <p className="pure-mutton-description">
            Discover 40+ delicious mutton recipes - curries, karahi, rogan josh, kofta, and much more
          </p>
        </div>
      </header>

      <main className="pure-mutton-main">
        <div className="pure-mutton-grid-section">
          <div className="pure-mutton-grid">
            {muttonRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="pure-mutton-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="pure-mutton-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="pure-mutton-card-content">
                  <h3 className="pure-mutton-card-title">{recipe.title}</h3>
                  <p className="pure-mutton-card-description">{recipe.tagline}</p>
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
        <div className="pure-mutton-modal-overlay" onClick={handleCloseModal}>
          <div
            className="pure-mutton-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="pure-mutton-modal-close" onClick={handleCloseModal}>
              ×
            </button>
            
            <div className="pure-mutton-modal-header">
              <div className="pure-mutton-modal-title">
                <h2>{selectedRecipe.title}</h2>
              </div>
            </div>

            <div className="pure-mutton-modal-content">
              <div className="pure-mutton-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="pure-mutton-ingredients-list">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, index) => (
                    <div key={index} className="pure-mutton-ingredient-item">
                      <span className="pure-mutton-ingredient-bullet">•</span>
                      <span className="pure-mutton-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pure-mutton-modal-steps">
                <h3>Steps to Make</h3>
                <div className="pure-mutton-steps-list">
                  {selectedRecipe.stepsRaw?.map((step, index) => (
                    <div key={index} className="pure-mutton-step-item">
                      <span className="pure-mutton-step-number">{index + 1}.</span>
                      <span className="pure-mutton-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pure-mutton-modal-voice-container">
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

export default RecipesPureMutton;