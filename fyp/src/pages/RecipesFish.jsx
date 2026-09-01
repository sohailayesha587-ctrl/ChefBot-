import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesFish.css';

const RecipesFish = () => {
  const navigate = useNavigate();
  const [fishRecipes, setFishRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFish, setSelectedFish] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/fish-dish?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch fish recipes');
        }
        return res.json();
      })
      .then(data => {
        setFishRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching fish recipes:', error);
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
    if (selectedFish && currentStep < selectedFish.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedFish.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedFish && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedFish.stepsRaw, currentStep - 2);
    }
  };

  const handleFishSelect = (fish) => {
    setSelectedFish(fish);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedFish(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="fish-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious fish recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fish-page">
      <header className="fish-header">
        <div className="fish-header-content">
          <h1 className="fish-page-title">Fish Recipes</h1>
          <p className="fish-page-description">
            Discover delicious fish recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="fish-main">
        <div className="fish-grid-section">
          <div className="fish-grid">
            {fishRecipes.map(fish => (
              <div
                key={fish._id}
                className="fish-card"
                onClick={() => handleFishSelect(fish)}
              >
                <div
                  className="fish-card-image"
                  style={{ backgroundImage: `url(${fish.image})` }}
                ></div>
                <div className="fish-card-content">
                  <h3 className="fish-card-title">{fish.title}</h3>
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

      {showDetailPanel && selectedFish && (
        <div className="fish-modal-overlay" onClick={closeDetailPanel}>
          <div className="fish-modal" onClick={e => e.stopPropagation()}>
            <div className="fish-modal-hero">
              <div className="fish-modal-hero-left">
                <span className="fish-modal-tag">Fish Recipe</span>
                <h2 className="fish-modal-hero-title">{selectedFish.title}</h2>
                {selectedFish.tagline && (
                  <p className="fish-modal-hero-tagline">{selectedFish.tagline}</p>
                )}
              </div>
              <div className="fish-modal-hero-right">
                <img
                  src={selectedFish.image}
                  alt={selectedFish.title}
                  className="fish-modal-hero-img"
                />
              </div>
              <button className="fish-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="fish-modal-body">
              <div className="fish-modal-col">
                <div className="fish-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="fish-modal-scroll">
                  {selectedFish.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="fish-ingredient-item">
                      <span className="fish-ingredient-dot"></span>
                      <span className="fish-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fish-modal-col fish-modal-col--steps">
                <div className="fish-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="fish-modal-scroll">
                  {selectedFish.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="fish-step-item">
                      <span className="fish-step-num">{idx + 1}</span>
                      <span className="fish-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="fish-voice-bar">
              <div className="fish-voice-left">
                <i className="fas fa-volume-up fish-voice-icon"></i>
                <span className="fish-voice-label">Voice Guide</span>
              </div>

              <div className="fish-voice-progress">
                <div className="fish-progress-track">
                  <div className="fish-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="fish-progress-info">
                  <span>Step {currentStep} of {selectedFish.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="fish-voice-controls">
                <button
                  className="fish-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`fish-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedFish.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="fish-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedFish.stepsRaw?.length || 0)}
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

export default RecipesFish;