const HealthRecord = require('../models/HealthRecord');

// Create or store a patient health record (Accessible by Doctor or Nurse)
const createHealthRecord = async (req, res) => {
  try {
    const { user_id, diagnosis, notes, doctor_id } = req.body;
    
    const newRecord = new HealthRecord({
      user_id,
      diagnosis,
      notes,
      doctor_id: doctor_id || (req.user.role === 'Doctor' ? req.user.id : undefined)
    });

    await newRecord.save();
    res.status(201).json({ message: 'Health record stored successfully', record: newRecord });
  } catch (err) {
    res.status(500).json({ message: 'Error saving health record', error: err.message });
  }
};

// Get health records (Patients view their own; Doctors & Nurses view via query parameter)
const getHealthRecords = async (req, res) => {
  try {
    let query = {};

    // If the logged-in user is a Patient, restrict them to their own records
    if (req.user.role === 'Patient') {
      query.user_id = req.user.id;
    } else if (req.query.user_id) {
      // Doctors and Nurses can query a specific patient's records using ?user_id=XYZ
      query.user_id = req.query.user_id;
    }

    const records = await HealthRecord.find(query)
      .populate('user_id', 'name phone language')
      .populate('doctor_id', 'name specialization');

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching health records', error: err.message });
  }
};

module.exports = { createHealthRecord, getHealthRecords };