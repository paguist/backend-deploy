const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://paguist:pamemongo@cluster0.4w7hfri.mongodb.net/pet_shelter_db')
  .then(() => {
    console.log('Connected to the database');
  }).catch(err => {
    console.error('Database connection error:', err);
  });
