const mongoose = require('mongoose');

// Define a Mongoose schema for the image data
const imageSchema = new mongoose.Schema({

  im: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a Mongoose model based on the schema
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
