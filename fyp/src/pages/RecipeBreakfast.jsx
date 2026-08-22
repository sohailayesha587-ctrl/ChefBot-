import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeBreakFast.css';

const RecipeBreakFast = () => {
  const navigate = useNavigate();
  const [breakfastRecipes, setBreakfastRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBreakfast, setSelectedBreakfast] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pantryItems, setPantryItems] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/breakfast?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch breakfast recipes');
        }
        return res.json();
      })
      .then(data => {
        setBreakfastRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching breakfast recipes:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedPantry = localStorage.getItem('pantryItems');
    if (savedPantry) {
      try {
        const parsed = JSON.parse(savedPantry);
        setPantryItems(parsed);
      } catch (e) {
        console.error("Error parsing pantry items", e);
      }
    }
  }, []);

  useEffect(() => {
    if (pantryItems && pantryItems.length > 0 && breakfastRecipes.length > 0) {
      const pantryLower = pantryItems.map(item => item.toLowerCase().trim());
      
      const scoredRecipes = breakfastRecipes.map(recipe => {
        let score = 0;
        
        if (recipe.pantryKeywords) {
          recipe.pantryKeywords.forEach(keyword => {
            if (pantryLower.some(item => item.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(item))) {
              score += 1;
            }
          });
        }
        
        if (recipe.ingredientsRaw) {
          recipe.ingredientsRaw.forEach(ing => {
            if (pantryLower.some(item => ing.toLowerCase().includes(item))) {
              score += 0.5;
            }
          });
        }
        
        return { ...recipe, score };
      });
      
      const suggestions = scoredRecipes
        .filter(recipe => recipe.score >= 1)
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);
      
      setSuggestedRecipes(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else if (breakfastRecipes.length > 0) {
      setShowSuggestions(false);
    }
  }, [pantryItems, breakfastRecipes]);

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
    if (selectedBreakfast && currentStep < selectedBreakfast.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedBreakfast.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedBreakfast && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedBreakfast.stepsRaw, currentStep - 2);
    }
  };

  const handleBreakfastSelect = (breakfast) => {
    setSelectedBreakfast(breakfast);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedBreakfast(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const applySuggestion = (recipe) => {
    handleBreakfastSelect(recipe);
  };

  if (loading) {
    return (
      <div className="breakfast-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious breakfast recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="breakfast-page">
      <header className="breakfast-header">
        <div className="breakfast-header-content">
          <h1 className="breakfast-page-title">Breakfast Recipes</h1>
          <p className="breakfast-page-description">
            Discover delicious breakfast recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      {showSuggestions && suggestedRecipes.length > 0 && (
        <div className="pantry-suggestions">
          <div className="suggestions-header">
            <h3>Based on your pantry, you can make:</h3>
          </div>
          <div className="suggestions-grid two-suggestions">
            {suggestedRecipes.map(recipe => (
              <div 
                key={recipe._id} 
                className="suggestion-card"
                onClick={() => applySuggestion(recipe)}
              >
                <div className="suggestion-image" style={{backgroundImage: `url(${recipe.image})`}}></div>
                <div className="suggestion-content">
                  <h4>{recipe.title}</h4>
                  <p>{recipe.tagline}</p>
                  <p className="match-info">{Math.round(recipe.score)} items match your pantry</p>
                  <button className="suggestion-btn">Cook This</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <main className="breakfast-main">
        <div className="breakfast-grid-section">
          <div className="breakfast-grid">
            {breakfastRecipes.map(breakfast => (
              <div 
                key={breakfast._id} 
                className="breakfast-card"
                onClick={() => handleBreakfastSelect(breakfast)}
              >
                <div 
                  className="breakfast-card-image"
                  style={{ backgroundImage: `url(${breakfast.image})` }}
                ></div>
                
                <div className="breakfast-card-content">
                  <h3 className="breakfast-card-title">{breakfast.title}</h3>
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

      {showDetailPanel && selectedBreakfast && (
        <div className="breakfast-modal-overlay" onClick={closeDetailPanel}>
          <div className="breakfast-modal" onClick={e => e.stopPropagation()}>
            <div className="breakfast-modal-hero">
              <div className="breakfast-modal-hero-left">
                <span className="breakfast-modal-tag">Breakfast Recipe</span>
                <h2 className="breakfast-modal-hero-title">{selectedBreakfast.title}</h2>
                {selectedBreakfast.tagline && (
                  <p className="breakfast-modal-hero-tagline">{selectedBreakfast.tagline}</p>
                )}
              </div>
              <div className="breakfast-modal-hero-right">
                <img
                  src={selectedBreakfast.image}
                  alt={selectedBreakfast.title}
                  className="breakfast-modal-hero-img"
                />
              </div>
              <button className="breakfast-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="breakfast-modal-body">
              <div className="breakfast-modal-col">
                <div className="breakfast-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="breakfast-modal-scroll">
                  {selectedBreakfast.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="breakfast-ingredient-item">
                      <span className="breakfast-ingredient-dot"></span>
                      <span className="breakfast-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="breakfast-modal-col breakfast-modal-col--steps">
                <div className="breakfast-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="breakfast-modal-scroll">
                  {selectedBreakfast.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="breakfast-step-item">
                      <span className="breakfast-step-num">{idx + 1}</span>
                      <span className="breakfast-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="breakfast-voice-bar">
              <div className="breakfast-voice-left">
                <i className="fas fa-volume-up breakfast-voice-icon"></i>
                <span className="breakfast-voice-label">Voice Guide</span>
              </div>

              <div className="breakfast-voice-progress">
                <div className="breakfast-progress-track">
                  <div className="breakfast-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="breakfast-progress-info">
                  <span>Step {currentStep} of {selectedBreakfast.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="breakfast-voice-controls">
                <button
                  className="breakfast-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`breakfast-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedBreakfast.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="breakfast-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedBreakfast.stepsRaw?.length || 0)}
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

export default RecipeBreakFast;