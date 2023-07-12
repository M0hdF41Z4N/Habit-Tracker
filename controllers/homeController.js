const Habit = require('../models/habit');

module.exports.home = async (req,res)=> {
    try {
        let habits = await Habit.find({}).populate();
        return res.render('home',{title:"Habit Tracker", habit_list : habits});
     }
    catch(err) {
        console.log('Error in homeController: ', error);
        return;
    }
    // return res.render('home',{title:"Habit Tracker",{habits}});
}



module.exports.deleteHabit = async function(req, res) {
    try {
        let id = req.query.id;
        // let user = req.user._id;

        await Habit.deleteOne({ _id : id });
        // req.flash('success', 'Habit Deleted Successfully');
        return res.redirect('/');
        
    } catch (error) {
        console.log('Error in habitController/deleteHabit', error);
        return res.render('404', {
            title: "Not Found"
        })
    }
}


module.exports.notFound = async function(req, res) {
    return res.render('404', {
        title :'Not Found!'
    });
}

// This function is for providing the 7days date, which will be displayed after the habit is created.
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