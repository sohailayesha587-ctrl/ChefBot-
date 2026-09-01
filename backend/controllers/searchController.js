const Recipe = require('../models/Recipe');
const BeginnersGuide = require('../models/BeginnersGuide');

const getGuideRoute = (guide) => {
  const category = (guide.category || '').toLowerCase();

  const routes = {
    'measuring-skills': '/measuring-skills',
    'kitchen-appliances': '/kitchen-appliances',
    'cutting-techniques': '/cutting-techniques',
    'kitchen-tools': '/kitchen-tools',
    'cooking-methods': '/cooking-methods',
    'meat-processing': '/meat-cuts',
    'pantry-basics': '/pantry-basics',
    'bakery-essentials': '/bakery-essentials',
    'guidance': '/guidance',
    'beginners-guide': '/guidance'
  };

  return routes[category] || '/guidance';
};

const getPriority = (item, query) => {
  const search = query.toLowerCase();

  const title = (item.title || '').toLowerCase();
  const name = (item.name || '').toLowerCase();
  const category = (item.category || '').toLowerCase();
  const mainCategory = (item.mainCategory || '').toLowerCase();
  const subCategory = (item.subCategory || '').toLowerCase();

  if (item.type === 'feature') {
    if (title === search) return 1;
    if (title.startsWith(search)) return 2;
    if (title.includes(search)) return 3;
  }

  if (title === search || name === search) return 4;

  if (title.startsWith(search) || name.startsWith(search)) return 5;

  if (title.includes(search) || name.includes(search)) return 6;

  if (
    category === search ||
    mainCategory === search ||
    subCategory === search
  ) {
    return 7;
  }

  if (
    category.includes(search) ||
    mainCategory.includes(search) ||
    subCategory.includes(search)
  ) {
    return 8;
  }

  return 9;
};

const globalSearch = async (req, res) => {
  try {
    const q = req.query.q?.trim();

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    if (q.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }

    const escapedQuery = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'i');
    const normalizedQuery = q.toLowerCase();

    const featureResults = [];

    const features = [
      {
        title: 'Pantry Feature',
        description: 'Manage your pantry items and ingredients',
        keywords: ['pantry', 'ingredients', 'kitchen stock', 'stock'],
        route: '/smart-pantry'
      },
      {
        title: 'Meal Planner',
        description: 'Create and manage your meal plans',
        keywords: ['meal planner', 'meal plan', 'planner'],
        route: '/meal-planner'
      },
      {
        title: 'Shopping List',
        description: 'Manage your shopping items',
        keywords: ['shopping', 'shopping list', 'grocery', 'groceries'],
        route: '/smart-shopping'
      },
      {
        title: 'Meal Suggestions',
        description: 'Get recipe and meal suggestions',
        keywords: ['suggestions', 'suggestion', 'meal suggestion'],
        route: '/meal-suggestion'
      }
    ];

    features.forEach((feature) => {
      const matched = feature.keywords.some((keyword) =>
        keyword.includes(normalizedQuery) ||
        normalizedQuery.includes(keyword)
      );

      if (matched) {
        featureResults.push({
          id: feature.title.toLowerCase().replace(/\s+/g, '-'),
          title: feature.title,
          description: feature.description,
          image: '',
          type: 'feature',
          route: feature.route
        });
      }
    });

    const [recipes, guides] = await Promise.all([
      Recipe.find({
        isActive: true,
        $or: [
          { title: regex },
          { tagline: regex },
          { description: regex },
          { ingredientsRaw: regex },
          { 'ingredients.name': regex },
          { pantryKeywords: regex },
          { searchKeywords: regex },
          { category: regex },
          { subCategory: regex },
          { cuisine: regex }
        ]
      })
        .select('_id title tagline description image category subCategory cuisine pantryKeywords')
        .limit(20)
        .lean(),

      BeginnersGuide.find({
        status: 'published',
        $or: [
          { title: regex },
          { name: regex },
          { tagline: regex },
          { description: regex },
          { fullDesc: regex },
          { tags: regex },
          { filterTags: regex },
          { category: regex },
          { mainCategory: regex },
          { subCategory: regex },
          { type: regex },
          { types: regex },
          { properUsage: regex },
          { cookingTips: regex },
          { instructions: regex },
          { tips: regex },
          { warnings: regex },
          { safetyTips: regex },
          { keyFeatures: regex },
          { techniques: regex },
          { materials: regex },
          { usage: regex },
          { commonMistakes: regex },
          { commonErrors: regex },
          { commonItems: regex },
          { items: regex },
          { material: regex },
          { brand: regex },
          { bestFor: regex },
          { recommendedFor: regex },
          { meatType: regex },
          { processType: regex },
          { equipment: regex }
        ]
      })
        .select('_id title name tagline description fullDesc image previewImg category mainCategory subCategory')
        .limit(20)
        .lean()
    ]);

    const recipeResults = recipes.map((recipe) => ({
      id: recipe._id.toString(),
      title: recipe.title,
      name: recipe.title,
      description: recipe.tagline || recipe.description || '',
      image: recipe.image || '',
      type: 'recipe',
      category: recipe.category || '',
      subCategory: recipe.subCategory || '',
      route: `/recipe/${recipe._id}`
    }));

    const guideResults = guides.map((guide) => ({
      id: guide._id.toString(),
      title: guide.title || guide.name || '',
      name: guide.name || guide.title || '',
      description:
        guide.tagline ||
        guide.description ||
        guide.fullDesc ||
        '',
      image: guide.image || guide.previewImg || '',
      type: 'guide',
      category: guide.category || '',
      mainCategory: guide.mainCategory || '',
      subCategory: guide.subCategory || '',
      route: getGuideRoute(guide)
    }));

    const results = [
      ...featureResults,
      ...recipeResults,
      ...guideResults
    ]
      .map((item) => ({
        ...item,
        priority: getPriority(item, normalizedQuery)
      }))
      .sort((a, b) => a.priority - b.priority)
      .map(({ priority, ...item }) => item)
      .slice(0, 30);

    res.status(200).json({
      success: true,
      query: q,
      total: results.length,
      results
    });
  } catch (error) {
    console.error('Search error:', error);

    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
};

module.exports = {
  globalSearch
};