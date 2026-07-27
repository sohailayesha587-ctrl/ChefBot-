import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesBread.css';

const RecipesBread = () => {
  const navigate = useNavigate();
  const [breadRecipes, setBreadRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBread, setSelectedBread] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/bread?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch bread recipes');
        }
        return res.json();
      })
      .then(data => {
        setBreadRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bread recipes:', error);
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
    if (selectedBread && currentStep < selectedBread.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedBread.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedBread && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedBread.stepsRaw, currentStep - 2);
    }
  };

  const handleBreadSelect = (bread) => {
    setSelectedBread(bread);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedBread(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="bread-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious bread recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bread-page">
      <header className="bread-header">
        <div className="bread-header-content">
          <h1 className="bread-page-title">Bread Recipes</h1>
          <p className="bread-page-description">
            Discover delicious bread recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="bread-main">
        <div className="bread-grid-section">
          <div className="bread-grid">
            {breadRecipes.map(bread => (
              <div
                key={bread._id}
                className="bread-card"
                onClick={() => handleBreadSelect(bread)}
              >
                <div
                  className="bread-card-image"
                  style={{ backgroundImage: `url(${bread.image})` }}
                ></div>
                <div className="bread-card-content">
                  <h3 className="bread-card-title">{bread.title}</h3>
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

      {showDetailPanel && selectedBread && (
        <div className="bread-modal-overlay" onClick={closeDetailPanel}>
          <div className="bread-modal" onClick={e => e.stopPropagation()}>
            <div className="bread-modal-hero">
              <div className="bread-modal-hero-left">
                <span className="bread-modal-tag">Bread Recipe</span>
                <h2 className="bread-modal-hero-title">{selectedBread.title}</h2>
                {selectedBread.tagline && (
                  <p className="bread-modal-hero-tagline">{selectedBread.tagline}</p>
                )}
              </div>
              <div className="bread-modal-hero-right">
                <img
                  src={selectedBread.image}
                  alt={selectedBread.title}
                  className="bread-modal-hero-img"
                />
              </div>
              <button className="bread-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="bread-modal-body">
              <div className="bread-modal-col">
                <div className="bread-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="bread-modal-scroll">
                  {selectedBread.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="bread-ingredient-item">
                      <span className="bread-ingredient-dot"></span>
                      <span className="bread-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bread-modal-col bread-modal-col--steps">
                <div className="bread-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="bread-modal-scroll">
                  {selectedBread.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="bread-step-item">
                      <span className="bread-step-num">{idx + 1}</span>
                      <span className="bread-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bread-voice-bar">
              <div className="bread-voice-left">
                <i className="fas fa-volume-up bread-voice-icon"></i>
                <span className="bread-voice-label">Voice Guide</span>
              </div>

              <div className="bread-voice-progress">
                <div className="bread-progress-track">
                  <div className="bread-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="bread-progress-info">
                  <span>Step {currentStep} of {selectedBread.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="bread-voice-controls">
                <button
                  className="bread-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`bread-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedBread.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="bread-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedBread.stepsRaw?.length || 0)}
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

export default RecipesBread;