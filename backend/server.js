const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { bookAppointment, getAppointments } = require('./controllers/appointmentController');
const { verifyToken } = require('./middleware/authMiddleware');
// Import Routes
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');


// Import Consultation Routes
const consultationRoutes = require('./routes/consultationRoutes');

// Import Health Record Routes
const recordRoutes = require('./routes/recordRoutes');

// Import Reminder Routes
const reminderRoutes = require('./routes/reminderRoutes');

// Import Health Centre Routes
const centreRoutes = require('./routes/centreRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Temporary inline route test for appointments

// API Routes

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
//app.use('/api/appointments', appointmentRoutes);

// Register under API routes
app.use('/api/consultations', consultationRoutes);

// Register under API routes
app.use('/api/records', recordRoutes);

// Register under API routes
app.use('/api/reminders', reminderRoutes);

app.use('/api/centres', centreRoutes);


// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected Successfully'))
.catch((err) => console.log('Database connection error: ', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Rural Health Care System API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});