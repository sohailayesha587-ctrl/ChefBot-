import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesRice.css';

const RecipesRice = () => {
  const navigate = useNavigate();
  const [riceRecipes, setRiceRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRice, setSelectedRice] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/rice?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch rice recipes');
        }
        return res.json();
      })
      .then(data => {
        setRiceRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching rice recipes:', error);
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
    if (selectedRice && currentStep < selectedRice.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedRice.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedRice && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedRice.stepsRaw, currentStep - 2);
    }
  };

  const handleRiceSelect = (rice) => {
    setSelectedRice(rice);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedRice(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="rice-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious rice recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rice-page">
      <header className="rice-header">
        <div className="rice-header-content">
          <h1 className="rice-page-title">Rice Recipes</h1>
          <p className="rice-page-description">
            Discover delicious rice recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="rice-main">
        <div className="rice-grid-section">
          <div className="rice-grid">
            {riceRecipes.map(rice => (
              <div
                key={rice._id}
                className="rice-card"
                onClick={() => handleRiceSelect(rice)}
              >
                <div
                  className="rice-card-image"
                  style={{ backgroundImage: `url(${rice.image})` }}
                ></div>
                <div className="rice-card-content">
                  <h3 className="rice-card-title">{rice.title}</h3>
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

      {showDetailPanel && selectedRice && (
        <div className="rice-modal-overlay" onClick={closeDetailPanel}>
          <div className="rice-modal" onClick={e => e.stopPropagation()}>
            <div className="rice-modal-hero">
              <div className="rice-modal-hero-left">
                <span className="rice-modal-tag">Rice Recipe</span>
                <h2 className="rice-modal-hero-title">{selectedRice.title}</h2>
                {selectedRice.tagline && (
                  <p className="rice-modal-hero-tagline">{selectedRice.tagline}</p>
                )}
              </div>
              <div className="rice-modal-hero-right">
                <img
                  src={selectedRice.image}
                  alt={selectedRice.title}
                  className="rice-modal-hero-img"
                />
              </div>
              <button className="rice-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="rice-modal-body">
              <div className="rice-modal-col">
                <div className="rice-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="rice-modal-scroll">
                  {selectedRice.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="rice-ingredient-item">
                      <span className="rice-ingredient-dot"></span>
                      <span className="rice-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rice-modal-col rice-modal-col--steps">
                <div className="rice-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="rice-modal-scroll">
                  {selectedRice.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="rice-step-item">
                      <span className="rice-step-num">{idx + 1}</span>
                      <span className="rice-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rice-voice-bar">
              <div className="rice-voice-left">
                <i className="fas fa-volume-up rice-voice-icon"></i>
                <span className="rice-voice-label">Voice Guide</span>
              </div>

              <div className="rice-voice-progress">
                <div className="rice-progress-track">
                  <div className="rice-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="rice-progress-info">
                  <span>Step {currentStep} of {selectedRice.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="rice-voice-controls">
                <button
                  className="rice-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`rice-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRice.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="rice-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedRice.stepsRaw?.length || 0)}
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

export default RecipesRice;