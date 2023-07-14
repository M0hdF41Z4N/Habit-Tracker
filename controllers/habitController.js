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
            // req.flash('error', 'Habit Already Exists');
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
        // req.flash('error', 'Oops! Please provide valid title to create habit.');
        return res.render('404', {
            title: "Not Found"
        });
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
            // req.flash('error', 'Oops! Habit not found ,Please try again.');
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
        // req.flash('success', 'Habit status changes successfully.');
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
        // Getting habit ID
        let id = req.query.id;
        // Deleting habit
        await Habit.deleteOne({ _id : id});

        // req.flash('success', 'Habit Deleted Successfully');
        return res.redirect('/');
        
    } catch (error) {
        // For debugging purpose
        console.log('Error in habitController/deleteHabit', error);
        // req.flash('error', 'Unable to Delete habit.');
        // Returning 404 page
        return res.render('404', {
            title: "Not Found"
        })
    }
}

module.exports.habitWeeklyView = async (req,res)=> {
    try {
        // first populate all the habits
    let habits = await Habit.find({}).populate();
    // Return all the habits with last 7 day dates
    return res.render('weekly_view',{
        title:"Weekly View",
        habit_list : habits,
        weeklyDates : await getOneWeekDate()
        });
    } catch(err) {
        // For debugging purpose
        console.log('Error in weekly view: ', err);
        return res.render('404', {
            title: "Not Found"
        })
    }
}

// Get weekly dates from current date
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


// this fucntion will return the current data, which will helpful for getting the range of dates
function getTodayDate(){
    var today = new Date();
    let date = today.getDate();
    let month = today.getMonth()+1;

    let fullDate = month + " " + date;
    return fullDate;
}