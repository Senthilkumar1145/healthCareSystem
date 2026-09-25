const express = require('express');
const router = express.Router();
const { createReminder, getReminders } = require('../controllers/reminderController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/add', verifyToken, createReminder);
router.get('/', verifyToken, getReminders);

module.exports = router;