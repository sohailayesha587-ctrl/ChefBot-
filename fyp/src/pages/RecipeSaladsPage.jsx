import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeSaladsPage.css';

const RecipeSaladsPage = () => {
  const navigate = useNavigate();
  const [salads, setSalads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSalad, setSelectedSalad] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH SALADS FROM BACKEND
  useEffect(() => {
fetch('http://localhost:5000/api/recipes/subCategory/salads?limit=200')
      .then(res => res.json())
      .then(data => {
        setSalads(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching salads:', error);
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
    if (selectedSalad && currentStep < selectedSalad.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedSalad.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedSalad && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedSalad.stepsRaw, currentStep - 2);
    }
  };

  const handleSaladSelect = (salad) => {
    setSelectedSalad(salad);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedSalad(null);
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
      <div className="salads-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading fresh salads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="salads-page">
      {/* Header */}
      <header className="salads-header">
        <div className="salads-header-content">
          <h1 className="salads-page-title">Pure & Balanced Bowls</h1>
          <p className="salads-page-description">
            Wholesome, vibrant salads crafted for every palate.
          </p>
        </div>
      </header>

      {/* Salads Grid */}
      <main className="salads-main">
        <div className="salads-grid-section">
          <div className="salads-grid">
            {salads.map(salad => (
              <div 
                key={salad._id} 
                className="salads-technique-card"
                onClick={() => handleSaladSelect(salad)}
              >
                <div 
                  className="salads-card-image"
                  style={{ backgroundImage: `url(${salad.image})` }}
                ></div>
                
                <div className="salads-card-content">
                  <h3 className="salads-card-title">{salad.title}</h3>
                  <p className="salads-card-description">{salad.tagline}</p>
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

      {/* DETAIL MODAL with SELECTED SALAD IMAGE as Background */}
      {showDetailPanel && selectedSalad && (
        <div className="salads-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="salads-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedSalad.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="salads-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="salads-modal-header">
              <div className="salads-modal-title">
                <h2>{selectedSalad.title}</h2>
              </div>
            </div>

            <div className="salads-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="salads-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="salads-ingredients-list">
                  {selectedSalad.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="salads-ingredient-item">
                      <span className="salads-ingredient-bullet">•</span>
                      <span className="salads-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="salads-modal-steps">
                <h3>Steps to Make</h3>
                <div className="salads-steps-list">
                  {selectedSalad.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="salads-step-item">
                      <span className="salads-step-number">{idx + 1}.</span>
                      <span className="salads-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="salads-modal-voice-container">
                <div className="voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedSalad.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedSalad.stepsRaw)}
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
                        disabled={currentStep >= (selectedSalad.stepsRaw?.length || 0)}
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

export default RecipeSaladsPage;