import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MealCalendar.css';

const MealCalendar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode') || 'custom';

  const [currentView, setCurrentView] = useState('daily');
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  
  const [preferences] = useState({
    duration: 'weekly',
    dietType: 'non-veg',
    targetAudience: 'general',
    budget: 'standard'
  });

  // Real food images from Unsplash and Google
  const breakfastImages = {
    0: 'https://images.unsplash.com/photo-1510693206979-2c6a8f1b8e3e?w=150&h=150&fit=crop',
    1: 'https://images.unsplash.com/photo-1517438476315-10d7a1c6e5f7?w=150&h=150&fit=crop',
    2: 'https://images.unsplash.com/photo-1525351483668-5f8d8c3f6c6c?w=150&h=150&fit=crop',
    3: 'https://images.unsplash.com/photo-1533089860892-f7c6f0a3f5c6?w=150&h=150&fit=crop',
    4: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=150&h=150&fit=crop',
    5: 'https://images.unsplash.com/photo-1521305916504-4a1121188589?w=150&h=150&fit=crop',
    6: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=150&h=150&fit=crop'
  };
  
  const lunchImages = {
    0: 'https://images.unsplash.com/photo-1563379091339-03b21dd4dfa3?w=150&h=150&fit=crop',
    1: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150&h=150&fit=crop',
    2: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop',
    3: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=150&h=150&fit=crop',
    4: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=150&h=150&fit=crop',
    5: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150&h=150&fit=crop',
    6: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=150&h=150&fit=crop'
  };
  
  const dinnerImages = {
    0: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=150&h=150&fit=crop',
    1: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=150&h=150&fit=crop',
    2: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=150&h=150&fit=crop',
    3: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=150&h=150&fit=crop',
    4: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=150&h=150&fit=crop',
    5: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=150&h=150&fit=crop',
    6: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=150&h=150&fit=crop'
  };

  // Dummy meal plan data with real names
  const [mealPlan] = useState({
    0: {
      breakfast: { _id: '1', name: 'Eggs Benedict with Avocado', image: breakfastImages[0], available: true, tagline: 'Poached eggs on English muffin with hollandaise' },
      lunch: { _id: '2', name: 'Chicken Biryani', image: lunchImages[0], available: true, tagline: 'Aromatic basmati rice with tender chicken' },
      dinner: { _id: '3', name: 'Grilled Salmon with Vegetables', image: dinnerImages[0], available: true, tagline: 'Healthy grilled salmon with roasted veggies' }
    },
    1: {
      breakfast: { _id: '4', name: 'Oatmeal with Berries', image: breakfastImages[1], available: true, tagline: 'Healthy oatmeal topped with fresh berries' },
      lunch: { _id: '5', name: 'Vegetable Pulao', image: lunchImages[1], available: true, tagline: 'Fragrant rice with mixed vegetables' },
      dinner: { _id: '6', name: 'Chicken Karahi', image: dinnerImages[1], available: true, tagline: 'Spicy Pakistani curry with tomatoes' }
    },
    2: {
      breakfast: { _id: '7', name: 'Pancakes with Maple Syrup', image: breakfastImages[2], available: true, tagline: 'Fluffy pancakes with sweet maple syrup' },
      lunch: { _id: '8', name: 'Beef Burger', image: lunchImages[2], available: true, tagline: 'Juicy beef patty with cheese and fries' },
      dinner: { _id: '9', name: 'Fish Fry', image: dinnerImages[2], available: true, tagline: 'Crispy fried fish with tartar sauce' }
    },
    3: {
      breakfast: { _id: '10', name: 'French Toast', image: breakfastImages[3], available: true, tagline: 'Egg battered bread with powdered sugar' },
      lunch: { _id: '11', name: 'Chicken Noodles', image: lunchImages[3], available: true, tagline: 'Stir-fried noodles with chicken' },
      dinner: { _id: '12', name: 'Mutton Curry', image: dinnerImages[3], available: true, tagline: 'Slow cooked mutton in rich gravy' }
    },
    4: {
      breakfast: { _id: '13', name: 'Fruit Salad', image: breakfastImages[4], available: true, tagline: 'Fresh mixed fruits with honey' },
      lunch: { _id: '14', name: 'Daal Chawal', image: lunchImages[4], available: true, tagline: 'Classic lentil curry with steamed rice' },
      dinner: { _id: '15', name: 'Chicken Soup', image: dinnerImages[4], available: true, tagline: 'Warm chicken noodle soup' }
    },
    5: {
      breakfast: { _id: '16', name: 'Paratha with Egg', image: breakfastImages[5], available: true, tagline: 'Traditional flatbread with scrambled egg' },
      lunch: { _id: '17', name: 'Chicken Sandwich', image: lunchImages[5], available: true, tagline: 'Grilled chicken with lettuce and mayo' },
      dinner: { _id: '18', name: 'BBQ Platter', image: dinnerImages[5], available: true, tagline: 'Assorted grilled meats with sauce' }
    },
    6: {
      breakfast: { _id: '19', name: 'Cereal with Milk', image: breakfastImages[6], available: true, tagline: 'Crunchy cereal with cold milk' },
      lunch: { _id: '20', name: 'Pasta Alfredo', image: lunchImages[6], available: true, tagline: 'Creamy pasta with parmesan cheese' },
      dinner: { _id: '21', name: 'Roast Chicken', image: dinnerImages[6], available: true, tagline: 'Herb roasted chicken with potatoes' }
    }
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayShortNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const getWeekDates = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay() + 1 + (currentWeekOffset * 7));
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.getDate());
    }
    return dates;
  };

  const getDateRange = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay() + 1 + (currentWeekOffset * 7));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${startDate.getDate()} ${months[startDate.getMonth()]} - ${endDate.getDate()} ${months[endDate.getMonth()]}`;
  };

  const previousWeek = () => setCurrentWeekOffset(prev => prev - 1);
  const nextWeek = () => setCurrentWeekOffset(prev => prev + 1);
  const switchView = (view) => setCurrentView(view);
  const backToPreferences = () => navigate('/meal-planner');

  const savePlan = () => {
    alert('✅ Meal plan saved successfully!');
  };

  const viewRecipe = (recipeName) => {
    alert(`📖 Viewing recipe: ${recipeName}\n\nFull recipe with ingredients and steps will be available soon!`);
  };

  const changeRecipe = (mealName) => {
    alert(`🔄 Change recipe: ${mealName}\n\nYou can search and select a different recipe.`);
  };

  const dates = getWeekDates();

  return (
    <div className="meal-planner-app">
      <div className="meal-planner-wrapper">
       
          <div className="mp-fullscreen-content">
            <h1>Your Meal Calendar</h1>
            <p>View and manage your personalized meal plan</p>
          
        </div>

        <div className="mp-calendar-container">
          <div className="mp-calendar-top-section">
            <button className="mp-btn-back" onClick={backToPreferences}>
              ← Back to Preferences
            </button>
            <div className="mp-plan-info-banner">
              <div className="mp-plan-info-item">
                <span className="mp-info-label">Diet:</span>
                <span className="mp-info-value">Non-Vegetarian</span>
              </div>
              <div className="mp-plan-info-item">
                <span className="mp-info-label">For:</span>
                <span className="mp-info-value">General</span>
              </div>
              <div className="mp-plan-info-item">
                <span className="mp-info-label">Duration:</span>
                <span className="mp-info-value">Weekly</span>
              </div>
              <div className="mp-plan-info-item">
                <span className="mp-info-label">Budget:</span>
                <span className="mp-info-value">Standard</span>
              </div>
              <div className="mp-plan-info-item">
                <span className="mp-info-label">Mode:</span>
                <span className="mp-info-value">{mode === 'pantry' ? 'Pantry Mode' : 'AI Mode'}</span>
              </div>
            </div>
          </div>

          <div className="mp-view-toggle">
            <button className={`mp-view-btn ${currentView === 'daily' ? 'mp-active' : ''}`} onClick={() => switchView('daily')}>Daily View</button>
            <button className={`mp-view-btn ${currentView === 'weekly' ? 'mp-active' : ''}`} onClick={() => switchView('weekly')}>Weekly View</button>
          </div>

          <div className="mp-date-navigation">
            <button className="mp-nav-arrow" onClick={previousWeek}>‹</button>
            <div className="mp-date-range">{getDateRange()}</div>
            <button className="mp-nav-arrow" onClick={nextWeek}>›</button>
          </div>

          {/* DAILY VIEW */}
          {currentView === 'daily' && (
            <div className="mp-daily-view">
              <div className="mp-day-selector">
                {days.map((day, index) => (
                  <div key={index} className={`mp-day-tab ${index === selectedDay ? 'mp-active' : ''}`} onClick={() => setSelectedDay(index)}>
                    <div className="mp-day-name-short">{dayShortNames[index]}</div>
                    <div className="mp-day-date-num">{dates[index]}</div>
                  </div>
                ))}
              </div>
              <div className="mp-daily-meals-container">
                {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                  const meal = mealPlan[selectedDay]?.[mealType];
                  const mealIcon = mealType === 'breakfast' ? '🍳' : mealType === 'lunch' ? '🍽️' : '🍲';
                  return (
                    <div key={mealType} className="mp-daily-meal-section">
                      <h2 className="mp-meal-type-heading">{mealIcon} {mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
                      <div className="mp-meal-display-card">
                        <div className="mp-meal-image-section">
                          <img 
                            src={meal?.image} 
                            alt={meal?.name}
                            style={{ 
                              width: '150px', 
                              height: '150px', 
                              objectFit: 'cover',
                              borderRadius: '12px'
                            }}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&h=150&fit=crop';
                            }}
                          />
                          <div className={`mp-status-badge ${meal?.available ? 'mp-available' : 'mp-unavailable'}`}>
                            {meal?.available ? '✅ Available' : '❌ Missing Items'}
                          </div>
                        </div>
                        <div className="mp-meal-details-section">
                          <h3 className="mp-meal-title">{meal?.name || 'No recipe selected'}</h3>
                          <p className="mp-meal-tagline">{meal?.tagline || 'Delicious homemade meal'}</p>
                          <div className="mp-meal-buttons">
                            {meal && (
                              <button className="mp-view-recipe-btn" onClick={() => viewRecipe(meal.name)}>
                                📖 View Recipe
                              </button>
                            )}
                            <button className="mp-add-recipe-btn" onClick={() => changeRecipe(meal?.name || 'this meal')}>
                              {meal ? '🔄 Change Recipe' : '+ Add Recipe'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* WEEKLY VIEW */}
          {currentView === 'weekly' && (
            <div className="mp-weekly-view">
              <div className="mp-weekly-grid-header">
                <div className="mp-grid-cell mp-header-cell mp-empty-cell"></div>
                <div className="mp-grid-cell mp-header-cell">🍳 Breakfast</div>
                <div className="mp-grid-cell mp-header-cell">🍽️ Lunch</div>
                <div className="mp-grid-cell mp-header-cell">🍲 Dinner</div>
              </div>
              {days.map((_, dayIndex) => (
                <div key={dayIndex} className="mp-weekly-grid-row">
                  <div className="mp-grid-cell mp-day-cell">
                    <div className="mp-day-label">
                      <span className="mp-day-short">{dayShortNames[dayIndex]}</span>
                      <span className="mp-day-num">{dates[dayIndex]}</span>
                    </div>
                  </div>
                  {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                    const meal = mealPlan[dayIndex]?.[mealType];
                    return (
                      <div key={mealType} className="mp-grid-cell mp-meal-cell">
                        <div className="mp-weekly-meal-box">
                          <div className="mp-weekly-meal-img-wrapper">
                            <img 
                              src={meal?.image} 
                              alt={meal?.name}
                              style={{ 
                                width: '80px', 
                                height: '80px', 
                                objectFit: 'cover',
                                borderRadius: '8px'
                              }}
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop';
                              }}
                            />
                            <div className={`mp-weekly-status-icon ${meal?.available ? 'mp-available' : 'mp-unavailable'}`}></div>
                          </div>
                          <div className="mp-weekly-meal-text">
                            <div className="mp-weekly-meal-name">{meal?.name || 'No recipe'}</div>
                            <div className="mp-weekly-buttons">
                              <button className="mp-weekly-view-recipe-btn" onClick={() => viewRecipe(meal?.name || 'Recipe')}>
                                View
                              </button>
                              <button className="mp-weekly-change-btn" onClick={() => changeRecipe(meal?.name || 'this meal')}>
                                Change
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          <div className="mp-plan-actions">
            <button className="mp-action-button mp-save-btn" onClick={savePlan}>
              💾 Save Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCalendar;