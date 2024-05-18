const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/StudentSchema');
const multer= require ('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('cv'), async (req, res) => {
  const { fullName,email,phoneNumber,university,address,course,subCourse} = req.body;

  const cvPath = req.file ? req.file.path : '';

  try {
    // Create a new student instance
    const newStudent = new Student({
      fullName,
      email,
      phoneNumber,
      university,
      address,
      course,
      subCourse,
      cvPath,
    });

    // Save the student to MongoDB
    await newStudent.save();

    // Send a response to the client
    res.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;