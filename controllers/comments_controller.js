const Comment = require('../models/comment.js');
const Post = require('../models/post.js');

module.exports.create = function(req, res) {
    Post.findById(req.body.post, function(err, post) {
        if(post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment) {
                //handle error

                post.comments.push(comment);
                post.save();
                //whenever we update we have to call the save function

                return res.redirect('/');
            });
        }
    });
}