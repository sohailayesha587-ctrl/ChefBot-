const Recipe = require('../models/Recipe');
const MealPlan = require('../models/MealPlan');
const Pantry = require('../models/Pantry');
const { normalizeIngredient } = require('../utils/urduHelper');

const mapDietType = (val) => {
  if (!val) return null;
  const map = {
    veg: 'Vegetarian',
    vegetarian: 'Vegetarian',
    'non-veg': 'Non-Vegetarian',
    nonveg: 'Non-Vegetarian',
    mixed: ['Vegetarian', 'Non-Vegetarian', 'Mixed']
  };
  return map[val.toLowerCase()] ?? null;
};

const mapAllergy = (val) => {
  if (!val || val === 'none') return null;
  const map = {
    egg: 'eggs',
    eggs: 'eggs',
    peanut: 'peanuts',
    peanuts: 'peanuts',
    gluten: 'gluten',
    lactose: 'dairy',
    dairy: 'dairy',
    shellfish: 'shellfish',
    nuts: 'nuts',
    soy: 'soy',
    wheat: 'wheat',
    fish: 'fish'
  };
  return map[val.toLowerCase()] || null;
};

const mapAgeGroup = (val) => {
  if (!val || val === 'general') return null;
  const map = {
    kids: ['kids', 'preteens'],
    teens: ['teens'],
    elderly: ['seniors'],
    patient: null
  };
  return map[val.toLowerCase()] || null;
};

const levenshteinDistance = (a, b) => {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
};

const normalizeText = (str) => {
  if (!str) return '';
  return normalizeIngredient(String(str));
};

const escapeRegex = (str) => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const isIngredientMatch = (pantryItem, recipeIngredient) => {
  const p = normalizeText(pantryItem);
  const r = normalizeText(recipeIngredient);

  if (!p || !r) return false;
  if (p === r) return true;
  if (p.includes(r) || r.includes(p)) return true;

  const distance = levenshteinDistance(p, r);
  if (distance <= 2) return true;

  const pWords = p.split(/\s+/);
  const rWords = r.split(/\s+/);

  if (pWords.some((word) => word.length > 2 && rWords.includes(word))) {
    return true;
  }

  return false;
};

const extractPantryNames = (pantryItems) => {
  if (!Array.isArray(pantryItems)) return [];
  return pantryItems
    .map((item) => {
      if (typeof item === 'string') return item;
      return item?.name || item?.itemName || '';
    })
    .filter(Boolean);
};

const calcMatchScore = (recipe, pantryNames) => {
  const keywords = (recipe.pantryKeywords || [])
    .map((k) => normalizeText(k))
    .filter(Boolean);

  if (keywords.length === 0) return 50;
  if (!pantryNames || pantryNames.length === 0) return 0;

  const pantryNormalized = pantryNames
    .map((p) => normalizeText(p))
    .filter(Boolean);

  if (pantryNormalized.length === 0) return 0;

  let matched = 0;
  for (const kw of keywords) {
    if (pantryNormalized.some((p) => isIngredientMatch(p, kw))) matched++;
  }

  const matchPercent = Math.round((matched / keywords.length) * 100);
  return Math.min(100, matchPercent);
};

