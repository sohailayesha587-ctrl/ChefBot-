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
  const speechRef = useRef(null);

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
    if (selectedCake && currentStep < selectedCake.stepsRaw?.length) {
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
      <header className="baking-header">
        <div className="baking-header-content">
          <h1 className="baking-page-title">Cakes & Bakes Collection</h1>
          <p className="baking-page-description">
            Discover delicious cakes and baked goods from around the world.
          </p>
        </div>
      </header>

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

      <div className="back-button-container">
        <button className="back-home-btn" onClick={handleGoBack}>
          Back to Home
        </button>
      </div>

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
            <button className="baking-modal-close" onClick={closeDetailPanel}>
              ×
            </button>
            
            <div className="baking-modal-header">
              <div className="baking-modal-title">
                <h2>{selectedCake.title}</h2>
              </div>
            </div>

            <div className="baking-modal-content">
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

              <div className="baking-modal-voice-container">
                <div className="voice-panel">
                  <h3>Voice Instructions</h3>
                  
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
                        disabled={currentStep >= (selectedCake.stepsRaw?.length || 0)}
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

export default RecipeBakingPage;