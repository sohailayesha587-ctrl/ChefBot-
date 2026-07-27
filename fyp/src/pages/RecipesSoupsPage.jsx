import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesSoupsPage.css';

const RecipesSoupsPage = () => {
  const navigate = useNavigate();
  const [soupRecipes, setSoupRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSoup, setSelectedSoup] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/soups?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch soup recipes');
        }
        return res.json();
      })
      .then(data => {
        setSoupRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching soup recipes:', error);
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
    if (selectedSoup && currentStep < selectedSoup.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedSoup.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedSoup && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedSoup.stepsRaw, currentStep - 2);
    }
  };

  const handleSoupSelect = (soup) => {
    setSelectedSoup(soup);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedSoup(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="soup-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious soup recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="soup-page">
      <header className="soup-header">
        <div className="soup-header-content">
          <h1 className="soup-page-title">Soup Recipes</h1>
          <p className="soup-page-description">
            Discover delicious soup recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="soup-main">
        <div className="soup-grid-section">
          <div className="soup-grid">
            {soupRecipes.map(soup => (
              <div
                key={soup._id}
                className="soup-card"
                onClick={() => handleSoupSelect(soup)}
              >
                <div
                  className="soup-card-image"
                  style={{ backgroundImage: `url(${soup.image})` }}
                ></div>
                <div className="soup-card-content">
                  <h3 className="soup-card-title">{soup.title}</h3>
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

      {showDetailPanel && selectedSoup && (
        <div className="soup-modal-overlay" onClick={closeDetailPanel}>
          <div className="soup-modal" onClick={e => e.stopPropagation()}>
            <div className="soup-modal-hero">
              <div className="soup-modal-hero-left">
                <span className="soup-modal-tag">Soup Recipe</span>
                <h2 className="soup-modal-hero-title">{selectedSoup.title}</h2>
                {selectedSoup.tagline && (
                  <p className="soup-modal-hero-tagline">{selectedSoup.tagline}</p>
                )}
              </div>
              <div className="soup-modal-hero-right">
                <img
                  src={selectedSoup.image}
                  alt={selectedSoup.title}
                  className="soup-modal-hero-img"
                />
              </div>
              <button className="soup-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="soup-modal-body">
              <div className="soup-modal-col">
                <div className="soup-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="soup-modal-scroll">
                  {selectedSoup.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="soup-ingredient-item">
                      <span className="soup-ingredient-dot"></span>
                      <span className="soup-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="soup-modal-col soup-modal-col--steps">
                <div className="soup-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="soup-modal-scroll">
                  {selectedSoup.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="soup-step-item">
                      <span className="soup-step-num">{idx + 1}</span>
                      <span className="soup-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="soup-voice-bar">
              <div className="soup-voice-left">
                <i className="fas fa-volume-up soup-voice-icon"></i>
                <span className="soup-voice-label">Voice Guide</span>
              </div>

              <div className="soup-voice-progress">
                <div className="soup-progress-track">
                  <div className="soup-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="soup-progress-info">
                  <span>Step {currentStep} of {selectedSoup.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="soup-voice-controls">
                <button
                  className="soup-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`soup-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedSoup.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="soup-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedSoup.stepsRaw?.length || 0)}
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

export default RecipesSoupsPage;