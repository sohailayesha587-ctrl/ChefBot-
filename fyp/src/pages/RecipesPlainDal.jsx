import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesPlainDal.css';

const RecipesPlainDal = () => {
  const navigate = useNavigate();
  const [dalRecipes, setDalRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDal, setSelectedDal] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/plain-dal?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch dal recipes');
        }
        return res.json();
      })
      .then(data => {
        setDalRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dal recipes:', error);
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
    if (selectedDal && currentStep < selectedDal.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedDal.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedDal && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedDal.stepsRaw, currentStep - 2);
    }
  };

  const handleDalSelect = (dal) => {
    setSelectedDal(dal);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedDal(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="dal-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious dal recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dal-page">
      <header className="dal-header">
        <div className="dal-header-content">
          <h1 className="dal-page-title">Plain Dal Recipes</h1>
          <p className="dal-page-description">
            Discover traditional dal recipes with simple, healthy, and homestyle taste
          </p>
        </div>
      </header>

      <main className="dal-main">
        <div className="dal-grid-section">
          <div className="dal-grid">
            {dalRecipes.map(dal => (
              <div
                key={dal._id}
                className="dal-card"
                onClick={() => handleDalSelect(dal)}
              >
                <div
                  className="dal-card-image"
                  style={{ backgroundImage: `url(${dal.image})` }}
                ></div>
                <div className="dal-card-content">
                  <h3 className="dal-card-title">{dal.title}</h3>
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

      {showDetailPanel && selectedDal && (
        <div className="dal-modal-overlay" onClick={closeDetailPanel}>
          <div className="dal-modal" onClick={e => e.stopPropagation()}>
            <div className="dal-modal-hero">
              <div className="dal-modal-hero-left">
                <span className="dal-modal-tag">Dal Recipe</span>
                <h2 className="dal-modal-hero-title">{selectedDal.title}</h2>
                {selectedDal.tagline && (
                  <p className="dal-modal-hero-tagline">{selectedDal.tagline}</p>
                )}
              </div>
              <div className="dal-modal-hero-right">
                <img
                  src={selectedDal.image}
                  alt={selectedDal.title}
                  className="dal-modal-hero-img"
                />
              </div>
              <button className="dal-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="dal-modal-body">
              <div className="dal-modal-col">
                <div className="dal-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="dal-modal-scroll">
                  {selectedDal.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="dal-ingredient-item">
                      <span className="dal-ingredient-dot"></span>
                      <span className="dal-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dal-modal-col dal-modal-col--steps">
                <div className="dal-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="dal-modal-scroll">
                  {selectedDal.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="dal-step-item">
                      <span className="dal-step-num">{idx + 1}</span>
                      <span className="dal-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dal-voice-bar">
              <div className="dal-voice-left">
                <i className="fas fa-volume-up dal-voice-icon"></i>
                <span className="dal-voice-label">Voice Guide</span>
              </div>

              <div className="dal-voice-progress">
                <div className="dal-progress-track">
                  <div className="dal-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="dal-progress-info">
                  <span>Step {currentStep} of {selectedDal.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="dal-voice-controls">
                <button
                  className="dal-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`dal-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedDal.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="dal-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedDal.stepsRaw?.length || 0)}
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

export default RecipesPlainDal;