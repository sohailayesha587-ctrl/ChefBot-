const mongoose = require('mongoose');
const User = require('../models/User');
const Activity = require('../models/Activity');
const Pantry = require('../models/Pantry');
const MealPlan = require('../models/MealPlan');
const CookingLog = require('../models/CookingLog');
const Recipe = require('../models/Recipe');
const CookingGuidance = require('../models/BeginnersGuide');
const Settings = require('../models/Settings');
const BeginnersGuide = require('../models/BeginnersGuide');
const PantryShopping = require('../models/PantryShopping');
const ShoppingList = require('../models/ShoppingList');

const sendSuccess = (res, data, message = 'Success') => {
  res.json({ success: true, data, message });
};

const sendError = (res, error, status = 500) => {
  res.status(status).json({ success: false, message: error.message });
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments().catch(() => 0);
    const activeUsers = await User.countDocuments({ isBlocked: false }).catch(() => 0);
    const totalRecipes = await Recipe.countDocuments().catch(() => 0);
    const totalMealPlans = await MealPlan.countDocuments().catch(() => 0);
    const totalShoppingItems = await ShoppingList.countDocuments().catch(() => 0);
    const totalActivities = await Activity.countDocuments().catch(() => 0);
    const totalGuidance = await CookingGuidance.countDocuments().catch(() => 0);
    const totalSuggestions = await CookingLog.countDocuments().catch(() => 0);

    let totalShoppingLists = 0;
    try {
      if (ShoppingList) {
        totalShoppingLists = await ShoppingList.countDocuments();
      }
    } catch (e) {
      totalShoppingLists = 0;
    }

    let totalPantryItems = 0;
    try {
      const pantryDocs = await Pantry.find({}).select('items');
      pantryDocs.forEach(doc => {
        if (doc.items && doc.items.length > 0) {
          totalPantryItems += doc.items.length;
        }
      });
    } catch (e) {
      totalPantryItems = 0;
    }

    const statsData = {
      totalUsers,
      totalRecipes,
      totalMealPlans,
      activeUsers,
      totalPantryItems,
      totalShoppingItems,
      totalSuggestions,
      totalActivities,
      totalGuidance,
      totalShoppingLists
    };

    res.json({ success: true, data: statsData });
  } catch (error) {
    res.json({
      success: true,
      data: {
        totalUsers: 0, totalRecipes: 0, totalMealPlans: 0,
        activeUsers: 0, totalPantryItems: 0,
        totalShoppingItems: 0, totalSuggestions: 0,
        totalActivities: 0, totalGuidance: 0,
        totalShoppingLists: 0
      }
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    sendError(res, error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    sendError(res, error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    sendError(res, error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    sendError(res, error);
  }
};

exports.blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    sendError(res, error);
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    sendError(res, error);
  }
};

exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ timestamp: -1 }).limit(100);
    res.json({ success: true, data: activities });
  } catch (error) {
    sendError(res, error);
  }
};

exports.getPantryItems = async (req, res) => {
  try {
    let pantryData = [];

    try {
      const db = mongoose.connection.db;
      const pantriesCollection = db.collection('pantries');

      if (pantriesCollection) {
        const pantryDocs = await pantriesCollection.find({}).toArray();
        const userIds = pantryDocs.map(doc => doc.userId).filter(Boolean);
        const users = await User.find({ _id: { $in: userIds } }).select('name email').lean();
        const usersMap = {};
        users.forEach(user => usersMap[user._id.toString()] = { name: user.name, email: user.email });

        pantryDocs.forEach(doc => {
          const userId = doc.userId?.toString() || 'unknown';
          const userInfo = usersMap[userId] || { name: 'Unknown User', email: '' };
          if (doc.items?.length) {
            doc.items.forEach(item => {
              pantryData.push({
                _id: item._id || new mongoose.Types.ObjectId(),
                name: item.name || 'Unnamed Item',
                quantity: item.quantity || 0,
                unit: item.unit || 'units',
                category: item.category || 'General',
                userId: userId,
                userName: userInfo.name,
                userEmail: userInfo.email,
                isLowStock: (item.quantity || 0) < 5,
                createdAt: item.createdAt || doc.createdAt || new Date()
              });
            });
          }
        });
      }
    } catch (error) {
      console.error('Error fetching pantry:', error);
      pantryData = [];
    }

    res.json({ success: true, data: pantryData, count: pantryData.length });
  } catch (error) {
    console.error('Error in getPantryItems:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePantryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, unit, category } = req.body;

    const db = mongoose.connection.db;
    const pantriesCollection = db.collection('pantries');

    const updateFields = {};
    if (name !== undefined) updateFields['items.$.name'] = name;
    if (quantity !== undefined) updateFields['items.$.quantity'] = quantity;
    if (unit !== undefined) updateFields['items.$.unit'] = unit;
    if (category !== undefined) updateFields['items.$.category'] = category;

    const result = await pantriesCollection.updateOne(
      { 'items._id': new mongoose.Types.ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'Pantry item not found' });
    }

    res.json({ success: true, message: 'Pantry item updated' });
  } catch (error) {
    sendError(res, error);
  }
};

