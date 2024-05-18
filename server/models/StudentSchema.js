const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phoneNumber: String,
  university:String,
  address: String,
  course: String,
  subCourse: String,
  cvPath: String,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
