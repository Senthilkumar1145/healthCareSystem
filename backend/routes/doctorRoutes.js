const express = require('express');
const router = express.Router();
const { getDoctors, createDoctorProfile } = require('../controllers/doctorController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getDoctors);
router.post('/', verifyToken, authorizeRoles('Doctor'), createDoctorProfile);

module.exports = router;