exports.deletePantryItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Item ID is required'
      });
    }

    const db = mongoose.connection.db;
    const pantriesCollection = db.collection('pantries');

    const result = await pantriesCollection.updateMany(
      { 'items._id': new mongoose.Types.ObjectId(id) },
      { $pull: { items: { _id: new mongoose.Types.ObjectId(id) } } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pantry item not found'
      });
    }

    res.json({
      success: true,
      message: 'Pantry item deleted successfully',
      deletedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Error deleting pantry item:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getShoppingItems = async (req, res) => {
  try {
    const items = await ShoppingList.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.json({ success: true, data: [] });
  }
};

exports.getShoppingLists = async (req, res) => {
  try {
    if (!ShoppingList) {
      return res.json({ success: true, data: [], count: 0 });
    }

    const shoppingLists = await ShoppingList.find()
      .sort({ createdAt: -1 })
      .lean();

    const allUsers = await User.find({}).select('name email _id').lean();
    const usersMap = {};
    allUsers.forEach(user => {
      usersMap[user._id.toString()] = {
        name: user.name,
        email: user.email
      };
    });

    const firstUser = allUsers.length > 0 ? allUsers[0] : null;

    const transformed = shoppingLists.map(list => {
      let userId = list.userId || list.user || null;
      let userName = list.userName || 'Unknown User';
      let userEmail = list.userEmail || 'No Email';

      if (userId) {
        const userIdStr = userId.toString();
        if (usersMap[userIdStr]) {
          userName = usersMap[userIdStr].name || userName;
          userEmail = usersMap[userIdStr].email || userEmail;
        }
      } else if (firstUser) {
        userId = firstUser._id;
        userName = firstUser.name || 'Admin';
        userEmail = firstUser.email || 'admin@chefbot.com';
      }

      return {
        _id: list._id,
        name: list.name || 'Unnamed List',
        description: list.description || '',
        items: list.items || [],
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        totalItems: list.totalItems || list.items?.length || 0,
        purchasedItems: list.purchasedItems || 0,
        status: list.status || 'active',
        createdAt: list.createdAt,
        updatedAt: list.updatedAt
      };
    });

    res.json({
      success: true,
      data: transformed,
      count: transformed.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addShoppingList = async (req, res) => {
  try {
    if (!ShoppingList) {
      return res.status(500).json({ success: false, message: 'ShoppingList model not available' });
    }

    const { name, items, userId, userName, userEmail, description, status } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'List name is required' });
    }

    let finalUserEmail = userEmail || 'No Email';
    let finalUserName = userName || 'Unknown User';
    let finalUserId = userId || null;

    if (finalUserId) {
      try {
        const user = await User.findById(finalUserId).select('name email').lean();
        if (user) {
          finalUserName = user.name || finalUserName;
          finalUserEmail = user.email || finalUserEmail;
        }
      } catch (e) {
        finalUserId = null;
      }
    }

    if (!finalUserId && userName) {
      try {
        const user = await User.findOne({ name: userName }).select('name email _id').lean();
        if (user) {
          finalUserName = user.name || finalUserName;
          finalUserEmail = user.email || finalUserEmail;
          finalUserId = user._id;
        }
      } catch (e) {}
    }

    const shoppingList = new ShoppingList({
      name,
      description: description || '',
      items: items || [],
      userId: finalUserId,
      userName: finalUserName,
      userEmail: finalUserEmail,
      totalItems: items?.length || 0,
      purchasedItems: items?.filter(i => i.isPurchased)?.length || 0,
      status: status || 'active'
    });

    await shoppingList.save();
    res.status(201).json({ success: true, data: shoppingList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateShoppingList = async (req, res) => {
  try {
    if (!ShoppingList) {
      return res.status(500).json({ success: false, message: 'ShoppingList model not available' });
    }

    const { name, items, userId, userName, userEmail, description, status } = req.body;

    let finalUserEmail = userEmail || 'No Email';
    let finalUserName = userName || 'Unknown User';
    let finalUserId = userId || null;

    if (finalUserId) {
      try {
        const user = await User.findById(finalUserId).select('name email').lean();
        if (user) {
          finalUserName = user.name || finalUserName;
          finalUserEmail = user.email || finalUserEmail;
        }
      } catch (e) {
        finalUserId = null;
      }
    }

    const updateData = {
      name,
      description: description || '',
      items: items || [],
      userId: finalUserId,
      userName: finalUserName,
      userEmail: finalUserEmail,
      totalItems: items?.length || 0,
      purchasedItems: items?.filter(i => i.isPurchased)?.length || 0,
      status: status || 'active'
    };

    const shoppingList = await ShoppingList.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!shoppingList) {
      return res.status(404).json({ success: false, message: 'Shopping list not found' });
    }

    res.json({ success: true, data: shoppingList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteShoppingList = async (req, res) => {
  try {
    if (!ShoppingList) {
      return res.status(500).json({ success: false, message: 'ShoppingList model not available' });
    }

    const shoppingList = await ShoppingList.findByIdAndDelete(req.params.id);
    if (!shoppingList) {
      return res.status(404).json({ success: false, message: 'Shopping list not found' });
    }

    res.json({ success: true, message: 'Shopping list deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find().sort({ createdAt: -1 });

    const allUsers = await User.find({}).select('name email _id').lean();
    const usersMap = {};
    allUsers.forEach(user => {
      usersMap[user._id.toString()] = {
        name: user.name,
        email: user.email
      };
    });

    const transformedPlans = mealPlans.map(plan => {
      const planObj = plan.toObject ? plan.toObject() : plan;

      let userId = planObj.user || null;
      let userName = 'Unknown User';
      let userEmail = 'No Email';

      if (userId) {
        const userIdStr = userId.toString();
        if (usersMap[userIdStr]) {
          userName = usersMap[userIdStr].name || 'Unknown User';
          userEmail = usersMap[userIdStr].email || 'No Email';
        }
      }
      let planType = 'Daily';
      if (planObj.preferences && planObj.preferences.planDuration) {
        const duration = planObj.preferences.planDuration.toLowerCase();
        if (duration === 'daily' || duration === 'day') {
          planType = 'Daily';
        } else if (duration === 'weekly' || duration === 'week') {
          planType = 'Weekly';
        }
      }
      if (planType === 'Daily' && planObj.plan && planObj.plan.totalDays) {
        const totalDays = planObj.plan.totalDays;
        if (totalDays > 1) {
          planType = 'Weekly';
        }
      }

      let mealsArray = [];
      if (planObj.plan && planObj.plan.meals && Array.isArray(planObj.plan.meals)) {
        mealsArray = planObj.plan.meals.filter(meal => {
          return meal && meal.trim() !== '' && meal.trim() !== 'No meals added';
        });
      }

      const createdDate = planObj.createdAt || planObj.plan?.savedAt || new Date();

      let status = 'Active';
      if (planObj.plan && planObj.plan.isActive === false) {
        status = 'Inactive';
      }

      return {
        _id: planObj._id,
        userName: userName,
        userEmail: userEmail,
        userId: userId,
        planType: planType,
        meals: mealsArray,
        status: status,
        date: createdDate,
        endDate: planObj.endDate || null,
        createdAt: planObj.createdAt || new Date(),
        name: planObj.name || 'Meal Plan',
        familyCount: planObj.plan?.familyCount || 0,
        totalDays: planObj.plan?.totalDays || 0
      };
    });

    res.json({
      success: true,
      data: transformedPlans,
      count: transformedPlans.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createMealPlan = async (req, res) => {
  try {
    const { userName, userEmail, userId, planType, meals, startDate, endDate, status, name, familyCount, totalDays } = req.body;

    if (!userName || !userId) {
      return res.status(400).json({
        success: false,
        message: 'userName and userId are required'
      });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: 'User not found with this ID'
      });
    }

    const finalEmail = userEmail || userExists.email || '';
    const planName = name || `Meal Plan - ${new Date().toLocaleDateString()}`;
    const days = totalDays || (planType === 'Daily' ? 1 : 7);

    const mealPlan = new MealPlan({
      user: userId,
      name: planName,
      userName: userName || userExists.name || 'Unknown User',
      userEmail: finalEmail,
      userId: userId,
      planType: planType || 'Daily',
      meals: meals || [],
      startDate: startDate || new Date(),
      endDate: endDate || null,
      status: status || 'Active',
      preferences: {
        planDuration: planType ? planType.toLowerCase() : 'daily',
        familyCount: familyCount || 1
      },
      plan: {
        totalDays: days,
        familyCount: familyCount || 1,
        meals: meals || [],
        savedAt: new Date(),
        isActive: status !== 'Inactive'
      }
    });

    await mealPlan.save();

    const responseData = {
      _id: mealPlan._id,
      userName: userExists.name || userName,
      userEmail: userExists.email || finalEmail,
      userId: mealPlan.userId,
      planType: mealPlan.planType || 'Daily',
      meals: mealPlan.meals || [],
      status: mealPlan.status || 'Active',
      startDate: mealPlan.startDate,
      endDate: mealPlan.endDate,
      createdAt: mealPlan.createdAt,
      name: mealPlan.name,
      familyCount: mealPlan.plan?.familyCount || 1,
      totalDays: mealPlan.plan?.totalDays || 1
    };

    res.status(201).json({
      success: true,
      data: responseData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateMealPlan = async (req, res) => {
  try {
    const { userName, userEmail, userId, planType, meals, startDate, endDate, status, name, familyCount, totalDays } = req.body;

    const mealPlan = await MealPlan.findById(req.params.id);
    if (!mealPlan) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found'
      });
    }

    if (userId) {
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(400).json({
          success: false,
          message: 'User not found with this ID'
        });
      }
      mealPlan.user = userId;
      mealPlan.userName = userExists.name;
      mealPlan.userEmail = userExists.email;
      mealPlan.userId = userId;
    } else {
      if (userName) mealPlan.userName = userName;
      if (userEmail) mealPlan.userEmail = userEmail;
    }

    if (name) mealPlan.name = name;
    if (planType) {
      mealPlan.planType = planType;
      if (mealPlan.preferences) {
        mealPlan.preferences.planDuration = planType.toLowerCase();
      }
    }
    if (meals) {
      mealPlan.meals = meals;
      if (mealPlan.plan) {
        mealPlan.plan.meals = meals;
      }
    }
    if (startDate) mealPlan.startDate = startDate;
    if (endDate) mealPlan.endDate = endDate;
    if (status) mealPlan.status = status;
    if (familyCount !== undefined) {
      if (mealPlan.preferences) {
        mealPlan.preferences.familyCount = familyCount;
      }
      if (mealPlan.plan) {
        mealPlan.plan.familyCount = familyCount;
      }
    }
    if (totalDays !== undefined) {
      if (mealPlan.plan) {
        mealPlan.plan.totalDays = totalDays;
      }
    }

    await mealPlan.save();

    const responseData = {
      _id: mealPlan._id,
      userName: mealPlan.userName,
      userEmail: mealPlan.userEmail,
      userId: mealPlan.userId,
      planType: mealPlan.planType || 'Daily',
      meals: mealPlan.meals || [],
      status: mealPlan.status || 'Active',
      startDate: mealPlan.startDate,
      endDate: mealPlan.endDate,
      createdAt: mealPlan.createdAt,
      name: mealPlan.name,
      familyCount: mealPlan.plan?.familyCount || 1,
      totalDays: mealPlan.plan?.totalDays || 1
    };

    res.json({
      success: true,
      data: responseData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByIdAndDelete(req.params.id);

    if (!mealPlan) {
      return res.status(404).json({ success: false, message: 'Meal plan not found' });
    }

    res.json({ success: true, message: 'Meal plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMealSuggestions = async (req, res) => {
  try {
    const cookingLogs = await CookingLog.find()
      .sort({ createdAt: -1 })
      .lean();

    const allUsers = await User.find({}).select('name email _id').lean();
    const usersMap = {};
    allUsers.forEach(user => {
      usersMap[user._id.toString()] = {
        name: user.name,
        email: user.email
      };
    });

    const firstUser = allUsers.length > 0 ? allUsers[0] : null;

    const transformedSuggestions = [];

    for (const log of cookingLogs) {
      let userId = log.userId || null;
      let userName = log.userName || 'Unknown User';
      let userEmail = log.userEmail || 'No Email';

      if (userId) {
        const userIdStr = userId.toString();
        if (usersMap[userIdStr]) {
          userName = usersMap[userIdStr].name || userName;
          userEmail = usersMap[userIdStr].email || userEmail;
        }
      } else if (firstUser) {
        userId = firstUser._id;
        userName = firstUser.name || 'Admin';
        userEmail = firstUser.email || 'admin@chefbot.com';
      }

      for (const meal of log.meals) {
        transformedSuggestions.push({
          _id: meal._id || new mongoose.Types.ObjectId(),
          mealName: meal.recipeName || 'Unnamed Meal',
          title: meal.recipeName || 'Unnamed Meal',
          category: 'Cooking Log',
          mealType: 'Cooking Log',
          dietType: 'Regular',
          ingredients: meal.ingredientsUsed || [],
          instructions: '',
          prepTime: 0,
          cookTime: 0,
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
          userId: userId,
          userName: userName,
          userEmail: userEmail,
          rating: 0,
          reviews: 0,
          isVeg: true,
          isFeatured: false,
          image: null,
          tags: [],
          members: meal.members || 0,
          recipeId: meal.recipeId || null,
          date: log.date,
          dayName: log.dayName,
          createdAt: log.createdAt || new Date(),
          updatedAt: log.updatedAt || new Date()
        });
      }
    }

    res.json({
      success: true,
      data: transformedSuggestions,
      count: transformedSuggestions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getMealSuggestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const cookingLog = await CookingLog.findOne({
      'meals._id': id
    }).lean();

    if (!cookingLog) {
      return res.status(404).json({
        success: false,
        message: 'Meal suggestion not found'
      });
    }

    const meal = cookingLog.meals.find(m => m._id.toString() === id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }

    let userInfo = { name: 'Unknown User', email: '' };
    if (cookingLog.userId) {
      const user = await User.findById(cookingLog.userId).select('name email').lean();
      if (user) {
        userInfo = { name: user.name, email: user.email };
      }
    }

    res.json({
      success: true,
      data: {
        _id: meal._id,
        mealName: meal.recipeName,
        title: meal.recipeName,
        category: 'Cooking Log',
        mealType: 'Cooking Log',
        dietType: 'Regular',
        ingredients: meal.ingredientsUsed || [],
        userId: cookingLog.userId,
        userName: userInfo.name,
        userEmail: userInfo.email,
        members: meal.members,
        recipeId: meal.recipeId,
        date: cookingLog.date,
        dayName: cookingLog.dayName,
        createdAt: meal.createdAt || cookingLog.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createMealSuggestion = async (req, res) => {
  try {
    const { userId, recipeId, recipeName, members, date, dayName, ingredientsUsed } = req.body;

    if (!userId || !recipeName) {
      return res.status(400).json({
        success: false,
        message: 'userId and recipeName are required'
      });
    }

    const today = new Date();
    const logDate = date || today.toISOString().split('T')[0];
    const logDayName = dayName || today.toLocaleDateString('en-US', { weekday: 'long' });

    let cookingLog = await CookingLog.findOne({
      userId,
      date: logDate
    });

    if (!cookingLog) {
      cookingLog = new CookingLog({
        userId,
        date: logDate,
        dayName: logDayName,
        meals: [],
        isComplete: false
      });
    }

    cookingLog.meals.push({
      recipeId: recipeId || null,
      recipeName,
      members: parseInt(members) || 4,
      ingredientsUsed: ingredientsUsed || []
    });

    await cookingLog.save();

    res.status(201).json({
      success: true,
      data: cookingLog,
      message: 'Meal suggestion created successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMealSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { recipeName, members, ingredientsUsed } = req.body;

    const cookingLog = await CookingLog.findOne({
      'meals._id': id
    });

    if (!cookingLog) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }

    const meal = cookingLog.meals.id(id);
    if (recipeName) meal.recipeName = recipeName;
    if (members) meal.members = parseInt(members);
    if (ingredientsUsed) meal.ingredientsUsed = ingredientsUsed;

    await cookingLog.save();

    res.json({
      success: true,
      data: cookingLog,
      message: 'Meal updated successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMealSuggestion = async (req, res) => {
  try {
    const { id } = req.params;

    const cookingLog = await CookingLog.findOne({
      'meals._id': id
    });

    if (!cookingLog) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found'
      });
    }

    cookingLog.meals = cookingLog.meals.filter(
      meal => meal._id.toString() !== id
    );

    await cookingLog.save();

    res.json({
      success: true,
      message: 'Meal deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMealSuggestionsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const cookingLogs = await CookingLog.find()
      .sort({ createdAt: -1 })
      .lean();

    const filteredMeals = [];
    for (const log of cookingLogs) {
      for (const meal of log.meals) {
        filteredMeals.push({
          _id: meal._id,
          recipeName: meal.recipeName,
          date: log.date,
          dayName: log.dayName,
          members: meal.members,
          ingredientsUsed: meal.ingredientsUsed
        });
      }
    }

    res.json({
      success: true,
      data: filteredMeals,
      count: filteredMeals.length,
      category: category
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMealSuggestionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cookingLogs = await CookingLog.find({ userId })
      .sort({ date: -1 })
      .lean();

    const user = await User.findById(userId).select('name email').lean();

    const meals = [];
    for (const log of cookingLogs) {
      for (const meal of log.meals) {
        meals.push({
          _id: meal._id,
          recipeName: meal.recipeName,
          date: log.date,
          dayName: log.dayName,
          members: meal.members,
          ingredientsUsed: meal.ingredientsUsed
        });
      }
    }

    res.json({
      success: true,
      data: meals,
      count: meals.length,
      user: user || null
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPersonalizedRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cookingLogs = await CookingLog.find({ userId })
      .sort({ date: -1 })
      .limit(10)
      .lean();

    const recipeCount = {};
    for (const log of cookingLogs) {
      for (const meal of log.meals) {
        const key = meal.recipeId?.toString() || meal.recipeName;
        if (key) {
          recipeCount[key] = (recipeCount[key] || 0) + 1;
        }
      }
    }

    const sortedRecipes = Object.entries(recipeCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([recipeId]) => recipeId);

    res.json({
      success: true,
      data: sortedRecipes,
      count: sortedRecipes.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    console.log('Fetching recipe collection...');

    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .lean();

    console.log(`Found ${recipes.length} recipes`);

    const transformed = recipes.map(r => ({
      _id: r._id,
      recipeName: r.title || r.recipeName || 'Unnamed Recipe',
      category: r.category || 'General',
      prepTime: r.prepTime || 0,
      views: r.views || 0,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt
    }));

    res.json({
      success: true,
      data: transformed,
      count: transformed.length
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.incrementRecipeViews = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }

    console.log(`View counted for: ${recipe.recipeName || recipe.title} (${recipe.views} views)`);

    res.json({
      success: true,
      data: recipe,
      message: 'View counted successfully'
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addToRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      title: req.body.recipeName || req.body.title,
      recipeName: req.body.recipeName || req.body.title,
      category: req.body.category || 'General',
      prepTime: req.body.prepTime || 30,
      views: 0
    });
    await recipe.save();
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    sendError(res, error);
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    res.json({ success: true, data: recipe });
  } catch (error) {
    sendError(res, error);
  }
};

exports.deleteFromRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    res.json({ success: true, message: 'Recipe deleted' });
  } catch (error) {
    sendError(res, error);
  }
};

exports.getBeginnersGuide = async (req, res) => {
  try {
    const guides = await BeginnersGuide.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: guides });
  } catch (error) {
    sendError(res, error);
  }
};

exports.addBeginnersGuide = async (req, res) => {
  try {
    const guide = new BeginnersGuide(req.body);
    await guide.save();
    res.status(201).json({ success: true, data: guide });
  } catch (error) {
    sendError(res, error);
  }
};

exports.updateBeginnersGuide = async (req, res) => {
  try {
    const guide = await BeginnersGuide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, data: guide });
  } catch (error) {
    sendError(res, error);
  }
};

exports.deleteBeginnersGuide = async (req, res) => {
  try {
    const guide = await BeginnersGuide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, message: 'Guide deleted' });
  } catch (error) {
    sendError(res, error);
  }
};

exports.getDailyReports = async (req, res) => {
  res.json({ success: true, data: [] });
};

exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    sendError(res, error);
  }
};

exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();
    Object.assign(settings, req.body);
    await settings.save();
    res.json({ success: true, data: settings });
  } catch (error) {
    sendError(res, error);
  }
};

exports.exportData = async (req, res) => {
  try {
    const data = {
      users: await User.find({}).select('-password'),
      activities: await Activity.find(),
      shoppingLists: await ShoppingList.find(),
      recipes: await Recipe.find(),
      beginnersGuide: await BeginnersGuide.find(),
      cookingLogs: await CookingLog.find()
    };
    res.json({ success: true, data });
  } catch (error) {
    sendError(res, error);
  }
};