const express = require('express');
const router = express.Router();

const {
  getShoppingItems,
  addShoppingItem,
  updateShoppingItem,
  markAsPurchased,
  deleteShoppingItem
} = require('../controllers/shoppingController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getShoppingItems);
router.post('/', protect, addShoppingItem);
router.put('/:itemId', protect, updateShoppingItem);
router.patch('/:itemId/purchased', protect, markAsPurchased);
router.delete('/:itemId', protect, deleteShoppingItem);

module.exports = router;