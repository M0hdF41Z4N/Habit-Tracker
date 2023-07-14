const express = require('express');
const router= express.Router();
// Importing home controllers
const homeController = require('../controllers/homeController');
// Importing habit controllers
const habitController = require('../controllers/habitController');

router.get('/',homeController.home);
// create new habit
router.post('/createHabit', habitController.createHabit);
// change status of the habit
router.get('/toggleStatus', habitController.toggleStatus);
// delete habit
router.get('/deleteHabit',habitController.deleteHabit);
// Weekly view of all habits
router.get('/weekly_view',habitController.habitWeeklyView);



module.exports = router;