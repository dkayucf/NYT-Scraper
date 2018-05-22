const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ArticlesSchema = new Schema({
    title: {
        type: String
    },
    summary:{
        type: String
    },
    url: {
        type: String
    },
    savedArticle: {
        type: Boolean
    },
    comments: {
        type: String
    }
});

//Create collection and add schema
let Article = mongoose.model('Article', ArticlesSchema);

module.exports = Article;

