let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    'title': {
        'type': String,
        'required': true
    },
    'body': {
        'type': String,
        'required': true
    }
});

let Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
