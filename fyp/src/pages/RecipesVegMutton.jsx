import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesVegMutton.css';

const RecipesVegMutton = () => {
  const navigate = useNavigate();
  const [muttonVegRecipes, setMuttonVegRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/veg-mutton?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch veg-mutton recipes');
        }
        return res.json();
      })
      .then(data => {
        setMuttonVegRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching veg-mutton recipes:', error);
        setLoading(false);
      });
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
    if (selectedRecipe && currentStep < selectedRecipe.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedRecipe.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedRecipe && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedRecipe.stepsRaw, currentStep - 2);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedRecipe(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="veg-mutton-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious recipes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="veg-mutton-page">
      <header className="veg-mutton-header">
        <div className="veg-mutton-header-content">
          <h1 className="veg-mutton-page-title">Veg & Mutton Recipes</h1>
          <p className="veg-mutton-page-description">
            Discover delicious recipes of Mutton
          </p>
        </div>
      </header>

      <main className="veg-mutton-main">
        <div className="veg-mutton-grid-section">
          <div className="veg-mutton-grid">
            {muttonVegRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="veg-mutton-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <div
                  className="veg-mutton-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                <div className="veg-mutton-card-content">
                  <h3 className="veg-mutton-card-title">{recipe.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back to Lunch Categories
        </button>
      </div>

      {showDetailPanel && selectedRecipe && (
        <div className="veg-mutton-modal-overlay" onClick={closeDetailPanel}>
          <div className="veg-mutton-modal" onClick={e => e.stopPropagation()}>
            <div className="veg-mutton-modal-hero">
              <div className="veg-mutton-modal-hero-left">
                <span className="veg-mutton-modal-tag">
                  {selectedRecipe.category || 'Recipe'}
                </span>
                <h2 className="veg-mutton-modal-hero-title">{selectedRecipe.title}</h2>
                {selectedRecipe.tagline && (
                  <p className="veg-mutton-modal-hero-tagline">{selectedRecipe.tagline}</p>
                )}
              </div>
              <div className="veg-mutton-modal-hero-right">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="veg-mutton-modal-hero-img"
                />
              </div>
              <button className="veg-mutton-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="veg-mutton-modal-body">
              <div className="veg-mutton-modal-col">
                <div className="veg-mutton-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="veg-mutton-modal-scroll">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="veg-mutton-ingredient-item">
                      <span className="veg-mutton-ingredient-dot"></span>
                      <span className="veg-mutton-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="veg-mutton-modal-col veg-mutton-modal-col--steps">
                <div className="veg-mutton-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="veg-mutton-modal-scroll">
                  {selectedRecipe.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="veg-mutton-step-item">
                      <span className="veg-mutton-step-num">{idx + 1}</span>
                      <span className="veg-mutton-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="veg-mutton-voice-bar">
              <div className="veg-mutton-voice-left">
                <i className="fas fa-volume-up veg-mutton-voice-icon"></i>
                <span className="veg-mutton-voice-label">Voice Guide</span>
              </div>

              <div className="veg-mutton-voice-progress">
                <div className="veg-mutton-progress-track">
                  <div className="veg-mutton-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="veg-mutton-progress-info">
                  <span>Step {currentStep} of {selectedRecipe.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="veg-mutton-voice-controls">
                <button
                  className="veg-mutton-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`veg-mutton-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="veg-mutton-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedRecipe.stepsRaw?.length || 0)}
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

export default RecipesVegMutton;