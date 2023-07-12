// Importing Habit model
const Habit = require('../models/habit');

// Controller for adding in new habit
module.exports.createHabit = async function(req, res) {
    try {
        // checking if habit already exists
        let habit = await Habit.findOne({title: req.body.title}).populate();
        // If habit already exists
        if(habit) {
            // Redirect to that habit
            return res.redirect('/');
        } else {
            // Creating habit
            let habit = await Habit.create({
                title: req.body.title,
                desc: req.body.desc,
                dates : {date : await getTodayDate() , completed : "none"}
            });

            // req.flash('success', 'Habit Created Successfully');
            // Redirecting to all habits view
            return res.redirect('/');
        
        }
         
    }
    catch (error) {
        // For debugging purpose
        console.log('Error in habitController/createHabit: ', error);
        return;
    }
}

// Contoller for changing status of habit
module.exports.toggleStatus = async function(req, res) {
    try {
        // Getting id of habit
        let id = req.query.id;
        // Getting date
        let date = req.query.date;
        // Finding habit
        const habit = await Habit.findById(id);
        // If not habit present
        if(!habit) {
            // Redirect to all habit view
            return res.redirect('/');
        }

        // take out the date array of the habit.
        let dates = habit.dates;
        let found = false;
        // changes the complete argument accodingly.
        dates.find((item, index) =>{
            if(item.date == date){
                if(item.complete === 'y'){
                    item.complete = 'n';
                }else if(item.complete === 'n'){
                    item.complete = 'x';
                }else if(item.complete === 'x'){
                    item.complete = 'y';
                }
                found = true;
            }
        });

        if(!found) {
            dates.push({date : date, complete : 'y'});
        }
        // at last save the dates.
        habit.dates = dates;
        await habit.save();
        return res.redirect('/weekly_view');
        
    } catch (error) {
        // For debugging purpose
        console.log('Error in habitController/toggleStatus', error);
        return res.render('404', {
            title: "Not Found"
        });
    }
}

// Controller to delete habit
module.exports.deleteHabit = async function(req, res) {
    try {
        let id = req.query.id;

        await Habit.deleteOne({ _id : id});
        // req.flash('success', 'Habit Deleted Successfully');
        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/deleteHabit', error);
        return res.render('404', {
            title: "Not Found"
        })
    }
}

// this fucntion will return the current data, which will helpful for getting the range of dates
function getTodayDate(){
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth()+1;

    let fullDate = month + " " + date;
    return fullDate;
}