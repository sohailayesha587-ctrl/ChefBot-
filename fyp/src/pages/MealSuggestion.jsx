import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './MealSuggestion.css';

const MealSuggestion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionsData, setSuggestionsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedFor, setSearchedFor] = useState('');
  
  const [visibleCount, setVisibleCount] = useState(8);
  
  // Pantry State
  const [pantryItems, setPantryItems] = useState([]);
  
  // Calendar State
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDayMeals, setSelectedDayMeals] = useState([]);
  const [expandedDay, setExpandedDay] = useState(null);
  const [isNoCookingDay, setIsNoCookingDay] = useState(false);
  
  // Add Meal Form Popup State
  const [showAddMealForm, setShowAddMealForm] = useState(false);
  const [selectedMealRecipe, setSelectedMealRecipe] = useState('');
  const [manualRecipeName, setManualRecipeName] = useState('');
  const [recipeSuggestions, setRecipeSuggestions] = useState([]);
  const [showRecipeSuggestions, setShowRecipeSuggestions] = useState(false);
  const [selectedMealMembers, setSelectedMealMembers] = useState(4);
  const [editingMeal, setEditingMeal] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  
  // Inline Missing Essentials State
  const [showMissingInline, setShowMissingInline] = useState(false);
  const [missingFundamentals, setMissingFundamentals] = useState([]);
  const [skipFundamental, setSkipFundamental] = useState(false);
  
  // Full Month History Popup State
  const [showMonthHistory, setShowMonthHistory] = useState(false);
  const [monthHistory, setMonthHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  
  const [filters, setFilters] = useState({
    mealType: 'all',
    dietType: 'all',
    allergy: 'none',
    ageGroup: 'general'
  });
  
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  // Member Popup State
  const [showMemberPopup, setShowMemberPopup] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState('4');
  const [customMembers, setCustomMembers] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isCooking, setIsCooking] = useState(false);

  // Patient Sections State
  const [patientSections, setPatientSections] = useState({
    diabetes: { recipes: [], currentPage: 0, total: 0, loading: false },
    heart: { recipes: [], currentPage: 0, total: 0, loading: false },
    bp: { recipes: [], currentPage: 0, total: 0, loading: false },
    kidney: { recipes: [], currentPage: 0, total: 0, loading: false },
    lowfat: { recipes: [], currentPage: 0, total: 0, loading: false }
  });

  const patientTypes = [
    { id: 'diabetes', name: '🩺 Diabetes Friendly', icon: '🩺', filter: 'diabetes' },
    { id: 'heart', name: '❤️ Heart Health', icon: '❤️', filter: 'heart' },
    { id: 'bp', name: '💙 BP / Low Salt', icon: '💙', filter: ['bp', 'lowsalt'] },
    { id: 'kidney', name: '🩸 Kidney Friendly', icon: '🩸', filter: 'kidney' },
    { id: 'lowfat', name: '🥑 Low Fat', icon: '🥑', filter: 'lowfat' }
  ];

  const getDateForDay = (dayName) => {
    const today = new Date();
    const currentDay = today.getDay();
    const daysMap = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
    const targetDay = daysMap[dayName];
    let diff = targetDay - currentDay;
    const date = new Date(today);
    date.setDate(today.getDate() + diff);
    return date.toISOString().split('T')[0];
  };

  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const weekDays = [
    { id: 'mon', name: 'MON', fullName: 'Monday', date: getDateForDay('Monday') },
    { id: 'tue', name: 'TUE', fullName: 'Tuesday', date: getDateForDay('Tuesday') },
    { id: 'wed', name: 'WED', fullName: 'Wednesday', date: getDateForDay('Wednesday') },
    { id: 'thu', name: 'THU', fullName: 'Thursday', date: getDateForDay('Thursday') },
    { id: 'fri', name: 'FRI', fullName: 'Friday', date: getDateForDay('Friday') },
    { id: 'sat', name: 'SAT', fullName: 'Saturday', date: getDateForDay('Saturday') },
    { id: 'sun', name: 'SUN', fullName: 'Sunday', date: getDateForDay('Sunday') }
  ];

  const getTodayDayId = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const dayMap = { Monday: 'mon', Tuesday: 'tue', Wednesday: 'wed', Thursday: 'thu', Friday: 'fri', Saturday: 'sat', Sunday: 'sun' };
    return dayMap[today] || 'tue';
  };

  const mealTypes = ['all', 'breakfast', 'lunch', 'dinner', 'snacks'];
  const dietTypes = ['all', 'veg', 'non-veg', 'eggetarian'];
  const allergies = ['none', 'egg', 'peanut', 'gluten', 'lactose', 'shellfish'];
  const ageGroups = ['kids', 'general', 'patient', 'family-mix'];

  const moreCategories = [
    { id: 'quick', name: '⚡ Quick Recipes', query: 'quick' },
    { id: 'spicy', name: '🌶️ Spicy', query: 'spicy' },
    { id: 'healthy', name: '🥗 Healthy', query: 'healthy' },
    { id: 'chicken', name: '🍗 Chicken', query: 'chicken' },
    { id: 'vegetarian', name: '🥬 Vegetarian', query: 'vegetarian' },
    { id: 'fish', name: '🐟 Fish', query: 'fish' },
    { id: 'rice', name: '🍚 Rice', query: 'rice' },
    { id: 'dessert', name: '🍰 Dessert', query: 'dessert' },
    { id: 'none', name: '❌ None', query: null }
  ];

  const memberOptions = [
    { value: '2', label: '👥 2 people' },
    { value: '4', label: '👥 4 people' },
    { value: '6', label: '👥 6 people' },
    { value: '8', label: '👥 8 people' },
    { value: '10', label: '👥 10 people' },
    { value: 'other', label: '🔢 Other (enter manually)' }
  ];

  // Fetch full month history
  const fetchMonthHistory = async () => {
    try {
      setLoadingHistory(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/meal-suggestions/cooking-log/month', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('📥 Raw month history response:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('JSON parse error:', e);
        toast.error('Invalid response from server');
        return;
      }
      
      if (data.success) {
        setMonthHistory(data.meals || []);
        setShowMonthHistory(true);
      } else {
        toast.error(data.message || 'Failed to load history');
      }
    } catch (error) {
      console.error('Error fetching month history:', error);
      toast.error('Error loading month history');
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchAllRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/recipes?limit=100', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success && data.recipes) {
        setAllRecipes(data.recipes);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const fetchPantryItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/pantry', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success && data.items) {
        const itemNames = data.items.map(item => item.name);
        setPantryItems(itemNames);
        console.log('📦 Pantry items loaded:', itemNames);
        return itemNames;
      }
    } catch (error) {
      console.error('Error fetching pantry:', error);
      return [];
    }
  };

  // Auto-suggest for recipe name (Forgot to Log)
  const searchRecipesForSuggestions = async (query) => {
    if (!query.trim()) {
      setRecipeSuggestions([]);
      setShowRecipeSuggestions(false);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/recipes/search?q=${encodeURIComponent(query)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success && data.recipes) {
        setRecipeSuggestions(data.recipes.slice(0, 5));
        setShowRecipeSuggestions(true);
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  const handleManualRecipeChange = (e) => {
    const value = e.target.value;
    setManualRecipeName(value);
    searchRecipesForSuggestions(value);
  };

  const selectRecipeSuggestion = (recipe) => {
    setManualRecipeName(recipe.title);
    setSelectedMealRecipe(recipe._id);
    setShowRecipeSuggestions(false);
  };

  // ✅ FIXED: Fetch patient recipes with diet filter
  const fetchPatientRecipes = async (type, page = 0) => {
    try {
      const token = localStorage.getItem('token');
      const limit = 5;
      
      setPatientSections(prev => ({
        ...prev,
        [type]: { ...prev[type], loading: true }
      }));
      
      // ✅ Add dietType to API call
      const response = await fetch(`http://localhost:5000/api/recipes/patient/${type}?limit=${limit}&skip=${page * limit}&dietType=${filters.dietType}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      
      if (data.success && data.recipes) {
        setPatientSections(prev => ({
          ...prev,
          [type]: {
            recipes: data.recipes,
            currentPage: page,
            total: data.total,
            loading: false,
            hasMore: data.hasMore || false
          }
        }));
      } else {
        setPatientSections(prev => ({
          ...prev,
          [type]: { ...prev[type], loading: false, recipes: [] }
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${type} recipes:`, error);
      setPatientSections(prev => ({
        ...prev,
        [type]: { ...prev[type], loading: false, recipes: [] }
      }));
    }
  };

  // Handle next page for patient section
  const handlePatientNext = (type, currentPage, hasMore) => {
    if (hasMore) {
      fetchPatientRecipes(type, currentPage + 1);
    }
  };

  // Handle prev page for patient section
  const handlePatientPrev = (type, currentPage) => {
    if (currentPage > 0) {
      fetchPatientRecipes(type, currentPage - 1);
    }
  };

  // Load all patient sections when ageGroup is 'patient'
  useEffect(() => {
    if (filters.ageGroup === 'patient') {
      patientTypes.forEach(type => {
        fetchPatientRecipes(type.id, 0);
      });
    }
  }, [filters.ageGroup, filters.dietType]); // ✅ Add dietType dependency

  const fetchSuggestions = async (search = searchQuery, forceSkip = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      
      let pantryNames = pantryItems;
      if (pantryNames.length === 0) {
        pantryNames = await fetchPantryItems();
      }
      
      let url = `http://localhost:5000/api/meal-suggestions?`;
      if (search && search !== '') {
        url += `search=${encodeURIComponent(search)}&`;
      }
      if (filters.mealType !== 'all') url += `mealTime=${filters.mealType}&`;
      if (filters.dietType !== 'all') url += `dietType=${filters.dietType}&`;
      if (filters.allergy !== 'none') url += `allergy=${filters.allergy}&`;
      if (filters.ageGroup !== 'general') url += `ageGroup=${filters.ageGroup}&`;
      if (forceSkip || skipFundamental) url += `skipFundamental=true&`;
      
      if (pantryNames.length > 0) {
        const pantryQuery = pantryNames.join(',');
        url += `pantry=${encodeURIComponent(pantryQuery)}&`;
        console.log('📤 Sending pantry to backend:', pantryQuery);
      }
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      console.log('📥 API Response:', data);
      
      if (!data || typeof data !== 'object') {
        setError('Invalid response from server');
        setSuggestionsData([]);
      } else if (!data.success && data.message) {
        setError(data.message);
        setSuggestionsData([]);
      } else if (data.missingFundamentals && data.missingFundamentals.length > 0) {
        setMissingFundamentals(data.missingFundamentals);
        setShowMissingInline(true);
        setSuggestionsData([]);
      } else if (data.suggestions && data.suggestions.length > 0) {
        setSuggestionsData(data.suggestions);
        if (search) setSearchedFor(search);
        setShowMissingInline(false);
        setError(null);
      } else {
        setSuggestionsData([]);
        if (data.message) setError(data.message);
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError('Failed to load suggestions. Please try again.');
      setSuggestionsData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCookingLogForDate = async (date) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/meal-suggestions/cooking-log/${date}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      console.log('📋 Cooking log for date:', date, data);
      
      if (data.success) {
        if (data.isComplete === true && (!data.meals || data.meals.length === 0)) {
          setSelectedDayMeals([]);
          setIsNoCookingDay(true);
          return false;
        }
        
        setIsNoCookingDay(false);
        
        if (data.meals && data.meals.length > 0) {
          setSelectedDayMeals(data.meals);
          return true;
        } else {
          setSelectedDayMeals([]);
          return false;
        }
      }
      setSelectedDayMeals([]);
      setIsNoCookingDay(false);
      return false;
    } catch (error) {
      console.error('Error fetching cooking log:', error);
      setSelectedDayMeals([]);
      setIsNoCookingDay(false);
      return false;
    }
  };

  const handleDayClick = async (day) => {
    console.log('📅 Day clicked:', day.id, day.fullName, 'Date:', day.date);
    setSelectedDate(day);
    setExpandedDay(day.id);
    await fetchCookingLogForDate(day.date);
  };

  const handleCloseExpanded = () => {
    setExpandedDay(null);
    setIsNoCookingDay(false);
  };

  const handleNoCooking = async () => {
    if (!selectedDate) {
      toast.error('No date selected');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/meal-suggestions/cooking-log', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: selectedDate.date,
          recipeId: null,
          recipeName: null,
          members: 0,
          noCooking: true
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`✅ Marked ${selectedDate.fullName} as no cooking day`);
        setSelectedDayMeals([]);
        setIsNoCookingDay(true);
        setShowAddMealForm(false);
      } else {
        toast.error(data.message || 'Error saving');
      }
    } catch (error) {
      console.error('Error in no cooking:', error);
      toast.error('Error saving no cooking status');
    }
  };

  const handleForgotToLog = () => {
    if (!selectedDate) {
      toast.error('Please select a day first');
      return;
    }
    
    setEditingMeal(null);
    setSelectedMealRecipe('');
    setManualRecipeName('');
    setRecipeSuggestions([]);
    setShowRecipeSuggestions(false);
    setSelectedMealMembers(4);
    setShowAddMealForm(true);
    setIsNoCookingDay(false);
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
    setSelectedMealRecipe(meal.recipeId);
    setManualRecipeName(meal.recipeName);
    setSelectedMealMembers(meal.members);
    setShowAddMealForm(true);
    setIsNoCookingDay(false);
  };

  const handleDeleteMeal = async (meal) => {
    if (!selectedDate) {
      toast.error('No date selected');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const mealId = meal._id || meal.id;
      
      const response = await fetch(`http://localhost:5000/api/meal-suggestions/cooking-log/${selectedDate.date}/meal/${mealId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Meal deleted successfully');
        await fetchCookingLogForDate(selectedDate.date);
      } else {
        toast.error(data.message || 'Error deleting meal');
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
      toast.error('Error deleting meal');
    }
  };

  const handleSaveMeal = async () => {
    if (!selectedDate) {
      toast.error('No date selected');
      return;
    }
    
    if (!manualRecipeName.trim()) {
      toast.warning('Please enter recipe name');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      if (editingMeal) {
        const response = await fetch(`http://localhost:5000/api/meal-suggestions/cooking-log/${selectedDate.date}/meal/${editingMeal._id || editingMeal.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipeId: selectedMealRecipe || 'manual',
            recipeName: manualRecipeName,
            members: selectedMealMembers
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          toast.success(`✅ Meal updated: ${manualRecipeName}`);
        } else {
          toast.error(data.message || 'Error updating meal');
          return;
        }
      } else {
        const response = await fetch('http://localhost:5000/api/meal-suggestions/cooking-log', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            date: selectedDate.date,
            recipeId: selectedMealRecipe || 'manual',
            recipeName: manualRecipeName,
            members: selectedMealMembers
          })
        });
        
        const data = await response.json();
        
        if (data.success) {
          toast.success(`✅ ${manualRecipeName} added for ${selectedDate.fullName || selectedDate.id}`);
        } else {
          toast.error(data.message || 'Error adding meal');
          return;
        }
      }
      
      setShowAddMealForm(false);
      setEditingMeal(null);
      setSelectedMealRecipe('');
      setManualRecipeName('');
      setRecipeSuggestions([]);
      setSelectedMealMembers(4);
      
      await fetchCookingLogForDate(selectedDate.date);
      
    } catch (error) {
      console.error('Error saving meal:', error);
      toast.error('Error saving meal');
    }
  };

  // Add to Shopping List
  const handleAddToShopping = async (recipe) => {
    if (!recipe.missing || recipe.missing.length === 0) {
      toast.info('No missing ingredients to add');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/shopping/add-missing', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipeId: recipe.id || recipe._id,
          missingIngredients: recipe.missing || []
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || 'Failed to add items');
      }
    } catch (error) {
      console.error('Error adding to shopping:', error);
      toast.error('Error adding items to shopping list');
    }
  };

  const handleAddMissingToShopping = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/shopping/add-multiple', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: missingFundamentals.map(item => ({ name: item, quantity: 1, unit: 'piece' }))
        })
      });
      
      if (response.ok) {
        toast.success(`${missingFundamentals.length} essential items added to shopping list!`);
      } else {
        toast.error('Failed to add items');
      }
    } catch (error) {
      toast.error('Error adding items');
    }
  };

  const handlePandaMartOrder = () => {
    const searchQueryText = missingFundamentals.join(', ');
    const googleSearchUrl = `https://www.google.com/search?q=pandamart+${encodeURIComponent(searchQueryText)}+Pakistan`;
    window.open(googleSearchUrl, '_blank');
    toast.info('Opening Google search for Pandamart');
  };

  const handleSkipAndContinue = () => {
    setSkipFundamental(true);
    setShowMissingInline(false);
    fetchSuggestions(searchQuery, true);
    toast.info('Showing available recipes with your current pantry');
  };

  const handleConfirmCooking = async () => {
    const membersValue = selectedMembers === 'other' ? customMembers : selectedMembers;
    
    if (!membersValue || membersValue === '') {
      toast.warning('Please select number of people');
      return;
    }
    
    setIsCooking(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/meal-suggestions/cook', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipeId: selectedRecipe.id || selectedRecipe._id,
          members: parseInt(membersValue),
          date: selectedDate?.date || new Date().toISOString().split('T')[0]
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        setShowMemberPopup(false);
        setSelectedRecipe(null);
        
        navigate(`/recipe/${selectedRecipe.id}?members=${membersValue}`);
        
        if (selectedDate) {
          await fetchCookingLogForDate(selectedDate.date);
        }
        fetchSuggestions(searchQuery);
      } else {
        toast.error(data.message || 'Error cooking recipe');
      }
    } catch (error) {
      console.error('Error cooking recipe:', error);
      toast.error('Error cooking recipe');
    } finally {
      setIsCooking(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSkipFundamental(false);
      fetchSuggestions(searchQuery);
    }
  };

  const handleCategorySelect = (category) => {
    setShowCategoryModal(false);
    
    if (category.query === null) {
      return;
    }
    
    setSearchQuery(category.query);
    setSkipFundamental(false);
    fetchSuggestions(category.query);
  };

  const handleRecipeClick = (recipe) => {
    const recipeId = recipe._id || recipe.id || recipe.recipeId;
    if (recipeId) {
      navigate(`/recipe/${recipeId}`);
    } else {
      toast.error('Recipe ID not found');
    }
  };

  const handleCookIt = (recipe) => {
    setSelectedRecipe(recipe);
    setSelectedMembers('4');
    setCustomMembers('');
    setShowCustomInput(false);
    setShowMemberPopup(true);
  };

  const handleMemberSelect = (value) => {
    if (value === 'other') {
      setShowCustomInput(true);
      setSelectedMembers('');
    } else {
      setShowCustomInput(false);
      setSelectedMembers(value);
      setCustomMembers('');
    }
  };

  const handleCustomMemberChange = (e) => {
    const val = e.target.value;
    setCustomMembers(val);
    setSelectedMembers(val);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const getMatchColor = (matchPercent) => {
    const percent = parseInt(matchPercent);
    if (percent >= 80) return '#2ecc71';
    if (percent >= 60) return '#27ae60';
    if (percent >= 40) return '#f39c12';
    return '#e74c3c';
  };

  // First visit check
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('q');
    
    fetchAllRecipes();
    fetchPantryItems();
    
    if (searchParam) {
      setSearchQuery(searchParam);
      fetchSuggestions(searchParam);
    } else {
      fetchSuggestions('');
    }
    
    const hasVisitedBefore = sessionStorage.getItem('mealSuggestionVisited');
    
    if (!hasVisitedBefore) {
      const todayId = getTodayDayId();
      const todayDay = weekDays.find(day => day.id === todayId);
      if (todayDay) {
        setSelectedDate(todayDay);
        setExpandedDay(todayId);
        fetchCookingLogForDate(todayDay.date);
      }
      sessionStorage.setItem('mealSuggestionVisited', 'true');
    } else {
      setExpandedDay(null);
      setSelectedDate(null);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchSuggestions(searchQuery);
    }
  }, [filters]);

  // Component for horizontal scroll section
  const HorizontalScrollSection = ({ title, icon, recipes, currentPage, hasMore, onPrev, onNext, loading }) => {
    if (loading && recipes.length === 0) {
      return (
        <div className="patient-section">
          <h3 className="patient-section-title">{icon} {title}</h3>
          <div className="horizontal-scroll-container">
            <div className="loading-placeholder">Loading recipes...</div>
          </div>
        </div>
      );
    }
    
    if (recipes.length === 0) return null;
    
    return (
      <div className="patient-section">
        <h3 className="patient-section-title">{icon} {title}</h3>
        <div className="horizontal-scroll-container">
          <button 
            className="scroll-arrow scroll-left" 
            onClick={onPrev}
            disabled={currentPage === 0}
          >
            ◀
          </button>
          
          <div className="patient-recipes-wrapper">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="patient-recipe-card" onClick={() => handleRecipeClick(recipe)}>
                <div 
                  className="patient-recipe-image"
                  style={{ backgroundImage: `url(${recipe.image || 'https://via.placeholder.com/150x150?text=No+Image'})` }}
                ></div>
                <h4 className="patient-recipe-title">{recipe.title}</h4>
                <p className="patient-recipe-info">⏱️ {recipe.cookingTime} min</p>
              </div>
            ))}
          </div>
          
          <button 
            className="scroll-arrow scroll-right" 
            onClick={onNext}
            disabled={!hasMore}
          >
            ▶
          </button>
        </div>
      </div>
    );
  };

  const visibleSuggestions = suggestionsData.slice(0, visibleCount);
  const hasMore = visibleCount < suggestionsData.length;

  if (loading) {
    return (
      <div className="ms-container">
        <div className="ms-loading">
          <div className="ms-spinner"></div>
          <p>Finding recipes for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ms-container">
      <header className="ms-header">
        <div className="ms-header-content">
          <h1 className="ms-title">What to Cook Today?</h1>
          <p className="ms-description">Ask me anything like breakfast, lunch, dinner, or what you want!</p>
        </div>
      </header>

      <div className="ms-layout">
        
        {/* LEFT DAYS CALENDAR */}
        <div className={`ms-days-calendar ${expandedDay !== null ? 'ms-expanded' : ''}`}>
          {weekDays.map(day => {
            const isExpanded = expandedDay === day.id;
            const mealsForDay = isExpanded ? selectedDayMeals : [];
            
            return (
              <div key={day.id} className="ms-day-wrapper">
                <div
                  className={`ms-day-item ${selectedDate?.id === day.id ? 'ms-day-active' : ''} ${day.id === getTodayDayId() ? 'ms-day-today' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  <span className="ms-day-name">{day.name}</span>
                  <span className="ms-day-date">{getFormattedDate(day.date)}</span>
                </div>
                
                {isExpanded && (
                  <div className="ms-day-meals-expanded">
                    <div className="ms-expanded-header">
                      <h4>{day.fullName}, {getFormattedDate(day.date)}</h4>
                      <button className="ms-expanded-close" onClick={handleCloseExpanded}>✕</button>
                    </div>
                    
                    {isNoCookingDay ? (
                      <div className="ms-no-meals-expanded">
                        <p>❌ No cooking done on this day</p>
                        <button className="ms-add-meal-expanded" onClick={handleForgotToLog}>
                          + Add Meal
                        </button>
                      </div>
                    ) : mealsForDay.length > 0 ? (
                      <>
                        <div className="ms-meals-list-expanded">
                          {mealsForDay.map((meal, idx) => (
                            <div key={idx} className="ms-meal-item-expanded">
                              <div className="ms-meal-info-expanded">
                                <span className="ms-meal-name">🍳 {meal.recipeName}</span>
                                <span className="ms-meal-members">👥 {meal.members}</span>
                              </div>
                              <div className="ms-meal-actions-expanded">
                                <button className="ms-delete-meal" onClick={() => handleDeleteMeal(meal)}>Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="ms-add-meal-expanded" onClick={handleForgotToLog}>
                          + Add Meal
                        </button>
                      </>
                    ) : (
                      <div className="ms-no-meals-expanded">
                        <p>No meals recorded for this day.</p>
                        <div className="ms-expanded-actions">
                          <button className="ms-no-cooking-expanded" onClick={handleNoCooking}>
                            ❌ No cooking done
                          </button>
                          <button className="ms-forgot-log-expanded" onClick={handleForgotToLog}>
                            📝 I forgot to log
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Green Button for Full Month History - after Sunday */}
          <div className="ms-day-wrapper">
            <button 
              className="ms-month-history-btn"
              onClick={fetchMonthHistory}
            >
              <span className="ms-day-name">📅</span>
              <span className="ms-day-date">Month</span>
            </button>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className={`ms-main-content ${expandedDay !== null ? 'ms-blurred' : ''}`}>
          
          {/* Search Bar */}
          <div className="ms-search-section">
            <form onSubmit={handleSearchSubmit} className="ms-search-form">
              <input
                type="text"
                className="ms-search-input"
                placeholder="Ask something like: 'breakfast', 'dinner quick', 'spicy chicken'..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="ms-search-btn">🔍 Find Recipes</button>
            </form>
          </div>

          {/* Filters */}
          <div className="ms-filters-bar">
            <div className="ms-filter-group">
              <label className="ms-filter-label">🍽️ Meal Type</label>
              <select className="ms-filter-select" value={filters.mealType} onChange={(e) => setFilters({...filters, mealType: e.target.value})}>
                {mealTypes.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="ms-filter-group">
              <label className="ms-filter-label">🥗 Diet Type</label>
              <select className="ms-filter-select" value={filters.dietType} onChange={(e) => setFilters({...filters, dietType: e.target.value})}>
                {dietTypes.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="ms-filter-group">
              <label className="ms-filter-label">🤧 Allergy</label>
              <select className="ms-filter-select" value={filters.allergy} onChange={(e) => setFilters({...filters, allergy: e.target.value})}>
                {allergies.map(allergy => (
                  <option key={allergy} value={allergy}>{allergy.charAt(0).toUpperCase() + allergy.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="ms-filter-group">
              <label className="ms-filter-label">👥 Age Group</label>
              <select className="ms-filter-select" value={filters.ageGroup} onChange={(e) => setFilters({...filters, ageGroup: e.target.value})}>
                {ageGroups.map(group => (
                  <option key={group} value={group}>{group.replace('-', ' ').charAt(0).toUpperCase() + group.slice(1)}</option>
                ))}
              </select>
            </div>
            <button className="ms-plus-btn" onClick={() => setShowCategoryModal(true)}>
              + More
            </button>
          </div>

          {/* Patient Sections - Only show when ageGroup is 'patient' */}
          {filters.ageGroup === 'patient' && (
            <div className="patient-sections-container">
              <HorizontalScrollSection 
                title="Diabetes Friendly"
                icon="🩺"
                recipes={patientSections.diabetes.recipes}
                currentPage={patientSections.diabetes.currentPage}
                hasMore={patientSections.diabetes.hasMore}
                onPrev={() => handlePatientPrev('diabetes', patientSections.diabetes.currentPage)}
                onNext={() => handlePatientNext('diabetes', patientSections.diabetes.currentPage, patientSections.diabetes.hasMore)}
                loading={patientSections.diabetes.loading}
              />
              
              <HorizontalScrollSection 
                title="Heart Health"
                icon="❤️"
                recipes={patientSections.heart.recipes}
                currentPage={patientSections.heart.currentPage}
                hasMore={patientSections.heart.hasMore}
                onPrev={() => handlePatientPrev('heart', patientSections.heart.currentPage)}
                onNext={() => handlePatientNext('heart', patientSections.heart.currentPage, patientSections.heart.hasMore)}
                loading={patientSections.heart.loading}
              />
              
              <HorizontalScrollSection 
                title="BP / Low Salt"
                icon="💙"
                recipes={patientSections.bp.recipes}
                currentPage={patientSections.bp.currentPage}
                hasMore={patientSections.bp.hasMore}
                onPrev={() => handlePatientPrev('bp', patientSections.bp.currentPage)}
                onNext={() => handlePatientNext('bp', patientSections.bp.currentPage, patientSections.bp.hasMore)}
                loading={patientSections.bp.loading}
              />
              
              <HorizontalScrollSection 
                title="Kidney Friendly"
                icon="🩸"
                recipes={patientSections.kidney.recipes}
                currentPage={patientSections.kidney.currentPage}
                hasMore={patientSections.kidney.hasMore}
                onPrev={() => handlePatientPrev('kidney', patientSections.kidney.currentPage)}
                onNext={() => handlePatientNext('kidney', patientSections.kidney.currentPage, patientSections.kidney.hasMore)}
                loading={patientSections.kidney.loading}
              />
              
              <HorizontalScrollSection 
                title="Low Fat"
                icon="🥑"
                recipes={patientSections.lowfat.recipes}
                currentPage={patientSections.lowfat.currentPage}
                hasMore={patientSections.lowfat.hasMore}
                onPrev={() => handlePatientPrev('lowfat', patientSections.lowfat.currentPage)}
                onNext={() => handlePatientNext('lowfat', patientSections.lowfat.currentPage, patientSections.lowfat.hasMore)}
                loading={patientSections.lowfat.loading}
              />
            </div>
          )}

          {/* Essential Missing Banner */}
          {showMissingInline && (
            <div className="ms-missing-inline">
              <div className="ms-missing-inline-header">
                <span className="ms-missing-icon">⚠️</span>
                <span className="ms-missing-title">Essential Items Missing</span>
              </div>
              <p>Your pantry is missing: <strong>{missingFundamentals.join(', ')}</strong></p>
              <div className="ms-missing-inline-actions">
                <button className="ms-inline-btn ms-inline-shopping" onClick={handleAddMissingToShopping}>
                  🛒 Add to Shopping List
                </button>
                <button className="ms-inline-btn ms-inline-panda" onClick={handlePandaMartOrder}>
                  🛍️ Order from Panda Mart
                </button>
                <button className="ms-inline-btn ms-inline-skip" onClick={handleSkipAndContinue}>
                  ⏩ Skip & Show Suggestions
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !showMissingInline && (
            <div className="ms-error">
              <p>{error}</p>
            </div>
          )}

          {/* Results Info */}
          {!showMissingInline && suggestionsData.length > 0 && (
            <div className="ms-results-info">
              {searchedFor && <p>🔍 Showing results for: <strong>"{searchedFor}"</strong></p>}
              <p>Found <span className="ms-results-count">{suggestionsData.length}</span> recipes</p>
            </div>
          )}

          {/* Suggestions Grid */}
          {!showMissingInline && visibleSuggestions.length > 0 && (
            <>
              <div className="ms-suggestions-grid">
                {visibleSuggestions.map((recipe, idx) => (
                  <div key={idx} className="ms-recipe-card">
                    <div 
                      className="ms-recipe-image" 
                      style={{ backgroundImage: `url(${recipe.image || 'https://via.placeholder.com/400x250?text=No+Image'})` }}
                      onClick={() => handleRecipeClick(recipe)}
                    ></div>
                    <div className="ms-recipe-content">
                      <div className="ms-recipe-header">
                        <h3 className="ms-recipe-name" onClick={() => handleRecipeClick(recipe)}>
                          {recipe.name}
                        </h3>
                        <span className="ms-match-badge" style={{ backgroundColor: getMatchColor(recipe.match) }}>
                          {recipe.match}%
                        </span>
                      </div>
                      <p className="ms-recipe-category">
                        {recipe.subCategory || recipe.category} • ⏱️ {recipe.cookingTime} min
                      </p>
                      
                      {recipe.missing && recipe.missing.length > 0 ? (
                        <div className="ms-missing-ingredients">
                          <span className="ms-missing-label">Missing:</span>
                          <span className="ms-missing-items">
                            {recipe.missing.slice(0, 2).join(', ')}
                            {recipe.missing.length > 2 && ` +${recipe.missing.length - 2}`}
                          </span>
                        </div>
                      ) : (
                        <div className="ms-full-match">✅ All ingredients ready!</div>
                      )}
                      
                      <div className="ms-match-progress">
                        <div className="ms-match-progress-bar" style={{ width: `${recipe.match}%`, backgroundColor: getMatchColor(recipe.match) }}></div>
                      </div>
                      
                      <div className="ms-recipe-actions">
                        <button className="ms-btn-view" onClick={() => handleRecipeClick(recipe)}>View</button>
                        <button className="ms-btn-cook" onClick={() => handleCookIt(recipe)}>Cook</button>
                        {recipe.missing && recipe.missing.length > 0 && (
                          <button className="ms-btn-shop" onClick={() => handleAddToShopping(recipe)}>Add</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="ms-show-more">
                  <button className="ms-show-more-btn" onClick={loadMore}>Show More ({suggestionsData.length - visibleCount} more)</button>
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {!showMissingInline && !loading && !error && suggestionsData.length === 0 && filters.ageGroup !== 'patient' && (
            <div className="ms-empty-state">
              <h3>No recipes found</h3>
              <p>Try searching for breakfast, lunch, dinner, or quick recipes</p>
            </div>
          )}
          
          {!showMissingInline && !loading && !error && suggestionsData.length === 0 && filters.ageGroup === 'patient' && (
            <div className="ms-empty-state">
              <h3>No patient-friendly recipes found</h3>
              <p>Try adjusting your filters</p>
            </div>
          )}

          {/* Back Button */}
          <div className="ms-back-section">
            <button className="ms-back-btn" onClick={() => navigate(-1)}>← Back</button>
          </div>
        </div>
      </div>

      {/* More Categories Modal */}
      {showCategoryModal && (
        <div className="ms-modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="ms-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ms-modal-header">
              <h3>📂 More Categories</h3>
              <button className="ms-modal-close" onClick={() => setShowCategoryModal(false)}>✕</button>
            </div>
            <div className="ms-modal-body">
              <div className="ms-categories-grid">
                {moreCategories.map(cat => (
                  <button key={cat.id} className="ms-category-btn" onClick={() => handleCategorySelect(cat)}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Selection Popup for Cook It */}
      {showMemberPopup && selectedRecipe && (
        <div className="ms-popup-overlay" onClick={() => setShowMemberPopup(false)}>
          <div className="ms-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="ms-popup-header">
              <h3>🍳 {selectedRecipe.name}</h3>
              <button className="ms-popup-close" onClick={() => setShowMemberPopup(false)}>✕</button>
            </div>
            <div className="ms-popup-body">
              <p className="ms-popup-question">How many people are eating?</p>
              <p className="ms-popup-base-info">Base recipe serves: {selectedRecipe.baseServings || 4} persons</p>
              <div className="ms-member-options">
                {memberOptions.map(option => (
                  <label key={option.value} className="ms-member-option">
                    <input
                      type="radio"
                      name="members"
                      value={option.value}
                      checked={option.value === 'other' ? showCustomInput : selectedMembers === option.value}
                      onChange={() => handleMemberSelect(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
                
                {showCustomInput && (
                  <input
                    type="number"
                    className="ms-custom-member-input"
                    placeholder="Enter number of people"
                    value={customMembers}
                    onChange={handleCustomMemberChange}
                    min="1"
                    autoFocus
                  />
                )}
              </div>
            </div>
            <div className="ms-popup-footer">
              <button 
                className="ms-popup-view" 
                onClick={() => {
                  const members = selectedMembers === 'other' ? customMembers : selectedMembers;
                  if (!members || members === '') {
                    toast.warning('Please select number of people');
                    return;
                  }
                  navigate(`/recipe/${selectedRecipe.id}?members=${members}`);
                  setShowMemberPopup(false);
                }}
              >
                👁️ View
              </button>
              
              <button 
                className="ms-popup-cook-view" 
                onClick={handleConfirmCooking}
                disabled={isCooking}
              >
                {isCooking ? '⏳ Cooking...' : '🍳 Cook & View'}
              </button>
              
              <button 
                className="ms-popup-cancel" 
                onClick={() => setShowMemberPopup(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Meal Form Popup */}
      {showAddMealForm && selectedDate && (
        <div className="ms-popup-overlay" onClick={() => setShowAddMealForm(false)}>
          <div className="ms-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="ms-popup-header">
              <h3>{editingMeal ? '✏️ Edit Meal' : '➕ Add Meal'} for {selectedDate.fullName || selectedDate.id}</h3>
              <button className="ms-popup-close" onClick={() => setShowAddMealForm(false)}>✕</button>
            </div>
            <div className="ms-popup-body">
              <div className="ms-form-group">
                <label>🍽️ Recipe Name</label>
                <div className="ms-suggestions-container">
                  <input 
                    type="text"
                    className="ms-recipe-input"
                    placeholder="Type recipe name (e.g., Mutton Curry, Chicken Karahi)"
                    value={manualRecipeName}
                    onChange={handleManualRecipeChange}
                    autoFocus
                  />
                  {showRecipeSuggestions && recipeSuggestions.length > 0 && (
                    <div className="ms-suggestions-dropdown">
                      {recipeSuggestions.map(recipe => (
                        <div 
                          key={recipe._id} 
                          className="ms-suggestion-item"
                          onClick={() => selectRecipeSuggestion(recipe)}
                        >
                          {recipe.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <small>Type to search recipes from database</small>
              </div>
              <div className="ms-form-group">
                <label>👥 Number of People</label>
                <input 
                  type="number" 
                  value={selectedMealMembers} 
                  onChange={(e) => setSelectedMealMembers(parseInt(e.target.value))}
                  min="1"
                />
              </div>
            </div>
            <div className="ms-popup-footer">
              <button className="ms-popup-cancel" onClick={() => {
                setShowAddMealForm(false);
                setEditingMeal(null);
                setManualRecipeName('');
                setRecipeSuggestions([]);
              }}>Cancel</button>
              <button className="ms-popup-confirm" onClick={handleSaveMeal}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Full Month History Popup */}
      {showMonthHistory && (
        <div className="ms-popup-overlay" onClick={() => setShowMonthHistory(false)}>
          <div className="ms-history-popup" onClick={(e) => e.stopPropagation()}>
            <div className="ms-popup-header">
              <h3>📅 Full Month History</h3>
              <button className="ms-popup-close" onClick={() => setShowMonthHistory(false)}>✕</button>
            </div>
            <div className="ms-history-popup-body">
              {loadingHistory ? (
                <div className="loading-placeholder">Loading history...</div>
              ) : monthHistory.length === 0 ? (
                <div className="empty-history">
                  <p>No cooking history found for the last 30 days</p>
                  <p className="empty-history-sub">Start cooking some recipes to see them here!</p>
                </div>
              ) : (
                <div className="history-list">
                  {monthHistory.map((meal, idx) => (
                    <div key={idx} className="history-item" onClick={() => {
                      setShowMonthHistory(false);
                      navigate(`/recipe/${meal.recipeId}`);
                    }}>
                      <div className="history-date">
                        <span className="history-day">{meal.dayName}</span>
                        <span className="history-date-num">{meal.date}</span>
                      </div>
                      <div className="history-details">
                        <span className="history-recipe">🍳 {meal.recipeName}</span>
                        <span className="history-members">👥 {meal.members} persons</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="ms-popup-footer">
              <button className="ms-popup-cancel" onClick={() => setShowMonthHistory(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSuggestion;