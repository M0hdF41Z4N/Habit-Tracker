const express = require('express');
const router= express.Router();
const Habit = require('../models/habit');
const homeController = require('../controllers/homeController');

router.use('/api',require('./api'));
// Dummy views
router.get('/',homeController.home);
router.get('/deleteHabit',homeController.deleteHabit);

router.get('/weekly_view',async (req,res)=> {
    try {
    let habits = await Habit.find({}).populate();
    
    return res.render('weekly_view',{
        title:"Weekly View",
        habit_list : habits,
        weeklyDates : await getOneWeekDate()
    });
    }catch(err) {
        console.log('Error in weekly view: ', err);
        return;
    }
})

function getOneWeekDate(){
    let months = ["","Jan", "Feb", "March", "Apr", "May", "June", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dates = [];
    for(let i = 6; i>=0 ; i--){
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i);
        let mm = currentDate.getMonth()+1;
        mm = months[mm];
        let dd = currentDate.getDate();
        if (dd < 10) dd = '0' + dd;
        dates.push(mm +" " +dd);
    }
    return dates;
}

module.exports = router;