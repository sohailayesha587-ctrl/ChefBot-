import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesSnacksPage.css';

const RecipesSnacksPage = () => {
  const navigate = useNavigate();
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef(null);

  const FALLBACK_IMAGE = 'https://placehold.co/600x400/284a4b/white?text=Snack+Image';

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
        speechRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/snacks?limit=200')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch snacks');
        return res.json();
      })
      .then(data => {
        setSnacks(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching snacks:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleImageError = (e) => {
    e.target.style.backgroundImage = `url(${FALLBACK_IMAGE})`;
  };

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
    if (selectedSnack && currentStep < selectedSnack.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedSnack.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedSnack && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedSnack.stepsRaw, currentStep - 2);
    }
  };

  const handleSnackSelect = (snack) => {
    setSelectedSnack(snack);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedSnack(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const handleGoBack = () => navigate('/');

  const getImageUrl = (imageUrl) => {
    return imageUrl && imageUrl.startsWith('http') ? imageUrl : FALLBACK_IMAGE;
  };

  if (loading) {
    return (
      <div className="snacks-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious snacks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="snacks-page">
        <div className="error-container">
          <p>Error loading snacks: {error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="snacks-page">
      <header className="snacks-header">
        <div className="snacks-header-content">
          <h1 className="snacks-page-title">Snack Recipe Collection</h1>
          <p className="snacks-page-description">
            A curated selection of delicious and crispy snacks from around the world.
          </p>
        </div>
      </header>

      <main className="snacks-main">
        <div className="snacks-grid-section">
          <div className="snacks-grid">
            {snacks.map(snack => (
              <div 
                key={snack._id} 
                className="snacks-technique-card"
                onClick={() => handleSnackSelect(snack)}
              >
                <div 
                  className="snacks-card-image"
                  style={{ 
                    backgroundImage: `url(${getImageUrl(snack.image)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  onError={handleImageError}
                ></div>
                
                <div className="snacks-card-content">
                  <h3 className="snacks-card-title">{snack.title}</h3>
                  <p className="snacks-card-description">{snack.tagline || snack.description?.substring(0, 80)}</p>
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

      {showDetailPanel && selectedSnack && (
        <div className="snacks-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="snacks-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${getImageUrl(selectedSnack.image)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="snacks-modal-close" onClick={closeDetailPanel}>
              ×
            </button>
            
            <div className="snacks-modal-header">
              <div className="snacks-modal-title">
                <h2>{selectedSnack.title}</h2>
              </div>
            </div>

            <div className="snacks-modal-content">
              <div className="snacks-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="snacks-ingredients-list">
                  {selectedSnack.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="snacks-ingredient-item">
                      <span className="snacks-ingredient-bullet">•</span>
                      <span className="snacks-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="snacks-modal-steps">
                <h3>Steps to Make</h3>
                <div className="snacks-steps-list">
                  {selectedSnack.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="snacks-step-item">
                      <span className="snacks-step-number">{idx + 1}.</span>
                      <span className="snacks-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="snacks-modal-voice-container">
                <div className="voice-panel">
                  <h3>Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedSnack.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedSnack.stepsRaw, 0)}
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
                        disabled={currentStep >= (selectedSnack.stepsRaw?.length || 0)}
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

export default RecipesSnacksPage;