const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

//Passport Config
require('./config/passport')(passport);

//Load Routes
const auth = require('./routes/auth');

const app = express();

/*********************MIDDLEWARE********************/





/**********************ROUTES***********************/
//Main Route
app.get('/', (req, res)=>{
   res.send('Hello'); 
});

//Use Routes
app.use('/auth', auth);





const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});