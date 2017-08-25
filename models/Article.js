let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    'title': {
        'type': String,
        'required': true,
    },
    'author': {
        'type': String,
        'required': true
    },
    'date': {
        'type': String,
        'required': true,
    },
    'link': {
        'type': String,
        'required': true
    },
    'img': {
        'type': String,
        'required': true
    },
    'description': {
        'type': String,
        'required': true
    },
    'scrapeDate': {
        'type': Date,
        'default': Date.now
    },
    'comments': [{
		'type': Schema.Types.ObjectId,
		'ref': "Comment"
	}]
});

let Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
