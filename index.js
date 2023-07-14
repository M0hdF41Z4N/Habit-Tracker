// Importing Express
const express = require('express');
// Importing Path
const path = require('path');
// Importing layouts
const expressLayouts = require('express-ejs-layouts');
// Importing body parser
const bodyParser = require('body-parser');
// Port number
const Port = process.env.PORT || 8000

// Initializing App
const app = express();



// Using Layouts
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// create application/json parser
let jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded())
app.use(jsonParser)


// Setting-up express routes
app.use('/',require('./routes'));

// Setting up Engine
app.set('view engine','ejs');
// Setting up views path
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());
// Setting up assets
app.use(express.static("assets"));

// Configuring to db
const db = require('./config/db');

// Listening to the server
app.listen(Port, function(error){
    if (error) {
          console.log(error);
    }
    // for debugging purpose
    console.log('Yup!My Server is running on Port', 8000);
    });
