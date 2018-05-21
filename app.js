const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const {
    truncate
} = require('./helpers/hbs');

/**********************ROUTES***********************/
//Load Routes
const index = require('./routes/index');

/*********************MIDDLEWARE********************/
app.use(morgan('dev'));

app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body-Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//static folder
app.use(express.static(__dirname + '/public'));

//Mongoose connect
mongoose.connect('mongodb://localhost/nytScraper')
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.log(err));



/*----------------------USE ROUTES-------------------------*/
app.use('/', index);


app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});