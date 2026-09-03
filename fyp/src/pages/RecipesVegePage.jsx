import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesVegePage.css';

const RecipesVegePage = () => {
  const navigate = useNavigate();
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/plain-vegetables?limit=200')
      .then(res => res.json())
      .then(data => {
        setVegetables(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching vegetable recipes:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
        speechRef.current = null;
      }
    };
  }, []);

  const speakInstructions = (steps, stepIndex = 0) => {
    if (!steps || steps.length === 0) return;

    if ('speechSynthesis' in window) {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Step ${stepIndex + 1}: ${steps[stepIndex]}`;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = 'en-US';

      setCurrentStep(stepIndex + 1);
      setProgress(((stepIndex + 1) / steps.length) * 100);
      setIsPlaying(true);

      utterance.onend = () => {
        setIsPlaying(false);
        speechRef.current = null;

        if (stepIndex + 1 < steps.length) {
          setTimeout(() => {
            speakInstructions(steps, stepIndex + 1);
          }, 1500);
        }
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        speechRef.current = null;
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && speechRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      speechRef.current = null;
    }
  };

  const speakNextStep = () => {
    if (selectedVegetable && currentStep < selectedVegetable.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedVegetable.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedVegetable && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedVegetable.stepsRaw, currentStep - 2);
    }
  };

  const handleVegetableSelect = (vegetable) => {
    setSelectedVegetable(vegetable);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedVegetable(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="vegetables-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious vegetable recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vegetables-page">
      <header className="vegetables-header">
        <div className="vegetables-header-content">
          <h1 className="vegetables-page-title">Plain Vegetables</h1>
          <p className="vegetables-page-description">
            Discover traditional Pakistani vegetable recipes - simple, healthy, and homestyle taste
          </p>
        </div>
      </header>

      <main className="vegetables-main">
        <div className="vegetables-grid-section">
          <div className="vegetables-grid">
            {vegetables.map(vegetable => (
              <div
                key={vegetable._id}
                className="vegetables-card"
                onClick={() => handleVegetableSelect(vegetable)}
              >
                <div
                  className="vegetables-card-image"
                  style={{ backgroundImage: `url(${vegetable.image})` }}
                ></div>
                <div className="vegetables-card-content">
                  <h3 className="vegetables-card-title">{vegetable.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/recipes')}>
          Back to Recipes
        </button>
      </div>

      {showDetailPanel && selectedVegetable && (
        <div className="vegetables-modal-overlay" onClick={closeDetailPanel}>
          <div className="vegetables-modal" onClick={e => e.stopPropagation()}>
            <div className="veg-modal-hero">
              <div className="veg-modal-hero-left">
                <span className="veg-modal-tag">Vegetable Recipe</span>
                <h2 className="veg-modal-hero-title">{selectedVegetable.title}</h2>
                {selectedVegetable.tagline && (
                  <p className="veg-modal-hero-tagline">{selectedVegetable.tagline}</p>
                )}
              </div>

              <div className="veg-modal-hero-right">
                <img
                  src={selectedVegetable.image}
                  alt={selectedVegetable.title}
                  className="veg-modal-hero-img"
                />
              </div>

              <button className="vegetables-modal-close" onClick={closeDetailPanel}>
                ×
              </button>
            </div>

            <div className="veg-modal-body">
              <div className="veg-modal-col">
                <div className="veg-modal-col-header">
                  <h3>Ingredients</h3>
                </div>
                <div className="veg-modal-scroll">
                  {selectedVegetable.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="veg-ingredient-item">
                      <span className="veg-ingredient-dot"></span>
                      <span className="veg-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="veg-modal-col veg-modal-col--steps">
                <div className="veg-modal-col-header">
                  <h3>Steps to Make</h3>
                </div>
                <div className="veg-modal-scroll">
                  {selectedVegetable.stepsRaw?.map((step, idx) => (
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
                <span className="veg-voice-label">Voice Guide</span>
              </div>

              <div className="veg-voice-progress">
                <div className="veg-progress-track">
                  <div className="veg-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="veg-progress-info">
                  <span>Step {currentStep} of {selectedVegetable.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="veg-voice-controls">
                <button
                  className="veg-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  Prev
                </button>
                <button
                  className={`veg-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedVegetable.stepsRaw)}
                >
                  {isPlaying ? 'Stop' : 'Start'}
                </button>
                <button
                  className="veg-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedVegetable.stepsRaw?.length || 0)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesVegePage;