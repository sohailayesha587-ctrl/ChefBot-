import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesDalMutton.css';

const RecipesDalMutton = () => {
  const navigate = useNavigate();
  const [dalMuttonRecipes, setDalMuttonRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDalMutton, setSelectedDalMutton] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/dal-mutton?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch dal-mutton recipes');
        }
        return res.json();
      })
      .then(data => {
        setDalMuttonRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dal-mutton recipes:', error);
        setLoading(false);
      });
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
    if (selectedDalMutton && currentStep < selectedDalMutton.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedDalMutton.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedDalMutton && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedDalMutton.stepsRaw, currentStep - 2);
    }
  };

  const handleDalMuttonSelect = (dalMutton) => {
    setSelectedDalMutton(dalMutton);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedDalMutton(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="dal-mutton-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious dal-mutton recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dal-mutton-page">
      <header className="dal-mutton-header">
        <div className="dal-mutton-header-content">
          <h1 className="dal-mutton-page-title">Dal & Mutton Recipes</h1>
          <p className="dal-mutton-page-description">
            Discover delicious dal and mutton recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="dal-mutton-main">
        <div className="dal-mutton-grid-section">
          <div className="dal-mutton-grid">
            {dalMuttonRecipes.map(dalMutton => (
              <div
                key={dalMutton._id}
                className="dal-mutton-card"
                onClick={() => handleDalMuttonSelect(dalMutton)}
              >
                <div
                  className="dal-mutton-card-image"
                  style={{ backgroundImage: `url(${dalMutton.image})` }}
                ></div>
                <div className="dal-mutton-card-content">
                  <h3 className="dal-mutton-card-title">{dalMutton.title}</h3>
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

      {showDetailPanel && selectedDalMutton && (
        <div className="dal-mutton-modal-overlay" onClick={closeDetailPanel}>
          <div className="dal-mutton-modal" onClick={e => e.stopPropagation()}>
            <div className="veg-modal-hero">
              <div className="veg-modal-hero-left">
                <span className="veg-modal-tag">Dal & Mutton Recipe</span>
                <h2 className="veg-modal-hero-title">{selectedDalMutton.title}</h2>
                {selectedDalMutton.tagline && (
                  <p className="veg-modal-hero-tagline">{selectedDalMutton.tagline}</p>
                )}
              </div>
              <div className="veg-modal-hero-right">
                <img
                  src={selectedDalMutton.image}
                  alt={selectedDalMutton.title}
                  className="veg-modal-hero-img"
                />
              </div>
              <button className="dal-mutton-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="veg-modal-body">
              <div className="veg-modal-col">
                <div className="veg-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="veg-modal-scroll">
                  {selectedDalMutton.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="veg-ingredient-item">
                      <span className="veg-ingredient-dot"></span>
                      <span className="veg-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="veg-modal-col veg-modal-col--steps">
                <div className="veg-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="veg-modal-scroll">
                  {selectedDalMutton.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="veg-step-item">
                      <span className="veg-step-num">{idx + 1}</span>
                      <span className="veg-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="veg-voice-bar">
              <div className="veg-voice-left">
                <i className="fas fa-volume-up veg-voice-icon"></i>
                <span className="veg-voice-label">Voice Guide</span>
              </div>

              <div className="veg-voice-progress">
                <div className="veg-progress-track">
                  <div className="veg-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="veg-progress-info">
                  <span>Step {currentStep} of {selectedDalMutton.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="veg-voice-controls">
                <button
                  className="veg-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`veg-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedDalMutton.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="veg-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedDalMutton.stepsRaw?.length || 0)}
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

export default RecipesDalMutton;