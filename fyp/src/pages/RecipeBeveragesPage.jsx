import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeBeveragesPage.css';

const RecipeBeveragesPage = () => {
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
fetch('http://localhost:5000/api/recipes/subCategory/beverages?limit=200')
      .then(res => res.json())
      .then(data => {
        setDrinks(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching beverages:', error);
        setLoading(false);
      });
  }, []);

  // Voice instructions handler (same as before)
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
        
        utterance.onstart = () => setIsPlaying(true);
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
    if (selectedDrink && currentStep < selectedDrink.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedDrink.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedDrink && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedDrink.stepsRaw, currentStep - 2);
    }
  };

  const handleDrinkSelect = (drink) => {
    setSelectedDrink(drink);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedDrink(null);
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
      <div className="beverages-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading refreshing beverages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="beverages-page">
      {/* Header */}
      <header className="beverages-header">
        <div className="beverages-header-content">
          <h1 className="beverages-page-title">Beverage Collection</h1>
          <p className="beverages-page-description">
            A curated selection of refreshing drinks from around the world.
          </p>
        </div>
      </header>

      {/* Beverages Grid */}
      <main className="beverages-main">
        <div className="beverages-grid-section">
          <div className="beverages-grid">
            {drinks.map(drink => (
              <div 
                key={drink._id} 
                className="beverages-technique-card"
                onClick={() => handleDrinkSelect(drink)}
              >
                <div 
                  className="beverages-card-image"
                  style={{ backgroundImage: `url(${drink.image})` }}
                ></div>
                
                <div className="beverages-card-content">
                  <h3 className="beverages-card-title">{drink.title}</h3>
                  <p className="beverages-card-description">{drink.tagline}</p>
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

      {/* DETAIL MODAL */}
      {showDetailPanel && selectedDrink && (
        <div className="beverages-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="beverages-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedDrink.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="beverages-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="beverages-modal-header">
              <div className="beverages-modal-title">
                <h2>{selectedDrink.title}</h2>
              </div>
            </div>

            <div className="beverages-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="beverages-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="beverages-ingredients-list">
                  {selectedDrink.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="beverages-ingredient-item">
                      <span className="beverages-ingredient-bullet">•</span>
                      <span className="beverages-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="beverages-modal-steps">
                <h3>Steps to Make</h3>
                <div className="beverages-steps-list">
                  {selectedDrink.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="beverages-step-item">
                      <span className="beverages-step-number">{idx + 1}.</span>
                      <span className="beverages-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="beverages-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedDrink.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedDrink.stepsRaw)}
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
                        disabled={currentStep >= (selectedDrink.stepsRaw?.length || 0)}
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

export default RecipeBeveragesPage;