const Pantry = require('../models/Pantry');

const unitThreshold = {
  kg: 1,
  g: 500,
  liters: 1,
  ml: 500,
  pieces: 3,
  dozen: 0.25
};

const categoryThreshold = {
  Vegetables: 1,
  Fruits: 1,
  Dairy: 0.5,
  Grains: 2,
  Spices: 0.2,
  Meat: 0.5,
  Beverages: 1,
  Other: 0.5
};

const checkLowStock = (quantity, unit, category) => {
  if (unitThreshold[unit] !== undefined) {
    return quantity < unitThreshold[unit];
  }
  if (categoryThreshold[category] !== undefined) {
    return quantity < categoryThreshold[category];
  }
  return quantity <= 0.5;
};

const getPantryItems = async (req, res) => {
  try {
    let pantry = await Pantry.findOne({ userId: req.user._id });

    if (!pantry) {
      pantry = await Pantry.create({ userId: req.user._id, items: [] });
    }

    res.status(200).json({ success: true, items: pantry.items });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const addPantryItem = async (req, res) => {
  try {
    const { name, quantity, unit, category } = req.body;

    if (!name || quantity === undefined || quantity === null || !unit || !category) {
      return res.status(400).json({ message: 'Please fill all fields!' });
    }

    let pantry = await Pantry.findOne({ userId: req.user._id });

    if (!pantry) {
      pantry = await Pantry.create({ userId: req.user._id, items: [] });
    }

    const lowStock = checkLowStock(quantity, unit, category);
    pantry.items.push({ name, quantity, unit, category, isLowStock: lowStock });

    await pantry.save();

    res.status(201).json({
      success: true,
      message: 'Item added successfully!',
      items: pantry.items
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updatePantryItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, quantity, unit, category } = req.body;

    const pantry = await Pantry.findOne({ userId: req.user._id });

    if (!pantry) {
      return res.status(404).json({ message: 'Pantry not found!' });
    }

    const item = pantry.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found!' });
    }

    item.name = name || item.name;
    item.quantity = quantity !== undefined && quantity !== null ? quantity : item.quantity;
    item.unit = unit || item.unit;
    item.category = category || item.category;
    item.isLowStock = checkLowStock(item.quantity, item.unit, item.category);

    await pantry.save();

    res.status(200).json({
      success: true,
      message: 'Item updated successfully!',
      items: pantry.items
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deletePantryItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const pantry = await Pantry.findOne({ userId: req.user._id });

    if (!pantry) {
      return res.status(404).json({ message: 'Pantry not found!' });
    }

    pantry.items = pantry.items.filter((item) => item._id.toString() !== itemId);

    await pantry.save();

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully!',
      items: pantry.items
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getPantryItems, addPantryItem, updatePantryItem, deletePantryItem };