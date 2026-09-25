const express = require('express');
const router = express.Router();
const { 
  startConsultation, 
  updateConsultationStatus, 
  getConsultationDetails 
} = require('../controllers/consultationController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// Only Doctors can start consultations/audio calls
router.post('/start', verifyToken, authorizeRoles('Doctor'), startConsultation);
router.patch('/:id/status', verifyToken, authorizeRoles('Doctor'), updateConsultationStatus);
router.get('/:appointment_id', verifyToken, getConsultationDetails);

module.exports = router;