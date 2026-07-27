import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeQuickPage.css';

const RecipeQuickPage = () => {
  const navigate = useNavigate();
  const [quickRecipes, setQuickRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuick, setSelectedQuick] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/quick?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch quick recipes');
        }
        return res.json();
      })
      .then(data => {
        setQuickRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quick recipes:', error);
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
    if (selectedQuick && currentStep < selectedQuick.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedQuick.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedQuick && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedQuick.stepsRaw, currentStep - 2);
    }
  };

  const handleQuickSelect = (quick) => {
    setSelectedQuick(quick);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedQuick(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="quick-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious quick recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quick-page">
      <header className="quick-header">
        <div className="quick-header-content">
          <h1 className="quick-page-title">Quick & Easy Recipes</h1>
          <p className="quick-page-description">
            Discover delicious quick recipes with rich, flavorful, and fast taste
          </p>
        </div>
      </header>

      <main className="quick-main">
        <div className="quick-grid-section">
          <div className="quick-grid">
            {quickRecipes.map(quick => (
              <div
                key={quick._id}
                className="quick-card"
                onClick={() => handleQuickSelect(quick)}
              >
                <div
                  className="quick-card-image"
                  style={{ backgroundImage: `url(${quick.image})` }}
                ></div>
                <div className="quick-card-content">
                  <h3 className="quick-card-title">{quick.title}</h3>
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

      {showDetailPanel && selectedQuick && (
        <div className="quick-modal-overlay" onClick={closeDetailPanel}>
          <div className="quick-modal" onClick={e => e.stopPropagation()}>
            <div className="quick-modal-hero">
              <div className="quick-modal-hero-left">
                <span className="quick-modal-tag">Quick Recipe</span>
                <h2 className="quick-modal-hero-title">{selectedQuick.title}</h2>
                {selectedQuick.tagline && (
                  <p className="quick-modal-hero-tagline">{selectedQuick.tagline}</p>
                )}
              </div>
              <div className="quick-modal-hero-right">
                <img
                  src={selectedQuick.image}
                  alt={selectedQuick.title}
                  className="quick-modal-hero-img"
                />
              </div>
              <button className="quick-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="quick-modal-body">
              <div className="quick-modal-col">
                <div className="quick-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="quick-modal-scroll">
                  {selectedQuick.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="quick-ingredient-item">
                      <span className="quick-ingredient-dot"></span>
                      <span className="quick-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-modal-col quick-modal-col--steps">
                <div className="quick-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="quick-modal-scroll">
                  {selectedQuick.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="quick-step-item">
                      <span className="quick-step-num">{idx + 1}</span>
                      <span className="quick-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="quick-voice-bar">
              <div className="quick-voice-left">
                <i className="fas fa-volume-up quick-voice-icon"></i>
                <span className="quick-voice-label">Voice Guide</span>
              </div>

              <div className="quick-voice-progress">
                <div className="quick-progress-track">
                  <div className="quick-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="quick-progress-info">
                  <span>Step {currentStep} of {selectedQuick.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="quick-voice-controls">
                <button
                  className="quick-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`quick-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedQuick.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="quick-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedQuick.stepsRaw?.length || 0)}
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

export default RecipeQuickPage;