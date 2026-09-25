const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  diagnosis: { 
    type: String, 
    required: true 
  },
  notes: { 
    type: String, 
    required: true 
  },
  doctor_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor' 
  }
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);