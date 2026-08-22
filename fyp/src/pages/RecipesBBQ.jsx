import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesBBQ.css';

const RecipesBBQ = () => {
  const navigate = useNavigate();
  const [bbqRecipes, setBbqRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBbq, setSelectedBbq] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/bbq?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch BBQ recipes');
        }
        return res.json();
      })
      .then(data => {
        setBbqRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching BBQ recipes:', error);
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
    if (selectedBbq && currentStep < selectedBbq.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedBbq.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedBbq && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedBbq.stepsRaw, currentStep - 2);
    }
  };

  const handleBbqSelect = (bbq) => {
    setSelectedBbq(bbq);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedBbq(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="bbq-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious BBQ recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bbq-page">
      <header className="bbq-header">
        <div className="bbq-header-content">
          <h1 className="bbq-page-title">BBQ & Grills Recipes</h1>
          <p className="bbq-page-description">
            Discover delicious BBQ and grills recipes with rich, flavorful, and smoky taste
          </p>
        </div>
      </header>

      <main className="bbq-main">
        <div className="bbq-grid-section">
          <div className="bbq-grid">
            {bbqRecipes.map(bbq => (
              <div
                key={bbq._id}
                className="bbq-card"
                onClick={() => handleBbqSelect(bbq)}
              >
                <div
                  className="bbq-card-image"
                  style={{ backgroundImage: `url(${bbq.image})` }}
                ></div>
                <div className="bbq-card-content">
                  <h3 className="bbq-card-title">{bbq.title}</h3>
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

      {showDetailPanel && selectedBbq && (
        <div className="bbq-modal-overlay" onClick={closeDetailPanel}>
          <div className="bbq-modal" onClick={e => e.stopPropagation()}>
            <div className="bbq-modal-hero">
              <div className="bbq-modal-hero-left">
                <span className="bbq-modal-tag">BBQ & Grill Recipe</span>
                <h2 className="bbq-modal-hero-title">{selectedBbq.title}</h2>
                {selectedBbq.tagline && (
                  <p className="bbq-modal-hero-tagline">{selectedBbq.tagline}</p>
                )}
              </div>
              <div className="bbq-modal-hero-right">
                <img
                  src={selectedBbq.image}
                  alt={selectedBbq.title}
                  className="bbq-modal-hero-img"
                />
              </div>
              <button className="bbq-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="bbq-modal-body">
              <div className="bbq-modal-col">
                <div className="bbq-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="bbq-modal-scroll">
                  {selectedBbq.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="bbq-ingredient-item">
                      <span className="bbq-ingredient-dot"></span>
                      <span className="bbq-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bbq-modal-col bbq-modal-col--steps">
                <div className="bbq-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="bbq-modal-scroll">
                  {selectedBbq.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="bbq-step-item">
                      <span className="bbq-step-num">{idx + 1}</span>
                      <span className="bbq-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bbq-voice-bar">
              <div className="bbq-voice-left">
                <i className="fas fa-volume-up bbq-voice-icon"></i>
                <span className="bbq-voice-label">Voice Guide</span>
              </div>

              <div className="bbq-voice-progress">
                <div className="bbq-progress-track">
                  <div className="bbq-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="bbq-progress-info">
                  <span>Step {currentStep} of {selectedBbq.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="bbq-voice-controls">
                <button
                  className="bbq-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`bbq-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedBbq.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="bbq-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedBbq.stepsRaw?.length || 0)}
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

export default RecipesBBQ;