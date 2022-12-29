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
    }
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);



module.exports = Post;