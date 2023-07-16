// Importing Habit model
const Habit = require('../models/habit');

// Creating Home controller to render all habits and habit add form
module.exports.home = async (req,res)=> {
    try {
        // Populating all the habits
        let habits = await Habit.find({}).populate();
        // Passing habits as context  to home view
        return res.render('home',{title:"Habit Tracker", habit_list : habits});
     }
    catch(err) {
        // For debugging purpose
        console.log('Error in homeController: ', err);
        return;
    }
}

// Creating controller for 404 page
module.exports.notFound = async function(req, res) {
    return res.render('404', {
        title :'Not Found!'
    });
}

