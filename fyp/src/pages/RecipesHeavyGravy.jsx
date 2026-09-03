import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesHeavyGravy.css';

const RecipesHeavyGravy = () => {
  const navigate = useNavigate();
  const [heavyGravyRecipes, setHeavyGravyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHeavyGravy, setSelectedHeavyGravy] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/heavy-gravy?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch heavy gravy recipes');
        }
        return res.json();
      })
      .then(data => {
        setHeavyGravyRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching heavy gravy recipes:', error);
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
    if (selectedHeavyGravy && currentStep < selectedHeavyGravy.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedHeavyGravy.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedHeavyGravy && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedHeavyGravy.stepsRaw, currentStep - 2);
    }
  };

  const handleHeavyGravySelect = (heavyGravy) => {
    setSelectedHeavyGravy(heavyGravy);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedHeavyGravy(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="heavy-gravy-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious heavy gravy recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="heavy-gravy-page">
      <header className="heavy-gravy-header">
        <div className="heavy-gravy-header-content">
          <h1 className="heavy-gravy-page-title">Heavy Gravy Recipes</h1>
          <p className="heavy-gravy-page-description">
            Discover delicious heavy gravy recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="heavy-gravy-main">
        <div className="heavy-gravy-grid-section">
          <div className="heavy-gravy-grid">
            {heavyGravyRecipes.map(heavyGravy => (
              <div
                key={heavyGravy._id}
                className="heavy-gravy-card"
                onClick={() => handleHeavyGravySelect(heavyGravy)}
              >
                <div
                  className="heavy-gravy-card-image"
                  style={{ backgroundImage: `url(${heavyGravy.image})` }}
                ></div>
                <div className="heavy-gravy-card-content">
                  <h3 className="heavy-gravy-card-title">{heavyGravy.title}</h3>
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

      {showDetailPanel && selectedHeavyGravy && (
        <div className="heavy-gravy-modal-overlay" onClick={closeDetailPanel}>
          <div className="heavy-gravy-modal" onClick={e => e.stopPropagation()}>
            <div className="heavy-gravy-modal-hero">
              <div className="heavy-gravy-modal-hero-left">
                <span className="heavy-gravy-modal-tag">Heavy Gravy Recipe</span>
                <h2 className="heavy-gravy-modal-hero-title">{selectedHeavyGravy.title}</h2>
                {selectedHeavyGravy.tagline && (
                  <p className="heavy-gravy-modal-hero-tagline">{selectedHeavyGravy.tagline}</p>
                )}
              </div>
              <div className="heavy-gravy-modal-hero-right">
                <img
                  src={selectedHeavyGravy.image}
                  alt={selectedHeavyGravy.title}
                  className="heavy-gravy-modal-hero-img"
                />
              </div>
              <button className="heavy-gravy-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="heavy-gravy-modal-body">
              <div className="heavy-gravy-modal-col">
                <div className="heavy-gravy-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="heavy-gravy-modal-scroll">
                  {selectedHeavyGravy.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="heavy-gravy-ingredient-item">
                      <span className="heavy-gravy-ingredient-dot"></span>
                      <span className="heavy-gravy-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="heavy-gravy-modal-col heavy-gravy-modal-col--steps">
                <div className="heavy-gravy-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="heavy-gravy-modal-scroll">
                  {selectedHeavyGravy.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="heavy-gravy-step-item">
                      <span className="heavy-gravy-step-num">{idx + 1}</span>
                      <span className="heavy-gravy-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="heavy-gravy-voice-bar">
              <div className="heavy-gravy-voice-left">
                <i className="fas fa-volume-up heavy-gravy-voice-icon"></i>
                <span className="heavy-gravy-voice-label">Voice Guide</span>
              </div>

              <div className="heavy-gravy-voice-progress">
                <div className="heavy-gravy-progress-track">
                  <div className="heavy-gravy-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="heavy-gravy-progress-info">
                  <span>Step {currentStep} of {selectedHeavyGravy.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="heavy-gravy-voice-controls">
                <button
                  className="heavy-gravy-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`heavy-gravy-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedHeavyGravy.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="heavy-gravy-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedHeavyGravy.stepsRaw?.length || 0)}
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

export default RecipesHeavyGravy;