const BeginnersGuide = require('../models/BeginnersGuide');

const getAllGuides = async (req, res) => {
  try {
    const category = req.query.category;
    let guides;

    if (category) {
      guides = await BeginnersGuide.find({ category: category })

    } else {
      guides = await BeginnersGuide.find({})
    }

    res.json({
      success: true,
      count: guides.length,
      guides: guides
    });
  } catch (error) {
    console.error('Error in getAllGuides:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getGuideById = async (req, res) => {
  try {
    const guide = await BeginnersGuide.findOne({
      _id: req.params.id
    })

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: 'Guide not found'
      });
    }

    res.json({ success: true, guide: guide });
  } catch (error) {
    console.error('Error in getGuideById:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllGuides,
  getGuideById
};