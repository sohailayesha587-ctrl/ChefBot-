import React, { useState, useEffect, useRef } from 'react';
import './RecipeBreakFast.css';

const RecipeBreakFast = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pantryItems, setPantryItems] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const speechRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subcategory/breakfast?limit=200')
      .then(res => res.json())
      .then(data => {
        setRecipes(data.recipes || []);
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
        .filter(recipe => recipe.score >= 1)
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);
      
      setSuggestedRecipes(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else if (recipes.length > 0) {
      setShowSuggestions(false);
    }
  }, [pantryItems, recipes]);

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
        speechRef.current = null;
      }
    };
  }, []);

  const speakInstructions = (steps, stepIndex = 0) => {
    if (!steps || steps.length === 0) return;

    if ('speechSynthesis' in window) {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance();
      utterance.text = steps[stepIndex];
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.lang = 'en-US';

      setCurrentStep(stepIndex + 1);
      setProgress(((stepIndex + 1) / steps.length) * 100);
      setIsPlaying(true);

      utterance.onend = () => {
        setIsPlaying(false);
        speechRef.current = null;

        if (stepIndex + 1 < steps.length) {
          setTimeout(() => {
            speakInstructions(steps, stepIndex + 1);
          }, 1500);
        }
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        speechRef.current = null;
      };

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && speechRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      speechRef.current = null;
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
          <h1 className="breakfast-page-title">Traditional Breakfast</h1>
          <p className="breakfast-page-description">
            Where every morning begins with flavor.
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
            {recipes.map(recipe => (
              <div 
                key={recipe._id} 
                className="breakfast-technique-card"
                onClick={() => handleRecipeSelect(recipe)}
              >
                <div 
                  className="breakfast-card-image"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                ></div>
                
                <div className="breakfast-card-content">
                  <h3 className="breakfast-card-title">{recipe.title}</h3>
                  <p className="breakfast-card-description">{recipe.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showDetailPanel && selectedRecipe && (
        <div className="breakfast-modal-overlay" onClick={closeDetailPanel}>
          <div 
            className="breakfast-modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${selectedRecipe.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <button className="breakfast-modal-close" onClick={closeDetailPanel}>
              ×
            </button>
            
            <div className="breakfast-modal-header">
              <div className="breakfast-modal-title">
                <h2>{selectedRecipe.title}</h2>
              </div>
            </div>

            <div className="breakfast-modal-content">
              <div className="breakfast-modal-ingredients">
                <h3>Ingredients</h3>
                <div className="breakfast-ingredients-list">
                  {selectedRecipe.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="breakfast-ingredient-item">
                      <span className="breakfast-ingredient-bullet">•</span>
                      <span className="breakfast-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="breakfast-modal-steps">
                <h3>Steps to Make</h3>
                <div className="breakfast-steps-list">
                  {selectedRecipe.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="breakfast-step-item">
                      <span className="breakfast-step-number">{idx + 1}.</span>
                      <span className="breakfast-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="breakfast-modal-voice-container">
                <div className="voice-panel">
                  <h3>Voice Instructions</h3>
                  
                  <div className="voice-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${progress}%`}}></div>
                    </div>
                    <div className="progress-info">
                      <span>Step {currentStep} of {selectedRecipe.stepsRaw?.length || 0}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  <div className="voice-controls">
                    <button 
                      className={`voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                      onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedRecipe.stepsRaw, 0)}
                    >
                      {isPlaying ? 'Stop' : 'Start Voice Guide'}
                    </button>

                    <div className="step-controls">
                      <button 
                        className="step-btn prev"
                        onClick={speakPreviousStep}
                        disabled={currentStep <= 1}
                      >
                        Previous
                      </button>
                      <button 
                        className="step-btn next"
                        onClick={speakNextStep}
                        disabled={currentStep >= (selectedRecipe.stepsRaw?.length || 0)}
                      >
                        Next
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

export default RecipeBreakFast;