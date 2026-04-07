const BeginnersGuide = require('../models/BeginnersGuide');

exports.getAllGuides = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    
    // ✅ REMOVE .select() - include ALL fields including content
    const guides = await BeginnersGuide.find(filter).sort({ createdAt: -1 });
    
    res.json({ success: true, count: guides.length, guides });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGuideById = async (req, res) => {
  try {
    const guide = await BeginnersGuide.findById(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, guide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createGuide = async (req, res) => {
  try {
    const guide = await BeginnersGuide.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, guide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGuide = async (req, res) => {
  try {
    const guide = await BeginnersGuide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, guide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGuide = async (req, res) => {
  try {
    const guide = await BeginnersGuide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ success: false, message: 'Guide not found' });
    res.json({ success: true, message: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};