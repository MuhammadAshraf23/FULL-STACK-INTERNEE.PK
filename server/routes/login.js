const express = require('express');
const mongoose = require('mongoose'); 
const router = express.Router();
const UserModel = require('../models/UserSchema');
const Student = require('../models/StudentSchema');
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await UserModel.findOne({ email: email });

        if (user) {
            if (user.password === password) {
                // Admin login successful
                return res.json({ role: 'admin', message: 'Success' });
            } else {
                return res.json({ role: 'admin', message: 'Wrong password' });
            }
        }

        // If not found in admin, check in student
        let student = await Student.findOne({ email: email });

        if (student) {
            if (student.password === password) {
                // Student login successful
                return res.json({ role: 'student', message: 'Success', userId: student._id });
            } else {
                return res.json({ role: 'student', message: 'Wrong password' });
            }
        }
        return res.json({ role: 'unknown', message: 'No records found!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});



module.exports = router;
