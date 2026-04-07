const mongoose = require('mongoose');

// Specifications sub-schema
const specSchema = new mongoose.Schema({
  key: String,
  value: String
}, { _id: false, strict: false });

// Model sub-schema
const modelSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  capacity: String,
  price: String,
  image: String,
  features: [String],
  specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
  warranty: String,
  usageGuide: String,
  maintenance: String,
  installationTips: String,
  energySavingTips: String,
  troubleshooting: [String],
  bestFor: String,
  estimatedConsumption: String,
  estimatedGasConsumption: String,
  estimatedPowerConsumption: String
}, { timestamps: true });

// Company sub-schema
const companySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  models: [modelSchema]
}, { timestamps: true });

// Main Appliance Schema
const applianceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  types: [String],
  companies: [companySchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  totalViews: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Indexes
applianceSchema.index({ name: 1 });
applianceSchema.index({ 'companies.name': 1 });
applianceSchema.index({ 'companies.models.name': 1 });
applianceSchema.index({ 'companies.models.type': 1 });

// Methods
applianceSchema.methods.incrementViews = async function() {
  this.totalViews += 1;
  return this.save();
};

// Static methods
applianceSchema.statics.findByApplianceId = function(applianceId) {
  return this.findOne({ id: applianceId });
};

applianceSchema.statics.findModelById = function(applianceId, companyId, modelId) {
  return this.findOne(
    { id: applianceId, 'companies.id': companyId, 'companies.models.id': modelId },
    { 'companies.$': 1 }
  );
};

module.exports = mongoose.model('Appliance', applianceSchema);