const PantryShoppingList = require('../models/PantryShoppingList');

// GET pantry shopping list
const getPantryShoppingList = async (req, res) => {
  try {
    let list = await PantryShoppingList.findOne({ userId: req.user._id });
    
    if (!list) {
      list = await PantryShoppingList.create({ userId: req.user._id, items: [] });
    }
    
    res.status(200).json({ success: true, items: list.items });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ADD item to pantry shopping list
const addToPantryShoppingList = async (req, res) => {
  try {
    const { name, quantity, unit, category } = req.body;

    let list = await PantryShoppingList.findOne({ userId: req.user._id });
    
    if (!list) {
      list = await PantryShoppingList.create({ userId: req.user._id, items: [] });
    }

    // Check if already exists
    if (list.items.some(item => item.name === name)) {
      return res.status(400).json({ message: 'Item already in shopping list!' });
    }

    list.items.push({ name, quantity, unit, category });
    await list.save();

    res.status(201).json({ success: true, items: list.items });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// REMOVE item from pantry shopping list
const removeFromPantryShoppingList = async (req, res) => {
  try {
    const { itemId } = req.params;

    const list = await PantryShoppingList.findOne({ userId: req.user._id });
    
    if (!list) {
      return res.status(404).json({ message: 'Shopping list not found!' });
    }

    list.items = list.items.filter(item => item._id.toString() !== itemId);
    await list.save();

    res.status(200).json({ success: true, items: list.items });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// CLEAR all items from pantry shopping list
const clearPantryShoppingList = async (req, res) => {
  try {
    const list = await PantryShoppingList.findOne({ userId: req.user._id });
    
    if (!list) {
      return res.status(404).json({ message: 'Shopping list not found!' });
    }

    list.items = [];
    await list.save();

    res.status(200).json({ success: true, items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  getPantryShoppingList, 
  addToPantryShoppingList, 
  removeFromPantryShoppingList,
  clearPantryShoppingList
};