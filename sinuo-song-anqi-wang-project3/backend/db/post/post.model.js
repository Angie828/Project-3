const mongoose = require("mongoose")

const PostSchema = require('./post.schema').PostSchema;

const PostModel = mongoose.model("posts", PostSchema);

function createPost(post, userId) {
    return PostModel.create({ ...post, user: userId });
}

function getAllPosts() {
    return PostModel.find({}).populate("user").sort({ datePosted: 'desc' }).exec();
}

function updatePost(postId, post, userId) {
    const updatedPost = { ...post, datePosted: new Date() };
    return PostModel.findOneAndUpdate({ _id: postId, user: userId }, updatedPost, { new: true }).exec();
}

function deletePost(postId, userId) {
    return PostModel.findOneAndDelete({ _id: postId, user: userId }).exec();
}


module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost
}