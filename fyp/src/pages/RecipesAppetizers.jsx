import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesAppetizers.css';

const RecipesAppetizers = () => {
  const navigate = useNavigate();
  const [appetizers, setAppetizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppetizer, setSelectedAppetizer] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH APPETIZERS FROM BACKEND
  useEffect(() => {
fetch('http://localhost:5000/api/recipes/subCategory/appetizers?limit=200')
      .then(res => res.json())
      .then(data => {
        setAppetizers(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching appetizers:', error);
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
    if (selectedAppetizer && currentStep < selectedAppetizer.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedAppetizer.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedAppetizer && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedAppetizer.stepsRaw, currentStep - 2);
    }
  };

  const handleAppetizerSelect = (appetizer) => {
    setSelectedAppetizer(appetizer);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedAppetizer(null);
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
      <div className="appetizers-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious appetizers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appetizers-page">
      {/* Header */}
      <header className="appetizers-header">
        <div className="appetizers-header-content">
          <h1 className="appetizers-page-title">Appetizers Collection</h1>
          <p className="appetizers-page-description">
            A curated selection of delicious starters and finger foods for every occasion.
          </p>
        </div>
      </header>

      {/* Appetizers Grid */}
      <main className="appetizers-main">
        <div className="appetizers-grid-section">
          <div className="appetizers-grid">
            {appetizers.map(appetizer => (
              <div 
                key={appetizer._id} 
                className="appetizers-card"
                onClick={() => handleAppetizerSelect(appetizer)}
              >
                <div 
                  className="appetizers-card-image"
                  style={{ backgroundImage: `url(${appetizer.image})` }}
                ></div>
                
                <div className="appetizers-card-content">
                  <h3 className="appetizers-card-title">{appetizer.title}</h3>
                  <p className="appetizers-card-description">{appetizer.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Back to Home Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={handleGoBack}>
          <span>←</span> Back to Home
        </button>
      </div>

      {/* DETAIL MODAL */}
      {showDetailPanel && selectedAppetizer && (
        <div className="appetizers-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="appetizers-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedAppetizer.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="appetizers-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="appetizers-modal-header">
              <div className="appetizers-modal-title">
                <h2>{selectedAppetizer.title}</h2>
              </div>
            </div>

            <div className="appetizers-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="appetizers-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="appetizers-ingredients-list">
                  {selectedAppetizer.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="appetizers-ingredient-item">
                      <span className="appetizers-ingredient-bullet">•</span>
                      <span className="appetizers-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="appetizers-modal-steps">
                <h3>Steps to Make</h3>
                <div className="appetizers-steps-list">
                  {selectedAppetizer.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="appetizers-step-item">
                      <span className="appetizers-step-number">{idx + 1}.</span>
                      <span className="appetizers-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="appetizers-modal-voice-container">
                <div className="voice-panel">
                  <h3>🎤 Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedAppetizer.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedAppetizer.stepsRaw)}
                    >
                      {isPlaying ? '⏹️ Stop' : '▶️ Start Voice Guide'}
                    </button>

                    <div className="step-controls">
                      <button 
                        className="step-btn prev"
                        onClick={speakPreviousStep}
                        disabled={currentStep <= 1}
                      >
                        ⏪ Prev
                      </button>
                      <button 
                        className="step-btn next"
                        onClick={speakNextStep}
                        disabled={currentStep >= (selectedAppetizer.stepsRaw?.length || 0)}
                      >
                        Next ⏩
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

export default RecipesAppetizers;