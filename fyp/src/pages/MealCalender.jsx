import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MealCalender.css';

const MealCalender = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('daily');
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  
  // Preferences from MealPlanner - RECEIVING ALL SELECTIONS
  const [preferences, setPreferences] = useState({
    duration: 'weekly',
    dietType: 'veg',
    targetAudience: 'general',
    ageGroup: '',
    patientCondition: '',
    allergies: [],
    familyMembers: '2',
    budget: 'standard',
    planningMode: 'ai'
  });

  // Meal plan data - FILTERED BASED ON PREFERENCES
  const [mealPlan, setMealPlan] = useState({
    0: { 
      breakfast: { 
        name: 'Vegetable Paratha', 
        available: true,
        image: 'https://images.unsplash.com/photo-1630409346730-1beb04c65b6b?w=400'
  
      },
      lunch: { 
        name: 'Palak Paneer', 
        available: true,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400'

      },
      dinner: { 
        name: 'Daal Chawal', 
        available: true,
        image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400'
      }
    },
    1: {
      breakfast: { 
        name: 'Aloo Paratha', 
        available: true,
        image: 'https://images.unsplash.com/photo-1630409346730-1beb04c65b6b?w=400'
      },
      lunch: { 
        name: 'Chana Masala', 
        available: true,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400'
      },
      dinner: { 
        name: 'Vegetable Pasta', 
        available: true,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400'
      }
    },
    2: {
      breakfast: { 
        name: 'Vegetable Sandwich', 
        available: true,
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400'
      },
      lunch: { 
        name: 'Rajma Chawal', 
        available: true,
        image: 'https://images.unsplash.com/photo-1596040033229-a0b7e2d82ae8?w=400'
      },
      dinner: { 
        name: 'Mixed Veg Curry', 
        available: true,
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400'
      }
    },
    3: {
      breakfast: { 
        name: 'Upma', 
        available: true,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400'
      },
      lunch: { 
        name: 'Paneer Tikka', 
        available: true,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400'
      },
      dinner: { 
        name: 'Vegetable Soup', 
        available: true,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'
      }
    },
    4: {
      breakfast: { 
        name: 'Poha', 
        available: true,
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400'
        
      },
      lunch: { 
        name: 'Chole Bhature', 
        available: true,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400'
       
      },
      dinner: { 
        name: 'Khichdi', 
        available: true,
        image: 'https://images.unsplash.com/photo-1645696261385-5b8253a96ab3?w=400'
       
      }
    },
    5: {
      breakfast: { 
        name: 'Idli Sambhar', 
        available: true,
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400'
        
      },
      lunch: { 
        name: 'Baingan Bharta', 
        available: true,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400'
       
      },
      dinner: { 
        name: 'Veg Fried Rice', 
        available: true,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400'
      
      }
    },
    6: {
      breakfast: { 
        name: 'Masala Dosa', 
        available: true,
        image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400'
       
      },
      lunch: { 
        name: 'Veg Biryani', 
        available: true,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400'
       
      },
      dinner: { 
        name: 'Paneer Butter Masala', 
        available: true,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400'
       
      }
    }
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayShortNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('mealPreferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setPreferences(prefs);
      
      // Generate meal plan based on preferences
      console.log(' Generating meal plan based on:');
      console.log('Duration:', prefs.duration);
      console.log(' Diet Type:', prefs.dietType);
      console.log('Target Audience:', prefs.targetAudience);
      console.log('Age Group:', prefs.ageGroup);
      console.log('Patient Condition:', prefs.patientCondition);
      console.log('Allergies:', prefs.allergies);
      console.log('Family Members:', prefs.familyMembers);
      console.log(' Budget:', prefs.budget);
      console.log(' Planning Mode:', prefs.planningMode);
      
      // Here you would call your backend API or AI service
      // to generate personalized meal plan
      generateMealPlanBasedOnPreferences(prefs);
    }
  }, []);

  // Function to generate meal plan based on selections
  const generateMealPlanBasedOnPreferences = (prefs) => {
    // In real implementation, this would:
    // 1. Filter recipes by dietType (veg/non-veg)
    // 2. Adjust based on targetAudience (kids-friendly, patient-specific)
    // 3. Exclude allergies
    // 4. Adjust portions by familyMembers
    // 5. Match budget category
    // 6. Use planningMode (pantry/AI/custom)
    
    // For now, using dummy data
    // The meal plan above is already vegetarian as an example
  };

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

  const previousWeek = () => setCurrentWeekOffset(currentWeekOffset - 1);
  const nextWeek = () => setCurrentWeekOffset(currentWeekOffset + 1);
  const switchView = (view) => setCurrentView(view);
  
  const backToPreferences = () => {
    navigate('/meal-planner');
  };

  const savePlan = () => {
    alert('Meal plan saved successfully!');
  };

  const dates = getWeekDates();

  // Helper function to get target audience display text
  const getTargetAudienceText = () => {
    if (preferences.targetAudience === 'general') return 'General';
    if (preferences.targetAudience === 'kids') return `Kids (${preferences.ageGroup})`;
    if (preferences.targetAudience === 'patient') return `Patient (${preferences.patientCondition})`;
    return '';
  };

  // Helper function to get budget display text
  const getBudgetText = () => {
    if (preferences.budget === 'economy') return ' Economy';
    if (preferences.budget === 'standard') return ' Standard';
    if (preferences.budget === 'premium') return ' Premium';
    if (preferences.budget === 'deluxe') return 'Deluxe';
    return preferences.budget;
  };

  return (
    <div className="meal-planner-app">
      {/* Main Content */}
      <div className="meal-planner-wrapper">
        {/* Full Screen Image Banner */}
        <div className="mp-fullscreen-image">
          <div className="mp-fullscreen-content">
            <h1>Your Meal Calendar</h1>
            <p>View and manage your personalized meal plan</p>
          </div>
        </div>

        <div className="mp-calendar-container">
          {/* Back Button and Plan Info */}
          <div className="mp-calendar-top-section">
            <button className="mp-btn-back" onClick={backToPreferences}>
              ← Back to Preferences
            </button>
            
            {/* Display current plan preferences */}
            <div className="mp-plan-info-banner">
              <div className="mp-plan-info-item">
                <span className="mp-info-label">Diet:</span>
                <span className="mp-info-value">{preferences.dietType === 'veg' ? 'Vegetarian' : 'Non-Veg'}</span>
              </div>
              <div className="mp-plan-info-item">
                <span className="mp-info-label">For:</span>
                <span className="mp-info-value">{getTargetAudienceText()}</span>
              </div>
              <div className="mp-plan-info-item">
                <span className="mp-info-label">Duration:</span>
                <span className="mp-info-value">{preferences.duration === 'daily' ? 'Daily' : 'Weekly'}</span>
              </div>
              <div className="mp-plan-info-item">
                <span className="mp-info-label">Budget:</span>
                <span className="mp-info-value">{getBudgetText()}</span>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="mp-view-toggle">
            <button
              className={`mp-view-btn ${currentView === 'daily' ? 'mp-active' : ''}`}
              onClick={() => switchView('daily')}
            >
              Daily View
            </button>
            <button
              className={`mp-view-btn ${currentView === 'weekly' ? 'mp-active' : ''}`}
              onClick={() => switchView('weekly')}
            >
              Weekly View
            </button>
          </div>

          {/* Date Navigation */}
          <div className="mp-date-navigation">
            <button className="mp-nav-arrow" onClick={previousWeek}>‹</button>
            <div className="mp-date-range">{getDateRange()}</div>
            <button className="mp-nav-arrow" onClick={nextWeek}>›</button>
          </div>

          {/* Daily View */}
          {currentView === 'daily' && (
            <div className="mp-daily-view">
              {/* Day Selector */}
              <div className="mp-day-selector">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`mp-day-tab ${index === selectedDay ? 'mp-active' : ''}`}
                    onClick={() => setSelectedDay(index)}
                  >
                    <div className="mp-day-name-short">{dayShortNames[index]}</div>
                    <div className="mp-day-date-num">{dates[index]}</div>
                  </div>
                ))}
              </div>

              {/* Meals for Selected Day */}
              <div className="mp-daily-meals-container">
                {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                  const meal = mealPlan[selectedDay][mealType];
                  if (!meal) return null;

                  return (
                    <div key={mealType} className="mp-daily-meal-section">
                      <h2 className="mp-meal-type-heading">
                        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                      </h2>
                      
                      <div className="mp-meal-display-card">
                        <div className="mp-meal-image-section">
                          <img src={meal.image} alt={meal.name} />
                          <div className={`mp-status-badge ${meal.available ? 'mp-available' : 'mp-unavailable'}`}>
                            {meal.available ? ' Available' : 'Missing Items'}
                          </div>
                        </div>
                        
                        <div className="mp-meal-details-section">
                          <h3 className="mp-meal-title">{meal.name}</h3>
                          
                          <div className="mp-meal-info-row">
                            <span className="mp-info-item">
                               {meal.time}
                            </span>
                            <span className="mp-info-item">
                              {meal.servings}
                            </span>
                          </div>

                          {!meal.available && meal.missingItems && (
                            <div className="mp-missing-ingredients">
                              <strong>Need to buy:</strong> {meal.missingItems.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Weekly View */}
          {currentView === 'weekly' && (
            <div className="mp-weekly-view">
              {/* Header Row */}
              <div className="mp-weekly-grid-header">
                <div className="mp-grid-cell mp-header-cell mp-empty-cell"></div>
                <div className="mp-grid-cell mp-header-cell">Breakfast</div>
                <div className="mp-grid-cell mp-header-cell">Lunch</div>
                <div className="mp-grid-cell mp-header-cell">Dinner</div>
              </div>

              {/* Day Rows */}
              {days.map((day, dayIndex) => (
                <div key={dayIndex} className="mp-weekly-grid-row">
                  {/* Day Name Cell */}
                  <div className="mp-grid-cell mp-day-cell">
                    <div className="mp-day-label">
                      <span className="mp-day-short">{dayShortNames[dayIndex]}</span>
                      <span className="mp-day-num">{dates[dayIndex]}</span>
                    </div>
                  </div>

                  {/* Meal Cells */}
                  {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                    const meal = mealPlan[dayIndex][mealType];
                    
                    return (
                      <div key={mealType} className="mp-grid-cell mp-meal-cell">
                        {meal ? (
                          <div className="mp-weekly-meal-box">
                            <div className="mp-weekly-meal-img-wrapper">
                              <img src={meal.image} alt={meal.name} />
                              <div className={`mp-weekly-status-icon ${meal.available ? 'mp-available' : 'mp-unavailable'}`}>
                                {meal.available ? '' : ''}
                              </div>
                            </div>
                            <div className="mp-weekly-meal-text">
                              <div className="mp-weekly-meal-name">{meal.name}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="mp-empty-meal-box">
                            <span className="mp-empty-icon">+</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mp-plan-actions">
            <button className="mp-action-button mp-save-btn" onClick={savePlan}>
              Save Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCalender;