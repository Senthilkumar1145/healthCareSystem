const Appointment = require('../models/Appointment');

// Book an appointment (Patient role)
const bookAppointment = async (req, res) => {
  try {
    const { doctor_id, date_time } = req.body;
    const user_id = req.user.id; // Extracted from JWT token via verifyToken middleware

    const newAppointment = new Appointment({
      user_id,
      doctor_id,
      date_time,
      status: 'Scheduled'
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (err) {
    res.status(500).json({ message: 'Error booking appointment', error: err.message });
  }
};

// Get appointments for logged-in user or doctor
const getAppointments = async (req, res) => {
    console.log("👉 GET /api/appointments route was successfully reached!");
  try {
    let query = {};
    if (req.user.role === 'Patient') {
      query.user_id = req.user.id;
    } else if (req.user.role === 'Doctor') {
      // Find doctor profile associated with this user
      const Doctor = require('../models/Doctor');
      const doctorDoc = await Doctor.findOne({ user_id: req.user.id });
      if (!doctorDoc) return res.status(404).json({ message: 'Doctor profile not found' });
      query.doctor_id = doctorDoc._id;
    }
    // Nurses or Admins can view all if needed

    const appointments = await Appointment.find(query)
      .populate('user_id', 'name phone language')
      .populate('doctor_id', 'name specialization availability');

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments', error: err.message });
  }
};

module.exports = { bookAppointment, getAppointments };