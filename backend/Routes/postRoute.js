const express = require('express');

const router = express.Router();
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    addReply,
    getRecentPosts,
    getTrendingPosts
} = require('../controllers/postController');

// Create a new post
router.post('/', createPost);

// Get all posts
router.get('/', getPosts);

// Get recent posts
router.get('/recent', getRecentPosts);

// Get trending posts
router.get('/trending', getTrendingPosts);

// Get a post by its ID
router.get('/:id', getPostById);

// Update a post by its ID
router.put('/:id', updatePost);

// Delete a post by its ID
router.delete('/:id', deletePost);

// Add a reply to a post by its ID
router.post('/:id/reply', addReply);

module.exports = router;