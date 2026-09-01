const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const router = express.Router();
const {
  getAllGuides,
  getGuideById
} = require('../controllers/BeginnersGuideController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getAllGuides);
router.get('/:id', getGuideById);


module.exports = router;