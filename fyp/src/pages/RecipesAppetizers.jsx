import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesAppetizers.css';

const RecipesAppetizers = () => {
  const navigate = useNavigate();
  const [appetizerRecipes, setAppetizerRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppetizer, setSelectedAppetizer] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('api/recipes/subCategory/appetizers?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch appetizer recipes');
        }
        return res.json();
      })
      .then(data => {
        setAppetizerRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching appetizer recipes:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
        speechSynthesisRef.current = null;
      }
    };
  }, []);

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
        setProgress(((stepIndex + 1) / instructions.length) * 100);
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => { 
          setIsPlaying(false); 
          speechSynthesisRef.current = null;
          if (stepIndex < instructions.length - 1) {
            setTimeout(() => {
              speakInstructions(instructions, stepIndex + 1);
            }, 1000);
          }
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

  if (loading) {
    return (
      <div className="appetizers-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious appetizer recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appetizers-page">
      <header className="appetizers-header">
        <div className="appetizers-header-content">
          <h1 className="appetizers-page-title">Appetizer Recipes</h1>
          <p className="appetizers-page-description">
            Discover delicious appetizer recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="appetizers-main">
        <div className="appetizers-grid-section">
          <div className="appetizers-grid">
            {appetizerRecipes.map(appetizer => (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          <span>←</span> Back to Home
        </button>
      </div>

      {showDetailPanel && selectedAppetizer && (
        <div className="appetizers-modal-overlay" onClick={closeDetailPanel}>
          <div className="appetizers-modal" onClick={e => e.stopPropagation()}>
            <div className="appetizers-modal-hero">
              <div className="appetizers-modal-hero-left">
                <span className="appetizers-modal-tag">Appetizer Recipe</span>
                <h2 className="appetizers-modal-hero-title">{selectedAppetizer.title}</h2>
                {selectedAppetizer.tagline && (
                  <p className="appetizers-modal-hero-tagline">{selectedAppetizer.tagline}</p>
                )}
              </div>
              <div className="appetizers-modal-hero-right">
                <img
                  src={selectedAppetizer.image}
                  alt={selectedAppetizer.title}
                  className="appetizers-modal-hero-img"
                />
              </div>
              <button className="appetizers-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="appetizers-modal-body">
              <div className="appetizers-modal-col">
                <div className="appetizers-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="appetizers-modal-scroll">
                  {selectedAppetizer.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="appetizers-ingredient-item">
                      <span className="appetizers-ingredient-dot"></span>
                      <span className="appetizers-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="appetizers-modal-col appetizers-modal-col--steps">
                <div className="appetizers-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="appetizers-modal-scroll">
                  {selectedAppetizer.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="appetizers-step-item">
                      <span className="appetizers-step-num">{idx + 1}</span>
                      <span className="appetizers-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="appetizers-voice-bar">
              <div className="appetizers-voice-left">
                <i className="fas fa-volume-up appetizers-voice-icon"></i>
                <span className="appetizers-voice-label">Voice Guide</span>
              </div>

              <div className="appetizers-voice-progress">
                <div className="appetizers-progress-track">
                  <div className="appetizers-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="appetizers-progress-info">
                  <span>Step {currentStep} of {selectedAppetizer.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="appetizers-voice-controls">
                <button
                  className="appetizers-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`appetizers-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedAppetizer.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="appetizers-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedAppetizer.stepsRaw?.length || 0)}
                >
                  Next <i className="fas fa-step-forward"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesAppetizers;