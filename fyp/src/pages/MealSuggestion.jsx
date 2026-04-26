import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MealSuggestion.css';

const MealSuggestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pantryCount, setPantryCount] = useState(0);
  const [searchedFor, setSearchedFor] = useState('');

  // Get search param from URL if any
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('q');
    if (searchParam) {
      setSearchQuery(searchParam);
      fetchSuggestions(searchParam);
    } else {
      fetchSuggestions('');
    }
  }, [location.search]);

  const fetchSuggestions = async (search = searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      const url = search 
        ? `http://localhost:5000/api/meal-suggestions?search=${encodeURIComponent(search)}`
        : 'http://localhost:5000/api/meal-suggestions';
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSuggestionsData(data.suggestions);
        setPantryCount(data.pantryCount || 0);
        if (search) setSearchedFor(search);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to load suggestions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchSuggestions(searchQuery);
    }
  };

  const handleAddToShopping = async (recipe) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/meal-suggestions/add-to-shopping', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipeId: recipe.id,
          missingIngredients: recipe.missing
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(`✅ ${data.message}`);
      } else {
        alert('❌ Failed to add items');
      }
    } catch (error) {
      alert('❌ Error adding items');
    }
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const getMatchColor = (matchPercent) => {
    const percent = parseInt(matchPercent);
    if (percent >= 80) return '#2ecc71';
    if (percent >= 60) return '#27ae60';
    if (percent >= 40) return '#f39c12';
    return '#e74c3c';
  };

  // Example search suggestions
  const exampleSearches = [
    { icon: '🍳', text: 'breakfast', query: 'breakfast' },
    { icon: '🍛', text: 'lunch', query: 'lunch' },
    { icon: '🍽️', text: 'dinner', query: 'dinner' },
    { icon: '⚡', text: 'quick recipes', query: 'quick' },
    { icon: '🌶️', text: 'spicy', query: 'spicy' },
    { icon: '🥗', text: 'healthy', query: 'healthy' },
    { icon: '🍗', text: 'chicken', query: 'chicken' },
    { icon: '🥬', text: 'vegetarian', query: 'vegetarian' }
  ];

  if (loading) {
    return (
      <div className="meal-suggestion-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Finding recipes for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="meal-suggestion-page">
      {/* Header */}
      <header className="suggestion-header">
        <div className="suggestion-header-content">
          <h1 className="suggestion-title">What to Cook Today?</h1>
          <p className="suggestion-description">
            Ask me anything like breakfast, lunch, dinner,what you want!
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Ask something like: 'breakfast', 'dinner quick', 'spicy chicken', 'healthy snack'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">Find Recipes</button>
        </form>
      </div>

      {/* Example Searches */}
      <div className="example-searches">
        <p className="example-title">Try searching for:</p>
        <div className="example-buttons">
          {exampleSearches.map((example, index) => (
            <button
              key={index}
              className="example-btn"
              onClick={() => {
                setSearchQuery(example.query);
                fetchSuggestions(example.query);
              }}
            >
              {example.icon} {example.text}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      {(searchedFor || suggestionsData.length > 0) && (
        <div className="results-info">
          {searchedFor && (
            <p>
              🔍 Showing results for: <strong>"{searchedFor}"</strong>
              {pantryCount > 0 && ` • 🥫 Matched with your ${pantryCount} pantry items`}
            </p>
          )}
          <p>Found <span className="count">{suggestionsData.length}</span> recipes</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{error}</p>
          <button onClick={() => fetchSuggestions()} className="retry-btn">Try Again</button>
        </div>
      )}

      {/* Suggestions Grid */}
      {!error && suggestionsData.length > 0 && (
        <div className="suggestions-grid">
          {suggestionsData.map(recipe => (
            <div key={recipe.id} className="suggestion-card">
              <div 
                className="card-image" 
                style={{ backgroundImage: `url(${recipe.image || 'https://via.placeholder.com/300x200?text=Recipe'})` }}
                onClick={() => handleRecipeClick(recipe.id)}
              ></div>
              <div className="card-content">
                <div className="card-header">
                  <h3 className="recipe-name" onClick={() => handleRecipeClick(recipe.id)}>
                    {recipe.name}
                  </h3>
                  <span 
                    className="match-badge"
                    style={{ backgroundColor: getMatchColor(recipe.match) }}
                  >
                    {recipe.match} Match
                  </span>
                </div>
                
                <p className="recipe-category">
                  {recipe.subCategory || recipe.category || 'Recipe'}
                  {recipe.cookingTime && ` • ⏱️ ${recipe.cookingTime} min`}
                  {recipe.difficulty && ` • ${recipe.difficulty}`}
                </p>
                
                {/* Missing Ingredients */}
                {recipe.missing && recipe.missing.length > 0 ? (
                  <div className="missing-ingredients">
                    <span className="missing-label">Missing from pantry:</span>
                    <span className="missing-items">
                      {recipe.missing.slice(0, 4).join(', ')}
                      {recipe.missing.length > 4 && ` +${recipe.missing.length - 4}`}
                    </span>
                  </div>
                ) : (
                  <div className="full-match-message">
                    <i className="fas fa-check-circle"></i> You have all ingredients! Ready to cook! 🎉
                  </div>
                )}
                
                {/* Progress Bar */}
                <div className="match-progress">
                  <div 
                    className="match-progress-bar"
                    style={{ 
                      width: recipe.match,
                      backgroundColor: getMatchColor(recipe.match)
                    }}
                  ></div>
                </div>
                
                {/* Buttons */}
                <div className="card-actions">
                  <button 
                    className="btn-view-recipe"
                    onClick={() => handleRecipeClick(recipe.id)}
                  >
                    👨‍🍳 View Full Recipe
                  </button>
                  {recipe.missing && recipe.missing.length > 0 && (
                    <button 
                      className="btn-add-shopping"
                      onClick={() => handleAddToShopping(recipe)}
                    >
                      🛒 Add Missing ({recipe.missing.length})
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && suggestionsData.length === 0 && (
        <div className="empty-state">
          {searchedFor ? (
            <>
              <i className="fas fa-search"></i>
              <h3>No recipes found for "{searchedFor}"</h3>
              <p>Try searching with different keywords like breakfast, lunch, dinner, quick, or spicy</p>
            </>
          ) : (
            <>
              <i className="fas fa-utensils"></i>
              <h3>Welcome to Meal Suggester!</h3>
              <p>Search for any type of recipe above - breakfast, lunch, dinner, quick meals, or specific dishes!</p>
            </>
          )}
        </div>
      )}

      {/* Back Button */}
      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate(-1)}>
          <span>←</span> Back
        </button>
      </div>
    </div>
  );
};

export default MealSuggestion;