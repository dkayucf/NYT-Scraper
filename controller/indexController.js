const mongoose = require('mongoose');
const axios = require("axios");
const cheerio = require("cheerio");
const htmlparser2 = require('htmlparser2');
const db = require('../models');

module.exports = {
    //Get index route view
    getIndex: (req, res)=>{
        res.render('index/index');
    },
    //Display Articles route view
    displayArticles: (req, res)=> {

        db.Articles.find().then(retrievedArticle => {
            if(retrievedArticle.length === 0){
                axios.get("https://www.nytimes.com/section/world?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=World&WT.nav=page").then(function(response) {
                    const dom = htmlparser2.parseDOM(response.data);
                    // Then, we load that into cheerio and save it to $ for a shorthand selector
                    var $ = cheerio.load(dom);
        
                    let results = [];
        
                        $(".story-body").each(function(i, element) {
                    
                            let link = $(element).find('a').attr("href");
                            let title = $(element).find(".headline").text().trim();
                            let summary = $(element).find('.summary').text();
                            
                                let article = {
                                    link: link,
                                    title: title,
                                    summary: summary,
                                    savedArticle: false
                                };
                                results.push(article);
                            
                        });
        
                        db.Articles.create(results)
                            .then(dbArticle => {
                                res.render('index/index', {
                                    articles: dbArticle
                                });
                            });
                });
            } else {
                console.log(retrievedArticle);
                res.render('index/index', {
                    articles: retrievedArticle
                });
            }

        })

        
 
    },
    //Save Article
    saveArticle: (req, res) => {
        let id = req.query.id;
        db.Articles.findOne({_id:id}).then(foundArticle => {
            foundArticle.savedArticle = true;
            foundArticle.save().then(article => {
                res.redirect('/displayArticles');
            });
        });
            
    },
    saveComments: (req, res) => {
        let articleID = req.params.id;

        console.log(articleID);
        console.log(req.body.comments);
        db.Articles.findOne({_id: articleID}).then(foundArticle => {
            foundArticle.comments = req.body.comments;
            console.log(foundArticle);
            foundArticle.save().then(article => {
                res.redirect('/displayArticles');
            })
        })
    },
    deleteArticle: (req, res) => {
        let articleID = req.query.id;
        console.log(articleID);
        db.Articles.deleteOne({ _id: articleID }).then(deletedArticle=>{
            res.redirect('/displayArticles');
        })

    },
    viewSavedArticles: (req, res)=> {
        db.Articles.find({savedArticle: true}).then(foundArticles => {
      
            res.render('index/index', {
                articles: foundArticles
            });
        })
    }   
};