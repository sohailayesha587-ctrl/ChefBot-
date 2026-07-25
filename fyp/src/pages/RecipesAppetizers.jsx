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
  const speechRef = useRef(null);

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

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
        speechRef.current = null;
      }
    };
  }, []);

  const speakInstructions = (instructions, stepIndex = 0) => {
    if (!instructions || instructions.length === 0) return;

    if ('speechSynthesis' in window) {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Step ${stepIndex + 1}: ${instructions[stepIndex]}`;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = 'en-US';

      setCurrentStep(stepIndex + 1);
      setProgress(((stepIndex + 1) / instructions.length) * 100);
      setIsPlaying(true);

      utterance.onend = () => {
        setIsPlaying(false);
        speechRef.current = null;

        if (stepIndex + 1 < instructions.length) {
          setTimeout(() => {
            speakInstructions(instructions, stepIndex + 1);
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
          <p>Loading delicious appetizers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appetizers-page">
      <header className="appetizers-header">
        <div className="appetizers-header-content">
          <h1 className="appetizers-page-title">Appetizers Collection</h1>
          <p className="appetizers-page-description">
            A curated selection of delicious starters and finger foods for every occasion.
          </p>
        </div>
      </header>

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

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>

      {showDetailPanel && selectedAppetizer && (
        <div className="appetizers-modal-overlay" onClick={closeDetailPanel}>
          <div className="appetizers-modal" onClick={e => e.stopPropagation()}>
            <div className="app-modal-hero">
              <div className="app-modal-hero-left">
                <span className="app-modal-tag">Appetizer</span>
                <h2 className="app-modal-hero-title">{selectedAppetizer.title}</h2>
                {selectedAppetizer.tagline && (
                  <p className="app-modal-hero-tagline">{selectedAppetizer.tagline}</p>
                )}
              </div>

              <div className="app-modal-hero-right">
                <img
                  src={selectedAppetizer.image}
                  alt={selectedAppetizer.title}
                  className="app-modal-hero-img"
                />
              </div>

              <button className="appetizers-modal-close" onClick={closeDetailPanel}>
                ×
              </button>
            </div>

            <div className="app-modal-body">
              <div className="app-modal-col">
                <div className="app-modal-col-header">
                  <h3>Ingredients</h3>
                </div>
                <div className="app-modal-scroll">
                  {selectedAppetizer.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="app-ingredient-item">
                      <span className="app-ingredient-dot"></span>
                      <span className="app-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="app-modal-col app-modal-col--steps">
                <div className="app-modal-col-header">
                  <h3>Steps to Make</h3>
                </div>
                <div className="app-modal-scroll">
                  {selectedAppetizer.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="app-step-item">
                      <span className="app-step-num">{idx + 1}</span>
                      <span className="app-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="app-voice-bar">
              <div className="app-voice-left">
                <span className="app-voice-label">Voice Guide</span>
              </div>

              <div className="app-voice-progress">
                <div className="app-progress-track">
                  <div className="app-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="app-progress-info">
                  <span>Step {currentStep} of {selectedAppetizer.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="app-voice-controls">
                <button
                  className="app-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  Prev
                </button>
                <button
                  className={`app-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedAppetizer.stepsRaw)}
                >
                  {isPlaying ? 'Stop' : 'Start'}
                </button>
                <button
                  className="app-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedAppetizer.stepsRaw?.length || 0)}
                >
                  Next
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