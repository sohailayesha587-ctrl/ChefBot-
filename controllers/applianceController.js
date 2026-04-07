const Appliance = require('../models/Appliance');

// @desc    Get all appliances
// @route   GET /api/appliances
// @access  Public
const getAllAppliances = async (req, res) => {
  try {
    const appliances = await Appliance.find({ status: 'published' })
      .select('-__v')
      .sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: appliances.length,
      data: appliances
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single appliance by ID
// @route   GET /api/appliances/:applianceId
// @access  Public
const getApplianceById = async (req, res) => {  // ✅ FIXED: req, res not req,req
  try {
    const appliance = await Appliance.findOne({ 
      id: req.params.applianceId,
      status: 'published' 
    });
    
    if (!appliance) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appliance not found' 
      });
    }
    
    res.status(200).json({ success: true, data: appliance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get companies for an appliance
// @route   GET /api/appliances/:applianceId/companies
// @access  Public
const getApplianceCompanies = async (req, res) => {
  try {
    const appliance = await Appliance.findOne({ id: req.params.applianceId });
    
    if (!appliance) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appliance not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      count: appliance.companies.length,
      data: appliance.companies
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get models for a specific company
// @route   GET /api/appliances/:applianceId/companies/:companyId/models
// @access  Public
const getCompanyModels = async (req, res) => {
  try {
    const { applianceId, companyId } = req.params;
    
    const appliance = await Appliance.findOne({ id: applianceId });
    
    if (!appliance) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appliance not found' 
      });
    }
    
    const company = appliance.companies.find(c => c.id === companyId);
    
    if (!company) {
      return res.status(404).json({ 
        success: false, 
        error: 'Company not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      count: company.models.length,
      data: company.models
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get specific model details
// @route   GET /api/appliances/:applianceId/companies/:companyId/models/:modelId
// @access  Public
const getModelDetails = async (req, res) => {
  try {
    const { applianceId, companyId, modelId } = req.params;
    
    const appliance = await Appliance.findOne({ id: applianceId });
    
    if (!appliance) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appliance not found' 
      });
    }
    
    const company = appliance.companies.find(c => c.id === companyId);
    
    if (!company) {
      return res.status(404).json({ 
        success: false, 
        error: 'Company not found' 
      });
    }
    
    const model = company.models.find(m => m.id === modelId);
    
    if (!model) {
      return res.status(404).json({ 
        success: false, 
        error: 'Model not found' 
      });
    }
    
    res.status(200).json({ success: true, data: model });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new appliance
// @route   POST /api/appliances
// @access  Private/Admin
const createAppliance = async (req, res) => {
  try {
    const appliance = await Appliance.create(req.body);
    res.status(201).json({ success: true, data: appliance });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Bulk create appliances (for migration)
// @route   POST /api/appliances/bulk
// @access  Private/Admin
const bulkCreateAppliances = async (req, res) => {
  try {
    const appliances = req.body; // array of appliances
    
    for (const appliance of appliances) {
      await Appliance.findOneAndUpdate(
        { id: appliance.id },
        appliance,
        { upsert: true, new: true }
      );
    }
    
    res.status(201).json({ 
      success: true, 
      message: `${appliances.length} appliances saved successfully` 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update appliance
// @route   PUT /api/appliances/:applianceId
// @access  Private/Admin
const updateAppliance = async (req, res) => {
  try {
    const appliance = await Appliance.findOneAndUpdate(
      { id: req.params.applianceId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!appliance) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appliance not found' 
      });
    }
    
    res.status(200).json({ success: true, data: appliance });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete appliance
// @route   DELETE /api/appliances/:applianceId
// @access  Private/Admin
const deleteAppliance = async (req, res) => {
  try {
    const appliance = await Appliance.findOneAndDelete({ id: req.params.applianceId });
    
    if (!appliance) {
      return res.status(404).json({ 
        success: false, 
        error: 'Appliance not found' 
      });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllAppliances,
  getApplianceById,
  getApplianceCompanies,
  getCompanyModels,
  getModelDetails,
  createAppliance,
  updateAppliance,
  deleteAppliance,
  bulkCreateAppliances
};