const formatRecipe = (recipe, pantryNames) => {
  if (!recipe) return null;
  const score = calcMatchScore(recipe, pantryNames);
  return {
    _id: recipe._id,
    name: recipe.title,
    image: recipe.image || '',
    tagline: recipe.tagline || `${recipe.dietType || ''} • ${recipe.cuisine || 'Pakistani'}`,
    available: score >= 50,
    matchScore: score,
    dietType: recipe.dietType,
    cuisine: recipe.cuisine,
    cookingTime: recipe.cookingTime,
    baseServings: recipe.baseServings
  };
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildDailyPlan = (bList, lList, dList, totalDays) => {
  const bShuffled = shuffle(bList);
  const lShuffled = shuffle(lList);
  const dShuffled = shuffle(dList);
  const pickMeal = (shuffledList, dayIndex, globalUsedIds, usedSubCategoriesToday, avoidSubCategory) => {
    if (!shuffledList.length) return null;

    for (let i = 0; i < shuffledList.length; i++) {
      const candidate = shuffledList[(dayIndex + i) % shuffledList.length];
      const id = candidate._id.toString();
      const subCat = candidate.subCategory || null;

      if (globalUsedIds.has(id)) continue;
      if (subCat && usedSubCategoriesToday.has(subCat)) continue;
      if (subCat && avoidSubCategory && subCat === avoidSubCategory) continue;

      globalUsedIds.add(id);
      if (subCat) usedSubCategoriesToday.add(subCat);
      return candidate;
    }

  
    for (let i = 0; i < shuffledList.length; i++) {
      const candidate = shuffledList[(dayIndex + i) % shuffledList.length];
      const id = candidate._id.toString();
      const subCat = candidate.subCategory || null;

      if (globalUsedIds.has(id)) continue;
      if (subCat && usedSubCategoriesToday.has(subCat)) continue;

      globalUsedIds.add(id);
      if (subCat) usedSubCategoriesToday.add(subCat);
      return candidate;
    }
    for (let i = 0; i < shuffledList.length; i++) {
      const candidate = shuffledList[(dayIndex + i) % shuffledList.length];
      const id = candidate._id.toString();

      if (globalUsedIds.has(id)) continue;

      globalUsedIds.add(id);
      if (candidate.subCategory) usedSubCategoriesToday.add(candidate.subCategory);
      return candidate;
    }

    return shuffledList[dayIndex % shuffledList.length];
  };

  const dailyPlan = {};
  const globalUsedIds = { breakfast: new Set(), lunch: new Set(), dinner: new Set() };
  const lastSubCategory = { breakfast: null, lunch: null, dinner: null };

  for (let d = 0; d < totalDays; d++) {
    const usedSubCategoriesToday = new Set();

    const breakfast = pickMeal(bShuffled, d, globalUsedIds.breakfast, usedSubCategoriesToday, lastSubCategory.breakfast);
    const lunch = pickMeal(lShuffled, d, globalUsedIds.lunch, usedSubCategoriesToday, lastSubCategory.lunch);
    const dinner = pickMeal(dShuffled, d, globalUsedIds.dinner, usedSubCategoriesToday, lastSubCategory.dinner);

    lastSubCategory.breakfast = breakfast?.subCategory || null;
    lastSubCategory.lunch = lunch?.subCategory || null;
    lastSubCategory.dinner = dinner?.subCategory || null;

    dailyPlan[d] = { breakfast, lunch, dinner };
  }

  return dailyPlan;
};

const generateMealPlan = async (req, res) => {
  try {
    const { dietType, allergy, ageGroup, familyCount, duration, pantry } = req.query;

    const userId = req.user?._id || req.user?.id;
    let pantryItems = pantry
      ? pantry.split(',').map((p) => p.trim()).filter(Boolean)
      : [];
    if (pantryItems.length === 0 && userId) {
      const pantryDoc = await Pantry.findOne({ userId }).lean();
      if (pantryDoc?.items) pantryItems = pantryDoc.items;
    }

    const pantryNames = extractPantryNames(pantryItems);

    const baseQuery = { isActive: true };

    const mappedDiet = mapDietType(dietType);
    if (mappedDiet) {
      baseQuery.dietType = Array.isArray(mappedDiet) ? { $in: mappedDiet } : mappedDiet;
    }

    const mappedAllergy = mapAllergy(allergy);
    if (mappedAllergy) baseQuery.allergens = { $nin: [mappedAllergy] };

    const mappedAge = mapAgeGroup(ageGroup);
    if (mappedAge) baseQuery.ageGroup = { $in: mappedAge };

    if (ageGroup === 'patient') {
      baseQuery.patientFriendly = { $in: ['diabetes', 'heart', 'bp', 'lowsalt', 'lowfat'] };
    }

    const totalDays = duration === 'daily' ? 1 : 7;
    const FETCH_LIMIT = 30;

    const fetchForMeal = async (mealTime) => {

      const query = {
        ...baseQuery,
        category: mealTime
      };
      let recipes = [];

      if (pantryNames.length > 0) {
        const pantryRegexes = pantryNames.map((p) => new RegExp(escapeRegex(p), 'i'));
        recipes = await Recipe.find({ ...query, pantryKeywords: { $in: pantryRegexes } })
          .select('_id title tagline image dietType cuisine subCategory pantryKeywords allergens suitableForMeals ageGroup baseServings cookingTime patientFriendly')
          .limit(FETCH_LIMIT)
          .lean();
      }

      if (recipes.length < FETCH_LIMIT) {
        const existingIds = recipes.map((r) => r._id.toString());
        const fill = await Recipe.find({ ...query, _id: { $nin: existingIds } })
          .select('_id title tagline image dietType cuisine subCategory pantryKeywords allergens suitableForMeals ageGroup baseServings cookingTime patientFriendly')
          .limit(FETCH_LIMIT - recipes.length)
          .lean();
        recipes = [...recipes, ...fill];
      }

      return recipes;
    };

    const [bRecipes, lRecipes, dRecipes] = await Promise.all([
      fetchForMeal('Breakfast'),
      fetchForMeal('Lunch'),
      fetchForMeal('Dinner')
    ]);

    if (!bRecipes.length && !lRecipes.length && !dRecipes.length) {
      return res.json({
        success: false,
        noRecipes: true,
        message: 'No recipes found according to your selected filters.',
        tip: 'Change diet type or add items to your pantry.'
      });
    }

    const variety = {
      breakfast: { poolSize: bRecipes.length, limited: bRecipes.length < totalDays },
      lunch: { poolSize: lRecipes.length, limited: lRecipes.length < totalDays },
      dinner: { poolSize: dRecipes.length, limited: dRecipes.length < totalDays }
    };

    const dailyPicks = buildDailyPlan(bRecipes, lRecipes, dRecipes, totalDays);

    const plan = {};
    for (let d = 0; d < totalDays; d++) {
      plan[d] = {
        breakfast: formatRecipe(dailyPicks[d].breakfast, pantryNames),
        lunch: formatRecipe(dailyPicks[d].lunch, pantryNames),
        dinner: formatRecipe(dailyPicks[d].dinner, pantryNames)
      };
    }

    const usedIds = Object.values(plan)
      .flatMap((day) => [day.breakfast, day.lunch, day.dinner])
      .filter(Boolean)
      .map((r) => r._id);

    Recipe.updateMany({ _id: { $in: usedIds } }, { $inc: { timesUsedInPlans: 1 } }).catch(() => {});

    return res.json({
      success: true,
      plan,
      totalDays,
      duration,
      familyCount: parseInt(familyCount) || 2,
      filters: { dietType, allergy, ageGroup },
      variety
    });
  } catch (err) {
    console.error('generateMealPlan error:', err);
    return res.status(500).json({
      success: false,
      message: 'Server error while generating meal plan.',
      error: err.message
    });
  }
};

const saveMealPlan = async (req, res) => {
  try {
    const { id, name, preferences, plan } = req.body;
    const userId = req.user?._id || null;

    const planMap = new Map();

    if (plan && typeof plan === 'object') {
      Object.entries(plan).forEach(([key, value]) => {
        planMap.set(key, value);
      });
    }

    const totalDays = planMap.size || 7;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + totalDays);

    const payload = {
      name: name || `Meal Plan - ${new Date().toLocaleDateString()}`,
      preferences: preferences || {},
      plan: planMap,
      totalDays,
      familyCount: parseInt(preferences?.familyMembers) || 2,
      user: userId,
      expiresAt
    };

    let saved;
    if (id) {
      saved = await MealPlan.findOneAndUpdate(
        { _id: id, user: userId },
        payload,
        { new: true, runValidators: true }
      );
      if (!saved) {
        return res.status(404).json({
          success: false,
          message: 'Meal plan not found to update.'
        });
      }
    } else {
      saved = await MealPlan.create(payload);
    }

    return res.json({
      success: true,
      message: 'Meal plan saved successfully!',
      id: saved._id
    });

  } catch (err) {
    console.error('saveMealPlan error:', err);

    return res.status(500).json({
      success: false,
      message: 'Save failed.',
      error: err.message
    });
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Meal plan ID is required.'
      });
    }

    const deleted = await MealPlan.findOneAndDelete({
      _id: id,
      user: userId
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Meal plan not found.'
      });
    }

    return res.json({
      success: true,
      message: 'Meal plan deleted successfully!'
    });
  } catch (err) {
    console.error('deleteMealPlan error:', err);

    return res.status(500).json({
      success: false,
      message: 'Delete failed.',
      error: err.message
    });
  }
};

module.exports = {
  generateMealPlan,
  saveMealPlan,
  deleteMealPlan
};