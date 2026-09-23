const User = require('../models/User');
const UserSettings = require('../models/UserSettings')

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, profilePicture } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    if (name) user.name = name;
    if (profilePicture !== undefined) user.profilePicture = profilePicture;
    
    await user.save({ validateBeforeSave: false });
    
    res.json({ 
      success: true, 
      message: 'Profile updated successfully',
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        profilePicture: user.profilePicture 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSettings = async (req, res) => {
  try {
    let settings = await UserSettings.findOne({ userId: req.user._id });
    
    if (!settings) {
      settings = await UserSettings.create({ userId: req.user._id });
    }
    
    res.json({ success: true, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { soundPreferences } = req.body;
    
    let settings = await UserSettings.findOne({ userId: req.user._id });
    
    if (!settings) {
      settings = new UserSettings({ userId: req.user._id });
    }
    
    if (soundPreferences) {
      settings.soundPreferences = { ...settings.soundPreferences, ...soundPreferences };
    }
    await settings.save();
    
    res.json({ success: true, message: 'Settings updated', settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
getProfile,
updateProfile,
getSettings,
updateSettings 

};