import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
const location = useLocation();

const [results, setResults] = useState({
recipes: [],
guides: []
});

const [loading, setLoading] = useState(true);

const query = new URLSearchParams(location.search).get('q');

useEffect(() => {
const fetchResults = async () => {
if (!query) {
setLoading(false);
return;
}
  try {
    setLoading(true);

    const response = await fetch(
      `http://localhost:5000/api/search?q=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    setResults({
      recipes: data.recipes || [],
      guides: data.guides || []
    });
  } catch (error) {
    console.error('Search error:', error);
  } finally {
    setLoading(false);
  }
};

fetchResults();

}, [query]);

if (loading) {
return ( <div className="search-results-page"> <h2>Searching...</h2> </div>
);
}

const totalResults =
results.recipes.length +
results.guides.length;

return ( <div className="search-results-page"> <div className="search-results-container"> <h1>Search Results</h1>

    {query && (
      <p className="search-query">
        Results for: <strong>{query}</strong>
      </p>
    )}

    {totalResults === 0 && (
      <div className="no-results">
        <h2>No results found</h2>
        <p>Try searching with another keyword.</p>
      </div>
    )}

    {results.recipes.length > 0 && (
      <div className="results-section">
        <h2>Recipes</h2>

        <div className="results-grid">
          {results.recipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe._id}`}
              className="result-card"
              key={recipe._id}
            >
              <img
                src={recipe.image || '/placeholder.jpg'}
                alt={recipe.title}
              />

              <div className="result-content">
                <h3>{recipe.title}</h3>

                {recipe.tagline && (
                  <p>{recipe.tagline}</p>
                )}

                <span className="result-type">
                  Recipe
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )}

    {results.guides.length > 0 && (
      <div className="results-section">
        <h2>Cooking Guides</h2>

        <div className="results-grid">
          {results.guides.map((guide) => (
            <Link
              to={`/guidance`}
              className="result-card"
              key={guide._id}
            >
              <img
                src={
                  guide.image ||
                  guide.previewImg ||
                  '/placeholder.jpg'
                }
                alt={guide.title}
              />

              <div className="result-content">
                <h3>{guide.title}</h3>

                {guide.tagline && (
                  <p>{guide.tagline}</p>
                )}

                <span className="result-type">
                  Guide
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
</div>

);
};

export default SearchResults;
