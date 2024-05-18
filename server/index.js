const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const studentRouter = require('./routes/student')
const adminRouter = require('./routes/admin')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for handling JSON and form data
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://internee-pk:eenretni,.123@cluster0.cqifh5g.mongodb.net/interneepk?retryWrites=true&w=majority');
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/students', studentRouter);
app.use('/admin', adminRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
