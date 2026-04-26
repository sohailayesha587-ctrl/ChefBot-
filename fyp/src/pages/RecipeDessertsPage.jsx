import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeDessertsPage.css';

const RecipeDessertsPage = () => {
  const navigate = useNavigate();
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH DESSERTS FROM BACKEND
  useEffect(() => {
fetch('http://localhost:5000/api/recipes/subCategory/desserts?limit=200')
      .then(res => res.json())
      .then(data => {
        setDesserts(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching desserts:', error);
        setLoading(false);
      });
  }, []);

  // Voice instructions handler
  const speakInstructions = (instructions, stepIndex = 0) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentStep(0);
        setProgress(0);
        speechSynthesisRef.current = null;
        return;
      }

      if (stepIndex >= 0 && stepIndex < instructions.length) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = `Step ${stepIndex + 1}: ${instructions[stepIndex]}`;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        setCurrentStep(stepIndex + 1);
        const stepProgress = ((stepIndex + 1) / instructions.length) * 100;
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
    if (selectedDessert && currentStep < selectedDessert.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedDessert.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedDessert && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedDessert.stepsRaw, currentStep - 2);
    }
  };

  const handleDessertSelect = (dessert) => {
    setSelectedDessert(dessert);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedDessert(null);
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
      <div className="desserts-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious desserts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="desserts-page">
      {/* Header */}
      <header className="desserts-header">
        <div className="desserts-header-content">
          <h1 className="desserts-page-title">Dessert Recipe Collection</h1>
          <p className="desserts-page-description">
            A curated selection of delightful sweet treats from around the world.
          </p>
        </div>
      </header>

      {/* Desserts Grid */}
      <main className="desserts-main">
        <div className="desserts-grid-section">
          <div className="desserts-grid">
            {desserts.map(dessert => (
              <div 
                key={dessert._id} 
                className="desserts-technique-card"
                onClick={() => handleDessertSelect(dessert)}
              >
                <div 
                  className="desserts-card-image"
                  style={{ backgroundImage: `url(${dessert.image})` }}
                ></div>
                
                <div className="desserts-card-content">
                  <h3 className="desserts-card-title">{dessert.title}</h3>
                  <p className="desserts-card-description">{dessert.tagline}</p>
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

      {/* DETAIL MODAL with SELECTED DESSERT IMAGE as Background */}
      {showDetailPanel && selectedDessert && (
        <div className="desserts-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="desserts-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedDessert.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="desserts-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="desserts-modal-header">
              <div className="desserts-modal-title">
                <h2>{selectedDessert.title}</h2>
              </div>
            </div>

            <div className="desserts-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="desserts-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="desserts-ingredients-list">
                  {selectedDessert.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="desserts-ingredient-item">
                      <span className="desserts-ingredient-bullet">•</span>
                      <span className="desserts-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="desserts-modal-steps">
                <h3>Steps to Make</h3>
                <div className="desserts-steps-list">
                  {selectedDessert.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="desserts-step-item">
                      <span className="desserts-step-number">{idx + 1}.</span>
                      <span className="desserts-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="desserts-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedDessert.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedDessert.stepsRaw)}
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
                        disabled={currentStep >= (selectedDessert.stepsRaw?.length || 0)}
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

export default RecipeDessertsPage;