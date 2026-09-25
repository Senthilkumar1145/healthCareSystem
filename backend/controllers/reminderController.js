const MedicineReminder = require('../models/MedicineReminder');

// Create a medicine reminder
const createReminder = async (req, res) => {
  try {
    const { medicine, schedule, user_id } = req.body;
    
    // Patients set reminders for themselves; Doctors/Nurses can set them for a specific user_id
    const targetUserId = req.user.role === 'Patient' ? req.user.id : (user_id || req.user.id);

    const newReminder = new MedicineReminder({
      user_id: targetUserId,
      medicine,
      schedule
    });

    await newReminder.save();
    res.status(201).json({ message: 'Medicine reminder created successfully', reminder: newReminder });
  } catch (err) {
    res.status(500).json({ message: 'Error creating medicine reminder', error: err.message });
  }
};

// Get reminders for logged-in user or specified user
const getReminders = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'Patient') {
      query.user_id = req.user.id;
    } else if (req.query.user_id) {
      query.user_id = req.query.user_id;
    }

    const reminders = await MedicineReminder.find(query).populate('user_id', 'name phone');
    res.status(200).json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medicine reminders', error: err.message });
  }
};

module.exports = { createReminder, getReminders };