const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  doctor_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Doctor', 
    required: true 
  },
  date_time: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Scheduled', 'Completed', 'Cancelled'], 
    default: 'Scheduled' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);