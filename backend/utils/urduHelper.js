const { transliterate } = require('transliteration');

const urduToEnglish = (text) => {
  if (!text || typeof text !== 'string') return text;
  
  try {
    const hasUrdu = /[\u0600-\u06FF]/.test(text);
    if (hasUrdu) {
      return transliterate(text);
    }
    return text;
  } catch (error) {
    return text;
  }
};

const normalizeIngredient = (str) => {
  if (!str) return '';
  
  let englishText = urduToEnglish(str);
  return englishText
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
};

const getIngredientCategory = (ingredientName) => {
  const name = normalizeIngredient(ingredientName);
  
  const categoryMap = {
    'onion': 'Vegetables', 'pyaaz': 'Vegetables', 'pyaz': 'Vegetables',
    'ginger': 'Vegetables', 'adrak': 'Vegetables',
    'garlic': 'Vegetables', 'lehsun': 'Vegetables', 'lahsun': 'Vegetables',
    'potato': 'Vegetables', 'aloo': 'Vegetables',
    'tomato': 'Vegetables', 'tamatar': 'Vegetables',
    'carrot': 'Vegetables', 'gajar': 'Vegetables',
    'peas': 'Vegetables', 'matar': 'Vegetables',
    'cabbage': 'Vegetables', 'band gobhi': 'Vegetables',
    'cauliflower': 'Vegetables', 'phool gobhi': 'Vegetables',
    'capsicum': 'Vegetables', 'shimla mirch': 'Vegetables',
    'spinach': 'Vegetables', 'palak': 'Vegetables',
    'brinjal': 'Vegetables', 'baingan': 'Vegetables',
    'cucumber': 'Vegetables', 'kheera': 'Vegetables',
    'pumpkin': 'Vegetables', 'kaddu': 'Vegetables',
    'radish': 'Vegetables', 'mooli': 'Vegetables',
    'apple': 'Fruits', 'seb': 'Fruits',
    'banana': 'Fruits', 'kela': 'Fruits',
    'mango': 'Fruits', 'aam': 'Fruits',
    'orange': 'Fruits', 'santara': 'Fruits', 'malta': 'Fruits',
    'grapes': 'Fruits', 'angoor': 'Fruits',
    'watermelon': 'Fruits', 'tarbooz': 'Fruits',
    'pomegranate': 'Fruits', 'anar': 'Fruits',
    'lemon': 'Fruits', 'limbu': 'Fruits', 'nimbu': 'Fruits',
    'coconut': 'Fruits', 'narial': 'Fruits',
    'chicken': 'Meat', 'murghi': 'Meat',
    'mutton': 'Meat', 'gosht': 'Meat',
    'beef': 'Meat', 'gay ka gosht': 'Meat',
    'fish': 'Seafood', 'machli': 'Seafood',
    'prawn': 'Seafood', 'jinga': 'Seafood', 'shrimp': 'Seafood',
    'milk': 'Dairy', 'doodh': 'Dairy',
    'yogurt': 'Dairy', 'dahi': 'Dairy', 'curd': 'Dairy',
    'butter': 'Dairy', 'makkhan': 'Dairy',
    'cheese': 'Dairy', 'paneer': 'Dairy',
    'ghee': 'Dairy', 'cream': 'Dairy', 'malai': 'Dairy',
    'salt': 'Spices', 'namak': 'Spices',
    'sugar': 'Spices', 'cheeni': 'Spices', 'shakar': 'Spices',
    'turmeric': 'Spices', 'haldi': 'Spices',
    'cumin': 'Spices', 'zeera': 'Spices', 'jeera': 'Spices',
    'coriander': 'Spices', 'dhania': 'Spices',
    'red chili': 'Spices', 'laal mirch': 'Spices',
    'black pepper': 'Spices', 'kali mirch': 'Spices',
    'garam masala': 'Spices',
    'cinnamon': 'Spices', 'dar cheeni': 'Spices',
    'cardamom': 'Spices', 'ilaichi': 'Spices',
    'clove': 'Spices', 'laung': 'Spices',
    'rice': 'Grains', 'chawal': 'Grains',
    'wheat': 'Grains', 'gehun': 'Grains',
    'flour': 'Grains', 'atta': 'Grains',
    'bread': 'Grains', 'roti': 'Grains',
    'lentil': 'Pulses', 'dal': 'Pulses',
    'chickpea': 'Pulses', 'chana': 'Pulses',
    'kidney beans': 'Pulses', 'rajma': 'Pulses',
    'oil': 'Oils', 'tel': 'Oils',
    'olive oil': 'Oils', 'zaitoon ka tel': 'Oils',
    'coconut oil': 'Oils', 'nariyal ka tel': 'Oils'
  };
  
  if (categoryMap[name]) {
    return categoryMap[name];
  }
  
  for (const [key, category] of Object.entries(categoryMap)) {
    if (name.includes(key) || key.includes(name)) {
      return category;
    }
  }
  
  return 'Others';
};

module.exports = { urduToEnglish, normalizeIngredient, getIngredientCategory };