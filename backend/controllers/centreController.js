const HealthCentre = require('../models/HealthCentre');

// Get all health centres, with optional filtering by type or location
const getHealthCentres = async (req, res) => {
  try {
    const { type, location } = req.query;
    let query = {};
    
    if (type) {
      query.type = type; // 'Hospital', 'Clinic', or 'Pharmacy'
    }
    if (location) {
      query.location = new RegExp(location, 'i'); // Case-insensitive search
    }

    const centres = await HealthCentre.find(query);
    res.status(200).json(centres);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching health centres', error: err.message });
  }
};

// Add a new health centre (admin or staff role)
const addHealthCentre = async (req, res) => {
  try {
    const { name, location, type } = req.body;

    const newCentre = new HealthCentre({
      name,
      location,
      type
    });

    await newCentre.save();
    res.status(201).json({ message: 'Health centre added successfully', centre: newCentre });
  } catch (err) {
    res.status(500).json({ message: 'Error adding health centre', error: err.message });
  }
};

module.exports = { getHealthCentres, addHealthCentre };