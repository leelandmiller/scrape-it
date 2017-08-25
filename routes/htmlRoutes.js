const Article = require('../models/Article');
const Comment = require('../models/Comment');

module.exports = app => {

    app.get('/', (req, res) => {
        Article.find().sort({scrapeDate: 1}).exec((err, docs) => {
            res.render('index', { docs });
        });
    });

    app.get('/scrape', (req, res) => {
        require('../services/scraper')(scrapedArticles => {
            scrapedArticles.forEach(article => {
                let entry = new Article(article);
                entry.save((err, doc) => {
                    try {
                        if (err) { throw err } else console.log(doc);
                    } catch (err) {
                        console.log(err.errmsg);
                    }
                });
            });
            res.redirect('/');
        });
    });

    app.get('/article/:id', (req, res) => {
        let articleId = req.params.id;

        Article.findOne({ _id: articleId }, (err, article) => {
            if (err) {
                console.log('THROW ERR', err.msg);
            } else {
                res.render('articleview', { article });
            }
        });
    });
};
