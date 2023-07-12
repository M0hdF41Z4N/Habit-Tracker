// Importing express
const express = require('express');
const router= express.Router();
const habitControllerApi = require('../../../controllers/habit_api');

// create new habit
router.post('/createHabit', habitControllerApi.createHabit);
// change status of the habit
router.get('/toggleStatus', habitControllerApi.toggleStatus);
// delete the habit
// router.get('/deleteHabit', habitController.deleteHabit);
// updates habit
// router.post('/updateHabit', habitController.updateHabit);


module.exports = router;
