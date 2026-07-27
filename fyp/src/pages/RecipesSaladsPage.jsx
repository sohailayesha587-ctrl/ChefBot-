import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesSaladsPage.css';

const RecipesSaladsPage = () => {
  const navigate = useNavigate();
  const [saladRecipes, setSaladRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSalad, setSelectedSalad] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/salads?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch salad recipes');
        }
        return res.json();
      })
      .then(data => {
        setSaladRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching salad recipes:', error);
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
    if (selectedSalad && currentStep < selectedSalad.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedSalad.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedSalad && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedSalad.stepsRaw, currentStep - 2);
    }
  };

  const handleSaladSelect = (salad) => {
    setSelectedSalad(salad);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedSalad(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="salad-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious salad recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="salad-page">
      <header className="salad-header">
        <div className="salad-header-content">
          <h1 className="salad-page-title">Salad Recipes</h1>
          <p className="salad-page-description">
            Discover delicious salad recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="salad-main">
        <div className="salad-grid-section">
          <div className="salad-grid">
            {saladRecipes.map(salad => (
              <div
                key={salad._id}
                className="salad-card"
                onClick={() => handleSaladSelect(salad)}
              >
                <div
                  className="salad-card-image"
                  style={{ backgroundImage: `url(${salad.image})` }}
                ></div>
                <div className="salad-card-content">
                  <h3 className="salad-card-title">{salad.title}</h3>
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

      {showDetailPanel && selectedSalad && (
        <div className="salad-modal-overlay" onClick={closeDetailPanel}>
          <div className="salad-modal" onClick={e => e.stopPropagation()}>
            <div className="salad-modal-hero">
              <div className="salad-modal-hero-left">
                <span className="salad-modal-tag">Salad Recipe</span>
                <h2 className="salad-modal-hero-title">{selectedSalad.title}</h2>
                {selectedSalad.tagline && (
                  <p className="salad-modal-hero-tagline">{selectedSalad.tagline}</p>
                )}
              </div>
              <div className="salad-modal-hero-right">
                <img
                  src={selectedSalad.image}
                  alt={selectedSalad.title}
                  className="salad-modal-hero-img"
                />
              </div>
              <button className="salad-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="salad-modal-body">
              <div className="salad-modal-col">
                <div className="salad-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="salad-modal-scroll">
                  {selectedSalad.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="salad-ingredient-item">
                      <span className="salad-ingredient-dot"></span>
                      <span className="salad-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="salad-modal-col salad-modal-col--steps">
                <div className="salad-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="salad-modal-scroll">
                  {selectedSalad.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="salad-step-item">
                      <span className="salad-step-num">{idx + 1}</span>
                      <span className="salad-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="salad-voice-bar">
              <div className="salad-voice-left">
                <i className="fas fa-volume-up salad-voice-icon"></i>
                <span className="salad-voice-label">Voice Guide</span>
              </div>

              <div className="salad-voice-progress">
                <div className="salad-progress-track">
                  <div className="salad-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="salad-progress-info">
                  <span>Step {currentStep} of {selectedSalad.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="salad-voice-controls">
                <button
                  className="salad-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`salad-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedSalad.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="salad-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedSalad.stepsRaw?.length || 0)}
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

export default RecipesSaladsPage;