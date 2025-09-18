const Feedback = require('../models/feedback.model');
const meals = ['breakfast', 'lunch', 'snacks', 'dinner'];

function validateSelections(selections) {
  if (!selections) return false;
  for (const meal of meals) {
    if (!Array.isArray(selections[meal]) || selections[meal].length !== 7) {
      return false;
    }
  }
  return true;
}


exports.createFeedback = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.rollNo) return res.status(400).json({ message: 'rollNo is required.' });

    payload.rollNo = payload.rollNo.toUpperCase();

   
   
   
   
 // Check existence
    const existing = await Feedback.findOne({ rollNo: payload.rollNo });
    if (existing) return res.status(409).json({ message: 'Roll number already exists. Use PUT to update.' });



    // Validate foodPreference and selections
    if (payload.foodPreference === 'veg') {
      if (!validateSelections(payload.vegSelections)) {
        return res.status(400).json({ message: 'vegSelections must exist and have exactly 7 items for each meal.' });
      }
      if (payload.nonVegSelections) {
        return res.status(400).json({ message: 'nonVegSelections should not be provided for veg preference.' });
      }
    } else if (payload.foodPreference === 'non-veg') {
      if (!validateSelections(payload.vegSelections) || !validateSelections(payload.nonVegSelections)) {
        return res.status(400).json({ message: 'For non-veg preference, both vegSelections and nonVegSelections must have 7 items for each meal.' });
      }
    } else {
      return res.status(400).json({ message: 'foodPreference must be "veg" or "non-veg".' });
    }

    const feedback = new Feedback(payload);
    const saved = await feedback.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    return res.status(500).json({ message: 'Server error' });
  }
};



exports.getFeedback = async (req, res) => {
  try {
    const rollNo = req.params.rollNo.toUpperCase();
    const feedback = await Feedback.findOne({ rollNo });
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.updateFeedback = async (req, res) => {
  try {
    const rollNo = req.params.rollNo.toUpperCase();
    const payload = req.body;
    
    payload.rollNo = payload.rollNo ? payload.rollNo.toUpperCase() : rollNo;

    
    if (payload.foodPreference === 'veg') {
      if (!validateSelections(payload.vegSelections)) {
        return res.status(400).json({ message: 'vegSelections must exist and have exactly 7 items for each meal.' });
      }
      if (payload.nonVegSelections) delete payload.nonVegSelections;
    } else if (payload.foodPreference === 'non-veg') {
      if (!validateSelections(payload.vegSelections) || !validateSelections(payload.nonVegSelections)) {
        return res.status(400).json({ message: 'For non-veg preference, both vegSelections and nonVegSelections must have 7 items for each meal.' });
      }
    }

    const updated = await Feedback.findOneAndUpdate({ rollNo }, payload, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Feedback not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    res.status(500).json({ message: 'Server error' });
  }
};




exports.getMenuOptions = (req, res) => {
  
  res.json({
    veg: ['idli', 'dosa', 'poha', 'upma', 'chapati', 'sabzi', 'dal'],
    nonVeg: ['egg bhurji', 'chicken curry', 'fish fry']
  });
};