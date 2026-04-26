import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  // Fetch recipe by ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        console.log("Fetching recipe with ID:", id);
        
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        console.log("API Response:", data);
        
        if (response.ok) {
          setRecipe(data.recipe);
        } else {
          setError(data.message || "Recipe not found");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  // Voice functions
  const speakStep = (stepText) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(stepText);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      if (isPlaying && currentStep < (recipe?.stepsRaw?.length || 0) - 1) {
        setCurrentStep(prev => prev + 1);
      } else if (isPlaying && currentStep === (recipe?.stepsRaw?.length || 0) - 1) {
        setIsPlaying(false);
        setCurrentStep(0);
      }
    };

    utterance.onerror = () => {
      console.error('Speech synthesis error');
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
    speechSynthesisRef.current = utterance;
  };

  const handlePlayPause = () => {
    if (!recipe) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakStep(recipe.stepsRaw[currentStep]);
    }
  };

  const handleNextStep = () => {
    if (!recipe) return;
    
    if (currentStep < recipe.stepsRaw.length - 1) {
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev + 1);
      if (isPlaying) {
        speakStep(recipe.stepsRaw[currentStep + 1]);
      }
    }
  };

  const handlePrevStep = () => {
    if (!recipe) return;
    
    if (currentStep > 0) {
      window.speechSynthesis.cancel();
      setCurrentStep(prev => prev - 1);
      if (isPlaying) {
        speakStep(recipe.stepsRaw[currentStep - 1]);
      }
    }
  };

  const handleRestart = () => {
    if (!recipe) return;
    
    window.speechSynthesis.cancel();
    setCurrentStep(0);
    if (isPlaying) {
      speakStep(recipe.stepsRaw[0]);
    }
  };

  useEffect(() => {
    if (recipe && recipe.stepsRaw) {
      setProgress(((currentStep + 1) / recipe.stepsRaw.length) * 100);
    }
  }, [currentStep, recipe]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="recipe-detail-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="recipe-detail-page">
        <div className="error-container">
          <h2>❌ {error || "Recipe not found"}</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      {/* Hero Section */}
      <div className="recipe-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${recipe.image})` }}>
        <div className="recipe-hero-content">
          <h1 className="recipe-title">{recipe.title}</h1>
          <p className="recipe-tagline">{recipe.tagline}</p>
          <div className="recipe-meta">
            {recipe.cookingTime && <span>⏱️ {recipe.cookingTime} mins</span>}
            {recipe.difficulty && <span>📊 {recipe.difficulty}</span>}
            {recipe.category && <span>🍽️ {recipe.category}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="recipe-content">
        {/* Ingredients */}
        <div className="recipe-section ingredients-section">
          <h2>🛒 Ingredients</h2>
          <div className="ingredients-list">
            {recipe.ingredientsRaw?.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <span className="ingredient-bullet">•</span>
                <span className="ingredient-text">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="recipe-section steps-section">
          <h2>👨‍🍳 Steps to Make</h2>
          <div className="steps-list">
            {recipe.stepsRaw?.map((step, index) => (
              <div key={index} className="step-item">
                <div className="step-number">{index + 1}</div>
                <div className="step-text">{step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Voice Instructions */}
        <div className="recipe-section voice-section">
          <h2>🔊 Voice Instructions</h2>
          
          <div className="voice-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="progress-info">
              <span>Step {currentStep + 1} of {recipe.stepsRaw?.length || 0}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="current-step">
            <p><strong>Current Step:</strong> {recipe.stepsRaw?.[currentStep]}</p>
          </div>

          <div className="voice-controls">
            <button className={`voice-btn ${isPlaying ? 'pause' : 'play'}`} onClick={handlePlayPause}>
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <button className="step-btn" onClick={handlePrevStep} disabled={currentStep === 0}>
              ⏮️ Previous
            </button>
            <button className="step-btn" onClick={handleRestart}>
              🔄 Restart
            </button>
            <button className="step-btn" onClick={handleNextStep} disabled={currentStep === (recipe.stepsRaw?.length || 0) - 1}>
              Next ⏭️
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;