//Create web server
const express = require('express');
const app = express();
const port = 3000;
//Create body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//Create mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/hiphop', { useNewUrlParser: true });
//Create Schema
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    username: String,
    comment: String
});
const Comment = mongoose.model('Comment', commentSchema);
//Create view engine
app.set('view engine', 'ejs');
//Create route
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments', { comments: comments });
        }
    });
});
app.post('/comments', (req, res) => {
    const newComment = new Comment({
        username: req.body.username,
        comment: req.body.comment
    });
    newComment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/comments');
        }
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});