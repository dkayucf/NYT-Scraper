const express = require('express');
const router = express.Router();


const indexController = require('../controller/indexController');

//Main Route
router.get('/', indexController.getIndex);

//Fetch Articles
router.get('/displayArticles', indexController.displayArticles);

//Save Articles
router.get('/saveArticle', indexController.saveArticle);

module.exports = router;