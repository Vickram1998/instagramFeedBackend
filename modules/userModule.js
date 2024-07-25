const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: String,
    location: String,
    likes: { type: Number, default: 0 },
    description: String,
    postImage: String,
    date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;