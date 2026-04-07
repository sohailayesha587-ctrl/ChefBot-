const express = require('express');
const router = express.Router();
const {
  getAllAppliances,
  getApplianceById,
  getApplianceCompanies,
  getCompanyModels,
  getModelDetails,
  createAppliance,
  updateAppliance,
  deleteAppliance,
  bulkCreateAppliances
} = require('../controllers/applianceController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// ============ PUBLIC ROUTES (Anyone can view) ============

// Get all appliances
router.get('/', getAllAppliances);

// Get single appliance by ID
router.get('/:applianceId', getApplianceById);

// Get all companies for an appliance
router.get('/:applianceId/companies', getApplianceCompanies);

// Get models for a specific company
router.get('/:applianceId/companies/:companyId/models', getCompanyModels);

// Get specific model details
router.get('/:applianceId/companies/:companyId/models/:modelId', getModelDetails);

// ============ ADMIN ONLY ROUTES (Require authentication) ============

// Create new appliance
router.post('/', protect, adminOnly, createAppliance);

// Bulk create (for migration)
router.post('/bulk', protect, adminOnly, bulkCreateAppliances);

// Update appliance
router.put('/:applianceId', protect, adminOnly, updateAppliance);

// Delete appliance
router.delete('/:applianceId', protect, adminOnly, deleteAppliance);

module.exports = router;