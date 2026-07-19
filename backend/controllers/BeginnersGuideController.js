const BeginnersGuide = require('../models/BeginnersGuide');

exports.getAllGuides = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { status: 'published' };
    if (category) filter.category = category;
    
    const guides = await BeginnersGuide.find(filter)
      .select('+content')
      .sort({ createdAt: -1 });
    
    const processedGuides = guides.map(guide => {
      const guideObj = guide.toObject();
      
      if (!guideObj.content || Object.keys(guideObj.content).length === 0) {
        const content = {};
        
        if (guideObj.fullDesc) content.fullDesc = guideObj.fullDesc;
        if (guideObj.tagline) content.tagline = guideObj.tagline;
        if (guideObj.keyUses && guideObj.keyUses.length > 0) {
          content.keyUses = guideObj.keyUses;
        }
        if (guideObj.knife) content.knife = guideObj.knife;
        if (guideObj.tips) {
          content.tips = Array.isArray(guideObj.tips) ? guideObj.tips : [guideObj.tips];
        }
        if (guideObj.steps && guideObj.steps.length > 0) {
          content.steps = guideObj.steps.map(s => {
            if (typeof s === 'object') return s.description || s;
            return s;
          });
        }
        if (guideObj.equipment) content.equipment = guideObj.equipment;
        if (guideObj.temperature) content.temperature = guideObj.temperature;
        if (guideObj.bestFor) content.bestFor = guideObj.bestFor;
        if (guideObj.previewImg) content.previewImg = guideObj.previewImg;
        if (guideObj.name) content.name = guideObj.name;
        
        if (!content.fullDesc && guideObj.description) {
          content.fullDesc = guideObj.description;
        }
        if (!content.fullDesc && guideObj.title) {
          content.fullDesc = `Learn about ${guideObj.title}`;
        }
        
        guideObj.content = content;
      } else if (typeof guideObj.content === 'string') {
        try {
          guideObj.content = JSON.parse(guideObj.content);
        } catch (e) {
          guideObj.content = { fullDesc: guideObj.content };
        }
      }
      
      return guideObj;
    });
    
    res.json({ 
      success: true, 
      count: processedGuides.length, 
      guides: processedGuides 
    });
  } catch (error) {
    console.error('Error in getAllGuides:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

exports.getGuideById = async (req, res) => {
  try {
    const guide = await BeginnersGuide.findOne({
      _id: req.params.id,
      status: 'published'
    }).select('+content');
    
    if (!guide) {
      return res.status(404).json({ 
        success: false, 
        message: 'Guide not found' 
      });
    }
    
    const guideObj = guide.toObject();
    
    if (guideObj.content && typeof guideObj.content === 'string') {
      try {
        guideObj.content = JSON.parse(guideObj.content);
      } catch (e) {
        guideObj.content = { fullDesc: guideObj.content };
      }
    }
    
    res.json({ success: true, guide: guideObj });
  } catch (error) {
    console.error('Error in getGuideById:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};