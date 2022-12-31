const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        //it is being referred to the user's schema
    },
    //whenever we are loading a post, we need to fetch the comment of the posts
    //we will include the id of the comment ID's in this array in this post Schema itelf
    comments: [
        {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Comment'
        }
    ]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);



module.exports = Post;