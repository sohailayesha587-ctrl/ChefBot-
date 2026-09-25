import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaSearch, FaSyncAlt, FaBoxOpen, FaShoppingCart, FaShoppingBag,
  FaPlus, FaTimes, FaChevronLeft, FaChevronRight, FaEye, FaUtensils,
  FaExclamationTriangle, FaCheck, FaArrowLeft, FaTrashAlt, FaUsers,
  FaClock, FaBan, FaStickyNote, FaForward
} from 'react-icons/fa';
import './MealSuggestion.css';

const MealSuggestion = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedFor, setSearchedFor] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);

  const [pantryItems, setPantryItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDayMeals, setSelectedDayMeals] = useState([]);
  const [expandedDay, setExpandedDay] = useState(null);
  const [isNoCookingDay, setIsNoCookingDay] = useState(false);
  const [dayStatus, setDayStatus] = useState({});

  const [showAddMealForm, setShowAddMealForm] = useState(false);
  const [selectedMealRecipe, setSelectedMealRecipe] = useState('');
  const [manualRecipeName, setManualRecipeName] = useState('');
  const [recipeSuggestions, setRecipeSuggestions] = useState([]);
  const [showRecipeSuggestions, setShowRecipeSuggestions] = useState(false);
  const [selectedMealMembers, setSelectedMealMembers] = useState(4);
  const [editingMeal, setEditingMeal] = useState(null);

  const [showMissingInline, setShowMissingInline] = useState(false);
  const [missingFundamentals, setMissingFundamentals] = useState([]);
  const [skipFundamental, setSkipFundamental] = useState(false);

  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [showMemberPopup, setShowMemberPopup] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState('4');
  const [customMembers, setCustomMembers] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isCooking, setIsCooking] = useState(false);
  const [showCookTip, setShowCookTip] = useState(false);

  const [filters, setFilters] = useState({
    mealType: 'all',
    dietType: 'all',
    allergy: 'none',
    ageGroup: 'general'
  });

  const [patientSections, setPatientSections] = useState({
    diabetes: {
      recipes: [],
      currentPage: 0,
      loading: false,
      hasMore: false
    },
    heart: {
      recipes: [],
      currentPage: 0,
      loading: false,
      hasMore: false
    },
    bp: {
      recipes: [],
      currentPage: 0,
      loading: false,
      hasMore: false
    },
  
    lowfat: {
      recipes: [],
      currentPage: 0,
      loading: false,
      hasMore: false
    }
  });

  const patientTypes = [
    {
      id: 'diabetes',
      name: 'Diabetes Friendly',
      label: 'DB'
    },
    {
      id: 'heart',
      name: 'Heart Health',
      label: 'HH'
    },
    {
      id: 'bp',
      name: 'BP / Low Salt',
      label: 'BP'
    },
  
    {
      id: 'lowfat',
      name: 'Low Fat',
      label: 'LF'
    }
  ];

  const MEAL_TYPES = [
    { value: 'all', label: 'All' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' },
    { value: 'dessert', label: 'Dessert' },
    { value: 'anytime', label: 'Anytime' },
    { value: 'appetizer', label: 'Appetizer' }
  ];

  const DIET_TYPES = [
    { value: 'all', label: 'All' },
    { value: 'veg', label: 'Veg' },
    { value: 'non-veg', label: 'Non-Veg' }
  ];

  const ALLERGIES = [
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

  const AGE_GROUPS = [
    { value: 'kids', label: 'Kids' },
    { value: 'teens', label: 'Teens' },
    { value: 'general', label: 'General' },
    { value: 'patient', label: 'Patient' },
    { value: 'family-mix', label: 'Family Mix' }
  ];

  const moreCategories = [
    { id: 'quick', name: 'Quick Recipes', query: 'quick' },
    { id: 'soups', name: 'Soups', query: 'soups' },
    { id: 'cheat-meal', name: 'Junk Food', query: 'cheat-meal' },
    { id: 'chicken', name: 'Chicken', query: 'chicken' },
    { id: 'vegetarian', name: 'Vegetarian', query: 'plain-veg' },
    { id: 'fish', name: 'Fish', query: 'fish' },
    { id: 'rice', name: 'Rice', query: 'rice' },
    { id: 'dessert', name: 'Dessert', query: 'dessert' },
    { id: 'breads', name: 'Breads', query: 'bread' },
    { id: 'none', name: 'None', query: null }
  ];

  const memberOptions = [
    { value: '2', label: '2 people' },
    { value: '4', label: '4 people' },
    { value: '6', label: '6 people' },
    { value: '8', label: '8 people' },
    { value: '10', label: '10 people' },
    { value: 'other', label: 'Other (enter manually)' }
  ];

  const getToken = () => localStorage.getItem('userToken');

  const getDateForDay = (dayName) => {
    const today = new Date();

    const daysMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6
    };

    const diff = daysMap[dayName] - today.getDay();
    const date = new Date(today);

    date.setDate(today.getDate() + diff);

    return date.toISOString().split('T')[0];
  };

  const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const weekDays = [
    {
      id: 'mon',
      name: 'MON',
      fullName: 'Monday',
      date: getDateForDay('Monday')
    },
    {
      id: 'tue',
      name: 'TUE',
      fullName: 'Tuesday',
      date: getDateForDay('Tuesday')
    },
    {
      id: 'wed',
      name: 'WED',
      fullName: 'Wednesday',
      date: getDateForDay('Wednesday')
    },
    {
      id: 'thu',
      name: 'THU',
      fullName: 'Thursday',
      date: getDateForDay('Thursday')
    },
    {
      id: 'fri',
      name: 'FRI',
      fullName: 'Friday',
      date: getDateForDay('Friday')
    },
    {
      id: 'sat',
      name: 'SAT',
      fullName: 'Saturday',
      date: getDateForDay('Saturday')
    },
    {
      id: 'sun',
      name: 'SUN',
      fullName: 'Sunday',
      date: getDateForDay('Sunday')
    }
  ];

  const getTodayDayId = () => {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long'
    });

    const dayMap = {
      Monday: 'mon',
      Tuesday: 'tue',
      Wednesday: 'wed',
      Thursday: 'thu',
      Friday: 'fri',
      Saturday: 'sat',
      Sunday: 'sun'
    };

    return dayMap[today] || 'mon';
  };

  const todayDateStr = new Date().toISOString().split('T')[0];

  const closeMobileDetail = () => {
    setSelectedDate(null);
    setExpandedDay(null);
  };

  const fetchPantryItems = async () => {
    try {
      const res = await fetch('/api/pantry', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      const data = await res.json();

      if (data.success && data.items) {
        const names = data.items.map(item =>
          item.name.toLowerCase().trim()
        );

        setPantryItems(names);

        return names;
      }
    } catch (err) {
      console.log('pantry error', err);
    }

    return [];
  };

  const fetchSuggestions = async (
    search = searchQuery,
    forceSkip = false
  ) => {
    setLoading(true);
    setError(null);

    try {
      let pantry = pantryItems;

      if (pantry.length === 0) {
        pantry = await fetchPantryItems();
      }

      let url = `/api/meal-suggestions?`;

      if (search) {
        url += `search=${encodeURIComponent(search)}&`;
      }

      if (filters.mealType !== 'all') {
        url += `mealTime=${filters.mealType}&`;
      }

      if (filters.dietType !== 'all') {
        url += `dietType=${filters.dietType}&`;
      }

      if (filters.allergy !== 'none') {
        url += `allergy=${filters.allergy}&`;
      }

      if (filters.ageGroup !== 'general' && filters.ageGroup !== 'patient') {
        url += `ageGroup=${filters.ageGroup}&`;
      }

      if (forceSkip || skipFundamental) {
        url += `skipFundamental=true&`;
      }

      if (pantry.length > 0) {
        url += `pantry=${encodeURIComponent(pantry.join(','))}&`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      const data = await res.json();

      if (
        data.missingFundamentals &&
        data.missingFundamentals.length > 0
      ) {
        setMissingFundamentals(data.missingFundamentals);
        setShowMissingInline(true);
        setSuggestions([]);
      } else if (
        data.suggestions &&
        data.suggestions.length > 0
      ) {
        setSuggestions(data.suggestions);

        if (search) {
          setSearchedFor(search);
        }

        setShowMissingInline(false);
        setError(null);
        setVisibleCount(8);
      } else {
        setSuggestions([]);
        setError(data.message || 'No recipes found');
      }
    } catch (err) {
      setError(
        'Failed to load suggestions. Please login first or check internet connection'
      );
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };
const fetchPatientRecipes = async (type, page = 0) => {
  setPatientSections(prev => ({
    ...prev,
    [type]: {
      ...prev[type],
      loading: true
    }
  }));

  try {
    const limit = 5;
    const params = new URLSearchParams();

    params.append('limit', limit);
    params.append('skip', page * limit);

    if (filters.dietType !== 'all') {
      params.append('dietType', filters.dietType);
    }

    if (filters.mealType !== 'all') {
      params.append('mealTime', filters.mealType);
    }

    if (filters.allergy !== 'none') {
      params.append('allergy', filters.allergy);
    }

    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }

    let pantry = pantryItems;

    if (pantry.length === 0) {
      pantry = await fetchPantryItems();
    }

    if (pantry.length > 0) {
      params.append('pantry', pantry.join(','));
    }

    const res = await fetch(`/api/meal-suggestions/patient/${type}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    const data = await res.json();

    if (data.success && data.recipes) {
      setPatientSections(prev => ({
        ...prev,
        [type]: {
          recipes: data.recipes,
          currentPage: page,
          loading: false,
          hasMore: data.hasMore || false
        }
      }));
    } else {
      setPatientSections(prev => ({
        ...prev,
        [type]: {
          ...prev[type],
          loading: false,
          recipes: [],
          hasMore: false
        }
      }));
    }
  } catch (err) {
    setPatientSections(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        loading: false,
        recipes: [],
        hasMore: false
      }
    }));
  }
};

  const fetchAllPatientRecipes = () => {
    patientTypes.forEach(type => {
      fetchPatientRecipes(type.id, 0);
    });
  };

  const fetchCookingLogForDate = async (date) => {
    try {
      const res = await fetch(
        `/api/meal-suggestions/cooking-log/${date}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      const data = await res.json();

      let status = 'pending';

      if (data.meals && data.meals.length > 0) {
        status = 'completed';
      } else if (data.isNoCookingDay) {
        status = 'no-cooking';
      }

      setDayStatus(prev => ({
        ...prev,
        [date]: status
      }));

      if (status === 'no-cooking') {
        setSelectedDayMeals([]);
        setIsNoCookingDay(true);
      } else if (status === 'completed') {
        setIsNoCookingDay(false);
        setSelectedDayMeals(data.meals);
      } else {
        setIsNoCookingDay(false);
        setSelectedDayMeals([]);
      }
    } catch (err) {
      setSelectedDayMeals([]);
      setIsNoCookingDay(false);
    }
  };

  const loadAllDayStatuses = async () => {
    for (const day of weekDays) {
      try {
        const res = await fetch(
          `/api/meal-suggestions/cooking-log/${day.date}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          }
        );

        const data = await res.json();

        let status = 'pending';

        if (data.meals && data.meals.length > 0) {
          status = 'completed';
        } else if (data.isNoCookingDay) {
          status = 'no-cooking';
        }

        setDayStatus(prev => ({
          ...prev,
          [day.date]: status
        }));
      } catch (err) {
        console.log('status error', err);
      }
    }
  };

  const searchRecipesForSuggestions = async (query) => {
    if (!query.trim()) {
      setRecipeSuggestions([]);
      setShowRecipeSuggestions(false);
      return;
    }

    try {
      const res = await fetch(
        `/api/recipes/search?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      const data = await res.json();

      if (data.success && data.recipes) {
        setRecipeSuggestions(data.recipes.slice(0, 5));
        setShowRecipeSuggestions(true);
      }
    } catch (err) {
      console.log('search error', err);
    }
  };

  const handleDayClick = async (day) => {
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
      return toast.error('No date selected');
    }

    try {
      const res = await fetch(
        '/api/meal-suggestions/cooking-log',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            date: selectedDate.date,
            recipeId: null,
            recipeName: null,
            members: 0,
            noCooking: true
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(
          `Marked ${selectedDate.fullName} as no cooking day`
        );

        setSelectedDayMeals([]);
        setIsNoCookingDay(true);

        setDayStatus(prev => ({
          ...prev,
          [selectedDate.date]: 'no-cooking'
        }));

        setShowAddMealForm(false);
        closeMobileDetail();
      } else {
        toast.error(data.message || 'Error saving');
      }
    } catch (err) {
      toast.error('Error saving no cooking status');
    }
  };

  const handleForgotToLog = () => {
    if (!selectedDate) {
      return toast.error('Please select a day first');
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
  };

  const handleDeleteMeal = async (meal) => {
    if (!selectedDate) {
      return toast.error('No date selected');
    }

    try {
      const mealId = meal._id || meal.id;

      const res = await fetch(
        `/api/meal-suggestions/cooking-log/${selectedDate.date}/meal/${mealId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success('Meal deleted');
        await fetchCookingLogForDate(selectedDate.date);
      } else {
        toast.error(data.message || 'Error deleting meal');
      }
    } catch (err) {
      toast.error('Error deleting meal');
    }
  };

  const handleSaveMeal = async () => {
    if (!selectedDate) {
      return toast.error('No date selected');
    }

    if (!manualRecipeName.trim()) {
      return toast.warning('Please enter recipe name');
    }

    try {
      if (editingMeal) {
        const res = await fetch(
          `/api/meal-suggestions/cooking-log/${selectedDate.date}/meal/${editingMeal._id || editingMeal.id}`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${getToken()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              recipeId: selectedMealRecipe || 'manual',
              recipeName: manualRecipeName,
              members: selectedMealMembers
            })
          }
        );

        const data = await res.json();

        if (data.success) {
          toast.success('Meal updated');
        } else {
          toast.error(data.message || 'Error updating meal');
        }
      } else {
        const res = await fetch(
          '/api/meal-suggestions/cooking-log',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${getToken()}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              date: selectedDate.date,
              recipeId: selectedMealRecipe || 'manual',
              recipeName: manualRecipeName,
              members: selectedMealMembers
            })
          }
        );

        const data = await res.json();

        if (data.success) {
          toast.success(`${manualRecipeName} added`);

          setDayStatus(prev => ({
            ...prev,
            [selectedDate.date]: 'completed'
          }));
        } else {
          toast.error(data.message || 'Error adding meal');
        }
      }

      setShowAddMealForm(false);
      setEditingMeal(null);
      setSelectedMealRecipe('');
      setManualRecipeName('');
      setRecipeSuggestions([]);

      await fetchCookingLogForDate(selectedDate.date);
    } catch (err) {
      toast.error('Error saving meal');
    }
  };

  const handleAddToShopping = async (recipe) => {
    if (!recipe.missing || recipe.missing.length === 0) {
      return toast.info('No missing ingredients');
    }

    try {
      const shoppingRes = await fetch('/api/shopping', {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      const shoppingData = await shoppingRes.json();

      const existing = (shoppingData.items || []).map(
        item => item.name.toLowerCase()
      );

      const newItems = recipe.missing.filter(
        item => !existing.includes(item.toLowerCase())
      );

      if (newItems.length === 0) {
        toast.info('All missing items already in shopping list');
        return;
      }

      const res = await fetch(
        '/api/shopping/add-missing',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipeId: recipe.id || recipe._id,
            missingIngredients: newItems
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(`Added: ${newItems.join(', ')}`);
      } else {
        toast.error('Failed to add items');
      }
    } catch (err) {
      toast.error('Error adding items to shopping list');
    }
  };

  const handleAddMissingToShopping = async () => {
    try {
      const res = await fetch(
        '/api/shopping/add-multiple',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            items: missingFundamentals.map(item => ({
              name: item,
              quantity: 1,
              unit: 'pieces'
            }))
          })
        }
      );

      if (res.ok) {
        toast.success(
          `${missingFundamentals.length} items added to shopping list`
        );
      } else {
        toast.error('Failed to add items');
      }
    } catch (err) {
      toast.error('Error adding items');
    }
  };

  const handlePandaMartOrder = () => {
    window.open(
      `https://www.google.com/search?q=pandamart+${encodeURIComponent(
        missingFundamentals.join(', ')
      )}+Pakistan`,
      '_blank'
    );

    toast.info('Opening Google search for Pandamart');
  };

  const handleSkipAndContinue = () => {
    setSkipFundamental(true);
    setShowMissingInline(false);
    fetchSuggestions(searchQuery, true);
  };

  const handleConfirmCooking = async () => {
    const membersValue =
      selectedMembers === 'other'
        ? customMembers
        : selectedMembers;

    if (!membersValue) {
      return toast.warning('Please select number of people');
    }

    setIsCooking(true);

    try {
      const res = await fetch(
        '/api/meal-suggestions/cook',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipeId: selectedRecipe.id || selectedRecipe._id,
            members: parseInt(membersValue),
            date: selectedDate?.date || todayDateStr
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setShowMemberPopup(false);

        navigate(
          `/recipe/${selectedRecipe.id || selectedRecipe._id}?members=${membersValue}`
        );

        if (selectedDate) {
          setDayStatus(prev => ({
            ...prev,
            [selectedDate.date]: 'completed'
          }));

          await fetchCookingLogForDate(selectedDate.date);
        }

        fetchSuggestions(searchQuery);
      } else {
        toast.error(data.message || 'Error cooking recipe');
      }
    } catch (err) {
      toast.error('Error cooking recipe');
    } finally {
      setIsCooking(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    setSkipFundamental(false);

    if (searchQuery.trim()) {
      fetchSuggestions(searchQuery);
    } else {
      fetchSuggestions('');
    }

    closeMobileDetail();
  };

  const handleRefreshPantry = async () => {
    toast.info('Refreshing pantry...');

    const items = await fetchPantryItems();

    setPantryItems(items);

    await fetchSuggestions(searchQuery);

    toast.success('Pantry refreshed!');
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
    const id = recipe._id || recipe.id || recipe.recipeId;

    if (id) {
      navigate(`/recipe/${id}`);
    } else {
      toast.error('Recipe ID not found');
    }
  };

  const handleCookIt = (recipe) => {
    if (showCookTip) {
      dismissCookTip();
    }

    setSelectedRecipe(recipe);
    setSelectedMembers('4');
    setCustomMembers('');
    setShowCustomInput(false);
    setShowMemberPopup(true);
  };

  const getUserIdFromToken = () => {
    try {
      const token = getToken();

      if (!token) {
        return null;
      }

      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      return payload.id || payload._id || payload.userId;
    } catch (err) {
      return null;
    }
  };

  const dismissCookTip = () => {
    const userId = getUserIdFromToken();

    if (userId) {
      localStorage.setItem(
        `chefbot_has_seen_cook_tip_${userId}`,
        'true'
      );
    }

    setShowCookTip(false);
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

  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const getMatchColor = (match) => {
    if (match >= 60) return '#22c55e';
    if (match >= 40) return '#f97316';

    return '#ef4444';
  };

  const getDayStatusIcon = (day) => {
    const status = dayStatus[day.date];

    if (
      status === 'pending' &&
      day.date <= todayDateStr
    ) {
      return (
        <span className="ms-status-dot ms-status-pending"></span>
      );
    }

    return null;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    loadAllDayStatuses();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('q');

    fetchPantryItems();

    const userId = getUserIdFromToken();

    const hasSeenTip = userId
      ? localStorage.getItem(
          `chefbot_has_seen_cook_tip_${userId}`
        )
      : null;

    if (!hasSeenTip) {
      setShowCookTip(true);
    }

    if (searchParam) {
      setSearchQuery(searchParam);
      fetchSuggestions(searchParam);
    } else {
      fetchSuggestions('');
    }

    const todayDay = weekDays.find(
      day => day.id === getTodayDayId()
    );

    if (todayDay) {
      setSelectedDate(todayDay);
      fetchCookingLogForDate(todayDay.date);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchSuggestions(searchQuery);
    }
  }, [filters]);

  useEffect(() => {
    if (filters.ageGroup === 'patient') {
      fetchAllPatientRecipes();
    } else {
      setPatientSections(prev => ({
        diabetes: {
          ...prev.diabetes,
          recipes: [],
          currentPage: 0,
          hasMore: false
        },
        heart: {
          ...prev.heart,
          recipes: [],
          currentPage: 0,
          hasMore: false
        },
        bp: {
          ...prev.bp,
          recipes: [],
          currentPage: 0,
          hasMore: false
        },
       
        lowfat: {
          ...prev.lowfat,
          recipes: [],
          currentPage: 0,
          hasMore: false
        }
      }));
    }
  }, [
    filters.ageGroup,
    filters.dietType,
    filters.mealType,
    filters.allergy,
    pantryItems
  ]);
  const visibleSuggestions = suggestions.slice(
    0,
    visibleCount
  );

  const hasMore =
    visibleCount < suggestions.length;

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
      <div className="ms-hero-split">
        <div className="ms-hero-text-side">
          <h1 className="ms-hero-title">
            What to Cook Today?
          </h1>

          <p className="ms-hero-desc">
            Plan delicious meals based on your ingredients and preferences.
          </p>
        </div>

        <div className="ms-hero-image-side">
          <img
            src="/meal_suggestion.jpg"
            alt="Meal Schedule"
            className="ms-hero-img"
          />
        </div>
      </div>

      <div className="ms-layout">
        {!isMobile && (
          <div
            className={`ms-days-calendar ${
              expandedDay !== null ? 'ms-expanded' : ''
            }`}
          >
            {weekDays.map(day => {
              const isExpanded =
                expandedDay === day.id;

              const mealsForDay =
                isExpanded ? selectedDayMeals : [];

              const status =
                dayStatus[day.date];

              const isToday =
                day.date === todayDateStr;

              return (
                <div
                  key={day.id}
                  className="ms-day-wrapper"
                >
                  <div
                    className={`ms-day-item ${
                      selectedDate?.id === day.id
                        ? 'ms-day-active'
                        : ''
                    } ${
                      isToday
                        ? 'ms-day-today'
                        : ''
                    }`}
                    onClick={() =>
                      handleDayClick(day)
                    }
                  >
                    <span className="ms-day-name">
                      {day.name}
                    </span>

                    <span className="ms-day-date">
                      {getFormattedDate(day.date)}
                    </span>

                    {getDayStatusIcon(day)}
                  </div>

                  {isExpanded && (
                    <div className="ms-day-meals-expanded">
                      <div className="ms-expanded-header">
                        <div>
                          <span className="ms-expanded-day">
                            {day.fullName}
                          </span>

                          <span className="ms-expanded-date">
                            {getFormattedDate(day.date)}
                          </span>
                        </div>

                        <button
                          onClick={handleCloseExpanded}
                        >
                          <FaTimes />
                        </button>
                      </div>

                      {status === 'no-cooking' ? (
                        <div className="ms-no-meals-expanded">
                          <div className="ms-no-cooking-msg">
                            <FaBan />
                            No cooking this day
                          </div>

                          <button
                            onClick={handleForgotToLog}
                          >
                            <FaPlus />
                            Add Meal
                          </button>
                        </div>
                      ) : mealsForDay.length > 0 ? (
                        <>
                          <div className="ms-meals-list-expanded">
                            {mealsForDay.map(
                              (meal, idx) => (
                                <div
                                  key={idx}
                                  className="ms-meal-item-expanded"
                                >
                                  <div className="ms-meal-info-expanded">
                                    <span className="ms-meal-name">
                                      {meal.recipeName}
                                    </span>

                                    <span className="ms-meal-members">
                                      <FaUsers />
                                      {meal.members}
                                    </span>
                                  </div>

                                  <div className="ms-meal-actions-expanded">
                                    <button
                                      onClick={() =>
                                        handleEditMeal(
                                          meal
                                        )
                                      }
                                    >
                                      Edit
                                    </button>

                                    <button
                                      onClick={() =>
                                        handleDeleteMeal(
                                          meal
                                        )
                                      }
                                    >
                                      <FaTrashAlt />
                                    </button>
                                  </div>
                                </div>
                              )
                            )}
                          </div>

                          <button
                            onClick={handleForgotToLog}
                          >
                            <FaPlus />
                            Add Meal
                          </button>
                        </>
                      ) : (
                        <div className="ms-no-meals-expanded">
                          <p>No meals recorded.</p>

                          <div className="ms-expanded-actions">
                            <button
                              onClick={handleNoCooking}
                            >
                              <FaBan />
                              No cooking done
                            </button>

                            <button
                              onClick={handleForgotToLog}
                            >
                              <FaStickyNote />
                              I forgot to log
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="ms-main-content">
          <form
            onSubmit={handleSearchSubmit}
            className="ms-search-form"
          >
            <div className="ms-search-wrapper">
              <FaSearch />

              <input
                type="text"
                className="ms-search-input"
                placeholder="Search: breakfast, spicy chicken, quick dinner..."
                value={searchQuery}
                onChange={e =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>

            <div className="ms-search-actions">
              <button type="submit">
                Find Recipes
              </button>

              <button
                type="button"
                onClick={handleRefreshPantry}
                title="Refresh Pantry"
              >
                <FaSyncAlt />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate('/smart-pantry')
                }
                title="Pantry"
              >
                <FaBoxOpen />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate('/smart-shopping')
                }
                title="Shopping List"
              >
                <FaShoppingCart />
              </button>
            </div>
          </form>

          <div className="ms-filters-bar">
            <select
              value={filters.mealType}
              onChange={e =>
                setFilters({
                  ...filters,
                  mealType: e.target.value
                })
              }
            >
              {MEAL_TYPES.map(type => (
                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={filters.dietType}
              onChange={e =>
                setFilters({
                  ...filters,
                  dietType: e.target.value
                })
              }
            >
              {DIET_TYPES.map(type => (
                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={filters.allergy}
              onChange={e =>
                setFilters({
                  ...filters,
                  allergy: e.target.value
                })
              }
            >
              {ALLERGIES.map(allergy => (
                <option
                  key={allergy.value}
                  value={allergy.value}
                >
                  {allergy.label}
                </option>
              ))}
            </select>

            <select
              value={filters.ageGroup}
              onChange={e =>
                setFilters({
                  ...filters,
                  ageGroup: e.target.value
                })
              }
            >
              {AGE_GROUPS.map(group => (
                <option
                  key={group.value}
                  value={group.value}
                >
                  {group.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() =>
                setShowCategoryModal(true)
              }
            >
              <FaPlus />
              More
            </button>
          </div>

          {filters.ageGroup === 'patient' && (
            <div className="patient-sections-container">
              {patientTypes.map(type => {
                const section =
                  patientSections[type.id];

                if (
                  section.loading &&
                  section.recipes.length === 0
                ) {
                  return (
                    <div
                      key={type.id}
                      className="patient-section"
                    >
                      Loading {type.name}...
                    </div>
                  );
                }

                if (section.recipes.length === 0) {
                  return (
                    <div
                      key={type.id}
                      className="patient-section"
                    >
                      <h3>
                        <span className="patient-label">
                          {type.label}
                        </span>
                        {type.name}
                      </h3>

                      <p>No recipes found for selected filters.</p>
                    </div>
                  );
                }

                return (
                  <div
                    key={type.id}
                    className="patient-section"
                  >
                    <h3>
                      <span className="patient-label">
                        {type.label}
                      </span>

                      {type.name}
                    </h3>

                    <div className="horizontal-scroll-container">
                      <button
                        disabled={
                          section.currentPage === 0
                        }
                        onClick={() =>
                          fetchPatientRecipes(
                            type.id,
                            section.currentPage - 1
                          )
                        }
                      >
                        <FaChevronLeft />
                      </button>

                      <div className="patient-recipes-wrapper">
                        {section.recipes.map(recipe => (
                          <div
                            key={recipe._id}
                            className="patient-recipe-card"
                          >
                            <div
                              className="patient-recipe-image"
                              style={{
                                backgroundImage: `url(${
                                  recipe.image ||
                                  'https://via.placeholder.com/150'
                                })`
                              }}
                              onClick={() =>
                                handleRecipeClick(
                                  recipe
                                )
                              }
                            >
                              <span
                                className="ms-match-badge"
                                style={{
                                  backgroundColor:
                                    getMatchColor(
                                      recipe.match
                                    )
                                }}
                              >
                                {recipe.match || 0}%
                              </span>
                            </div>

                            <h4>{recipe.title}</h4>

                            <p>
                              <FaClock />
                              {recipe.cookingTime || 0} min
                            </p>

                            {recipe.match === 100 ? (
                              <div className="ms-full-match">
                                <FaCheck />
                                All ingredients ready
                              </div>
                            ) : recipe.missing &&
                              recipe.missing.length > 0 ? (
                              <div className="ms-missing-ingredients">
                                Missing:{' '}
                                {recipe.missing
                                  .slice(0, 3)
                                  .join(', ')}

                                {recipe.missing.length >
                                  3 &&
                                  ` +${
                                    recipe.missing
                                      .length - 3
                                  }`}
                              </div>
                            ) : (
                              <div className="ms-no-ingredients">
                                No ingredients listed
                              </div>
                            )}

                            <div className="ms-match-progress">
                              <div
                                style={{
                                  width: `${recipe.match || 0}%`,
                                  backgroundColor:
                                    getMatchColor(
                                      recipe.match
                                    )
                                }}
                              ></div>
                            </div>

                            <div className="patient-recipe-actions">
                              <button
                                onClick={() =>
                                  handleCookIt(recipe)
                                }
                              >
                                <FaUtensils />
                                Cook
                              </button>

                              {recipe.missing &&
                                recipe.missing.length >
                                  0 && (
                                  <button
                                    onClick={() =>
                                      handleAddToShopping(
                                        recipe
                                      )
                                    }
                                  >
                                    <FaShoppingCart />
                                  </button>
                                )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        disabled={!section.hasMore}
                        onClick={() =>
                          fetchPatientRecipes(
                            type.id,
                            section.currentPage + 1
                          )
                        }
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isMobile && (
            <div className="ms-mobile-calendar-hub">
              <div className="ms-mobile-week-grid">
                {weekDays.map(day => {
                  const status =
                    dayStatus[day.date];

                  const isActive =
                    selectedDate?.id === day.id;

                  return (
                    <div
                      key={day.id}
                      className={`ms-mobile-day ${
                        isActive ? 'active' : ''
                      } ${
                        day.date === todayDateStr
                          ? 'today'
                          : ''
                      }`}
                      onClick={() =>
                        isActive
                          ? closeMobileDetail()
                          : handleDayClick(day)
                      }
                    >
                      <span>{day.name}</span>
                      <span>
                        {new Date(day.date).getDate()}
                      </span>

                      {status === 'completed' && (
                        <span className="dot completed"></span>
                      )}

                      {status === 'pending' &&
                        day.date <= todayDateStr && (
                          <span className="dot pending"></span>
                        )}
                    </div>
                  );
                })}
              </div>

              {weekDays.map(day => {
                const isActive =
                  selectedDate?.id === day.id;

                const mealsForDay =
                  isActive ? selectedDayMeals : [];

                const status =
                  dayStatus[day.date];

                if (!isActive) {
                  return null;
                }

                return (
                  <div
                    key={`detail-${day.id}`}
                    className="ms-mobile-day-details open"
                  >
                    <div className="detail-header">
                      <span>{day.fullName}</span>
                    </div>

                    {status === 'no-cooking' ? (
                      <div className="empty-day">
                        No cooking this day
                      </div>
                    ) : mealsForDay.length > 0 ? (
                      mealsForDay.map((meal, idx) => (
                        <div
                          key={idx}
                          className="meal-row"
                        >
                          <span>
                            {meal.recipeName}
                          </span>

                          <span>
                            {meal.members}
                          </span>

                          <button
                            onClick={() =>
                              handleDeleteMeal(
                                meal
                              )
                            }
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="empty-day">
                        No meals recorded
                      </div>
                    )}

                    <div className="detail-actions">
                      <button
                        onClick={handleForgotToLog}
                      >
                        Add meal
                      </button>

                      {status !== 'no-cooking' &&
                        mealsForDay.length === 0 && (
                          <button
                            onClick={handleNoCooking}
                          >
                            No cooking
                          </button>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {showMissingInline && (
            <div className="ms-missing-inline">
              <div className="ms-missing-inline-header">
                <FaExclamationTriangle />
                <span>
                  Essential Items Missing
                </span>
              </div>

              <p>
                Your pantry is missing:{' '}
                <strong>
                  {missingFundamentals.join(', ')}
                </strong>
              </p>

              <div className="ms-missing-inline-actions">
                <button
                  onClick={
                    handleAddMissingToShopping
                  }
                >
                  <FaShoppingCart />
                  Add to Shopping List
                </button>

                <button
                  onClick={handlePandaMartOrder}
                >
                  <FaShoppingBag />
                  Order from Panda Mart
                </button>

                <button
                  onClick={handleSkipAndContinue}
                >
                  <FaForward />
                  Skip & Show Suggestions
                </button>
              </div>
            </div>
          )}

          {error && !showMissingInline && (
            <div className="ms-error">
              <p>{error}</p>
            </div>
          )}

          {!showMissingInline &&
            suggestions.length > 0 && (
              <div className="ms-results-info">
                {searchedFor && (
                  <p>
                    Results for:{' '}
                    <strong>
                      "{searchedFor}"
                    </strong>
                  </p>
                )}

                <p>
                  Found{' '}
                  <span>
                    {suggestions.length}
                  </span>{' '}
                  recipes
                </p>
              </div>
            )}

          {!showMissingInline &&
            visibleSuggestions.length > 0 && (
              <>
                <div className="ms-suggestions-grid">
                  {visibleSuggestions.map(
                    (recipe, idx) => (
                      <div
                        key={idx}
                        className="ms-recipe-card-wrapper"
                      >
                        <div className="ms-recipe-card">
                          <div
                            className="ms-recipe-image"
                            style={{
                              backgroundImage: `url(${
                                recipe.image ||
                                'https://via.placeholder.com/400x250'
                              })`
                            }}
                            onClick={() =>
                              handleRecipeClick(
                                recipe
                              )
                            }
                          >
                            <span
                              className="ms-match-badge"
                              style={{
                                backgroundColor:
                                  getMatchColor(
                                    recipe.match
                                  )
                              }}
                            >
                              {recipe.match}%
                            </span>
                          </div>

                          <div className="ms-recipe-content">
                            <h3
                              onClick={() =>
                                handleRecipeClick(
                                  recipe
                                )
                              }
                            >
                              {recipe.name}
                            </h3>

                            <p>
                              <span>
                                {recipe.subCategory ||
                                  recipe.category}
                              </span>

                              <span>
                                <FaClock />
                                {recipe.cookingTime} min
                              </span>
                            </p>

                            {recipe.match === 100 ? (
                              <div className="ms-full-match">
                                <FaCheck />
                                All ingredients ready
                              </div>
                            ) : recipe.missing &&
                              recipe.missing.length > 0 ? (
                              <div className="ms-missing-ingredients">
                                Missing:{' '}
                                {recipe.missing
                                  .slice(0, 3)
                                  .join(', ')}

                                {recipe.missing.length >
                                  3 &&
                                  ` +${
                                    recipe.missing
                                      .length - 3
                                  }`}
                              </div>
                            ) : (
                              <div className="ms-no-ingredients">
                                No ingredients listed
                              </div>
                            )}

                            <div className="ms-match-progress">
                              <div
                                style={{
                                  width: `${recipe.match}%`,
                                  backgroundColor:
                                    getMatchColor(
                                      recipe.match
                                    )
                                }}
                              ></div>
                            </div>

                            <div className="ms-recipe-actions">
                              <button
                                onClick={() =>
                                  handleCookIt(
                                    recipe
                                  )
                                }
                              >
                                <FaUtensils />
                                Cook
                              </button>

                              {recipe.missing &&
                                recipe.missing.length >
                                  0 && (
                                  <button
                                    onClick={() =>
                                      handleAddToShopping(
                                        recipe
                                      )
                                    }
                                  >
                                    <FaShoppingCart />
                                  </button>
                                )}
                            </div>
                          </div>
                        </div>

                        {idx === 0 &&
                          showCookTip && (
                            <div className="ms-cook-coachmark">
                              <p>
                                Tap "cook" when you
                                actually make this
                                dish — it deducts
                                used ingredients
                                from your pantry.
                              </p>

                              <button
                                onClick={
                                  dismissCookTip
                                }
                              >
                                Got it
                              </button>
                            </div>
                          )}
                      </div>
                    )
                  )}
                </div>

                {hasMore && (
                  <div className="ms-show-more">
                    <button onClick={loadMore}>
                      Show More —{' '}
                      {suggestions.length -
                        visibleCount}{' '}
                      more recipes
                    </button>
                  </div>
                )}
              </>
            )}

          {!showMissingInline &&
            !loading &&
            !error &&
            suggestions.length === 0 &&
            filters.ageGroup !== 'patient' && (
              <div className="ms-empty-state">
                <FaSearch size={40} />

                <h3>No recipes found</h3>

                <p>
                  Try searching for breakfast,
                  lunch, dinner, or quick recipes
                </p>
              </div>
            )}

          <div className="ms-back-section">
            <button onClick={() => navigate(-1)}>
              <FaArrowLeft />
              Back
            </button>
          </div>
        </div>
      </div>

      {showCategoryModal && (
        <div
          className="ms-modal-overlay"
          onClick={() =>
            setShowCategoryModal(false)
          }
        >
          <div
            className="ms-modal"
            onClick={e =>
              e.stopPropagation()
            }
          >
            <div className="ms-modal-header">
              <h3>More Categories</h3>

              <button
                onClick={() =>
                  setShowCategoryModal(false)
                }
              >
                <FaTimes />
              </button>
            </div>

            <div className="ms-categories-grid">
              {moreCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() =>
                    handleCategorySelect(cat)
                  }
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showMemberPopup && selectedRecipe && (
        <div
          className="ms-popup-overlay"
          onClick={() =>
            setShowMemberPopup(false)
          }
        >
          <div
            className="ms-popup-content"
            onClick={e =>
              e.stopPropagation()
            }
          >
            <div className="ms-popup-header">
              <h3>
                {selectedRecipe.name ||
                  selectedRecipe.title}
              </h3>

              <button
                onClick={() =>
                  setShowMemberPopup(false)
                }
              >
                <FaTimes />
              </button>
            </div>

            <div className="ms-popup-body">
              <p>
                How many people are eating?
              </p>

              <p>
                Base recipe serves:{' '}
                {selectedRecipe.baseServings || 4}{' '}
                persons
              </p>

              <div className="ms-member-options">
                {memberOptions.map(option => (
                  <label key={option.value}>
                    <input
                      type="radio"
                      name="members"
                      checked={
                        option.value ===
                        'other'
                          ? showCustomInput
                          : selectedMembers ===
                            option.value
                      }
                      onChange={() =>
                        handleMemberSelect(
                          option.value
                        )
                      }
                    />

                    <FaUsers />
                    {option.label}
                  </label>
                ))}

                {showCustomInput && (
                  <input
                    type="number"
                    placeholder="Enter number of people"
                    value={customMembers}
                    onChange={e => {
                      setCustomMembers(
                        e.target.value
                      );
                      setSelectedMembers(
                        e.target.value
                      );
                    }}
                    min="1"
                  />
                )}
              </div>
            </div>

            <div className="ms-popup-footer">
              <button
                onClick={() => {
                  const members =
                    selectedMembers === 'other'
                      ? customMembers
                      : selectedMembers;

                  if (!members) {
                    return toast.warning(
                      'Please select number of people'
                    );
                  }

                  const id =
                    selectedRecipe.id ||
                    selectedRecipe._id;

                  navigate(
                    `/recipe/${id}?members=${members}`
                  );

                  setShowMemberPopup(false);
                }}
              >
                <FaEye />
                View
              </button>

              <button
                onClick={handleConfirmCooking}
                disabled={isCooking}
              >
                {isCooking ? (
                  'Cooking...'
                ) : (
                  <>
                    <FaUtensils />
                    Cook & View
                  </>
                )}
              </button>

              <button
                onClick={() =>
                  setShowMemberPopup(false)
                }
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddMealForm && selectedDate && (
        <div
          className="ms-popup-overlay"
          onClick={() =>
            setShowAddMealForm(false)
          }
        >
          <div
            className="ms-popup-content"
            onClick={e =>
              e.stopPropagation()
            }
          >
            <div className="ms-popup-header">
              <h3>
                {editingMeal
                  ? 'Edit Meal'
                  : 'Add Meal'}{' '}
                — {selectedDate.fullName}
              </h3>

              <button
                onClick={() =>
                  setShowAddMealForm(false)
                }
              >
                <FaTimes />
              </button>
            </div>

            <div className="ms-popup-body">
              <div className="ms-form-group">
                <label>Recipe Name</label>

                <input
                  type="text"
                  placeholder="Type recipe name..."
                  value={manualRecipeName}
                  onChange={e => {
                    setManualRecipeName(
                      e.target.value
                    );
                    searchRecipesForSuggestions(
                      e.target.value
                    );
                  }}
                />

                {showRecipeSuggestions &&
                  recipeSuggestions.length > 0 && (
                    <div className="ms-suggestions-dropdown">
                      {recipeSuggestions.map(
                        recipe => (
                          <div
                            key={recipe._id}
                            onClick={() => {
                              setManualRecipeName(
                                recipe.title
                              );

                              setSelectedMealRecipe(
                                recipe._id
                              );

                              setShowRecipeSuggestions(
                                false
                              );
                            }}
                          >
                            {recipe.title}
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>

              <div className="ms-form-group">
                <label>
                  Number of People
                </label>

                <input
                  type="number"
                  value={selectedMealMembers}
                  onChange={e =>
                    setSelectedMealMembers(
                      parseInt(e.target.value)
                    )
                  }
                  min="1"
                />
              </div>
            </div>

            <div className="ms-popup-footer">
              <button
                onClick={() =>
                  setShowAddMealForm(false)
                }
              >
                <FaTimes />
                Cancel
              </button>

              <button onClick={handleSaveMeal}>
                <FaCheck />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealSuggestion;