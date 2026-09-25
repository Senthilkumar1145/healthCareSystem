const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  appointment_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Appointment', 
    required: true 
  },
  mode: { 
    type: String, 
    default: 'Audio' 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'In-Progress', 'Finished'], 
    default: 'In-Progress' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);