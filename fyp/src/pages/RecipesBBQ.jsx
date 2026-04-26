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
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH BBQ RECIPES FROM BACKEND
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
          <span>←</span> Back to Lunch Categories
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
            <button className="bbq-modal-close" onClick={handleCloseModal}>✕</button>
            
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

export default RecipesBBQ;