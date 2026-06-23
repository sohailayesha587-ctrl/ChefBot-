import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MealSuggestion.css';

const MealSuggestion = () => {
  const navigate = useNavigate();
  
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(6);
  const [filters, setFilters] = useState({ meal: 'all', diet: 'all' });

  const dummyRecipes = [
    { id: 1, name: 'Chicken Biryani', category: 'Lunch', time: 45, match: 85, image: 'biryani.jpg' },
    { id: 2, name: 'Spaghetti', category: 'Dinner', time: 25, match: 70, image: 'pasta.jpg' },
    { id: 3, name: 'Masala Omelette', category: 'Breakfast', time: 10, match: 90, image: 'omelette.jpg' },
    { id: 4, name: 'Butter Chicken', category: 'Dinner', time: 40, match: 60, image: 'butter-chicken.jpg' },
    { id: 5, name: 'Vegetable Pulao', category: 'Lunch', time: 30, match: 100, image: 'pulao.jpg' },
    { id: 6, name: 'Garlic Bread', category: 'Snacks', time: 15, match: 80, image: 'garlic-bread.jpg' },
    { id: 7, name: 'Fruit Smoothie', category: 'Breakfast', time: 5, match: 95, image: 'smoothie.jpg' },
    { id: 8, name: 'Chicken Tikka', category: 'Snacks', time: 30, match: 65, image: 'tikka.jpg' },
    { id: 9, name: 'Mutton Curry', category: 'Dinner', time: 60, match: 50, image: 'mutton.jpg' },
    { id: 10, name: 'Egg Fried Rice', category: 'Lunch', time: 20, match: 75, image: 'fried-rice.jpg' },
    { id: 11, name: 'Chocolate Cake', category: 'Dessert', time: 45, match: 40, image: 'cake.jpg' },
    { id: 12, name: 'Aloo Paratha', category: 'Breakfast', time: 30, match: 90, image: 'paratha.jpg' }
  ];

  const mealOptions = ['all', 'breakfast', 'lunch', 'dinner', 'snacks'];
  const dietOptions = ['all', 'veg', 'non-veg'];

  const getColor = (match) => {
    if (match >= 70) return '#22c55e';
    if (match >= 50) return '#f97316';
    return '#ef4444';
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      let filtered = [...dummyRecipes];
      
      if (search) {
        filtered = filtered.filter(r => 
          r.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      if (filters.meal !== 'all') {
        filtered = filtered.filter(r => 
          r.category.toLowerCase() === filters.meal
        );
      }
      
      setRecipes(filtered);
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const loadMore = () => setVisible(prev => prev + 6);

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  const visibleRecipes = recipes.length > 0 ? recipes.slice(0, visible) : dummyRecipes.slice(0, visible);
  const hasMore = recipes.length > 0 ? visible < recipes.length : visible < dummyRecipes.length;

  return (
    <div className="ms-container">
      <header className="ms-header">
        <h1 className="ms-title">What to Cook Today?</h1>
        <p className="ms-description">Search recipes or browse our collection</p>
      </header>

      <div className="ms-main-content">
        <div className="ms-search-section">
          <div className="ms-search-wrapper">
            <input
              type="text"
              className="ms-search-input"
              placeholder="Search: chicken, biryani, pasta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="ms-search-btn" onClick={handleSearch}>Search</button>
          </div>
        </div>

        <div className="ms-filters-bar">
          <select className="ms-filter-select" value={filters.meal} onChange={(e) => setFilters({ ...filters, meal: e.target.value })}>
            {mealOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
          </select>
          <select className="ms-filter-select" value={filters.diet} onChange={(e) => setFilters({ ...filters, diet: e.target.value })}>
            {dietOptions.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
          </select>
          <button className="ms-filter-btn" onClick={handleSearch}>Apply</button>
        </div>

        {loading ? (
          <div className="ms-loading">Loading recipes...</div>
        ) : (
          <>
            <div className="ms-results-info">
              {recipes.length > 0 ? `Found ${recipes.length} recipes` : 'Showing all recipes'}
            </div>

            <div className="ms-suggestions-grid">
              {visibleRecipes.map((recipe) => (
                <div key={recipe.id} className="ms-recipe-card">
                  <div 
                    className="ms-recipe-image" 
                    style={{ backgroundImage: `url(${recipe.image || 'https://via.placeholder.com/400x250?text=No+Image'})` }}
                    onClick={() => handleRecipeClick(recipe.id)}
                  >
                    <span className="ms-match-badge" style={{ backgroundColor: getColor(recipe.match) }}>
                      {recipe.match}%
                    </span>
                  </div>
                  <div className="ms-recipe-content">
                    <h3 className="ms-recipe-name" onClick={() => handleRecipeClick(recipe.id)}>
                      {recipe.name}
                    </h3>
                    <p className="ms-recipe-category">
                      <span>{recipe.category}</span>
                      <span className="ms-recipe-time">⏱ {recipe.time} min</span>
                    </p>
                    <div className="ms-match-progress">
                      <div className="ms-match-progress-bar" style={{ width: `${recipe.match}%`, backgroundColor: getColor(recipe.match) }}></div>
                    </div>
                    <div className="ms-recipe-actions">
                      <button className="ms-btn-view" onClick={() => handleRecipeClick(recipe.id)}>View</button>
                      <button className="ms-btn-cook" onClick={() => handleRecipeClick(recipe.id)}>Cook</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="ms-show-more">
                <button className="ms-show-more-btn" onClick={loadMore}>
                  Show More
                </button>
              </div>
            )}
          </>
        )}

        <div className="ms-back-section">
          <button className="ms-back-btn" onClick={() => navigate(-1)}>← Back</button>
        </div>
      </div>
    </div>
  );
};

export default MealSuggestion;