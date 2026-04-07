const express = require('express');
const router = express.Router();
const { 
  getPantryShoppingList, 
  addToPantryShoppingList, 
  removeFromPantryShoppingList,
  clearPantryShoppingList
} = require('../controllers/pantryShoppingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getPantryShoppingList);
router.post('/', protect, addToPantryShoppingList);
router.delete('/:itemId', protect, removeFromPantryShoppingList);
router.delete('/', protect, clearPantryShoppingList);

module.exports = router;