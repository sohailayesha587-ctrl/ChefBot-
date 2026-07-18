const BeginnersGuide = require('../models/BeginnersGuide');

exports.getAllGuides = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { status: 'published' };
    if (category) filter.category = category;
    
    const guides = await BeginnersGuide.find(filter)
      .sort({ createdAt: -1 });
    
    res.json({ success: true, count: guides.length, guides });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getGuideById = async (req, res) => {
  try {
    const guide = await BeginnersGuide.findOne({
      _id: req.params.id,
      status: 'published'
    });
    
    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide not found' });
    }
    
    res.json({ success: true, guide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};