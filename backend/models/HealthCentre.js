const mongoose = require('mongoose');

const healthCentreSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Hospital', 'Clinic', 'Pharmacy'], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('HealthCentre', healthCentreSchema);