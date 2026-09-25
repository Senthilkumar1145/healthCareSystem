const express = require('express');
const router = express.Router();
const { bookAppointment, getAppointments } = require('../controllers/appointmentController');
const { verifyToken, authorizeRoles }= require('../middleware/authMiddleware'); 

router.post('/book', verifyToken, bookAppointment);
router.get('/', verifyToken, getAppointments);

module.exports = router; 