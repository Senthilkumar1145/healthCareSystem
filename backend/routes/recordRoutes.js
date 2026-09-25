const express = require('express');
const router = express.Router();
const { createHealthRecord, getHealthRecords } = require('../controllers/recordController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Only Doctors and Nurses can create/add medical records
router.post('/add', verifyToken, authorizeRoles('Doctor', 'Nurse'), createHealthRecord);

// Patients, Doctors, and Nurses can view records
router.get('/', verifyToken, authorizeRoles('Patient', 'Doctor', 'Nurse'), getHealthRecords);

module.exports = router;