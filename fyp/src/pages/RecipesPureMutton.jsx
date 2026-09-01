import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesPureMutton.css';

const RecipesPureMutton = () => {
  const navigate = useNavigate();
  const [pureMuttonRecipes, setPureMuttonRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPureMutton, setSelectedPureMutton] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/pure-mutton?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch pure-mutton recipes');
        }
        return res.json();
      })
      .then(data => {
        setPureMuttonRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pure-mutton recipes:', error);
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
    if (selectedPureMutton && currentStep < selectedPureMutton.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedPureMutton.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedPureMutton && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedPureMutton.stepsRaw, currentStep - 2);
    }
  };

  const handlePureMuttonSelect = (pureMutton) => {
    setSelectedPureMutton(pureMutton);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedPureMutton(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="pure-mutton-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious pure-mutton recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pure-mutton-page">
      <header className="pure-mutton-header">
        <div className="pure-mutton-header-content">
          <h1 className="pure-mutton-page-title">Pure Mutton Recipes</h1>
          <p className="pure-mutton-page-description">
            Discover delicious pure mutton recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="pure-mutton-main">
        <div className="pure-mutton-grid-section">
          <div className="pure-mutton-grid">
            {pureMuttonRecipes.map(pureMutton => (
              <div
                key={pureMutton._id}
                className="pure-mutton-card"
                onClick={() => handlePureMuttonSelect(pureMutton)}
              >
                <div
                  className="pure-mutton-card-image"
                  style={{ backgroundImage: `url(${pureMutton.image})` }}
                ></div>
                <div className="pure-mutton-card-content">
                  <h3 className="pure-mutton-card-title">{pureMutton.title}</h3>
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

      {showDetailPanel && selectedPureMutton && (
        <div className="pure-mutton-modal-overlay" onClick={closeDetailPanel}>
          <div className="pure-mutton-modal" onClick={e => e.stopPropagation()}>
            <div className="pure-mutton-modal-hero">
              <div className="pure-mutton-modal-hero-left">
                <span className="pure-mutton-modal-tag">Pure Mutton Recipe</span>
                <h2 className="pure-mutton-modal-hero-title">{selectedPureMutton.title}</h2>
                {selectedPureMutton.tagline && (
                  <p className="pure-mutton-modal-hero-tagline">{selectedPureMutton.tagline}</p>
                )}
              </div>
              <div className="pure-mutton-modal-hero-right">
                <img
                  src={selectedPureMutton.image}
                  alt={selectedPureMutton.title}
                  className="pure-mutton-modal-hero-img"
                />
              </div>
              <button className="pure-mutton-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="pure-mutton-modal-body">
              <div className="pure-mutton-modal-col">
                <div className="pure-mutton-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="pure-mutton-modal-scroll">
                  {selectedPureMutton.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="pure-mutton-ingredient-item">
                      <span className="pure-mutton-ingredient-dot"></span>
                      <span className="pure-mutton-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pure-mutton-modal-col pure-mutton-modal-col--steps">
                <div className="pure-mutton-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="pure-mutton-modal-scroll">
                  {selectedPureMutton.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="pure-mutton-step-item">
                      <span className="pure-mutton-step-num">{idx + 1}</span>
                      <span className="pure-mutton-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pure-mutton-voice-bar">
              <div className="pure-mutton-voice-left">
                <i className="fas fa-volume-up pure-mutton-voice-icon"></i>
                <span className="pure-mutton-voice-label">Voice Guide</span>
              </div>

              <div className="pure-mutton-voice-progress">
                <div className="pure-mutton-progress-track">
                  <div className="pure-mutton-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="pure-mutton-progress-info">
                  <span>Step {currentStep} of {selectedPureMutton.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="pure-mutton-voice-controls">
                <button
                  className="pure-mutton-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`pure-mutton-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedPureMutton.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="pure-mutton-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedPureMutton.stepsRaw?.length || 0)}
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

export default RecipesPureMutton;