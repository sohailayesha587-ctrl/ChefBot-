const Pantry = require('../models/Pantry');
const DailyReport = require('../models/DailyReport');

// ======================
// GET PANTRY ITEMS
// ======================
const getPantryItems = async (req, res) => {
  try {
    let pantry = await Pantry.findOne({ userId: req.user._id });
    
    if (!pantry) {
      pantry = await Pantry.create({ 
        userId: req.user._id, 
        items: [], 
        usageHistory: [] 
      });
    }
    
    res.status(200).json({ success: true, items: pantry.items });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ======================
// ADD PANTRY ITEM
// ======================
const addPantryItem = async (req, res) => {
  try {
    const { name, quantity, unit, category, threshold } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({ message: 'Name and quantity are required!' });
    }

    let pantry = await Pantry.findOne({ userId: req.user._id });
    
    if (!pantry) {
      pantry = await Pantry.create({ 
        userId: req.user._id, 
        items: [], 
        usageHistory: [] 
      });
    }

    const existingItem = pantry.items.find(
      item => item.name.toLowerCase() === name.toLowerCase()
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
      existingItem.isLowStock = existingItem.quantity <= (existingItem.threshold || 2);
      existingItem.lastUpdated = new Date();
    } else {
      pantry.items.push({ 
        name: name.toLowerCase(), 
        quantity: Number(quantity), 
        unit: unit || 'piece', 
        category: category || 'general',
        threshold: threshold || 2,
        isLowStock: quantity <= (threshold || 2),
        lastUpdated: new Date()
      });
    }

    // Add to usage history
    pantry.usageHistory.push({
      itemName: name,
      quantity: Number(quantity),
      unit: unit || 'piece',
      action: 'added',
      usedAt: new Date()
    });

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

// ======================
// UPDATE PANTRY ITEM
// ======================
const updatePantryItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, quantity, unit, category, threshold } = req.body;

    const pantry = await Pantry.findOne({ userId: req.user._id });
    
    if (!pantry) {
      return res.status(404).json({ message: 'Pantry not found!' });
    }

    const item = pantry.items.id(itemId);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found!' });
    }

    if (name) item.name = name.toLowerCase();
    if (quantity !== undefined) {
      item.quantity = Number(quantity);
      item.isLowStock = item.quantity <= (item.threshold || 2);
    }
    if (unit) item.unit = unit;
    if (category) item.category = category;
    if (threshold) {
      item.threshold = threshold;
      item.isLowStock = item.quantity <= threshold;
    }
    item.lastUpdated = new Date();

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

// ======================
// DELETE PANTRY ITEM
// ======================
const deletePantryItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const pantry = await Pantry.findOne({ userId: req.user._id });
    
    if (!pantry) {
      return res.status(404).json({ message: 'Pantry not found!' });
    }

    pantry.items = pantry.items.filter(
      item => item._id.toString() !== itemId
    );

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

// ======================
// DEDUCT ITEMS FROM PANTRY
// ======================
const deductItemsFromPantry = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemsUsed } = req.body;

    if (!itemsUsed || itemsUsed.length === 0) {
      return res.status(400).json({ message: 'No items to deduct!' });
    }

    let pantry = await Pantry.findOne({ userId });
    
    if (!pantry) {
      return res.status(404).json({ message: 'Pantry not found!' });
    }

    const deductedItems = [];
    const notFoundItems = [];
    const insufficientItems = [];

    for (const used of itemsUsed) {
      const pantryItem = pantry.items.find(
        item => item.name.toLowerCase() === used.name.toLowerCase()
      );

      if (!pantryItem) {
        notFoundItems.push(used.name);
        continue;
      }

      if (pantryItem.quantity < used.quantity) {
        insufficientItems.push({
          name: used.name,
          available: pantryItem.quantity,
          requested: used.quantity
        });
        continue;
      }

      const oldQuantity = pantryItem.quantity;
      pantryItem.quantity -= used.quantity;
      pantryItem.isLowStock = pantryItem.quantity <= pantryItem.threshold;
      pantryItem.lastUpdated = new Date();

      deductedItems.push({
        name: used.name,
        quantity: used.quantity,
        unit: pantryItem.unit,
        oldQuantity,
        newQuantity: pantryItem.quantity
      });

      // Add to usage history
      pantry.usageHistory.push({
        itemName: used.name,
        quantity: used.quantity,
        unit: pantryItem.unit,
        action: 'used',
        usedAt: new Date()
      });
    }

    await pantry.save();

    // Update daily report
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await DailyReport.findOneAndUpdate(
      { userId, date: today },
      {
        $set: {
          'userReply.status': 'answered',
          'userReply.itemsUsed': itemsUsed,
          'userReply.repliedAt': new Date(),
          'pantryUpdates.itemsUsed': itemsUsed
        }
      },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: `${deductedItems.length} items deducted successfully!`,
      deducted: deductedItems,
      notFound: notFoundItems,
      insufficient: insufficientItems,
      items: pantry.items
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ======================
// BULK ADD ITEMS
// ======================
const bulkAddItems = async (req, res) => {
  try {
    const { items } = req.body; // [{ name, quantity, unit, category }]

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required!' });
    }

    let pantry = await Pantry.findOne({ userId: req.user._id });
    
    if (!pantry) {
      pantry = await Pantry.create({ 
        userId: req.user._id, 
        items: [], 
        usageHistory: [] 
      });
    }

    for (const newItem of items) {
      const { name, quantity, unit, category, threshold } = newItem;
      
      const existingItem = pantry.items.find(
        item => item.name.toLowerCase() === name.toLowerCase()
      );

      if (existingItem) {
        existingItem.quantity += Number(quantity);
        existingItem.isLowStock = existingItem.quantity <= (existingItem.threshold || 2);
        existingItem.lastUpdated = new Date();
      } else {
        pantry.items.push({ 
          name: name.toLowerCase(), 
          quantity: Number(quantity), 
          unit: unit || 'piece', 
          category: category || 'general',
          threshold: threshold || 2,
          isLowStock: quantity <= (threshold || 2),
          lastUpdated: new Date()
        });
      }

      pantry.usageHistory.push({
        itemName: name,
        quantity: Number(quantity),
        unit: unit || 'piece',
        action: 'added',
        usedAt: new Date()
      });
    }

    await pantry.save();

    res.status(201).json({ 
      success: true, 
      message: `${items.length} items added successfully!`, 
      items: pantry.items 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ======================
// GET USAGE HISTORY
// ======================
const getUsageHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 50 } = req.query;

    const pantry = await Pantry.findOne({ userId });
    
    if (!pantry) {
      return res.status(200).json({ success: true, history: [] });
    }

    const history = pantry.usageHistory.slice(-parseInt(limit)).reverse();

    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ======================
// GET LOW STOCK ITEMS
// ======================
const getLowStockItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const pantry = await Pantry.findOne({ userId });
    
    if (!pantry) {
      return res.status(200).json({ success: true, lowStock: [] });
    }

    const lowStock = pantry.items.filter(item => item.isLowStock === true);

    res.status(200).json({ success: true, lowStock });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ======================
// GET PANTRY SUMMARY
// ======================
const getPantrySummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const pantry = await Pantry.findOne({ userId });
    
    if (!pantry) {
      return res.status(200).json({ 
        success: true, 
        summary: {
          totalItems: 0,
          lowStockCount: 0,
          totalQuantity: 0,
          categories: {}
        }
      });
    }

    const totalItems = pantry.items.length;
    const lowStockCount = pantry.items.filter(item => item.isLowStock).length;
    const totalQuantity = pantry.items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Category wise breakdown
    const categories = {};
    pantry.items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = { count: 0, quantity: 0 };
      }
      categories[item.category].count++;
      categories[item.category].quantity += item.quantity;
    });

    res.status(200).json({
      success: true,
      summary: {
        totalItems,
        lowStockCount,
        totalQuantity,
        categories
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { 
  getPantryItems, 
  addPantryItem, 
  updatePantryItem, 
  deletePantryItem,
  deductItemsFromPantry,
  bulkAddItems,
  getUsageHistory,
  getLowStockItems,
  getPantrySummary
};