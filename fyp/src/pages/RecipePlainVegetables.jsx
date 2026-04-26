import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipePlainVegetables.css';

const RecipePlainVegetables = () => {
  const navigate = useNavigate();
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH PLAIN VEGETABLES FROM BACKEND
  useEffect(() => {
fetch('http://localhost:5000/api/recipes/subCategory/plain-vegetables?limit=200')
      .then(res => res.json())
      .then(data => {
        setVegetables(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vegetable recipes:', error);
        setLoading(false);
      });
  }, []);

  const handleVegetableClick = (vegetable) => {
    setSelectedVegetable(vegetable);
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
    setSelectedVegetable(null);
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
      if (isPlaying && currentStep < selectedVegetable.stepsRaw.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else if (isPlaying && currentStep === selectedVegetable.stepsRaw.length - 1) {
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
    if (!selectedVegetable) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakStep(selectedVegetable.stepsRaw[currentStep]);
    }
  };

  const handleNextStep = () => {
    if (!selectedVegetable) return;
    
    if (currentStep < selectedVegetable.stepsRaw.length - 1) {
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev + 1);
      if (isPlaying) {
        speakStep(selectedVegetable.stepsRaw[currentStep + 1]);
      }
    }
  };

  const handlePrevStep = () => {
    if (!selectedVegetable) return;
    
    if (currentStep > 0) {
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev - 1);
      if (isPlaying) {
        speakStep(selectedVegetable.stepsRaw[currentStep - 1]);
      }
    }
  };

  const handleRestart = () => {
    if (!selectedVegetable) return;
    
    window.speechSynthesis.cancel();
    setCurrentStep(0);
    if (isPlaying) {
      speakStep(selectedVegetable.stepsRaw[0]);
    }
  };

  useEffect(() => {
    if (selectedVegetable && selectedVegetable.stepsRaw) {
      setProgress(((currentStep + 1) / selectedVegetable.stepsRaw.length) * 100);
    }
  }, [currentStep, selectedVegetable]);

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
      <div className="vegetables-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious vegetable recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vegetables-page">
      <header className="vegetables-header">
        <div className="vegetables-header-content">
          <h1 className="vegetables-page-title">Plain Vegetables</h1>
          <p className="vegetables-page-description">
            Discover traditional Pakistani vegetable recipes - simple, healthy, and homestyle taste
          </p>
        </div>
      </header>

      <main className="vegetables-main">
        <div className="vegetables-grid-section">
          <div className="vegetables-grid">
            {vegetables.map((vegetable) => (
              <div
                key={vegetable._id}
                className="vegetables-technique-card"
                onClick={() => handleVegetableClick(vegetable)}
              >
                <div
                  className="vegetables-card-image"
                  style={{ backgroundImage: `url(${vegetable.image})` }}
                />
                <div className="vegetables-card-content">
                  <h3 className="vegetables-card-title">{vegetable.title}</h3>
                  <p className="vegetables-card-description">{vegetable.tagline}</p>
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

      {showDetailPanel && selectedVegetable && (
        <div className="vegetables-modal-overlay" onClick={handleCloseModal}>
          <div
            className="vegetables-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedVegetable.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <button className="vegetables-modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="vegetables-modal-header">
              <div className="vegetables-modal-title">
                <h2>{selectedVegetable.title}</h2>
              </div>
            </div>

            <div className="vegetables-modal-content">
              <div className="vegetables-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="vegetables-ingredients-list">
                  {selectedVegetable.ingredientsRaw?.map((ingredient, index) => (
                    <div key={index} className="vegetables-ingredient-item">
                      <span className="vegetables-ingredient-bullet">•</span>
                      <span className="vegetables-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="vegetables-modal-steps">
                <h3>Steps to Make</h3>
                <div className="vegetables-steps-list">
                  {selectedVegetable.stepsRaw?.map((step, index) => (
                    <div key={index} className="vegetables-step-item">
                      <span className="vegetables-step-number">{index + 1}.</span>
                      <span className="vegetables-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="vegetables-modal-voice-container">
                <div className="voice-panel">
                  <h3>
                    <span>🔊</span> Voice Instructions
                  </h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep + 1} of {selectedVegetable.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="current-step-display">
                    <p>
                      <strong>Step {currentStep + 1}:</strong> {selectedVegetable.stepsRaw?.[currentStep]}
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
                      disabled={currentStep === (selectedVegetable.stepsRaw?.length || 0) - 1}
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

export default RecipePlainVegetables;