import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesRegionalPage.css';

const RecipesRegionalPage = () => {
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState('pakistani');
  const [allRegionalRecipes, setAllRegionalRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegional, setSelectedRegional] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  const cuisines = [
    { id: 1, name: 'Pakistani', key: 'pakistani' },
    { id: 2, name: 'Continental', key: 'continental' },
    { id: 3, name: 'Chinese', key: 'chinese' },
    { id: 4, name: 'Italian', key: 'italian' },
    { id: 5, name: 'Turkish', key: 'turkish' }
  ];

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/recipes/subCategory/regional?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch regional recipes');
        }
        return res.json();
      })
      .then(data => {
        setAllRegionalRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching regional recipes:', error);
        setLoading(false);
      });
  }, []);

  // Filter recipes when selectedCuisine changes or recipes load
  useEffect(() => {
    if (allRegionalRecipes.length > 0) {
      const filtered = allRegionalRecipes.filter(
        recipe => recipe.cuisine?.toLowerCase() === selectedCuisine.toLowerCase()
      );
      setFilteredRecipes(filtered);
    }
  }, [selectedCuisine, allRegionalRecipes]);

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
    if (selectedRegional && currentStep < selectedRegional.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedRegional.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedRegional && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedRegional.stepsRaw, currentStep - 2);
    }
  };

  const handleRegionalSelect = (regional) => {
    setSelectedRegional(regional);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedRegional(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="regional-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious regional recipes...</p>
        </div>
      </div>
    );
  }

  // Get current cuisine name for display
  const getCurrentCuisineName = () => {
    const cuisine = cuisines.find(c => c.key === selectedCuisine);
    return cuisine ? cuisine.name : 'Regional';
  };

  return (
    <div className="regional-page">
      <header className="regional-header">
        <div className="regional-header-content">
          <h1 className="regional-page-title">Regional Recipes</h1>
          <p className="regional-page-description">
            Discover delicious {getCurrentCuisineName()} recipes with rich, authentic, and homestyle taste
          </p>
        </div>
      </header>

      <div className="cuisine-tabs">
        {cuisines.map(cuisine => (
          <button
            key={cuisine.id}
            className={`cuisine-tab ${selectedCuisine === cuisine.key ? 'active' : ''}`}
            onClick={() => setSelectedCuisine(cuisine.key)}
          >
            <span className="cuisine-name">{cuisine.name}</span>
            <span className="cuisine-count">
              ({allRegionalRecipes.filter(r => r.cuisine?.toLowerCase() === cuisine.key.toLowerCase()).length})
            </span>
          </button>
        ))}
      </div>

      <main className="regional-main">
        <div className="regional-grid-section">
          {filteredRecipes.length === 0 ? (
            <div className="no-recipes-message">
              <p>No {getCurrentCuisineName()} recipes found.</p>
            </div>
          ) : (
            <div className="regional-grid">
              {filteredRecipes.map(regional => (
                <div 
                  key={regional._id} 
                  className="regional-card"
                  onClick={() => handleRegionalSelect(regional)}
                >
                  <div 
                    className="regional-card-image"
                    style={{ backgroundImage: `url(${regional.image})` }}
                  ></div>
                  
                  <div className="regional-card-content">
                    <h3 className="regional-card-title">{regional.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          <span>←</span> Back to Home
        </button>
      </div>

      {showDetailPanel && selectedRegional && (
        <div className="regional-modal-overlay" onClick={closeDetailPanel}>
          <div className="regional-modal" onClick={e => e.stopPropagation()}>
            <div className="veg-modal-hero">
              <div className="veg-modal-hero-left">
                <span className="veg-modal-tag">{selectedRegional.cuisine || 'Regional'} Recipe</span>
                <h2 className="veg-modal-hero-title">{selectedRegional.title}</h2>
                {selectedRegional.tagline && (
                  <p className="veg-modal-hero-tagline">{selectedRegional.tagline}</p>
                )}
              </div>
              <div className="veg-modal-hero-right">
                <img
                  src={selectedRegional.image}
                  alt={selectedRegional.title}
                  className="veg-modal-hero-img"
                />
              </div>
              <button className="regional-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="veg-modal-body">
              <div className="veg-modal-col">
                <div className="veg-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="veg-modal-scroll">
                  {selectedRegional.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="veg-ingredient-item">
                      <span className="veg-ingredient-dot"></span>
                      <span className="veg-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="veg-modal-col veg-modal-col--steps">
                <div className="veg-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="veg-modal-scroll">
                  {selectedRegional.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="veg-step-item">
                      <span className="veg-step-num">{idx + 1}</span>
                      <span className="veg-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="veg-voice-bar">
              <div className="veg-voice-left">
                <i className="fas fa-volume-up veg-voice-icon"></i>
                <span className="veg-voice-label">Voice Guide</span>
              </div>

              <div className="veg-voice-progress">
                <div className="veg-progress-track">
                  <div className="veg-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="veg-progress-info">
                  <span>Step {currentStep} of {selectedRegional.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="veg-voice-controls">
                <button
                  className="veg-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`veg-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRegional.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="veg-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedRegional.stepsRaw?.length || 0)}
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

export default RecipesRegionalPage;