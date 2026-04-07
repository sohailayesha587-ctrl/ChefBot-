const DailyReport = require('../models/DailyReport');
const Pantry = require('../models/Pantry');

const getTodayStart = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
};

// Generate today's report
exports.generateTodayReport = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId;
    const today = getTodayStart();

    const pantry = await Pantry.findOne({ userId });
    let lowStock = [];
    if (pantry && pantry.items) {
      lowStock = pantry.items.filter(item => item.quantity <= item.threshold)
                              .map(item => ({ name: item.name, quantity: item.quantity, unit: item.unit }));
    }

    const report = await DailyReport.findOneAndUpdate(
      { userId, date: today },
      {
        $setOnInsert: {
          userId,
          date: today,
          userReply: { status: 'pending', itemsUsed: [] }
        },
        $set: {
          pantryUpdates: { itemsUsed: [], lowStock },
          summary: `${lowStock.length} items are low in stock.`
        }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, report, needsReply: report.userReply?.status === 'pending' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Parse user message and deduct from pantry
exports.submitUsage = async (req, res) => {
  try {
    const userId = req.user._id;
    const { message, itemsUsed } = req.body;
    
    let parsedItems = itemsUsed;
    if (message && !parsedItems) {
      parsedItems = parseMessageToItems(message);
    }
    
    if (!parsedItems || parsedItems.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Could not understand. Please send like: 2 bread, 1 milk' 
      });
    }
    
    const today = getTodayStart();
    const pantry = await Pantry.findOne({ userId });
    
    if (!pantry) {
      return res.status(404).json({ success: false, message: 'Pantry not found' });
    }
    
    // Deduct items from pantry
    const deductedItems = [];
    const notFoundItems = [];
    
    for (const used of parsedItems) {
      const pantryItem = pantry.items.find(i => i.name.toLowerCase() === used.name.toLowerCase());
      
      if (pantryItem) {
        const oldQuantity = pantryItem.quantity;
        pantryItem.quantity = Math.max(0, pantryItem.quantity - used.quantity);
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
          unit: pantryItem.unit
        });
      } else {
        notFoundItems.push(used.name);
      }
    }
    
    await pantry.save();
    
    // Update daily report
    const report = await DailyReport.findOneAndUpdate(
      { userId, date: today },
      {
        $set: {
          'userReply.status': 'answered',
          'userReply.itemsUsed': parsedItems,
          'userReply.repliedAt': new Date(),
          'pantryUpdates.itemsUsed': parsedItems
        }
      },
      { new: true }
    );
    
    res.json({
      success: true,
      deducted: deductedItems,
      notFound: notFoundItems,
      report
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper: Parse natural language message
function parseMessageToItems(message) {
  const items = [];
  const pattern = /(\d+(?:\.\d+)?)\s*(?:kg|liter|l|piece|pack|glass|cup|tbsp|tsp)?\s*([a-zA-Z\s]+)/gi;
  let match;
  
  while ((match = pattern.exec(message)) !== null) {
    const quantity = parseFloat(match[1]);
    let name = match[2].trim().toLowerCase();
    
    // Remove common suffixes
    name = name.replace(/(s$|es$|ed$)/, '');
    
    items.push({ name, quantity, unit: 'piece' });
  }
  
  // Fallback: if no pattern matches, try simple split
  if (items.length === 0) {
    const parts = message.split(',');
    for (const part of parts) {
      const words = part.trim().split(' ');
      if (words.length >= 2) {
        const quantity = parseFloat(words[0]);
        const name = words.slice(1).join(' ');
        if (!isNaN(quantity)) {
          items.push({ name, quantity, unit: 'piece' });
        }
      }
    }
  }
  
  return items;
}

// Get pending report for today
exports.getPendingReport = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = getTodayStart();
    
    let report = await DailyReport.findOne({ userId, date: today });
    
    if (!report) {
      const pantry = await Pantry.findOne({ userId });
      const lowStock = pantry?.items?.filter(i => i.quantity <= i.threshold) || [];
      
      report = await DailyReport.create({
        userId,
        date: today,
        userReply: { status: 'pending', itemsUsed: [] },
        pantryUpdates: { itemsUsed: [], lowStock: lowStock.map(i => ({ name: i.name, quantity: i.quantity })) }
      });
    }
    
    // Get low stock items for suggestions
    const pantry = await Pantry.findOne({ userId });
    const lowStockItems = pantry?.items?.filter(i => i.quantity <= i.threshold).map(i => i.name) || [];
    
    res.json({
      success: true,
      hasPending: report.userReply?.status === 'pending',
      report,
      suggestions: lowStockItems
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reports
exports.getUserReports = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const reports = await DailyReport.find({ userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await DailyReport.countDocuments({ userId });

    res.json({ success: true, reports, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get report by date
exports.getReportByDate = async (req, res) => {
  try {
    const userId = req.user._id;
    const { date } = req.params;
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const report = await DailyReport.findOne({ userId, date: targetDate });
    if (!report) return res.status(404).json({ success: false, message: 'No report for this date' });
    
    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Handle missed reports (run by cron)
exports.handleMissedReports = async () => {
  try {
    const today = getTodayStart();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    
    const pendingReports = await DailyReport.find({
      'userReply.status': 'pending',
      date: { $lt: today, $gte: threeDaysAgo }
    }).populate('userId', 'name email');
    
    for (const report of pendingReports) {
      const daysPending = Math.floor((today - report.date) / (1000 * 60 * 60 * 24));
      
      if (daysPending >= 2) {
        report.userReply.status = 'skipped';
        report.summary = 'Auto-skipped - no response from user';
        await report.save();
        
        console.log(`Auto-skipped report for user ${report.userId._id} for date ${report.date}`);
      }
    }
    
    return { success: true, processed: pendingReports.length };
  } catch (error) {
    console.error('Error handling missed reports:', error);
    return { success: false, error: error.message };
  }
};

// Admin: get all reports
exports.getAllReportsAdmin = async (req, res) => {
  try {
    const { startDate, endDate, userId, page = 1, limit = 20 } = req.query;
    let filter = {};
    
    if (userId) filter.userId = userId;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    
    const skip = (page - 1) * limit;
    const reports = await DailyReport.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email');
    
    const total = await DailyReport.countDocuments(filter);
    res.json({ success: true, reports, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};