// Importing Mongoose
const mongoose = require('mongoose');

// create a habit schema
const habitSchema = new mongoose.Schema({
    // Title of habit
    title: {
        type: String,
        required : true
    },
    // Description of Habit
    desc: {
        type: String
    },
    // Status of habit with date
    dates: [{
        date: String,
        complete: String
    }]
}, {
    timestamps: true,
})

// Creating model
const Habit = mongoose.model('Habit', habitSchema);
// Exporting model
module.exports = Habit;