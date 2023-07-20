# Habit-Tracker


Habit Tracker application based on Node JS and MongoDB.

### Features
1. Create / Delete Habit.
2. Toggle status of Habit of past 7 days.
3. Track status of Habit of past 7 days.
4. Shows additional information about habit like longest streak , current streak , number of days habit followed.

How to Setup Project on local System
1. First setup npm package using `npm init`
2. Install the required dependencies as mentioned below.Using `npm install`<br> 
   ├── body-parser@1.20.2<br>
   ├── ejs-layouts@0.0.1<br>
   ├── ejs@3.1.9<br>
   ├── express-ejs-layouts@2.5.1<br>
   ├── express@4.18.2<br>
   └── mongoose@7.3.4<br>

3. Configure files
  1. config/database.js with your creds
4. Run the server `nodemon index.js`
