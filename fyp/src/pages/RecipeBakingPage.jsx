import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeBakingPage.css';

const RecipeBakingPage = () => {
  const navigate = useNavigate();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCake, setSelectedCake] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ BACKEND SE DATA FETCH
  useEffect(() => {
fetch('http://localhost:5000/api/recipes/subCategory/baking?limit=200')
      .then(res => res.json())
      .then(data => {
        setCakes(data.recipes);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cakes:', error);
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
    if (selectedCake && currentStep < selectedCake.stepsRaw.length) {
      stopSpeaking();
      speakInstructions(selectedCake.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedCake && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedCake.stepsRaw, currentStep - 2);
    }
  };

  const handleCakeSelect = (cake) => {
    setSelectedCake(cake);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedCake(null);
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
      <div className="baking-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious cakes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="baking-page">
      {/* Header */}
      <header className="baking-header">
        <div className="baking-header-content">
          <h1 className="baking-page-title">Cakes & Bakes Collection</h1>
          <p className="baking-page-description">
            Discover delicious cakes and baked goods from around the world.
          </p>
        </div>
      </header>

      {/* Cakes Grid */}
      <main className="baking-main">
        <div className="baking-grid-section">
          <div className="baking-grid">
            {cakes.map(cake => (
              <div 
                key={cake._id} 
                className="baking-technique-card"
                onClick={() => handleCakeSelect(cake)}
              >
                <div 
                  className="baking-card-image"
                  style={{ backgroundImage: `url(${cake.image})` }}
                ></div>
                
                <div className="baking-card-content">
                  <h3 className="baking-card-title">{cake.title}</h3>
                  <p className="baking-card-description">{cake.tagline}</p>
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

      {/* DETAIL MODAL with SELECTED CAKE IMAGE as Background */}
      {showDetailPanel && selectedCake && (
        <div className="baking-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="baking-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedCake.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="baking-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="baking-modal-header">
              <div className="baking-modal-title">
                <h2>{selectedCake.title}</h2>
              </div>
            </div>

            <div className="baking-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="baking-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="baking-ingredients-list">
                  {selectedCake.ingredientsRaw && selectedCake.ingredientsRaw.map((ingredient, idx) => (
                    <div key={idx} className="baking-ingredient-item">
                      <span className="baking-ingredient-bullet">•</span>
                      <span className="baking-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="baking-modal-steps">
                <h3>Steps to Make</h3>
                <div className="baking-steps-list">
                  {selectedCake.stepsRaw && selectedCake.stepsRaw.map((step, idx) => (
                    <div key={idx} className="baking-step-item">
                      <span className="baking-step-number">{idx + 1}.</span>
                      <span className="baking-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="baking-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedCake.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedCake.stepsRaw)}
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
                        disabled={currentStep >= (selectedCake.stepsRaw?.length || 0)}
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

export default RecipeBakingPage;