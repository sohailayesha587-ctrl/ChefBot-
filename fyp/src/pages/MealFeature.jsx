import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MealFeature.css';
const CustomSelect = ({ label, options, value, onChange, required }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="csel" ref={ref}>
      <label className="mc-filter-label">
        {label}
        {required && <span className="mc-required"> *</span>}
      </label>
      <div
        className={`csel__box ${!value ? 'csel__box--empty' : ''} ${open ? 'csel__box--open' : ''}`}
        onClick={() => setOpen((p) => !p)}
      >
        <span className={value ? 'csel__val' : 'csel__ph'}>
          {selected ? selected.label : '-- Select --'}
        </span>
        <span className={`csel__arrow ${open ? 'csel__arrow--up' : ''}`}>▾</span>
      </div>
      {open && (
        <ul className="csel__list">
          {options.map((o) => (
            <li
              key={o.value}
              className={`csel__item ${value === o.value ? 'csel__item--active' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(o.value);
                setOpen(false);
              }}
            >
              {o.label}
              {value === o.value && <span className="csel__tick">✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SHORT_DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const LONG_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MealFeature = () => {
  const navigate = useNavigate();

  const loadFromStorage = () => {
    const savedFilters = localStorage.getItem('mealPlanFilters');
    const savedPlan = localStorage.getItem('mealPlanData');
    const savedGenerated = localStorage.getItem('mealPlanGenerated');
    const savedCustomMembers = localStorage.getItem('mealPlanCustomMembers');
    const savedPlanIdStored = localStorage.getItem('mealPlanSavedId');
    const savedVariety = localStorage.getItem('mealPlanVariety');

    if (savedFilters && savedPlan && savedGenerated === 'true') {
      try {
        return {
          filters: JSON.parse(savedFilters),
          mealPlan: JSON.parse(savedPlan),
          generated: true,
          customMembers: savedCustomMembers || '',
          savedPlanId: savedPlanIdStored || null,
          varietyInfo: savedVariety ? JSON.parse(savedVariety) : null
        };
      } catch (e) {
        console.error(e);
      }
    }

    return {
      filters: { dietType: '', allergy: '', ageGroup: '', familyMembers: '', planDuration: '' },
      mealPlan: {},
      generated: false,
      customMembers: '',
      savedPlanId: null,
      varietyInfo: null
    };
  };

  const initialData = loadFromStorage();

  const [filters, setFilters] = useState(initialData.filters);
  const [customMembers, setCustomMembers] = useState(initialData.customMembers);
  const [showMembersDD, setShowMembersDD] = useState(false);
  const [generated, setGenerated] = useState(initialData.generated);
  const [generating, setGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState(initialData.mealPlan);
  const [savedPlanId, setSavedPlanId] = useState(initialData.savedPlanId);
  const [selectedDay, setSelectedDay] = useState(0);
  const [pantryItems, setPantryItems] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedMealSlot, setSelectedMealSlot] = useState({ dayIndex: 0, mealType: 'breakfast' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [noRecipesPopup, setNoRecipesPopup] = useState(null);
  const [varietyInfo, setVarietyInfo] = useState(initialData.varietyInfo || null);
  const membersRef = useRef(null);

  const dietOptions = [
    { value: 'veg', label: 'Vegetarian' },
    { value: 'non-veg', label: 'Non-Vegetarian' },
    { value: 'mixed', label: 'Mixed' }
  ];
  const allergyOptions = [
    { value: 'none', label: 'None' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'nuts', label: 'Nuts' },
    { value: 'peanuts', label: 'Peanuts' },
    { value: 'eggs', label: 'Eggs' },
    { value: 'soy', label: 'Soy' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'fish', label: 'Fish' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'gluten', label: 'Gluten' }
  ];
  const ageGroupOptions = [
    { value: 'general', label: 'General' },
    { value: 'teens', label: 'Teens' },
    { value: 'kids', label: 'Kids' },
    { value: 'patient', label: 'Patient' }
  ];
  const durationOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' }
  ];
  const quickMembers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    fetchPantry();
  }, []);

  useEffect(() => {
    if (generated && Object.keys(mealPlan).length > 0) {
      localStorage.setItem('mealPlanFilters', JSON.stringify(filters));
      localStorage.setItem('mealPlanData', JSON.stringify(mealPlan));
      localStorage.setItem('mealPlanGenerated', 'true');
      localStorage.setItem('mealPlanCustomMembers', customMembers);
      if (savedPlanId) {
        localStorage.setItem('mealPlanSavedId', savedPlanId);
      } else {
        localStorage.removeItem('mealPlanSavedId');
      }
      if (varietyInfo) {
        localStorage.setItem('mealPlanVariety', JSON.stringify(varietyInfo));
      } else {
        localStorage.removeItem('mealPlanVariety');
      }
    } else if (!generated) {
      localStorage.removeItem('mealPlanFilters');
      localStorage.removeItem('mealPlanData');
      localStorage.removeItem('mealPlanGenerated');
      localStorage.removeItem('mealPlanCustomMembers');
      localStorage.removeItem('mealPlanSavedId');
      localStorage.removeItem('mealPlanVariety');
    }
  }, [filters, mealPlan, generated, customMembers, savedPlanId, varietyInfo]);

  useEffect(() => {
    if (showSearchModal && searchTerm.length > 1) {
      const d = setTimeout(() => fetchRecipesSearch(searchTerm), 400);
      return () => clearTimeout(d);
    } else if (searchTerm.length === 0) {
      setSearchResults([]);
    }
  }, [searchTerm, showSearchModal]);

  useEffect(() => {
    const close = (e) => {
      if (membersRef.current && !membersRef.current.contains(e.target)) setShowMembersDD(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const fetchPantry = async () => {
    try {
      const token = getToken();
      const res = await fetch('/api/pantry', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.items) setPantryItems(data.items.map((i) => i.name));
    } catch (e) {
      console.error(e);
    }
  };

  const getStartDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const getDayInfoList = (count) => {
    const start = getStartDate();
    return Array.from({ length: count }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return {
        dateNum: d.getDate(),
        short: SHORT_DAY_NAMES[d.getDay()],
        long: LONG_DAY_NAMES[d.getDay()],
        dateKey: d.toDateString()
      };
    });
  };

  const getDateRange = (dayInfoList) => {
    if (dayInfoList.length === 0) return '';
    const start = getStartDate();
    const end = new Date(start);
    end.setDate(start.getDate() + (dayInfoList.length - 1));
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${start.getDate()} ${m[start.getMonth()]} – ${end.getDate()} ${m[end.getMonth()]}`;
  };

  const getMemberDisplay = () => {
    if (!filters.familyMembers) return '';
    if (filters.familyMembers === 'custom') return customMembers ? `${customMembers} members` : 'Enter number';
    return `${filters.familyMembers} ${parseInt(filters.familyMembers) === 1 ? 'member' : 'members'}`;
  };
  const getFamilyCount = () => {
    if (filters.familyMembers === 'custom') return parseInt(customMembers) || 10;
    return parseInt(filters.familyMembers) || 1;
  };
  const isAllSelected = () =>
    filters.dietType &&
    filters.allergy &&
    filters.ageGroup &&
    filters.planDuration &&
    filters.familyMembers &&
    (filters.familyMembers !== 'custom' || (customMembers && parseInt(customMembers) > 0));

  const handleGenerate = async () => {
    if (!isAllSelected()) {
      alert('Please select all options!');
      return;
    }
    const token = getToken();
    if (!token) {
      navigate('/login-page');
      return;
    }

    setGenerating(true);
    setGenerated(false);
    setNoRecipesPopup(null);
    setSelectedDay(0);
    setSavedPlanId(null);
    setVarietyInfo(null);
    try {
      let url = `/api/mealplan/generate?dietType=${filters.dietType}&allergy=${filters.allergy}&ageGroup=${filters.ageGroup}&familyCount=${getFamilyCount()}&duration=${filters.planDuration}`;
      if (pantryItems.length) url += `&pantry=${encodeURIComponent(pantryItems.join(','))}`;

      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();

      if (data.success && data.plan) {
        setMealPlan(data.plan);
        setGenerated(true);
        setVarietyInfo(data.variety || null);
        setTimeout(() => document.getElementById('mc-calendar')?.scrollIntoView({ behavior: 'smooth' }), 150);
      } 
      else if (data.noRecipes) {
        setNoRecipesPopup({ message: data.message, tip: data.tip });
      } 
      else {
        alert(data.message || 'No recipes found.');
      }
    } catch (e) {
      console.error(e);
      alert('Could not connect to server.');
    } finally {
      setGenerating(false);
    }
  };

  const savePlan = async () => {
    const token = getToken();
    if (!token) {
      navigate('/login-page');
      return;
    }

    try {
      const res = await fetch('/api/mealplan/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          id: savedPlanId || undefined,
          name: `Meal Plan - ${new Date().toLocaleDateString()}`,
          preferences: { ...filters, familyMembers: filters.familyMembers === 'custom' ? customMembers : filters.familyMembers },
          plan: mealPlan
        })
      });
      const data = await res.json();
      if (data.success) {
        setSavedPlanId(data.id);
        alert(savedPlanId ? 'Meal plan updated!' : 'Meal plan saved!');
      } else {
        alert('Save failed: ' + data.message);
      }
    } catch {
      alert('Could not connect.');
    }
  };
  const deletePlan = async () => {
    const token = getToken();
    if (!token) {
      navigate('/login-page');
      return;
    }
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this meal plan?'
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/mealplan/delete/${savedPlanId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        alert('Meal plan deleted successfully!');

        localStorage.removeItem('mealPlanFilters');
        localStorage.removeItem('mealPlanData');
        localStorage.removeItem('mealPlanGenerated');
        localStorage.removeItem('mealPlanCustomMembers');
        localStorage.removeItem('mealPlanSavedId');
        localStorage.removeItem('mealPlanVariety');

        setFilters({
          dietType: '',
          allergy: '',
          ageGroup: '',
          familyMembers: '',
          planDuration: ''
        });

        setCustomMembers('');
        setMealPlan({});
        setGenerated(false);
        setSavedPlanId(null);
        setVarietyInfo(null);
        setSelectedDay(0);
      } else {
        alert('Delete failed: ' + (data.message || 'Unable to delete plan.'));
      }
    } catch (error) {
      console.error(error);
      alert('Could not connect to server.');
    }
  };

  const viewRecipe = (id, name) => {
    if (id) navigate(`/recipe/${id}?members=${getFamilyCount()}`);
    else if (name) navigate(`/recipes?search=${encodeURIComponent(name)}`);
  };

  const openSearchModal = (dayIndex, mealType) => {
    setSelectedMealSlot({ dayIndex, mealType });
    setShowSearchModal(true);
    setSearchTerm('');
    setSearchResults([]);
  };

  const fetchRecipesSearch = async (q) => {
    setModalLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`/api/recipes/search?q=${encodeURIComponent(q)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setSearchResults(data.success ? data.recipes : []);
    } catch {
      setSearchResults([]);
    } finally {
      setModalLoading(false);
    }
  };

  const selectRecipe = (recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [selectedMealSlot.dayIndex]: {
        ...prev[selectedMealSlot.dayIndex],
        [selectedMealSlot.mealType]: {
          _id: recipe._id,
          name: recipe.name || recipe.title,
          image: recipe.image || '',
          available: true,
          tagline: `${recipe.dietType || ''} • ${recipe.cuisine || 'Delicious'}`,
          matchScore: 100
        }
      }
    }));
    setShowSearchModal(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const isWeekly = filters.planDuration === 'weekly';
  const dayCount = isWeekly ? 7 : 1;
  const dayInfoList = getDayInfoList(dayCount);
  const dateRangeLabel = getDateRange(dayInfoList);

  const limitedMealTypes = varietyInfo
    ? Object.entries(varietyInfo).filter(([, v]) => v.limited).map(([mt]) => mt)
    : [];

  return (
    <div className="mc-app">
      <div className="mc-header">
        <h1 className="mc-title">My Meal Plan</h1>
        <p className="mc-subtitle">Select your preferences and generate a personalized meal plan</p>
      </div>

      <div className="mc-page-wrapper">
        <div className="mc-filters-bar">
          <CustomSelect label="Diet Type" options={dietOptions} value={filters.dietType} onChange={(v) => setFilters((p) => ({ ...p, dietType: v }))} required />
          <CustomSelect label="Allergy" options={allergyOptions} value={filters.allergy} onChange={(v) => setFilters((p) => ({ ...p, allergy: v }))} required />
          <CustomSelect label="Age Group" options={ageGroupOptions} value={filters.ageGroup} onChange={(v) => setFilters((p) => ({ ...p, ageGroup: v }))} required />
          <CustomSelect label="Plan Duration" options={durationOptions} value={filters.planDuration} onChange={(v) => setFilters((p) => ({ ...p, planDuration: v }))} required />

          <div className="csel" ref={membersRef}>
            <label className="mc-filter-label">
              Family Members<span className="mc-required"> *</span>
            </label>
            <div
              className={`csel__box ${!filters.familyMembers ? 'csel__box--empty' : ''} ${showMembersDD ? 'csel__box--open' : ''}`}
              onClick={() => setShowMembersDD((p) => !p)}
            >
              <span className={filters.familyMembers ? 'csel__val' : 'csel__ph'}>
                {getMemberDisplay() || '-- Select --'}
              </span>
              <span className={`csel__arrow ${showMembersDD ? 'csel__arrow--up' : ''}`}>▾</span>
            </div>
            {showMembersDD && (
              <div className="mc-members-panel">
                <p className="mc-members-title">Quick Select</p>
                <div className="mc-members-grid">
                  {quickMembers.map((n) => (
                    <button
                      key={n}
                      className={`mc-members-btn ${filters.familyMembers === n ? 'mc-members-btn--active' : ''}`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setFilters((p) => ({ ...p, familyMembers: n }));
                        setCustomMembers('');
                        setShowMembersDD(false);
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <hr className="mc-members-hr" />
                <p className="mc-members-title">Or enter any number</p>
                <div className="mc-members-custom">
                  <input
                    type="number"
                    min="1"
                    max="500"
                    className="mc-members-input"
                    placeholder="e.g. 15, 20…"
                    value={customMembers}
                    onChange={(e) => {
                      setCustomMembers(e.target.value);
                      setFilters((p) => ({ ...p, familyMembers: 'custom' }));
                    }}
                  />
                  {customMembers && (
                    <button
                      className="mc-members-done"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setShowMembersDD(false);
                      }}
                    >
                      Done
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mc-filter-actions">
            <button
              className={`mc-generate-btn ${!isAllSelected() || generating ? 'mc-btn-disabled' : ''}`}
              onClick={handleGenerate}
              disabled={!isAllSelected() || generating}
            >
              {generating ? (
                <>
                  <span className="mc-spin-sm" />
                  Generating…
                </>
              ) : (
                'Generate Plan'
              )}
            </button>
          </div>
        </div>

        {!generated && !generating && (
          <div className="mc-empty-state">
            <h3>Ready to plan your meals?</h3>
            <p>
              Select all preferences above, then click <strong>Generate Plan</strong>.
            </p>
          </div>
        )}

        {generating && (
          <div className="mc-loading-state">
            <div className="mc-spinner" />
            <p>Generating your meal plan…</p>
          </div>
        )}

        {generated && !generating && Object.keys(mealPlan).length > 0 && (
          <div id="mc-calendar" className="mc-calendar-section">
           {limitedMealTypes.length > 0 && (
  <div className="mc-variety-banner">
    <span className="mc-variety-icon">!</span>
    <span>
      There are not enough recipes in the database matching your selected filters (diet, allergy, age) for{' '}
      <strong>{limitedMealTypes.map((mt) => mt.charAt(0).toUpperCase() + mt.slice(1)).join(', ')}</strong>,
      so some meals may repeat this week. Your filters have not been relaxed  only the variety is limited.
      For more options, adjust your filters.
    </span>
  </div>
)}
            {isWeekly && (
              <div className="mc-week-nav">
                <span className="mc-week-range">{dateRangeLabel}</span>
              </div>
            )}

            {isWeekly && (
              <div className="mc-day-tabs">
                {dayInfoList.map((info, index) => (
                  <div
                    key={index}
                    className={`mc-day-tab ${index === selectedDay ? 'mc-tab-active' : ''} ${index === 0 ? 'mc-tab-today' : ''}`}
                    onClick={() => setSelectedDay(index)}
                  >
                    <span className="mc-tab-short">{info.short}</span>
                    <span className="mc-tab-date">{info.dateNum}</span>
                    {index === 0 && <span className="mc-today-dot" title="Today" />}
                    <div className="mc-tab-dots">
                      {['breakfast', 'lunch', 'dinner'].map((mt) => (
                        <span key={mt} className={`mc-tab-dot ${mealPlan[index]?.[mt] ? 'mc-dot-on' : ''}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mc-day-label-row">
              {isWeekly ? (
                <>
                  <span className="mc-sel-day">{dayInfoList[selectedDay]?.long}</span>
                  <span className="mc-sel-date">{dayInfoList[selectedDay]?.dateNum}</span>
                </>
              ) : (
                <span className="mc-sel-day">Daily Plan</span>
              )}
              <span className="mc-members-pill">For {getMemberDisplay()}</span>
            </div>

            <div className="mc-grid-scroll-wrapper">
              <div className="mc-calendar-grid">
                <div className="mc-grid-head">
                  <div className="mc-grid-head-day" />
                  <div className="mc-grid-head-cell">Breakfast</div>
                  <div className="mc-grid-head-cell">Lunch</div>
                  <div className="mc-grid-head-cell">Dinner</div>
                </div>

                {dayInfoList.map((info, dayIndex) => (
                  <div key={dayIndex} className={`mc-grid-row ${dayIndex === selectedDay && isWeekly ? 'mc-row-active' : ''}`}>
                    <div className="mc-grid-day-cell" onClick={() => isWeekly && setSelectedDay(dayIndex)}>
                      <span className="mc-day-short">{info.short}</span>
                      <span className="mc-day-num">{info.dateNum}</span>
                      {dayIndex === 0 && <span className="mc-today-dot" title="Today" />}
                    </div>

                    {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                      const meal = mealPlan[dayIndex]?.[mealType];
                      return (
                        <div key={mealType} className="mc-meal-cell" data-meal={mealType.charAt(0).toUpperCase() + mealType.slice(1)}>
                          {meal ? (
                            <div className="mc-meal-inner">
                              <div className="mc-thumb" style={{ backgroundImage: `url(${meal.image})` }} onClick={() => viewRecipe(meal._id, meal.name)}>
                                <span className="mc-pct">{meal.matchScore}%</span>
                              </div>
                              <div className="mc-meal-text">
                                <p className="mc-meal-name" onClick={() => viewRecipe(meal._id, meal.name)} title={meal.name}>
                                  {meal.name}
                                </p>
                                <div className="mc-meal-btns">
                                  <button className="mc-btn-view" onClick={() => viewRecipe(meal._id, meal.name)}>View Recipe</button>
                                  <button className="mc-btn-change" onClick={() => openSearchModal(dayIndex, mealType)}>Change</button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mc-add-cell" onClick={() => openSearchModal(dayIndex, mealType)}>
                              <span className="mc-add-plus">+</span>
                              <span className="mc-add-lbl">Add Recipe</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="mc-save-row">
              <div className="mc-save-card">
                <div>
                  <p className="mc-save-title">Your meal plan is ready!</p>
                  <small className="mc-save-sub">
                    Save it to access later from your profile
                  </small>
                </div>

                <div className="mc-save-actions">
                  <button className="mc-save-btn" onClick={savePlan}>
                    {savedPlanId ? 'Update Plan' : 'Save Plan'}
                  </button>
                  {savedPlanId && (
                    <button className="mc-delete-btn" onClick={deletePlan}>
                      Delete Plan
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mc-back-home-container">
        <button className="mc-btn-back-home" onClick={() => navigate('/home')}>Back to Home</button>
      </div>

      {showSearchModal && (
        <div className="mc-overlay" onClick={() => setShowSearchModal(false)}>
          <div className="mc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mc-modal-head">
              <h3>Search &amp; Select Recipe</h3>
              <button className="mc-modal-x" onClick={() => setShowSearchModal(false)}>×</button>
            </div>
            <div className="mc-modal-body">
              <div className="mc-search-row">
                <input
                  type="text"
                  className="mc-search-inp"
                  autoFocus
                  placeholder="Type recipe name to search database…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="mc-search-clr" onClick={() => { setSearchTerm(''); setSearchResults([]); }}>×</button>
                )}
              </div>
              {!searchTerm && <p className="mc-search-hint">Start typing to search from your database</p>}
              {modalLoading && (
                <div className="mc-modal-load">
                  <div className="mc-mini-spin" />
                  <span>Searching…</span>
                </div>
              )}
              <div className="mc-results">
                {searchResults.map((r) => (
                  <div key={r._id} className="mc-result-item" onClick={() => selectRecipe(r)}>
                    <img src={r.image || ''} alt={r.name || r.title} />
                    <div className="mc-result-info">
                      <p className="mc-result-name">{r.name || r.title}</p>
                      <p className="mc-result-meta">{r.dietType || 'Any'} &bull; {r.cuisine || 'Any cuisine'}</p>
                    </div>
                    <span className="mc-result-badge">Select</span>
                  </div>
                ))}
                {searchTerm.length > 1 && !modalLoading && searchResults.length === 0 && (
                  <div className="mc-no-result">
                    <p>No recipes found for "<strong>{searchTerm}</strong>"</p>
                    <small>Try a different name</small>
                  </div>
                )}
              </div>
            </div>
            <div className="mc-modal-foot">
              <button className="mc-modal-cancel" onClick={() => setShowSearchModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {noRecipesPopup && (
        <div className="mc-overlay" onClick={() => setNoRecipesPopup(null)}>
          <div className="mc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mc-modal-head" style={{ background: '#c0392b' }}>
              <h3>No Recipes Found</h3>
              <button className="mc-modal-x" onClick={() => setNoRecipesPopup(null)}>×</button>
            </div>
            <div className="mc-modal-body" style={{ textAlign: 'center', padding: '30px 24px' }}>
              <p style={{ fontWeight: 600, marginBottom: 14 }}>{noRecipesPopup.message}</p>
              <div style={{ background: '#fff8e1', border: '1px solid #ffe082', borderRadius: 10, padding: '12px 16px' }}>
                <p style={{ fontSize: '.85rem', color: '#555', margin: 0 }}>Tip: {noRecipesPopup.tip}</p>
              </div>
            </div>
            <div className="mc-modal-foot" style={{ justifyContent: 'center' }}>
              <button className="mc-generate-btn" style={{ background: '#284a4b', opacity: 1 }} onClick={() => setNoRecipesPopup(null)}>Change Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealFeature;