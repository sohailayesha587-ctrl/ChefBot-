const Shopping = require('../models/ShoppingList');

const getShoppingItems = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const items = await Shopping.find({ user: userId }).sort({ category: 1, name: 1 });
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error('GET shopping error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const addShoppingItem = async (req, res) => {
  try {
    const { name, quantity, unit, category, fromPantry } = req.body;
    const userId = req.user.id || req.user._id;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Item name is required' });
    }

    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ success: false, message: 'Valid quantity is required' });
    }

    if (!unit || !unit.trim()) {
      return res.status(400).json({ success: false, message: 'Unit is required' });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({ success: false, message: 'Category is required' });
    }

    const newItem = new Shopping({
      user: userId,
      name: name.trim(),
      quantity: qty,
      unit: unit.trim(),
      category: category.trim(),
      fromPantry: fromPantry || false,
      purchased: false
    });

    await newItem.save();

    const items = await Shopping.find({ user: userId }).sort({ category: 1, name: 1 });
    res.status(201).json({
      success: true,
      message: 'Item added successfully!',
      items
    });
  } catch (error) {
    console.error('POST shopping error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateShoppingItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, quantity, unit, category } = req.body;
    const userId = req.user.id || req.user._id;

    const item = await Shopping.findOne({ _id: itemId, user: userId });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    if (name && name.trim()) {
      item.name = name.trim();
    }

    if (quantity) {
      const qty = Number(quantity);
      if (!isNaN(qty) && qty > 0) {
        item.quantity = qty;
      }
    }

    if (unit && unit.trim()) {
      item.unit = unit.trim();
    }

    if (category && category.trim()) {
      item.category = category.trim();
    }

    await item.save();

    const items = await Shopping.find({ user: userId }).sort({ category: 1, name: 1 });
    res.status(200).json({
      success: true,
      message: 'Item updated successfully!',
      items
    });
  } catch (error) {
    console.error('PUT shopping error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const markAsPurchased = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id || req.user._id;

    const item = await Shopping.findOne({ _id: itemId, user: userId });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    item.purchased = !item.purchased;
    await item.save();

    const items = await Shopping.find({ user: userId }).sort({ category: 1, name: 1 });
    res.status(200).json({
      success: true,
      message: item.purchased ? 'Marked as purchased!' : 'Marked as pending!',
      items
    });
  } catch (error) {
    console.error('PATCH purchased error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteShoppingItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user.id || req.user._id;

    const item = await Shopping.findOneAndDelete({ _id: itemId, user: userId });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const items = await Shopping.find({ user: userId }).sort({ category: 1, name: 1 });
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully!',
      items
    });
  } catch (error) {
    console.error('DELETE shopping error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
const addMissingItems = async (req, res) => {
  try {
    const { recipeId, missingIngredients } = req.body;
    const userId = req.user.id || req.user._id;

    if (!Array.isArray(missingIngredients) || missingIngredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No missing ingredients provided'
      });
    }

    const items = missingIngredients
      .filter(item => item && item.trim())
      .map(item => ({
        user: userId,
        name: item.trim(),
        quantity: 1,
        unit: 'pieces',
        category: 'Other',
        fromPantry: false,
        purchased: false
      }));

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid ingredients provided'
      });
    }

    await Shopping.insertMany(items);

    const shoppingItems = await Shopping
      .find({ user: userId })
      .sort({ category: 1, name: 1 });

    res.status(201).json({
      success: true,
      message: 'Missing ingredients added to shopping list!',
      items: shoppingItems
    });

  } catch (error) {
    console.error('ADD missing items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};


const addMultipleItems = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.user.id || req.user._id;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No items provided'
      });
    }

    const shoppingItems = items
      .filter(item => item && item.name && item.name.trim())
      .map(item => ({
        user: userId,
        name: item.name.trim(),
        quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
        unit: item.unit && item.unit.trim()
          ? item.unit.trim()
          : 'pieces',
          
        category: item.category && item.category.trim()
          ? item.category.trim()
          : 'Other',
        fromPantry: false,
        purchased: false
      }));

    if (shoppingItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid items provided'
      });
    }

    await Shopping.insertMany(shoppingItems);

    const allItems = await Shopping
      .find({ user: userId })
      .sort({ category: 1, name: 1 });

    res.status(201).json({
      success: true,
      message: 'Items added to shopping list!',
      items: allItems
    });

  } catch (error) {
    console.error('ADD multiple items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
module.exports = {
   getShoppingItems,
  addShoppingItem,
  addMissingItems,
  addMultipleItems,
  updateShoppingItem,
  markAsPurchased,
  deleteShoppingItem
};