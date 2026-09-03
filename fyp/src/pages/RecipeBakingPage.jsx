import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeBakingPage.css';

const RecipeBakingPage = () => {
  const navigate = useNavigate();
  const [bakingRecipes, setBakingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBaking, setSelectedBaking] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/baking?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch baking recipes');
        }
        return res.json();
      })
      .then(data => {
        setBakingRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching baking recipes:', error);
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
    if (selectedBaking && currentStep < selectedBaking.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedBaking.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedBaking && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedBaking.stepsRaw, currentStep - 2);
    }
  };

  const handleBakingSelect = (baking) => {
    setSelectedBaking(baking);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedBaking(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="baking-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious baking recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="baking-page">
      <header className="baking-header">
        <div className="baking-header-content">
          <h1 className="baking-page-title">Baking Recipes</h1>
          <p className="baking-page-description">
            Discover delicious baking recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="baking-main">
        <div className="baking-grid-section">
          <div className="baking-grid">
            {bakingRecipes.map(baking => (
              <div
                key={baking._id}
                className="baking-card"
                onClick={() => handleBakingSelect(baking)}
              >
                <div
                  className="baking-card-image"
                  style={{ backgroundImage: `url(${baking.image})` }}
                ></div>
                <div className="baking-card-content">
                  <h3 className="baking-card-title">{baking.title}</h3>
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

      {showDetailPanel && selectedBaking && (
        <div className="baking-modal-overlay" onClick={closeDetailPanel}>
          <div className="baking-modal" onClick={e => e.stopPropagation()}>
            <div className="baking-modal-hero">
              <div className="baking-modal-hero-left">
                <span className="baking-modal-tag">Baking Recipe</span>
                <h2 className="baking-modal-hero-title">{selectedBaking.title}</h2>
                {selectedBaking.tagline && (
                  <p className="baking-modal-hero-tagline">{selectedBaking.tagline}</p>
                )}
              </div>
              <div className="baking-modal-hero-right">
                <img
                  src={selectedBaking.image}
                  alt={selectedBaking.title}
                  className="baking-modal-hero-img"
                />
              </div>
              <button className="baking-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="baking-modal-body">
              <div className="baking-modal-col">
                <div className="baking-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="baking-modal-scroll">
                  {selectedBaking.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="baking-ingredient-item">
                      <span className="baking-ingredient-dot"></span>
                      <span className="baking-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="baking-modal-col baking-modal-col--steps">
                <div className="baking-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="baking-modal-scroll">
                  {selectedBaking.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="baking-step-item">
                      <span className="baking-step-num">{idx + 1}</span>
                      <span className="baking-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="baking-voice-bar">
              <div className="baking-voice-left">
                <i className="fas fa-volume-up baking-voice-icon"></i>
                <span className="baking-voice-label">Voice Guide</span>
              </div>

              <div className="baking-voice-progress">
                <div className="baking-progress-track">
                  <div className="baking-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="baking-progress-info">
                  <span>Step {currentStep} of {selectedBaking.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="baking-voice-controls">
                <button
                  className="baking-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`baking-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedBaking.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="baking-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedBaking.stepsRaw?.length || 0)}
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

export default RecipeBakingPage;