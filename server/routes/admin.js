const express = require('express');
const router = express.Router();
const Student = require('../models/StudentSchema'); // Import the Student model or use your existing model

// Admin route to fetch all students
router.get('/', async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
