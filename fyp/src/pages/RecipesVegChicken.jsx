import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesVegChicken.css';

const RecipesVegChicken = () => {
  const navigate = useNavigate();
  const [vegChickenRecipes, setVegChickenRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVegChicken, setSelectedVegChicken] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/veg-chicken?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch veg-chicken recipes');
        }
        return res.json();
      })
      .then(data => {
        setVegChickenRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching veg-chicken recipes:', error);
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
    if (selectedVegChicken && currentStep < selectedVegChicken.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedVegChicken.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedVegChicken && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedVegChicken.stepsRaw, currentStep - 2);
    }
  };

  const handleVegChickenSelect = (vegChicken) => {
    setSelectedVegChicken(vegChicken);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedVegChicken(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="veg-chicken-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious veg-chicken recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="veg-chicken-page">
      <header className="veg-chicken-header">
        <div className="veg-chicken-header-content">
          <h1 className="veg-chicken-page-title">Veg & Chicken Recipes</h1>
          <p className="veg-chicken-page-description">
            Discover delicious veg and chicken recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="veg-chicken-main">
        <div className="veg-chicken-grid-section">
          <div className="veg-chicken-grid">
            {vegChickenRecipes.map(vegChicken => (
              <div
                key={vegChicken._id}
                className="veg-chicken-card"
                onClick={() => handleVegChickenSelect(vegChicken)}
              >
                <div
                  className="veg-chicken-card-image"
                  style={{ backgroundImage: `url(${vegChicken.image})` }}
                ></div>
                <div className="veg-chicken-card-content">
                  <h3 className="veg-chicken-card-title">{vegChicken.title}</h3>
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

      {showDetailPanel && selectedVegChicken && (
        <div className="veg-chicken-modal-overlay" onClick={closeDetailPanel}>
          <div className="veg-chicken-modal" onClick={e => e.stopPropagation()}>
            <div className="veg-chicken-modal-hero">
              <div className="veg-chicken-modal-hero-left">
                <span className="veg-chicken-modal-tag">Veg & Chicken Recipe</span>
                <h2 className="veg-chicken-modal-hero-title">{selectedVegChicken.title}</h2>
                {selectedVegChicken.tagline && (
                  <p className="veg-chicken-modal-hero-tagline">{selectedVegChicken.tagline}</p>
                )}
              </div>
              <div className="veg-chicken-modal-hero-right">
                <img
                  src={selectedVegChicken.image}
                  alt={selectedVegChicken.title}
                  className="veg-chicken-modal-hero-img"
                />
              </div>
              <button className="veg-chicken-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="veg-chicken-modal-body">
              <div className="veg-chicken-modal-col">
                <div className="veg-chicken-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="veg-chicken-modal-scroll">
                  {selectedVegChicken.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="veg-chicken-ingredient-item">
                      <span className="veg-chicken-ingredient-dot"></span>
                      <span className="veg-chicken-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="veg-chicken-modal-col veg-chicken-modal-col--steps">
                <div className="veg-chicken-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="veg-chicken-modal-scroll">
                  {selectedVegChicken.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="veg-chicken-step-item">
                      <span className="veg-chicken-step-num">{idx + 1}</span>
                      <span className="veg-chicken-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="veg-chicken-voice-bar">
              <div className="veg-chicken-voice-left">
                <i className="fas fa-volume-up veg-chicken-voice-icon"></i>
                <span className="veg-chicken-voice-label">Voice Guide</span>
              </div>

              <div className="veg-chicken-voice-progress">
                <div className="veg-chicken-progress-track">
                  <div className="veg-chicken-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="veg-chicken-progress-info">
                  <span>Step {currentStep} of {selectedVegChicken.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="veg-chicken-voice-controls">
                <button
                  className="veg-chicken-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`veg-chicken-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedVegChicken.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="veg-chicken-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedVegChicken.stepsRaw?.length || 0)}
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

export default RecipesVegChicken;