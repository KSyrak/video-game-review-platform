const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('userId', 'username').populate('gameId', 'title');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('userId', 'username').populate('gameId', 'title');
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST create review (protected)
router.post('/', async (req, res) => {
    const { gameId, rating, comment } = req.body;
    try {
        const review = new Review({
            gameId,
            userId: req.userId, // Assume userId from auth middleware
            rating,
            comment,
        });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT update review (protected)
router.put('/:id', async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.userId.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });
        Object.assign(review, { rating, comment });
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE review (protected)
router.delete('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.userId.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });
        await review.remove();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;