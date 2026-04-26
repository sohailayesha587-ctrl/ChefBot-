import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeVegetablePage.css';

const RecipeVegetablePage = () => {
  const navigate = useNavigate();
  const [vegetableRecipes, setVegetableRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH VEGETABLE RECIPES FROM BACKEND
  useEffect(() => {
    fetch('http://localhost:5000/api/recipes?category=Vegetable&limit=100')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch vegetable recipes');
        }
        return res.json();
      })
      .then(data => {
        setVegetableRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vegetable recipes:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Voice instructions handler
  const speakInstructions = (steps, stepIndex = 0) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentStep(0);
        setProgress(0);
        speechSynthesisRef.current = null;
        return;
      }

      if (stepIndex >= 0 && stepIndex < steps.length) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = `Step ${stepIndex + 1}: ${steps[stepIndex]}`;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        setCurrentStep(stepIndex + 1);
        const stepProgress = ((stepIndex + 1) / steps.length) * 100;
        setProgress(stepProgress);
        
        utterance.onstart = () => {
          setIsPlaying(true);
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
        };
        
        utterance.onerror = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
        };
        
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      speechSynthesisRef.current = null;
    }
  };

  const speakNextStep = () => {
    if (selectedVegetable && currentStep < selectedVegetable.stepsRaw.length) {
      stopSpeaking();
      speakInstructions(selectedVegetable.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedVegetable && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedVegetable.stepsRaw, currentStep - 2);
    }
  };

  const handleVegetableSelect = (vegetable) => {
    setSelectedVegetable(vegetable);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedVegetable(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  // Loading state
  if (loading) {
    return (
      <div className="vegetable-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading vegetable recipes...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="vegetable-page">
        <div className="error-container">
          <p>Error loading recipes: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="vegetable-page">
      {/* Header */}
      <header className="vegetable-header">
        <div className="vegetable-header-content">
          <h1 className="vegetable-page-title">Traditional Vegetable Dishes</h1>
          <p className="vegetable-page-description">
            Wholesome vegetable recipes inspired by classic regional flavors.
          </p>
        </div>
      </header>

      {/* Vegetable Grid */}
      <main className="vegetable-main">
        <div className="vegetable-grid-section">
          <div className="vegetable-grid">
            {vegetableRecipes.map(vegetable => (
              <div 
                key={vegetable._id} 
                className="vegetable-technique-card"
                onClick={() => handleVegetableSelect(vegetable)}
              >
                <div 
                  className="vegetable-card-image"
                  style={{ backgroundImage: `url(${vegetable.image})` }}
                ></div>
                
                <div className="vegetable-card-content">
                  <h3 className="vegetable-card-title">{vegetable.title}</h3>
                  <p className="vegetable-card-description">{vegetable.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Back to Home Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={handleGoBack}>
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
      </div>

      {/* DETAIL MODAL with SELECTED VEGETABLE IMAGE as Background */}
      {showDetailPanel && selectedVegetable && (
        <div className="vegetable-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="vegetable-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedVegetable.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="vegetable-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="vegetable-modal-header">
              <div className="vegetable-modal-title">
                <h2>{selectedVegetable.title}</h2>
              </div>
            </div>

            <div className="vegetable-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="vegetable-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="vegetable-ingredients-list">
                  {selectedVegetable.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="vegetable-ingredient-item">
                      <span className="vegetable-ingredient-bullet">•</span>
                      <span className="vegetable-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="vegetable-modal-steps">
                <h3>Steps to Make</h3>
                <div className="vegetable-steps-list">
                  {selectedVegetable.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="vegetable-step-item">
                      <span className="vegetable-step-number">{idx + 1}.</span>
                      <span className="vegetable-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="vegetable-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedVegetable.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedVegetable.stepsRaw)}
                    >
                      <i className={`fas fa-${isPlaying ? 'stop' : 'play'}`}></i>
                      {isPlaying ? ' Stop' : ' Start Voice Guide'}
                    </button>

                    <div className="step-controls">
                      <button 
                        className="step-btn prev"
                        onClick={speakPreviousStep}
                        disabled={currentStep <= 1}
                      >
                        <i className="fas fa-backward"></i> Prev
                      </button>
                      <button 
                        className="step-btn next"
                        onClick={speakNextStep}
                        disabled={currentStep >= (selectedVegetable.stepsRaw?.length || 0)}
                      >
                        Next <i className="fas fa-forward"></i>
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

export default RecipeVegetablePage;