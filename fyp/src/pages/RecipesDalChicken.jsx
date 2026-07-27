import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesDalChicken.css';

const RecipesDalChicken = () => {
  const navigate = useNavigate();
  const [dalChickenRecipes, setDalChickenRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDalChicken, setSelectedDalChicken] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/dal-chicken?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch dal-chicken recipes');
        }
        return res.json();
      })
      .then(data => {
        setDalChickenRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dal-chicken recipes:', error);
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
    if (selectedDalChicken && currentStep < selectedDalChicken.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedDalChicken.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedDalChicken && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedDalChicken.stepsRaw, currentStep - 2);
    }
  };

  const handleDalChickenSelect = (dalChicken) => {
    setSelectedDalChicken(dalChicken);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedDalChicken(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="dal-chicken-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious dal-chicken recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dal-chicken-page">
      <header className="dal-chicken-header">
        <div className="dal-chicken-header-content">
          <h1 className="dal-chicken-page-title">Dal & Chicken Recipes</h1>
          <p className="dal-chicken-page-description">
            Discover delicious dal and chicken recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="dal-chicken-main">
        <div className="dal-chicken-grid-section">
          <div className="dal-chicken-grid">
            {dalChickenRecipes.map(dalChicken => (
              <div
                key={dalChicken._id}
                className="dal-chicken-card"
                onClick={() => handleDalChickenSelect(dalChicken)}
              >
                <div
                  className="dal-chicken-card-image"
                  style={{ backgroundImage: `url(${dalChicken.image})` }}
                ></div>
                <div className="dal-chicken-card-content">
                  <h3 className="dal-chicken-card-title">{dalChicken.title}</h3>
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

      {showDetailPanel && selectedDalChicken && (
        <div className="dal-chicken-modal-overlay" onClick={closeDetailPanel}>
          <div className="dal-chicken-modal" onClick={e => e.stopPropagation()}>
            <div className="dal-chicken-modal-hero">
              <div className="dal-chicken-modal-hero-left">
                <span className="dal-chicken-modal-tag">Dal & Chicken Recipe</span>
                <h2 className="dal-chicken-modal-hero-title">{selectedDalChicken.title}</h2>
                {selectedDalChicken.tagline && (
                  <p className="dal-chicken-modal-hero-tagline">{selectedDalChicken.tagline}</p>
                )}
              </div>
              <div className="dal-chicken-modal-hero-right">
                <img
                  src={selectedDalChicken.image}
                  alt={selectedDalChicken.title}
                  className="dal-chicken-modal-hero-img"
                />
              </div>
              <button className="dal-chicken-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="dal-chicken-modal-body">
              <div className="dal-chicken-modal-col">
                <div className="dal-chicken-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="dal-chicken-modal-scroll">
                  {selectedDalChicken.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="dal-chicken-ingredient-item">
                      <span className="dal-chicken-ingredient-dot"></span>
                      <span className="dal-chicken-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dal-chicken-modal-col dal-chicken-modal-col--steps">
                <div className="dal-chicken-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="dal-chicken-modal-scroll">
                  {selectedDalChicken.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="dal-chicken-step-item">
                      <span className="dal-chicken-step-num">{idx + 1}</span>
                      <span className="dal-chicken-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dal-chicken-voice-bar">
              <div className="dal-chicken-voice-left">
                <i className="fas fa-volume-up dal-chicken-voice-icon"></i>
                <span className="dal-chicken-voice-label">Voice Guide</span>
              </div>

              <div className="dal-chicken-voice-progress">
                <div className="dal-chicken-progress-track">
                  <div className="dal-chicken-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="dal-chicken-progress-info">
                  <span>Step {currentStep} of {selectedDalChicken.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="dal-chicken-voice-controls">
                <button
                  className="dal-chicken-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`dal-chicken-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedDalChicken.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="dal-chicken-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedDalChicken.stepsRaw?.length || 0)}
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

export default RecipesDalChicken;