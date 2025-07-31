const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const axios = require('axios');

router.get('/my-reviews', auth, async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.userId });
        const reviewsWithTitles = await Promise.all(
            reviews.map(async (review) => {
                let title = 'Unknown Game';
                try {
                    if (review.gameId.match(/^[0-9]+$/)) { // RAWG ID (numeric string)
                        const response = await axios.get(`https://api.rawg.io/api/games/${review.gameId}`, {
                            params: { key: process.env.RAWG_API_KEY },
                        });
                        title = response.data.name;
                    } else { // MongoDB ObjectId
                        const game = await require('../models/Game').findById(review.gameId);
                        title = game?.title || 'Unknown Game';
                    }
                } catch (err) {
                    console.error('Error fetching game title:', err);
                }
                return { ...review.toObject(), gameId: { _id: review.gameId, title } };
            })
        );
        res.json(reviewsWithTitles);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Existing POST, PUT, DELETE routes
router.post('/', auth, async (req, res) => {
    try {
        const review = new Review({
            gameId: req.body.gameId,
            userId: req.userId,
            rating: req.body.rating,
            comment: req.body.comment,
        });
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.userId.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });

        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;
        await review.save();
        res.json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.userId.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });

        await review.deleteOne();
        res.json({ message: 'Review deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;