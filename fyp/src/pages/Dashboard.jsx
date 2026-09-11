import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import adminApi from '../api/adminApi';
import { showToast } from '../components/Toast';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import './Dashboard.css';

const Dashboard = () => {
  const { user, loading: authLoading, login, logout } = useAuth();

  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || '';
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';

  const [loginEmail, setLoginEmail] = useState(ADMIN_EMAIL);
  const [loginPassword, setLoginPassword] = useState(ADMIN_PASSWORD);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [pantryItems, setPantryItems] = useState([]);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [recipeCollection, setRecipeCollection] = useState([]);
  const [mealSuggestions, setMealSuggestions] = useState([]);
  const [mealPlans, setMealPlans] = useState([]);
  const [shoppingLists, setShoppingLists] = useState([]);
  const [beginnersGuide, setBeginnersGuide] = useState([]);
  const [selectedBeginnersCategory, setSelectedBeginnersCategory] = useState('All');
  const [selectedRecipeCategory, setSelectedRecipeCategory] = useState('All');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmUser, setConfirmUser] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [recipeModalAction, setRecipeModalAction] = useState(null);
  const [recipeModalData, setRecipeModalData] = useState(null);
  const [recipeModalMessage, setRecipeModalMessage] = useState('');
  const [editRecipeName, setEditRecipeName] = useState('');
  const [showPantryDeleteModal, setShowPantryDeleteModal] = useState(false);
  const [pantryItemToDelete, setPantryItemToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [editModalType, setEditModalType] = useState('');
  const [editModalFields, setEditModalFields] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState(null);
  const [deleteModalType, setDeleteModalType] = useState('');
  const [deleteModalMessage, setDeleteModalMessage] = useState('');
  const [serverStatus, setServerStatus] = useState('Checking...');
  const [databaseStatus, setDatabaseStatus] = useState('Checking...');

  const [authPage, setAuthPage] = useState('login');
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');

  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    totalRecipes: 0,
    totalMealPlans: 0,
    totalPantryItems: 0,
    totalShoppingItems: 0,
    totalSuggestions: 0,
    totalGuidance: 0,
    totalShoppingLists: 0
  });

  const isAdmin = user?.role === 'admin';

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError('');
    setLoginLoading(true);

    const result = await login(loginEmail, loginPassword);

    if (!result.success) {
      setLoginError(result.error || 'Login failed');
      setLoginLoading(false);
      return;
    }

    if (result.user?.role !== 'admin') {
      logout();
      setLoginError('Admin access is required.');
      setLoginLoading(false);
      return;
    }

    setLoginEmail('');
    setLoginPassword('');
    setLoginLoading(false);
  };

  const goToForgotPassword = () => {
    setAuthPage('forgot');
    setLoginError('');
  };

  const goToResetPassword = (email, token) => {
    setResetEmail(email);
    setResetToken(token);
    setAuthPage('reset');
  };

  const goToLogin = () => {
    setAuthPage('login');
    setResetEmail('');
    setResetToken('');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      setUsers([]);
      setPantryItems([]);
      setShoppingItems([]);
      setRecipeCollection([]);
      setMealSuggestions([]);
      setMealPlans([]);
      setShoppingLists([]);
      setBeginnersGuide([]);
      setActiveSection('dashboard');
      setAuthPage('login');
      setLoginEmail(ADMIN_EMAIL);
      setLoginPassword(ADMIN_PASSWORD);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const checkSystemHealth = async () => {
    try {
      const serverRes = await fetch('http://localhost:5000/api/health');

      setServerStatus(serverRes.ok ? 'Online' : 'Offline');
    } catch {
      setServerStatus('Offline');
    }

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setDatabaseStatus('Disconnected');
        return;
      }

      const dbRes = await fetch(
        'http://localhost:5000/api/admin/dashboard/stats',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setDatabaseStatus(dbRes.ok ? 'Connected' : 'Disconnected');
    } catch {
      setDatabaseStatus('Disconnected');
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      const usersRes = await adminApi.getUsers();

      if (usersRes?.success) {
        const userData = Array.isArray(usersRes.data)
          ? usersRes.data
          : Array.isArray(usersRes.data?.data)
            ? usersRes.data.data
            : [];

        setUsers(userData);

        setSystemStats(prev => ({
          ...prev,
          totalUsers: userData.length
        }));
      } else {
        setUsers([]);
      }

      const mealPlansRes = await adminApi.getMealPlans();

      if (mealPlansRes?.success && Array.isArray(mealPlansRes.data)) {
        setMealPlans(mealPlansRes.data);

        setSystemStats(prev => ({
          ...prev,
          totalMealPlans: mealPlansRes.data.length
        }));
      } else {
        setMealPlans([]);
      }

      const [
        statsRes,
        collectionRes,
        pantryRes,
        shoppingRes,
        suggestionsRes,
        beginnersRes,
        shoppingListsRes
      ] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getRecipeCollection(),
        adminApi.getPantryItems(),
        adminApi.getShoppingItems(),
        adminApi.getMealSuggestions(),
        adminApi.getBeginnersGuide(),
        adminApi.getShoppingLists()
      ]);

      const suggestionsData = suggestionsRes?.success
        ? Array.isArray(suggestionsRes.data)
          ? suggestionsRes.data
          : Array.isArray(suggestionsRes.data?.data)
            ? suggestionsRes.data.data
            : []
        : [];

      setMealSuggestions(suggestionsData);

      setSystemStats(prev => ({
        ...prev,
        totalSuggestions: suggestionsData.length
      }));

      const pantryData = pantryRes?.success && Array.isArray(pantryRes.data)
        ? pantryRes.data
        : [];

      setPantryItems(pantryData);

      setSystemStats(prev => ({
        ...prev,
        totalPantryItems: pantryData.length
      }));

      if (statsRes?.success && statsRes.data) {
        setSystemStats(prev => ({
          ...prev,
          ...statsRes.data
        }));
      }

      const recipesData = collectionRes?.success && Array.isArray(collectionRes.data)
        ? collectionRes.data
        : [];

      setRecipeCollection(recipesData);

      setSystemStats(prev => ({
        ...prev,
        totalRecipes: recipesData.length
      }));

      const shoppingData = shoppingRes?.success && Array.isArray(shoppingRes.data)
        ? shoppingRes.data
        : [];

      setShoppingItems(shoppingData);

      const shoppingListsData =
        shoppingListsRes?.success && Array.isArray(shoppingListsRes.data)
          ? shoppingListsRes.data
          : [];

      setShoppingLists(shoppingListsData);

      setSystemStats(prev => ({
        ...prev,
        totalShoppingLists: shoppingListsData.length
      }));

      const beginnersData =
        beginnersRes?.success && Array.isArray(beginnersRes.data)
          ? beginnersRes.data
          : [];

      setBeginnersGuide(beginnersData);

      setSystemStats(prev => ({
        ...prev,
        totalGuidance: beginnersData.length
      }));

      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      setLoading(false);
      return;
    }

    if (!isAdmin) {
      setLoading(false);
      setError('Admin access is required.');
      return;
    }

    fetchDashboardData();
    checkSystemHealth();
  }, [authLoading, user, isAdmin]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    const interval = setInterval(() => {
      checkSystemHealth();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAdmin]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const openConfirmModal = (action, userData, message) => {
    setConfirmAction(action);
    setConfirmUser(userData);
    setConfirmMessage(message);
    setShowConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
    setConfirmUser(null);
    setConfirmMessage('');
  };

  const handleConfirmAction = async () => {
    if (!confirmAction || !confirmUser) {
      return;
    }

    try {
      let response;

      if (confirmAction === 'block') {
        response = await adminApi.blockUser(confirmUser._id);
      }

      if (confirmAction === 'unblock') {
        response = await adminApi.unblockUser(confirmUser._id);
      }

      if (confirmAction === 'delete') {
        response = await adminApi.deleteUser(confirmUser._id);
      }

      if (!response?.success) {
        alert(`Failed to ${confirmAction} user`);
        return;
      }

      await fetchDashboardData();
      closeConfirmModal();
    } catch {
      alert(`Failed to ${confirmAction} user`);
      closeConfirmModal();
    }
  };

  const openPantryDeleteModal = (item) => {
    setPantryItemToDelete(item);
    setShowPantryDeleteModal(true);
  };

  const closePantryDeleteModal = () => {
    setShowPantryDeleteModal(false);
    setPantryItemToDelete(null);
  };

  const handlePantryDeleteConfirm = async () => {
    if (!pantryItemToDelete) {
      return;
    }

    try {
      const response = await adminApi.deletePantryItem(
        pantryItemToDelete._id
      );

      if (response.success) {
        alert(`Pantry item "${pantryItemToDelete.name}" deleted successfully`);
        await fetchDashboardData();
        closePantryDeleteModal();
      } else {
        alert('Failed to delete pantry item');
      }
    } catch {
      alert('Error deleting pantry item');
      closePantryDeleteModal();
    }
  };

  const openRecipeModal = (action, recipe, message) => {
    setRecipeModalAction(action);
    setRecipeModalData(recipe);
    setRecipeModalMessage(message);
    setEditRecipeName(recipe?.recipeName || '');
    setShowRecipeModal(true);
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
    setRecipeModalAction(null);
    setRecipeModalData(null);
    setRecipeModalMessage('');
    setEditRecipeName('');
  };

  const handleRecipeConfirm = async () => {
    if (!recipeModalAction || !recipeModalData) {
      return;
    }

    try {
      if (recipeModalAction === 'edit') {
        const response = await adminApi.updateRecipeCollection(
          recipeModalData._id,
          {
            recipeName: editRecipeName,
            title: editRecipeName
          }
        );

        if (response.success) {
          alert(`Recipe updated to "${editRecipeName}"`);
          await fetchDashboardData();
          closeRecipeModal();
        } else {
          alert('Failed to update recipe');
        }
      }

      if (recipeModalAction === 'delete') {
        const response = await adminApi.deleteFromRecipeCollection(
          recipeModalData._id
        );

        if (response.success) {
          alert(`Recipe "${recipeModalData.recipeName}" removed`);
          await fetchDashboardData();
          closeRecipeModal();
        } else {
          alert('Failed to remove recipe');
        }
      }
    } catch {
      alert(`Error ${recipeModalAction}ing recipe`);
      closeRecipeModal();
    }
  };

  const openEditModal = (type, data, fields) => {
    setEditModalType(type);
    setEditModalData(data);
    setEditModalFields(fields || {});
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditModalData(null);
    setEditModalType('');
    setEditModalFields({});
  };

  const handleEditConfirm = async () => {
    if (!editModalData || !editModalType) {
      return;
    }

    try {
      let response;
      const id = editModalData._id;

      switch (editModalType) {
        case 'beginnersGuide':
          response = await adminApi.updateBeginnersGuide(
            id,
            editModalFields
          );
          break;

        case 'recipe':
          response = await adminApi.updateRecipeCollection(
            id,
            editModalFields
          );
          break;

        case 'user':
          response = await adminApi.updateUser(
            id,
            editModalFields
          );
          break;

        default:
          return;
      }

      if (response?.success) {
        alert(`${editModalType} updated successfully`);
        await fetchDashboardData();
        closeEditModal();
      } else {
        alert(`Failed to update ${editModalType}`);
      }
    } catch {
      alert(`Error updating ${editModalType}`);
      closeEditModal();
    }
  };

  const openDeleteModal = (type, data, message) => {
    setDeleteModalType(type);
    setDeleteModalData(data);
    setDeleteModalMessage(
      message || `Are you sure you want to delete this ${type}?`
    );
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteModalData(null);
    setDeleteModalType('');
    setDeleteModalMessage('');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModalData || !deleteModalType) {
      return;
    }

    try {
      let response;
      const id = deleteModalData._id;

      switch (deleteModalType) {
        case 'shoppingList':
          response = await adminApi.deleteShoppingList(id);
          break;

        case 'beginnersGuide':
          response = await adminApi.deleteBeginnersGuide(id);
          break;

        case 'mealPlan':
          response = await adminApi.deleteMealPlan(id);
          break;

        case 'recipe':
          response = await adminApi.deleteFromRecipeCollection(id);
          break;

        case 'suggestion':
          response = await adminApi.deleteMealSuggestion(id);
          break;

        case 'pantry':
          response = await adminApi.deletePantryItem(id);
          break;

        case 'user':
          response = await adminApi.deleteUser(id);
          break;

        default:
          return;
      }

      if (response?.success) {
        alert(`${deleteModalType} deleted successfully`);
        await fetchDashboardData();
        closeDeleteModal();
      } else {
        alert(`Failed to delete ${deleteModalType}`);
      }
    } catch {
      alert(`Error deleting ${deleteModalType}`);
      closeDeleteModal();
    }
  };

  const handleBlockUser = (userData) => {
    openConfirmModal(
      'block',
      userData,
      `Are you sure you want to block ${userData.name}?`
    );
  };

  const handleUnblockUser = (userData) => {
    openConfirmModal(
      'unblock',
      userData,
      `Are you sure you want to unblock ${userData.name}?`
    );
  };

  const handleDeleteUser = (userData) => {
    openDeleteModal(
      'user',
      userData,
      `Are you sure you want to delete user "${userData.name}"?`
    );
  };

  const handleDeleteSuggestion = (suggestion) => {
    const name =
      suggestion.recipeName ||
      suggestion.mealName ||
      suggestion.title ||
      'Unnamed Meal';

    openDeleteModal(
      'suggestion',
      suggestion,
      `Are you sure you want to delete suggestion "${name}"?`
    );
  };

  const handleDeleteFromCollection = (recipe) => {
    openDeleteModal(
      'recipe',
      recipe,
      `Are you sure you want to delete recipe "${recipe.recipeName}"?`
    );
  };

  const handleEditRecipe = (recipe) => {
    openEditModal('recipe', recipe, {
      recipeName: recipe.recipeName
    });
  };

  const handleAddBeginnersGuide = async () => {
    const title = prompt('Enter item name:');
    const category = prompt('Enter category:');
    const description = prompt('Enter description:');

    if (!title) {
      return;
    }

    try {
      const response = await adminApi.addBeginnersGuide({
        title,
        category,
        description
      });

      if (response.success) {
        await fetchDashboardData();
      } else {
        alert('Failed to add item');
      }
    } catch {
      alert('Error adding item');
    }
  };

  const handleEditBeginnersGuide = (guide) => {
    openEditModal('beginnersGuide', guide, {
      title: guide.title || '',
      category: guide.category || '',
      description: guide.description || ''
    });
  };

  const handleDeleteBeginnersGuide = (guide) => {
    openDeleteModal(
      'beginnersGuide',
      guide,
      `Are you sure you want to delete "${guide.title}"?`
    );
  };

  const handleDeleteMealPlan = (plan) => {
    openDeleteModal(
      'mealPlan',
      plan,
      `Are you sure you want to delete meal plan for "${plan.userName}"?`
    );
  };

  const handleDeleteShoppingList = (list) => {
    openDeleteModal(
      'shoppingList',
      list,
      `Are you sure you want to delete shopping list "${list.name}"?`
    );
  };

  const getRecipeCategories = () => {
    const categories = [];

    recipeCollection.forEach(recipe => {
      if (Array.isArray(recipe.category)) {
        recipe.category.forEach(category => {
          if (category && !categories.includes(category)) {
            categories.push(category);
          }
        });
      } else if (
        recipe.category &&
        typeof recipe.category === 'string' &&
        !categories.includes(recipe.category)
      ) {
        categories.push(recipe.category);
      }
    });

    return ['All', ...categories];
  };

  const getFilteredRecipes = () => {
    if (selectedRecipeCategory === 'All') {
      return recipeCollection;
    }

    return recipeCollection.filter(recipe => {
      if (Array.isArray(recipe.category)) {
        return recipe.category.includes(selectedRecipeCategory);
      }

      return recipe.category === selectedRecipeCategory;
    });
  };

  const getBeginnersCategories = () => {
    const categories = beginnersGuide
      .map(item => item.category)
      .filter(Boolean);

    return ['All', ...new Set(categories)];
  };

  const getFilteredBeginnersGuide = () => {
    if (selectedBeginnersCategory === 'All') {
      return beginnersGuide;
    }

    return beginnersGuide.filter(
      item => item.category === selectedBeginnersCategory
    );
  };

  if (authLoading) {
    return (
      <div className="dashboard-loading">
        <h2>Checking authentication...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user && authPage === 'forgot') {
    return (
      <ForgotPasswordPage
        onBack={goToLogin}
        onOTPVerified={goToResetPassword}
      />
    );
  }

  if (!user && authPage === 'reset') {
    return (
      <ResetPasswordPage
        email={resetEmail}
        resetToken={resetToken}
        onBack={goToLogin}
        onSuccess={goToLogin}
      />
    );
  }

  if (!user) {
    return (
      <div className="dashboard-login-wrapper">
        <div className="dashboard-login-container">
          <div className="dashboard-login-left">
            <div className="dashboard-login-logo">
              <div className="dashboard-login-logo-circle">
                <span>CB</span>
              </div>
              <h1>ChefBot</h1>
              <p>Admin Dashboard</p>
            </div>

            <div className="dashboard-login-features">
              <ul>
                <li>Manage user accounts</li>
                <li>Oversee recipes and meal plans</li>
                <li>Monitor pantry and shopping lists</li>
                <li>Full platform administration</li>
              </ul>
            </div>
          </div>

          <div className="dashboard-login-right">
            <div className="dashboard-login-header">
              <h2>Admin Login</h2>
              <p>Enter your credentials to access the dashboard</p>
            </div>

            {loginError && (
              <div className="dashboard-login-error">
                {loginError}
              </div>
            )}

            <form
              className="dashboard-login-form"
              onSubmit={handleLogin}
            >
              <div className="dashboard-login-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                />
              </div>

              <div className="dashboard-login-group">
                <label>Password</label>

                <div className="dashboard-login-password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="dashboard-login-password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="dashboard-login-forgot">
                <button
                  type="button"
                  className="dashboard-login-forgot-link"
                  onClick={goToForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="dashboard-login-btn"
                disabled={loginLoading}
              >
                {loginLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="dashboard-error">
        <h2>Access Denied</h2>
        <p>Admin access is required to use this dashboard.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading Dashboard...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchDashboardData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="chefbot-dashboard">
      {showConfirmModal && confirmUser && (
        <div className="modal-overlay" onClick={closeConfirmModal}>
          <div
            className="modal-container"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-icon">
              {confirmAction === 'delete'
                ? 'Delete'
                : confirmAction === 'block'
                  ? 'Block'
                  : 'Unblock'}
            </div>

            <h3 className="modal-title">
              {confirmAction === 'delete'
                ? 'Delete User'
                : confirmAction === 'block'
                  ? 'Block User'
                  : 'Unblock User'}
            </h3>

            <p className="modal-message">
              {confirmMessage}
            </p>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={closeConfirmModal}
              >
                Cancel
              </button>

              <button
                className={`modal-confirm ${
                  confirmAction === 'delete'
                    ? 'confirm-delete'
                    : confirmAction === 'block'
                      ? 'confirm-block'
                      : 'confirm-unblock'
                }`}
                onClick={handleConfirmAction}
              >
                {confirmAction === 'delete'
                  ? 'Delete'
                  : confirmAction === 'block'
                    ? 'Block'
                    : 'Unblock'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPantryDeleteModal && pantryItemToDelete && (
        <div
          className="modal-overlay"
          onClick={closePantryDeleteModal}
        >
          <div
            className="modal-container"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-icon">Delete</div>

            <h3 className="modal-title">
              Delete Pantry Item
            </h3>

            <p className="modal-message">
              Are you sure you want to delete{' '}
              <strong>{pantryItemToDelete.name}</strong>?
            </p>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={closePantryDeleteModal}
              >
                Cancel
              </button>

              <button
                className="modal-confirm confirm-delete"
                onClick={handlePantryDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showRecipeModal && recipeModalData && (
        <div
          className="modal-overlay"
          onClick={closeRecipeModal}
        >
          <div
            className="modal-container"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-icon">
              {recipeModalAction === 'delete' ? 'Delete' : 'Edit'}
            </div>

            <h3 className="modal-title">
              {recipeModalAction === 'delete'
                ? 'Delete Recipe'
                : 'Edit Recipe'}
            </h3>

            <p className="modal-message">
              {recipeModalMessage}
            </p>

            {recipeModalAction === 'edit' && (
              <div className="modal-input-group">
                <label className="modal-label">
                  Recipe Name
                </label>

                <input
                  type="text"
                  className="modal-input"
                  value={editRecipeName}
                  onChange={e =>
                    setEditRecipeName(e.target.value)
                  }
                  placeholder="Enter recipe name"
                />
              </div>
            )}

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={closeRecipeModal}
              >
                Cancel
              </button>

              <button
                className={`modal-confirm ${
                  recipeModalAction === 'delete'
                    ? 'confirm-delete'
                    : 'confirm-edit'
                }`}
                onClick={handleRecipeConfirm}
              >
                {recipeModalAction === 'delete'
                  ? 'Delete'
                  : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editModalData && (
        <div
          className="modal-overlay"
          onClick={closeEditModal}
        >
          <div
            className="modal-container"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-icon">Edit</div>

            <h3 className="modal-title">
              Edit {editModalType}
            </h3>

            <p className="modal-message">
              Update the details below
            </p>

            <div className="modal-input-group">
              {Object.keys(editModalFields).map(key => (
                <div
                  key={key}
                  style={{ marginBottom: '12px' }}
                >
                  <label className="modal-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>

                  <input
                    type="text"
                    className="modal-input"
                    value={editModalFields[key] || ''}
                    onChange={e =>
                      setEditModalFields({
                        ...editModalFields,
                        [key]: e.target.value
                      })
                    }
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={closeEditModal}
              >
                Cancel
              </button>

              <button
                className="modal-confirm confirm-edit"
                onClick={handleEditConfirm}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && deleteModalData && (
        <div
          className="modal-overlay"
          onClick={closeDeleteModal}
        >
          <div
            className="modal-container"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-icon">Delete</div>

            <h3 className="modal-title">
              {deleteModalType}
            </h3>

            <p className="modal-message">
              {deleteModalMessage}
            </p>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                className="modal-confirm confirm-delete"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`sidebar-overlay ${
          sidebarOpen ? 'open' : ''
        }`}
        onClick={closeSidebar}
      />

      <aside
        className={`sidebar ${
          sidebarOpen ? 'open' : ''
        }`}
      >
        <div className="logo-area">
          <h2>ChefBot</h2>
          <span className="admin-badge">Admin</span>
        </div>

        <nav className="nav-menu">
          <button
            className={
              activeSection === 'dashboard'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActiveSection('dashboard');
              closeSidebar();
            }}
          >
            Overview
          </button>

          <button
            className={
              activeSection === 'users'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActiveSection('users');
              closeSidebar();
            }}
          >
            Users
          </button>

          <button
            className={
              activeSection === 'pantry'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActiveSection('pantry');
              closeSidebar();
            }}
          >
            Pantry
          </button>

          <button
            className={
              activeSection === 'suggestions'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActiveSection('suggestions');
              closeSidebar();
            }}
          >
            Meal Suggestions
          </button>

          <button
            className={
              activeSection === 'collection'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActiveSection('collection');
              closeSidebar();
            }}
          >
            Recipes
          </button>

          <button
            className={
              activeSection === 'mealplans'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActiveSection('mealplans');
              closeSidebar();
            }}
          >
            Meal Plans
          </button>

          <button
            className={
              activeSection === 'shoppinglists'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActiveSection('shoppinglists');
              closeSidebar();
            }}
          >
            Shopping Lists
          </button>

          <button
            className={
              activeSection === 'beginners'
                ? 'active'
                : ''
            }
            onClick={() => {
              setActiveSection('beginners');
              closeSidebar();
            }}
          >
            Beginners Guide
          </button>
        </nav>

        <div className="sidebar-logout">
          <button
            className="logout-sidebar-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        {activeSection === 'dashboard' && (
          <div className="section overview-section">
            <div className="date-time-header">
              <div className="current-date">
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              <div className="current-time">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>

            <div className="welcome-banner-simple">
              <div className="welcome-text-simple">
                <h2>Welcome back, Admin</h2>
                <p>
                  Here's what's happening with your ChefBot
                  platform today.
                </p>
              </div>
            </div>

            <div className="overview-stats-grid">
              <div
                className="overview-stat-card"
                onClick={() => setActiveSection('users')}
              >
                <div className="overview-stat-info">
                  <h3>{systemStats.totalUsers || 0}</h3>
                  <p>Total Users</p>
                </div>
              </div>

              <div
                className="overview-stat-card"
                onClick={() =>
                  setActiveSection('collection')
                }
              >
                <div className="overview-stat-info">
                  <h3>{systemStats.totalRecipes || 0}</h3>
                  <p>Total Recipes</p>
                </div>
              </div>

              <div
                className="overview-stat-card"
                onClick={() =>
                  setActiveSection('suggestions')
                }
              >
                <div className="overview-stat-info">
                  <h3>
                    {systemStats.totalSuggestions || 0}
                  </h3>
                  <p>Meal Suggestions</p>
                </div>
              </div>

              <div
                className="overview-stat-card"
                onClick={() =>
                  setActiveSection('mealplans')
                }
              >
                <div className="overview-stat-info">
                  <h3>
                    {systemStats.totalMealPlans || 0}
                  </h3>
                  <p>Meal Plans</p>
                </div>
              </div>

              <div
                className="overview-stat-card"
                onClick={() =>
                  setActiveSection('pantry')
                }
              >
                <div className="overview-stat-info">
                  <h3>
                    {systemStats.totalPantryItems || 0}
                  </h3>
                  <p>Pantry Items</p>
                </div>
              </div>

              <div
                className="overview-stat-card"
                onClick={() =>
                  setActiveSection('shoppinglists')
                }
              >
                <div className="overview-stat-info">
                  <h3>
                    {systemStats.totalShoppingLists || 0}
                  </h3>
                  <p>Shopping Lists</p>
                </div>
              </div>

              <div
                className="overview-stat-card"
                onClick={() =>
                  setActiveSection('beginners')
                }
              >
                <div className="overview-stat-info">
                  <h3>{beginnersGuide.length}</h3>
                  <p>Beginners Guide</p>
                </div>
              </div>
            </div>

            <div className="system-health">
              <h3>System Health</h3>

              <div className="health-stats">
                <div className="health-item">
                  <div>Server Status</div>

                  <div
                    className={
                      serverStatus === 'Online'
                        ? 'online'
                        : 'offline'
                    }
                  >
                    {serverStatus === 'Checking...'
                      ? 'Checking...'
                      : serverStatus === 'Online'
                        ? 'Online'
                        : 'Offline'}
                  </div>
                </div>

                <div className="health-item">
                  <div>Database Status</div>

                  <div
                    className={
                      databaseStatus === 'Connected'
                        ? 'online'
                        : 'offline'
                    }
                  >
                    {databaseStatus === 'Checking...'
                      ? 'Checking...'
                      : databaseStatus === 'Connected'
                        ? 'Connected'
                        : 'Disconnected'}
                  </div>

                  {databaseStatus === 'Disconnected' && (
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#ef4444',
                        marginTop: '4px'
                      }}
                    >
                      Check MongoDB connection
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'users' && (
          <div className="section users-section">
            <div className="section-header">
              <h2>Manage User Accounts</h2>
              <span className="total-count">
                {users.length} users
              </span>
            </div>

            {!Array.isArray(users) || users.length === 0 ? (
              <div className="empty-state">
                <p>No users registered yet</p>
                <p className="empty-sub">
                  Users will appear here once they register
                </p>
              </div>
            ) : (
              <div className="users-grid">
                {users.map(userData => (
                  <div
                    key={userData._id}
                    className="user-square-card"
                  >
                    <div className="user-square-avatar">
                      {userData.name?.charAt(0).toUpperCase() ||
                        'U'}
                    </div>

                    <div className="user-square-name">
                      {userData.name}
                    </div>

                    <div className="user-square-email">
                      {userData.email}
                    </div>

                    <div className="user-square-actions">
                      {userData.isBlocked ? (
                        <button
                          className="unblock-btn"
                          onClick={() =>
                            handleUnblockUser(userData)
                          }
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="block-btn"
                          onClick={() =>
                            handleBlockUser(userData)
                          }
                        >
                          Block
                        </button>
                      )}

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteUser(userData)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'pantry' && (
          <div className="section pantry-section">
            <div className="section-header">
              <h2>User Pantry Items</h2>

              <div className="header-actions">
                <span className="total-count">
                  {pantryItems.length} items
                </span>

                <button
                  className="refresh-btn"
                  onClick={fetchDashboardData}
                  title="Refresh pantry data"
                >
                  Refresh
                </button>
              </div>
            </div>

            {pantryItems.length === 0 ? (
              <div className="empty-state">
                <p>No pantry items added by users yet</p>
                <p className="empty-sub">
                  Ask users to add items to their pantry
                </p>
              </div>
            ) : (
              Object.values(
                pantryItems.reduce((acc, item) => {
                  const key = item.userId || 'unknown';

                  if (!acc[key]) {
                    acc[key] = {
                      userId: key,
                      userName:
                        item.userName || 'Unknown User',
                      userEmail: item.userEmail || '',
                      items: []
                    };
                  }

                  acc[key].items.push(item);

                  return acc;
                }, {})
              ).map(userGroup => (
                <div
                  key={userGroup.userId}
                  className="user-pantry-group"
                >
                  <div className="user-pantry-header">
                    <div className="user-info">
                      <span
                        className="suggestion-user-info"
                        style={{ marginBottom: '0' }}
                      >
                        <span className="user-email-only">
                          {userGroup.userEmail ||
                            'No Email'}
                        </span>
                      </span>
                    </div>

                    <div className="user-stats">
                      <span className="item-count-badge">
                        {userGroup.items.length} items
                      </span>
                    </div>
                  </div>

                  <div className="pantry-items-grid">
                    {userGroup.items.map(item => (
                      <div
                        key={item._id}
                        className="pantry-item-card"
                      >
                        <div className="pantry-item-header">
                          <span className="pantry-item-name">
                            {item.name}
                          </span>

                          {item.isLowStock && (
                            <span className="low-stock-badge">
                              Low Stock
                            </span>
                          )}
                        </div>

                        <div className="pantry-item-details">
                          <p>
                            <span className="detail-label">
                              Quantity:
                            </span>

                            <span className="detail-value">
                              {item.quantity}{' '}
                              {item.unit || 'units'}
                            </span>
                          </p>

                          <p>
                            <span className="detail-label">
                              Category:
                            </span>

                            <span className="detail-value">
                              {item.category || 'General'}
                            </span>
                          </p>

                          <p className="pantry-item-added">
                            Added:{' '}
                            {item.createdAt
                              ? new Date(
                                  item.createdAt
                                ).toLocaleDateString()
                              : 'N/A'}
                          </p>
                        </div>

                        <div className="pantry-item-actions">
                          <button
                            className="delete-btn"
                            onClick={() =>
                              openPantryDeleteModal(item)
                            }
                          >
                            Delete Item
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeSection === 'suggestions' && (
          <div className="section suggestions-section">
            <div className="section-header">
              <h2>Meal Suggestions</h2>

              <div className="header-actions">
                <span className="total-count">
                  {mealSuggestions.length} suggestions
                </span>
              </div>
            </div>

            <div className="items-grid">
              {!Array.isArray(mealSuggestions) ||
              mealSuggestions.length === 0 ? (
                <div className="empty-state">
                  <p>No meal suggestions found</p>
                  <p className="empty-sub">
                    No suggestions available at the moment
                  </p>
                </div>
              ) : (
                mealSuggestions.map(suggestion => {
                  const recipeName =
                    suggestion.recipeName ||
                    suggestion.mealName ||
                    suggestion.title ||
                    'Unnamed Meal';

                  const userEmail =
                    suggestion.userEmail ||
                    suggestion.user?.email ||
                    '';

                  return (
                    <div
                      key={suggestion._id}
                      className="item-card"
                    >
                      <div className="suggestion-recipe-header">
                        <span className="recipe-name">
                          {recipeName}
                        </span>
                      </div>

                      <div className="suggestion-user-info">
                        <span className="user-email-only">
                          {userEmail || 'No Email'}
                        </span>
                      </div>

                      <div className="item-details">
                        {suggestion.members > 0 && (
                          <p>
                            <strong>Members:</strong>{' '}
                            {suggestion.members}
                          </p>
                        )}
                      </div>

                      <div className="card-actions">
                        <button
                          className="delete-btn remove-only-btn"
                          onClick={() =>
                            handleDeleteSuggestion(
                              suggestion
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {activeSection === 'collection' && (
          <div className="section collection-section">
            <div className="section-header">
              <h2>Recipe Collection</h2>

              <span className="total-count">
                {recipeCollection.length} recipes
              </span>
            </div>

            <div className="recipe-category-filters">
              {getRecipeCategories().map(category => (
                <button
                  key={category}
                  className={`filter-btn ${
                    selectedRecipeCategory === category
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setSelectedRecipeCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="recipe-count">
              Showing {getFilteredRecipes().length} of{' '}
              {recipeCollection.length} recipes
            </div>

            <div className="items-grid">
              {getFilteredRecipes().length === 0 ? (
                <div className="empty-state">
                  <p>No recipes found</p>

                  <p className="empty-sub">
                    {recipeCollection.length === 0
                      ? 'No recipes in collection yet'
                      : 'Try selecting a different category'}
                  </p>
                </div>
              ) : (
                getFilteredRecipes().map(recipe => (
                  <div
                    key={recipe._id}
                    className="item-card"
                  >
                    <div className="item-header">
                      <h3>{recipe.recipeName}</h3>

                      {recipe.views > 50 && (
                        <span className="popular-badge">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="item-details">
                      <p className="item-category">
                        {Array.isArray(recipe.category)
                          ? recipe.category.join(', ')
                          : recipe.category || 'General'}
                      </p>
                    </div>

                    <div className="card-actions">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEditRecipe(recipe)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteFromCollection(recipe)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeSection === 'mealplans' && (
          <div className="section mealplans-section">
            <div className="section-header">
              <h2>Meal Plans</h2>

              <span className="total-count">
                {mealPlans.length} plans
              </span>
            </div>

            {!Array.isArray(mealPlans) ||
            mealPlans.length === 0 ? (
              <div className="empty-state">
                <p>No meal plans created yet</p>
                <p className="empty-sub">
                  Meal plans will appear here once created
                </p>
              </div>
            ) : (
              <div className="mealplans-grid">
                {mealPlans.map(plan => {
                  let userEmail = 'No Email';

                  if (plan.userId) {
                    const foundUser = users.find(
                      item => item._id === plan.userId
                    );

                    if (foundUser) {
                      userEmail =
                        foundUser.email || 'No Email';
                    }
                  }

                  if (
                    userEmail === 'No Email' &&
                    plan.userEmail
                  ) {
                    userEmail = plan.userEmail;
                  }

                  let mealsArray = plan.meals || [];

                  mealsArray = mealsArray.filter(meal => {
                    if (typeof meal !== 'string') {
                      return Boolean(meal);
                    }

                    const value = meal.trim();

                    return (
                      value !== '' &&
                      value !== 'No meals added' &&
                      value !==
                        'No meals added yet. Click Edit to add meals.'
                    );
                  });

                  const displayDate =
                    plan.date || plan.createdAt;

                  return (
                    <div
                      key={plan._id}
                      className="item-card"
                    >
                      <div
                        className="suggestion-user-info"
                        style={{ marginBottom: '8px' }}
                      >
                        <span className="user-email-only">
                          {userEmail}
                        </span>
                      </div>

                      <div className="item-header">
                        <h3>
                          {plan.planType || 'Daily'}
                        </h3>
                      </div>

                      <div className="item-details">
                        {mealsArray.length > 0 && (
                          <div
                            className="mealplan-meals"
                            style={{ marginTop: '6px' }}
                          >
                            <strong>Meals:</strong>

                            {mealsArray.map(
                              (meal, index) => (
                                <div
                                  key={index}
                                  className="mealplan-meal-item"
                                >
                                  {meal}
                                </div>
                              )
                            )}
                          </div>
                        )}

                        <p className="item-date">
                          {displayDate
                            ? new Date(
                                displayDate
                              ).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>

                      <div className="card-actions">
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteMealPlan(plan)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeSection === 'shoppinglists' && (
          <div className="section shoppinglists-section">
            <div className="section-header">
              <h2>Shopping Lists</h2>

              <span className="total-count">
                {shoppingLists.length} lists
              </span>
            </div>

            <div className="items-grid">
              {!shoppingLists ||
              shoppingLists.length === 0 ? (
                <div className="empty-state">
                  <p>No shopping lists found</p>
                  <p className="empty-sub">
                    No shopping lists available
                  </p>
                </div>
              ) : (
                shoppingLists.map(list => {
                  const foundUser = users.find(
                    item => item._id === list.userId
                  );

                  let displayEmail = 'No Email';

                  if (foundUser) {
                    displayEmail =
                      foundUser.email || 'No Email';
                  } else if (list.userEmail) {
                    displayEmail = list.userEmail;
                  }

                  return (
                    <div
                      key={list._id}
                      className="item-card"
                    >
                      <div
                        className="suggestion-user-info"
                        style={{ marginBottom: '8px' }}
                      >
                        <span className="user-email-only">
                          {displayEmail}
                        </span>
                      </div>

                      <div className="item-header">
                        <h3>
                          {list.name || 'Unnamed List'}
                        </h3>
                      </div>

                      <div className="item-details">
                        {list.totalItems > 0 && (
                          <p className="item-progress">
                            Progress:{' '}
                            {list.purchasedItems || 0}/
                            {list.totalItems}
                          </p>
                        )}

                        <p className="item-date">
                          {list.createdAt
                            ? new Date(
                                list.createdAt
                              ).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>

                      <div className="card-actions">
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteShoppingList(
                              list
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {activeSection === 'beginners' && (
          <div className="section beginners-section">
            <div className="section-header">
              <h2>Beginners Guide</h2>

              <button
                className="primary-btn"
                onClick={handleAddBeginnersGuide}
              >
                Add Item
              </button>
            </div>

            <div className="beginners-categories-grid">
              {getBeginnersCategories().map(category => (
                <button
                  key={category}
                  className={`beginners-category-btn ${
                    selectedBeginnersCategory === category
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setSelectedBeginnersCategory(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="recipe-count">
              Showing {getFilteredBeginnersGuide().length}{' '}
              of {beginnersGuide.length} items
            </div>

            <div className="items-grid">
              {getFilteredBeginnersGuide().length === 0 ? (
                <div className="empty-state">
                  <p>No items found</p>

                  <p className="empty-sub">
                    {beginnersGuide.length === 0
                      ? 'Click "Add Item" to add your first guide'
                      : 'Try selecting a different category'}
                  </p>
                </div>
              ) : (
                getFilteredBeginnersGuide().map(item => (
                  <div
                    key={item._id}
                    className="item-card"
                  >
                    <div className="item-header">
                      <h3>{item.title || 'Unnamed'}</h3>
                    </div>

                    <div className="item-details">
                      <p className="item-description">
                        {item.description ||
                          'No description'}
                      </p>

                      <p className="item-category">
                        {item.category || 'General'}
                      </p>
                    </div>

                    <div className="card-actions">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEditBeginnersGuide(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteBeginnersGuide(item)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;