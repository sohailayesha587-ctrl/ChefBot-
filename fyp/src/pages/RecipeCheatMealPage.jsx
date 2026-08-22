import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCheatMealPage.css';

const RecipeCheatMealPage = () => {
  const navigate = useNavigate();
  const [cheatMealRecipes, setCheatMealRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCheatMeal, setSelectedCheatMeal] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pantryItems, setPantryItems] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('/api/recipes/subCategory/cheat-meal?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch cheat meal recipes');
        }
        return res.json();
      })
      .then(data => {
        setCheatMealRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cheat meal recipes:', error);
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
    if (pantryItems && pantryItems.length > 0 && cheatMealRecipes.length > 0) {
      const pantryLower = pantryItems.map(item => item.toLowerCase().trim());
      
      const scoredRecipes = cheatMealRecipes.map(recipe => {
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
        .filter(recipe => recipe.score >= 2)
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);
      
      setSuggestedRecipes(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else if (cheatMealRecipes.length > 0) {
      setShowSuggestions(false);
    }
  }, [pantryItems, cheatMealRecipes]);

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
    if (selectedCheatMeal && currentStep < selectedCheatMeal.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedCheatMeal.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedCheatMeal && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedCheatMeal.stepsRaw, currentStep - 2);
    }
  };

  const handleCheatMealSelect = (cheatMeal) => {
    setSelectedCheatMeal(cheatMeal);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedCheatMeal(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const applySuggestion = (recipe) => {
    handleCheatMealSelect(recipe);
  };

  if (loading) {
    return (
      <div className="cheatmeal-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious cheat meal recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cheatmeal-page">
      <header className="cheatmeal-header">
        <div className="cheatmeal-header-content">
          <h1 className="cheatmeal-page-title">Cheat Meal Recipes</h1>
          <p className="cheatmeal-page-description">
            Discover delicious cheat meal recipes with rich, flavorful, and indulgent taste
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

      <main className="cheatmeal-main">
        <div className="cheatmeal-grid-section">
          <div className="cheatmeal-grid">
            {cheatMealRecipes.map(cheatMeal => (
              <div 
                key={cheatMeal._id} 
                className="cheatmeal-card"
                onClick={() => handleCheatMealSelect(cheatMeal)}
              >
                <div 
                  className="cheatmeal-card-image"
                  style={{ backgroundImage: `url(${cheatMeal.image})` }}
                ></div>
                
                <div className="cheatmeal-card-content">
                  <h3 className="cheatmeal-card-title">{cheatMeal.title}</h3>
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

      {showDetailPanel && selectedCheatMeal && (
        <div className="cheatmeal-modal-overlay" onClick={closeDetailPanel}>
          <div className="cheatmeal-modal" onClick={e => e.stopPropagation()}>
            <div className="cheatmeal-modal-hero">
              <div className="cheatmeal-modal-hero-left">
                <span className="cheatmeal-modal-tag">Cheat Meal Recipe</span>
                <h2 className="cheatmeal-modal-hero-title">{selectedCheatMeal.title}</h2>
                {selectedCheatMeal.tagline && (
                  <p className="cheatmeal-modal-hero-tagline">{selectedCheatMeal.tagline}</p>
                )}
              </div>
              <div className="cheatmeal-modal-hero-right">
                <img
                  src={selectedCheatMeal.image}
                  alt={selectedCheatMeal.title}
                  className="cheatmeal-modal-hero-img"
                />
              </div>
              <button className="cheatmeal-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="cheatmeal-modal-body">
              <div className="cheatmeal-modal-col">
                <div className="cheatmeal-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="cheatmeal-modal-scroll">
                  {selectedCheatMeal.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="cheatmeal-ingredient-item">
                      <span className="cheatmeal-ingredient-dot"></span>
                      <span className="cheatmeal-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cheatmeal-modal-col cheatmeal-modal-col--steps">
                <div className="cheatmeal-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="cheatmeal-modal-scroll">
                  {selectedCheatMeal.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="cheatmeal-step-item">
                      <span className="cheatmeal-step-num">{idx + 1}</span>
                      <span className="cheatmeal-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="cheatmeal-voice-bar">
              <div className="cheatmeal-voice-left">
                <i className="fas fa-volume-up cheatmeal-voice-icon"></i>
                <span className="cheatmeal-voice-label">Voice Guide</span>
              </div>

              <div className="cheatmeal-voice-progress">
                <div className="cheatmeal-progress-track">
                  <div className="cheatmeal-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="cheatmeal-progress-info">
                  <span>Step {currentStep} of {selectedCheatMeal.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="cheatmeal-voice-controls">
                <button
                  className="cheatmeal-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`cheatmeal-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedCheatMeal.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="cheatmeal-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedCheatMeal.stepsRaw?.length || 0)}
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

export default RecipeCheatMealPage;