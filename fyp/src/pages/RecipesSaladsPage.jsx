import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesSaladsPage.css';

const RecipesSaladsPage = () => {
  const navigate = useNavigate();
  const [salads, setSalads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSalad, setSelectedSalad] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef(null);

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
      <header className="salads-header">
        <div className="salads-header-content">
          <h1 className="salads-page-title">Pure & Balanced Bowls</h1>
          <p className="salads-page-description">
            Wholesome, vibrant salads crafted for every palate.
          </p>
        </div>
      </header>

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

      <div className="back-button-container">
        <button className="back-home-btn" onClick={handleGoBack}>
          Back to Home
        </button>
      </div>

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
            <button className="salads-modal-close" onClick={closeDetailPanel}>
              ×
            </button>
            
            <div className="salads-modal-header">
              <div className="salads-modal-title">
                <h2>{selectedSalad.title}</h2>
              </div>
            </div>

            <div className="salads-modal-content">
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

              <div className="salads-modal-voice-container">
                <div className="voice-panel">
                  <h3>Voice Instructions</h3>
                  
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
                        disabled={currentStep >= (selectedSalad.stepsRaw?.length || 0)}
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

export default RecipesSaladsPage;