import React, { useState, useEffect, useRef } from 'react';
import './RecipeCheatMeal.css';

const RecipeCheatMeal = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pantryItems, setPantryItems] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const speechSynthesisRef = useRef(null);

  // ✅ FETCH CHEAT MEAL RECIPES FROM BACKEND
  useEffect(() => {
fetch('http://localhost:5000/api/recipes/subCategory/cheat-meal?limit=200')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cheat meal recipes:', error);
        setLoading(false);
      });
  }, []);

  // Load pantry items from localStorage
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

  // Suggest recipes based on pantry items
  useEffect(() => {
    if (pantryItems && pantryItems.length > 0 && recipes.length > 0) {
      const pantryLower = pantryItems.map(item => item.toLowerCase().trim());
      
      const scoredRecipes = recipes.map(recipe => {
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
    } else if (recipes.length > 0) {
      setShowSuggestions(false);
    }
  }, [pantryItems, recipes]);

  // Voice instructions handler
  const speakInstructions = (steps, stepIndex = 0) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentStep(0);
        setProgress(0);
        speechSynthesisRef.current = null;
        return;
      }

      if (stepIndex >= 0 && stepIndex < steps.length) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = steps[stepIndex];
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        setCurrentStep(stepIndex + 1);
        const stepProgress = ((stepIndex + 1) / steps.length) * 100;
        setProgress(stepProgress);
        
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => {
          setIsPlaying(false);
          speechSynthesisRef.current = null;
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

  const handleRecipeSelect = (recipe) => {
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

  const applySuggestion = (recipe) => {
    handleRecipeSelect(recipe);
  };

  // Loading state
  if (loading) {
    return (
      <div className="cheatmeal-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious cheat meals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cheatmeal-page">
      {/* Header */}
      <header className="cheatmeal-header">
        <div className="cheatmeal-header-content">
          <h1 className="cheatmeal-page-title">Cheat Meal</h1>
          <p className="cheatmeal-page-description">
            Indulge in your favorite fast food treats - because you deserve it!
          </p>
        </div>
      </header>

      {/* Pantry Suggestions - 2 Recipes */}
      {showSuggestions && suggestedRecipes.length > 0 && (
        <div className="cheatmeal-pantry-suggestions">
          <div className="cheatmeal-suggestions-header">
            <i className="fas fa-lightbulb"></i>
            <h3>Based on your pantry, you can make:</h3>
          </div>
          <div className="cheatmeal-suggestions-grid two-suggestions">
            {suggestedRecipes.map(recipe => (
              <div 
                key={recipe._id} 
                className="cheatmeal-suggestion-card"
                onClick={() => applySuggestion(recipe)}
              >
                <div className="cheatmeal-suggestion-image" style={{backgroundImage: `url(${recipe.image})`}}></div>
                <div className="cheatmeal-suggestion-content">
                  <h4>{recipe.title}</h4>
                  <p>{recipe.tagline}</p>
                  <p className="cheatmeal-match-info">✓ {Math.round(recipe.score)} items match your pantry</p>
                  <button className="cheatmeal-suggestion-btn">Cook This</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Recipes Grid */}
      <main className="cheatmeal-main">
        <div className="cheatmeal-grid-section">
          <div className="cheatmeal-grid">
            {recipes.map(recipe => (
              <div 
                key={recipe._id} 
                className="cheatmeal-technique-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div 
                  className="cheatmeal-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <div className="cheatmeal-card-content">
                  <h3 className="cheatmeal-card-title">{recipe.title}</h3>
                  <p className="cheatmeal-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {showDetailPanel && selectedRecipe && (
        <div className="cheatmeal-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="cheatmeal-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="cheatmeal-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="cheatmeal-modal-header">
              <div className="cheatmeal-modal-title">
                <h2>{selectedRecipe.title}</h2>
              </div>
            </div>

            <div className="cheatmeal-modal-content">
              {/* COLUMN 1 - INGREDIENTS */}
              <div className="cheatmeal-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="cheatmeal-ingredients-list">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="cheatmeal-ingredient-item">
                      <span className="cheatmeal-ingredient-bullet">•</span>
                      <span className="cheatmeal-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 2 - STEPS TO MAKE */}
              <div className="cheatmeal-modal-steps">
                <h3>Steps to Make</h3>
                <div className="cheatmeal-steps-list">
                  {selectedRecipe.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="cheatmeal-step-item">
                      <span className="cheatmeal-step-number">{idx + 1}.</span>
                      <span className="cheatmeal-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUMN 3 - VOICE INSTRUCTIONS */}
              <div className="cheatmeal-modal-voice-container">
                <div className="cheatmeal-voice-panel">
                  <h3><i className="fas fa-volume-up"></i> Voice Instructions</h3>
                  
                  <div className="cheatmeal-voice-progress">
                    <div className="cheatmeal-progress-bar">
                      <div className="cheatmeal-progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="cheatmeal-progress-info">
                      <span>Step {currentStep} of {selectedRecipe.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="cheatmeal-voice-controls">
                    <button 
                      className={`cheatmeal-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.stepsRaw, 0)}
                    >
                      <i className={`fas fa-${isPlaying ? 'stop' : 'play'}`}></i>
                      {isPlaying ? ' Stop' : ' Start Voice Guide'}
                    </button>

                    <div className="cheatmeal-step-controls">
                      <button 
                        className="cheatmeal-step-btn prev"
                        onClick={speakPreviousStep}
                        disabled={currentStep <= 1}
                      >
                        <i className="fas fa-backward"></i> Previous
                      </button>
                      <button 
                        className="cheatmeal-step-btn next"
                        onClick={speakNextStep}
                        disabled={currentStep >= (selectedRecipe.stepsRaw?.length || 0)}
                      >
                        Next <i className="fas fa-forward"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCheatMeal;