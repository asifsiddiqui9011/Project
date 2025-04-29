const mongoose = require('mongoose');
const Post = require('../models/Post'); // Adjust the path as needed

// Create a new post
const createPost = async (req, res) => {
    try {
        const { userId, content, productId, postType } = req.body;
        const newPost = new Post({ userId, content, productId, postType });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId').populate('productId');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('userId')
            .populate('productId');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a post by ID
const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a reply to a post
const addReply = async (req, res) => {
    try {
        const { userId, reply, time } = req.body;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const newReply = { userId, reply, time };
        post.replies.push(newReply);
        const updatedPost = await post.save();
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get recent posts: returns posts sorted by date descending.
// Pass a query parameter "limit" for number of posts (default is 5)
const getRecentPosts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const posts = await Post.find()
            .sort({ date: -1 })
            .limit(limit)
            .populate('userId')
            .populate('productId');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get trending posts: Finds posts within the last 10 days,
// calculates a popularity score (likes + number of replies), and returns
// posts sorted descending by popularity. Pass a query parameter "limit"
// for number of posts (default is 5).
const getTrendingPosts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        const trendingPosts = await Post.aggregate([
            { $match: { date: { $gte: tenDaysAgo } } },
            { $addFields: { popularity: { $add: [ "$likes", { $size: "$replies" } ] } } },
            { $sort: { popularity: -1 } },
            { $limit: limit }
        ]);

        res.status(200).json(trendingPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
    addReply,
    getRecentPosts,
    getTrendingPosts
};