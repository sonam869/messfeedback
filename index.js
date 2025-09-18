const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

require('dotenv').config();



connectDB();

const index= express();
index.use(cors());
index.use(express.json()); 


const feedbackRoutes = require('./routes/feedback.routes');
index.use('/api', feedbackRoutes);

index.get('/', (req, res) => res.send('Mess Feedback API is running'));

index.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;
index.listen(PORT, () => console.log('Server running on port ${PORT}'))
