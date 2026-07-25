const fundamentalConfig = require('../config/fundamentalIngredients');

const normalizeText = (str) => {
  if (!str) return '';
  return str.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ');
};

const hasMeat = (pantryItems) => {
  const pantryNames = pantryItems.map(p => normalizeText(p.name || p));
  return fundamentalConfig.meatKeywords.some(meat => 
    pantryNames.some(p => p.includes(meat) || meat.includes(p))
  );
};

const checkFundamentalIngredients = (pantryItems, dietType) => {
  const pantryNames = pantryItems.map(p => normalizeText(p.name || p));
  
  let required = [...fundamentalConfig.common];
  
  if (dietType === 'veg') {
    required.push(...fundamentalConfig.veg);
  } else if (dietType === 'non-veg') {
    if (!hasMeat(pantryItems)) {
      required.push('meat');
    }
  }
  
  const missing = required.filter(fund => {
    const normalizedFund = normalizeText(fund);
    return !pantryNames.some(p => p.includes(normalizedFund) || normalizedFund.includes(p));
  });
  
  return {
    hasFundamentals: missing.length === 0,
    missingFundamentals: missing,
    requiredFundamentals: required
  };
};

module.exports = { checkFundamentalIngredients };