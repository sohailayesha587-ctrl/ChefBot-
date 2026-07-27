import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeDessertsPage.css';

const RecipeDessertsPage = () => {
  const navigate = useNavigate();
  const [dessertRecipes, setDessertRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/desserts?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch dessert recipes');
        }
        return res.json();
      })
      .then(data => {
        setDessertRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching dessert recipes:', error);
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
    if (selectedDessert && currentStep < selectedDessert.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedDessert.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedDessert && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedDessert.stepsRaw, currentStep - 2);
    }
  };

  const handleDessertSelect = (dessert) => {
    setSelectedDessert(dessert);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedDessert(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="desserts-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious dessert recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="desserts-page">
      <header className="desserts-header">
        <div className="desserts-header-content">
          <h1 className="desserts-page-title">Dessert Recipes</h1>
          <p className="desserts-page-description">
            Discover delicious dessert recipes with rich, flavorful, and sweet taste
          </p>
        </div>
      </header>

      <main className="desserts-main">
        <div className="desserts-grid-section">
          <div className="desserts-grid">
            {dessertRecipes.map(dessert => (
              <div
                key={dessert._id}
                className="desserts-card"
                onClick={() => handleDessertSelect(dessert)}
              >
                <div
                  className="desserts-card-image"
                  style={{ backgroundImage: `url(${dessert.image})` }}
                ></div>
                <div className="desserts-card-content">
                  <h3 className="desserts-card-title">{dessert.title}</h3>
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

      {showDetailPanel && selectedDessert && (
        <div className="desserts-modal-overlay" onClick={closeDetailPanel}>
          <div className="desserts-modal" onClick={e => e.stopPropagation()}>
            <div className="desserts-modal-hero">
              <div className="desserts-modal-hero-left">
                <span className="desserts-modal-tag">Dessert Recipe</span>
                <h2 className="desserts-modal-hero-title">{selectedDessert.title}</h2>
                {selectedDessert.tagline && (
                  <p className="desserts-modal-hero-tagline">{selectedDessert.tagline}</p>
                )}
              </div>
              <div className="desserts-modal-hero-right">
                <img
                  src={selectedDessert.image}
                  alt={selectedDessert.title}
                  className="desserts-modal-hero-img"
                />
              </div>
              <button className="desserts-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="desserts-modal-body">
              <div className="desserts-modal-col">
                <div className="desserts-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="desserts-modal-scroll">
                  {selectedDessert.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="desserts-ingredient-item">
                      <span className="desserts-ingredient-dot"></span>
                      <span className="desserts-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="desserts-modal-col desserts-modal-col--steps">
                <div className="desserts-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="desserts-modal-scroll">
                  {selectedDessert.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="desserts-step-item">
                      <span className="desserts-step-num">{idx + 1}</span>
                      <span className="desserts-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="desserts-voice-bar">
              <div className="desserts-voice-left">
                <i className="fas fa-volume-up desserts-voice-icon"></i>
                <span className="desserts-voice-label">Voice Guide</span>
              </div>

              <div className="desserts-voice-progress">
                <div className="desserts-progress-track">
                  <div className="desserts-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="desserts-progress-info">
                  <span>Step {currentStep} of {selectedDessert.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="desserts-voice-controls">
                <button
                  className="desserts-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`desserts-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedDessert.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="desserts-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedDessert.stepsRaw?.length || 0)}
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

export default RecipeDessertsPage;