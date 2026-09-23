const mongoose = require('mongoose');

const beginnersGuideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      default: '',
    },

    mainCategory: {
      type: String,
      default: '',
    },

    meatType: {
      type: String,
      default: '',
    },

    processingType: {
      type: String,
      default: '',
    },

    spiceType: {
      type: String,
      default: '',
    },

    vegetableType: {
      type: String,
      default: '',
    },

    urduName: {
      type: String,
      default: '',
    },

    brand: {
      type: String,
      default: '',
    },

    image: {
      type: String,
      default: '',
    },

    tagline: {
      type: String,
      default: '',
    },

    fullDesc: {
      type: String,
      default: '',
    },

    price: {
      type: String,
      default: '',
    },

    filterTags: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    status: {
      type: String,
      default: 'published',
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('BeginnersGuide', beginnersGuideSchema);