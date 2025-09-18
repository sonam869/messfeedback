const express = require('express');
const router = express.Router();
// const controller = require('./controllers/feedback.controller.js');
const controller = require("../controllers/feedback.controller")

router.post('/feedback', controller.createFeedback);
router.get('/feedback/:rollNo', controller.getFeedback);
router.put('/feedback/:rollNo', controller.updateFeedback);
router.get('/menu/options', controller.getMenuOptions);

module.exports = router;