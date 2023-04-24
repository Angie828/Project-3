const express = require('express')
const router = express.Router();

const PostModel = require('../db/post/post.model');
const { findUserByToken } = require('./middleware');

router.post('/', findUserByToken, async function (req, res) {
    const body = req.body;

    const newPostResponse = await PostModel.createPost(body, req.user._id)

    res.json(newPostResponse);
}
)

router.put('/:postId', findUserByToken, async function (req, res) {
    const postId = req.params.postId;
    const body = req.body;

    const post = await PostModel.updatePost(postId, body, req.user._id);

    res.json(post);
})

router.get('/', async function (req, res) {
    const allPosts = await PostModel.getAllPosts();

    res.send(allPosts);
}
)

router.delete('/:postId', findUserByToken, async function (req, res) {
    const postId = req.params.postId;

    try {
        const deletedPost = await PostModel.deletePost(postId, req.user._id);

        if (deletedPost) {
            res.json({
                message: 'Post deleted successfully',
            });
        } else {
            res.status(404).json({
                message: 'Post not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting post',
            error: error.message,
        });
    }
});

module.exports = router;