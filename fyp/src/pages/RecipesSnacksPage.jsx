import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesSnacksPage.css';

const RecipesSnacksPage = () => {
  const navigate = useNavigate();
  const [snackRecipes, setSnackRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSnack, setSelectedSnack] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/snacks?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch snack recipes');
        }
        return res.json();
      })
      .then(data => {
        setSnackRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching snack recipes:', error);
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

  if (loading) {
    return (
      <div className="snack-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious snack recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="snack-page">
      <header className="snack-header">
        <div className="snack-header-content">
          <h1 className="snack-page-title">Snack Recipes</h1>
          <p className="snack-page-description">
            Discover delicious snack recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="snack-main">
        <div className="snack-grid-section">
          <div className="snack-grid">
            {snackRecipes.map(snack => (
              <div
                key={snack._id}
                className="snack-card"
                onClick={() => handleSnackSelect(snack)}
              >
                <div
                  className="snack-card-image"
                  style={{ backgroundImage: `url(${snack.image})` }}
                ></div>
                <div className="snack-card-content">
                  <h3 className="snack-card-title">{snack.title}</h3>
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

      {showDetailPanel && selectedSnack && (
        <div className="snack-modal-overlay" onClick={closeDetailPanel}>
          <div className="snack-modal" onClick={e => e.stopPropagation()}>
            <div className="snack-modal-hero">
              <div className="snack-modal-hero-left">
                <span className="snack-modal-tag">Snack Recipe</span>
                <h2 className="snack-modal-hero-title">{selectedSnack.title}</h2>
                {selectedSnack.tagline && (
                  <p className="snack-modal-hero-tagline">{selectedSnack.tagline}</p>
                )}
              </div>
              <div className="snack-modal-hero-right">
                <img
                  src={selectedSnack.image}
                  alt={selectedSnack.title}
                  className="snack-modal-hero-img"
                />
              </div>
              <button className="snack-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="snack-modal-body">
              <div className="snack-modal-col">
                <div className="snack-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="snack-modal-scroll">
                  {selectedSnack.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="snack-ingredient-item">
                      <span className="snack-ingredient-dot"></span>
                      <span className="snack-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="snack-modal-col snack-modal-col--steps">
                <div className="snack-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="snack-modal-scroll">
                  {selectedSnack.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="snack-step-item">
                      <span className="snack-step-num">{idx + 1}</span>
                      <span className="snack-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="snack-voice-bar">
              <div className="snack-voice-left">
                <i className="fas fa-volume-up snack-voice-icon"></i>
                <span className="snack-voice-label">Voice Guide</span>
              </div>

              <div className="snack-voice-progress">
                <div className="snack-progress-track">
                  <div className="snack-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="snack-progress-info">
                  <span>Step {currentStep} of {selectedSnack.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="snack-voice-controls">
                <button
                  className="snack-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`snack-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedSnack.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="snack-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedSnack.stepsRaw?.length || 0)}
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

export default RecipesSnacksPage;