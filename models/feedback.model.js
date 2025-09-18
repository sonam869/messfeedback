const mongoose = require('mongoose');

const mealSelectionSchema = new mongoose.Schema({
  breakfast: { type: [String], required: true },
  lunch: { type: [String], required: true },
  snacks: { type: [String], required: true },
  dinner: { type: [String], required: true }
}, { _id: false });

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNo: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
  semester: { type: Number, required: true, min: 1, max: 10 },
  department: { type: String, required: true, trim: true },
  hostel: { type: String, required: true, trim: true },
  foodPreference: { type: String, required: true, enum: ['veg', 'non-veg'] },

  menuRating: {
    monday: { type: Number, min: 1, max: 5 },
    tuesday: { type: Number, min: 1, max: 5 },
    wednesday: { type: Number, min: 1, max: 5 },
    thursday: { type: Number, min: 1, max: 5 },
    friday: { type: Number, min: 1, max: 5 },
    saturday: { type: Number, min: 1, max: 5 },
  },

  vegSelections: { type: mealSelectionSchema, required: true },

  nonVegSelections: { type: mealSelectionSchema, required: false }

}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);