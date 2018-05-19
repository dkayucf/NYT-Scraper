const mongoose = require('mongoose');
const axios = require("axios");
const cheerio = require("cheerio");
const htmlparser2 = require('htmlparser2');


module.exports = {
    //Get index route view
    getIndex: (req, res)=>{
        res.render('index/index');
    },
    //Display Articles route view
    displayArticles: (req, res)=> {

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
                    summary: summary
                };

                results.push(article);
                
            });

            console.log(results);
            res.render('index/index', {
                articles: results
            });
            
        });
 
    }   
};