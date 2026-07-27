import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeBeveragePage.css';

const RecipeBeveragePage = () => {
  const navigate = useNavigate();
  const [beverageRecipes, setBeverageRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBeverage, setSelectedBeverage] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/beverages?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch beverage recipes');
        }
        return res.json();
      })
      .then(data => {
        setBeverageRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching beverage recipes:', error);
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
    if (selectedBeverage && currentStep < selectedBeverage.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedBeverage.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedBeverage && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedBeverage.stepsRaw, currentStep - 2);
    }
  };

  const handleBeverageSelect = (beverage) => {
    setSelectedBeverage(beverage);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedBeverage(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="beverages-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious beverage recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="beverages-page">
      <header className="beverages-header">
        <div className="beverages-header-content">
          <h1 className="beverages-page-title">Beverage Recipes</h1>
          <p className="beverages-page-description">
            Discover delicious beverage recipes with rich, flavorful, and refreshing taste
          </p>
        </div>
      </header>

      <main className="beverages-main">
        <div className="beverages-grid-section">
          <div className="beverages-grid">
            {beverageRecipes.map(beverage => (
              <div
                key={beverage._id}
                className="beverages-card"
                onClick={() => handleBeverageSelect(beverage)}
              >
                <div
                  className="beverages-card-image"
                  style={{ backgroundImage: `url(${beverage.image})` }}
                ></div>
                <div className="beverages-card-content">
                  <h3 className="beverages-card-title">{beverage.title}</h3>
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

      {showDetailPanel && selectedBeverage && (
        <div className="beverages-modal-overlay" onClick={closeDetailPanel}>
          <div className="beverages-modal" onClick={e => e.stopPropagation()}>
            <div className="beverages-modal-hero">
              <div className="beverages-modal-hero-left">
                <span className="beverages-modal-tag">Beverage Recipe</span>
                <h2 className="beverages-modal-hero-title">{selectedBeverage.title}</h2>
                {selectedBeverage.tagline && (
                  <p className="beverages-modal-hero-tagline">{selectedBeverage.tagline}</p>
                )}
              </div>
              <div className="beverages-modal-hero-right">
                <img
                  src={selectedBeverage.image}
                  alt={selectedBeverage.title}
                  className="beverages-modal-hero-img"
                />
              </div>
              <button className="beverages-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="beverages-modal-body">
              <div className="beverages-modal-col">
                <div className="beverages-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="beverages-modal-scroll">
                  {selectedBeverage.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="beverages-ingredient-item">
                      <span className="beverages-ingredient-dot"></span>
                      <span className="beverages-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="beverages-modal-col beverages-modal-col--steps">
                <div className="beverages-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="beverages-modal-scroll">
                  {selectedBeverage.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="beverages-step-item">
                      <span className="beverages-step-num">{idx + 1}</span>
                      <span className="beverages-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="beverages-voice-bar">
              <div className="beverages-voice-left">
                <i className="fas fa-volume-up beverages-voice-icon"></i>
                <span className="beverages-voice-label">Voice Guide</span>
              </div>

              <div className="beverages-voice-progress">
                <div className="beverages-progress-track">
                  <div className="beverages-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="beverages-progress-info">
                  <span>Step {currentStep} of {selectedBeverage.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="beverages-voice-controls">
                <button
                  className="beverages-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`beverages-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedBeverage.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="beverages-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedBeverage.stepsRaw?.length || 0)}
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

export default RecipeBeveragePage;