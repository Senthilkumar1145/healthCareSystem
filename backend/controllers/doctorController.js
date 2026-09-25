const Doctor = require('../models/Doctor');

// Get all doctors or search by specialization
const getDoctors = async (req, res) => {
  try {
    const { specialization } = req.query;
    let query = {};
    if (specialization) {
      query.specialization = new RegExp(specialization, 'i'); // Case-insensitive search
    }
    const doctors = await Doctor.find(query).populate('user_id', 'name phone language');
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors', error: err.message });
  }
};

// Add Doctor Profile (usually for doctors or admins)
const createDoctorProfile = async (req, res) => {
  try {
    const { user_id, name, specialization, availability } = req.body;
    
    const newDoctor = new Doctor({
      user_id,
      name,
      specialization,
      availability
    });

    await newDoctor.save();
    res.status(201).json({ message: 'Doctor profile created successfully', doctor: newDoctor });
  } catch (err) {
    res.status(500).json({ message: 'Error creating doctor profile', error: err.message });
  }
};

module.exports = { getDoctors, createDoctorProfile };