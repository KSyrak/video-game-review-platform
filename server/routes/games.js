const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const axios = require('axios');

// Search games via RAWG API
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const response = await axios.get('https://api.rawg.io/api/games', {
            params: {
                key: process.env.RAWG_API_KEY,
                search: query,
            },
        });
        res.json(response.data.results);
    } catch (err) {
        console.error('RAWG API error:', {
            message: err.message,
            status: err.response?.status,
            data: err.response?.data,
            config: err.config?.url,
        });
        res.status(500).json({ message: 'Error fetching games from RAWG', details: err.message });
    }
});


// GET all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.find().populate('createdBy', 'username');
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET single game by ID
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('createdBy', 'username');
        if (!game) return res.status(404).json({ message: 'Game not found' });
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST create game (protected route, requires user)
router.post('/', async (req, res) => {
    const { title, description, releaseDate, platforms, coverImage } = req.body;
    try {
        const game = new Game({
            title,
            description,
            releaseDate,
            platforms,
            coverImage,
            createdBy: req.userId, // Assume userId is set by auth middleware (Week 4)
        });
        await game.save();
        res.status(201).json(game);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT update game (protected)
router.put('/:id', async (req, res) => {
    const { title, description, releaseDate, platforms, coverImage } = req.body;
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        if (game.createdBy.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });
        Object.assign(game, { title, description, releaseDate, platforms, coverImage });
        await game.save();
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE game (protected)
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });
        if (game.createdBy.toString() !== req.userId) return res.status(403).json({ message: 'Unauthorized' });
        await game.remove();
        res.json({ message: 'Game deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;