import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesQeema.css';

const RecipesQeema = () => {
  const navigate = useNavigate();
  const [qeemaRecipes, setQeemaRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQeema, setSelectedQeema] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/qeema?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch qeema recipes');
        }
        return res.json();
      })
      .then(data => {
        setQeemaRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching qeema recipes:', error);
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
    if (selectedQeema && currentStep < selectedQeema.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedQeema.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedQeema && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedQeema.stepsRaw, currentStep - 2);
    }
  };

  const handleQeemaSelect = (qeema) => {
    setSelectedQeema(qeema);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedQeema(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="qeema-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious qeema recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="qeema-page">
      <header className="qeema-header">
        <div className="qeema-header-content">
          <h1 className="qeema-page-title">Qeema Recipes</h1>
          <p className="qeema-page-description">
            Discover delicious qeema recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="qeema-main">
        <div className="qeema-grid-section">
          <div className="qeema-grid">
            {qeemaRecipes.map(qeema => (
              <div
                key={qeema._id}
                className="qeema-card"
                onClick={() => handleQeemaSelect(qeema)}
              >
                <div
                  className="qeema-card-image"
                  style={{ backgroundImage: `url(${qeema.image})` }}
                ></div>
                <div className="qeema-card-content">
                  <h3 className="qeema-card-title">{qeema.title}</h3>
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

      {showDetailPanel && selectedQeema && (
        <div className="qeema-modal-overlay" onClick={closeDetailPanel}>
          <div className="qeema-modal" onClick={e => e.stopPropagation()}>
            <div className="qeema-modal-hero">
              <div className="qeema-modal-hero-left">
                <span className="qeema-modal-tag">Qeema Recipe</span>
                <h2 className="qeema-modal-hero-title">{selectedQeema.title}</h2>
                {selectedQeema.tagline && (
                  <p className="qeema-modal-hero-tagline">{selectedQeema.tagline}</p>
                )}
              </div>
              <div className="qeema-modal-hero-right">
                <img
                  src={selectedQeema.image}
                  alt={selectedQeema.title}
                  className="qeema-modal-hero-img"
                />
              </div>
              <button className="qeema-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="qeema-modal-body">
              <div className="qeema-modal-col">
                <div className="qeema-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="qeema-modal-scroll">
                  {selectedQeema.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="qeema-ingredient-item">
                      <span className="qeema-ingredient-dot"></span>
                      <span className="qeema-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="qeema-modal-col qeema-modal-col--steps">
                <div className="qeema-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="qeema-modal-scroll">
                  {selectedQeema.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="qeema-step-item">
                      <span className="qeema-step-num">{idx + 1}</span>
                      <span className="qeema-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="qeema-voice-bar">
              <div className="qeema-voice-left">
                <i className="fas fa-volume-up qeema-voice-icon"></i>
                <span className="qeema-voice-label">Voice Guide</span>
              </div>

              <div className="qeema-voice-progress">
                <div className="qeema-progress-track">
                  <div className="qeema-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="qeema-progress-info">
                  <span>Step {currentStep} of {selectedQeema.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="qeema-voice-controls">
                <button
                  className="qeema-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`qeema-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedQeema.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="qeema-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedQeema.stepsRaw?.length || 0)}
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

export default RecipesQeema;