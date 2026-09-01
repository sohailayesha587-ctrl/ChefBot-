import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);

  const speechRef = useRef(null);
  const timerRef = useRef(null);

  const memberOptions = [2, 4, 6, 8, 10];

  const requestedMembers =
    parseInt(searchParams.get('members'), 10) || 4;

  const baseServings = Number(recipe?.baseServings) || 4;

  const selectedMembers =
    requestedMembers > 0 ? requestedMembers : baseServings;

  const CUP_ML = 240;
  const TABLESPOON_ML = 15;
  const TEASPOON_ML = 5;

  const dryWeights = {
    flour: 120,
    'all-purpose flour': 120,
    'plain flour': 120,
    'whole wheat flour': 120,
    'bread flour': 127,
    'cake flour': 115,
    sugar: 200,
    'granulated sugar': 200,
    'white sugar': 200,
    'caster sugar': 200,
    'brown sugar': 220,
    'light brown sugar': 220,
    'dark brown sugar': 220,
    'powdered sugar': 120,
    'icing sugar': 120,
    'confectioners sugar': 120,
    'cocoa powder': 85,
    oats: 80,
    'rolled oats': 80,
    'quick oats': 80,
    rice: 185,
    'white rice': 185,
    'basmati rice': 185,
    breadcrumbs: 110,
    'bread crumbs': 110,
    cornmeal: 150,
    'corn flour': 120,
    cornstarch: 128,
    'corn starch': 128,
    semolina: 167,
    'shredded coconut': 80,
    coconut: 80,
    almonds: 143,
    'almond flour': 96,
    'ground almonds': 96,
    walnuts: 117,
    peanuts: 146,
    'peanut butter': 258,
    salt: 288,
    'baking powder': 192,
    'baking soda': 220
  };

  const liquidIngredients = [
    'water',
    'milk',
    'whole milk',
    'skim milk',
    'almond milk',
    'soy milk',
    'oat milk',
    'cream',
    'heavy cream',
    'heavy whipping cream',
    'buttermilk',
    'oil',
    'olive oil',
    'vegetable oil',
    'canola oil',
    'coconut oil',
    'vinegar',
    'apple cider vinegar',
    'lemon juice',
    'lime juice',
    'orange juice',
    'vanilla extract',
    'soy sauce',
    'maple syrup'
  ];

  const butterIngredients = [
    'butter',
    'unsalted butter',
    'salted butter'
  ];

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `/api/recipes/${id}?members=${requestedMembers}`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || 'Recipe not found'
          );
        }

        setRecipe(data);
      } catch (err) {
        console.error(err);
        setError(
          err.message || 'Failed to load recipe'
        );
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id, requestedMembers]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const formatNumber = (value) => {
    if (!Number.isFinite(value)) {
      return '';
    }

    if (Math.abs(value - Math.round(value)) < 0.01) {
      return String(Math.round(value));
    }

    return String(Number(value.toFixed(2)));
  };

  const parseFraction = (value) => {
    if (!value) {
      return null;
    }

    const cleaned = value.trim();

    if (/^\d+\s*\/\s*\d+$/.test(cleaned)) {
      const parts = cleaned.split('/');
      const numerator = Number(parts[0]);
      const denominator = Number(parts[1]);

      if (denominator === 0) {
        return null;
      }

      return numerator / denominator;
    }

    if (/^\d+(?:\.\d+)?$/.test(cleaned)) {
      return Number(cleaned);
    }

    return null;
  };

  const normalizeIngredient = (ingredient) => {
    return ingredient
      .toLowerCase()
      .replace(/[(),.]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const getDryWeight = (ingredient) => {
    const normalized = normalizeIngredient(ingredient);

    const key = Object.keys(dryWeights).find(
      (name) =>
        normalized === name ||
        normalized.includes(`${name} `) ||
        normalized.includes(` ${name}`)
    );

    return key ? dryWeights[key] : null;
  };

  const isLiquid = (ingredient) => {
    const normalized = normalizeIngredient(ingredient);

    return liquidIngredients.some(
      (name) =>
        normalized === name ||
        normalized.includes(`${name} `) ||
        normalized.includes(` ${name}`)
    );
  };

  const isButter = (ingredient) => {
    const normalized = normalizeIngredient(ingredient);

    return butterIngredients.some(
      (name) =>
        normalized === name ||
        normalized.includes(`${name} `) ||
        normalized.includes(` ${name}`)
    );
  };

  const getCupConversion = (value, ingredient) => {
    if (isButter(ingredient)) {
      return {
        value: Math.round(value * 227),
        unit: 'g'
      };
    }

    const dryWeight = getDryWeight(ingredient);

    if (dryWeight !== null) {
      return {
        value: Math.round(value * dryWeight),
        unit: 'g'
      };
    }

    if (isLiquid(ingredient)) {
      return {
        value: Math.round(value * CUP_ML),
        unit: 'ml'
      };
    }

    return {
      value: Math.round(value * CUP_ML),
      unit: 'ml'
    };
  };

  const getTablespoonConversion = (value, ingredient) => {
    if (isButter(ingredient)) {
      return {
        value: Math.round(value * 14.2),
        unit: 'g'
      };
    }

    const dryWeight = getDryWeight(ingredient);

    if (dryWeight !== null) {
      return {
        value: Math.round((value * dryWeight) / 16),
        unit: 'g'
      };
    }

    return {
      value: Math.round(value * TABLESPOON_ML),
      unit: 'ml'
    };
  };

  const getTeaspoonConversion = (value, ingredient) => {
    if (isButter(ingredient)) {
      return {
        value: Math.round(value * 4.7),
        unit: 'g'
      };
    }

    const dryWeight = getDryWeight(ingredient);

    if (dryWeight !== null) {
      return {
        value: Math.round((value * dryWeight) / 48),
        unit: 'g'
      };
    }

    return {
      value: Math.round(value * TEASPOON_ML),
      unit: 'ml'
    };
  };

  const getSimpleFraction = (value) => {
    if (!Number.isFinite(value)) {
      return '';
    }

    const whole = Math.floor(value);
    const fraction = value - whole;

    if (fraction < 0.125) {
      return whole.toString();
    }

    if (fraction < 0.375) {
      return whole > 0
        ? `${whole} 1/4`
        : '1/4';
    }

    if (fraction < 0.625) {
      return whole > 0
        ? `${whole} 1/2`
        : '1/2';
    }

    if (fraction < 0.875) {
      return whole > 0
        ? `${whole} 1/2`
        : '1/2';
    }

    return `${whole + 1}`;
  };

  const formatCupQuantity = (value) => {
    const formatted = getSimpleFraction(value);

    if (formatted === '1') {
      return '1 cup';
    }

    if (
      formatted.endsWith('1') &&
      !formatted.includes(' ')
    ) {
      return `${formatted} cups`;
    }

    return `${formatted} cup${formatted === '1' ? '' : 's'}`;
  };

  const formatSimpleQuantity = (value, unit) => {
    const formatted = getSimpleFraction(value);

    return `${formatted} ${unit}`;
  };

  const formatMeasurement = (
    value,
    unit,
    ingredient
  ) => {
    const normalizedUnit = unit.toLowerCase();

    if (
      normalizedUnit === 'cup' ||
      normalizedUnit === 'cups'
    ) {
      const conversion =
        getCupConversion(value, ingredient);

      return `${formatCupQuantity(value)} (${conversion.value} ${conversion.unit})`;
    }

    if (
      normalizedUnit === 'tbsp' ||
      normalizedUnit === 'tablespoon' ||
      normalizedUnit === 'tablespoons'
    ) {
      const conversion =
        getTablespoonConversion(
          value,
          ingredient
        );

      return `${formatSimpleQuantity(
        value,
        'tbsp'
      )} (${conversion.value} ${conversion.unit})`;
    }

    if (
      normalizedUnit === 'tsp' ||
      normalizedUnit === 'teaspoon' ||
      normalizedUnit === 'teaspoons'
    ) {
      const conversion =
        getTeaspoonConversion(
          value,
          ingredient
        );

      return `${formatSimpleQuantity(
        value,
        'tsp'
      )} (${conversion.value} ${conversion.unit})`;
    }

    return formatNumber(value);
  };

  const scaleIngredient = (ingredient) => {
    if (!ingredient) {
      return ingredient;
    }

    const ratio =
      selectedMembers / baseServings;

    const mixedNumberRegex =
      /(\d+(?:\.\d+)?)\s+(\d+\s*\/\s*\d+)\s*(cups?|tbsp|tablespoons?|tsp|teaspoons?)/i;

    const fractionRegex =
      /(\d+\s*\/\s*\d+)\s*(cups?|tbsp|tablespoons?|tsp|teaspoons?)/i;

    const numberRegex =
      /(\d+(?:\.\d+)?)\s*(cups?|tbsp|tablespoons?|tsp|teaspoons?|g|ml|grams?|milliliters?)/i;

    const mixedMatch =
      ingredient.match(mixedNumberRegex);

    if (mixedMatch) {
      const whole = Number(mixedMatch[1]);
      const fraction = parseFraction(mixedMatch[2]);

      if (fraction !== null) {
        const quantity = whole + fraction;
        const scaled = quantity * ratio;
        const unit = mixedMatch[3];

        const formatted =
          formatMeasurement(
            scaled,
            unit,
            ingredient
          );

        return ingredient.replace(
          mixedMatch[0],
          formatted
        );
      }
    }

    const fractionMatch =
      ingredient.match(fractionRegex);

    if (fractionMatch) {
      const quantity =
        parseFraction(fractionMatch[1]);

      if (quantity !== null) {
        const scaled = quantity * ratio;
        const unit = fractionMatch[2];

        const formatted =
          formatMeasurement(
            scaled,
            unit,
            ingredient
          );

        return ingredient.replace(
          fractionMatch[0],
          formatted
        );
      }
    }

    const numberMatch =
      ingredient.match(numberRegex);

    if (numberMatch) {
      const quantity = Number(numberMatch[1]);

      if (!Number.isNaN(quantity)) {
        const unit = numberMatch[2].toLowerCase();
        const scaled = quantity * ratio;

        if (
          unit === 'g' ||
          unit === 'gram' ||
          unit === 'grams'
        ) {
          return ingredient.replace(
            numberMatch[0],
            `${formatNumber(scaled)} g`
          );
        }

        if (
          unit === 'ml' ||
          unit === 'milliliter' ||
          unit === 'milliliters'
        ) {
          return ingredient.replace(
            numberMatch[0],
            `${formatNumber(scaled)} ml`
          );
        }

        const formatted =
          formatMeasurement(
            scaled,
            unit,
            ingredient
          );

        return ingredient.replace(
          numberMatch[0],
          formatted
        );
      }
    }

    return ingredient;
  };

  const handleMemberChange = (members) => {
    setShowMembersDropdown(false);
    setSearchParams({
      members: members.toString()
    });
    stopSpeaking();
  };

  const steps = recipe?.stepsRaw || [];
  const totalSteps = steps.length;

  const updateProgress = (stepIndex) => {
    const stepNumber = stepIndex + 1;

    setCurrentStep(stepNumber);

    setProgress(
      totalSteps > 0
        ? (stepNumber / totalSteps) * 100
        : 0
    );
  };

  const speakStep = (stepIndex) => {
    if (
      !steps.length ||
      stepIndex < 0 ||
      stepIndex >= steps.length
    ) {
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert(
        'Your browser does not support text-to-speech.'
      );
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        `Step ${stepIndex + 1}: ${steps[stepIndex]}`
      );

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    updateProgress(stepIndex);
    setIsPlaying(true);

    utterance.onend = () => {
      speechRef.current = null;

      if (stepIndex < steps.length - 1) {
        timerRef.current = setTimeout(() => {
          speakStep(stepIndex + 1);
        }, 1000);
      } else {
        setIsPlaying(false);
      }
    };

    utterance.onerror = () => {
      speechRef.current = null;
      setIsPlaying(false);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = (reset = false) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    speechRef.current = null;
    setIsPlaying(false);

    if (reset) {
      setCurrentStep(0);
      setProgress(0);
    }
  };

  const handleStart = () => {
    if (!steps.length) {
      return;
    }

    if (isPlaying) {
      stopSpeaking();
      return;
    }

    const startIndex =
      currentStep > 0 &&
      currentStep < totalSteps
        ? currentStep
        : 0;

    speakStep(startIndex);
  };

  const handleNextStep = () => {
    if (
      !steps.length ||
      currentStep >= totalSteps
    ) {
      return;
    }

    stopSpeaking();
    speakStep(currentStep);
  };

  const handlePrevStep = () => {
    if (
      !steps.length ||
      currentStep <= 1
    ) {
      return;
    }

    stopSpeaking();
    speakStep(currentStep - 2);
  };

  const handleRestart = () => {
    if (!steps.length) {
      return;
    }

    stopSpeaking();
    speakStep(0);
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
          <h2>
            {error || 'Recipe not found'}
          </h2>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-page">
      <header className="recipe-detail-header">
        <div className="recipe-detail-header-content">
          <h1 className="recipe-detail-title">
            Recipe Detail
          </h1>
        </div>
      </header>

      <main className="recipe-detail-main">
        <div className="recipe-detail-card">
         
<div
  className="recipe-detail-card-image"
  style={{
    backgroundImage: `url("/${recipe.image}")`
  }}
/>
        

          <div className="recipe-detail-card-content">
            <h3 className="recipe-detail-card-title">
              {recipe.title}
            </h3>

            <span className="recipe-card-serving">
              {selectedMembers} persons
            </span>
          </div>
        </div>

        <div className="back-button-container">
          <button
            type="button"
            className="back-home-btn"
            onClick={() => navigate(-1)}
          >
            <span>←</span>
            Back to Home
          </button>
        </div>
      </main>

      <div
        className="recipe-detail-modal-overlay"
        onClick={() => navigate(-1)}
      >
        <div
          className="recipe-detail-modal"
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          <div className="recipe-detail-modal-hero">
            <div className="recipe-detail-modal-hero-left">
              <div className="recipe-detail-hero-content">
                <h2 className="recipe-detail-modal-hero-title">
                  {recipe.title}
                </h2>

                <div className="recipe-detail-serving-info">
                  <span>
                    Serving size
                  </span>

                  <div className="members-selector">
                    <button
                      type="button"
                      className="members-selector-btn"
                      onClick={() =>
                        setShowMembersDropdown(
                          (previous) =>
                            !previous
                        )
                      }
                    >
                      <span>👥</span>

                      <span>
                        {selectedMembers} persons
                      </span>

                      <span className="members-arrow">
                        {showMembersDropdown
                          ? '▲'
                          : '▼'}
                      </span>
                    </button>

                    {showMembersDropdown && (
                      <div className="members-dropdown">
                        {memberOptions.map(
                          (members) => (
                            <button
                              type="button"
                              key={members}
                              className={`members-option ${
                                selectedMembers ===
                                members
                                  ? 'active'
                                  : ''
                              }`}
                              onClick={() =>
                                handleMemberChange(
                                  members
                                )
                              }
                            >
                              <span>
                                {members} persons
                              </span>

                              {baseServings ===
                                members && (
                                <small>
                                  Base
                                </small>
                              )}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="recipe-detail-modal-hero-right">
             <img
  src={`/${recipe.image}`}
  alt={recipe.title}
  className="recipe-detail-modal-hero-img"
/>
            </div>

            <button
              type="button"
              className="recipe-detail-modal-close"
              onClick={() => navigate(-1)}
              aria-label="Close recipe"
            >
              ×
            </button>
          </div>

          <div className="recipe-detail-modal-body">
            <div className="recipe-detail-modal-col">
              <div className="recipe-detail-modal-col-header">
                <i className="fas fa-list-ul"></i>

                <h3>
                  Ingredients
                </h3>
              </div>

              <div className="recipe-detail-modal-scroll">
                {recipe.ingredientsRaw?.length ? (
                  recipe.ingredientsRaw.map(
                    (ingredient, index) => (
                      <div
                        key={index}
                        className="recipe-detail-ingredient-item"
                      >
                        <span className="recipe-detail-ingredient-dot"></span>

                        <span className="recipe-detail-ingredient-text">
                          {scaleIngredient(
                            ingredient
                          )}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <p>
                    No ingredients available.
                  </p>
                )}
              </div>
            </div>

            <div className="recipe-detail-modal-col recipe-detail-modal-col--steps">
              <div className="recipe-detail-modal-col-header">
                <i className="fas fa-shoe-prints"></i>

                <h3>
                  Steps to Make
                </h3>
              </div>

              <div className="recipe-detail-modal-scroll">
                {steps.length ? (
                  steps.map(
                    (step, index) => (
                      <div
                        key={index}
                        className={`recipe-detail-step-item ${
                          currentStep ===
                          index + 1
                            ? 'active'
                            : ''
                        }`}
                      >
                        <span className="recipe-detail-step-num">
                          {index + 1}
                        </span>

                        <span className="recipe-detail-step-text">
                          {step}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <p>
                    No preparation steps available.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="recipe-detail-voice-bar">
            <div className="recipe-detail-voice-left">
              <i className="fas fa-volume-up recipe-detail-voice-icon"></i>

              <span className="recipe-detail-voice-label">
                Voice Guide
              </span>
            </div>

            <div className="recipe-detail-voice-progress">
              <div className="recipe-detail-progress-track">
                <div
                  className="recipe-detail-progress-fill"
                  style={{
                    width: `${progress}%`
                  }}
                />
              </div>

              <div className="recipe-detail-progress-info">
                <span>
                  Step {currentStep} of {totalSteps}
                </span>

                <span>
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <div className="recipe-detail-voice-controls">
              <button
                type="button"
                className="recipe-detail-step-btn"
                onClick={handlePrevStep}
                disabled={
                  currentStep <= 1 ||
                  !totalSteps
                }
              >
                <i className="fas fa-step-backward"></i>
                Prev
              </button>

              <button
                type="button"
                className={`recipe-detail-voice-main-btn ${
                  isPlaying
                    ? 'stop'
                    : 'play'
                }`}
                onClick={handleStart}
                disabled={!totalSteps}
              >
                {isPlaying ? (
                  <>
                    <i className="fas fa-stop"></i>
                    Stop
                  </>
                ) : (
                  <>
                    <i className="fas fa-play"></i>
                    Start
                  </>
                )}
              </button>

              <button
                type="button"
                className="recipe-detail-step-btn"
                onClick={handleNextStep}
                disabled={
                  !totalSteps ||
                  currentStep >= totalSteps
                }
              >
                Next
                <i className="fas fa-step-forward"></i>
              </button>

              <button
                type="button"
                className="recipe-detail-step-btn"
                onClick={handleRestart}
                disabled={!totalSteps}
              >
                <i className="fas fa-redo"></i>
                Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;