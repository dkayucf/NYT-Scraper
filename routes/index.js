const express = require('express');
const router = express.Router();


const indexController = require('../controller/indexController');

//Main Route
router.get('/', indexController.getIndex);

//Fetch Articles
router.get('/displayArticles', indexController.displayArticles);

//Save Articles
router.get('/saveArticle', indexController.saveArticle);

//Save Comments
router.post('/saveComments/:id', indexController.saveComments);

//Delete article
router.get('/deleteArticle', indexController.deleteArticle);

//View all saved articles
router.get('/savedArticles', indexController.viewSavedArticles);

module.exports = router;