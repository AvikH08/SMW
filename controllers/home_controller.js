const Post = require('../models/post.js');




module.exports.home = function(req, res) {
    //console.log(req.cookies);


    //  Post.find({}, function(err, posts){
    //      return res.render('home', {
    //          title: "Codeial | Home",
    //          posts: posts
    //      });
    //  });
    
    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts) {
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });
    
}
//module.exports.functionName = function(req, res) {}