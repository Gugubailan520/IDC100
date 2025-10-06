const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  logo: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  contact: {
    qq: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      trim: true
    }
  },
  group: {
    type: String,
    trim: true
  },
  images: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 显式指定集合名称为IDC100
module.exports = mongoose.model('Site', siteSchema, 'IDC100');