import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesPureChicken.css';

const RecipesPureChicken = () => {
  const navigate = useNavigate();
  const [pureChickenRecipes, setPureChickenRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPureChicken, setSelectedPureChicken] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/pure-chicken?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch pure-chicken recipes');
        }
        return res.json();
      })
      .then(data => {
        setPureChickenRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pure-chicken recipes:', error);
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
    if (selectedPureChicken && currentStep < selectedPureChicken.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedPureChicken.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedPureChicken && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedPureChicken.stepsRaw, currentStep - 2);
    }
  };

  const handlePureChickenSelect = (pureChicken) => {
    setSelectedPureChicken(pureChicken);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedPureChicken(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="pure-chicken-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious pure-chicken recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pure-chicken-page">
      <header className="pure-chicken-header">
        <div className="pure-chicken-header-content">
          <h1 className="pure-chicken-page-title">Pure Chicken Recipes</h1>
          <p className="pure-chicken-page-description">
            Discover delicious pure chicken recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="pure-chicken-main">
        <div className="pure-chicken-grid-section">
          <div className="pure-chicken-grid">
            {pureChickenRecipes.map(pureChicken => (
              <div
                key={pureChicken._id}
                className="pure-chicken-card"
                onClick={() => handlePureChickenSelect(pureChicken)}
              >
                <div
                  className="pure-chicken-card-image"
                  style={{ backgroundImage: `url(${pureChicken.image})` }}
                ></div>
                <div className="pure-chicken-card-content">
                  <h3 className="pure-chicken-card-title">{pureChicken.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back to Recipes
        </button>
      </div>

      {showDetailPanel && selectedPureChicken && (
        <div className="pure-chicken-modal-overlay" onClick={closeDetailPanel}>
          <div className="pure-chicken-modal" onClick={e => e.stopPropagation()}>
            <div className="pure-chicken-modal-hero">
              <div className="pure-chicken-modal-hero-left">
                <span className="pure-chicken-modal-tag">Pure Chicken Recipe</span>
                <h2 className="pure-chicken-modal-hero-title">{selectedPureChicken.title}</h2>
                {selectedPureChicken.tagline && (
                  <p className="pure-chicken-modal-hero-tagline">{selectedPureChicken.tagline}</p>
                )}
              </div>
              <div className="pure-chicken-modal-hero-right">
                <img
                  src={selectedPureChicken.image}
                  alt={selectedPureChicken.title}
                  className="pure-chicken-modal-hero-img"
                />
              </div>
              <button className="pure-chicken-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="pure-chicken-modal-body">
              <div className="pure-chicken-modal-col">
                <div className="pure-chicken-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="pure-chicken-modal-scroll">
                  {selectedPureChicken.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="pure-chicken-ingredient-item">
                      <span className="pure-chicken-ingredient-dot"></span>
                      <span className="pure-chicken-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pure-chicken-modal-col pure-chicken-modal-col--steps">
                <div className="pure-chicken-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="pure-chicken-modal-scroll">
                  {selectedPureChicken.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="pure-chicken-step-item">
                      <span className="pure-chicken-step-num">{idx + 1}</span>
                      <span className="pure-chicken-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pure-chicken-voice-bar">
              <div className="pure-chicken-voice-left">
                <i className="fas fa-volume-up pure-chicken-voice-icon"></i>
                <span className="pure-chicken-voice-label">Voice Guide</span>
              </div>

              <div className="pure-chicken-voice-progress">
                <div className="pure-chicken-progress-track">
                  <div className="pure-chicken-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="pure-chicken-progress-info">
                  <span>Step {currentStep} of {selectedPureChicken.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="pure-chicken-voice-controls">
                <button
                  className="pure-chicken-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`pure-chicken-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedPureChicken.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="pure-chicken-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedPureChicken.stepsRaw?.length || 0)}
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

export default RecipesPureChicken;