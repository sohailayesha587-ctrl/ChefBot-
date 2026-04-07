const express = require('express');
const router = express.Router();
const { 
  getPantryItems, 
  addPantryItem, 
  updatePantryItem, 
  deletePantryItem,
  deductItemsFromPantry,
  getUsageHistory,
  getLowStockItems,
  getPantrySummary,
  bulkAddItems
} = require('../controllers/PantryController');
const { protect } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// ======================
// BASIC CRUD ROUTES
// ======================

// Get all pantry items
router.get('/', getPantryItems);

// Add new item
router.post('/', addPantryItem);

// Update item
router.put('/:itemId', updatePantryItem);

// Delete item
router.delete('/:itemId', deletePantryItem);

// ======================
// PANTRY OPERATIONS
// ======================

// Deduct items from pantry (for daily report)
// POST /api/pantry/deduct
// Body: { itemsUsed: [{ name, quantity, unit }] }
router.post('/deduct', deductItemsFromPantry);

// Bulk add items
// POST /api/pantry/bulk-add
router.post('/bulk-add', bulkAddItems);

// ======================
// ANALYTICS & REPORTS
// ======================

// Get usage history
// GET /api/pantry/usage-history?limit=20
router.get('/usage-history', getUsageHistory);

// Get low stock items
router.get('/low-stock', getLowStockItems);

// Get pantry summary
router.get('/summary', getPantrySummary);

module.exports = router;