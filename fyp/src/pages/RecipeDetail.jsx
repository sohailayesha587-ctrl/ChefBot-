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
  const speechRef = useRef(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    return () => {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
        speechRef.current = null;
      }
    };
  }, []);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok && data) {
        setRecipe(data);
      } else {
        setError(data.message || 'Recipe not found');
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setError('Failed to load recipe');
    } finally {
      setLoading(false);
    }
  };

  const speakInstructions = (steps, stepIndex = 0) => {
    if (!steps || steps.length === 0) return;

    if ('speechSynthesis' in window) {
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Step ${stepIndex + 1}: ${steps[stepIndex]}`;
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

  const handleNextStep = () => {
    if (recipe && currentStep < recipe.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(recipe.stepsRaw, currentStep);
    }
  };

  const handlePrevStep = () => {
    if (recipe && currentStep > 1) {
      stopSpeaking();
      speakInstructions(recipe.stepsRaw, currentStep - 2);
    }
  };

  const handleRestart = () => {
    if (recipe) {
      stopSpeaking();
      speakInstructions(recipe.stepsRaw, 0);
    }
  };

  if (loading) {
    return (
      <div className="recipe-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="recipe-detail-page">
        <div className="error-container">
          <h2>{error || 'Recipe not found'}</h2>
          <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <header className="recipe-detail-header">
        <div className="recipe-detail-header-content">
          <h1 className="recipe-detail-title">Recipe Detail</h1>
          <p className="recipe-detail-description">
            {recipe.tagline || 'Discover this delicious recipe'}
          </p>
        </div>
      </header>

      <main className="recipe-detail-main">
        <div className="recipe-detail-card">
          <div
            className="recipe-detail-card-image"
            style={{ backgroundImage: `url(${recipe.image})` }}
          ></div>
          <div className="recipe-detail-card-content">
            <h3 className="recipe-detail-card-title">{recipe.title}</h3>
          </div>
        </div>

        <div className="back-button-container">
          <button className="back-home-btn" onClick={() => navigate('/')}>
            <span>←</span> Back to Home
          </button>
        </div>
      </main>

      {recipe && (
        <div className="recipe-detail-modal-overlay" onClick={() => navigate(-1)}>
          <div className="recipe-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="recipe-detail-modal-hero">
              <div className="recipe-detail-modal-hero-left">
                <span className="recipe-detail-modal-tag">Recipe</span>
                <h2 className="recipe-detail-modal-hero-title">{recipe.title}</h2>
                {recipe.tagline && (
                  <p className="recipe-detail-modal-hero-tagline">{recipe.tagline}</p>
                )}
              </div>
              <div className="recipe-detail-modal-hero-right">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-detail-modal-hero-img"
                />
              </div>
              <button className="recipe-detail-modal-close" onClick={() => navigate(-1)}>×</button>
            </div>

            <div className="recipe-detail-modal-body">
              <div className="recipe-detail-modal-col">
                <div className="recipe-detail-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="recipe-detail-modal-scroll">
                  {recipe.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="recipe-detail-ingredient-item">
                      <span className="recipe-detail-ingredient-dot"></span>
                      <span className="recipe-detail-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="recipe-detail-modal-col recipe-detail-modal-col--steps">
                <div className="recipe-detail-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="recipe-detail-modal-scroll">
                  {recipe.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="recipe-detail-step-item">
                      <span className="recipe-detail-step-num">{idx + 1}</span>
                      <span className="recipe-detail-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="recipe-detail-voice-bar">
              <div className="recipe-detail-voice-left">
                <i className="fas fa-volume-up recipe-detail-voice-icon"></i>
                <span className="recipe-detail-voice-label">Voice Guide</span>
              </div>

              <div className="recipe-detail-voice-progress">
                <div className="recipe-detail-progress-track">
                  <div className="recipe-detail-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="recipe-detail-progress-info">
                  <span>Step {currentStep} of {recipe.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="recipe-detail-voice-controls">
                <button
                  className="recipe-detail-step-btn"
                  onClick={handlePrevStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`recipe-detail-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(recipe.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="recipe-detail-step-btn"
                  onClick={handleNextStep}
                  disabled={currentStep >= (recipe.stepsRaw?.length || 0)}
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

export default RecipeDetail;