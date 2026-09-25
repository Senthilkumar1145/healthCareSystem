const Consultation = require('../models/Consultation');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Start or create a consultation for an appointment (Doctor only)
const startConsultation = async (req, res) => {
  try {
    const { appointment_id, mode } = req.body;

    // Verify appointment exists
    const appointment = await Appointment.findById(appointment_id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    // Check if consultation already exists for this appointment
    const existingConsultation = await Consultation.findOne({ appointment_id });
    if (existingConsultation) {
      return res.status(200).json({ message: 'Consultation already exists', consultation: existingConsultation });
    }

    const newConsultation = new Consultation({
      appointment_id,
      mode: mode || 'Audio',
      status: 'In-Progress'
    });

    await newConsultation.save();
    res.status(201).json({ message: 'Consultation session started successfully', consultation: newConsultation });
  } catch (err) {
    res.status(500).json({ message: 'Error starting consultation', error: err.message });
  }
};

// Update consultation status (e.g., Finish call)
const updateConsultationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Pending', 'In-Progress', 'Finished'

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found.' });
    }

    res.status(200).json({ message: 'Consultation status updated', consultation });
  } catch (err) {
    res.status(500).json({ message: 'Error updating consultation', error: err.message });
  }
};

// Get consultation details
const getConsultationDetails = async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const consultation = await Consultation.findOne({ appointment_id }).populate({
      path: 'appointment_id',
      populate: [
        { path: 'user_id', select: 'name phone language' },
        { path: 'doctor_id', select: 'name specialization' }
      ]
    });

    if (!consultation) {
      return res.status(404).json({ message: 'No consultation found for this appointment.' });
    }

    res.status(200).json(consultation);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching consultation details', error: err.message });
  }
};

module.exports = { startConsultation, updateConsultationStatus, getConsultationDetails };