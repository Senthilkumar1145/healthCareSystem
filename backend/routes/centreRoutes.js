const express = require('express');
const router = express.Router();
const { getHealthCentres, addHealthCentre } = require('../controllers/centreController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getHealthCentres);
router.post('/add', verifyToken, addHealthCentre);

module.exports = router;