const cheerio = require('cheerio');
const request = require('request');

module.exports = callback => {

    request("http://www.sciencemag.org/news/latest-news", (error, response, html) => {

        let results = [];
        let $ = cheerio.load(html);

        let articleObj = {};

        $("article.media.media--var").each((i, element) => {


            let img = $(element).children('.media__icon').children('a').children().attr('src');

            let title = $(element).children('.media__body').children('.media__headline').children('a').text().trim();

            let author = $(element).children('.media__body').children('.byline').children('a').text();

            let date = $(element).children('.media__body').children('.byline').children('time').text();

            let link = $(element).children('.media__body').children('.media__headline').children('a').attr('href');
            // link = 'http://www.sciencemag.org/' + link;

            let description = $(element).children('.media__body').children('.media__deck').text().trim();

            articleObj = { title, img, author, date, link, description };

            // console.log(`TITLE: ${title}`);
            // console.log(`IMG: ${img}
            //     AUTHOR: ${author}
            //     DATE: ${date}
            //     `);

            results.push(articleObj);
        });

        callback(results);
    });
};
