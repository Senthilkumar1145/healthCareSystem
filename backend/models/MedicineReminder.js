const mongoose = require('mongoose');

const medicineReminderSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  medicine: { 
    type: String, 
    required: true 
  },
  schedule: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('MedicineReminder', medicineReminderSchema);