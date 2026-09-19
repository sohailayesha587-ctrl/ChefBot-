import axios from 'axios';

const ADMIN_API_URL = '/api/admin';

const getToken = () => {
  return localStorage.getItem('adminToken');
};

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

const getErrorMessage = (error, fallback) => {
  return error.response?.data?.message || error.message || fallback;
};

const adminApi = {
  getDashboardStats: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/dashboard/stats`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to fetch dashboard stats')
      };
    }
  },

  getUsers: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/users`,
        getConfig()
      );

      if (res.data?.success && Array.isArray(res.data.data)) {
        return {
          success: true,
          data: res.data.data
        };
      }

      if (Array.isArray(res.data)) {
        return {
          success: true,
          data: res.data
        };
      }

      return {
        success: true,
        data: []
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch users')
      };
    }
  },

  getUserById: async (id) => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/users/${id}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to fetch user')
      };
    }
  },

  updateUser: async (id, data) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/users/${id}`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to update user')
      };
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await axios.delete(
        `${ADMIN_API_URL}/users/${id}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to delete user')
      };
    }
  },

  blockUser: async (id) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/users/${id}/block`,
        {},
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to block user')
      };
    }
  },

  unblockUser: async (id) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/users/${id}/unblock`,
        {},
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to unblock user')
      };
    }
  },

  getActivities: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/activities`,
        getConfig()
      );

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch activities')
      };
    }
  },

  getPantryItems: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/pantry`,
        getConfig()
      );

      if (res.data?.success && Array.isArray(res.data.data)) {
        return {
          success: true,
          data: res.data.data
        };
      }

      if (Array.isArray(res.data)) {
        return {
          success: true,
          data: res.data
        };
      }

      return {
        success: true,
        data: []
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch pantry items')
      };
    }
  },

  deletePantryItem: async (itemId) => {
    try {
      const res = await axios.delete(
        `${ADMIN_API_URL}/pantry/${itemId}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to delete pantry item')
      };
    }
  },

  updatePantryItem: async (itemId, data) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/pantry/${itemId}`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to update pantry item')
      };
    }
  },

  getShoppingItems: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/shopping`,
        getConfig()
      );

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch shopping items')
      };
    }
  },

  getShoppingLists: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/shoppings`,
        getConfig()
      );

      if (Array.isArray(res.data)) {
        return {
          success: true,
          data: res.data
        };
      }

      if (Array.isArray(res.data?.data)) {
        return {
          success: true,
          data: res.data.data
        };
      }

      if (Array.isArray(res.data?.data?.data)) {
        return {
          success: true,
          data: res.data.data.data
        };
      }

      if (res.data?.data && typeof res.data.data === 'object') {
        for (const key of Object.keys(res.data.data)) {
          if (Array.isArray(res.data.data[key])) {
            return {
              success: true,
              data: res.data.data[key]
            };
          }
        }
      }

      return {
        success: true,
        data: []
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch shopping lists')
      };
    }
  },

  addShoppingList: async (data) => {
    try {
      const res = await axios.post(
        `${ADMIN_API_URL}/shoppings`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to add shopping list')
      };
    }
  },

  updateShoppingList: async (id, data) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/shoppings/${id}`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to update shopping list')
      };
    }
  },

  deleteShoppingList: async (id) => {
    try {
      const res = await axios.delete(
        `${ADMIN_API_URL}/shoppings/${id}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to delete shopping list')
      };
    }
  },

  getMealPlans: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/mealplans`,
        getConfig()
      );

      let mealPlansData = [];

      if (Array.isArray(res.data)) {
        mealPlansData = res.data;
      } else if (Array.isArray(res.data?.data)) {
        mealPlansData = res.data.data;
      } else if (Array.isArray(res.data?.data?.data)) {
        mealPlansData = res.data.data.data;
      }

      const transformedMealPlans = mealPlansData.map((plan) => {
        const userId = plan.userId || plan.user || null;

        let planType = plan.planType || 'Daily';

        if (!plan.planType && plan.preferences?.planDuration) {
          const duration = plan.preferences.planDuration.toLowerCase();

          if (duration === 'daily' || duration === 'day') {
            planType = 'Daily';
          } else if (duration === 'weekly' || duration === 'week') {
            planType = 'Weekly';
          }
        }

        if (!plan.planType && plan.plan?.totalDays) {
          planType = plan.plan.totalDays <= 1
            ? 'Daily'
            : 'Weekly';
        }

        let meals = [];

        if (Array.isArray(plan.meals)) {
          meals = plan.meals;
        } else if (Array.isArray(plan.planData?.meals)) {
          meals = plan.planData.meals;
        } else if (Array.isArray(plan.plan?.meals)) {
          meals = plan.plan.meals;
        }

        if (meals.length === 0) {
          meals = ['No meals added'];
        }

        let status = 'Active';

        if (plan.planData?.isActive === false) {
          status = 'Inactive';
        } else if (plan.planData?.status) {
          status = plan.planData.status;
        }

        if (plan.status) {
          status = plan.status;
        }

        const date =
          plan.date ||
          plan.createdAt ||
          plan.savedAt ||
          new Date().toISOString();

        return {
          _id: plan._id,
          userId,
          userName: plan.userName || null,
          userEmail: plan.userEmail || null,
          planType,
          meals,
          status,
          date,
          endDate: plan.endDate || null,
          createdAt: plan.createdAt || date,
          _original: plan
        };
      });

      return {
        success: true,
        data: transformedMealPlans
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch meal plans')
      };
    }
  },

  createMealPlan: async (data) => {
    try {
      const res = await axios.post(
        `${ADMIN_API_URL}/mealplans`,
        {
          userName: data.userName,
          userEmail: data.userEmail,
          userId: data.userId,
          planType: data.planType,
          meals: data.meals,
          status: data.status,
          startDate: data.startDate
        },
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to create meal plan')
      };
    }
  },

  updateMealPlan: async (id, data) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/mealplans/${id}`,
        {
          userName: data.userName,
          userEmail: data.userEmail,
          userId: data.userId,
          planType: data.planType,
          meals: data.meals,
          status: data.status
        },
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to update meal plan')
      };
    }
  },

  deleteMealPlan: async (id) => {
    try {
      const res = await axios.delete(
        `${ADMIN_API_URL}/mealplans/${id}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to delete meal plan')
      };
    }
  },

  getMealSuggestions: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/meal-suggestions`,
        getConfig()
      );

      if (Array.isArray(res.data)) {
        return {
          success: true,
          data: res.data
        };
      }

      if (Array.isArray(res.data?.data)) {
        return {
          success: true,
          data: res.data.data
        };
      }

      return {
        success: true,
        data: []
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch meal suggestions')
      };
    }
  },

  getMealSuggestionById: async (id) => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/meal-suggestions/${id}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to fetch meal suggestion')
      };
    }
  },

  createMealSuggestion: async (data) => {
    try {
      const res = await axios.post(
        `${ADMIN_API_URL}/meal-suggestions`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to create meal suggestion')
      };
    }
  },

  updateMealSuggestion: async (id, data) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/meal-suggestions/${id}`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to update meal suggestion')
      };
    }
  },

  deleteMealSuggestion: async (id) => {
    try {
      const res = await axios.delete(
        `${ADMIN_API_URL}/meal-suggestions/${id}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to delete meal suggestion')
      };
    }
  },

  getMealSuggestionsByCategory: async (category) => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/meal-suggestions/filter/by-category/${category}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to fetch category suggestions')
      };
    }
  },

  getMealSuggestionsByDiet: async (dietType) => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/meal-suggestions/filter/by-diet/${dietType}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to fetch diet suggestions')
      };
    }
  },

  getMealSuggestionsByUser: async (userId) => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/meal-suggestions/filter/by-user/${userId}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to fetch user suggestions')
      };
    }
  },

  getPersonalizedRecommendations: async (userId) => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/meal-suggestions/recommendations/${userId}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to fetch recommendations')
      };
    }
  },

  getRecipeCollection: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/recipe-collection`,
        getConfig()
      );

      if (Array.isArray(res.data)) {
        return {
          success: true,
          data: res.data
        };
      }

      if (Array.isArray(res.data?.data)) {
        return {
          success: true,
          data: res.data.data
        };
      }

      if (Array.isArray(res.data?.recipes)) {
        return {
          success: true,
          data: res.data.recipes
        };
      }

      if (Array.isArray(res.data?.data?.data)) {
        return {
          success: true,
          data: res.data.data.data
        };
      }

      return {
        success: true,
        data: []
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch recipes')
      };
    }
  },

  addToRecipeCollection: async (data) => {
    try {
      const res = await axios.post(
        `${ADMIN_API_URL}/recipe-collection`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to add recipe')
      };
    }
  },

  updateRecipeCollection: async (id, data) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/recipe-collection/${id}`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to update recipe')
      };
    }
  },

  deleteFromRecipeCollection: async (id) => {
    try {
      const res = await axios.delete(
        `${ADMIN_API_URL}/recipe-collection/${id}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to delete recipe')
      };
    }
  },

  getDailyReports: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/daily-report`,
        getConfig()
      );

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch daily reports')
      };
    }
  },

  getSettings: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/settings`,
        getConfig()
      );

      return {
        success: true,
        data: res.data || {}
      };
    } catch (error) {
      return {
        success: false,
        data: {},
        error: getErrorMessage(error, 'Failed to fetch settings')
      };
    }
  },

  updateSettings: async (data) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/settings`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to update settings')
      };
    }
  },

  verifyOTPAdmin: async (otp) => {
    try {
      const res = await axios.post(`${ADMIN_API_URL}/verify-otp`, { otp }, getConfig());
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, data: null, error: getErrorMessage(error, 'Failed to verify admin OTP') };
    }
  },

  resetPasswordAdmin: async (newPassword) => {
    try {
      const res = await axios.post(`${ADMIN_API_URL}/reset-password`, { newPassword }, getConfig());
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, data: null, error: getErrorMessage(error, 'Failed to reset admin password') };
    }
  },

  forgotPasswordAdmin: async () => {
    try {
      const res = await axios.post(`${ADMIN_API_URL}/forgot-password`, {}, getConfig());
      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, data: null, error: getErrorMessage(error, 'Failed to request admin forgot password') };
    }
  },

  exportData: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/export`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to export data')
      };
    }
  },

  getBeginnersGuide: async () => {
    try {
      const res = await axios.get(
        `${ADMIN_API_URL}/beginners-guide`,
        getConfig()
      );

      if (Array.isArray(res.data)) {
        return {
          success: true,
          data: res.data
        };
      }

      if (Array.isArray(res.data?.data)) {
        return {
          success: true,
          data: res.data.data
        };
      }

      if (Array.isArray(res.data?.data?.data)) {
        return {
          success: true,
          data: res.data.data.data
        };
      }

      if (res.data?.data && typeof res.data.data === 'object') {
        for (const key of Object.keys(res.data.data)) {
          if (Array.isArray(res.data.data[key])) {
            return {
              success: true,
              data: res.data.data[key]
            };
          }
        }
      }

      return {
        success: true,
        data: []
      };
    } catch (error) {
      return {
        success: false,
        data: [],
        error: getErrorMessage(error, 'Failed to fetch beginners guide')
      };
    }
  },

  addBeginnersGuide: async (data) => {
    try {
      const res = await axios.post(
        `${ADMIN_API_URL}/beginners-guide`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to add beginners guide')
      };
    }
  },

  updateBeginnersGuide: async (id, data) => {
    try {
      const res = await axios.put(
        `${ADMIN_API_URL}/beginners-guide/${id}`,
        data,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to update beginners guide')
      };
    }
  },

  deleteBeginnersGuide: async (id) => {
    try {
      const res = await axios.delete(
        `${ADMIN_API_URL}/beginners-guide/${id}`,
        getConfig()
      );

      return {
        success: true,
        data: res.data
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: getErrorMessage(error, 'Failed to delete beginners guide')
      };
    }
  }
};

export default adminApi;