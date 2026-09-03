import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesEggDishes.css';

const RecipesEggDishes = () => {
  const navigate = useNavigate();
  const [eggRecipes, setEggRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEgg, setSelectedEgg] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/egg-dishes?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch egg recipes');
        }
        return res.json();
      })
      .then(data => {
        setEggRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching egg recipes:', error);
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
    if (selectedEgg && currentStep < selectedEgg.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedEgg.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedEgg && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedEgg.stepsRaw, currentStep - 2);
    }
  };

  const handleEggSelect = (egg) => {
    setSelectedEgg(egg);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedEgg(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="egg-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious egg recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="egg-page">
      <header className="egg-header">
        <div className="egg-header-content">
          <h1 className="egg-page-title">Egg Recipes</h1>
          <p className="egg-page-description">
            Discover delicious egg recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="egg-main">
        <div className="egg-grid-section">
          <div className="egg-grid">
            {eggRecipes.map(egg => (
              <div
                key={egg._id}
                className="egg-card"
                onClick={() => handleEggSelect(egg)}
              >
                <div
                  className="egg-card-image"
                  style={{ backgroundImage: `url(${egg.image})` }}
                ></div>
                <div className="egg-card-content">
                  <h3 className="egg-card-title">{egg.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/recipes')}>
          <span>←</span> Back to Recipes
        </button>
      </div>

      {showDetailPanel && selectedEgg && (
        <div className="egg-modal-overlay" onClick={closeDetailPanel}>
          <div className="egg-modal" onClick={e => e.stopPropagation()}>
            <div className="egg-modal-hero">
              <div className="egg-modal-hero-left">
                <span className="egg-modal-tag">Egg Recipe</span>
                <h2 className="egg-modal-hero-title">{selectedEgg.title}</h2>
                {selectedEgg.tagline && (
                  <p className="egg-modal-hero-tagline">{selectedEgg.tagline}</p>
                )}
              </div>
              <div className="egg-modal-hero-right">
                <img
                  src={selectedEgg.image}
                  alt={selectedEgg.title}
                  className="egg-modal-hero-img"
                />
              </div>
              <button className="egg-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="egg-modal-body">
              <div className="egg-modal-col">
                <div className="egg-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="egg-modal-scroll">
                  {selectedEgg.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="egg-ingredient-item">
                      <span className="egg-ingredient-dot"></span>
                      <span className="egg-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="egg-modal-col egg-modal-col--steps">
                <div className="egg-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="egg-modal-scroll">
                  {selectedEgg.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="egg-step-item">
                      <span className="egg-step-num">{idx + 1}</span>
                      <span className="egg-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="egg-voice-bar">
              <div className="egg-voice-left">
                <i className="fas fa-volume-up egg-voice-icon"></i>
                <span className="egg-voice-label">Voice Guide</span>
              </div>

              <div className="egg-voice-progress">
                <div className="egg-progress-track">
                  <div className="egg-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="egg-progress-info">
                  <span>Step {currentStep} of {selectedEgg.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="egg-voice-controls">
                <button
                  className="egg-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`egg-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedEgg.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="egg-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedEgg.stepsRaw?.length || 0)}
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

export default RecipesEggDishes;